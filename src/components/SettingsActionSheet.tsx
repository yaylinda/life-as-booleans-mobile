import { Actionsheet, Avatar, Heading, HStack } from 'native-base';
import React from 'react';
import { Alert } from 'react-native';
import useUserStore from '../stores/userStore';
import type { ClosableProps } from '../types';

const SettingsActionSheet = ({ isOpen, onClose }: ClosableProps) => {

    const { user, gradientColors, clearData} = useUserStore();

    const doClearData = () => {
        clearData();
        onClose();
    };

    const confirmClearData = () => Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete all user data? This action cannot be undone.', [
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
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default SettingsActionSheet;