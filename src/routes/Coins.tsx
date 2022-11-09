import React from "react";
import { SyntheticEvent} from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps{
    toggleDark: ()=>void;
}

function Coins({toggleDark}:ICoinsProps){
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

    return(
        <Container>
            <Helmet>
                <Title>
                    Coins
                </Title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={toggleDark}>Toggle Button</button>
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
                                    rankInfoData: data?.slice(0,4)
                                }
                        }}>
                            <Img 
                                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} 
                                onError={imgLoadErr}
                            />
                            {coin.name}
                        </Link>                        
                    </Coin>
                ))}
                </CoinsList>
            )}
        </Container>  
    );
}
export default Coins;

