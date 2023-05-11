import { fetchCoinHistory } from "../api";
import {useQuery} from "@tanstack/react-query"
import ApexChart from "react-apexcharts"


interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}


interface ChartProps {
    coinId: string;
}


function Chart({coinId}:ChartProps) {
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv", coinId], ()=>fetchCoinHistory(coinId))
    const exceptData = data ?? [];
    const chartData = exceptData?.map((d) => {
        return {
            x: new Date(d.time_close),
            y: [parseFloat(d.open),parseFloat(d.high),parseFloat(d.low),parseFloat(d.close)]
        }
    })
    console.log(chartData)
    return (
        <div>
        {isLoading || !data ? (
          "Loading chart..."
        ) : (
          <ApexChart
          type="candlestick"
            series={[
              {
                data:chartData ? chartData  : [] ,
              },
            ]}
            options={{
              theme: {
                mode: "dark",
              },
              chart: {
                type: 'candlestick',
                height: 350
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              title: {
                text: 'CandleStick Chart',
                align: 'left'
              },
              yaxis: {
                tooltip: {
                  enabled: true
                }
              },
              xaxis: {
                labels: {
                    show: false,
                    datetimeFormatter: {
                      month: "mmm 'yy",
                    },
                  },
              },
            }}
          />
        )}
      </div>
    );
  }

export default Chart;