let id = 0

const genId = () => {
  // eslint-disable-next-line no-plusplus
  return `${id++}`
}

export default genId
