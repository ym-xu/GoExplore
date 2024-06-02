const fs = require('fs');
const path = require('path');

exports.savePlaceDetails = (placeDetails) => {
    const dir = path.join(__dirname, '../../document_db', placeDetails.type);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, `${placeDetails.place_id}.json`), JSON.stringify(placeDetails, null, 2));
};

exports.savePhotoUrl = (placeId, photoUrl) => {
    const imagesDir = path.join(__dirname, '../../document_db', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }
    const photoUrlFilePath = path.join(imagesDir, `${placeId}.txt`);
    fs.writeFileSync(photoUrlFilePath, photoUrl);
};