import { Divider, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { BG } from '../../styles';
import { withContext } from '../../withContext';
import { TrackerProvider } from './TrackerContext';
import TrackerHeader from './TrackerHeader';
import TrackerValueSelection from './TrackerValueSelection';
import { useTrackerContext } from './useTrackerContext';


const Tracker = () => {

    const { tracker, dayEpoch } = useTrackerContext();

    const { getTrackerData, setTrackerData } = useUserStore();

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

    console.log(`[Tracker] renderinggg trackerId=${tracker.id} value=${value}`);

    return (
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
            <Divider bg='white:alpha.50'/>
            <TrackerValueSelection
                selectedValue={value}
                onSelect={onSelectOption}
            />
        </VStack>
    );
};

export default withContext(Tracker, TrackerProvider);
