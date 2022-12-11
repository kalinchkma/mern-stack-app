/**
 * config page styles
 */
import {styled, Box, Grid} from "@mui/material";


export const ConfigContainer = styled(Box)({
    width: "100%"
});


export const ConfigHeader = styled(Box)({
    padding: "10px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent:"left",
    borderBottom: "1px solid #ebebeb",
    fontSize: "20px",
    fontWeight: "500"
});

export const ConfigBody = styled(Box)({
    width: "100%"
});

export const SingleConfig = styled(Grid)({
    margin: "10px 0px"
})

export const ConfigDisplay = styled(Box)({
    width: "100%",
    boxSizing: "border-box",
    padding: "3px"
});

export const ConfigAddForm = styled('form')({
    width: "100%",
    marginBottom: "15px"
});

export const ImageBox = styled(Box)({
    width: "100%",
    display: "block",
    "& div": {
        width: "30%",
        display: "inline-block",
        marginRight: "10px",
        marginBottom: "10px",
        position: "relative",
        "& img": {
           width: "100%",
           height: "auto",
           objectFit: "cover",
        },
        "& button": {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "none",
            padding: "10px 15px",
            border: "none",
            textTransform: "capitalize",
            background: "red",
            color: "#fff",
            fontWeight: "700",
            transition: "0.3s",
            borderRadius: "10px",
            "&:hover": {
                background: "#870505"
            }
        },
        "&:hover button": {
            display: "inline-block"
        }
    }
})

export const ConfigName = styled(Box)({
    display: "flex",
    alignItems:"center",
    justifyContent: "flex-start",
    height: "auto",
    fontWeight: "500",
    flexWrap: "wrap"
})
