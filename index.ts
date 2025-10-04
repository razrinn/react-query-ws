import type {
  StockChart,
  StockPrice,
  WebsocketRequest,
  WebsocketResponse,
} from "~/types";
import reactHtmlEntry from "./public/index.html";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const server = Bun.serve({
  fetch(req, server) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    return undefined;
  },
  routes: {
    "/ws": (req, server) => {
      if (server.upgrade(req)) {
        return;
      }

      return new Response("WebSocket upgrade failed", { status: 400 });
    },
    "/api/stockprice/:symbol": (req, server) => {
      const { symbol } = req.params;
      if (!stocks.includes(symbol)) {
        return new Response("Stock not found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const stockPrice = stockPrices.find((s) => s.symbol === symbol);
      if (!stockPrice) {
        return new Response("Stock data not available", {
          status: 404,
          headers: corsHeaders,
        });
      }

      return Response.json(stockPrice, { headers: corsHeaders });
    },
    "/api/stockchart/:symbol": (req, server) => {
      const { symbol } = req.params;
      if (!stocks.includes(symbol)) {
        return new Response("Stock not found", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const stockPrice = stockPrices.find((s) => s.symbol === symbol);
      if (!stockPrice) {
        return new Response("Stock data not available", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const prices = history.get(symbol);
      if (!prices) {
        return new Response("Stock history not available", {
          status: 404,
          headers: corsHeaders,
        });
      }

      const res: StockChart = {
        symbol,
        prev: stockPrice.prevPrice,
        prices,
      };

      return Response.json(res, { headers: corsHeaders });
    },
    "/ping": (req, server) => {
      return new Response(null, { status: 200, headers: corsHeaders });
    },
    "/api/*": (req, server) => {
      return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
    "/*": reactHtmlEntry,
  },
  websocket: {
    idleTimeout: 30,
    message(ws, message) {
      if (typeof message !== "string") return;
      try {
        const wsReq: WebsocketRequest = JSON.parse(message);

        if (wsReq.type === "pong") {
          const res: WebsocketResponse = {
            type: "ping",
          };
          ws.send(JSON.stringify(res));
        } else if (wsReq.type === "subscribe") {
          switch (wsReq.channel) {
            case "liveprice": {
              for (const stock of stocks) {
                ws.unsubscribe(`stockprice-${stock}`);
              }

              for (const stock of wsReq.stocks) {
                if (stocks.includes(stock)) {
                  const res: WebsocketResponse = {
                    type: "data",
                    channel: "liveprice",
                    value: stockPrices.find(
                      (s) => s.symbol === stock,
                    ) as StockPrice,
                  };
                  ws.subscribe(`stockprice-${stock}`);
                  ws.send(JSON.stringify(res));
                }
              }
              break;
            }
            case "chart": {
              for (const stock of stocks) {
                ws.unsubscribe(`stockchart-${stock}`);
              }

              for (const stock of wsReq.stocks) {
                if (stocks.includes(stock)) {
                  const historyItem = history.get(stock);
                  if (!historyItem) continue;

                  const stockPrice = stockPrices.find(
                    (s) => s.symbol === stock,
                  );
                  if (!stockPrice) continue;

                  const res: WebsocketResponse = {
                    type: "data",
                    channel: "chart",
                    value: {
                      symbol: stock,
                      prev: stockPrice.prevPrice,
                      prices: historyItem,
                    },
                  };
                  ws.subscribe(`stockchart-${stock}`);
                  ws.send(JSON.stringify(res));
                }
              }
              break;
            }
            default:
              break;
          }
        }
      } catch (error) {
        const res: WebsocketResponse = {
          type: "error",
          error: "Failed to parse message",
        };
        ws.send(JSON.stringify(res));
      }
    },
  },
  development: true,
  port: 3000,
});

console.log(`Server running at http://localhost:${server.port}`);

// Simulate data changes
const stocks = [
  "BBCA",
  "TLKM",
  "UNVR",
  "ASII",
  "BMRI",
  "GMRB",
  "ADHI",
  "BBNI",
  "SMLR",
  "PRED",
  "KGRU",
  "MNCI",
  "AADI",
  "PANI",
  "MAPA",
  "HPMI",
];
const stockPrices: StockPrice[] = [
  {
    symbol: "BBCA",
    prevPrice: 6000,
    currPrice: 6000,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "TLKM",
    prevPrice: 2700,
    currPrice: 2700,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "UNVR",
    prevPrice: 1800,
    currPrice: 1800,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "ASII",
    prevPrice: 2500,
    currPrice: 2500,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "BMRI",
    prevPrice: 5500,
    currPrice: 5500,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "GMRB",
    prevPrice: 680,
    currPrice: 680,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "ADHI",
    prevPrice: 2300,
    currPrice: 2300,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "BBNI",
    prevPrice: 7800,
    currPrice: 7800,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "SMLR",
    prevPrice: 150,
    currPrice: 150,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "PRED",
    prevPrice: 188,
    currPrice: 188,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "KGRU",
    prevPrice: 70,
    currPrice: 70,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "MNCI",
    prevPrice: 900,
    currPrice: 900,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "AADI",
    prevPrice: 4100,
    currPrice: 4100,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "PANI",
    prevPrice: 15000,
    currPrice: 15000,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "MAPA",
    prevPrice: 3100,
    currPrice: 3100,
    change: 0,
    changePercent: 0,
  },
  {
    symbol: "HPMI",
    prevPrice: 420,
    currPrice: 420,
    change: 0,
    changePercent: 0,
  },
];

// Simulate live price changes
let lastChangedStock: string | null = null;
const stockProbabilities = new Map<string, number>(
  stocks.map((symbol) => [symbol, 0.5]),
);

setInterval(() => {
  const randomStock = stockPrices[Math.floor(Math.random() * stocks.length)];
  if (!randomStock) return;

  if (lastChangedStock === randomStock.symbol) return;

  let priceFraction: number;
  if (randomStock.currPrice < 200) {
    priceFraction = 1;
  } else if (randomStock.currPrice < 500) {
    priceFraction = 2;
  } else if (randomStock.currPrice < 2000) {
    priceFraction = 5;
  } else if (randomStock.currPrice < 5000) {
    priceFraction = 10;
  } else {
    priceFraction = 25;
  }

  let priceChange: number;
  const randomValue = Math.random();
  const currentProb = stockProbabilities.get(randomStock.symbol) || 0.5;

  if (randomValue < 0.95) {
    priceChange = 0; // 95% chance (unchanged)
  } else if (randomValue < 0.95 + (1 - 0.95) * (1 - currentProb)) {
    priceChange = -priceFraction; // variable chance based on probability
  } else {
    priceChange = priceFraction; // variable chance based on probability
  }

  const prevPrice = randomStock.currPrice;

  randomStock.currPrice += priceChange;
  randomStock.change = randomStock.currPrice - randomStock.prevPrice;
  randomStock.changePercent =
    ((randomStock.currPrice - randomStock.prevPrice) / randomStock.prevPrice) *
    100;

  // Update probability based on price direction
  if (priceChange > 0) {
    stockProbabilities.set(
      randomStock.symbol,
      Math.max(
        0.01,
        (stockProbabilities.get(randomStock.symbol) || 0.5) - 0.005,
      ),
    );
  } else if (priceChange < 0) {
    stockProbabilities.set(
      randomStock.symbol,
      Math.min(
        0.99,
        (stockProbabilities.get(randomStock.symbol) || 0.5) + 0.005,
      ),
    );
  }

  const res: WebsocketResponse = {
    type: "data",
    channel: "liveprice",
    value: randomStock,
  };

  if (randomStock.currPrice !== prevPrice) {
    server.publish(`stockprice-${randomStock.symbol}`, JSON.stringify(res));
    lastChangedStock = randomStock.symbol;
  }
}, 1);

// Simulate chart data, only save latest 20 items, interval every 10 seconds
const history = new Map<string, number[]>(
  stockPrices.map((stock) => [stock.symbol, [stock.prevPrice]]),
);

setInterval(() => {
  for (const [symbol, prices] of history) {
    if (prices.length >= 50) {
      prices.shift();
    }
    const current = stockPrices.find((s) => s.symbol === symbol);
    if (!current) continue;
    if (prices.length > 0) prices[0] = current.prevPrice;
    prices.push(current.currPrice);

    const res: WebsocketResponse = {
      type: "data",
      channel: "chart",
      value: {
        symbol,
        prev: current.prevPrice,
        prices,
      },
    };
    server.publish(`stockchart-${symbol}`, JSON.stringify(res));
  }
}, 1000);
