
const arrayLength = (number) => {
    return Array.from(new Array(number).keys()).map(k => k + 1)
}

module.exports = arrayLength
