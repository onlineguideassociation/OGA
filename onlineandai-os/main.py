
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# --- Mock Database ---
# In a real application, this would be a proper database like PostgreSQL or MongoDB.
mock_db = {
    "tours": [
        {"id": 1, "name": "Angkor Wat Sunrise Discovery", "location": "Siem Reap", "price": 45, "description": "Witness the breathtaking sunrise over Angkor Wat and explore the main temple complex.", "guide_name": "Sokha", "interests": ["history", "temples", "sunrise"]},
        {"id": 2, "name": "Siem Reap Street Food Journey", "location": "Siem Reap", "price": 30, "description": "A guided tour of the best street food stalls in Siem Reap.", "guide_name": "Lina", "interests": ["food", "local culture"]},
        {"id": 3, "name": "Phnom Penh Historical City Tour", "location": "Phnom Penh", "price": 40, "description": "Explore the Royal Palace, Silver Pagoda, and the tragic history of the Killing Fields.", "guide_name": "Chen", "interests": ["history", "city", "culture"]},
        {"id": 4, "name": "Koh Rong Island Hopping Adventure", "location": "Sihanoukville", "price": 60, "description": "Discover the pristine beaches and clear waters of the Koh Rong archipelago.", "guide_name": "Vibol", "interests": ["beach", "snorkeling", "boat trip"]},
        {"id": 5, "name": "Kampot Pepper Plantation & Countryside", "location": "Kampot", "price": 35, "description": "Visit a world-famous pepper plantation and explore the scenic countryside.", "guide_name": "Srey", "interests": ["nature", "food", "countryside"]},
    ],
    "guides": [
        {"id": 1, "name": "Sokha", "location": "Siem Reap", "expertise": ["temples", "history"], "languages": ["Khmer", "English"]},
        {"id": 2, "name": "Lina", "location": "Siem Reap", "expertise": ["food", "local culture"], "languages": ["Khmer", "English", "French"]},
        {"id": 3, "name": "Chen", "location": "Phnom Penh", "expertise": ["history", "city tours"], "languages": ["Khmer", "English", "Mandarin"]},
        {"id": 4, "name": "Vibol", "location": "Sihanoukville", "expertise": ["beaches", "snorkeling"], "languages": ["Khmer", "English"]},
        {"id": 5, "name": "Srey", "location": "Kampot", "expertise": ["nature", "agriculture"], "languages": ["Khmer", "English"]},
    ]
}

# --- Pydantic Models for Request and Response
class AiTask(BaseModel):
    type: str
    payload: Dict[str, Any]

class TourSearchResponse(BaseModel):
    tours: List[Dict[str, Any]]

class AiResponse(BaseModel):
    taskType: str
    result: Dict[str, Any]

# --- API Endpoints ---
@app.post("/api/ai/run", response_model=AiResponse)
async def run_ai_task(task: AiTask):
    """
    Endpoint to run various AI-powered tasks.
    This simulates calling a powerful AI model (like Gemini, OpenAI, Claude).
    """
    task_type = task.type
    payload = task.payload

    # Simulate AI processing based on task type
    if task_type == "smart_itinerary":
        # In a real scenario, this would involve complex logic and maybe multiple AI calls.
        location = payload.get("location", "Cambodia")
        duration = int(payload.get("duration", 1))
        interests = payload.get("interests", "culture")

        # Find relevant tours from our mock DB
        relevant_tours = [
            tour for tour in mock_db["tours"]
            if location.lower() in tour["location"].lower()
        ]

        # Simplified itinerary generation
        days = []
        for i in range(1, duration + 1):
            days.append({
                "day": i,
                "theme": f"Exploring {location}'s {interests}",
                "morning": {"activity": "Visit a local market", "description": "Experience the local morning buzz."},
                "afternoon": {"activity": "Explore a key landmark", "description": f"Discover the history of {location}."},
                "evening": {"activity": "Dinner at a recommended restaurant", "description": "Enjoy local cuisine."},
            })

        return {
            "taskType": task_type,
            "result": {
                "itinerary": {
                    "location": location,
                    "duration": duration,
                    "interests": interests,
                    "days": days
                },
                "tours": relevant_tours
            }
        }

    # Add more task handlers here as we build them out
    elif task_type in ["tour_promotion", "family_activities", "review_reply"]:
         return {
            "taskType": task_type,
            "result": {"message": f"AI task '{task_type}' completed successfully.", "details": "This is a simulated response."}
        }

    raise HTTPException(status_code=400, detail="Invalid task type")


@app.get("/api/tours/search", response_model=TourSearchResponse)
async def search_tours(interest: str):
    """
    Searches for tours based on a user's interest.
    """
    if not interest:
        return {"tours": []}

    search_term = interest.lower()
    matching_tours = [
        tour for tour in mock_db["tours"]
        if any(search_term in i for i in tour["interests"])
    ]

    if not matching_tours:
        # If no direct match, try a broader search in description
         matching_tours = [
            tour for tour in mock_db["tours"]
            if search_term in tour["description"].lower()
        ]

    return {"tours": matching_tours}

# --- Static file serving ---
# In a real Replit deployment, you would configure replit.nix to handle this.
# For local dev, you might use StaticFiles.
# from fastapi.staticfiles import StaticFiles
# app.mount("/", StaticFiles(directory="public", html=True), name="static")

