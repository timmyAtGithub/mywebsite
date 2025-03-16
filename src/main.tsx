import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter } from 'react-router-dom';   

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
        <LanguageProvider>
            <App />
        </LanguageProvider>
        </BrowserRouter>
    </React.StrictMode>
);
