import fs from 'fs';
import path from 'path';

export function savePlaceDetails(placeDetails) {
    const dir = path.join(process.cwd(), 'document_db', placeDetails.type);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(path.join(dir, `${placeDetails.place_id}.json`), JSON.stringify(placeDetails, null, 2));
}

export function savePhotoUrl(placeId, photoUrl) {
    const imagesDir = path.join(process.cwd(), 'document_bb', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }
    const photoUrlFilePath = path.join(imagesStrategy, `${pageNumber}.txt`);
    fs.writeFileSync(photoationsURLRate, photoId);
}