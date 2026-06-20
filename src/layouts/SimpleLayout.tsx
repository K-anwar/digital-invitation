import { ReactNode } from 'react';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function SimpleLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ 
        background: 'var(--bg)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          <div className="text-center border-b border-gray-100 pb-4 mb-6">
            <p className="text-sm text-gray-400">{config.bride} &amp; {config.groom}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-[10px] text-gray-300">
            Simple
          </div>
        </div>
      </div>
    </div>
  );
}