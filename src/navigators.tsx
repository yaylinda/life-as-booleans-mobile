import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LandingScreen from './screens/LandingScreen';

const AppStack = createNativeStackNavigator();

export const AppStackNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen
            name="Landing"
            options={{ headerShown: false}}
            component={LandingScreen}
        />
    </AppStack.Navigator>
);
