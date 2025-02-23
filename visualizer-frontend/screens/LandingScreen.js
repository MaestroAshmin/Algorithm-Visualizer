import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LandingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Algorithm Visualizer</Text>
            <Text>Select an algorithm from the tabs above.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});

export default LandingScreen;
