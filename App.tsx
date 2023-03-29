import {Box, NativeBaseProvider} from "native-base";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {SafeAreaView} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <Box>Hello world</Box>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}
