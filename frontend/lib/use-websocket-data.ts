import { useQuery } from '@tanstack/react-query';
import { type StockChart, type StockPrice } from '~/types';

export const useLivePriceData = (symbol: string) => {
  const { data } = useQuery<StockPrice>({
    queryKey: ['stockPrice', symbol],
    queryFn: async () => {
      const response = await fetch(`/api/stockprice/${symbol}`);
      if (!response.ok) throw new Error('Failed to fetch stock price');
      return (await response.json()) as StockPrice;
    },
    staleTime: Infinity,
    retry: false,
  });

  return data;
};

export const useChartData = (symbol: string) => {
  const { data } = useQuery<StockChart>({
    queryKey: ['stockChart', symbol],
    queryFn: async () => {
      const response = await fetch(`/api/stockchart/${symbol}`);
      if (!response.ok) throw new Error('Failed to fetch chart data');
      return (await response.json()) as StockChart;
    },
    staleTime: Infinity,
    retry: false,
  });

  return data;
};
