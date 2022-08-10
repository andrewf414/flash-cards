import { ReactElement } from 'react';
import styled from 'styled-components'
import { CardData } from '../interfaces/FlashCard';

const CardStyle = styled.div`
    border: solid 1px black;
    border-radius: 5px;
    width: 100%;
    min-height: 300px;
    text-align: center;
    padding: 15px;
`;

const TermStyle = styled.span`
    font-size: 1.4rem;
    display: block;
`;

const DescriptionStyle = styled.p`
    font-size: 1rem;
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
        <TermStyle>{termToDisplay}</TermStyle>
        {showAnswer && <TermStyle>{definitionToDisplay }</TermStyle>}
        {showAnswer && <DescriptionStyle>{description}</DescriptionStyle>}
    </CardStyle>
}

export default FlashCard