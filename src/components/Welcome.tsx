import { Button, Heading, Input, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

const Welcome = () => {
    const { setUsername } = useUserStore();

    const [name, setName] = React.useState<string>('');

    return (
        <VStack w="100%" paddingX={10}>
            <Heading mb={10}>Welcome 👋</Heading>
            <Input
                variant="rounded"
                value={name}
                onChangeText={setName}
                placeholder="What should we call you?"
            />
            <Button
                variant="ghost"
                disabled={!name}
                onPress={() => setUsername(name)}
            >
                Continue
            </Button>
        </VStack>
    );
};

export default Welcome;
