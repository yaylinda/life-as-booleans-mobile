import { FontAwesome5 } from '@expo/vector-icons';
import { Button, Icon, Popover } from 'native-base';
import React from 'react';
import type { PopoverTriggerProps } from '../../types';

interface WeekDataHeaderOptionsPopoverProps {
    isOpen: boolean;
    isDefaultTracker: boolean;
    trigger: (triggerProps: PopoverTriggerProps) => JSX.Element;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const WeekDataHeaderOptionsPopover = ({
    isOpen,
    isDefaultTracker,
    trigger,
    onClose,
    onDelete,
    onEdit,
}: WeekDataHeaderOptionsPopoverProps) => {
    const [showYearView, setShowYearView] = React.useState(false);

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            trigger={trigger}
        >
            <Popover.Content>
                <Popover.Arrow />
                <Popover.Body padding={0}>
                    <Button
                        size="sm"
                        variant="ghost"
                        leftIcon={<Icon as={FontAwesome5} name="table" size="sm" />}
                        justifyContent="flex-start"
                        onPress={() => setShowYearView(false)}
                    >
                        Show Year View
                    </Button>
                    {!isDefaultTracker && (
                        <Button
                            size="sm"
                            variant="ghost"
                            leftIcon={<Icon as={FontAwesome5} name="edit" size="sm" />}
                            justifyContent="flex-start"
                            onPress={onEdit}
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
                        >
                            Delete
                        </Button>
                    )}
                </Popover.Body>
            </Popover.Content>
        </Popover>
    );
};

export default WeekDataHeaderOptionsPopover;
