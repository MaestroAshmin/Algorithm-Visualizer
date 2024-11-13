# main.py
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from algorithms.sorting.bubble_sort import bubble_sort, generate_plot  # Import from bubble_sort.py
from typing import List

app = FastAPI()

# Allow CORS for specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SortRequest(BaseModel):
    array: List[int]

@app.post("/sort/bubble")
async def sort_bubble(sort_request: SortRequest):
    snapshots = bubble_sort(sort_request.array)
    images = [generate_plot(snapshot) for snapshot in snapshots]  # Generate all plots
    return JSONResponse(content={"images": images})  # Return as JSON
