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
     FormHelperText,
     Divider,
     Button,
     InputAdornment,
     Input,
     Typography,
 } from "@mui/material";
 import AddIcon from '@mui/icons-material/Add';

 
 // imports components
 import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";
 import Notification from "../../../components/notifiation/notification";

 // imports states
 import {connect} from "react-redux";
 import { createStructuredSelector } from "reselect";
 import { selectAuthToken } from "../../../redux/auth/auth.selector";
 
 // external imports
 import { useNavigate } from "react-router-dom";
 
 // styled component imports
 import {
   AddGameContainer,
   AddGameForm,
   AddGameWrapper,
   FormActionBox,
   FormHeader,
   FormHeaderText,
   FormWrapper,
   DescriptionTextBox
 } from "./add-game-page.style"
 
 // controller imports
import { adminAddGame } from "../../../controllers/gameController";


 
 const AddGamePage = ({auth}) => {
     /**
      * =================================================
      * set page title
      * =================================================
      */
     document.title = "Add New Game";
     const navigate = useNavigate();
 
     /**
      * ====================================================
      * user input state
      * ====================================================
      */
     const [state, setState] = React.useState({
         name: '',
         gener: '',
         description: "",
         videoLink: "",
         descriptionMap: []
     });

     // addDescriptionMap handler
     const addDescriptionMap = (e) => {
        setState({
            ...state,
            descriptionMap: [...state.descriptionMap, state.description],
            description: ""
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

    /**
     * ==============================================
     * handle delete exsisting description
     * ==============================================
     */
    const handleDeleteDescription = (e) => {
        console.log("this description will delete ", e.target.id);
        const ob = state.descriptionMap;
        ob.splice(Number(e.target.id), 1);
        setState({
            ...state,
            descriptionMap:[ ...ob]
        });
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
      * =============================================
      * signup error state
      * =============================================
      */
    const [addproductErrors, setAddproductErrors] = React.useState({});
 
    /**
     * ==================================================================
     * set user input into state
     * @param {event of input} e 
     * ==================================================================
     */
     const handleChange = (e) => {
        setAddproductErrors({});
        setState({
            ...state,
           [e.target.id]: e.target.value
        });
     }
 
      /** 
      * ==============================================
      * add new user function
      * ==============================================
      */
     const addGameHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        formData.append("name", e.target.name.value);
        formData.append("gener", e.target.gener.value);
        formData.append("description", JSON.stringify(state.descriptionMap));
        formData.append("videoLink", e.target.videoLink.value);
        formData.append("file", e.target.file.files[0]);
        formData.append("token", auth.token);

        try {
            const result = await adminAddGame(formData);
            if(result.status === 200) {
                console.log(result);
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Game created siccessfully!',
                    severity: 'success'
                });
                setState({
                    name: '',
                    gener: '',
                    description: "",
                    videoLink: "",
                    descriptionMap: []
                });
                setImage(null);
                e.target.file.value = "";
            } else {
                console.log(result);

                setAddproductErrors({...result});
                setNotify({
                    ...notify,
                    open: true,
                    message: 'error creating game!',
                    severity: 'error'
                });
            }
        } catch(err) {
            console.log(err);

            setNotify({
                ...notify,
                open: true,
                message: 'error creating game!',
                severity: 'error'
            });
           
        }
           
                
         
     }
     
     /**
      * ======================================================
      * previous link
      * 
      */
     const previousLink = [["Dashboard", "/admin/"]];

 
     /** 
      * ==============================================
      * Render user interface
      * ==============================================
      */
     return (
         <AddGameWrapper>
                <PageBreadcrumbs prevLinks={previousLink} currentPage={'Add Game'} />

             <AddGameContainer container>
                 {/* offset grid */}
                 <Grid item xs={0} sm={1} md={2} lg={2} xl={2} />
 
                 {/*
                 ==============================================
                     From body grid
                 ===============================================
                 */}
                 <Grid item xs={12} sm={10} md={8} lg={8} xl={8} >
                     <FormWrapper>
                        
                         <AddGameForm onSubmit={addGameHandler}>
                             
                             <FormHeader>
                                 <FormHeaderText>
                                     Add New Game
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
                                         name="name"
                                         required
                                         />
                                         <FormHelperText id="name-help" error={
                                             addproductErrors ? addproductErrors.name ?
                                               true : false : false
                                               } >
                                             {
                                                 addproductErrors ? addproductErrors.name ? addproductErrors.name.msg : "Enter Name of user" : "Enter Name of user" 
                                             }
                                         </FormHelperText>
                                     </FormControl>
                                 </Grid>
                                 {/*
                                 ==============================================================
                                                     Gener field 
                                 ==============================================================
                                 */}
                                 <Grid item xs={12}>
                                     <FormControl fullWidth >
                                     
                                         <TextField 
                                             id="gener"
                                             aria-describedby="gener-help"
                                             label="Gener"
                                             type="text"
                                             value={state.gener}
                                             onChange={handleChange}
                                             required
                                             name="gener"
                                             />
                                             <FormHelperText id="gener-help"
                                                 error={
                                                     addproductErrors ? addproductErrors.gener ?
                                                       true : false : false
                                                 }
                                             >{
                                                 addproductErrors ? 
                                                 addproductErrors.gener ?
                                                 addproductErrors.gener.msg : "Enter game gener" : "Enter game gener"
                                             }</FormHelperText>
                                     </FormControl>
                                 </Grid>
                                 {/* 
                                 =====================================================
                                  description list if will show after adding description
                                 =======================================================
                                 */}
                                 
                                        {
                                            state.descriptionMap.length > 0 ?
                                            <Grid item xs={12}>
                                                <DescriptionTextBox>
                                                        {
                                                         state.descriptionMap.map((text, index) => (
                                                                <Typography key={index} component="div"
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "start",
                                                                        justifyContent: "start",
                                                                        color: "#777",
                                                                        padding: "4px 0px",
                                                                        flex: "wrap"
                                                                    }}
                                                                >
                                                                    {/* <RadioButtonCheckedIcon sx={{ marginRight: "8px" }} /> */}
                                                                    {text}
                                                                    <button type="button" id={index} style={{
                                                                        marginLeft: "20px",
                                                                        padding: "5px 8px",
                                                                        backgroundColor: "red",
                                                                        border: "0",
                                                                        color: "#fff",
                                                                        fontWeight: "700",
                                                                        textTransform: "uppercase",
                                                                        cursor: "pointer"
                                                                    }}
                                                                    onClick={handleDeleteDescription}
                                                                    >
                                                                       &chi;
                                                                    </button>
                                                                </Typography>
                                                            ))
                                                        }
                                                </DescriptionTextBox>
                                            </Grid>
                                            : ""
                                        }
                                   
                                  {/* 
                                  ==============================================================
                                                        Description  
                                  ==============================================================
                                  */}
                                  <Grid item xs={12}>
                                     <FormControl fullWidth >
                                     
                                         <TextField 
                                             id="description"
                                             aria-describedby="description-help"
                                             label="Description"
                                             value={state.description}
                                             onChange={handleChange}
                                             InputProps={{
                                                endAdornment: 
                                                <InputAdornment position="end">
                                                        <Button
                                                        size="large"
                                                        onClick={addDescriptionMap}
                                                        >
                                                            <AddIcon /> Add
                                                        </Button>
                                                </InputAdornment>
                                             }}
                                             multiline
                                             rows={2}
                                             />
                                             <FormHelperText id="description-help"
                                                 error={
                                                     addproductErrors ? addproductErrors.description ?
                                                           true : false : false
                                                 }
                                             > 
                                             {
                                                 addproductErrors ? 
                                                 addproductErrors.description ?
                                                 addproductErrors.description.msg : 
                                                 "Enter Description and click add button to add description" :
                                                 "Enter Description and click add button to add description"
                                             }
                                              </FormHelperText>
                                     </FormControl>
                                 </Grid>
                                 {/* 
                                 =======================================================
                                             video link
                                 =======================================================
                                 */}
                                     <Grid item xs={12}>
                                         <FormControl fullWidth>
                                       
                                         <TextField
                                             id="videoLink"
                                             onChange={handleChange}
                                             label="YouTube video link for game"
                                             aria-describedby="videolink-help"
                                             value={state.videoLink}
                                             name="videoLink"
                                         />
                                            <FormHelperText id="videolink-help"
                                                 error={
                                                     addproductErrors ? addproductErrors.videoLink ?
                                                           true : false : false
                                                 }
                                             > 
                                             {
                                                 addproductErrors ? 
                                                 addproductErrors.videoLink ?
                                                 addproductErrors.videoLink.msg : 
                                                 "Enter a video link to help user about this game" :
                                                 "Enter a video link to help user about this game"
                                             }
                                              </FormHelperText>
                                            
                                             
                                         </FormControl>
                                     </Grid>
                                     {/* 
                                     ================================================
                                                  file inputs
                                     ================================================
                                     */}
                                     <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <FormControl fullWidth >
                                        
                                            <Input 
                                                type="file"
                                                aria-describedby="file-help"
                                                onChange={onImageChange}
                                                name="file"
                                                id="ui"
                                            />
                                            <FormHelperText id="file-help">
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                            { 
                                            image ?
                                            <img src={image} style={{
                                                width: "60%",
                                                height: "auto"
                                            }} alt="" /> : ""
                                            }
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
                                             color="secondary"
                                             >Add Game</Button>
 
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
                         </AddGameForm>
                     </FormWrapper>
                 </Grid>
                 {/**
                  * ===================================================================
                    notification pusher
                    ===================================================================
                 */}
                 <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
             </AddGameContainer>
         </AddGameWrapper>
     )
 }
 

 const mapStateTopProps = createStructuredSelector({
    auth: selectAuthToken
 })

 export default  connect(mapStateTopProps)(AddGamePage);
 


