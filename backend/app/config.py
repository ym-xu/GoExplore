import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
    MAX_PLACES: int = os.getenv("MAX_PLACES")
    OUTSCRAPER_API_KEY: str = os.getenv("OUTSCRAPER_API_KEY")
    REVIEW_LIMIT: int = os.getenv("REVIEW_NUMBER")

settings = Settings()