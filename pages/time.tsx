import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import { ReactNode } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';
import React from 'react';
import { UnorderedList } from '../components/Lists/UnorderedList';

interface Props {
  getLayout?: any;
}

const TimePage: Page<Props> = () => (
  <div>
    <Head>
      <title>Flash Cards</title>
      <meta name="description" content="Learn a language with flash cards" />
    </Head>

    <Container as="main">
      <h2>How Often?</h2>
      <table>
        <tbody>
          <tr><td>sempre</td><td>always</td></tr>
          <tr><td>spesso</td><td>often</td></tr>
          <tr><td>di solito</td><td>usually</td></tr>
          <tr><td>qualche volta</td><td>sometimes</td></tr>
          <tr><td>rarmente</td><td>hardly ever/rarely</td></tr>
          <tr><td>non...mai</td><td>never</td></tr>
          <tr><td>una volta all settimana</td><td>once a week</td></tr>
        </tbody>
      </table>

      <h2>When?</h2>
      <h3>Days of the Week</h3>
      <UnorderedList>
        <li>lunedi</li>
        <li>martedi</li>
        <li>mercoledi</li>
        <li>giovedi</li>
        <li>venerdi</li>
        <li>sabato</li>
        <li>domenica</li>
      </UnorderedList>
      <aside>Using the definite article (il/la) means every. i.e. il lunedi is on Mondays</aside>

      <h3>Time of Day</h3>
      <UnorderedList>
        <li>mattina</li>
        <li>pomeriggio</li>
        <li>sera</li>
      </UnorderedList>
      <div>
        verso le sette = about 7
        verso mezzogiorno = about midday
        in punto = sharp
      </div>

      <h3>Relative</h3>
      <table>
        <tbody>
          <tr><td>adesso</td><td>now</td></tr>
          <tr><td>dopo</td><td>later</td></tr>
          <tr><td>prima di</td><td>before</td></tr>
          <tr><td>nel fine settimana</td><td>on the weekendage</td></tr>
        </tbody>
      </table>
    </Container>
  </div>
)

TimePage.getLayout = function getLayout(page: ReactNode) {

  return (
    <StandardLayout>
      {page}
    </StandardLayout>
  );
};

export default TimePage
