import PageComponent from './PageComponent'
import {createNewId} from './../utils/rectHelper'

export default class Page {
  constructor (args = {}) {
    let temp = {...args}
    let id = createNewId()
    this.id = id
    this.components = (temp.components || []).map(compItem => new PageComponent(compItem))
    this.sort = temp.sort
    this.properties = temp.properties
  }
}