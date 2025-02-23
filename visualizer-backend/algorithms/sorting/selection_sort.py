import matplotlib.pyplot as plt
import io
from typing import List
import base64

def selection_sort(arr: List[int]) -> List[List[int]]:
    arr = arr[:]  # Create a copy to avoid modifying the original array
    snapshots = [arr[:]]  # Store initial state

    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # Swap elements
        snapshots.append(arr[:])  # Store snapshot

    return snapshots

def generate_plot(data: List[int]) -> str:
    plt.figure(figsize=(10, 5))
    plt.bar(range(len(data)), data, color="skyblue")
    plt.title("Selection Sort Visualization")
    plt.xlabel("Index")
    plt.ylabel("Value")
    
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return base64.b64encode(buf.getvalue()).decode("utf-8")
