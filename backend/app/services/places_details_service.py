import requests
from outscraper import ApiClient
from app.config import settings

outscraper_api_key = settings.OUTSCRAPER_API_KEY
review_limit = int(settings.REVIEW_LIMIT)

from outscraper import ApiClient

def fetch_place_reviews(place_id: str):
    api_client = ApiClient(api_key=outscraper_api_key)
    print(f"Fetching reviews for place_id {place_id}...")
    
    results = api_client.google_maps_reviews(place_id, reviews_limit=review_limit)
    reviews = [
                    {
                        'author_name': review.get('author_title'),
                        'review_text': review.get('review_text'),
                        'review_image_url': review.get('review_img_url')
                    }
                    for review in results[0]['reviews_data']
                ]
    return reviews
        