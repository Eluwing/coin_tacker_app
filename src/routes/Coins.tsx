import { SyntheticEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { json } from "stream/consumers";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-itmes: center;
`

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color:${(props) => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a{
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover{
        a{
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
`;

const Img = styled.img`
    width:25px;
    height:25px;
    margin-right:10px;
`;

interface ICoin{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface IRank{
    id:string;
    is_active:boolean;
    is_new:boolean;
    name:string;
    rank:string; 
    symbol:string;
    type:string;
}

function Coins(){
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(()=>{
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins")
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // }, [])

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const imgLoadErr = (e:SyntheticEvent<HTMLImageElement>) =>{
        e.currentTarget.src = "https://www.nteeth.com/wp-content/uploads/2013/11/dummy-image-square1.jpg";
    }
    const [rankData, setRankData] = useState<IRank[]>();

    useEffect(()=>{
        //setRankData(data[0]);
    });

    return(
        <Container>
            <Helmet>
                <Title>
                    Coins
                </Title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>                
            ):(
                <CoinsList>
                {data?.slice(0,100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { 
                                    name: coin.name,
                                    rankInfoData: data.slice(0,4)
                                }
                        }}>
                            <img 
                                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                                onError={imgLoadErr}
                            />
                            {coin.name} &rarr;
                        </Link>                        
                    </Coin>
                ))}
                </CoinsList>
            )}
        </Container>  
    );
}
export default Coins;
