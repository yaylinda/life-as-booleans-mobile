import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { Avatar,  Center, Heading,  IconButton, Text,  VStack } from 'native-base';
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
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: doClearData,
                style: 'destructive',
            },
        ]);

    if (!user) {
        return;
    }

    return (
        <ScreenWrapper>
            <VStack space={5} alignItems="center" justifyContent="center" mb={10}>
                <Avatar bg={gradientColors[1]} textAlign="center" size="lg" mt={5}>
                    <Heading size="xl">{user.username[0]}</Heading>
                </Avatar>
                <VStack space={2} alignItems="center" justifyContent="center">
                    <Heading>{user.username}</Heading>
                    <Text>Tracking since {moment(user.createdDateEpoch).format('MMM Do, YYYY')}</Text>
                </VStack>
            </VStack>
            <Center>
                <IconButton
                    size="lg"
                    borderRadius="full"
                    padding={5}
                    _icon={{
                        as: FontAwesome5,
                        name: 'trash',
                        color: 'white',
                        textAlign: 'center',
                    }}
                    _pressed={{
                        bg: 'black:alpha.10',
                    }}
                    onPress={confirmClearData}
                />
            </Center>
        </ScreenWrapper>
    );
};

export default SettingsScreen;