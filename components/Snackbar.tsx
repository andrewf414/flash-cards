import styled from 'styled-components';
import Portal from '@reach/portal';
import { ReactNode } from 'react';

const SnackbarStyle = styled.div`
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  min-width: 100px;
  max-width: 200px;
  text-align: center;
  margin: 0 auto;
  padding: 10px;
  background-color: var(--color-secondary);
  color: var(--color-text-light);
  border-radius: 5px;
  box-shadow: 0 0 4px 0 var(--color-secondary-light);
`;

interface Props {
  children: ReactNode;
}

export function Snackbar({children}: Props) {
  return <Portal>
    <SnackbarStyle>{children}</SnackbarStyle>
  </Portal>
}