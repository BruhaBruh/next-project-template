import { cn } from '@/lib/shadcn';
import { CounterProvider } from '@/providers/Counter';
import React from 'react';

export const BaseLayout: React.FC<React.PropsWithChildren<{
  className?: string
}>> = ({ className, children }) => (
  <html lang="ru">
    <body className={cn(className)}>
      <CounterProvider value={{ counter: 0 }}>
        {children}
      </CounterProvider>
    </body>
  </html>
);
