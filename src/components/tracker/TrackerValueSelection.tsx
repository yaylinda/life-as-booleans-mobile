import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { useTracker } from './useTracker';
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
        <VStack
            justifyContent="center"
            alignItems="center"
            bg={isSelected ? 'white:alpha.20' : undefined}
            paddingBottom={1}
            paddingX={1}
            borderRadius="md"
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
                _pressed={{
                    bg: undefined,
                }}
                onPress={() => onSelect(option.value)}
            />
            <Text fontSize="2xs" fontWeight="bold">{option.label}</Text>
        </VStack>
    );
};

const TrackerValueSelection = () => {

    const { tracker, date } = useTracker();

    const dayEpoch = `${date.valueOf()}`;

    const { getTrackerData, setTrackerData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>();

    React.useEffect(() => {
        const get = async () => {
            const data = await getTrackerData(dayEpoch, tracker.id);
            setValue(data);
        };

        if (tracker?.id) {
            get();
        }
    }, [dayEpoch, getTrackerData, tracker]);

    const onSelectOption = (value: string) => {
        setTrackerData(dayEpoch, tracker!.id, value);
        setValue(value);
    };

    return (
        <VStack space={2}>
            <HStack justifyContent="space-evenly" space={2}>
                {Object.values(tracker.valueOptionsMap || [])
                    .map((option: TrackerValueOption) => (
                        <TrackerOption
                            key={`options_${option.value}_${tracker!.id}_${dayEpoch}`}
                            option={option}
                            selectedValue={value}
                            onSelect={onSelectOption}
                        />
                    ))
                }
            </HStack>
        </VStack>
    );
};

export default TrackerValueSelection;
