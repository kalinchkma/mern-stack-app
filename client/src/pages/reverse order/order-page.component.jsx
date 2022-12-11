/**
 * order page component
 */


import {  Grid, List, } from "@mui/material";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';
import {useRef, useEffect, useState } from "react";

 // imports components
 import GameHeader from "../../components/game-header/game-header.component";
 import MessageOrderReciveCard from "./message-card/messsage-order-card-recive";
 import MessageOrderCard from "./message-card/messsage-order-card";
 import MessageSender from "./message-card/message-card-sender";
 import MessageOuter from "./message-card/message-card-outer";

 // impots styles
 import {
    InputBox,
    MessageFileInputLabel,
    MessageFileInput,
    SendIconButton,
    MessageInput,
    OrderContainer, 
    OrderContentBox, 
    OrderMessageSentBox, 
    OrderMessageSentBoxContainer
} from "./order-page.styles";

// state imports
import { connect } from "react-redux";
import { selectCollections } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { selectSellerList } from "../../redux/seller/seller.selector";
import { fetchSellerStartAsync } from "../../redux/seller/seller.action";
import { messageFetchStartAsync, appendMessage } from "../../redux/message/message.action";
import { selectAllMesssages } from "../../redux/message/message.select";

// imports utils
import findById from "../../utils/findById";
import { sendOrder, sendMessage, getAllMessageByOrderId } from "../../controllers/orderController";
import config from "../../config";


// import socket
import {io} from "socket.io-client";





