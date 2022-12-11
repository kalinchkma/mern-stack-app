/**
 * user profile page
 */

import * as React from "react";
import { useNavigate } from "react-router-dom";

// controller
import { changeName, changePassword, addTransactionNumber } from "../../controllers/userController";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// redux imports
import { messageFetchSuccess } from "../../redux/message/message.action";

import config from "../../config";



import { 
    Box, 
    Button, 
    Divider, 
    Grid,
    List, 
    ListItem, 
    TextField,
    ListItemText, 
    Alert,
    InputAdornment,
    FormControl,
    FormHelperText
} from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
// state imports
import { connect } from "react-redux";
import { messageFetchStartAsync } from "../../redux/message/message.action";
import { selectAllMesssages } from "../../redux/message/message.select";
import { selectAllConfig } from "../../redux/config/config.select";
import { fetchConfigStartAsync } from "../../redux/config/config.action";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { setToken } from "../../redux/auth/auth.action";

// styled  import
import { ListHeader } from "./profile.page.styles";


const ProfilePage = ({ auth, messageFetchStartAsync,  setToken, setMessages, configs,fetchConfigStartAsync}) => {
    const navigate = useNavigate();

    /**......................................................
     * state for change user info
     * ......................................................
     *  */ 
    const [fullName, setFullName] = React.useState(auth && auth.name);
    const [nameError, setNameError] = React.useState(false);
    const [nameSuccess, setNameSuccess] = React.useState(false);

    /**............................................................
     * password change state
     * ............................................................
     * */
    const [newPassword, setNewPassword] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");    
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordSuccess, setPasswordSuccess] = React.useState(false);
    const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = React.useState(undefined);
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = React.useState(undefined);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const [showOldPassword, setShowOldPassword] = React.useState(false);

    // setting password change
    const handleOldPassChange = (e) => {
        setOldPassword(e.target.value);
        setOldPasswordErrorMsg(undefined);
    }

    const handleNewPassChange = (e) => {
        setNewPassword(e.target.value);
        setNewPasswordErrorMsg(undefined);
    }

    /**.........................................................
     * state for setting transaction number
     * .........................................................
     */
    const [transactionNumber, setTransactionNumber] = React.useState("");
    const [transactionNumberErrorMsg, setTransactionNumberErrorMsg] = React.useState(undefined);
    const [transactionNumberSuccessMsg, setTransactionNumberSuccessMsg] = React.useState(undefined);

    // set transaction number handler
    const transactionNumberHandler = async (type) => {
        // reqObject
        const reqObject = {
            token: auth.token,
            uid: auth.uid,
            type: type,
            number: `+88${transactionNumber}`
        }
        try {
            const res = await addTransactionNumber(reqObject);
            if(res.status === 200) {
              
                setTransactionNumberErrorMsg(undefined);
                setTransactionNumberSuccessMsg(res.success.msg);
                setTransactionNumber("");
                setToken(res.success.user);
                setInterval(() => {
                    setTransactionNumberSuccessMsg(undefined);
                }, 10000);
            } else if(res.status === 403) {
               
                setTransactionNumberErrorMsg(res.errors.msg);
                
            } else {
                
                if(res.number) {
                    setTransactionNumberErrorMsg(res.number.msg);
                } else {
                    setTransactionNumberErrorMsg(res.errors.msg);
                }
            }
        } catch(err) {
            setTransactionNumberErrorMsg(err);
        }
    }

    
    React.useEffect(() => {
        if(auth === null) {
            navigate("/login?a=profile");
        } else {
            messageFetchStartAsync(auth.uid);
            fetchConfigStartAsync();
        }
    }, []);

    // password change handler 
    const newPasswordChangeHandler = async () => {
        // reqObject
        const reqObject = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            uid: auth.uid,
            token: auth.token
        }
         try {
            const res = await changePassword(reqObject);
            if(res.status === 200) {
                
                setOldPassword("");
                setNewPassword("");
                setPasswordSuccess(true);
                setInterval(() => {
                    setPasswordSuccess(false);
                }, 4000);
            } else if(res.status === 403) {
                // set error state
                if(res.errors.oldPassword) {
                    setOldPasswordErrorMsg(res.errors.oldPassword.msg);
                }
            } else {
               
                // set error state
                if(res.newPassword) {
                    setNewPasswordErrorMsg(res.newPassword.msg);
                }
                if(res.oldPassword) {
                    setOldPasswordErrorMsg(res.oldPassword.msg);
                }
            }
         } catch(err) {
           
            setPasswordError(true);
            setInterval(() => {
                setPasswordError(false);
            }, 4000);
         }
    }


    // user full name change handler
    const nameChangeHandler = async () => {
        // reqObject
        const reqObject = {
            uid: auth.uid,
            name: fullName,
            token: auth.token          
        }
       
        try {
            const res = await changeName(reqObject);
            if(res.status === 200) {
                // update the user login
                setToken(res.success.user);
                setNameSuccess(true);
                setInterval(() => {
                    setNameSuccess(false)
                }, 4000);
            } else {
                // show error message
                setNameError(true);
                setInterval(() => {
                    setNameError(false)
                }, 4000);
            }
        } catch(err) {
            // show error message
            setNameError(true);
            setInterval(() => {
                setNameError(false)
            }, 4000);
        }
    }

    // logout handler
    const logoutHandler = () => {
        // delete user state
        setMessages(null);
        setToken(null);
        navigate("/")
    }

    /**
     * ..........................................................................
     * set buyer seller active status
     * ..........................................................................
     */
    const setStatus = async (status) => {
       
        try {
            const reqObject = {
                token: auth.token,
                status: status,
                uid: auth.uid
            }
            const res = await fetch(`${config.API_DOMAIN}/user/status`, {
                method: "POST",
                body: JSON.stringify(reqObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            
            if(res.status === 200) {
                setToken(result.success.user);
               
            } else {
              navigate("/404");
            }

        } catch(err) {
            navigate("/404");
           
        }
    }

    return auth && (
        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* page header */}
            {/* profile info */}
            <Grid container spacing={2} sx={{width: "100%"}}>
                {/* profile avater info */}
                <Grid item xs={12} container sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    mt: 0,
                    pt: "0px !important"
                }}>
                    <List sx={{width: "100%"}}>
                        {/* 
                        ==========================
                        profile info
                        */}
                        <ListHeader>
                            Profile Info
                        </ListHeader>
                        {/*
                        ========================
                        display name edit-able 
                        =======================
                        */}
                         {/* displaying sucess and errors */}
                         {
                            nameError &&
                            <ListItem>
                                <Alert sx={{width: "100%"}} severity="error">name update error! try again</Alert>
                            </ListItem>
                        }
                        {
                            nameSuccess &&
                            <ListItem>
                                <Alert color="info" sx={{width: "100%"}} severity="success">name has been updated</Alert>
                            </ListItem>
                        }
                        {/* displaying error & success end */}
                        <ListItem sx={{justifyContent: "space-between"}}>
                            <TextField
                                label=""
                                size="small"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <Button onClick={nameChangeHandler} variant="contained" size="small" color="inherit">Edit</Button>
                        </ListItem>
                       
                        <Divider />
                        {/* 
                         username not edit-able
                        */}
                        <ListItem>
                            <ListItemText primary={"username:"} secondary={auth.username ? auth.username : "N/A"} />
                        </ListItem>
                        <Divider />
                        {/* user email not edit-able */}
                        <ListItem>
                            <ListItemText primary={"email:"} secondary={auth.email ? auth.email : "N/A"} />
                        </ListItem>
                        <Divider />
                        {/* user phone number not edit-able */}
                        <ListItem>
                            <ListItemText primary="phone number:" secondary={auth.phone ? auth.phone: "N/A"} />
                        </ListItem>
                        <Divider/>

                        {/* 
                        =======================================
                        add transaction number
                        =======================================
                        */}
                        
                            {/*  */}
                          {
                            auth && (auth.userType === "admin" || auth.userType === "seller") &&
                            <>
                            {/* section header */}
                            <ListItem>
                                <ListItemText primary="Add transaction numbers:" /> 
                            </ListItem>
                            {/* section body */}
                            {/* number showing list */}
                            {
                                auth.transactionNumbers &&
                                Object.keys(auth.transactionNumbers).length > 0 &&
                               
                                <ListItem sx={{flexDirection: 'column', alignItems: "start"}}>
                                    {
                                         Object.keys(auth.transactionNumbers).map(key => (
                                            <ListItemText key={key} primary={key} secondary={auth.transactionNumbers[key]} />
                                         ))
                                    }
                                    
                                </ListItem>
                            }
                            {/* number adding input field */}
                            <ListItem>
                              
                                    <Box>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Transaction Number"
                                                type={'text'}
                                                value={transactionNumber}
                                                onChange={(e) => setTransactionNumber(e.target.value)}
                                                size="small"
                                                InputProps={{
                                                    startAdornment:
                                                    <InputAdornment position="start">
                                                        +88
                                                    </InputAdornment>
                                                }}
                                            />
                                            {
                                                transactionNumberErrorMsg &&
                                                <FormHelperText error >{transactionNumberErrorMsg}</FormHelperText>
                                            }
                                            {
                                                transactionNumberSuccessMsg &&
                                                <FormHelperText error={false} sx={{color: "green"}} >{transactionNumberSuccessMsg}</FormHelperText>
                                            }
                                        
                                        </FormControl>
                                        <Button onClick={() => transactionNumberHandler("bkash")} sx={{margin: "5px 8px"}} variant="contained" color="inherit">Add Bkash</Button>
                                        <Button onClick={() => transactionNumberHandler("nogod")}  sx={{margin: "5px 8px"}} variant="contained" color="inherit">Add Nogod</Button>
                                    </Box>

                                
                            </ListItem>
                            <Divider/>
                            </>
                        
                        }
                        {/* 
                        ========================================================
                        user change password 
                        ========================================================
                        */}
                        <ListItem>
                            <ListItemText primary=" Change Password:" /> 
                        </ListItem>
                        <ListItem sx={{
                            flexDirection: "column", 
                            alignItems: "start",

                            }}>
                          
                                <FormControl fullWidth sx={{mb: 2}}>
                                    <TextField
                                    sx={{width: "100% "}}
                                    label="Enter New password"
                                    size="small"
                                    value={newPassword}
                                    onChange={handleNewPassChange}
                                    type={ showNewPassword ? "text" :'password'}
                                    error={newPasswordErrorMsg ? true : false}
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            {
                                                showNewPassword ?
                                                <Button onClick={() => setShowNewPassword(!showNewPassword)} >
                                                    <VisibilityOff sx={{color: "#107c9f"}} />
                                                </Button> :
                                                <Button
                                                onClick={() =>  setShowNewPassword(!showNewPassword)}
                                                >
                                                    <Visibility sx={{color: "#107c9f"}} />
                                                </Button>
                                            }
        
                                        </InputAdornment>
                                    }}
                                />
                                    {
                                        newPasswordErrorMsg &&
                                        <FormHelperText error >{newPasswordErrorMsg}</FormHelperText>
                                    }
                                </FormControl>
                             
                       
                                <FormControl fullWidth sx={{mb: 2}}>
                                    <TextField
                                    label="Enter old password"
                                    size="small"                             
                                    value={oldPassword}
                                    onChange={handleOldPassChange}
                                    type={ showOldPassword ? "text" :'password'}
                                     error={oldPasswordErrorMsg ? true: false}
                                    InputProps={{
                                        endAdornment:
                                        <InputAdornment position="end">
                                            {
                                                showOldPassword ?
                                                <Button onClick={() => setShowOldPassword(!showOldPassword)} >
                                                    <VisibilityOff sx={{color: "#107c9f"}} />
                                                </Button> :
                                                <Button
                                                onClick={() => setShowOldPassword(!showOldPassword)}
                                                >
                                                    <Visibility sx={{color: "#107c9f"}} />
                                                </Button>
                                            }
        
                                        </InputAdornment>
                                    }}
                                    />
                                    {
                                        oldPasswordErrorMsg &&
                                        <FormHelperText error >{oldPasswordErrorMsg}</FormHelperText>
                                    }
                                </FormControl>
                              
                          
                                <Button variant="contained" onClick={newPasswordChangeHandler} color="inherit">update password</Button>
                        </ListItem>
                        {/* show password change error and success message */}
                        {
                            passwordError &&
                            <ListItem>
                                <Alert sx={{width: "100%"}} severity="error">Password changing error! try again</Alert>
                            </ListItem>
                        }
                        {
                            passwordSuccess &&
                            <ListItem>
                                <Alert color="info" sx={{width: "100%"}} severity="success">Password changed successfully!</Alert>
                            </ListItem>
                        }

                        {/* user status */}
                        {
                            auth && (auth.userType === "admin" || auth.userType === "seller") &&
                            <>
                                <ListItem>
                                    <ListItemText primary="Set active & inactive status:" /> 
                                </ListItem>
                                <ListItem>
                                {
                                    auth.status === "active" ?
                                    <Button variant="contained" sx={{fontWeight: "700"}} onClick={() => setStatus('inactive')} size="small" color="inherit">set inactive</Button> :
                                    <Button variant="contained" sx={{fontWeight: "700"}} onClick={() => setStatus('active')} size="small" color="inherit">set active</Button>
                                }
                                {
                                    auth.status === "active" ?
                                    <span style={{color: "#666", margin: "0px 5px"}}>you are currently active</span> :
                                    <span style={{color: "#666", margin: "0px 5px"}}>you are currently inactive</span>
                                }
                                </ListItem>
                            </>
                        
                        }

                        {/* 
                        =============================
                        About us
                        */}
                        {
                            configs &&
                            configs.length > 0 &&
                            configs.map((config, index) => {
                                if(config.name === "about") {
                                    return (
                                        <React.Fragment key={index}>
                                            <ListHeader>
                                                About us
                                            </ListHeader>
                                            <ListItem>
                                                <p>
                                                {config.obj}
                                                </p>
                                            </ListItem>
                                        </React.Fragment>
                                    )
                                }
                                return "";
                            })
                        }
                        

                        
                         {/* 
                        =============================
                        Terms and conditions
                        */}

                        {
                            configs &&
                            configs.length > 0 &&
                            configs.map((config, index) => {
                                if(config.name === "term") {
                                    return (
                                        <React.Fragment key={index}>
                                            <ListHeader>
                                                Terms & conditions
                                            </ListHeader>
                                            <ListItem>
                                                <p>
                                                {config.obj}
                                                </p>
                                            </ListItem>
                                        </React.Fragment>
                                    )
                                }
                                return "";
                            })
                        }
                          {/*
                        ===============================================
                        help center 
                        ==============================================
                        */}
                        {
                            configs &&
                            configs.length > 0 &&
                            configs.map((config, index) => {
                                if(config.name === "help") {
                                    return (
                                        <React.Fragment key={index}>
                                            <ListHeader>
                                                Help Center
                                            </ListHeader>
                                            <ListItem>
                                                <p>
                                                {config.obj}
                                                </p>
                                            </ListItem>
                                        </React.Fragment>
                                    )
                                }
                                return "";
                            })
                        }
                          {/* 
                        =============================
                        follow us on facebook
                        */}
                       
                        <ListHeader>
                           Follow us on social media:
                        </ListHeader>
                        <ListItem sx={{justifyContent: "start", flexWrap: "wrap"}}>

                        {
                            configs &&
                            configs.length > 0 &&
                            configs.map((config, index) => {
                                if(
                                    config.name !== "welcome" &&
                                    config.name !== 'about' && 
                                    config.name !== 'term' &&
                                    config.name !== 'help' &&
                                    config.name !== 'images' 
                                ) {
                                   if(config.name.toLowerCase() === "facebook") {
                                    return (
                                    <Button key={index} component={"a"} href={config.obj} target="_blank"  sx={{fontSize: "18px",  textTransform: "capitalize"}} ><FacebookIcon />Facebook</Button>
                                    )
                                   } else if (config.name.toLowerCase() === "instagram") {
                                    return (
                                        <Button key={index} component={"a"} href={config.obj} target="_blank"  sx={{color: "#e32445", fontSize: "18px",  textTransform: "capitalize"}}><InstagramIcon />Instagram</Button>
                                    )
                                   } else if (config.name.toLowerCase() === "youtube") { 
                                    return (
                                        <Button key={index} component={"a"} href={config.obj} target="_blank"  sx={{color: "red", fontSize: "18px", textTransform: "capitalize"}}><YouTubeIcon  />YouTube</Button>
                                    )
                                   } else if (config.name.toLowerCase() === "linkedin") {
                                    return (
                                        <Button key={index} component={"a"} href={config.obj} target="_blank"  sx={{color: "#24bfd9", fontSize: "18px", textTransform: "capitalize"}}><LinkedInIcon  />LinkedIn</Button>
                                    )
                                   } else {
                                    return (
                                        <Button key={index} component={"a"} href={config.obj} target="_blank"  sx={{color: "#40a6ff", fontSize: "18px", textTransform: "capitalize"}}><LinkIcon  />{config.name}</Button>
                                    )
                                   }
                                }
                                return "";
                            })
                        }
                           
                            
                        </ListItem>
                        {/*
                        Logout button
                        */}
                        <Divider />
                        <ListItem>
                            <Button variant="contained" color="inherit" onClick={logoutHandler}>Logout</Button>
                        </ListItem>

                    </List>
                        
                </Grid>
            </Grid>
            {/* placeholder */}
            <div style={{height: "200px"}}></div>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    messages: selectAllMesssages,
    auth: selectAuthToken,
    configs: selectAllConfig
});

const mapDispatchToProps = dispatch => ({
    messageFetchStartAsync: (id) => dispatch(messageFetchStartAsync(id)),
    setToken: (payload) => dispatch(setToken(payload)),
    setMessages: (payload) => dispatch(messageFetchSuccess(payload)),
    fetchConfigStartAsync: () => dispatch(fetchConfigStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

