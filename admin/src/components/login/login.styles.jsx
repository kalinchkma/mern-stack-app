/**
 * sign-in styles
 */
import {styled, Box, FormControl, IconButton, Typography} from "@mui/material";
import { Container } from "@mui/system";




export const LoginContainer = styled(Box)({
    display: "flex",
    width: "100%",
    overflow: "auto"
});


export const LoginFormContainer = styled(Container)({
    display: "flex",
    paddingTop: "120px",
    alignItems: "baseline",
    justifyContent: "center",
    
    
});

export const LoginFormBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    padding: "40px",
    flexDirection: 'column',
});

export const InputBox =styled(FormControl)({
    width: "100%",
    margin: "15px 0px",
});

export const LoginButtonBox = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const LoginButton = styled(IconButton)({
    color: "#fff",
    borderRadius: 0,
    background: "red",
    marginTop: "20px",
    padding: "15px 30px",
    fontWeight: "700",
    fontSize: "18px",
    "&:hover": {
        background: 'black'
    }
});





