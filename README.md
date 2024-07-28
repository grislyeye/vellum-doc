# \<vellum-doc> [![Test](https://github.com/grislyeye/vellum-doc/actions/workflows/test.yml/badge.svg)](https://github.com/grislyeye/vellum-doc/actions/workflows/test.yml)

A custom element to turn plain HTML into rich documents. Inspired by
[Docsify](https://docsify.js.org).

**[Demo](https://grislyeye.github.io/vellum-doc/)** |
**[Developer Guide](CONTRIBUTING.md)** |
**[Roadmap](https://github.com/grislyeye/vellum-doc/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)**
|
**[Known Issues](https://github.com/grislyeye/vellum-doc/issues?q=is%3Aissue+is%3Aopen+label%3Abug)**

Features include:

- Document index pane
- Stow index pane on mobile devices
- Automatically generate anchor links (optional)

## Usage

Include the `<script>` in your markup:

```html
<script
  type="module"
  src="https://www.unpkg.com/vellum-doc@0.9.0/vellum-doc.js"></script>
```

Or, if you host the script as part of your project (recommended):

```html
<script type="module">
  import 'vellum-doc/vellum-doc.js'
</script>
```

Example:

```html
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

Works best with smooth scrolling enabled:

```css
html {
  scroll-behavior: smooth;
}
```

### Anchors

Anchor links can be dynamically added to document headers using the `anchors`
attribute:

```html
<vellum-doc anchors>
  <h1>Commodi</h1>
</vellum-doc>
```

### Styling

`<vellum-doc>` exposes CSS custom properties and shadow parts that can be used
to style the document index.

Supports the following CSS variables:

| Variable        | Description                 | Default |
| --------------- | --------------------------- | ------- |
| `--index-width` | Width of the index sidebar. | `300px` |

Supports the following
[shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts):

| Part       | Description                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| `index`    | The index pane container. Can be used to set padding, style the index divider (`border-right`), etc. |
| `index-h1` | `h1` items in the index.                                                                             |
| `index-h2` | As above, but for `h2` items.                                                                        |
| `index-h3` | As above, but for `h3` items.                                                                        |
| `index-h4` | As above, but for `h4` items.                                                                        |

For example:

```css
vellum-doc {
  --index-width: 250px;
}

vellum-doc::part(index) {
  border-right: dashed red;
  padding-left: 10px;
  padding-right: 10px;
}

vellum-doc::part(index-h1) {
  color: red;
}
```
