import { atom } from "recoil";

interface ICoin{
    id?: string;
    name?: string;
    symbol?: string;
    rank?: number;
    is_new?: boolean;
    is_active?: boolean;
    type: string;
}

export const isDarkAtom = atom({
    key: "isDark",
    default:false,
});

export const rankDataState= atom<ICoin[]>({
    key: "RankData",
    default:[],
});