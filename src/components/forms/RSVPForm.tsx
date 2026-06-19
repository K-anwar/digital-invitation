import { useState, FormEvent, ChangeEvent } from 'react';
import { saveRSVP } from '@/api/firebase';

interface RSVPFormProps {
  guest: string;
  slug: string;
}

type AttendingOption = 'yes' | 'no';

export default function RSVPForm({ guest, slug }: RSVPFormProps) {
  const [attending, setAttending] = useState<AttendingOption>('yes');
  const [pax, setPax] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAttendingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAttending(e.target.value as AttendingOption);
  };

  const handlePaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) setPax(Math.min(val, 10));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await saveRSVP({
        guestName: guest,
        attending,
        pax: attending === 'yes' ? pax : 0,
        message: '', // tidak ada input pesan
        slug,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim konfirmasi');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-8 text-center rounded-3xl" style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
        <p className="text-4xl mb-3">💖</p>
        <p className="text-xl md:text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>Terima Kasih!</p>
        <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--text-soft)' }}>Konfirmasi kehadiran Anda telah tercatat.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 md:space-y-5 p-6 md:p-8 rounded-3xl backdrop-blur-sm"
      style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)', borderRadius: 'var(--radius)' }}
      noValidate
    >
      <h2 className="text-xl md:text-2xl font-bold text-center" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        Konfirmasi Kehadiran
      </h2>
      <p className="text-base md:text-lg text-center">Nama: <strong style={{ color: 'var(--primary-dark)' }}>{guest}</strong></p>

      <div>
        <label htmlFor="attending" className="block mb-2 font-medium text-sm md:text-base">Kehadiran</label>
        <select
          id="attending"
          value={attending}
          onChange={handleAttendingChange}
          className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none text-sm md:text-base"
          style={{ borderColor: 'var(--primary-light)', color: 'var(--text)', backgroundColor: 'white' }}
          required
        >
          <option value="yes">✅ Ya, saya hadir</option>
          <option value="no">❌ Maaf, tidak bisa hadir</option>
        </select>
      </div>

      {attending === 'yes' && (
        <div>
          <label htmlFor="pax" className="block mb-2 font-medium text-sm md:text-base">Jumlah orang (termasuk Anda)</label>
          <input
            id="pax"
            type="number"
            min={1}
            max={10}
            value={pax}
            onChange={handlePaxChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none text-sm md:text-base"
            style={{ borderColor: 'var(--primary-light)', backgroundColor: 'white' }}
            required
          />
        </div>
      )}

      {error && <div role="alert" className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full text-white font-semibold tracking-wide transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        {loading ? '⏳ Mengirim...' : '💌 Kirim Konfirmasi'}
      </button>
    </form>
  );
}