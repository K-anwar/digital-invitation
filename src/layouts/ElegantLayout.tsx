import { ReactNode } from 'react';
import Ornament from '@/components/common/Ornament';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function ElegantLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="relative min-h-screen py-12 px-4 overflow-hidden"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-title)',
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 50%, var(--primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Ornamen emas */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-3xl text-primary/20">
        ✦ ✦ ✦
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl text-primary/20">
        ✦ ✦ ✦
      </div>
      
      <Ornament />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/10">
          <div className="text-center mb-4">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/50">
              {config.bride} &amp; {config.groom}
            </p>
            <div className="w-16 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mx-auto mt-3" />
          </div>
          {children}
          <div className="mt-6 text-center text-xs text-primary/30 italic">
            Elegance
          </div>
        </div>
      </div>
    </div>
  );
}