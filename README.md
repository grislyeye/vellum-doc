# \<vellum-doc>

Documentation custom element, in the style of Docsify.js. Just write your docs in plain old HTML, and get a bunch of pretty features automatically.

Features include:

  * Automatically generate index sidebar.

## Installation

```bash
npm i vellum-doc
```

## Usage

```html
<script type="module">
  import 'vellum-doc/vellum-doc.js';
</script>

<vellum-doc>
  <section slot="content">
    <h1 id="header">Header</h1>

    <h2 id="test-1">Test 1</h2>

    <h3 id="test-2">Test 2</h3>

    <h4 id="test-3">Test 3</h3>

    <h4 id="test-4">Test 4</h3>
  </section>
</vellum-doc>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