const OrderPage = ({
    auth, products, fetchSellerStartAsync, sellers, messageFetchStartAsync, messages, appendMessage
}) => {
    // socket 
    const socket = io(`${config.API_DOMAIN}`);
    // alway focus on bottom
    const bottomRef = useRef(null);

    const [modeParams] = useSearchParams();
    const params = useParams();
    const navigate = useNavigate();
    // get order product
    const orderedProduct = findById(params.id, products);

    // mode is if not it will null return
    const mode = modeParams.get('mode');
    let order = null;
    /**
     * =======================================================
     * find order
     * =======================================================
     */
    if(mode === "message" && messages) {
        for(let i = 0; i < messages.length; i++) {
            if(messages[i].orderId === params.orderId) {
                order = messages[i];
                break;
            }
        }
    }
 


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

    // order status state
    const [orderStatus, setOrderStatus] = useState(false);

    // transaction last four digit number state
    const [transactionLastDigit, setTransactionLastDigit] = useState("");

    // message state
    const [allmessages, setAllMessages] = useState(null);

    // set all messages
    const setAllMessagesAsync =  async () => {

        const fetchedMessages = await getAllMessageByOrderId(params.orderId);
        
        if(fetchedMessages.status === 200) {
            setAllMessages(fetchedMessages.success.messages);
        }
        // bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        bottomRef.current?.scrollIntoView();

    }
   
    // fetch inital messages
    useEffect(() => {
        fetchSellerStartAsync();
        messageFetchStartAsync(auth.uid);
        // bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        bottomRef.current?.scrollIntoView();

        // fetch all message by orderId
        setAllMessagesAsync();
       

    }, []);

     // for socket 
     useEffect(() => {
         // listent for message 
         console.log("special this useEffect call");
         socket.on(auth.uid, async (msg) => {
           
            messageFetchStartAsync(auth.uid);
            setAllMessagesAsync();
        });
     }, [socket, allmessages, orderStatus]);

     // scroll to bottom
     useEffect(() => {
        // bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        bottomRef.current?.scrollIntoView();

     }, [allmessages])

    // handleOrder 
    const handleOrder = async () => {
        if(!selectedSeller.id) {
            setSelectedSeller({
                ...selectedSeller,
                error: true
            });
        } else {
            // order state
            const order = {
                orderId: params.orderId,
                playerId: params.playerId,
                orderedProduct: JSON.stringify(orderedProduct),
                buyerId: auth.uid,
                sellerId: selectedSeller.id,
                transactionLastDigit: transactionLastDigit,
                token: auth.token
            }
            try {
                const res = await sendOrder(order);
                if(res.status === 200) {
                    messageFetchStartAsync(auth.uid);
                    navigate(`/order/${params.id}/${params.playerId}/${res.success.orderId}?mode=message`);
                }
           
            } catch(err) {

            }
        }

    }


    /**
     * 
     * message send handler
     *  */ 
    const messageSendHandler = async (e) => {
        e.preventDefault();
        // construct message onject
    
        const formData = new FormData();
        formData.append("message", e.target.message.value);
        formData.append("orderId", order.orderId);
        formData.append("buyerId", order.buyerId);
        formData.append("sellerId", order.sellerId);
        formData.append("playerId", order.playerId);
        formData.append("token", auth.token);
        formData.append("id", auth.uid);
        if(e.target.file.files[0] !== undefined) {
            formData.append("file", e.target.file.files[0])
        }
        console.log(e.target.file.files[0]);
        try {
            const result = await sendMessage(formData);
            if(result.status) {
                messageFetchStartAsync(auth.uid);
                e.target.file.value = "";
                e.target.message.value = ""
            }
        } catch(err) {
            console.log(err);
        }
       
    }




     return (
         <OrderContainer>
             <GameHeader title={"Order"} />
             {/* placeholder */}
             <div style={{height: "50px"}} />
       
            <OrderContentBox>
               
                <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'background.paper' }}>
                    {/* sender order message */}
                    {
                        mode === "order" &&
                        <MessageOrderCard
                        product={orderedProduct} 
                        playerId={params.playerId} 
                        sellers={sellers} 
                        selectSeller={selectSeller}
                        selectedSeller={selectedSeller}
                        handleOrder={handleOrder}
                        setTransactionLastDigit={setTransactionLastDigit}
                        transactionLastDigit={transactionLastDigit}
                        />
                    }
                    {/* render oder messages */}
                    {
                        mode === "message" &&
                        order !== null && order.type === "order" &&
                        <MessageOrderReciveCard message={order} auth={auth} setOrderStatus={setOrderStatus} orderStatus={orderStatus} />
                    }

                    {/* show related message */}
                    {
                        mode === "message" &&
                        allmessages !== null && order !== null &&
                        allmessages.map(message => {
                            if( order && (message.type === "message") && (message.orderId === order.orderId) && (message.senderId === auth.uid)) {
                                return (
                                    <MessageSender key={message._id} message={message} />
                                )
                            } else if(message.type === "message" && message.orderId === order.orderId && message.senderId !== auth.uid) {
                                return (
                                    <MessageOuter key={message._id} message={message} />
                                )
                            }
                        })
                    }

                 
                </List>
                
            </OrderContentBox>

             {/* placeholder */}
          <div ref={bottomRef} id="focus-it" style={{height: "50px"}} />
          {/* message sent box */}
            {
                order !== null &&
                order.status === "accepted" &&
                <OrderMessageSentBoxContainer>
                <OrderMessageSentBox component="form" onSubmit={messageSendHandler}>

                    {/* 
                    ========================================
                    message box 
                    ========================================
                    */}
                    <Grid container spacing={2}>
                       
                        <Grid item xs={1} sx={{
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "start",
                           m: 0,
                           p:0
                        }}>
                            <MessageFileInputLabel htmlFor="file" style={{cursor: "pointer"}}>
                                <AddAPhotoIcon />
                                <MessageFileInput name="file" id="file" type="file" />
                            </MessageFileInputLabel>
                        </Grid>
                        <InputBox item xs={11} container>
                            <Grid item xs={10}>
                                <MessageInput
                                placeholder="Message"
                                type="text"
                                name="message"
                                autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={2}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                    m: 0,
                                    p:0
                                }}
                            >
                                <SendIconButton type="submit">
                                    <SendIcon />
                                </SendIconButton>
                            </Grid>
                        </InputBox>
                    </Grid>
                    {/* 
                        =================================
                    */}
                    
                </OrderMessageSentBox>
            </OrderMessageSentBoxContainer>

            }
            

            {/* =============================== */}
         </OrderContainer>
     )
 }

 const mapStateToProps = createStructuredSelector({
    products: selectCollections,
    auth: selectAuthToken,
    sellers: selectSellerList,
    messages: selectAllMesssages
 });

 const mapDispatchToProps = dispatch => ({
    fetchSellerStartAsync: () => dispatch(fetchSellerStartAsync()),
    messageFetchStartAsync: (id) => dispatch(messageFetchStartAsync(id)),
    appendMessage: (msg) => dispatch(appendMessage(msg))
 });
 
 export default connect(mapStateToProps,mapDispatchToProps)(OrderPage);
 