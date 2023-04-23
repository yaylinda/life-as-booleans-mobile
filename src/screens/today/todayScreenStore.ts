import moment from 'moment';
import { create } from 'zustand';

interface TodayScreenStoreData {
    date: moment.Moment;
}

interface TodayScreenStoreFunctions {
    prevDay: () => void;
    nextDay: () => void;
    goToToday: () => void;
}

type TodayScreenStoreState = TodayScreenStoreData & TodayScreenStoreFunctions;

const DEFAULT_DATA: TodayScreenStoreData = {
    date: moment().startOf('day'),
};

const useTodayScreenStore = create<TodayScreenStoreState>()((set ) => ({
    ...DEFAULT_DATA,
    prevDay: () => {
        set((state) => ({
            date: state.date
                .clone()
                .subtract(1, 'day')
                .startOf('day'),
        }));
    },
    nextDay: () => {
        set((state) => ({
            date: state.date
                .clone()
                .add(1, 'day')
                .startOf('day'),
        }));
    },
    goToToday: () => {
        set({ date: moment().startOf('day')});
    },
}));

export default useTodayScreenStore;
