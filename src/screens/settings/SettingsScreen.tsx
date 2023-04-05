import { Avatar, Button, Heading, HStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import useUserStore from '../../stores/userStore';

const SettingsScreen = () => {
    const { user, gradientColors, clearData } = useUserStore();

    const doClearData = () => {
        clearData();
    };

    const confirmClearData = () => Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete all user data? This action cannot be undone.', [
            {
                text: 'Cancel',
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onPress: () => {
                },
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: doClearData,
                style: 'destructive'
            }
        ]);

    return (
        <ScreenWrapper>
            <HStack space={5} alignItems="center" justifyContent="flex-start">
                <Avatar bg={gradientColors[0]}>
                    {user?.username[0]}
                </Avatar>
                <Heading>{user?.username}</Heading>
            </HStack>
            <Button onPress={confirmClearData}>Clear Data</Button>
        </ScreenWrapper>
    );
};

export default SettingsScreen;