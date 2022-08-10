import { FC, ReactNode } from 'react';
import { Header } from './Header';

type Props = {
  children: ReactNode;
};

const links = [
  {slug: '/', text: 'Home'},
  {slug: '/add', text: 'Add New'},
];

const StandardLayout: FC<Props> = ({
  children,
}) => (
  <>
    <Header links={links} />
    {children}
  </>
);

export default StandardLayout;
