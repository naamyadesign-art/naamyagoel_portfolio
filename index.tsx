
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Polyfill process for browser environment to prevent library crashes
// Added casting to any to fix TypeScript error on window.process
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Mounting point #root not found.");
}