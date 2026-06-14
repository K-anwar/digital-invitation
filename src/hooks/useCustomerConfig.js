import { useState, useEffect } from 'react';

export default function useCustomerConfig(slug) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}config/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Undangan tidak ditemukan');
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        document.documentElement.setAttribute('data-theme', data.theme || 'romantic');
        document.title = `Undangan ${data.bride} & ${data.groom}`;
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { config, loading, error };
}