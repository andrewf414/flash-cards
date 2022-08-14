import styled from 'styled-components';
import { ReactNode } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import VisuallyHidden from '@reach/visually-hidden';

const DialogOverlayStyle = styled(DialogOverlay)`
  &[data-reach-dialog-overlay] {
    /* background-color: rgba(0, 0, 0, 0.8); */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DialogContentStyle = styled(DialogContent)`
  &[data-reach-dialog-content] {
    background-color: #fff;
    box-shadow: 0px 10px 50px hsla(45, 0%, 0%, 1);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 900px) {
      width: 80vw;
    }
    @media (max-width: 375px) {
      width: 90vw;
    }
  }
`;

const CloseModalButtonStyle = styled.button`
  color: var(--color-secondary);
  border: none;
  background-color: transparent;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 35px;
  font-weight: bold;
  :hover,
  :focus {
    color: var(--colour-primary);
    text-decoration: none;
    cursor: pointer;
  }
`;

interface Props {
  children: ReactNode;
  isOpen: boolean;
  close: () => void;
}

export function Modal({ children, isOpen, close }: Props) {
  return <DialogOverlayStyle onDismiss={close} isOpen={isOpen}>
    <DialogContentStyle aria-label="Slide in panel">
      {children}
      <CloseModalButtonStyle type="button" onClick={close}>
      <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CloseModalButtonStyle>
    </DialogContentStyle>
  </DialogOverlayStyle>
}