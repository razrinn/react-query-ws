import { useRef, useEffect, useState } from 'react';
import { Button } from '~/frontend/components/ui/button';
import useWebSocketData from '~/frontend/lib/use-websocket-data';
import {
  cn,
  formatPercentage,
  formatThousandSeparator,
} from '~/frontend/lib/utils';

const StockPrice = ({ symbol }: { symbol: string }) => {
  const stockPriceData = useWebSocketData(symbol);
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
    <div className={cn('border rounded p-4 flex gap-2', borderClass)}>
      <p className='font-bold'>
        {symbol}{' '}
        {stockPriceData?.currPrice
          ? formatThousandSeparator(stockPriceData.currPrice)
          : '(NO DATA)'}
      </p>
      {stockPriceData && (
        <p
          className={cn({
            'text-green-800': stockPriceData.change > 0,
            'text-red-800': stockPriceData.change < 0,
            'text-gray-800': stockPriceData.change === 0,
          })}
        >
          {formatPercentage(stockPriceData.changePercent)}
        </p>
      )}
    </div>
  );
};
export default StockPrice;
