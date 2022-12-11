/**
 * game prouct styles
 */

import {styled, Box,Grid, IconButton} from "@mui/material";


export const ProductListContainer = styled(Box)({
    width: "100%",
    transform: "translateY(-50px)",
    borderRadius: "30px",
    background: "#fff",
    padding: "15px"
});


export const FormBox = styled(Box) ({
    display: "flex",
    width: "100%",
    flexDirection: "column",
});

export const ProductList = styled(Box) ({
    display: "flex",
    width: "100%",
    padding: "5px 10px",
    marginTop: "40px"
});


export const OrderButtonContainer = styled(Box)({
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: 0
});

export const OrderButtonBox = styled(Grid)({
    maxWidth: "480px",
    margin: "0 auto",
    padding: "10px",
    color: "#fff",
    background: "#fff",
    boxShadow: "0px 0px 5px 0px #33333385",
    display: "flex",
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: "column"
});

export const OderPrice = styled('span')({
    fontWeight: "700",
    color: "#333",
    fontSize: "14px",
});

export const OderButton = styled(IconButton)({
    padding: "10px 20px",
    color: "#fff",
    borderRadius: "8px",
    background: "#168f16",
    fontWeight: "700",
    fontSize: "18px",
    "&:hover": {
        background: "#4a7f91"
    }
});