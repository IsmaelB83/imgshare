const path = require('path');
const fs = require('fs-extra');
const helpers = require('../helpers/libs');

// const { Image } = require('../models/'); Es equivalente, ya que por defecto node busca index.js
const { Image } = require('../models/index');

const ctrl = {};

ctrl.index = (req, res) => {
    res.send('Esto es una imagen');
};

ctrl.create = async (req, res) => {
    const imageUrl = helpers.imageUrl();
    const ext = path.extname(req.file.originalname).toLowerCase();
    const tempPath = req.file.path;
    const targetPath = path.resolve(`public/upload/${imageUrl + ext}`);
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        try {
            await fs.rename(tempPath, targetPath);    
            let image = new Image({
                title: req.body.title,
                description: req.body.description,
                filename: imageUrl + ext,
            });
            await image.save();
        } catch (error) {
            console.log(error);
        }
    }
    res.send('It works');
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};

module.exports = ctrl;