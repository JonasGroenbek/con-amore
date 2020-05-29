const isGroupSafe = (p, g) => {
    const group = new Set()
    for (let i = 0; i < p - 1; i++) {
        group.add(g ** i % p)
    }
    return group.size == p / 2 - 1
}

/**
 * The only even prime number is 2. All other even numbers can be divided by 2.
 * If the sum of a number's digits is a multiple of 3, that number can be divided by 3.
 * No prime number greater than 5 ends in a 5. 
   Any number greater than 5 that ends in a 5 can be divided by 5
 */
const isSofieGermainPrime = (p) => {
    if (!isPrime(p)) {
        return false
    }
    const ap = 2 * p + 1
    return isPrime(ap)
}

const isPrime = (p) => {
    if (
        p % 2 === 0 ||
        //Number(p).toString().split().reduce((acc, cur) => acc + Number(cur), 0) % 3 === 0 || 
        //((p - 1) % 9 + 1) % 3 === 0 || 
        p % 3 === 0 || 
        (p > 5 && Number(p).toString()[Number(p.toString().length - 1)] === 5)
    ) {
        return false
    }

    const segregator = Math.floor(Math.sqrt(p))
    const primes = eratosthenes(segregator)

    for (let i = 0; i < primes.length; i++) {
        if (p % primes[i] === 0) {
            return false
        }
    }
    return true
}

//Sieve of Eratosthenes
const eratosthenes = function (n) {
    let array,
        upperLimit = Math.sqrt(n+1),
        output = []

    array = Array(n).fill(true)

    for (let i = 2; i <= upperLimit; i++) {
        if (array[i]) {
            for (let j = i * i; j < n; j += i) {
                array[j] = false
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (array[i]) {
            output.push(i)
        }
    }

    return output
}

//Sofie Germain primes:     11, 23, 29, 41, 53
//Non Sofie Germain primes: 13, 17, 31, 37, 43