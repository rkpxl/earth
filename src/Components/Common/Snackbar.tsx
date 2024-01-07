import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../../Store/reducers/snackbar';
import * as type from '../../Utils/types/type';

const Snackbar: React.FC = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state: type.RootState) => state.snackbar);

  useEffect(() => {
    if (snackbar.message) {
      const timer = setTimeout(() => {
        dispatch(hideMessage());
      }, snackbar.duration);

      return () => clearTimeout(timer);
    }
  }, [snackbar, snackbar.message, snackbar.duration, dispatch]);

  // Use a portal to render the Snackbar outside the current component hierarchy
  return snackbar.message ? (
    ReactDOM.createPortal(
      <MuiSnackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={true}
        onClose={() => dispatch(hideMessage())}
      >
        <Alert onClose={() => dispatch(hideMessage())} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </MuiSnackbar>,
      document.body // Render the portal in the body of the document
    )
  ) : null;
};

export default Snackbar;
