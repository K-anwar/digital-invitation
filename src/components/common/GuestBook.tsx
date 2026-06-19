import { useEffect, useState } from 'react';
import { getGuestBookEntries, GuestBookEntry } from '@/api/firebase';
import GuestBookForm from '@/components/forms/GuestBookForm';

interface GuestBookProps {
  slug: string;
}

export default function GuestBook({ slug }: GuestBookProps) {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5); // awal tampilkan 5

  const loadEntries = async () => {
    setLoading(true);
    const data = await getGuestBookEntries(slug);
    // urutkan dari terbaru
    data.sort((a, b) => (b.createdAt?.toDate?.()?.getTime() || 0) - (a.createdAt?.toDate?.()?.getTime() || 0));
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, [slug]);

  const handleFormSuccess = () => {
    setFormSubmitted(true);
    loadEntries();
    // reset visibleCount agar setelah submit, tampil 5 terbaru lagi
    setVisibleCount(5);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const displayedEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  if (loading) return <div className="text-center py-8">Memuat ucapan...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        💝 Ucapan & Doa
      </h2>

      {/* Form hanya tampil jika belum submit */}
      {!formSubmitted && (
        <GuestBookForm slug={slug} onSuccess={handleFormSuccess} />
      )}

      {/* Pesan sukses setelah submit */}
      {formSubmitted && (
        <div className="text-center text-green-600 font-medium py-2">
          ✅ Ucapan Anda telah terkirim. Terima kasih!
        </div>
      )}

      {/* Daftar ucapan */}
      <div className="space-y-3">
        {displayedEntries.map((entry) => (
          <div key={entry.id} className="p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition">
            <p className="font-semibold text-gray-800">{entry.name}</p>
            <p className="text-gray-600 italic">"{entry.message}"</p>
            <p className="text-xs text-gray-400 mt-1">
              {entry.createdAt?.toDate?.()?.toLocaleDateString('id-ID')}
            </p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-gray-400">Belum ada ucapan. Jadilah yang pertama! 💕</p>
        )}

        {/* Tombol More: tambah 5 setiap kali klik */}
        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-full text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 transition shadow"
            >
              More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}