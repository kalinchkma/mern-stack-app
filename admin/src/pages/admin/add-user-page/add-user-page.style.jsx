/**
 * add user form style
 */

import {Grid, styled} from "@mui/material";
import { Box} from "@mui/material";


export const AddUserWrapper = styled(Box)({
    width: "100%",
});

export const AddUserContainer = styled(Grid)({
   
});

export const FormWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const AddUserForm = styled('form')({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
});


export const FormHeader = styled(Box)({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const FormHeaderText = styled('div')(({theme}) =>({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    fontSize: "20px",
    marginBottom: "30px",
    width: "100%",
    textAlign: "center"
}));

export const FormActionBox = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px"
});

