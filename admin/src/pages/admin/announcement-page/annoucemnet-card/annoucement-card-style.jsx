/**
 * announcement style
 */

import {Avatar, CardContent, CardMedia, styled} from "@mui/material";
import { Box } from "@mui/system";



export const AnnouncementCardContainer = styled(Box)({
    display: "flex", 
    margin: "30px 5px",
});

export const AnnouncementCardAvatar = styled(Box)({
    flex: 1
});

export const AnnoucementAvatar = styled(Avatar)({
    backgroundColor: "#107c9f",
    fontWeight: "700"
});

export const AnnouncementCardBodyConatiner = styled(Box)({
    flex: 11,
    position: "relative",
    margin: "0px 10px",
    marginLeft: "25px",
    background: "transparent",
   
    "&:before": {
        content: "''",
        position: "absolute",
        borderBottom: "30px solid #0000",
        borderLeft: "30px solid #e1e1e1",
        transform: "translate(-12px, 6px) rotate(-45deg)",
        top: "0",
        left: "0"
        
    }
});

export const AnnouncementCardBodyContent = styled(CardContent)({
    padding: "5px 16px",
    "& p": {
      margin: 0,
      fontSize: "14px"
    }
})

export const AnnouncementCardImage = styled(CardMedia)({
    borderRadius: "10px",
    width: "95% !important"
})





