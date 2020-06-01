const { getGroup } = require('./prime-functions')
const { TWELVE_BITS: {p, g} } = require('./variables')

const groupB = getGroup(p ,g)
console.log(groupB.size)


/*for(let i = 0; i < 251; i++){
    if(6n**BigInt(i)%251n === 219n) console.log(i)
}*/
