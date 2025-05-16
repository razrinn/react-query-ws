import { Button } from '~/frontend/components/ui/button';
import useWebSocketData from '~/frontend/lib/use-websocket-data';
import {
  cn,
  formatPercentage,
  formatThousandSeparator,
} from '~/frontend/lib/utils';

const StockPrice = ({ symbol }: { symbol: string }) => {
  const stockPriceData = useWebSocketData(symbol);

  return (
    <div className='border rounded p-4 flex gap-2'>
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

StockPrice.displayName = 'StockPrice';

export default StockPrice;
