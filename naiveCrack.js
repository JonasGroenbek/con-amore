const { p, g } = require('./variables')
const { timer } = require('./timelogger')

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
