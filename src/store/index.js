import Vue from 'vue'
import Vuex from 'vuex'
// import { isInRect } from '../utils/rectHelper'
import { getPPTData } from './../service/index'
import Page from './../models/Page'

Vue.use(Vuex)

const state = {
  cards: [
    {
      id: 'c1',
      datas: [
        {
          id: 1,
          x: 100,
          y: 100,
          width: 120,
          height: 30,
          value: '一段文字',
          type: 'p',
          selected: false
        },
        {
          id: 2,
          x: 200,
          y: 200,
          width: 220,
          height: 30,
          value: '一段话<div>换行　内容</div>',
          type: 'p',
          selected: false
        },
        {
          id: 3,
          x: 300,
          y: 400,
          width: 100,
          height: 100,
          type: 'img',
          selected: false,
          src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+IReElDQ19QUk9GSUxFAAEBAAARaGFwcGwCAAAAbW50ckdSQVlYWVogB9wACAAXAA8ALgAPYWNzcEFQUEwAAAAAbm9uZQAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFZGVzYwAAAMAAAAB5ZHNjbQAAATwAAAfoY3BydAAACSQAAAAjd3RwdAAACUgAAAAUa1RSQwAACVwAAAgMZGVzYwAAAAAAAAAfR2VuZXJpYyBHcmF5IEdhbW1hIDIuMiBQcm9maWxlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1sdWMAAAAAAAAAHwAAAAxza1NLAAAALgAAAYRkYURLAAAAOAAAAbJjYUVTAAAAOAAAAep2aVZOAAAAQAAAAiJwdEJSAAAASgAAAmJ1a1VBAAAALAAAAqxmckZVAAAAPgAAAthodUhVAAAANAAAAxZ6aFRXAAAAHgAAA0puYk5PAAAAOgAAA2hjc0NaAAAAKAAAA6JoZUlMAAAAJAAAA8ppdElUAAAATgAAA+5yb1JPAAAAKgAABDxkZURFAAAATgAABGZrb0tSAAAAIgAABLRzdlNFAAAAOAAAAbJ6aENOAAAAHgAABNZqYUpQAAAAJgAABPRlbEdSAAAAKgAABRpwdFBPAAAAUgAABURubE5MAAAAQAAABZZlc0VTAAAATAAABdZ0aFRIAAAAMgAABiJ0clRSAAAAJAAABlRmaUZJAAAARgAABnhockhSAAAAPgAABr5wbFBMAAAASgAABvxydVJVAAAAOgAAB0ZlblVTAAAAPAAAB4BhckVHAAAALAAAB7wAVgFhAGUAbwBiAGUAYwBuAOEAIABzAGkAdgDhACAAZwBhAG0AYQAgADIALAAyAEcAZQBuAGUAcgBpAHMAawAgAGcAcgDlACAAMgAsADIAIABnAGEAbQBtAGEAcAByAG8AZgBpAGwARwBhAG0AbQBhACAAZABlACAAZwByAGkAcwBvAHMAIABnAGUAbgDoAHIAaQBjAGEAIAAyAC4AMgBDHqUAdQAgAGgA7ABuAGgAIABNAOAAdQAgAHgA4QBtACAAQwBoAHUAbgBnACAARwBhAG0AbQBhACAAMgAuADIAUABlAHIAZgBpAGwAIABHAGUAbgDpAHIAaQBjAG8AIABkAGEAIABHAGEAbQBhACAAZABlACAAQwBpAG4AegBhAHMAIAAyACwAMgQXBDAEMwQwBDsETAQ9BDAAIABHAHIAYQB5AC0EMwQwBDwEMAAgADIALgAyAFAAcgBvAGYAaQBsACAAZwDpAG4A6QByAGkAcQB1AGUAIABnAHIAaQBzACAAZwBhAG0AbQBhACAAMgAsADIAwQBsAHQAYQBsAOEAbgBvAHMAIABzAHoA/AByAGsAZQAgAGcAYQBtAG0AYQAgADIALgAykBp1KHBwlo5RSV6mACAAMgAuADIAIIJyX2ljz4/wAEcAZQBuAGUAcgBpAHMAawAgAGcAcgDlACAAZwBhAG0AbQBhACAAMgAsADIALQBwAHIAbwBmAGkAbABPAGIAZQBjAG4A4QAgAWEAZQBkAOEAIABnAGEAbQBhACAAMgAuADIF0gXQBd4F1AAgBdAF5AXVBegAIAXbBdwF3AXZACAAMgAuADIAUAByAG8AZgBpAGwAbwAgAGcAcgBpAGcAaQBvACAAZwBlAG4AZQByAGkAYwBvACAAZABlAGwAbABhACAAZwBhAG0AbQBhACAAMgAsADIARwBhAG0AYQAgAGcAcgBpACAAZwBlAG4AZQByAGkAYwEDACAAMgAsADIAQQBsAGwAZwBlAG0AZQBpAG4AZQBzACAARwByAGEAdQBzAHQAdQBmAGUAbgAtAFAAcgBvAGYAaQBsACAARwBhAG0AbQBhACAAMgAsADLHfLwYACDWjMDJACCsELnIACAAMgAuADIAINUEuFzTDMd8Zm6QGnBwXqZ8+2VwACAAMgAuADIAIGPPj/Blh072TgCCLDCwMOwwpDCsMPMw3gAgADIALgAyACAw1zDtMNUwoTCkMOsDkwO1A70DuQO6A8wAIAOTA7oDwQO5ACADkwOsA7wDvAOxACAAMgAuADIAUABlAHIAZgBpAGwAIABnAGUAbgDpAHIAaQBjAG8AIABkAGUAIABjAGkAbgB6AGUAbgB0AG8AcwAgAGQAYQAgAEcAYQBtAG0AYQAgADIALAAyAEEAbABnAGUAbQBlAGUAbgAgAGcAcgBpAGoAcwAgAGcAYQBtAG0AYQAgADIALAAyAC0AcAByAG8AZgBpAGUAbABQAGUAcgBmAGkAbAAgAGcAZQBuAOkAcgBpAGMAbwAgAGQAZQAgAGcAYQBtAG0AYQAgAGQAZQAgAGcAcgBpAHMAZQBzACAAMgAsADIOIw4xDgcOKg41DkEOAQ4hDiEOMg5ADgEOIw4iDkwOFw4xDkgOJw5EDhsAIAAyAC4AMgBHAGUAbgBlAGwAIABHAHIAaQAgAEcAYQBtAGEAIAAyACwAMgBZAGwAZQBpAG4AZQBuACAAaABhAHIAbQBhAGEAbgAgAGcAYQBtAG0AYQAgADIALAAyACAALQBwAHIAbwBmAGkAaQBsAGkARwBlAG4AZQByAGkBDQBrAGkAIABHAHIAYQB5ACAARwBhAG0AbQBhACAAMgAuADIAIABwAHIAbwBmAGkAbABVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAgAHMAegBhAHIAbwFbAGMAaQAgAGcAYQBtAG0AYQAgADIALAAyBB4EMQRJBDAETwAgBEEENQRABDAETwAgBDMEMAQ8BDwEMAAgADIALAAyAC0EPwRABD4ERAQ4BDsETABHAGUAbgBlAHIAaQBjACAARwByAGEAeQAgAEcAYQBtAG0AYQAgADIALgAyACAAUAByAG8AZgBpAGwAZQY6BicGRQYnACAAMgAuADIAIAZEBkgGRgAgBjEGRQYnBi8GSgAgBjkGJwZFdGV4dAAAAABDb3B5cmlnaHQgQXBwbGUgSW5jLiwgMjAxMgAAWFlaIAAAAAAAAPNRAAEAAAABFsxjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADcAOwBAAEUASgBPAFQAWQBeAGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA8AD2APsBAQEHAQ0BEwEZAR8BJQEr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'
        }
      ]
    },
    {
      id: 'c2',
      datas: [
        {
          id: 101,
          x: 300,
          y: 300,
          width: 120,
          height: 30,
          value: '一段文字',
          type: 'p'
        },
      ]
    }
  ],
  pickingPoint: false,
  activeCard: 'c1',
  activeCardItem: null,
  lastestSnapshot: null,
  // 页数据
  pages: [],
  currentPage: -1
}

