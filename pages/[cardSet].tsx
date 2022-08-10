import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import CardSet from '../components/CardSet';
import fs from 'fs';
import { CardData } from '../interfaces/FlashCard';
import { ReactNode, useEffect, useRef, useState } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';

interface Props {
  cardSet: CardData[];
  listName: string;
  getLayout?: any;
}

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const CardSetPage: Page<Props> = ({ cardSet, listName }) => {
  const [completeSet, setCompleteSet] = useState<CardData[]>();

  // read in any from local storage to add to set
  useEffect(() => {
    const existingString = localStorage.getItem(listName);
    setCompleteSet(existingString ? shuffleArray([...cardSet, ...JSON.parse(existingString)]) : shuffleArray(cardSet));
  }, [])

  return (
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
        {completeSet && <CardSet data={completeSet} />}
      </div>
    </Container>


    <footer>

    </footer>
  </div>
)}

CardSetPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <StandardLayout>
      {page}
    </StandardLayout>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = fs.readdirSync('./data');
  const paths = fileNames
    .map((filename) => ({
      params: {
        cardSet: filename.replace('.json', ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const cardSet = JSON.parse(fs.readFileSync(`./data/${context.params?.cardSet}.json`).toString())

  return {
    props: {
      cardSet,
      listName: context.params?.cardSet
    }
  }
}

export default CardSetPage
