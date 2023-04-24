import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { IconButton, VStack, Text } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { Tracker } from '../../types';

interface WeekViewDayProps {
    tracker: Tracker;
    date: moment.Moment;
}
const WeekViewDay = ({tracker, date}: WeekViewDayProps) => {
    const dayEpoch = `${date.valueOf()}`;

    const { getTrackerData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>();

    React.useEffect(() => {
        const get = async () => {
            const data = await getTrackerData(dayEpoch, tracker.id);
            setValue(data);
        };

        get();
    }, [dayEpoch, getTrackerData, tracker.id]);

    const hasValue = value !== undefined;
    const dayOfWeekLabel = date.format('dd')[0];
    const dayOfMonthLabel = date.format('DD');
    const isToday = date.isSame(moment(), 'day');
    const isBefore = date.isBefore(moment(), 'day');
    const isAfter = date.isAfter(moment(), 'day');

    const getIcon = () => {
        if (hasValue) {
            return tracker!.valueOptionsMap[value].icon;
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

        if (isBefore) {
            return 'white:alpha.50';
        }
    };

    return (
        <VStack alignItems="center" space={1}>
            <Text fontSize="2xs" fontWeight="black">{dayOfWeekLabel}</Text>
            <IconButton
                size='sm'
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
        </VStack>
    );
};

export default WeekViewDay;
