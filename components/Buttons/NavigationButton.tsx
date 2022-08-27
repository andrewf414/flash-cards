import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  background-color: var(--color-secondary-light);
  border: none;
  color: var(--color-text-light);
  padding: 10px 15px;
  min-width: 50px;
  height: 100%;
`;

interface Props {
    children: ReactNode;
    onClick: () => void;
    style?: CSSProperties;
}

function NavigationButton({children, onClick, style}: Props) {
    return <ButtonStyle onClick={onClick} style={style}>{children}</ButtonStyle>
}

export default NavigationButton;