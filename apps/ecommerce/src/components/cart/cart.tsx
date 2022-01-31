import styled from '@emotion/styled';

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  List,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CartItem from '../cart-item/cart-item';

import { useGetCartQuery } from '../../redux/services/api';

import { formatPrice } from '../../utils/formatPrice';

/* eslint-disable-next-line */
export interface CartProps {
  open: boolean;
  toggleCart: (open: boolean) => () => void;
}

export function Cart({ open, toggleCart }: CartProps) {
  const {
    data: cartData = { _id: 'null', list: [] },
    isFetching,
    isLoading,
    isError,
  } = useGetCartQuery();

  return (
    <Drawer anchor={'right'} open={open} onClose={toggleCart(false)}>
      <DrawerContent role="presentation">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Typography variant="h6">Shopping Cart</Typography>
          <Button
            onClick={toggleCart(false)}
            style={{
              display: 'block',
              padding: '0.5rem 2rem',
            }}
            size={'large'}
            color="secondary"
          >
            <CloseIcon fontSize="large" />
          </Button>
        </Box>

        <Divider />
        <List sx={{ overflowY: 'scroll' }}>
          {isFetching || isLoading || !cartData ? (
            <CircularProgress sx={{ margin: 'auto', display: 'block' }} />
          ) : (
            cartData &&
            Object.values(cartData.list).map((product) => (
              <CartItem item={product} key={product._id} />
            ))
          )}
        </List>
        <Divider sx={{ margin: 'auto 0 0 0' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Typography
            sx={{
              padding: '1rem',
            }}
          >
            total:{' '}
            {formatPrice(
              Object.values(cartData.list).reduce(
                (sum, { price, count }) => sum + price * count,
                0
              )
            )}
          </Typography>
          <Button variant="contained" color="secondary" disabled>
            Checkout
          </Button>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;

const DrawerContent = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;

  @media (min-width: 600px) {
    width: 400px;
  }
`;
