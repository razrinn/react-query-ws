import { useRef, useEffect, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from 'lucide-react';
import useWebSocketData from '~/frontend/lib/use-websocket-data';
import { cn } from '~/frontend/lib/utils';
import type { StockPrice } from '~/types';
const StockDetail = ({ symbol }: { symbol: string }) => {
  const stockPriceData = useWebSocketData(symbol) as StockPrice | undefined;
  const prevPriceRef = useRef<number | null>(null);
  const [borderClass, setBorderClass] = useState<string>('');

  useEffect(() => {
    if (!stockPriceData) return;

    const currentPrice = stockPriceData.currPrice;
    const comparisonPrice = prevPriceRef.current ?? stockPriceData.prevPrice;

    if (comparisonPrice !== null && currentPrice !== comparisonPrice) {
      if (currentPrice > comparisonPrice) {
        setBorderClass('border-green-500');
      } else if (currentPrice < comparisonPrice) {
        setBorderClass('border-red-500');
      }
      // Reset animation after 2 seconds
      const timer = setTimeout(() => setBorderClass(''), 1000);
      return () => clearTimeout(timer);
    }

    prevPriceRef.current = currentPrice;
  }, [stockPriceData]);

  return (
    <div className={cn('p-4 border rounded shadow', borderClass)}>
      <h1 className='text-xl font-bold'>{symbol}</h1>
      {stockPriceData && (
        <p className='flex gap-1 items-center'>
          is currently goes{' '}
          <span
            className={cn('flex items-center gap-1', {
              'text-green-800': stockPriceData.change > 0,
              'text-red-800': stockPriceData.change < 0,
              'text-gray-800': stockPriceData.change === 0,
            })}
          >
            {stockPriceData.change > 0
              ? 'UP'
              : stockPriceData.change < 0
              ? 'DOWN'
              : 'STALE'}

            {stockPriceData.change > 0 ? (
              <ArrowUpIcon />
            ) : stockPriceData.change < 0 ? (
              <ArrowDownIcon />
            ) : (
              <EqualIcon />
            )}
          </span>
        </p>
      )}
    </div>
  );
};
StockDetail.displayName = 'StockDetail';

export default StockDetail;
