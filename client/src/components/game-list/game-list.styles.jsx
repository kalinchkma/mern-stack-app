/**
 * game list style
 */

import {styled, Typography} from "@mui/material";
import { Box } from "@mui/system";



export const GameListContainer = styled(Box)({
    padding: "5px 10px",
    transform: "translateY(-50px)",
  
});


export const GameListTitle = styled(Typography)({
    color: "#333",
    textTransform: "capitalize",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "15px",
    marginTop: "30px"
});