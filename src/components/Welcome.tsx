import { Button, Heading, HStack, IconButton, Input, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import { FontAwesome5 } from '@expo/vector-icons';

const Welcome = () => {
    const { createUser } = useUserStore();

    const [name, setName] = React.useState<string>('');

    const submitButton = (
        <IconButton
            disabled={!name}
            _icon={{
                as: FontAwesome5,
                name: 'arrow-circle-right',
                color: 'white',
                textAlign: 'center',
            }}
            _pressed={{
                bg: 'coolGray.50:alpha.10'
            }}
            onPress={() => createUser(name)}
        />
    );

    return (
        <VStack w="100%" paddingX={5} space={10}>
            <Heading>Welcome 👋</Heading>
            <HStack alignItems="center">
                <Input
                    placeholder="What should we call you?"
                    value={name}
                    onChangeText={setName}
                    InputRightElement={submitButton}
                    variant="rounded"
                    color="white"
                    borderColor="gray.200"
                    placeholderTextColor="gray.200"
                    _focus={{
                        borderColor: 'white'
                    }}
                />
            </HStack>
        </VStack>
    );
};

export default Welcome;
