import styled from '@emotion/styled';

import {
  Modal,
  IconButton,
  Typography,
  Box,
  Divider,
  Rating,
} from '@mui/material';
import { Close, Send } from '@mui/icons-material';
import { useState } from 'react';
import { IProduct } from '@ecommerce/models';

export interface SubmitReviewProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: IProduct;
}

export function SubmitReview({
  open,
  setOpen,
  product: { name },
}: SubmitReviewProps) {
  const [review, setReview] = useState(0);
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
            precision={0.5}
            value={review}
            onChange={(_, val) => setReview(val || 0)}
          />
          <IconButton
            onClick={() => console.log('submit rating')}
            color="primary"
          >
            <Send />
          </IconButton>
        </Box>
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