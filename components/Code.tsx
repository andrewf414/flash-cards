import { ReactNode } from "react";
import styled from "styled-components"

const CodeStyle = styled.pre``;

interface Props {
  children: ReactNode;
}

export function Code({children}: Props) {
  return <CodeStyle>{children}</CodeStyle>
}