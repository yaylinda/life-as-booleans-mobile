import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export const AuthStackNavigator = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="Login"
            options={{ headerShown: false}}
            component={LoginScreen}
        />
    </AuthStack.Navigator>
);

export const AppStackNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen
            name="Home"
            options={{ headerShown: false}}
            component={HomeScreen}
        />
    </AppStack.Navigator>
);
