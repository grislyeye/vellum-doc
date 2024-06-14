import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = css`
    :host {
      display: block;

      padding: 0;
      margin: 0;

      --default-index-width: 300px;
    }

    #index {
      width: var(--index-width, var(--default-index-width));
      border-right: 1px solid;
      padding-right: calc(var(--gap, 0px) / 2);
      min-height: 100vh;
      font-size: 15px;
    }

    #index h1 {
      font: var(--index-level-1-font, bold 1.3em 'inherit');
      line-height: 1em;
      text-align: center;
    }

    #index h2 {
      font: var(--index-level-2-font, bold 1.15em 'inherit');
    }

    #index h3 {
      font: var(--index-level-3-font, 1em 'inherit');
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

    .scrollable {
      max-height: 100vh;
      position: fixed;
      top: 0;
      overflow-y: auto;
    }

    #document {
      margin-left: calc(
        var(--index-width, var(--default-index-width)) + var(--gap, 0px)
      );
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
      <div id="index" part="index" class="scrollable">
        ${this.renderIndex()}
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
