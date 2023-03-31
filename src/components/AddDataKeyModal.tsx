import { Button, Input, Modal, VStack } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';

interface AddDataKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddDataKeyModal = ({isOpen, onClose}: AddDataKeyModalProps) => {
    const { addDataKey } = useUserStore();

    const [newDataKey, setNewDataKey] = React.useState<string>('');

    React.useEffect(() => {
        if (!isOpen) {
            setNewDataKey('');
        }
    }, [isOpen]);

    const onSave = () => {
        addDataKey(newDataKey);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} avoidKeyboard>
            <Modal.Content>
                <Modal.Body>
                    <VStack space={4}>
                        <Input
                            variant="rounded"
                            value={newDataKey}
                            onChangeText={setNewDataKey}
                            placeholder="Add a new tracker"
                        />
                        <Button
                            variant="ghost"
                            disabled={!newDataKey}
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

export default AddDataKeyModal;