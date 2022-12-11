/**
 * order body
 */

import {styled, Grid, IconButton} from "@mui/material";
import { Box } from "@mui/system";


export const OrderContainer = styled(Box)({
    width: "100%",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover !important",
    backgroundAttachment: "fixed",
});

export const OrderContentBox = styled(Box)({
    width: "100%",
    padding: "5px"
});

// message send box styles
export const OrderMessageSentBoxContainer = styled(Box)({
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    
});

export const OrderMessageSentBox = styled('form')({
    maxWidth: "480px",
    padding: "3px 8px",
    margin: "0 auto",
    background: "#107c9f",
    alignItems: "center",
    borderRadius: "20px",
    marginBottom: "10px"
});

export const InputBox = styled(Grid)({
    display: "flex",
    alignItems: 'center',
    justifyContent: "start"
});
export const MessageInput = styled('input')({
    width: "100%",
    padding: "5px",
    outline: "0",
    border: 0,
    background: "transparent",
    color: "#fff",
    "&::placeholder": {
        color: "#fff"
    }
});

export const SendIconButton = styled(IconButton)({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff"
});


export const MessageFileInput = styled('input')({
    display: "none"
});


export const MessageFileInputLabel = styled('label')({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "end",
    color: "#fff",
    padding: "4px"
})


