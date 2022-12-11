import { useState } from "react";

import { ListItem, Typography,styled } from "@mui/material";
import { Box } from "@mui/system";


const ListItemS = styled(ListItem)({
  
    borderRadius: "10px", 
    position: "relative",
    alignItems: "flex-start",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "0.2s",
    border: "1px solid transparent",
   
});

const Status = styled('span')({
    position: "absolute",
    top: -1,
    right: 0,
    background: '#107c9f',
    color: "#fff",
    fontWeight: "700",
    padding: "5px 15px",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "20px"
    
})


const ProductCard = ({product, selectProduct,removeSelectedProduct, ...props}) => {

    const [select, setSelect] = useState(false);

    // set activate
    const selectHandler = () => {
      
        if(product.status !== "close") {
            setSelect(!select);
            selectProduct(product._id, product);
        }
    }

    const activeStyle = {
        boxShadow: "0px 0px 3px 0px #9f9999",
        "&:hover": {
            border: "1px solid #107c9f"
        },

    }
    const notActiveStyle = {
        boxShadow: "inset 0px 0px 4px 0px #dfdede"
    }
    const selectedStyled = {
        background: "#99999936",
        boxShadow: "0px 0px 3px 0px #9f9999",
        "&:hover": {
            border: "1px solid #107c9f"
        },

    }

 
    return (
        
        <ListItemS {...props}
        sx={
            product.status !== "close" ? 
            select ? selectedStyled :
            activeStyle : notActiveStyle
        }
        onClick={selectHandler}
        >
            <Box>
                <Typography
                    color="text.primary"
                    component={'span'}
                    variant="body2"
                    sx={{
                        color: "#333",
                        fontWeight: 700,
                        fontSize: "18px"
                    }}
                >
                    {product.title}
                </Typography>
                <Typography
                sx={{
                    color: "#666",
                    fontStyle: "italic"
                }}
                >
                  &#2547; {product.price}
                </Typography>
            </Box>
            {
                product.status === "close" ?
                <Status sx={{background: "red"}}>{product.status}</Status> :
                <Status>{product.status}</Status>
            }
        </ListItemS>
    );
}


export default ProductCard;