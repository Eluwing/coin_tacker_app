import React, { useEffect, useState } from "react";
import { SyntheticEvent} from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isLightAtom } from "../atoms";
import CommonErrorPage from "../error/CommonErrorPage";

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

const ToggleButton = styled.button<{ isLightMode: boolean }>`
    border: 0;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    position: absolute;
    top: 5%;
    right: -1%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    background: ${( props ) => (props.isLightMode ? '#333' : 'rgba(255,255,255,1)')};
    transition: 0.4s ease-in-out;
`;

const InnerButton = styled.div<{ isLightMode: boolean }>`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    transition: 0.4s ease-in-out;
    margin-left: ${(props) => (props.isLightMode ? '40px' : '3px')};
    background: ${(props) => (props.isLightMode ? '#fff' : '#333')};
`;

interface ICoin{
    id?: string;
    name?: string;
    symbol?: string;
    rank?: number;
    is_new?: boolean;
    is_active?: boolean;
    type: string;
    //Erorr Context
    hard_limit?: string;
    soft_limit?: string;
    error?: string;
    block_duration?: string;
}

function Coins(){
    const isLightMode = useRecoilValue(isLightAtom);
    const setLightAtom = useSetRecoilState(isLightAtom);
    const toggleLightAtom = () => {
        setLightAtom((prev) => !prev);
    }

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const imgLoadErr = (e:SyntheticEvent<HTMLImageElement>) =>{
        e.currentTarget.src = "https://www.nteeth.com/wp-content/uploads/2013/11/dummy-image-square1.jpg";
    }
    const [ isSuccessGetData, setIsSuccessGetData] = useState<boolean>();
    const [ errorContext, getErrorContext] = useState<ICoin|null>(null);
    useEffect(()=>{
        setIsSuccessGetData(Array.isArray(data));
        if(!isSuccessGetData){
            getErrorContext(data as unknown as ICoin);
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

                    <ToggleButton isLightMode={isLightMode} onClick={toggleLightAtom}>
                        <InnerButton isLightMode={isLightMode} />
                    </ToggleButton>

            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>                
            ):(
                <CoinsList>
                    {isSuccessGetData ?
                        (
                            data?.slice(0,100).map((coin) => (
                                <Coin key={coin.id}>
                                    <Link to={{
                                        pathname: `/${coin.id}`,
                                        state: { 
                                                name: coin.name,
                                                rankInfoData: data?.slice(0,4)
                                            }
                                    }}>
                                        <Img 
                                            src={`https://farisaziz12.github.io/cryptoicon-api/icons/${coin.symbol?.toLocaleLowerCase()}.png`} 
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

