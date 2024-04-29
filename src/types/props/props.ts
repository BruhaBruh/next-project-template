import React from 'react';

type AsChildProp = { asChild?: boolean };

export type Props<
  T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = React.ComponentProps<T>;

export type PropsWithAsChild<
  T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = Props<T> & AsChildProp;
