// Default URL dari env (untuk development)
const DEFAULT_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export async function submitRSVP(url, data) {
  const scriptUrl = url || DEFAULT_SCRIPT_URL;
  
  if (!scriptUrl) {
    throw new Error('Google Script URL tidak dikonfigurasi');
  }

  const params = new URLSearchParams(data).toString();
  const fullUrl = `${scriptUrl}?${params}`;
  
  console.log('📤 Mengirim ke:', fullUrl);
  
  try {
    await fetch(fullUrl, { 
      method: 'GET',
      mode: 'no-cors' 
    });
    console.log('✅ Terkirim');
    return { status: 'success' };
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

export async function submitCheckin(url, data) {
  return submitRSVP(url, data);
}