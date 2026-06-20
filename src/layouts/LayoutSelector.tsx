import { ReactNode } from 'react';
import { WeddingConfig } from '@/types';
import ClassicLayout from './ClassicLayout';
import ModernLayout from './ModernLayout';
import MinimalLayout from './MinimalLayout';
import ElegantLayout from './ElegantLayout';
import TropicalLayout from './TropicalLayout';
import LuxuryLayout from './LuxuryLayout';
import BohoLayout from './BohoLayout';
import SimpleLayout from './SimpleLayout';

interface LayoutSelectorProps {
  children: ReactNode;
  config: WeddingConfig;
}

export default function LayoutSelector({ children, config }: LayoutSelectorProps) {
  const layout = config?.layout || 'classic';

  const layouts: Record<string, React.ComponentType<LayoutSelectorProps>> = {
    classic: ClassicLayout,
    modern: ModernLayout,
    minimal: MinimalLayout,
    elegant: ElegantLayout,
    tropical: TropicalLayout,
    luxury: LuxuryLayout,
    boho: BohoLayout,
    simple: SimpleLayout,
  };

  const SelectedLayout = layouts[layout] || ClassicLayout;
  
  // Set data-layout di HTML
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-layout', layout);
  }

  return <SelectedLayout config={config}>{children}</SelectedLayout>;
}