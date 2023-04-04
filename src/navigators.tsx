import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LandingScreen from './screens/LandingScreen';
import SummaryScreen from './screens/SummaryScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Landing: undefined,
    Summary: undefined,
}

export type RootStackScreenProps<T extends keyof RootStackParamList>
    = NativeStackScreenProps<RootStackParamList, T>;

// export type LandingNavigationProps = NativeStackScreenProps<RootStackParamList, 'Landing'>;
// export type SummaryNavigationProps = NativeStackScreenProps<RootStackParamList, 'Summary'>;

const AppStack = createNativeStackNavigator<RootStackParamList>();

export const AppStackNavigator = () => (
    <AppStack.Navigator>
        <AppStack.Screen
            name="Landing"
            options={{ headerShown: false}}
            component={LandingScreen}
        />
        <AppStack.Screen
            name="Summary"
            options={{ headerShown: false}}
            component={SummaryScreen}
        />
    </AppStack.Navigator>
);
