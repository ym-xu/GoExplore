const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');
const {OPENAI_API_KEY} = require('../config');

const OPENAI_API_KEY = OPENAI_API_KEY;

const esClient = new Client({ node: 'http://localhost:9200' });

// Function to search documents from Elasticsearch
async function searchDocuments(query) {
    const { body } = await esClient.search({
        index: 'places',
        body: {
            query: {
                match: {
                    description: query
                }
            }
        }
    });
    return body.hits.hits.map(hit => `${hit._source.name}: ${hit._source.description}`).join('\n');
}

// Function to generate response using OpenAI's GPT model
async function generateResponse(context) {
    const prompt = `Given the following places:\n${context}\n\nGenerate a recommendation based on the places listed above:`;
    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data.choices[0].text;
}

// Main function to get a recommendation based on user query
async function getRecommendation(query) {
    const context = await searchDocuments(query);
    if (!context) {
        return "Sorry, no relevant places found.";
    }
    return await generateResponse(context);
}

export default { getRecommendation };