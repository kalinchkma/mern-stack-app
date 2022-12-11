/**
 * Title: sign in components
 */

import {
     LoginContainer,
     LoginFormBox,
     LoginFormContainer,
     InputBox,
     LoginButtonBox,
     LoginButton,
} from "./login.styles";

import { 
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    Grid,
    Typography,
    Alert
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";


// redux imports
import { connect } from "react-redux";

import { setToken } from "../../redux/auth/auth.action";

import config from "../../config";

// redux router 
import { useNavigate} from "react-router-dom"



const LoginComponent = ({setToken }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: '',
        password: '',
        showPassword: false,
        loginError: false,
        loginErrorMessage: ''
    });

    const handleChange = (prop) => (event) => {
        setState({...state, [prop]: event.target.value});
    }


    const handleClickShowPassword = () => {
        setState({
            ...state,
            showPassword: !state.showPassword
        });
    }
    
    // signin request hacler
    const loginHandler = async () => {
        // const prepare user object for signin
        const userObject = {
            username: state.username,
            password: state.password
        };
        try {
            const result = await fetch(`${config.API_DOMAIN}/admin/login`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            });
            const res = await result.json();
          
            if(result.status === 200) {
               
                setState({
                    ...state,
                    loginErrorMessage: "",
                    loginError: false
                });
               
                setToken(res.success.auth_user);
                navigate('/admin/');
            } else {
               
                setState({
                    ...state,
                    loginErrorMessage: "!Error invalid user",
                    loginError: true
                });
               return;
            }
            
           
        } catch(err) {
            
            setState({
                ...state,
                loginError: true,
                loginErrorMessage: "Login failed!"
            });
        }
       
    }


    return (
        <LoginContainer>

            <LoginContainer>
                <LoginFormContainer>

                    <Grid container spacing={1}>
                            {/* placeholder */}
                            <Grid item xs={0} sm={2} md={3} lg={3} xl={3}></Grid>
                            {/* main item */}
                            <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                            <LoginFormBox >
                                {/* welcome message */}
                                <Typography variant="h3"
                                    sx={{
                                       color: "#333",
                                       fontWeight: "500"
                                    }}
                                >
                                    Admin Login
                                </Typography>
                               
                                {/* signup message */}
                                { state.loginError && <Alert sx={{width: "100%"}} severity="error">{state.loginErrorMessage}</Alert> }
                            {/* user name field */}
                          
                            <InputBox variant="outlined" fullWidth>
                                <InputLabel htmlFor="username" >email or phone</InputLabel>
                                <OutlinedInput 
                                    id="username"
                                    type="text"
                                    value={state.username}
                                    onChange={handleChange('username')}
                                    label="email or phone or username"
                                />
                            </InputBox>

                            {/* password field */}
                            <InputBox variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={state.showPassword ? "text" : "password"}
                                    value={state.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </InputBox>

                            <LoginButtonBox>
                                <LoginButton onClick={loginHandler} >Login</LoginButton>
                            </LoginButtonBox>


                         </LoginFormBox>

                        </Grid>

                        {/* placeholder */}
                        <Grid item xs={0} sm={2} md={3} lg={3} xl={3}></Grid>
                    {/* grid container end */}
                    </Grid>
                    
                </LoginFormContainer>
            </LoginContainer>
        </LoginContainer>
    )
}


const mapDispatchTopProps = dispatch => ({
    setToken: token => dispatch(setToken(token))
})



export default connect(null, mapDispatchTopProps)(LoginComponent);
