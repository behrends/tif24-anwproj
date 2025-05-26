import * as React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'complete' | 'partial' | 'empty' | 'warning';
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({
  status,
  children,
  className,
}: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'complete':
        return {
          icon: '✅',
          class: 'bg-green-100 text-green-800 border-green-200',
        };
      case 'partial':
        return {
          icon: '⚠️',
          class: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        };
      case 'warning':
        return {
          icon: '⚠️',
          class: 'bg-orange-100 text-orange-800 border-orange-200',
        };
      case 'empty':
        return {
          icon: '❌',
          class: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border',
        styles.class,
        className
      )}
    >
      <span>{styles.icon}</span>
      {children}
    </span>
  );
}
