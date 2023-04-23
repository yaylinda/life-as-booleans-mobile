import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import DataScreenHeader from './DataScreenHeader';

const DataScreen = () => {
    return (
        <ScreenWrapper
            header={<DataScreenHeader />}
            content={<></>}
            dialogs={<></>}
        />
    );
};

export default DataScreen;
