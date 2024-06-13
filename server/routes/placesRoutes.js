import express from 'express';
import placesController from '../controllers/placesController.js';

const router = express.Router();

router.get('/', placesController.getNearbyPlaces);

module.exports = router;