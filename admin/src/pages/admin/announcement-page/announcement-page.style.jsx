/**
 * announcement style
 */
import {styled, Box, Grid} from "@mui/material";


export const AnnouncementConatiner = styled(Box)({
    width: "100%"
});

// announcement form styled components
export const AnnouncementForm = styled('form')({
    width: "100%",
    padding: "10px"
});

export const FormHeader = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "700",
    
});



export const FormBody = styled(Grid)({
    margin: "10px 0px"
});

export const FormBodyField = styled(Grid)({
    
});

export const FormBodyFieldItem = styled(Grid)({
    display: "flex",
    alignItems: "center",
    justifyContent: "start"
})



