import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import FlashCard from '../components/FlashCard';
import { CardData } from '../interfaces/FlashCard';
import { Modal } from './Modal';

const ButtonsContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConjugationListStyle = styled.ul`
  list-style: none;
`;

function conjugate(verb: string, isIscVerb: boolean) {
  const isAre = /are$/i.test(verb);
  const isCareGare = /[cg]are$/i.test(verb);

  return {
    io: `${verb.slice(0, -3)}${isIscVerb ? 'isc' : ''}o`,
    tu: `${verb.slice(0, -3)}${isIscVerb ? 'isc' : ''}${isCareGare ? 'h' : ''}i`,
    lei: `${verb.slice(0, -3)}${isIscVerb ? 'isc' : ''}${isAre ? 'a' : 'e'}`,
    noi: `${verb.slice(0, -3)}${isCareGare ? 'h' : ''}iamo`,
    voi: `${verb.slice(0, -3)}${isAre ? 'a' : 'e'}te`,
    loro: `${verb.slice(0, -3)}${isIscVerb ? 'isc' : ''}ono`,
  }
}

function ConjugationList({ data }: { data: CardData }) {
  const conjugation = conjugate(data.term, !!data.isIscVerb);

  return <ConjugationListStyle>
    <li>Io {conjugation.io}</li>
    <li>Tu {conjugation.tu}</li>
    <li>Lui/lei {conjugation.lei}</li>
    <li>Noi {conjugation.noi}</li>
    <li>Voi {conjugation.voi}</li>
    <li>Loro {conjugation.loro}</li>
  </ConjugationListStyle>
}

export function CardSet({ data, isVerb }: { data: CardData[]; isVerb: boolean }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [invertTranslation, setInvertTranslation] = useState(false);
  const [showConjugation, setShowConjugation] = useState(false);
  const open = () => setShowConjugation(true);
  const close = () => setShowConjugation(false);

  const handleCheck = () => {
    setShowAnswer(true);
  }

  const handleNext = () => {
    setShowAnswer(false);
    if ((index + 1) === data.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }

  const handleSwitchTranslation = () => {
    setInvertTranslation(!invertTranslation);
  }

  return <>
    {isVerb && <Modal isOpen={showConjugation} close={close}>
      {data[index].isIrregularVerb ? <ConjugationListStyle>
        <li>Io {data[index].conjugation?.io}</li>
        <li>Tu {data[index].conjugation?.tu}</li>
        <li>Lui/lei {data[index].conjugation?.lei}</li>
        <li>Noi {data[index].conjugation?.noi}</li>
        <li>Voi {data[index].conjugation?.voi}</li>
        <li>Loro {data[index].conjugation?.loro}</li>
      </ConjugationListStyle> : <ConjugationList data={data[index]} />}
    </Modal>}
    <Button onClick={handleSwitchTranslation}>Switch Translation</Button>
    <FlashCard card={data[index]} showAnswer={showAnswer} invertTranslation={invertTranslation} />
    <ButtonsContainerStyle style={{ position: 'relative', width: '100%' }}>
      {!showAnswer && <Button onClick={handleCheck} style={{
        position: 'absolute',
        left: 0
      }}>Check</Button>}
      {isVerb && <Button onClick={open} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100px',
        margin: '0 auto'
      }}>Conjugate</Button>}
      <Button onClick={handleNext} style={{
        position: 'absolute',
        right: 0
      }}>Next</Button>
    </ButtonsContainerStyle>
  </>
}

export default CardSet;