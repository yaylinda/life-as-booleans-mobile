import { FontAwesome5 } from '@expo/vector-icons';
import { chunk } from 'lodash';
import moment from 'moment';
import { Center, IconButton } from 'native-base';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import AddOrEditTrackerDialog from '../../components/tracker/AddOrEditTrackerDialog';
import { DEFAULT_TRACKERS } from '../../defaultTrackers';
import useUserStore from '../../stores/userStore';
import { BG, PRESSED_BUTTON_BG } from '../../styles';
import TrackerList from './TrackerList';
import TodayScreenHeader from './TodayScreenHeader';


const NUM_COLUMNS = 2;

const TodayScreen = () => {

    const { trackers, openAddTrackerDialog} = useUserStore();

    const [date, setDate] = React.useState<moment.Moment>(moment().startOf('day'));

    const isToday = moment().isSame(date, 'day');

    const trackerIdRows: string[][] = React.useMemo(() => {
        const nonDefaultTrackerIds = Object.keys(trackers)
            .filter((trackerId) => !DEFAULT_TRACKERS[trackerId]);

        // const chunkSize = nonDefaultTrackerIds.length / NUM_COLUMNS;

        const chunked = chunk(nonDefaultTrackerIds, NUM_COLUMNS);
        return [[...Object.keys(DEFAULT_TRACKERS)], ...chunked];
    }, [trackers]);

    const prevDay = () => {
        setDate((date) =>
            date
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        );
    };

    const nextDay = () => {
        setDate((date) =>
            date
                .clone()
                .add(1, 'day')
                .startOf('day'),
        );
    };

    const renderContent = () => {
        return (
            <>
                <TrackerList
                    date={date}
                    trackerIdRows={trackerIdRows}
                />
                <Center key={`btn_${date.valueOf()}`}>
                    {isToday ? (
                        <IconButton
                            bg={BG}
                            borderRadius="full"
                            _icon={{
                                as: FontAwesome5,
                                name: 'plus',
                                color: 'white',
                                textAlign: 'center',
                            }}
                            _pressed={{
                                bg: PRESSED_BUTTON_BG,
                            }}
                            onPress={openAddTrackerDialog}
                        />
                    ) : (
                        <IconButton
                            bg={BG}
                            borderRadius="full"
                            _icon={{
                                as: FontAwesome5,
                                name: 'calendar-day',
                                color: 'white',
                                textAlign: 'center',
                            }}
                            _pressed={{
                                bg: PRESSED_BUTTON_BG,
                            }}
                            onPress={() => setDate(moment().startOf('day'))}
                        />
                    )}
                </Center>
                <AddOrEditTrackerDialog />
            </>
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
            content={renderContent()}
        />
    );
};

export default TodayScreen;