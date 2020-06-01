const { isPrime } = require('./prime-functions')
const { getRandomPrime } = require('./variables')

/**
 * Fermat's little theorem states that if p is a prime number, then for any integer a,
 * the number ap − a is an integer multiple of p. In the notation of modular arithmetic,
 *  this is expressed as {\displaystyle a^{p}\equiv a{\pmod {p}}.}a^p \equiv a \pmod p.
 */

/**
 *
 * @param {BigInt} p
 * @param {BigInt} a
 */
const fermatsLittleTheorem = (p, a) => {
    if (!isPrime(p))
        throw Error('first argument is expected to be a prime number')
    return p**a === p % a
}

fermatsLittleTheorem(getRandomPrime(), 12n)