/**
 * manage game page
 */
 import * as React from "react";

 // import redux state
 import {connect} from "react-redux";
 import {createStructuredSelector } from "reselect";
 import { fetchCollectionStartAsync } from "../../../redux/shop/shop.action";
 import { selectCollections, selectShopIsFetching } from "../../../redux/shop/shop.selector";
 import { selectGamesCollections } from "../../../redux/games/games.select";
 import { selectUsersList } from "../../../redux/users/users.selector";
 import { fetchUsersStartAsync } from "../../../redux/users/users.action";

 
 // import comonents
 import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";


 // import utils
 import selectGameGener, {selectProductCategory} from "../../../utils/selectGener";
 import { findSellerAdmin } from "../../../utils/userUtils";
 
 // import styles
import { ManageSellesContainer, ManageSellesWrapper } from "./manage-selles-page.style";
import { Box } from "@mui/system";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

 
 
 
 class ManageSelles extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productsList: null,
            selectCat: ""
        }
   }

     componentDidMount() {
         const { fetchCollectionStartAsync, fetchUsersStartAsync } = this.props;
         fetchCollectionStartAsync();
         fetchUsersStartAsync();
     }
     
    handlerSelect = (e) => {
        const { products } = this.props;
        const prodList = [];
        products.forEach(product => {
            if(product.gener === e.target.value) {
                prodList.push(product);
            }
        });
        this.setState({
            ...this.state,
            selectCat: e.target.value,
            productsList: prodList
        });
    }
     render() {
        // set page title
        document.title = "Manage Selles";
        const { games, users, products } = this.props;
        const categories = selectProductCategory(products);
        const sellers = findSellerAdmin(users);

       
         return (
             <ManageSellesWrapper>
                
    
                 {/* category select input form */}
                 {/* seller lavel 1 */}
                 <Box sx={{
                    width: "100%",
                    background: "#f7f7f7f7"
                 }}>
                    {/* lavel title */}
                    <Typography sx={{
                        padding: "10px",
                        fontWeight: "700",
                        fontSize: "20px",
                        color: "#fff",
                        background: "#333"
                    }}>Sellers</Typography>

                    <Box sx={{
                        width: "100%",
                        display:"flex",
                        flexDirection: "column"
                    }}>
                        <Typography>sellers name</Typography>
                        <Box sx={{
                            
                        }}>
                            <span>asign actegory</span>
                        </Box>
                    </Box>
                    

                 </Box>
                
             </ManageSellesWrapper>
         );
 
     }
 
 }
 
 const mapStateToProps = createStructuredSelector({
     products: selectCollections,
     isShopFetching: selectShopIsFetching,
     games: selectGamesCollections,
     users: selectUsersList
 });
 
 const mapDispatchToProps = dispatch => ({
     fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
     fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
 });
 
 
 export default  connect(mapStateToProps, mapDispatchToProps)(ManageSelles);
 