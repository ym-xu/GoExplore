const googlePlacesService = require('../services/googlePlacesService');

exports.getNearbyPlaces = async (req, res) => {
    const { lat, lon, query } = req.query;

    try {
        const places = await googlePlacesService.getPlaces(lat, lon, query);
        console.log('Places:', places);
        res.json(places);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};