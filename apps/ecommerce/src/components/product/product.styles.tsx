import styled from '@emotion/styled';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from '@mui/material';

export const ProductCard = styled(Card)`
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const InCartChip = styled(Chip)`
  border-radius: 100%;
  width: 75px;
  height: 75px;
  position: absolute;
  z-index: 10;
  top: -20px;
  left: -20px;
  font-weight: bold;
`;

export const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 600px) {
    display: block;
    position: relative;
    &:hover {
      & > img {
        opacity: 0.7;
      }
      & > button {
        display: block;
      }
    }
  }
`;

export const CartAction = styled(Button)`
  margin: 0.5rem auto;

  @media (min-width: 600px) {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  max-width: fit-content;
  width: max-content;
`;

export const Content = styled(CardContent)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 100%;
  flex-grow: 1;
  padding: 1rem;
`;

export const Name = styled(Typography)`
  font-weight: bold;
  font-size: larger;
`;

export const Price = styled(Typography)`
  font-size: smaller;
`;

export const RatingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    display: block;
    position: relative;
    height: 20px;

    &:hover {
      button {
        display: block;
      }

      & > span {
        display: none;
      }
    }
  }
`;

export const AddRatingButton = styled(Button)`
  @media (min-width: 600px) {
    position: absolute;
    display: none;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }
  width: max-content;
  padding: 0 0.2rem;
`;
