import { HStack } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    FadeIn,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useUserStore from '../../stores/userStore';
import { BG, UNIT_PX } from '../../styles';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeader from './TrackerHeader';

import TrackerOptionsRow from './TrackerOptionsRow';
import TrackerValueSelection from './TrackerValueSelection';

import { useTrackerContext } from './useTrackerContext';

const deviceWidth = Dimensions.get('window').width;

interface TrackerSingleLineProps {
    index: number;
}

const TrackerSingleLine = ({ index }: TrackerSingleLineProps) => {

    const { tracker, dayEpoch } = useTrackerContext();

    const { getTrackerData, setTrackerData, addOrEditTrackerDialog } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>('');

    const dragX = useSharedValue(0);

    const threshold = -deviceWidth * 0.3;

    React.useEffect(() => {
        const get = async () => {
            const data = await getTrackerData(dayEpoch, tracker.id);
            setValue(data);
        };

        if (tracker.id) {
            get();
        }
    }, [dayEpoch, getTrackerData, tracker]);

    React.useEffect(() => {
        if (!addOrEditTrackerDialog.isOpen) {
            dragX.value = withTiming(0);
        }
    }, [addOrEditTrackerDialog.isOpen, dragX]);

    const onSelectOption = (value: string) => {
        setTrackerData(dayEpoch, tracker.id, value);
        setValue(value);
    };

    const gestureHander = useAnimatedGestureHandler({
        onActive: (e) => {
            if (e.translationX > 0) {
                dragX.value = withTiming(0);
            }
            dragX.value = Math.max(threshold, e.translationX);
        },
        onEnd: (e) => {
            if (e.translationX > threshold) {
                dragX.value = withTiming(0);
            }
        },
    });

    const onCloseOptions = () => {
        dragX.value = withTiming(0);
    };

    const itemContainerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: dragX.value },
        ],
    }));

    const buttonContainerStyle = useAnimatedStyle(() => {
        const buttonOpacity = Math.abs(dragX.value / threshold);

        return {
            opacity: buttonOpacity,
            transform: [
                { translateX: deviceWidth + dragX.value },
            ],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={gestureHander}>
            <Animated.View style={styles.row}>
                <Animated.View
                    style={[{}, itemContainerStyle]}
                    entering={FadeIn.delay(index * 75)}
                >
                    <HStack
                        padding={2}
                        space={2}
                        bg={BG}
                        borderRadius="xl"
                        alignItems="center"
                    >
                        <TrackerHeader />

                        <TrackerValueSelection
                            selectedValue={value}
                            onSelect={onSelectOption}
                        />
                    </HStack>
                </Animated.View>
                <Animated.View style={[styles.options, buttonContainerStyle]}>
                    <TrackerOptionsRow closeOptions={onCloseOptions} />
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    row: {
        position: 'relative',
        marginBottom: 2 * UNIT_PX,
    },
    options: {
        x: deviceWidth,
        position: 'absolute',
        height: '100%',
    },
});

export default withContext(TrackerSingleLine, TrackerProvider);