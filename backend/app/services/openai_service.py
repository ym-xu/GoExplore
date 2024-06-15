import openai
from app.config import settings

openai.api_key = settings.OPENAI_API_KEY

PREDEFINED_KEYWORDS = ["Cafe", "Restaurant", "Bar"]

async def generate_keywords_from_query(query: str):
    prompt = (
        f"Given a user's question '{query}' and the following predefined list of keywords:\n\n"
        f"{', '.join(PREDEFINED_KEYWORDS)}\n\n"
        "select the 3 to 5 most relevant keywords that match the user's query. Ensure the keywords are diverse and cover different aspects of the query."
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=100,
        )

        if response and response.choices and response.choices[0].message:
            message_content = response.choices[0].message['content'].strip()
            keywords = parse_keywords(message_content)
            return keywords
        else:
            raise ValueError("Invalid response structure from OpenAI API")
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        raise e
    
def parse_keywords(content: str):
    keywords = [line.split('. ', 1)[1] for line in content.split('\n') if '. ' in line]
    return keywords