import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { Center, ScrollView, VStack } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native';
import useUserStore from '../../stores/userStore';
import SummaryScreenHeader from './SummaryScreenHeader';
import YearTrackerDataGrid from './YearTrackerDataGrid';
import type { RootStackScreenProps } from '../../navigators';

const SummaryScreen = () => {

    const route = useRoute<RootStackScreenProps<'Summary'>['route']>();

    const { tracker } = route.params;

    const { gradientColors } = useUserStore();

    return (
        <Center
            bg={{
                linearGradient: {
                    colors: gradientColors,
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
            style={{ flex: 1 }}
        >
            <SafeAreaView>
                <VStack paddingX={5} space={5}>
                    <SummaryScreenHeader />
                    <ScrollView>
                        <YearTrackerDataGrid tracker={tracker} year={moment().year()}/>
                    </ScrollView>
                </VStack>
            </SafeAreaView>
        </Center>
    );
};
export default SummaryScreen;
