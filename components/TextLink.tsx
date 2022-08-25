import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  href: string;
  alternate?: boolean;
}

const LinkStyle = styled.a`
  color: var(--color-primary);
  :hover {
    color: var(--color-primary-light);
  }

  &.alternate {
    color: var(--color-secondary);
    :hover {
      color: var(--color-primary);
    }
  }
`;

export function TextLink({ children, href, alternate = false }: Props) {
  return <Link passHref href={href}><LinkStyle className={alternate ? 'alternate' : 'link'}>{children}</LinkStyle></Link>
}
