# bubble_sort.py
import matplotlib.pyplot as plt
import io
from typing import List
import base64

def bubble_sort(arr):
    arr = arr[:]
    snapshots = [arr[:]]  # Initial state
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            snapshots.append(arr[:])  # Append the current state
    return snapshots

def generate_plot(data):
    plt.figure(figsize=(10, 5))
    plt.bar(range(len(data)), data, color='skyblue')
    plt.title('Bubble Sort Visualization')
    plt.xlabel('Index')
    plt.ylabel('Value')
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return base64.b64encode(buf.getvalue()).decode('utf-8')
