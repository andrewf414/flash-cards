import { ReactNode } from "react"
import styled from "styled-components";

const ParagraphStyle = styled.p`
  margin: 0;
  padding: 0 0 5px 0;
`;

interface Props {
  children: ReactNode;
}

function Paragraph({children}: Props) {
  return <ParagraphStyle>{children}</ParagraphStyle>
}

export default Paragraph;
