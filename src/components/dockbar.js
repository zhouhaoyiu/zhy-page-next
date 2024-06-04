/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = window,
  Te =
    ae.ShadowRoot &&
    (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  Oe = Symbol(),
  Ze = /* @__PURE__ */ new WeakMap();
let ct = class {
  constructor(e, r, n) {
    if (((this._$cssResult$ = !0), n !== Oe))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.',
      );
    (this.cssText = e), (this.t = r);
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Te && e === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (e = Ze.get(r)),
        e === void 0 &&
          ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
          n && Ze.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Lt = (t) => new ct(typeof t == 'string' ? t : t + '', void 0, Oe),
  ht = (t, ...e) => {
    const r =
      t.length === 1
        ? t[0]
        : e.reduce(
            (n, i, s) =>
              n +
              ((a) => {
                if (a._$cssResult$ === !0) return a.cssText;
                if (typeof a == 'number') return a;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    a +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(i) +
              t[s + 1],
            t[0],
          );
    return new ct(r, t, Oe);
  },
  Ut = (t, e) => {
    Te
      ? (t.adoptedStyleSheets = e.map((r) =>
          r instanceof CSSStyleSheet ? r : r.styleSheet,
        ))
      : e.forEach((r) => {
          const n = document.createElement('style'),
            i = ae.litNonce;
          i !== void 0 && n.setAttribute('nonce', i),
            (n.textContent = r.cssText),
            t.appendChild(n);
        });
  },
  Ke = Te
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((e) => {
              let r = '';
              for (const n of e.cssRules) r += n.cssText;
              return Lt(r);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ye;
const le = window,
  Qe = le.trustedTypes,
  Ht = Qe ? Qe.emptyScript : '',
  Je = le.reactiveElementPolyfillSupport,
  Se = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? Ht : null;
          break;
        case Object:
        case Array:
          t = t == null ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let r = t;
      switch (e) {
        case Boolean:
          r = t !== null;
          break;
        case Number:
          r = t === null ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            r = JSON.parse(t);
          } catch {
            r = null;
          }
      }
      return r;
    },
  },
  dt = (t, e) => e !== t && (e == e || t == t),
  $e = {
    attribute: !0,
    type: String,
    converter: Se,
    reflect: !1,
    hasChanged: dt,
  },
  Ce = 'finalized';
let F = class extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = /* @__PURE__ */ new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(e) {
    var r;
    this.finalize(),
      ((r = this.h) !== null && r !== void 0 ? r : (this.h = [])).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return (
      this.elementProperties.forEach((r, n) => {
        const i = this._$Ep(n, r);
        i !== void 0 && (this._$Ev.set(i, n), e.push(i));
      }),
      e
    );
  }
  static createProperty(e, r = $e) {
    if (
      (r.state && (r.attribute = !1),
      this.finalize(),
      this.elementProperties.set(e, r),
      !r.noAccessor && !this.prototype.hasOwnProperty(e))
    ) {
      const n = typeof e == 'symbol' ? Symbol() : '__' + e,
        i = this.getPropertyDescriptor(e, n, r);
      i !== void 0 && Object.defineProperty(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, r, n) {
    return {
      get() {
        return this[r];
      },
      set(i) {
        const s = this[e];
        (this[r] = i), this.requestUpdate(e, s, n);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || $e;
  }
  static finalize() {
    if (this.hasOwnProperty(Ce)) return !1;
    this[Ce] = !0;
    const e = Object.getPrototypeOf(this);
    if (
      (e.finalize(),
      e.h !== void 0 && (this.h = [...e.h]),
      (this.elementProperties = new Map(e.elementProperties)),
      (this._$Ev = /* @__PURE__ */ new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const r = this.properties,
        n = [
          ...Object.getOwnPropertyNames(r),
          ...Object.getOwnPropertySymbols(r),
        ];
      for (const i of n) this.createProperty(i, r[i]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) r.unshift(Ke(i));
    } else e !== void 0 && r.push(Ke(e));
    return r;
  }
  static _$Ep(e, r) {
    const n = r.attribute;
    return n === !1
      ? void 0
      : typeof n == 'string'
        ? n
        : typeof e == 'string'
          ? e.toLowerCase()
          : void 0;
  }
  u() {
    var e;
    (this._$E_ = new Promise((r) => (this.enableUpdating = r))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (e = this.constructor.h) === null ||
        e === void 0 ||
        e.forEach((r) => r(this));
  }
  addController(e) {
    var r, n;
    ((r = this._$ES) !== null && r !== void 0 ? r : (this._$ES = [])).push(e),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((n = e.hostConnected) === null || n === void 0 || n.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$ES) === null ||
      r === void 0 ||
      r.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    });
  }
  createRenderRoot() {
    var e;
    const r =
      (e = this.shadowRoot) !== null && e !== void 0
        ? e
        : this.attachShadow(this.constructor.shadowRootOptions);
    return Ut(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (e = this._$ES) === null ||
        e === void 0 ||
        e.forEach((r) => {
          var n;
          return (n = r.hostConnected) === null || n === void 0
            ? void 0
            : n.call(r);
        });
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null ||
      e === void 0 ||
      e.forEach((r) => {
        var n;
        return (n = r.hostDisconnected) === null || n === void 0
          ? void 0
          : n.call(r);
      });
  }
  attributeChangedCallback(e, r, n) {
    this._$AK(e, n);
  }
  _$EO(e, r, n = $e) {
    var i;
    const s = this.constructor._$Ep(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const a = (
        ((i = n.converter) === null || i === void 0
          ? void 0
          : i.toAttribute) !== void 0
          ? n.converter
          : Se
      ).toAttribute(r, n.type);
      (this._$El = e),
        a == null ? this.removeAttribute(s) : this.setAttribute(s, a),
        (this._$El = null);
    }
  }
  _$AK(e, r) {
    var n;
    const i = this.constructor,
      s = i._$Ev.get(e);
    if (s !== void 0 && this._$El !== s) {
      const a = i.getPropertyOptions(s),
        l =
          typeof a.converter == 'function'
            ? { fromAttribute: a.converter }
            : ((n = a.converter) === null || n === void 0
                  ? void 0
                  : n.fromAttribute) !== void 0
              ? a.converter
              : Se;
      (this._$El = s),
        (this[s] = l.fromAttribute(r, a.type)),
        (this._$El = null);
    }
  }
  requestUpdate(e, r, n) {
    let i = !0;
    e !== void 0 &&
      (((n = n || this.constructor.getPropertyOptions(e)).hasChanged || dt)(
        this[e],
        r,
      )
        ? (this._$AL.has(e) || this._$AL.set(e, r),
          n.reflect === !0 &&
            this._$El !== e &&
            (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()),
            this._$EC.set(e, n)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && (await e), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((i, s) => (this[s] = i)), (this._$Ei = void 0));
    let r = !1;
    const n = this._$AL;
    try {
      (r = this.shouldUpdate(n)),
        r
          ? (this.willUpdate(n),
            (e = this._$ES) === null ||
              e === void 0 ||
              e.forEach((i) => {
                var s;
                return (s = i.hostUpdate) === null || s === void 0
                  ? void 0
                  : s.call(i);
              }),
            this.update(n))
          : this._$Ek();
    } catch (i) {
      throw ((r = !1), this._$Ek(), i);
    }
    r && this._$AE(n);
  }
  willUpdate(e) {}
  _$AE(e) {
    var r;
    (r = this._$ES) === null ||
      r === void 0 ||
      r.forEach((n) => {
        var i;
        return (i = n.hostUpdated) === null || i === void 0
          ? void 0
          : i.call(n);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e);
  }
  _$Ek() {
    (this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((r, n) => this._$EO(n, this[n], r)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(e) {}
  firstUpdated(e) {}
};
(F[Ce] = !0),
  (F.elementProperties = /* @__PURE__ */ new Map()),
  (F.elementStyles = []),
  (F.shadowRootOptions = { mode: 'open' }),
  Je == null || Je({ ReactiveElement: F }),
  ((ye = le.reactiveElementVersions) !== null && ye !== void 0
    ? ye
    : (le.reactiveElementVersions = [])
  ).push('1.6.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _e;
const ue = window,
  q = ue.trustedTypes,
  Ye = q ? q.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  Pe = '$lit$',
  N = `lit$${(Math.random() + '').slice(9)}$`,
  ft = '?' + N,
  Bt = `<${ft}>`,
  H = document,
  re = () => H.createComment(''),
  ne = (t) => t === null || (typeof t != 'object' && typeof t != 'function'),
  vt = Array.isArray,
  jt = (t) =>
    vt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == 'function',
  be = `[
\f\r]`,
  ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Ge = /-->/g,
  Xe = />/g,
  L = RegExp(
    `>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^
\f\r"'\`<>=]|("|')|))|$)`,
    'g',
  ),
  et = /'/g,
  tt = /"/g,
  pt = /^(?:script|style|textarea|title)$/i,
  Vt =
    (t) =>
    (e, ...r) => ({ _$litType$: t, strings: e, values: r }),
  gt = Vt(1),
  Z = Symbol.for('lit-noChange'),
  x = Symbol.for('lit-nothing'),
  rt = /* @__PURE__ */ new WeakMap(),
  U = H.createTreeWalker(H, 129, null, !1);
function mt(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
    throw Error('invalid template strings array');
  return Ye !== void 0 ? Ye.createHTML(e) : e;
}
const Ft = (t, e) => {
  const r = t.length - 1,
    n = [];
  let i,
    s = e === 2 ? '<svg>' : '',
    a = ee;
  for (let l = 0; l < r; l++) {
    const o = t[l];
    let h,
      u,
      c = -1,
      d = 0;
    for (; d < o.length && ((a.lastIndex = d), (u = a.exec(o)), u !== null); )
      (d = a.lastIndex),
        a === ee
          ? u[1] === '!--'
            ? (a = Ge)
            : u[1] !== void 0
              ? (a = Xe)
              : u[2] !== void 0
                ? (pt.test(u[2]) && (i = RegExp('</' + u[2], 'g')), (a = L))
                : u[3] !== void 0 && (a = L)
          : a === L
            ? u[0] === '>'
              ? ((a = i ?? ee), (c = -1))
              : u[1] === void 0
                ? (c = -2)
                : ((c = a.lastIndex - u[2].length),
                  (h = u[1]),
                  (a = u[3] === void 0 ? L : u[3] === '"' ? tt : et))
            : a === tt || a === et
              ? (a = L)
              : a === Ge || a === Xe
                ? (a = ee)
                : ((a = L), (i = void 0));
    const y = a === L && t[l + 1].startsWith('/>') ? ' ' : '';
    s +=
      a === ee
        ? o + Bt
        : c >= 0
          ? (n.push(h), o.slice(0, c) + Pe + o.slice(c) + N + y)
          : o + N + (c === -2 ? (n.push(void 0), l) : y);
  }
  return [mt(t, s + (t[r] || '<?>') + (e === 2 ? '</svg>' : '')), n];
};
class ie {
  constructor({ strings: e, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0,
      a = 0;
    const l = e.length - 1,
      o = this.parts,
      [h, u] = Ft(e, r);
    if (
      ((this.el = ie.createElement(h, n)),
      (U.currentNode = this.el.content),
      r === 2)
    ) {
      const c = this.el.content,
        d = c.firstChild;
      d.remove(), c.append(...d.childNodes);
    }
    for (; (i = U.nextNode()) !== null && o.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) {
          const c = [];
          for (const d of i.getAttributeNames())
            if (d.endsWith(Pe) || d.startsWith(N)) {
              const y = u[a++];
              if ((c.push(d), y !== void 0)) {
                const m = i.getAttribute(y.toLowerCase() + Pe).split(N),
                  v = /([.?@])?(.*)/.exec(y);
                o.push({
                  type: 1,
                  index: s,
                  name: v[2],
                  strings: m,
                  ctor:
                    v[1] === '.'
                      ? qt
                      : v[1] === '?'
                        ? Kt
                        : v[1] === '@'
                          ? Qt
                          : he,
                });
              } else o.push({ type: 6, index: s });
            }
          for (const d of c) i.removeAttribute(d);
        }
        if (pt.test(i.tagName)) {
          const c = i.textContent.split(N),
            d = c.length - 1;
          if (d > 0) {
            i.textContent = q ? q.emptyScript : '';
            for (let y = 0; y < d; y++)
              i.append(c[y], re()),
                U.nextNode(),
                o.push({ type: 2, index: ++s });
            i.append(c[d], re());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === ft) o.push({ type: 2, index: s });
        else {
          let c = -1;
          for (; (c = i.data.indexOf(N, c + 1)) !== -1; )
            o.push({ type: 7, index: s }), (c += N.length - 1);
        }
      s++;
    }
  }
  static createElement(e, r) {
    const n = H.createElement('template');
    return (n.innerHTML = e), n;
  }
}
function K(t, e, r = t, n) {
  var i, s, a, l;
  if (e === Z) return e;
  let o =
    n !== void 0
      ? (i = r._$Co) === null || i === void 0
        ? void 0
        : i[n]
      : r._$Cl;
  const h = ne(e) ? void 0 : e._$litDirective$;
  return (
    (o == null ? void 0 : o.constructor) !== h &&
      ((s = o == null ? void 0 : o._$AO) === null ||
        s === void 0 ||
        s.call(o, !1),
      h === void 0 ? (o = void 0) : ((o = new h(t)), o._$AT(t, r, n)),
      n !== void 0
        ? (((a = (l = r)._$Co) !== null && a !== void 0 ? a : (l._$Co = []))[
            n
          ] = o)
        : (r._$Cl = o)),
    o !== void 0 && (e = K(t, o._$AS(t, e.values), o, n)),
    e
  );
}
class Wt {
  constructor(e, r) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = r);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var r;
    const {
        el: { content: n },
        parts: i,
      } = this._$AD,
      s = (
        (r = e == null ? void 0 : e.creationScope) !== null && r !== void 0
          ? r
          : H
      ).importNode(n, !0);
    U.currentNode = s;
    let a = U.nextNode(),
      l = 0,
      o = 0,
      h = i[0];
    for (; h !== void 0; ) {
      if (l === h.index) {
        let u;
        h.type === 2
          ? (u = new se(a, a.nextSibling, this, e))
          : h.type === 1
            ? (u = new h.ctor(a, h.name, h.strings, this, e))
            : h.type === 6 && (u = new Jt(a, this, e)),
          this._$AV.push(u),
          (h = i[++o]);
      }
      l !== (h == null ? void 0 : h.index) && ((a = U.nextNode()), l++);
    }
    return (U.currentNode = H), s;
  }
  v(e) {
    let r = 0;
    for (const n of this._$AV)
      n !== void 0 &&
        (n.strings !== void 0
          ? (n._$AI(e, n, r), (r += n.strings.length - 2))
          : n._$AI(e[r])),
        r++;
  }
}
class se {
  constructor(e, r, n, i) {
    var s;
    (this.type = 2),
      (this._$AH = x),
      (this._$AN = void 0),
      (this._$AA = e),
      (this._$AB = r),
      (this._$AM = n),
      (this.options = i),
      (this._$Cp =
        (s = i == null ? void 0 : i.isConnected) === null || s === void 0 || s);
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !==
      null && r !== void 0
      ? r
      : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return (
      r !== void 0 &&
        (e == null ? void 0 : e.nodeType) === 11 &&
        (e = r.parentNode),
      e
    );
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    (e = K(this, e, r)),
      ne(e)
        ? e === x || e == null || e === ''
          ? (this._$AH !== x && this._$AR(), (this._$AH = x))
          : e !== this._$AH && e !== Z && this._(e)
        : e._$litType$ !== void 0
          ? this.g(e)
          : e.nodeType !== void 0
            ? this.$(e)
            : jt(e)
              ? this.T(e)
              : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), (this._$AH = this.k(e)));
  }
  _(e) {
    this._$AH !== x && ne(this._$AH)
      ? (this._$AA.nextSibling.data = e)
      : this.$(H.createTextNode(e)),
      (this._$AH = e);
  }
  g(e) {
    var r;
    const { values: n, _$litType$: i } = e,
      s =
        typeof i == 'number'
          ? this._$AC(e)
          : (i.el === void 0 &&
              (i.el = ie.createElement(mt(i.h, i.h[0]), this.options)),
            i);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === s)
      this._$AH.v(n);
    else {
      const a = new Wt(s, this),
        l = a.u(this.options);
      a.v(n), this.$(l), (this._$AH = a);
    }
  }
  _$AC(e) {
    let r = rt.get(e.strings);
    return r === void 0 && rt.set(e.strings, (r = new ie(e))), r;
  }
  T(e) {
    vt(this._$AH) || ((this._$AH = []), this._$AR());
    const r = this._$AH;
    let n,
      i = 0;
    for (const s of e)
      i === r.length
        ? r.push((n = new se(this.k(re()), this.k(re()), this, this.options)))
        : (n = r[i]),
        n._$AI(s),
        i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), (r.length = i));
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var n;
    for (
      (n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, r);
      e && e !== this._$AB;

    ) {
      const i = e.nextSibling;
      e.remove(), (e = i);
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 &&
      ((this._$Cp = e),
      (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class he {
  constructor(e, r, n, i, s) {
    (this.type = 1),
      (this._$AH = x),
      (this._$AN = void 0),
      (this.element = e),
      (this.name = r),
      (this._$AM = i),
      (this.options = s),
      n.length > 2 || n[0] !== '' || n[1] !== ''
        ? ((this._$AH = Array(n.length - 1).fill(new String())),
          (this.strings = n))
        : (this._$AH = x);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, n, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0)
      (e = K(this, e, r, 0)),
        (a = !ne(e) || (e !== this._$AH && e !== Z)),
        a && (this._$AH = e);
    else {
      const l = e;
      let o, h;
      for (e = s[0], o = 0; o < s.length - 1; o++)
        (h = K(this, l[n + o], r, o)),
          h === Z && (h = this._$AH[o]),
          a || (a = !ne(h) || h !== this._$AH[o]),
          h === x ? (e = x) : e !== x && (e += (h ?? '') + s[o + 1]),
          (this._$AH[o] = h);
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === x
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, e ?? '');
  }
}
class qt extends he {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
const Zt = q ? q.emptyScript : '';
class Kt extends he {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(e) {
    e && e !== x
      ? this.element.setAttribute(this.name, Zt)
      : this.element.removeAttribute(this.name);
  }
}
class Qt extends he {
  constructor(e, r, n, i, s) {
    super(e, r, n, i, s), (this.type = 5);
  }
  _$AI(e, r = this) {
    var n;
    if ((e = (n = K(this, e, r, 0)) !== null && n !== void 0 ? n : x) === Z)
      return;
    const i = this._$AH,
      s =
        (e === x && i !== x) ||
        e.capture !== i.capture ||
        e.once !== i.once ||
        e.passive !== i.passive,
      a = e !== x && (i === x || s);
    s && this.element.removeEventListener(this.name, this, i),
      a && this.element.addEventListener(this.name, this, e),
      (this._$AH = e);
  }
  handleEvent(e) {
    var r, n;
    typeof this._$AH == 'function'
      ? this._$AH.call(
          (n =
            (r = this.options) === null || r === void 0 ? void 0 : r.host) !==
            null && n !== void 0
            ? n
            : this.element,
          e,
        )
      : this._$AH.handleEvent(e);
  }
}
class Jt {
  constructor(e, r, n) {
    (this.element = e),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = r),
      (this.options = n);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    K(this, e);
  }
}
const nt = ue.litHtmlPolyfillSupport;
nt == null || nt(ie, se),
  ((_e = ue.litHtmlVersions) !== null && _e !== void 0
    ? _e
    : (ue.litHtmlVersions = [])
  ).push('2.7.5');
const Yt = (t, e, r) => {
  var n, i;
  const s =
    (n = r == null ? void 0 : r.renderBefore) !== null && n !== void 0 ? n : e;
  let a = s._$litPart$;
  if (a === void 0) {
    const l =
      (i = r == null ? void 0 : r.renderBefore) !== null && i !== void 0
        ? i
        : null;
    s._$litPart$ = a = new se(e.insertBefore(re(), l), l, void 0, r ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ae, we;
class W extends F {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var e, r;
    const n = super.createRenderRoot();
    return (
      ((e = (r = this.renderOptions).renderBefore) !== null && e !== void 0) ||
        (r.renderBefore = n.firstChild),
      n
    );
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(e),
      (this._$Do = Yt(r, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var e;
    super.connectedCallback(),
      (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(),
      (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return Z;
  }
}
(W.finalized = !0),
  (W._$litElement$ = !0),
  (Ae = globalThis.litElementHydrateSupport) === null ||
    Ae === void 0 ||
    Ae.call(globalThis, { LitElement: W });
const it = globalThis.litElementPolyfillSupport;
it == null || it({ LitElement: W });
((we = globalThis.litElementVersions) !== null && we !== void 0
  ? we
  : (globalThis.litElementVersions = [])
).push('3.3.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = (t) => (e) =>
  typeof e == 'function'
    ? ((r, n) => (customElements.define(r, n), n))(t, e)
    : ((r, n) => {
        const { kind: i, elements: s } = n;
        return {
          kind: i,
          elements: s,
          finisher(a) {
            customElements.define(r, a);
          },
        };
      })(t, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt = (t, e) =>
    e.kind === 'method' && e.descriptor && !('value' in e.descriptor)
      ? {
          ...e,
          finisher(r) {
            r.createProperty(e.key, t);
          },
        }
      : {
          kind: 'field',
          key: Symbol(),
          placement: 'own',
          descriptor: {},
          originalKey: e.key,
          initializer() {
            typeof e.initializer == 'function' &&
              (this[e.key] = e.initializer.call(this));
          },
          finisher(r) {
            r.createProperty(e.key, t);
          },
        },
  Xt = (t, e, r) => {
    e.constructor.createProperty(r, t);
  };
function S(t) {
  return (e, r) => (r !== void 0 ? Xt(t, e, r) : Gt(t, e));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ee;
((Ee = window.HTMLSlotElement) === null || Ee === void 0
  ? void 0
  : Ee.prototype.assignedElements) != null;
var er = Object.defineProperty,
  tr = Object.getOwnPropertyDescriptor,
  k = (t, e, r, n) => {
    for (
      var i = n > 1 ? void 0 : n ? tr(e, r) : e, s = t.length - 1, a;
      s >= 0;
      s--
    )
      (a = t[s]) && (i = (n ? a(e, r, i) : a(i)) || i);
    return n && i && er(e, r, i), i;
  };
const rr = typeof globalThis.window > 'u' && typeof globalThis.document > 'u';
let C = class extends W {
  constructor() {
    super(),
      (this._ready = !1),
      (this._children = []),
      (this._mousePos = { x: 0, y: 0 }),
      (this._moving = !1),
      (this._overflowed = !1),
      (this.disabled = !1),
      (this.maxRange = 200),
      (this.maxScale = 2),
      (this.position = 'bottom'),
      (this.direction = 'horizontal'),
      (this.size = 40),
      (this.padding = 8),
      (this.gap = 5),
      (this.willChange = !1),
      (this.easing = 'cubicBezier(0, 0.55, 0.45, 1)');
  }
  onSlotChange(t) {
    const e = t.target.assignedNodes({ flatten: !0 });
    (this._children = e.filter(
      (r) => r.nodeName.toUpperCase() === 'DOCK-ITEM',
    )),
      this.onWillChangeChanged(this.willChange),
      this.observe(),
      this.provideSharedProps();
  }
  disconnectedCallback() {
    var t, e, r, n, i, s;
    super.disconnectedCallback(),
      (e = (t = this.shadowRoot) == null ? void 0 : t.host) == null ||
        e.removeEventListener('mousemove', this.onMousemove.bind(this)),
      (n = (r = this.shadowRoot) == null ? void 0 : r.host) == null ||
        n.removeEventListener('mouseenter', this.onMouseenter.bind(this)),
      (s = (i = this.shadowRoot) == null ? void 0 : i.host) == null ||
        s.removeEventListener('mouseleave', this.onMouseleave.bind(this)),
      window.removeEventListener('resize', this.onResize.bind(this));
  }
  observe() {
    var t, e, r, n, i, s;
    this._ready ||
      rr ||
      ((this._ready = !0),
      (e = (t = this.shadowRoot) == null ? void 0 : t.host) == null ||
        e.addEventListener('mousemove', this.onMousemove.bind(this)),
      (n = (r = this.shadowRoot) == null ? void 0 : r.host) == null ||
        n.addEventListener('mouseenter', this.onMouseenter.bind(this)),
      (s = (i = this.shadowRoot) == null ? void 0 : i.host) == null ||
        s.addEventListener('mouseleave', this.onMouseleave.bind(this)),
      window.addEventListener('resize', this.onResize.bind(this)),
      this.onResize());
  }
  resetAll() {
    this._children.forEach((t) => {
      t.setAttribute('scale', '1');
    });
  }
  onResize() {}
  onMouseenter() {}
  onMouseleave() {
    this.resetAll();
  }
  onMousemove(t) {
    var l, o;
    const { clientX: e, clientY: r } = t,
      { x: n, y: i } = this._mousePos,
      s = this.direction === 'horizontal' ? e - n : r - i;
    Math.abs(s) <= 10 ||
      !(
        (o = (l = this.shadowRoot) == null ? void 0 : l.host) != null &&
        o.getBoundingClientRect()
      ) ||
      this.disabled ||
      this._overflowed ||
      this._children.forEach((h) => {
        const u = (h == null ? void 0 : h.getBoundingClientRect()) || {},
          { left: c, top: d, width: y, height: m } = u,
          v = this.direction === 'horizontal' ? c + y / 2 : d + m / 2,
          $ = Math.abs((this.direction === 'horizontal' ? e : r) - v),
          b =
            $ > this.maxRange
              ? 1
              : 1 + (this.maxScale - 1) * (1 - $ / this.maxRange);
        h.setAttribute('scale', `${b}`);
      });
  }
  get className() {
    const t = ['dock-wrapper', this.position, this.direction];
    return this._moving && t.push('moving'), t.join(' ');
  }
  get wrapperStyle() {
    const t = this.direction === 'horizontal' ? 'height' : 'width',
      e = {
        '--gap': `${this.gap}px`,
        '--size': `${this.size}px`,
        padding: `${this.padding}px`,
        [t]: `${this.padding * 2 + this.size}px`,
      };
    return Object.entries(e)
      .map(([r, n]) => `${r}: ${n}`)
      .join(';');
  }
  render() {
    return gt`
      <ul class=${this.className} style="${this.wrapperStyle}">
        <slot @slotchange=${this.onSlotChange}></slot>
      </ul>
    `;
  }
  onWillChangeChanged(t) {
    this._children.forEach((e) => {
      e.style.setProperty('will-change', t ? 'width, height' : 'none');
    });
  }
  provideSharedProps() {
    var t;
    (t = this._children) == null ||
      t.forEach((e) => {
        e.setAttribute('size', `${this.size}`),
          e.setAttribute('easing', `${this.easing}`),
          e.setAttribute('gap', `${this.gap}`),
          e.setAttribute('direction', `${this.direction}`);
      });
  }
  updated(t) {
    t.has('direction') && setTimeout(this.onResize.bind(this)),
      t.has('willChange') && this.onWillChangeChanged(this.willChange),
      ['size', 'gap', 'easing', 'direction'].some((e) => t.has(e)) &&
        this.provideSharedProps();
  }
};
C.styles = ht`
    ul.dock-wrapper {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      list-style: none;
      gap: var(--gap, 5px);
      border-radius: inherit;
    }
    ul.dock-wrapper.horizontal.bottom {
      align-items: flex-end;
    }
    ul.dock-wrapper.horizontal.top {
      align-items: flex-start;
    }
    ul.dock-wrapper.vertical.left {
      align-items: flex-start;
    }
    ul.dock-wrapper.vertical.right {
      align-items: flex-end;
    }
    ul.dock-wrapper.left,
    ul.dock-wrapper.right {
      flex-direction: column;
    }
    ul.dock-wrapper.top,
    ul.dock-wrapper.bottom {
      flex-direction: row;
    }
    ul.dock-wrapper.horizontal {
      flex-direction: row;
      max-width: 80vw;
    }
    ul.dock-wrapper.vertical {
      flex-direction: column;
      max-height: 90vh;
    }
    ul.dock-wrapper.horizontal.overflowed {
      overflow-x: auto;
    }
    ul.dock-wrapper.vertical.overflowed {
      overflow-y: auto;
    }
  `;
k([S({ type: Boolean })], C.prototype, 'disabled', 2);
k([S({ type: Number, attribute: 'max-range' })], C.prototype, 'maxRange', 2);
k([S({ type: Number, attribute: 'max-scale' })], C.prototype, 'maxScale', 2);
k([S({ type: String })], C.prototype, 'position', 2);
k([S({ type: String })], C.prototype, 'direction', 2);
k([S({ type: Number })], C.prototype, 'size', 2);
k([S({ type: Number })], C.prototype, 'padding', 2);
k([S({ type: Number })], C.prototype, 'gap', 2);
k(
  [S({ type: Boolean, attribute: 'will-change' })],
  C.prototype,
  'willChange',
  2,
);
k([S({ type: String })], C.prototype, 'easing', 2);
C = k([yt('dock-wrapper')], C);
var $t = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: 'normal',
    autoplay: !0,
    timelineOffset: 0,
  },
  ze = {
    duration: 1e3,
    delay: 0,
    endDelay: 0,
    easing: 'easeOutElastic(1, .5)',
    round: 0,
  },
  nr = [
    'translateX',
    'translateY',
    'translateZ',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleZ',
    'skew',
    'skewX',
    'skewY',
    'perspective',
    'matrix',
    'matrix3d',
  ],
  ce = {
    CSS: {},
    springs: {},
  };
function T(t, e, r) {
  return Math.min(Math.max(t, e), r);
}
function te(t, e) {
  return t.indexOf(e) > -1;
}
function xe(t, e) {
  return t.apply(null, e);
}
var f = {
  arr: function (t) {
    return Array.isArray(t);
  },
  obj: function (t) {
    return te(Object.prototype.toString.call(t), 'Object');
  },
  pth: function (t) {
    return f.obj(t) && t.hasOwnProperty('totalLength');
  },
  svg: function (t) {
    return t instanceof SVGElement;
  },
  inp: function (t) {
    return t instanceof HTMLInputElement;
  },
  dom: function (t) {
    return t.nodeType || f.svg(t);
  },
  str: function (t) {
    return typeof t == 'string';
  },
  fnc: function (t) {
    return typeof t == 'function';
  },
  und: function (t) {
    return typeof t > 'u';
  },
  nil: function (t) {
    return f.und(t) || t === null;
  },
  hex: function (t) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
  },
  rgb: function (t) {
    return /^rgb/.test(t);
  },
  hsl: function (t) {
    return /^hsl/.test(t);
  },
  col: function (t) {
    return f.hex(t) || f.rgb(t) || f.hsl(t);
  },
  key: function (t) {
    return (
      !$t.hasOwnProperty(t) &&
      !ze.hasOwnProperty(t) &&
      t !== 'targets' &&
      t !== 'keyframes'
    );
  },
};
function _t(t) {
  var e = /\(([^)]+)\)/.exec(t);
  return e
    ? e[1].split(',').map(function (r) {
        return parseFloat(r);
      })
    : [];
}
function bt(t, e) {
  var r = _t(t),
    n = T(f.und(r[0]) ? 1 : r[0], 0.1, 100),
    i = T(f.und(r[1]) ? 100 : r[1], 0.1, 100),
    s = T(f.und(r[2]) ? 10 : r[2], 0.1, 100),
    a = T(f.und(r[3]) ? 0 : r[3], 0.1, 100),
    l = Math.sqrt(i / n),
    o = s / (2 * Math.sqrt(i * n)),
    h = o < 1 ? l * Math.sqrt(1 - o * o) : 0,
    u = 1,
    c = o < 1 ? (o * l + -a) / h : -a + l;
  function d(m) {
    var v = e ? (e * m) / 1e3 : m;
    return (
      o < 1
        ? (v =
            Math.exp(-v * o * l) * (u * Math.cos(h * v) + c * Math.sin(h * v)))
        : (v = (u + c * v) * Math.exp(-v * l)),
      m === 0 || m === 1 ? m : 1 - v
    );
  }
  function y() {
    var m = ce.springs[t];
    if (m) return m;
    for (var v = 1 / 6, $ = 0, b = 0; ; )
      if ((($ += v), d($) === 1)) {
        if ((b++, b >= 16)) break;
      } else b = 0;
    var g = $ * v * 1e3;
    return (ce.springs[t] = g), g;
  }
  return e ? d : y;
}
function ir(t) {
  return (
    t === void 0 && (t = 10),
    function (e) {
      return Math.ceil(T(e, 1e-6, 1) * t) * (1 / t);
    }
  );
}
var sr = (function () {
    var t = 11,
      e = 1 / (t - 1);
    function r(u, c) {
      return 1 - 3 * c + 3 * u;
    }
    function n(u, c) {
      return 3 * c - 6 * u;
    }
    function i(u) {
      return 3 * u;
    }
    function s(u, c, d) {
      return ((r(c, d) * u + n(c, d)) * u + i(c)) * u;
    }
    function a(u, c, d) {
      return 3 * r(c, d) * u * u + 2 * n(c, d) * u + i(c);
    }
    function l(u, c, d, y, m) {
      var v,
        $,
        b = 0;
      do ($ = c + (d - c) / 2), (v = s($, y, m) - u), v > 0 ? (d = $) : (c = $);
      while (Math.abs(v) > 1e-7 && ++b < 10);
      return $;
    }
    function o(u, c, d, y) {
      for (var m = 0; m < 4; ++m) {
        var v = a(c, d, y);
        if (v === 0) return c;
        var $ = s(c, d, y) - u;
        c -= $ / v;
      }
      return c;
    }
    function h(u, c, d, y) {
      if (!(0 <= u && u <= 1 && 0 <= d && d <= 1)) return;
      var m = new Float32Array(t);
      if (u !== c || d !== y) for (var v = 0; v < t; ++v) m[v] = s(v * e, u, d);
      function $(b) {
        for (var g = 0, p = 1, E = t - 1; p !== E && m[p] <= b; ++p) g += e;
        --p;
        var R = (b - m[p]) / (m[p + 1] - m[p]),
          A = g + R * e,
          I = a(A, u, d);
        return I >= 1e-3 ? o(b, A, u, d) : I === 0 ? A : l(b, g, g + e, u, d);
      }
      return function (b) {
        return (u === c && d === y) || b === 0 || b === 1 ? b : s($(b), c, y);
      };
    }
    return h;
  })(),
  At = (function () {
    var t = {
        linear: function () {
          return function (n) {
            return n;
          };
        },
      },
      e = {
        Sine: function () {
          return function (n) {
            return 1 - Math.cos((n * Math.PI) / 2);
          };
        },
        Circ: function () {
          return function (n) {
            return 1 - Math.sqrt(1 - n * n);
          };
        },
        Back: function () {
          return function (n) {
            return n * n * (3 * n - 2);
          };
        },
        Bounce: function () {
          return function (n) {
            for (var i, s = 4; n < ((i = Math.pow(2, --s)) - 1) / 11; );
            return (
              1 / Math.pow(4, 3 - s) -
              7.5625 * Math.pow((i * 3 - 2) / 22 - n, 2)
            );
          };
        },
        Elastic: function (n, i) {
          n === void 0 && (n = 1), i === void 0 && (i = 0.5);
          var s = T(n, 1, 10),
            a = T(i, 0.1, 2);
          return function (l) {
            return l === 0 || l === 1
              ? l
              : -s *
                  Math.pow(2, 10 * (l - 1)) *
                  Math.sin(
                    ((l - 1 - (a / (Math.PI * 2)) * Math.asin(1 / s)) *
                      (Math.PI * 2)) /
                      a,
                  );
          };
        },
      },
      r = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
    return (
      r.forEach(function (n, i) {
        e[n] = function () {
          return function (s) {
            return Math.pow(s, i + 2);
          };
        };
      }),
      Object.keys(e).forEach(function (n) {
        var i = e[n];
        (t['easeIn' + n] = i),
          (t['easeOut' + n] = function (s, a) {
            return function (l) {
              return 1 - i(s, a)(1 - l);
            };
          }),
          (t['easeInOut' + n] = function (s, a) {
            return function (l) {
              return l < 0.5 ? i(s, a)(l * 2) / 2 : 1 - i(s, a)(l * -2 + 2) / 2;
            };
          }),
          (t['easeOutIn' + n] = function (s, a) {
            return function (l) {
              return l < 0.5
                ? (1 - i(s, a)(1 - l * 2)) / 2
                : (i(s, a)(l * 2 - 1) + 1) / 2;
            };
          });
      }),
      t
    );
  })();
function Re(t, e) {
  if (f.fnc(t)) return t;
  var r = t.split('(')[0],
    n = At[r],
    i = _t(t);
  switch (r) {
    case 'spring':
      return bt(t, e);
    case 'cubicBezier':
      return xe(sr, i);
    case 'steps':
      return xe(ir, i);
    default:
      return xe(n, i);
  }
}
function wt(t) {
  try {
    var e = document.querySelectorAll(t);
    return e;
  } catch {
    return;
  }
}
function de(t, e) {
  for (
    var r = t.length,
      n = arguments.length >= 2 ? arguments[1] : void 0,
      i = [],
      s = 0;
    s < r;
    s++
  )
    if (s in t) {
      var a = t[s];
      e.call(n, a, s, t) && i.push(a);
    }
  return i;
}
function fe(t) {
  return t.reduce(function (e, r) {
    return e.concat(f.arr(r) ? fe(r) : r);
  }, []);
}
function st(t) {
  return f.arr(t)
    ? t
    : (f.str(t) && (t = wt(t) || t),
      t instanceof NodeList || t instanceof HTMLCollection
        ? [].slice.call(t)
        : [t]);
}
function Ne(t, e) {
  return t.some(function (r) {
    return r === e;
  });
}
function De(t) {
  var e = {};
  for (var r in t) e[r] = t[r];
  return e;
}
function Me(t, e) {
  var r = De(t);
  for (var n in t) r[n] = e.hasOwnProperty(n) ? e[n] : t[n];
  return r;
}
function ve(t, e) {
  var r = De(t);
  for (var n in e) r[n] = f.und(t[n]) ? e[n] : t[n];
  return r;
}
function or(t) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);
  return e ? 'rgba(' + e[1] + ',1)' : t;
}
function ar(t) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    r = t.replace(e, function (l, o, h, u) {
      return o + o + h + h + u + u;
    }),
    n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r),
    i = parseInt(n[1], 16),
    s = parseInt(n[2], 16),
    a = parseInt(n[3], 16);
  return 'rgba(' + i + ',' + s + ',' + a + ',1)';
}
function lr(t) {
  var e =
      /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) ||
      /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
    r = parseInt(e[1], 10) / 360,
    n = parseInt(e[2], 10) / 100,
    i = parseInt(e[3], 10) / 100,
    s = e[4] || 1;
  function a(d, y, m) {
    return (
      m < 0 && (m += 1),
      m > 1 && (m -= 1),
      m < 1 / 6
        ? d + (y - d) * 6 * m
        : m < 1 / 2
          ? y
          : m < 2 / 3
            ? d + (y - d) * (2 / 3 - m) * 6
            : d
    );
  }
  var l, o, h;
  if (n == 0) l = o = h = i;
  else {
    var u = i < 0.5 ? i * (1 + n) : i + n - i * n,
      c = 2 * i - u;
    (l = a(c, u, r + 1 / 3)), (o = a(c, u, r)), (h = a(c, u, r - 1 / 3));
  }
  return 'rgba(' + l * 255 + ',' + o * 255 + ',' + h * 255 + ',' + s + ')';
}
function ur(t) {
  if (f.rgb(t)) return or(t);
  if (f.hex(t)) return ar(t);
  if (f.hsl(t)) return lr(t);
}
function z(t) {
  var e =
    /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
      t,
    );
  if (e) return e[1];
}
function cr(t) {
  if (te(t, 'translate') || t === 'perspective') return 'px';
  if (te(t, 'rotate') || te(t, 'skew')) return 'deg';
}
function ke(t, e) {
  return f.fnc(t) ? t(e.target, e.id, e.total) : t;
}
function O(t, e) {
  return t.getAttribute(e);
}
function Ie(t, e, r) {
  var n = z(e);
  if (Ne([r, 'deg', 'rad', 'turn'], n)) return e;
  var i = ce.CSS[e + r];
  if (!f.und(i)) return i;
  var s = 100,
    a = document.createElement(t.tagName),
    l =
      t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
  l.appendChild(a), (a.style.position = 'absolute'), (a.style.width = s + r);
  var o = s / a.offsetWidth;
  l.removeChild(a);
  var h = o * parseFloat(e);
  return (ce.CSS[e + r] = h), h;
}
function Et(t, e, r) {
  if (e in t.style) {
    var n = e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
      i = t.style[e] || getComputedStyle(t).getPropertyValue(n) || '0';
    return r ? Ie(t, i, r) : i;
  }
}
function Le(t, e) {
  if (f.dom(t) && !f.inp(t) && (!f.nil(O(t, e)) || (f.svg(t) && t[e])))
    return 'attribute';
  if (f.dom(t) && Ne(nr, e)) return 'transform';
  if (f.dom(t) && e !== 'transform' && Et(t, e)) return 'css';
  if (t[e] != null) return 'object';
}
function xt(t) {
  if (f.dom(t)) {
    for (
      var e = t.style.transform || '',
        r = /(\w+)\(([^)]*)\)/g,
        n = /* @__PURE__ */ new Map(),
        i;
      (i = r.exec(e));

    )
      n.set(i[1], i[2]);
    return n;
  }
}
function hr(t, e, r, n) {
  var i = te(e, 'scale') ? 1 : 0 + cr(e),
    s = xt(t).get(e) || i;
  return (
    r && (r.transforms.list.set(e, s), (r.transforms.last = e)),
    n ? Ie(t, s, n) : s
  );
}
function Ue(t, e, r, n) {
  switch (Le(t, e)) {
    case 'transform':
      return hr(t, e, n, r);
    case 'css':
      return Et(t, e, r);
    case 'attribute':
      return O(t, e);
    default:
      return t[e] || 0;
  }
}
function He(t, e) {
  var r = /^(\*=|\+=|-=)/.exec(t);
  if (!r) return t;
  var n = z(t) || 0,
    i = parseFloat(e),
    s = parseFloat(t.replace(r[0], ''));
  switch (r[0][0]) {
    case '+':
      return i + s + n;
    case '-':
      return i - s + n;
    case '*':
      return i * s + n;
  }
}
function St(t, e) {
  if (f.col(t)) return ur(t);
  if (/\s/g.test(t)) return t;
  var r = z(t),
    n = r ? t.substr(0, t.length - r.length) : t;
  return e ? n + e : n;
}
function Be(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function dr(t) {
  return Math.PI * 2 * O(t, 'r');
}
function fr(t) {
  return O(t, 'width') * 2 + O(t, 'height') * 2;
}
function vr(t) {
  return Be({ x: O(t, 'x1'), y: O(t, 'y1') }, { x: O(t, 'x2'), y: O(t, 'y2') });
}
function Ct(t) {
  for (var e = t.points, r = 0, n, i = 0; i < e.numberOfItems; i++) {
    var s = e.getItem(i);
    i > 0 && (r += Be(n, s)), (n = s);
  }
  return r;
}
function pr(t) {
  var e = t.points;
  return Ct(t) + Be(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Pt(t) {
  if (t.getTotalLength) return t.getTotalLength();
  switch (t.tagName.toLowerCase()) {
    case 'circle':
      return dr(t);
    case 'rect':
      return fr(t);
    case 'line':
      return vr(t);
    case 'polyline':
      return Ct(t);
    case 'polygon':
      return pr(t);
  }
}
function gr(t) {
  var e = Pt(t);
  return t.setAttribute('stroke-dasharray', e), e;
}
function mr(t) {
  for (var e = t.parentNode; f.svg(e) && f.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Mt(t, e) {
  var r = e || {},
    n = r.el || mr(t),
    i = n.getBoundingClientRect(),
    s = O(n, 'viewBox'),
    a = i.width,
    l = i.height,
    o = r.viewBox || (s ? s.split(' ') : [0, 0, a, l]);
  return {
    el: n,
    viewBox: o,
    x: o[0] / 1,
    y: o[1] / 1,
    w: a,
    h: l,
    vW: o[2],
    vH: o[3],
  };
}
function yr(t, e) {
  var r = f.str(t) ? wt(t)[0] : t,
    n = e || 100;
  return function (i) {
    return {
      property: i,
      el: r,
      svg: Mt(r),
      totalLength: Pt(r) * (n / 100),
    };
  };
}
function $r(t, e, r) {
  function n(u) {
    u === void 0 && (u = 0);
    var c = e + u >= 1 ? e + u : 0;
    return t.el.getPointAtLength(c);
  }
  var i = Mt(t.el, t.svg),
    s = n(),
    a = n(-1),
    l = n(1),
    o = r ? 1 : i.w / i.vW,
    h = r ? 1 : i.h / i.vH;
  switch (t.property) {
    case 'x':
      return (s.x - i.x) * o;
    case 'y':
      return (s.y - i.y) * h;
    case 'angle':
      return (Math.atan2(l.y - a.y, l.x - a.x) * 180) / Math.PI;
  }
}
function ot(t, e) {
  var r = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
    n = St(f.pth(t) ? t.totalLength : t, e) + '';
  return {
    original: n,
    numbers: n.match(r) ? n.match(r).map(Number) : [0],
    strings: f.str(t) || e ? n.split(r) : [],
  };
}
function je(t) {
  var e = t ? fe(f.arr(t) ? t.map(st) : st(t)) : [];
  return de(e, function (r, n, i) {
    return i.indexOf(r) === n;
  });
}
function kt(t) {
  var e = je(t);
  return e.map(function (r, n) {
    return { target: r, id: n, total: e.length, transforms: { list: xt(r) } };
  });
}
function _r(t, e) {
  var r = De(e);
  if ((/^spring/.test(r.easing) && (r.duration = bt(r.easing)), f.arr(t))) {
    var n = t.length,
      i = n === 2 && !f.obj(t[0]);
    i ? (t = { value: t }) : f.fnc(e.duration) || (r.duration = e.duration / n);
  }
  var s = f.arr(t) ? t : [t];
  return s
    .map(function (a, l) {
      var o = f.obj(a) && !f.pth(a) ? a : { value: a };
      return (
        f.und(o.delay) && (o.delay = l ? 0 : e.delay),
        f.und(o.endDelay) && (o.endDelay = l === s.length - 1 ? e.endDelay : 0),
        o
      );
    })
    .map(function (a) {
      return ve(a, r);
    });
}
function br(t) {
  for (
    var e = de(
        fe(
          t.map(function (s) {
            return Object.keys(s);
          }),
        ),
        function (s) {
          return f.key(s);
        },
      ).reduce(function (s, a) {
        return s.indexOf(a) < 0 && s.push(a), s;
      }, []),
      r = {},
      n = function (s) {
        var a = e[s];
        r[a] = t.map(function (l) {
          var o = {};
          for (var h in l)
            f.key(h) ? h == a && (o.value = l[h]) : (o[h] = l[h]);
          return o;
        });
      },
      i = 0;
    i < e.length;
    i++
  )
    n(i);
  return r;
}
function Ar(t, e) {
  var r = [],
    n = e.keyframes;
  n && (e = ve(br(n), e));
  for (var i in e)
    f.key(i) &&
      r.push({
        name: i,
        tweens: _r(e[i], t),
      });
  return r;
}
function wr(t, e) {
  var r = {};
  for (var n in t) {
    var i = ke(t[n], e);
    f.arr(i) &&
      ((i = i.map(function (s) {
        return ke(s, e);
      })),
      i.length === 1 && (i = i[0])),
      (r[n] = i);
  }
  return (
    (r.duration = parseFloat(r.duration)), (r.delay = parseFloat(r.delay)), r
  );
}
function Er(t, e) {
  var r;
  return t.tweens.map(function (n) {
    var i = wr(n, e),
      s = i.value,
      a = f.arr(s) ? s[1] : s,
      l = z(a),
      o = Ue(e.target, t.name, l, e),
      h = r ? r.to.original : o,
      u = f.arr(s) ? s[0] : h,
      c = z(u) || z(o),
      d = l || c;
    return (
      f.und(a) && (a = h),
      (i.from = ot(u, d)),
      (i.to = ot(He(a, u), d)),
      (i.start = r ? r.end : 0),
      (i.end = i.start + i.delay + i.duration + i.endDelay),
      (i.easing = Re(i.easing, i.duration)),
      (i.isPath = f.pth(s)),
      (i.isPathTargetInsideSVG = i.isPath && f.svg(e.target)),
      (i.isColor = f.col(i.from.original)),
      i.isColor && (i.round = 1),
      (r = i),
      i
    );
  });
}
var Tt = {
  css: function (t, e, r) {
    return (t.style[e] = r);
  },
  attribute: function (t, e, r) {
    return t.setAttribute(e, r);
  },
  object: function (t, e, r) {
    return (t[e] = r);
  },
  transform: function (t, e, r, n, i) {
    if ((n.list.set(e, r), e === n.last || i)) {
      var s = '';
      n.list.forEach(function (a, l) {
        s += l + '(' + a + ') ';
      }),
        (t.style.transform = s);
    }
  },
};
function Ot(t, e) {
  var r = kt(t);
  r.forEach(function (n) {
    for (var i in e) {
      var s = ke(e[i], n),
        a = n.target,
        l = z(s),
        o = Ue(a, i, l, n),
        h = l || z(o),
        u = He(St(s, h), o),
        c = Le(a, i);
      Tt[c](a, i, u, n.transforms, !0);
    }
  });
}
function xr(t, e) {
  var r = Le(t.target, e.name);
  if (r) {
    var n = Er(e, t),
      i = n[n.length - 1];
    return {
      type: r,
      property: e.name,
      animatable: t,
      tweens: n,
      duration: i.end,
      delay: n[0].delay,
      endDelay: i.endDelay,
    };
  }
}
function Sr(t, e) {
  return de(
    fe(
      t.map(function (r) {
        return e.map(function (n) {
          return xr(r, n);
        });
      }),
    ),
    function (r) {
      return !f.und(r);
    },
  );
}
function zt(t, e) {
  var r = t.length,
    n = function (s) {
      return s.timelineOffset ? s.timelineOffset : 0;
    },
    i = {};
  return (
    (i.duration = r
      ? Math.max.apply(
          Math,
          t.map(function (s) {
            return n(s) + s.duration;
          }),
        )
      : e.duration),
    (i.delay = r
      ? Math.min.apply(
          Math,
          t.map(function (s) {
            return n(s) + s.delay;
          }),
        )
      : e.delay),
    (i.endDelay = r
      ? i.duration -
        Math.max.apply(
          Math,
          t.map(function (s) {
            return n(s) + s.duration - s.endDelay;
          }),
        )
      : e.endDelay),
    i
  );
}
var at = 0;
function Cr(t) {
  var e = Me($t, t),
    r = Me(ze, t),
    n = Ar(r, t),
    i = kt(t.targets),
    s = Sr(i, n),
    a = zt(s, r),
    l = at;
  return (
    at++,
    ve(e, {
      id: l,
      children: [],
      animatables: i,
      animations: s,
      duration: a.duration,
      delay: a.delay,
      endDelay: a.endDelay,
    })
  );
}
var M = [],
  Rt = (function () {
    var t;
    function e() {
      !t &&
        (!lt() || !_.suspendWhenDocumentHidden) &&
        M.length > 0 &&
        (t = requestAnimationFrame(r));
    }
    function r(i) {
      for (var s = M.length, a = 0; a < s; ) {
        var l = M[a];
        l.paused ? (M.splice(a, 1), s--) : (l.tick(i), a++);
      }
      t = a > 0 ? requestAnimationFrame(r) : void 0;
    }
    function n() {
      _.suspendWhenDocumentHidden &&
        (lt()
          ? (t = cancelAnimationFrame(t))
          : (M.forEach(function (i) {
              return i._onDocumentVisibility();
            }),
            Rt()));
    }
    return (
      typeof document < 'u' && document.addEventListener('visibilitychange', n),
      e
    );
  })();
function lt() {
  return !!document && document.hidden;
}
function _(t) {
  t === void 0 && (t = {});
  var e = 0,
    r = 0,
    n = 0,
    i,
    s = 0,
    a = null;
  function l(g) {
    var p =
      window.Promise &&
      new Promise(function (E) {
        return (a = E);
      });
    return (g.finished = p), p;
  }
  var o = Cr(t);
  l(o);
  function h() {
    var g = o.direction;
    g !== 'alternate' && (o.direction = g !== 'normal' ? 'normal' : 'reverse'),
      (o.reversed = !o.reversed),
      i.forEach(function (p) {
        return (p.reversed = o.reversed);
      });
  }
  function u(g) {
    return o.reversed ? o.duration - g : g;
  }
  function c() {
    (e = 0), (r = u(o.currentTime) * (1 / _.speed));
  }
  function d(g, p) {
    p && p.seek(g - p.timelineOffset);
  }
  function y(g) {
    if (o.reversePlayback) for (var E = s; E--; ) d(g, i[E]);
    else for (var p = 0; p < s; p++) d(g, i[p]);
  }
  function m(g) {
    for (var p = 0, E = o.animations, R = E.length; p < R; ) {
      var A = E[p],
        I = A.animatable,
        J = A.tweens,
        B = J.length - 1,
        w = J[B];
      B &&
        (w =
          de(J, function (It) {
            return g < It.end;
          })[0] || w);
      for (
        var j = T(g - w.start - w.delay, 0, w.duration) / w.duration,
          oe = isNaN(j) ? 1 : w.easing(j),
          P = w.to.strings,
          pe = w.round,
          ge = [],
          Dt = w.to.numbers.length,
          V = void 0,
          Y = 0;
        Y < Dt;
        Y++
      ) {
        var G = void 0,
          Ve = w.to.numbers[Y],
          Fe = w.from.numbers[Y] || 0;
        w.isPath
          ? (G = $r(w.value, oe * Ve, w.isPathTargetInsideSVG))
          : (G = Fe + oe * (Ve - Fe)),
          pe && ((w.isColor && Y > 2) || (G = Math.round(G * pe) / pe)),
          ge.push(G);
      }
      var We = P.length;
      if (!We) V = ge[0];
      else {
        V = P[0];
        for (var X = 0; X < We; X++) {
          P[X];
          var qe = P[X + 1],
            me = ge[X];
          isNaN(me) || (qe ? (V += me + qe) : (V += me + ' '));
        }
      }
      Tt[A.type](I.target, A.property, V, I.transforms),
        (A.currentValue = V),
        p++;
    }
  }
  function v(g) {
    o[g] && !o.passThrough && o[g](o);
  }
  function $() {
    o.remaining && o.remaining !== !0 && o.remaining--;
  }
  function b(g) {
    var p = o.duration,
      E = o.delay,
      R = p - o.endDelay,
      A = u(g);
    (o.progress = T((A / p) * 100, 0, 100)),
      (o.reversePlayback = A < o.currentTime),
      i && y(A),
      !o.began && o.currentTime > 0 && ((o.began = !0), v('begin')),
      !o.loopBegan && o.currentTime > 0 && ((o.loopBegan = !0), v('loopBegin')),
      A <= E && o.currentTime !== 0 && m(0),
      ((A >= R && o.currentTime !== p) || !p) && m(p),
      A > E && A < R
        ? (o.changeBegan ||
            ((o.changeBegan = !0), (o.changeCompleted = !1), v('changeBegin')),
          v('change'),
          m(A))
        : o.changeBegan &&
          ((o.changeCompleted = !0), (o.changeBegan = !1), v('changeComplete')),
      (o.currentTime = T(A, 0, p)),
      o.began && v('update'),
      g >= p &&
        ((r = 0),
        $(),
        o.remaining
          ? ((e = n),
            v('loopComplete'),
            (o.loopBegan = !1),
            o.direction === 'alternate' && h())
          : ((o.paused = !0),
            o.completed ||
              ((o.completed = !0),
              v('loopComplete'),
              v('complete'),
              !o.passThrough && 'Promise' in window && (a(), l(o)))));
  }
  return (
    (o.reset = function () {
      var g = o.direction;
      (o.passThrough = !1),
        (o.currentTime = 0),
        (o.progress = 0),
        (o.paused = !0),
        (o.began = !1),
        (o.loopBegan = !1),
        (o.changeBegan = !1),
        (o.completed = !1),
        (o.changeCompleted = !1),
        (o.reversePlayback = !1),
        (o.reversed = g === 'reverse'),
        (o.remaining = o.loop),
        (i = o.children),
        (s = i.length);
      for (var p = s; p--; ) o.children[p].reset();
      ((o.reversed && o.loop !== !0) || (g === 'alternate' && o.loop === 1)) &&
        o.remaining++,
        m(o.reversed ? o.duration : 0);
    }),
    (o._onDocumentVisibility = c),
    (o.set = function (g, p) {
      return Ot(g, p), o;
    }),
    (o.tick = function (g) {
      (n = g), e || (e = n), b((n + (r - e)) * _.speed);
    }),
    (o.seek = function (g) {
      b(u(g));
    }),
    (o.pause = function () {
      (o.paused = !0), c();
    }),
    (o.play = function () {
      o.paused &&
        (o.completed && o.reset(), (o.paused = !1), M.push(o), c(), Rt());
    }),
    (o.reverse = function () {
      h(), (o.completed = !o.reversed), c();
    }),
    (o.restart = function () {
      o.reset(), o.play();
    }),
    (o.remove = function (g) {
      var p = je(g);
      Nt(p, o);
    }),
    o.reset(),
    o.autoplay && o.play(),
    o
  );
}
function ut(t, e) {
  for (var r = e.length; r--; ) Ne(t, e[r].animatable.target) && e.splice(r, 1);
}
function Nt(t, e) {
  var r = e.animations,
    n = e.children;
  ut(t, r);
  for (var i = n.length; i--; ) {
    var s = n[i],
      a = s.animations;
    ut(t, a), !a.length && !s.children.length && n.splice(i, 1);
  }
  !r.length && !n.length && e.pause();
}
function Pr(t) {
  for (var e = je(t), r = M.length; r--; ) {
    var n = M[r];
    Nt(e, n);
  }
}
function Mr(t, e) {
  e === void 0 && (e = {});
  var r = e.direction || 'normal',
    n = e.easing ? Re(e.easing) : null,
    i = e.grid,
    s = e.axis,
    a = e.from || 0,
    l = a === 'first',
    o = a === 'center',
    h = a === 'last',
    u = f.arr(t),
    c = parseFloat(u ? t[0] : t),
    d = u ? parseFloat(t[1]) : 0,
    y = z(u ? t[1] : t) || 0,
    m = e.start || 0 + (u ? c : 0),
    v = [],
    $ = 0;
  return function (b, g, p) {
    if ((l && (a = 0), o && (a = (p - 1) / 2), h && (a = p - 1), !v.length)) {
      for (var E = 0; E < p; E++) {
        if (!i) v.push(Math.abs(a - E));
        else {
          var R = o ? (i[0] - 1) / 2 : a % i[0],
            A = o ? (i[1] - 1) / 2 : Math.floor(a / i[0]),
            I = E % i[0],
            J = Math.floor(E / i[0]),
            B = R - I,
            w = A - J,
            j = Math.sqrt(B * B + w * w);
          s === 'x' && (j = -B), s === 'y' && (j = -w), v.push(j);
        }
        $ = Math.max.apply(Math, v);
      }
      n &&
        (v = v.map(function (P) {
          return n(P / $) * $;
        })),
        r === 'reverse' &&
          (v = v.map(function (P) {
            return s ? (P < 0 ? P * -1 : -P) : Math.abs($ - P);
          }));
    }
    var oe = u ? (d - c) / $ : c;
    return m + oe * (Math.round(v[g] * 100) / 100) + y;
  };
}
function kr(t) {
  t === void 0 && (t = {});
  var e = _(t);
  return (
    (e.duration = 0),
    (e.add = function (r, n) {
      var i = M.indexOf(e),
        s = e.children;
      i > -1 && M.splice(i, 1);
      function a(d) {
        d.passThrough = !0;
      }
      for (var l = 0; l < s.length; l++) a(s[l]);
      var o = ve(r, Me(ze, t));
      o.targets = o.targets || t.targets;
      var h = e.duration;
      (o.autoplay = !1),
        (o.direction = e.direction),
        (o.timelineOffset = f.und(n) ? h : He(n, h)),
        a(e),
        e.seek(o.timelineOffset);
      var u = _(o);
      a(u), s.push(u);
      var c = zt(s, t);
      return (
        (e.delay = c.delay),
        (e.endDelay = c.endDelay),
        (e.duration = c.duration),
        e.seek(0),
        e.reset(),
        e.autoplay && e.play(),
        e
      );
    }),
    e
  );
}
_.version = '3.2.1';
_.speed = 1;
_.suspendWhenDocumentHidden = !0;
_.running = M;
_.remove = Pr;
_.get = Ue;
_.set = Ot;
_.convertPx = Ie;
_.path = yr;
_.setDashoffset = gr;
_.stagger = Mr;
_.timeline = kr;
_.easing = Re;
_.penner = At;
_.random = function (t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
};
var Tr = Object.defineProperty,
  Or = Object.getOwnPropertyDescriptor,
  Q = (t, e, r, n) => {
    for (
      var i = n > 1 ? void 0 : n ? Or(e, r) : e, s = t.length - 1, a;
      s >= 0;
      s--
    )
      (a = t[s]) && (i = (n ? a(e, r, i) : a(i)) || i);
    return n && i && Tr(e, r, i), i;
  };
let D = class extends W {
  constructor() {
    super(...arguments),
      (this.size = 40),
      (this.easing = 'linear'),
      (this.scale = 1),
      (this.gap = 8),
      (this.direction = 'horizontal');
  }
  get sizeStyle() {
    const t = {
      width: `${this.size}px`,
      height: `${this.size}px`,
    };
    return Object.entries(t).reduce(
      (e, [r, n]) => ((e += `${r}: ${n};`), e),
      '',
    );
  }
  get gapStyle() {
    return `--gap: ${this.gap}px`;
  }
  get liStyle() {
    return `${this.sizeStyle};${this.gapStyle}`;
  }
  get className() {
    return `${this.direction} dock-item`;
  }
  render() {
    return gt`
      <li class=${this.className} style=${this.liStyle}>
        <div class="dock-item__pos">
          <div class="dock-item__scale" style=${this.sizeStyle}>
            <slot></slot>
          </div>
        </div>
      </li>
    `;
  }
  updated(t) {
    t.has('scale') && this.onScaleChanged(this.scale);
  }
  onScaleChanged(t) {
    var n, i;
    const e =
        (n = this.shadowRoot) == null ? void 0 : n.querySelector('.dock-item'),
      r =
        (i = this.shadowRoot) == null
          ? void 0
          : i.querySelector('.dock-item__scale');
    _({
      targets: e,
      width: `${this.size * t}px`,
      height: `${this.size * t}px`,
      duration: 100,
      easing: this.easing,
    }),
      _({
        targets: r,
        scale: t,
        duration: 100,
        easing: this.easing,
      });
  }
};
D.styles = ht`
    li.dock-item {
      position: relative;
    }
    li.dock-item .dock-item__pos {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) scale(var(--scale, 1));
    }
    li::before,
    li::after {
      content: "";
      position: absolute;
      /* For debug */
      /* background: red; */
    }
    li.horizontal::before,
    li.horizontal::after {
      width: var(--gap, 0px);
      height: 100%;
      top: 0;
    }
    li.horizontal::before {
      right: 100%
    }
    li.horizontal::after {
      left: 100%;
    }
    li.vertical::before,
    li.vertical::after {
      width: 100%;
      height: var(--gap, 0px);
      left: 0;
    }
    li.vertical::before {
      bottom: 100%;
    }
    li.vertical::after {
      top: 100%;
    }
    .dock-item__scale {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dock-item__scale > ::slotted(*) {
      width: 100%;
      height: 100%;
    }
  `;
Q([S({ type: Number })], D.prototype, 'size', 2);
Q([S({ type: String })], D.prototype, 'easing', 2);
Q([S({ type: Number })], D.prototype, 'scale', 2);
Q([S({ type: Number })], D.prototype, 'gap', 2);
Q([S({ type: String })], D.prototype, 'direction', 2);
D = Q([yt('dock-item')], D);
export { D as DockItem, C as DockWrapper };
