export default function selectProductByGener(gener, products) {
    const productList = [];
    const length = products !== null && products.length;
    for(let i=0; i < length; i++) {
        if(products[i].gener === gener) {
            productList.push(products[i]);
        }
    }
    return productList;
}


