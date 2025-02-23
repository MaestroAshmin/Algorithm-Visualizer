import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Searching Algorithms</Text>
            <Text>Coming soon...</Text>
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

export default SearchingScreen;
