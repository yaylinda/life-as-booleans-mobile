import { HStack, Select } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { BG, PRESSED_BG_BLACK_60 } from '../../styles';
import useDataScreenStore from './dataScreenStore';

interface DataScreenHeaderProps {

}

const DataScreenHeader = () => {

    const { selectedTrackerId, setSelectedTrackerId } = useDataScreenStore();

    const { trackers } = useUserStore();

    return (
        <Select
            minW="full"
            selectedValue={selectedTrackerId}
            _selectedItem={{
                bg: PRESSED_BG_BLACK_60,
                borderRadius: 'md',
            }}
            onValueChange={trackerId => setSelectedTrackerId(trackerId)}
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
