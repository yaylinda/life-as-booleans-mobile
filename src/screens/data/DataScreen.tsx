import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import DataScreenContent from './DataScreenContent';
import DataScreenHeader from './DataScreenHeader';

const DataScreen = () => {
    return (
        <ScreenWrapper
            header={<DataScreenHeader />}
            content={<DataScreenContent />}
            dialogs={<></>}
        />
    );
};

export default DataScreen;
