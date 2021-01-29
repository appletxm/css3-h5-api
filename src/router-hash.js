const RouterHash = class {
  constructor(meta) {
    this.route = {}
    this.router = {}
    this.history = []
    this.meta = meta
    this.current = null

    this.addEvent()
  }

  hitPath() {
    const hash = window.location.hash
    let hashPath = hash.replace(/^#/, '')

    console.info('*****', hashPath, hash)

    if (hashPath === '') {
      hashPath = '/'
    } 
    
    let hintItem = this.meta.find(route => {
      return route.path === hashPath
    })

    if (!hintItem) {
      hintItem = this.meta.find(route => {
        return route.path === '*'
      })
    }

    console.info('==hintItem==', hintItem)
    this.current = hintItem
    this.history.push(this.current)

    if (hintItem.component) {
      hintItem.component()
    }
  }

  calculateRoute() {
    this.hitPath()
  }

  addEvent() {
    window.addEventListener('hashchange', () => {
      this.calculateRoute()
    })
  }
}

export default RouterHash