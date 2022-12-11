/**
 * signup component style
 */

import {Button, styled} from "@mui/material";
import { Box } from "@mui/system";


export const SignupContainer = styled(Box)({
    width: "100%",
    marginTop: "70px"
});

export const FormBox = styled('form')({
    width: "calc(100% - 90px)",
    margin: "0 auto"
});

export const SignupButton = styled(Button)({
    padding: "10px 15px",
    background: "#107c9f"
});

export const SignupOptionBox = styled(Box) ({
    width: "100%",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    "& span": {
        fontSize: "30px",
        fontWeight: 500,
        color: "#1dc8ff",
        textTransform: "capitalize",
        marginBottom: "10px"
    },
    marginBottom: "15px",
 

});

