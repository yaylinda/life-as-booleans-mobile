import { FontAwesome } from '@expo/vector-icons';
import { FlatList, IconButton } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import WeekData from './WeekData';
import type moment from 'moment';
import AddDataKeyModal from './AddDataKeyModal';

interface WeekDataContainerProps {
    weekStart: moment.Moment;
    isCurrentWeek: boolean;
}

const ADD_BUTTON_ITEM = 'ADD_BUTTON';

const WeekDataContainer = ({ weekStart, isCurrentWeek }: WeekDataContainerProps) => {
    const { dataKeys } = useUserStore();

    const [showAddDataKeyModal, setShowAddDataKeyModal] = React.useState<boolean>(false);

    const dataItems = React.useMemo(() => {
        if (isCurrentWeek) {
            return [...dataKeys, ADD_BUTTON_ITEM];
        }
        return dataKeys;
    }, [dataKeys, isCurrentWeek]);

    return (
        <>
            <FlatList
                paddingX={2}
                data={dataItems}
                renderItem={({ item }) => (
                    item === ADD_BUTTON_ITEM ? (
                        <IconButton
                            borderRadius="full"
                            bg="coolGray.50:alpha.20"
                            _icon={{
                                as: FontAwesome,
                                name: 'plus',
                                color: 'coolGray.50'
                            }}
                            onPress={() => setShowAddDataKeyModal(true)}
                        />
                    ) : (
                        <WeekData
                            key={`week_${weekStart.valueOf()}_${item}`}
                            weekStart={weekStart}
                            dataKey={item}
                        />
                    )
                )}
            />
            <AddDataKeyModal
                isOpen={showAddDataKeyModal}
                onClose={() => setShowAddDataKeyModal(false)}
            />
        </>
    );
};

export default WeekDataContainer;
