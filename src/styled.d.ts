import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme{
        textColor: string;
        bgColor: string;
        accentColor: string;
        positiveColor: string;
        negativeColor: string;
        tabBgColor: string;
        cardBgColor: string;
        toggleBorder: string;
        toggleInner: string;
    }

}