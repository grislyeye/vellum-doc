import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import { LionDrawer } from '@lion/ui/drawer.js'

import styles from './vellum-doc.css'
import toggleIcon from './hamburger-circle.svg'

import '@lion/ui/define/lion-drawer.js'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = unsafeCSS(styles)

  @property({ type: Boolean })
  anchors?: boolean

  private slugify = slugifyWithCounter()

  get headings(): HTMLElement[] {
    return Array.from(this.querySelectorAll('h1, h2, h3, h4'))
  }

  get drawer(): LionDrawer | null {
    return this.renderRoot.querySelector('#drawer')
  }

  get toggle(): HTMLElement | null {
    return this.renderRoot.querySelector('#toggle')
  }

  override connectedCallback() {
    super.connectedCallback()
    this.labelHeaders()
    this.exportIndexHeadingParts()
    this.enableMobileIndexVisibility()
  }

  override firstUpdated(): void {
    this.checkIndexVisibility()
  }

  override updated() {
    if (this.anchors) this.anchorHeadings()
  }

  override render() {
    return html`
      <lion-drawer
        id="drawer"
        @click="${() => this.checkIndexVisibility()}"
        opened
        hide>
        <div slot="content">
          <nav id="index" class="scrollable" part="index">
            ${this.renderIndex()}
          </nav>
        </div>
      </lion-drawer>

      <article id="document">
        <div id="toggle" class="hidden" @click="${() => this.toggleIndex()}">
          ${unsafeSVG(toggleIcon)}
        </div>
        <div id="content" @click="${() => this.checkIndexVisibility()}">
          <slot></slot>
        </div>
      </article>
    `
  }

  private renderIndex() {
    const index: [HTMLElement, string][] = this.headings.map(heading => [
      heading.cloneNode(true) as HTMLElement,
      heading.id
    ])

    index.forEach(([heading]: [HTMLElement, string]) =>
      heading.removeAttribute('id')
    )

    return index.map(
      ([heading, id]: [HTMLElement, string]) =>
        html`<a href="#${id}">${heading}</a>`
    )
  }

  labelHeaders() {
    this.headings.forEach(heading => {
      if (!heading.id) {
        const newId = heading.textContent
          ? this.slugify(heading.textContent)
          : Math.random().toString(36).slice(2)

        heading.id = newId
      }
    })
  }

  anchorHeadings() {
    this.headings.forEach(heading => {
      const spacing = document.createTextNode(' ')
      heading.append(spacing)

      const anchor = document.createElement('a')
      anchor.href = `#${heading.id}`
      anchor.innerHTML = '#'
      anchor.className = 'anchor'
      anchor.title = heading.textContent ? heading.textContent : ''

      heading.append(anchor)
    })
  }

  exportIndexHeadingParts() {
    this.headings.forEach(heading => {
      heading.part.add(`index-${heading.localName}`)
    })
  }

  enableMobileIndexVisibility() {
    const checkIndexVisibility = this.checkIndexVisibility.bind(this)
    window.addEventListener('resize', checkIndexVisibility)
  }

  toggleIndex() {
    if (this.drawer) this.drawer.toggle()
  }

  hideToggle() {
    if (this.toggle) {
      this.toggle.classList.remove('show')
      this.toggle.classList.add('hide')
    }
  }

  showToggle() {
    if (this.toggle) {
      this.toggle.classList.remove('hide')
      this.toggle.classList.add('show')
      this.toggle.style.visibility = 'visible'
    }
  }

  checkIndexVisibility() {
    if (window.innerWidth < 700) this.showToggle()

    if (window.innerWidth < 700 && this.drawer && this.drawer.opened) {
      this.toggleIndex()
    }

    if (window.innerWidth >= 700) this.hideToggle()

    if (window.innerWidth >= 700 && this.drawer && !this.drawer.opened) {
      this.toggleIndex()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vellum-doc': VellumDocument
  }
}
