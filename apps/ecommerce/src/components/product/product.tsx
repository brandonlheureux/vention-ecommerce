import { IProduct } from '@ecommerce/models';

import {
  Typography,
  CardMedia,
  Box,
  Divider,
  Rating,
  Fade,
  Grow,
} from '@mui/material';
import { useState } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import SubmitReview from '../submit-review/submit-review';

import {
  AddRatingButton,
  CartAction,
  Content,
  ImageContainer,
  InCartChip,
  Name,
  Price,
  ProductCard,
  RatingContainer,
} from './product.styles';

export interface ProductProps {
  product: IProduct;
  delay: number;
}

export function Product({ product, delay }: ProductProps) {
  const { avgRating, imageUrl, name, price } = product;
  const [isInCart, setIsInCart] = useState(false);
  const [cartActionText, setCartActionText] = useState('Add to cart');
  const [openModal, setOpenModal] = useState(false);

  const handleCartAction = () => {
    // should be controlled through the redux store
    if (isInCart) {
      // remove(setIsInCart)
      setCartActionText('Add to cart');
      setIsInCart(false);
    } else {
      // add(setIsInCart)
      setCartActionText('Remove from cart');
      setIsInCart(true);
    }
  };

  return (
    <Fade in={true} timeout={300} style={{ transitionDelay: `${delay}ms` }}>
      <Box sx={{ boxShadow: 6, position: 'relative' }}>
        <Grow in={isInCart} timeout={300}>
          <InCartChip label="In Cart" size="medium" color="error" />
        </Grow>
        <ProductCard>
          <ImageContainer>
            <CartAction
              color="secondary"
              variant="contained"
              onClick={handleCartAction}
            >
              <Typography>{cartActionText}</Typography>
            </CartAction>
            <CardMedia src={imageUrl} component="img" height="300" />
          </ImageContainer>
          <Content>
            <Divider
              sx={{
                width: '100%',
                background: 'lightgray',
                marginBottom: '0.5rem',
              }}
            />
            <Name>{name}</Name>
            <Price>{formatPrice(price)}</Price>
            <RatingContainer>
              <AddRatingButton
                onClick={() => setOpenModal(true)}
                variant="outlined"
              >
                Add Rating
              </AddRatingButton>
              <Rating precision={0.5} size="small" readOnly value={avgRating} />
              <SubmitReview
                open={openModal}
                setOpen={setOpenModal}
                product={product}
              />
            </RatingContainer>
          </Content>
        </ProductCard>
      </Box>
    </Fade>
  );
}

export default Product;
