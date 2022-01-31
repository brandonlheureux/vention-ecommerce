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

export function Product({
  product: { avgRating, imageUrl, name, price },
  delay,
}: ProductProps) {
  const [isInCart, setIsInCart] = useState(false);
  const [cartActionText, setCartActionText] = useState('Add to cart');

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
                onClick={() => console.log('activate rating modal')}
                variant="outlined"
              >
                Add Rating
              </AddRatingButton>
              <Rating precision={0.5} size="small" readOnly value={avgRating} />
            </RatingContainer>
          </Content>
        </ProductCard>
      </Box>
    </Fade>
  );
}

export default Product;
