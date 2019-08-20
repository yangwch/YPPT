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
