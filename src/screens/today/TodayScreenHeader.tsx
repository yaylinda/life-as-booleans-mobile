import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment/moment';
import { Heading, IconButton } from 'native-base';
import React from 'react';
import { PRESSED_BG_BLACK } from '../../styles';

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
                    bg: PRESSED_BG_BLACK,
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
                    bg: PRESSED_BG_BLACK,
                }}
                onPress={nextDay}
                disabled={isToday}
            />
        </>
    );
};

export default TodayScreenHeader;
