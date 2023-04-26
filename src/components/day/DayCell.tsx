import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { IconButton, Text, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import type { Tracker } from '../../types';

export enum DayType {
    WEEK = 'WEEK',
    MONTH = 'MONTH',
}

interface DayCellProps {
    tracker: Tracker;
    date: moment.Moment;
    dayType: DayType;
}

const DayCell = ({ tracker, date, dayType }: DayCellProps) => {
    const dayEpoch = `${date.valueOf()}`;

    const { getTrackerData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>();

    React.useEffect(() => {
        const get = async () => {
            const data = await getTrackerData(dayEpoch, tracker.id);
            setValue(data);
            // console.log(`${dayType} - ${date.date()}`);
        };

        if (date.isAfter(moment(), 'day')) {
            return;
        }

        if (dayType === DayType.MONTH && date.isBefore(moment(), 'month')) {
            return;
        }

        get();

        /* eslint-disable react-hooks/exhaustive-deps */
    }, [tracker.id]);

    const hasValue = value !== undefined;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');
    const isToday = date.isSame(moment(), 'day');
    const isBefore = date.isBefore(moment(), 'day');
    const isAfter = date.isAfter(moment(), 'day');
    const isSameMonth = date.isSame(moment(), 'month');

    const getIcon = () => {
        if (hasValue) {
            return tracker.valueOptionsMap[value].icon;
        }

        if (isToday || isBefore) {
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

        if (isToday || isBefore) {
            return 'white:alpha.50';
        }
    };

    const getContent = () => {
        return (
            <>
                {dayType === DayType.WEEK && (
                    <Text fontSize="2xs" fontWeight="black">
                        {dayOfWeekLabel}
                    </Text>
                )}
                <IconButton
                    size="sm"
                    disabled
                    borderRadius="full"
                    bg={hasValue ? 'gray.50' : undefined}
                    padding={1}
                    _icon={{
                        as: FontAwesome5,
                        name: getIcon(),
                        color: getIconColor(),
                        textAlign: 'center',
                    }}
                />
                <Text fontSize="2xs" fontWeight="black">{dayOfMonthLabel}</Text>
            </>
        );
    };

    return (
        <VStack flex={1} alignItems="center" space={0.5}>
            {isSameMonth && getContent()}
        </VStack>
    );
};

export default DayCell;
