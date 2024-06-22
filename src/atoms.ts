import { atom } from "recoil";

export const isDarkAtom = atom({
    key: "isDark",
    default:false,
});

export const isLightAtom = atom({
    key: "isLight",
    default:false,
});