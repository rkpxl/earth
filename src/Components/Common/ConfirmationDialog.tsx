import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { RootState } from '../../Utils/types/type';
import { closeConfirmation } from '../../Store/reducers/confirm';

interface IProps {
  handleConfirm: (...args : any[]) => void
}

const ConfirmationPopup = (props : IProps) : JSX.Element => {
  const { handleConfirm } = props
  const dispatch = useDispatch();
  const { isOpen , title, args } = useSelector((state: RootState) => state.confirmation);

  const handleClose = () => {
    dispatch(closeConfirmation());
  };

  const handleConfirmation = () => {
    handleConfirm(args)
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to proceed?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmation} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPopup;
