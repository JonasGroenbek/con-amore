const {
    EIGHT_BITS: { p, g },
    a,
} = require('./variables')
const { getGroup } = require('./prime-functions')

if (p !== 251n || g !== 6n || a !== 50n)
    throw Error('variables are not correct.')

console.log(
    'The symmetric key will be one of the elements in this group',
    getGroup(p, g ** a % p)
)