const mutations = {
  startPicking (state) {
    state.pickingPoint = true
  },
  stopPicking (state) {
    state.pickingPoint = false
  },
  addInputBlock (state, item) {
    state.pickingPoint = false
    let cardItem = state.cards.find(card => state.activeCard === card.id)
    cardItem.datas.push(item)
  },
  addImg (state, imgData) {
    let cardItem = state.cards.find(card => state.activeCard === card.id)
    cardItem.datas.push(Object.assign({ id: Date.now(), value: '', width: 120, height: 120, type: 'img', x: 400, y: 100, angle: 0 }, imgData))
  },
  resize (state, options) {
    const {id, ...attr} = options
    let composeObj = {}
    Object.keys(attr).forEach(key => {
      if (key === 'x') {
        composeObj.left = attr.x
      } else if (key === 'y') {
        composeObj.top = attr.y
      } else {
        composeObj[key] = attr[key]
      }
    })
    let curPage = getters.getCurrentPageData(state)
    let item = curPage.components.find(item => item.id === id)
    const css = Object.assign({}, item.css, composeObj)
    // console.log('resize', css)
    item.css = css
  },
  // 设置当前选项卡
  setActiveCard (state, cardId) {
    state.activeCardItem = null
    state.activeCard = cardId
  },
  // 设置当前激活段落
  setActiveCardItem (state, itemId) {
    // state.activeCardItem = itemId
    if (!itemId) {return}
    let curPage = getters.getCurrentPageData(state)
    curPage.components = curPage.components.map(item => {
      item.selected = false
      item.active = item.id === itemId
      return item
    })
  },
  // 选中
  setSelection (state, rect) {
    let curPage = getters.getCurrentPageData(state)
    curPage.components = curPage.components.map(item => {
      item.active = false
      item.isInRect(rect)
      return item
    })
  },
  setSelectionLoc (state, {rx, ry}) {
    if (rx || ry) {
      let cardItem = state.cards.find(card => state.activeCard === card.id)
      cardItem.datas = state.lastestSnapshot.map(item => {
        return Object.assign({}, item, item.selected ? { x: item.x + rx, y: item.y + ry } : {})
      })
    }
  },
  updateSnapshot(state) {
    let cardItem = state.cards.find(card => state.activeCard === card.id)
    state.lastestSnapshot = cardItem.datas.map(item => {
      return {...item}
    })
  },
  addCard (state, newItem) {
    state.cards.push(newItem)
  },
  updateInput (state, {value, id}) {
    let curPage = getters.getCurrentPageData(state)
    let item = curPage.components.find(item => item.id === id)
    item && (item.template = value)
  },
  // 初始化数据
  initPages (state, pages) {
    let interval = setInterval(() => {
      let data = pages.splice(0, 1)[0]
      if (data) {
        state.pages.push(data)
      } else {
        clearInterval(interval)
      }
    }, 500)
    // state.pages = pages
    state.currentPage = 0
  },
  switchCurrentPage (state, index) {
    state.currentPage = index
  }
}

