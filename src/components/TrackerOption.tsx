import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton, Text, VStack } from 'native-base';
import React from 'react';
import type { TrackerValueOption } from '../types';

interface TrackerOptionProps {
    dayEpoch: string;
    trackerId: string;
    option: TrackerValueOption;
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

const TrackerOption = ({
    dayEpoch,
    trackerId,
    option,
    selectedValue,
    onSelect
}: TrackerOptionProps) => {

    const isSelected = option.value === selectedValue;

    return (
        <VStack
            key={`options_${option.value}_${trackerId}_${dayEpoch}`} justifyContent="center"
            alignItems="center"
            bg={isSelected ? 'coolGray.50:alpha.20' : undefined }
            paddingBottom={1}
            paddingX={1}
            borderRadius='md'
        >
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: option.icon,
                    color: option.color,
                    textAlign: 'center'
                }}
                _pressed={{
                    bg: undefined,
                }}
                onPress={() => onSelect(option.value)}
            />
            <Text fontSize="2xs" fontWeight='bold'>{option.label}</Text>
        </VStack>
    );
};

export default TrackerOption;
