import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import { ChangeEvent, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';
import React from 'react';
import { CardData } from '../interfaces/FlashCard';
import { InputStyle } from '../components/NewEntryForm';
import { UnorderedList } from '../components/Lists/UnorderedList';
import FlashCard from '../components/FlashCard';

interface Props {
  cardData: CardData[];
  listNames: string[];
  getLayout?: any;
}

const SearchPage: Page<Props> = ({ listNames, cardData }) => {
  const [completeSet, setCompleteSet] = useState<CardData[]>();
  const [searchMatches, setSearchMatches] = useState<CardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardData | undefined>();

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
    if (selectedCard) setSelectedCard(undefined);
    if (e.target.value) {
      const filtered = completeSet?.filter(card => card.term.includes(e.target.value) || card.definition.includes(e.target.value));
      setSearchMatches(filtered || []);
    } else {
      setSearchMatches([])
    }
  }

  const handleSelect = (card: CardData) => {
    console.log(card);
    setSelectedCard(card);
  }

  return (
    <div>
      <Head>
        <title>Flash Cards</title>
        <meta name="description" content="Learn a language with flash cards" />
      </Head>

      <Container as="main">
        <InputStyle type="text" onChange={handleChange} />
        {selectedCard ?
          <FlashCard card={selectedCard} showAnswer invertTranslation /> :
          <UnorderedList>
            {searchMatches.map(card => <li onClick={() => handleSelect(card)}>{card.term} = {card.definition}</li>)}
          </UnorderedList>
        }
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
