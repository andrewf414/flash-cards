import styled from 'styled-components';
import { CONSTANTS } from '../lib/constants';
import { TextLink } from './TextLink';

const HeaderStyle = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
      90deg,
      #fff,
      var(--color-primary-light),
      #fff
    )
    1;
`;

const NavStyle = styled.nav`
  margin: 10px 20px;
  padding: 5px 10px;
  display: flex;
  gap: 15px;
`;

const VersionStyle = styled.span`
  position: absolute;
  bottom: 0;
  right: 40px;
  font-size: 0.8rem;
`;

export function Header({links}: {links: {slug: string, text: string}[]}) {
  return <HeaderStyle>
    <NavStyle>{links.map(link => (<TextLink key={link.slug} href={link.slug} alternate>{link.text}</TextLink>))}</NavStyle>
    <VersionStyle>v{CONSTANTS.version}</VersionStyle>
  </HeaderStyle>
}

export default Header;
