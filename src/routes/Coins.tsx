import React, { useEffect, useState } from "react";
import { SyntheticEvent} from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom, rankDataState } from "../atoms";
import CommonErrorPage from "../error/CommonErrorPage";

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
    background-color: ${(props)=>props.theme.cardBgColor};
    color:${(props) => props.theme.textColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    border: 1px solid white;
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
    width:128px;
    height:128px;
`;

interface ICoin{
    id?: string;
    name?: string;
    symbol?: string;
    rank?: number;
    is_new?: boolean;
    is_active?: boolean;
    type: string;

}

interface ICoinError extends ICoin{
    hard_limit?: string;
    soft_limit?: string;
    error?: string;
    block_duration?: string;
}

function Coins(){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const setRankData = useSetRecoilState(rankDataState);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const imgLoadErr = (e:SyntheticEvent<HTMLImageElement>) =>{
        e.currentTarget.src = "https://www.nteeth.com/wp-content/uploads/2013/11/dummy-image-square1.jpg";
    }
    const [ isSuccessGetData, setIsSuccessGetData] = useState<boolean>();
    const [ errorContext, setErrorContext] = useState<ICoinError[]>();

    const onCoinsLink = () => {
        setRankData(data?.slice(0,4) || []);
    };

    useEffect(()=>{
        setIsSuccessGetData(Array.isArray(data));
        if(!isSuccessGetData){
            setErrorContext(data);
        }
    },[data]);

    return(
        <Container>
            <Helmet>
                <Title>
                    Coins
                </Title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={toggleDarkAtom}>Toggle Button</button>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>                
            ):(
                <CoinsList>
                    {isSuccessGetData ?
                        (
                            data?.slice(0,100).map((coin) => (
                                <Coin key={coin.id}>
                                    <Link 
                                        onClick={onCoinsLink}
                                        to={{
                                            pathname: `/${coin.id}`,
                                            state: { 
                                                    name: coin.name,
                                                },
                                        }}                                    
                                    >
                                        <Img 
                                            src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol?.toLocaleLowerCase()}`} 
                                            onError={imgLoadErr}
                                        />
                                        {coin.name}
                                    </Link>                        
                                </Coin>)) 
                        ):(
                            <CommonErrorPage error={errorContext as any}/>                             
                        )
                    }                               
                </CoinsList>
            )}
        </Container>  
    );
}
export default Coins;

