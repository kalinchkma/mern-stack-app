


export const findBuyer = (users) => {
    const buyerList = [];
    users.forEach(user => {
        if(user.userType === "buyer") {
            buyerList.push(user);
        }
    });
    return buyerList.sort((a,b) => Number(b.totalBuy) - Number(a.totalBuy));
}

export const findSeller = (users) => {
    const sellerList = [];
    users.forEach(user => {
        if(user.userType === "seller") {
            sellerList.push(user);
        }
    });
    return sellerList.sort((a, b) => Number(b.totalSells) - Number(a.totalSells));
}

export const findSellerAdmin = (users) => {
    const sellerList = [];
    users.forEach(user => {
        if(user.userType === "seller" || user.userType === "admin") {
            sellerList.push(user);
        }
    });
    return sellerList.sort((a, b) => Number(b.totalSells) - Number(a.totalSells));
}



export const findBlockedUser = (users) => {
    const blackList = [];
    users.forEach(user => {
        if(user.userType === "block") {
            blackList.push(user);
        }   
    });

    return blackList;
}



