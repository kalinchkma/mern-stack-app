/**
 * add user form style
 */

 import {Grid, styled} from "@mui/material";
 import {Box} from "@mui/material";
 
 
 export const AddGameWrapper = styled(Box)({
     width: "100%",
 });
 
 export const AddGameContainer = styled(Grid)({
    
 });
 
 export const FormWrapper = styled(Box)({
     width: "100%",
     display: "flex",
     alignItems: "center",
     justifyContent: "center"
 });
 
 export const AddGameForm = styled('form')({
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
     backgroundColor: "#edeeef",
     fontSize: "20px",
     marginBottom: "30px",
     width: "100%",
     textAlign: "center",
     padding: "13px 0px"

 }));
 
 export const FormActionBox = styled(Box)({
     display: "flex",
     width: "100%",
     alignItems: "center",
     justifyContent: "center",
     padding: "20px 0px"
 });

 export const DescriptionTextBox = styled(Box)({
    width: "100%",
    padding: "2px 0px",
    alignItems: "start",
    justifyContent: "start"
 })
 
 