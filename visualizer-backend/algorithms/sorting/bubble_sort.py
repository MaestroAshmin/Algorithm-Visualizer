import matplotlib.pyplot as plt
import io
from typing import List
import base64

def bubble_sort(arr: List[int]) -> List[List[int]]:
    arr = arr[:]  # Create a copy to avoid modifying the original array
    snapshots = [arr[:]]  # Initial state of the array
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            snapshots.append(arr[:])  # Append a snapshot after every swap
    return snapshots

def generate_plot(data: List[int]) -> str:
    # Increase the figure size for a larger image
    plt.figure(figsize=(10,5))  # Increase the size to make the plot bigger
    plt.bar(range(len(data)), data, color='skyblue')  # Create a bar chart
    plt.title('Bubble Sort Visualization')  # Set the title of the plot
    plt.xlabel('Index')  # X-axis label
    plt.ylabel('Value')  # Y-axis label
    buf = io.BytesIO()  # Create an in-memory buffer
    plt.savefig(buf, format='png', bbox_inches='tight')  # Save the plot to the buffer in PNG format
    buf.seek(0)  # Rewind the buffer to the beginning
    plt.close()  # Close the plot to free up resources
    return base64.b64encode(buf.getvalue()).decode('utf-8')  # Return base64-encoded PNG image
