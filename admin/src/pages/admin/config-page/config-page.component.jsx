/**
 * manage user page
 */

import { Button, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';

// components imports
import Notification from "../../../components/notifiation/notification";

// redux state import
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from "../../../redux/auth/auth.selector";
import { fetchConfigStartAsync } from "../../../redux/config/config.action";
import { selectAllConfig } from "../../../redux/config/config.select";


// import controllers
import { addConfig, uploadImage, deleteSocialLink, deleteBannerImage} from "../../../controllers/configController";


// styles import
import * as styles from "./config-page.styles";
  
  
const ConfigPage  = ({auth, configs, fetchConfigStartAsync}) => {

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

    React.useEffect(() => {
        fetchConfigStartAsync();
    }, []);
   
    /**.......................................................................
     * add welcome handler
     * .......................................................................
     */
    const addWelcome = async (e) => {
        e.preventDefault();
        let reqObject = null;
        if(e.target.text.value !== "") {
            reqObject = {
                name: "welcome",
                obj: e.target.text.value,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await addConfig(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! posted welcome text',
                        severity: 'success'
                    });
                    e.target.text.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error posting welcome text!',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, posting welcome text',
                severity: 'error'
            });
        }
    }
    /**.......................................................................
     * add about
     * .......................................................................
     */
    const addAbout = async (e) => {
        e.preventDefault();
        let reqObject = null;
        if(e.target.about.value !== "") {
            reqObject = {
                name: "about",
                obj: e.target.about.value,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await addConfig(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! added about us text',
                        severity: 'success'
                    });
                    e.target.about.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error adding about us',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, Error adding about us',
                severity: 'error'
            });
        }
    }
    /**.......................................................................
     * add terms
     * .......................................................................
     */
    const addTerm = async (e) => {
        e.preventDefault();
        let reqObject = null;
        if(e.target.term.value !== "") {
            reqObject = {
                name: "term",
                obj: e.target.term.value,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await addConfig(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! added term and conditions text',
                        severity: 'success'
                    });
                    e.target.term.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error adding terms and conditions',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, Error adding term and conditions',
                severity: 'error'
            });
        }
    }
    /**.......................................................................
     * add help
     * .......................................................................
     */
    const addHelp = async (e) => {
        e.preventDefault();
        let reqObject = null;
        if(e.target.help.value !== "") {
            reqObject = {
                name: "help",
                obj: e.target.help.value,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await addConfig(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! added help text',
                        severity: 'success'
                    });
                    e.target.help.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error adding help ',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, Error adding help ',
                severity: 'error'
            });
        }
    }
    /**.......................................................................
     * add socail link
     * .......................................................................
     */
    const addSocial = async (e) => {
        e.preventDefault();
        let reqObject = null;
        if(e.target.link.value !== "" && e.target.name.value !== "") {
            reqObject = {
                name: e.target.name.value,
                obj: e.target.link.value,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await addConfig(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! social link has been added',
                        severity: 'success'
                    });
                    e.target.link.value = "";
                    e.target.name.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error adding social link ',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, adding social link ',
                severity: 'error'
            });
        }
    }

    /**.......................................................................
     * delete social link
     * .......................................................................
     */
    const deleteLink = async (name) => {
        let reqObject = null;
        if(name) {
            reqObject = {
                name: name,
                token: auth.token
            }
        }
        
        try {
            if(reqObject) {
                const res = await deleteSocialLink(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! deleted socail links',
                        severity: 'success'
                    });
                   
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error deleting social link ',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, deleting social link ',
                severity: 'error'
            });
        }
    }

    /**.......................................................................
     * add images
     * .......................................................................
     */
    const addImage = async (e) => {
        e.preventDefault();
        const reqObject = new FormData();
        
        reqObject.append("name", "images");
        reqObject.append("token", auth.token);
        if(e.target.file.files.length > 0) {
            reqObject.append("file", e.target.file.files[0]);
        }
        try {
            if(e.target.file.files.length > 0) {
                const res = await uploadImage(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! image uploaded',
                        severity: 'success'
                    });
                    e.target.file.value = "";
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error uploading image ',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, Please input text first',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, uploading image ',
                severity: 'error'
            });
        }
    }

     /**.......................................................................
     * delete image
     * .......................................................................
     */
      const deleteImage = async (img) => {
      
        let reqObject = null;
        
        if(img) {
            reqObject = {
                name: "images",
                obj: img,
                token: auth.token
            }
        }
        
        try {
            
            if(reqObject) {
                const res = await deleteBannerImage(reqObject);
                console.log(res);
                if(res.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'successfully! image deleted ',
                        severity: 'success'
                    });
                    
                    fetchConfigStartAsync();
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: 'Error deleting image ',
                        severity: 'error'
                    });
                }
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error!, deleting image ',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error!, deleting image ',
                severity: 'error'
            });
        }
    }




    return (
        <styles.ConfigContainer>
            {/* add config header */}
            <styles.ConfigHeader>
                Configurations
            </styles.ConfigHeader>
            {/* config body */}
            <styles.ConfigBody>
                <Grid container spacing={1}>

                    {/*
                    .................................................................
                    add welcome text 
                    .................................................................
                    */}
                    <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                                Welcome Text
                            </styles.ConfigName>
                        </Grid>
                        <Grid item xs={10}>
                            {/* display */}
                            <styles.ConfigDisplay>
                               
                                   {
                                    configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name === "welcome") {
                                            return (
                                                <Typography key={config.name}>{config.obj}</Typography>
                                            )
                                        }
                                        return "";
                                    })
                                   }
                               
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm onSubmit={addWelcome}>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        minRows={4}
                                        maxRows={20}
                                        name="text"
                                    />
                                    <FormHelperText>Add welcome text</FormHelperText>
                                </FormControl>
                                <Button sx={{marginLeft: "auto", marginRight: "0",display: "block" }} type='submit' variant='contained' color="info">Add</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add welcome text end */}

                     {/* 
                     ..............................................................
                     add abbout us 
                     ..............................................................
                     */}
                     <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                                About us
                            </styles.ConfigName>
                        </Grid>
                        <Grid item xs={10}>
                            {/* display */}
                            <styles.ConfigDisplay>
                                {
                                    configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name === "about") {
                                            return (
                                                <Typography key={config.name}>{config.obj}</Typography>
                                            )
                                        }
                                        return "";
                                    })
                                   }
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm onSubmit={addAbout}>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        minRows={4}
                                        maxRows={20}
                                        name="about"
                                    />
                                    <FormHelperText>Add about us</FormHelperText>
                                </FormControl>
                                <Button sx={{marginLeft: "auto", marginRight: "0",display: "block" }} type='submit' variant='contained' color="info">Add</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add about us end */}

                      {/* 
                     ..............................................................
                        terms and conditions
                     ..............................................................
                     */}
                     <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                            Terms and Conditions
                            </styles.ConfigName>
                        </Grid>
                        <Grid item xs={10}>
                            {/* display */}
                            <styles.ConfigDisplay>
                                {
                                    configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name === "term") {
                                            return (
                                                <Typography key={config.name}>{config.obj}</Typography>
                                            )
                                        }
                                        return "";
                                    })
                                   }
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm onSubmit={addTerm}>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        minRows={4}
                                        maxRows={20}
                                        name="term"
                                    />
                                    <FormHelperText>Add terms and conditions</FormHelperText>
                                </FormControl>
                                <Button sx={{marginLeft: "auto", marginRight: "0",display: "block" }} type='submit' variant='contained' color="info">Add</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add about us end */}

                      {/* 
                     ..............................................................
                        terms and conditions
                     ..............................................................
                     */}
                     <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                                Add help guide
                            </styles.ConfigName>
                        </Grid>
                        <Grid item xs={10}>
                            {/* display */}
                            <styles.ConfigDisplay>
                            {
                                configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name === "help") {
                                            return (
                                                <Typography key={config.name}>{config.obj}</Typography>
                                            )
                                        }
                                        return "";
                                })
                            }
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm onSubmit={addHelp}>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        minRows={4}
                                        maxRows={20}
                                        name="help"
                                    />
                                    <FormHelperText>Add help guide</FormHelperText>
                                </FormControl>
                                <Button sx={{marginLeft: "auto", marginRight: "0",display: "block" }} type='submit' variant='contained' color="info">Add</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add about us end */}

                      {/* 
                     ..............................................................
                        add social links
                     ..............................................................
                     */}
                     <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                                Add social links
                            </styles.ConfigName>
                        </Grid>
                        <Grid item xs={10}>
                            <styles.ConfigDisplay>
                                {
                                    configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name !== "welcome" && config.name !== "images" && config.name !== "term" && config.name !== "about" && config.name !== "help") {
                                            return (
                                            <styles.ConfigAddForm 
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                                onSubmit={addSocial}
                                                key={config.name}
                                            >
                                                <FormControl>
                                                    <TextField
                                                        size='small'
                                                        name="name"
                                                        label="media name"
                                                        value={config.name}
                                                        disabled={true}
                                                    />
                                                   
                                                </FormControl>
                                                <FormControl>
                                                    <TextField
                                                        size='small'
                                                        name="link"
                                                        label={config.obj}
                    
                                                    />
                                                </FormControl>
                                                <Button size='small' sx={{ padding: "8px 10px",margin: "0px 5px" }} type='submit' variant='contained' color="warning">edit</Button>
                                                <Button size='small' sx={{ padding: "8px 10px", margin: "0px 5px" }} variant='contained' onClick={() => deleteLink(config.name)} color="error">delete</Button>
                                            </styles.ConfigAddForm>
                                            )
                                        }
                                        return "";
                                    })
                                }
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm 
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                                onSubmit={addSocial}
                            >
                                <FormControl>
                                    <TextField
                                        size='small'
                                        name="name"
                                        label="media name"
                                    />
                                    
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        size='small'
                                        name="link"
                                        label="Link"
                                    />
                                   
                                </FormControl>
                                <Button size='small' sx={{ padding: "8px 10px", margin: "0px 5px",}} type='submit' variant='contained' color="info">Add</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add about us end */}

                      {/* 
                     ..............................................................
                        terms and conditions
                     ..............................................................
                     */}
                     <styles.SingleConfig container item xs={12}>
                        <Grid item xs={2}>
                            <styles.ConfigName>
                                Uploads banner image
                            </styles.ConfigName>
                        </Grid>
                        <Grid item  xs={10}>
                            {/* display */}
                            <styles.ConfigDisplay>
                            {
                                configs && configs.length > 0 &&
                                    configs.map(config => {
                                        if(config.name === "images") {
                                            return (
                                                // <Grid item key={config.name}>{config.obj}</Grid>
                                              <styles.ImageBox key={config.name}>
                                                {
                                                    JSON.parse(config.obj).map((image, index) => (
                                                        <div key={index}>
                                                            <img src={image} alt="" />
                                                            <button onClick={() => deleteImage(image)}>delete</button>
                                                        </div>
                                                    ))
                                                }
                                              </styles.ImageBox>
                                            )
                                        }
                                        return "";
                                })
                            }
                            </styles.ConfigDisplay>
                            {/* input form */}
                            <styles.ConfigAddForm onSubmit={addImage}>
                                <FormControl fullWidth>
                                    <TextField
                                        type="file"
                                        name="file"
                                    />
                                    <FormHelperText>You can only upload jpg, png, jpeg image </FormHelperText>
                                </FormControl>
                                <Button sx={{marginLeft: "auto", marginRight: "0",display: "block" }} type='submit' variant='contained' color="info">Upload</Button>
                            </styles.ConfigAddForm>
                        </Grid>
                    </styles.SingleConfig>
                    {/* add about us end */}

                </Grid>
            </styles.ConfigBody>
            {/**
             * ===================================================================
            notification pusher
            ===================================================================
            */}
            <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
        </styles.ConfigContainer>
    )


        
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    configs: selectAllConfig
})

const mapDispatchToProps = dispatch => ({
    fetchConfigStartAsync: () => dispatch(fetchConfigStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)