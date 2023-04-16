import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import moment from 'moment';
import { HStack, IconButton, Popover, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { useWeekTracker } from './useWeekTracker';
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

interface DayDataProps {
    date: moment.Moment,
    isNew: boolean;
}

const DayData = ({ date, isNew }: DayDataProps) => {

    const { tracker } = useWeekTracker();

    invariant(isNew || tracker !== null, 'A Tracker object must be given, unless creating a new Tracker');

    const dayEpoch = `${date.valueOf()}`;

    const { getTrackerData, setTrackerData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>();

    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    React.useEffect(() => {
        const get = async () => {
            const data = await getTrackerData(dayEpoch, tracker!.id);
            setValue(data);
        };

        if (tracker?.id) {
            get();
        }
    }, [dayEpoch, getTrackerData, tracker]);

    const hasValue = value !== undefined;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');
    const isToday = date.isSame(moment(), 'day');
    const isBefore = date.isBefore(moment(), 'day');
    const isAfter = date.isAfter(moment(), 'day');

    const onSelectOption = (value: string) => {
        setTrackerData(dayEpoch, tracker!.id, value);
        setValue(value);
        setOpenPopover(false);
    };

    const getIcon = () => {
        if (hasValue) {
            return tracker!.valueOptionsMap[value].icon;
        }

        if (isToday) {
            if (isNew) {
                return 'circle';
            } else {
                return 'plus';
            }
        }

        if (isBefore) {
            return 'circle';
        }

        if (isAfter) {
            return '';
        }
    };

    const getIconColor = () => {
        if (hasValue) {
            return tracker!.valueOptionsMap[value].color;
        }

        if (isToday) {
            if (isNew) {
                return 'white:alpha.50';
            } else {
                return 'white';
            }
        }

        if (isBefore) {
            return 'white:alpha.50';
        }
    };

    const dayTrackerButton = (triggerProps: { _props: never, state: { open: boolean } }) => (
        <IconButton
            size='sm'
            {...triggerProps}
            disabled={isAfter || isNew}
            borderRadius="full"
            bg={hasValue ? 'gray.50' : undefined}
            padding={1}
            _icon={{
                as: FontAwesome5,
                name: getIcon(),
                color: getIconColor(),
                textAlign: 'center',
            }}
            _pressed={{
                bg: hasValue ? 'gray.50:alpha.70' : 'white:alpha.10',
            }}
            onPress={() => setOpenPopover(true)}
        />
    );

    const renderTrackerOptions = () => (
        <VStack space={2}>
            <HStack justifyContent="space-evenly" space={2}>
                {Object.values(tracker?.valueOptionsMap || [])
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
            {!isToday && (
                <Text fontSize="2xs" fontStyle="italic">
                    Editing historical tracker data
                </Text>
            )}
        </VStack>
    );

    return (
        <VStack alignItems="center" space={1}>
            <Text fontSize="2xs" fontWeight="black">{dayOfWeekLabel}</Text>
            <Popover
                isOpen={openPopover}
                onClose={() => setOpenPopover(false)}
                trigger={dayTrackerButton}
            >
                <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                        {renderTrackerOptions()}
                    </Popover.Body>
                </Popover.Content>
            </Popover>
            <Text fontSize="2xs" fontWeight="black">{dayOfMonthLabel}</Text>
        </VStack>
    );
};

export default DayData;