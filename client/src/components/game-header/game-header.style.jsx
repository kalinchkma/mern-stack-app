/**
 * game header styles
 */

import {styled, Box } from "@mui/material";


export const GameHeaderContainer = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "0",
    left: 0,
    zIndex: 1
});

export const GameHeaderBox = styled(Box)({
    width: "480px",
    display: "flex",
    background: "#107c9f",
    alignItems: "center",
    justifyContent: "start",
    color: "#fff",
    padding: "6px 0px"
})

