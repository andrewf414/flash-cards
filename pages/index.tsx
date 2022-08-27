import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import Link from 'next/link';
import { Page } from '../interfaces/Page';
import { ReactNode, useEffect, useState } from 'react';
import StandardLayout from '../components/Layout';
import styled from 'styled-components';
import { CardData } from '../interfaces/FlashCard';
import { Modal } from '../components/Modal';
import Paragraph from '../components/Paragraph';

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

const Home: Page<Props> = ({ cardSets }) => {
  const [showInformation, setShowInformation] = useState(false);
  const open = () => setShowInformation(true);
  const close = () => setShowInformation(false);

  useEffect(() => {
    // TODO: remove this at some point when people have probably all accessed it
    cardSets.forEach(cardSet => {
      const localItemsString = localStorage.getItem(cardSet);
      const localItems: CardData[] = localItemsString ? JSON.parse(localItemsString) : [];
      const mapped = localItems.map(item => ({ ...item, isLocal: true }));
      localStorage.setItem(cardSet, JSON.stringify(mapped));
    });
  }, []);

  useEffect(() => {
    const shown = localStorage.getItem('shown-information');
    if (!shown) {
      open();
      localStorage.setItem('shown-information', "true");
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Flash Cards</title>
        <meta name="description" content="Learn a language with flash cards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal isOpen={showInformation} close={close}>
        <div>
          <Paragraph>
            There are now swipe gestures. Swipe left or right to go to next/previous card, and swipe down to get the definition.
          </Paragraph>
          <Paragraph>
            You will also see a flag on cards that you added yourself.
          </Paragraph>
        </div>
      </Modal>
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
}

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
