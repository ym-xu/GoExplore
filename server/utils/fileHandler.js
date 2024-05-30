const fs = require('fs');
const path = require('path');

exports.savePlaceDetails = (placeId, placeDetails) => {
    const dir = path.join(__dirname, '../../document_db');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(path.join(dir, `${placeId}.json`), JSON.stringify(placeDetails, null, 2));
};