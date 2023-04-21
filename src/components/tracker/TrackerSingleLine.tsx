import { HStack, Text } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    FadeIn,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import useUserStore from '../../stores/userStore';
import { BG } from '../../styles';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeaderOptionsButton from './TrackerHeaderOptionsButton';
import TrackerValueSelection from './TrackerValueSelection';
import { useTrackerContext } from './useTrackerContext';

interface TrackerSingleLineProps {
    index: number;
}

const TrackerSingleLine = ({ index }: TrackerSingleLineProps) => {

    const { tracker, dayEpoch } = useTrackerContext();

    const { getTrackerData, setTrackerData } = useUserStore();

    const [value, setValue] = React.useState<string | undefined>('');

    React.useEffect(() => {
        const get = async () => {
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

    const dragX = useSharedValue(0);

    const height = useSharedValue(65);

    const opacity = useSharedValue(1);

    const deviceWidth = Dimensions.get('window').width;

    const threshold = -deviceWidth * 0.25;

    const gestureHander = useAnimatedGestureHandler({
        onActive: (e) => {
            dragX.value = e.translationX;
        },
        onEnd: (e) => {
            if (threshold < e.translationX) {
                dragX.value = withTiming(0);
            } else {
                dragX.value = withTiming(-deviceWidth);
                height.value = withTiming(0);
                opacity.value = withTiming(0);
            }
        },
    });

    const itemContainerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: dragX.value,},
        ],
        height: height.value,
        opacity: opacity.value,
        marginTop: opacity.value === 1 ? 10 : 0,
    }));

    return (
        <PanGestureHandler onGestureEvent={gestureHander}>
            <Animated.View style={itemContainerStyle} entering={FadeIn.delay(index * 75)}>
                <HStack
                    padding={2}
                    marginBottom={2}
                    space={2}
                    bg={BG}
                    borderRadius="xl"
                    alignItems="center"
                >
                    <HStack flex={2.5} space={2}>
                        <Text
                            fontSize="md"
                            fontWeight="bold"
                        >
                            {tracker.emoji}
                        </Text>
                        <Text
                            fontSize="md"
                            fontWeight="bold"
                            isTruncated
                        >
                            {tracker.displayName}
                        </Text>
                    </HStack>

                    <TrackerValueSelection
                        selectedValue={value}
                        onSelect={onSelectOption}
                    />

                    <TrackerHeaderOptionsButton />
                </HStack>
            </Animated.View>
        </PanGestureHandler>
    );
};

export default withContext(TrackerSingleLine, TrackerProvider);