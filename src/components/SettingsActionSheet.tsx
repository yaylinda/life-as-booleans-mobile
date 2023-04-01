import { Actionsheet, Avatar, Heading, HStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../stores/userStore';
import type { ClosableProps } from '../types';

const SettingsActionSheet = ({ isOpen, onClose }: ClosableProps) => {

    const { user, gradientColors, logout, clearData} = useUserStore();

    const doClearData = () => {
        clearData();
        onClose();
    };

    const doLogout = () => {
        logout();
        onClose();
    };

    const confirmClearData = () => Alert.alert(
        'Confirm Delete',
        'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: doClearData,
                style: 'destructive'
            }
        ]);

    const confirmLogout = () => Alert.alert(
        'Confirm Logout',
        '', [
            {
                text: 'Cancel',
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: doLogout,
                style: 'default'
            }
        ]);

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <HStack space={5} alignItems="center" justifyContent="flex-start">
                    <Avatar bg={gradientColors[0]}>
                        {user?.username[0]}
                    </Avatar>
                    <Heading>{user?.username}</Heading>
                </HStack>
                <Actionsheet.Item onPress={confirmClearData}>Clear Data</Actionsheet.Item>
                <Actionsheet.Item onPress={confirmLogout}>Logout</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default SettingsActionSheet;