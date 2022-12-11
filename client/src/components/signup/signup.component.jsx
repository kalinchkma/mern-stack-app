/**
 * signup components
 */

import { Link, useNavigate, useParams } from "react-router-dom";

// imports styles
import { Button, FormControl, FormHelperText, Grid, InputAdornment, TextField,Alert, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, useEffect } from "react";
import { SignupContainer, FormBox, SignupButton, SignupOptionBox } from "./signup.styles";

// utils & firebase input

import { signup } from "../../controllers/userController";

// state import
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import { setToken } from "../../redux/auth/auth.action";
import { selectAuthToken } from "../../redux/auth/auth.selector";


const Signup = ({ auth, setToken }) => {
    const naviagte = useNavigate();
    const param = useParams();

    useEffect(() => {
        if(auth !== null) {
            naviagte("/");
        }
     }, []);

    /**
     * signup date state 
     */
    const [state, setState] = useState({
        name: "",
        email: "",
        username: "",
        phone: "",
        password: "",
        showPassword: false,
        signupStatus: false
    });

    /**
     * signup error state
     */
    const [errors, setErrors] = useState({
        name: undefined,
        username: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        status: false
    });


    /**
     * handle input change
     */
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        });
    }

    /**
     * signup handler
     */
    const signupHandler = async (e) => {
        e.preventDefault();
        try {
           const res = await signup(state);
           if(res.status === 200) {
                setErrors({
                    ...errors,
                    name: undefined,
                    username: undefined,
                    email: undefined,
                    phone: undefined,
                    password: undefined,
                    status: false
                });
                setState({
                    ...state,
                    name: "",
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    showPassword: false,
                    signupStatus: true
                });
           } else {
                setErrors({
                    ...state,
                    name:  res.name ? res.name.msg : undefined,
                    username: res.username ? res.username.msg : undefined,
                    email: res.email ? res.email.msg: undefined,
                    phone: res.phone ? res.phone.msg: undefined,
                    password: res.password ? res.password.msg : undefined,
                    // status: true
                });
           }

        } catch(err) {
            setErrors({
                ...errors,
                status: true
            })
        }
        
    }

    return (
        <SignupContainer>
            <SignupOptionBox>
                <span>
                    Signup
                </span>
                <div>
                  {/* <Button variant="outlined" color="error" sx={{mr: 3, mb: 3}} onClick={handleGoogleAuth}  ><GoogleIcon />Google</Button>
                  <Button variant="outlined" sx={{mb: 3}}><FacebookIcon/> Facebook</Button> */}
                  <Typography>If you already have an account Login <Link to="/login">here</Link> </Typography>
                </div>
                {
                    state.signupStatus && 
                    <Alert severity="success">Signup successfull, <Link to="/login">Login</Link> </Alert>
                }
                {
                    errors.status &&
                    <Alert security="error">Failed to Signup</Alert>
                }
            </SignupOptionBox>

            <FormBox onSubmit={signupHandler}>
                {/* form grid */}
            <Grid container spacing={1}>
                
                {/* user full name */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="name"
                            label="full name"
                            value={state.name}
                            onChange={handleChange}
                            required
                            size="small"
                        />
                        <FormHelperText error={errors.name ? true : false} >{errors.name ? errors.name: "Enter your name"}</FormHelperText>
                    </FormControl>
                </Grid>
                 {/* username */}
                 <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="username"
                            label="username"
                            value={state.username}
                            onChange={handleChange}
                            required
                            size="small"
                        />
                        <FormHelperText error={errors.username ? true : false} >{errors.username ? errors.username: "create username"}</FormHelperText>
                    </FormControl>
                </Grid>

                {/* user email */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            label="Email"
                            type='email'
                            value={state.email}
                            onChange={handleChange}
                            required
                            size="small"
                        />
                         <FormHelperText error={errors.email ? true : false} >{errors.email ? errors.email: "Enter your email"}</FormHelperText>
                    </FormControl>
                </Grid>
                {/* user phone number */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            type={'text'}
                            value={state.phone}
                            onChange={handleChange}
                            required
                            size="small"
                            InputProps={{
                                startAdornment:
                                <InputAdornment position="start">
                                    +88
                                </InputAdornment>
                            }}
                        />
                         <FormHelperText error={errors.phone ? true : false} >{errors.phone ? errors.phone: "Enter your phone number"}</FormHelperText>
                    
                    </FormControl>
                </Grid>
                    {/* user create password  */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            id="password"
                            label="Create Password"
                            value={state.password}
                            onChange={handleChange}
                            required
                            size="small"
                            type={ state.showPassword ? "text" :'password'}
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

                        <FormHelperText error={errors.password ? true : false} >{errors.password ? errors.password : "Password must be at least 1 uppercase 1 lowercase 1 symbol & 1 number"}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end"
                }}>
                    <SignupButton type="submit" size="small" variant="contained" >Signup</SignupButton>
                </Grid>
            </Grid>
            </FormBox>
        </SignupContainer>
    )
}


const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken
});

const mapDispatchToProps = dispatch => ({
    setToken: (payload) => dispatch(setToken(payload))
})

export  default connect(mapStateToProps, mapDispatchToProps)(Signup);
