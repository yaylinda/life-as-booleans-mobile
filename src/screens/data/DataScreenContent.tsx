import React from 'react';
import YearDataGrid from '../../components/yearDataGrid/YearDataGrid';
import useDataScreenStore from './dataScreenStore';

const DataScreenContent = () => {

    const { selectedTracker: tracker, year } = useDataScreenStore();

    return (
        <YearDataGrid tracker={tracker} year={year}/>
    );
};

export default DataScreenContent;