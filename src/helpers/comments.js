const { Comment, Image } = require('../models/index');

module.exports = {
    
    async newest(nLimit) {
        const comments = await Comment.find()
        .limit(nLimit)
        .sort({timestamp: -1});

        for(let i = 0; i<comments.length; i++) {
            const image = await Image.findOne({_id: comments[i].image_id})
            comments[i].image = image;
        }
        return comments;               
    }
}
 