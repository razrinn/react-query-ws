import { useEffect, useMemo } from 'react';
import { Line, LineChart, YAxis } from 'recharts';
import {
  ChartContainer,
  type ChartConfig,
} from '~/frontend/components/ui/chart';
import { useChartData } from '~/frontend/lib/use-websocket-data';

const chartConfig = {} satisfies ChartConfig;

const StockChart = ({
  symbol,
  direction,
}: {
  symbol: string;
  direction: 'up' | 'down' | 'equal';
}) => {
  const chartData = useChartData(symbol);

  const data = useMemo(() => {
    if (!chartData) return [];
    return chartData.prices.map((price) => ({ price, prev: chartData.prev }));
  }, [chartData]);

  const strokeColor = useMemo(() => {
    if (direction === 'up') {
      return '#22c55e';
    } else if (direction === 'down') {
      return '#ef4444';
    }
    return '#78716c';
  }, [direction]);

  return (
    <ChartContainer config={chartConfig} className='min-h-[80px] w-auto'>
      <LineChart data={data}>
        <YAxis type='number' domain={['dataMin', 'dataMax']} hide />
        <Line
          isAnimationActive={false}
          dataKey='price'
          type='natural'
          stroke={strokeColor}
          dot={false}
          activeDot={false}
        />
        <Line
          isAnimationActive={false}
          dataKey='prev'
          type='natural'
          stroke='#78716c'
          opacity={0.3}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

StockChart.displayName = 'StockChart';
export default StockChart;
