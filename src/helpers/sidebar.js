const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    const results = await Promise.all([
        Stats(),
        Images.popular(5),
        Comments.newest(3)
    ])

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
};