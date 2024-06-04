require('dotenv').config();

module.exports = {
    googleApiKey: process.env.GOOGLE_API_KEY,
    port: process.env.PORT,
    openAiApiKey: process.env.openAiApiKey,
};