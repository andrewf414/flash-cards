import type { GetStaticProps } from "next";
import Head from "next/head";
import fs from "fs";
import { ReactNode, useEffect, useState } from "react";
import StandardLayout from "../components/Layout";
import { Page } from "../interfaces/Page";
import { Container } from "../components/Container";
import React from "react";
import { CardData } from "../interfaces/FlashCard";
import { InputStyle } from "../components/NewEntryForm";
import { UnorderedList } from "../components/Lists/UnorderedList";
import FlashCard from "../components/FlashCard";
import debounce from "lodash/debounce";
import Paragraph from "../components/Paragraph";
import { Code } from "../components/Code";

interface Props {
  getLayout?: any;
}

const InstructionsPage: Page<Props> = () => {
  return (
    <div>
      <Head>
        <title>Flash Cards</title>
        <meta name="description" content="Learn a language with flash cards" />
      </Head>

      <Container as="main">
        <h1>How to use</h1>
        <h2>Flash Cards</h2>
        <Paragraph>
          From the home page, you can select a type of words that you want to
          practice. Once you have done that, you will get a list of words in
          Italian to practice. You can press <Code>Switch Translation</Code> if
          you want to view English and check the Italian instead.
        </Paragraph>
        <Paragraph>
          Navigating between cards can be done by swiping left or right, or if
          on a larger screen like a computer you also have buttons to press
          (though swipe still works if you have a touchscreen).
        </Paragraph>
        <Paragraph>
          To check the answer, either swipe down or press the check button.
        </Paragraph>
      </Container>

      <h2>Search</h2>
      <Paragraph>
        You can search for a word (English or Italian) that you know is in there
        somewhere from the search page. Just start typing and you will get
        results.
      </Paragraph>
    </div>
  );
};

InstructionsPage.getLayout = function getLayout(page: ReactNode) {
  return <StandardLayout>{page}</StandardLayout>;
};

export default InstructionsPage;
