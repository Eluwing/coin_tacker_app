import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import moment from 'moment';
import React from "react";

interface ISign {
    percentageValue: number;
}

const Tab = styled.span`
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  height: 150px;
  a {
    display: block;
  }
  span {
    display: block;
  }
`;

const TabTitle = styled.span`
    padding: 5px 0px;
`;

const InfoTitle = styled.div`
    padding: 0px 5px;
    span{
        text-align: left;
        display: block;
        font-size: xx-small;
    }
`;

const InfoPrice = styled.div`
    padding: 5px 5px;
    span:first-child {
        text-align: center;
        display: block;
        font-size: xx-large;
        margin-bottom: 5px;
    }
    span:nth-child(2) {
        font-size: xx-small;
    }
`;

const SubTitle = styled(InfoTitle)`
    padding: 0px 10%;
`;
const SubTitleLine = styled.hr`
    border-color: #D66853;
    background-color: #D66853;
    width: 80%;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10%;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const OverviewItemCurrency = styled.span`
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

const OverviewItem = styled.div<ISign>`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span:nth-child(2) {
    color: ${(props) => (props.percentageValue > 0 ? props.theme.positiveColor : props.theme.negativeColor)}; 
    margin-bottom: 5px;
  }
`;

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

interface IRankPriceProps {
    rankCoinId: string;
}

function RankPrice(props: IRankPriceProps) {

    const { rankCoinId } = props;
    const { isLoading: tickersDataLoading, data: rankTickersData } = useQuery<PriceData>(
        [rankCoinId + "Tickers", rankCoinId],
        () => fetchCoinTickers(rankCoinId)
        ,
        {
            staleTime: (60 * 1000) * 5,
            refetchOnWindowFocus: false,
        }
    );

    const setSign = (percentage: number) => {
        let sighPercentage = "";

        if (percentage >= 0) {
            sighPercentage = "▴" + percentage;
        }
        else if (percentage < 0) {
            sighPercentage = "▾" + percentage;
        }

        return sighPercentage;

    }

    const dateConvert = (date: string) => {
        var convertTargetDate = new Date(date);

        return moment(convertTargetDate).format('YYYY-MM-DD HH:mm:ss');
    }

    return(
        <>
            {tickersDataLoading ? ("Rank Data Loading...") : (
                <Tab>
                    <TabTitle>
                        {rankTickersData?.name} (Rank {rankTickersData?.rank}th Infomation)
                    </TabTitle>
                    <InfoPrice>
                        <span>${rankTickersData?.quotes?.USD?.price.toFixed(0)}</span>
                        <span>({dateConvert(rankTickersData?.last_updated as string)})</span>
                    </InfoPrice>
                    <SubTitle>
                        <span>Performance</span>
                    </SubTitle>
                    <SubTitleLine>
                    </SubTitleLine>
                    <Overview>
                        <OverviewItemCurrency >
                            <span>CHANGE</span>
                            <span>USD</span>
                        </OverviewItemCurrency>
                        <OverviewItem percentageValue={rankTickersData?.quotes?.USD?.percent_change_24h as number}>
                            <span>24H</span>
                            <span>{setSign(rankTickersData?.quotes?.USD?.percent_change_24h as number)}%</span>
                        </OverviewItem>
                        <OverviewItem percentageValue={rankTickersData?.quotes?.USD?.percent_change_7d as number}>
                            <span>7D</span>
                            <span>{setSign(rankTickersData?.quotes?.USD?.percent_change_7d as number)}%</span>
                        </OverviewItem>
                        <OverviewItem percentageValue={rankTickersData?.quotes?.USD?.percent_change_30d as number}>
                            <span>30D</span>
                            <span>{setSign(rankTickersData?.quotes?.USD?.percent_change_30d as number)}%</span>
                        </OverviewItem>
                    </Overview>
                </Tab>
            )}
        </>
    )
}

export default RankPrice;