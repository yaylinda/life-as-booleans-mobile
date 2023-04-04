import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Heading, HStack, IconButton } from 'native-base';
import React from 'react';
import type { RootStackScreenProps } from '../../navigators';

const SummaryScreenHeader = () => {

    const navigation = useNavigation<RootStackScreenProps<'Summary'>['navigation']>();

    return (
        <HStack justifyContent="space-between" alignItems="center">
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-left',
                    color: 'white',
                    textAlign: 'center'
                }}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                onPress={() => navigation.navigate('Landing')}
            />
            <Heading>Summary</Heading>
            <IconButton
                borderRadius="full"
                _pressed={{
                    bg: undefined
                }}
            />
        </HStack>
    );
};

export default SummaryScreenHeader;
