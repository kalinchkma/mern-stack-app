/**
 * home banner slider styles
 */

import {styled, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const BannerContainer = styled(Box)({
    width: "100%",
    height: "300px",
    overflow: "hidden",
    position: "relative"
});


export const HomeHeader = styled(Box)({
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    display: "block",
    background: "transparent",
    marginTop: "10px",
});

export const BrandLogo = styled(Link)({
    position: "sticky",
    display: "inline-block",
    background: "#f7f7f7",
    padding: "2px 0px",
    paddingRight: "20px",
    paddingLeft: "10px",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    boxShadow: "0px 0px 5px 0px #000",
    zIndex: "999",
    "& img": {
        height: "auto",
        width: "50px", 
        objectFit: "cover"
    }
});

export const WelcomeText = styled(Typography)({
    position: "sticky",
    display: "inline-block",
    padding: "3px 10px",
    paddingLeft: "30px",
    paddingRight: "10px",
    background: "#fff",
    transform: "translateX(-25px)",
    zIndex: "9",
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    boxShadow: "0px 0px 9px 0px #0e7c9f",
    fontSize: "12px",
    "& span": {
        color: "blue",
        fontWeight: "500",
        textTransform: "capitalize"
    }
});


// silder styles
export const SliderItem = styled('div')({
    height: "100% !important",
    width: "100% !important"
})
