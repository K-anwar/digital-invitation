import { ReactNode } from 'react';
import Ornament from '@/components/common/Ornament';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function ClassicLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="relative min-h-screen py-10 px-4 overflow-hidden"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Ornamen klasik: border double di atas dan bawah */}
      <div className="absolute top-0 left-0 w-full h-3 border-t-4 border-b-4 border-double border-primary/30" />
      <div className="absolute bottom-0 left-0 w-full h-3 border-t-4 border-b-4 border-double border-primary/30" />
      
      <Ornament />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-double border-primary/20">
          {/* Gunakan config untuk menampilkan judul dekoratif */}
          <div className="text-center mb-6">
            <p className="text-xs tracking-widest uppercase text-primary/60" style={{ letterSpacing: '0.3em' }}>
              {config.bride} &amp; {config.groom}
            </p>
            <div className="w-24 h-0.5 bg-primary/30 mx-auto mt-2" />
          </div>
          {children}
          <div className="text-center mt-6 text-xs text-primary/40">
            ✦ Classic ✦
          </div>
        </div>
      </div>
    </div>
  );
}