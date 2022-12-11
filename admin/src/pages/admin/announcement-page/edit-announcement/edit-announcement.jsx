/**
 * manage user page
 */

import * as React from 'react';

import * as Styles from "../announcement-page.style";
import { Box, FormControl,TextField, FormHelperText, Grid, InputAdornment,  OutlinedInput, Button, List, ListItem,  Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// component import
import Notification from "../../../../components/notifiation/notification";
import PageBreadcrumbs from "../../../../components/page-breadcrumbs/page-breadcrumbs";

// import hook
import { useParams } from 'react-router-dom';

// redux state import
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from "../../../../redux/auth/auth.selector";
import { fetchAnnouncementStartAsync } from "../../../../redux/announcement/announcement.action";
import { selectAllAnnouncement, selectAnnouncementIsfetching } from "../../../../redux/announcement/announcement.select";

// import utils
import { updateAnnouncement } from "../../../../controllers/annuncement";
import findById from '../../../../utils/findById';

  
  
const EditAnnouncementPage  = ({auth, announcement, announcementIsFetching, fetchAnnouncementStartAsync}) => {

    const param = useParams();

    // let requestedAnnouncement = null;
    let requestedAnnouncement = null;

    React.useEffect(() => {
        fetchAnnouncementStartAsync();
      

    }, []);
    
    if(!announcementIsFetching && announcement !== null) {
        for(let i = 0; i < announcement.length; i++) {
            if(announcement[i]._id === param.id) {
                requestedAnnouncement = announcement[i];
                break;
            }
        }
    }

   
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
    * ==========================================================
    * announcement state
    * ==========================================================
    */
    const [state, setState] = React.useState({
        title: requestedAnnouncement ? requestedAnnouncement.title : "",
        text: requestedAnnouncement ? requestedAnnouncement.text : "",
        note: '',
        link: '',
        noteList: requestedAnnouncement && Object.keys(requestedAnnouncement.list).length > 0 && requestedAnnouncement.list.note ? requestedAnnouncement.list.note : [],
        linkList: requestedAnnouncement && Object.keys(requestedAnnouncement.list).length > 0 && requestedAnnouncement.list.link ? requestedAnnouncement.list.link : []
    });

    console.log(state);
    // set title and text
    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    // set not handler
    const setNoteHandler = (n) => {
       setState({
            ...state,
            note: '',
            noteList: [...state.noteList, n]
       })
    }
    // set link handler
    const setLinkHandler = (l) => {
        setState({
            ...state,
            link: "",
            linkList: [...state.linkList, l]
       })
    }
    // clear note list
    const clearNoteList = () => {
        setState({
            ...state,
            noteList: []
        })
    }

    // clear link handler
    const clearLinkList = () => {
        setState({
            ...state,
            linkList: []
        })
    }

    /**
      * =================================================================
      * selected image reader
      * =================================================================
     */

    const [image, setImage] = React.useState("");

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    // submit handler
    const submitHandler = async (e) => {
       e.preventDefault();
       // construct form data
       const formData = new FormData();
       
       formData.append("id", requestedAnnouncement._id);
       formData.append("title", state.title);
       formData.append("text", state.text);
       if(state.noteList.length > 0) {
           formData.append("note", JSON.stringify(state.noteList));
       }

       if(state.linkList.length > 0) {
           formData.append("link", JSON.stringify(state.linkList));
       }
       
       if(e.target.file.files.length > 0) {
           formData.append("file", e.target.file.files[0]);
       }
       formData.append("token", auth.token); 
       
       try {
            const res = await updateAnnouncement(formData);

            if(res.status === 200) {
                console.log(res);
                setImage("");
                setState({
                    title: '',
                    text: '',
                    note: '',
                    link: '',
                    noteList: [],
                    linkList: []
                });
                e.target.file.value = "";
                setNotify({
                    ...notify,
                    open: true,
                    message: 'announcement created siccessfully!',
                    severity: 'success'
                });

            } else {
                console.log(res);

                setNotify({
                    ...notify,
                    open: true,
                    message: 'error creating announcement!',
                    severity: 'error'
                });
            }
       } catch(err) {
            console.log(err);

            setNotify({
                ...notify,
                open: true,
                message: 'error creating announcement!',
                severity: 'error'
            });
       }
       
    }


    const previousLink = [["Announcement", "/admin/announcement/"]];

    return requestedAnnouncement && !announcementIsFetching && (
        <Styles.AnnouncementConatiner>
             <PageBreadcrumbs prevLinks={previousLink} currentPage={'Edit announcement'} />
            {/* announcemnet form start */}
            <Styles.AnnouncementForm onSubmit={submitHandler}>
                {/* form header */}
                <Styles.FormHeader>
                   Edit Announcement
                </Styles.FormHeader>
                {/* form body */}
                {/* main grid */}
                <Grid container spacing={1}>
                    {/* placeholder */}
                    <Grid item md={2}></Grid>
                    {/* form body grid */}
                    <Styles.FormBody item md={8} container spacing={2}>

                        {/* announcement title */}
                        {/* single input field */}
                        <Styles.FormBodyField item  xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    label="Announcement Title"
                                    name="title"
                                    value= {state.title }
                                    required
                                    onChange={(e) => changeHandler(e)}
                                />
                                <FormHelperText>Enter announcement title</FormHelperText>

                            </FormControl>
                        
                        </Styles.FormBodyField>
                        {/* single form field end */}

                        {/* announcement text */}
                        <Styles.FormBodyField item  xs={12}>
                            <FormControl fullWidth>
                                <TextField 
                                 multiline
                                 label="Announcement Text"
                                 name="text"
                                 value={state.text}
                                 maxRows={20}
                                 minRows={8}
                                 onChange={(e) => changeHandler(e)}
                                 required
                                //  rows={10}
                                />
                                <FormHelperText>Enter a text content for announcement</FormHelperText>
                            </FormControl>

                        </Styles.FormBodyField>
                        {/* announcement text end */}                    

                        {/* add bullet point note section */}
                        <Styles.FormBodyField item xs={12}>
                             {/* display added buller points */}

                             {
                                state.noteList.length > 0 &&
                                <Box sx={{width: "100%"}}>
                                    <List>
                                        { state.noteList.map((note, index) => (
                                            <ListItem key={index} >
                                                <ArrowRightIcon /> <Typography>{note}</Typography>
                                            </ListItem>
                                        )) }
                                    </List>
                                </Box>
                                
                            }
                             
                            <FormControl fullWidth>
                                <OutlinedInput 
                                    name="note"
                                    value={state.note}
                                    onChange={(e) => changeHandler(e)}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <Button
                                                variant='contained'
                                                onClick={() => setNoteHandler(state.note)}
                                                edge="end"
                                                color='secondary'
                                            >
                                                <AddIcon />
                                            </Button>
                                            <Button
                                                 variant='contained'
                                                 onClick={() => clearNoteList()}
                                                 edge="end"
                                                 color='warning'
                                                 sx={{marginLeft: "8px"}}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText color="info">Enter bullet point note for announcement (optional)</FormHelperText>
                            </FormControl>
                        </Styles.FormBodyField>
                        {/* add bullet point note section */}

                        {/* add link section */}
                        <Styles.FormBodyField item xs={12}>
                            {/* display added link */}
                            {
                                state.linkList.length > 0 &&
                                <Box sx={{width: "100%"}}>
                                    <List>
                                        {  state.linkList.map((link, index) => (
                                            <ListItem key={index}>
                                                <Typography sx={{color: "#50c6ff", fontWeight: "700"}}>#{link}</Typography>
                                            </ListItem>
                                        )) }
                                    </List>
                                </Box>
                                
                            }
                          
                            <FormControl fullWidth>
                                <OutlinedInput 
                                    name="link"
                                    value={state.link}
                                    onChange={(e) => changeHandler(e)}
                                    endAdornment={
                                        <InputAdornment position="end" >
                                            <Button
                                                variant='contained'
                                                onClick={() => setLinkHandler(state.link)}
                                                edge="end"
                                                color='error'
                                            >
                                                <AddIcon />
                                            </Button>
                                            <Button
                                                 variant='contained'
                                                 onClick={() => clearLinkList()}
                                                 edge="end"
                                                 color='warning'
                                                 sx={{marginLeft: "8px"}}
                                            >
                                                <DeleteForeverIcon />
                                            </Button>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText color="info">Enter a link for announcement (optional)</FormHelperText>
                            </FormControl>
                        </Styles.FormBodyField>
                        {/* add link section end */}

                        {/* add image section */}
                        <Styles.FormBodyField item xs={12}>
                            {/* display the selected image */}
                            {
                                image ? 
                                <Box sx={{width: "100%", "& img": {width: "100%", height: "auto", borderRadius: "15px", marginBottom: "10px"}}}>
                                    <img alt="" src={image} />
                                </Box> :
                                requestedAnnouncement && requestedAnnouncement.image &&
                                <Box sx={{width: "100%", "& img": {width: "100%", height: "auto", borderRadius: "15px", marginBottom: "10px"}}}>
                                    <img alt="" src={requestedAnnouncement.image} />
                                </Box>
                            }
                            
                            {/* display the selected image end */}
                            <FormControl fullWidth>
                                <TextField
                                    type="file"
                                    name="file"
                                    size='small'
                                    onChange={onImageChange}
                                />
                                <FormHelperText color="info">Provide image for announcement (optional)</FormHelperText>
                            </FormControl>
                        </Styles.FormBodyField>
                        {/* add image section end */}
                        <Styles.FormBodyField item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button type="submit" variant='contained' color="info" size="large">Update</Button>
                        </Styles.FormBodyField>
                    {/* form body end */}
                    </Styles.FormBody>

                    {/* placeholder */}
                    <Grid item md={2}></Grid>
                </Grid>

            </Styles.AnnouncementForm>
            {/* announcement form end */}
             {/**
                  * ===================================================================
                    notification pusher
                 =======================================================================
                 */}
                 <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
        </Styles.AnnouncementConatiner>
    );
          
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    announcement: selectAllAnnouncement,
    announcementIsFetching: selectAnnouncementIsfetching
});

const mapDispatchToProps = dispatch => ({
    fetchAnnouncementStartAsync: () => dispatch(fetchAnnouncementStartAsync())
});
  
 export default connect(mapStateToProps, mapDispatchToProps)(EditAnnouncementPage);