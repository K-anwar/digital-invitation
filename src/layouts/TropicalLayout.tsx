import { ReactNode } from 'react';
import Ornament from '@/components/common/Ornament';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function TropicalLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="relative min-h-screen py-12 px-4 overflow-hidden"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background dengan elemen tropis (daun) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-5 text-6xl">🌿</div>
        <div className="absolute bottom-20 right-5 text-8xl">🌺</div>
        <div className="absolute top-1/3 right-10 text-5xl">🌴</div>
        <div className="absolute bottom-1/3 left-8 text-6xl">🍃</div>
      </div>
      
      <Ornament />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/70 backdrop-blur-sm rounded-[40px] shadow-2xl p-8 md:p-12 border-2 border-primary/20">
          <div className="text-center mb-4">
            <span className="text-2xl">🌺</span>
            <p className="text-xs uppercase tracking-widest text-primary/50 mt-1">
              {config.bride} &amp; {config.groom}
            </p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-primary/30">
            🌴 Tropical 🌴
          </div>
        </div>
      </div>
    </div>
  );
}