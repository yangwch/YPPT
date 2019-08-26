// 计算是否在区域中
export const isInRect = (cardItem, rect) => {
  const {x, y, width, height} = cardItem
  const {x: rx, y: ry, w, h} = rect
  if (x + width  > rx &&
    rx + w  > x &&
    y + height > ry &&
    ry + h > y
  )
    return true
  else
    return false
}

export const composeStyle = (css) => {
  let cssObj = {...css}
  Object.keys(cssObj).forEach(key => {
    if (['top', 'left', 'width', 'height'].indexOf(key) >= 0) {
      cssObj[key] += 'px'
    }
  })
  return cssObj
}
const genId = () => {
  let s = 0
  return () => {
    return s++
  }
}

const gener = genId()
// 生成id
export const createNewId = () => {
  return gener()
}
