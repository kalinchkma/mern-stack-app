/**
 * welcome banner styles
 */

import {styled, Box, Typography} from "@mui/material";
import { Container } from "@mui/system";


export const WelcomeBannerContainer = styled(Container)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});


export const WelcomeBannerContent = styled(Box)({
    width: "calc(100% - 8px)",
    background: "#fff",
    padding: "15px",
    transform: "translateY(-80px)",
    borderRadius: "0",
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    flexDirection: "column",
    boxShadow: "0px 0px 7px 1px #26262670"
});


export const WelcomeBannerActionBox = styled(Box)({
    width: "100%"
})

