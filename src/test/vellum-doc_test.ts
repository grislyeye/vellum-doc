import { VellumDocument } from '../vellum-doc.js';

import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

suite('vellum-doc', () => {
  test('is defined', () => {
    const el = document.createElement('vellum-doc');
    assert.instanceOf(el, VellumDocument);
  });

  test('display as block', async () => {
    const el = (await fixture(html`<vellum-doc></vellum-doc>`)) as VellumDocument;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).display, 'block');
  });
});
