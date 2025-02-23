import React from "react";
import { View, Image, StyleSheet, Button, TextInput, Text } from "react-native";

class SelectionSortVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [], // Stores sorting images from backend
            currentImageIndex: 0, // Tracks which image to display
            isSorting: false, // Sorting status
            userInput: "", // User input for array
            error: "", // Error messages
        };
        this.imageInterval = null;
    }

    // Function to handle sorting
    handleSort = async () => {
        if (this.state.isSorting) return; // Prevents multiple sorting
        this.setState({ isSorting: true, error: "" });

        const { userInput } = this.state;
        const array = userInput.split(",").map((item) => parseInt(item.trim(), 10)).filter(num => !isNaN(num));

        if (array.length === 0) {
            this.setState({ error: "Please enter a valid array of numbers.", isSorting: false });
            return;
        }

        try {
            const response = await fetch("http://192.168.1.102:8000/sort/selection", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ array }), // Send user input array
            });

            const data = await response.json();
            this.setState({ images: data.images, currentImageIndex: 0 }, () => {
                this.startImageLoop();
            });
        } catch (error) {
            console.error("Error sorting the array:", error);
            this.setState({ isSorting: false, error: "Failed to sort the array. Please try again later." });
        }
    };

    // Function to loop through images
    startImageLoop = () => {
        const { images } = this.state;

        if (images.length > 0) {
            this.imageInterval = setInterval(() => {
                this.setState((prevState) => {
                    const nextIndex = (prevState.currentImageIndex + 1) % prevState.images.length;
                    if (nextIndex === 0) {
                        clearInterval(this.imageInterval); // Stop the interval when complete
                        return { isSorting: false };
                    }
                    return { currentImageIndex: nextIndex };
                });
            }, 1000); // 1-second delay
        }
    };

    componentWillUnmount() {
        clearInterval(this.imageInterval);
    }

    render() {
        const { images, currentImageIndex, userInput, error } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Selection Sort Visualizer</Text>

                {/* Input field for user to enter numbers */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter numbers separated by commas (e.g. 5,3,8,1,2)"
                    value={userInput}
                    onChangeText={(text) => this.setState({ userInput: text })}
                />

                {/* Display error message if there's one */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Sort button */}
                <View style={styles.buttonContainer}>
                    <Button title="Start Selection Sort" onPress={this.handleSort} />
                </View>

                {/* Displaying the sorting images */}
                <View style={styles.imageContainer}>
                    {images.length > 0 && (
                        <Image
                            source={{ uri: `data:image/png;base64,${images[currentImageIndex]}` }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </View>
        );
    }
}

// Styling similar to BubbleSortVisualizer.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        width: "90%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
        borderRadius: 5,
        textAlign: "center",
    },
    buttonContainer: {
        marginBottom: 20,
        width: "80%",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        height: "80%",
    },
    image: {
        width: "90%",
        height: "70vh",
        resizeMode: "auto",
        aspectRatio: 1,
    },
    errorText: {
        color: "red",
        marginBottom: 20,
    },
});

export default SelectionSortVisualizer;
