import { NextPage } from 'next';
import { ReactNode } from 'react';

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
