from langchain_openai import ChatOpenAI
from app.config import settings

PREDEFINED_KEYWORDS = ["Cafe", "Restaurant", "Bar", "Bakery", 'canelé']

async def generate_keywords_from_query(query: str):
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

    prompt = (
        f"Given a user's question '{query}' and the following predefined list of keywords:\n\n"
        f"{', '.join(PREDEFINED_KEYWORDS)}\n\n"
        "select the 3 to 5 most relevant keywords that match the user's query. Ensure the keywords are diverse and cover different aspects of the query."
    )
    
    print(f"Calling OpenAI API with prompt: {prompt}")
    try:
        response = await llm.apredict(prompt, max_tokens=100)

        if response:
            message_content = response.strip()
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