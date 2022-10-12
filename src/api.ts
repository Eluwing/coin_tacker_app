
const BASE_URL = `https://api.coinpaprika.com/v1`;
const CHART_BASE_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins(){
    
    return fetch(`${BASE_URL}/coins`).then((response)=>{
        return response.json();
    });
}

export function fetchCoinInfo(coinId:string){

    return fetch(`${BASE_URL}/coins/${coinId}`).then((response)=>{
        return response.json();
    });

}

export function fetchCoinTickers(coinId:string){

    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response)=>{
        return response.json();
    });

}

export function fetchCoinHistory(coinId:string){
    return fetch(`${CHART_BASE_URL}?coinId=${coinId}`).then((response)=>{
        return response.json();
    });

}