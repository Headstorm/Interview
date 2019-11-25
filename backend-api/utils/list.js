const isValidInputList = (input) => {
  // input should be a list
  if (!Array.isArray(input)) return false
  if (input.length !== 500) return false

  let filteredInput = input.filter(num => typeof (num) === 'number')
  return filteredInput.length === 500
}

const isValidInputNum = (input) => {
  return typeof (input) === 'number'
}

const updateElement = (input, numList) => {
  // input should be a number
  let index = numList.findIndex((number) => number > input)

  // input is the largest, simply push it to the list
  if (index === -1) { numList.push(input) }

  // insert input number
  // remove the largest number to keep list size
  numList.splice(index, 0, input)
  numList.pop()
}

const sortList = (input) => {
  return input.sort((a, b) => a - b)
}

module.exports = {
  isValidInputList,
  isValidInputNum,
  updateElement,
  sortList
}