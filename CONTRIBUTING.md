# Developer Guide

You can start getting involved by picking up one of the
[help wanted issues](https://github.com/grislyeye/vellum-doc/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22+no%3Aassignee).

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
npm start
```

There is a demo HTML file located at `/index.html` that you can view at
http://localhost:8000/. Note that this command will serve your code using Lit's
development mode (with more verbose errors). To serve your code against Lit's
production mode, use `npm run serve:prod`.

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

You can automatically fix most formatting problems by running:

```shell
npm run lint:fix
```
