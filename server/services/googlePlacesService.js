const axios = require('axios');
const config = require('../config');
const fileHandler = require('../utils/fileHandler');
const llmService = require('./llmService');

exports.getPlaces = async (lat, lon, query) => {
    const keywords = await llmService.generateKeywordsFromQuery(query);
    const allPlaces = [];

    for (const keyword of keywords) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lon}`,
                radius: 500,
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
        console.log(`${type} Places:`, places);

        for (const place of places) {
            const placeDetails = {
                name: place.name,
                rating: place.rating,
                address: place.vicinity,
                type: type, 
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

            console.log(`${type} Place Details:`, placeDetails);
            await fileHandler.savePlaceDetails(placeDetails, type);
            if (placeDetails.photoUrl) {
                await fileHandler.savePhotoUrl(placeDetails.place_id, placeDetails.photoUrl);
            }
        }

        allPlaces.push(...places);
    }
    return allPlaces;
};