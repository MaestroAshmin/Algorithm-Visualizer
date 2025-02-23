import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LandingScreen from "./screens/LandingScreen";
import SortingScreen from "./screens/SortingScreen";
import SearchingScreen from "./screens/SearchingScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#007BFF",
                    tabBarIndicatorStyle: { backgroundColor: "#007BFF" },
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                }}
            >
                <Tab.Screen name="Home" component={LandingScreen} />
                <Tab.Screen name="Sorting" component={SortingScreen} />
                <Tab.Screen name="Searching" component={SearchingScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
