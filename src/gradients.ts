
interface ColorPair {
    [key: string]: [string, string];
}

interface ColorGradients {
    light: ColorPair;
    dark: ColorPair;
}

const gradients: ColorGradients = {
    light: {
        cyan2teal: ['cyan.400', 'teal.200'],
        orange2amber: ['orange.400', 'amber.200'],
        blue2lightBlue: ['blue.800', 'lightBlue.300'],
        violet2lightBlue: ['violet.800', 'lightBlue.300'],
        emerald2lime: ['emerald.400', 'lime.200'],
        fuchsia2pink: ['fuchsia.400', 'pink.200'],
        lightBlue2cyan: ['lightBlue.400', 'cyan.200'],
        cyan2yellow: ['cyan.300', 'yellow.200'],
        rose2red: ['rose.400', 'red.200'],
        orange2yellow: ['orange.400', 'yellow.200'],
        fuchsia2violet: ['fuchsia.400', 'violet.200'],
        green2lime: ['green.400', 'lime.200'],
        darkBlue2indigo: ['darkBlue.400', 'indigo.200'],
        teal2violet: ['teal.400', 'violet.200'],
        emerald2teal: ['emerald.400', 'teal.200'],
        rose2orange: ['rose.400', 'orange.300'],
        indigo2red: ['indigo.400', 'red.200'],
        darkBlue2blue: ['darkBlue.400', 'blue.200'],
        darkBlue2teal: ['darkBlue.400', 'teal.200'],
        violet2fuchsia: ['violet.400', 'fuchsia.200'],
        green2yellow: ['green.400', 'yellow.200'],
        purple2red: ['purple.400', 'red.200'],
        teal2lime: ['teal.400', 'lime.200'],
        amber2yellow: ['amber.400', 'yellow.200'],
        cyan2lightBlue: ['cyan.400', 'lightBlue.200'],
    },
    dark: {
        cyan2teal: ['cyan.600', 'teal.300'],
        orange2amber: ['orange.600', 'amber.300'],
        blue2lightBlue: ['blue.900', 'lightBlue.500'],
        violet2lightBlue: ['violet.900', 'lightBlue.500'],
        emerald2lime: ['emerald.600', 'lime.300'],
        fuchsia2pink: ['fuchsia.600', 'pink.300'],
        lightBlue2cyan: ['lightBlue.600', 'cyan.300'],
        cyan2yellow: ['cyan.400', 'yellow.300'],
        rose2red: ['rose.600', 'red.300'],
        orange2yellow: ['orange.600', 'yellow.300'],
        fuchsia2violet: ['fuchsia.600', 'violet.300'],
        green2lime: ['green.600', 'lime.300'],
        darkBlue2indigo: ['darkBlue.600', 'indigo.300'],
        teal2violet: ['teal.600', 'violet.300'],
        emerald2teal: ['emerald.600', 'teal.300'],
        rose2orange: ['rose.600', 'orange.400'],
        indigo2red: ['indigo.500', 'red.200'],
        darkBlue2blue: ['darkBlue.600', 'blue.300'],
        darkBlue2teal: ['darkBlue.600', 'teal.300'],
        violet2fuchsia: ['violet.600', 'fuchsia.300'],
        green2yellow: ['green.600', 'yellow.300'],
        purple2red: ['purple.600', 'red.300'],
        teal2lime: ['teal.600', 'lime.300'],
        amber2yellow: ['amber.600', 'yellow.300'],
        cyan2lightBlue: ['cyan.600', 'lightBlue.300'],
    },
};

export const getRandomGradient = (colorTheme: 'light' | 'dark'): [string, string] => {
    const colorKeys = Object.keys(gradients[colorTheme]);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const randomKey = colorKeys[randomIndex];
    return gradients[colorTheme][randomKey];
};
