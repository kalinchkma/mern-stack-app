export default function selectProductByCategory(category, products) {
    const productList = [];
    const length = products !== null && products.length;
    for(let i=0; i < length; i++) {
        if(products[i].category === category) {
            productList.push(products[i]);
        }
    }
    return productList;
}

