import { useState, FormEvent } from 'react';
import { saveGuestBookEntry } from '@/api/firebase';

interface GuestBookFormProps {
  slug: string;
  onSuccess?: () => void;
}

export default function GuestBookForm({ slug, onSuccess }: GuestBookFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    setError('');
    try {
      await saveGuestBookEntry({ name: name.trim(), message: message.trim(), slug });
      setName('');
      setMessage('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim ucapan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white/80 rounded-2xl shadow">
      <input
        type="text"
        placeholder="Nama Anda"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Tulis ucapan..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-pink-500 text-white rounded-full hover:opacity-90 disabled:opacity-50"
      >
        {loading ? '⏳ Mengirim...' : 'Kirim Ucapan'}
      </button>
    </form>
  );
}