/**
 * Title Error page styles
 */


import {styled, Box} from "@mui/material";


export const ErrorPageWrapper = styled('div')({
    height: "100vh",
    width: "100%",
    background: "#fff",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"

});


export const ErrorContent = styled(Box)({
    display: "flex",
    alignItems: "center",
    height: "300px",
    width: "300px",
    flexDirection: "column"
});



export const HigherWrapper = styled(ErrorPageWrapper)({

});



