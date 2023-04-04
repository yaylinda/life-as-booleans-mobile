import { FontAwesome } from '@expo/vector-icons';
import { Heading, HStack, IconButton } from 'native-base';
import React from 'react';

const SummaryScreenHeader = () => {

    return (
        <HStack w="100%" justifyContent="space-between" alignItems="center">
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
                // onPress={prevWeek}
                // disabled={isFirstWeek}
            />
            <Heading>Summary</Heading>
        </HStack>
    );
};

export default SummaryScreenHeader;
