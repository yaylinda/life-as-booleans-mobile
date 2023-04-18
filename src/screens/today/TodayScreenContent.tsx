import { HStack, ScrollView, VStack } from 'native-base';
import React from 'react';
import StaggerWrapper from '../../components/animations/StaggerWrapper';
import Tracker from '../../components/tracker/Tracker';
import { DEFAULT_TRACKERS } from '../../stores/userStore';
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
                <Tracker
                    key={`${DEFAULT_TRACKERS['overall_mood'].id}_${date.valueOf()}`}
                    value={{ trackerId: DEFAULT_TRACKERS['overall_mood'].id, date }}
                />


                <HStack flex={1} space={2}>

                    <VStack flex={1}>
                        <StaggerWrapper>
                            {trackerIdRows[0].map((trackerId) => (
                                <Tracker
                                    key={`${trackerId}_${date.valueOf()}`}
                                    value={{ trackerId, date }}
                                />
                            ))}
                        </StaggerWrapper>
                    </VStack>

                    <VStack flex={1}>
                        <StaggerWrapper>
                            {trackerIdRows[1].map((trackerId) => (
                                <Tracker
                                    key={`${trackerId}_${date.valueOf()}`}
                                    value={{ trackerId, date }}
                                />
                            ))}
                        </StaggerWrapper>
                    </VStack>
                </HStack>
            </StaggerWrapper>
        </ScrollView>
    );
};

export default TodayScreenContent;