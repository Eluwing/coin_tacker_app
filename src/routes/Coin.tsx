import React from "react";
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import CommonErrorPage from "../error/CommonErrorPage";
import Chart from "./Chart";
import Price from "./Price";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  backface-visibility: hidden;
  border: 0.3rem solid transparent;
  border-radius: 3rem;
  border-color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 25px 0px;
  &:hover{
    transform: perspective(1px) scale3d(1.044, 1.044, 1) translateZ(0) !important;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
  rankInfoData: any;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface IRankItem{
  id:string;
  is_active:boolean;
  is_new:boolean;
  name:string;
  rank:string; 
  symbol:string;
  type:string;
}

function Coin() {
  
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData} = useQuery<InfoData>(
    ["info",coinId], 
    ()=> fetchCoinInfo(coinId),
    {
      refetchOnWindowFocus: false,
    });
  const { isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(
    ["tickers",coinId], 
    () =>fetchCoinTickers(coinId)
    ,
    {
      refetchOnWindowFocus: false,
    });

  const loading = infoLoading || tickersLoading;
  const history = useHistory();

  const [ rankData, setRankData] = useState<IRankItem[]>([]);
  const [ isError, setIsError] = useState<boolean>(false);

  useEffect(()=>{
    if(Array.isArray(rankData)){
      setRankData(state?.rankInfoData);
      setIsError(false);
    }
    else{
      setIsError(true);
    }
  },[])

  const CoinComponent = () =>{
    return (
      <Container> 
        <Helmet>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Helmet>
        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol:</span>
                <span>${infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price:</span>
                <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Suply:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
  
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>
            
            <Switch>
              <Route path={`/:coinId/price`}>
                <Price priceQuotesData={tickersData?.quotes.USD} rankInfoData={rankData}/>
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId}/>
              </Route>
            </Switch>
            <BackButton onClick={()=> history.push("/")}>back</BackButton>
            
          </>
        )}
      </Container>
    );
  }
  return (
    isError? <CommonErrorPage /> : <CoinComponent />
  );
}
export default Coin;

