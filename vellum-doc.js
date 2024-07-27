"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
      if (decorator = decorators[i5])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t6, e7, o7) {
      if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t6, this.t = e7;
    }
    get styleSheet() {
      let t6 = this.o;
      const s4 = this.t;
      if (e && void 0 === t6) {
        const e7 = void 0 !== s4 && 1 === s4.length;
        e7 && (t6 = o.get(s4)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && o.set(s4, t6));
      }
      return t6;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
  var i = (t6, ...e7) => {
    const o7 = 1 === t6.length ? t6[0] : e7.reduce((e8, s4, o8) => e8 + ((t7) => {
      if (true === t7._$cssResult$) return t7.cssText;
      if ("number" == typeof t7) return t7;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s4) + t6[o8 + 1], t6[0]);
    return new n(o7, t6, s);
  };
  var S = (s4, o7) => {
    if (e) s4.adoptedStyleSheets = o7.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
    else for (const e7 of o7) {
      const o8 = document.createElement("style"), n5 = t.litNonce;
      void 0 !== n5 && o8.setAttribute("nonce", n5), o8.textContent = e7.cssText, s4.appendChild(o8);
    }
  };
  var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
    let e7 = "";
    for (const s4 of t7.cssRules) e7 += s4.cssText;
    return r(e7);
  })(t6) : t6;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t6, s4) => t6;
  var u = { toAttribute(t6, s4) {
    switch (s4) {
      case Boolean:
        t6 = t6 ? l : null;
        break;
      case Object:
      case Array:
        t6 = null == t6 ? t6 : JSON.stringify(t6);
    }
    return t6;
  }, fromAttribute(t6, s4) {
    let i5 = t6;
    switch (s4) {
      case Boolean:
        i5 = null !== t6;
        break;
      case Number:
        i5 = null === t6 ? null : Number(t6);
        break;
      case Object:
      case Array:
        try {
          i5 = JSON.parse(t6);
        } catch (t7) {
          i5 = null;
        }
    }
    return i5;
  } };
  var f = (t6, s4) => !i2(t6, s4);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t6) {
      this._$Ei(), (this.l ??= []).push(t6);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t6, s4 = y) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.elementProperties.set(t6, s4), !s4.noAccessor) {
        const i5 = Symbol(), r6 = this.getPropertyDescriptor(t6, i5, s4);
        void 0 !== r6 && e2(this.prototype, t6, r6);
      }
    }
    static getPropertyDescriptor(t6, s4, i5) {
      const { get: e7, set: h3 } = r2(this.prototype, t6) ?? { get() {
        return this[s4];
      }, set(t7) {
        this[s4] = t7;
      } };
      return { get() {
        return e7?.call(this);
      }, set(s5) {
        const r6 = e7?.call(this);
        h3.call(this, s5), this.requestUpdate(t6, r6, i5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t6) {
      return this.elementProperties.get(t6) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties"))) return;
      const t6 = n2(this);
      t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized"))) return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t7 = this.properties, s4 = [...h(t7), ...o2(t7)];
        for (const i5 of s4) this.createProperty(i5, t7[i5]);
      }
      const t6 = this[Symbol.metadata];
      if (null !== t6) {
        const s4 = litPropertyMetadata.get(t6);
        if (void 0 !== s4) for (const [t7, i5] of s4) this.elementProperties.set(t7, i5);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t7, s4] of this.elementProperties) {
        const i5 = this._$Eu(t7, s4);
        void 0 !== i5 && this._$Eh.set(i5, t7);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i5 = [];
      if (Array.isArray(s4)) {
        const e7 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e7) i5.unshift(c(s5));
      } else void 0 !== s4 && i5.push(c(s4));
      return i5;
    }
    static _$Eu(t6, s4) {
      const i5 = s4.attribute;
      return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
    }
    addController(t6) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
    }
    removeController(t6) {
      this._$EO?.delete(t6);
    }
    _$E_() {
      const t6 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t6.set(i5, this[i5]), delete this[i5]);
      t6.size > 0 && (this._$Ep = t6);
    }
    createRenderRoot() {
      const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t6, this.constructor.elementStyles), t6;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
    }
    enableUpdating(t6) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t6) => t6.hostDisconnected?.());
    }
    attributeChangedCallback(t6, s4, i5) {
      this._$AK(t6, i5);
    }
    _$EC(t6, s4) {
      const i5 = this.constructor.elementProperties.get(t6), e7 = this.constructor._$Eu(t6, i5);
      if (void 0 !== e7 && true === i5.reflect) {
        const r6 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
        this._$Em = t6, null == r6 ? this.removeAttribute(e7) : this.setAttribute(e7, r6), this._$Em = null;
      }
    }
    _$AK(t6, s4) {
      const i5 = this.constructor, e7 = i5._$Eh.get(t6);
      if (void 0 !== e7 && this._$Em !== e7) {
        const t7 = i5.getPropertyOptions(e7), r6 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
        this._$Em = e7, this[e7] = r6.fromAttribute(s4, t7.type), this._$Em = null;
      }
    }
    requestUpdate(t6, s4, i5) {
      if (void 0 !== t6) {
        if (i5 ??= this.constructor.getPropertyOptions(t6), !(i5.hasChanged ?? f)(this[t6], s4)) return;
        this.P(t6, s4, i5);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t6, s4, i5) {
      this._$AL.has(t6) || this._$AL.set(t6, s4), true === i5.reflect && this._$Em !== t6 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t6);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t7) {
        Promise.reject(t7);
      }
      const t6 = this.scheduleUpdate();
      return null != t6 && await t6, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending) return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t8, s5] of this._$Ep) this[t8] = s5;
          this._$Ep = void 0;
        }
        const t7 = this.constructor.elementProperties;
        if (t7.size > 0) for (const [s5, i5] of t7) true !== i5.wrapped || this._$AL.has(s5) || void 0 === this[s5] || this.P(s5, this[s5], i5);
      }
      let t6 = false;
      const s4 = this._$AL;
      try {
        t6 = this.shouldUpdate(s4), t6 ? (this.willUpdate(s4), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s4)) : this._$EU();
      } catch (s5) {
        throw t6 = false, this._$EU(), s5;
      }
      t6 && this._$AE(s4);
    }
    willUpdate(t6) {
    }
    _$AE(t6) {
      this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t6) {
      return true;
    }
    update(t6) {
      this._$Ej &&= this._$Ej.forEach((t7) => this._$EC(t7, this[t7])), this._$EU();
    }
    updated(t6) {
    }
    firstUpdated(t6) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
  var a2 = Array.isArray;
  var u2 = (t6) => a2(t6) || "function" == typeof t6?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t6) => (i5, ...s4) => ({ _$litType$: t6, strings: i5, values: s4 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t6, i5) {
    if (!Array.isArray(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i5) : i5;
  }
  var P = (t6, i5) => {
    const s4 = t6.length - 1, o7 = [];
    let r6, l3 = 2 === i5 ? "<svg>" : "", c4 = f2;
    for (let i6 = 0; i6 < s4; i6++) {
      const s5 = t6[i6];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); ) y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r6 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r6 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r6 = void 0);
      const x2 = c4 === m && t6[i6 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o7.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i6 : x2);
    }
    return [C(t6, l3 + (t6[s4] || "<?>") + (2 === i5 ? "</svg>" : "")), o7];
  };
  var V = class _V {
    constructor({ strings: t6, _$litType$: s4 }, n5) {
      let r6;
      this.parts = [];
      let c4 = 0, a3 = 0;
      const u3 = t6.length - 1, d3 = this.parts, [f3, v2] = P(t6, s4);
      if (this.el = _V.createElement(f3, n5), E.currentNode = this.el.content, 2 === s4) {
        const t7 = this.el.content.firstChild;
        t7.replaceWith(...t7.childNodes);
      }
      for (; null !== (r6 = E.nextNode()) && d3.length < u3; ) {
        if (1 === r6.nodeType) {
          if (r6.hasAttributes()) for (const t7 of r6.getAttributeNames()) if (t7.endsWith(e3)) {
            const i5 = v2[a3++], s5 = r6.getAttribute(t7).split(h2), e7 = /([.?@])?(.*)/.exec(i5);
            d3.push({ type: 1, index: c4, name: e7[2], strings: s5, ctor: "." === e7[1] ? k : "?" === e7[1] ? H : "@" === e7[1] ? I : R }), r6.removeAttribute(t7);
          } else t7.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r6.removeAttribute(t7));
          if ($.test(r6.tagName)) {
            const t7 = r6.textContent.split(h2), s5 = t7.length - 1;
            if (s5 > 0) {
              r6.textContent = i3 ? i3.emptyScript : "";
              for (let i5 = 0; i5 < s5; i5++) r6.append(t7[i5], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
              r6.append(t7[s5], l2());
            }
          }
        } else if (8 === r6.nodeType) if (r6.data === o3) d3.push({ type: 2, index: c4 });
        else {
          let t7 = -1;
          for (; -1 !== (t7 = r6.data.indexOf(h2, t7 + 1)); ) d3.push({ type: 7, index: c4 }), t7 += h2.length - 1;
        }
        c4++;
      }
    }
    static createElement(t6, i5) {
      const s4 = r3.createElement("template");
      return s4.innerHTML = t6, s4;
    }
  };
  function N(t6, i5, s4 = t6, e7) {
    if (i5 === w) return i5;
    let h3 = void 0 !== e7 ? s4._$Co?.[e7] : s4._$Cl;
    const o7 = c3(i5) ? void 0 : i5._$litDirective$;
    return h3?.constructor !== o7 && (h3?._$AO?.(false), void 0 === o7 ? h3 = void 0 : (h3 = new o7(t6), h3._$AT(t6, s4, e7)), void 0 !== e7 ? (s4._$Co ??= [])[e7] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = N(t6, h3._$AS(t6, i5.values), h3, e7)), i5;
  }
  var S2 = class {
    constructor(t6, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t6) {
      const { el: { content: i5 }, parts: s4 } = this._$AD, e7 = (t6?.creationScope ?? r3).importNode(i5, true);
      E.currentNode = e7;
      let h3 = E.nextNode(), o7 = 0, n5 = 0, l3 = s4[0];
      for (; void 0 !== l3; ) {
        if (o7 === l3.index) {
          let i6;
          2 === l3.type ? i6 = new M(h3, h3.nextSibling, this, t6) : 1 === l3.type ? i6 = new l3.ctor(h3, l3.name, l3.strings, this, t6) : 6 === l3.type && (i6 = new L(h3, this, t6)), this._$AV.push(i6), l3 = s4[++n5];
        }
        o7 !== l3?.index && (h3 = E.nextNode(), o7++);
      }
      return E.currentNode = r3, e7;
    }
    p(t6) {
      let i5 = 0;
      for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t6, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t6[i5])), i5++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t6, i5, s4, e7) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t6, this._$AB = i5, this._$AM = s4, this.options = e7, this._$Cv = e7?.isConnected ?? true;
    }
    get parentNode() {
      let t6 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t6?.nodeType && (t6 = i5.parentNode), t6;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t6, i5 = this) {
      t6 = N(this, t6, i5), c3(t6) ? t6 === T || null == t6 || "" === t6 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t6 !== this._$AH && t6 !== w && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : u2(t6) ? this.k(t6) : this._(t6);
    }
    S(t6) {
      return this._$AA.parentNode.insertBefore(t6, this._$AB);
    }
    T(t6) {
      this._$AH !== t6 && (this._$AR(), this._$AH = this.S(t6));
    }
    _(t6) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(r3.createTextNode(t6)), this._$AH = t6;
    }
    $(t6) {
      const { values: i5, _$litType$: s4 } = t6, e7 = "number" == typeof s4 ? this._$AC(t6) : (void 0 === s4.el && (s4.el = V.createElement(C(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e7) this._$AH.p(i5);
      else {
        const t7 = new S2(e7, this), s5 = t7.u(this.options);
        t7.p(i5), this.T(s5), this._$AH = t7;
      }
    }
    _$AC(t6) {
      let i5 = A.get(t6.strings);
      return void 0 === i5 && A.set(t6.strings, i5 = new V(t6)), i5;
    }
    k(t6) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s4, e7 = 0;
      for (const h3 of t6) e7 === i5.length ? i5.push(s4 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s4 = i5[e7], s4._$AI(h3), e7++;
      e7 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e7), i5.length = e7);
    }
    _$AR(t6 = this._$AA.nextSibling, i5) {
      for (this._$AP?.(false, true, i5); t6 && t6 !== this._$AB; ) {
        const i6 = t6.nextSibling;
        t6.remove(), t6 = i6;
      }
    }
    setConnected(t6) {
      void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t6, i5, s4, e7, h3) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t6, this.name = i5, this._$AM = e7, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = T;
    }
    _$AI(t6, i5 = this, s4, e7) {
      const h3 = this.strings;
      let o7 = false;
      if (void 0 === h3) t6 = N(this, t6, i5, 0), o7 = !c3(t6) || t6 !== this._$AH && t6 !== w, o7 && (this._$AH = t6);
      else {
        const e8 = t6;
        let n5, r6;
        for (t6 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = N(this, e8[s4 + n5], i5, n5), r6 === w && (r6 = this._$AH[n5]), o7 ||= !c3(r6) || r6 !== this._$AH[n5], r6 === T ? t6 = T : t6 !== T && (t6 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
      }
      o7 && !e7 && this.j(t6);
    }
    j(t6) {
      t6 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t6) {
      this.element[this.name] = t6 === T ? void 0 : t6;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t6) {
      this.element.toggleAttribute(this.name, !!t6 && t6 !== T);
    }
  };
  var I = class extends R {
    constructor(t6, i5, s4, e7, h3) {
      super(t6, i5, s4, e7, h3), this.type = 5;
    }
    _$AI(t6, i5 = this) {
      if ((t6 = N(this, t6, i5, 0) ?? T) === w) return;
      const s4 = this._$AH, e7 = t6 === T && s4 !== T || t6.capture !== s4.capture || t6.once !== s4.once || t6.passive !== s4.passive, h3 = t6 !== T && (s4 === T || e7);
      e7 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
    }
    handleEvent(t6) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
    }
  };
  var L = class {
    constructor(t6, i5, s4) {
      this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6) {
      N(this, t6);
    }
  };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
  var j = (t6, i5, s4) => {
    const e7 = s4?.renderBefore ?? i5;
    let h3 = e7._$litPart$;
    if (void 0 === h3) {
      const t7 = s4?.renderBefore ?? null;
      e7._$litPart$ = h3 = new M(i5.insertBefore(l2(), t7), t7, void 0, s4 ?? {});
    }
    return h3._$AI(t6), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t6 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t6.firstChild, t6;
    }
    update(t6) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = j(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var t3 = (t6) => (e7, o7) => {
    void 0 !== o7 ? o7.addInitializer(() => {
      customElements.define(t6, e7);
    }) : customElements.define(t6, e7);
  };

  // node_modules/@lit/reactive-element/decorators/property.js
  var o4 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  var r5 = (t6 = o4, e7, r6) => {
    const { kind: n5, metadata: i5 } = r6;
    let s4 = globalThis.litPropertyMetadata.get(i5);
    if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), s4.set(r6.name, t6), "accessor" === n5) {
      const { name: o7 } = r6;
      return { set(r7) {
        const n6 = e7.get.call(this);
        e7.set.call(this, r7), this.requestUpdate(o7, n6, t6);
      }, init(e8) {
        return void 0 !== e8 && this.P(o7, void 0, t6), e8;
      } };
    }
    if ("setter" === n5) {
      const { name: o7 } = r6;
      return function(r7) {
        const n6 = this[o7];
        e7.call(this, r7), this.requestUpdate(o7, n6, t6);
      };
    }
    throw Error("Unsupported decorator location: " + n5);
  };
  function n4(t6) {
    return (e7, o7) => "object" == typeof o7 ? r5(t6, e7, o7) : ((t7, e8, o8) => {
      const r6 = e8.hasOwnProperty(o8);
      return e8.constructor.createProperty(o8, r6 ? { ...t7, wrapped: true } : t7), r6 ? Object.getOwnPropertyDescriptor(e8, o8) : void 0;
    })(t6, e7, o7);
  }

  // node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t6) => (...e7) => ({ _$litDirective$: t6, values: e7 });
  var i4 = class {
    constructor(t6) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t6, e7, i5) {
      this._$Ct = t6, this._$AM = e7, this._$Ci = i5;
    }
    _$AS(t6, e7) {
      return this.update(t6, e7);
    }
    update(t6, e7) {
      return this.render(...e7);
    }
  };

  // node_modules/lit-html/directives/unsafe-html.js
  var e6 = class extends i4 {
    constructor(i5) {
      if (super(i5), this.it = T, i5.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r6) {
      if (r6 === T || null == r6) return this._t = void 0, this.it = r6;
      if (r6 === w) return r6;
      if ("string" != typeof r6) throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r6 === this.it) return this._t;
      this.it = r6;
      const s4 = [r6];
      return s4.raw = s4, this._t = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
    }
  };
  e6.directiveName = "unsafeHTML", e6.resultType = 1;
  var o5 = e5(e6);

  // node_modules/lit-html/directives/unsafe-svg.js
  var t5 = class extends e6 {
  };
  t5.directiveName = "unsafeSVG", t5.resultType = 2;
  var o6 = e5(t5);

  // node_modules/@sindresorhus/slugify/node_modules/escape-string-regexp/index.js
  function escapeStringRegexp(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // node_modules/@sindresorhus/transliterate/node_modules/escape-string-regexp/index.js
  function escapeStringRegexp2(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // node_modules/@sindresorhus/transliterate/replacements.js
  var replacements = [
    // German umlauts
    ["\xDF", "ss"],
    ["\u1E9E", "Ss"],
    ["\xE4", "ae"],
    ["\xC4", "Ae"],
    ["\xF6", "oe"],
    ["\xD6", "Oe"],
    ["\xFC", "ue"],
    ["\xDC", "Ue"],
    // Latin
    ["\xC0", "A"],
    ["\xC1", "A"],
    ["\xC2", "A"],
    ["\xC3", "A"],
    ["\xC4", "Ae"],
    ["\xC5", "A"],
    ["\xC6", "AE"],
    ["\xC7", "C"],
    ["\xC8", "E"],
    ["\xC9", "E"],
    ["\xCA", "E"],
    ["\xCB", "E"],
    ["\xCC", "I"],
    ["\xCD", "I"],
    ["\xCE", "I"],
    ["\xCF", "I"],
    ["\xD0", "D"],
    ["\xD1", "N"],
    ["\xD2", "O"],
    ["\xD3", "O"],
    ["\xD4", "O"],
    ["\xD5", "O"],
    ["\xD6", "Oe"],
    ["\u0150", "O"],
    ["\xD8", "O"],
    ["\xD9", "U"],
    ["\xDA", "U"],
    ["\xDB", "U"],
    ["\xDC", "Ue"],
    ["\u0170", "U"],
    ["\xDD", "Y"],
    ["\xDE", "TH"],
    ["\xDF", "ss"],
    ["\xE0", "a"],
    ["\xE1", "a"],
    ["\xE2", "a"],
    ["\xE3", "a"],
    ["\xE4", "ae"],
    ["\xE5", "a"],
    ["\xE6", "ae"],
    ["\xE7", "c"],
    ["\xE8", "e"],
    ["\xE9", "e"],
    ["\xEA", "e"],
    ["\xEB", "e"],
    ["\xEC", "i"],
    ["\xED", "i"],
    ["\xEE", "i"],
    ["\xEF", "i"],
    ["\xF0", "d"],
    ["\xF1", "n"],
    ["\xF2", "o"],
    ["\xF3", "o"],
    ["\xF4", "o"],
    ["\xF5", "o"],
    ["\xF6", "oe"],
    ["\u0151", "o"],
    ["\xF8", "o"],
    ["\xF9", "u"],
    ["\xFA", "u"],
    ["\xFB", "u"],
    ["\xFC", "ue"],
    ["\u0171", "u"],
    ["\xFD", "y"],
    ["\xFE", "th"],
    ["\xFF", "y"],
    ["\u1E9E", "SS"],
    // Vietnamese
    ["\xE0", "a"],
    ["\xC0", "A"],
    ["\xE1", "a"],
    ["\xC1", "A"],
    ["\xE2", "a"],
    ["\xC2", "A"],
    ["\xE3", "a"],
    ["\xC3", "A"],
    ["\xE8", "e"],
    ["\xC8", "E"],
    ["\xE9", "e"],
    ["\xC9", "E"],
    ["\xEA", "e"],
    ["\xCA", "E"],
    ["\xEC", "i"],
    ["\xCC", "I"],
    ["\xED", "i"],
    ["\xCD", "I"],
    ["\xF2", "o"],
    ["\xD2", "O"],
    ["\xF3", "o"],
    ["\xD3", "O"],
    ["\xF4", "o"],
    ["\xD4", "O"],
    ["\xF5", "o"],
    ["\xD5", "O"],
    ["\xF9", "u"],
    ["\xD9", "U"],
    ["\xFA", "u"],
    ["\xDA", "U"],
    ["\xFD", "y"],
    ["\xDD", "Y"],
    ["\u0103", "a"],
    ["\u0102", "A"],
    ["\u0110", "D"],
    ["\u0111", "d"],
    ["\u0129", "i"],
    ["\u0128", "I"],
    ["\u0169", "u"],
    ["\u0168", "U"],
    ["\u01A1", "o"],
    ["\u01A0", "O"],
    ["\u01B0", "u"],
    ["\u01AF", "U"],
    ["\u1EA1", "a"],
    ["\u1EA0", "A"],
    ["\u1EA3", "a"],
    ["\u1EA2", "A"],
    ["\u1EA5", "a"],
    ["\u1EA4", "A"],
    ["\u1EA7", "a"],
    ["\u1EA6", "A"],
    ["\u1EA9", "a"],
    ["\u1EA8", "A"],
    ["\u1EAB", "a"],
    ["\u1EAA", "A"],
    ["\u1EAD", "a"],
    ["\u1EAC", "A"],
    ["\u1EAF", "a"],
    ["\u1EAE", "A"],
    ["\u1EB1", "a"],
    ["\u1EB0", "A"],
    ["\u1EB3", "a"],
    ["\u1EB2", "A"],
    ["\u1EB5", "a"],
    ["\u1EB4", "A"],
    ["\u1EB7", "a"],
    ["\u1EB6", "A"],
    ["\u1EB9", "e"],
    ["\u1EB8", "E"],
    ["\u1EBB", "e"],
    ["\u1EBA", "E"],
    ["\u1EBD", "e"],
    ["\u1EBC", "E"],
    ["\u1EBF", "e"],
    ["\u1EBE", "E"],
    ["\u1EC1", "e"],
    ["\u1EC0", "E"],
    ["\u1EC3", "e"],
    ["\u1EC2", "E"],
    ["\u1EC5", "e"],
    ["\u1EC4", "E"],
    ["\u1EC7", "e"],
    ["\u1EC6", "E"],
    ["\u1EC9", "i"],
    ["\u1EC8", "I"],
    ["\u1ECB", "i"],
    ["\u1ECA", "I"],
    ["\u1ECD", "o"],
    ["\u1ECC", "O"],
    ["\u1ECF", "o"],
    ["\u1ECE", "O"],
    ["\u1ED1", "o"],
    ["\u1ED0", "O"],
    ["\u1ED3", "o"],
    ["\u1ED2", "O"],
    ["\u1ED5", "o"],
    ["\u1ED4", "O"],
    ["\u1ED7", "o"],
    ["\u1ED6", "O"],
    ["\u1ED9", "o"],
    ["\u1ED8", "O"],
    ["\u1EDB", "o"],
    ["\u1EDA", "O"],
    ["\u1EDD", "o"],
    ["\u1EDC", "O"],
    ["\u1EDF", "o"],
    ["\u1EDE", "O"],
    ["\u1EE1", "o"],
    ["\u1EE0", "O"],
    ["\u1EE3", "o"],
    ["\u1EE2", "O"],
    ["\u1EE5", "u"],
    ["\u1EE4", "U"],
    ["\u1EE7", "u"],
    ["\u1EE6", "U"],
    ["\u1EE9", "u"],
    ["\u1EE8", "U"],
    ["\u1EEB", "u"],
    ["\u1EEA", "U"],
    ["\u1EED", "u"],
    ["\u1EEC", "U"],
    ["\u1EEF", "u"],
    ["\u1EEE", "U"],
    ["\u1EF1", "u"],
    ["\u1EF0", "U"],
    ["\u1EF3", "y"],
    ["\u1EF2", "Y"],
    ["\u1EF5", "y"],
    ["\u1EF4", "Y"],
    ["\u1EF7", "y"],
    ["\u1EF6", "Y"],
    ["\u1EF9", "y"],
    ["\u1EF8", "Y"],
    // Arabic
    ["\u0621", "e"],
    ["\u0622", "a"],
    ["\u0623", "a"],
    ["\u0624", "w"],
    ["\u0625", "i"],
    ["\u0626", "y"],
    ["\u0627", "a"],
    ["\u0628", "b"],
    ["\u0629", "t"],
    ["\u062A", "t"],
    ["\u062B", "th"],
    ["\u062C", "j"],
    ["\u062D", "h"],
    ["\u062E", "kh"],
    ["\u062F", "d"],
    ["\u0630", "dh"],
    ["\u0631", "r"],
    ["\u0632", "z"],
    ["\u0633", "s"],
    ["\u0634", "sh"],
    ["\u0635", "s"],
    ["\u0636", "d"],
    ["\u0637", "t"],
    ["\u0638", "z"],
    ["\u0639", "e"],
    ["\u063A", "gh"],
    ["\u0640", "_"],
    ["\u0641", "f"],
    ["\u0642", "q"],
    ["\u0643", "k"],
    ["\u0644", "l"],
    ["\u0645", "m"],
    ["\u0646", "n"],
    ["\u0647", "h"],
    ["\u0648", "w"],
    ["\u0649", "a"],
    ["\u064A", "y"],
    ["\u064E\u200E", "a"],
    ["\u064F", "u"],
    ["\u0650\u200E", "i"],
    ["\u0660", "0"],
    ["\u0661", "1"],
    ["\u0662", "2"],
    ["\u0663", "3"],
    ["\u0664", "4"],
    ["\u0665", "5"],
    ["\u0666", "6"],
    ["\u0667", "7"],
    ["\u0668", "8"],
    ["\u0669", "9"],
    // Persian / Farsi
    ["\u0686", "ch"],
    ["\u06A9", "k"],
    ["\u06AF", "g"],
    ["\u067E", "p"],
    ["\u0698", "zh"],
    ["\u06CC", "y"],
    ["\u06F0", "0"],
    ["\u06F1", "1"],
    ["\u06F2", "2"],
    ["\u06F3", "3"],
    ["\u06F4", "4"],
    ["\u06F5", "5"],
    ["\u06F6", "6"],
    ["\u06F7", "7"],
    ["\u06F8", "8"],
    ["\u06F9", "9"],
    // Pashto
    ["\u067C", "p"],
    ["\u0681", "z"],
    ["\u0685", "c"],
    ["\u0689", "d"],
    ["\uFEAB", "d"],
    ["\uFEAD", "r"],
    ["\u0693", "r"],
    ["\uFEAF", "z"],
    ["\u0696", "g"],
    ["\u069A", "x"],
    ["\u06AB", "g"],
    ["\u06BC", "n"],
    ["\u06C0", "e"],
    ["\u06D0", "e"],
    ["\u06CD", "ai"],
    // Urdu
    ["\u0679", "t"],
    ["\u0688", "d"],
    ["\u0691", "r"],
    ["\u06BA", "n"],
    ["\u06C1", "h"],
    ["\u06BE", "h"],
    ["\u06D2", "e"],
    // Russian
    ["\u0410", "A"],
    ["\u0430", "a"],
    ["\u0411", "B"],
    ["\u0431", "b"],
    ["\u0412", "V"],
    ["\u0432", "v"],
    ["\u0413", "G"],
    ["\u0433", "g"],
    ["\u0414", "D"],
    ["\u0434", "d"],
    ["\u044A\u0435", "ye"],
    ["\u042A\u0435", "Ye"],
    ["\u044A\u0415", "yE"],
    ["\u042A\u0415", "YE"],
    ["\u0415", "E"],
    ["\u0435", "e"],
    ["\u0401", "Yo"],
    ["\u0451", "yo"],
    ["\u0416", "Zh"],
    ["\u0436", "zh"],
    ["\u0417", "Z"],
    ["\u0437", "z"],
    ["\u0418", "I"],
    ["\u0438", "i"],
    ["\u044B\u0439", "iy"],
    ["\u042B\u0439", "Iy"],
    ["\u042B\u0419", "IY"],
    ["\u044B\u0419", "iY"],
    ["\u0419", "Y"],
    ["\u0439", "y"],
    ["\u041A", "K"],
    ["\u043A", "k"],
    ["\u041B", "L"],
    ["\u043B", "l"],
    ["\u041C", "M"],
    ["\u043C", "m"],
    ["\u041D", "N"],
    ["\u043D", "n"],
    ["\u041E", "O"],
    ["\u043E", "o"],
    ["\u041F", "P"],
    ["\u043F", "p"],
    ["\u0420", "R"],
    ["\u0440", "r"],
    ["\u0421", "S"],
    ["\u0441", "s"],
    ["\u0422", "T"],
    ["\u0442", "t"],
    ["\u0423", "U"],
    ["\u0443", "u"],
    ["\u0424", "F"],
    ["\u0444", "f"],
    ["\u0425", "Kh"],
    ["\u0445", "kh"],
    ["\u0426", "Ts"],
    ["\u0446", "ts"],
    ["\u0427", "Ch"],
    ["\u0447", "ch"],
    ["\u0428", "Sh"],
    ["\u0448", "sh"],
    ["\u0429", "Sch"],
    ["\u0449", "sch"],
    ["\u042A", ""],
    ["\u044A", ""],
    ["\u042B", "Y"],
    ["\u044B", "y"],
    ["\u042C", ""],
    ["\u044C", ""],
    ["\u042D", "E"],
    ["\u044D", "e"],
    ["\u042E", "Yu"],
    ["\u044E", "yu"],
    ["\u042F", "Ya"],
    ["\u044F", "ya"],
    // Romanian
    ["\u0103", "a"],
    ["\u0102", "A"],
    ["\u0219", "s"],
    ["\u0218", "S"],
    ["\u021B", "t"],
    ["\u021A", "T"],
    ["\u0163", "t"],
    ["\u0162", "T"],
    // Turkish
    ["\u015F", "s"],
    ["\u015E", "S"],
    ["\xE7", "c"],
    ["\xC7", "C"],
    ["\u011F", "g"],
    ["\u011E", "G"],
    ["\u0131", "i"],
    ["\u0130", "I"],
    // Armenian
    ["\u0561", "a"],
    ["\u0531", "A"],
    ["\u0562", "b"],
    ["\u0532", "B"],
    ["\u0563", "g"],
    ["\u0533", "G"],
    ["\u0564", "d"],
    ["\u0534", "D"],
    ["\u0565", "ye"],
    ["\u0535", "Ye"],
    ["\u0566", "z"],
    ["\u0536", "Z"],
    ["\u0567", "e"],
    ["\u0537", "E"],
    ["\u0568", "y"],
    ["\u0538", "Y"],
    ["\u0569", "t"],
    ["\u0539", "T"],
    ["\u056A", "zh"],
    ["\u053A", "Zh"],
    ["\u056B", "i"],
    ["\u053B", "I"],
    ["\u056C", "l"],
    ["\u053C", "L"],
    ["\u056D", "kh"],
    ["\u053D", "Kh"],
    ["\u056E", "ts"],
    ["\u053E", "Ts"],
    ["\u056F", "k"],
    ["\u053F", "K"],
    ["\u0570", "h"],
    ["\u0540", "H"],
    ["\u0571", "dz"],
    ["\u0541", "Dz"],
    ["\u0572", "gh"],
    ["\u0542", "Gh"],
    ["\u0573", "tch"],
    ["\u0543", "Tch"],
    ["\u0574", "m"],
    ["\u0544", "M"],
    ["\u0575", "y"],
    ["\u0545", "Y"],
    ["\u0576", "n"],
    ["\u0546", "N"],
    ["\u0577", "sh"],
    ["\u0547", "Sh"],
    ["\u0578", "vo"],
    ["\u0548", "Vo"],
    ["\u0579", "ch"],
    ["\u0549", "Ch"],
    ["\u057A", "p"],
    ["\u054A", "P"],
    ["\u057B", "j"],
    ["\u054B", "J"],
    ["\u057C", "r"],
    ["\u054C", "R"],
    ["\u057D", "s"],
    ["\u054D", "S"],
    ["\u057E", "v"],
    ["\u054E", "V"],
    ["\u057F", "t"],
    ["\u054F", "T"],
    ["\u0580", "r"],
    ["\u0550", "R"],
    ["\u0581", "c"],
    ["\u0551", "C"],
    ["\u0578\u0582", "u"],
    ["\u0548\u0552", "U"],
    ["\u0548\u0582", "U"],
    ["\u0583", "p"],
    ["\u0553", "P"],
    ["\u0584", "q"],
    ["\u0554", "Q"],
    ["\u0585", "o"],
    ["\u0555", "O"],
    ["\u0586", "f"],
    ["\u0556", "F"],
    ["\u0587", "yev"],
    // Georgian
    ["\u10D0", "a"],
    ["\u10D1", "b"],
    ["\u10D2", "g"],
    ["\u10D3", "d"],
    ["\u10D4", "e"],
    ["\u10D5", "v"],
    ["\u10D6", "z"],
    ["\u10D7", "t"],
    ["\u10D8", "i"],
    ["\u10D9", "k"],
    ["\u10DA", "l"],
    ["\u10DB", "m"],
    ["\u10DC", "n"],
    ["\u10DD", "o"],
    ["\u10DE", "p"],
    ["\u10DF", "zh"],
    ["\u10E0", "r"],
    ["\u10E1", "s"],
    ["\u10E2", "t"],
    ["\u10E3", "u"],
    ["\u10E4", "ph"],
    ["\u10E5", "q"],
    ["\u10E6", "gh"],
    ["\u10E7", "k"],
    ["\u10E8", "sh"],
    ["\u10E9", "ch"],
    ["\u10EA", "ts"],
    ["\u10EB", "dz"],
    ["\u10EC", "ts"],
    ["\u10ED", "tch"],
    ["\u10EE", "kh"],
    ["\u10EF", "j"],
    ["\u10F0", "h"],
    // Czech
    ["\u010D", "c"],
    ["\u010F", "d"],
    ["\u011B", "e"],
    ["\u0148", "n"],
    ["\u0159", "r"],
    ["\u0161", "s"],
    ["\u0165", "t"],
    ["\u016F", "u"],
    ["\u017E", "z"],
    ["\u010C", "C"],
    ["\u010E", "D"],
    ["\u011A", "E"],
    ["\u0147", "N"],
    ["\u0158", "R"],
    ["\u0160", "S"],
    ["\u0164", "T"],
    ["\u016E", "U"],
    ["\u017D", "Z"],
    // Dhivehi
    ["\u0780", "h"],
    ["\u0781", "sh"],
    ["\u0782", "n"],
    ["\u0783", "r"],
    ["\u0784", "b"],
    ["\u0785", "lh"],
    ["\u0786", "k"],
    ["\u0787", "a"],
    ["\u0788", "v"],
    ["\u0789", "m"],
    ["\u078A", "f"],
    ["\u078B", "dh"],
    ["\u078C", "th"],
    ["\u078D", "l"],
    ["\u078E", "g"],
    ["\u078F", "gn"],
    ["\u0790", "s"],
    ["\u0791", "d"],
    ["\u0792", "z"],
    ["\u0793", "t"],
    ["\u0794", "y"],
    ["\u0795", "p"],
    ["\u0796", "j"],
    ["\u0797", "ch"],
    ["\u0798", "tt"],
    ["\u0799", "hh"],
    ["\u079A", "kh"],
    ["\u079B", "th"],
    ["\u079C", "z"],
    ["\u079D", "sh"],
    ["\u079E", "s"],
    ["\u079F", "d"],
    ["\u07A0", "t"],
    ["\u07A1", "z"],
    ["\u07A2", "a"],
    ["\u07A3", "gh"],
    ["\u07A4", "q"],
    ["\u07A5", "w"],
    ["\u07A6", "a"],
    ["\u07A7", "aa"],
    ["\u07A8", "i"],
    ["\u07A9", "ee"],
    ["\u07AA", "u"],
    ["\u07AB", "oo"],
    ["\u07AC", "e"],
    ["\u07AD", "ey"],
    ["\u07AE", "o"],
    ["\u07AF", "oa"],
    ["\u07B0", ""],
    // Greek
    ["\u03B1", "a"],
    ["\u03B2", "v"],
    ["\u03B3", "g"],
    ["\u03B4", "d"],
    ["\u03B5", "e"],
    ["\u03B6", "z"],
    ["\u03B7", "i"],
    ["\u03B8", "th"],
    ["\u03B9", "i"],
    ["\u03BA", "k"],
    ["\u03BB", "l"],
    ["\u03BC", "m"],
    ["\u03BD", "n"],
    ["\u03BE", "ks"],
    ["\u03BF", "o"],
    ["\u03C0", "p"],
    ["\u03C1", "r"],
    ["\u03C3", "s"],
    ["\u03C4", "t"],
    ["\u03C5", "y"],
    ["\u03C6", "f"],
    ["\u03C7", "x"],
    ["\u03C8", "ps"],
    ["\u03C9", "o"],
    ["\u03AC", "a"],
    ["\u03AD", "e"],
    ["\u03AF", "i"],
    ["\u03CC", "o"],
    ["\u03CD", "y"],
    ["\u03AE", "i"],
    ["\u03CE", "o"],
    ["\u03C2", "s"],
    ["\u03CA", "i"],
    ["\u03B0", "y"],
    ["\u03CB", "y"],
    ["\u0390", "i"],
    ["\u0391", "A"],
    ["\u0392", "B"],
    ["\u0393", "G"],
    ["\u0394", "D"],
    ["\u0395", "E"],
    ["\u0396", "Z"],
    ["\u0397", "I"],
    ["\u0398", "TH"],
    ["\u0399", "I"],
    ["\u039A", "K"],
    ["\u039B", "L"],
    ["\u039C", "M"],
    ["\u039D", "N"],
    ["\u039E", "KS"],
    ["\u039F", "O"],
    ["\u03A0", "P"],
    ["\u03A1", "R"],
    ["\u03A3", "S"],
    ["\u03A4", "T"],
    ["\u03A5", "Y"],
    ["\u03A6", "F"],
    ["\u03A7", "X"],
    ["\u03A8", "PS"],
    ["\u03A9", "O"],
    ["\u0386", "A"],
    ["\u0388", "E"],
    ["\u038A", "I"],
    ["\u038C", "O"],
    ["\u038E", "Y"],
    ["\u0389", "I"],
    ["\u038F", "O"],
    ["\u03AA", "I"],
    ["\u03AB", "Y"],
    // Disabled as it conflicts with German and Latin.
    // Hungarian
    // ['ä', 'a'],
    // ['Ä', 'A'],
    // ['ö', 'o'],
    // ['Ö', 'O'],
    // ['ü', 'u'],
    // ['Ü', 'U'],
    // ['ű', 'u'],
    // ['Ű', 'U'],
    // Latvian
    ["\u0101", "a"],
    ["\u0113", "e"],
    ["\u0123", "g"],
    ["\u012B", "i"],
    ["\u0137", "k"],
    ["\u013C", "l"],
    ["\u0146", "n"],
    ["\u016B", "u"],
    ["\u0100", "A"],
    ["\u0112", "E"],
    ["\u0122", "G"],
    ["\u012A", "I"],
    ["\u0136", "K"],
    ["\u013B", "L"],
    ["\u0145", "N"],
    ["\u016A", "U"],
    ["\u010D", "c"],
    ["\u0161", "s"],
    ["\u017E", "z"],
    ["\u010C", "C"],
    ["\u0160", "S"],
    ["\u017D", "Z"],
    // Lithuanian
    ["\u0105", "a"],
    ["\u010D", "c"],
    ["\u0119", "e"],
    ["\u0117", "e"],
    ["\u012F", "i"],
    ["\u0161", "s"],
    ["\u0173", "u"],
    ["\u016B", "u"],
    ["\u017E", "z"],
    ["\u0104", "A"],
    ["\u010C", "C"],
    ["\u0118", "E"],
    ["\u0116", "E"],
    ["\u012E", "I"],
    ["\u0160", "S"],
    ["\u0172", "U"],
    ["\u016A", "U"],
    // Macedonian
    ["\u040C", "Kj"],
    ["\u045C", "kj"],
    ["\u0409", "Lj"],
    ["\u0459", "lj"],
    ["\u040A", "Nj"],
    ["\u045A", "nj"],
    ["\u0422\u0441", "Ts"],
    ["\u0442\u0441", "ts"],
    // Polish
    ["\u0105", "a"],
    ["\u0107", "c"],
    ["\u0119", "e"],
    ["\u0142", "l"],
    ["\u0144", "n"],
    ["\u015B", "s"],
    ["\u017A", "z"],
    ["\u017C", "z"],
    ["\u0104", "A"],
    ["\u0106", "C"],
    ["\u0118", "E"],
    ["\u0141", "L"],
    ["\u0143", "N"],
    ["\u015A", "S"],
    ["\u0179", "Z"],
    ["\u017B", "Z"],
    // Disabled as it conflicts with Vietnamese.
    // Serbian
    // ['љ', 'lj'],
    // ['њ', 'nj'],
    // ['Љ', 'Lj'],
    // ['Њ', 'Nj'],
    // ['đ', 'dj'],
    // ['Đ', 'Dj'],
    // ['ђ', 'dj'],
    // ['ј', 'j'],
    // ['ћ', 'c'],
    // ['џ', 'dz'],
    // ['Ђ', 'Dj'],
    // ['Ј', 'j'],
    // ['Ћ', 'C'],
    // ['Џ', 'Dz'],
    // Disabled as it conflicts with German and Latin.
    // Slovak
    // ['ä', 'a'],
    // ['Ä', 'A'],
    // ['ľ', 'l'],
    // ['ĺ', 'l'],
    // ['ŕ', 'r'],
    // ['Ľ', 'L'],
    // ['Ĺ', 'L'],
    // ['Ŕ', 'R'],
    // Disabled as it conflicts with German and Latin.
    // Swedish
    // ['å', 'o'],
    // ['Å', 'o'],
    // ['ä', 'a'],
    // ['Ä', 'A'],
    // ['ë', 'e'],
    // ['Ë', 'E'],
    // ['ö', 'o'],
    // ['Ö', 'O'],
    // Ukrainian
    ["\u0404", "Ye"],
    ["\u0406", "I"],
    ["\u0407", "Yi"],
    ["\u0490", "G"],
    ["\u0454", "ye"],
    ["\u0456", "i"],
    ["\u0457", "yi"],
    ["\u0491", "g"],
    // Dutch
    ["\u0132", "IJ"],
    ["\u0133", "ij"],
    // Danish
    // ['Æ', 'Ae'],
    // ['Ø', 'Oe'],
    // ['Å', 'Aa'],
    // ['æ', 'ae'],
    // ['ø', 'oe'],
    // ['å', 'aa']
    // Currencies
    ["\xA2", "c"],
    ["\xA5", "Y"],
    ["\u07FF", "b"],
    ["\u09F3", "t"],
    ["\u0AF1", "Bo"],
    ["\u0E3F", "B"],
    ["\u20A0", "CE"],
    ["\u20A1", "C"],
    ["\u20A2", "Cr"],
    ["\u20A3", "F"],
    ["\u20A5", "m"],
    ["\u20A6", "N"],
    ["\u20A7", "Pt"],
    ["\u20A8", "Rs"],
    ["\u20A9", "W"],
    ["\u20AB", "s"],
    ["\u20AC", "E"],
    ["\u20AD", "K"],
    ["\u20AE", "T"],
    ["\u20AF", "Dp"],
    ["\u20B0", "S"],
    ["\u20B1", "P"],
    ["\u20B2", "G"],
    ["\u20B3", "A"],
    ["\u20B4", "S"],
    ["\u20B5", "C"],
    ["\u20B6", "tt"],
    ["\u20B7", "S"],
    ["\u20B8", "T"],
    ["\u20B9", "R"],
    ["\u20BA", "L"],
    ["\u20BD", "P"],
    ["\u20BF", "B"],
    ["\uFE69", "$"],
    ["\uFFE0", "c"],
    ["\uFFE5", "Y"],
    ["\uFFE6", "W"],
    // Latin
    ["\u{1D400}", "A"],
    ["\u{1D401}", "B"],
    ["\u{1D402}", "C"],
    ["\u{1D403}", "D"],
    ["\u{1D404}", "E"],
    ["\u{1D405}", "F"],
    ["\u{1D406}", "G"],
    ["\u{1D407}", "H"],
    ["\u{1D408}", "I"],
    ["\u{1D409}", "J"],
    ["\u{1D40A}", "K"],
    ["\u{1D40B}", "L"],
    ["\u{1D40C}", "M"],
    ["\u{1D40D}", "N"],
    ["\u{1D40E}", "O"],
    ["\u{1D40F}", "P"],
    ["\u{1D410}", "Q"],
    ["\u{1D411}", "R"],
    ["\u{1D412}", "S"],
    ["\u{1D413}", "T"],
    ["\u{1D414}", "U"],
    ["\u{1D415}", "V"],
    ["\u{1D416}", "W"],
    ["\u{1D417}", "X"],
    ["\u{1D418}", "Y"],
    ["\u{1D419}", "Z"],
    ["\u{1D41A}", "a"],
    ["\u{1D41B}", "b"],
    ["\u{1D41C}", "c"],
    ["\u{1D41D}", "d"],
    ["\u{1D41E}", "e"],
    ["\u{1D41F}", "f"],
    ["\u{1D420}", "g"],
    ["\u{1D421}", "h"],
    ["\u{1D422}", "i"],
    ["\u{1D423}", "j"],
    ["\u{1D424}", "k"],
    ["\u{1D425}", "l"],
    ["\u{1D426}", "m"],
    ["\u{1D427}", "n"],
    ["\u{1D428}", "o"],
    ["\u{1D429}", "p"],
    ["\u{1D42A}", "q"],
    ["\u{1D42B}", "r"],
    ["\u{1D42C}", "s"],
    ["\u{1D42D}", "t"],
    ["\u{1D42E}", "u"],
    ["\u{1D42F}", "v"],
    ["\u{1D430}", "w"],
    ["\u{1D431}", "x"],
    ["\u{1D432}", "y"],
    ["\u{1D433}", "z"],
    ["\u{1D434}", "A"],
    ["\u{1D435}", "B"],
    ["\u{1D436}", "C"],
    ["\u{1D437}", "D"],
    ["\u{1D438}", "E"],
    ["\u{1D439}", "F"],
    ["\u{1D43A}", "G"],
    ["\u{1D43B}", "H"],
    ["\u{1D43C}", "I"],
    ["\u{1D43D}", "J"],
    ["\u{1D43E}", "K"],
    ["\u{1D43F}", "L"],
    ["\u{1D440}", "M"],
    ["\u{1D441}", "N"],
    ["\u{1D442}", "O"],
    ["\u{1D443}", "P"],
    ["\u{1D444}", "Q"],
    ["\u{1D445}", "R"],
    ["\u{1D446}", "S"],
    ["\u{1D447}", "T"],
    ["\u{1D448}", "U"],
    ["\u{1D449}", "V"],
    ["\u{1D44A}", "W"],
    ["\u{1D44B}", "X"],
    ["\u{1D44C}", "Y"],
    ["\u{1D44D}", "Z"],
    ["\u{1D44E}", "a"],
    ["\u{1D44F}", "b"],
    ["\u{1D450}", "c"],
    ["\u{1D451}", "d"],
    ["\u{1D452}", "e"],
    ["\u{1D453}", "f"],
    ["\u{1D454}", "g"],
    ["\u{1D456}", "i"],
    ["\u{1D457}", "j"],
    ["\u{1D458}", "k"],
    ["\u{1D459}", "l"],
    ["\u{1D45A}", "m"],
    ["\u{1D45B}", "n"],
    ["\u{1D45C}", "o"],
    ["\u{1D45D}", "p"],
    ["\u{1D45E}", "q"],
    ["\u{1D45F}", "r"],
    ["\u{1D460}", "s"],
    ["\u{1D461}", "t"],
    ["\u{1D462}", "u"],
    ["\u{1D463}", "v"],
    ["\u{1D464}", "w"],
    ["\u{1D465}", "x"],
    ["\u{1D466}", "y"],
    ["\u{1D467}", "z"],
    ["\u{1D468}", "A"],
    ["\u{1D469}", "B"],
    ["\u{1D46A}", "C"],
    ["\u{1D46B}", "D"],
    ["\u{1D46C}", "E"],
    ["\u{1D46D}", "F"],
    ["\u{1D46E}", "G"],
    ["\u{1D46F}", "H"],
    ["\u{1D470}", "I"],
    ["\u{1D471}", "J"],
    ["\u{1D472}", "K"],
    ["\u{1D473}", "L"],
    ["\u{1D474}", "M"],
    ["\u{1D475}", "N"],
    ["\u{1D476}", "O"],
    ["\u{1D477}", "P"],
    ["\u{1D478}", "Q"],
    ["\u{1D479}", "R"],
    ["\u{1D47A}", "S"],
    ["\u{1D47B}", "T"],
    ["\u{1D47C}", "U"],
    ["\u{1D47D}", "V"],
    ["\u{1D47E}", "W"],
    ["\u{1D47F}", "X"],
    ["\u{1D480}", "Y"],
    ["\u{1D481}", "Z"],
    ["\u{1D482}", "a"],
    ["\u{1D483}", "b"],
    ["\u{1D484}", "c"],
    ["\u{1D485}", "d"],
    ["\u{1D486}", "e"],
    ["\u{1D487}", "f"],
    ["\u{1D488}", "g"],
    ["\u{1D489}", "h"],
    ["\u{1D48A}", "i"],
    ["\u{1D48B}", "j"],
    ["\u{1D48C}", "k"],
    ["\u{1D48D}", "l"],
    ["\u{1D48E}", "m"],
    ["\u{1D48F}", "n"],
    ["\u{1D490}", "o"],
    ["\u{1D491}", "p"],
    ["\u{1D492}", "q"],
    ["\u{1D493}", "r"],
    ["\u{1D494}", "s"],
    ["\u{1D495}", "t"],
    ["\u{1D496}", "u"],
    ["\u{1D497}", "v"],
    ["\u{1D498}", "w"],
    ["\u{1D499}", "x"],
    ["\u{1D49A}", "y"],
    ["\u{1D49B}", "z"],
    ["\u{1D49C}", "A"],
    ["\u{1D49E}", "C"],
    ["\u{1D49F}", "D"],
    ["\u{1D4A2}", "g"],
    ["\u{1D4A5}", "J"],
    ["\u{1D4A6}", "K"],
    ["\u{1D4A9}", "N"],
    ["\u{1D4AA}", "O"],
    ["\u{1D4AB}", "P"],
    ["\u{1D4AC}", "Q"],
    ["\u{1D4AE}", "S"],
    ["\u{1D4AF}", "T"],
    ["\u{1D4B0}", "U"],
    ["\u{1D4B1}", "V"],
    ["\u{1D4B2}", "W"],
    ["\u{1D4B3}", "X"],
    ["\u{1D4B4}", "Y"],
    ["\u{1D4B5}", "Z"],
    ["\u{1D4B6}", "a"],
    ["\u{1D4B7}", "b"],
    ["\u{1D4B8}", "c"],
    ["\u{1D4B9}", "d"],
    ["\u{1D4BB}", "f"],
    ["\u{1D4BD}", "h"],
    ["\u{1D4BE}", "i"],
    ["\u{1D4BF}", "j"],
    ["\u{1D4C0}", "h"],
    ["\u{1D4C1}", "l"],
    ["\u{1D4C2}", "m"],
    ["\u{1D4C3}", "n"],
    ["\u{1D4C5}", "p"],
    ["\u{1D4C6}", "q"],
    ["\u{1D4C7}", "r"],
    ["\u{1D4C8}", "s"],
    ["\u{1D4C9}", "t"],
    ["\u{1D4CA}", "u"],
    ["\u{1D4CB}", "v"],
    ["\u{1D4CC}", "w"],
    ["\u{1D4CD}", "x"],
    ["\u{1D4CE}", "y"],
    ["\u{1D4CF}", "z"],
    ["\u{1D4D0}", "A"],
    ["\u{1D4D1}", "B"],
    ["\u{1D4D2}", "C"],
    ["\u{1D4D3}", "D"],
    ["\u{1D4D4}", "E"],
    ["\u{1D4D5}", "F"],
    ["\u{1D4D6}", "G"],
    ["\u{1D4D7}", "H"],
    ["\u{1D4D8}", "I"],
    ["\u{1D4D9}", "J"],
    ["\u{1D4DA}", "K"],
    ["\u{1D4DB}", "L"],
    ["\u{1D4DC}", "M"],
    ["\u{1D4DD}", "N"],
    ["\u{1D4DE}", "O"],
    ["\u{1D4DF}", "P"],
    ["\u{1D4E0}", "Q"],
    ["\u{1D4E1}", "R"],
    ["\u{1D4E2}", "S"],
    ["\u{1D4E3}", "T"],
    ["\u{1D4E4}", "U"],
    ["\u{1D4E5}", "V"],
    ["\u{1D4E6}", "W"],
    ["\u{1D4E7}", "X"],
    ["\u{1D4E8}", "Y"],
    ["\u{1D4E9}", "Z"],
    ["\u{1D4EA}", "a"],
    ["\u{1D4EB}", "b"],
    ["\u{1D4EC}", "c"],
    ["\u{1D4ED}", "d"],
    ["\u{1D4EE}", "e"],
    ["\u{1D4EF}", "f"],
    ["\u{1D4F0}", "g"],
    ["\u{1D4F1}", "h"],
    ["\u{1D4F2}", "i"],
    ["\u{1D4F3}", "j"],
    ["\u{1D4F4}", "k"],
    ["\u{1D4F5}", "l"],
    ["\u{1D4F6}", "m"],
    ["\u{1D4F7}", "n"],
    ["\u{1D4F8}", "o"],
    ["\u{1D4F9}", "p"],
    ["\u{1D4FA}", "q"],
    ["\u{1D4FB}", "r"],
    ["\u{1D4FC}", "s"],
    ["\u{1D4FD}", "t"],
    ["\u{1D4FE}", "u"],
    ["\u{1D4FF}", "v"],
    ["\u{1D500}", "w"],
    ["\u{1D501}", "x"],
    ["\u{1D502}", "y"],
    ["\u{1D503}", "z"],
    ["\u{1D504}", "A"],
    ["\u{1D505}", "B"],
    ["\u{1D507}", "D"],
    ["\u{1D508}", "E"],
    ["\u{1D509}", "F"],
    ["\u{1D50A}", "G"],
    ["\u{1D50D}", "J"],
    ["\u{1D50E}", "K"],
    ["\u{1D50F}", "L"],
    ["\u{1D510}", "M"],
    ["\u{1D511}", "N"],
    ["\u{1D512}", "O"],
    ["\u{1D513}", "P"],
    ["\u{1D514}", "Q"],
    ["\u{1D516}", "S"],
    ["\u{1D517}", "T"],
    ["\u{1D518}", "U"],
    ["\u{1D519}", "V"],
    ["\u{1D51A}", "W"],
    ["\u{1D51B}", "X"],
    ["\u{1D51C}", "Y"],
    ["\u{1D51E}", "a"],
    ["\u{1D51F}", "b"],
    ["\u{1D520}", "c"],
    ["\u{1D521}", "d"],
    ["\u{1D522}", "e"],
    ["\u{1D523}", "f"],
    ["\u{1D524}", "g"],
    ["\u{1D525}", "h"],
    ["\u{1D526}", "i"],
    ["\u{1D527}", "j"],
    ["\u{1D528}", "k"],
    ["\u{1D529}", "l"],
    ["\u{1D52A}", "m"],
    ["\u{1D52B}", "n"],
    ["\u{1D52C}", "o"],
    ["\u{1D52D}", "p"],
    ["\u{1D52E}", "q"],
    ["\u{1D52F}", "r"],
    ["\u{1D530}", "s"],
    ["\u{1D531}", "t"],
    ["\u{1D532}", "u"],
    ["\u{1D533}", "v"],
    ["\u{1D534}", "w"],
    ["\u{1D535}", "x"],
    ["\u{1D536}", "y"],
    ["\u{1D537}", "z"],
    ["\u{1D538}", "A"],
    ["\u{1D539}", "B"],
    ["\u{1D53B}", "D"],
    ["\u{1D53C}", "E"],
    ["\u{1D53D}", "F"],
    ["\u{1D53E}", "G"],
    ["\u{1D540}", "I"],
    ["\u{1D541}", "J"],
    ["\u{1D542}", "K"],
    ["\u{1D543}", "L"],
    ["\u{1D544}", "M"],
    ["\u{1D546}", "N"],
    ["\u{1D54A}", "S"],
    ["\u{1D54B}", "T"],
    ["\u{1D54C}", "U"],
    ["\u{1D54D}", "V"],
    ["\u{1D54E}", "W"],
    ["\u{1D54F}", "X"],
    ["\u{1D550}", "Y"],
    ["\u{1D552}", "a"],
    ["\u{1D553}", "b"],
    ["\u{1D554}", "c"],
    ["\u{1D555}", "d"],
    ["\u{1D556}", "e"],
    ["\u{1D557}", "f"],
    ["\u{1D558}", "g"],
    ["\u{1D559}", "h"],
    ["\u{1D55A}", "i"],
    ["\u{1D55B}", "j"],
    ["\u{1D55C}", "k"],
    ["\u{1D55D}", "l"],
    ["\u{1D55E}", "m"],
    ["\u{1D55F}", "n"],
    ["\u{1D560}", "o"],
    ["\u{1D561}", "p"],
    ["\u{1D562}", "q"],
    ["\u{1D563}", "r"],
    ["\u{1D564}", "s"],
    ["\u{1D565}", "t"],
    ["\u{1D566}", "u"],
    ["\u{1D567}", "v"],
    ["\u{1D568}", "w"],
    ["\u{1D569}", "x"],
    ["\u{1D56A}", "y"],
    ["\u{1D56B}", "z"],
    ["\u{1D56C}", "A"],
    ["\u{1D56D}", "B"],
    ["\u{1D56E}", "C"],
    ["\u{1D56F}", "D"],
    ["\u{1D570}", "E"],
    ["\u{1D571}", "F"],
    ["\u{1D572}", "G"],
    ["\u{1D573}", "H"],
    ["\u{1D574}", "I"],
    ["\u{1D575}", "J"],
    ["\u{1D576}", "K"],
    ["\u{1D577}", "L"],
    ["\u{1D578}", "M"],
    ["\u{1D579}", "N"],
    ["\u{1D57A}", "O"],
    ["\u{1D57B}", "P"],
    ["\u{1D57C}", "Q"],
    ["\u{1D57D}", "R"],
    ["\u{1D57E}", "S"],
    ["\u{1D57F}", "T"],
    ["\u{1D580}", "U"],
    ["\u{1D581}", "V"],
    ["\u{1D582}", "W"],
    ["\u{1D583}", "X"],
    ["\u{1D584}", "Y"],
    ["\u{1D585}", "Z"],
    ["\u{1D586}", "a"],
    ["\u{1D587}", "b"],
    ["\u{1D588}", "c"],
    ["\u{1D589}", "d"],
    ["\u{1D58A}", "e"],
    ["\u{1D58B}", "f"],
    ["\u{1D58C}", "g"],
    ["\u{1D58D}", "h"],
    ["\u{1D58E}", "i"],
    ["\u{1D58F}", "j"],
    ["\u{1D590}", "k"],
    ["\u{1D591}", "l"],
    ["\u{1D592}", "m"],
    ["\u{1D593}", "n"],
    ["\u{1D594}", "o"],
    ["\u{1D595}", "p"],
    ["\u{1D596}", "q"],
    ["\u{1D597}", "r"],
    ["\u{1D598}", "s"],
    ["\u{1D599}", "t"],
    ["\u{1D59A}", "u"],
    ["\u{1D59B}", "v"],
    ["\u{1D59C}", "w"],
    ["\u{1D59D}", "x"],
    ["\u{1D59E}", "y"],
    ["\u{1D59F}", "z"],
    ["\u{1D5A0}", "A"],
    ["\u{1D5A1}", "B"],
    ["\u{1D5A2}", "C"],
    ["\u{1D5A3}", "D"],
    ["\u{1D5A4}", "E"],
    ["\u{1D5A5}", "F"],
    ["\u{1D5A6}", "G"],
    ["\u{1D5A7}", "H"],
    ["\u{1D5A8}", "I"],
    ["\u{1D5A9}", "J"],
    ["\u{1D5AA}", "K"],
    ["\u{1D5AB}", "L"],
    ["\u{1D5AC}", "M"],
    ["\u{1D5AD}", "N"],
    ["\u{1D5AE}", "O"],
    ["\u{1D5AF}", "P"],
    ["\u{1D5B0}", "Q"],
    ["\u{1D5B1}", "R"],
    ["\u{1D5B2}", "S"],
    ["\u{1D5B3}", "T"],
    ["\u{1D5B4}", "U"],
    ["\u{1D5B5}", "V"],
    ["\u{1D5B6}", "W"],
    ["\u{1D5B7}", "X"],
    ["\u{1D5B8}", "Y"],
    ["\u{1D5B9}", "Z"],
    ["\u{1D5BA}", "a"],
    ["\u{1D5BB}", "b"],
    ["\u{1D5BC}", "c"],
    ["\u{1D5BD}", "d"],
    ["\u{1D5BE}", "e"],
    ["\u{1D5BF}", "f"],
    ["\u{1D5C0}", "g"],
    ["\u{1D5C1}", "h"],
    ["\u{1D5C2}", "i"],
    ["\u{1D5C3}", "j"],
    ["\u{1D5C4}", "k"],
    ["\u{1D5C5}", "l"],
    ["\u{1D5C6}", "m"],
    ["\u{1D5C7}", "n"],
    ["\u{1D5C8}", "o"],
    ["\u{1D5C9}", "p"],
    ["\u{1D5CA}", "q"],
    ["\u{1D5CB}", "r"],
    ["\u{1D5CC}", "s"],
    ["\u{1D5CD}", "t"],
    ["\u{1D5CE}", "u"],
    ["\u{1D5CF}", "v"],
    ["\u{1D5D0}", "w"],
    ["\u{1D5D1}", "x"],
    ["\u{1D5D2}", "y"],
    ["\u{1D5D3}", "z"],
    ["\u{1D5D4}", "A"],
    ["\u{1D5D5}", "B"],
    ["\u{1D5D6}", "C"],
    ["\u{1D5D7}", "D"],
    ["\u{1D5D8}", "E"],
    ["\u{1D5D9}", "F"],
    ["\u{1D5DA}", "G"],
    ["\u{1D5DB}", "H"],
    ["\u{1D5DC}", "I"],
    ["\u{1D5DD}", "J"],
    ["\u{1D5DE}", "K"],
    ["\u{1D5DF}", "L"],
    ["\u{1D5E0}", "M"],
    ["\u{1D5E1}", "N"],
    ["\u{1D5E2}", "O"],
    ["\u{1D5E3}", "P"],
    ["\u{1D5E4}", "Q"],
    ["\u{1D5E5}", "R"],
    ["\u{1D5E6}", "S"],
    ["\u{1D5E7}", "T"],
    ["\u{1D5E8}", "U"],
    ["\u{1D5E9}", "V"],
    ["\u{1D5EA}", "W"],
    ["\u{1D5EB}", "X"],
    ["\u{1D5EC}", "Y"],
    ["\u{1D5ED}", "Z"],
    ["\u{1D5EE}", "a"],
    ["\u{1D5EF}", "b"],
    ["\u{1D5F0}", "c"],
    ["\u{1D5F1}", "d"],
    ["\u{1D5F2}", "e"],
    ["\u{1D5F3}", "f"],
    ["\u{1D5F4}", "g"],
    ["\u{1D5F5}", "h"],
    ["\u{1D5F6}", "i"],
    ["\u{1D5F7}", "j"],
    ["\u{1D5F8}", "k"],
    ["\u{1D5F9}", "l"],
    ["\u{1D5FA}", "m"],
    ["\u{1D5FB}", "n"],
    ["\u{1D5FC}", "o"],
    ["\u{1D5FD}", "p"],
    ["\u{1D5FE}", "q"],
    ["\u{1D5FF}", "r"],
    ["\u{1D600}", "s"],
    ["\u{1D601}", "t"],
    ["\u{1D602}", "u"],
    ["\u{1D603}", "v"],
    ["\u{1D604}", "w"],
    ["\u{1D605}", "x"],
    ["\u{1D606}", "y"],
    ["\u{1D607}", "z"],
    ["\u{1D608}", "A"],
    ["\u{1D609}", "B"],
    ["\u{1D60A}", "C"],
    ["\u{1D60B}", "D"],
    ["\u{1D60C}", "E"],
    ["\u{1D60D}", "F"],
    ["\u{1D60E}", "G"],
    ["\u{1D60F}", "H"],
    ["\u{1D610}", "I"],
    ["\u{1D611}", "J"],
    ["\u{1D612}", "K"],
    ["\u{1D613}", "L"],
    ["\u{1D614}", "M"],
    ["\u{1D615}", "N"],
    ["\u{1D616}", "O"],
    ["\u{1D617}", "P"],
    ["\u{1D618}", "Q"],
    ["\u{1D619}", "R"],
    ["\u{1D61A}", "S"],
    ["\u{1D61B}", "T"],
    ["\u{1D61C}", "U"],
    ["\u{1D61D}", "V"],
    ["\u{1D61E}", "W"],
    ["\u{1D61F}", "X"],
    ["\u{1D620}", "Y"],
    ["\u{1D621}", "Z"],
    ["\u{1D622}", "a"],
    ["\u{1D623}", "b"],
    ["\u{1D624}", "c"],
    ["\u{1D625}", "d"],
    ["\u{1D626}", "e"],
    ["\u{1D627}", "f"],
    ["\u{1D628}", "g"],
    ["\u{1D629}", "h"],
    ["\u{1D62A}", "i"],
    ["\u{1D62B}", "j"],
    ["\u{1D62C}", "k"],
    ["\u{1D62D}", "l"],
    ["\u{1D62E}", "m"],
    ["\u{1D62F}", "n"],
    ["\u{1D630}", "o"],
    ["\u{1D631}", "p"],
    ["\u{1D632}", "q"],
    ["\u{1D633}", "r"],
    ["\u{1D634}", "s"],
    ["\u{1D635}", "t"],
    ["\u{1D636}", "u"],
    ["\u{1D637}", "v"],
    ["\u{1D638}", "w"],
    ["\u{1D639}", "x"],
    ["\u{1D63A}", "y"],
    ["\u{1D63B}", "z"],
    ["\u{1D63C}", "A"],
    ["\u{1D63D}", "B"],
    ["\u{1D63E}", "C"],
    ["\u{1D63F}", "D"],
    ["\u{1D640}", "E"],
    ["\u{1D641}", "F"],
    ["\u{1D642}", "G"],
    ["\u{1D643}", "H"],
    ["\u{1D644}", "I"],
    ["\u{1D645}", "J"],
    ["\u{1D646}", "K"],
    ["\u{1D647}", "L"],
    ["\u{1D648}", "M"],
    ["\u{1D649}", "N"],
    ["\u{1D64A}", "O"],
    ["\u{1D64B}", "P"],
    ["\u{1D64C}", "Q"],
    ["\u{1D64D}", "R"],
    ["\u{1D64E}", "S"],
    ["\u{1D64F}", "T"],
    ["\u{1D650}", "U"],
    ["\u{1D651}", "V"],
    ["\u{1D652}", "W"],
    ["\u{1D653}", "X"],
    ["\u{1D654}", "Y"],
    ["\u{1D655}", "Z"],
    ["\u{1D656}", "a"],
    ["\u{1D657}", "b"],
    ["\u{1D658}", "c"],
    ["\u{1D659}", "d"],
    ["\u{1D65A}", "e"],
    ["\u{1D65B}", "f"],
    ["\u{1D65C}", "g"],
    ["\u{1D65D}", "h"],
    ["\u{1D65E}", "i"],
    ["\u{1D65F}", "j"],
    ["\u{1D660}", "k"],
    ["\u{1D661}", "l"],
    ["\u{1D662}", "m"],
    ["\u{1D663}", "n"],
    ["\u{1D664}", "o"],
    ["\u{1D665}", "p"],
    ["\u{1D666}", "q"],
    ["\u{1D667}", "r"],
    ["\u{1D668}", "s"],
    ["\u{1D669}", "t"],
    ["\u{1D66A}", "u"],
    ["\u{1D66B}", "v"],
    ["\u{1D66C}", "w"],
    ["\u{1D66D}", "x"],
    ["\u{1D66E}", "y"],
    ["\u{1D66F}", "z"],
    ["\u{1D670}", "A"],
    ["\u{1D671}", "B"],
    ["\u{1D672}", "C"],
    ["\u{1D673}", "D"],
    ["\u{1D674}", "E"],
    ["\u{1D675}", "F"],
    ["\u{1D676}", "G"],
    ["\u{1D677}", "H"],
    ["\u{1D678}", "I"],
    ["\u{1D679}", "J"],
    ["\u{1D67A}", "K"],
    ["\u{1D67B}", "L"],
    ["\u{1D67C}", "M"],
    ["\u{1D67D}", "N"],
    ["\u{1D67E}", "O"],
    ["\u{1D67F}", "P"],
    ["\u{1D680}", "Q"],
    ["\u{1D681}", "R"],
    ["\u{1D682}", "S"],
    ["\u{1D683}", "T"],
    ["\u{1D684}", "U"],
    ["\u{1D685}", "V"],
    ["\u{1D686}", "W"],
    ["\u{1D687}", "X"],
    ["\u{1D688}", "Y"],
    ["\u{1D689}", "Z"],
    ["\u{1D68A}", "a"],
    ["\u{1D68B}", "b"],
    ["\u{1D68C}", "c"],
    ["\u{1D68D}", "d"],
    ["\u{1D68E}", "e"],
    ["\u{1D68F}", "f"],
    ["\u{1D690}", "g"],
    ["\u{1D691}", "h"],
    ["\u{1D692}", "i"],
    ["\u{1D693}", "j"],
    ["\u{1D694}", "k"],
    ["\u{1D695}", "l"],
    ["\u{1D696}", "m"],
    ["\u{1D697}", "n"],
    ["\u{1D698}", "o"],
    ["\u{1D699}", "p"],
    ["\u{1D69A}", "q"],
    ["\u{1D69B}", "r"],
    ["\u{1D69C}", "s"],
    ["\u{1D69D}", "t"],
    ["\u{1D69E}", "u"],
    ["\u{1D69F}", "v"],
    ["\u{1D6A0}", "w"],
    ["\u{1D6A1}", "x"],
    ["\u{1D6A2}", "y"],
    ["\u{1D6A3}", "z"],
    // Dotless letters
    ["\u{1D6A4}", "l"],
    ["\u{1D6A5}", "j"],
    // Greek
    ["\u{1D6E2}", "A"],
    ["\u{1D6E3}", "B"],
    ["\u{1D6E4}", "G"],
    ["\u{1D6E5}", "D"],
    ["\u{1D6E6}", "E"],
    ["\u{1D6E7}", "Z"],
    ["\u{1D6E8}", "I"],
    ["\u{1D6E9}", "TH"],
    ["\u{1D6EA}", "I"],
    ["\u{1D6EB}", "K"],
    ["\u{1D6EC}", "L"],
    ["\u{1D6ED}", "M"],
    ["\u{1D6EE}", "N"],
    ["\u{1D6EF}", "KS"],
    ["\u{1D6F0}", "O"],
    ["\u{1D6F1}", "P"],
    ["\u{1D6F2}", "R"],
    ["\u{1D6F3}", "TH"],
    ["\u{1D6F4}", "S"],
    ["\u{1D6F5}", "T"],
    ["\u{1D6F6}", "Y"],
    ["\u{1D6F7}", "F"],
    ["\u{1D6F8}", "x"],
    ["\u{1D6F9}", "PS"],
    ["\u{1D6FA}", "O"],
    ["\u{1D6FB}", "D"],
    ["\u{1D6FC}", "a"],
    ["\u{1D6FD}", "b"],
    ["\u{1D6FE}", "g"],
    ["\u{1D6FF}", "d"],
    ["\u{1D700}", "e"],
    ["\u{1D701}", "z"],
    ["\u{1D702}", "i"],
    ["\u{1D703}", "th"],
    ["\u{1D704}", "i"],
    ["\u{1D705}", "k"],
    ["\u{1D706}", "l"],
    ["\u{1D707}", "m"],
    ["\u{1D708}", "n"],
    ["\u{1D709}", "ks"],
    ["\u{1D70A}", "o"],
    ["\u{1D70B}", "p"],
    ["\u{1D70C}", "r"],
    ["\u{1D70D}", "s"],
    ["\u{1D70E}", "s"],
    ["\u{1D70F}", "t"],
    ["\u{1D710}", "y"],
    ["\u{1D711}", "f"],
    ["\u{1D712}", "x"],
    ["\u{1D713}", "ps"],
    ["\u{1D714}", "o"],
    ["\u{1D715}", "d"],
    ["\u{1D716}", "E"],
    ["\u{1D717}", "TH"],
    ["\u{1D718}", "K"],
    ["\u{1D719}", "f"],
    ["\u{1D71A}", "r"],
    ["\u{1D71B}", "p"],
    ["\u{1D71C}", "A"],
    ["\u{1D71D}", "V"],
    ["\u{1D71E}", "G"],
    ["\u{1D71F}", "D"],
    ["\u{1D720}", "E"],
    ["\u{1D721}", "Z"],
    ["\u{1D722}", "I"],
    ["\u{1D723}", "TH"],
    ["\u{1D724}", "I"],
    ["\u{1D725}", "K"],
    ["\u{1D726}", "L"],
    ["\u{1D727}", "M"],
    ["\u{1D728}", "N"],
    ["\u{1D729}", "KS"],
    ["\u{1D72A}", "O"],
    ["\u{1D72B}", "P"],
    ["\u{1D72C}", "S"],
    ["\u{1D72D}", "TH"],
    ["\u{1D72E}", "S"],
    ["\u{1D72F}", "T"],
    ["\u{1D730}", "Y"],
    ["\u{1D731}", "F"],
    ["\u{1D732}", "X"],
    ["\u{1D733}", "PS"],
    ["\u{1D734}", "O"],
    ["\u{1D735}", "D"],
    ["\u{1D736}", "a"],
    ["\u{1D737}", "v"],
    ["\u{1D738}", "g"],
    ["\u{1D739}", "d"],
    ["\u{1D73A}", "e"],
    ["\u{1D73B}", "z"],
    ["\u{1D73C}", "i"],
    ["\u{1D73D}", "th"],
    ["\u{1D73E}", "i"],
    ["\u{1D73F}", "k"],
    ["\u{1D740}", "l"],
    ["\u{1D741}", "m"],
    ["\u{1D742}", "n"],
    ["\u{1D743}", "ks"],
    ["\u{1D744}", "o"],
    ["\u{1D745}", "p"],
    ["\u{1D746}", "r"],
    ["\u{1D747}", "s"],
    ["\u{1D748}", "s"],
    ["\u{1D749}", "t"],
    ["\u{1D74A}", "y"],
    ["\u{1D74B}", "f"],
    ["\u{1D74C}", "x"],
    ["\u{1D74D}", "ps"],
    ["\u{1D74E}", "o"],
    ["\u{1D74F}", "a"],
    ["\u{1D750}", "e"],
    ["\u{1D751}", "i"],
    ["\u{1D752}", "k"],
    ["\u{1D753}", "f"],
    ["\u{1D754}", "r"],
    ["\u{1D755}", "p"],
    ["\u{1D756}", "A"],
    ["\u{1D757}", "B"],
    ["\u{1D758}", "G"],
    ["\u{1D759}", "D"],
    ["\u{1D75A}", "E"],
    ["\u{1D75B}", "Z"],
    ["\u{1D75C}", "I"],
    ["\u{1D75D}", "TH"],
    ["\u{1D75E}", "I"],
    ["\u{1D75F}", "K"],
    ["\u{1D760}", "L"],
    ["\u{1D761}", "M"],
    ["\u{1D762}", "N"],
    ["\u{1D763}", "KS"],
    ["\u{1D764}", "O"],
    ["\u{1D765}", "P"],
    ["\u{1D766}", "R"],
    ["\u{1D767}", "TH"],
    ["\u{1D768}", "S"],
    ["\u{1D769}", "T"],
    ["\u{1D76A}", "Y"],
    ["\u{1D76B}", "F"],
    ["\u{1D76C}", "X"],
    ["\u{1D76D}", "PS"],
    ["\u{1D76E}", "O"],
    ["\u{1D76F}", "D"],
    ["\u{1D770}", "a"],
    ["\u{1D771}", "v"],
    ["\u{1D772}", "g"],
    ["\u{1D773}", "d"],
    ["\u{1D774}", "e"],
    ["\u{1D775}", "z"],
    ["\u{1D776}", "i"],
    ["\u{1D777}", "th"],
    ["\u{1D778}", "i"],
    ["\u{1D779}", "k"],
    ["\u{1D77A}", "l"],
    ["\u{1D77B}", "m"],
    ["\u{1D77C}", "n"],
    ["\u{1D77D}", "ks"],
    ["\u{1D77E}", "o"],
    ["\u{1D77F}", "p"],
    ["\u{1D780}", "r"],
    ["\u{1D781}", "s"],
    ["\u{1D782}", "s"],
    ["\u{1D783}", "t"],
    ["\u{1D784}", "y"],
    ["\u{1D785}", "f"],
    ["\u{1D786}", "x"],
    ["\u{1D787}", "ps"],
    ["\u{1D788}", "o"],
    ["\u{1D789}", "a"],
    ["\u{1D78A}", "e"],
    ["\u{1D78B}", "i"],
    ["\u{1D78C}", "k"],
    ["\u{1D78D}", "f"],
    ["\u{1D78E}", "r"],
    ["\u{1D78F}", "p"],
    ["\u{1D790}", "A"],
    ["\u{1D791}", "V"],
    ["\u{1D792}", "G"],
    ["\u{1D793}", "D"],
    ["\u{1D794}", "E"],
    ["\u{1D795}", "Z"],
    ["\u{1D796}", "I"],
    ["\u{1D797}", "TH"],
    ["\u{1D798}", "I"],
    ["\u{1D799}", "K"],
    ["\u{1D79A}", "L"],
    ["\u{1D79B}", "M"],
    ["\u{1D79C}", "N"],
    ["\u{1D79D}", "KS"],
    ["\u{1D79E}", "O"],
    ["\u{1D79F}", "P"],
    ["\u{1D7A0}", "S"],
    ["\u{1D7A1}", "TH"],
    ["\u{1D7A2}", "S"],
    ["\u{1D7A3}", "T"],
    ["\u{1D7A4}", "Y"],
    ["\u{1D7A5}", "F"],
    ["\u{1D7A6}", "X"],
    ["\u{1D7A7}", "PS"],
    ["\u{1D7A8}", "O"],
    ["\u{1D7A9}", "D"],
    ["\u{1D7AA}", "av"],
    ["\u{1D7AB}", "g"],
    ["\u{1D7AC}", "d"],
    ["\u{1D7AD}", "e"],
    ["\u{1D7AE}", "z"],
    ["\u{1D7AF}", "i"],
    ["\u{1D7B0}", "i"],
    ["\u{1D7B1}", "th"],
    ["\u{1D7B2}", "i"],
    ["\u{1D7B3}", "k"],
    ["\u{1D7B4}", "l"],
    ["\u{1D7B5}", "m"],
    ["\u{1D7B6}", "n"],
    ["\u{1D7B7}", "ks"],
    ["\u{1D7B8}", "o"],
    ["\u{1D7B9}", "p"],
    ["\u{1D7BA}", "r"],
    ["\u{1D7BB}", "s"],
    ["\u{1D7BC}", "s"],
    ["\u{1D7BD}", "t"],
    ["\u{1D7BE}", "y"],
    ["\u{1D7BF}", "f"],
    ["\u{1D7C0}", "x"],
    ["\u{1D7C1}", "ps"],
    ["\u{1D7C2}", "o"],
    ["\u{1D7C3}", "a"],
    ["\u{1D7C4}", "e"],
    ["\u{1D7C5}", "i"],
    ["\u{1D7C6}", "k"],
    ["\u{1D7C7}", "f"],
    ["\u{1D7C8}", "r"],
    ["\u{1D7C9}", "p"],
    ["\u{1D7CA}", "F"],
    ["\u{1D7CB}", "f"],
    ["\u249C", "(a)"],
    ["\u249D", "(b)"],
    ["\u249E", "(c)"],
    ["\u249F", "(d)"],
    ["\u24A0", "(e)"],
    ["\u24A1", "(f)"],
    ["\u24A2", "(g)"],
    ["\u24A3", "(h)"],
    ["\u24A4", "(i)"],
    ["\u24A5", "(j)"],
    ["\u24A6", "(k)"],
    ["\u24A7", "(l)"],
    ["\u24A8", "(m)"],
    ["\u24A9", "(n)"],
    ["\u24AA", "(o)"],
    ["\u24AB", "(p)"],
    ["\u24AC", "(q)"],
    ["\u24AD", "(r)"],
    ["\u24AE", "(s)"],
    ["\u24AF", "(t)"],
    ["\u24B0", "(u)"],
    ["\u24B1", "(v)"],
    ["\u24B2", "(w)"],
    ["\u24B3", "(x)"],
    ["\u24B4", "(y)"],
    ["\u24B5", "(z)"],
    ["\u24B6", "(A)"],
    ["\u24B7", "(B)"],
    ["\u24B8", "(C)"],
    ["\u24B9", "(D)"],
    ["\u24BA", "(E)"],
    ["\u24BB", "(F)"],
    ["\u24BC", "(G)"],
    ["\u24BD", "(H)"],
    ["\u24BE", "(I)"],
    ["\u24BF", "(J)"],
    ["\u24C0", "(K)"],
    ["\u24C1", "(L)"],
    ["\u24C3", "(N)"],
    ["\u24C4", "(O)"],
    ["\u24C5", "(P)"],
    ["\u24C6", "(Q)"],
    ["\u24C7", "(R)"],
    ["\u24C8", "(S)"],
    ["\u24C9", "(T)"],
    ["\u24CA", "(U)"],
    ["\u24CB", "(V)"],
    ["\u24CC", "(W)"],
    ["\u24CD", "(X)"],
    ["\u24CE", "(Y)"],
    ["\u24CF", "(Z)"],
    ["\u24D0", "(a)"],
    ["\u24D1", "(b)"],
    ["\u24D2", "(b)"],
    ["\u24D3", "(c)"],
    ["\u24D4", "(e)"],
    ["\u24D5", "(f)"],
    ["\u24D6", "(g)"],
    ["\u24D7", "(h)"],
    ["\u24D8", "(i)"],
    ["\u24D9", "(j)"],
    ["\u24DA", "(k)"],
    ["\u24DB", "(l)"],
    ["\u24DC", "(m)"],
    ["\u24DD", "(n)"],
    ["\u24DE", "(o)"],
    ["\u24DF", "(p)"],
    ["\u24E0", "(q)"],
    ["\u24E1", "(r)"],
    ["\u24E2", "(s)"],
    ["\u24E3", "(t)"],
    ["\u24E4", "(u)"],
    ["\u24E5", "(v)"],
    ["\u24E6", "(w)"],
    ["\u24E7", "(x)"],
    ["\u24E8", "(y)"],
    ["\u24E9", "(z)"],
    // Maltese
    ["\u010A", "C"],
    ["\u010B", "c"],
    ["\u0120", "G"],
    ["\u0121", "g"],
    ["\u0126", "H"],
    ["\u0127", "h"],
    ["\u017B", "Z"],
    ["\u017C", "z"],
    // Numbers
    ["\u{1D7CE}", "0"],
    ["\u{1D7CF}", "1"],
    ["\u{1D7D0}", "2"],
    ["\u{1D7D1}", "3"],
    ["\u{1D7D2}", "4"],
    ["\u{1D7D3}", "5"],
    ["\u{1D7D4}", "6"],
    ["\u{1D7D5}", "7"],
    ["\u{1D7D6}", "8"],
    ["\u{1D7D7}", "9"],
    ["\u{1D7D8}", "0"],
    ["\u{1D7D9}", "1"],
    ["\u{1D7DA}", "2"],
    ["\u{1D7DB}", "3"],
    ["\u{1D7DC}", "4"],
    ["\u{1D7DD}", "5"],
    ["\u{1D7DE}", "6"],
    ["\u{1D7DF}", "7"],
    ["\u{1D7E0}", "8"],
    ["\u{1D7E1}", "9"],
    ["\u{1D7E2}", "0"],
    ["\u{1D7E3}", "1"],
    ["\u{1D7E4}", "2"],
    ["\u{1D7E5}", "3"],
    ["\u{1D7E6}", "4"],
    ["\u{1D7E7}", "5"],
    ["\u{1D7E8}", "6"],
    ["\u{1D7E9}", "7"],
    ["\u{1D7EA}", "8"],
    ["\u{1D7EB}", "9"],
    ["\u{1D7EC}", "0"],
    ["\u{1D7ED}", "1"],
    ["\u{1D7EE}", "2"],
    ["\u{1D7EF}", "3"],
    ["\u{1D7F0}", "4"],
    ["\u{1D7F1}", "5"],
    ["\u{1D7F2}", "6"],
    ["\u{1D7F3}", "7"],
    ["\u{1D7F4}", "8"],
    ["\u{1D7F5}", "9"],
    ["\u{1D7F6}", "0"],
    ["\u{1D7F7}", "1"],
    ["\u{1D7F8}", "2"],
    ["\u{1D7F9}", "3"],
    ["\u{1D7FA}", "4"],
    ["\u{1D7FB}", "5"],
    ["\u{1D7FC}", "6"],
    ["\u{1D7FD}", "7"],
    ["\u{1D7FE}", "8"],
    ["\u{1D7FF}", "9"],
    ["\u2460", "1"],
    ["\u2461", "2"],
    ["\u2462", "3"],
    ["\u2463", "4"],
    ["\u2464", "5"],
    ["\u2465", "6"],
    ["\u2466", "7"],
    ["\u2467", "8"],
    ["\u2468", "9"],
    ["\u2469", "10"],
    ["\u246A", "11"],
    ["\u246B", "12"],
    ["\u246C", "13"],
    ["\u246D", "14"],
    ["\u246E", "15"],
    ["\u246F", "16"],
    ["\u2470", "17"],
    ["\u2471", "18"],
    ["\u2472", "19"],
    ["\u2473", "20"],
    ["\u2474", "1"],
    ["\u2475", "2"],
    ["\u2476", "3"],
    ["\u2477", "4"],
    ["\u2478", "5"],
    ["\u2479", "6"],
    ["\u247A", "7"],
    ["\u247B", "8"],
    ["\u247C", "9"],
    ["\u247D", "10"],
    ["\u247E", "11"],
    ["\u247F", "12"],
    ["\u2480", "13"],
    ["\u2481", "14"],
    ["\u2482", "15"],
    ["\u2483", "16"],
    ["\u2484", "17"],
    ["\u2485", "18"],
    ["\u2486", "19"],
    ["\u2487", "20"],
    ["\u2488", "1."],
    ["\u2489", "2."],
    ["\u248A", "3."],
    ["\u248B", "4."],
    ["\u248C", "5."],
    ["\u248D", "6."],
    ["\u248E", "7."],
    ["\u248F", "8."],
    ["\u2490", "9."],
    ["\u2491", "10."],
    ["\u2492", "11."],
    ["\u2493", "12."],
    ["\u2494", "13."],
    ["\u2495", "14."],
    ["\u2496", "15."],
    ["\u2497", "16."],
    ["\u2498", "17."],
    ["\u2499", "18."],
    ["\u249A", "19."],
    ["\u249B", "20."],
    ["\u24EA", "0"],
    ["\u24EB", "11"],
    ["\u24EC", "12"],
    ["\u24ED", "13"],
    ["\u24EE", "14"],
    ["\u24EF", "15"],
    ["\u24F0", "16"],
    ["\u24F1", "17"],
    ["\u24F2", "18"],
    ["\u24F3", "19"],
    ["\u24F4", "20"],
    ["\u24F5", "1"],
    ["\u24F6", "2"],
    ["\u24F7", "3"],
    ["\u24F8", "4"],
    ["\u24F9", "5"],
    ["\u24FA", "6"],
    ["\u24FB", "7"],
    ["\u24FC", "8"],
    ["\u24FD", "9"],
    ["\u24FE", "10"],
    ["\u24FF", "0"],
    // Punctuation
    ["\u{1F670}", "&"],
    ["\u{1F671}", "&"],
    ["\u{1F672}", "&"],
    ["\u{1F673}", "&"],
    ["\u{1F674}", "&"],
    ["\u{1F675}", "&"],
    ["\u{1F676}", '"'],
    ["\u{1F677}", '"'],
    ["\u{1F678}", '"'],
    ["\u203D", "?!"],
    ["\u{1F679}", "?!"],
    ["\u{1F67A}", "?!"],
    ["\u{1F67B}", "?!"],
    ["\u{1F67C}", "/"],
    ["\u{1F67D}", "\\"],
    // Alchemy
    ["\u{1F707}", "AR"],
    ["\u{1F708}", "V"],
    ["\u{1F709}", "V"],
    ["\u{1F706}", "VR"],
    ["\u{1F705}", "VF"],
    ["\u{1F729}", "2"],
    ["\u{1F72A}", "5"],
    ["\u{1F761}", "f"],
    ["\u{1F762}", "W"],
    ["\u{1F763}", "U"],
    ["\u{1F767}", "V"],
    ["\u{1F768}", "T"],
    ["\u{1F76A}", "V"],
    ["\u{1F76B}", "MB"],
    ["\u{1F76C}", "VB"],
    ["\u{1F772}", "3B"],
    ["\u{1F773}", "3B"],
    // Emojis
    ["\u{1F4AF}", "100"],
    ["\u{1F519}", "BACK"],
    ["\u{1F51A}", "END"],
    ["\u{1F51B}", "ON!"],
    ["\u{1F51C}", "SOON"],
    ["\u{1F51D}", "TOP"],
    ["\u{1F51E}", "18"],
    ["\u{1F524}", "abc"],
    ["\u{1F520}", "ABCD"],
    ["\u{1F521}", "abcd"],
    ["\u{1F522}", "1234"],
    ["\u{1F523}", "T&@%"],
    ["#\uFE0F\u20E3", "#"],
    ["*\uFE0F\u20E3", "*"],
    ["0\uFE0F\u20E3", "0"],
    ["1\uFE0F\u20E3", "1"],
    ["2\uFE0F\u20E3", "2"],
    ["3\uFE0F\u20E3", "3"],
    ["4\uFE0F\u20E3", "4"],
    ["5\uFE0F\u20E3", "5"],
    ["6\uFE0F\u20E3", "6"],
    ["7\uFE0F\u20E3", "7"],
    ["8\uFE0F\u20E3", "8"],
    ["9\uFE0F\u20E3", "9"],
    ["\u{1F51F}", "10"],
    ["\u{1F170}\uFE0F", "A"],
    ["\u{1F171}\uFE0F", "B"],
    ["\u{1F18E}", "AB"],
    ["\u{1F191}", "CL"],
    ["\u{1F17E}\uFE0F", "O"],
    ["\u{1F17F}", "P"],
    ["\u{1F198}", "SOS"],
    ["\u{1F172}", "C"],
    ["\u{1F173}", "D"],
    ["\u{1F174}", "E"],
    ["\u{1F175}", "F"],
    ["\u{1F176}", "G"],
    ["\u{1F177}", "H"],
    ["\u{1F178}", "I"],
    ["\u{1F179}", "J"],
    ["\u{1F17A}", "K"],
    ["\u{1F17B}", "L"],
    ["\u{1F17C}", "M"],
    ["\u{1F17D}", "N"],
    ["\u{1F180}", "Q"],
    ["\u{1F181}", "R"],
    ["\u{1F182}", "S"],
    ["\u{1F183}", "T"],
    ["\u{1F184}", "U"],
    ["\u{1F185}", "V"],
    ["\u{1F186}", "W"],
    ["\u{1F187}", "X"],
    ["\u{1F188}", "Y"],
    ["\u{1F189}", "Z"]
  ];
  var replacements_default = replacements;

  // node_modules/@sindresorhus/transliterate/index.js
  var doCustomReplacements = (string, replacements2) => {
    for (const [key, value] of replacements2) {
      string = string.replace(new RegExp(escapeStringRegexp2(key), "g"), value);
    }
    return string;
  };
  function transliterate(string, options) {
    if (typeof string !== "string") {
      throw new TypeError(`Expected a string, got \`${typeof string}\``);
    }
    options = {
      customReplacements: [],
      ...options
    };
    const customReplacements = new Map([
      ...replacements_default,
      ...options.customReplacements
    ]);
    string = string.normalize();
    string = doCustomReplacements(string, customReplacements);
    string = string.normalize("NFD").replace(/\p{Diacritic}/gu, "").normalize();
    return string;
  }

  // node_modules/@sindresorhus/slugify/overridable-replacements.js
  var overridableReplacements = [
    ["&", " and "],
    ["\u{1F984}", " unicorn "],
    ["\u2665", " love "]
  ];
  var overridable_replacements_default = overridableReplacements;

  // node_modules/@sindresorhus/slugify/index.js
  var decamelize = (string) => {
    return string.replace(/([A-Z]{2,})(\d+)/g, "$1 $2").replace(/([a-z\d]+)([A-Z]{2,})/g, "$1 $2").replace(/([a-z\d])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-rt-z\d]+)/g, "$1 $2");
  };
  var removeMootSeparators = (string, separator) => {
    const escapedSeparator = escapeStringRegexp(separator);
    return string.replace(new RegExp(`${escapedSeparator}{2,}`, "g"), separator).replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, "g"), "");
  };
  var buildPatternSlug = (options) => {
    let negationSetPattern = "a-z\\d";
    negationSetPattern += options.lowercase ? "" : "A-Z";
    if (options.preserveCharacters.length > 0) {
      for (const character of options.preserveCharacters) {
        if (character === options.separator) {
          throw new Error(`The separator character \`${options.separator}\` cannot be included in preserved characters: ${options.preserveCharacters}`);
        }
        negationSetPattern += escapeStringRegexp(character);
      }
    }
    return new RegExp(`[^${negationSetPattern}]+`, "g");
  };
  function slugify(string, options) {
    if (typeof string !== "string") {
      throw new TypeError(`Expected a string, got \`${typeof string}\``);
    }
    options = {
      separator: "-",
      lowercase: true,
      decamelize: true,
      customReplacements: [],
      preserveLeadingUnderscore: false,
      preserveTrailingDash: false,
      preserveCharacters: [],
      ...options
    };
    const shouldPrependUnderscore = options.preserveLeadingUnderscore && string.startsWith("_");
    const shouldAppendDash = options.preserveTrailingDash && string.endsWith("-");
    const customReplacements = new Map([
      ...overridable_replacements_default,
      ...options.customReplacements
    ]);
    string = transliterate(string, { customReplacements });
    if (options.decamelize) {
      string = decamelize(string);
    }
    const patternSlug = buildPatternSlug(options);
    if (options.lowercase) {
      string = string.toLowerCase();
    }
    string = string.replace(/([a-zA-Z\d]+)'([ts])(\s|$)/g, "$1$2$3");
    string = string.replace(patternSlug, options.separator);
    string = string.replace(/\\/g, "");
    if (options.separator) {
      string = removeMootSeparators(string, options.separator);
    }
    if (shouldPrependUnderscore) {
      string = `_${string}`;
    }
    if (shouldAppendDash) {
      string = `${string}-`;
    }
    return string;
  }
  function slugifyWithCounter() {
    const occurrences = /* @__PURE__ */ new Map();
    const countable = (string, options) => {
      string = slugify(string, options);
      if (!string) {
        return "";
      }
      const stringLower = string.toLowerCase();
      const numberless = occurrences.get(stringLower.replace(/(?:-\d+?)+?$/, "")) || 0;
      const counter = occurrences.get(stringLower);
      occurrences.set(stringLower, typeof counter === "number" ? counter + 1 : 1);
      const newCounter = occurrences.get(stringLower) || 2;
      if (newCounter >= 2 || numberless > 2) {
        string = `${string}-${newCounter}`;
      }
      return string;
    };
    countable.reset = () => {
      occurrences.clear();
    };
    return countable;
  }

  // src/vellum-doc.css
  var vellum_doc_default = ":host {\n  display: flex;\n\n  padding: 0;\n  margin: 0;\n\n  --default-index-width: 300px;\n}\n\n#drawer {\n  position: sticky;\n  top: 0;\n  --min-width: 0;\n  --max-width: var(--index-width, var(--default-index-width));\n}\n\n#toggle {\n  position: fixed;\n  bottom: 1.5em;\n  left: 1.5em;\n  height: 50px;\n  width: 50px;\n}\n\n#index {\n  width: var(--index-width, var(--default-index-width));\n  border-right: 1px solid;\n  padding-bottom: 1em;\n}\n\n.scrollable {\n  min-height: 100vh;\n  max-height: 100vh;\n  overflow-y: scroll;\n  position: sticky;\n}\n\n#index h1 {\n  font: bold 1.3em inherit;\n  margin: 0;\n  padding-top: 1em;\n  padding-bottom: 0.5em;\n  line-height: 1em;\n  text-align: center;\n}\n\n#index h2 {\n  font: bold 1.15em inherit;\n}\n\n#index h3 {\n  font: 1em inherit;\n  padding-left: 1.4em;\n}\n\n#index h4 {\n  font: 0.9em inherit;\n  padding-left: 3em;\n}\n\n#index a {\n  color: inherit;\n  text-decoration: inherit;\n}\n";

  // src/hamburger-circle.svg
  var hamburger_circle_default = '<svg\n  id="toggle"\n  class="icon"\n  viewBox="0 0 64 64"\n  xml:space="preserve"\n  style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n  <g>\n    <g transform="matrix(1.56894,0,0,1.46939,-3.65277,-8.41383)">\n      <ellipse\n        cx="22.724"\n        cy="27.504"\n        rx="20.396"\n        ry="21.778"\n        style="fill:rgb(211,211,211);" />\n    </g>\n    <g transform="matrix(0.789127,0,0,0.789127,6.42717,6.64457)">\n      <path\n        d="M46.549,18.679L18.264,18.679C17.159,18.679 16.264,19.575 16.264,20.679C16.264,21.783 17.159,22.679 18.264,22.679L46.549,22.679C47.654,22.679 48.549,21.783 48.549,20.679C48.549,19.575 47.654,18.679 46.549,18.679Z"\n        style="fill:rgb(29,29,27);fill-rule:nonzero;" />\n      <path\n        d="M46.549,30.119L18.264,30.119C17.159,30.119 16.264,31.015 16.264,32.119C16.264,33.223 17.159,34.119 18.264,34.119L46.549,34.119C47.654,34.119 48.549,33.223 48.549,32.119C48.549,31.015 47.654,30.119 46.549,30.119Z"\n        style="fill:rgb(29,29,27);fill-rule:nonzero;" />\n      <path\n        d="M46.549,41.583L18.264,41.583C17.159,41.583 16.264,42.479 16.264,43.583C16.264,44.687 17.159,45.583 18.264,45.583L46.549,45.583C47.654,45.583 48.549,44.687 48.549,43.583C48.549,42.479 47.654,41.583 46.549,41.583Z"\n        style="fill:rgb(29,29,27);fill-rule:nonzero;" />\n    </g>\n  </g>\n</svg>\n';

  // node_modules/@lion/ui/components/core/src/uuid.js
  function uuid(prefix = "") {
    const elementName = prefix.length > 0 ? `${prefix}-` : "";
    return `${elementName}${Math.random().toString(36).substr(2, 10)}`;
  }

  // node_modules/@lion/ui/components/collapsible/src/LionCollapsible.js
  var LionCollapsible = class extends s3 {
    static get styles() {
      return [
        i`
        :host {
          display: block;
        }

        :host ::slotted([slot='content']) {
          overflow: hidden;
        }
      `
      ];
    }
    static get properties() {
      return {
        opened: {
          type: Boolean,
          reflect: true
        }
      };
    }
    render() {
      return x`
      <slot name="invoker"></slot>
      <slot name="content"></slot>
    `;
    }
    constructor() {
      super();
      this.opened = false;
      this.toggle = this.toggle.bind(this);
    }
    connectedCallback() {
      super.connectedCallback();
      const uid = uuid();
      if (this._invokerNode) {
        this._invokerNode.addEventListener("click", this.toggle);
        this._invokerNode.setAttribute("aria-expanded", `${this.opened}`);
        this._invokerNode.setAttribute("id", `collapsible-invoker-${uid}`);
        this._invokerNode.setAttribute("aria-controls", `collapsible-content-${uid}`);
      }
      if (this._contentNode) {
        this._contentNode.setAttribute("aria-labelledby", `collapsible-invoker-${uid}`);
        this._contentNode.setAttribute("id", `collapsible-content-${uid}`);
      }
      this.__setDefaultState();
    }
    /**
     * Update aria labels on state change.
     * @param {import('lit').PropertyValues } changedProperties
     */
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has("opened")) {
        this.__openedChanged();
      }
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      if (this._invokerNode) {
        this._invokerNode.removeEventListener("click", this.toggle);
      }
    }
    /**
     * Show extra content.
     * @public
     */
    show() {
      if (!this.opened) {
        this.opened = true;
      }
    }
    /**
     * Hide extra content.
     * @public
     */
    hide() {
      if (this.opened) {
        this.opened = false;
      }
    }
    /**
     * Toggle the current(opened/closed) state.
     * @public
     */
    toggle() {
      this.opened = !this.opened;
      this.requestUpdate();
    }
    /**
     * Show animation implementation in sub-classer.
     * @param {Object} opts
     * @protected
     */
    // eslint-disable-next-line class-methods-use-this, no-empty-function, no-unused-vars
    async _showAnimation(opts) {
    }
    /**
     * Hide animation implementation in sub-classer.
     * @param {Object} opts
     * @protected
     */
    // eslint-disable-next-line class-methods-use-this, no-empty-function, no-unused-vars
    async _hideAnimation(opts) {
    }
    /**
     * @protected
     */
    get _invokerNode() {
      return (
        /** @type {HTMLElement[]} */
        Array.from(this.children).find(
          (child) => child.slot === "invoker"
        )
      );
    }
    /**
     * @protected
     */
    get _contentNode() {
      return (
        /** @type {HTMLElement[]} */
        Array.from(this.children).find(
          (child) => child.slot === "content"
        )
      );
    }
    /**
     * @protected
     */
    get _contentHeight() {
      const size = this._contentNode?.getBoundingClientRect().height || 0;
      return `${size}px`;
    }
    /**
     * Update content slot size and fire `opened-changed` event
     * @private
     */
    __openedChanged() {
      this.__updateContentSize();
      if (this._invokerNode) {
        this._invokerNode.setAttribute("aria-expanded", `${this.opened}`);
      }
      this.dispatchEvent(new CustomEvent("opened-changed"));
    }
    /**
     * Toggle extra content visibility on state change.
     * @private
     */
    async __updateContentSize() {
      if (this._contentNode) {
        if (this.opened) {
          this._contentNode.style.setProperty("display", "");
          await this._showAnimation({ contentNode: this._contentNode });
        } else {
          await this._hideAnimation({ contentNode: this._contentNode });
          this._contentNode.style.setProperty("display", "none");
        }
      }
    }
    /**
     * Set default state for content based on `opened` attr
     * @private
     */
    __setDefaultState() {
      if (!this.opened && this._contentNode) {
        this._contentNode.style.setProperty("display", "none");
      }
    }
  };

  // node_modules/@lion/ui/components/drawer/src/drawerStyle.js
  var drawerStyle = i`
  :host {
    display: block;
    height: 100%;
    --min-width: 72px;
    --max-width: 320px;
    --min-height: auto;
    --max-height: fit-content;
    --start-width: var(--min-width);
    --start-height: 100%;
    --transition-property: width;
  }

  :host([position='top']) {
    width: 100%;
    --min-width: 0px;
    --max-width: none;
    --min-height: 50px;
    --max-height: 200px;
    --start-width: 100%;
    --start-height: var(--min-height);
    --transition-property: height;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: var(--start-width);
    height: var(--start-height);
    min-width: var(--min-width);
    max-width: var(--max-width);
    min-height: var(--min-height);
    max-height: var(--max-height);
    overflow: hidden;
    box-sizing: border-box;
    transition: var(--transition-property) 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .headline-container {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  :host([position='right']) .headline-container {
    flex-direction: row-reverse;
  }

  .content-container {
    overflow: hidden;
    flex-grow: 1;
  }

  ::slotted([slot='content']) {
    width: var(--max-width);
  }
`;

  // node_modules/@lion/ui/components/drawer/src/LionDrawer.js
  var EVENT = {
    TRANSITION_END: "transitionend",
    TRANSITION_START: "transitionstart"
  };
  var LionDrawer = class extends LionCollapsible {
    static get properties() {
      return {
        transitioning: {
          type: Boolean,
          reflect: true
        },
        opened: {
          type: Boolean,
          reflect: true
        },
        position: {
          type: String,
          reflect: true
        }
      };
    }
    constructor() {
      super();
      this.__toggle = () => {
        this.opened = !this.opened;
      };
    }
    connectedCallback() {
      super.connectedCallback();
      if (!this.hasAttribute("position")) {
        this.position = "left";
      }
      if (this._contentNode) {
        this._contentNode.style.setProperty("display", "");
      }
      this.__setBoundaries();
    }
    /**
     * Update aria labels on state change.
     * @param {import('lit').PropertyValues } changedProperties
     */
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has("opened")) {
        this._openedChanged();
      }
    }
    static get styles() {
      return [drawerStyle];
    }
    __setBoundaries() {
      const host = this.shadowRoot?.host;
      if (this.position === "top") {
        this.minHeight = host ? getComputedStyle(host).getPropertyValue("--min-height") : "0px";
        this.maxHeight = host ? getComputedStyle(host).getPropertyValue("--max-height") : "0px";
        this.minWidth = "0px";
        this.maxWidth = "none";
      } else {
        this.minWidth = host ? getComputedStyle(host).getPropertyValue("--min-width") : "0px";
        this.maxWidth = host ? getComputedStyle(host).getPropertyValue("--max-width") : "0px";
        this.minHeight = "auto";
        this.maxHeight = "fit-content";
      }
      setTimeout(() => {
        const prop = this.position === "top" ? "width" : "height";
        if (this.__contentNode) {
          this.__contentNode.style.setProperty(prop, "");
        }
      });
    }
    /**
     * Setter for position property, available values are 'top', 'left' and 'right'
     * @param {String} position
     */
    set position(position) {
      const stale = this.position;
      this._position = position;
      this.setAttribute("position", position);
      this.__setBoundaries();
      this.requestUpdate("position", stale);
    }
    get position() {
      return this._position ?? "left";
    }
    /**
     * Trigger show animation and wait for transition to be finished.
     * @param {Object} options - element node and its options
     * @param {HTMLElement} options.contentNode
     * @override
     */
    async _showAnimation({ contentNode }) {
      const min = this.position === "top" ? this.minHeight : this.minWidth;
      const max = this.position === "top" ? this.maxHeight : this.maxWidth;
      const prop = this.position === "top" ? "height" : "width";
      contentNode.style.setProperty(
        prop,
        /** @type {string} */
        min
      );
      await new Promise((resolve) => requestAnimationFrame(() => resolve(true)));
      contentNode.style.setProperty(
        prop,
        /** @type {string} */
        max
      );
      await this._waitForTransition({ contentNode });
    }
    /**
     * Trigger hide animation and wait for transition to be finished.
     * @param {Object} options - element node and its options
     * @param {HTMLElement} options.contentNode
     * @override
     */
    async _hideAnimation({ contentNode }) {
      if ((this.position === "left" || this.position === "right") && this._contentWidth === this.minWidth || this.position === "top" && this._contentHeight === this.minHeight) {
        return;
      }
      const min = this.position === "top" ? this.minHeight : this.minWidth;
      const prop = this.position === "top" ? "height" : "width";
      contentNode.style.setProperty(
        prop,
        /** @type {string} */
        min
      );
      await this._waitForTransition({ contentNode });
    }
    /**
     *  Wait until the transition event is finished.
     * @param {Object} options - element node and its options
     * @param {HTMLElement} options.contentNode
     * @returns {Promise<void>} transition event
     */
    _waitForTransition({ contentNode }) {
      return new Promise((resolve) => {
        const transitionStarted = () => {
          contentNode.removeEventListener(EVENT.TRANSITION_START, transitionStarted);
          this.transitioning = true;
        };
        contentNode.addEventListener(EVENT.TRANSITION_START, transitionStarted);
        const transitionEnded = () => {
          contentNode.removeEventListener(EVENT.TRANSITION_END, transitionEnded);
          this.transitioning = false;
          resolve();
        };
        contentNode.addEventListener(EVENT.TRANSITION_END, transitionEnded);
      });
    }
    /**
     * @protected
     */
    get __contentNode() {
      return (
        /** @type {HTMLElement} */
        this.shadowRoot?.querySelector(".container")
      );
    }
    get _contentWidth() {
      const size = this.__contentNode?.getBoundingClientRect().width || 0;
      return `${size}px`;
    }
    get _contentHeight() {
      const size = this.__contentNode?.getBoundingClientRect().height || 0;
      return `${size}px`;
    }
    _openedChanged() {
      this._updateContentSize();
      if (this._invokerNode) {
        this._invokerNode.setAttribute("aria-expanded", `${this.opened}`);
      }
      this.dispatchEvent(new CustomEvent("opened-changed"));
    }
    async _updateContentSize() {
      if (this.__contentNode) {
        if (this.opened) {
          await this._showAnimation({ contentNode: this.__contentNode });
        } else {
          await this._hideAnimation({ contentNode: this.__contentNode });
        }
      }
    }
    render() {
      return x`
      <div class="container">
        <div class="headline-container">
          <slot name="invoker"></slot>
          <slot name="headline"></slot>
        </div>
        <div class="content-container">
          <slot name="content"></slot>
        </div>
      </div>
    `;
    }
  };

  // node_modules/@lion/ui/exports/define/lion-drawer.js
  customElements.define("lion-drawer", LionDrawer);

  // src/vellum-doc.ts
  var VellumDocument = class extends s3 {
    constructor() {
      super(...arguments);
      this.slugify = slugifyWithCounter();
    }
    get headings() {
      return Array.from(this.querySelectorAll("h1, h2, h3, h4"));
    }
    get drawer() {
      return this.renderRoot.querySelector("#drawer");
    }
    get toggle() {
      return this.renderRoot.querySelector("#toggle");
    }
    connectedCallback() {
      super.connectedCallback();
      this.labelHeaders();
      this.exportIndexHeadingParts();
      this.enableMobileIndexVisibility();
    }
    firstUpdated() {
      this.checkIndexVisibility();
    }
    updated() {
      if (this.anchors) this.anchorHeadings();
    }
    render() {
      return x`
      <lion-drawer
        id="drawer"
        @click="${this.checkIndexVisibility}"
        opened
        hide>
        <div slot="content">
          <nav id="index" class="scrollable" part="index">
            ${this.renderIndex()}
          </nav>
        </div>
      </lion-drawer>

      <article id="document">
        <div @click="${this.toggleIndex}">${o6(hamburger_circle_default)}</div>
        <div id="content" @click="${this.checkIndexVisibility}">
          <slot></slot>
        </div>
      </article>
    `;
    }
    renderIndex() {
      const index = this.headings.map((heading) => [
        heading.cloneNode(true),
        heading.id
      ]);
      index.forEach(
        ([heading]) => heading.removeAttribute("id")
      );
      return index.map(
        ([heading, id]) => x`<a href="#${id}">${heading}</a>`
      );
    }
    labelHeaders() {
      this.headings.forEach((heading) => {
        if (!heading.id) {
          const newId = heading.textContent ? this.slugify(heading.textContent) : Math.random().toString(36).slice(2);
          heading.id = newId;
        }
      });
    }
    anchorHeadings() {
      this.headings.forEach((heading) => {
        const spacing = document.createTextNode(" ");
        heading.append(spacing);
        const anchor = document.createElement("a");
        anchor.href = `#${heading.id}`;
        anchor.innerHTML = "#";
        anchor.className = "anchor";
        anchor.title = heading.textContent ? heading.textContent : "";
        heading.append(anchor);
      });
    }
    exportIndexHeadingParts() {
      this.headings.forEach((heading) => {
        heading.part.add(`index-${heading.localName}`);
      });
    }
    enableMobileIndexVisibility() {
      const checkIndexVisibility = this.checkIndexVisibility.bind(this);
      window.addEventListener("resize", checkIndexVisibility);
    }
    toggleIndex() {
      if (this.drawer) this.drawer.toggle();
    }
    checkIndexVisibility() {
      if (window.innerWidth < 700 && this.toggle) {
        this.toggle.style.visibility = "visible";
      }
      if (window.innerWidth < 700 && this.drawer && this.drawer.opened) {
        this.toggleIndex();
      }
      if (window.innerWidth >= 700 && this.toggle) {
        this.toggle.style.visibility = "hidden";
      }
      if (window.innerWidth >= 700 && this.drawer && !this.drawer.opened) {
        this.toggleIndex();
      }
    }
  };
  VellumDocument.styles = r(vellum_doc_default);
  __decorateClass([
    n4({ type: Boolean })
  ], VellumDocument.prototype, "anchors", 2);
  VellumDocument = __decorateClass([
    t3("vellum-doc")
  ], VellumDocument);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
