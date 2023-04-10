import { Actionsheet } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import YearTrackerDataGrid from '../summary/YearTrackerDataGrid';

const YearDataActionSheet = () => {

    const { yearViewData, setYearViewData } = useUserStore();

    const isOpen = !!yearViewData;

    const onClose = () => {
        setYearViewData(null);
    };

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                {yearViewData && (
                    <YearTrackerDataGrid
                        tracker={yearViewData!.tracker}
                        year={yearViewData!.year}
                    />
                )}
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default YearDataActionSheet;
