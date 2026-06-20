import { ReactNode } from 'react';
import { WeddingConfig } from '@/types';

interface LayoutProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function ModernLayout({ children, config }: LayoutProps) {
  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ 
        background: 'var(--bg-gradient)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10">
          {/* Header modern dengan garis tipis */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
            <span className="text-xs uppercase tracking-wider text-primary/60">
              Wedding
            </span>
            <span className="text-xs text-primary/40">
              {new Date(config.eventDate).getFullYear()}
            </span>
          </div>
          {children}
          <div className="mt-6 pt-4 border-t border-gray-200/50 text-center text-xs text-primary/30">
            ✦ Modern ✦
          </div>
        </div>
      </div>
    </div>
  );
}