import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, IconButton, Pressable, Text } from 'native-base';
import React from 'react';
import { SELECTED_BG } from '../../styles';
import { useTrackerContext } from './useTrackerContext';
import type { TrackerValueOption } from '../../types';

interface TrackerOptionProps {
    option: TrackerValueOption;
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

const TrackerOption = ({
    option,
    selectedValue,
    onSelect,
}: TrackerOptionProps) => {

    const isSelected = option.value === selectedValue;

    return (
        <Pressable
            justifyContent="center"
            alignItems="center"
            bg={isSelected ? SELECTED_BG : undefined}
            paddingBottom={1}
            borderRadius="md"
            flex={1}
            onPress={() => onSelect(option.value)}
        >
            <IconButton
                size="sm"
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: option.icon,
                    color: option.color,
                    textAlign: 'center',
                }}
                _pressed={{ bg: undefined }}
                onPress={() => onSelect(option.value)}
            />
            <Text fontSize="2xs" fontWeight="bold">{option.label}</Text>
        </Pressable>
    );
};


interface TrackerValueSelectionProps {
    selectedValue: string | undefined;
    onSelect: (value: string) => void;
}

const TrackerValueSelection = ({ selectedValue, onSelect }: TrackerValueSelectionProps) => {

    const { tracker, dayEpoch } = useTrackerContext();

    return (
        <HStack justifyContent="space-evenly" space={2} flex={1}>
            {Object.values(tracker.valueOptionsMap || [])
                .map((option: TrackerValueOption) => (
                    <TrackerOption
                        key={`options_${option.value}_${tracker.id}_${dayEpoch}`}
                        option={option}
                        selectedValue={selectedValue}
                        onSelect={onSelect}
                    />
                ))
            }
        </HStack>
    );
};

export default TrackerValueSelection;
