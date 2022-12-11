/**
 * Annoucement component
 */
import * as React from "react";

import {
    Paper,
    List,
    ListSubheader,
    ListItem,
    Typography,
    Button
} from "@mui/material";

import moment from 'moment';

import { Link, useNavigate, useSearchParams } from "react-router-dom";

// state imports
import { connect } from "react-redux";
import {createStructuredSelector} from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { orderFetchStartByIdAsync } from "../../redux/order/order.action";
import { selectOrders } from "../../redux/order/order.select";
import { setNotification } from "../../redux/notification/notification.action";



import { Box } from "@mui/system";


const HistoryPage = ({
  auth,
  orderFetchStartByIdAsync,
  orders,
  setNotification
}) => {

  // navigator
  const navigate = useNavigate();
  //  params
  const [statusParams] = useSearchParams();
  const search = statusParams.get('cat');


  React.useEffect(() => {
      if(auth === null) {
        navigate("/login?a=history");
      } else {
        orderFetchStartByIdAsync(auth.uid);
        setNotification({
          order: false
        })

      
      }
  }, []);



   


    return auth  && (
        <Paper square sx={{ boxShadow: "none",  }}>
            <List sx={{ mb: "100px", mt: 0,pt: 0 }}>
              <ListSubheader sx={{ 
                bgcolor: '#f7f7f7', 
                color: "#333", 
                fontSize: "15px",
                fontWeight: "700", 
                textTransform: "uppercase",
                boxShadow: "0px 1px 5px 0px #33333347"
                }}>
                
                   <Box sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    "& a": {
                      display: "inline-block",
                      margin: "8px 5px",
                      padding: "8px 15px",
                      border: "none",
                      background: "#fff",
                      fontWeight: "700",
                      cursor: "pointer",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      color: "#333"
                    }
                   }}>
                    <Button component={Link} to="/history?cat=pending">Pending orders</Button>
                    <Button component={Link} to="/history?cat=accepted">Accepted orders</Button>
                    <Button component={Link} to="/history">All orders</Button>
                   </Box>
              </ListSubheader>
              
                {
                  orders && 
                  orders.length > 0 &&
                  orders.map((order, index) => {
                    if(search !== null) {
                      if(search === order.status) {
                       
                        return (
                          <ListItem 
                          component={Link}
                          to={`/order/messages/${order._id}`}
                          button 
                          key={index}
                          sx={{
                            flexDirection: "column", alignItems: "start",
                            background: "#ffff",
                            margin: "0px",
                            borderBottom: "1px solid #e7eaeb"
                          }}
                          >
                            <Typography sx={{fontSize: "18px", color: "#747778", textTransform: "capitalize"}}>
                              Order Id:  {order._id}
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: "#666", textTransform: "lowercase" }}  >
                                Price: {order.totalPrice}
                            </Typography>
                            <Typography sx={{fontSize: "14px", color: "#0a9697", textTransform: "capitalize"}}>
                              Status: {order.status}
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: "#6d8d4b", textTransform: "lowercase" }}   >
                                  {moment(order.createdAt).format("LLLL")}
                            </Typography>
                         </ListItem>
                        )
                     
                      }
                    } else {
                      return (
                        <ListItem 
                        component={Link}
                        to={`/order/messages/${order._id}`}
                        button 
                        key={index}
                        sx={{
                          flexDirection: "column", alignItems: "start",
                          background: "#ffff",
                          margin: "0px",
                          borderBottom: "1px solid #e7eaeb"
                        }}
                        >
                          <Typography sx={{fontSize: "18px", color: "#747778", textTransform: "capitalize"}}>
                            Order Id:  {order._id}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "#666", textTransform: "lowercase" }}  >
                              Price: {order.totalPrice}
                          </Typography>
                          <Typography sx={{fontSize: "14px", color: "#0a9697", textTransform: "capitalize"}}>
                            Status: {order.status}
                          </Typography>
                          <Typography sx={{ fontSize: "12px", color: "#6d8d4b", textTransform: "lowercase" }}   >
                                {moment(order.createdAt).format("LLLL")}
                          </Typography>
                       </ListItem>
                      )
                    }
                    })
                }
                
              {/* if ordered message is empty show dont have any order message */}
              
             
             
            </List> 
          {/* place holder */}
          <div style={{
            height: "100px"
          }} />

     </Paper>    
    )
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthToken,
  orders: selectOrders
});

const mapDispatchToProps = dispatch => ({
  orderFetchStartByIdAsync: (id) => dispatch(orderFetchStartByIdAsync(id)),
  setNotification: (notification) => dispatch(setNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage)
