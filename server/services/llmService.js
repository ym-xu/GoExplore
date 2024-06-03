// const axios = require('axios');
// const config = require('../config');

// exports.generateKeywordsFromQuery = async (query) => {
//     try {
//         const response = await axios.post('https://api.openai.com/v1/completions', {
//             model: "gpt-3.5-turbo-0125",
//             prompt: `Generate a list of keywords for Google Maps search from the following user query: "${query}"`,
//             max_tokens: 50
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${config.openAiApiKey}`
//             }, proxy: {
//                 host: '127.0.0.1',
//                 port: 7890,
//                 protocol: 'http'
//             }
//         });
//         const keywords = response.data.choices[0].text.trim().split(',').map(k => k.trim());
//         console.log('Keywords:', keywords);
//         return keywords;
//     } catch (error) {
//         console.error('Failed to generate keywords:', error);
//         return [];
//     }
// };