import { Menu, ShoppingBasket } from '@mui/icons-material';

import {
  AppBar,
  Container,
  Toolbar,
  Badge,
  IconButton,
  Typography,
} from '@mui/material';

/* eslint-disable-next-line */
export interface NavbarProps {
  toggleCart: (open: boolean) => () => void;
}

export function Navbar({ toggleCart }: NavbarProps) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Keyboards.io
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="cart"
            sx={{ ml: 'auto' }}
            onClick={toggleCart(true)}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingBasket />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
