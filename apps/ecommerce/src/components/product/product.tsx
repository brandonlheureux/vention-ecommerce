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

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

import {
  useAddCartItemMutation,
  useRemoveCartItemMutation,
} from '../../redux/services/api';
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
  page: number;
}

export function Product({ product, delay, page }: ProductProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: any = useAppSelector((state) => state.api.queries);
  const { avgRating, imageUrl, name, price } = product;
  const [isInCart, setIsInCart] = useState(
    product._id in (state?.['getCart(undefined)']?.data?.list || {})
  );
  const [cartActionText, setCartActionText] = useState('Add to cart');
  const [openModal, setOpenModal] = useState(false);

  const [removeCartItem] = useRemoveCartItemMutation();
  const [addCartItem] = useAddCartItemMutation();

  const handleCartAction = () => {
    if (isInCart) {
      removeCartItem(product._id).then((res) => {
        setCartActionText('Add to cart');
        setIsInCart(false);
      });
    } else {
      addCartItem(product).then((res) => {
        setCartActionText('Remove from cart');
        setIsInCart(true);
      });
    }
  };

  useEffect(() => {
    const inCart =
      product._id in (state?.['getCart(undefined)']?.data?.list || {});
    setIsInCart(inCart);
    setCartActionText(inCart ? 'Remove from cart' : 'Add to cart');
  }, [state, setIsInCart]);

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
                page={page}
              />
            </RatingContainer>
          </Content>
        </ProductCard>
      </Box>
    </Fade>
  );
}

export default Product;
