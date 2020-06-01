const {
    TWENTYTWO_BITS: { p, g },
} = require('./variables')
const timer = require('./timelogger')

const findKey = (exponent, A, B) => {
    if (g ** exponent % p === A) {
        return B ** exponent % p
    } else if (g ** exponent % p === B) {
        return A ** exponent % p
    } else {
        return findKey(++exponent, A, B)
    }
}

const testFindKeyTimeRecursive = (g, p, n) => {
    timer(
        () =>
            new Promise((resolve) => {
                resolve(findKey(g, n, p))
            })
    ).then((result) => {
        const { key, ms } = result
        console.log(`it took ${ms}ms to retrieve the key: ${key}`)
    })
}
//118s for TWENTYTWO_BITS
testFindKeyIterative = (g, A, B) => {
    const s = Date.now()
    for (let exponent = 0n; exponent < p - 1n; exponent++) {
        if (g ** exponent % p === A) {
            console.log(
                `found key: ${A ** exponent % p} in ${Date.now() - s}ms`
            )
            break
        } else if (g ** exponent % p === B) {
            console.log(
                `found key: ${B ** exponent % p} in ${Date.now() - s}ms`
            )
            break
        }
    }
    console.log(`${Date.now() - s}ms`)
}

//only works for sub 64 bit numbers
const getExponent = () => BigInt(Math.floor(Math.random() * (Number(p) - 1)))

const A = getExponent()
const B = getExponent()

testFindKeyIterative(2n, A, B)

module.exports = findKey
