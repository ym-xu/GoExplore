import axios from 'axios';
import { OPENAI_API_KEY } from '../config.js';
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
    model: "all-MiniLM-L6-v2",
  });
const vectorStore = new Chroma(embeddings, {
  collectionName: "test-deletion",
});

async function indexData(places) {
    const documents = places.map(place => {
        let content = `${place.name} is a ${place.type} located at ${place.address}. 
        It has a rating of ${place.rating} and is currently ${place.open_now ? "open" : "closed"}. 
        Opening hours are: ${place.opening_hours.join(", ")}.`;

        place.reviews.forEach(review => {
            content += `\n\nReview by ${review.author_name}: ${review.text.replace(/\n/g, " ")}`;
        });

        return {
            pageContent: content,  // All content is now correctly in one string
            metadata: {  // Directly construct metadata object here
                name: place.name,
                type: place.type,
                rating: place.rating,
                address: place.address,
                phone: place.phone,
                opening_hours: place.opening_hours,
                open_now: place.open_now,
            }
        };
    });

    console.log('Adding documents to vector store:', documents);
    const ids = await vectorStore.addDocuments(documents);
    console.log('Document IDs:', ids);
}

export { indexData, embedText };  // Exporting as named exports