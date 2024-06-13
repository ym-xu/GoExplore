import express from 'express';

import { handlePlacesRequest } from './controllers/placesController.js';

const app = express();

app.get('/api/places', handlePlacesRequest);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));