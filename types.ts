export interface StockPrice {
  symbol: string;
  prevPrice: number;
  currPrice: number;
  change: number;
  changePercent: number;
}

export interface StockChart {
  symbol: string;
  prev: number;
  prices: number[];
}

export type WebsocketRequest =
  | { type: 'pong' }
  | {
      type: 'message';
      value: string;
    }
  | {
      type: 'subscribe';
      channel: 'liveprice' | 'chart';
      stocks: string[];
    };

export type WebsocketResponse =
  | {
      type: 'ping';
    }
  | {
      type: 'message';
      value: string;
    }
  | {
      type: 'data';
      channel: 'liveprice';
      value: StockPrice;
    }
  | {
      type: 'data';
      channel: 'chart';
      value: StockChart;
    }
  | {
      type: 'error';
      error: string;
    };
