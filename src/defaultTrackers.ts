import uuid from 'react-native-uuid';
import type { Tracker } from './types';

export const OVERALL_MOOD_DEFAULT_TRACKER: Tracker = {
    id: 'overall_mood',
    displayName: 'Overall Mood',
    emoji: '🙂',
    valueOptionsMap: {
        veryBad: {
            value: 'veryBad',
            label: 'Very Bad',
            icon: 'sad-cry',
            color: 'error.500'
        },
        bad: {
            value: 'bad',
            label: 'Bad',
            icon: 'frown',
            color: 'orange.500'
        },
        okay: {
            value: 'okay',
            label: 'Okay',
            icon: 'meh',
            color: 'yellow.400'
        },
        good: {
            value: 'good',
            label: 'Good',
            icon: 'smile',
            color: 'lime.400'
        },
        veryGood: {
            value: 'veryGood',
            label: 'Very Good',
            icon: 'smile-beam',
            color: 'green.500'
        }
    },
    isDefaultTracker: true,
};

export const DEFAULT_TRACKERS: { [key in string]: Tracker } = {
    [OVERALL_MOOD_DEFAULT_TRACKER.id]: OVERALL_MOOD_DEFAULT_TRACKER,
};

export const EMPTY_TRACKER = (name: string): Tracker => ({
    id: uuid.v4() as string,
    displayName: name,
    emoji: '🫥',
    valueOptionsMap: {
        yes: {
            value: 'yes',
            label: 'Yes',
            icon: 'check',
            color: 'green.500'
        },
        no: {
            value: 'no',
            label: 'No',
            icon: 'times',
            color: 'red.500'
        }
    },
    isDefaultTracker: false,
});