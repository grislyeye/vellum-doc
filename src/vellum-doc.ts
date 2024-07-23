import { LitElement, html, css, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js'

import { SlDrawer } from '@shoelace-style/shoelace'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = css`
    :host {
      display: flex;

      padding: 0;
      margin: 0;

      --default-index-width: 300px;
    }

    #opener {
      position: sticky;
    }

    #drawer {
      --size: var(--index-width, var(--default-index-width));
    }

    #index {
      min-height: 100vh;
      border-right: 1px solid;
      padding-bottom: 1em;
      background: white;
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

    #document {
      margin-left: var(--index-width, var(--default-index-width));
    }

    @media (max-width: 700px) {
      #document {
        margin-left: 0;
      }

      #sidebar {
        display: none;
      }
    }
  `

  @property({ type: Boolean })
  anchors?: boolean

  private slugify = slugifyWithCounter()

  get headings(): HTMLElement[] {
    return Array.from(this.querySelectorAll('h1, h2, h3, h4'))
  }

  get drawer(): SlDrawer | null {
    return this.shadowRoot!.querySelector('#drawer')
  }

  override connectedCallback() {
    super.connectedCallback()
    this.labelHeaders()
  }

  protected override firstUpdated() {
    this.drawer!.addEventListener('sl-request-close', event => {
      if (event.detail.source === 'overlay') {
        event.preventDefault();
      }
    });
  }

  showDrawer() {
    this.drawer?.show()
  }

  labelHeaders() {
    this.headings.forEach(heading => {
      if (!heading.id) {
        const newId = heading.textContent
          ? this.slugify(heading.textContent)
          : Math.random().toString(36).slice(2)

        heading.id = newId
        heading.part.add(`index-${heading.localName}`)
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

  override render() {
    return html`
      <sl-drawer id="drawer" placement="start" no-header open>
        <div id="index" part="index">${this.renderIndex()}</div>
      </sl-drawer>

      <article id="document">
        <sl-button id="opener" @click="${this.showDrawer}">Open Drawer</sl-button>
        <slot></slot>
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
