import React from 'react';
import {NativeBaseProvider, Text, View} from 'native-base';

const HomeScreen = () => (
    <NativeBaseProvider>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>HomeScreen</Text>
        </View>
    </NativeBaseProvider>
);

export default HomeScreen;
