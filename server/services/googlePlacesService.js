const axios = require('axios');
const config = require('../config');
const fileHandler = require('../utils/fileHandler');

exports.getPlaces = async (lat, lon) => {
    console.log('Getting places near', lat, lon);
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
            location: `${lat},${lon}`,
            radius: 300,
            type: 'restaurant',
            key: config.googleApiKey
        },
        proxy: {
            host: '127.0.0.1',
            port: 7890,
            protocol: 'http'
        }
    });

    const places = response.data.results;
    console.log('Places:', places);
    for (const place of places) {
        const placeDetails = {
            name: place.name,
            rating: place.rating,
            address: place.vicinity,
            place_id: place.place_id
        };

        const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
            params: {
                place_id: place.place_id,
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
        console.log(placeDetails)

        await fileHandler.savePlaceDetails(place.place_id, placeDetails);
    }

    return places;
};