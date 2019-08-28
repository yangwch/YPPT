import {createNewId} from './../utils/rectHelper'
import {isInRect} from './../utils/rectHelper'
export default class PageComponent {
  constructor (args = {}) {
    let temp = {...args}
    const id = createNewId()
    this.id = id
    this.template = temp.template
    this.css = this.parseLocationTypes(temp.css)
    this.type = temp.type
    this.properties = temp.properties
    this.active = false
    this.selected = false
  }
  parseLocationTypes (css) {
    let cssCopy = {...css}
    Object.keys(css).forEach(key => {
      if (['left', 'top', 'width', 'height', 'rotate'].indexOf(key) >= 0) {
        cssCopy[key] = parseFloat(css[key])
      }
    })
    return cssCopy
  }
  isInRect (rect) {
    const {left, top, width, height} = this.css
    const {x, y, w, h} = rect
    let selected = isInRect({
      x: left,
      y: top,
      width,
      height
    }, {
      x,
      y,
      w,
      h
    })
    this.selected = selected
    return selected
  }
}