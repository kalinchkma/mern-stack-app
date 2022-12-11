/**
 * add user page
 */


/**
 * @TODO add fetchUsersStart async function
 */

import * as React from "react";

import { 
    FormControl,
    Grid,
    TextField,
    InputLabel,
    FormHelperText,
    Divider,
    Select,
    MenuItem,
    Button,
    InputAdornment,
    IconButton
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import component
import Notification from "../../../components/notifiation/notification";
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";

// external imports
import { useNavigate } from "react-router-dom";

// redux state imports
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../../redux/auth/auth.selector";


// styled component imports
import {
    AddUserContainer,
    AddUserForm,
    AddUserWrapper,
    FormWrapper,
    FormHeader,
    FormHeaderText,
    FormActionBox
} from "./add-user-page.style";

// controller imports
import {adminSignup} from "../../../controllers/userController";



const AddUserPage = ({auth}) => {
    /**
     * =================================================
     * set page title
     * =================================================
     */
    document.title = "Add user";
    const navigate = useNavigate();


    /**
     * ====================================================
     * user input state
     * ====================================================
     */
    const [state, setState] = React.useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: "",
        showPassword: false,
        showConfirmPassword: false,
        errors: {
            name: undefined,
            username: undefined,
            email: undefined,
            phone: undefined,
            password: undefined,
            confirmPassword: undefined,
        }
    });

    /**
     * =============================================================
     * notification state
     * =============================================================
     */
     const [notify, setNotify] = React.useState({
        open: false,
        message: "error",
        severity: 'error'
    });

    const handleNotifyClose = () => {
        setNotify({
            ...notify,
            open: false,
            message: '',
            severity: 'success'
         });
      };
    
    /**
     * =============================================
     * signup error state
     * =============================================
     */
    const [signupErrors, setSignupErrors] = React.useState({});

    /**
     * =======================================================
     * password visivility on off function for password
     * @param {event} e 
     * =======================================================
     */
    const handleClickShowPassword = (e) => {
        setState({
            ...state,
            showPassword: !state.showPassword
        })
    }

    /**
     * =====================================================================
     * password visivility on off function for confirm password
     * @param {event} e 
     * =====================================================================
     */
    const handleClickShowConfirmPassword = (e) => {
        setState({
            ...state,
            showConfirmPassword: !state.showConfirmPassword
        })
    }

   /**
    * ==================================================================
    * set user input into state
    * @param {event of input} e 
    * ==================================================================
    */
    const handleChange = (e) => {
        setSignupErrors({});
       
        if(e.target.id === "confirmPassword") {
            if(e.target.value !== state.password) {
                setState({
                    ...state,
                    confirmPassword: e.target.value,
                    errors: {
                        ...state.errors,
                        confirmPassword: "Password dose not match"
                    }
                })
               
            } else {
                setState({
                    ...state,
                    confirmPassword: e.target.value,
                    errors: {
                        ...state.errors,
                        confirmPassword: undefined
                    }
                })
            }
        } else {
            setState({
                ...state,
                [e.target.id]: e.target.value
            });
        }
    }
    /**
     * ==============================================================
     * @param {type chenge function} e 
     * ==============================================================
     */
    const handleTypeChange = (e) => {
        setState({
            ...state,
            userType: e.target.value
        })
    }

     /** 
     * ==============================================
     * add new user function
     * ==============================================
     */
    const addUserHandler = async (e) => {
        e.preventDefault()
       
        if(state.password !== state.confirmPassword) {
            setState({
                ...state,
                errors: {
                    ...state.errors,
                    confirmPassword: "Password dose not match"
                }
            })
        } else {
            try {
              
                const reqObject = {
                    name: state.name,
                    username: state.username,
                    email: state.email,
                    phone: `+88${state.phone}`,
                    password: state.password,
                    userType: state.userType,
                    token: auth.token,
                
                };
               

                const signupResult = await adminSignup(reqObject);
                if(signupResult.status !== 200) {
                
                 setSignupErrors({...signupResult});
                 setNotify({
                    ...notify,
                    open: true,
                    message: 'Error to create user',
                    severity: 'error'
                });
                } else {
                  

                     setNotify({
                         ...notify,
                         open: true,
                         message: 'User created siccessfully!',
                         severity: 'success'
                     });
                     setState({
                         name: '',
                         username: '',
                         email: '',
                         phone: '',
                         password: '',
                         confirmPassword: '',
                         userType: "",
                         showPassword: false,
                         showConfirmPassword: false,
                         errors: {
                             name: undefined,
                             username: undefined,
                             email: undefined,
                             phone: undefined,
                             password: undefined,
                             confirmPassword: undefined,
                         }
                     })
                }
            } catch(err) {
                
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error to create user',
                    severity: 'error'
                });
            }
        }
    }
    /**
     * previous link
     */
     const previousLink = [["Dashboard", "/admin/"]]

    /** 
     * ==============================================
     * Render user interface
     * ==============================================
     */
    return (
        <AddUserWrapper>
            <PageBreadcrumbs prevLinks={previousLink} currentPage={'Add new user'} />
            <AddUserContainer container>
                

                {/* offset grid */}
                <Grid item xs={0} sm={1} md={2} lg={2} xl={2} />

                {/*
                ==============================================
                    From body grid
                ===============================================
                */}
                <Grid item xs={12} sm={10} md={8} lg={8} xl={8} >
                    <FormWrapper>
                       
                        <AddUserForm onSubmit={addUserHandler}>
                            
                            <FormHeader>
                                <FormHeaderText>
                                    Add New User
                                </FormHeaderText>
                            </FormHeader>
                            <Divider />
                            <Grid container spacing={2} >
                                {/* 
                                =====================================================================
                                                    Name field 
                                =====================================================================
                                */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                    
                                    <TextField 
                                        id="name"
                                        aria-describedby="name-help"
                                        label="Name"
                                        value={state.name}
                                        onChange={handleChange}
                                        required
                                        />
                                        <FormHelperText id="name-help" error={
                                            signupErrors ? signupErrors.name ?
                                              true : false : false
                                              } >
                                            {
                                                signupErrors ? signupErrors.name ? signupErrors.name.msg : "Provide Name of user" : "Provide Name of user" 
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {/* 
                                =====================================================================
                                                    username field 
                                =====================================================================
                                */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                    
                                    <TextField 
                                        id="username"
                                        aria-describedby="username-help"
                                        label="username"
                                        value={state.username}
                                        onChange={handleChange}
                                        required
                                        />
                                        <FormHelperText id="username-help" error={
                                            signupErrors ? signupErrors.username ?
                                              true : false : false
                                              } >
                                            {
                                                signupErrors ? signupErrors.username ? signupErrors.username.msg : "Provide Name of user" : "Provide Name of user" 
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {/*
                                ==============================================================
                                                    Email field 
                                ==============================================================
                                */}
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                    
                                        <TextField 
                                            id="email"
                                            aria-describedby="email-help"
                                            label="Email"
                                            type="email"
                                            value={state.email}
                                            onChange={handleChange}
                                            required
                                            />
                                            <FormHelperText id="email-help"
                                                error={
                                                    signupErrors ? signupErrors.email ?
                                                      true : false : false
                                                }
                                            >{
                                                signupErrors ? 
                                                signupErrors.email ?
                                                signupErrors.email.msg : "Provide Email" : "Provide Email"
                                            }</FormHelperText>
                                    </FormControl>
                                </Grid>
                                 {/* 
                                 ==============================================================
                                                phone  number 
                                 ==============================================================
                                 */}
                                 <Grid item xs={12}>
                                    <FormControl fullWidth >
                                    
                                        <TextField 
                                            id="phone"
                                            aria-describedby="phone-help"
                                            label="phone number"
                                            value={state.phone}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">
                                                   +88
                                                </InputAdornment>
                                            }}
                                            
                                            />
                                            <FormHelperText id="phone-help"
                                                error={
                                                    signupErrors ? signupErrors.phone ?
                                                          true : false : false
                                                }
                                            > 
                                            {
                                                signupErrors ? 
                                                signupErrors.phone ?
                                                signupErrors.phone.msg : 
                                                "Provide Phone number Only Bangladesh phone number are allowed" :
                                                "Provide Phone number Only Bangladesh phone number are allowed"
                                            }
                                             </FormHelperText>
                                    </FormControl>
                                </Grid>
                                {/* 
                                =======================================================
                                            select user type 
                                =======================================================
                                */}
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                        <InputLabel id="userType-label">Select UserType</InputLabel>
                                        <Select
                                            labelId="userType-label"
                                            id="userType"
                                            onChange={handleTypeChange}
                                            label="Select UserType"
                                            value={state.userType}
                                         >
                                            <MenuItem value="buyer">Buyer</MenuItem>
                                            <MenuItem value="seller">Seller</MenuItem>
                                
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* 
                                    ================================================
                                                 password phone 
                                    ================================================
                                    */}
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <FormControl fullWidth >
                                    
                                        <TextField 
                                            id="password"
                                            type={state.showPassword ? "text" : "password"}
                                            aria-describedby="pasword-help"
                                            label="Password"
                                            value={state.password}
                                            onChange={handleChange}
                                        
                                            required
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <IconButton
                                                    onClick={handleClickShowPassword}
                                                    >
                                                        {state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }}
                                            />
                                        <FormHelperText id="password-help" 
                                            error={
                                                signupErrors ? signupErrors.password ?
                                                      true : false : false
                                            }
                                        >
                                            {
                                                signupErrors ? 
                                                signupErrors.password ?
                                                signupErrors.password.msg : 
                                                "Password must be atleat 1 number,1 character,1 uppercase, 1 lowercase, 1 symbol and at least 8 character long" :
                                                "Password must be atleat 1 number,1 character,1 uppercase, 1 lowercase, 1 symbol and at least 8 character long"
                                            }
                                           </FormHelperText>
                                    </FormControl>
                                </Grid>
                                    {/* 
                                    ==================================================
                                    confirem password phone
                                    ===================================================
                                     */}
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormControl fullWidth >
                                        
                                            <TextField 
                                                id="confirmPassword"
                                                aria-describedby="confirm-password-help"
                                                label="Confirem Password"
                                                required
                                                type={state.showConfirmPassword ? "text" : "password"}
                                                value={state.confirmPassword}
                                                onChange={handleChange}
                                                error={state.errors.confirmPassword !== undefined ? true : false}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                        <IconButton
                                                        onClick={handleClickShowConfirmPassword}
                                                        >
                                                        {state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }}
                                                />
                                                <FormHelperText 
                                                 error={
                                                    signupErrors ? signupErrors.password ?
                                                          true : false : false
                                                 }
                                                id="confirm-password-help">
                                                {
                                                state.errors.confirmPassword !== undefined ?
                                                state.errors.confirmPassword : ""}
                                                </FormHelperText>
                                        </FormControl>
                                    </Grid>
                        {/*
                        =============================================
                        form action box     
                        ============================================                       
                        */}
                                    <Grid item xs={12}>
                                        <FormActionBox>
                                            <Button sx={{
                                                padding: "15px 20px",
                                                marginRight: "30px"
                                            }} variant="contained" size="large"
                                            type="submit"
                                            >Add User</Button>

                                            <Button
                                            sx={{
                                                padding: "15px 20px"
                                            }}
                                            variant="contained" color="error" size="large"
                                            onClick={() => navigate(-1)}
                                            >Cancel</Button>
                                        </FormActionBox>
                                    </Grid>

                                {/* 
                                    ================================
                                        action box end
                                    =================================
                                */}
                            </Grid>
                        </AddUserForm>
                    </FormWrapper>
                </Grid>
                {/**
                 * ===================================================================
                   notification pusher
                =======================================================================
                */}

                <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
            </AddUserContainer>
        </AddUserWrapper>
    )
}

const mapStateTopProps = createStructuredSelector({
    auth: selectAuthToken
})


export default connect(mapStateTopProps)(AddUserPage);
