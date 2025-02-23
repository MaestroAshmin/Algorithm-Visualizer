import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BubbleSortVisualizer from "../components/BubbleSortVisualizer";
import SelectionSortVisualizer from "../components/SelectionSortVisualizer";

const SortingScreen = () => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sorting Algorithms</Text>

            <Picker
                selectedValue={selectedAlgorithm}
                onValueChange={(itemValue) => setSelectedAlgorithm(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Bubble Sort" value="bubble" />
                <Picker.Item label="Selection Sort" value="selection" />
                <Picker.Item label="Merge Sort (Coming Soon)" value="merge" />
                <Picker.Item label="Quick Sort (Coming Soon)" value="quick" />
            </Picker>

            {selectedAlgorithm === "bubble" && <BubbleSortVisualizer />}
            {selectedAlgorithm === "selection" && <SelectionSortVisualizer />}
            {selectedAlgorithm !== "bubble" && selectedAlgorithm !== "selection" && (
                <Text style={styles.infoText}>This algorithm will be added soon.</Text>
            )}
        </View>
    );
};

// ✅ Add missing styles here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        color: "gray",
    },
});

export default SortingScreen;
