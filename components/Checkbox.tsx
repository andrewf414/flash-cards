import styled from 'styled-components';
import { forwardRef} from 'react';

const CheckmarkStyle = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  :after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const InputStyle = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  :checked ~ ${CheckmarkStyle}:after {
    display: block;
  }
`;

const ContainerStyle = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  :hover ${InputStyle} ~ ${CheckmarkStyle} {
    background-color: #ccc;
  }
  & ${InputStyle}:checked ~ ${CheckmarkStyle} {
    background-color: var(--color-primary);
  }
`;

type Props = {
  label: string;
} & Record<string, any>;

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef<HTMLInputElement, Props>(({label, ...props}, ref) => (
  <ContainerStyle>
    {label}
    <InputStyle type="checkbox" {...props} ref={ref} />
    <CheckmarkStyle />
  </ContainerStyle>
))

export { Checkbox };
