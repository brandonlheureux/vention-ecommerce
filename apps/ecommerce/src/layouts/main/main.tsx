import { ReactChild } from 'react';
import Navbar from '../../components/navbar/navbar';
import { ExpandContent, Screen } from './main.styles';

/* eslint-disable-next-line */
export interface ShopProps {
  children: ReactChild;
}

export function Main({ children }: ShopProps) {
  return (
    <Screen>
      <Navbar />
      <ExpandContent>{children}</ExpandContent>
    </Screen>
  );
}

export default Main;
