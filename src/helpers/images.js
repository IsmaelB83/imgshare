const { Image } = require('../models/index');

module.exports = {
    
    // popular: async function(nLimit) {
    async popular (nLimit) {
        const images = await Image.find()
        .limit(nLimit)
        .sort({ likes: -1 });
        return images;
    }

}
