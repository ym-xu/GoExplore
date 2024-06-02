# ⛩️ GoExplore

## Development Plan

- [x] crawler multiple classes 
- [x] multimodal data crawler
- [x] document classify
- [ ] structured response
- [ ] ...
 
## Multimodal report generation

This project employs a text-based Retrieval-Augmented Generation (RAG) model to create detailed text reports and recommend intriguing establishments in your vicinity. Following that, we integrate a multimodal matching unit designed to select images from reviews that correspond to the text report. This ensures a comprehensive understanding of the recommended outlets, including insights into their environment and products, enriching your experience with a visual and textual overview of what to expect.

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
├── server/
│   ├── controllers/
│   │   └── placesController.js
│   ├── routes/
│   │   └── placesRoutes.js
│   ├── services/
│   │   └── googlePlacesService.js
│   ├── utils/
│   │   └── fileHandler.js
│   ├── app.js
│   ├── config.js
│   ├── package.json
│   └── README.md
├── places/
│   └── (place JSON files)
└── README.md
```