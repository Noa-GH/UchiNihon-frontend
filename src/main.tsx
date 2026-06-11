import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/utils/queryClient';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*
        QueryClientProvider sits above everything — including the router and
        auth context — so any future router-level data loaders can also use
        React Query hooks.
      */}
      <QueryClientProvider client={queryClient}>
        <App />
        {/*
          ReactQueryDevtools adds a floating panel showing every query's status,
          cached data, and refetch controls. Excluded from production builds automatically.
          Click the React Query logo in the bottom corner to open it.
        */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
