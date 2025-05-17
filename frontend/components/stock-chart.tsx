import { useMemo } from 'react';
import { Line, LineChart, YAxis } from 'recharts';
import {
  ChartContainer,
  type ChartConfig,
} from '~/frontend/components/ui/chart';
import { useChartData } from '~/frontend/lib/use-websocket-data';

const chartConfig = {
  price: {
    label: '',
    color: '#22c55e',
  },
} satisfies ChartConfig;
const StockChart = ({ symbol }: { symbol: string }) => {
  const chartData = useChartData(symbol);

  const data = useMemo(() => {
    if (!chartData) return [];
    return chartData.prices.map((price) => ({ price, prev: chartData.prev }));
  }, [chartData]);

  return (
    <ChartContainer config={chartConfig} className='min-h-[80px] w-auto'>
      <LineChart data={data}>
        <YAxis type='number' domain={['dataMin', 'dataMax']} hide />
        <Line dataKey='price' type='monotone' stroke='#22c55e' dot={false} />
        {/* <Line dataKey='prev' type='monotone' stroke='#22c55e' dot={false} /> */}
      </LineChart>
    </ChartContainer>
  );
};

StockChart.displayName = 'StockChart';
export default StockChart;
