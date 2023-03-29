import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import React from "react";
import HomeScreen from "./screens/HomeScreen";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    );
}

export const AppStackNavigator = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={HomeScreen} />
        </AppStack.Navigator>
    );
}
