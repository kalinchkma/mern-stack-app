import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { sendMessage } from "../../controllers/messageController";



const OrderCard = ({
  order, 
  status,
  auth,
  orderStatusHandler
}) => {

  // for notification
  const { enqueueSnackbar } = useSnackbar();

  // copy state
  const [copy, setCopy] = React.useState(false);

  // cancel state
  const [cancel, setCancel] = React.useState(false);

  // cancel msg state
  const [msg, setMsg] = React.useState("");

 

  // cancel order handler
  const cancelOrderHandler = async () => {
    if(msg !== "") {
        try {
          // construct message onject
          orderStatusHandler("cancel", order._id, auth.token);
          const formData = new FormData();
          formData.append("messageContent", msg);
          formData.append("senderId", auth.uid);
          if(order.buyerId === auth.uid) {
              formData.append("reciverId", order.sellerId);
          } else {
              formData.append("reciverId", order.buyerId);
          }
          formData.append("orderId", order._id);
          formData.append("token", auth.token);

          // send message 
          const res = await sendMessage(formData);
         
          if(res.status === 200) {
             setMsg("");
             setCancel(false);
             enqueueSnackbar("Order canceled successfully", { variant: "success" });
          } else {
              enqueueSnackbar("Error canceling order", {variant: "error", preventDuplicate: true});
          }
      } catch(err) {
          enqueueSnackbar("Error canceling order", {variant: "error", preventDuplicate: true});
      }

    } else {
      enqueueSnackbar("Please Enter message why you canceling order", { variant: "warning" });
    }
  }


  return (
    <List sx={{ 
      maxWidth: "100%", 
      background: "#f1f1f1",
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
          order &&
          order.orderedProduct.map((product, index) => {
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
                        Amount: {product.amount}
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
          order &&
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
            },
            "& p": {
              margin: "0",
              color: "#18915a"
            }
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#fff",
              padding: "8px 15px",
              marginBottom: "10px",
              boxShadow: "inset 0px 0px 6px 0px #3333332e"
            }}>
              Player-ID: {order.playerId}
              <CopyToClipboard
               onCopy={() => {
                setCopy(true);
                setInterval(() => {
                  setCopy(false);
                }, 2000)
              }}
              >
                 <span style={{
                  padding: "5px 12px",
                  background: "rgb(219 218 217)",
                  cursor: "pointer",
                  margin: "0px 5px"
                }}
                 >Copy</span>
              </CopyToClipboard>
              {copy ? <span style={{color: 'green'}}>copied.</span> : null}
            </div>
            <span>Total Price: {order.totalPrice} &#2547;</span>
            <p>Status:  {status}</p>
          </Box>
        }
        {/* order state display */}
        {
          (auth.userType === "admin" || auth.userType === "seller" ) &&
          <Box sx={{
            display: "flex",
            flexDirection: "column"
          }}>
            <span style={{
              fontSize: "16px",
            }}>
              Set order status
            </span>
            {
              !cancel &&
              <Box sx={{
                "& button": {
                  marginRight: "5px"
                }
              }}>
                <button onClick={() => orderStatusHandler("pending", order._id, auth.token)}>Pending</button>
                <button onClick={() => orderStatusHandler("accepted", order._id, auth.token)}>Accept</button>
                <button onClick={() => orderStatusHandler("completed", order._id, auth.token)}>Completed</button>
                <button onClick={() => setCancel(true)}>Cancel</button>
              </Box>
            }
            {
              // onClick={() => orderStatusHandler("cancel", order._id, auth.token)}
              cancel &&
              <Box sx={{}}>
                <input placeholder='Enter message..' onChange={(e) => setMsg(e.target.value)} />
                <button onClick={() => cancelOrderHandler()}>Cancel</button>
                <button onClick={() => setCancel(false)}>Close</button>
              </Box>
            }
          </Box>
        }

             
      </ListItem>
    </List>
  );
}


export default OrderCard;
