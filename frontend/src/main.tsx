import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';

import { CssBaseline } from '@mui/material';
import './assets/index.css';
import { FlashProvider } from './context/FlashProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <AuthProvider>
        <FlashProvider>
          <App />
        </FlashProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
