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
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId),
  );
  return (
    <div>
      {isLoading ? (
        'Loading  chart...'
      ) : (
        <ApexChart
          type="line"
          series={[{ name: 'Price', data: data?.map((price) => price.close) }]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },

            grid: {
              show: false,
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {
                show: false,
              },
              categories: data?.map((price) => price.time_close),
              type: 'datetime',
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['blue'],
                stops: [0, 100],
              },
            },
            colors: ['white'],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
