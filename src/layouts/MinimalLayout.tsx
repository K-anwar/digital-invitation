import { ReactNode } from 'react';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function MinimalLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="min-h-screen py-16 px-4"
      style={{ 
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-6 md:p-10">
          {/* Header minimal: hanya nama pasangan */}
          <h2 className="text-center text-sm uppercase tracking-widest text-primary/40 mb-6">
            {config.bride} &amp; {config.groom}
          </h2>
          {children}
          <div className="mt-8 text-center text-[10px] text-gray-300 uppercase tracking-widest">
            Minimal
          </div>
        </div>
      </div>
    </div>
  );
}