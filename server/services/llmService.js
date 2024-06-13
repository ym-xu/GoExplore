import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config.js';
import axios from 'axios';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: 'https://gateway.ai.cloudflare.com/v1/d4c6cd72f6192b6d992c8c58b4c67f09/goexpore/openai'
});

export async function generateKeywordsFromQuery(query) {
    console.log('Start generateKeywordsFromQuery:', query);
    
    try {
        const prompt = `Given a user's question about recommendations for eating, drinking, or entertainment activities, generate a concise list of 5 to 7 relevant keywords, focusing on diversity and minimal repetition.`;
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
}