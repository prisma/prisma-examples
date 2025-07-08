import { hasInjectionContext, getCurrentInstance, inject, defineComponent, useSSRContext, createElementBlock, shallowRef, provide, cloneVNode, h, createApp, reactive, ref, mergeProps, unref, computed, withAsyncContext, withCtx, createTextVNode, createVNode, createBlock, openBlock, Suspense, toRef, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, shallowReactive, effectScope, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, getCurrentScope, toValue, watch, nextTick } from 'vue';
import ft from 'node:http';
import Qa from 'node:https';
import Ye from 'node:zlib';
import ie, { PassThrough, pipeline } from 'node:stream';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promisify, deprecate, types } from 'node:util';
import { format } from 'node:url';
import { isIP } from 'node:net';
import { promises, statSync, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { i as hasProtocol, k as isScriptProtocol, l as joinURL, w as withQuery, s as sanitizeStatusCode, m as getContext, n as createHooks, e as createError$1, o as isEqual, p as withBase, q as destr, r as stringifyParsedURL, t as stringifyQuery, v as parseQuery, x as toRouteMatcher, y as createRouter, z as defu, A as hash } from '../nitro/nitro.mjs';
import { u as useHead$1, h as headSymbol, b as baseURL } from '../routes/renderer.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { debounce } from 'perfect-debounce';
import 'node:events';
import 'node:crypto';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _e, _t, _r, _n, _a, _e2, _t2, _b, _e3, _c, _e4, _t3, _d, _e5, _f;
var t = Object.defineProperty;
var o$1 = (e, l) => t(e, "name", { value: l, configurable: true });
var n$2 = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {};
function f(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
o$1(f, "getDefaultExportFromCjs");
var Va = Object.defineProperty;
var n$1 = (i, o2) => Va(i, "name", { value: o2, configurable: true });
function ts(i) {
  if (!/^data:/i.test(i)) throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  i = i.replace(/\r?\n/g, "");
  const o2 = i.indexOf(",");
  if (o2 === -1 || o2 <= 4) throw new TypeError("malformed data: URI");
  const a = i.substring(5, o2).split(";");
  let l = "", u = false;
  const m = a[0] || "text/plain";
  let h2 = m;
  for (let A = 1; A < a.length; A++) a[A] === "base64" ? u = true : a[A] && (h2 += `;${a[A]}`, a[A].indexOf("charset=") === 0 && (l = a[A].substring(8)));
  !a[0] && !l.length && (h2 += ";charset=US-ASCII", l = "US-ASCII");
  const S = u ? "base64" : "ascii", E = unescape(i.substring(o2 + 1)), w = Buffer.from(E, S);
  return w.type = m, w.typeFull = h2, w.charset = l, w;
}
n$1(ts, "dataUriToBuffer");
var Eo = {}, ct = { exports: {} };
/**
* @license
* web-streams-polyfill v3.3.3
* Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
* This code is released under the MIT license.
* SPDX-License-Identifier: MIT
*/
var rs = ct.exports, vo;
function ns() {
  return vo || (vo = 1, function(i, o2) {
    (function(a, l) {
      l(o2);
    })(rs, function(a) {
      function l() {
      }
      n$1(l, "noop");
      function u(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n$1(u, "typeIsObject");
      const m = l;
      function h2(e, t2) {
        try {
          Object.defineProperty(e, "name", { value: t2, configurable: true });
        } catch {
        }
      }
      n$1(h2, "setFunctionName");
      const S = Promise, E = Promise.prototype.then, w = Promise.reject.bind(S);
      function A(e) {
        return new S(e);
      }
      n$1(A, "newPromise");
      function T2(e) {
        return A((t2) => t2(e));
      }
      n$1(T2, "promiseResolvedWith");
      function b(e) {
        return w(e);
      }
      n$1(b, "promiseRejectedWith");
      function q(e, t2, r2) {
        return E.call(e, t2, r2);
      }
      n$1(q, "PerformPromiseThen");
      function g(e, t2, r2) {
        q(q(e, t2, r2), void 0, m);
      }
      n$1(g, "uponPromise");
      function V(e, t2) {
        g(e, t2);
      }
      n$1(V, "uponFulfillment");
      function I(e, t2) {
        g(e, void 0, t2);
      }
      n$1(I, "uponRejection");
      function F(e, t2, r2) {
        return q(e, t2, r2);
      }
      n$1(F, "transformPromiseWith");
      function Q(e) {
        q(e, void 0, m);
      }
      n$1(Q, "setPromiseIsHandledToTrue");
      let se = n$1((e) => {
        if (typeof queueMicrotask == "function") se = queueMicrotask;
        else {
          const t2 = T2(void 0);
          se = n$1((r2) => q(t2, r2), "_queueMicrotask");
        }
        return se(e);
      }, "_queueMicrotask");
      function O(e, t2, r2) {
        if (typeof e != "function") throw new TypeError("Argument is not a function");
        return Function.prototype.apply.call(e, t2, r2);
      }
      n$1(O, "reflectCall");
      function z(e, t2, r2) {
        try {
          return T2(O(e, t2, r2));
        } catch (s) {
          return b(s);
        }
      }
      n$1(z, "promiseCall");
      const $ = 16384;
      const _M = class _M {
        constructor() {
          this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(t2) {
          const r2 = this._back;
          let s = r2;
          r2._elements.length === $ - 1 && (s = { _elements: [], _next: void 0 }), r2._elements.push(t2), s !== r2 && (this._back = s, r2._next = s), ++this._size;
        }
        shift() {
          const t2 = this._front;
          let r2 = t2;
          const s = this._cursor;
          let f2 = s + 1;
          const c = t2._elements, d = c[s];
          return f2 === $ && (r2 = t2._next, f2 = 0), --this._size, this._cursor = f2, t2 !== r2 && (this._front = r2), c[s] = void 0, d;
        }
        forEach(t2) {
          let r2 = this._cursor, s = this._front, f2 = s._elements;
          for (; (r2 !== f2.length || s._next !== void 0) && !(r2 === f2.length && (s = s._next, f2 = s._elements, r2 = 0, f2.length === 0)); ) t2(f2[r2]), ++r2;
        }
        peek() {
          const t2 = this._front, r2 = this._cursor;
          return t2._elements[r2];
        }
      };
      n$1(_M, "SimpleQueue");
      let M = _M;
      const pt = Symbol("[[AbortSteps]]"), an = Symbol("[[ErrorSteps]]"), ar = Symbol("[[CancelSteps]]"), sr = Symbol("[[PullSteps]]"), ur = Symbol("[[ReleaseSteps]]");
      function sn(e, t2) {
        e._ownerReadableStream = t2, t2._reader = e, t2._state === "readable" ? fr(e) : t2._state === "closed" ? ri(e) : un(e, t2._storedError);
      }
      n$1(sn, "ReadableStreamReaderGenericInitialize");
      function lr(e, t2) {
        const r2 = e._ownerReadableStream;
        return X(r2, t2);
      }
      n$1(lr, "ReadableStreamReaderGenericCancel");
      function ue(e) {
        const t2 = e._ownerReadableStream;
        t2._state === "readable" ? cr(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : ni(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t2._readableStreamController[ur](), t2._reader = void 0, e._ownerReadableStream = void 0;
      }
      n$1(ue, "ReadableStreamReaderGenericRelease");
      function yt(e) {
        return new TypeError("Cannot " + e + " a stream using a released reader");
      }
      n$1(yt, "readerLockException");
      function fr(e) {
        e._closedPromise = A((t2, r2) => {
          e._closedPromise_resolve = t2, e._closedPromise_reject = r2;
        });
      }
      n$1(fr, "defaultReaderClosedPromiseInitialize");
      function un(e, t2) {
        fr(e), cr(e, t2);
      }
      n$1(un, "defaultReaderClosedPromiseInitializeAsRejected");
      function ri(e) {
        fr(e), ln(e);
      }
      n$1(ri, "defaultReaderClosedPromiseInitializeAsResolved");
      function cr(e, t2) {
        e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t2), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n$1(cr, "defaultReaderClosedPromiseReject");
      function ni(e, t2) {
        un(e, t2);
      }
      n$1(ni, "defaultReaderClosedPromiseResetToRejected");
      function ln(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n$1(ln, "defaultReaderClosedPromiseResolve");
      const fn = Number.isFinite || function(e) {
        return typeof e == "number" && isFinite(e);
      }, oi = Math.trunc || function(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
      };
      function ii(e) {
        return typeof e == "object" || typeof e == "function";
      }
      n$1(ii, "isDictionary");
      function ne(e, t2) {
        if (e !== void 0 && !ii(e)) throw new TypeError(`${t2} is not an object.`);
      }
      n$1(ne, "assertDictionary");
      function G(e, t2) {
        if (typeof e != "function") throw new TypeError(`${t2} is not a function.`);
      }
      n$1(G, "assertFunction");
      function ai(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n$1(ai, "isObject");
      function cn(e, t2) {
        if (!ai(e)) throw new TypeError(`${t2} is not an object.`);
      }
      n$1(cn, "assertObject");
      function le(e, t2, r2) {
        if (e === void 0) throw new TypeError(`Parameter ${t2} is required in '${r2}'.`);
      }
      n$1(le, "assertRequiredArgument");
      function dr(e, t2, r2) {
        if (e === void 0) throw new TypeError(`${t2} is required in '${r2}'.`);
      }
      n$1(dr, "assertRequiredField");
      function hr(e) {
        return Number(e);
      }
      n$1(hr, "convertUnrestrictedDouble");
      function dn(e) {
        return e === 0 ? 0 : e;
      }
      n$1(dn, "censorNegativeZero");
      function si(e) {
        return dn(oi(e));
      }
      n$1(si, "integerPart");
      function mr(e, t2) {
        const s = Number.MAX_SAFE_INTEGER;
        let f2 = Number(e);
        if (f2 = dn(f2), !fn(f2)) throw new TypeError(`${t2} is not a finite number`);
        if (f2 = si(f2), f2 < 0 || f2 > s) throw new TypeError(`${t2} is outside the accepted range of 0 to ${s}, inclusive`);
        return !fn(f2) || f2 === 0 ? 0 : f2;
      }
      n$1(mr, "convertUnsignedLongLongWithEnforceRange");
      function br(e, t2) {
        if (!Te(e)) throw new TypeError(`${t2} is not a ReadableStream.`);
      }
      n$1(br, "assertReadableStream");
      function ze(e) {
        return new ye(e);
      }
      n$1(ze, "AcquireReadableStreamDefaultReader");
      function hn(e, t2) {
        e._reader._readRequests.push(t2);
      }
      n$1(hn, "ReadableStreamAddReadRequest");
      function pr(e, t2, r2) {
        const f2 = e._reader._readRequests.shift();
        r2 ? f2._closeSteps() : f2._chunkSteps(t2);
      }
      n$1(pr, "ReadableStreamFulfillReadRequest");
      function gt(e) {
        return e._reader._readRequests.length;
      }
      n$1(gt, "ReadableStreamGetNumReadRequests");
      function mn(e) {
        const t2 = e._reader;
        return !(t2 === void 0 || !ge(t2));
      }
      n$1(mn, "ReadableStreamHasDefaultReader");
      const _ye = class _ye {
        constructor(t2) {
          if (le(t2, 1, "ReadableStreamDefaultReader"), br(t2, "First parameter"), Ce(t2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          sn(this, t2), this._readRequests = new M();
        }
        get closed() {
          return ge(this) ? this._closedPromise : b(_t4("closed"));
        }
        cancel(t2 = void 0) {
          return ge(this) ? this._ownerReadableStream === void 0 ? b(yt("cancel")) : lr(this, t2) : b(_t4("cancel"));
        }
        read() {
          if (!ge(this)) return b(_t4("read"));
          if (this._ownerReadableStream === void 0) return b(yt("read from"));
          let t2, r2;
          const s = A((c, d) => {
            t2 = c, r2 = d;
          });
          return et(this, { _chunkSteps: n$1((c) => t2({ value: c, done: false }), "_chunkSteps"), _closeSteps: n$1(() => t2({ value: void 0, done: true }), "_closeSteps"), _errorSteps: n$1((c) => r2(c), "_errorSteps") }), s;
        }
        releaseLock() {
          if (!ge(this)) throw _t4("releaseLock");
          this._ownerReadableStream !== void 0 && ui(this);
        }
      };
      n$1(_ye, "ReadableStreamDefaultReader");
      let ye = _ye;
      Object.defineProperties(ye.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h2(ye.prototype.cancel, "cancel"), h2(ye.prototype.read, "read"), h2(ye.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ye.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
      function ge(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? false : e instanceof ye;
      }
      n$1(ge, "IsReadableStreamDefaultReader");
      function et(e, t2) {
        const r2 = e._ownerReadableStream;
        r2._disturbed = true, r2._state === "closed" ? t2._closeSteps() : r2._state === "errored" ? t2._errorSteps(r2._storedError) : r2._readableStreamController[sr](t2);
      }
      n$1(et, "ReadableStreamDefaultReaderRead");
      function ui(e) {
        ue(e);
        const t2 = new TypeError("Reader was released");
        bn(e, t2);
      }
      n$1(ui, "ReadableStreamDefaultReaderRelease");
      function bn(e, t2) {
        const r2 = e._readRequests;
        e._readRequests = new M(), r2.forEach((s) => {
          s._errorSteps(t2);
        });
      }
      n$1(bn, "ReadableStreamDefaultReaderErrorReadRequests");
      function _t4(e) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
      }
      n$1(_t4, "defaultReaderBrandCheckException");
      const li = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      const _pn = class _pn {
        constructor(t2, r2) {
          this._ongoingPromise = void 0, this._isFinished = false, this._reader = t2, this._preventCancel = r2;
        }
        next() {
          const t2 = n$1(() => this._nextSteps(), "nextSteps");
          return this._ongoingPromise = this._ongoingPromise ? F(this._ongoingPromise, t2, t2) : t2(), this._ongoingPromise;
        }
        return(t2) {
          const r2 = n$1(() => this._returnSteps(t2), "returnSteps");
          return this._ongoingPromise ? F(this._ongoingPromise, r2, r2) : r2();
        }
        _nextSteps() {
          if (this._isFinished) return Promise.resolve({ value: void 0, done: true });
          const t2 = this._reader;
          let r2, s;
          const f2 = A((d, p) => {
            r2 = d, s = p;
          });
          return et(t2, { _chunkSteps: n$1((d) => {
            this._ongoingPromise = void 0, se(() => r2({ value: d, done: false }));
          }, "_chunkSteps"), _closeSteps: n$1(() => {
            this._ongoingPromise = void 0, this._isFinished = true, ue(t2), r2({ value: void 0, done: true });
          }, "_closeSteps"), _errorSteps: n$1((d) => {
            this._ongoingPromise = void 0, this._isFinished = true, ue(t2), s(d);
          }, "_errorSteps") }), f2;
        }
        _returnSteps(t2) {
          if (this._isFinished) return Promise.resolve({ value: t2, done: true });
          this._isFinished = true;
          const r2 = this._reader;
          if (!this._preventCancel) {
            const s = lr(r2, t2);
            return ue(r2), F(s, () => ({ value: t2, done: true }));
          }
          return ue(r2), T2({ value: t2, done: true });
        }
      };
      n$1(_pn, "ReadableStreamAsyncIteratorImpl");
      let pn = _pn;
      const yn = { next() {
        return gn(this) ? this._asyncIteratorImpl.next() : b(_n2("next"));
      }, return(e) {
        return gn(this) ? this._asyncIteratorImpl.return(e) : b(_n2("return"));
      } };
      Object.setPrototypeOf(yn, li);
      function fi(e, t2) {
        const r2 = ze(e), s = new pn(r2, t2), f2 = Object.create(yn);
        return f2._asyncIteratorImpl = s, f2;
      }
      n$1(fi, "AcquireReadableStreamAsyncIterator");
      function gn(e) {
        if (!u(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return false;
        try {
          return e._asyncIteratorImpl instanceof pn;
        } catch {
          return false;
        }
      }
      n$1(gn, "IsReadableStreamAsyncIterator");
      function _n2(e) {
        return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
      }
      n$1(_n2, "streamAsyncIteratorBrandCheckException");
      const Sn = Number.isNaN || function(e) {
        return e !== e;
      };
      var yr, gr, _r2;
      function tt(e) {
        return e.slice();
      }
      n$1(tt, "CreateArrayFromList");
      function wn(e, t2, r2, s, f2) {
        new Uint8Array(e).set(new Uint8Array(r2, s, f2), t2);
      }
      n$1(wn, "CopyDataBlockBytes");
      let fe = n$1((e) => (typeof e.transfer == "function" ? fe = n$1((t2) => t2.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? fe = n$1((t2) => structuredClone(t2, { transfer: [t2] }), "TransferArrayBuffer") : fe = n$1((t2) => t2, "TransferArrayBuffer"), fe(e)), "TransferArrayBuffer"), _e6 = n$1((e) => (typeof e.detached == "boolean" ? _e6 = n$1((t2) => t2.detached, "IsDetachedBuffer") : _e6 = n$1((t2) => t2.byteLength === 0, "IsDetachedBuffer"), _e6(e)), "IsDetachedBuffer");
      function Rn(e, t2, r2) {
        if (e.slice) return e.slice(t2, r2);
        const s = r2 - t2, f2 = new ArrayBuffer(s);
        return wn(f2, 0, e, t2, s), f2;
      }
      n$1(Rn, "ArrayBufferSlice");
      function St(e, t2) {
        const r2 = e[t2];
        if (r2 != null) {
          if (typeof r2 != "function") throw new TypeError(`${String(t2)} is not a function`);
          return r2;
        }
      }
      n$1(St, "GetMethod");
      function ci(e) {
        const t2 = { [Symbol.iterator]: () => e.iterator }, r2 = async function* () {
          return yield* t2;
        }(), s = r2.next;
        return { iterator: r2, nextMethod: s, done: false };
      }
      n$1(ci, "CreateAsyncFromSyncIterator");
      const Sr = (_r2 = (yr = Symbol.asyncIterator) !== null && yr !== void 0 ? yr : (gr = Symbol.for) === null || gr === void 0 ? void 0 : gr.call(Symbol, "Symbol.asyncIterator")) !== null && _r2 !== void 0 ? _r2 : "@@asyncIterator";
      function Tn(e, t2 = "sync", r2) {
        if (r2 === void 0) if (t2 === "async") {
          if (r2 = St(e, Sr), r2 === void 0) {
            const c = St(e, Symbol.iterator), d = Tn(e, "sync", c);
            return ci(d);
          }
        } else r2 = St(e, Symbol.iterator);
        if (r2 === void 0) throw new TypeError("The object is not iterable");
        const s = O(r2, e, []);
        if (!u(s)) throw new TypeError("The iterator method must return an object");
        const f2 = s.next;
        return { iterator: s, nextMethod: f2, done: false };
      }
      n$1(Tn, "GetIterator");
      function di(e) {
        const t2 = O(e.nextMethod, e.iterator, []);
        if (!u(t2)) throw new TypeError("The iterator.next() method must return an object");
        return t2;
      }
      n$1(di, "IteratorNext");
      function hi(e) {
        return !!e.done;
      }
      n$1(hi, "IteratorComplete");
      function mi(e) {
        return e.value;
      }
      n$1(mi, "IteratorValue");
      function bi(e) {
        return !(typeof e != "number" || Sn(e) || e < 0);
      }
      n$1(bi, "IsNonNegativeNumber");
      function Cn(e) {
        const t2 = Rn(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
        return new Uint8Array(t2);
      }
      n$1(Cn, "CloneAsUint8Array");
      function wr(e) {
        const t2 = e._queue.shift();
        return e._queueTotalSize -= t2.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t2.value;
      }
      n$1(wr, "DequeueValue");
      function Rr(e, t2, r2) {
        if (!bi(r2) || r2 === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        e._queue.push({ value: t2, size: r2 }), e._queueTotalSize += r2;
      }
      n$1(Rr, "EnqueueValueWithSize");
      function pi(e) {
        return e._queue.peek().value;
      }
      n$1(pi, "PeekQueueValue");
      function Se(e) {
        e._queue = new M(), e._queueTotalSize = 0;
      }
      n$1(Se, "ResetQueue");
      function Pn(e) {
        return e === DataView;
      }
      n$1(Pn, "isDataViewConstructor");
      function yi(e) {
        return Pn(e.constructor);
      }
      n$1(yi, "isDataView");
      function gi(e) {
        return Pn(e) ? 1 : e.BYTES_PER_ELEMENT;
      }
      n$1(gi, "arrayBufferViewElementSize");
      const _ve = class _ve {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!Tr(this)) throw Ar("view");
          return this._view;
        }
        respond(t2) {
          if (!Tr(this)) throw Ar("respond");
          if (le(t2, 1, "respond"), t2 = mr(t2, "First parameter"), this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
          if (_e6(this._view.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
          Ct(this._associatedReadableByteStreamController, t2);
        }
        respondWithNewView(t2) {
          if (!Tr(this)) throw Ar("respondWithNewView");
          if (le(t2, 1, "respondWithNewView"), !ArrayBuffer.isView(t2)) throw new TypeError("You can only respond with array buffer views");
          if (this._associatedReadableByteStreamController === void 0) throw new TypeError("This BYOB request has been invalidated");
          if (_e6(t2.buffer)) throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          Pt(this._associatedReadableByteStreamController, t2);
        }
      };
      n$1(_ve, "ReadableStreamBYOBRequest");
      let ve = _ve;
      Object.defineProperties(ve.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), h2(ve.prototype.respond, "respond"), h2(ve.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ve.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
      const _ce = class _ce {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!Ae(this)) throw nt("byobRequest");
          return vr(this);
        }
        get desiredSize() {
          if (!Ae(this)) throw nt("desiredSize");
          return Fn(this);
        }
        close() {
          if (!Ae(this)) throw nt("close");
          if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
          const t2 = this._controlledReadableByteStream._state;
          if (t2 !== "readable") throw new TypeError(`The stream (in ${t2} state) is not in the readable state and cannot be closed`);
          rt(this);
        }
        enqueue(t2) {
          if (!Ae(this)) throw nt("enqueue");
          if (le(t2, 1, "enqueue"), !ArrayBuffer.isView(t2)) throw new TypeError("chunk must be an array buffer view");
          if (t2.byteLength === 0) throw new TypeError("chunk must have non-zero byteLength");
          if (t2.buffer.byteLength === 0) throw new TypeError("chunk's buffer must have non-zero byteLength");
          if (this._closeRequested) throw new TypeError("stream is closed or draining");
          const r2 = this._controlledReadableByteStream._state;
          if (r2 !== "readable") throw new TypeError(`The stream (in ${r2} state) is not in the readable state and cannot be enqueued to`);
          Tt(this, t2);
        }
        error(t2 = void 0) {
          if (!Ae(this)) throw nt("error");
          Z(this, t2);
        }
        [ar](t2) {
          En(this), Se(this);
          const r2 = this._cancelAlgorithm(t2);
          return Rt(this), r2;
        }
        [sr](t2) {
          const r2 = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            In(this, t2);
            return;
          }
          const s = this._autoAllocateChunkSize;
          if (s !== void 0) {
            let f2;
            try {
              f2 = new ArrayBuffer(s);
            } catch (d) {
              t2._errorSteps(d);
              return;
            }
            const c = { buffer: f2, bufferByteLength: s, byteOffset: 0, byteLength: s, bytesFilled: 0, minimumFill: 1, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
            this._pendingPullIntos.push(c);
          }
          hn(r2, t2), Be(this);
        }
        [ur]() {
          if (this._pendingPullIntos.length > 0) {
            const t2 = this._pendingPullIntos.peek();
            t2.readerType = "none", this._pendingPullIntos = new M(), this._pendingPullIntos.push(t2);
          }
        }
      };
      n$1(_ce, "ReadableByteStreamController");
      let ce = _ce;
      Object.defineProperties(ce.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), h2(ce.prototype.close, "close"), h2(ce.prototype.enqueue, "enqueue"), h2(ce.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, { value: "ReadableByteStreamController", configurable: true });
      function Ae(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? false : e instanceof ce;
      }
      n$1(Ae, "IsReadableByteStreamController");
      function Tr(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? false : e instanceof ve;
      }
      n$1(Tr, "IsReadableStreamBYOBRequest");
      function Be(e) {
        if (!Ti(e)) return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r2 = e._pullAlgorithm();
        g(r2, () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, Be(e)), null), (s) => (Z(e, s), null));
      }
      n$1(Be, "ReadableByteStreamControllerCallPullIfNeeded");
      function En(e) {
        Pr(e), e._pendingPullIntos = new M();
      }
      n$1(En, "ReadableByteStreamControllerClearPendingPullIntos");
      function Cr(e, t2) {
        let r2 = false;
        e._state === "closed" && (r2 = true);
        const s = vn(t2);
        t2.readerType === "default" ? pr(e, s, r2) : Bi(e, s, r2);
      }
      n$1(Cr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
      function vn(e) {
        const t2 = e.bytesFilled, r2 = e.elementSize;
        return new e.viewConstructor(e.buffer, e.byteOffset, t2 / r2);
      }
      n$1(vn, "ReadableByteStreamControllerConvertPullIntoDescriptor");
      function wt(e, t2, r2, s) {
        e._queue.push({ buffer: t2, byteOffset: r2, byteLength: s }), e._queueTotalSize += s;
      }
      n$1(wt, "ReadableByteStreamControllerEnqueueChunkToQueue");
      function An(e, t2, r2, s) {
        let f2;
        try {
          f2 = Rn(t2, r2, r2 + s);
        } catch (c) {
          throw Z(e, c), c;
        }
        wt(e, f2, 0, s);
      }
      n$1(An, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
      function Bn(e, t2) {
        t2.bytesFilled > 0 && An(e, t2.buffer, t2.byteOffset, t2.bytesFilled), je(e);
      }
      n$1(Bn, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
      function Wn(e, t2) {
        const r2 = Math.min(e._queueTotalSize, t2.byteLength - t2.bytesFilled), s = t2.bytesFilled + r2;
        let f2 = r2, c = false;
        const d = s % t2.elementSize, p = s - d;
        p >= t2.minimumFill && (f2 = p - t2.bytesFilled, c = true);
        const R = e._queue;
        for (; f2 > 0; ) {
          const y = R.peek(), C = Math.min(f2, y.byteLength), P = t2.byteOffset + t2.bytesFilled;
          wn(t2.buffer, P, y.buffer, y.byteOffset, C), y.byteLength === C ? R.shift() : (y.byteOffset += C, y.byteLength -= C), e._queueTotalSize -= C, kn(e, C, t2), f2 -= C;
        }
        return c;
      }
      n$1(Wn, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
      function kn(e, t2, r2) {
        r2.bytesFilled += t2;
      }
      n$1(kn, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
      function qn(e) {
        e._queueTotalSize === 0 && e._closeRequested ? (Rt(e), lt(e._controlledReadableByteStream)) : Be(e);
      }
      n$1(qn, "ReadableByteStreamControllerHandleQueueDrain");
      function Pr(e) {
        e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
      }
      n$1(Pr, "ReadableByteStreamControllerInvalidateBYOBRequest");
      function Er(e) {
        for (; e._pendingPullIntos.length > 0; ) {
          if (e._queueTotalSize === 0) return;
          const t2 = e._pendingPullIntos.peek();
          Wn(e, t2) && (je(e), Cr(e._controlledReadableByteStream, t2));
        }
      }
      n$1(Er, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
      function _i(e) {
        const t2 = e._controlledReadableByteStream._reader;
        for (; t2._readRequests.length > 0; ) {
          if (e._queueTotalSize === 0) return;
          const r2 = t2._readRequests.shift();
          In(e, r2);
        }
      }
      n$1(_i, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
      function Si(e, t2, r2, s) {
        const f2 = e._controlledReadableByteStream, c = t2.constructor, d = gi(c), { byteOffset: p, byteLength: R } = t2, y = r2 * d;
        let C;
        try {
          C = fe(t2.buffer);
        } catch (B) {
          s._errorSteps(B);
          return;
        }
        const P = { buffer: C, bufferByteLength: C.byteLength, byteOffset: p, byteLength: R, bytesFilled: 0, minimumFill: y, elementSize: d, viewConstructor: c, readerType: "byob" };
        if (e._pendingPullIntos.length > 0) {
          e._pendingPullIntos.push(P), Ln(f2, s);
          return;
        }
        if (f2._state === "closed") {
          const B = new c(P.buffer, P.byteOffset, 0);
          s._closeSteps(B);
          return;
        }
        if (e._queueTotalSize > 0) {
          if (Wn(e, P)) {
            const B = vn(P);
            qn(e), s._chunkSteps(B);
            return;
          }
          if (e._closeRequested) {
            const B = new TypeError("Insufficient bytes to fill elements in the given buffer");
            Z(e, B), s._errorSteps(B);
            return;
          }
        }
        e._pendingPullIntos.push(P), Ln(f2, s), Be(e);
      }
      n$1(Si, "ReadableByteStreamControllerPullInto");
      function wi(e, t2) {
        t2.readerType === "none" && je(e);
        const r2 = e._controlledReadableByteStream;
        if (Br(r2)) for (; Dn(r2) > 0; ) {
          const s = je(e);
          Cr(r2, s);
        }
      }
      n$1(wi, "ReadableByteStreamControllerRespondInClosedState");
      function Ri(e, t2, r2) {
        if (kn(e, t2, r2), r2.readerType === "none") {
          Bn(e, r2), Er(e);
          return;
        }
        if (r2.bytesFilled < r2.minimumFill) return;
        je(e);
        const s = r2.bytesFilled % r2.elementSize;
        if (s > 0) {
          const f2 = r2.byteOffset + r2.bytesFilled;
          An(e, r2.buffer, f2 - s, s);
        }
        r2.bytesFilled -= s, Cr(e._controlledReadableByteStream, r2), Er(e);
      }
      n$1(Ri, "ReadableByteStreamControllerRespondInReadableState");
      function On(e, t2) {
        const r2 = e._pendingPullIntos.peek();
        Pr(e), e._controlledReadableByteStream._state === "closed" ? wi(e, r2) : Ri(e, t2, r2), Be(e);
      }
      n$1(On, "ReadableByteStreamControllerRespondInternal");
      function je(e) {
        return e._pendingPullIntos.shift();
      }
      n$1(je, "ReadableByteStreamControllerShiftPendingPullInto");
      function Ti(e) {
        const t2 = e._controlledReadableByteStream;
        return t2._state !== "readable" || e._closeRequested || !e._started ? false : !!(mn(t2) && gt(t2) > 0 || Br(t2) && Dn(t2) > 0 || Fn(e) > 0);
      }
      n$1(Ti, "ReadableByteStreamControllerShouldCallPull");
      function Rt(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
      }
      n$1(Rt, "ReadableByteStreamControllerClearAlgorithms");
      function rt(e) {
        const t2 = e._controlledReadableByteStream;
        if (!(e._closeRequested || t2._state !== "readable")) {
          if (e._queueTotalSize > 0) {
            e._closeRequested = true;
            return;
          }
          if (e._pendingPullIntos.length > 0) {
            const r2 = e._pendingPullIntos.peek();
            if (r2.bytesFilled % r2.elementSize !== 0) {
              const s = new TypeError("Insufficient bytes to fill elements in the given buffer");
              throw Z(e, s), s;
            }
          }
          Rt(e), lt(t2);
        }
      }
      n$1(rt, "ReadableByteStreamControllerClose");
      function Tt(e, t2) {
        const r2 = e._controlledReadableByteStream;
        if (e._closeRequested || r2._state !== "readable") return;
        const { buffer: s, byteOffset: f2, byteLength: c } = t2;
        if (_e6(s)) throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        const d = fe(s);
        if (e._pendingPullIntos.length > 0) {
          const p = e._pendingPullIntos.peek();
          if (_e6(p.buffer)) throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          Pr(e), p.buffer = fe(p.buffer), p.readerType === "none" && Bn(e, p);
        }
        if (mn(r2)) if (_i(e), gt(r2) === 0) wt(e, d, f2, c);
        else {
          e._pendingPullIntos.length > 0 && je(e);
          const p = new Uint8Array(d, f2, c);
          pr(r2, p, false);
        }
        else Br(r2) ? (wt(e, d, f2, c), Er(e)) : wt(e, d, f2, c);
        Be(e);
      }
      n$1(Tt, "ReadableByteStreamControllerEnqueue");
      function Z(e, t2) {
        const r2 = e._controlledReadableByteStream;
        r2._state === "readable" && (En(e), Se(e), Rt(e), lo(r2, t2));
      }
      n$1(Z, "ReadableByteStreamControllerError");
      function In(e, t2) {
        const r2 = e._queue.shift();
        e._queueTotalSize -= r2.byteLength, qn(e);
        const s = new Uint8Array(r2.buffer, r2.byteOffset, r2.byteLength);
        t2._chunkSteps(s);
      }
      n$1(In, "ReadableByteStreamControllerFillReadRequestFromQueue");
      function vr(e) {
        if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
          const t2 = e._pendingPullIntos.peek(), r2 = new Uint8Array(t2.buffer, t2.byteOffset + t2.bytesFilled, t2.byteLength - t2.bytesFilled), s = Object.create(ve.prototype);
          Pi(s, e, r2), e._byobRequest = s;
        }
        return e._byobRequest;
      }
      n$1(vr, "ReadableByteStreamControllerGetBYOBRequest");
      function Fn(e) {
        const t2 = e._controlledReadableByteStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n$1(Fn, "ReadableByteStreamControllerGetDesiredSize");
      function Ct(e, t2) {
        const r2 = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t2 !== 0) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        } else {
          if (t2 === 0) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          if (r2.bytesFilled + t2 > r2.byteLength) throw new RangeError("bytesWritten out of range");
        }
        r2.buffer = fe(r2.buffer), On(e, t2);
      }
      n$1(Ct, "ReadableByteStreamControllerRespond");
      function Pt(e, t2) {
        const r2 = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t2.byteLength !== 0) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        } else if (t2.byteLength === 0) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        if (r2.byteOffset + r2.bytesFilled !== t2.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
        if (r2.bufferByteLength !== t2.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
        if (r2.bytesFilled + t2.byteLength > r2.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
        const f2 = t2.byteLength;
        r2.buffer = fe(t2.buffer), On(e, f2);
      }
      n$1(Pt, "ReadableByteStreamControllerRespondWithNewView");
      function zn(e, t2, r2, s, f2, c, d) {
        t2._controlledReadableByteStream = e, t2._pullAgain = false, t2._pulling = false, t2._byobRequest = null, t2._queue = t2._queueTotalSize = void 0, Se(t2), t2._closeRequested = false, t2._started = false, t2._strategyHWM = c, t2._pullAlgorithm = s, t2._cancelAlgorithm = f2, t2._autoAllocateChunkSize = d, t2._pendingPullIntos = new M(), e._readableStreamController = t2;
        const p = r2();
        g(T2(p), () => (t2._started = true, Be(t2), null), (R) => (Z(t2, R), null));
      }
      n$1(zn, "SetUpReadableByteStreamController");
      function Ci(e, t2, r2) {
        const s = Object.create(ce.prototype);
        let f2, c, d;
        t2.start !== void 0 ? f2 = n$1(() => t2.start(s), "startAlgorithm") : f2 = n$1(() => {
        }, "startAlgorithm"), t2.pull !== void 0 ? c = n$1(() => t2.pull(s), "pullAlgorithm") : c = n$1(() => T2(void 0), "pullAlgorithm"), t2.cancel !== void 0 ? d = n$1((R) => t2.cancel(R), "cancelAlgorithm") : d = n$1(() => T2(void 0), "cancelAlgorithm");
        const p = t2.autoAllocateChunkSize;
        if (p === 0) throw new TypeError("autoAllocateChunkSize must be greater than 0");
        zn(e, s, f2, c, d, r2, p);
      }
      n$1(Ci, "SetUpReadableByteStreamControllerFromUnderlyingSource");
      function Pi(e, t2, r2) {
        e._associatedReadableByteStreamController = t2, e._view = r2;
      }
      n$1(Pi, "SetUpReadableStreamBYOBRequest");
      function Ar(e) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
      }
      n$1(Ar, "byobRequestBrandCheckException");
      function nt(e) {
        return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
      }
      n$1(nt, "byteStreamControllerBrandCheckException");
      function Ei(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.mode;
        return { mode: r2 === void 0 ? void 0 : vi(r2, `${t2} has member 'mode' that`) };
      }
      n$1(Ei, "convertReaderOptions");
      function vi(e, t2) {
        if (e = `${e}`, e !== "byob") throw new TypeError(`${t2} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
        return e;
      }
      n$1(vi, "convertReadableStreamReaderMode");
      function Ai(e, t2) {
        var r2;
        ne(e, t2);
        const s = (r2 = e == null ? void 0 : e.min) !== null && r2 !== void 0 ? r2 : 1;
        return { min: mr(s, `${t2} has member 'min' that`) };
      }
      n$1(Ai, "convertByobReadOptions");
      function jn(e) {
        return new we(e);
      }
      n$1(jn, "AcquireReadableStreamBYOBReader");
      function Ln(e, t2) {
        e._reader._readIntoRequests.push(t2);
      }
      n$1(Ln, "ReadableStreamAddReadIntoRequest");
      function Bi(e, t2, r2) {
        const f2 = e._reader._readIntoRequests.shift();
        r2 ? f2._closeSteps(t2) : f2._chunkSteps(t2);
      }
      n$1(Bi, "ReadableStreamFulfillReadIntoRequest");
      function Dn(e) {
        return e._reader._readIntoRequests.length;
      }
      n$1(Dn, "ReadableStreamGetNumReadIntoRequests");
      function Br(e) {
        const t2 = e._reader;
        return !(t2 === void 0 || !We(t2));
      }
      n$1(Br, "ReadableStreamHasBYOBReader");
      const _we = class _we {
        constructor(t2) {
          if (le(t2, 1, "ReadableStreamBYOBReader"), br(t2, "First parameter"), Ce(t2)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          if (!Ae(t2._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          sn(this, t2), this._readIntoRequests = new M();
        }
        get closed() {
          return We(this) ? this._closedPromise : b(Et("closed"));
        }
        cancel(t2 = void 0) {
          return We(this) ? this._ownerReadableStream === void 0 ? b(yt("cancel")) : lr(this, t2) : b(Et("cancel"));
        }
        read(t2, r2 = {}) {
          if (!We(this)) return b(Et("read"));
          if (!ArrayBuffer.isView(t2)) return b(new TypeError("view must be an array buffer view"));
          if (t2.byteLength === 0) return b(new TypeError("view must have non-zero byteLength"));
          if (t2.buffer.byteLength === 0) return b(new TypeError("view's buffer must have non-zero byteLength"));
          if (_e6(t2.buffer)) return b(new TypeError("view's buffer has been detached"));
          let s;
          try {
            s = Ai(r2, "options");
          } catch (y) {
            return b(y);
          }
          const f2 = s.min;
          if (f2 === 0) return b(new TypeError("options.min must be greater than 0"));
          if (yi(t2)) {
            if (f2 > t2.byteLength) return b(new RangeError("options.min must be less than or equal to view's byteLength"));
          } else if (f2 > t2.length) return b(new RangeError("options.min must be less than or equal to view's length"));
          if (this._ownerReadableStream === void 0) return b(yt("read from"));
          let c, d;
          const p = A((y, C) => {
            c = y, d = C;
          });
          return $n(this, t2, f2, { _chunkSteps: n$1((y) => c({ value: y, done: false }), "_chunkSteps"), _closeSteps: n$1((y) => c({ value: y, done: true }), "_closeSteps"), _errorSteps: n$1((y) => d(y), "_errorSteps") }), p;
        }
        releaseLock() {
          if (!We(this)) throw Et("releaseLock");
          this._ownerReadableStream !== void 0 && Wi(this);
        }
      };
      n$1(_we, "ReadableStreamBYOBReader");
      let we = _we;
      Object.defineProperties(we.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h2(we.prototype.cancel, "cancel"), h2(we.prototype.read, "read"), h2(we.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(we.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
      function We(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? false : e instanceof we;
      }
      n$1(We, "IsReadableStreamBYOBReader");
      function $n(e, t2, r2, s) {
        const f2 = e._ownerReadableStream;
        f2._disturbed = true, f2._state === "errored" ? s._errorSteps(f2._storedError) : Si(f2._readableStreamController, t2, r2, s);
      }
      n$1($n, "ReadableStreamBYOBReaderRead");
      function Wi(e) {
        ue(e);
        const t2 = new TypeError("Reader was released");
        Mn(e, t2);
      }
      n$1(Wi, "ReadableStreamBYOBReaderRelease");
      function Mn(e, t2) {
        const r2 = e._readIntoRequests;
        e._readIntoRequests = new M(), r2.forEach((s) => {
          s._errorSteps(t2);
        });
      }
      n$1(Mn, "ReadableStreamBYOBReaderErrorReadIntoRequests");
      function Et(e) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
      }
      n$1(Et, "byobReaderBrandCheckException");
      function ot(e, t2) {
        const { highWaterMark: r2 } = e;
        if (r2 === void 0) return t2;
        if (Sn(r2) || r2 < 0) throw new RangeError("Invalid highWaterMark");
        return r2;
      }
      n$1(ot, "ExtractHighWaterMark");
      function vt(e) {
        const { size: t2 } = e;
        return t2 || (() => 1);
      }
      n$1(vt, "ExtractSizeAlgorithm");
      function At(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.highWaterMark, s = e == null ? void 0 : e.size;
        return { highWaterMark: r2 === void 0 ? void 0 : hr(r2), size: s === void 0 ? void 0 : ki(s, `${t2} has member 'size' that`) };
      }
      n$1(At, "convertQueuingStrategy");
      function ki(e, t2) {
        return G(e, t2), (r2) => hr(e(r2));
      }
      n$1(ki, "convertQueuingStrategySize");
      function qi(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.abort, s = e == null ? void 0 : e.close, f2 = e == null ? void 0 : e.start, c = e == null ? void 0 : e.type, d = e == null ? void 0 : e.write;
        return { abort: r2 === void 0 ? void 0 : Oi(r2, e, `${t2} has member 'abort' that`), close: s === void 0 ? void 0 : Ii(s, e, `${t2} has member 'close' that`), start: f2 === void 0 ? void 0 : Fi(f2, e, `${t2} has member 'start' that`), write: d === void 0 ? void 0 : zi(d, e, `${t2} has member 'write' that`), type: c };
      }
      n$1(qi, "convertUnderlyingSink");
      function Oi(e, t2, r2) {
        return G(e, r2), (s) => z(e, t2, [s]);
      }
      n$1(Oi, "convertUnderlyingSinkAbortCallback");
      function Ii(e, t2, r2) {
        return G(e, r2), () => z(e, t2, []);
      }
      n$1(Ii, "convertUnderlyingSinkCloseCallback");
      function Fi(e, t2, r2) {
        return G(e, r2), (s) => O(e, t2, [s]);
      }
      n$1(Fi, "convertUnderlyingSinkStartCallback");
      function zi(e, t2, r2) {
        return G(e, r2), (s, f2) => z(e, t2, [s, f2]);
      }
      n$1(zi, "convertUnderlyingSinkWriteCallback");
      function Un(e, t2) {
        if (!Le(e)) throw new TypeError(`${t2} is not a WritableStream.`);
      }
      n$1(Un, "assertWritableStream");
      function ji(e) {
        if (typeof e != "object" || e === null) return false;
        try {
          return typeof e.aborted == "boolean";
        } catch {
          return false;
        }
      }
      n$1(ji, "isAbortSignal");
      const Li = typeof AbortController == "function";
      function Di() {
        if (Li) return new AbortController();
      }
      n$1(Di, "createAbortController");
      const _Re = class _Re {
        constructor(t2 = {}, r2 = {}) {
          t2 === void 0 ? t2 = null : cn(t2, "First parameter");
          const s = At(r2, "Second parameter"), f2 = qi(t2, "First parameter");
          if (Nn(this), f2.type !== void 0) throw new RangeError("Invalid type is specified");
          const d = vt(s), p = ot(s, 1);
          Xi(this, f2, p, d);
        }
        get locked() {
          if (!Le(this)) throw Ot("locked");
          return De(this);
        }
        abort(t2 = void 0) {
          return Le(this) ? De(this) ? b(new TypeError("Cannot abort a stream that already has a writer")) : Bt(this, t2) : b(Ot("abort"));
        }
        close() {
          return Le(this) ? De(this) ? b(new TypeError("Cannot close a stream that already has a writer")) : oe(this) ? b(new TypeError("Cannot close an already-closing stream")) : Hn(this) : b(Ot("close"));
        }
        getWriter() {
          if (!Le(this)) throw Ot("getWriter");
          return xn(this);
        }
      };
      n$1(_Re, "WritableStream");
      let Re = _Re;
      Object.defineProperties(Re.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), h2(Re.prototype.abort, "abort"), h2(Re.prototype.close, "close"), h2(Re.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, { value: "WritableStream", configurable: true });
      function xn(e) {
        return new de(e);
      }
      n$1(xn, "AcquireWritableStreamDefaultWriter");
      function $i(e, t2, r2, s, f2 = 1, c = () => 1) {
        const d = Object.create(Re.prototype);
        Nn(d);
        const p = Object.create($e.prototype);
        return Kn(d, p, e, t2, r2, s, f2, c), d;
      }
      n$1($i, "CreateWritableStream");
      function Nn(e) {
        e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new M(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = false;
      }
      n$1(Nn, "InitializeWritableStream");
      function Le(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? false : e instanceof Re;
      }
      n$1(Le, "IsWritableStream");
      function De(e) {
        return e._writer !== void 0;
      }
      n$1(De, "IsWritableStreamLocked");
      function Bt(e, t2) {
        var r2;
        if (e._state === "closed" || e._state === "errored") return T2(void 0);
        e._writableStreamController._abortReason = t2, (r2 = e._writableStreamController._abortController) === null || r2 === void 0 || r2.abort(t2);
        const s = e._state;
        if (s === "closed" || s === "errored") return T2(void 0);
        if (e._pendingAbortRequest !== void 0) return e._pendingAbortRequest._promise;
        let f2 = false;
        s === "erroring" && (f2 = true, t2 = void 0);
        const c = A((d, p) => {
          e._pendingAbortRequest = { _promise: void 0, _resolve: d, _reject: p, _reason: t2, _wasAlreadyErroring: f2 };
        });
        return e._pendingAbortRequest._promise = c, f2 || kr(e, t2), c;
      }
      n$1(Bt, "WritableStreamAbort");
      function Hn(e) {
        const t2 = e._state;
        if (t2 === "closed" || t2 === "errored") return b(new TypeError(`The stream (in ${t2} state) is not in the writable state and cannot be closed`));
        const r2 = A((f2, c) => {
          const d = { _resolve: f2, _reject: c };
          e._closeRequest = d;
        }), s = e._writer;
        return s !== void 0 && e._backpressure && t2 === "writable" && Dr(s), ea(e._writableStreamController), r2;
      }
      n$1(Hn, "WritableStreamClose");
      function Mi(e) {
        return A((r2, s) => {
          const f2 = { _resolve: r2, _reject: s };
          e._writeRequests.push(f2);
        });
      }
      n$1(Mi, "WritableStreamAddWriteRequest");
      function Wr(e, t2) {
        if (e._state === "writable") {
          kr(e, t2);
          return;
        }
        qr(e);
      }
      n$1(Wr, "WritableStreamDealWithRejection");
      function kr(e, t2) {
        const r2 = e._writableStreamController;
        e._state = "erroring", e._storedError = t2;
        const s = e._writer;
        s !== void 0 && Qn(s, t2), !Vi(e) && r2._started && qr(e);
      }
      n$1(kr, "WritableStreamStartErroring");
      function qr(e) {
        e._state = "errored", e._writableStreamController[an]();
        const t2 = e._storedError;
        if (e._writeRequests.forEach((f2) => {
          f2._reject(t2);
        }), e._writeRequests = new M(), e._pendingAbortRequest === void 0) {
          Wt(e);
          return;
        }
        const r2 = e._pendingAbortRequest;
        if (e._pendingAbortRequest = void 0, r2._wasAlreadyErroring) {
          r2._reject(t2), Wt(e);
          return;
        }
        const s = e._writableStreamController[pt](r2._reason);
        g(s, () => (r2._resolve(), Wt(e), null), (f2) => (r2._reject(f2), Wt(e), null));
      }
      n$1(qr, "WritableStreamFinishErroring");
      function Ui(e) {
        e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
      }
      n$1(Ui, "WritableStreamFinishInFlightWrite");
      function xi(e, t2) {
        e._inFlightWriteRequest._reject(t2), e._inFlightWriteRequest = void 0, Wr(e, t2);
      }
      n$1(xi, "WritableStreamFinishInFlightWriteWithError");
      function Ni(e) {
        e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
        const r2 = e._writer;
        r2 !== void 0 && to(r2);
      }
      n$1(Ni, "WritableStreamFinishInFlightClose");
      function Hi(e, t2) {
        e._inFlightCloseRequest._reject(t2), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t2), e._pendingAbortRequest = void 0), Wr(e, t2);
      }
      n$1(Hi, "WritableStreamFinishInFlightCloseWithError");
      function oe(e) {
        return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n$1(oe, "WritableStreamCloseQueuedOrInFlight");
      function Vi(e) {
        return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n$1(Vi, "WritableStreamHasOperationMarkedInFlight");
      function Qi(e) {
        e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
      }
      n$1(Qi, "WritableStreamMarkCloseRequestInFlight");
      function Yi(e) {
        e._inFlightWriteRequest = e._writeRequests.shift();
      }
      n$1(Yi, "WritableStreamMarkFirstWriteRequestInFlight");
      function Wt(e) {
        e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
        const t2 = e._writer;
        t2 !== void 0 && jr(t2, e._storedError);
      }
      n$1(Wt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
      function Or(e, t2) {
        const r2 = e._writer;
        r2 !== void 0 && t2 !== e._backpressure && (t2 ? sa(r2) : Dr(r2)), e._backpressure = t2;
      }
      n$1(Or, "WritableStreamUpdateBackpressure");
      const _de = class _de {
        constructor(t2) {
          if (le(t2, 1, "WritableStreamDefaultWriter"), Un(t2, "First parameter"), De(t2)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          this._ownerWritableStream = t2, t2._writer = this;
          const r2 = t2._state;
          if (r2 === "writable") !oe(t2) && t2._backpressure ? Ft(this) : ro(this), It(this);
          else if (r2 === "erroring") Lr(this, t2._storedError), It(this);
          else if (r2 === "closed") ro(this), ia(this);
          else {
            const s = t2._storedError;
            Lr(this, s), eo(this, s);
          }
        }
        get closed() {
          return ke(this) ? this._closedPromise : b(qe("closed"));
        }
        get desiredSize() {
          if (!ke(this)) throw qe("desiredSize");
          if (this._ownerWritableStream === void 0) throw at("desiredSize");
          return Ji(this);
        }
        get ready() {
          return ke(this) ? this._readyPromise : b(qe("ready"));
        }
        abort(t2 = void 0) {
          return ke(this) ? this._ownerWritableStream === void 0 ? b(at("abort")) : Gi(this, t2) : b(qe("abort"));
        }
        close() {
          if (!ke(this)) return b(qe("close"));
          const t2 = this._ownerWritableStream;
          return t2 === void 0 ? b(at("close")) : oe(t2) ? b(new TypeError("Cannot close an already-closing stream")) : Vn(this);
        }
        releaseLock() {
          if (!ke(this)) throw qe("releaseLock");
          this._ownerWritableStream !== void 0 && Yn(this);
        }
        write(t2 = void 0) {
          return ke(this) ? this._ownerWritableStream === void 0 ? b(at("write to")) : Gn(this, t2) : b(qe("write"));
        }
      };
      n$1(_de, "WritableStreamDefaultWriter");
      let de = _de;
      Object.defineProperties(de.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), h2(de.prototype.abort, "abort"), h2(de.prototype.close, "close"), h2(de.prototype.releaseLock, "releaseLock"), h2(de.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
      function ke(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? false : e instanceof de;
      }
      n$1(ke, "IsWritableStreamDefaultWriter");
      function Gi(e, t2) {
        const r2 = e._ownerWritableStream;
        return Bt(r2, t2);
      }
      n$1(Gi, "WritableStreamDefaultWriterAbort");
      function Vn(e) {
        const t2 = e._ownerWritableStream;
        return Hn(t2);
      }
      n$1(Vn, "WritableStreamDefaultWriterClose");
      function Zi(e) {
        const t2 = e._ownerWritableStream, r2 = t2._state;
        return oe(t2) || r2 === "closed" ? T2(void 0) : r2 === "errored" ? b(t2._storedError) : Vn(e);
      }
      n$1(Zi, "WritableStreamDefaultWriterCloseWithErrorPropagation");
      function Ki(e, t2) {
        e._closedPromiseState === "pending" ? jr(e, t2) : aa(e, t2);
      }
      n$1(Ki, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
      function Qn(e, t2) {
        e._readyPromiseState === "pending" ? no(e, t2) : ua(e, t2);
      }
      n$1(Qn, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
      function Ji(e) {
        const t2 = e._ownerWritableStream, r2 = t2._state;
        return r2 === "errored" || r2 === "erroring" ? null : r2 === "closed" ? 0 : Jn(t2._writableStreamController);
      }
      n$1(Ji, "WritableStreamDefaultWriterGetDesiredSize");
      function Yn(e) {
        const t2 = e._ownerWritableStream, r2 = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        Qn(e, r2), Ki(e, r2), t2._writer = void 0, e._ownerWritableStream = void 0;
      }
      n$1(Yn, "WritableStreamDefaultWriterRelease");
      function Gn(e, t2) {
        const r2 = e._ownerWritableStream, s = r2._writableStreamController, f2 = ta(s, t2);
        if (r2 !== e._ownerWritableStream) return b(at("write to"));
        const c = r2._state;
        if (c === "errored") return b(r2._storedError);
        if (oe(r2) || c === "closed") return b(new TypeError("The stream is closing or closed and cannot be written to"));
        if (c === "erroring") return b(r2._storedError);
        const d = Mi(r2);
        return ra(s, t2, f2), d;
      }
      n$1(Gn, "WritableStreamDefaultWriterWrite");
      const Zn = {};
      const _$e = class _$e {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!Ir(this)) throw zr("abortReason");
          return this._abortReason;
        }
        get signal() {
          if (!Ir(this)) throw zr("signal");
          if (this._abortController === void 0) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          return this._abortController.signal;
        }
        error(t2 = void 0) {
          if (!Ir(this)) throw zr("error");
          this._controlledWritableStream._state === "writable" && Xn(this, t2);
        }
        [pt](t2) {
          const r2 = this._abortAlgorithm(t2);
          return kt(this), r2;
        }
        [an]() {
          Se(this);
        }
      };
      n$1(_$e, "WritableStreamDefaultController");
      let $e = _$e;
      Object.defineProperties($e.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty($e.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
      function Ir(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? false : e instanceof $e;
      }
      n$1(Ir, "IsWritableStreamDefaultController");
      function Kn(e, t2, r2, s, f2, c, d, p) {
        t2._controlledWritableStream = e, e._writableStreamController = t2, t2._queue = void 0, t2._queueTotalSize = void 0, Se(t2), t2._abortReason = void 0, t2._abortController = Di(), t2._started = false, t2._strategySizeAlgorithm = p, t2._strategyHWM = d, t2._writeAlgorithm = s, t2._closeAlgorithm = f2, t2._abortAlgorithm = c;
        const R = Fr(t2);
        Or(e, R);
        const y = r2(), C = T2(y);
        g(C, () => (t2._started = true, qt(t2), null), (P) => (t2._started = true, Wr(e, P), null));
      }
      n$1(Kn, "SetUpWritableStreamDefaultController");
      function Xi(e, t2, r2, s) {
        const f2 = Object.create($e.prototype);
        let c, d, p, R;
        t2.start !== void 0 ? c = n$1(() => t2.start(f2), "startAlgorithm") : c = n$1(() => {
        }, "startAlgorithm"), t2.write !== void 0 ? d = n$1((y) => t2.write(y, f2), "writeAlgorithm") : d = n$1(() => T2(void 0), "writeAlgorithm"), t2.close !== void 0 ? p = n$1(() => t2.close(), "closeAlgorithm") : p = n$1(() => T2(void 0), "closeAlgorithm"), t2.abort !== void 0 ? R = n$1((y) => t2.abort(y), "abortAlgorithm") : R = n$1(() => T2(void 0), "abortAlgorithm"), Kn(e, f2, c, d, p, R, r2, s);
      }
      n$1(Xi, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
      function kt(e) {
        e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n$1(kt, "WritableStreamDefaultControllerClearAlgorithms");
      function ea(e) {
        Rr(e, Zn, 0), qt(e);
      }
      n$1(ea, "WritableStreamDefaultControllerClose");
      function ta(e, t2) {
        try {
          return e._strategySizeAlgorithm(t2);
        } catch (r2) {
          return it(e, r2), 1;
        }
      }
      n$1(ta, "WritableStreamDefaultControllerGetChunkSize");
      function Jn(e) {
        return e._strategyHWM - e._queueTotalSize;
      }
      n$1(Jn, "WritableStreamDefaultControllerGetDesiredSize");
      function ra(e, t2, r2) {
        try {
          Rr(e, t2, r2);
        } catch (f2) {
          it(e, f2);
          return;
        }
        const s = e._controlledWritableStream;
        if (!oe(s) && s._state === "writable") {
          const f2 = Fr(e);
          Or(s, f2);
        }
        qt(e);
      }
      n$1(ra, "WritableStreamDefaultControllerWrite");
      function qt(e) {
        const t2 = e._controlledWritableStream;
        if (!e._started || t2._inFlightWriteRequest !== void 0) return;
        if (t2._state === "erroring") {
          qr(t2);
          return;
        }
        if (e._queue.length === 0) return;
        const s = pi(e);
        s === Zn ? na(e) : oa(e, s);
      }
      n$1(qt, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
      function it(e, t2) {
        e._controlledWritableStream._state === "writable" && Xn(e, t2);
      }
      n$1(it, "WritableStreamDefaultControllerErrorIfNeeded");
      function na(e) {
        const t2 = e._controlledWritableStream;
        Qi(t2), wr(e);
        const r2 = e._closeAlgorithm();
        kt(e), g(r2, () => (Ni(t2), null), (s) => (Hi(t2, s), null));
      }
      n$1(na, "WritableStreamDefaultControllerProcessClose");
      function oa(e, t2) {
        const r2 = e._controlledWritableStream;
        Yi(r2);
        const s = e._writeAlgorithm(t2);
        g(s, () => {
          Ui(r2);
          const f2 = r2._state;
          if (wr(e), !oe(r2) && f2 === "writable") {
            const c = Fr(e);
            Or(r2, c);
          }
          return qt(e), null;
        }, (f2) => (r2._state === "writable" && kt(e), xi(r2, f2), null));
      }
      n$1(oa, "WritableStreamDefaultControllerProcessWrite");
      function Fr(e) {
        return Jn(e) <= 0;
      }
      n$1(Fr, "WritableStreamDefaultControllerGetBackpressure");
      function Xn(e, t2) {
        const r2 = e._controlledWritableStream;
        kt(e), kr(r2, t2);
      }
      n$1(Xn, "WritableStreamDefaultControllerError");
      function Ot(e) {
        return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
      }
      n$1(Ot, "streamBrandCheckException$2");
      function zr(e) {
        return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
      }
      n$1(zr, "defaultControllerBrandCheckException$2");
      function qe(e) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
      }
      n$1(qe, "defaultWriterBrandCheckException");
      function at(e) {
        return new TypeError("Cannot " + e + " a stream using a released writer");
      }
      n$1(at, "defaultWriterLockException");
      function It(e) {
        e._closedPromise = A((t2, r2) => {
          e._closedPromise_resolve = t2, e._closedPromise_reject = r2, e._closedPromiseState = "pending";
        });
      }
      n$1(It, "defaultWriterClosedPromiseInitialize");
      function eo(e, t2) {
        It(e), jr(e, t2);
      }
      n$1(eo, "defaultWriterClosedPromiseInitializeAsRejected");
      function ia(e) {
        It(e), to(e);
      }
      n$1(ia, "defaultWriterClosedPromiseInitializeAsResolved");
      function jr(e, t2) {
        e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t2), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
      }
      n$1(jr, "defaultWriterClosedPromiseReject");
      function aa(e, t2) {
        eo(e, t2);
      }
      n$1(aa, "defaultWriterClosedPromiseResetToRejected");
      function to(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
      }
      n$1(to, "defaultWriterClosedPromiseResolve");
      function Ft(e) {
        e._readyPromise = A((t2, r2) => {
          e._readyPromise_resolve = t2, e._readyPromise_reject = r2;
        }), e._readyPromiseState = "pending";
      }
      n$1(Ft, "defaultWriterReadyPromiseInitialize");
      function Lr(e, t2) {
        Ft(e), no(e, t2);
      }
      n$1(Lr, "defaultWriterReadyPromiseInitializeAsRejected");
      function ro(e) {
        Ft(e), Dr(e);
      }
      n$1(ro, "defaultWriterReadyPromiseInitializeAsResolved");
      function no(e, t2) {
        e._readyPromise_reject !== void 0 && (Q(e._readyPromise), e._readyPromise_reject(t2), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
      }
      n$1(no, "defaultWriterReadyPromiseReject");
      function sa(e) {
        Ft(e);
      }
      n$1(sa, "defaultWriterReadyPromiseReset");
      function ua(e, t2) {
        Lr(e, t2);
      }
      n$1(ua, "defaultWriterReadyPromiseResetToRejected");
      function Dr(e) {
        e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
      }
      n$1(Dr, "defaultWriterReadyPromiseResolve");
      function la() {
        if (typeof globalThis < "u") return globalThis;
        if (typeof self < "u") return self;
        if (typeof n$2 < "u") return n$2;
      }
      n$1(la, "getGlobals");
      const $r = la();
      function fa(e) {
        if (!(typeof e == "function" || typeof e == "object") || e.name !== "DOMException") return false;
        try {
          return new e(), true;
        } catch {
          return false;
        }
      }
      n$1(fa, "isDOMExceptionConstructor");
      function ca() {
        const e = $r == null ? void 0 : $r.DOMException;
        return fa(e) ? e : void 0;
      }
      n$1(ca, "getFromGlobal");
      function da() {
        const e = n$1(function(r2, s) {
          this.message = r2 || "", this.name = s || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
        }, "DOMException");
        return h2(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", { value: e, writable: true, configurable: true }), e;
      }
      n$1(da, "createPolyfill");
      const ha = ca() || da();
      function oo(e, t2, r2, s, f2, c) {
        const d = ze(e), p = xn(t2);
        e._disturbed = true;
        let R = false, y = T2(void 0);
        return A((C, P) => {
          let B;
          if (c !== void 0) {
            if (B = n$1(() => {
              const _ = c.reason !== void 0 ? c.reason : new ha("Aborted", "AbortError"), v = [];
              s || v.push(() => t2._state === "writable" ? Bt(t2, _) : T2(void 0)), f2 || v.push(() => e._state === "readable" ? X(e, _) : T2(void 0)), x(() => Promise.all(v.map((W) => W())), true, _);
            }, "abortAlgorithm"), c.aborted) {
              B();
              return;
            }
            c.addEventListener("abort", B);
          }
          function ee() {
            return A((_, v) => {
              function W(Y) {
                Y ? _() : q(Ne(), W, v);
              }
              n$1(W, "next"), W(false);
            });
          }
          n$1(ee, "pipeLoop");
          function Ne() {
            return R ? T2(true) : q(p._readyPromise, () => A((_, v) => {
              et(d, { _chunkSteps: n$1((W) => {
                y = q(Gn(p, W), void 0, l), _(false);
              }, "_chunkSteps"), _closeSteps: n$1(() => _(true), "_closeSteps"), _errorSteps: v });
            }));
          }
          if (n$1(Ne, "pipeStep"), me(e, d._closedPromise, (_) => (s ? K(true, _) : x(() => Bt(t2, _), true, _), null)), me(t2, p._closedPromise, (_) => (f2 ? K(true, _) : x(() => X(e, _), true, _), null)), U(e, d._closedPromise, () => (r2 ? K() : x(() => Zi(p)), null)), oe(t2) || t2._state === "closed") {
            const _ = new TypeError("the destination writable stream closed before all data could be piped to it");
            f2 ? K(true, _) : x(() => X(e, _), true, _);
          }
          Q(ee());
          function Ee() {
            const _ = y;
            return q(y, () => _ !== y ? Ee() : void 0);
          }
          n$1(Ee, "waitForWritesToFinish");
          function me(_, v, W) {
            _._state === "errored" ? W(_._storedError) : I(v, W);
          }
          n$1(me, "isOrBecomesErrored");
          function U(_, v, W) {
            _._state === "closed" ? W() : V(v, W);
          }
          n$1(U, "isOrBecomesClosed");
          function x(_, v, W) {
            if (R) return;
            R = true, t2._state === "writable" && !oe(t2) ? V(Ee(), Y) : Y();
            function Y() {
              return g(_(), () => be(v, W), (He) => be(true, He)), null;
            }
            n$1(Y, "doTheRest");
          }
          n$1(x, "shutdownWithAction");
          function K(_, v) {
            R || (R = true, t2._state === "writable" && !oe(t2) ? V(Ee(), () => be(_, v)) : be(_, v));
          }
          n$1(K, "shutdown");
          function be(_, v) {
            return Yn(p), ue(d), c !== void 0 && c.removeEventListener("abort", B), _ ? P(v) : C(void 0), null;
          }
          n$1(be, "finalize");
        });
      }
      n$1(oo, "ReadableStreamPipeTo");
      const _he = class _he {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!zt(this)) throw Lt("desiredSize");
          return Mr(this);
        }
        close() {
          if (!zt(this)) throw Lt("close");
          if (!Ue(this)) throw new TypeError("The stream is not in a state that permits close");
          Oe(this);
        }
        enqueue(t2 = void 0) {
          if (!zt(this)) throw Lt("enqueue");
          if (!Ue(this)) throw new TypeError("The stream is not in a state that permits enqueue");
          return Me(this, t2);
        }
        error(t2 = void 0) {
          if (!zt(this)) throw Lt("error");
          J(this, t2);
        }
        [ar](t2) {
          Se(this);
          const r2 = this._cancelAlgorithm(t2);
          return jt(this), r2;
        }
        [sr](t2) {
          const r2 = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const s = wr(this);
            this._closeRequested && this._queue.length === 0 ? (jt(this), lt(r2)) : st(this), t2._chunkSteps(s);
          } else hn(r2, t2), st(this);
        }
        [ur]() {
        }
      };
      n$1(_he, "ReadableStreamDefaultController");
      let he = _he;
      Object.defineProperties(he.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), h2(he.prototype.close, "close"), h2(he.prototype.enqueue, "enqueue"), h2(he.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(he.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
      function zt(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? false : e instanceof he;
      }
      n$1(zt, "IsReadableStreamDefaultController");
      function st(e) {
        if (!io(e)) return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r2 = e._pullAlgorithm();
        g(r2, () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, st(e)), null), (s) => (J(e, s), null));
      }
      n$1(st, "ReadableStreamDefaultControllerCallPullIfNeeded");
      function io(e) {
        const t2 = e._controlledReadableStream;
        return !Ue(e) || !e._started ? false : !!(Ce(t2) && gt(t2) > 0 || Mr(e) > 0);
      }
      n$1(io, "ReadableStreamDefaultControllerShouldCallPull");
      function jt(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n$1(jt, "ReadableStreamDefaultControllerClearAlgorithms");
      function Oe(e) {
        if (!Ue(e)) return;
        const t2 = e._controlledReadableStream;
        e._closeRequested = true, e._queue.length === 0 && (jt(e), lt(t2));
      }
      n$1(Oe, "ReadableStreamDefaultControllerClose");
      function Me(e, t2) {
        if (!Ue(e)) return;
        const r2 = e._controlledReadableStream;
        if (Ce(r2) && gt(r2) > 0) pr(r2, t2, false);
        else {
          let s;
          try {
            s = e._strategySizeAlgorithm(t2);
          } catch (f2) {
            throw J(e, f2), f2;
          }
          try {
            Rr(e, t2, s);
          } catch (f2) {
            throw J(e, f2), f2;
          }
        }
        st(e);
      }
      n$1(Me, "ReadableStreamDefaultControllerEnqueue");
      function J(e, t2) {
        const r2 = e._controlledReadableStream;
        r2._state === "readable" && (Se(e), jt(e), lo(r2, t2));
      }
      n$1(J, "ReadableStreamDefaultControllerError");
      function Mr(e) {
        const t2 = e._controlledReadableStream._state;
        return t2 === "errored" ? null : t2 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n$1(Mr, "ReadableStreamDefaultControllerGetDesiredSize");
      function ma(e) {
        return !io(e);
      }
      n$1(ma, "ReadableStreamDefaultControllerHasBackpressure");
      function Ue(e) {
        const t2 = e._controlledReadableStream._state;
        return !e._closeRequested && t2 === "readable";
      }
      n$1(Ue, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
      function ao(e, t2, r2, s, f2, c, d) {
        t2._controlledReadableStream = e, t2._queue = void 0, t2._queueTotalSize = void 0, Se(t2), t2._started = false, t2._closeRequested = false, t2._pullAgain = false, t2._pulling = false, t2._strategySizeAlgorithm = d, t2._strategyHWM = c, t2._pullAlgorithm = s, t2._cancelAlgorithm = f2, e._readableStreamController = t2;
        const p = r2();
        g(T2(p), () => (t2._started = true, st(t2), null), (R) => (J(t2, R), null));
      }
      n$1(ao, "SetUpReadableStreamDefaultController");
      function ba(e, t2, r2, s) {
        const f2 = Object.create(he.prototype);
        let c, d, p;
        t2.start !== void 0 ? c = n$1(() => t2.start(f2), "startAlgorithm") : c = n$1(() => {
        }, "startAlgorithm"), t2.pull !== void 0 ? d = n$1(() => t2.pull(f2), "pullAlgorithm") : d = n$1(() => T2(void 0), "pullAlgorithm"), t2.cancel !== void 0 ? p = n$1((R) => t2.cancel(R), "cancelAlgorithm") : p = n$1(() => T2(void 0), "cancelAlgorithm"), ao(e, f2, c, d, p, r2, s);
      }
      n$1(ba, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
      function Lt(e) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
      }
      n$1(Lt, "defaultControllerBrandCheckException$1");
      function pa(e, t2) {
        return Ae(e._readableStreamController) ? ga(e) : ya(e);
      }
      n$1(pa, "ReadableStreamTee");
      function ya(e, t2) {
        const r2 = ze(e);
        let s = false, f2 = false, c = false, d = false, p, R, y, C, P;
        const B = A((U) => {
          P = U;
        });
        function ee() {
          return s ? (f2 = true, T2(void 0)) : (s = true, et(r2, { _chunkSteps: n$1((x) => {
            se(() => {
              f2 = false;
              const K = x, be = x;
              c || Me(y._readableStreamController, K), d || Me(C._readableStreamController, be), s = false, f2 && ee();
            });
          }, "_chunkSteps"), _closeSteps: n$1(() => {
            s = false, c || Oe(y._readableStreamController), d || Oe(C._readableStreamController), (!c || !d) && P(void 0);
          }, "_closeSteps"), _errorSteps: n$1(() => {
            s = false;
          }, "_errorSteps") }), T2(void 0));
        }
        n$1(ee, "pullAlgorithm");
        function Ne(U) {
          if (c = true, p = U, d) {
            const x = tt([p, R]), K = X(e, x);
            P(K);
          }
          return B;
        }
        n$1(Ne, "cancel1Algorithm");
        function Ee(U) {
          if (d = true, R = U, c) {
            const x = tt([p, R]), K = X(e, x);
            P(K);
          }
          return B;
        }
        n$1(Ee, "cancel2Algorithm");
        function me() {
        }
        return n$1(me, "startAlgorithm"), y = ut(me, ee, Ne), C = ut(me, ee, Ee), I(r2._closedPromise, (U) => (J(y._readableStreamController, U), J(C._readableStreamController, U), (!c || !d) && P(void 0), null)), [y, C];
      }
      n$1(ya, "ReadableStreamDefaultTee");
      function ga(e) {
        let t2 = ze(e), r2 = false, s = false, f2 = false, c = false, d = false, p, R, y, C, P;
        const B = A((_) => {
          P = _;
        });
        function ee(_) {
          I(_._closedPromise, (v) => (_ !== t2 || (Z(y._readableStreamController, v), Z(C._readableStreamController, v), (!c || !d) && P(void 0)), null));
        }
        n$1(ee, "forwardReaderError");
        function Ne() {
          We(t2) && (ue(t2), t2 = ze(e), ee(t2)), et(t2, { _chunkSteps: n$1((v) => {
            se(() => {
              s = false, f2 = false;
              const W = v;
              let Y = v;
              if (!c && !d) try {
                Y = Cn(v);
              } catch (He) {
                Z(y._readableStreamController, He), Z(C._readableStreamController, He), P(X(e, He));
                return;
              }
              c || Tt(y._readableStreamController, W), d || Tt(C._readableStreamController, Y), r2 = false, s ? me() : f2 && U();
            });
          }, "_chunkSteps"), _closeSteps: n$1(() => {
            r2 = false, c || rt(y._readableStreamController), d || rt(C._readableStreamController), y._readableStreamController._pendingPullIntos.length > 0 && Ct(y._readableStreamController, 0), C._readableStreamController._pendingPullIntos.length > 0 && Ct(C._readableStreamController, 0), (!c || !d) && P(void 0);
          }, "_closeSteps"), _errorSteps: n$1(() => {
            r2 = false;
          }, "_errorSteps") });
        }
        n$1(Ne, "pullWithDefaultReader");
        function Ee(_, v) {
          ge(t2) && (ue(t2), t2 = jn(e), ee(t2));
          const W = v ? C : y, Y = v ? y : C;
          $n(t2, _, 1, { _chunkSteps: n$1((Ve) => {
            se(() => {
              s = false, f2 = false;
              const Qe = v ? d : c;
              if (v ? c : d) Qe || Pt(W._readableStreamController, Ve);
              else {
                let To;
                try {
                  To = Cn(Ve);
                } catch (Vr) {
                  Z(W._readableStreamController, Vr), Z(Y._readableStreamController, Vr), P(X(e, Vr));
                  return;
                }
                Qe || Pt(W._readableStreamController, Ve), Tt(Y._readableStreamController, To);
              }
              r2 = false, s ? me() : f2 && U();
            });
          }, "_chunkSteps"), _closeSteps: n$1((Ve) => {
            r2 = false;
            const Qe = v ? d : c, Vt = v ? c : d;
            Qe || rt(W._readableStreamController), Vt || rt(Y._readableStreamController), Ve !== void 0 && (Qe || Pt(W._readableStreamController, Ve), !Vt && Y._readableStreamController._pendingPullIntos.length > 0 && Ct(Y._readableStreamController, 0)), (!Qe || !Vt) && P(void 0);
          }, "_closeSteps"), _errorSteps: n$1(() => {
            r2 = false;
          }, "_errorSteps") });
        }
        n$1(Ee, "pullWithBYOBReader");
        function me() {
          if (r2) return s = true, T2(void 0);
          r2 = true;
          const _ = vr(y._readableStreamController);
          return _ === null ? Ne() : Ee(_._view, false), T2(void 0);
        }
        n$1(me, "pull1Algorithm");
        function U() {
          if (r2) return f2 = true, T2(void 0);
          r2 = true;
          const _ = vr(C._readableStreamController);
          return _ === null ? Ne() : Ee(_._view, true), T2(void 0);
        }
        n$1(U, "pull2Algorithm");
        function x(_) {
          if (c = true, p = _, d) {
            const v = tt([p, R]), W = X(e, v);
            P(W);
          }
          return B;
        }
        n$1(x, "cancel1Algorithm");
        function K(_) {
          if (d = true, R = _, c) {
            const v = tt([p, R]), W = X(e, v);
            P(W);
          }
          return B;
        }
        n$1(K, "cancel2Algorithm");
        function be() {
        }
        return n$1(be, "startAlgorithm"), y = uo(be, me, x), C = uo(be, U, K), ee(t2), [y, C];
      }
      n$1(ga, "ReadableByteStreamTee");
      function _a2(e) {
        return u(e) && typeof e.getReader < "u";
      }
      n$1(_a2, "isReadableStreamLike");
      function Sa(e) {
        return _a2(e) ? Ra(e.getReader()) : wa(e);
      }
      n$1(Sa, "ReadableStreamFrom");
      function wa(e) {
        let t2;
        const r2 = Tn(e, "async"), s = l;
        function f2() {
          let d;
          try {
            d = di(r2);
          } catch (R) {
            return b(R);
          }
          const p = T2(d);
          return F(p, (R) => {
            if (!u(R)) throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            if (hi(R)) Oe(t2._readableStreamController);
            else {
              const C = mi(R);
              Me(t2._readableStreamController, C);
            }
          });
        }
        n$1(f2, "pullAlgorithm");
        function c(d) {
          const p = r2.iterator;
          let R;
          try {
            R = St(p, "return");
          } catch (P) {
            return b(P);
          }
          if (R === void 0) return T2(void 0);
          let y;
          try {
            y = O(R, p, [d]);
          } catch (P) {
            return b(P);
          }
          const C = T2(y);
          return F(C, (P) => {
            if (!u(P)) throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
          });
        }
        return n$1(c, "cancelAlgorithm"), t2 = ut(s, f2, c, 0), t2;
      }
      n$1(wa, "ReadableStreamFromIterable");
      function Ra(e) {
        let t2;
        const r2 = l;
        function s() {
          let c;
          try {
            c = e.read();
          } catch (d) {
            return b(d);
          }
          return F(c, (d) => {
            if (!u(d)) throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            if (d.done) Oe(t2._readableStreamController);
            else {
              const p = d.value;
              Me(t2._readableStreamController, p);
            }
          });
        }
        n$1(s, "pullAlgorithm");
        function f2(c) {
          try {
            return T2(e.cancel(c));
          } catch (d) {
            return b(d);
          }
        }
        return n$1(f2, "cancelAlgorithm"), t2 = ut(r2, s, f2, 0), t2;
      }
      n$1(Ra, "ReadableStreamFromDefaultReader");
      function Ta(e, t2) {
        ne(e, t2);
        const r2 = e, s = r2 == null ? void 0 : r2.autoAllocateChunkSize, f2 = r2 == null ? void 0 : r2.cancel, c = r2 == null ? void 0 : r2.pull, d = r2 == null ? void 0 : r2.start, p = r2 == null ? void 0 : r2.type;
        return { autoAllocateChunkSize: s === void 0 ? void 0 : mr(s, `${t2} has member 'autoAllocateChunkSize' that`), cancel: f2 === void 0 ? void 0 : Ca(f2, r2, `${t2} has member 'cancel' that`), pull: c === void 0 ? void 0 : Pa(c, r2, `${t2} has member 'pull' that`), start: d === void 0 ? void 0 : Ea(d, r2, `${t2} has member 'start' that`), type: p === void 0 ? void 0 : va(p, `${t2} has member 'type' that`) };
      }
      n$1(Ta, "convertUnderlyingDefaultOrByteSource");
      function Ca(e, t2, r2) {
        return G(e, r2), (s) => z(e, t2, [s]);
      }
      n$1(Ca, "convertUnderlyingSourceCancelCallback");
      function Pa(e, t2, r2) {
        return G(e, r2), (s) => z(e, t2, [s]);
      }
      n$1(Pa, "convertUnderlyingSourcePullCallback");
      function Ea(e, t2, r2) {
        return G(e, r2), (s) => O(e, t2, [s]);
      }
      n$1(Ea, "convertUnderlyingSourceStartCallback");
      function va(e, t2) {
        if (e = `${e}`, e !== "bytes") throw new TypeError(`${t2} '${e}' is not a valid enumeration value for ReadableStreamType`);
        return e;
      }
      n$1(va, "convertReadableStreamType");
      function Aa(e, t2) {
        return ne(e, t2), { preventCancel: !!(e == null ? void 0 : e.preventCancel) };
      }
      n$1(Aa, "convertIteratorOptions");
      function so(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.preventAbort, s = e == null ? void 0 : e.preventCancel, f2 = e == null ? void 0 : e.preventClose, c = e == null ? void 0 : e.signal;
        return c !== void 0 && Ba(c, `${t2} has member 'signal' that`), { preventAbort: !!r2, preventCancel: !!s, preventClose: !!f2, signal: c };
      }
      n$1(so, "convertPipeOptions");
      function Ba(e, t2) {
        if (!ji(e)) throw new TypeError(`${t2} is not an AbortSignal.`);
      }
      n$1(Ba, "assertAbortSignal");
      function Wa(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.readable;
        dr(r2, "readable", "ReadableWritablePair"), br(r2, `${t2} has member 'readable' that`);
        const s = e == null ? void 0 : e.writable;
        return dr(s, "writable", "ReadableWritablePair"), Un(s, `${t2} has member 'writable' that`), { readable: r2, writable: s };
      }
      n$1(Wa, "convertReadableWritablePair");
      const _L = class _L {
        constructor(t2 = {}, r2 = {}) {
          t2 === void 0 ? t2 = null : cn(t2, "First parameter");
          const s = At(r2, "Second parameter"), f2 = Ta(t2, "First parameter");
          if (Ur(this), f2.type === "bytes") {
            if (s.size !== void 0) throw new RangeError("The strategy for a byte stream cannot have a size function");
            const c = ot(s, 0);
            Ci(this, f2, c);
          } else {
            const c = vt(s), d = ot(s, 1);
            ba(this, f2, d, c);
          }
        }
        get locked() {
          if (!Te(this)) throw Ie("locked");
          return Ce(this);
        }
        cancel(t2 = void 0) {
          return Te(this) ? Ce(this) ? b(new TypeError("Cannot cancel a stream that already has a reader")) : X(this, t2) : b(Ie("cancel"));
        }
        getReader(t2 = void 0) {
          if (!Te(this)) throw Ie("getReader");
          return Ei(t2, "First parameter").mode === void 0 ? ze(this) : jn(this);
        }
        pipeThrough(t2, r2 = {}) {
          if (!Te(this)) throw Ie("pipeThrough");
          le(t2, 1, "pipeThrough");
          const s = Wa(t2, "First parameter"), f2 = so(r2, "Second parameter");
          if (Ce(this)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          if (De(s.writable)) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          const c = oo(this, s.writable, f2.preventClose, f2.preventAbort, f2.preventCancel, f2.signal);
          return Q(c), s.readable;
        }
        pipeTo(t2, r2 = {}) {
          if (!Te(this)) return b(Ie("pipeTo"));
          if (t2 === void 0) return b("Parameter 1 is required in 'pipeTo'.");
          if (!Le(t2)) return b(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
          let s;
          try {
            s = so(r2, "Second parameter");
          } catch (f2) {
            return b(f2);
          }
          return Ce(this) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : De(t2) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : oo(this, t2, s.preventClose, s.preventAbort, s.preventCancel, s.signal);
        }
        tee() {
          if (!Te(this)) throw Ie("tee");
          const t2 = pa(this);
          return tt(t2);
        }
        values(t2 = void 0) {
          if (!Te(this)) throw Ie("values");
          const r2 = Aa(t2, "First parameter");
          return fi(this, r2.preventCancel);
        }
        [Sr](t2) {
          return this.values(t2);
        }
        static from(t2) {
          return Sa(t2);
        }
      };
      n$1(_L, "ReadableStream");
      let L = _L;
      Object.defineProperties(L, { from: { enumerable: true } }), Object.defineProperties(L.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), h2(L.from, "from"), h2(L.prototype.cancel, "cancel"), h2(L.prototype.getReader, "getReader"), h2(L.prototype.pipeThrough, "pipeThrough"), h2(L.prototype.pipeTo, "pipeTo"), h2(L.prototype.tee, "tee"), h2(L.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L.prototype, Symbol.toStringTag, { value: "ReadableStream", configurable: true }), Object.defineProperty(L.prototype, Sr, { value: L.prototype.values, writable: true, configurable: true });
      function ut(e, t2, r2, s = 1, f2 = () => 1) {
        const c = Object.create(L.prototype);
        Ur(c);
        const d = Object.create(he.prototype);
        return ao(c, d, e, t2, r2, s, f2), c;
      }
      n$1(ut, "CreateReadableStream");
      function uo(e, t2, r2) {
        const s = Object.create(L.prototype);
        Ur(s);
        const f2 = Object.create(ce.prototype);
        return zn(s, f2, e, t2, r2, 0, void 0), s;
      }
      n$1(uo, "CreateReadableByteStream");
      function Ur(e) {
        e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = false;
      }
      n$1(Ur, "InitializeReadableStream");
      function Te(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? false : e instanceof L;
      }
      n$1(Te, "IsReadableStream");
      function Ce(e) {
        return e._reader !== void 0;
      }
      n$1(Ce, "IsReadableStreamLocked");
      function X(e, t2) {
        if (e._disturbed = true, e._state === "closed") return T2(void 0);
        if (e._state === "errored") return b(e._storedError);
        lt(e);
        const r2 = e._reader;
        if (r2 !== void 0 && We(r2)) {
          const f2 = r2._readIntoRequests;
          r2._readIntoRequests = new M(), f2.forEach((c) => {
            c._closeSteps(void 0);
          });
        }
        const s = e._readableStreamController[ar](t2);
        return F(s, l);
      }
      n$1(X, "ReadableStreamCancel");
      function lt(e) {
        e._state = "closed";
        const t2 = e._reader;
        if (t2 !== void 0 && (ln(t2), ge(t2))) {
          const r2 = t2._readRequests;
          t2._readRequests = new M(), r2.forEach((s) => {
            s._closeSteps();
          });
        }
      }
      n$1(lt, "ReadableStreamClose");
      function lo(e, t2) {
        e._state = "errored", e._storedError = t2;
        const r2 = e._reader;
        r2 !== void 0 && (cr(r2, t2), ge(r2) ? bn(r2, t2) : Mn(r2, t2));
      }
      n$1(lo, "ReadableStreamError");
      function Ie(e) {
        return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
      }
      n$1(Ie, "streamBrandCheckException$1");
      function fo(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.highWaterMark;
        return dr(r2, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: hr(r2) };
      }
      n$1(fo, "convertQueuingStrategyInit");
      const co = n$1((e) => e.byteLength, "byteLengthSizeFunction");
      h2(co, "size");
      const _Dt = class _Dt {
        constructor(t2) {
          le(t2, 1, "ByteLengthQueuingStrategy"), t2 = fo(t2, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!mo(this)) throw ho("highWaterMark");
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!mo(this)) throw ho("size");
          return co;
        }
      };
      n$1(_Dt, "ByteLengthQueuingStrategy");
      let Dt = _Dt;
      Object.defineProperties(Dt.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Dt.prototype, Symbol.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
      function ho(e) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
      }
      n$1(ho, "byteLengthBrandCheckException");
      function mo(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? false : e instanceof Dt;
      }
      n$1(mo, "IsByteLengthQueuingStrategy");
      const bo = n$1(() => 1, "countSizeFunction");
      h2(bo, "size");
      const _$t = class _$t {
        constructor(t2) {
          le(t2, 1, "CountQueuingStrategy"), t2 = fo(t2, "First parameter"), this._countQueuingStrategyHighWaterMark = t2.highWaterMark;
        }
        get highWaterMark() {
          if (!yo(this)) throw po("highWaterMark");
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!yo(this)) throw po("size");
          return bo;
        }
      };
      n$1(_$t, "CountQueuingStrategy");
      let $t = _$t;
      Object.defineProperties($t.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty($t.prototype, Symbol.toStringTag, { value: "CountQueuingStrategy", configurable: true });
      function po(e) {
        return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
      }
      n$1(po, "countBrandCheckException");
      function yo(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? false : e instanceof $t;
      }
      n$1(yo, "IsCountQueuingStrategy");
      function ka(e, t2) {
        ne(e, t2);
        const r2 = e == null ? void 0 : e.cancel, s = e == null ? void 0 : e.flush, f2 = e == null ? void 0 : e.readableType, c = e == null ? void 0 : e.start, d = e == null ? void 0 : e.transform, p = e == null ? void 0 : e.writableType;
        return { cancel: r2 === void 0 ? void 0 : Fa(r2, e, `${t2} has member 'cancel' that`), flush: s === void 0 ? void 0 : qa(s, e, `${t2} has member 'flush' that`), readableType: f2, start: c === void 0 ? void 0 : Oa(c, e, `${t2} has member 'start' that`), transform: d === void 0 ? void 0 : Ia(d, e, `${t2} has member 'transform' that`), writableType: p };
      }
      n$1(ka, "convertTransformer");
      function qa(e, t2, r2) {
        return G(e, r2), (s) => z(e, t2, [s]);
      }
      n$1(qa, "convertTransformerFlushCallback");
      function Oa(e, t2, r2) {
        return G(e, r2), (s) => O(e, t2, [s]);
      }
      n$1(Oa, "convertTransformerStartCallback");
      function Ia(e, t2, r2) {
        return G(e, r2), (s, f2) => z(e, t2, [s, f2]);
      }
      n$1(Ia, "convertTransformerTransformCallback");
      function Fa(e, t2, r2) {
        return G(e, r2), (s) => z(e, t2, [s]);
      }
      n$1(Fa, "convertTransformerCancelCallback");
      const _Mt = class _Mt {
        constructor(t2 = {}, r2 = {}, s = {}) {
          t2 === void 0 && (t2 = null);
          const f2 = At(r2, "Second parameter"), c = At(s, "Third parameter"), d = ka(t2, "First parameter");
          if (d.readableType !== void 0) throw new RangeError("Invalid readableType specified");
          if (d.writableType !== void 0) throw new RangeError("Invalid writableType specified");
          const p = ot(c, 0), R = vt(c), y = ot(f2, 1), C = vt(f2);
          let P;
          const B = A((ee) => {
            P = ee;
          });
          za(this, B, y, C, p, R), La(this, d), d.start !== void 0 ? P(d.start(this._transformStreamController)) : P(void 0);
        }
        get readable() {
          if (!go(this)) throw Ro("readable");
          return this._readable;
        }
        get writable() {
          if (!go(this)) throw Ro("writable");
          return this._writable;
        }
      };
      n$1(_Mt, "TransformStream");
      let Mt = _Mt;
      Object.defineProperties(Mt.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mt.prototype, Symbol.toStringTag, { value: "TransformStream", configurable: true });
      function za(e, t2, r2, s, f2, c) {
        function d() {
          return t2;
        }
        n$1(d, "startAlgorithm");
        function p(B) {
          return Ma(e, B);
        }
        n$1(p, "writeAlgorithm");
        function R(B) {
          return Ua(e, B);
        }
        n$1(R, "abortAlgorithm");
        function y() {
          return xa(e);
        }
        n$1(y, "closeAlgorithm"), e._writable = $i(d, p, y, R, r2, s);
        function C() {
          return Na(e);
        }
        n$1(C, "pullAlgorithm");
        function P(B) {
          return Ha(e, B);
        }
        n$1(P, "cancelAlgorithm"), e._readable = ut(d, C, P, f2, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, Ut(e, true), e._transformStreamController = void 0;
      }
      n$1(za, "InitializeTransformStream");
      function go(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? false : e instanceof Mt;
      }
      n$1(go, "IsTransformStream");
      function _o(e, t2) {
        J(e._readable._readableStreamController, t2), xr(e, t2);
      }
      n$1(_o, "TransformStreamError");
      function xr(e, t2) {
        Nt(e._transformStreamController), it(e._writable._writableStreamController, t2), Nr(e);
      }
      n$1(xr, "TransformStreamErrorWritableAndUnblockWrite");
      function Nr(e) {
        e._backpressure && Ut(e, false);
      }
      n$1(Nr, "TransformStreamUnblockWrite");
      function Ut(e, t2) {
        e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = A((r2) => {
          e._backpressureChangePromise_resolve = r2;
        }), e._backpressure = t2;
      }
      n$1(Ut, "TransformStreamSetBackpressure");
      const _Pe = class _Pe {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!xt(this)) throw Ht("desiredSize");
          const t2 = this._controlledTransformStream._readable._readableStreamController;
          return Mr(t2);
        }
        enqueue(t2 = void 0) {
          if (!xt(this)) throw Ht("enqueue");
          So(this, t2);
        }
        error(t2 = void 0) {
          if (!xt(this)) throw Ht("error");
          Da(this, t2);
        }
        terminate() {
          if (!xt(this)) throw Ht("terminate");
          $a(this);
        }
      };
      n$1(_Pe, "TransformStreamDefaultController");
      let Pe = _Pe;
      Object.defineProperties(Pe.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), h2(Pe.prototype.enqueue, "enqueue"), h2(Pe.prototype.error, "error"), h2(Pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Pe.prototype, Symbol.toStringTag, { value: "TransformStreamDefaultController", configurable: true });
      function xt(e) {
        return !u(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? false : e instanceof Pe;
      }
      n$1(xt, "IsTransformStreamDefaultController");
      function ja(e, t2, r2, s, f2) {
        t2._controlledTransformStream = e, e._transformStreamController = t2, t2._transformAlgorithm = r2, t2._flushAlgorithm = s, t2._cancelAlgorithm = f2, t2._finishPromise = void 0, t2._finishPromise_resolve = void 0, t2._finishPromise_reject = void 0;
      }
      n$1(ja, "SetUpTransformStreamDefaultController");
      function La(e, t2) {
        const r2 = Object.create(Pe.prototype);
        let s, f2, c;
        t2.transform !== void 0 ? s = n$1((d) => t2.transform(d, r2), "transformAlgorithm") : s = n$1((d) => {
          try {
            return So(r2, d), T2(void 0);
          } catch (p) {
            return b(p);
          }
        }, "transformAlgorithm"), t2.flush !== void 0 ? f2 = n$1(() => t2.flush(r2), "flushAlgorithm") : f2 = n$1(() => T2(void 0), "flushAlgorithm"), t2.cancel !== void 0 ? c = n$1((d) => t2.cancel(d), "cancelAlgorithm") : c = n$1(() => T2(void 0), "cancelAlgorithm"), ja(e, r2, s, f2, c);
      }
      n$1(La, "SetUpTransformStreamDefaultControllerFromTransformer");
      function Nt(e) {
        e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
      }
      n$1(Nt, "TransformStreamDefaultControllerClearAlgorithms");
      function So(e, t2) {
        const r2 = e._controlledTransformStream, s = r2._readable._readableStreamController;
        if (!Ue(s)) throw new TypeError("Readable side is not in a state that permits enqueue");
        try {
          Me(s, t2);
        } catch (c) {
          throw xr(r2, c), r2._readable._storedError;
        }
        ma(s) !== r2._backpressure && Ut(r2, true);
      }
      n$1(So, "TransformStreamDefaultControllerEnqueue");
      function Da(e, t2) {
        _o(e._controlledTransformStream, t2);
      }
      n$1(Da, "TransformStreamDefaultControllerError");
      function wo(e, t2) {
        const r2 = e._transformAlgorithm(t2);
        return F(r2, void 0, (s) => {
          throw _o(e._controlledTransformStream, s), s;
        });
      }
      n$1(wo, "TransformStreamDefaultControllerPerformTransform");
      function $a(e) {
        const t2 = e._controlledTransformStream, r2 = t2._readable._readableStreamController;
        Oe(r2);
        const s = new TypeError("TransformStream terminated");
        xr(t2, s);
      }
      n$1($a, "TransformStreamDefaultControllerTerminate");
      function Ma(e, t2) {
        const r2 = e._transformStreamController;
        if (e._backpressure) {
          const s = e._backpressureChangePromise;
          return F(s, () => {
            const f2 = e._writable;
            if (f2._state === "erroring") throw f2._storedError;
            return wo(r2, t2);
          });
        }
        return wo(r2, t2);
      }
      n$1(Ma, "TransformStreamDefaultSinkWriteAlgorithm");
      function Ua(e, t2) {
        const r2 = e._transformStreamController;
        if (r2._finishPromise !== void 0) return r2._finishPromise;
        const s = e._readable;
        r2._finishPromise = A((c, d) => {
          r2._finishPromise_resolve = c, r2._finishPromise_reject = d;
        });
        const f2 = r2._cancelAlgorithm(t2);
        return Nt(r2), g(f2, () => (s._state === "errored" ? xe(r2, s._storedError) : (J(s._readableStreamController, t2), Hr(r2)), null), (c) => (J(s._readableStreamController, c), xe(r2, c), null)), r2._finishPromise;
      }
      n$1(Ua, "TransformStreamDefaultSinkAbortAlgorithm");
      function xa(e) {
        const t2 = e._transformStreamController;
        if (t2._finishPromise !== void 0) return t2._finishPromise;
        const r2 = e._readable;
        t2._finishPromise = A((f2, c) => {
          t2._finishPromise_resolve = f2, t2._finishPromise_reject = c;
        });
        const s = t2._flushAlgorithm();
        return Nt(t2), g(s, () => (r2._state === "errored" ? xe(t2, r2._storedError) : (Oe(r2._readableStreamController), Hr(t2)), null), (f2) => (J(r2._readableStreamController, f2), xe(t2, f2), null)), t2._finishPromise;
      }
      n$1(xa, "TransformStreamDefaultSinkCloseAlgorithm");
      function Na(e) {
        return Ut(e, false), e._backpressureChangePromise;
      }
      n$1(Na, "TransformStreamDefaultSourcePullAlgorithm");
      function Ha(e, t2) {
        const r2 = e._transformStreamController;
        if (r2._finishPromise !== void 0) return r2._finishPromise;
        const s = e._writable;
        r2._finishPromise = A((c, d) => {
          r2._finishPromise_resolve = c, r2._finishPromise_reject = d;
        });
        const f2 = r2._cancelAlgorithm(t2);
        return Nt(r2), g(f2, () => (s._state === "errored" ? xe(r2, s._storedError) : (it(s._writableStreamController, t2), Nr(e), Hr(r2)), null), (c) => (it(s._writableStreamController, c), Nr(e), xe(r2, c), null)), r2._finishPromise;
      }
      n$1(Ha, "TransformStreamDefaultSourceCancelAlgorithm");
      function Ht(e) {
        return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
      }
      n$1(Ht, "defaultControllerBrandCheckException");
      function Hr(e) {
        e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
      }
      n$1(Hr, "defaultControllerFinishPromiseResolve");
      function xe(e, t2) {
        e._finishPromise_reject !== void 0 && (Q(e._finishPromise), e._finishPromise_reject(t2), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
      }
      n$1(xe, "defaultControllerFinishPromiseReject");
      function Ro(e) {
        return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
      }
      n$1(Ro, "streamBrandCheckException"), a.ByteLengthQueuingStrategy = Dt, a.CountQueuingStrategy = $t, a.ReadableByteStreamController = ce, a.ReadableStream = L, a.ReadableStreamBYOBReader = we, a.ReadableStreamBYOBRequest = ve, a.ReadableStreamDefaultController = he, a.ReadableStreamDefaultReader = ye, a.TransformStream = Mt, a.TransformStreamDefaultController = Pe, a.WritableStream = Re, a.WritableStreamDefaultController = $e, a.WritableStreamDefaultWriter = de;
    });
  }(ct, ct.exports)), ct.exports;
}
n$1(ns, "requirePonyfill_es2018");
var Ao;
function os() {
  if (Ao) return Eo;
  Ao = 1;
  const i = 65536;
  if (!globalThis.ReadableStream) try {
    const o2 = require("node:process"), { emitWarning: a } = o2;
    try {
      o2.emitWarning = () => {
      }, Object.assign(globalThis, require("node:stream/web")), o2.emitWarning = a;
    } catch (l) {
      throw o2.emitWarning = a, l;
    }
  } catch {
    Object.assign(globalThis, ns());
  }
  try {
    const { Blob: o2 } = require("buffer");
    o2 && !o2.prototype.stream && (o2.prototype.stream = n$1(function(l) {
      let u = 0;
      const m = this;
      return new ReadableStream({ type: "bytes", async pull(h2) {
        const E = await m.slice(u, Math.min(m.size, u + i)).arrayBuffer();
        u += E.byteLength, h2.enqueue(new Uint8Array(E)), u === m.size && h2.close();
      } });
    }, "name"));
  } catch {
  }
  return Eo;
}
n$1(os, "requireStreams"), os();
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
const Bo = 65536;
async function* Qr(i, o2 = true) {
  for (const a of i) if ("stream" in a) yield* a.stream();
  else if (ArrayBuffer.isView(a)) if (o2) {
    let l = a.byteOffset;
    const u = a.byteOffset + a.byteLength;
    for (; l !== u; ) {
      const m = Math.min(u - l, Bo), h2 = a.buffer.slice(l, l + m);
      l += h2.byteLength, yield new Uint8Array(h2);
    }
  } else yield a;
  else {
    let l = 0, u = a;
    for (; l !== u.size; ) {
      const h2 = await u.slice(l, Math.min(u.size, l + Bo)).arrayBuffer();
      l += h2.byteLength, yield new Uint8Array(h2);
    }
  }
}
n$1(Qr, "toIterator");
const Wo = (_a = class {
  constructor(o2 = [], a = {}) {
    __privateAdd(this, _e, []);
    __privateAdd(this, _t, "");
    __privateAdd(this, _r, 0);
    __privateAdd(this, _n, "transparent");
    if (typeof o2 != "object" || o2 === null) throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
    if (typeof o2[Symbol.iterator] != "function") throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
    if (typeof a != "object" && typeof a != "function") throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
    a === null && (a = {});
    const l = new TextEncoder();
    for (const m of o2) {
      let h2;
      ArrayBuffer.isView(m) ? h2 = new Uint8Array(m.buffer.slice(m.byteOffset, m.byteOffset + m.byteLength)) : m instanceof ArrayBuffer ? h2 = new Uint8Array(m.slice(0)) : m instanceof _a ? h2 = m : h2 = l.encode(`${m}`), __privateSet(this, _r, __privateGet(this, _r) + (ArrayBuffer.isView(h2) ? h2.byteLength : h2.size)), __privateGet(this, _e).push(h2);
    }
    __privateSet(this, _n, `${a.endings === void 0 ? "transparent" : a.endings}`);
    const u = a.type === void 0 ? "" : String(a.type);
    __privateSet(this, _t, /^[\x20-\x7E]*$/.test(u) ? u : "");
  }
  get size() {
    return __privateGet(this, _r);
  }
  get type() {
    return __privateGet(this, _t);
  }
  async text() {
    const o2 = new TextDecoder();
    let a = "";
    for await (const l of Qr(__privateGet(this, _e), false)) a += o2.decode(l, { stream: true });
    return a += o2.decode(), a;
  }
  async arrayBuffer() {
    const o2 = new Uint8Array(this.size);
    let a = 0;
    for await (const l of Qr(__privateGet(this, _e), false)) o2.set(l, a), a += l.length;
    return o2.buffer;
  }
  stream() {
    const o2 = Qr(__privateGet(this, _e), true);
    return new globalThis.ReadableStream({ type: "bytes", async pull(a) {
      const l = await o2.next();
      l.done ? a.close() : a.enqueue(l.value);
    }, async cancel() {
      await o2.return();
    } });
  }
  slice(o2 = 0, a = this.size, l = "") {
    const { size: u } = this;
    let m = o2 < 0 ? Math.max(u + o2, 0) : Math.min(o2, u), h2 = a < 0 ? Math.max(u + a, 0) : Math.min(a, u);
    const S = Math.max(h2 - m, 0), E = __privateGet(this, _e), w = [];
    let A = 0;
    for (const b of E) {
      if (A >= S) break;
      const q = ArrayBuffer.isView(b) ? b.byteLength : b.size;
      if (m && q <= m) m -= q, h2 -= q;
      else {
        let g;
        ArrayBuffer.isView(b) ? (g = b.subarray(m, Math.min(q, h2)), A += g.byteLength) : (g = b.slice(m, Math.min(q, h2)), A += g.size), h2 -= q, w.push(g), m = 0;
      }
    }
    const T2 = new _a([], { type: String(l).toLowerCase() });
    return __privateSet(T2, _r, S), __privateSet(T2, _e, w), T2;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](o2) {
    return o2 && typeof o2 == "object" && typeof o2.constructor == "function" && (typeof o2.stream == "function" || typeof o2.arrayBuffer == "function") && /^(Blob|File)$/.test(o2[Symbol.toStringTag]);
  }
}, _e = new WeakMap(), _t = new WeakMap(), _r = new WeakMap(), _n = new WeakMap(), n$1(_a, "Blob"), _a);
Object.defineProperties(Wo.prototype, { size: { enumerable: true }, type: { enumerable: true }, slice: { enumerable: true } });
const Ze = Wo, is = (_b = class extends Ze {
  constructor(o2, a, l = {}) {
    if (arguments.length < 2) throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
    super(o2, l);
    __privateAdd(this, _e2, 0);
    __privateAdd(this, _t2, "");
    l === null && (l = {});
    const u = l.lastModified === void 0 ? Date.now() : Number(l.lastModified);
    Number.isNaN(u) || __privateSet(this, _e2, u), __privateSet(this, _t2, String(a));
  }
  get name() {
    return __privateGet(this, _t2);
  }
  get lastModified() {
    return __privateGet(this, _e2);
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
  static [Symbol.hasInstance](o2) {
    return !!o2 && o2 instanceof Ze && /^(File)$/.test(o2[Symbol.toStringTag]);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), n$1(_b, "File"), _b), Yr = is;
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var { toStringTag: dt, iterator: as, hasInstance: ss } = Symbol, ko = Math.random, us = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","), qo = n$1((i, o2, a) => (i += "", /^(Blob|File)$/.test(o2 && o2[dt]) ? [(a = a !== void 0 ? a + "" : o2[dt] == "File" ? o2.name : "blob", i), o2.name !== a || o2[dt] == "blob" ? new Yr([o2], a, o2) : o2] : [i, o2 + ""]), "f"), Gr = n$1((i, o2) => (o2 ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1"), Fe = n$1((i, o2, a) => {
  if (o2.length < a) throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o2.length} present.`);
}, "x");
const Zt = (_c = class {
  constructor(...o2) {
    __privateAdd(this, _e3, []);
    if (o2.length) throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
  }
  get [dt]() {
    return "FormData";
  }
  [as]() {
    return this.entries();
  }
  static [ss](o2) {
    return o2 && typeof o2 == "object" && o2[dt] === "FormData" && !us.some((a) => typeof o2[a] != "function");
  }
  append(...o2) {
    Fe("append", arguments, 2), __privateGet(this, _e3).push(qo(...o2));
  }
  delete(o2) {
    Fe("delete", arguments, 1), o2 += "", __privateSet(this, _e3, __privateGet(this, _e3).filter(([a]) => a !== o2));
  }
  get(o2) {
    Fe("get", arguments, 1), o2 += "";
    for (var a = __privateGet(this, _e3), l = a.length, u = 0; u < l; u++) if (a[u][0] === o2) return a[u][1];
    return null;
  }
  getAll(o2, a) {
    return Fe("getAll", arguments, 1), a = [], o2 += "", __privateGet(this, _e3).forEach((l) => l[0] === o2 && a.push(l[1])), a;
  }
  has(o2) {
    return Fe("has", arguments, 1), o2 += "", __privateGet(this, _e3).some((a) => a[0] === o2);
  }
  forEach(o2, a) {
    Fe("forEach", arguments, 1);
    for (var [l, u] of this) o2.call(a, u, l, this);
  }
  set(...o2) {
    Fe("set", arguments, 2);
    var a = [], l = true;
    o2 = qo(...o2), __privateGet(this, _e3).forEach((u) => {
      u[0] === o2[0] ? l && (l = !a.push(o2)) : a.push(u);
    }), l && a.push(o2), __privateSet(this, _e3, a);
  }
  *entries() {
    yield* __privateGet(this, _e3);
  }
  *keys() {
    for (var [o2] of this) yield o2;
  }
  *values() {
    for (var [, o2] of this) yield o2;
  }
}, _e3 = new WeakMap(), n$1(_c, "FormData"), _c);
function ls(i, o2 = Ze) {
  var a = `${ko()}${ko()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), l = [], u = `--${a}\r
Content-Disposition: form-data; name="`;
  return i.forEach((m, h2) => typeof m == "string" ? l.push(u + Gr(h2) + `"\r
\r
${m.replace(new RegExp("\\r(?!\\n)|(?<!\\r)\\n", "g"), `\r
`)}\r
`) : l.push(u + Gr(h2) + `"; filename="${Gr(m.name, 1)}"\r
Content-Type: ${m.type || "application/octet-stream"}\r
\r
`, m, `\r
`)), l.push(`--${a}--`), new o2(l, { type: "multipart/form-data; boundary=" + a });
}
n$1(ls, "formDataToBlob");
const _Kt = class _Kt extends Error {
  constructor(o2, a) {
    super(o2), Error.captureStackTrace(this, this.constructor), this.type = a;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
n$1(_Kt, "FetchBaseError");
let Kt = _Kt;
const _te = class _te extends Kt {
  constructor(o2, a, l) {
    super(o2, a), l && (this.code = this.errno = l.code, this.erroredSysCall = l.syscall);
  }
};
n$1(_te, "FetchError");
let te = _te;
const Jt = Symbol.toStringTag, Oo = n$1((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[Jt] === "URLSearchParams", "isURLSearchParameters"), Xt = n$1((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[Jt]), "isBlob"), fs = n$1((i) => typeof i == "object" && (i[Jt] === "AbortSignal" || i[Jt] === "EventTarget"), "isAbortSignal"), cs = n$1((i, o2) => {
  const a = new URL(o2).hostname, l = new URL(i).hostname;
  return a === l || a.endsWith(`.${l}`);
}, "isDomainOrSubdomain"), ds = n$1((i, o2) => {
  const a = new URL(o2).protocol, l = new URL(i).protocol;
  return a === l;
}, "isSameProtocol"), hs = promisify(ie.pipeline), N = Symbol("Body internals");
const _ht = class _ht {
  constructor(o2, { size: a = 0 } = {}) {
    let l = null;
    o2 === null ? o2 = null : Oo(o2) ? o2 = Buffer$1.from(o2.toString()) : Xt(o2) || Buffer$1.isBuffer(o2) || (types.isAnyArrayBuffer(o2) ? o2 = Buffer$1.from(o2) : ArrayBuffer.isView(o2) ? o2 = Buffer$1.from(o2.buffer, o2.byteOffset, o2.byteLength) : o2 instanceof ie || (o2 instanceof Zt ? (o2 = ls(o2), l = o2.type.split("=")[1]) : o2 = Buffer$1.from(String(o2))));
    let u = o2;
    Buffer$1.isBuffer(o2) ? u = ie.Readable.from(o2) : Xt(o2) && (u = ie.Readable.from(o2.stream())), this[N] = { body: o2, stream: u, boundary: l, disturbed: false, error: null }, this.size = a, o2 instanceof ie && o2.on("error", (m) => {
      const h2 = m instanceof Kt ? m : new te(`Invalid response body while trying to fetch ${this.url}: ${m.message}`, "system", m);
      this[N].error = h2;
    });
  }
  get body() {
    return this[N].stream;
  }
  get bodyUsed() {
    return this[N].disturbed;
  }
  async arrayBuffer() {
    const { buffer: o2, byteOffset: a, byteLength: l } = await Zr(this);
    return o2.slice(a, a + l);
  }
  async formData() {
    const o2 = this.headers.get("content-type");
    if (o2.startsWith("application/x-www-form-urlencoded")) {
      const l = new Zt(), u = new URLSearchParams(await this.text());
      for (const [m, h2] of u) l.append(m, h2);
      return l;
    }
    const { toFormData: a } = await import('./multipart-parser-CFjnvBsN.mjs');
    return a(this.body, o2);
  }
  async blob() {
    const o2 = this.headers && this.headers.get("content-type") || this[N].body && this[N].body.type || "", a = await this.arrayBuffer();
    return new Ze([a], { type: o2 });
  }
  async json() {
    const o2 = await this.text();
    return JSON.parse(o2);
  }
  async text() {
    const o2 = await Zr(this);
    return new TextDecoder().decode(o2);
  }
  buffer() {
    return Zr(this);
  }
};
n$1(_ht, "Body");
let ht = _ht;
ht.prototype.buffer = deprecate(ht.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(ht.prototype, { body: { enumerable: true }, bodyUsed: { enumerable: true }, arrayBuffer: { enumerable: true }, blob: { enumerable: true }, json: { enumerable: true }, text: { enumerable: true }, data: { get: deprecate(() => {
}, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") } });
async function Zr(i) {
  if (i[N].disturbed) throw new TypeError(`body used already for: ${i.url}`);
  if (i[N].disturbed = true, i[N].error) throw i[N].error;
  const { body: o2 } = i;
  if (o2 === null) return Buffer$1.alloc(0);
  if (!(o2 instanceof ie)) return Buffer$1.alloc(0);
  const a = [];
  let l = 0;
  try {
    for await (const u of o2) {
      if (i.size > 0 && l + u.length > i.size) {
        const m = new te(`content size at ${i.url} over limit: ${i.size}`, "max-size");
        throw o2.destroy(m), m;
      }
      l += u.length, a.push(u);
    }
  } catch (u) {
    throw u instanceof Kt ? u : new te(`Invalid response body while trying to fetch ${i.url}: ${u.message}`, "system", u);
  }
  if (o2.readableEnded === true || o2._readableState.ended === true) try {
    return a.every((u) => typeof u == "string") ? Buffer$1.from(a.join("")) : Buffer$1.concat(a, l);
  } catch (u) {
    throw new te(`Could not create Buffer from response body for ${i.url}: ${u.message}`, "system", u);
  }
  else throw new te(`Premature close of server response while trying to fetch ${i.url}`);
}
n$1(Zr, "consumeBody");
const Kr = n$1((i, o2) => {
  let a, l, { body: u } = i[N];
  if (i.bodyUsed) throw new Error("cannot clone body after it is used");
  return u instanceof ie && typeof u.getBoundary != "function" && (a = new PassThrough({ highWaterMark: o2 }), l = new PassThrough({ highWaterMark: o2 }), u.pipe(a), u.pipe(l), i[N].stream = a, u = l), u;
}, "clone"), ms = deprecate((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167"), Io = n$1((i, o2) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : Oo(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : Xt(i) ? i.type || null : Buffer$1.isBuffer(i) || types.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof Zt ? `multipart/form-data; boundary=${o2[N].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${ms(i)}` : i instanceof ie ? null : "text/plain;charset=UTF-8", "extractContentType"), bs = n$1((i) => {
  const { body: o2 } = i[N];
  return o2 === null ? 0 : Xt(o2) ? o2.size : Buffer$1.isBuffer(o2) ? o2.length : o2 && typeof o2.getLengthSync == "function" && o2.hasKnownLength && o2.hasKnownLength() ? o2.getLengthSync() : null;
}, "getTotalBytes"), ps = n$1(async (i, { body: o2 }) => {
  o2 === null ? i.end() : await hs(o2, i);
}, "writeToStream"), er = typeof ft.validateHeaderName == "function" ? ft.validateHeaderName : (i) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
    const o2 = new TypeError(`Header name must be a valid HTTP token [${i}]`);
    throw Object.defineProperty(o2, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o2;
  }
}, Jr = typeof ft.validateHeaderValue == "function" ? ft.validateHeaderValue : (i, o2) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o2)) {
    const a = new TypeError(`Invalid character in header content ["${i}"]`);
    throw Object.defineProperty(a, "code", { value: "ERR_INVALID_CHAR" }), a;
  }
};
const _ae = class _ae extends URLSearchParams {
  constructor(o2) {
    let a = [];
    if (o2 instanceof _ae) {
      const l = o2.raw();
      for (const [u, m] of Object.entries(l)) a.push(...m.map((h2) => [u, h2]));
    } else if (o2 != null) if (typeof o2 == "object" && !types.isBoxedPrimitive(o2)) {
      const l = o2[Symbol.iterator];
      if (l == null) a.push(...Object.entries(o2));
      else {
        if (typeof l != "function") throw new TypeError("Header pairs must be iterable");
        a = [...o2].map((u) => {
          if (typeof u != "object" || types.isBoxedPrimitive(u)) throw new TypeError("Each header pair must be an iterable object");
          return [...u];
        }).map((u) => {
          if (u.length !== 2) throw new TypeError("Each header pair must be a name/value tuple");
          return [...u];
        });
      }
    } else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    return a = a.length > 0 ? a.map(([l, u]) => (er(l), Jr(l, String(u)), [String(l).toLowerCase(), String(u)])) : void 0, super(a), new Proxy(this, { get(l, u, m) {
      switch (u) {
        case "append":
        case "set":
          return (h2, S) => (er(h2), Jr(h2, String(S)), URLSearchParams.prototype[u].call(l, String(h2).toLowerCase(), String(S)));
        case "delete":
        case "has":
        case "getAll":
          return (h2) => (er(h2), URLSearchParams.prototype[u].call(l, String(h2).toLowerCase()));
        case "keys":
          return () => (l.sort(), new Set(URLSearchParams.prototype.keys.call(l)).keys());
        default:
          return Reflect.get(l, u, m);
      }
    } });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(o2) {
    const a = this.getAll(o2);
    if (a.length === 0) return null;
    let l = a.join(", ");
    return /^content-encoding$/i.test(o2) && (l = l.toLowerCase()), l;
  }
  forEach(o2, a = void 0) {
    for (const l of this.keys()) Reflect.apply(o2, a, [this.get(l), l, this]);
  }
  *values() {
    for (const o2 of this.keys()) yield this.get(o2);
  }
  *entries() {
    for (const o2 of this.keys()) yield [o2, this.get(o2)];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((o2, a) => (o2[a] = this.getAll(a), o2), {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((o2, a) => {
      const l = this.getAll(a);
      return a === "host" ? o2[a] = l[0] : o2[a] = l.length > 1 ? l : l[0], o2;
    }, {});
  }
};
n$1(_ae, "Headers");
let ae = _ae;
Object.defineProperties(ae.prototype, ["get", "entries", "forEach", "values"].reduce((i, o2) => (i[o2] = { enumerable: true }, i), {}));
function ys(i = []) {
  return new ae(i.reduce((o2, a, l, u) => (l % 2 === 0 && o2.push(u.slice(l, l + 2)), o2), []).filter(([o2, a]) => {
    try {
      return er(o2), Jr(o2, String(a)), true;
    } catch {
      return false;
    }
  }));
}
n$1(ys, "fromRawHeaders");
const gs = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), Xr = n$1((i) => gs.has(i), "isRedirect"), re = Symbol("Response internals");
const _H = class _H extends ht {
  constructor(o2 = null, a = {}) {
    super(o2, a);
    const l = a.status != null ? a.status : 200, u = new ae(a.headers);
    if (o2 !== null && !u.has("Content-Type")) {
      const m = Io(o2, this);
      m && u.append("Content-Type", m);
    }
    this[re] = { type: "default", url: a.url, status: l, statusText: a.statusText || "", headers: u, counter: a.counter, highWaterMark: a.highWaterMark };
  }
  get type() {
    return this[re].type;
  }
  get url() {
    return this[re].url || "";
  }
  get status() {
    return this[re].status;
  }
  get ok() {
    return this[re].status >= 200 && this[re].status < 300;
  }
  get redirected() {
    return this[re].counter > 0;
  }
  get statusText() {
    return this[re].statusText;
  }
  get headers() {
    return this[re].headers;
  }
  get highWaterMark() {
    return this[re].highWaterMark;
  }
  clone() {
    return new _H(Kr(this, this.highWaterMark), { type: this.type, url: this.url, status: this.status, statusText: this.statusText, headers: this.headers, ok: this.ok, redirected: this.redirected, size: this.size, highWaterMark: this.highWaterMark });
  }
  static redirect(o2, a = 302) {
    if (!Xr(a)) throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    return new _H(null, { headers: { location: new URL(o2).toString() }, status: a });
  }
  static error() {
    const o2 = new _H(null, { status: 0, statusText: "" });
    return o2[re].type = "error", o2;
  }
  static json(o2 = void 0, a = {}) {
    const l = JSON.stringify(o2);
    if (l === void 0) throw new TypeError("data is not JSON serializable");
    const u = new ae(a && a.headers);
    return u.has("content-type") || u.set("content-type", "application/json"), new _H(l, { ...a, headers: u });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
n$1(_H, "Response");
let H = _H;
Object.defineProperties(H.prototype, { type: { enumerable: true }, url: { enumerable: true }, status: { enumerable: true }, ok: { enumerable: true }, redirected: { enumerable: true }, statusText: { enumerable: true }, headers: { enumerable: true }, clone: { enumerable: true } });
const _s = n$1((i) => {
  if (i.search) return i.search;
  const o2 = i.href.length - 1, a = i.hash || (i.href[o2] === "#" ? "#" : "");
  return i.href[o2 - a.length] === "?" ? "?" : "";
}, "getSearch");
function Fo(i, o2 = false) {
  return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o2 && (i.pathname = "", i.search = ""), i);
}
n$1(Fo, "stripURLForUseAsAReferrer");
const zo = /* @__PURE__ */ new Set(["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"]), Ss = "strict-origin-when-cross-origin";
function ws(i) {
  if (!zo.has(i)) throw new TypeError(`Invalid referrerPolicy: ${i}`);
  return i;
}
n$1(ws, "validateReferrerPolicy");
function Rs(i) {
  if (/^(http|ws)s:$/.test(i.protocol)) return true;
  const o2 = i.host.replace(/(^\[)|(]$)/g, ""), a = isIP(o2);
  return a === 4 && /^127\./.test(o2) || a === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o2) ? true : i.host === "localhost" || i.host.endsWith(".localhost") ? false : i.protocol === "file:";
}
n$1(Rs, "isOriginPotentiallyTrustworthy");
function Ke(i) {
  return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? true : Rs(i);
}
n$1(Ke, "isUrlPotentiallyTrustworthy");
function Ts(i, { referrerURLCallback: o2, referrerOriginCallback: a } = {}) {
  if (i.referrer === "no-referrer" || i.referrerPolicy === "") return null;
  const l = i.referrerPolicy;
  if (i.referrer === "about:client") return "no-referrer";
  const u = i.referrer;
  let m = Fo(u), h2 = Fo(u, true);
  m.toString().length > 4096 && (m = h2), o2 && (m = o2(m)), a && (h2 = a(h2));
  const S = new URL(i.url);
  switch (l) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return h2;
    case "unsafe-url":
      return m;
    case "strict-origin":
      return Ke(m) && !Ke(S) ? "no-referrer" : h2.toString();
    case "strict-origin-when-cross-origin":
      return m.origin === S.origin ? m : Ke(m) && !Ke(S) ? "no-referrer" : h2;
    case "same-origin":
      return m.origin === S.origin ? m : "no-referrer";
    case "origin-when-cross-origin":
      return m.origin === S.origin ? m : h2;
    case "no-referrer-when-downgrade":
      return Ke(m) && !Ke(S) ? "no-referrer" : m;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${l}`);
  }
}
n$1(Ts, "determineRequestsReferrer");
function Cs(i) {
  const o2 = (i.get("referrer-policy") || "").split(/[,\s]+/);
  let a = "";
  for (const l of o2) l && zo.has(l) && (a = l);
  return a;
}
n$1(Cs, "parseReferrerPolicyFromHeader");
const j = Symbol("Request internals"), mt = n$1((i) => typeof i == "object" && typeof i[j] == "object", "isRequest"), Ps = deprecate(() => {
}, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
const _Xe = class _Xe extends ht {
  constructor(o2, a = {}) {
    let l;
    if (mt(o2) ? l = new URL(o2.url) : (l = new URL(o2), o2 = {}), l.username !== "" || l.password !== "") throw new TypeError(`${l} is an url with embedded credentials.`);
    let u = a.method || o2.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(u) && (u = u.toUpperCase()), !mt(a) && "data" in a && Ps(), (a.body != null || mt(o2) && o2.body !== null) && (u === "GET" || u === "HEAD")) throw new TypeError("Request with GET/HEAD method cannot have body");
    const m = a.body ? a.body : mt(o2) && o2.body !== null ? Kr(o2) : null;
    super(m, { size: a.size || o2.size || 0 });
    const h2 = new ae(a.headers || o2.headers || {});
    if (m !== null && !h2.has("Content-Type")) {
      const w = Io(m, this);
      w && h2.set("Content-Type", w);
    }
    let S = mt(o2) ? o2.signal : null;
    if ("signal" in a && (S = a.signal), S != null && !fs(S)) throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    let E = a.referrer == null ? o2.referrer : a.referrer;
    if (E === "") E = "no-referrer";
    else if (E) {
      const w = new URL(E);
      E = /^about:(\/\/)?client$/.test(w) ? "client" : w;
    } else E = void 0;
    this[j] = { method: u, redirect: a.redirect || o2.redirect || "follow", headers: h2, parsedURL: l, signal: S, referrer: E }, this.follow = a.follow === void 0 ? o2.follow === void 0 ? 20 : o2.follow : a.follow, this.compress = a.compress === void 0 ? o2.compress === void 0 ? true : o2.compress : a.compress, this.counter = a.counter || o2.counter || 0, this.agent = a.agent || o2.agent, this.highWaterMark = a.highWaterMark || o2.highWaterMark || 16384, this.insecureHTTPParser = a.insecureHTTPParser || o2.insecureHTTPParser || false, this.referrerPolicy = a.referrerPolicy || o2.referrerPolicy || "";
  }
  get method() {
    return this[j].method;
  }
  get url() {
    return format(this[j].parsedURL);
  }
  get headers() {
    return this[j].headers;
  }
  get redirect() {
    return this[j].redirect;
  }
  get signal() {
    return this[j].signal;
  }
  get referrer() {
    if (this[j].referrer === "no-referrer") return "";
    if (this[j].referrer === "client") return "about:client";
    if (this[j].referrer) return this[j].referrer.toString();
  }
  get referrerPolicy() {
    return this[j].referrerPolicy;
  }
  set referrerPolicy(o2) {
    this[j].referrerPolicy = ws(o2);
  }
  clone() {
    return new _Xe(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
n$1(_Xe, "Request");
let Xe = _Xe;
Object.defineProperties(Xe.prototype, { method: { enumerable: true }, url: { enumerable: true }, headers: { enumerable: true }, redirect: { enumerable: true }, clone: { enumerable: true }, signal: { enumerable: true }, referrer: { enumerable: true }, referrerPolicy: { enumerable: true } });
const Es = n$1((i) => {
  const { parsedURL: o2 } = i[j], a = new ae(i[j].headers);
  a.has("Accept") || a.set("Accept", "*/*");
  let l = null;
  if (i.body === null && /^(post|put)$/i.test(i.method) && (l = "0"), i.body !== null) {
    const S = bs(i);
    typeof S == "number" && !Number.isNaN(S) && (l = String(S));
  }
  l && a.set("Content-Length", l), i.referrerPolicy === "" && (i.referrerPolicy = Ss), i.referrer && i.referrer !== "no-referrer" ? i[j].referrer = Ts(i) : i[j].referrer = "no-referrer", i[j].referrer instanceof URL && a.set("Referer", i.referrer), a.has("User-Agent") || a.set("User-Agent", "node-fetch"), i.compress && !a.has("Accept-Encoding") && a.set("Accept-Encoding", "gzip, deflate, br");
  let { agent: u } = i;
  typeof u == "function" && (u = u(o2));
  const m = _s(o2), h2 = { path: o2.pathname + m, method: i.method, headers: a[Symbol.for("nodejs.util.inspect.custom")](), insecureHTTPParser: i.insecureHTTPParser, agent: u };
  return { parsedURL: o2, options: h2 };
}, "getNodeRequestOptions");
const _jo = class _jo extends Kt {
  constructor(o2, a = "aborted") {
    super(o2, a);
  }
};
n$1(_jo, "AbortError");
let jo = _jo;
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
var en, Lo;
function vs() {
  if (Lo) return en;
  if (Lo = 1, !globalThis.DOMException) try {
    const { MessageChannel: i } = require("worker_threads"), o2 = new i().port1, a = new ArrayBuffer();
    o2.postMessage(a, [a, a]);
  } catch (i) {
    i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
  }
  return en = globalThis.DOMException, en;
}
n$1(vs, "requireNodeDomexception");
var As = vs();
const Bs = f(As), { stat: tn } = promises;
n$1((i, o2) => Do(statSync(i), i, o2), "blobFromSync");
n$1((i, o2) => tn(i).then((a) => Do(a, i, o2)), "blobFrom");
n$1((i, o2) => tn(i).then((a) => $o(a, i, o2)), "fileFrom");
n$1((i, o2) => $o(statSync(i), i, o2), "fileFromSync");
const Do = n$1((i, o2, a = "") => new Ze([new ir({ path: o2, size: i.size, lastModified: i.mtimeMs, start: 0 })], { type: a }), "fromBlob"), $o = n$1((i, o2, a = "") => new Yr([new ir({ path: o2, size: i.size, lastModified: i.mtimeMs, start: 0 })], basename(o2), { type: a, lastModified: i.mtimeMs }), "fromFile");
const _ir = class _ir {
  constructor(o2) {
    __privateAdd(this, _e4);
    __privateAdd(this, _t3);
    __privateSet(this, _e4, o2.path), __privateSet(this, _t3, o2.start), this.size = o2.size, this.lastModified = o2.lastModified;
  }
  slice(o2, a) {
    return new _ir({ path: __privateGet(this, _e4), lastModified: this.lastModified, size: a - o2, start: __privateGet(this, _t3) + o2 });
  }
  async *stream() {
    const { mtimeMs: o2 } = await tn(__privateGet(this, _e4));
    if (o2 > this.lastModified) throw new Bs("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
    yield* createReadStream(__privateGet(this, _e4), { start: __privateGet(this, _t3), end: __privateGet(this, _t3) + this.size - 1 });
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
};
_e4 = new WeakMap();
_t3 = new WeakMap();
n$1(_ir, "BlobDataItem");
let ir = _ir;
const Is = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function Mo(i, o2) {
  return new Promise((a, l) => {
    const u = new Xe(i, o2), { parsedURL: m, options: h2 } = Es(u);
    if (!Is.has(m.protocol)) throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${m.protocol.replace(/:$/, "")}" is not supported.`);
    if (m.protocol === "data:") {
      const g = ts(u.url), V = new H(g, { headers: { "Content-Type": g.typeFull } });
      a(V);
      return;
    }
    const S = (m.protocol === "https:" ? Qa : ft).request, { signal: E } = u;
    let w = null;
    const A = n$1(() => {
      const g = new jo("The operation was aborted.");
      l(g), u.body && u.body instanceof ie.Readable && u.body.destroy(g), !(!w || !w.body) && w.body.emit("error", g);
    }, "abort");
    if (E && E.aborted) {
      A();
      return;
    }
    const T2 = n$1(() => {
      A(), q();
    }, "abortAndFinalize"), b = S(m.toString(), h2);
    E && E.addEventListener("abort", T2);
    const q = n$1(() => {
      b.abort(), E && E.removeEventListener("abort", T2);
    }, "finalize");
    b.on("error", (g) => {
      l(new te(`request to ${u.url} failed, reason: ${g.message}`, "system", g)), q();
    }), Fs(b, (g) => {
      w && w.body && w.body.destroy(g);
    }), process.version < "v14" && b.on("socket", (g) => {
      let V;
      g.prependListener("end", () => {
        V = g._eventsCount;
      }), g.prependListener("close", (I) => {
        if (w && V < g._eventsCount && !I) {
          const F = new Error("Premature close");
          F.code = "ERR_STREAM_PREMATURE_CLOSE", w.body.emit("error", F);
        }
      });
    }), b.on("response", (g) => {
      b.setTimeout(0);
      const V = ys(g.rawHeaders);
      if (Xr(g.statusCode)) {
        const O = V.get("Location");
        let z = null;
        try {
          z = O === null ? null : new URL(O, u.url);
        } catch {
          if (u.redirect !== "manual") {
            l(new te(`uri requested responds with an invalid redirect URL: ${O}`, "invalid-redirect")), q();
            return;
          }
        }
        switch (u.redirect) {
          case "error":
            l(new te(`uri requested responds with a redirect, redirect mode is set to error: ${u.url}`, "no-redirect")), q();
            return;
          case "manual":
            break;
          case "follow": {
            if (z === null) break;
            if (u.counter >= u.follow) {
              l(new te(`maximum redirect reached at: ${u.url}`, "max-redirect")), q();
              return;
            }
            const $ = { headers: new ae(u.headers), follow: u.follow, counter: u.counter + 1, agent: u.agent, compress: u.compress, method: u.method, body: Kr(u), signal: u.signal, size: u.size, referrer: u.referrer, referrerPolicy: u.referrerPolicy };
            if (!cs(u.url, z) || !ds(u.url, z)) for (const pt of ["authorization", "www-authenticate", "cookie", "cookie2"]) $.headers.delete(pt);
            if (g.statusCode !== 303 && u.body && o2.body instanceof ie.Readable) {
              l(new te("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q();
              return;
            }
            (g.statusCode === 303 || (g.statusCode === 301 || g.statusCode === 302) && u.method === "POST") && ($.method = "GET", $.body = void 0, $.headers.delete("content-length"));
            const M = Cs(V);
            M && ($.referrerPolicy = M), a(Mo(new Xe(z, $))), q();
            return;
          }
          default:
            return l(new TypeError(`Redirect option '${u.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      E && g.once("end", () => {
        E.removeEventListener("abort", T2);
      });
      let I = pipeline(g, new PassThrough(), (O) => {
        O && l(O);
      });
      process.version < "v12.10" && g.on("aborted", T2);
      const F = { url: u.url, status: g.statusCode, statusText: g.statusMessage, headers: V, size: u.size, counter: u.counter, highWaterMark: u.highWaterMark }, Q = V.get("Content-Encoding");
      if (!u.compress || u.method === "HEAD" || Q === null || g.statusCode === 204 || g.statusCode === 304) {
        w = new H(I, F), a(w);
        return;
      }
      const se = { flush: Ye.Z_SYNC_FLUSH, finishFlush: Ye.Z_SYNC_FLUSH };
      if (Q === "gzip" || Q === "x-gzip") {
        I = pipeline(I, Ye.createGunzip(se), (O) => {
          O && l(O);
        }), w = new H(I, F), a(w);
        return;
      }
      if (Q === "deflate" || Q === "x-deflate") {
        const O = pipeline(g, new PassThrough(), (z) => {
          z && l(z);
        });
        O.once("data", (z) => {
          (z[0] & 15) === 8 ? I = pipeline(I, Ye.createInflate(), ($) => {
            $ && l($);
          }) : I = pipeline(I, Ye.createInflateRaw(), ($) => {
            $ && l($);
          }), w = new H(I, F), a(w);
        }), O.once("end", () => {
          w || (w = new H(I, F), a(w));
        });
        return;
      }
      if (Q === "br") {
        I = pipeline(I, Ye.createBrotliDecompress(), (O) => {
          O && l(O);
        }), w = new H(I, F), a(w);
        return;
      }
      w = new H(I, F), a(w);
    }), ps(b, u).catch(l);
  });
}
n$1(Mo, "fetch$1");
function Fs(i, o2) {
  const a = Buffer$1.from(`0\r
\r
`);
  let l = false, u = false, m;
  i.on("response", (h2) => {
    const { headers: S } = h2;
    l = S["transfer-encoding"] === "chunked" && !S["content-length"];
  }), i.on("socket", (h2) => {
    const S = n$1(() => {
      if (l && !u) {
        const w = new Error("Premature close");
        w.code = "ERR_STREAM_PREMATURE_CLOSE", o2(w);
      }
    }, "onSocketClose"), E = n$1((w) => {
      u = Buffer$1.compare(w.slice(-5), a) === 0, !u && m && (u = Buffer$1.compare(m.slice(-3), a.slice(0, 3)) === 0 && Buffer$1.compare(w.slice(-2), a.slice(3)) === 0), m = w;
    }, "onData");
    h2.prependListener("close", S), h2.on("data", E), i.on("close", () => {
      h2.removeListener("close", S), h2.removeListener("data", E);
    });
  });
}
n$1(Fs, "fixResponseChunkedTransferBadEnding");
const Uo = /* @__PURE__ */ new WeakMap(), rn = /* @__PURE__ */ new WeakMap();
function k(i) {
  const o2 = Uo.get(i);
  return console.assert(o2 != null, "'this' is expected an Event object, but got", i), o2;
}
n$1(k, "pd");
function xo(i) {
  if (i.passiveListener != null) {
    typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
    return;
  }
  i.event.cancelable && (i.canceled = true, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
n$1(xo, "setCancelFlag");
function Je(i, o2) {
  Uo.set(this, { eventTarget: i, event: o2, eventPhase: 2, currentTarget: i, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: o2.timeStamp || Date.now() }), Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
  const a = Object.keys(o2);
  for (let l = 0; l < a.length; ++l) {
    const u = a[l];
    u in this || Object.defineProperty(this, u, No(u));
  }
}
n$1(Je, "Event"), Je.prototype = { get type() {
  return k(this).event.type;
}, get target() {
  return k(this).eventTarget;
}, get currentTarget() {
  return k(this).currentTarget;
}, composedPath() {
  const i = k(this).currentTarget;
  return i == null ? [] : [i];
}, get NONE() {
  return 0;
}, get CAPTURING_PHASE() {
  return 1;
}, get AT_TARGET() {
  return 2;
}, get BUBBLING_PHASE() {
  return 3;
}, get eventPhase() {
  return k(this).eventPhase;
}, stopPropagation() {
  const i = k(this);
  i.stopped = true, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
}, stopImmediatePropagation() {
  const i = k(this);
  i.stopped = true, i.immediateStopped = true, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
}, get bubbles() {
  return !!k(this).event.bubbles;
}, get cancelable() {
  return !!k(this).event.cancelable;
}, preventDefault() {
  xo(k(this));
}, get defaultPrevented() {
  return k(this).canceled;
}, get composed() {
  return !!k(this).event.composed;
}, get timeStamp() {
  return k(this).timeStamp;
}, get srcElement() {
  return k(this).eventTarget;
}, get cancelBubble() {
  return k(this).stopped;
}, set cancelBubble(i) {
  if (!i) return;
  const o2 = k(this);
  o2.stopped = true, typeof o2.event.cancelBubble == "boolean" && (o2.event.cancelBubble = true);
}, get returnValue() {
  return !k(this).canceled;
}, set returnValue(i) {
  i || xo(k(this));
}, initEvent() {
} }, Object.defineProperty(Je.prototype, "constructor", { value: Je, configurable: true, writable: true });
function No(i) {
  return { get() {
    return k(this).event[i];
  }, set(o2) {
    k(this).event[i] = o2;
  }, configurable: true, enumerable: true };
}
n$1(No, "defineRedirectDescriptor");
function zs(i) {
  return { value() {
    const o2 = k(this).event;
    return o2[i].apply(o2, arguments);
  }, configurable: true, enumerable: true };
}
n$1(zs, "defineCallDescriptor");
function js(i, o2) {
  const a = Object.keys(o2);
  if (a.length === 0) return i;
  function l(u, m) {
    i.call(this, u, m);
  }
  n$1(l, "CustomEvent"), l.prototype = Object.create(i.prototype, { constructor: { value: l, configurable: true, writable: true } });
  for (let u = 0; u < a.length; ++u) {
    const m = a[u];
    if (!(m in i.prototype)) {
      const S = typeof Object.getOwnPropertyDescriptor(o2, m).value == "function";
      Object.defineProperty(l.prototype, m, S ? zs(m) : No(m));
    }
  }
  return l;
}
n$1(js, "defineWrapper");
function Ho(i) {
  if (i == null || i === Object.prototype) return Je;
  let o2 = rn.get(i);
  return o2 == null && (o2 = js(Ho(Object.getPrototypeOf(i)), i), rn.set(i, o2)), o2;
}
n$1(Ho, "getWrapper");
function Ls(i, o2) {
  const a = Ho(Object.getPrototypeOf(o2));
  return new a(i, o2);
}
n$1(Ls, "wrapEvent");
function Ds(i) {
  return k(i).immediateStopped;
}
n$1(Ds, "isStopped");
function $s(i, o2) {
  k(i).eventPhase = o2;
}
n$1($s, "setEventPhase");
function Ms(i, o2) {
  k(i).currentTarget = o2;
}
n$1(Ms, "setCurrentTarget");
function Vo(i, o2) {
  k(i).passiveListener = o2;
}
n$1(Vo, "setPassiveListener");
const Qo = /* @__PURE__ */ new WeakMap(), Yo = 1, Go = 2, tr = 3;
function rr(i) {
  return i !== null && typeof i == "object";
}
n$1(rr, "isObject");
function bt(i) {
  const o2 = Qo.get(i);
  if (o2 == null) throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  return o2;
}
n$1(bt, "getListeners");
function Us(i) {
  return { get() {
    let a = bt(this).get(i);
    for (; a != null; ) {
      if (a.listenerType === tr) return a.listener;
      a = a.next;
    }
    return null;
  }, set(o2) {
    typeof o2 != "function" && !rr(o2) && (o2 = null);
    const a = bt(this);
    let l = null, u = a.get(i);
    for (; u != null; ) u.listenerType === tr ? l !== null ? l.next = u.next : u.next !== null ? a.set(i, u.next) : a.delete(i) : l = u, u = u.next;
    if (o2 !== null) {
      const m = { listener: o2, listenerType: tr, passive: false, once: false, next: null };
      l === null ? a.set(i, m) : l.next = m;
    }
  }, configurable: true, enumerable: true };
}
n$1(Us, "defineEventAttributeDescriptor");
function Zo(i, o2) {
  Object.defineProperty(i, `on${o2}`, Us(o2));
}
n$1(Zo, "defineEventAttribute");
function Ko(i) {
  function o2() {
    pe.call(this);
  }
  n$1(o2, "CustomEventTarget"), o2.prototype = Object.create(pe.prototype, { constructor: { value: o2, configurable: true, writable: true } });
  for (let a = 0; a < i.length; ++a) Zo(o2.prototype, i[a]);
  return o2;
}
n$1(Ko, "defineCustomEventTarget");
function pe() {
  if (this instanceof pe) {
    Qo.set(this, /* @__PURE__ */ new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0])) return Ko(arguments[0]);
  if (arguments.length > 0) {
    const i = new Array(arguments.length);
    for (let o2 = 0; o2 < arguments.length; ++o2) i[o2] = arguments[o2];
    return Ko(i);
  }
  throw new TypeError("Cannot call a class as a function");
}
n$1(pe, "EventTarget"), pe.prototype = { addEventListener(i, o2, a) {
  if (o2 == null) return;
  if (typeof o2 != "function" && !rr(o2)) throw new TypeError("'listener' should be a function or an object.");
  const l = bt(this), u = rr(a), h2 = (u ? !!a.capture : !!a) ? Yo : Go, S = { listener: o2, listenerType: h2, passive: u && !!a.passive, once: u && !!a.once, next: null };
  let E = l.get(i);
  if (E === void 0) {
    l.set(i, S);
    return;
  }
  let w = null;
  for (; E != null; ) {
    if (E.listener === o2 && E.listenerType === h2) return;
    w = E, E = E.next;
  }
  w.next = S;
}, removeEventListener(i, o2, a) {
  if (o2 == null) return;
  const l = bt(this), m = (rr(a) ? !!a.capture : !!a) ? Yo : Go;
  let h2 = null, S = l.get(i);
  for (; S != null; ) {
    if (S.listener === o2 && S.listenerType === m) {
      h2 !== null ? h2.next = S.next : S.next !== null ? l.set(i, S.next) : l.delete(i);
      return;
    }
    h2 = S, S = S.next;
  }
}, dispatchEvent(i) {
  if (i == null || typeof i.type != "string") throw new TypeError('"event.type" should be a string.');
  const o2 = bt(this), a = i.type;
  let l = o2.get(a);
  if (l == null) return true;
  const u = Ls(this, i);
  let m = null;
  for (; l != null; ) {
    if (l.once ? m !== null ? m.next = l.next : l.next !== null ? o2.set(a, l.next) : o2.delete(a) : m = l, Vo(u, l.passive ? l.listener : null), typeof l.listener == "function") try {
      l.listener.call(this, u);
    } catch (h2) {
      typeof console < "u" && typeof console.error == "function" && console.error(h2);
    }
    else l.listenerType !== tr && typeof l.listener.handleEvent == "function" && l.listener.handleEvent(u);
    if (Ds(u)) break;
    l = l.next;
  }
  return Vo(u, null), $s(u, 0), Ms(u, null), !u.defaultPrevented;
} }, Object.defineProperty(pe.prototype, "constructor", { value: pe, configurable: true, writable: true });
const _nr = class _nr extends pe {
  constructor() {
    throw super(), new TypeError("AbortSignal cannot be constructed directly");
  }
  get aborted() {
    const o2 = or.get(this);
    if (typeof o2 != "boolean") throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
    return o2;
  }
};
n$1(_nr, "AbortSignal");
let nr = _nr;
Zo(nr.prototype, "abort");
function xs() {
  const i = Object.create(nr.prototype);
  return pe.call(i), or.set(i, false), i;
}
n$1(xs, "createAbortSignal");
function Ns(i) {
  or.get(i) === false && (or.set(i, true), i.dispatchEvent({ type: "abort" }));
}
n$1(Ns, "abortSignal");
const or = /* @__PURE__ */ new WeakMap();
Object.defineProperties(nr.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(nr.prototype, Symbol.toStringTag, { configurable: true, value: "AbortSignal" });
let nn = (_d = class {
  constructor() {
    Jo.set(this, xs());
  }
  get signal() {
    return Xo(this);
  }
  abort() {
    Ns(Xo(this));
  }
}, n$1(_d, "AbortController"), _d);
const Jo = /* @__PURE__ */ new WeakMap();
function Xo(i) {
  const o2 = Jo.get(i);
  if (o2 == null) throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
  return o2;
}
n$1(Xo, "getSignal"), Object.defineProperties(nn.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(nn.prototype, Symbol.toStringTag, { configurable: true, value: "AbortController" });
var Hs = Object.defineProperty, Vs = n$1((i, o2) => Hs(i, "name", { value: o2, configurable: true }), "e");
const ei = Mo;
ti();
function ti() {
  var _a2, _b2, _c2, _d2;
  !((_b2 = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b2.node) && !((_d2 = (_c2 = globalThis.process) == null ? void 0 : _c2.env) == null ? void 0 : _d2.DISABLE_NODE_FETCH_NATIVE_WARN) && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
n$1(ti, "s"), Vs(ti, "checkNodeEnvironment");
const o = !!((_f = (_e5 = globalThis.process) == null ? void 0 : _e5.env) == null ? void 0 : _f.FORCE_NODE_FETCH), r = !o && globalThis.fetch || ei, n = !o && globalThis.Headers || ae, T = !o && globalThis.AbortController || nn;
class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if ((opts == null ? void 0 : opts.cause) && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  var _a2, _b2, _c2, _d2, _e6;
  const errorMessage = ((_a2 = ctx.error) == null ? void 0 : _a2.message) || ((_b2 = ctx.error) == null ? void 0 : _b2.toString()) || "";
  const method = ((_c2 = ctx.request) == null ? void 0 : _c2.method) || ((_d2 = ctx.options) == null ? void 0 : _d2.method) || "GET";
  const url = ((_e6 = ctx.request) == null ? void 0 : _e6.url) || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}
const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t2 = typeof value;
  if (t2 === "string" || t2 === "number" || t2 === "boolean" || t2 === null) {
    return true;
  }
  if (t2 !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers2) {
  const headers = mergeHeaders(
    (input == null ? void 0 : input.headers) ?? (request == null ? void 0 : request.headers),
    defaults == null ? void 0 : defaults.headers,
    Headers2
  );
  let query;
  if ((defaults == null ? void 0 : defaults.query) || (defaults == null ? void 0 : defaults.params) || (input == null ? void 0 : input.params) || (input == null ? void 0 : input.query)) {
    query = {
      ...defaults == null ? void 0 : defaults.params,
      ...defaults == null ? void 0 : defaults.query,
      ...input == null ? void 0 : input.params,
      ...input == null ? void 0 : input.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers2) {
  if (!defaults) {
    return new Headers2(input);
  }
  const headers = new Headers2(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers2(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch: fetch2 = globalThis.fetch,
    Headers: Headers2 = globalThis.Headers,
    AbortController: AbortController2 = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers2
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers2(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController2();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch2(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch2 = async function $fetch22(request, options) {
    const r2 = await $fetchRaw(request, options);
    return r2._data;
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.native = (...args) => fetch2(...args);
  $fetch2.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return r;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new ft.Agent(agentOptions);
  const httpsAgent = new Qa.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return r(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers = globalThis.Headers || n;
const AbortController$1 = globalThis.AbortController || T;
const ofetch = createFetch({ fetch, Headers, AbortController: AbortController$1 });
const $fetch = ofetch;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a2;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.6";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a2 = options.ssrContext) == null ? void 0 : _a2.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a2, _b2, _c2, _d2;
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a3;
    const unresolvedPluginsForThisPlugin = ((_a3 = plugin.dependsOn) == null ? void 0 : _a3.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.add(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins2) {
    if (((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext) && ((_b2 = plugin.env) == null ? void 0 : _b2.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins2) {
    if (((_c2 = nuxtApp.ssrContext) == null ? void 0 : _c2.islandContext) && ((_d2 = plugin.env) == null ? void 0 : _d2.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a2;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_8giHXWj2_GuuCntjIBDQpIFYKYkHitc_sB4qygi_EBM = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  manifest_45route_45rule
];
function getRouteFromPath(fullPath) {
  const route = fullPath && typeof fullPath === "object" ? fullPath : {};
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = new URL(fullPath.toString(), "http://localhost");
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: route.params || {},
    name: void 0,
    matched: route.matched || [],
    redirectedFrom: void 0,
    meta: route.meta || {},
    href: fullPath
  };
}
const router_t5pkSEllE5thmPrnzJ8kOS1Cfrqy5cLFG_lNdIAqoTo = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      "error": []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false) ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const currentRoute = computed(() => route);
    const router = {
      currentRoute,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => (void 0).history.go(-1),
      go: (delta) => (void 0).history.go(delta),
      forward: () => (void 0).history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", defineComponent({
      functional: true,
      props: {
        to: {
          type: String,
          required: true
        },
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a2;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a2 = slots.default) == null ? void 0 : _a2.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    }));
    nuxtApp._route = route;
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a2;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          {
            const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
            if (routeRules.appMiddleware) {
              for (const key in routeRules.appMiddleware) {
                const guard = nuxtApp._middleware.named[key];
                if (!guard) {
                  return;
                }
                if (routeRules.appMiddleware[key]) {
                  middlewareEntries.add(guard);
                } else {
                  middlewareEntries.delete(guard);
                }
              }
            }
          }
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`,
                  data: {
                    path: initialURL
                  }
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
function injectHead(nuxtApp) {
  var _a2;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a2 = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a2.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_np5APPjhaXbhxUi4oSA459igVCv91jCVNOQRO0ta2m0 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_8giHXWj2_GuuCntjIBDQpIFYKYkHitc_sB4qygi_EBM,
  router_t5pkSEllE5thmPrnzJ8kOS1Cfrqy5cLFG_lNdIAqoTo,
  revive_payload_server_np5APPjhaXbhxUi4oSA459igVCv91jCVNOQRO0ta2m0,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const HeadComponentCtxSymbol = Symbol("head-component");
const TagPositionProps = {
  /**
   * @deprecated Use tagPosition
   */
  body: { type: Boolean, default: void 0 },
  tagPosition: { type: String }
};
const normalizeProps = (_props) => {
  const props = Object.fromEntries(
    Object.entries(_props).filter(([_, value]) => value !== void 0)
  );
  if (typeof props.body !== "undefined") {
    props.tagPosition = props.body ? "bodyClose" : "head";
  }
  if (typeof props.renderPriority !== "undefined") {
    props.tagPriority = props.renderPriority;
  }
  return props;
};
function useHeadComponentCtx() {
  return inject(HeadComponentCtxSymbol, createHeadComponentCtx, true);
}
function createHeadComponentCtx() {
  const prev = inject(HeadComponentCtxSymbol, null);
  if (prev) {
    return prev;
  }
  const input = reactive({});
  const entry2 = useHead(input);
  const ctx = { input, entry: entry2 };
  provide(HeadComponentCtxSymbol, ctx);
  return ctx;
}
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: { type: [String, Object, Array], default: void 0 },
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: { type: [String, Object, Array], default: void 0 },
  tabindex: String,
  title: String,
  translate: String,
  /**
   * @deprecated Use tagPriority
   */
  renderPriority: [String, Number],
  /**
   * Unhead prop to modify the priority of the tag.
   */
  tagPriority: { type: [String, Number] }
};
defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    title: String
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.noscript || (input.noscript = []);
    const idx = input.noscript.push({}) - 1;
    return () => {
      var _a2;
      const noscript = normalizeProps(props);
      const slotVnodes = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      const textContent = slotVnodes ? slotVnodes.filter(({ children }) => children).map(({ children }) => children).join("") : "";
      if (textContent) {
        noscript.innerHTML = textContent;
      }
      input.noscript[idx] = noscript;
      return null;
    };
  }
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    /** @deprecated **/
    methods: String,
    /** @deprecated **/
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.link || (input.link = []);
    const idx = input.link.push({}) - 1;
    return () => {
      input.link[idx] = normalizeProps(props);
      return null;
    };
  }
});
defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    return () => {
      input.base = normalizeProps(props);
      return null;
    };
  }
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup(_, { slots }) {
    const { input } = useHeadComponentCtx();
    return () => {
      var _a2, _b2, _c2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      input.title = ((_b2 = defaultSlot == null ? void 0 : defaultSlot[0]) == null ? void 0 : _b2.children) ? String((_c2 = defaultSlot == null ? void 0 : defaultSlot[0]) == null ? void 0 : _c2.children) : void 0;
      return null;
    };
  }
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String,
    property: String
  },
  setup(props) {
    const { input } = useHeadComponentCtx();
    input.meta || (input.meta = []);
    const idx = input.meta.push({}) - 1;
    return () => {
      const meta = { "http-equiv": props.httpEquiv, ...normalizeProps(props) };
      if ("httpEquiv" in meta) {
        delete meta.httpEquiv;
      }
      input.meta[idx] = meta;
      return null;
    };
  }
});
defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    ...TagPositionProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    /** @deprecated **/
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, { slots }) {
    const { input } = useHeadComponentCtx();
    input.style || (input.style = []);
    const idx = input.style.push({}) - 1;
    return () => {
      var _a2, _b2, _c2;
      const style = normalizeProps(props);
      const textContent = (_c2 = (_b2 = (_a2 = slots.default) == null ? void 0 : _a2.call(slots)) == null ? void 0 : _b2[0]) == null ? void 0 : _c2.children;
      if (textContent) {
        input.style[idx] = style;
        style.textContent = textContent;
      }
      return null;
    };
  }
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => {
    createHeadComponentCtx();
    return () => {
      var _a2, _b2;
      return (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2);
    };
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      var _a2, _b2;
      input.htmlAttrs = { ..._props, ...ctx.attrs };
      return (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2);
    };
  }
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup(_props, ctx) {
    const { input } = useHeadComponentCtx();
    return () => {
      var _a2, _b2;
      input.bodyAttrs = { ..._props, ...ctx.attrs };
      return (_b2 = (_a2 = ctx.slots).default) == null ? void 0 : _b2.call(_a2);
    };
  }
});
const QuoteKind = {
  Fact: "Fact",
  Opinion: "Opinion"
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DisplayPrismaEnums",
  __ssrInlineRender: true,
  setup(__props) {
    const mounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-2xl mx-auto" }, _attrs))}><div class="border-4 border-dashed border-red-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 text-xs text-yellow-800 dark:text-yellow-200 shadow-sm"><div class="mb-2 font-semibold text-center"> Debug Info: Prisma Enums (Client Side) </div><div class="mb-1 text-center"> Rendered on client? <span class="font-mono">${ssrInterpolate(unref(mounted) ? "Yes" : "No")}</span></div><div class="mb-2 text-center"><span class="font-semibold"> QuoteKind Enum: ${ssrInterpolate(unref(QuoteKind).Fact)}; ${ssrInterpolate(unref(QuoteKind).Opinion)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DisplayPrismaEnums.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Quotes",
  __ssrInlineRender: true,
  props: {
    quotes: {}
  },
  setup(__props) {
    const props = __props;
    const opinions = computed(() => props.quotes.filter((quote) => quote.kind === QuoteKind.Opinion));
    const facts = computed(() => props.quotes.filter((quote) => quote.kind === QuoteKind.Fact));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-6xl mx-auto space-y-12" }, _attrs))}><div class="text-center mb-8"><p class="text-lg text-slate-600 dark:text-slate-300"> Found ${ssrInterpolate(_ctx.quotes.length)} quotes total • ${ssrInterpolate(unref(opinions).length)} opinions • ${ssrInterpolate(unref(facts).length)} facts </p></div><section><div class="flex items-center gap-3 mb-6"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900"><span class="text-2xl">💭</span></div><h2 class="text-2xl font-bold text-slate-800 dark:text-white"> Opinions (${ssrInterpolate(unref(opinions).length)}) </h2></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(opinions), (quote) => {
        _push(`<div class="group p-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"><div class="flex items-start gap-3"><span class="text-blue-500 dark:text-blue-400 text-2xl shrink-0"> &quot; </span><div class="flex-1"><p class="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">${ssrInterpolate(quote.quote)}</p><div class="flex items-center justify-between text-xs"><span class="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-medium"> Opinion </span><span class="text-slate-500 dark:text-slate-400"> #${ssrInterpolate(quote.id)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div></section><section><div class="flex items-center gap-3 mb-6"><div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900"><span class="text-2xl">🧠</span></div><h2 class="text-2xl font-bold text-slate-800 dark:text-white"> Facts (${ssrInterpolate(unref(facts).length)}) </h2></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(facts), (quote) => {
        _push(`<div class="group p-6 rounded-xl border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"><div class="flex items-start gap-3"><span class="text-green-500 dark:text-green-400 text-2xl shrink-0"> ✓ </span><div class="flex-1"><p class="text-slate-700 dark:text-slate-200 leading-relaxed mb-3">${ssrInterpolate(quote.quote)}</p><div class="flex items-center justify-between text-xs"><span class="px-2 py-1 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-medium"> Fact </span><span class="text-slate-500 dark:text-slate-400"> #${ssrInterpolate(quote.id)}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Quotes.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-6xl mx-auto space-y-12" }, _attrs))}><div class="text-center mb-8"><div class="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-64 mx-auto animate-pulse"></div></div><section><div class="flex items-center gap-3 mb-6"><div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div><div class="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-32 animate-pulse"></div></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
  ssrRenderList(6, (i) => {
    _push(`<div class="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"><div class="space-y-3"><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div><div class="flex justify-between items-center pt-2"><div class="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8 animate-pulse"></div></div></div></div>`);
  });
  _push(`<!--]--></div></section><section><div class="flex items-center gap-3 mb-6"><div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div><div class="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-24 animate-pulse"></div></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
  ssrRenderList(6, (i) => {
    _push(`<div class="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"><div class="space-y-3"><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3"></div><div class="flex justify-between items-center pt-2"><div class="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-12 animate-pulse"></div><div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8 animate-pulse"></div></div></div></div>`);
  });
  _push(`<!--]--></div></section></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuotesLoading.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var shared_cjs_prod = {};
var hasRequiredShared_cjs_prod;
function requireShared_cjs_prod() {
  if (hasRequiredShared_cjs_prod) return shared_cjs_prod;
  hasRequiredShared_cjs_prod = 1;
  /**
  * @vue/shared v3.5.17
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **/
  Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
  /*! #__NO_SIDE_EFFECTS__ */
  // @__NO_SIDE_EFFECTS__
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(",")) map[key] = 1;
    return (val) => val in map;
  }
  const EMPTY_OBJ = {};
  const EMPTY_ARR = [];
  const NOOP = () => {
  };
  const NO = () => false;
  const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  const isModelListener = (key) => key.startsWith("onUpdate:");
  const extend = Object.assign;
  const remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isMap = (val) => toTypeString(val) === "[object Map]";
  const isSet = (val) => toTypeString(val) === "[object Set]";
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction(
    (str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    }
  );
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  const toHandlerKey = cacheStringFunction(
    (str) => {
      const s = str ? `on${capitalize(str)}` : ``;
      return s;
    }
  );
  const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  const invokeArrayFns = (fns, ...arg) => {
    for (let i = 0; i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  const def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  const looseToNumber = (val) => {
    const n2 = parseFloat(val);
    return isNaN(n2) ? val : n2;
  };
  const toNumber = (val) => {
    const n2 = isString(val) ? Number(val) : NaN;
    return isNaN(n2) ? val : n2;
  };
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
  };
  const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
  function genPropsAccessExp(name) {
    return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
  }
  function genCacheKey(source, options) {
    return source + JSON.stringify(
      options,
      (_, val) => typeof val === "function" ? val.toString() : val
    );
  }
  const PatchFlags = {
    "TEXT": 1,
    "1": "TEXT",
    "CLASS": 2,
    "2": "CLASS",
    "STYLE": 4,
    "4": "STYLE",
    "PROPS": 8,
    "8": "PROPS",
    "FULL_PROPS": 16,
    "16": "FULL_PROPS",
    "NEED_HYDRATION": 32,
    "32": "NEED_HYDRATION",
    "STABLE_FRAGMENT": 64,
    "64": "STABLE_FRAGMENT",
    "KEYED_FRAGMENT": 128,
    "128": "KEYED_FRAGMENT",
    "UNKEYED_FRAGMENT": 256,
    "256": "UNKEYED_FRAGMENT",
    "NEED_PATCH": 512,
    "512": "NEED_PATCH",
    "DYNAMIC_SLOTS": 1024,
    "1024": "DYNAMIC_SLOTS",
    "DEV_ROOT_FRAGMENT": 2048,
    "2048": "DEV_ROOT_FRAGMENT",
    "CACHED": -1,
    "-1": "CACHED",
    "BAIL": -2,
    "-2": "BAIL"
  };
  const PatchFlagNames = {
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `NEED_HYDRATION`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `CACHED`,
    [-2]: `BAIL`
  };
  const ShapeFlags = {
    "ELEMENT": 1,
    "1": "ELEMENT",
    "FUNCTIONAL_COMPONENT": 2,
    "2": "FUNCTIONAL_COMPONENT",
    "STATEFUL_COMPONENT": 4,
    "4": "STATEFUL_COMPONENT",
    "TEXT_CHILDREN": 8,
    "8": "TEXT_CHILDREN",
    "ARRAY_CHILDREN": 16,
    "16": "ARRAY_CHILDREN",
    "SLOTS_CHILDREN": 32,
    "32": "SLOTS_CHILDREN",
    "TELEPORT": 64,
    "64": "TELEPORT",
    "SUSPENSE": 128,
    "128": "SUSPENSE",
    "COMPONENT_SHOULD_KEEP_ALIVE": 256,
    "256": "COMPONENT_SHOULD_KEEP_ALIVE",
    "COMPONENT_KEPT_ALIVE": 512,
    "512": "COMPONENT_KEPT_ALIVE",
    "COMPONENT": 6,
    "6": "COMPONENT"
  };
  const SlotFlags = {
    "STABLE": 1,
    "1": "STABLE",
    "DYNAMIC": 2,
    "2": "DYNAMIC",
    "FORWARDED": 3,
    "3": "FORWARDED"
  };
  const slotFlagsText = {
    [1]: "STABLE",
    [2]: "DYNAMIC",
    [3]: "FORWARDED"
  };
  const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol";
  const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
  const isGloballyWhitelisted = isGloballyAllowed;
  const range = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    start = Math.max(0, Math.min(start, source.length));
    end = Math.max(0, Math.min(end, source.length));
    if (start > end) return "";
    let lines = source.split(/(\r?\n)/);
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_, idx) => idx % 2 === 0);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
      if (count >= start) {
        for (let j2 = i - range; j2 <= i + range || end > count; j2++) {
          if (j2 < 0 || j2 >= lines.length) continue;
          const line = j2 + 1;
          res.push(
            `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j2]}`
          );
          const lineLength = lines[j2].length;
          const newLineSeqLength = newlineSequences[j2] && newlineSequences[j2].length || 0;
          if (j2 === i) {
            const pad = start - (count - (lineLength + newLineSeqLength));
            const length = Math.max(
              1,
              end > count ? lineLength - pad : end - start
            );
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j2 > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + newLineSeqLength;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function stringifyStyle(styles) {
    if (!styles) return "";
    if (isString(styles)) return styles;
    let ret = "";
    for (const key in styles) {
      const value = styles[key];
      if (isString(value) || typeof value === "number") {
        const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
        ret += `${normalizedKey}:${value};`;
      }
    }
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  function normalizeProps2(props) {
    if (!props) return null;
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (style) {
      props.style = normalizeStyle(style);
    }
    return props;
  }
  const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  const MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
  const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
  const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  const isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
  const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
  const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  const isBooleanAttr = /* @__PURE__ */ makeMap(
    specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
  );
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
  const attrValidationCache = {};
  function isSSRSafeAttrName(name) {
    if (attrValidationCache.hasOwnProperty(name)) {
      return attrValidationCache[name];
    }
    const isUnsafe = unsafeAttrCharRE.test(name);
    if (isUnsafe) {
      console.error(`unsafe attribute name: ${name}`);
    }
    return attrValidationCache[name] = !isUnsafe;
  }
  const propsToAttrMap = {
    acceptCharset: "accept-charset",
    className: "class",
    htmlFor: "for",
    httpEquiv: "http-equiv"
  };
  const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
    `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
  );
  const isKnownSvgAttr = /* @__PURE__ */ makeMap(
    `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
  );
  const isKnownMathMLAttr = /* @__PURE__ */ makeMap(
    `accent,accentunder,actiontype,align,alignmentscope,altimg,altimg-height,altimg-valign,altimg-width,alttext,bevelled,close,columnsalign,columnlines,columnspan,denomalign,depth,dir,display,displaystyle,encoding,equalcolumns,equalrows,fence,fontstyle,fontweight,form,frame,framespacing,groupalign,height,href,id,indentalign,indentalignfirst,indentalignlast,indentshift,indentshiftfirst,indentshiftlast,indextype,justify,largetop,largeop,lquote,lspace,mathbackground,mathcolor,mathsize,mathvariant,maxsize,minlabelspacing,mode,other,overflow,position,rowalign,rowlines,rowspan,rquote,rspace,scriptlevel,scriptminsize,scriptsizemultiplier,selection,separator,separators,shift,side,src,stackalign,stretchy,subscriptshift,superscriptshift,symmetric,voffset,width,widths,xlink:href,xlink:show,xlink:type,xmlns`
  );
  function isRenderableAttrValue(value) {
    if (value == null) {
      return false;
    }
    const type = typeof value;
    return type === "string" || type === "number" || type === "boolean";
  }
  const escapeRE = /["'&<>]/;
  function escapeHtml(string) {
    const str = "" + string;
    const match = escapeRE.exec(str);
    if (!match) {
      return str;
    }
    let html = "";
    let escaped;
    let index;
    let lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          escaped = "&quot;";
          break;
        case 38:
          escaped = "&amp;";
          break;
        case 39:
          escaped = "&#39;";
          break;
        case 60:
          escaped = "&lt;";
          break;
        case 62:
          escaped = "&gt;";
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html += str.slice(lastIndex, index);
      }
      lastIndex = index + 1;
      html += escaped;
    }
    return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
  }
  const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
  function escapeHtmlComment(src) {
    return src.replace(commentStripRE, "");
  }
  const cssVarNameEscapeSymbolsRE = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
  function getEscapedCssVarName(key, doubleEscape) {
    return key.replace(
      cssVarNameEscapeSymbolsRE,
      (s) => doubleEscape ? s === '"' ? '\\\\\\"' : `\\\\${s}` : `\\${s}`
    );
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length) return false;
    let equal = true;
    for (let i = 0; equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b) return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  function looseIndexOf(arr, val) {
    return arr.findIndex((item) => looseEqual(item, val));
  }
  const isRef2 = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  const toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef2(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  const replacer = (_key, val) => {
    if (isRef2(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce(
          (entries, [key, val2], i) => {
            entries[stringifySymbol(key, i) + " =>"] = val2;
            return entries;
          },
          {}
        )
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  const stringifySymbol = (v, i = "") => {
    var _a2;
    return (
      // Symbol.description in es2019+ so we need to cast here to pass
      // the lib: es2016 check
      isSymbol(v) ? `Symbol(${(_a2 = v.description) != null ? _a2 : i})` : v
    );
  };
  shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
  shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
  shared_cjs_prod.NO = NO;
  shared_cjs_prod.NOOP = NOOP;
  shared_cjs_prod.PatchFlagNames = PatchFlagNames;
  shared_cjs_prod.PatchFlags = PatchFlags;
  shared_cjs_prod.ShapeFlags = ShapeFlags;
  shared_cjs_prod.SlotFlags = SlotFlags;
  shared_cjs_prod.camelize = camelize;
  shared_cjs_prod.capitalize = capitalize;
  shared_cjs_prod.cssVarNameEscapeSymbolsRE = cssVarNameEscapeSymbolsRE;
  shared_cjs_prod.def = def;
  shared_cjs_prod.escapeHtml = escapeHtml;
  shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
  shared_cjs_prod.extend = extend;
  shared_cjs_prod.genCacheKey = genCacheKey;
  shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
  shared_cjs_prod.generateCodeFrame = generateCodeFrame;
  shared_cjs_prod.getEscapedCssVarName = getEscapedCssVarName;
  shared_cjs_prod.getGlobalThis = getGlobalThis;
  shared_cjs_prod.hasChanged = hasChanged;
  shared_cjs_prod.hasOwn = hasOwn;
  shared_cjs_prod.hyphenate = hyphenate;
  shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
  shared_cjs_prod.invokeArrayFns = invokeArrayFns;
  shared_cjs_prod.isArray = isArray;
  shared_cjs_prod.isBooleanAttr = isBooleanAttr;
  shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
  shared_cjs_prod.isDate = isDate;
  shared_cjs_prod.isFunction = isFunction;
  shared_cjs_prod.isGloballyAllowed = isGloballyAllowed;
  shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
  shared_cjs_prod.isHTMLTag = isHTMLTag;
  shared_cjs_prod.isIntegerKey = isIntegerKey;
  shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
  shared_cjs_prod.isKnownMathMLAttr = isKnownMathMLAttr;
  shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
  shared_cjs_prod.isMap = isMap;
  shared_cjs_prod.isMathMLTag = isMathMLTag;
  shared_cjs_prod.isModelListener = isModelListener;
  shared_cjs_prod.isObject = isObject;
  shared_cjs_prod.isOn = isOn;
  shared_cjs_prod.isPlainObject = isPlainObject;
  shared_cjs_prod.isPromise = isPromise;
  shared_cjs_prod.isRegExp = isRegExp;
  shared_cjs_prod.isRenderableAttrValue = isRenderableAttrValue;
  shared_cjs_prod.isReservedProp = isReservedProp;
  shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
  shared_cjs_prod.isSVGTag = isSVGTag;
  shared_cjs_prod.isSet = isSet;
  shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
  shared_cjs_prod.isString = isString;
  shared_cjs_prod.isSymbol = isSymbol;
  shared_cjs_prod.isVoidTag = isVoidTag;
  shared_cjs_prod.looseEqual = looseEqual;
  shared_cjs_prod.looseIndexOf = looseIndexOf;
  shared_cjs_prod.looseToNumber = looseToNumber;
  shared_cjs_prod.makeMap = makeMap;
  shared_cjs_prod.normalizeClass = normalizeClass;
  shared_cjs_prod.normalizeProps = normalizeProps2;
  shared_cjs_prod.normalizeStyle = normalizeStyle;
  shared_cjs_prod.objectToString = objectToString;
  shared_cjs_prod.parseStringStyle = parseStringStyle;
  shared_cjs_prod.propsToAttrMap = propsToAttrMap;
  shared_cjs_prod.remove = remove;
  shared_cjs_prod.slotFlagsText = slotFlagsText;
  shared_cjs_prod.stringifyStyle = stringifyStyle;
  shared_cjs_prod.toDisplayString = toDisplayString;
  shared_cjs_prod.toHandlerKey = toHandlerKey;
  shared_cjs_prod.toNumber = toNumber;
  shared_cjs_prod.toRawType = toRawType;
  shared_cjs_prod.toTypeString = toTypeString;
  return shared_cjs_prod;
}
var shared_cjs_prodExports = /* @__PURE__ */ requireShared_cjs_prod();
function useRequestEvent(nuxtApp) {
  var _a2;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
function useRequestFetch() {
  var _a2;
  return ((_a2 = useRequestEvent()) == null ? void 0 : _a2.$fetch) || globalThis.$fetch;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a2;
      if (mounted.value) {
        const vnodes = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ?? (options.server = true);
  options.default ?? (options.default = getDefault);
  options.getCachedData ?? (options.getCachedData = getDefaultCachedData);
  options.lazy ?? (options.lazy = false);
  options.immediate ?? (options.immediate = true);
  options.deep ?? (options.deep = asyncDataDefaults.deep);
  options.dedupe ?? (options.dedupe = "cancel");
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
  if (!((_a2 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a2._init)) {
    initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
    nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
  }
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const initialFetch = () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => {
      var _a3;
      return (_a3 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a3.data;
    }),
    pending: writableComputedRef(() => {
      var _a3;
      return (_a3 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a3.pending;
    }),
    status: writableComputedRef(() => {
      var _a3;
      return (_a3 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a3.status;
    }),
    error: writableComputedRef(() => {
      var _a3;
      return (_a3 = nuxtApp._asyncData[key.value]) == null ? void 0 : _a3.error;
    }),
    refresh: (...args2) => nuxtApp._asyncData[key.value].execute(...args2),
    execute: (...args2) => nuxtApp._asyncData[key.value].execute(...args2),
    clear: () => clearNuxtDataByKey(nuxtApp, key.value)
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      var _a2;
      return (_a2 = getter()) == null ? void 0 : _a2.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  var _a2;
  (_a2 = nuxtApp.payload._errors)[key] ?? (_a2[key] = asyncDataDefaults.errorValue);
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (opts = {}) => {
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer(opts.dedupe ?? options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
        nuxtApp._asyncDataPromises[key].cancelled = true;
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      asyncData.status.value = "pending";
      const promise = new Promise(
        (resolve, reject) => {
          try {
            resolve(handler(nuxtApp));
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        if (promise.cancelled) {
          return nuxtApp._asyncDataPromises[key];
        }
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (promise.cancelled) {
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        if (promise.cancelled) {
          return;
        }
        {
          asyncData.pending.value = false;
        }
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      var _a3;
      unsubRefreshAsyncData();
      if ((_a3 = nuxtApp._asyncData[key]) == null ? void 0 : _a3._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          var _a4;
          if (!((_a4 = nuxtApp._asyncData[key]) == null ? void 0 : _a4._init)) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  let controller;
  const asyncData = useAsyncData(watchSources === false ? key.value : key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = [{}, arg1];
  return useFetch(
    request,
    {
      ...opts,
      lazy: true
    },
    // @ts-expect-error we pass an extra argument with the resolved auto-key to prevent another from being injected
    autoKey
  );
}
function generateOptionSegments(opts) {
  var _a2;
  const segments = [
    ((_a2 = toValue(opts.method)) == null ? void 0 : _a2.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k2, v]) => [k2, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry2 of value.entries()) {
        const [key, val] = entry2;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (shared_cjs_prodExports.isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: quotes } = ([__temp, __restore] = withAsyncContext(() => useLazyFetch("/api/quotes", "$aTUEVnxcOx")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Meta = Meta;
      const _component_Title = Title;
      const _component_Link = Link;
      const _component_Body = Body;
      const _component_DisplayPrismaEnums = _sfc_main$5;
      const _component_Quotes = _sfc_main$4;
      const _component_QuotesLoading = __nuxt_component_8;
      _push(ssrRenderComponent(_component_Html, mergeProps({ lang: "en" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Meta, { charset: "utf-8" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Meta, {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`New Nuxt App`);
                      } else {
                        return [
                          createTextVNode("New Nuxt App")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Meta, {
                    name: "description",
                    content: "Welcome to Nuxt!"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Link, {
                    rel: "preconnect",
                    href: "https://fonts.googleapis.com"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Link, {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "anonymous"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_Link, {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_Meta, { charset: "utf-8" }),
                    createVNode(_component_Meta, {
                      name: "viewport",
                      content: "width=device-width, initial-scale=1"
                    }),
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode("New Nuxt App")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Meta, {
                      name: "description",
                      content: "Welcome to Nuxt!"
                    }),
                    createVNode(_component_Link, {
                      rel: "preconnect",
                      href: "https://fonts.googleapis.com"
                    }),
                    createVNode(_component_Link, {
                      rel: "preconnect",
                      href: "https://fonts.gstatic.com",
                      crossorigin: "anonymous"
                    }),
                    createVNode(_component_Link, {
                      rel: "stylesheet",
                      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Body, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<main class="flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900"${_scopeId2}><div class="text-center mb-12"${_scopeId2}><h1 class="text-2xl font-bold text-slate-800 dark:text-white mb-4"${_scopeId2}> Stack: Nuxt, Vue, Node.js<pre class="inline-block"${_scopeId2}>prisma-client</pre></h1><p class="text-xl text-slate-600 dark:text-slate-300"${_scopeId2}> A collection of inspiring opinions and fascinating facts </p></div><div class="text-center mb-12"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_DisplayPrismaEnums, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  ssrRenderSuspense(_push3, {
                    fallback: () => {
                      _push3(ssrRenderComponent(_component_QuotesLoading, null, null, _parent3, _scopeId2));
                    },
                    default: () => {
                      _push3(ssrRenderComponent(_component_Quotes, {
                        quotes: unref(quotes) || []
                      }, null, _parent3, _scopeId2));
                    },
                    _: 1
                  });
                  _push3(`</main>`);
                } else {
                  return [
                    createVNode("main", { class: "flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900" }, [
                      createVNode("div", { class: "text-center mb-12" }, [
                        createVNode("h1", { class: "text-2xl font-bold text-slate-800 dark:text-white mb-4" }, [
                          createTextVNode(" Stack: Nuxt, Vue, Node.js"),
                          createVNode("pre", { class: "inline-block" }, "prisma-client")
                        ]),
                        createVNode("p", { class: "text-xl text-slate-600 dark:text-slate-300" }, " A collection of inspiring opinions and fascinating facts ")
                      ]),
                      createVNode("div", { class: "text-center mb-12" }, [
                        createVNode(_component_DisplayPrismaEnums)
                      ]),
                      (openBlock(), createBlock(Suspense, null, {
                        fallback: withCtx(() => [
                          createVNode(_component_QuotesLoading)
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_Quotes, {
                            quotes: unref(quotes) || []
                          }, null, 8, ["quotes"])
                        ]),
                        _: 1
                      }))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Head, null, {
                default: withCtx(() => [
                  createVNode(_component_Meta, { charset: "utf-8" }),
                  createVNode(_component_Meta, {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                  }),
                  createVNode(_component_Title, null, {
                    default: withCtx(() => [
                      createTextVNode("New Nuxt App")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_Meta, {
                    name: "description",
                    content: "Welcome to Nuxt!"
                  }),
                  createVNode(_component_Link, {
                    rel: "preconnect",
                    href: "https://fonts.googleapis.com"
                  }),
                  createVNode(_component_Link, {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "anonymous"
                  }),
                  createVNode(_component_Link, {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_Body, null, {
                default: withCtx(() => [
                  createVNode("main", { class: "flex min-h-screen flex-col items-center justify-start p-8 md:p-24 bg-white dark:bg-slate-900" }, [
                    createVNode("div", { class: "text-center mb-12" }, [
                      createVNode("h1", { class: "text-2xl font-bold text-slate-800 dark:text-white mb-4" }, [
                        createTextVNode(" Stack: Nuxt, Vue, Node.js"),
                        createVNode("pre", { class: "inline-block" }, "prisma-client")
                      ]),
                      createVNode("p", { class: "text-xl text-slate-600 dark:text-slate-300" }, " A collection of inspiring opinions and fascinating facts ")
                    ]),
                    createVNode("div", { class: "text-center mb-12" }, [
                      createVNode(_component_DisplayPrismaEnums)
                    ]),
                    (openBlock(), createBlock(Suspense, null, {
                      fallback: withCtx(() => [
                        createVNode(_component_QuotesLoading)
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_Quotes, {
                          quotes: unref(quotes) || []
                        }, null, 8, ["quotes"])
                      ]),
                      _: 1
                    }))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-D_W6R98A.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-DlzqiCcO.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.17.6_@vue+compiler-sfc@3.5.17_typescript@5.8.3_vite@7.0.2/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.17.6_@vue+compiler-sfc@3.5.17_typescript@5.8.3_vite@7.0.2/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a2;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a2 = nuxt.payload).error || (_a2.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { Yr as Y, Zt as Z, _export_sfc as _, useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, useHead as d, entry$1 as default, navigateTo as n, resolveRouteObject as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
