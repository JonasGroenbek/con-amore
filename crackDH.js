const { p, g } = require('./variables')
const { timer } = require('./timelogger')

/**
 * Since g is a primitive root we know there exists a unique number a∈{1,2,…,p−1} such that ga≡21(modp).
 * the set of all solutions will be a+k(p−1) where k∈Z since ga+k(p−1)≡ga(gp−1)k≡ga(1)k≡ga(modp)
 * (using fermat's little theorem). So one option is to check iteratively among the p−1 options
 */
const findKey = (exponent, A, B) => {
    if (g ** exponent % p === A) {
        return B ** exponent % p
    } else if (g ** exponent % p === B) {
        return A ** exponent % p
    } else {
        return findKey(++exponent, A, B)
    }
}

timer(
    () =>
        new Promise((resolve) => {
            resolve(findKey(BigInt(1), BigInt(10), BigInt(20)))
        })
).then((result) => {
    const { key, ms } = result
    console.log(`it took ${ms}ms to retrieve the key: ${key}`)
})

module.exports = findKey
