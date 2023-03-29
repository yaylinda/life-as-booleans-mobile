import {NativeBaseProvider, Text, View} from "native-base";

const SplashScreen = () => {
    return (
        <NativeBaseProvider>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>SplashScreen</Text>
            </View>
        </NativeBaseProvider>
    );
}

export default SplashScreen;
