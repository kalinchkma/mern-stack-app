import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, FormControl, Select, MenuItem, InputLabel, Button, FormHelperText, Input, TextField } from '@mui/material';

export default function MessageOrderCard({
  product, 
  playerId, 
  sellers, 
  selectSeller, 
  selectedSeller,
  handleOrder,
  setTransactionLastDigit,
  transactionLastDigit
}) {


  return (
    <List sx={{ 
      maxWidth: "100%", 
      background: "#e5e5e57a",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width:"100%",
      marginLeft: "auto",
      marginBottom: "30px"

      }}>
      <ListItem alignItems="flex-start" sx={{flexDirection: "column"}}>
        
        <ListItemText
          component="div"
          primary={product.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                PlayerId: {playerId}
              </Typography>
              Price: {product.price}
             
            </React.Fragment>
          }
        />

        <Grid container spacing={1}  >
              <Grid item xs={8}>
                  <FormControl variant="standard" fullWidth>
                      <InputLabel id="seller">Select Seller</InputLabel>
                      <Select
                        labelId="seller"
                        label="Select Seller"
                        value={selectedSeller.id}
                        onChange={(e) => selectSeller(e.target.value)}
                        error={selectedSeller.error}
                      > 
                      {
                        sellers &&
                        sellers.map(seller => (
                          <MenuItem key={seller._id} value={seller._id}>{seller.name}</MenuItem>
                        ))
                      }
                      </Select>
                      {
                        selectedSeller.error &&
                        <FormHelperText error > Please select Seller </FormHelperText>
                      }
                  </FormControl>
              </Grid>

              <Grid item xs={4} sx={{display: "flex", alignItems: "end", justifyContent: "center"}}>
                {/* dynamically setting the order button enable and disable */}
                  <Button variant='contained'
                  sx={{display: "inline-flex", alignItems: "center", justifyContent: "center"}} 
                  onClick={handleOrder} 
                  disabled={selectedSeller.seller !== null && transactionLastDigit.length === 4 ? false : true}
                  >
                  Order</Button>
              </Grid>
              {/* rendering the transaction number */}
              { selectedSeller.select === true && 
                Object.keys(selectedSeller.seller.transactionNumbers).length > 0 &&
              <Grid item xs={12}>
                 <Typography sx={{marginBottom: '10px'}}>Please pay first with the above given any of those numbers and give the last 4 digits of your transaction number</Typography>
                  {
                    Object.keys(selectedSeller.seller.transactionNumbers).map(value => (
                
                      <Typography key={value} sx={{color: '#1976d2', fontSize: '15px'}}> {value} number: {selectedSeller.seller.transactionNumbers[value]}</Typography>
                    ))
                  }
                 
              </Grid>
              }
              {/* transaction number entry field */}
              {
              selectedSeller.select === true &&  Object.keys(selectedSeller.seller.transactionNumbers).length > 0 &&
              <Grid item xs={12}>
               
                <FormControl variant='standard' size='small' fullWidth>
                  <TextField size='small' type="number" onChange={(e) => setTransactionLastDigit(e.target.value)} label="Enter last 4 digit of your transaction number "/>
                </FormControl>
              </Grid>
              }
              {/* if seller dose not have a transaction number this error message will show */}
              {
                 selectedSeller.select === true &&  Object.keys(selectedSeller.seller.transactionNumbers).length <= 0 &&
                 <Grid item xs={12}>
                    <Typography  sx={{color: 'red', fontSize: '15px'}}>
                        This seller dose not have an transaction number please select another seller
                    </Typography>
                 </Grid>
              }
          </Grid>
      </ListItem>
    </List>
  );
}
