import requests
from outscraper import ApiClient
from app.config import settings
from outscraper import ApiClient

outscraper_api_key = settings.OUTSCRAPER_API_KEY
review_limit = int(settings.REVIEW_LIMIT)

def fetch_place_details(place_id: str):
    api_client = ApiClient(api_key=outscraper_api_key)
    print(f"Fetching reviews for place_id {place_id}...")
    

    results = api_client.google_maps_reviews(place_id, reviews_limit=review_limit, language='en')
    if not results:
        return {}
        
    place_info = results[0]
    details = {
        'description': place_info['description'],
        'full_address': place_info['full_address'],
        'site': place_info['site'],
        'phone': place_info['phone'],
        'type': place_info['type'],
        'rating': place_info['rating'],
        'reviews': place_info['reviews'],
        'reviews_data': [
            {
                    'author_name': review.get('author_title'),
                    'review_text': review.get('review_text'),
                    'review_image_url': review.get('review_img_url')
            }
            for review in results[0]['reviews_data']
        ]
    }
    
    return details
        