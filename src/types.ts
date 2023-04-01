export interface User {
    username: string;
}

export interface ClosableProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TrackValueOption {
    label: string;
    icon: string;
    color: string;
}

export interface Tracker {
    id: string;
    displayName: string;
    emoji: string;
    valueOptions: TrackValueOption[];
}
