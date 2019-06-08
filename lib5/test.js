function diffChildren(oldVdom, newVdom) {
  const changes = []
  let lastIndex = 0
  let lastPlacedNode = null

  newVdom.forEach((item, i) => {
    const index = oldVdom.indexOf(item);
    if (index === -1) {
      changes.push({
        type: 'insert',
        item: item,
        afterNode: lastPlacedNode
      })
    } else {
      if (index < lastIndex) {
        changes.push({
          type: 'move',
          item: item,
          afterNode: lastPlacedNode
        })
      }
      lastIndex = Math.max(index, lastIndex)
    }

    lastPlacedNode = item
  })

  oldVdom.forEach((item, i) => {
    if (newVdom.indexOf(item) === -1) {
      changes.push({
        type: 'remove',
        index: i
      })
    }
  })

  return changes
}

const changes = diffChildren([1, 2, 3, 7, 4], [1, 4, 5, 3, 7, 6])
console.log(changes)
