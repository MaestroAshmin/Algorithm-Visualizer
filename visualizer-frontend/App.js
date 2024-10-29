// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import BubbleSortVisualizer from './components/BubbleSortVisualizer';

export default function App() {
    return (
        <View style={styles.container}>
            <BubbleSortVisualizer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
