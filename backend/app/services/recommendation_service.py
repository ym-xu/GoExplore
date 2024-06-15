import openai
from app.config import settings

openai.api_key = settings.OPENAI_API_KEY

def generate_recommendations(query: str, places: list):
    place_names = ', '.join([place['name'] for place in places])
    prompt = f"Based on the user's query '{query}' and the following places: {place_names}, generate a recommendation."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=150
    )

    if response and response.choices and response.choices[0].message:
        recommendation = response.choices[0].message['content'].strip()
        return recommendation
    else:
        raise ValueError("Invalid response structure from OpenAI API")