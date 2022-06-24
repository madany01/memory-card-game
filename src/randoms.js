// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function int(min, max) {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)

  return Math.floor(Math.random() * (maxInt - minInt) + minInt)
}

function shuffle(array) {
  const shuffled = [...array]

  for (let j = shuffled.length - 1; j > 0; j -= 1) {
    const i = int(0, j + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function choices(arr, n) {
  return shuffle(arr).slice(0, n)
}

export { int, choices, shuffle }
