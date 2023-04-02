import { FontAwesome } from '@expo/vector-icons';
import { Heading, HStack, IconButton } from 'native-base';
import React from 'react';
import type moment from 'moment/moment';

interface HeaderProps {
    startDate: moment.Moment;
    isFirstWeek: boolean;
    isCurrentWeek: boolean;
    prevWeek: () => void;
    nextWeek: () => void;
}

const Header = ({ startDate, isFirstWeek, isCurrentWeek, prevWeek, nextWeek }: HeaderProps) => {
    return (
        <HStack w="100%" justifyContent="space-between" alignItems="center">
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-left',
                    color: isFirstWeek ? 'white:alpha.10' : 'white',
                    textAlign: 'center'
                }}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                onPress={prevWeek}
                disabled={isFirstWeek}
            />
            <Heading>Week of {startDate.format('MMM DD')}</Heading>
            <IconButton
                borderRadius="full"
                _icon={{
                    as: FontAwesome,
                    name: 'chevron-right',
                    color: isCurrentWeek ? 'white:alpha.10' : 'white',
                    textAlign: 'center'
                }}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                onPress={nextWeek}
                disabled={isCurrentWeek}
            />
        </HStack>
    );
};

export default Header;