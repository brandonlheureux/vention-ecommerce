import { ICartItem } from '@ecommerce/models';
import { useState } from 'react';

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Box,
  ListItemText,
  TextField,
  IconButton,
} from '@mui/material';
import { Edit, Check, Delete } from '@mui/icons-material';

import { useSnackbar } from 'notistack';

import { formatPrice } from '../../utils/formatPrice';
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from '../../redux/services/api';

export interface CartItemProps {
  item: ICartItem;
}

export const CartItem = ({
  item: { name, imageUrl, price, count, _id },
}: CartItemProps) => {
  const [editing, setEditing] = useState(false);
  const [itemCount, setItemCount] = useState(count);
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setItemCount(parseInt(event.target.value) || 0);
  };

  const handleSubmitCount = () => {
    updateCartItem({ newCount: itemCount, id: _id })
      .then(() =>
        enqueueSnackbar(`Item "${name}" successfully updated`, {
          variant: 'success',
        })
      )
      .catch((error) =>
        enqueueSnackbar('Error updating item', {
          variant: 'error',
        })
      );
    setEditing(false);
  };

  const handleDelete = () => {
    removeCartItem(_id)
      .then(() =>
        enqueueSnackbar(`Item "${name}" successfully removed`, {
          variant: 'success',
        })
      )
      .catch((error) =>
        enqueueSnackbar('Error removing item', {
          variant: 'error',
        })
      );
    console.log('remove item by id: ' + _id);
  };

  return (
    <ListItem key={_id}>
      <ListItemAvatar>
        <Avatar alt={name} src={imageUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <Box
            sx={{
              display: 'flex',
              gap: '0.2rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <p>{formatPrice(price)}</p>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                type={'number'}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  max: 99,
                  min: 0,
                  style: { padding: '0.5rem', width: '2.5rem' },
                }}
                value={itemCount}
                onChange={handleChangeCount}
                disabled={!editing}
              />

              {editing ? (
                <IconButton onClick={handleSubmitCount} color="primary">
                  <Check />
                </IconButton>
              ) : (
                <IconButton onClick={() => setEditing(true)} color="primary">
                  <Edit />
                </IconButton>
              )}
              <IconButton onClick={handleDelete} color="error">
                <Delete />
              </IconButton>
            </Box>
          </Box>
        }
      />
    </ListItem>
  );
};

export default CartItem;
