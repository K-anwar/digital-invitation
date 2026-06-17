import { useState } from 'react';

export default function WeddingGift({ giftConfig }) {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!giftConfig || giftConfig.length === 0) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        🎁 Wedding Gift
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {giftConfig.map((gift, index) => (
          <button
            key={index}
            onClick={() => setSelected(gift)}
            className="p-4 rounded-2xl text-center transition-all hover:scale-105 shadow-md"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              boxShadow: 'var(--shadow)',
              border: selected?.type === gift.type ? '2px solid var(--primary)' : '2px solid transparent'
            }}
          >
            <span className="text-3xl mb-2 block">{gift.icon}</span>
            <span className="text-sm font-semibold">{gift.type}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 p-6 rounded-2xl text-center animate-fadeIn"
          style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
          <p className="text-2xl mb-3">{selected.icon}</p>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>
            {selected.type}
          </p>
          
          {/* Nomor Rekening */}
          <div className="space-y-3 mb-4">
            <p className="text-xs uppercase tracking-wider opacity-70">No. Rekening</p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <p className="text-xl font-mono font-bold tracking-wider select-all">
                {selected.number}
              </p>
              <button
                onClick={() => handleCopy(selected.number)}
                className="px-3 py-1 rounded-full text-sm text-white transition hover:opacity-80"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {copied ? '✅ Tersalin' : '📋 Salin'}
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold mt-2">a.n. {selected.name}</p>
          {selected.bank && (
            <p className="text-xs opacity-70 mt-1">{selected.bank}</p>
          )}
        </div>
      )}

      <p className="text-center text-sm italic opacity-70 mt-6" style={{ color: 'var(--text-soft)' }}>
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
        {selected && ' Terima kasih atas kebaikan hati Anda.'}
      </p>
    </div>
  );
}