import { useChartData } from '~/frontend/lib/use-websocket-data';

const StockChart = ({ symbol }: { symbol: string }) => {
  const chartData = useChartData(symbol);
  // console.log(chartData);
  return <h1>{symbol}</h1>;
};

StockChart.displayName = 'StockChart';
export default StockChart;
