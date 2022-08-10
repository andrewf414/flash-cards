import Link from 'next/link';
import styled from 'styled-components';
import { TextLink } from './TextLink';

const NavStyle = styled.nav`
  margin: 10px 20px;
  padding: 5px 10px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      90deg,
      #fff,
      var(--color-primary-light),
      #fff
    )
    1;
`;

export function Header({links}: {links: {slug: string, text: string}[]}) {
  return <header>
    <NavStyle>{links.map(link => (<TextLink key={link.slug} href={link.slug}>{link.text}</TextLink>))}</NavStyle>
  </header>
}

export default Header;
