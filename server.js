const app = require('express')()
const {
    EIGHT_BITS: { p, g },
} = require('./variables')

app.get('/dh/:A', (req, res) => {
    const A = BigInt(req.params.A)
    const b = BigInt(Math.floor(Math.random() * Number(p)))
    console.log('b', b)
    const B = g ** b % p
    console.log('B', B)
    const key = A ** b % p
    console.log('server key', key)
    res.status(200).json({ B: B.toString() })
})

app.listen(6872, () => {
    console.log('server started succesfully')
})
