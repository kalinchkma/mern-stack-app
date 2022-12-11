/**
 * game card styles
 */

import {styled, Card, CardMedia, CardContent, Typography} from "@mui/material";

export const GameCardContainer = styled(Card)({
    maxWidth: "100%",
    maxHeight: "250px",
    background: "#fff",
    border: "none",
    borderRadius: "10px",
    display: "flex",
    flexDirection: 'column',
    boxShadow: "0px 0px 4px 1px #b7b7b7"
});


export const GameCardMedia = styled(CardMedia)({
    width: "100%",
    height: "120px !important",
    verticalAlign: "center"
});


export const GameCardContent = styled(CardContent)({
    padding: "8px",
});

export const GameCardTitle = styled(Typography)({
    fontWeight: "500",
    fontSize: "12px",
    margin: 0,
    textTransform: 'capitalize',
    color: "#0e9f99"
});


