import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  href:string;
}

const LinkStyle = styled.a`
  color: var(--color-primary);
`;

export function TextLink({ children, href }: Props) {
  return <Link passHref href={href}><LinkStyle>{children}</LinkStyle></Link>
}