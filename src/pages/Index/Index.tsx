'use client';

import { Button } from '@/components/ui';
import { useCounter } from '@/providers/Counter';
import { useIdle } from '@uidotdev/usehooks';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

export const IndexPage: React.FC = () => {
  const idle = useIdle(5000);
  const [counter, {
    set, increment, decrement, clear,
  }] = useCounter();

  return (
    <main className="flex flex-col gap-2 min-h-full container p-24">
      <p className="mx-auto text-center">{idle ? 'Idle' : 'Active'}</p>
      <p className="mx-auto text-center text-lg font-medium">{counter}</p>
      <div className="mx-auto flex gap-4">
        <Button size="icon" onClick={() => decrement()}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" onClick={() => set(100)}>
          Set 100
        </Button>
        <Button variant="secondary" onClick={() => clear()}>
          Clear
        </Button>
        <Button size="icon" onClick={() => increment()}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </main>
  );
};
