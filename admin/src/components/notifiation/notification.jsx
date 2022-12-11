

import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';


const Notification = ({ open, message, handleClose, severity}) => {

  const state = {
    vertical: 'top',
    horizontal: 'right',
  }

  const { vertical, horizontal } = state;


  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notification;