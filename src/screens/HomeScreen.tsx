import {NativeBaseProvider, Text, View} from 'native-base';
import React from 'react';

const HomeScreen = () => (
    <NativeBaseProvider>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>HomeScreen</Text>
        </View>
    </NativeBaseProvider>
);

export default HomeScreen;
