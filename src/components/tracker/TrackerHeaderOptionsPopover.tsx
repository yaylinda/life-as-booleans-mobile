import { FontAwesome5 } from '@expo/vector-icons';
import invariant from 'invariant';
import { Button, Icon, Popover } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { PRESSED_BG_WHITE } from '../../styles';
import { useTrackerContext } from './useTrackerContext';
import type { PopoverTriggerProps } from '../../types';

interface TrackerOptionsPopoverProps {
    isOpen: boolean;
    trigger: (triggerProps: PopoverTriggerProps) => JSX.Element;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const TrackerHeaderOptionsPopover = ({
    isOpen,
    trigger,
    onClose,
    onDelete,
    onEdit,
}: TrackerOptionsPopoverProps) => {

    const { tracker, date } = useTrackerContext();

    invariant(tracker, 'Tracker must not be null to have options');

    const isDefaultTracker = tracker.isDefaultTracker;

    const { setYearViewData } = useUserStore();

    const openYearView = () => {
        onClose();
        setYearViewData({
            tracker: tracker,
            year: date.year(),
        });
    };

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            trigger={trigger}
        >
            <Popover.Content>
                <Popover.Arrow />
                <Popover.Body padding={0} paddingTop={2} paddingBottom={1}>
                    {/*<Button*/}
                    {/*    size="sm"*/}
                    {/*    variant="ghost"*/}
                    {/*    leftIcon={<Icon as={FontAwesome5} name="table" size="sm" />}*/}
                    {/*    justifyContent="flex-start"*/}
                    {/*    onPress={openYearView}*/}
                    {/*    _pressed={{*/}
                    {/*        bg: PRESSED_BG_WHITE,*/}
                    {/*    }}*/}
                    {/*    _text={{*/}
                    {/*        color: 'white',*/}
                    {/*    }}*/}
                    {/*    _icon={{*/}
                    {/*        color: 'white',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Show Year View*/}
                    {/*</Button>*/}
                    {!isDefaultTracker && (
                        <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="edit" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onEdit}
                            _pressed={{
                                bg: PRESSED_BG_WHITE,
                            }}
                            _text={{
                                color: 'white',
                            }}
                            _icon={{
                                color: 'white',
                            }}
                        >
                            Edit Name
                        </Button>
                    )}
                    {!isDefaultTracker && (
                        <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="trash" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onDelete}
                            _pressed={{
                                bg: PRESSED_BG_WHITE,
                            }}
                            _text={{
                                color: 'white',
                            }}
                            _icon={{
                                color: 'white',
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};

export default TrackerHeaderOptionsPopover;