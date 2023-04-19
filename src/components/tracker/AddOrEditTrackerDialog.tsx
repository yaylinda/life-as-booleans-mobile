import { FontAwesome5 } from '@expo/vector-icons';
import { Button, IconButton, Input, Modal } from 'native-base';
import React from 'react';
import useUserStore from '../../stores/userStore';
import { BG, PRESSED_BUTTON_BG } from '../../styles';

const AddOrEditTrackerDialog = () => {
    const { addOrEditTrackerDialog, closeAddOrEditTrackerDialog } = useUserStore();

    const isEdit = !!addOrEditTrackerDialog.trackerId;

    return (
        <Modal
            isOpen={addOrEditTrackerDialog.isOpen}
            onClose={closeAddOrEditTrackerDialog}
            avoidKeyboard
        >
            <Modal.Content>
                <Modal.Header>
                    {isEdit ? 'Update Tracker Name' : 'Add New Tracker'}
                </Modal.Header>
                <Modal.Body>
                    <Input />
                </Modal.Body>
                <Modal.Footer>
                    <IconButton
                        bg={BG}
                        borderRadius="full"
                        _icon={{
                            as: FontAwesome5,
                            name: 'times',
                            color: 'red.500',
                            textAlign: 'center',
                        }}
                        _pressed={{
                            bg: PRESSED_BUTTON_BG,
                        }}
                    />
                    <IconButton
                        bg={BG}
                        borderRadius="full"
                        _icon={{
                            as: FontAwesome5,
                            name: 'check',
                            color: 'green.500',
                            textAlign: 'center',
                        }}
                        _pressed={{
                            bg: PRESSED_BUTTON_BG,
                        }}
                    />
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default AddOrEditTrackerDialog;