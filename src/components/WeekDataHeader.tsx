import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, Input, Text } from 'native-base';
import React from 'react';
import useUserStore from '../stores/userStore';
import type { RootStackScreenProps } from '../navigators';

interface WeekDataHeaderProps {
    isNew: boolean;
    /**
     * The current name of the existing tracker, or an empty string if adding
     * a new Tracker
     */
    trackerName: string;
}

const WeekDataHeader = ({ isNew, trackerName }: WeekDataHeaderProps) => {

    const navigation = useNavigation<RootStackScreenProps<'Landing'>['navigation']>();

    const { setIsAddingTracker, addTracker } = useUserStore();

    const [newTrackerName, setNewTrackerName] = React.useState<string>(trackerName);

    const newTrackerActions = (
        <HStack space={2}>
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome,
                    name: 'trash',
                    color: 'white',
                    textAlign: 'center'
                }}
                onPress={() => setIsAddingTracker(false)}
            />
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome,
                    name: 'save',
                    color: 'white',
                    textAlign: 'center'
                }}
                onPress={() => addTracker(newTrackerName)}
                disabled={!newTrackerName}
            />
        </HStack>
    );

    if (isNew) {
        return (
            <Input
                placeholder="New Tracker Name"
                value={newTrackerName}
                onChangeText={setNewTrackerName}
                InputRightElement={newTrackerActions}
                px={0}
                py={0}
                size="xl"
                fontWeight="bold"
                lineHeight="lg"
                variant="unstyled"
                color="white"
                borderColor="gray.200"
                placeholderTextColor="gray.200"
                _focus={{
                    borderColor: 'white'
                }}
            />
        );
    }

    return (
        <HStack justifyContent="space-between">
            <Text
                textTransform="capitalize"
                fontWeight="bold"
                fontSize="lg"
            >
                {trackerName}
            </Text>
            <IconButton
                borderRadius="full"
                padding={1}
                _pressed={{
                    bg: 'white:alpha.10'
                }}
                _icon={{
                    as: FontAwesome,
                    name: 'info-circle',
                    color: 'white',
                    textAlign: 'center'
                }}
                onPress={() => navigation.navigate('Summary')}
            />
        </HStack>
    );
};

export default WeekDataHeader;
