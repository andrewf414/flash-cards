import { ReactNode } from "react";
import styled from "styled-components"

const ListStyle = styled.ul`
  list-style-type: square;
  width: fit-content;
  > * {
    padding: 5px 0;
    border-top: solid 1px var(--color-primary-light);
  }
`;

interface Props {
  children: ReactNode;
}

export function UnorderedList({children}: Props) {
  return <ListStyle>
    {children}
  </ListStyle>
}