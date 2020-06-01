/**
 * Floors the result
 */
module.exports = (bigint) => {
    if (bigint < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (bigint < 2n) {
        return bigint
    }

    function newtonIteration(n, x0) {
        const x1 = (n / x0 + x0) >> 1n
        if (x0 === x1 || x0 === x1 - 1n) {
            return x0
        }
        return newtonIteration(n, x1)
    }

    return newtonIteration(bigint, 1n)
}
