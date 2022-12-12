/**
 * order page component
 */


import {  Grid, List, } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';
import {useRef, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';

// imports components
import GameHeader from "../../components/game-header/game-header.component";
import OrderCard from "./order-card";
import SenderMessageCard from "./message-card/sender-card";
import ReciverMessageCard from "./message-card/reciver-card";

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
} from "./order-message-page.styles";

// state imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { selectOrders } from "../../redux/order/order.select";
import { orderFetchStartByIdAsync } from "../../redux/order/order.action";



// imports utils
import config from "../../config";
import { getOrderById, setOrderStatus } from "../../controllers/orderController";
import { getMessageById, sendMessage } from "../../controllers/messageController";


// imports socket 
import {io} from "socket.io-client";





const OrderMessagePage = ({
    auth,
}) => {
    // for notification
    const { enqueueSnackbar } = useSnackbar();

    // image state
    const [image, setImage] = useState(null);

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
     }


    // socket instace
    const socket = io(`${config.API_DOMAIN}`,{
        transports: ['websocket']
    });

   
    // navigate
    const navigate = useNavigate()
    const params = useParams();

    // states
    // alway focus on bottom
    const bottomRef = useRef(null);

    // order state
    const [order, setOrder] = useState(null);
    // status state
    const [status, setStatus] = useState(null);
    // message state
    const [messages, setMessages] = useState([]);

    const setFirstMessage = (msgs) => {
        setMessages([...msgs]);
    }

    // set state of order 
    const [mode, setMode] = useState(true);

    // fetch order messages
    const fetchOrderMessage = async (id) => {
        try {
           
            setMode(false);
            const res = await getMessageById(id);
          
            if(res.status === 200) {
                setFirstMessage(res.success.messages);
            } else {
                enqueueSnackbar("Error something went wrong", {variant: "error"});
                navigate("/error");
            }
        } catch(err) {
            enqueueSnackbar("Error something went wrong", {variant: "error"});
            navigate("/error");
        }
    }

    // get order product by id
    const getOrder = async (id) => {
        try {
            const res = await getOrderById(id);
            if(res.status === 200) {
                setOrder(res.success.order);
                setStatus(res.success.order.status);
                if(mode) {
                    fetchOrderMessage(res.success.order._id);
                }
            } else {
                navigate("/404");
            }
        } catch(err) {
            enqueueSnackbar("Error something went wrong", {variant: "error"});
            navigate("/404");
        }
    }

    // get order product by id
    const getOrderStatus = async (id) => {
        try {
            const res = await getOrderById(id);
            if(res.status === 200) {
                setStatus(res.success.order.status);
            } 
        } catch(err) {
            enqueueSnackbar("Error something went wrong", {variant: "error", anchorOrigin: {
                vertical: "top", horizontal: "right"
            }});
        }
    }

    // set order status handler
    const orderStatusHandler = async (status, id, token) => {
        try {
            const reqObject = {
                status: status,
                token: token,
                id: id
            }
            const res = await setOrderStatus(reqObject);
           
            if(res.status === 200) {
                enqueueSnackbar("Successfully updated order status", {variant: "success", preventDuplicate: true});
            } else {
                enqueueSnackbar("Error something went wrong", {variant: "error", preventDuplicate: true});
            }
        } catch(err) {
            enqueueSnackbar("Error something went wrong", {variant: "error", preventDuplicate: true});
        }
    }
    // scroll to bottom
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    // normal useeffect
    useEffect(() => {
       
        if(params.id) {
            getOrder(params.id);
        } else {
            navigate("/404");
        }
        
    }, [params.id]);
 
    // listening to order socket
    useEffect(() => {
     
        if(order) {
            socket.on(order._id, (msg) => {
                if(msg === "updated") {
                   
                    getOrderStatus(order._id);
                } else {
                    const newMsg = JSON.parse(msg);
                    
                    if(!messages.includes(newMsg)) {
                        setMessages([...messages, newMsg]);
                    }
                    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
                }
            });
        }
       
    }, [socket]);
   

    // send message handler
    const sendMessageHandler = async (e) => {
        e.preventDefault();
        try {
            // construct message onject
    
            const formData = new FormData();
            formData.append("messageContent", e.target.message.value);
            formData.append("senderId", auth.uid);
            if(order.buyerId === auth.uid) {
                formData.append("reciverId", order.sellerId);
            } else {
                formData.append("reciverId", order.buyerId);
            }
            formData.append("orderId", order._id);
            formData.append("token", auth.token);

            if(e.target.file.files[0] !== undefined) {
                formData.append("file", e.target.file.files[0])
            }

            // send message 
            const res = await sendMessage(formData);
           
            if(res.status === 200) {
                e.target.message.value = "";
                e.target.file.value = "";
                setImage(null);
            } else {
                enqueueSnackbar("Error sending message", {variant: "error", preventDuplicate: true});
            }
        } catch(err) {
            enqueueSnackbar("Error sending message", {variant: "error", preventDuplicate: true});
        }
    }


  
     return (
         <OrderContainer>
             <GameHeader title={"Order"} pageLink="/" />
             {/* placeholder */}
             <div style={{height: "50px"}} />
       
            <OrderContentBox>
               
                <List sx={{ width: '100%', maxWidth: "100%", bgcolor: 'transparent' }}>
                   {/* order card will sho here */}
                    {
                        order &&
                        <OrderCard
                            order={order}
                            status={status}
                            auth={auth}
                            orderStatusHandler={orderStatusHandler}
                        />
                    }

                </List>
                
            </OrderContentBox>
            {/* 
            show order messages here
            */}
            {
                messages.length > 0 &&
                typeof messages === "object" &&
                messages.map((message, index) => {
                    if(auth.uid === message.reciverId && auth.uid !== message.senderId) {
                        return (
                            <SenderMessageCard
                                key={index}
                                message={message}
                            />
                            )
                    }else {
                        return (
                                <ReciverMessageCard
                                key={index}
                                message={message}
                                />
                        )
                        
                    }
                })
            }
           

          {/*
            ........................................................................
             message sent box 
            .........................................................................
          */}
                {
                    status === "accepted" &&
                    <OrderMessageSentBoxContainer>
                    <OrderMessageSentBox component="form" onSubmit={sendMessageHandler} >

                        {/* 
                        ========================================
                        message box 
                        ========================================
                        */}
                        <Grid container spacing={2}>
                            {/* selected img show */}

                            {
                                image &&
                                <Grid item xs={12} sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                    "& img": {
                                        width: "100px",
                                        height: "auto",
                                        margin: "10px"
                                    }
                                }}>
                                    <img src={image} alt="slected-img" />
                                </Grid>
                            }


                            <Grid item xs={1} sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            m: 0,
                            p:0
                            }}>
                                <MessageFileInputLabel htmlFor="file" style={{cursor: "pointer"}}>
                                    <AddAPhotoIcon />
                                    <MessageFileInput name="file" onChange={onImageChange} id="file" type="file" />
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

                
                   {/* placeholder */}
          <div ref={bottomRef} id="focus-it" style={{height: "50px"}} />
            {/* =============================== */}
         </OrderContainer>
     )
 }

const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    orders: selectOrders
});

const mapDispatchToProps = dispatch => ({
    orderFetchStartByIdAsync: (id) => dispatch(orderFetchStartByIdAsync(id))
});
 
 export default connect(mapStateToProps,mapDispatchToProps)(OrderMessagePage);
 