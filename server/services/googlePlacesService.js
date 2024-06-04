const axios = require('axios');
const config = require('../config');
const fileHandler = require('../utils/fileHandler');
const llmService = require('./llmService');

exports.getPlaces = async (lat, lon, query) => {
    console.log('config:', config);
    const keywords = await llmService.generateKeywordsFromQuery(query);
    const cleanedKeywords = keywords[0]
        .split('\n')
        .map(keyword => keyword.replace('-', '').trim())
        .filter(keyword => keyword.length > 0);

    console.log('Cleaned Keywords:', cleanedKeywords);

    const allPlaces = [];

    for (const keyword of cleanedKeywords) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lon}`,
                radius: 10,
                keyword: keyword,
                key: config.googleApiKey
            },
            proxy: {
                host: '127.0.0.1',
                port: 7890,
                protocol: 'http'
            }
        });

        const places = response.data.results;

        for (const place of places) {
            const placeDetails = {
                name: place.name,
                rating: place.rating,
                address: place.vicinity,
                type: keyword, // Use the keyword as the type
                place_id: place.place_id
            };

            const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
                params: {
                    place_id: place.place_id,
                    fields: 'formatted_phone_number,opening_hours,reviews,photos',
                    key: config.googleApiKey
                },
                proxy: {
                    host: '127.0.0.1',
                    port: 7890,
                    protocol: 'http'
                }
            });

            const details = detailsResponse.data.result;
            placeDetails.phone = details.formatted_phone_number;
            placeDetails.opening_hours = details.opening_hours;
            placeDetails.reviews = details.reviews;

            if (details.photos && details.photos.length > 0) {
                const photoReference = details.photos[0].photo_reference;
                const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${config.googleApiKey}`;
                placeDetails.photoUrl = photoUrl;
            }

            console.log(`${keyword} Place Details:`, placeDetails);
            await fileHandler.savePlaceDetails(placeDetails, keyword);
            if (placeDetails.photoUrl) {
                await fileHandler.savePhotoUrl(placeDetails.place_id, placeDetails.photoUrl);
            }
        }

        allPlaces.push(...places);
    }
    return allPlaces;
};