import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import { getRSVPsBySlug, getCheckinsBySlug, getGuestBookEntries, RSVPRecord, CheckinRecord, GuestBookEntry } from '@/api/firebase';
import Ornament from '@/components/common/Ornament';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function AdminDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const { config, loading: configLoading } = useCustomerConfig(slug || '');
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [checkins, setCheckins] = useState<CheckinRecord[]>([]);
  const [guestbook, setGuestbook] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const [rsvpData, checkinData, guestbookData] = await Promise.all([
          getRSVPsBySlug(slug),
          getCheckinsBySlug(slug),
          getGuestBookEntries(slug),
        ]);
        setRsvps(rsvpData);
        setCheckins(checkinData);
        setGuestbook(guestbookData);
      } catch (err) {
        setError('Gagal memuat data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (configLoading || loading) return <LoadingScreen />;
  if (error || !config) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Data tidak tersedia'}</div>;

  const attending = rsvps.filter((r) => r.attending === 'yes');
  const notAttending = rsvps.filter((r) => r.attending === 'no');

  return (
    <div className="min-h-screen py-10 px-4 relative" style={{ backgroundColor: 'var(--bg)' }}>
      <Ornament />
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
            📊 Dashboard Admin
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-soft)' }}>
            {config.bride} & {config.groom} — Data Real-time dari Firebase
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon="📝" label="Total RSVP" value={rsvps.length} color="#6366f1" />
          <StatCard icon="✅" label="Hadir" value={attending.length} color="#22c55e" />
          <StatCard icon="❌" label="Tidak Hadir" value={notAttending.length} color="#ef4444" />
          <StatCard icon="📍" label="Check-in" value={checkins.length} color="#f59e0b" />
          <StatCard icon="💝" label="Ucapan" value={guestbook.length} color="#ec4899" />
          <StatCard icon="📊" label="Kehadiran" value={attending.length > 0 ? `${Math.round((checkins.length / attending.length) * 100)}%` : '0%'} color="#8b5cf6" />
        </div>

        <div className="p-6 rounded-2xl overflow-x-auto" style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
          <h3 className="text-lg font-semibold mb-4">📋 Daftar RSVP</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                <th className="text-left py-2 px-3">Nama</th>
                <th className="text-left py-2 px-3">Kehadiran</th>
                <th className="text-left py-2 px-3">Jumlah</th>
                <th className="text-left py-2 px-3">Ucapan</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr key={rsvp.id} className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="py-2 px-3">{rsvp.guestName}</td>
                  <td className="py-2 px-3">{rsvp.attending === 'yes' ? '✅ Hadir' : '❌ Tidak'}</td>
                  <td className="py-2 px-3">{rsvp.attending === 'yes' ? rsvp.pax : '-'}</td>
                  <td className="py-2 px-3 max-w-xs truncate">{rsvp.message || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {rsvps.length === 0 && <p className="text-center text-gray-400 py-4">Belum ada RSVP</p>}
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: number | string; color: string }) => (
  <div className="p-4 rounded-2xl text-center hover:scale-105 transition-transform" style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-2xl font-bold" style={{ color }}>{value}</div>
    <div className="text-xs mt-1 opacity-70">{label}</div>
  </div>
);