import { html, css, LitElement } from 'lit';
import { default as createOutline } from 'h5o';
import '@lion/ui/define/lion-drawer.js';

export class VellumDoc extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 100%;
      }

      #sidebar {
        background-color: #efefef;
        position: fixed;
        left: 0;
        top: 0;
        --min-width: 0;
        --max-width: 15em;
        font-weight: bold;
        padding-top: 10em;
        padding-left: 2em;
        padding-right: 2em;
        font-size: 10px;
      }

      #sidebar h1 {
        text-align: center;
        font-size: 35px;
        line-height: 1em;
        margin-bottom: 2em;
      }

      #sidebar a {
        outline: none;
        text-decoration: none;
      }

      #sidebar a:link {
        color: black;
      }

      #sidebar a:hover {
        color: black;
        text-decoration: underline;
      }

      #sidebar a:visited {
        color: black;
      }

      ul#index > li {
        font-variant-caps: small-caps;
        font-size: 2em;
      }

      ul#index > li > ul {
        font-variant-caps: normal;
        font-weight: normal;
        margin-left: 1em;
        font-size: 18px;
      }

      ul#index li {
        margin: 6px 0;
      }

      ul#index,
      #index ul {
        list-style-type: none;
        padding-left: 0;
        line-height: 1.5em;
      }

      .toggle {
        position: fixed;
        top: 0;
        left: 0;
        font-size: 18px;
        color: black;
        padding: 1em;
        margin: 2.5em;
        background-color: lightgray;
        border-radius: 50%;
      }

      .toggle:hover {
        color: white;
      }

      #document {
        padding-top: 6em;
        padding-left: 5em;
      }
    `;
  }

  static get properties() {
    return {
      depth: { type: Number },
      title: { type: String }
    };
  }

  constructor() {
    super();
    this.depth = 3;
  }

  render() {
    return html`
      <lion-drawer id="sidebar">
        <svg class="toggle" slot="invoker" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>

        <div slot="content">
          ${this.renderIndex()}
        </div>
      </lion-drawer>

      <article id="document">
        <slot name="content"></slot>
      </article>
    `;
  }

  renderIndex() {
    const renderIndexHeader = (section) => {
      const heading = section.heading;
      return html`
        <h1><a href="#${heading.id}">${heading.textContent}</a></h1>

          ${
            section.sections.length > 0 ? html`<ul id="index">${section.sections.map(renderSubIndex(0))}</ul>` : html``
          }
        <li>
      `
    };

    const renderSubIndex = (currentDepth) => (section) => {
      if (currentDepth > this.depth) return html``

      const heading = section.heading;
      return html`
        <li>
          <p><a href="#${heading.id}">${heading.textContent}</a></p>

          ${
            section.sections.length > 0 ? html`<ul>${section.sections.map(renderSubIndex(currentDepth + 1))}</ul>` : html``
          }
        <li>
      `
    };

    return this.outline()
      .sections
      .map(renderIndexHeader)
  }

  get contentElement() {
    return this.querySelector('*[slot="content"]')
  }

  outline() {
    return createOutline(this.contentElement);
  }
}
