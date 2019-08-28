// 计算是否在区域中
export const isInRect = (cardItem, rect) => {
  const { x, y, width, height } = cardItem
  const { x: rx, y: ry, w, h } = rect
  if (x + width > rx &&
    rx + w > x &&
    y + height > ry &&
    ry + h > y
  )
    return true
  else
    return false
}

export const composeStyle = (css) => {
  let cssObj = { ...css }
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
// 获得两点坐标的角度
export const getAngle = function (px, py, mx, my) {
  // 获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
  var x = Math.abs(px - mx)
  var y = Math.abs(py - my)
  var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  var cos = y / z
  var radina = Math.acos(cos)
  // 用反三角函数求弧度
  var angle = Math.floor(180 / (Math.PI / radina))
  
  // 将弧度转换成角度
  if (mx > px && my > py) {
    // 鼠标在第四象限
    angle = 180 - angle
  }

  if (mx == px && my > py) {
    // 鼠标在y轴负方向上
    angle = 180
  }

  if (mx > px && my == py) {
    // 鼠标在x轴正方向上
    angle = 90
  }

  if (mx < px && my > py) {
    // 鼠标在第三象限
    angle = 180 + angle
  }

  if (mx < px && my == py) {
    // 鼠标在x轴负方向
    angle = 270
  }

  if (mx < px && my < py) {//鼠标在第二象限
    angle = 360 - angle
  }

  return angle;
}
