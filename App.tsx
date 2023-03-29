import {Box, NativeBaseProvider, Text} from "native-base";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {SafeAreaView} from "react-native";
import {BaseTheme} from "./src/BaseTheme";
import config from './nativebase.config';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
    return (
        <NativeBaseProvider>
            <Text>Hello</Text>
        </NativeBaseProvider>
    );
}
