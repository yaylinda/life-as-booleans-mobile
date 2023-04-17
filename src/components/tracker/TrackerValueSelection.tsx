import { FontAwesome5 } from '@expo/vector-icons';
import { HStack, IconButton, Pressable, Text } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { SELECTED_BG } from '../../styles';
import type { TrackerValueOption } from '../../types';
import { useTracker } from './useTracker';

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
        <HStack justifyContent="space-evenly" space={2} flex={1}>
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
    );
};

export default TrackerValueSelection;
