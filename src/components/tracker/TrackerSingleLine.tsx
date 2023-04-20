import { HStack, Text } from 'native-base';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
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

    return (
        <Animated.View entering={FadeIn.delay(index * 75)}>
            <HStack
                padding={2}
                marginBottom={2}
                space={2}
                bg={BG}
                borderRadius="xl"
                alignItems='center'
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
    );
};

export default withContext(TrackerSingleLine, TrackerProvider);