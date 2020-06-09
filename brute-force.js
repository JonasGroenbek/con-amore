const {
    TWENTYTWO_BITS: { p, g },
} = require('./variables')
const fetch = require('node-fetch')
const settings = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
}

//O(n)
const bruteForce = () => {
    const a = BigInt(Math.floor(Math.random() * Number(p) - 1))
    const A = g ** a % p
    fetch(`http://localhost:6872/dh/${A}`, settings)
        .then((res) => res.json())
        .then((json) => {
            const B = BigInt(json.B)
            console.log(`computing key with generator B:${B} and exponent ${a}`)
            const key = B ** a % p
            console.log(`got key: ${key}`)
            const offset = Date.now()
            let ms = 0
            let keyGuess = 0
            for (let i = 0n; i < p - 1n; i++) {
                if (ms + 50 < Date.now() - offset) {
                    console.log(
                        `ms: ${
                            Date.now() - offset
                        }, exponent: ${i}, exponent diff: ${
                            Number(i) - keyGuess
                        }`
                    )
                    ms = Date.now() - offset
                    keyGuess = Number(i)
                }
                if (i === key) {
                    const now = Date.now() - offset
                    console.log(`symmetric key: ${i} in ${now}ms`)
                    break
                }
            }
        })
}

//O(n^n)
//100s -> 1224exp
const findKey = () => {
    const A = g ** BigInt(Math.floor(Math.random() * Number(p) - 1)) % p
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:6872/dh/${A}`, settings)
            .then((res) => res.json())
            .then((json) => {
                const B = BigInt(Number(json.B))
                const offset = Date.now()
                let ms = 0
                let exp = 0

                for (let exponent = 0n; exponent < p - 1n; exponent++) {
                    if (ms + 500 < Date.now() - offset) {
                        console.log(
                            `ms: ${
                                Date.now() - offset
                            }, exponent: ${exponent}, exponent diff: ${
                                Number(exponent) - exp
                            }`
                        )
                        ms = Date.now() - offset
                        exp = Number(exponent)
                    }
                    if (g ** exponent % p === A) {
                        const now = Date.now() - offset
                        resolve(
                            `secret key a found: ${exponent}, generated symmetric key: ${
                                A ** exponent % p
                            } in ${now}ms`
                        )
                        break
                    } else if (g ** exponent % p === B) {
                        const now = Date.now() - offset
                        resolve(
                            `secret key b found: ${exponent}, generated symmetric key: ${
                                B ** exponent % p
                            } in ${now}ms`
                        )
                        break
                    }
                }
                reject('did not find any key!')
            })
    })
}


const multiple = (n, cb) => {
    for (let i = 0; i < n; i++) {
        cb()
    }
}

findKey()
