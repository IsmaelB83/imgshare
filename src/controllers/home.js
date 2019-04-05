const ctrl = {};

const { Image } = require('../models/index');
const sidebar = require('../helpers/sidebar')

ctrl.index = async (req, res) => {
    let viewModel = {}
    viewModel.images = await Image.find().sort({timestamp: -1});
    viewModel = await sidebar(viewModel);
    res.render('index', viewModel);
}

module.exports = ctrl;