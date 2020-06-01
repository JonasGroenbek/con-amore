const crypto = require('crypto')
const bigint = require('bigint-buffer')

module.exports = {
    a: 50n,
    b: 184n,
    FIVE_BITS: Object.freeze({
        p: 23n,
        g: 5n,
    }),
    EIGHT_BITS: Object.freeze({
        p: 251n,
        g: 6n,
    }),
    TWELVE_BITS: Object.freeze({
        p: 4007n,
        g: 2n
    }),
    SIXTEEN_BITS: Object.freeze({
        p: 64319n,
        g: 3n,
    }),
    //22 bit prime
    TWENTYTWO_BITS: Object.freeze({
        p: 2097143n,
        g: 2n,
    }),
    practical: (primeSize) => {
        const dh = crypto.createDiffieHellman(primeSize)
        const primeBuffer = dh.getPrime()
        const primitiveRootBuffer = dh.getGenerator()
        return {
            p: bigint.toBigIntLE(primeBuffer),
            g: bigint.toBigIntLE(primitiveRootBuffer),
        }
    },
    getPseudoRandomSecret: (bytes) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(bytes, (err, buffer) => {
                if (err) reject(err)
                resolve(bigint.toBigIntLE(buffer))
            })
        })
    },
    getRandomPrime: () => {
        return primes[Math.floor(Math.random() * primes.length)]
    },
}
