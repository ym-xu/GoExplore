import requests
from app.config import settings

gmap_api_key = settings.GOOGLE_API_KEY
max_places = int(settings.MAX_PLACES)

def fetch_nearby_places(lat: float, lon: float, keywords: list):
    unique_place_ids = set()
    all_places = []

    for keyword in keywords:
        print(f"Fetching places for keyword {keyword}...")
        response = requests.get(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            params={
                'location': f'{lat},{lon}',
                'radius': 1500,  # 根据需要调整搜索半径
                'keyword': keyword,
                'key': gmap_api_key
            },
            proxies={
                'http': 'http://127.0.0.1:7890',
                'https': 'http://127.0.0.1:7890'
            }
        )

        if response.status_code == 200:
            places = response.json().get('results', [])
            for place in places:
                place_id = place.get('place_id')
                user_ratings_total = place.get('user_ratings_total')
                if place_id and place_id not in unique_place_ids and user_ratings_total > 5:
                    unique_place_ids.add(place_id)
                    place_info = {
                        "place_id": place_id,
                        "name": place.get('name'),
                        "location": place.get('geometry', {}).get('location'),
                        "open_now": place.get('opening_hours', {}).get('open_now'),
                        "rating": place.get('rating'),
                        "user_ratings_total": user_ratings_total,
                        "vicinity": place.get('vicinity')
                    }
                    all_places.append(place_info)
        else:
            print(f"Error fetching places for keyword {keyword}: {response.status_code} {response.text}")

    if len(all_places) > max_places:
        all_places.sort(key=lambda x: x.get('user_ratings_total', 0), reverse=True)
        all_places = all_places[:max_places]
    
    print(len(all_places))
    return all_places