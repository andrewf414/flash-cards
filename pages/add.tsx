import type { GetStaticProps } from 'next'
import Head from 'next/head'
import CardSet from '../components/CardSet';
import fs from 'fs';
import { ReactNode } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';
import { NewEntryForm } from '../components/NewEntryForm';

interface Props {
  lists: string[]
  getLayout?: any;
}

const CardSetPage: Page<Props> = ({ lists }) => (
  <div>
    <Head>
      <title>Flash Cards</title>
      <meta name="description" content="Learn a language with flash cards" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container as="main">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        minWidth: '300px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <NewEntryForm lists={lists} />
      </div>
    </Container>


    <footer>

    </footer>
  </div>
)

CardSetPage.getLayout = function getLayout(page: ReactNode) {

  return (
    <StandardLayout>
      {page}
    </StandardLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const lists = fs.readdirSync('./data').map(file => file.replace('.json', ''));

  return {
    props: {
      lists
    }
  }
}

export default CardSetPage
