import { useState } from 'react';
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
      <ConjugationListStyle>
        <li>Io {data[index].term.slice(0, -3)}{data[index].isIscVerb ? 'isc' : ''}o</li>
        <li>Tu {data[index].term.slice(0, -3)}{data[index].isIscVerb ? 'isc' : ''}i</li>
        <li>Lui/lei {data[index].term.slice(0, -3)}{data[index].isIscVerb ? 'isc' : ''}{data[index].term.slice(-3) === 'are' ? 'a' : 'e'}</li>
        <li>Noi {data[index].term.slice(0, -3)}iamo</li>
        <li>Voi {data[index].term.slice(0, -3)}{data[index].term.slice(-3) === "are" ? 'ate' : data[index].term.slice(-3) === "ere" ? 'ete' : 'ite'}</li>
        <li>Loro {data[index].term.slice(0, -3)}{data[index].isIscVerb ? 'isc' : ''}ono</li>
      </ConjugationListStyle>
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