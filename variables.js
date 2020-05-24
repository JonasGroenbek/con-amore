const crypto = require('crypto')
const bigint = require('bigint-buffer')

module.exports = {
    small: {
        p: 23n,
        g: 5n,
    },
    //8 bit prime
    medium: {
        p: 251n,
        g: 248n,
    },
    //64 bit prime
    big: {
        p: 4093n,
        g: 4087n,
    },
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
}