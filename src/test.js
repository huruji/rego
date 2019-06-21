function nested(d) {
  const result = {}

  for (let [key, val] of Object.entries(d)) {
    const keyArr = key.split('.')
    let a = result
    for (let i = 0; i < keyArr.length - 1; i++) {
      if (!a[keyArr[i]]) a[keyArr[i]] = {}
      a = a[keyArr[i]]
    }
    a[keyArr[keyArr.length - 1]] = val
  }

  return result
}

const test = { "A": 1, "B.A": 2, "B.B": 3, "CC.D.E": 4, "CC.D.F": 5 }
console.log(nested(test))