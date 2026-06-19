import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { HelmetProvider } from 'react-helmet-async';

AOS.init({ duration: 800, once: true, easing: 'ease-in-out', offset: 100, disable: window.innerWidth < 768 });

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);