export interface User {
    username: string;
}

export interface ClosableProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TrackerValueOption {
    value: string;
    label: string;
    icon: string;
    iconFamily: string;
    color: string;
}

export interface Tracker {
    id: string;
    displayName: string;
    emoji: string;
    valueOptionsMap: { [key in string]: TrackerValueOption };
}
