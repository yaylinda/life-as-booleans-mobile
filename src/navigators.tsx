import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { Icon, Text } from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import LandingScreen from './screens/landing/LandingScreen';
import LoginScreen from './screens/login/LoginScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import SummaryScreen from './screens/summary/SummaryScreen';
import useUserStore from './stores/userStore';
import type { BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TabStackParamList = {
    Landing: undefined,
    Summary: undefined,
    Settings: undefined,
}

export type AppStackParamList = {
    Tab: NavigatorScreenParams<TabStackParamList>,
    Login: undefined,
}

export type TabStackScreenProps<T extends keyof TabStackParamList>
    = BottomTabScreenProps<TabStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList>
    = NativeStackScreenProps<AppStackParamList, T>

const TabStack = createBottomTabNavigator<TabStackParamList>();
const AppStack = createNativeStackNavigator();

const TabStackNavigator = () => {

    const { gradientColors } = useUserStore();

    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => {
                    return (
                        <Text
                            fontSize='2xs'
                            fontWeight='bold'
                            color={focused ? gradientColors[1] : 'gray.200'}
                        >
                            {route.name}
                        </Text>
                    );
                },
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    switch (route.name) {
                    case 'Landing':
                        iconName = 'server';
                        break;
                    case 'Summary':
                        iconName = 'table';
                        break;
                    case 'Settings':
                        iconName = 'cog';
                        break;
                    }

                    return (
                        <Icon
                            as={FontAwesome5}
                            name={iconName}
                            size={size}
                            color={focused ? gradientColors[1] : 'gray.200'}
                        />
                    );
                },
                tabBarStyle: {
                    position: 'absolute',
                    paddingTop: 8,
                },
                tabBarBackground: () => (
                    <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} />
                ),
            })}
        >
            <TabStack.Screen
                name="Landing"
                options={{ headerShown: false }}
                component={LandingScreen}
            />
            <TabStack.Screen
                name="Summary"
                options={{ headerShown: false }}
                component={SummaryScreen}
            />
            <TabStack.Screen
                name="Settings"
                options={{ headerShown: false }}
                component={SettingsScreen}
            />
        </TabStack.Navigator>
    );
};

export const AppStackNavigator = () => {
    const { user } = useUserStore();

    return (
        <AppStack.Navigator>
            {
                user ? (
                    <AppStack.Screen
                        name="Tab"
                        options={{ headerShown: false }}
                        component={TabStackNavigator}
                    />
                ) : (
                    <AppStack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                        component={LoginScreen}
                    />
                )
            }
        </AppStack.Navigator>
    );
};
