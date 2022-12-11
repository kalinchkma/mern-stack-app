import * as React from 'react';
import {Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

function PreLoad() {
  return (
    <Box sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
     }}>
      <CircularProgress color="inherit" />
    </Box>
  );
}


const WithPreLoader = WrapperdComponent => ({ isLoading, ...props }) => {
    return isLoading ? 
       ( <PreLoad />) :
       ( <WrapperdComponent {...props} />)
}


export default WithPreLoader
