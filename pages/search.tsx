import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';
import React from 'react';
import { CardData } from '../interfaces/FlashCard';
import { InputStyle } from '../components/NewEntryForm';

interface Props {
  cardData: CardData[];
  listNames: string[];
  getLayout?: any;
}

const SearchPage: Page<Props> = ({listNames,  cardData}) => {
  const [completeSet, setCompleteSet] = useState<CardData[]>();
  const [matches, setMatches] = useState<CardData[]>([]);

  // read in any from local storage to add to set
  useEffect(() => {
    const localCards = listNames.reduce((acc, cur) => {
      const localItemsString = localStorage.getItem(cur);
      const localItems: CardData[] = localItemsString ? JSON.parse(localItemsString) : [];
      acc.push(...localItems);
      return acc;
    }, [] as CardData[]);
    
    setCompleteSet([...cardData, ...localCards]);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const filtered = completeSet?.filter(card => card.term.includes(e.target.value) || card.definition.includes(e.target.value));
    setMatches(filtered || []);
  }

  return (
    <div>
      <Head>
        <title>Flash Cards</title>
        <meta name="description" content="Learn a language with flash cards" />
      </Head>

      <Container as="main">
        <InputStyle type="text" onChange={handleChange} />
        <ul>
          {matches.map(card => <li>{card.term} = {card.definition}</li>)}
        </ul>
      </Container>
    </div>
  )
}

SearchPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <StandardLayout>
      {page}
    </StandardLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const listNames = fs.readdirSync('./data').map(file => file.replace('.json', ''));
  const cardData = listNames.reduce((acc, cur) => {
    const contents = JSON.parse(fs.readFileSync(`./data/${cur}.json`).toString());
    acc.push(...contents);
    return acc;
  }, [] as CardData[])

  return {
    props: {
      cardData,
      listNames,
    }
  }
}

export default SearchPage
