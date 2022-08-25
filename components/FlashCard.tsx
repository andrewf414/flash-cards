import { ReactElement } from 'react';
import styled from 'styled-components'
import { CardData } from '../interfaces/FlashCard';
import { IoFlagSharp } from 'react-icons/io5';

const CardStyle = styled.div`
    border: solid 1px var(--color-primary-light);
    border-radius: 5px;
    width: 100%;
    min-height: 300px;
    text-align: center;
    padding: 15px;
    position: relative;
`;

const TermStyle = styled.span`
    font-size: 1.4rem;
    display: block;
`;

const DescriptionStyle = styled.p`
    font-size: 1rem;
`;

const LocalItemFlagStyle = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
`;

interface Props {
    card: CardData;
    showAnswer: boolean;
    invertTranslation: boolean;
}

function FlashCard({ card, showAnswer, invertTranslation }: Props): ReactElement {
    const { term, description, definition } = card;
    const termToDisplay = invertTranslation ? definition : term;
    const definitionToDisplay = !invertTranslation ? definition : term;
    
    return <CardStyle>
        {card.isLocal && <LocalItemFlagStyle><IoFlagSharp /></LocalItemFlagStyle>}
        <TermStyle>{termToDisplay}</TermStyle>
        {showAnswer && <TermStyle>{definitionToDisplay }</TermStyle>}
        {showAnswer && <DescriptionStyle>{description}</DescriptionStyle>}
    </CardStyle>
}

export default FlashCard