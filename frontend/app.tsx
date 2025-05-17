import WebsocketSettings from '~/frontend/components/websocket-settings';
import './styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StockPrice from '~/frontend/components/stock-price';
import StockDetail from '~/frontend/components/stock-detail';

const queryClient = new QueryClient();

const App = () => {
  const idStocks = [
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
  ];

  const usStocks = [
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
    'NVDA',
    'AMD',
    'META',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <WebsocketSettings stocks={idStocks} />
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Live Data</h1>

        <div className='grid grid-cols-4 2xl:grid-cols-8 gap-4'>
          {idStocks.map((stock) => (
            <StockPrice key={stock} symbol={stock} />
          ))}
        </div>
        <h1 className='text-2xl font-bold'>Static Data</h1>
        <div className='grid grid-cols-4 2xl:grid-cols-8 gap-4'>
          {usStocks.map((stock) => (
            <StockPrice key={stock} symbol={stock} />
          ))}
        </div>
        <h1 className='text-2xl font-bold'>Reuse Somewhere Else</h1>
        <div className='grid grid-cols-4 gap-4'>
          {idStocks.map((stock) => (
            <StockDetail key={stock} symbol={stock} />
          ))}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
