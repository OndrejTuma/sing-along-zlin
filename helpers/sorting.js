import get from 'lodash/fp/get'

export const sortBySize = key => (items, direction) => {
  return items.slice().sort((a, b) => {
    const valueA = get(key)(a).toString()
    const valueB = get(key)(b).toString()
    const match = parseFloat(valueA.replace(' ', '')) > parseFloat(valueB.replace(' ', '')) ? 1 : -1

    return direction * match
  })
}

export const sortByDate = key => (items, direction) => {
  return items.slice().sort((a, b) => {
    const valueA = get(key)(a)
    const valueB = get(key)(b)

    return direction * (new Date(valueA) - new Date(valueB))
  })
}

export const sortByName = key => (items, direction) => {
  return items.slice().sort((a, b) => {
    const valueA = get(key)(a)
    const valueB = get(key)(b)

    return direction * valueA.localeCompare(valueB)
  })
}