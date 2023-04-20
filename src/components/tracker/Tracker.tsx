import { Divider, VStack } from 'native-base';
import React from 'react';
import Animated, {
    FadeIn,
    
    
    FadeOut,
    SlideInLeft,
    SlideInRight, SlideOutLeft,
    SlideOutRight,
} from 'react-native-reanimated';
import useUserStore from '../../stores/userStore';
import { BG } from '../../styles';
import { DayNavigation } from '../../types';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeader from './TrackerHeader';
import TrackerValueSelection from './TrackerValueSelection';
import { useTrackerContext } from './useTrackerContext';

const ANIMATION = {
    [DayNavigation.TODAY]: {
        entering: FadeIn,
        exiting: FadeOut,
    },
    [DayNavigation.PREV]: {
        entering: SlideInLeft,
        exiting: SlideOutRight,
    },
    [DayNavigation.NEXT]: {
        entering: SlideInRight,
        exiting: SlideOutLeft,
    },
};

const INDEX_DELAY_THRESHOLD = 5;
const DELAY_INTERVAL = 50;

const getEnteringDelay = (index: number) => {
    if (index < INDEX_DELAY_THRESHOLD) {
        return index * DELAY_INTERVAL;
    }
    return INDEX_DELAY_THRESHOLD * DELAY_INTERVAL;
};

const getExitingDelay = (index: number) => {
    if (index < INDEX_DELAY_THRESHOLD) {
        return (INDEX_DELAY_THRESHOLD - index) * DELAY_INTERVAL;
    }
    return INDEX_DELAY_THRESHOLD * DELAY_INTERVAL;
};

interface TrackerProps {
    index: number;
}

const Tracker = ({ index }: TrackerProps) => {

    const { tracker, dayEpoch } = useTrackerContext();

    const { getTrackerData, setTrackerData, dayNavigation } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>('');

    React.useEffect(() => {
        const get = async () => {
            console.log(`[Tracker][useEffect][get] calling getTrackerData: dayEpoch=${dayEpoch}, trackerId=${tracker.id}`);
            const data = await getTrackerData(dayEpoch, tracker.id);
            setValue(data);
        };

        if (tracker.id) {
            get();
        }
    }, [dayEpoch, getTrackerData, tracker]);

    const onSelectOption = (value: string) => {
        setTrackerData(dayEpoch, tracker.id, value);
        setValue(value);
    };

    return (
        <Animated.View
            entering={ANIMATION[dayNavigation].entering.delay(getEnteringDelay(index))}
            // exiting={ANIMATION[dayNavigation].exiting.delay(getExitingDelay(index))}
        >
            <VStack
                padding={2}
                paddingTop={3}
                marginBottom={2}
                space={2}
                bg={BG}
                borderRadius="xl"
                flex={1}
            >
                <TrackerHeader />
                <Divider bg="white:alpha.50" />
                <TrackerValueSelection
                    selectedValue={value}
                    onSelect={onSelectOption}
                />
            </VStack>
        </Animated.View>
    );
};

export default withContext(Tracker, TrackerProvider);
