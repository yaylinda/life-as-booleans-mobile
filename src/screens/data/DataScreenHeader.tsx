import { Select } from 'native-base';
import React from 'react';

interface DataScreenHeaderProps {

}

const DataScreenHeader = () => {



    return (
        <Select
            selectedValue={service}
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
                bg: 'teal.600',
                // endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={itemValue => setService(itemValue)}
        >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
        </Select>
    );
};

export default DataScreenHeader;
