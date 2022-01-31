import { ReactChild, useState } from 'react';
import { Cart } from '../../components/cart/cart';
import Navbar from '../../components/navbar/navbar';
import { ExpandContent, Screen } from './main.styles';

/* eslint-disable-next-line */
export interface ShopProps {
  children: ReactChild;
}

export function Main({ children }: ShopProps) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = (open: boolean) => () => {
    setCartOpen(open);
  };

  return (
    <Screen>
      <Cart open={cartOpen} toggleCart={toggleCart} />
      <Navbar toggleCart={toggleCart} />
      <ExpandContent>{children}</ExpandContent>
    </Screen>
  );
}

export default Main;
