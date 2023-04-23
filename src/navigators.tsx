import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlurView } from 'expo-blur';
import { Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import DataScreen from './screens/DataScreen';
import LoadingScreen from './screens/loading/LoadingScreen';
import LoginScreen from './screens/login/LoginScreen';
import SettingsScreen from './screens/settings/SettingsScreen';
import TodayScreen from './screens/today/TodayScreen';
import useUserStore from './stores/userStore';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TabStackParamList = {
    // Home: undefined,
    Today: undefined,
    Data: undefined,
    Settings: undefined,
}

export type AppStackParamList = {
    Loading: undefined,
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
                            fontSize="2xs"
                            fontWeight="bold"
                            color={focused ? gradientColors[1] : 'white'}
                        >
                            {route.name}
                        </Text>
                    );
                },
                tabBarIcon: ({ focused, size }) => {
                    let iconName;

                    switch (route.name) {
                    case 'Today':
                        iconName = 'server';
                        break;
                    case 'Data':
                        iconName = 'chart-area';
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
                            color={focused ? gradientColors[1] : 'white'}
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
                name="Today"
                options={{ headerShown: false }}
                component={TodayScreen}
            />
            <TabStack.Screen
                name="Data"
                options={{ headerShown: false }}
                component={DataScreen}
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
    const { user, loadingFonts, loadingData } = useUserStore();

    const loading = loadingFonts || loadingData;

    return (
        <AppStack.Navigator>
            {
                loading ? (
                    <AppStack.Screen
                        name="Loading"
                        options={{ headerShown: false }}
                        component={LoadingScreen}
                    />
                ) : user ? (
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
