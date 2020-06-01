const {
    SIXTEEN_BITS: { p, g },
} = require('./variables')
const fetch = require('node-fetch')
const settings = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

findKey = () => {
    const A = g ** BigInt(Math.floor(Math.random() * Number(p) - 1)) % p
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:6872/dh/${A}`, settings)
            .then((res) => res.json())
            .then((json) => {
                const B = BigInt(Number(json.B))
                const ms = Date.now()
                for (let exponent = 0n; exponent < p - 1n; exponent++) {
                    console.log(`ms: ${Date.now() - ms}, exponent: ${exponent}`)
                    if (g ** exponent % p === A) {
                        resolve(
                            `secret key a found: ${exponent}, generated symmetric key: ${
                                A ** exponent % p
                            } in ${Date.now() - ms}ms`
                        )
                        break
                    } else if (g ** exponent % p === B) {
                        resolve(
                            `secret key b found: ${exponent}, generated symmetric key: ${
                                B ** exponent % p
                            } in ${Date.now() - ms}ms`
                        )
                        break
                    }
                }
                reject('did not find any key!')
            })
    })
}

const findMultiple = (n) => {
    const m = []
    for (let i = 0; i < n; i++) {
        m.push(findKey())
    }
    Promise.all(m).then((e) => e.forEach((x) => console.log(x)))
}

findKey().then((msg) => console.log(msg))
