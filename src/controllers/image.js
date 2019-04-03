const path = require('path');
const fs = require('fs-extra');
const helpers = require('../helpers/libs');
const { Image, Comment } = require('../models/index');
const md5 = require('md5');

const ctrl = {};

ctrl.index = async (req, res) => {
    try {
        const viewModel = { image: {}, comments: {}};
        viewModel.image = await Image.findOne({filename: {$regex: req.params.image_id}});
        if (viewModel.image) {
            viewModel.image.views++;
            await viewModel.image.save();
            viewModel.comments = await Comment.find({image_id: viewModel.image._id}).exec();
            res.render('image', viewModel);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};

ctrl.create = async (req, res) => {

    const saveImage = async () => {
        const imageUrl = helpers.imageUrl();
        const images = await Image.find({filename: imageUrl}).exec();
        if (images.length > 0) {
            saveImage();
        }
        const tempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            try {
                await fs.rename(tempPath, targetPath);    
                let image = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imageUrl + ext,
                });
                const imageSaved = await image.save();            
                res.redirect(`/images/${imageUrl}`);
            } catch (error) {
                console.log(error);
            }
        }
        else { 
            await fs.unlink(tempPath);
            res.status(500).json({error: 'Only image files are allowed'});
        }
    };
    saveImage();
};

ctrl.like = async (req, res) => {
    let image = await Image.findOne({filename: req.params.image_id});
    if (image) {
        image.likes++;
        await image.save();
        res.json( { likes: image.likes });
    } else {
        res.status(500).json({error: 'Internal error'});
    }
};

ctrl.comment = async (req, res) => {
    let image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image) {
        const comment = new Comment(req.body);
        comment.image_id = image._id;
        comment.gravatar = md5(comment.email);
        await comment.save();
        res.redirect(`/images/${image.uniqueId}`)
    }
};

ctrl.remove = async (req, res) => {
    try {
        let image = await Image.findOne({filename: req.params.image_id});
        if (image) {
            await fs.unlink(path.resolve(`./src/public/upload/${image.filename}`));
            await Comment.deleteMany({image_id: image._id});
            await image.remove();
            res.json( { ok: 'Imagen borrada' });
        } else {
            res.status(500).json({error: 'Internal error'});
        }        
    } catch (error) {
         console.log(error);
    }
};

module.exports = ctrl;