const actions = {
  addCard ({commit}) {
    const id = Date.now()
    commit('addCard', {
      id,
      datas: []
    })
    commit('setActiveCard', id)
  },
  addParagraph ({commit}, item) {
    const id = Date.now()
    commit('addInputBlock', Object.assign({ id, value: '', width: 120, height: 30, type: 'p' }, item))
    commit('setActiveCardItem', id)
  },
  getPPTData ({commit}) {
    getPPTData().then(res => {
      let content = res.data && res.data.content
      commit('initPages', content.pages.map(item => new Page(item)))
    })
  },
  doCommand (_, {cmd, val}) {
    console.log('exec', {cmd, val})
    document.execCommand(cmd, false, val || "")
  }
}

const getters = {
  getCards: (state) => {
    return state.cards.map(card => {
      return Object.assign({active: state.activeCard === card.id}, card)
    })
  },
  getCardDatas: (state) => {
    if (state.activeCard) {
      let cardItem = state.cards.find(card => state.activeCard === card.id)
      return (cardItem && cardItem.datas.map(item => {
        return Object.assign({active: item.id === state.activeCardItem}, item)
      })) || []
    } else {
      return []
    }
  },
  // 当前页
  getCurrentPageData: (state) => {
    return state.pages[state.currentPage]
  },
  getPages: (state) => {
    return state.pages.map((item, index) => {
      return Object.assign({active: state.currentPage === index}, item)
    })
  },
  getActiveItem: (state) => {
    const curPage = getters.getCurrentPageData(state)
    return curPage && curPage.components.find(item => item.active)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
