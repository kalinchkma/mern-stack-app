/**
 * signup components
 */

import { useNavigate, Link, useSearchParams } from "react-router-dom";

// imports styles
import { Button, FormControl, FormHelperText, Grid, InputAdornment, TextField,Alert, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState , useEffect } from "react";

import { 
    FormBox,
    LoginButton,
    LoginContainer,
    LoginOptionBox
} from "./login.styles";

// utils & firebase input
import { login } from "../../controllers/userController";

// state import
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setToken } from "../../redux/auth/auth.action";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { fetchConfigStartAsync } from "../../redux/config/config.action";
import { selectAllConfig } from "../../redux/config/config.select";
import { Box } from "@mui/system";
 
 
 const Login = ({ auth, setToken, configs, fetchConfigStartAsync }) => {
     const naviagte = useNavigate();
     const [params] = useSearchParams();

     useEffect(() => {
        fetchConfigStartAsync();
        if(auth !== null) {
            naviagte("/");
        }         
     }, []);
     /**
      * signup date state 
      */
     const [state, setState] = useState({
         username: "",
         password: "",
         showPassword: false,
         loginStatus: false
     });
 
     /**
      * signup error state
      */
     const [errors, setErrors] = useState({
         msg: undefined,
         status: false,
         block: false,
         mode: true
     });
 
 
     /**
      * handle input change
      */
     const handleChange = (e) => {
         setState({
             ...state,
             [e.target.id]: e.target.value
         });
         setErrors({
            ...errors,
            mode: false
         })
     }

 
     /**
      * signup handler
      */
     const loginHandler = async (e) => {
         e.preventDefault();
         try {
            const res = await login(state);
            if(res.status === 200) {
                 setErrors({
                     ...errors,
                     msg: undefined,
                     status: false
                 });
                 setState({
                     ...state,
                     username: "",
                     password: "",
                     showPassword: false,
                     loginStatus: true
                 });
                 setToken(res.success.auth_user);
                 
                 if(params.get('a')) {
                    naviagte(`/${params.get('a')}`);
                 } else {
                    naviagte("/");
                 }
            } 
            else if(res.status === 405) {
                setErrors({
                    ...errors,
                    msg: res.errors.msg,
                    status: true,
                    block: true
                });
            }
            else {
                
                setErrors({
                     ...errors,
                     msg: "Login Failed! Invalid user!",
                     status: true
                 });
            }
 
         } catch(err) {
             setErrors({
                 ...errors,
                 msg: "Login Failed! Invalid user!",
                 status: true
             })
         }
         
     }
 
     return !auth && (
         <LoginContainer>
             <LoginOptionBox>

                
                
                 <span>
                     Login
                 </span>
                
                 
                 <div>
                    <Typography>If you don't have an account signup  <Link to="/signup">here</Link> </Typography>
                 </div>
                 {
                    params.get('a') && errors.mode &&
                    <div style={{width: '80%', marginTop: "8px", marginBottom: "8px"}}>
                        <Alert severity="error" >Please login first! </Alert>
                    </div>
                   }
                 {
                     errors.status &&
                     <Alert severity="error">{errors.msg}</Alert>
                 }
                 {
                    errors.block &&
                    configs && 
                    configs.map(config => {
                        if(config.name === "facebook") {
                            return (
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "10px 0px",
                                    color: "#666"
                                }}>
                                    Please click  
                                    <a style={{
                                    padding: "4px",
                                    textTransform: "lowercase",
                                    background: "#dfe6eb",
                                    margin: "0px 4px",
                                    borderRadius: "8px"
                                    }} href="http://facebook.com" rel="noreferrer" target="_blank">here</a>
                                    to contact
                                </Box>
                            )
                        }
                        return "";
                    })
                   
                 }
             </LoginOptionBox>
 
             <FormBox onSubmit={loginHandler}>
             <Grid container spacing={1}>
                 <Grid item xs={12}>
                     <FormControl fullWidth>
                         <TextField
                             id="username"
                             label="Email or phone or username"
                            
                             value={state.username}
                             onChange={handleChange}
                             required
                             error={errors.status}
                         />
                         <FormHelperText  >{"Enter your email or phone number or username"}</FormHelperText>
                     </FormControl>
                 </Grid>
 
           
                
 
                 <Grid item xs={12}>
                     <FormControl fullWidth>
                         <TextField
                             id="password"
                             label="Password"
                             value={state.password}
                             onChange={handleChange}
                            
                             required
                             type={ state.showPassword ? "text" :'password'}
                             error={errors.status}
                             InputProps={{
                                 endAdornment:
                                 <InputAdornment position="end">
                                     {
                                         state.showPassword ?
                                         <Button onClick={() => setState({
                                             ...state,
                                             showPassword: !state.showPassword
                                         })} >
                                            <VisibilityOff sx={{color: "#107c9f"}} />
                                         </Button> :
                                         <Button
                                         onClick={() => setState({
                                             ...state,
                                             showPassword: !state.showPassword
                                         })}
                                         >
                                             <Visibility sx={{color: "#107c9f"}} />
                                         </Button>
                                     }
 
                                 </InputAdornment>
                             }}
                         />
 
                         <FormHelperText  >{"Enter your password"}</FormHelperText>
                     </FormControl>
                 </Grid>
 
                 <Grid item xs={12} sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "end"
                 }}>
                    <LoginButton size="small" type="submit" variant="contained" >Login</LoginButton>
                 </Grid>
             </Grid>
             </FormBox>
         </LoginContainer>
     )
 }
 
 
 const mapStateToProps = createStructuredSelector({
     auth: selectAuthToken,
     configs: selectAllConfig
 });
 
 const mapDispatchToProps = dispatch => ({
     setToken: (payload) => dispatch(setToken(payload)),
     fetchConfigStartAsync: () => dispatch(fetchConfigStartAsync())
 })
 
 export  default connect(mapStateToProps, mapDispatchToProps)(Login);
 