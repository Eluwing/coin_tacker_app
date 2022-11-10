import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import React from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps{
    coinId: string;
}

interface IChart{
    time_open:string;
    time_close:string;
    open:number;
    high:number;
    low:number;
    close:number;
    volume:number;
    market_cap:number;
}


function Chart({coinId}: ChartProps){
    const isDark = useRecoilValue(isDarkAtom);

    const { isLoading: chartLoading, data: chartData} = useQuery<IChart[]>(["ohlcv",coinId], () => 
        fetchCoinHistory(coinId)     
    );
    
    return(
        <>
            <div>
                {chartLoading ? ("Loading chart...") : (
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name:"price",
                                data:chartData?.map((data) => data.close) as number[]
                            },                
                        ]}
                        options={{
                            theme:{
                                mode: isDark ? "dark":"light",
                            },
                            chart:{
                                height: 500,
                                width:500,
                                toolbar:{
                                    show:false,
                    
                                },
                                background:"transparent",
                            },
                            grid:{
                                show:false,
                            },
                            stroke:{
                                curve:"smooth",
                                width: 4,
                            },
                            yaxis:{
                                show:false,
                            },
                            xaxis:{
                                axisBorder:{
                                    show:false,
                                }
                                ,
                                axisTicks:{
                                    show:false,
                                },
                                labels:{
                                    show:false,

                                },
                                type:"datetime",
                                categories:chartData?.map((data) => data.time_close)
                            
                            },
                            fill:{
                                type:"gradient",
                                gradient:{
                                    gradientToColors:["blue"],
                                    stops:[0,100],
                                },
                                
                                
                            },
                            colors:["red"],
                            tooltip:{
                                y:{
                                    formatter: (value) => `$${value.toFixed(2)}` 
                                },
                                x:{
                                    format: 'dd/MM/yy HH:mm'
                                }
                            },
                        }}
                    >

                    </ApexChart>
                )}
            </div>
        </>
        
        
    )
}

export default Chart;