module.exports = {
    /**
     * 
     */

}

const groupSize = (p, g) => {
    const group = new Set()
    for(let i = 0; i < p-1; i++){
        group.add((g**i)%p)
    }
    return group.size
}

console.log(groupSize(83, 2))