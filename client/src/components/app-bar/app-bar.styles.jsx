/**
 * app bar styles
 */

import {AppBar, Fab, Grid, IconButton, styled, Toolbar} from "@mui/material";


export const AppBarContainer = styled(AppBar)({
    top: 'auto', 
    bottom: 0, 
    width: "100%", 
    background: "transparent",
    boxShadow: "none",
    padding: 0,
    margin: 0
});

export const AppBarGrid = styled(Grid)({
    margin: 0,
    padding: 0
});


export const AppBarItemGrid = styled(Grid)({
    margin: 0,
    padding: 0,
    "& .MuiGrid-item": {
      margin: 0,
      padding: 0,
      textAlign: "center"
    }
});




export const AppToolbar = styled(Toolbar)({
    maxWidth: "480px",
    margin: "auto",
    background: "#f7f7f7",
    boxShadow: "inset 0px 0px 2px 0px #000",
    display: "flex",
    justifyContent: "space-between",
});


export const AppBarIcon = styled(IconButton)({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#404040",
    fontWeight: "700",
    borderRadius: 0,
    "& span": {
        fontSize: "10px",
        textTransform: "uppercase",
        marginTop: "5px"
    },
    "&:hover": {
        color: "#777"
    }
});


export const AppFloatingButton = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: '0 auto',
    background: "#0e7c9f",
    color: "#fff",
    boxShadow: "0px 0px 5px 1px rgb(255 255 255), 0px 0px 11px 0px rgb(255 255 255), 0px 1px 18px 0px rgb(255 255 255)",
    "&:hover": {
        background: "#0d6b89"
    }
});

