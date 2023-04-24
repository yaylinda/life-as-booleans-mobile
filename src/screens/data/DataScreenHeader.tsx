import { Select } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { PRESSED_BG_BLACK_60 } from '../../styles';
import useDataScreenStore from './dataScreenStore';

const DataScreenHeader = () => {

    const { selectedTracker, setSelectedTracker } = useDataScreenStore();

    const { trackers } = useUserStore();

    return (
        <Select

            minW="full"
            size='lg'
            selectedValue={selectedTracker.id}
            _selectedItem={{
                bg: PRESSED_BG_BLACK_60,
                borderRadius: 'md',
            }}
            onValueChange={trackerId => setSelectedTracker(trackerId)}
        >
            {Object.values(trackers).map((tracker) =>
                <Select.Item
                    key={tracker.id}
                    label={`${tracker.emoji} ${tracker.displayName}`}
                    value={tracker.id}
                />,
            )}
        </Select>
    );
};

export default DataScreenHeader;
