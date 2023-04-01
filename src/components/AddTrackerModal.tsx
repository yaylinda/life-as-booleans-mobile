import { Button, Input, Modal, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import type { ClosableProps } from '../types';

const AddTrackerModal = ({isOpen, onClose}: ClosableProps) => {
    const { addTracker } = useUserStore();

    const [newTracker, setNewTracker] = React.useState<string>('');

    React.useEffect(() => {
        if (!isOpen) {
            setNewTracker('');
        }
    }, [isOpen]);

    const onSave = () => {
        addTracker(newTracker);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard>
            <Modal.Content>
                <Modal.Body>
                    <VStack space={4}>
                        <Input
                            variant="rounded"
                            value={newTracker}
                            onChangeText={setNewTracker}
                            placeholder="Add a new tracker"
                        />
                        <Button
                            variant="ghost"
                            disabled={!newTracker}
                            onPress={onSave}
                        >
                            Save
                        </Button>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
};

export default AddTrackerModal;