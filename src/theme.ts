import { DefaultTheme } from "styled-components";

export const darkTheme:DefaultTheme = {
    bgColor:"#2f3640",
    textColor:"#f5f6fa",
    accentColor: "#44bd32",   
    positiveColor: "#0be881",
    negativeColor: "#ff3f34", 
    tabBgColor:"rgba(0, 0, 0, 0.5)",
    cardBgColor: "transparent",
    toggleBorder: 'rgba(255,255,255,1)',
    toggleInner: '#333',
}

export const lightTheme:DefaultTheme = {
    bgColor:"whitesmoke",
    textColor:"black",
    accentColor: "#44bd32",   
    positiveColor: "#0be881",
    negativeColor: "#ff3f34", 
    tabBgColor:"rgba(0, 0, 0, 0.5)",
    cardBgColor: "white",
    toggleBorder: '#333',
    toggleInner: '#fff',
}