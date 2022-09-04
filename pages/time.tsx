import type { GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs';
import { ReactNode } from 'react';
import StandardLayout from '../components/Layout';
import { Page } from '../interfaces/Page';
import { Container } from '../components/Container';
import React from 'react';

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
        <thead>
          <tr>
            <th>Italian</th>
            <th>English</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>sempre</td><td>always</td></tr>
          <tr><td>spesso</td><td>often</td></tr>
          <tr><td>di solito</td><td>usually</td></tr>
          <tr><td>qualche volta</td><td>sometimes</td></tr>
          <tr><td>rarmente</td><td>hardly ever/rarely</td></tr>
          <tr><td>non...mai</td><td>never</td></tr>
        </tbody>
      </table>

      <h2>Days of the Week</h2>
      <ul>
        <li>lunedi</li>
        <li>martedi</li>
        <li>mercoledi</li>
        <li>giovedi</li>
        <li>venerdi</li>
        <li>sabato</li>
        <li>domenica</li>
      </ul>
      <aside>Using the definite article (il/la) means every. i.e. il lunedi is on Mondays</aside>

      <h2>Time of Day</h2>
      <ul>
        <li>mattina</li>
        <li>pomeriggio</li>
        <li>sera</li>
      </ul>
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
