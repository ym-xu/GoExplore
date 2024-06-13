import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
export const port = process.env.PORT;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;