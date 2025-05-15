import { createRoot } from 'react-dom/client';

import App from '~/frontend/app';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root')!);
  root.render(<App />);
});
