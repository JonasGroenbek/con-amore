const app = require('express')()
/*
const { practical } = require('./variables')
const { p, g } = practical()
*/
const {
    medium: { p, g },
    getPseudoRandomSecret
} = require('./variables')

getPseudoRandomSecret(0.1).then(e => console.log(e))
app.get('/dh/:A', (req, res) => {
    const A = BigInt(req.params.A)
    console.log(A)
    const b = BigInt(233)
    const B = g ** b % p
    const key = A ** b % p
    console.log('server key', key)
    res.status(200).json({ B: B.toString() })
})

app.get('msg/:msg', (req, res) => {
    const B = req.params.msg
    res.status(200).send(B)
})

app.listen(6872, () => {
    console.log('server started succesfully')
})
