import { useEffect, useState } from 'react';
import { getGuestBookEntries, GuestBookEntry } from '@/api/firebase';
import GuestBookForm from '@/components/forms/GuestBookForm';

interface GuestBookProps {
  slug: string;
}

export default function GuestBook({ slug }: GuestBookProps) {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    setLoading(true);
    const data = await getGuestBookEntries(slug);
    setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, [slug]);

  if (loading) return <div className="text-center py-8">Memuat ucapan...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        💝 Ucapan & Doa
      </h2>
      <GuestBookForm slug={slug} onSuccess={loadEntries} />
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 bg-white/80 rounded-xl shadow">
            <p className="font-semibold">{entry.name}</p>
            <p className="text-gray-600">"{entry.message}"</p>
            <p className="text-xs text-gray-400 mt-1">
              {entry.createdAt?.toDate?.().toLocaleDateString('id-ID')}
            </p>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-gray-400">Belum ada ucapan. Jadilah yang pertama! 💕</p>
        )}
      </div>
    </div>
  );
}