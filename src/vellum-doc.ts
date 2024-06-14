import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = css`
    :host {
      display: flex;

      padding: 0;
      margin: 0;

      --default-index-width: 300px;
    }

    #sidebar {
      float: left;
      min-width: var(--index-width, var(--default-index-width));
      font-size: 15px;
    }

    #sidebar h1 {
      font: var(--index-level-1-font, bold 1.3em 'inherit');
      margin: 0;
      padding-top: 1em;
      padding-bottom: 0.5em;
      line-height: 1em;
      text-align: center;
    }

    #sidebar h2 {
      font: var(--index-level-2-font, bold 1.15em 'inherit');
    }

    #sidebar h3 {
      font: var(--index-level-3-font, 1em 'inherit');
      padding-left: 1.4em;
    }

    #sidebar h4 {
      padding-left: 3em;
      font: var(--index-level-4-font, 0.9em 'inherit');
    }

    #sidebar a {
      color: inherit;
      text-decoration: inherit;
    }

    .scrollable {
      width: var(--index-width, var(--default-index-width));
      max-height: 100vh;
      position: fixed;
      top: 0;
      overflow-y: auto;
    }

    #index {
      border-right: 1px solid;
    }

    @media (max-width: 700px) {
      #document {
        margin-left: 0;
      }

      #index {
        display: none;
      }
    }
  `

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
      }
    })
  }

  override render() {
    return html`
      <div id="sidebar">
        <div class="scrollable">
          <div id="index" part="index">${this.renderIndex()}</div>
        </div>
      </div>

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
}

declare global {
  interface HTMLElementTagNameMap {
    'vellum-doc': VellumDocument
  }
}
