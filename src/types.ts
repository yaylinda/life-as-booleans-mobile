export interface User {
    username: string;
}

export interface ClosableProps {
    isOpen: boolean;
    onClose: () => void;
}