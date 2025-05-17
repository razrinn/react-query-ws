import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import type { WebsocketRequest, WebsocketResponse } from '~/types';

const WebsocketSettings = ({ stocks }: { stocks: string[] }) => {
  const ws = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const queue = useRef<WebsocketRequest[]>([]);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000/ws'); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log('[WS][Open]');
      for (const req of queue.current) {
        ws.current?.send(JSON.stringify(req));
      }

      queue.current = [];
    };

    ws.current.onmessage = (event) => {
      const message: WebsocketResponse = JSON.parse(event.data);
      if (message.type !== 'data') return;

      switch (message.channel) {
        case 'liveprice':
          queryClient.setQueryData(
            ['stockPrice', message.value.symbol],
            message.value
          );
          break;
        case 'chart':
          queryClient.setQueryData(
            ['stockChart', message.value.symbol],
            message.value
          );
          break;

        default:
          break;
      }
    };

    ws.current.onclose = () => {
      console.log('[WS][Closed]');
    };

    ws.current.onerror = (error) => {
      console.error('[WS][Error]:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        const req: WebsocketRequest = {
          type: 'pong',
        };
        ws.current.send(JSON.stringify(req));
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const uniqueStocks = Array.from(new Set(stocks));

    const req: WebsocketRequest = {
      type: 'subscribe',
      channel: 'liveprice',
      stocks: uniqueStocks,
    };

    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(req));
    } else {
      queue.current.push(req);
    }
  }, [stocks]);

  return null;
};

export default WebsocketSettings;
