# React Query + WebSocket

Process once, consume everywhere.

![Demo](./docs/demo.webm)

This is a React application that fetches live data from a WebSocket server and displays it on the frontend. This is a minimum Proof of Concept project. Adjust based on your specific requirements.

## Technologies Used

- React
- React Query
- TypeScript
- Bun
- Tailwind CSS

## Project Structure

- `frontend/`:
  - `components/`:
    - `websocket-settings.tsx`: A component that handles WebSocket subscriptions & save it to React Query store.
  - `lib/`:
    - `use-websocket-data.ts`: A reusable custom hook that fetches real-time data from React Query store.
- `index.ts`: The entry point for Bun WebSocket server

## How to Run

1. Clone this repository and navigate into the project directory.
2. Install dependencies by running:

```bash
pnpm install
```

3. Start the development server by running:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000` to see the stock price data.
