import { useQuery } from 'react-query';
import ApexChart from 'react-apexcharts';
import { fetchCoinHistory } from '../api';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}
const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    },
  );

  const xy = data?.map((item) => {
    return {
      x: new Date(item.time_close),
      y: [
        item.open.toFixed(2),
        item.high.toFixed(2),
        item.low.toFixed(2),
        item.close.toFixed(2),
      ],
    };
  });

  return (
    <div>
      {isLoading ? (
        'Loading  chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: xy,
            },
          ]}
          options={{
            title: {
              text: `${coinId} Chart`,
              align: 'left',
            },
            theme: {
              mode: 'dark',
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#0000ff',
                  downward: '#FF0000',
                },
              },
            },
            chart: {
              type: 'candlestick',
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
