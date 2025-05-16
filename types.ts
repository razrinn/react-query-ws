export interface StockPrice {
  symbol: string;
  prevPrice: number;
  currPrice: number;
  change: number;
  changePercent: number;
}

export type WebsocketRequest =
  | { type: 'pong' }
  | {
      type: 'message';
      value: string;
    }
  | {
      type: 'subscribe';
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
      value: StockPrice;
    }
  | {
      type: 'error';
      error: string;
    };
