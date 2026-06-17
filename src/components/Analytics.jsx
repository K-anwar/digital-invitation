import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'G-H1JYV4M9YM';

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Hanya cek apakah ID kosong atau undefined
    if (!GA_TRACKING_ID || GA_TRACKING_ID === '') {
      console.warn('⚠️ Google Analytics ID belum dikonfigurasi');
      return;
    }

    console.log('✅ Google Analytics aktif dengan ID:', GA_TRACKING_ID);

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname + window.location.hash,
        send_page_view: false
      });
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup (opsional)
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, []);

  // Track page views saat route berubah
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.hash,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
}