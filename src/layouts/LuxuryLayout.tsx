import { ReactNode } from 'react';
import Ornament from '@/components/common/Ornament';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function LuxuryLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="relative min-h-screen py-12 px-4 overflow-hidden"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-title)',
      }}
    >
      {/* Background dengan gradien emas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-primary/20 to-transparent" />
      </div>
      
      <Ornament />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-black/5 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-primary/30">
          <div className="text-center mb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/60">
              {config.bride} &amp; {config.groom}
            </p>
            <div className="w-20 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent mx-auto mt-2" />
          </div>
          {children}
          <div className="mt-6 text-center text-xs text-primary/40 tracking-widest">
            ✦ L U X U R Y ✦
          </div>
        </div>
      </div>
    </div>
  );
}