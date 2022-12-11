export default function selectGameGener(games) {
    const geners = [];
    const length = games.length;
    for(let i=0; i < length; i++) {
        if(!geners.includes(games[i].gener)) {
            geners.push(games[i].gener);
        }
    }
    return geners;
}
// category
export function selectProductCategory(products) {
    const category = [];
    const length = products.length;
    for(let i=0; i < length; i++) {
        if(!category.includes(products[i].category)) {
            category.push(products[i].category);
        }
    }
    return category;
}