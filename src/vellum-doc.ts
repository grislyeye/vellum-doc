import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import '@lion/ui/define/lion-drawer.js'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = css`
    :host {
      display: flex;

      padding: 0;
      margin: 0;

      --default-index-width: 300px;
    }

    #drawer {
      position: sticky;
      top: 0;
      --min-width: 0;
    }

    #toggle {
      position: fixed;
      bottom: 1.5em;
      left: 1.5em;
      height: 50px;
      width: 50px;
    }

    #index {
      width: var(--index-width, var(--default-index-width));
      border-right: 1px solid;
      padding-bottom: 1em;
    }

    .scrollable {
      min-height: 100vh;
      max-height: 100vh;
      overflow-y: scroll;
      position: sticky;
    }

    #index h1 {
      font: bold 1.3em inherit;
      margin: 0;
      padding-top: 1em;
      padding-bottom: 0.5em;
      line-height: 1em;
      text-align: center;
    }

    #index h2 {
      font: bold 1.15em inherit;
    }

    #index h3 {
      font: 1em inherit;
      padding-left: 1.4em;
    }

    #index h4 {
      padding-left: 3em;
      font: var(--index-level-4-font, 0.9em 'inherit');
    }

    #index a {
      color: inherit;
      text-decoration: inherit;
    }
  `

  @property({ type: Boolean })
  anchors?: boolean

  private slugify = slugifyWithCounter()

  get headings(): HTMLElement[] {
    return Array.from(this.querySelectorAll('h1, h2, h3, h4'))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get drawer(): any | null {
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

  checkIndexVisibility() {
    if (window.innerWidth < 700 && this.toggle) {
      this.toggle!.style.visibility = 'visible'
    }

    if (window.innerWidth < 700 && this.drawer && this.drawer.opened) {
      this.toggleIndex()
    }

    if (window.innerWidth >= 700 && this.toggle) {
      this.toggle.style.visibility = 'hidden'
    }

    if (window.innerWidth >= 700 && this.drawer && !this.drawer.opened) {
      this.toggleIndex()
    }
  }

  override render() {
    return html`
      <lion-drawer
        id="drawer"
        @click="${this.checkIndexVisibility}"
        opened
        hide>
        <div slot="content">
          <div id="index" class="scrollable" part="index">
            ${this.renderIndex()}
          </div>
        </div>
      </lion-drawer>

      <article id="document">
        <div>
          <svg  id="toggle" class="icon"  @click="${this.toggleIndex}" viewBox="0 0 64 64" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g>
                <g transform="matrix(1.56894,0,0,1.46939,-3.65277,-8.41383)">
                    <ellipse cx="22.724" cy="27.504" rx="20.396" ry="21.778" style="fill:rgb(211,211,211);"/>
                </g>
                <g transform="matrix(0.789127,0,0,0.789127,6.42717,6.64457)">
                    <path d="M46.549,18.679L18.264,18.679C17.159,18.679 16.264,19.575 16.264,20.679C16.264,21.783 17.159,22.679 18.264,22.679L46.549,22.679C47.654,22.679 48.549,21.783 48.549,20.679C48.549,19.575 47.654,18.679 46.549,18.679Z" style="fill:rgb(29,29,27);fill-rule:nonzero;"/>
                    <path d="M46.549,30.119L18.264,30.119C17.159,30.119 16.264,31.015 16.264,32.119C16.264,33.223 17.159,34.119 18.264,34.119L46.549,34.119C47.654,34.119 48.549,33.223 48.549,32.119C48.549,31.015 47.654,30.119 46.549,30.119Z" style="fill:rgb(29,29,27);fill-rule:nonzero;"/>
                    <path d="M46.549,41.583L18.264,41.583C17.159,41.583 16.264,42.479 16.264,43.583C16.264,44.687 17.159,45.583 18.264,45.583L46.549,45.583C47.654,45.583 48.549,44.687 48.549,43.583C48.549,42.479 47.654,41.583 46.549,41.583Z" style="fill:rgb(29,29,27);fill-rule:nonzero;"/>
                </g>
            </g>
          </svg>
        </div>
        <div id="content" @click="${this.checkIndexVisibility}">
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

  override updated() {
    if (this.anchors) this.anchorHeadings()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vellum-doc': VellumDocument
  }
}
