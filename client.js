const {
    medium: { p, g },
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

const requestKey = () => {
    const a = BigInt(34545656)
    const A = g ** a % p

    fetch(`http://localhost:6872/dh/${A}`, settings)
        .then((res) => res.json())
        .then((json) => {
            const key = BigInt(Number(json.B)) ** a % p
            console.log('client key', key)
        })
}

requestKey()
