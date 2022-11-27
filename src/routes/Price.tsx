import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { rankDataState } from "../atoms";
import RankPrice from "./RankPrice";

interface ISign{
    percentageValue:number;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  height: 100px;
  a {
    display: block;
  }
`;

const PastInfoContainer = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const PastInfoView = styled.div`
    padding: 10px 10px;
`;

const PastNameView = styled.div`
    padding: 10px 5px;
`;

const PastInfoName = styled.div`
    display: flex;
    flex-direction: row;
    align-items: left;
    
`;

const PastInfoPrice = styled.div<ISign>`
    display: flex;
    flex-direction: row;
    align-items: left;
    span:nth-child(2) {
        color: ${(props) =>(props.percentageValue>0? props.theme.positiveColor:props.theme.negativeColor)}; 
    }

`;


const BestInfoItem = styled.div<ISign>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px 0px;

  span:first-child {
    font-size: 40px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }

  span:nth-child(2) {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: ${(props) =>(props?.percentageValue>0? props.theme.positiveColor:props.theme.negativeColor)}; 
  }
`;

interface IMarketInfo{
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
}

interface ICoinDataProps{
    priceQuotesData? : IMarketInfo;
}

interface ICoinRankId{
    id:string;
}

function Price(props:ICoinDataProps){
    const [rankIdList, setRankIdList] = useState<ICoinRankId[]>([]);
    const percentageErrorValue: number = -999;
    const rankData = useRecoilValue(rankDataState);
    
    const getRankIdList = () => {
        rankData?.map((item:any)=>{
            setRankIdList(oldArray => [...oldArray,item.id]);
        });
    }
    
    useEffect(()=>{  
        getRankIdList();
    },[]);

    const priceCalculate = (percentage:number) => {
        let resultPrice = 0;
        const presentPrice = props.priceQuotesData?.price || percentageErrorValue;
        if(percentage<0 && percentage>percentageErrorValue){
            resultPrice = (presentPrice - ((presentPrice/100)*percentage));
            
        }
        else if(percentage>0){
            resultPrice = (presentPrice - ((presentPrice/100)*percentage));
        }
        else if(percentage === percentageErrorValue){
            resultPrice = presentPrice;
        }

        return resultPrice.toFixed(0);
    }
    const setSign = (percentage:number) => {

        if(percentage === null){
            return "null";
        }
        else{
            const tempPercentage = percentage.toFixed(0);
            let sighPercentage = "";
    
            if(percentage>=0){
                sighPercentage = "▴" + tempPercentage;
            }
            else if(percentage<0 && percentage>percentageErrorValue){
                sighPercentage = "▾" + tempPercentage;
            }
            else if(percentage === percentageErrorValue){
                sighPercentage = "Error";
            }
    
            return sighPercentage;
        }
    
    }

    const propsNullCheck = (propsValue:any) => {
        if(propsValue === null){
            return "null";
        }
        else{
            return propsValue.toFixed(0);
        }
    }
    
    return(
        <>
            <Container>
                <Overview>
                    <BestInfoItem percentageValue={props.priceQuotesData?.percent_from_price_ath || percentageErrorValue}>
                        <span>${propsNullCheck(props.priceQuotesData?.ath_price)}</span>
                        <span>{setSign(props.priceQuotesData?.percent_from_price_ath as number)}%</span>
                    </BestInfoItem>                    
                    <PastInfoContainer>
                        <PastNameView>
                            <PastInfoName>
                                <span>1Day</span>
                            </PastInfoName>
                                <span>1Week</span>
                            <PastInfoName>
                                <span>1Month</span>
                            </PastInfoName>
                        </PastNameView>
                        <PastInfoView>
                            <PastInfoPrice percentageValue={props.priceQuotesData?.percent_change_24h || percentageErrorValue}>          
                                <span>${priceCalculate(props.priceQuotesData?.percent_change_24h || percentageErrorValue)}</span>
                                (<span>{setSign(props.priceQuotesData?.percent_change_24h || percentageErrorValue)}%</span>)
                            </PastInfoPrice>
                            <PastInfoPrice percentageValue={props.priceQuotesData?.percent_change_7d || percentageErrorValue}> 
                                <span>${priceCalculate(props.priceQuotesData?.percent_change_7d || percentageErrorValue)}</span>
                                (<span>{setSign(props.priceQuotesData?.percent_change_7d || percentageErrorValue)}%</span>)
                            </PastInfoPrice>
                            <PastInfoPrice percentageValue={props.priceQuotesData?.percent_change_30d || percentageErrorValue}>                            
                                <span>${priceCalculate(props.priceQuotesData?.percent_change_30d || percentageErrorValue)}</span>
                                (<span>{setSign(props.priceQuotesData?.percent_change_30d || percentageErrorValue)}%</span>)
                            </PastInfoPrice>
                        </PastInfoView>
                    </PastInfoContainer>                    
                </Overview>
            </Container>
            <Container>
                <Tabs>
                    <RankPrice rankCoinId={rankIdList[0]?.id} />
                    <RankPrice rankCoinId={rankIdList[1]?.id} />
                </Tabs>
                <Tabs>
                    <RankPrice rankCoinId={rankIdList[2]?.id} />
                    <RankPrice rankCoinId={rankIdList[3]?.id} />
                </Tabs>
            </Container>
            
        </>
        
    )
}

export default Price;