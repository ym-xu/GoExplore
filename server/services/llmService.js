const OpenAI = require("openai");
const config = require('../config');
const axios = require('axios');

const openai = new OpenAI({
    apiKey: config.openaiApiKey,
    baseURL: `${config.openaiBaseURL}/${config.openaiEndpoint}`
});

exports.generateKeywordsFromQuery = async (query) => {
    console.log('start generateKeywordsFromQuery: ', query);
    try {
        const prompt = `Given a user's question about recommendations for eating, drinking, or entertainment activities, generate a list of relevant keywords...`;
        console.log('Sending request to OpenAI with prompt:', prompt);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
            max_tokens: 100
        });

        console.log('Response received:', response);

        if (response && response.choices && response.choices.length > 0) {
            const message = response.choices[0].message;
            if (message && message.content) {
                const keywords = message.content.trim().split(',').map(k => k.trim());
                console.log('Keywords:', keywords);
                return keywords;
            } else {
                throw new Error('Invalid message structure');
            }
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Failed to generate keywords:', error);
        if (error.response) {
            console.error('Error details:', error.response.data);
        } else {
            console.error('No additional error data');
        }
        throw new Error('Failed to generate keywords: ' + error.message);
    }
};