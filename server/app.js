const express = require('express');
const app = express();
const placesRoutes = require('./routes/placesRoutes');
const config = require('./config');
const cors = require('cors');

app.use(cors()); 

app.use(express.static('../client/public'));

app.use('/api/places', placesRoutes);

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});