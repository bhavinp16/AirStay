const cloudinary = require('cloudinary');
const config = require('config');

cloudinary.config({
    cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
    api_key: config.get('CLOUDINARY_API_KEY'),
    api_secret: config.get('CLOUDINARY_API_SECRET'),
});

// exporting the uploads method
exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            });
        }, {
            folder: folder,
            resource_type: 'auto'
        });
    });
}
