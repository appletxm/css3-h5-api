/* global alert */
const defaultConfig = {
  autoplay: false,
  preload: 'auto',
  controls: false,
  defaultMuted: false,
  loop: false,
  isH5: true,
  src: '',
  bindDom: null,
  width: 480,
  height: 270,
  type: 'video/mp4',
  poster: ''
}

const HAVE_ENOUGH_DATA = 4

const Video = function (options) {
  this.player = null
  this.playBtn = null
  this.fullBtn = null
  this.currentTimeDom = null
  this.options = Object.assign(defaultConfig, options)
  this.checkTimer = 0
  this.checkStep = 0
  this.durationTimer = 0
  this.isReady = false
  this.isPause = null
  this.isFull = false
  this.init()
}

Video.prototype = {
  init() {
    if (!this.options.src) {
      alert('please give a correct video url')
      return false
    }
    this.createVideo()
    this.createController()

    this.checkCanPlay((res) => {
      this.isReady = res
    })
  },

  createController() {
    const opts = this.options
    const div = document.createElement('div')
    div.setAttribute('class', 'video-control')
    div.innerHTML = `
      <div class="duration">
        <span class="time-bar"></span>
        <span class="current-bar"></span>
        <span class="skip-show-time"></span>
      </div>
      <span class="ctl-btn full-screen">full</span>
      <span class="ctl-btn play-btn">play</span>
    `

    if (opts.bindDom) {
      opts.bindDom.appendChild(div)
    } else {
      document.body.appendChild(div)
    }

    this.playBtn = div.querySelector('.play-btn')
    this.fullBtn = div.querySelector('.full-screen')
    this.currentTimeDom = div.querySelector('.current-bar')

    this.playBtn.addEventListener('click', () => {
      if (this.isPause === true || this.isPause === null) {
        this.play()
      } else {
        this.pause()
      }
    })

    this.fullBtn.addEventListener('click', () => {
      this.toggleScreen()
    })
  },

  createVideo() {
    const opts = this.options
    const videoDom = document.createElement('video')
    // let width = 0
    // let height = 0

    // if (opts.bindDom) {
    //   const rect = opts.bindDom.getBoundingClientRect()
    //   width = rect.width
    //   height = rect.height
    // } else {
    //   width = opts.width
    //   height = opts.height
    // }
    // const styles = `width: 100%; height: 100%;`
    // videoDom.setAttribute('style', styles)
    opts.controls && videoDom.setAttribute('controls', opts.controls)
    opts.preload && videoDom.setAttribute('preload', opts.preload)
    opts.loop && videoDom.setAttribute('loop', opts.loop)
    opts.autoplay && videoDom.setAttribute('autoplay', opts.autoplay)
    opts.poster && videoDom.setAttribute('poster', opts.poster)
    videoDom.setAttribute('type', opts.type)
    videoDom.setAttribute('src', opts.src)

    videoDom.addEventListener('ended', () => {
      this.isPause = true
      this.playBtn.innerText = 'play'
    })

    if (opts.bindDom) {
      opts.bindDom.appendChild(videoDom)
    } else {
      document.body.appendChild(videoDom)
    }

    this.player = videoDom
  },

  checkCanPlay(isOkCb) {
    clearTimeout(this.checkTimer)
    this.checkTimer = setTimeout(() => {
      console.info('this.player.readyState:', this.player.readyState)
      if (this.player.readyState === HAVE_ENOUGH_DATA) {
        clearTimeout(this.checkTimer)
        isOkCb(true)
      } else {
        this.checkCanPlay(isOkCb)
      }
    }, this.checkStep)
  },

  activeDuration() {
    clearTimeout(this.durationTimer)
    this.durationTimer = setTimeout(() => {
      this.currentTimeDom.setAttribute('style', `width: ${(this.player.currentTime / this.player.duration) * 100}%`)
      this.activeDuration()
    }, this.checkStep)
  },

  pause() {
    if (this.isPause === false) {
      this.player.pause()
      this.isPause = true
      this.playBtn.innerText = 'play'
    }
  },

  play() {
    if (this.isReady === true) {
      this.player.play()
      this.activeDuration()
      this.playBtn.innerText = 'pause'
      this.isPause = false
    }
  },

  maxScreen() {
    this.isFull = true
    const dom = this.options.bindDom
    if (document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled) {
      if (dom.requestFullscreen) {
        dom.requestFullscreen()
      } else if (dom.webkitRequestFullscreen) {
        dom.webkitRequestFullscreen()
      } else if (dom.mozRequestFullScreen) {
        dom.mozRequestFullScreen()
      } else if (dom.msRequestFullscreen) {
        dom.msRequestFullscreen()
      }
    }
  },

  minScreen() {
    this.isFull = false
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  },

  toggleScreen() {
    if (this.isFull === false) {
      this.maxScreen()
      this.fullBtn.innerText = 'exit'
    } else {
      this.minScreen()
      this.fullBtn.innerText = 'full'
    }
  }
}

export default Video
