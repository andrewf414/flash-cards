import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import Link from 'next/link';
import { Page } from '../interfaces/Page';
import { ReactNode } from 'react';
import StandardLayout from '../components/Layout';
import styled from 'styled-components';

const LinksContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const CardSetLinkStyle = styled.a`
  width: 120px;
  height: 100px;
  border: solid 1px var(--color-primary-light);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-primary);
`;

interface Props {
  cardSets: string[]
}

const Home: Page<Props> = ({ cardSets }) => (
  <div>
    <Head>
      <title>Flash Cards</title>
      <meta name="description" content="Learn a language with flash cards" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '300px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <LinksContainerStyle>
        {cardSets.map(cardSet => <Link key={cardSet} href={'/' + cardSet} passHref><CardSetLinkStyle>{cardSet}</CardSetLinkStyle></Link>)}
      </LinksContainerStyle>
    </main>

    <footer>

    </footer>
  </div>
)

Home.getLayout = function getLayout(page: ReactNode) {

  return (
    <StandardLayout>
      {page}
    </StandardLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cardSets = fs.readdirSync('./data').map(file => file.replace('.json', ''));

  return {
    props: {
      cardSets
    }
  }
}

export default Home
