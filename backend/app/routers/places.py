from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from app.services.openai_service import generate_keywords_from_query
from app.services.places_id_service import fetch_nearby_places
from app.services.recommendation_service import generate_recommendations
from app.services.places_details_service import fetch_place_details
from app.services.vector_qa_service import initialize_vector_qa
from langchain_core.documents.base import Document
from langchain_chroma import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

router = APIRouter()

class UserQuery(BaseModel):
    query: str
    lat: float
    lon: float
    conversation_id: str

def filter_none_metadata(metadata):
    return {k: v for k, v in metadata.items() if v is not None}

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

@router.post("/")
async def get_recommendations(user_query: UserQuery):
    print("start with query: ", user_query.query)
    try:
        # keywords generation
        keywords = await generate_keywords_from_query(user_query.query)
        print("keywords: ", keywords)

        # search nearby outlets
        basic_places, in_db = fetch_nearby_places(user_query.lat, user_query.lon, keywords)
        documents = []
        # print("places: ", places)

        # detail (reviews and photos) extraction
        if in_db:
            # todo
            print('extract details from db')
    #     else:
    #         for basic_place in basic_places:
    #             details = fetch_place_details(basic_place['place_id'])
    #             if not details:
    #                 continue
    #             combined_info = {**basic_place, **details}

    #             review_texts = []
    #             for review in details['reviews_data']:
    #                 review_texts.append(f"reviewer {review['author_name']} saids: {review['review_text']}")
    #             full_description = (
    #                 f"{combined_info['name']} is located at {combined_info['full_address']}."
    #                 f" It is a {combined_info['type']},"
    #                 f" currently {'open' if combined_info['open_now'] else 'closed'},"
    #                 f" with a rating of {combined_info['rating']} based on {combined_info['user_ratings_total']} reviews."
    #                 f" You can visit their website at: {combined_info['site']} or call them at {combined_info['phone']}."
    #                 f" Here are some reviews: {' '.join(review_texts)}"
    #             )
    #             document_metadata = filter_none_metadata({key: value for key, value in combined_info.items() if key != 'reviews_data'})
    #             documents.append(Document(page_content=full_description, metadata=document_metadata))

    #     print("places with details: ", type(documents[0]), documents)

    #     # convitional chatbot
    #     # agent_with_chat_history = initialize_vector_qa(documents)
    #     # result = await agent_with_chat_history.invoke(
    #     #     {"input": user_query.query},
    #     #     {"configurable": {"sessionId": user_query.conversation_id}}
    #     # )
        
    #     # Single turn chatbot
    #     print("start with single turn chatbot")
    #     vectorstore = Chroma.from_documents(documents=documents, embedding=OpenAIEmbeddings())
    #     retriever = vectorstore.as_retriever()
    #     print("retriever finished: ", retriever)
    #     system_prompt = (
    #         "You are an assistant for recommending shops and restaurants. "
    #         "Using the following pieces of retrieved context, provide the best recommendations "
    #         "based on the user's preferences and requirements. If you don't know the answer, "
    #         "say that you don't know. Be concise and to the point."
    #         "\n\n"
    #         "{context}"
    #     )
    #     prompt = ChatPromptTemplate.from_messages(
    #         [
    #             ("system", system_prompt),
    #             ("human", "{input}"),
    #         ]
    #     )

    #     llm = ChatOpenAI(model="gpt-3.5-turbo-0125")

    #     question_answer_chain = create_stuff_documents_chain(llm, prompt)
    #     rag_chain = create_retrieval_chain(retriever, question_answer_chain)

    #     response = rag_chain.invoke({"input": user_query.query})
    #     print("\n", response["answer"])

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
