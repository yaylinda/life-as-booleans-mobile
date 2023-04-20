import { FontAwesome5 } from '@expo/vector-icons';
import { FormControl, Heading, Icon, IconButton, Input, useSafeArea, VStack } from 'native-base';
import React from 'react';
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated';
import useUserStore from '../../stores/userStore';

const LoginScreen = () => {

    const safeAreaProps = useSafeArea({
        safeAreaTop: true,
    });

    const { gradientColors, createUser } = useUserStore();

    const [name, setName] = React.useState<string>('');
    const [validationError, setValidationError] = React.useState<string>('');

    const onInputChange = (value: string) => {
        setValidationError('');
        setName(value);
    };

    const isValid = (): boolean => {
        if (!name) {
            setValidationError('Please enter a tracker name');
            return false;
        }
        return true;
    };

    const onSave = () => {
        if (!isValid()) {
            return;
        }
        createUser(name);
    };

    const submitButton = (
        <IconButton
            _icon={{
                as: FontAwesome5,
                name: 'arrow-circle-right',
                color: 'white',
                textAlign: 'center',
            }}
            _pressed={{
                bg: 'white:alpha.10',
            }}
            onPress={onSave}
        />
    );

    return (
        <VStack
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1],
                },
            }}
            h="full"
            w="full"
            justifyContent="center"
            p={4}
            space={10}
            {...safeAreaProps}
        >
            <Animated.View entering={SlideInUp.delay(250)}>
                <Heading size="xl">Welcome 👋</Heading>
            </Animated.View>
            <Animated.View entering={SlideInDown.delay(750)}>
                <FormControl isInvalid={!!validationError}>
                    <Input
                        placeholder="What should we call you?"
                        value={name}
                        size="md"
                        onChangeText={onInputChange}
                        InputRightElement={submitButton}
                        variant="rounded"
                        color="white"
                        borderColor="gray.200"
                        placeholderTextColor="gray.200"
                        _focus={{
                            borderColor: 'white',
                        }}
                    />
                    <FormControl.ErrorMessage leftIcon={<Icon as={FontAwesome5} name="exclamation-circle" size="xs" />}>
                        {validationError}
                    </FormControl.ErrorMessage>
                </FormControl>
            </Animated.View>
        </VStack>
    );
};

export default LoginScreen;