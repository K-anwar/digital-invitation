import { ReactNode } from 'react';
import Ornament from '@/components/common/Ornament';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function BohoLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="relative min-h-screen py-12 px-4 overflow-hidden"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Background dengan motif boho */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'radial-gradient(circle at 30% 40%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 70% 60%, var(--primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px, 80px 80px',
        }} />
      </div>
      
      <Ornament />
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border-2 border-dashed border-primary/20">
          <div className="text-center mb-4">
            <span className="text-2xl">✿</span>
            <p className="text-xs uppercase tracking-widest text-primary/50 mt-1">
              {config.bride} &amp; {config.groom}
            </p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-primary/30">
            ✿ Boho ✿
          </div>
        </div>
      </div>
    </div>
  );
}