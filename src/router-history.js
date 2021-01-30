const RouterHistory = class {
  constructor(meta) {
    this.rootPath = window.location.pathname
    this.route = {}
    this.router = {}
    this.history = []
    this.meta = meta
    this.current = null

    this.buildNavList()
    this.addEvent()
  }

  buildNavList() {
    const fragment = document.createDocumentFragment()

    this.meta.forEach(route => {
      const a = document.createElement('a')
      a.setAttribute('href', route.path)
      a.innerText = route.meta.title
      
      a.addEventListener('click', this.changeRouter.bind(this))

      fragment.append(a)
    })
    document.querySelector('.nav').append(fragment)
  }

  changeRouter(event) {
    this.getHimtRoute(event.currentTarget.getAttribute('href'))
    this.routePage()

    event.stopPropagation()
    event.preventDefault()
  }

  getHimtRoute(path) {
    let hintItem = this.meta.find(route => {
      return route.path === path
    })

    if (!hintItem) {
      hintItem = this.meta.find(route => {
        return route.path === '*'
      })
    }

    // console.info('==hintItem==', hintItem)
    this.current = hintItem
  }

  hitPath() {
    const { pathname } = window.location
    let path = '/'

    // console.info('path:', this.rootPath, pathname)

    if (pathname === this.rootPath) {
      path = '/'
    }
    
    this.getHimtRoute(path)
    this.routePage()
  }

  routePage() {
    const { component, meta, path, name} = this.current
    // console.info(component, path)
    const skipPage = this.rootPath + (path === '/' ? '' : path)

    component({router: this})

    window.history.pushState({
      name: name,
      path: path
    }, meta.title, skipPage)
  }

  calculateRoute() {
    this.hitPath()
  }

  rerenderRoute(event) {
    // getHimtRoute
    const {state} = event

    if (state) {
      const {path} = state
      this.getHimtRoute(path)
      const { component } = this.current
      component({router: this})
    }
  }

  addEvent() {
    window.addEventListener('load', () => {
      this.calculateRoute()
    })
    window.addEventListener('popstate', (event) => {
      // this.calculateRoute()
      // alert("location: " + document.location + ", state: " + JSON.stringify(event.state))
      this.rerenderRoute(event)
    })
  }
}

export default RouterHistory