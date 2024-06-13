import axios from 'axios';
import { GOOGLE_API_KEY } from '../config.js';
import { savePlaceDetails, savePhotoUrl } from '../utils/fileHandler.js';
import { generateKeywordsFromQuery } from './llmService.js';  // Assuming llmService.js uses named export

export async function getPlaces(lat, lon, query) {
    
    const keywords = await generateKeywordsFromQuery(query);
    const cleanedKeywords = keywords[0]
        .split('\n')
        .map(keyword => keyword.replace('-', '').trim())
        .filter(keyword => keyword.length > 0);

    console.log('Cleaned Keywords:', cleanedKeywords);

    let allPlaces = [];

    for (const keyword of cleanedKeywords) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
            params: {
                location: `${lat},${lon}`,
                radius: 100,
                keyword: keyword,
                key: GOOGLE_API_KEY
            },
            proxy: {
                host: '127.0.0.1',
                port: 7890,
                protocol: 'http'
            }
        });

        const places = response.data.results;

        for (const place of places) {
            const detailsResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
                params: {
                    place_id: place.place_id,
                    fields: 'formatted_phone_number,opening_hours,reviews,photos',
                    key: GOOGLE_API_KEY
                },
                proxy: {
                    host: '127.0.0.1',
                    port: 7890,
                    protocol: 'http'
                }
            });

            const details = detailsResponse.data.result;
            const placeDetails = {
                name: place.name,
                rating: place.rating,
                address: place.vicinity,
                type: keyword,
                place_id: place.place_id,
                phone: details.formatted_phone_number,
                opening_hours: details.opening_hours ? details.opening_hours.weekday_text : [],
                open_now: details.opening_hours ? details.opening_hours.open_now : false,
                reviews: details.reviews ? details.reviews.map(review => ({
                    author_name: review.author_name,
                    rating: review.rating,
                    relative_time_description: review.relative_time_description,
                    text: review.text,
                    time: review.time
                })) : []
            };

            await savePlaceDetails(placeDetails, keyword);

            allPlaces.push(placeDetails);
        }
    }
    return allPlaces;
}