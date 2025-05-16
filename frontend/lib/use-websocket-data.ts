import { useQuery } from '@tanstack/react-query';
import { type StockPrice } from '~/types';

const useWebSocketData = (symbol: string) => {
  const { data } = useQuery<StockPrice>({
    queryKey: ['stockPrice', symbol],
    enabled: false,
  });

  return data;
};

export default useWebSocketData;
