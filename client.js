const {
    EIGHT_BITS: { p, g },
    a,
} = require('./variables')
const crypto = require('crypto')
crypto.randomBytes(256)
const fetch = require('node-fetch')
const settings = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

const diffieHellman = (a) => {
    console.log('a: ', a)
    const A = g ** a % p

    console.log('A: ', A)

    fetch(`http://localhost:6872/dh/${A}`, settings)
        .then((res) => res.json())
        .then((json) => {
            const key = BigInt(Number(json.B)) ** a % p
            console.log('client key', key)
        })
}

diffieHellman(a)

module.exports = {
    diffieHellman,
}
