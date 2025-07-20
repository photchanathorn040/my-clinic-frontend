import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Import AuthProvider
import './styles/theme.css';
import './styles/global.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* 2. นำ AuthProvider มาหุ้ม App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)