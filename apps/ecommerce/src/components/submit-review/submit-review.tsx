import styled from '@emotion/styled';

import {
  Modal,
  IconButton,
  Typography,
  Box,
  Divider,
  Rating,
  CircularProgress,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { useState } from 'react';
import { IProduct } from '@ecommerce/models';

import axios from 'axios';

export interface SubmitReviewProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
  refetch: () => void;
}

export function SubmitReview({
  open,
  setOpen,
  product: { name, _id },
  refetch,
}: SubmitReviewProps) {
  const [review, setReview] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitReview = () => {
    setIsLoading(true);
    axios
      .put(`/api/products/${_id}`, { rating: review })
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          setOpen(false);
          // trigger query refetch for page #
          // a bit of prop drilling, could be better organized.
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <RatingInput
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <CloseModal onClick={() => setOpen(false)} color="primary">
          <Close />
        </CloseModal>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Submit a review for: {name}
            </Typography>
            <Divider
              sx={{
                width: '100%',
                background: 'lightgray',
                marginBottom: '0.5rem',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <Rating
                size="large"
                precision={1}
                value={review}
                onChange={(_, val) => setReview(val || 1)}
              />
              <IconButton onClick={handleSubmitReview} color="primary">
                <Send />
              </IconButton>
            </Box>
          </>
        )}
      </RatingInput>
    </Modal>
  );
}

export default SubmitReview;

const RatingInput = styled(Box)`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  position: relative;
  top: 50%;
  margin: 1rem;
  transform: translate(0, -50%);
  @media (min-width: 600px) {
    max-width: 400px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CloseModal = styled(IconButton)`
  position: absolute;
  border-radius: 100%;
  top: -0.25rem;
  right: -0.25rem;
`;
