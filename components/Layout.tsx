import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Header } from './Header';

type Props = {
  children: ReactNode;
};

const links = [
  { slug: '/', text: 'Home' },
  { slug: '/add', text: 'Add New' },
  { slug: '/remove', text: 'Remove Item' },
  { slug: '/search', text: 'Search' },
  { slug: '/instructions', text: 'How to use' },
];

const StandardLayout: FC<Props> = ({
  children,
}) => (
  <>
    <Head>
      <title>Flash Cards</title>
      <meta name="description" content="Learn Italian with flash cards" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header links={links} />
    {children}
  </>
);

export default StandardLayout;
