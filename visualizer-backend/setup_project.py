import os

# Define project structure
structure = {
    "main.py": """# Main FastAPI application
from fastapi import FastAPI

app = FastAPI()
""",
    "requirements.txt": """fastapi
uvicorn
matplotlib
pydantic
""",
    "algorithms": {
        "__init__.py": "# Init file\n",
        "sorting": {
            "__init__.py": "# Init file for sorting algorithms\n",
            "bubble_sort.py": """def bubble_sort(arr):
    arr = arr[:]
    snapshots = [arr[:]]
    for i in range(len(arr) - 1):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            snapshots.append(arr[:])
    return snapshots
""",
            "quick_sort.py": """def quick_sort(arr):
    arr = arr[:]
    snapshots = []

    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        for j in range(low, high):
            if arr[j] < pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
            snapshots.append(arr[:])
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        snapshots.append(arr[:])
        return i + 1

    def quick_sort_recursive(low, high):
        if low < high:
            pi = partition(low, high)
            quick_sort_recursive(low, pi - 1)
            quick_sort_recursive(pi + 1, high)

    quick_sort_recursive(0, len(arr) - 1)
    return snapshots
""",
            "merge_sort.py": """def merge_sort(arr):
    arr = arr[:]
    snapshots = []

    def merge(left, right):
        result = []
        while left and right:
            if left[0] <= right[0]:
                result.append(left.pop(0))
            else:
                result.append(right.pop(0))
            snapshots.append(result + left + right)
        result.extend(left or right)
        snapshots.append(result)
        return result

    def merge_sort_recursive(arr):
        if len(arr) <= 1:
            return arr
        mid = len(arr) // 2
        left = merge_sort_recursive(arr[:mid])
        right = merge_sort_recursive(arr[mid:])
        return merge(left, right)

    merge_sort_recursive(arr)
    return snapshots
""",
        },
        "searching": {
            "__init__.py": "# Init file for searching algorithms\n",
            # Add searching algorithm files here later if needed
        },
    },
    "utils": {
        "__init__.py": "# Init file\n",
        "plotting.py": """from matplotlib import pyplot as plt
import io

def generate_plot(data, title="Sorting Visualization"):
    plt.figure(figsize=(10, 5))
    plt.bar(range(len(data)), data, color="skyblue")
    plt.title(title)
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    plt.close()
    return buf
""",
    },
}

# Helper function to create files and directories
def create_structure(base, structure):
    for name, content in structure.items():
        if isinstance(content, dict):
            # Create a directory
            dir_path = os.path.join(base, name)
            os.makedirs(dir_path, exist_ok=True)
            create_structure(dir_path, content)
        else:
            # Create a file and write content
            file_path = os.path.join(base, name)
            with open(file_path, 'w') as f:
                f.write(content)

# Use the current directory as the base
create_structure(".", structure)
print("Project files and folders created successfully.")
