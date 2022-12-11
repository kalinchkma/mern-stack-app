export default function selectUniqueProductCategory (productList) {
    const catList = [];
    const length = productList !== null && productList.length;
    for(let i=0; i < length; i++) {
        if(!catList.includes(productList[i].category)) {
            catList.push(productList[i].category);
        }
    }
    return catList;
}