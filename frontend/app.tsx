import WebsocketSettings from '~/frontend/components/websocket-settings';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StockPrice from '~/frontend/components/stock-price';
import { useState } from 'react';
import { Input } from '~/frontend/components/ui/input';
import { Button } from '~/frontend/components/ui/button';
import StockDetail from '~/frontend/components/stock-detail';

const queryClient = new QueryClient();

const App = () => {
  const [stocks, setStocks] = useState([
    'BBCA',
    'TLKM',
    'UNVR',
    'ASII',
    'BMRI',
    'GMRB',
    'ADHI',
    'BBNI',
    'SMLR',
    'PRED',
    'KGRU',
    'MNCI',
    'AADI',
    'PANI',
    'MAPA',
    'HPMI',
  ]);

  const usStocks = [
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
    'NVDA',
    'AMD',
    'INTC',
    'QCOM',
    'WMT',
    'DISH',
    'PEP',
    'TGT',
    'COST',
    'NFLX',
    'META',
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newStock = (
      e.currentTarget.elements.namedItem('stock') as HTMLInputElement
    ).value;
    setStocks((prev) => [...prev, newStock]);
    e.currentTarget.reset();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WebsocketSettings stocks={stocks} />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Live Data</h1>
        <form onSubmit={handleSubmit} className='flex gap-1'>
          <Input
            className='w-48'
            type='text'
            placeholder='ex: BBCA'
            name='stock'
            required
          />
          <Button>Add Stock</Button>
        </form>
        <div className='grid grid-cols-8 gap-4'>
          {stocks.map((stock) => (
            <StockPrice key={stock} symbol={stock} />
          ))}
        </div>
        <h1 className='text-2xl font-bold'>Static Data</h1>
        <div className='grid grid-cols-8 gap-4'>
          {usStocks.map((stock) => (
            <StockPrice key={stock} symbol={stock} />
          ))}
        </div>
        <h1 className='text-2xl font-bold'>Reuse Somewhere Else</h1>
        <div className='grid grid-cols-4 gap-4'>
          {stocks.map((stock) => (
            <StockDetail key={stock} symbol={stock} />
          ))}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
