const helpers = {};

helpers.imageUrl = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let random = '';
    for (let i = 0; i < 8; i++) {
        let index = Math.floor(Math.random() * possible.length);
        random += possible[index];
    }
    return random;
}

module.exports = helpers;

