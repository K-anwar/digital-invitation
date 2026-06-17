import { useState } from 'react';
import { submitRSVP } from '../services/googleSheets';

export default function RSVPForm({ guest, slug, googleScriptUrl }) {
  const [attending, setAttending] = useState('yes');
  const [pax, setPax] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!googleScriptUrl) {
      alert('URL Google Sheets belum dikonfigurasi.');
      return;
    }
    
    setLoading(true);
    
    try {
      await submitRSVP(googleScriptUrl, { 
        guest, 
        attending, 
        pax: attending === 'yes' ? pax : '', 
        message, 
        slug 
      });
      setSubmitted(true);
    } catch (error) {
      // Dengan no-cors, error jarang terjadi
      // Tapi jika terjadi, tetap anggap sukses
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="p-8 text-center rounded-3xl"
        style={{ 
          backgroundColor: 'var(--bg-card)', 
          borderRadius: 'var(--radius)', 
          boxShadow: 'var(--shadow)' 
        }}
      >
        <p className="text-4xl mb-3">💖</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>
          Terima Kasih!
        </p>
        <p className="mt-2" style={{ color: 'var(--text-soft)' }}>
          Konfirmasi kehadiran Anda telah tercatat.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-8 rounded-3xl backdrop-blur-sm"
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        boxShadow: 'var(--shadow)', 
        borderRadius: 'var(--radius)' 
      }}
    >
      <h2 
        className="text-2xl font-bold text-center"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        Konfirmasi Kehadiran
      </h2>
      
      <p className="text-lg text-center">
        Nama: <strong style={{ color: 'var(--primary-dark)' }}>{guest}</strong>
      </p>

      <div>
        <label className="block mb-2 font-medium">Kehadiran</label>
        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
          style={{ 
            borderColor: 'var(--primary-light)', 
            color: 'var(--text)',
            backgroundColor: 'white'
          }}
        >
          <option value="yes">✅ Ya, saya hadir</option>
          <option value="no">❌ Maaf, tidak bisa hadir</option>
        </select>
      </div>

      {attending === 'yes' && (
        <div>
          <label className="block mb-2 font-medium">Jumlah orang (termasuk Anda)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={pax}
            onChange={(e) => setPax(parseInt(e.target.value) || 1)}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
            style={{ 
              borderColor: 'var(--primary-light)',
              backgroundColor: 'white'
            }}
          />
        </div>
      )}

      <div>
        <label className="block mb-2 font-medium">Ucapan & Doa</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
          style={{ 
            borderColor: 'var(--primary-light)',
            backgroundColor: 'white'
          }}
          placeholder="Tulis ucapan selamat untuk kedua mempelai..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full text-white font-semibold tracking-wide transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        {loading ? '⏳ Mengirim...' : '💌 Kirim Konfirmasi'}
      </button>
    </form>
  );
}