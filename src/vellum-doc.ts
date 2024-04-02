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
      border-right: var(--index-divider-border, 1px solid);
      padding-right: calc(var(--gap) / 2);

      --font-family: var(--index-font-family, san-serif);

      font-size: var(--index-font-size, 15px);

      h1 {
        font: var(--index-level-1-font, bold 1.3em var(--font-family));
        text-align: center;
      }

      h2 {
        font: var(--index-level-2-font, bold 1.15em var(--font-family));
      }

      h3 {
        font: var(--index-level-3-font, 1em var(--font-family));
        padding-left: 1.4em;
      }

      h4 {
        padding-left: 3em;
        font: var(--index-level-4-font, 0.9em var(--font-family));
      }

      a {
        color: inherit;
        text-decoration: inherit;
      }
    }

    .scrollable {
      max-height: 100vh;
      position: fixed;
      top: 0;
      overflow-y: auto;
    }

    #document {
      margin-left: calc(
        var(--index-width, var(--default-index-width)) + var(--gap) / 2
      );
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
      <div id="index" class="scrollable">${this.renderIndex()}</div>
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
