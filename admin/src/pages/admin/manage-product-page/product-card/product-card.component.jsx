import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, styled, TextField} from "@mui/material";

// imports components
import Notification from "../../../../components/notifiation/notification";

// import controllers
import { updateProductById, removeProductById} from "../../../../controllers/productController";

// redux state import
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { fetchCollectionStartAsync } from "../../../../redux/shop/shop.action";
import { selectAuthToken } from "../../../../redux/auth/auth.selector";
import { selectUsersList } from "../../../../redux/users/users.selector";
import { fetchUsersStartAsync } from "../../../../redux/users/users.action";
import { selectCollections } from "../../../../redux/shop/shop.selector";

import config from '../../../../config';
import { findSellerAdmin } from "../../../../utils/userUtils";
import findById from '../../../../utils/findById';



// action button
const ActionButton = styled(IconButton)({
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px 0px"
});


const ProductCard = ({
    product,
    fetchCollectionStartAsync, 
    gameGener, 
    auth,
    users,
    fetchUsersStartAsync,
    products
}) => {

    React.useEffect(() => {
        fetchUsersStartAsync();
    }, []);


    /**
     * find sellers and add seller to user
     */
    const [selectedSeller, setSelectedSeller] = React.useState("");  
    const sellers = findSellerAdmin(users);
    // select current product
    const currentProduct = findById(product._id, products);
    

    /**
     * ===============================
     * mode state
     * ==============================
     */
    const [mode, setMode] = React.useState(true);

    /**
     * =================================
     * error state
     * =================================
     */

    const [errors, setErrors] = React.useState({
        title: undefined,
        price: undefined,
        category: undefined,
        gener: undefined
    });
   

    /**
     * ===========================
     * updated state
     * ===========================
     */
    const [state, setState] = React.useState({
        title: product.title,
        price: product.price,
        category: product.category,
        gener: product.gener
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
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
     * =============================================== 
     *  remove game button
     * */ 
    const removeProductHandler = async (id) => {
        const token = auth.token;
        try {
            const result = await removeProductById(id,token);
            if(result.status === 200) {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Product deleted successfully',
                    severity: 'success'
                });
                fetchCollectionStartAsync();
            } else {
                    setNotify({
                    ...notify,
                    open: true,
                    message: 'Product delete error!',
                    severity: 'error'
                });
            }
           
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Product delete error!',
                severity: 'error'
            });
        }
    }
    
    /**
     * ================================
     * handle update product
     * ================================
     */
    const handleUpdateProduct = async (id) => {
       
        // generate request object
        const token = auth.token;
        const requestObject = {
            id: id,
            title: state.title,
            price: state.price,
            category: state.category,
            gener: state.gener,
            token: token
        }
        try {
        
            const result = await updateProductById(requestObject);
            if(result.status === 200) {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Product updated successfully',
                    severity: 'success'
                });
                fetchCollectionStartAsync();
              
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Product updated Error!',
                    severity: 'error'
                });
                
            }
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Product updated Error!',
                severity: 'error'
            });
        }
    }
    /**
     * .........................................................................
     * add remove user to product
     * .........................................................................    
     */
    // assigned user to product
    const assignedUser = async () => {
       
        try {
            const reqObject = {
                token: auth.token,
                productId: product._id,
                userId: selectedSeller
            }
            // send the request
            const res = await fetch(`${config.API_DOMAIN}/product/assign`, {
                method: "POST",
                body: JSON.stringify(reqObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            if(res.status === 200) {
              
                fetchUsersStartAsync();
                fetchCollectionStartAsync();
                setSelectedSeller("");
            } else {
               
            }
            
        } catch(err) {
           
        }

    }
    // remove user
    const removeAssignedUser = async (userId, productId) => {
      
        try {
            const reqObject = {
                token: auth.token,
                productId: productId,
                userId: userId
            }
            // send the request
            const res = await fetch(`${config.API_DOMAIN}/product/assign/remove`, {
                method: "DELETE",
                body: JSON.stringify(reqObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            if(res.status === 200) {
               
                fetchUsersStartAsync();
                fetchCollectionStartAsync();
                setSelectedSeller("");
            } else {
                
            }
            
        } catch(err) {
           
        }
    }


  return (
    <Card sx={{ display: 'flex', width: "100%", boxShadow:"0px 0px 3px 0px #3c3c3c"}}>
     
      <Box sx={{ display: 'flex', width: "100%",flex: "8", flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>

            {
                mode ?
                <>
                    {/* game title */}
                    <Typography component="div" variant="h5">
                         {product.title}
                    </Typography>
                    {/* game description */}
                    
                    <Typography variant="subtitle1" color="text.primary" component="div">
                         Price:  {product.price}
                    </Typography>

                    <Typography variant="subtitle1" color="text.primary" component="div">
                          Category:  {product.category}
                    </Typography>

                    <Typography variant="subtitle1" color="text.primary" component="div">
                           Gener: {product.gener}
                    </Typography>

                    {/* assigned product to user*/}
                    <Box 
                    sx={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ebebeb"
                    }}>
                        <Typography>Assigned users:</Typography> 
                        
                        {
                            sellers.length > 0 && currentProduct &&
                            sellers.map((seller, index) => {
                                if(currentProduct.assignedUsers.includes(seller._id)) {
                                    return (
                                        <Box key={index} sx={{
                                            border: "1px solid #888",
                                            display: "inline-block",
                                            padding: "8px",
                                            borderRadius: "10px",
                                            margin: "10px"
                                        }}>
                                            {seller.name}<button style={{margin: "5px"}} onClick={() => removeAssignedUser(seller._id, product._id)}>remove</button> 
                                        </Box>
                                    )
                                }
                                return "";
                            })
                        }
                      

                        <FormControl fullWidth size="small">
                            <InputLabel id="cat">Select game</InputLabel>
                            <Select
                                labelId="cat"
                                label="Select game"
                                size="small"
                                value={selectedSeller}
                                onChange={(e) => setSelectedSeller(e.target.value)}
                            >  
                             {
                                sellers.length > 0 && currentProduct &&
                                sellers.map((seller, index) => {
                                    if(!currentProduct.assignedUsers.includes(seller._id)) {
                                        return (
                                            <MenuItem key={index} value={seller._id}>{seller.name}</MenuItem>
                                        )
                                    }
                                    return "";
                                })
                            }
                            </Select>
                        </FormControl>
                    <Button variant='contained' 
                    sx={{display: "block",marginTop: "5px",marginLeft: "auto", marginRight: "0"}}
                    onClick={assignedUser}
                    >Assign user</Button>

                    </Box>
                </> :
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <FormControl fullWidth >
                                <TextField 
                                    value={state.title}
                                    name="title"
                                    onChange={handleChange}
                                />
                                <FormHelperText>Product Title</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl fullWidth >
                                <TextField 
                                    value={state.price}
                                    name="price"
                                    onChange={handleChange}
                                />
                                <FormHelperText>Product Price</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl fullWidth >
                                <TextField 
                                    value={state.category}
                                    name="category"
                                    onChange={handleChange}
                                />
                                <FormHelperText>Product Category</FormHelperText>

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl fullWidth >
                                <Select 
                                    value={state.gener}
                                    name="gener"
                                    onChange={handleChange}
                                >
                                    {
                                        gameGener.map(gener => (
                                            <MenuItem key={gener} selected={gener === state.gener ? true : false} value={gener}> {gener} </MenuItem>
                                        ))
                                    }
                                   
                                </Select>
                                <FormHelperText>Product Gener</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </>
            }



          {/* description end */}
        </CardContent>
      </Box>
      {/* action box */}
      <Box sx={{ display: 'flex', alignItems: 'center',flexDirection: "column", pl: 1, pb: 1,pr: 3,justifyContent: "center" }}>
        {
            mode ?
            <>
                <ActionButton color='info' variant='outlined' onClick={() => setMode(false)} >
                <BorderColorIcon />
                </ActionButton>
                <ActionButton color="error" variant='contained' onClick={() => removeProductHandler(product._id)} >
                <DeleteForeverIcon />
                </ActionButton>
            </>
           :
           <>
                <ActionButton color='info' variant='contained' onClick={() => handleUpdateProduct(product._id)} >
                update
                </ActionButton> 
                <ActionButton color='error' variant='outlined' onClick={() => setMode(true)}  >
                cancel
                </ActionButton> 
           </>
        

        }
          
        </Box>
        {/* Notifiaction pusher */}
        <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
    fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
});

const mapStateTopProps = createStructuredSelector({
    auth: selectAuthToken,
    users: selectUsersList,
    products:  selectCollections
    
});

export default connect(mapStateTopProps, mapDispatchToProps)(ProductCard);