
import { ScrollView, Stagger } from 'native-base';
import React from 'react';
import TrackerRow from '../../components/tracker/TrackerRow';
import  { DEFAULT_TRACKERS } from '../../stores/userStore';
import type moment from 'moment';

interface TodayScreenContentProps {
    date: moment.Moment;
    trackerIdRows: string[][];
}

const TodayScreenContent = ({date, trackerIdRows}: TodayScreenContentProps) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            paddingX={2}
        >
            <Stagger
                visible={true}
                initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34,
                }}
                animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: 'spring',
                        mass: 0.8,
                        stagger: {
                            offset: 30,
                        },
                    },
                }}
                exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 100,
                        stagger: {
                            offset: 30,
                        },
                    },
                }}>
                <TrackerRow
                    key={`${DEFAULT_TRACKERS['overall_mood'].id}_${date.valueOf()}`}
                    date={date}
                    trackerIds={[DEFAULT_TRACKERS['overall_mood'].id]}
                />
                {trackerIdRows.map((trackerIds) => (
                    <TrackerRow
                        key={`${trackerIds}_${date.valueOf()}`}
                        date={date}
                        trackerIds={trackerIds}
                    />
                ))}
            </Stagger>
        </ScrollView>
    );
};

export default TodayScreenContent;