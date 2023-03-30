import { extendTheme } from 'native-base';

export const theme = extendTheme({
    fontConfig: {
        Nunito: {
            100: {
                normal: 'Nunito_200ExtraLight',
                italic: 'Nunito_200ExtraLight_Italic'
            },
            200: {
                normal: 'Nunito_200ExtraLight',
                italic: 'Nunito_200ExtraLight_Italic'
            },
            300: {
                normal: 'Nunito_300Light',
                italic: 'Nunito_300Light_Italic'
            },
            400: {
                normal: 'Nunito_400Regular',
                italic: 'Nunito_400Regular_Italic'
            },
            500: {
                normal: 'Nunito_500Medium',
                italic: 'Nunito_500Medium_Italic'
            },
            600: {
                normal: 'Nunito_600SemiBold',
                italic: 'Nunito_600SemiBold_Italic'
            },
            700: {
                normal: 'Nunito_700Bold',
                italic: 'Nunito_700Bold_Italic'
            },
            800: {
                normal: 'Nunito_800ExtraBold',
                italic: 'Nunito_800ExtraBold_Italic'
            },
            900: {
                normal: 'Nunito_900Black',
                italic: 'Nunito_900Black_Italic'
            }
        }
    },
    fonts: {
        heading: 'Nunito',
        body: 'Nunito',
        mono: 'Nunito'
    },
    config: {
        initialColorMode: 'dark'
    }
});
