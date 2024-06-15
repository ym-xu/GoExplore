# app/routers/places.py

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from app.services.openai_service import generate_keywords_from_query
from app.services.places_service import fetch_nearby_places
from app.services.recommendation_service import generate_recommendations

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
        # 生成关键词
        keywords = await generate_keywords_from_query(user_query.query)
        print("keywords: ", keywords)
        # 查询附近店铺
        places = fetch_nearby_places(user_query.lat, user_query.lon, keywords)
        # print("places: ", places)
        # 生成推荐
        # recommendation = generate_recommendations(user_query.query, places)
        # return {"recommendation": recommendation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))