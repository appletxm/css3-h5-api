const template = `
<div class="wrapper">
  <h1></h1>
  <p></p>
  <img/>
  <button>this click</button>
  <slot name="my-text">My default text</slot>
</div>
`

function createTemplate() {
  const tempDom = document.createElement('template')
  tempDom.id = 'element-details-template'

  const wrapper = document.createElement('div')
  wrapper.setAttribute('class', 'wrapper')

  const h1 = document.createElement('h1')
  const p = document.createElement('p')
  const img = document.createElement('img')
  const btn = document.createElement('button')
  btn.textContent = 'this click'

  const slot = document.createElement('slot')
  slot.setAttribute('name', 'my-slot')
  slot.textContent = 'My default text'

  wrapper.append(h1, p, img, btn, slot)

  tempDom.append(wrapper)

  return tempDom
}

const tempDom = createTemplate()

function createCustomElement() {
  let MyCustomElement = class extends HTMLElement {
    constructor() {
      super()

      const shadowRoot = this.attachShadow({mode: 'open'}) // mode: 'open' | 'closed'

      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('href', 'js-web-component.css')

      // const template = document.getElementById('element-details-template').content
      const child = tempDom.querySelector('.wrapper').cloneNode(true)

      child.querySelector('h1').innerText = this.getAttribute('title')
      child.querySelector('p').innerText = this.getAttribute('content')
      child.querySelector('img').setAttribute('src',  this.getAttribute('img'))

      child.querySelector('button').addEventListener('click', function() {
        console.info('click event:', shadowRoot.querySelector('p').textContent)
        shadowRoot.querySelector('p').textContent = 'a new details'
      })

      shadowRoot.append(linkElem, child)

      // this.append(linkElem)
      // this.append(child)
    }

    connectedCallback(event) {
      console.info('connectedCallback:', event)
    }

    disconnectedCallback(event) {
      console.info('disconnectedCallback:', event)
    }

    adoptedCallback(event) {
      console.info('adoptedCallback:', event)
    }

    attributeChangedCallback(event) {
      console.info('attributeChangedCallback:', event)
    }
  }

  return MyCustomElement
}

function getCustomElementRegistry(label, className) {
  window.customElements.define(label, className)
}

getCustomElementRegistry('my-custom-element', createCustomElement())
