from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

from algorithms.sorting.bubble_sort import bubble_sort, generate_plot as bubble_plot
from algorithms.sorting.selection_sort import selection_sort, generate_plot as selection_plot

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SortRequest(BaseModel):
    array: List[int]

@app.post("/sort/bubble")
async def sort_bubble(sort_request: SortRequest):
    snapshots = bubble_sort(sort_request.array)
    images = [bubble_plot(snapshot) for snapshot in snapshots]
    return JSONResponse(content={"images": images})

@app.post("/sort/selection")
async def sort_selection(sort_request: SortRequest):
    snapshots = selection_sort(sort_request.array)
    images = [selection_plot(snapshot) for snapshot in snapshots]
    return JSONResponse(content={"images": images})
