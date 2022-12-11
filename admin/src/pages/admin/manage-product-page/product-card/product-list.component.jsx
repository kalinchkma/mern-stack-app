import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


// import component
import ProductCard from "./product-card.component";


export default function ProductList({products, gameGener}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
      products &&
      products.map((product) => (
        <ListItem
          disableGutters
          key={product._id}
        >
         <ProductCard  product={product} gameGener={gameGener} />
        </ListItem>
      ))}
    </List>
  );
}
