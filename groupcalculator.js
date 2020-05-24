module.exports = {
    /**
     * 
     */

}

const groupSize = (p, g) => {
    const group = new Set()
    for(let i = BigInt(0); i < p-BigInt(1); i++){
        group.add((g**i)%p)
    }
    console.log(group.size)
}

groupSize(BigInt(83), BigInt(2))