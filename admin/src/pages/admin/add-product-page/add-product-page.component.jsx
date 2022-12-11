/**
 * add product page
 * Every component has a 3 state fetch error success
 */
// external imports
import * as React from "react";
import { useNavigate } from "react-router-dom";

// imports redux state
import { connect } from "react-redux";
import { selectGamesCollections } from "../../../redux/games/games.select";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../../redux/auth/auth.selector";
import { fetchGamesStartAsync } from "../../../redux/games/games.action";

// import components
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";
import Notification from "../../../components/notifiation/notification";

// imports styles
import { AddproductWrapper,AddProductFormWrapper } from "./add-product-page.style";
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

// imports utils
import selectGameGener from "../../../utils/selectGener";
import { adminCreateProduct } from "../../../controllers/productController";



const AddProductPage = ({games, auth, fetchGamesStartAsync}) => {

    // navigate onject
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchGamesStartAsync();
    }, []);

    /**
     * ==============================================
     * construct game gener object
     * ==============================================
     */
    const geners = selectGameGener(games);


    /**
     * ==========================================
     * error state
     * ==========================================
     * */
         const [errors, setErrors] = React.useState({
            title: undefined,
            price: undefined,
            category: undefined,
            gener: undefined
        });

    /**
     * ======================================
     * add product input state
     * ======================================
     */
    const [state, setState] = React.useState({
        title: '',
        price: '',
        category: '',
        gener: ''
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        setErrors({
            title: undefined,
            price: undefined,
            category: undefined,
            gener: undefined
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
        * =============================================================
        * create product handler
        * =============================================================
        */

       const handleCreateProduct = async (e) => {
            // construct request object
            const requestObject = {
                title: state.title,
                gener: state.gener,
                category: state.category,
                price: state.price,
                token: auth.token
            }
            try {
                const result = await adminCreateProduct(requestObject);
                if(result.status === 200) {
                    setNotify({
                        ...notify,
                        open: true,
                        message: "Product created successfully!",
                        severity: 'success'
                    });
                    setErrors({
                        title: undefined,
                        price: undefined,
                        category: undefined,
                        gener: undefined
                    });
                    setState({
                        title: '',
                        price: '',
                        category: '',
                        gener: ''
                    })
                    
                } else {
                    setNotify({
                        ...notify,
                        open: true,
                        message: "Error creating product!",
                        severity: 'error'
                    });
                    setErrors({
                        ...errors,
                        title: result.title ? result.title.msg : undefined,
                        gener: result.gener ? result.gener.msg : undefined,
                        category: result.category ? result.category.msg : undefined,
                        price: result.price ? result.price.msg : undefined 
                    })
                    console.log(result);
                }

            } catch(err) {
                setNotify({
                    ...notify,
                    open: true,
                    message: "Error creating product!",
                    severity: 'error'
                });
            }
       }



    // previous page link list
    const previousLink = [['Dashboard', '/admin/']];

    return (
        <AddproductWrapper>
            {/* page Breadcrumbs */}
            <PageBreadcrumbs prevLinks={previousLink} currentPage="Add product" />
            
           {/* 
           * add product form
           */}
           <AddProductFormWrapper>
                <Grid container spacing={4} >
                    {/* offset */}
                    <Grid item xs={0} sm={12} md={2} lg={2} xl={3}></Grid>
                    {/* form grid */}
                    <Grid item container spacing={3} xs={12} sm={12} md={8} lg={8} xl={6}>
                        {/* add product title header */}
                        <Grid item xs={12} >
                            <Typography variant="h4" component={"div"}
                            sx={{ marginBottom: "20px" }}
                            >
                                Add new product
                            </Typography>
                        </Grid>
                        {/* product title */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="title"
                                    value={state.title}
                                    label="Title"
                                    onChange={handleChange}
                                />
                                <FormHelperText error={errors.title !== undefined ? true : false } >
                                    {errors.title ? errors.price : "Enter Product Title"}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* product price */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="price"
                                    value={state.price}
                                    label="Price"
                                    onChange={handleChange}

                                />
                                <FormHelperText error={errors.price !== undefined ? true : false } >
                                    {errors.price ? errors.price : "Enter Product price"}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* product category */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name="category"
                                    value={state.category}
                                    label="Category"
                                    onChange={handleChange}

                                />
                                <FormHelperText error={errors.category !== undefined ? true : false } >
                                    {errors.category ? errors.category : "Enter Product Category"}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* product gener */}
                        <Grid item xs={12}>
                            <FormControl fullWidth >
                                <InputLabel id="product_gener">Product Gener</InputLabel>
                                <Select
                                    id="product_gener"
                                    name="gener"
                                    label="Product Gener"
                                    value={state.gener}
                                    onChange={handleChange}
                                >
                                    {
                                        geners.map(gener => (

                                            <MenuItem key={gener} value={gener} >{gener}</MenuItem>
                                        ))
                                    }
                            
                                </Select>
                                <FormHelperText error={errors.gener !== undefined ? true : false } >
                                    {errors.gener? errors.gener : "Select Product Gener "}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* action button */}
                        <Grid item xs={12}>
                            <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px"}} >

                                <Button 
                                sx={{ marginRight: "20px" }} 
                                variant="contained"
                                color="error"
                                onClick={() => navigate(-1)}
                                >Cencel</Button>
                                <Button 
                                variant="contained"
                                onClick={handleCreateProduct}
                                >Add</Button>
                            </Box>
                        </Grid>
                        {/* form grid end */}
                 </Grid>
                    {/* ------------ */}
                </Grid>
           </AddProductFormWrapper>
        
           {/**
            * ===================================================================
            *       notification pusher
            *======================================================================
            */}
 
            <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
        </AddproductWrapper>
    );
}


const mapStateToProps = createStructuredSelector({
    games: selectGamesCollections,
    auth: selectAuthToken
});

const mapDispatchTopProps = dispatch => ({
    fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync())
})


export default connect(mapStateToProps, mapDispatchTopProps)(AddProductPage);
