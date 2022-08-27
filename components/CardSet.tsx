import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import Button from './Buttons/Button';
import FlashCard from '../components/FlashCard';
import { CardData } from '../interfaces/FlashCard';
import { Modal } from './Modal';
import NavigationButton from './Buttons/NavigationButton';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const ButtonsContainerStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ConjugationListStyle = styled.ul`
  list-style: none;
`;

const CardAndNavWrapperStyle = styled.div`
  width: 100%;
  display: flex;

  @media(max-width: 600px) {
    button {
      display: none;
    }
  }
`;

/**
 * 
 * @param verb italian verb (e.g. parlare, mettere, dormire)
 * @param isIscVerb boolean for isc verbs like finire, capire
 * @returns object with conjugations
 */
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

/**
 * Component to display conjugated verb
 * @param data CardData
 * @returns Component with a styled list of conjugated verb
 */
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    onSwipedDown: () => handleCheck(),
    preventScrollOnSwipe: true,
  });

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

  const handlePrevious = () => {
    setShowAnswer(false);
    if ((index - 1) < 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
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
    
    <CardAndNavWrapperStyle {...swipeHandlers}>
      <NavigationButton onClick={handleNext}><BsChevronLeft /></NavigationButton>
      <FlashCard card={data[index]} showAnswer={showAnswer} invertTranslation={invertTranslation} />
      <NavigationButton onClick={handleNext}><BsChevronRight /></NavigationButton>
    </CardAndNavWrapperStyle>

    <ButtonsContainerStyle style={{ position: 'relative', width: '100%' }}>
      {!showAnswer && <Button onClick={handleCheck} style={{
        position: 'absolute',
        left: 0
      }}>Check</Button>}
      {isVerb && <Button onClick={open} style={{
        position: 'absolute',
        right: 0,
      }}>Conjugate</Button>}
      
    </ButtonsContainerStyle>
  </>
}

export default CardSet;