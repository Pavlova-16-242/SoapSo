import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './input.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .catch(error => {
                console.error('SW registration failed:', error);
            });
    });
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);