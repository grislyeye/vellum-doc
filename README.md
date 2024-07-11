# \<vellum-doc>

A simple custom element for web publishing. Enriches plain HTML with an index
pane based on the document outline. Inspired by
[Docsify](https://docsify.js.org).

**[Demo](https://grislyeye.github.io/vellum-doc/)** |
**[Developer Guide](CONTRIBUTING.md)**

## Usage

Include the `<script>` in your markup:

```html
<script
  type="module"
  src="https://www.unpkg.com/vellum-doc@0.8.0/vellum-doc.js"></script>
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

### Anchors

Anchor links can be dynamically added to document headers using the `anchors`
attribute:

```html
<vellum-doc anchors>
  <h1>Commodi</h1>
</vellum-doc>
```

### Styling

`<vellum-doc>` exposes the `index`
[part](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts), which
can be used to style the document index, overriding styles for the
index/document divider (`border-right`) or background colour.

The element can also be customised using the following CSS variables:

| Variable               | Description                                                                                                                                         | Default                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `--index-width`        | Width of the index sidebar.                                                                                                                         | `300px`                            |
| `--gap`                | Gap between index and document.                                                                                                                     | `0`                                |
| `--index-level-1-font` | Font style of the index links to level 1 headers (`h1`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1.3em bold` with inherited font.  |
| `--index-level-2-font` | Font style of the index links to level 2 headers (`h2`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1.15em bold` with inherited font. |
| `--index-level-3-font` | Font style of the index links to level 3 headers (`h3`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `1em` with inherited font.         |
| `--index-level-4-font` | Font style of the index links to level 4 headers (`h4`) as defined by the [`font` property](https://developer.mozilla.org/en-US/docs/Web/CSS/font). | `0.9em` with inherited font.       |

For example:

```css
vellum-doc {
  --gap: 50px;
  --index-level-1-font: bold 2.5em Alegreya;
}

vellum-doc::part(index) {
  border-right: dashed red;
  padding-left: 10px;
  padding-right: 10px;
}
```
