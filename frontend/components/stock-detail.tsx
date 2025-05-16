import { ArrowDownIcon, ArrowUpIcon, EqualIcon } from 'lucide-react';
import useWebSocketData from '~/frontend/lib/use-websocket-data';
import { cn } from '~/frontend/lib/utils';

const StockDetail = ({ symbol }: { symbol: string }) => {
  const stockPriceData = useWebSocketData(symbol);

  return (
    <div className='p-4 border rounded shadow'>
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
