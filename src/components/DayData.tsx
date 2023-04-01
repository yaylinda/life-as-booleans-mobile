import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { HStack, IconButton, Popover, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import type { Tracker, TrackerValueOption } from '../types';

interface DayDataProps {
    isDefaultTracker: boolean,
    date: moment.Moment,
    tracker: Tracker,
}

const DayData = ({ date, tracker }: DayDataProps) => {
    const dayEpoch = `${date.valueOf()}`;

    const { getData, setData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>();

    const [openPopover, setOpenPopover] = React.useState<boolean>(false);

    React.useEffect(() => {
        const get = async () => {
            const data = await getData(dayEpoch, tracker.id);
            setValue(data);
        };

        get();
    }, [dayEpoch, getData, tracker.id]);

    const hasValue = value !== undefined;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');
    const isToday = date.isSame(moment(), 'day');
    const isBefore = date.isBefore(moment(), 'day');
    const isAfter = date.isAfter(moment(), 'day');

    const onSelectOption = (value: string) => {
        setData(dayEpoch, tracker.id, value);
        setValue(value);
        setOpenPopover(false);
    };

    const getIcon = () => {
        if (hasValue) {
            return tracker.valueOptionsMap[value].icon;
        }

        if (isToday) {
            return 'plus';
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
            return tracker.valueOptionsMap[value].color;
        }

        if (isToday) {
            return 'coolGray.50';
        }

        if (isBefore) {
            return 'coolGray.50:alpha.50';
        }
    };

    const dayTrackerButton = (triggerProps: { _props: never, state: { open: boolean } }) => (
        <IconButton
            {...triggerProps}
            disabled={isAfter}
            borderRadius="full"
            bg={hasValue ? 'muted.50' : undefined}
            padding={1}
            _icon={{
                as: FontAwesome5,
                name: getIcon(),
                color: getIconColor(),
                textAlign: 'center'
            }}
            _pressed={{
                bg: hasValue ? 'muted.50:alpha.70' : 'coolGray.50:alpha.10'
            }}
            onPress={() => setOpenPopover(true)}
        />
    );

    const renderTrackerOptions = () => (
        <HStack justifyContent="space-evenly" space={2}>
            {
                Object.values(tracker.valueOptionsMap).map((option: TrackerValueOption) => (
                    <VStack
                        key={`options_${option.value}_${tracker.id}_${dayEpoch}`} justifyContent="center"
                        alignItems="center"
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
                                bg: 'coolGray.50:alpha.10'
                            }}
                            onPress={() => onSelectOption(option.value)}
                        />
                        <Text fontSize="2xs">{option.label}</Text>
                    </VStack>
                ))
            }
        </HStack>
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