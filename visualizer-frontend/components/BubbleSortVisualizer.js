import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

class BubbleSortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],  // Array to hold images from the backend
            currentImageIndex: 0,  // Current image to display
            isSorting: false,  // Flag to track sorting status
        };
        this.imageInterval = null; // Initialize the image interval
    }

    // Function to handle sorting
    handleSort = async () => {
        if (this.state.isSorting) return; // Prevent multiple simultaneous sorts
        this.setState({ isSorting: true });

        try {
            const response = await fetch('http://localhost:8000/sort/bubble', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ array: [5, 3, 8, 1, 2] }),  // Example array
            });

            const data = await response.json();
            this.setState({ images: data.images, currentImageIndex: 0 }, () => {
                this.startImageLoop();
            });
        } catch (error) {
            console.error('Error sorting the array:', error);
            this.setState({ isSorting: false }); // Reset sorting status on error
        }
    };

    // Function to loop through images
    startImageLoop = () => {
        const { images } = this.state;

        if (images.length > 0) {
            this.imageInterval = setInterval(() => {
                this.setState((prevState) => {
                    const nextIndex = (prevState.currentImageIndex + 1) % prevState.images.length;
                    // Check if we've reached the end of the images
                    if (nextIndex === 0) {
                        clearInterval(this.imageInterval); // Stop the interval when complete
                        return { isSorting: false }; // Reset sorting status
                    }
                    return { currentImageIndex: nextIndex };
                });
            }, 1000);  // 1-second delay
        }
    };

    // Clear interval on unmount
    componentWillUnmount() {
        clearInterval(this.imageInterval);
    }

    render() {
        const { images, currentImageIndex } = this.state;

        return (
            <View style={styles.container}>
                <Button title="Start Bubble Sort" onPress={this.handleSort} />
                {images.length > 0 && (
                    <Image
                        source={{ uri: `data:image/png;base64,${images[currentImageIndex]}` }}  // Use base64 images
                        style={styles.image}
                        resizeMode="contain"  // Adjusts to display the full image
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,  // Add padding to prevent button from being too close to edges
    },
    buttonContainer: {
        marginBottom: 20,  // Space between button and image
        width: '100%',  // Ensure the button takes full width
    },
    image: {
        width: '100%',  // Full width of the container
        height: '80%',  // Adjust height to fit within the screen
        aspectRatio: 1,  // Maintain aspect ratio for the image
    },
});

export default BubbleSortVisualizer;
