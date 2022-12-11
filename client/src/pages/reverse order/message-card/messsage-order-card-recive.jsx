import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

// import utils
import { acceptOrder } from "../../../controllers/orderController";



export default function MessageOrderReciveCard({message, auth, orderStatus, setOrderStatus}) {
  console.log(message);
  // order accepted handler
  const acceptedOrderHander = async (id, status) => {
      console.log("this ", id, " will be accepted");
      // request onject
      const requestObject = {
        id: id,
        status: status,
        token: auth.token
      }
      try {
        const res = await acceptOrder(requestObject);
        if(res.status === 200) {
          setOrderStatus(true);
        } else {
          setOrderStatus(true);
        }
      } catch(err) {
        console.log(err);
      }
  };

  return (
    <List sx={{ 
        maxWidth: "100%",
        background: "#e1e1e1",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: "wrap",
       
        width:" 100%",
        marginRight: "auto",
        marginBottom: "30px"
        }}>
      <ListItem alignItems="flex-start" sx={{
         flexDirection: "column",
      }}>
          <Typography variant='span' sx={{color: "#666"}}>OrderId: {message.orderId}</Typography>
          <Typography sx={{color: "#666"}} >Product Name: {message.orderedProduct.title}</Typography>
          <Typography sx={{color: "#666"}} >PlayerId: {message.playerId}</Typography>
          <Typography sx={{color: "#666"}}>Price: {message.orderedProduct.price}</Typography>
          <Typography sx={{color: "#666"}}>Last digit of transaction number: {message.transactionLastDigit}</Typography>
          <Typography color="seagreen">Status: {message.status}</Typography>
          {/* set status by seller */}
          {
            (auth !== null && (auth.userType === "seller" || auth.userType === "admin")) &&
            message.status === "pending" &&
            <div>
              <Button variant='contained' sx={{background: "#107c9f", marginTop: "15px", marginRight: "10px"}} onClick={() => acceptedOrderHander(message._id, "accepted")} >Accept Order</Button>
              <Button variant='contained' sx={{background: "#107c9f", marginTop: "15px"}} onClick={() => acceptedOrderHander(message._id, "cancel")} >Cancel Order</Button>
            </div>
          }
           
          {
            (auth !== null && (auth.userType === "seller" || auth.userType === "admin")) &&
            message.status === "accepted" &&
            <Button variant='contained' sx={{background: "#107c9f", marginTop: "15px"}} onClick={() => acceptedOrderHander(message._id, "complete")} >Set Complete Order</Button>
          }
      </ListItem>
    </List>
  );
}
