export interface User {
    username: string;
    createdDateEpoch: number;
}

export interface ClosableProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TrackerValueOption {
    value: string;
    label: string;
    icon: string;
    color: string;
}

export interface Tracker {
    id: string;
    displayName: string;
    emoji: string;
    valueOptionsMap: { [key in string]: TrackerValueOption };
    isDefaultTracker: boolean;
}

export interface PopoverTriggerProps {
    _props: unknown,
    state: { open: boolean }
}

export interface YearViewData {
    tracker: Tracker,
    year: number,
}

export interface AddOrEditTrackerDialogProps {
    isOpen: boolean;
    trackerId: string | undefined;
    trackerName: string;
}

export enum DayNavigation {
    TODAY = 'TODAY',
    PREV = 'PREV',
    NEXT = 'NEXT',
}
