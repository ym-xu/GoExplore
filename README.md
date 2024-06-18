# ⛩️ GoExplore

## Development Plan

- [x] crawler multiple classes 
- [x] multimodal data crawler
- [x] document classify
- [x] document embedding 
- [x] RAG with Single LangChain
- [ ] Conversational RAG 
- [ ] structured response,and backtrack KB
- [ ] Multimodal Conversational RAG 
- [ ] Demo Tokyo City 
- [ ] Frontend Design [Figma Draft](https://www.figma.com/design/mYIstag6StC19YfB3SvVco/Untitled?node-id=0-1&t=NK1vXb6j7xrn23pn-1)

### Demo Development
- [x] place_id extraction
- [ ] details extraction
- [ ] reviews and picture extraction


 
## Multimodal report generation

This project employs a text-based Retrieval-Augmented Generation (RAG) model to create detailed text reports and recommend intriguing establishments in your vicinity. Following that, we integrate a multimodal matching unit designed to select images from reviews that correspond to the text report. This ensures a comprehensive understanding of the recommended outlets, including insights into their environment and products, enriching your experience with a visual and textual overview of what to expect.

![Pipeline](images/structure.png)

## Structure

```
travel-assistant/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── css/
│   │       └── styles.css
│   ├── src/
│   │   ├── components/
│   │   │   └── MapComponent.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/app
│   ├── routes/
│   │   └── places_routes.py
│   ├── services/
│   │   ├── vector_qa_service.py
│   │   ├── openai_service.py
│   │   ├── places_id_service.py
│   │   ├── places_details_service.py
│   │   └── recommendation_service.py
│   ├── main.py
│   ├── .env
│   ├── config.py
│   ├── requirements.txt
│   └── README.md
├── document_db/
│   └── (place JSON files)
└── README.md
```