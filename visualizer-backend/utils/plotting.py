# utils/plotting.py
import matplotlib.pyplot as plt
import io

def generate_plot(snapshots):
    # Create a plot
    plt.figure(figsize=(10, 5))
    for snapshot in snapshots:
        plt.clf()  # Clear the previous plot
        plt.bar(range(len(snapshot)), snapshot, color='skyblue')
        plt.title("Bubble Sort Visualization")
        plt.xlabel("Index")
        plt.ylabel("Value")
        plt.ylim(0, max(snapshot) + 1)  # Set y-axis limit
        plt.pause(0.1)  # Pause for a brief moment to show the current state

    # Save the final plot to a BytesIO object
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()  # Close the plot to free memory
    return buf
