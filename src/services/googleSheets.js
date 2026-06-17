/**
 * Kirim data RSVP ke Google Sheets
 * Menggunakan mode no-cors untuk menghindari CORS preflight
 */
export async function submitRSVP(url, data) {
  // Build URL dengan query string
  const params = new URLSearchParams(data).toString();
  const fullUrl = `${url}?${params}`;
  
  try {
    // Kirim via GET (simple request, tidak trigger preflight)
    await fetch(fullUrl, { 
      method: 'GET',
      mode: 'no-cors' 
    });
    
    // Karena no-cors, kita anggap selalu sukses
    return { status: 'success' };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }
}

/**
 * Kirim data check-in ke Google Sheets
 * Fungsi sama dengan submitRSVP
 */
export async function submitCheckin(url, data) {
  return submitRSVP(url, data);
}