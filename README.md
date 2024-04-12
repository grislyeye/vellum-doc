# \<vellum-doc>

A simple document web component for web publishing. Creates and index

**[Demo](https://grislyeye.github.io/vellum-docs/)**

## Installation

```bash
npm i vellum-doc
```

### Usage

```html
<script type="module">
  import 'vellum-doc/vellum-doc.js'
</script>

<vellum-doc>
  <h1>Commodi</h1>
  <p>
    Lorem ipsum dolor sit amet. Id omnis amet sit autem voluptas et dicta
    consequatur ut amet rerum ad consequatur nemo ea necessitatibus enim. Aut
    velit accusantium qui molestiae beatae ad sunt odit sit recusandae sapiente
    id tempora mollitia nam praesentium laborum rem molestiae placeat.
  </p>
  <h2>Et nobis reprehenderit quo minus iste sit dolore ipsam!</h2>
  <p>
    Ut quam odio et quae unde ut sunt quas qui unde cupiditate? 33 sequi
    molestiae quo autem vitae ut itaque nisi aut quod esse qui quibusdam labore
    ut voluptatibus sequi sit sapiente galisum. Nam facilis aspernatur et eius
    perspiciatis eum eveniet omnis aut repudiandae rerum ut sunt assumenda?
  </p>
</vellum-doc>
```

The element can be customized using the following CSS variables:

| Variable                 | Description                                                                                                                                         | Default                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `--index-width`          | Width of the index sidebar.                                                                                                                         | `300px`                            |
| `--index-divider-border` | Border style of the index/document divider (as the [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border)) declaration                   | `1px solid`                        |
| `--index-font-size`      | Base font size for the index.                                                                                                                       | `15px`                             |
| `--gap`                  | Gap between index and document.                                                                                                                     | `0`                                |
| `--index-font-family`    | Font family of the document index.                                                                                                                  | `san-serif`                        |
| `--index-level-1-font`   | Font style of the index links to level 1 headers (`h1`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1.3em bold` with inherited font.  |
| `--index-level-2-font`   | Font style of the index links to level 2 headers (`h2`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1.15em bold` with inherited font. |
| `--index-level-3-font`   | Font style of the index links to level 3 headers (`h3`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1em` with inherited font.         |
| `--index-level-4-font`   | Font style of the index links to level 4 headers (`h4`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `0.9em` with inherited font.       |

## Setup

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce JavaScript that runs in
modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following
command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict.
You may want to change `tsconfig.json` to make them less strict.

## Dev Server

This sample uses modern-web.dev's
[@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing
the project without additional build steps. Web Dev Server handles resolving
Node-style "bare" import specifiers, which aren't supported in browsers. It also
automatically transpiles JavaScript and adds polyfills to support older
browsers. See
[modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/)
for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view
at http://localhost:8000/dev/index.html. Note that this command will serve your
code using Lit's development mode (with more verbose errors). To serve your code
against Lit's production mode, use `npm run serve:prod`.

## Editing

If you use VS Code, we highly recommend the
[lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin),
which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't
already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and
[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In
addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to
type-check and lint lit-html templates with the same engine and rules as
lit-plugin.

The rules are mostly the recommended rules from each project, but some have been
turned off to make LitElement usage easier. The recommended rules are pretty
strict, so you may want to relax them by editing `.eslintrc.json` and
`tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been
pre-configured according to the Lit's style. You can change this in
`.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be
added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/)
site for instructions.
