
export default function findById(id, list) {
    let p = {};
    const length = list !== null && list.length;
    for(let i=0; i < length; i++) {
        if(list[i]._id === id) {
            p = {...list[i]};
            break;
        }
    }
    return p;
}