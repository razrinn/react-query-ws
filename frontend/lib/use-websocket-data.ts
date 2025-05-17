import { useQuery } from '@tanstack/react-query';
import { type StockChart, type StockPrice } from '~/types';

export const useLivePriceData = (symbol: string) => {
  const { data } = useQuery<StockPrice>({
    queryKey: ['stockPrice', symbol],
    staleTime: Infinity,
  });

  return data;
};

export const useChartData = (symbol: string) => {
  const { data } = useQuery<StockChart>({
    queryKey: ['stockChart', symbol],
    staleTime: Infinity,
  });

  return data;
};
