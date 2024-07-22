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

    .invoker {
    }

    #index {
      width: var(--index-width, var(--default-index-width));
      border-right: 1px solid;
      padding-bottom: 1em;
    }

    /* .scrollable {
      min-height: 100vh;
      max-height: 100vh;
      position: fixed;
      top: 0;
      overflow-y: auto;
    } */

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

    @media (max-width: 700px) {
      #document {
        margin-left: 0;
      }
    }
  `

  @property({ type: Boolean })
  anchors?: boolean

  private slugify = slugifyWithCounter()

  get headings(): HTMLElement[] {
    return Array.from(this.querySelectorAll('h1, h2, h3, h4'))
  }

  override connectedCallback() {
    super.connectedCallback()
    this.labelHeaders()
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
      <lion-drawer opened hide>
        <button class="invoker" slot="invoker">OPEN</button>
        <div slot="content">
          <div id="index" class="scrollable" part="index">${this.renderIndex()}</div>
        </div>
      </lion-drawer>

      <article id="document">
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
