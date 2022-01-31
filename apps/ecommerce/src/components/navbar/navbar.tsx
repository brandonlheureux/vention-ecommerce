import { AppBar, Stack, Container } from '@mui/material';

/* eslint-disable-next-line */
export interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <h1>Warriors of the key</h1>
      </Container>
    </AppBar>
  );
}

export default Navbar;
