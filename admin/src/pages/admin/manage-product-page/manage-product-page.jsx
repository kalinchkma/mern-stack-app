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

 
 // import comonents
 import WithPreLoader from "../../../components/preloader/preloader";
 import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";
 import ProductList from "./product-card/product-list.component";

 // import utils
 import selectGameGener from "../../../utils/selectGener";
 
 
 // import styles
 import { ManageProductContainer, ManageProductWrapper } from "./manage-product-page.style";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

 
const ProductListWithPreLoader = WithPreLoader(ProductList);
 
 
 class ManageProduct extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            productsList: null,
            selectCat: ""
        }
   }

     componentDidMount() {
         const { fetchCollectionStartAsync } = this.props;
         fetchCollectionStartAsync();
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
        document.title = "Manage Products";
        const {isShopFetching, games } = this.props;
        const gameGener = selectGameGener(games);
        const previousLink = [["Dashboard", "/admin/"]];
       
         return (
             <ManageProductWrapper>
                
                <PageBreadcrumbs prevLinks={previousLink} currentPage={'Manage product'} />
                 {/* category select input form */}
                 <Box sx={{
                    width: "100%"
                 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="cat">Select game</InputLabel>
                        <Select
                            labelId="cat"
                            label="Select game"
                            size="small"
                            value={this.state.selectCat}
                            onChange={this.handlerSelect}
                        >   
                        {
                            games &&
                            games.map((game, index) => (
                                <MenuItem key={index} value={game.gener}>{game.gener}</MenuItem>
                            ))
                        }
                        </Select>
                    </FormControl>
                 </Box>
                 <ManageProductContainer>
                     <ProductListWithPreLoader isLoading={isShopFetching} products={this.state.productsList} gameGener={gameGener} />
                 </ManageProductContainer>
                
             </ManageProductWrapper>
         );
 
     }
 
 }
 
 const mapStateToProps = createStructuredSelector({
     products: selectCollections,
     isShopFetching: selectShopIsFetching,
     games: selectGamesCollections,
 });
 
 const mapDispatchToProps = dispatch => ({
     fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
 });
 
 
 export default  connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
 