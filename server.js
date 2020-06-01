const app = require('express')()
const {
    medium: { p, g },
    b,
} = require('./variables')

app.get('/dh/:A', (req, res) => {
    const A = BigInt(req.params.A)
    //const b = BigInt(Math.floor(Math.random() * Number(p)))
    const B = g ** b % p
    console.log('B', B)
    const key = A ** b % p
    console.log('server key', key)
    res.status(200).json({ B: B.toString() })
})

app.listen(6872, () => {
    console.log('server started succesfully')
})
