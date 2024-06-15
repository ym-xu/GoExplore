# app/routers/places.py

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from app.services.openai_service import generate_keywords_from_query
from app.services.places_id_service import fetch_nearby_places
from app.services.recommendation_service import generate_recommendations
from app.services.places_details_service import fetch_place_reviews

router = APIRouter()

class UserQuery(BaseModel):
    query: str
    lat: float
    lon: float
    conversation_id: str

@router.post("/")
async def get_recommendations(user_query: UserQuery):
    print("start with query: ", user_query.query)
    try:
        # keywords generation
        keywords = await generate_keywords_from_query(user_query.query)
        print("keywords: ", keywords)
        # search nearby
        places = fetch_nearby_places(user_query.lat, user_query.lon, keywords)
        # print("places: ", places)
        # detail (reviews and photos) extraction
        for place in places:
            reviews = fetch_place_reviews(place['place_id'])
            place['reviews'] = reviews
        
        print("places with details: ", places)
        # recommendation generation
        # recommendation = generate_recommendations(user_query.query, places)
        # return {"recommendation": recommendation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))