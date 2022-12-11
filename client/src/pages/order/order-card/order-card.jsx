import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Grid, FormControl, Select, MenuItem, InputLabel, Button, FormHelperText,} from '@mui/material';
import { Box } from '@mui/system';

import { CopyToClipboard } from 'react-copy-to-clipboard';

// import logo
import Nagad from "../../../assets/nagad.svg";
import Bkash from "../../../assets/bkash.svg";


export default function OrderCard({
  cart, 
  sellers, 
  selectSeller, 
  selectedSeller,
  handleOrder,
  setTransactionLastDigit,
  transactionLastDigit,
  setTransactionMethod
}) {

  const [selectedNumber, setSelectedNumber] = React.useState("");

  const [copy, setCopy] = React.useState(false);

  // select transaction mentod handler
  const selectTransactionMethodHandler = (number, method) => {
    setTransactionMethod(method);
    setSelectedNumber(number); 
  }
  
  


  return (
    <List sx={{ 
      maxWidth: "100%", 
      background: "#fff",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      width:"100%",
      marginLeft: "auto",
      marginBottom: "30px"

      }}>
      <ListItem alignItems="flex-start" sx={{flexDirection: "column"}}>
      
        {/* displaying order */}
        {
          cart &&
          cart.products.map((product, index) => {
            if(typeof product === "object") {
              return (
                <ListItemText
                  key={index}
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
                      </Typography>
                      Price: {product.price}
                    
                    </React.Fragment>
                  }
                />
              )
            }
            return "";
          })
        }
        {/* display total price and player id */}
        {
          cart &&
          <Box sx={{
            display: "inline-flex",
            flexDirection: "column",
            background: "#ffd69f",
            padding: "10px 20px",
            margin: "10px 0px",
            "& span": {
              fontSize: "14px",
              color: "#333",
              fontWeight: "700"
            }
          }}>
         
            <span>Player-ID: {cart.info.playerId}</span>
            <span>Total Price: {cart.info.totalPrice} &#2547;</span>
          </Box>
           
        }

        <Grid container spacing={1} >
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
                        )
                        )
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
                 <Typography sx={{mb:1,mt: 2, color: "#666"}}>Select Transaction Method:</Typography>
                 <Box>

                  {
                    Object.keys(selectedSeller.seller.transactionNumbers).map(key => {
                      if(key === "bkash") {
                        return (
                          <button key={key} style={{
                            color: '#1976d2',
                            fontSize: '15px',
                            height: "60px",
                            margin: "5px",
                            width: "100px",
                            border: "1px solid #999",
                            cursor: "pointer",
                            textTransform: "capitalize"
                           }}
                           onClick={() => selectTransactionMethodHandler(selectedSeller.seller.transactionNumbers[key], key)}
                           >
                            <img style={{
                              width: "100%"
                             }} src={Bkash} alt="bkash" />
                          </button>
                        )
                      } else {
                        return (
                          <button key={key} style={{
                            color: '#1976d2',
                            fontSize: '15px',
                            height: "60px",
                            margin: "5px",
                            width: "100px",
                            border: "1px solid #999",
                            cursor: "pointer",
                            textTransform: "capitalize"
                           }}
                           onClick={() => selectTransactionMethodHandler(selectedSeller.seller.transactionNumbers[key], key)}
                           >
                             <img style={{
                              width: "100%",
                              height: "100%"
                             }} src={Nagad} alt="nagad" />
                           </button>
                        )
                      }
                    }
                    )
                  }
                 </Box>
                 
              </Grid>
              }
              {/* transaction number entry field */}
              {
              selectedSeller.select === true &&  Object.keys(selectedSeller.seller.transactionNumbers).length > 0 &&
              selectedNumber &&
              <Grid item xs={12}>
                <Box sx={{
                  padding: "10px 15px",
                  background: "antiquewhite",
                  display: "inline-flex",
                  flexDirection: "column",
                  "& div": {
                    marginBottom: "5px"
                  }
                }}>
                  <div>
                    <span>
                      Pay with given number and enter last 4 digit of your transaction number 
                    </span>
                  </div>
                  <div style={{
                    padding: "10px 15px",
                    display: "inline-flex",
                    background: "#fff",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <span>{selectedNumber}</span>
                    <Box sx={{
                      display: "inline-flex",
                      alignItems: "center"
                    }}>
                      <CopyToClipboard text={selectedNumber}
                        onCopy={() => {
                          setCopy(true);
                          setInterval(() => {
                            setCopy(false);
                          }, 2000)
                        }}
                      >
                        <span style={{padding: "10px 15px",background: "rgb(219 218 217)", cursor: "pointer"}}>Copy</span>
                      </CopyToClipboard>
                      {copy ? <span style={{color: 'green'}}>copied.</span> : null}
                    </Box>
                  </div>
                  <div>
                    <input  type="number" placeholder='last 4 digit' 
                    onChange={(e) => setTransactionLastDigit(e.target.value)} />
                  </div>
                </Box>
                
                
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
