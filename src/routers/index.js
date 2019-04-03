const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/home');
const ctrlImage = require('../controllers/image');

module.exports = app => {
    
    router.get('/', ctrlHome.index);
    router.get('/images/:image_id', ctrlImage.index);
    router.post('/images', ctrlImage.create);
    router.post('/images/:image_id/like', ctrlImage.like);
    router.post('/images/:image_id/comment', ctrlImage.comment);
    router.delete('/images/:image_id', ctrlImage.remove);

    app.use(router);
}