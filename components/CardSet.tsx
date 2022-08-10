import { useState } from 'react';
import Button from '../components/Button';
import FlashCard from '../components/FlashCard';
import { CardData } from '../interfaces/FlashCard';

export function CardSet({ data }: { data: CardData[] }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [invertTranslation, setInvertTranslation] = useState(false);

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
    <Button onClick={handleSwitchTranslation}>Switch Translation</Button>
    <FlashCard card={data[index]} showAnswer={showAnswer} invertTranslation={invertTranslation} />
    <div style={{ position: 'relative', width: '100%' }}>
      {!showAnswer && <Button onClick={handleCheck} style={{
        position: 'absolute',
        left: 0
      }}>Check</Button>}
      <Button onClick={handleNext} style={{
        position: 'absolute',
        right: 0
      }}>Next</Button>
    </div>
  </>
}

export default CardSet;