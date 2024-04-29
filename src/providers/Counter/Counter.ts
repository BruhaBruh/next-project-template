'use client';

import { createFastContext } from '@/lib/fastContext';

export type CounterState = {
  counter: number
};

const initialState: CounterState = {
  counter: 0,
};

const {
  Provider: CounterProvider,
  useStore,
} = createFastContext(initialState);

const useCounter = () => {
  const [counter, setState] = useStore((s) => s.counter);

  const increment = (amount: number = 1) => {
    setState((prev) => ({ counter: prev.counter + amount }));
  };

  const decrement = (amount: number = 1) => {
    setState((prev) => ({ counter: prev.counter - amount }));
  };

  const set = (value: number) => {
    setState({ counter: value });
  };

  const clear = () => {
    setState(initialState);
  };

  const functions = {
    increment, decrement, set, clear,
  };

  return [counter, functions] as [typeof counter, typeof functions];
};

export { CounterProvider, useCounter };
