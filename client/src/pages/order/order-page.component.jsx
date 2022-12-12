/**
 * order page component
 */


import { List, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';

 // imports components
 import GameHeader from "../../components/game-header/game-header.component";
 import OrderCard from "./order-card/order-card";

 // impots styles
 import {
    OrderContainer, 
    OrderContentBox, 
} from "./order-page.styles";

// state imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { selectSellerList } from "../../redux/seller/seller.selector";
import { fetchSellerStartAsync } from "../../redux/seller/seller.action";
import { selectCart } from "../../redux/cart/cart.selector";
import { orderFetchStartByIdAsync } from "../../redux/order/order.action";

// imports utils
import findById from "../../utils/findById";
import { sendOrder } from "../../controllers/orderController";




const OrderPage = ({
    auth, fetchSellerStartAsync, sellers, cart, orderFetchStartByIdAsync
}) => {


    const navigate = useNavigate();

    // for notofication
    const { enqueueSnackbar } = useSnackbar();
    
    // sync sellers
    useEffect(() => {
        if(cart) {
            fetchSellerStartAsync();
        } else {
            navigate("/404");
        }
    }, []);

  

    // select seller
    const [selectedSeller, setSelectedSeller] = useState({
        id: "",
        select: false,
        seller: null,
        error: false
    });
    // select seller handler
    const selectSeller = (id) => {
        setSelectedSeller({
            ...selectedSeller,
            id: id,
            select: true,
            seller: findById(id, sellers),
            error: false
        });
    }

    // transaction last four digit number state
    const [transactionLastDigit, setTransactionLastDigit] = useState("");

    // transaction method
    const [transactionMethod, setTransactionMethod] = useState("");

    // handleOrder 
    const handleOrder = async () => {
        if(!selectedSeller.id) {
            setSelectedSeller({
                ...selectedSeller,
                error: true
            });
        } else {
           // hander send order
           // order object is ready to order
           const orderOnject = {
               sellerId: selectedSeller.id,
               buyerId: auth.uid,
               orderedProduct: cart.products,
               playerId: cart.info.playerId,
               transactionLastDigit: transactionLastDigit,
               totalPrice: cart.info.totalPrice,
               transactionMethod: transactionMethod,
               token: auth.token
           }
          /**
           * order to back-end
           */
          try {
            const res = await sendOrder(orderOnject);
          
            if(res.status === 200) {
                orderFetchStartByIdAsync(auth.uid);
                navigate(`/order/messages/${res.success.id}`);
               
            } else {
                // show error message
                enqueueSnackbar("Error to order ", {variant: "error"});
               
            }

          } catch(err) {
           
          }
           
        }

    }


  

     return (
         <OrderContainer>
             <GameHeader title={"Order"} />
             {/* placeholder */}
             <div style={{height: "50px"}} />
       
            <OrderContentBox>
               
                <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                   
                        <OrderCard
                        cart={cart}
                        sellers={sellers} 
                        selectSeller={selectSeller}
                        selectedSeller={selectedSeller}
                        handleOrder={handleOrder}
                        setTransactionLastDigit={setTransactionLastDigit}
                        transactionLastDigit={transactionLastDigit}
                        setTransactionMethod={setTransactionMethod}
                        />
                 
                </List>
                
            </OrderContentBox>

            {/* =============================== */}
         </OrderContainer>
     )
 }

 const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    sellers: selectSellerList,
    cart: selectCart
 });

 const mapDispatchToProps = dispatch => ({
    fetchSellerStartAsync: () => dispatch(fetchSellerStartAsync()),
    orderFetchStartByIdAsync: (id) => dispatch(orderFetchStartByIdAsync(id))

 });
 
 export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);
 