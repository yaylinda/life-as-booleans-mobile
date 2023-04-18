import { HStack, ScrollView } from 'native-base';
import React from 'react';
import StaggerWrapper from '../../components/animations/StaggerWrapper';
import Tracker from '../../components/tracker/Tracker';
import type moment from 'moment';

interface TodayScreenContentProps {
    date: moment.Moment;
    trackerIdRows: string[][];
}

const TodayScreenContent = ({ date, trackerIdRows }: TodayScreenContentProps) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            paddingX={2}
        >
            <StaggerWrapper>
                {trackerIdRows.map((ids) => (
                    <HStack flex={1} space={2} key={`${ids}_${date.valueOf()}`}>
                        {ids.map((trackerId) => (
                            <Tracker
                                key={`${trackerId}_${date.valueOf()}`}
                                value={{ trackerId, date }}
                            />
                        ))}
                    </HStack>
                ))}
            </StaggerWrapper>
        </ScrollView>
    );
};

export default TodayScreenContent;