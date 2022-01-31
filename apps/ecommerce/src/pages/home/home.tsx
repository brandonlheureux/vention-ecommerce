import styled from '@emotion/styled';
import { Container, Box, Paper, Button, Typography, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Container maxWidth={'lg'} sx={{ height: '100%' }}>
      <Fade timeout={300} in={true}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Typography variant="h3" component="h1" textAlign={'center'}>
            Welcome to keyboard.io!
          </Typography>
          <HeroImage variant="outlined">
            <Image src="/assets/images/customKeyboard.png" />
          </HeroImage>
          <ShopLink to="/shop">
            <Button>
              <Typography variant="h4" component="h4">
                Shop Now!
              </Typography>
            </Button>
          </ShopLink>
        </Box>
      </Fade>
    </Container>
  );
}

export default Home;

const Image = styled('img')`
  max-width: 100%;
`;

const HeroImage = styled(Paper)`
  max-width: 800px;
  max-height: 400px;
  overflow: hidden;
`;

const ShopLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 5px;
  border: solid black 2px;
  &:hover {
    background-color: aliceblue;
  }
`;
