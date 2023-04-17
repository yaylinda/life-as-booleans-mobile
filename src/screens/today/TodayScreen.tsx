import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { Heading, HStack, IconButton } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';

interface TodayScreenHeader {
    date: moment.Moment;
    prevDay: () => void;
    nextDay: () => void;
}

const TodayScreenHeader = ({ date, prevDay, nextDay }: TodayScreenHeader) => {

    const isToday = moment().isSame(date, 'day');

    return (
        <>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'chevron-left',
                    color: 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: 'black:alpha.10',
                }}
                onPress={prevDay}
            />
            <Heading>{date.format('MMM Do, YYYY')}</Heading>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome5,
                    name: 'chevron-right',
                    color: isToday ? 'white:alpha.10' : 'white',
                    textAlign: 'center',
                }}
                _pressed={{
                    bg: 'black:alpha.10',
                }}
                onPress={nextDay}
                disabled={isToday}
            />
        </>
    );
};

const TodayScreen = () => {

    const [date, setDate] = React.useState<moment.Moment>(moment());

    const prevDay = () => {
        setDate((date) =>
            date
                .clone()
                .subtract(1, 'week')
                .startOf('day'),
        );
    };

    const nextDay = () => {
        setDate((date) =>
            date
                .clone()
                .add(1, 'week')
                .startOf('day'),
        );
    };

    return (
        <ScreenWrapper
            header={
                <TodayScreenHeader
                    date={date}
                    prevDay={prevDay}
                    nextDay={nextDay}
                />
            }
            content={
                <></>
            }
        />
    );
};

export default TodayScreen;