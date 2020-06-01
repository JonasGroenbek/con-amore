module.exports = async (cb) => {
    const s = Date.now()
    const key = await cb()
    const diff = Date.now() - s
    return {
        ms: diff,
        key,
    }
}
