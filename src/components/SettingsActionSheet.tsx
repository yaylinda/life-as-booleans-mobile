import React from 'react';
import { Actionsheet } from 'native-base';
import type { ClosableProps } from '../types';

const SettingsActionSheet = ({isOpen, onClose}: ClosableProps) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <Actionsheet.Item>Delete</Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default SettingsActionSheet;