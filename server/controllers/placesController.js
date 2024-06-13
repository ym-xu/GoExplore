import { getPlaces } from '../services/googlePlacesService.js'; // Assuming named export
import { indexData } from '../services/indexDataService.js'; // Assuming named export
// import { getRecommendation } from '../services/recommendationService.js'; // Uncomment if used

async function handlePlacesRequest(req, res) {
    const { lat, lon, query } = req.query;
    try {
        const places = await getPlaces(lat, lon, query);
        console.log('Received places:', places);

        if (!Array.isArray(places)) {
            console.error('Error: Expected places to be an array, received:', typeof places);
            res.status(500).send("Internal Server Error: Incorrect data format");
            return;
        }

        console.log('Indexing places...');
        await indexData(places);

        // Uncomment below lines if recommendation functionality is implemented
        // console.log('Generating recommendations...');
        // const recommendation = await getRecommendation(query);
        // res.json({ recommendation });

        // If you're not using recommendations directly here, send a success message
        res.status(200).send("Places processed and indexed successfully.");
    } catch (error) {
        console.error("Error handling places request:", error);
        res.status(500).send("Internal Server Error");
    }
}

export { handlePlacesRequest }; // Export as a named export if you plan to import it specifically