/**
 * Game product page
 */


import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import GameHeader from "../../components/game-header/game-header.component";
import GameBanner from "../../components/game-banner/game-banner.component";
import ProductTab from "../../components/product-tab/product-tab.component";

// imports utils
import findById from "../../utils/findById";
import selectProductByGener from "../../utils/selectProductByGener";
import selectUniqueProductCategory from "../../utils/selectUniqueProductCategory";
import selectProductByCategory from "../../utils/getProductByCategory";

// import redux sate
import { connect } from "react-redux";
import { selectGamesCollections } from "../../redux/games/games.select";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selector";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.action";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { setCart } from "../../redux/cart/cart.action";

// styled imports
import {ProductListContainer, FormBox, ProductList, OrderButtonBox, OrderButtonContainer, OderButton, OderPrice} from "./game-product.styles";
import { FormControl, InputLabel, TextField, Box, Select, MenuItem,  Grid, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";


function withRouter(Component) {
    function ComponentWithRouter({...props}) {
      let params = useParams();
      let navigate = useNavigate();
      let topRef = React.useRef(null);
      return <Component {...props} params={params} navigate={navigate} topRef={topRef}/>
    }

    const mapStateToProps = createStructuredSelector({
        games: selectGamesCollections,
        productList: selectCollections,
        auth: selectAuthToken
    });
    const mapDispatchToProps = dispatch => ({
        fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
        setCart: (item) => dispatch(setCart(item))
    })
    
    return connect(mapStateToProps, mapDispatchToProps)(ComponentWithRouter);
}



class GameProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: "",
            category: "",
            selectedProuct: [],
            totalPrice: 0,
            productToShow: null,
            playerIdError: false,
            new: true,
            topRef: null
        }
    }

    componentDidMount() {
        const { fetchCollectionStartAsync, setCart, topRef } = this.props;
        fetchCollectionStartAsync();
        setCart(null);
        this.setState({
            ...this.state,
            topRef: topRef
        })
    }



    /**
     * 
     * handle selected category change
     */
    categoryChangeHandler = (e) => {
        const {productList} = this.props;
        const catProduct = selectProductByCategory(e.target.value, productList);
        this.setState({
            ...this.state,
            category: e.target.value,
            productToShow: catProduct
        });
    }

    /**
     * ==================================================
     * select product handler
     * ====================================================
     */

    selectedProduct = (productId, product) => {
        if(!this.state.selectedProuct.includes(product)) {
            product.amount = 1;
            this.setState({
                ...this.state,
                selectedProuct: [...this.state.selectedProuct, product],
                totalPrice: Number(product.price) + this.state.totalPrice,
                new: false,
            });
        } else {
            const p = this.state.selectedProuct;
            const index = p.indexOf(product);
            const cp = p[index];
            p.splice(index, 1);
            this.setState({
                ...this.state,
                selectedProuct: [...p],
                totalPrice: this.state.totalPrice - Number(cp.price),
                new: false
            })
        }
    }

    /**
     * 
     * add amount and remove to select product
     */
    addproductAmount = (productIndex) => {
        const pl = this.state.selectedProuct;
        const rp = pl[productIndex];
        rp.amount = Number(rp.amount) + 1;
        pl[productIndex] = rp;
        this.setState({
            ...this.state,
            selectedProuct: [...pl],
            totalPrice: this.state.totalPrice + Number(rp.price),
            new: false
        })
    }

    removeProductAmount = (productIndex) => {
        const pl = this.state.selectedProuct;
        const rp = pl[productIndex];
        if(rp.amount > 1) {
            rp.amount = Number(rp.amount) - 1;
            pl[productIndex] = rp;
            this.setState({
                ...this.state,
                selectedProuct: [...pl],
                totalPrice: this.state.totalPrice - Number(rp.price),
                new: false
            })
        }
    }
    /**
     * handle order
     */
     handleOrder = (selectedProduct) => {
        console.log("cart order handler call")
        const { navigate, setCart } = this.props;
        if(this.state.playerId === "") {
            this.setState({
                ...this.state,
                playerIdError: true
            });
            this.state.topRef.current?.scrollIntoView({behavior: 'smooth'});
        } else {
            // order here
            const orderObject = {
                products: [...selectedProduct],
                info: {
                    playerId: this.state.playerId,
                    totalPrice: this.state.totalPrice
                }
            }
            setCart(orderObject);
            this.setState({
                ...this.state,
                selectedProuct: [],
                totalPrice: 0,
                new: false
            });
            navigate("/order");
        }
    }

    /**
     * =====================================================================
     * render gui interface
     * =====================================================================
     */

    render()  {
        
        /**
         * construct specific games and elements
         */
        // extract game id
        const requestedGameId = this.props.params.id;
        // extract game and product list
        const {games, productList} = this.props;
        // extract game by id
        const game = findById(requestedGameId, games);
        // extract product by gener
        const products = selectProductByGener(game.gener, productList);
    
        // extract product unique category 
        const productCategory = selectUniqueProductCategory(products);

        // selecting auth
        const { auth } = this.props;

        // ref to top
        if(this.state.new && this.state.topRef) {
            // got top top 
            this.state.topRef.current?.scrollIntoView();
        }

        return Object.keys(game).length && (
            <>
                {/* place holder for ref */}
                <div ref={this.state.topRef} style={{height: "0px"}}></div>
                {/* game header */}
                <GameHeader  title={game.name} pageLink="/" />
                {/* game banner */}
                <GameBanner img={ game.image && game.image} />

                <ProductListContainer>
                   <FormBox>
                    {/* player id input box */}

                        {
                             this.state.productToShow !== null && 
                             <Box  sx={{ display: 'flex', alignItems: 'flex-end',flexDirection: "row", justifyContent: "start", width: "100%" }}>
                                <AccountCircle sx={{ color: 'action.active',flex: 1, mr: 1, my: 0.5 }} />
                                <TextField 
                                sx={{flex: 11}} 
                                id="input-with-sx" 
                                label="Enter Player Id"
                                variant="standard" 
                                onChange={(e) => this.setState({...this.state,playerId: e.target.value, playerIdError: false})}
                                error={this.state.playerIdError}
                                />
                            </Box>
                        }
                      

                        {/* cetegory box */}
                        <Box sx={{
                             marginTop: "25px"
                        }} >
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="category">Select Category</InputLabel>
                                <Select
                                id="category"
                                label=" select category"
                                value={this.state.category}
                                onChange={this.categoryChangeHandler}
                                >
                                    {
                                        productCategory.length &&
                                        productCategory.map(category => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))
                                    }
            
                                </Select>
                            </FormControl>
                        </Box>
                   </FormBox>
                  
                    {/* 
                    ============================================
                    product list and game info
                    ============================================
                    */}
                    <ProductList>
                        {
                            this.state.productToShow !== null &&
                                <ProductTab 
                                    selectProduct={this.selectedProduct}
                                    products={this.state.productToShow} 
                                    gameInfo={game}
                                />
                        }
                    </ProductList>
                    {/* placeHolder */}
                    <div style={{height: "1000px"}}>

                    </div>
                </ProductListContainer>

                {/* order popup */}
                    {
                        this.state.selectedProuct.length > 0 &&
                        <OrderButtonContainer>
                            <OrderButtonBox container spacing={0}> 
                                <Grid sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }} item xs={12}>
                                        <Box sx={{width: "100%"}}>
                                        {
                                            this.state.selectedProuct.map((product, index)=> (
                                                <Box key={index} 
                                                sx={{
                                                    color: "#666", 
                                                    display: "inline-flex",
                                                    border: "1px solid #ebebeb",
                                                    margin: "4px",
                                                    "& button": {
                                                        border: "none",
                                                        background: "transparent",
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                >
                                                    <button onClick={() => this.removeProductAmount(index)} ><RemoveIcon /></button>
                                                    <Box sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexDirection: "column",
                                                        background:"#11333e",
                                                        padding: "10px",
                                                        color: "#fff",
                                                        fontWeight: "700",
                                                        "& span": {
                                                            fontSize: "12px",
                                                            textTransform: "capitalize"
                                                        }
                                                    }}>
                                                        <span>
                                                            {product.title}
                                                        </span>
                                                        
                                                        <span>
                                                           Amount:{product.amount}
                                                        </span>
                                                    </Box>
                                                
                                                    <button onClick={() => this.addproductAmount(index)}><AddIcon /></button>
                                                
                                                </Box>
                                            ))
                                        }
                                        </Box>
                                        

                                        <OderPrice>Total: &#2547;{
                                            this.state.totalPrice
                                        }</OderPrice>
                                    {/* this button will handle order */}
                                    { 
                                   
                                    auth !== null ? 
                                    auth.userType !== "admin" && auth.userType !== "seller" ?
                                      <OderButton onClick={() => this.handleOrder(this.state.selectedProuct)} >
                                            <ShoppingCartIcon /> Order
                                      </OderButton>  : "" :
                                    
                                       <OderButton component={Link} to="/login" >
                                          Login to buy a product
                                       </OderButton> 
                                    
                                    }
                                    
                                </Grid>
                            </OrderButtonBox>
                        </OrderButtonContainer>
                    }
                   
            </>  
           
        )
    }
}

export default withRouter(GameProducts);


