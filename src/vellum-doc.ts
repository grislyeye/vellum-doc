import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('vellum-doc')
export class VellumDocument extends LitElement {
  static override styles = css`
    :host {
      display: block;

      padding: 0;
      margin: 0;

      --default-index-width: 300px;
      --padding-gap: calc(var(--gap) / 2);
    }

    #index {
      width: var(--index-width, var(--default-index-width));
      border-right: var(--index-divider-border, 1px solid);
      padding-right: calc(var(--gap) / 2);

      font-size: var(--index-font-size, 15px);

      h1 {
        font-size: 1.3em;
        text-align: center;
      }

      h2 {
        font-size: 1.15em;
      }

      h3 {
        font-size: 1em;
        padding-left: 1.4em;
      }

      h4 {
        font-size: 0.9em;
        padding-left: 3em;
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
        var(--index-width, var(--default-index-width)) + var(--gap, 0px)
      );
    }
  `

  get headings(): HTMLElement[] {
    return Array.from(this.querySelectorAll('h1, h2, h3, h4'))
  }

  override connectedCallback() {
    super.connectedCallback()
    this.labelHeaders()
  }

  labelHeaders() {
    this.headings.forEach(heading => {
      if (!heading.id) heading.id = Math.random().toString(36).slice(2)
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
