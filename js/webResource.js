/*
 For license information please see wppconnect-wa.js.LICENSE.txt  wppconnect-team/wa-js v3.15.1 */
"use strict";
(() => {
  function S(l) {
    var a = ca[l];
    if (void 0 !== a) return a.exports;
    a = ca[l] = { exports: {} };
    return Y[l].call(a.exports, a, a.exports, S), a.exports;
  }
  var Y = {
      67526: (l, a) => {
        function b(e) {
          var d = e.length;
          if (d % 4 > 0)
            throw Error("Invalid string. Length must be a multiple of 4");
          e = e.indexOf("=");
          return -1 === e && (e = d), [e, e === d ? 0 : 4 - (e % 4)];
        }
        a.byteLength = function (e) {
          e = b(e);
          var d = e[1];
          return (3 * (e[0] + d)) / 4 - d;
        };
        a.toByteArray = function (e) {
          var d = b(e);
          var c = d[0];
          d = d[1];
          var g = new h((3 * (c + d)) / 4 - d),
            m = 0,
            n = d > 0 ? c - 4 : c;
          for (c = 0; c < n; c += 4) {
            var p =
              (k[e.charCodeAt(c)] << 18) |
              (k[e.charCodeAt(c + 1)] << 12) |
              (k[e.charCodeAt(c + 2)] << 6) |
              k[e.charCodeAt(c + 3)];
            g[m++] = (p >> 16) & 255;
            g[m++] = (p >> 8) & 255;
            g[m++] = 255 & p;
          }
          2 === d &&
            ((p = (k[e.charCodeAt(c)] << 2) | (k[e.charCodeAt(c + 1)] >> 4)),
            (g[m++] = 255 & p));
          1 === d &&
            ((p =
              (k[e.charCodeAt(c)] << 10) |
              (k[e.charCodeAt(c + 1)] << 4) |
              (k[e.charCodeAt(c + 2)] >> 2)),
            (g[m++] = (p >> 8) & 255),
            (g[m++] = 255 & p));
          return g;
        };
        a.fromByteArray = function (e) {
          for (
            var d, c = e.length, g = c % 3, m = [], n = 0, p = c - g;
            n < p;
            n += 16383
          ) {
            var r = m,
              t = r.push;
            var v = void 0;
            for (
              var x, B = e, F = n + 16383 > p ? p : n + 16383, L = [], J = n;
              J < F;
              J += 3
            )
              (x =
                ((B[J] << 16) & 16711680) +
                ((B[J + 1] << 8) & 65280) +
                (255 & B[J + 2])),
                L.push(
                  f[((v = x) >> 18) & 63] +
                    f[(v >> 12) & 63] +
                    f[(v >> 6) & 63] +
                    f[63 & v]
                );
            v = L.join("");
            t.call(r, v);
          }
          1 === g
            ? ((d = e[c - 1]), m.push(f[d >> 2] + f[(d << 4) & 63] + "=="))
            : 2 === g &&
              ((d = (e[c - 2] << 8) + e[c - 1]),
              m.push(f[d >> 10] + f[(d >> 4) & 63] + f[(d << 2) & 63] + "="));
          return m.join("");
        };
        var f = [],
          k = [],
          h = "undefined" != typeof Uint8Array ? Uint8Array : Array;
        for (l = 0; l < 64; ++l)
          (f[l] =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[
              l
            ]),
            (k[
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt(
                l
              )
            ] = l);
        k[45] = 62;
        k[95] = 63;
      },
      48287: (l, a, b) => {
        function f(q) {
          if (q > 2147483647)
            throw new RangeError(
              'The value "' + q + '" is invalid for option "size"'
            );
          q = new Uint8Array(q);
          return Object.setPrototypeOf(q, k.prototype), q;
        }
        function k(q, u, w) {
          if ("number" == typeof q) {
            if ("string" == typeof u)
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            return d(q);
          }
          return h(q, u, w);
        }
        function h(q, u, w) {
          if ("string" == typeof q)
            return (function (E, Q) {
              ("string" == typeof Q && "" !== Q) || (Q = "utf8");
              if (!k.isEncoding(Q))
                throw new TypeError("Unknown encoding: " + Q);
              const U = 0 | n(E, Q);
              let aa = f(U);
              E = aa.write(E, Q);
              E !== U && (aa = aa.slice(0, E));
              return aa;
            })(q, u);
          if (ArrayBuffer.isView(q))
            return (function (E) {
              return y(E, Uint8Array)
                ? ((E = new Uint8Array(E)),
                  g(E.buffer, E.byteOffset, E.byteLength))
                : c(E);
            })(q);
          if (null == q)
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                typeof q
            );
          if (
            y(q, ArrayBuffer) ||
            (q && y(q.buffer, ArrayBuffer)) ||
            ("undefined" != typeof SharedArrayBuffer &&
              (y(q, SharedArrayBuffer) ||
                (q && y(q.buffer, SharedArrayBuffer))))
          )
            return g(q, u, w);
          if ("number" == typeof q)
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          var z = q.valueOf && q.valueOf();
          if (null != z && z !== q) return k.from(z, u, w);
          if (
            (z = (function (E) {
              if (k.isBuffer(E)) {
                var Q = 0 | m(E.length);
                const U = f(Q);
                return 0 === U.length || E.copy(U, 0, 0, Q), U;
              }
              if (void 0 !== E.length)
                return (
                  (Q = "number" != typeof E.length) ||
                    ((Q = E.length), (Q = Q != Q)),
                  Q ? f(0) : c(E)
                );
              if ("Buffer" === E.type && Array.isArray(E.data))
                return c(E.data);
            })(q))
          )
            return z;
          if (
            "undefined" != typeof Symbol &&
            null != Symbol.toPrimitive &&
            "function" == typeof q[Symbol.toPrimitive]
          )
            return k.from(q[Symbol.toPrimitive]("string"), u, w);
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof q
          );
        }
        function e(q) {
          if ("number" != typeof q)
            throw new TypeError('"size" argument must be of type number');
          if (q < 0)
            throw new RangeError(
              'The value "' + q + '" is invalid for option "size"'
            );
        }
        function d(q) {
          return e(q), f(q < 0 ? 0 : 0 | m(q));
        }
        function c(q) {
          const u = q.length < 0 ? 0 : 0 | m(q.length),
            w = f(u);
          for (let z = 0; z < u; z += 1) w[z] = 255 & q[z];
          return w;
        }
        function g(q, u, w) {
          if (u < 0 || q.byteLength < u)
            throw new RangeError('"offset" is outside of buffer bounds');
          if (q.byteLength < u + (w || 0))
            throw new RangeError('"length" is outside of buffer bounds');
          let z;
          return (
            (z =
              void 0 === u && void 0 === w
                ? new Uint8Array(q)
                : void 0 === w
                ? new Uint8Array(q, u)
                : new Uint8Array(q, u, w)),
            Object.setPrototypeOf(z, k.prototype),
            z
          );
        }
        function m(q) {
          if (q >= 2147483647)
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                (2147483647).toString(16) +
                " bytes"
            );
          return 0 | q;
        }
        function n(q, u) {
          if (k.isBuffer(q)) return q.length;
          if (ArrayBuffer.isView(q) || y(q, ArrayBuffer)) return q.byteLength;
          if ("string" != typeof q)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                typeof q
            );
          const w = q.length,
            z = arguments.length > 2 && !0 === arguments[2];
          if (!z && 0 === w) return 0;
          let E = !1;
          for (;;)
            switch (u) {
              case "ascii":
              case "latin1":
              case "binary":
                return w;
              case "utf8":
              case "utf-8":
                return N(q).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * w;
              case "hex":
                return w >>> 1;
              case "base64":
                return P(q).length;
              default:
                if (E) return z ? -1 : N(q).length;
                u = ("" + u).toLowerCase();
                E = !0;
            }
        }
        function p(q, u, w) {
          let z = !1;
          if (
            ((void 0 === u || u < 0) && (u = 0), u > this.length) ||
            ((void 0 === w || w > this.length) && (w = this.length), w <= 0) ||
            (w >>>= 0) <= (u >>>= 0)
          )
            return "";
          for (q ||= "utf8"; ; )
            switch (q) {
              case "hex":
                q = u;
                u = this.length;
                (!q || q < 0) && (q = 0);
                (!w || w < 0 || w > u) && (w = u);
                for (u = ""; q < w; ++q) u += O[this[q]];
                return u;
              case "utf8":
              case "utf-8":
                return x(this, u, w);
              case "ascii":
                q = u;
                u = "";
                for (w = Math.min(this.length, w); q < w; ++q)
                  u += String.fromCharCode(127 & this[q]);
                return u;
              case "latin1":
              case "binary":
                q = u;
                u = "";
                for (w = Math.min(this.length, w); q < w; ++q)
                  u += String.fromCharCode(this[q]);
                return u;
              case "base64":
                return (
                  (q = u),
                  0 === q && w === this.length
                    ? G.fromByteArray(this)
                    : G.fromByteArray(this.slice(q, w))
                );
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                w = this.slice(u, w);
                q = "";
                for (u = 0; u < w.length - 1; u += 2)
                  q += String.fromCharCode(w[u] + 256 * w[u + 1]);
                return q;
              default:
                if (z) throw new TypeError("Unknown encoding: " + q);
                q = (q + "").toLowerCase();
                z = !0;
            }
        }
        function r(q, u, w) {
          const z = q[u];
          q[u] = q[w];
          q[w] = z;
        }
        function t(q, u, w, z, E) {
          if (0 === q.length) return -1;
          "string" == typeof w
            ? ((z = w), (w = 0))
            : w > 2147483647
            ? (w = 2147483647)
            : w < -2147483648 && (w = -2147483648);
          var Q = (w = +w);
          if (
            (Q != Q && (w = E ? 0 : q.length - 1),
            w < 0 && (w = q.length + w),
            w >= q.length)
          ) {
            if (E) return -1;
            w = q.length - 1;
          } else if (w < 0) {
            if (!E) return -1;
            w = 0;
          }
          if (("string" == typeof u && (u = k.from(u, z)), k.isBuffer(u)))
            return 0 === u.length ? -1 : v(q, u, w, z, E);
          if ("number" == typeof u)
            return (
              (u &= 255),
              "function" == typeof Uint8Array.prototype.indexOf
                ? E
                  ? Uint8Array.prototype.indexOf.call(q, u, w)
                  : Uint8Array.prototype.lastIndexOf.call(q, u, w)
                : v(q, [u], w, z, E)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function v(q, u, w, z, E) {
          function Q(fa, ha) {
            return 1 === U ? fa[ha] : fa.readUInt16BE(ha * U);
          }
          let U = 1;
          var aa = q.length;
          let da = u.length;
          if (
            void 0 !== z &&
            ("ucs2" === (z = String(z).toLowerCase()) ||
              "ucs-2" === z ||
              "utf16le" === z ||
              "utf-16le" === z)
          ) {
            if (q.length < 2 || u.length < 2) return -1;
            U = 2;
            aa /= 2;
            da /= 2;
            w /= 2;
          }
          if (E)
            for (z = -1; w < aa; w++)
              if (Q(q, w) === Q(u, -1 === z ? 0 : w - z)) {
                if ((-1 === z && (z = w), w - z + 1 === da)) return z * U;
              } else -1 !== z && (w -= w - z), (z = -1);
          else
            for (w + da > aa && (w = aa - da); w >= 0; w--) {
              aa = !0;
              for (z = 0; z < da; z++)
                if (Q(q, w + z) !== Q(u, z)) {
                  aa = !1;
                  break;
                }
              if (aa) return w;
            }
          return -1;
        }
        function x(q, u, w) {
          w = Math.min(q.length, w);
          for (var z = []; u < w; ) {
            const Q = q[u];
            let U = null,
              aa = Q > 239 ? 4 : Q > 223 ? 3 : Q > 191 ? 2 : 1;
            if (u + aa <= w) {
              let da, fa, ha;
              var E = void 0;
              switch (aa) {
                case 1:
                  Q < 128 && (U = Q);
                  break;
                case 2:
                  da = q[u + 1];
                  128 == (192 & da) &&
                    ((E = ((31 & Q) << 6) | (63 & da)), E > 127 && (U = E));
                  break;
                case 3:
                  da = q[u + 1];
                  fa = q[u + 2];
                  128 == (192 & da) &&
                    128 == (192 & fa) &&
                    ((E = ((15 & Q) << 12) | ((63 & da) << 6) | (63 & fa)),
                    E > 2047 && (E < 55296 || E > 57343) && (U = E));
                  break;
                case 4:
                  (da = q[u + 1]),
                    (fa = q[u + 2]),
                    (ha = q[u + 3]),
                    128 == (192 & da) &&
                      128 == (192 & fa) &&
                      128 == (192 & ha) &&
                      ((E =
                        ((15 & Q) << 18) |
                        ((63 & da) << 12) |
                        ((63 & fa) << 6) |
                        (63 & ha)),
                      E > 65535 && E < 1114112 && (U = E));
              }
            }
            null === U
              ? ((U = 65533), (aa = 1))
              : U > 65535 &&
                ((U -= 65536),
                z.push(((U >>> 10) & 1023) | 55296),
                (U = 56320 | (1023 & U)));
            z.push(U);
            u += aa;
          }
          E = z.length;
          if (E <= 4096) z = String.fromCharCode.apply(String, z);
          else {
            q = "";
            for (w = 0; w < E; )
              q += String.fromCharCode.apply(String, z.slice(w, (w += 4096)));
            z = q;
          }
          return z;
        }
        function B(q, u, w) {
          if (q % 1 != 0 || q < 0) throw new RangeError("offset is not uint");
          if (q + u > w)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function F(q, u, w, z, E, Q) {
          if (!k.isBuffer(q))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (u > E || u < Q)
            throw new RangeError('"value" argument is out of bounds');
          if (w + z > q.length) throw new RangeError("Index out of range");
        }
        function L(q, u, w, z, E) {
          Z(u, z, E, q, w, 7);
          z = Number(u & BigInt(4294967295));
          q[w++] = z;
          z >>= 8;
          q[w++] = z;
          z >>= 8;
          q[w++] = z;
          q[w++] = z >> 8;
          u = Number((u >> BigInt(32)) & BigInt(4294967295));
          return (
            (q[w++] = u),
            (u >>= 8),
            (q[w++] = u),
            (u >>= 8),
            (q[w++] = u),
            (u >>= 8),
            (q[w++] = u),
            w
          );
        }
        function J(q, u, w, z, E) {
          Z(u, z, E, q, w, 7);
          z = Number(u & BigInt(4294967295));
          q[w + 7] = z;
          z >>= 8;
          q[w + 6] = z;
          z >>= 8;
          q[w + 5] = z;
          q[w + 4] = z >> 8;
          u = Number((u >> BigInt(32)) & BigInt(4294967295));
          return (
            (q[w + 3] = u),
            (u >>= 8),
            (q[w + 2] = u),
            (u >>= 8),
            (q[w + 1] = u),
            (u >>= 8),
            (q[w] = u),
            w + 8
          );
        }
        function T(q, u, w, z, E, Q) {
          if (w + z > q.length) throw new RangeError("Index out of range");
          if (w < 0) throw new RangeError("Index out of range");
        }
        function V(q, u, w, z, E) {
          return (
            (u = +u),
            (w >>>= 0),
            E || T(q, 0, w, 4),
            I.write(q, u, w, z, 23, 4),
            w + 4
          );
        }
        function W(q, u, w, z, E) {
          return (
            (u = +u),
            (w >>>= 0),
            E || T(q, 0, w, 8),
            I.write(q, u, w, z, 52, 8),
            w + 8
          );
        }
        function R(q, u, w) {
          C[q] = class extends w {
            constructor() {
              super();
              Object.defineProperty(this, "message", {
                value: u.apply(this, arguments),
                writable: !0,
                configurable: !0,
              });
              this.name = `${this.name} [${q}]`;
              this.stack;
              delete this.name;
            }
            get code() {
              return q;
            }
            set code(z) {
              Object.defineProperty(this, "code", {
                configurable: !0,
                enumerable: !0,
                value: z,
                writable: !0,
              });
            }
            toString() {
              return `${this.name} [${q}]: ${this.message}`;
            }
          };
        }
        function ba(q) {
          let u = "",
            w = q.length;
          const z = "-" === q[0] ? 1 : 0;
          for (; w >= z + 4; w -= 3) u = `_${q.slice(w - 3, w)}${u}`;
          return `${q.slice(0, w)}${u}`;
        }
        function Z(q, u, w, z, E, Q) {
          if (q > w || q < u) {
            z = "bigint" == typeof u ? "n" : "";
            let U;
            throw (
              ((U =
                Q > 3
                  ? 0 === u || u === BigInt(0)
                    ? `>= 0${z} and < 2${z} ** ${8 * (Q + 1)}${z}`
                    : `>= -(2${z} ** ${8 * (Q + 1) - 1}${z}) and < 2 ** ${
                        8 * (Q + 1) - 1
                      }${z}`
                  : `>= ${u}${z} and <= ${w}${z}`),
              new C.ERR_OUT_OF_RANGE("value", U, q))
            );
          }
          M(E, "offset");
          (void 0 !== z[E] && void 0 !== z[E + Q]) || K(E, z.length - (Q + 1));
          !0;
        }
        function M(q, u) {
          if ("number" != typeof q)
            throw new C.ERR_INVALID_ARG_TYPE(u, "number", q);
        }
        function K(q, u, w) {
          if (Math.floor(q) !== q)
            throw (
              (M(q, w), new C.ERR_OUT_OF_RANGE(w || "offset", "an integer", q))
            );
          if (u < 0) throw new C.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new C.ERR_OUT_OF_RANGE(
            w || "offset",
            `>= ${w ? 1 : 0} and <= ${u}`,
            q
          );
        }
        function N(q, u) {
          let w;
          u = u || 1 / 0;
          const z = q.length;
          let E = null;
          const Q = [];
          for (let U = 0; U < z; ++U) {
            if (((w = q.charCodeAt(U)), w > 55295 && w < 57344)) {
              if (!E) {
                if (w > 56319) {
                  (u -= 3) > -1 && Q.push(239, 191, 189);
                  continue;
                }
                if (U + 1 === z) {
                  (u -= 3) > -1 && Q.push(239, 191, 189);
                  continue;
                }
                E = w;
                continue;
              }
              if (w < 56320) {
                (u -= 3) > -1 && Q.push(239, 191, 189);
                E = w;
                continue;
              }
              w = 65536 + (((E - 55296) << 10) | (w - 56320));
            } else E && (u -= 3) > -1 && Q.push(239, 191, 189);
            if (((E = null), w < 128)) {
              if (--u < 0) break;
              Q.push(w);
            } else if (w < 2048) {
              if ((u -= 2) < 0) break;
              Q.push((w >> 6) | 192, (63 & w) | 128);
            } else if (w < 65536) {
              if ((u -= 3) < 0) break;
              Q.push((w >> 12) | 224, ((w >> 6) & 63) | 128, (63 & w) | 128);
            } else {
              if (!(w < 1114112)) throw Error("Invalid code point");
              if ((u -= 4) < 0) break;
              Q.push(
                (w >> 18) | 240,
                ((w >> 12) & 63) | 128,
                ((w >> 6) & 63) | 128,
                (63 & w) | 128
              );
            }
          }
          return Q;
        }
        function P(q) {
          var u = G,
            w = u.toByteArray;
          if ((q = (q = q.split("=")[0]).trim().replace(H, "")).length < 2)
            q = "";
          else for (; q.length % 4 != 0; ) q += "=";
          return w.call(u, q);
        }
        function X(q, u, w, z) {
          let E;
          for (E = 0; E < z && !(E + w >= u.length || E >= q.length); ++E)
            u[E + w] = q[E];
          return E;
        }
        function y(q, u) {
          return (
            q instanceof u ||
            (null != q &&
              null != q.constructor &&
              null != q.constructor.name &&
              q.constructor.name === u.name)
          );
        }
        function A(q) {
          return "undefined" == typeof BigInt ? D : q;
        }
        function D() {
          throw Error("BigInt not supported");
        }
        const G = b(67526),
          I = b(251);
        l =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
        a.hp = k;
        a.IS = 50;
        k.TYPED_ARRAY_SUPPORT = (function () {
          try {
            const q = new Uint8Array(1),
              u = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(u, Uint8Array.prototype),
              Object.setPrototypeOf(q, u),
              42 === q.foo()
            );
          } catch (q) {
            return !1;
          }
        })();
        k.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          );
        Object.defineProperty(k.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (k.isBuffer(this)) return this.buffer;
          },
        });
        Object.defineProperty(k.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (k.isBuffer(this)) return this.byteOffset;
          },
        });
        k.poolSize = 8192;
        k.from = function (q, u, w) {
          return h(q, u, w);
        };
        Object.setPrototypeOf(k.prototype, Uint8Array.prototype);
        Object.setPrototypeOf(k, Uint8Array);
        k.alloc = function (q, u, w) {
          return (
            e(q),
            q <= 0
              ? f(q)
              : void 0 !== u
              ? "string" == typeof w
                ? f(q).fill(u, w)
                : f(q).fill(u)
              : f(q)
          );
        };
        k.allocUnsafe = function (q) {
          return d(q);
        };
        k.allocUnsafeSlow = function (q) {
          return d(q);
        };
        k.isBuffer = function (q) {
          return null != q && !0 === q._isBuffer && q !== k.prototype;
        };
        k.compare = function (q, u) {
          if (
            (y(q, Uint8Array) && (q = k.from(q, q.offset, q.byteLength)),
            y(u, Uint8Array) && (u = k.from(u, u.offset, u.byteLength)),
            !k.isBuffer(q) || !k.isBuffer(u))
          )
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (q === u) return 0;
          let w = q.length,
            z = u.length;
          for (let E = 0, Q = Math.min(w, z); E < Q; ++E)
            if (q[E] !== u[E]) {
              w = q[E];
              z = u[E];
              break;
            }
          return w < z ? -1 : z < w ? 1 : 0;
        };
        k.isEncoding = function (q) {
          switch (String(q).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        };
        k.concat = function (q, u) {
          if (!Array.isArray(q))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === q.length) return k.alloc(0);
          let w;
          if (void 0 === u) for (w = u = 0; w < q.length; ++w) u += q[w].length;
          u = k.allocUnsafe(u);
          let z = 0;
          for (w = 0; w < q.length; ++w) {
            let E = q[w];
            if (y(E, Uint8Array))
              z + E.length > u.length
                ? (k.isBuffer(E) || (E = k.from(E)), E.copy(u, z))
                : Uint8Array.prototype.set.call(u, E, z);
            else {
              if (!k.isBuffer(E))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              E.copy(u, z);
            }
            z += E.length;
          }
          return u;
        };
        k.byteLength = n;
        k.prototype._isBuffer = !0;
        k.prototype.swap16 = function () {
          const q = this.length;
          if (q % 2 != 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let u = 0; u < q; u += 2) r(this, u, u + 1);
          return this;
        };
        k.prototype.swap32 = function () {
          const q = this.length;
          if (q % 4 != 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (let u = 0; u < q; u += 4)
            r(this, u, u + 3), r(this, u + 1, u + 2);
          return this;
        };
        k.prototype.swap64 = function () {
          const q = this.length;
          if (q % 8 != 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (let u = 0; u < q; u += 8)
            r(this, u, u + 7),
              r(this, u + 1, u + 6),
              r(this, u + 2, u + 5),
              r(this, u + 3, u + 4);
          return this;
        };
        k.prototype.toString = function () {
          const q = this.length;
          return 0 === q
            ? ""
            : 0 === arguments.length
            ? x(this, 0, q)
            : p.apply(this, arguments);
        };
        k.prototype.toLocaleString = k.prototype.toString;
        k.prototype.equals = function (q) {
          if (!k.isBuffer(q)) throw new TypeError("Argument must be a Buffer");
          return this === q || 0 === k.compare(this, q);
        };
        k.prototype.inspect = function () {
          let q = "";
          const u = a.IS;
          return (
            (q = this.toString("hex", 0, u)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > u && (q += " ... "),
            "<Buffer " + q + ">"
          );
        };
        l && (k.prototype[l] = k.prototype.inspect);
        k.prototype.compare = function (q, u, w, z, E) {
          if (
            (y(q, Uint8Array) && (q = k.from(q, q.offset, q.byteLength)),
            !k.isBuffer(q))
          )
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof q
            );
          if (
            (void 0 === u && (u = 0),
            void 0 === w && (w = q ? q.length : 0),
            void 0 === z && (z = 0),
            void 0 === E && (E = this.length),
            u < 0 || w > q.length || z < 0 || E > this.length)
          )
            throw new RangeError("out of range index");
          if (z >= E && u >= w) return 0;
          if (z >= E) return -1;
          if (u >= w) return 1;
          if (this === q) return 0;
          let Q = (E >>>= 0) - (z >>>= 0),
            U = (w >>>= 0) - (u >>>= 0);
          const aa = Math.min(Q, U);
          z = this.slice(z, E);
          q = q.slice(u, w);
          for (u = 0; u < aa; ++u)
            if (z[u] !== q[u]) {
              Q = z[u];
              U = q[u];
              break;
            }
          return Q < U ? -1 : U < Q ? 1 : 0;
        };
        k.prototype.includes = function (q, u, w) {
          return -1 !== this.indexOf(q, u, w);
        };
        k.prototype.indexOf = function (q, u, w) {
          return t(this, q, u, w, !0);
        };
        k.prototype.lastIndexOf = function (q, u, w) {
          return t(this, q, u, w, !1);
        };
        k.prototype.write = function (q, u, w, z) {
          if (void 0 === u) (z = "utf8"), (w = this.length), (u = 0);
          else if (void 0 === w && "string" == typeof u)
            (z = u), (w = this.length), (u = 0);
          else {
            if (!isFinite(u))
              throw Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            u >>>= 0;
            isFinite(w)
              ? ((w >>>= 0), void 0 === z && (z = "utf8"))
              : ((z = w), (w = void 0));
          }
          var E = this.length - u;
          if (
            ((void 0 === w || w > E) && (w = E),
            (q.length > 0 && (w < 0 || u < 0)) || u > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          z ||= "utf8";
          for (E = !1; ; )
            switch (z) {
              case "hex":
                a: {
                  u = Number(u) || 0;
                  z = this.length - u;
                  w ? (w = Number(w)) > z && (w = z) : (w = z);
                  z = q.length;
                  w > z / 2 && (w = z / 2);
                  for (z = 0; z < w; ++z) {
                    E = parseInt(q.substr(2 * z, 2), 16);
                    if (E != E) {
                      w = z;
                      break a;
                    }
                    this[u + z] = E;
                  }
                  w = z;
                }
                return w;
              case "utf8":
              case "utf-8":
                return X(N(q, this.length - u), this, u, w);
              case "ascii":
              case "latin1":
              case "binary":
                z = [];
                for (E = 0; E < q.length; ++E) z.push(255 & q.charCodeAt(E));
                return X(z, this, u, w);
              case "base64":
                return X(P(q), this, u, w);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                var Q = void 0;
                z = this.length - u;
                const U = [];
                for (let aa = 0; aa < q.length && !((z -= 2) < 0); ++aa)
                  (Q = q.charCodeAt(aa)),
                    (E = Q >> 8),
                    (Q %= 256),
                    U.push(Q),
                    U.push(E);
                return X(U, this, u, w);
              default:
                if (E) throw new TypeError("Unknown encoding: " + z);
                z = ("" + z).toLowerCase();
                E = !0;
            }
        };
        k.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        };
        k.prototype.slice = function (q, u) {
          const w = this.length;
          (q = ~~q) < 0 ? (q += w) < 0 && (q = 0) : q > w && (q = w);
          (u = void 0 === u ? w : ~~u) < 0
            ? (u += w) < 0 && (u = 0)
            : u > w && (u = w);
          u < q && (u = q);
          q = this.subarray(q, u);
          return Object.setPrototypeOf(q, k.prototype), q;
        };
        k.prototype.readUintLE = k.prototype.readUIntLE = function (q, u, w) {
          q >>>= 0;
          u >>>= 0;
          w || B(q, u, this.length);
          w = this[q];
          let z = 1,
            E = 0;
          for (; ++E < u && (z *= 256); ) w += this[q + E] * z;
          return w;
        };
        k.prototype.readUintBE = k.prototype.readUIntBE = function (q, u, w) {
          q >>>= 0;
          u >>>= 0;
          w || B(q, u, this.length);
          w = this[q + --u];
          let z = 1;
          for (; u > 0 && (z *= 256); ) w += this[q + --u] * z;
          return w;
        };
        k.prototype.readUint8 = k.prototype.readUInt8 = function (q, u) {
          return (q >>>= 0), u || B(q, 1, this.length), this[q];
        };
        k.prototype.readUint16LE = k.prototype.readUInt16LE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 2, this.length), this[q] | (this[q + 1] << 8)
          );
        };
        k.prototype.readUint16BE = k.prototype.readUInt16BE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 2, this.length), (this[q] << 8) | this[q + 1]
          );
        };
        k.prototype.readUint32LE = k.prototype.readUInt32LE = function (q, u) {
          return (
            (q >>>= 0),
            u || B(q, 4, this.length),
            (this[q] | (this[q + 1] << 8) | (this[q + 2] << 16)) +
              16777216 * this[q + 3]
          );
        };
        k.prototype.readUint32BE = k.prototype.readUInt32BE = function (q, u) {
          return (
            (q >>>= 0),
            u || B(q, 4, this.length),
            16777216 * this[q] +
              ((this[q + 1] << 16) | (this[q + 2] << 8) | this[q + 3])
          );
        };
        k.prototype.readBigUInt64LE = A(function (q) {
          M((q >>>= 0), "offset");
          var u = this[q];
          const w = this[q + 7];
          (void 0 !== u && void 0 !== w) || K(q, this.length - 8);
          u = u + 256 * this[++q] + 65536 * this[++q] + this[++q] * 2 ** 24;
          q = this[++q] + 256 * this[++q] + 65536 * this[++q] + w * 2 ** 24;
          return BigInt(u) + (BigInt(q) << BigInt(32));
        });
        k.prototype.readBigUInt64BE = A(function (q) {
          M((q >>>= 0), "offset");
          var u = this[q];
          const w = this[q + 7];
          (void 0 !== u && void 0 !== w) || K(q, this.length - 8);
          u = u * 2 ** 24 + 65536 * this[++q] + 256 * this[++q] + this[++q];
          q = this[++q] * 2 ** 24 + 65536 * this[++q] + 256 * this[++q] + w;
          return (BigInt(u) << BigInt(32)) + BigInt(q);
        });
        k.prototype.readIntLE = function (q, u, w) {
          q >>>= 0;
          u >>>= 0;
          w || B(q, u, this.length);
          w = this[q];
          let z = 1,
            E = 0;
          for (; ++E < u && (z *= 256); ) w += this[q + E] * z;
          return (z *= 128), w >= z && (w -= Math.pow(2, 8 * u)), w;
        };
        k.prototype.readIntBE = function (q, u, w) {
          q >>>= 0;
          u >>>= 0;
          w || B(q, u, this.length);
          w = u;
          let z = 1,
            E = this[q + --w];
          for (; w > 0 && (z *= 256); ) E += this[q + --w] * z;
          return (z *= 128), E >= z && (E -= Math.pow(2, 8 * u)), E;
        };
        k.prototype.readInt8 = function (q, u) {
          return (
            (q >>>= 0),
            u || B(q, 1, this.length),
            128 & this[q] ? -1 * (255 - this[q] + 1) : this[q]
          );
        };
        k.prototype.readInt16LE = function (q, u) {
          q >>>= 0;
          u || B(q, 2, this.length);
          q = this[q] | (this[q + 1] << 8);
          return 32768 & q ? 4294901760 | q : q;
        };
        k.prototype.readInt16BE = function (q, u) {
          q >>>= 0;
          u || B(q, 2, this.length);
          q = this[q + 1] | (this[q] << 8);
          return 32768 & q ? 4294901760 | q : q;
        };
        k.prototype.readInt32LE = function (q, u) {
          return (
            (q >>>= 0),
            u || B(q, 4, this.length),
            this[q] |
              (this[q + 1] << 8) |
              (this[q + 2] << 16) |
              (this[q + 3] << 24)
          );
        };
        k.prototype.readInt32BE = function (q, u) {
          return (
            (q >>>= 0),
            u || B(q, 4, this.length),
            (this[q] << 24) |
              (this[q + 1] << 16) |
              (this[q + 2] << 8) |
              this[q + 3]
          );
        };
        k.prototype.readBigInt64LE = A(function (q) {
          M((q >>>= 0), "offset");
          const u = this[q],
            w = this[q + 7];
          (void 0 !== u && void 0 !== w) || K(q, this.length - 8);
          return (
            (BigInt(
              this[q + 4] + 256 * this[q + 5] + 65536 * this[q + 6] + (w << 24)
            ) <<
              BigInt(32)) +
            BigInt(
              u + 256 * this[++q] + 65536 * this[++q] + this[++q] * 2 ** 24
            )
          );
        });
        k.prototype.readBigInt64BE = A(function (q) {
          M((q >>>= 0), "offset");
          var u = this[q];
          const w = this[q + 7];
          (void 0 !== u && void 0 !== w) || K(q, this.length - 8);
          u = (u << 24) + 65536 * this[++q] + 256 * this[++q] + this[++q];
          return (
            (BigInt(u) << BigInt(32)) +
            BigInt(
              this[++q] * 2 ** 24 + 65536 * this[++q] + 256 * this[++q] + w
            )
          );
        });
        k.prototype.readFloatLE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 4, this.length), I.read(this, q, !0, 23, 4)
          );
        };
        k.prototype.readFloatBE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 4, this.length), I.read(this, q, !1, 23, 4)
          );
        };
        k.prototype.readDoubleLE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 8, this.length), I.read(this, q, !0, 52, 8)
          );
        };
        k.prototype.readDoubleBE = function (q, u) {
          return (
            (q >>>= 0), u || B(q, 8, this.length), I.read(this, q, !1, 52, 8)
          );
        };
        k.prototype.writeUintLE = k.prototype.writeUIntLE = function (
          q,
          u,
          w,
          z
        ) {
          ((q = +q), (u >>>= 0), (w >>>= 0), z) ||
            F(this, q, u, w, Math.pow(2, 8 * w) - 1, 0);
          z = 1;
          let E = 0;
          for (this[u] = 255 & q; ++E < w && (z *= 256); )
            this[u + E] = (q / z) & 255;
          return u + w;
        };
        k.prototype.writeUintBE = k.prototype.writeUIntBE = function (
          q,
          u,
          w,
          z
        ) {
          ((q = +q), (u >>>= 0), (w >>>= 0), z) ||
            F(this, q, u, w, Math.pow(2, 8 * w) - 1, 0);
          z = w - 1;
          let E = 1;
          for (this[u + z] = 255 & q; --z >= 0 && (E *= 256); )
            this[u + z] = (q / E) & 255;
          return u + w;
        };
        k.prototype.writeUint8 = k.prototype.writeUInt8 = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 1, 255, 0),
            (this[u] = 255 & q),
            u + 1
          );
        };
        k.prototype.writeUint16LE = k.prototype.writeUInt16LE = function (
          q,
          u,
          w
        ) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 2, 65535, 0),
            (this[u] = 255 & q),
            (this[u + 1] = q >>> 8),
            u + 2
          );
        };
        k.prototype.writeUint16BE = k.prototype.writeUInt16BE = function (
          q,
          u,
          w
        ) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 2, 65535, 0),
            (this[u] = q >>> 8),
            (this[u + 1] = 255 & q),
            u + 2
          );
        };
        k.prototype.writeUint32LE = k.prototype.writeUInt32LE = function (
          q,
          u,
          w
        ) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 4, 4294967295, 0),
            (this[u + 3] = q >>> 24),
            (this[u + 2] = q >>> 16),
            (this[u + 1] = q >>> 8),
            (this[u] = 255 & q),
            u + 4
          );
        };
        k.prototype.writeUint32BE = k.prototype.writeUInt32BE = function (
          q,
          u,
          w
        ) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 4, 4294967295, 0),
            (this[u] = q >>> 24),
            (this[u + 1] = q >>> 16),
            (this[u + 2] = q >>> 8),
            (this[u + 3] = 255 & q),
            u + 4
          );
        };
        k.prototype.writeBigUInt64LE = A(function (q, u = 0) {
          return L(this, q, u, BigInt(0), BigInt("0xffffffffffffffff"));
        });
        k.prototype.writeBigUInt64BE = A(function (q, u = 0) {
          return J(this, q, u, BigInt(0), BigInt("0xffffffffffffffff"));
        });
        k.prototype.writeIntLE = function (q, u, w, z) {
          ((q = +q), (u >>>= 0), z) ||
            ((z = Math.pow(2, 8 * w - 1)), F(this, q, u, w, z - 1, -z));
          z = 0;
          let E = 1,
            Q = 0;
          for (this[u] = 255 & q; ++z < w && (E *= 256); )
            q < 0 && 0 === Q && 0 !== this[u + z - 1] && (Q = 1),
              (this[u + z] = (((q / E) | 0) - Q) & 255);
          return u + w;
        };
        k.prototype.writeIntBE = function (q, u, w, z) {
          ((q = +q), (u >>>= 0), z) ||
            ((z = Math.pow(2, 8 * w - 1)), F(this, q, u, w, z - 1, -z));
          z = w - 1;
          let E = 1,
            Q = 0;
          for (this[u + z] = 255 & q; --z >= 0 && (E *= 256); )
            q < 0 && 0 === Q && 0 !== this[u + z + 1] && (Q = 1),
              (this[u + z] = (((q / E) | 0) - Q) & 255);
          return u + w;
        };
        k.prototype.writeInt8 = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 1, 127, -128),
            q < 0 && (q = 255 + q + 1),
            (this[u] = 255 & q),
            u + 1
          );
        };
        k.prototype.writeInt16LE = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 2, 32767, -32768),
            (this[u] = 255 & q),
            (this[u + 1] = q >>> 8),
            u + 2
          );
        };
        k.prototype.writeInt16BE = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 2, 32767, -32768),
            (this[u] = q >>> 8),
            (this[u + 1] = 255 & q),
            u + 2
          );
        };
        k.prototype.writeInt32LE = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 4, 2147483647, -2147483648),
            (this[u] = 255 & q),
            (this[u + 1] = q >>> 8),
            (this[u + 2] = q >>> 16),
            (this[u + 3] = q >>> 24),
            u + 4
          );
        };
        k.prototype.writeInt32BE = function (q, u, w) {
          return (
            (q = +q),
            (u >>>= 0),
            w || F(this, q, u, 4, 2147483647, -2147483648),
            q < 0 && (q = 4294967295 + q + 1),
            (this[u] = q >>> 24),
            (this[u + 1] = q >>> 16),
            (this[u + 2] = q >>> 8),
            (this[u + 3] = 255 & q),
            u + 4
          );
        };
        k.prototype.writeBigInt64LE = A(function (q, u = 0) {
          return L(
            this,
            q,
            u,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        });
        k.prototype.writeBigInt64BE = A(function (q, u = 0) {
          return J(
            this,
            q,
            u,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        });
        k.prototype.writeFloatLE = function (q, u, w) {
          return V(this, q, u, !0, w);
        };
        k.prototype.writeFloatBE = function (q, u, w) {
          return V(this, q, u, !1, w);
        };
        k.prototype.writeDoubleLE = function (q, u, w) {
          return W(this, q, u, !0, w);
        };
        k.prototype.writeDoubleBE = function (q, u, w) {
          return W(this, q, u, !1, w);
        };
        k.prototype.copy = function (q, u, w, z) {
          if (!k.isBuffer(q))
            throw new TypeError("argument should be a Buffer");
          if (
            ((w ||= 0),
            z || 0 === z || (z = this.length),
            u >= q.length && (u = q.length),
            (u ||= 0),
            z > 0 && z < w && (z = w),
            z === w) ||
            0 === q.length ||
            0 === this.length
          )
            return 0;
          if (u < 0) throw new RangeError("targetStart out of bounds");
          if (w < 0 || w >= this.length)
            throw new RangeError("Index out of range");
          if (z < 0) throw new RangeError("sourceEnd out of bounds");
          z > this.length && (z = this.length);
          q.length - u < z - w && (z = q.length - u + w);
          const E = z - w;
          return (
            this === q && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(u, w, z)
              : Uint8Array.prototype.set.call(q, this.subarray(w, z), u),
            E
          );
        };
        k.prototype.fill = function (q, u, w, z) {
          if ("string" == typeof q) {
            if (
              ("string" == typeof u
                ? ((z = u), (u = 0), (w = this.length))
                : "string" == typeof w && ((z = w), (w = this.length)),
              void 0 !== z && "string" != typeof z)
            )
              throw new TypeError("encoding must be a string");
            if ("string" == typeof z && !k.isEncoding(z))
              throw new TypeError("Unknown encoding: " + z);
            if (1 === q.length) {
              var E = q.charCodeAt(0);
              (("utf8" === z && E < 128) || "latin1" === z) && (q = E);
            }
          } else
            "number" == typeof q
              ? (q &= 255)
              : "boolean" == typeof q && (q = Number(q));
          if (u < 0 || this.length < u || this.length < w)
            throw new RangeError("Out of range index");
          if (w <= u) return this;
          if (
            ((u >>>= 0),
            (w = void 0 === w ? this.length : w >>> 0),
            (q ||= 0),
            "number" == typeof q)
          )
            for (z = u; z < w; ++z) this[z] = q;
          else {
            E = k.isBuffer(q) ? q : k.from(q, z);
            const Q = E.length;
            if (0 === Q)
              throw new TypeError(
                'The value "' + q + '" is invalid for argument "value"'
              );
            for (z = 0; z < w - u; ++z) this[z + u] = E[z % Q];
          }
          return this;
        };
        const C = {};
        R(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function (q) {
            return q
              ? `${q} is outside of buffer bounds`
              : "Attempt to access memory outside buffer bounds";
          },
          RangeError
        );
        R(
          "ERR_INVALID_ARG_TYPE",
          function (q, u) {
            return `The "${q}" argument must be of type number. Received type ${typeof u}`;
          },
          TypeError
        );
        R(
          "ERR_OUT_OF_RANGE",
          function (q, u, w) {
            q = `The value of "${q}" is out of range.`;
            let z = w;
            return (
              Number.isInteger(w) && Math.abs(w) > 2 ** 32
                ? (z = ba(String(w)))
                : "bigint" == typeof w &&
                  ((z = String(w)),
                  (w > BigInt(2) ** BigInt(32) ||
                    w < -(BigInt(2) ** BigInt(32))) &&
                    (z = ba(z)),
                  (z += "n")),
              (q += ` It must be ${u}. Received ${z}`),
              q
            );
          },
          RangeError
        );
        const H = /[^+/0-9A-Za-z-_]/g,
          O = (function () {
            const q = Array(256);
            for (let u = 0; u < 16; ++u) {
              const w = 16 * u;
              for (let z = 0; z < 16; ++z)
                q[w + z] = "0123456789abcdef"[u] + "0123456789abcdef"[z];
            }
            return q;
          })();
      },
      38385: (l, a, b) => {
        b.r(a);
        b.d(a, {
          compare: () => c,
          compareVersions: () => d,
          satisfies: () => n,
          validate: () => p,
          validateStrict: () => r,
        });
        const f =
            /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i,
          k = (t) => {
            if ("string" != typeof t)
              throw new TypeError("Invalid argument expected string");
            const v = t.match(f);
            if (!v)
              throw Error(
                `Invalid argument not valid semver ('${t}' received)`
              );
            return v.shift(), v;
          },
          h = (t) => {
            const v = parseInt(t, 10);
            return isNaN(v) ? t : v;
          },
          e = (t, v) => {
            for (let F = 0; F < Math.max(t.length, v.length); F++) {
              a: {
                var x = t[F] || "0";
                var B = v[F] || "0";
                if (
                  "*" === x ||
                  "x" === x ||
                  "X" === x ||
                  "*" === B ||
                  "x" === B ||
                  "X" === B
                ) {
                  B = 0;
                  break a;
                }
                x = h(x);
                B = h(B);
                const [L, J] =
                  typeof x != typeof B ? [String(x), String(B)] : [x, B];
                B = L > J ? 1 : L < J ? -1 : 0;
              }
              if (0 !== B) return B;
            }
            return 0;
          },
          d = (t, v) => {
            t = k(t);
            const x = k(v);
            v = t.pop();
            const B = x.pop();
            t = e(t, x);
            return 0 !== t
              ? t
              : v && B
              ? e(v.split("."), B.split("."))
              : v || B
              ? v
                ? -1
                : 1
              : 0;
          },
          c = (t, v, x) => {
            if ("string" != typeof x)
              throw new TypeError(
                "Invalid operator type, expected string but got " + typeof x
              );
            if (-1 === m.indexOf(x))
              throw Error(`Invalid operator, expected one of ${m.join("|")}`);
            t = d(t, v);
            return g[x].includes(t);
          },
          g = {
            ">": [1],
            ">=": [0, 1],
            "=": [0],
            "<=": [-1, 0],
            "<": [-1],
            "!=": [-1, 1],
          },
          m = Object.keys(g),
          n = (t, v) => {
            if ((v = v.replace(/([><=]+)\s+/g, "$1")).includes("||"))
              return v.split("||").some((M) => n(t, M));
            if (v.includes(" - ")) {
              const [M, K] = v.split(" - ", 2);
              return n(t, `>=${M} <=${K}`);
            }
            if (v.includes(" "))
              return v
                .trim()
                .replace(/\s{2,}/g, " ")
                .split(" ")
                .every((M) => n(t, M));
            var x = v.match(/^([<>=~^]+)/);
            x = x ? x[1] : "=";
            if ("^" !== x && "~" !== x) return c(t, v, x);
            const [B, F, L, , J] = k(t),
              [T, V, W, , R] = k(v);
            v = [B, F, L];
            const ba = [T, null != V ? V : "x", null != W ? W : "x"];
            if (
              R &&
              (!J || 0 !== e(v, ba) || -1 === e(J.split("."), R.split(".")))
            )
              return !1;
            const Z = ba.findIndex((M) => "0" !== M) + 1;
            x = "~" === x ? 2 : Z > 1 ? Z : 1;
            return (
              0 === e(v.slice(0, x), ba.slice(0, x)) &&
              -1 !== e(v.slice(x), ba.slice(x))
            );
          },
          p = (t) => "string" == typeof t && /^[v\d]/.test(t) && f.test(t),
          r = (t) =>
            "string" == typeof t &&
            /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(
              t
            );
      },
      23807: function (l) {
        l.exports = (function () {
          function a(M, K) {
            var N = Object.keys(M);
            if (Object.getOwnPropertySymbols) {
              var P = Object.getOwnPropertySymbols(M);
              K &&
                (P = P.filter(function (X) {
                  return Object.getOwnPropertyDescriptor(M, X).enumerable;
                }));
              N.push.apply(N, P);
            }
            return N;
          }
          function b(M) {
            for (var K = 1; K < arguments.length; K++) {
              var N = null != arguments[K] ? arguments[K] : {};
              K % 2
                ? a(Object(N), !0).forEach(function (P) {
                    var X = P;
                    P = N[P];
                    (X = e(X)) in M
                      ? Object.defineProperty(M, X, {
                          value: P,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                        })
                      : (M[X] = P);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    M,
                    Object.getOwnPropertyDescriptors(N)
                  )
                : a(Object(N)).forEach(function (P) {
                    Object.defineProperty(
                      M,
                      P,
                      Object.getOwnPropertyDescriptor(N, P)
                    );
                  });
            }
            return M;
          }
          function f(M, K) {
            for (var N = 0; N < K.length; N++) {
              var P = K[N];
              P.enumerable = P.enumerable || !1;
              P.configurable = !0;
              "value" in P && (P.writable = !0);
              Object.defineProperty(M, e(P.key), P);
            }
          }
          function k(M, K, N) {
            return (
              K && f(M.prototype, K),
              N && f(M, N),
              Object.defineProperty(M, "prototype", { writable: !1 }),
              M
            );
          }
          function h() {
            return (
              (h = Object.assign
                ? Object.assign.bind()
                : function (M) {
                    for (var K = 1; K < arguments.length; K++) {
                      var N = arguments[K],
                        P;
                      for (P in N)
                        Object.prototype.hasOwnProperty.call(N, P) &&
                          (M[P] = N[P]);
                    }
                    return M;
                  }),
              h.apply(this, arguments)
            );
          }
          function e(M) {
            a: if ("object" == typeof M && null !== M) {
              var K = M[Symbol.toPrimitive];
              if (void 0 !== K) {
                M = K.call(M, "string");
                if ("object" != typeof M) break a;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              M = String(M);
            }
            return "symbol" == typeof M ? M : String(M);
          }
          function d(M) {
            return Array.from ? Array.from(M) : B.call(M);
          }
          function c(M, K) {
            var N = [];
            for (M = new Uint8Array(M); M.length > 0; )
              N.push(L.apply(null, d(M.subarray(0, 8192)))),
                (M = M.subarray(8192));
            return "data:".concat(K, ";base64,").concat(J(N.join("")));
          }
          function g(M) {
            var K =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1e11;
            return T.test(M) ? Math.round(M * K) / K : M;
          }
          function m(M) {
            var K = M.aspectRatio,
              N = M.height,
              P = M.width,
              X =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "none",
              y = x(P),
              A = x(N);
            y && A
              ? ((y = N * K),
                (("contain" === X || "none" === X) && y > P) ||
                ("cover" === X && y < P)
                  ? (N = P / K)
                  : (P = N * K))
              : y
              ? (N = P / K)
              : A && (P = N * K);
            return { width: P, height: N };
          }
          function n(M) {
            M = d(new Uint8Array(M));
            for (var K = M.length, N = [], P = 0; P + 3 < K; ) {
              var X = M[P],
                y = M[P + 1];
              if (255 === X && 218 === y) break;
              255 === X && 216 === y
                ? (P += 2)
                : ((X = P + (256 * M[P + 2] + M[P + 3]) + 2),
                  (P = M.slice(P, X)),
                  N.push(P),
                  (P = X));
            }
            return N.reduce(function (A, D) {
              return 255 === D[0] && 225 === D[1] ? A.concat(D) : A;
            }, []);
          }
          var p = { exports: {} };
          !(function (M) {
            "undefined" != typeof window &&
              (function (K) {
                var N = K.HTMLCanvasElement && K.HTMLCanvasElement.prototype,
                  P;
                if ((P = K.Blob))
                  try {
                    P = !!new Blob();
                  } catch (I) {
                    P = !1;
                  }
                var X = P;
                if ((P = X && K.Uint8Array))
                  try {
                    P = 100 === new Blob([new Uint8Array(100)]).size;
                  } catch (I) {
                    P = !1;
                  }
                var y = P,
                  A =
                    K.BlobBuilder ||
                    K.WebKitBlobBuilder ||
                    K.MozBlobBuilder ||
                    K.MSBlobBuilder,
                  D = /^data:((.*?)(;charset=.*?)?)(;base64)?,/,
                  G =
                    (X || A) &&
                    K.atob &&
                    K.ArrayBuffer &&
                    K.Uint8Array &&
                    function (I) {
                      var C, H, O;
                      if (!(C = I.match(D))) throw Error("invalid data URI");
                      var q = C[2]
                        ? C[1]
                        : "text/plain" + (C[3] || ";charset=US-ASCII");
                      var u = !!C[4];
                      I = I.slice(C[0].length);
                      u = u ? atob(I) : decodeURIComponent(I);
                      I = new ArrayBuffer(u.length);
                      C = new Uint8Array(I);
                      for (H = 0; H < u.length; H += 1) C[H] = u.charCodeAt(H);
                      return X
                        ? new Blob([y ? C : I], { type: q })
                        : ((O = new A()).append(I), O.getBlob(q));
                    };
                K.HTMLCanvasElement &&
                  !N.toBlob &&
                  (N.mozGetAsFile
                    ? (N.toBlob = function (I, C, H) {
                        var O = this;
                        setTimeout(function () {
                          H && N.toDataURL && G
                            ? I(G(O.toDataURL(C, H)))
                            : I(O.mozGetAsFile("blob", C));
                        });
                      })
                    : N.toDataURL &&
                      G &&
                      (N.msToBlob
                        ? (N.toBlob = function (I, C, H) {
                            var O = this;
                            setTimeout(function () {
                              ((C && "image/png" !== C) || H) &&
                              N.toDataURL &&
                              G
                                ? I(G(O.toDataURL(C, H)))
                                : I(O.msToBlob(C));
                            });
                          })
                        : (N.toBlob = function (I, C, H) {
                            var O = this;
                            setTimeout(function () {
                              I(G(O.toDataURL(C, H)));
                            });
                          })));
                M.exports ? (M.exports = G) : (K.dataURLtoBlob = G);
              })(window);
          })(p);
          var r = p.exports,
            t = {
              strict: !0,
              checkOrientation: !0,
              retainExif: !1,
              maxWidth: 1 / 0,
              maxHeight: 1 / 0,
              minWidth: 0,
              minHeight: 0,
              width: void 0,
              height: void 0,
              resize: "none",
              quality: 0.8,
              mimeType: "auto",
              convertTypes: ["image/png"],
              convertSize: 5e6,
              beforeDraw: null,
              drew: null,
              success: null,
              error: null,
            },
            v =
              "undefined" != typeof window && void 0 !== window.document
                ? window
                : {},
            x = function (M) {
              return M > 0 && M < 1 / 0;
            },
            B = Array.prototype.slice,
            F = /^image\/.+$/,
            L = String.fromCharCode,
            J = v.btoa,
            T = /\.\d*(?:0|9){12}\d*$/,
            V = v.ArrayBuffer,
            W = v.FileReader,
            R = v.URL || v.webkitURL,
            ba = /\.\w+$/,
            Z = v.Compressor;
          return (function () {
            function M(K, N) {
              if (!(this instanceof M))
                throw new TypeError("Cannot call a class as a function");
              this.file = K;
              this.exif = [];
              this.image = new Image();
              this.options = b(b({}, t), N);
              this.aborted = !1;
              this.result = null;
              this.init();
            }
            return (
              k(
                M,
                [
                  {
                    key: "init",
                    value: function () {
                      var K = this,
                        N = this.file,
                        P = this.options;
                      if (
                        "undefined" != typeof Blob &&
                        (N instanceof Blob ||
                          "[object Blob]" === Object.prototype.toString.call(N))
                      ) {
                        var X = N.type;
                        if (F.test(X))
                          if (R && W) {
                            V ||
                              ((P.checkOrientation = !1), (P.retainExif = !1));
                            var y = "image/jpeg" === X,
                              A = y && P.checkOrientation,
                              D = y && P.retainExif;
                            !R || A || D
                              ? ((this.reader = P = new W()),
                                (P.onload = function (G) {
                                  G = G.target.result;
                                  var I = {},
                                    C = 1,
                                    H;
                                  if ((H = A)) {
                                    C = new DataView(G);
                                    try {
                                      var O, q;
                                      if (
                                        255 === C.getUint8(0) &&
                                        216 === C.getUint8(1)
                                      ) {
                                        var u = C.byteLength;
                                        for (H = 2; H + 1 < u; ) {
                                          if (
                                            255 === C.getUint8(H) &&
                                            225 === C.getUint8(H + 1)
                                          ) {
                                            var w = H;
                                            break;
                                          }
                                          H += 1;
                                        }
                                      }
                                      if (w) {
                                        u = w + 10;
                                        w += 4;
                                        H = 4;
                                        var z,
                                          E = "";
                                        H += w;
                                        for (z = w; z < H; z += 1)
                                          E += L(C.getUint8(z));
                                        if ("Exif" === E) {
                                          var Q = C.getUint16(u);
                                          if (
                                            ((O = 18761 === Q) ||
                                              19789 === Q) &&
                                            42 === C.getUint16(u + 2, O)
                                          ) {
                                            var U = C.getUint32(u + 4, O);
                                            U >= 8 && (q = u + U);
                                          }
                                        }
                                      }
                                      if (q) {
                                        var aa,
                                          da,
                                          fa = C.getUint16(q, O);
                                        for (da = 0; da < fa; da += 1)
                                          if (
                                            ((aa = q + 12 * da + 2),
                                            274 === C.getUint16(aa, O))
                                          ) {
                                            aa += 8;
                                            var ha = C.getUint16(aa, O);
                                            C.setUint16(aa, 1, O);
                                            break;
                                          }
                                      }
                                    } catch (ja) {
                                      ha = 1;
                                    }
                                    H = (C = ha) > 1;
                                  }
                                  if (H) {
                                    ha = h;
                                    O = 0;
                                    z = q = 1;
                                    switch (C) {
                                      case 2:
                                        q = -1;
                                        break;
                                      case 3:
                                        O = -180;
                                        break;
                                      case 4:
                                        z = -1;
                                        break;
                                      case 5:
                                        O = 90;
                                        z = -1;
                                        break;
                                      case 6:
                                        O = 90;
                                        break;
                                      case 7:
                                        O = 90;
                                        q = -1;
                                        break;
                                      case 8:
                                        O = -90;
                                    }
                                    ha(I, { rotate: O, scaleX: q, scaleY: z });
                                  }
                                  D && (K.exif = n(G));
                                  I.url =
                                    A || D
                                      ? !R || C > 1
                                        ? c(G, X)
                                        : R.createObjectURL(N)
                                      : G;
                                  K.load(I);
                                }),
                                (P.onabort = function () {
                                  K.fail(
                                    Error(
                                      "Aborted to read the image with FileReader."
                                    )
                                  );
                                }),
                                (P.onerror = function () {
                                  K.fail(
                                    Error(
                                      "Failed to read the image with FileReader."
                                    )
                                  );
                                }),
                                (P.onloadend = function () {
                                  K.reader = null;
                                }),
                                A || D
                                  ? P.readAsArrayBuffer(N)
                                  : P.readAsDataURL(N))
                              : this.load({ url: R.createObjectURL(N) });
                          } else
                            this.fail(
                              Error(
                                "The current browser does not support image compression."
                              )
                            );
                        else
                          this.fail(
                            Error(
                              "The first argument must be an image File or Blob object."
                            )
                          );
                      } else
                        this.fail(
                          Error(
                            "The first argument must be a File or Blob object."
                          )
                        );
                    },
                  },
                  {
                    key: "load",
                    value: function (K) {
                      var N = this,
                        P = this.file,
                        X = this.image;
                      X.onload = function () {
                        N.draw(
                          b(
                            b({}, K),
                            {},
                            {
                              naturalWidth: X.naturalWidth,
                              naturalHeight: X.naturalHeight,
                            }
                          )
                        );
                      };
                      X.onabort = function () {
                        N.fail(Error("Aborted to load the image."));
                      };
                      X.onerror = function () {
                        N.fail(Error("Failed to load the image."));
                      };
                      v.navigator &&
                        /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(
                          v.navigator.userAgent
                        ) &&
                        (X.crossOrigin = "anonymous");
                      X.alt = P.name;
                      X.src = K.url;
                    },
                  },
                  {
                    key: "draw",
                    value: function (K) {
                      var N = this,
                        P = K.naturalWidth,
                        X = K.naturalHeight,
                        y = K.rotate;
                      y = void 0 === y ? 0 : y;
                      var A = K.scaleX;
                      A = void 0 === A ? 1 : A;
                      K = K.scaleY;
                      var D = void 0 === K ? 1 : K,
                        G = this.file,
                        I = this.image,
                        C = this.options;
                      K = document.createElement("canvas");
                      var H = K.getContext("2d"),
                        O = Math.abs(y) % 180 == 90,
                        q =
                          ("contain" === C.resize || "cover" === C.resize) &&
                          x(C.width) &&
                          x(C.height),
                        u = Math.max(C.maxWidth, 0) || 1 / 0,
                        w = Math.max(C.maxHeight, 0) || 1 / 0,
                        z = Math.max(C.minWidth, 0) || 0,
                        E = Math.max(C.minHeight, 0) || 0,
                        Q = P / X,
                        U = C.width,
                        aa = C.height;
                      O &&
                        ((w = [w, u]),
                        (u = w[0]),
                        (w = w[1]),
                        (E = [E, z]),
                        (z = E[0]),
                        (E = E[1]),
                        (aa = [aa, U]),
                        (U = aa[0]),
                        (aa = aa[1]));
                      q && (Q = U / aa);
                      w = m({ aspectRatio: Q, width: u, height: w }, "contain");
                      u = w.width;
                      w = w.height;
                      var da = m(
                        { aspectRatio: Q, width: z, height: E },
                        "cover"
                      );
                      ((z = da.width), (E = da.height), q)
                        ? ((aa = m(
                            { aspectRatio: Q, width: U, height: aa },
                            C.resize
                          )),
                          (U = aa.width),
                          (aa = aa.height))
                        : ((aa = m({ aspectRatio: Q, width: U, height: aa })),
                          (U = aa.width),
                          (U = void 0 === U ? P : U),
                          (aa = aa.height),
                          (aa = void 0 === aa ? X : aa));
                      u = -(U = Math.floor(g(Math.min(Math.max(U, z), u)))) / 2;
                      E =
                        -(aa = Math.floor(g(Math.min(Math.max(aa, E), w)))) / 2;
                      w = U;
                      da = aa;
                      z = [];
                      if (q) {
                        q = P;
                        var fa = X;
                        Q = m(
                          { aspectRatio: Q, width: P, height: X },
                          { contain: "cover", cover: "contain" }[C.resize]
                        );
                        q = Q.width;
                        fa = Q.height;
                        z.push((P - q) / 2, (X - fa) / 2, q, fa);
                      }
                      if ((z.push(u, E, w, da), O))
                        (O = [aa, U]), (U = O[0]), (aa = O[1]);
                      K.width = U;
                      K.height = aa;
                      F.test(C.mimeType) || (C.mimeType = G.type);
                      O = "transparent";
                      G.size > C.convertSize &&
                        C.convertTypes.indexOf(C.mimeType) >= 0 &&
                        (C.mimeType = "image/jpeg");
                      var ha = "image/jpeg" === C.mimeType;
                      (ha && (O = "#fff"),
                      (H.fillStyle = O),
                      H.fillRect(0, 0, U, aa),
                      C.beforeDraw && C.beforeDraw.call(this, H, K),
                      this.aborted ||
                        (H.save(),
                        H.translate(U / 2, aa / 2),
                        H.rotate((y * Math.PI) / 180),
                        H.scale(A, D),
                        H.drawImage.apply(H, [I].concat(z)),
                        H.restore(),
                        C.drew && C.drew.call(this, H, K),
                        this.aborted)) ||
                        ((y = function (ja) {
                          if (!N.aborted) {
                            var ma = function (ia) {
                              return N.done({
                                naturalWidth: P,
                                naturalHeight: X,
                                result: ia,
                              });
                            };
                            if (
                              ja &&
                              ha &&
                              C.retainExif &&
                              N.exif &&
                              N.exif.length > 0
                            ) {
                              var na = function (ia) {
                                var oa = N.exif,
                                  la = d(new Uint8Array(ia));
                                255 === la[2] &&
                                  224 === la[3] &&
                                  ((ia = [255, 216].concat(
                                    oa,
                                    la.slice(4 + (256 * la[4] + la[5]))
                                  )),
                                  (ia = new Uint8Array(ia)));
                                return ma(r(c(ia, C.mimeType)));
                              };
                              if (ja.arrayBuffer)
                                ja.arrayBuffer()
                                  .then(na)
                                  .catch(function () {
                                    N.fail(
                                      Error(
                                        "Failed to read the compressed image with Blob.arrayBuffer()."
                                      )
                                    );
                                  });
                              else {
                                var ka = new W();
                                N.reader = ka;
                                ka.onload = function (ia) {
                                  na(ia.target.result);
                                };
                                ka.onabort = function () {
                                  N.fail(
                                    Error(
                                      "Aborted to read the compressed image with FileReader."
                                    )
                                  );
                                };
                                ka.onerror = function () {
                                  N.fail(
                                    Error(
                                      "Failed to read the compressed image with FileReader."
                                    )
                                  );
                                };
                                ka.onloadend = function () {
                                  N.reader = null;
                                };
                                ka.readAsArrayBuffer(ja);
                              }
                            } else ma(ja);
                          }
                        }),
                        K.toBlob
                          ? K.toBlob(y, C.mimeType, C.quality)
                          : y(r(K.toDataURL(C.mimeType, C.quality))));
                    },
                  },
                  {
                    key: "done",
                    value: function (K) {
                      var N = K.naturalWidth,
                        P = K.naturalHeight;
                      K = K.result;
                      var X = this.file,
                        y = this.image,
                        A = this.options;
                      if (
                        (R &&
                          0 === y.src.indexOf("blob:") &&
                          R.revokeObjectURL(y.src),
                        K)
                      )
                        if (
                          A.strict &&
                          !A.retainExif &&
                          K.size > X.size &&
                          A.mimeType === X.type &&
                          !(
                            A.width > N ||
                            A.height > P ||
                            A.minWidth > N ||
                            A.minHeight > P ||
                            A.maxWidth < N ||
                            A.maxHeight < P
                          )
                        )
                          K = X;
                        else {
                          if (
                            ((N = new Date()),
                            (K.lastModified = N.getTime()),
                            (K.lastModifiedDate = N),
                            (K.name = X.name),
                            K.name && K.type !== X.type)
                          ) {
                            N = K;
                            P = K.name;
                            X = P.replace;
                            y = K.type;
                            var D = F.test(y) ? y.substr(6) : "";
                            y = ("jpeg" === D && (D = "jpg"), ".".concat(D));
                            N.name = X.call(P, ba, y);
                          }
                        }
                      else K = X;
                      this.result = K;
                      A.success && A.success.call(this, K);
                    },
                  },
                  {
                    key: "fail",
                    value: function (K) {
                      var N = this.options;
                      if (!N.error) throw K;
                      N.error.call(this, K);
                    },
                  },
                  {
                    key: "abort",
                    value: function () {
                      this.aborted ||
                        ((this.aborted = !0),
                        this.reader
                          ? this.reader.abort()
                          : this.image.complete
                          ? this.fail(
                              Error("The compression process has been aborted.")
                            )
                          : ((this.image.onload = null), this.image.onabort()));
                    },
                  },
                ],
                [
                  {
                    key: "noConflict",
                    value: function () {
                      return (window.Compressor = Z), M;
                    },
                  },
                  {
                    key: "setDefaults",
                    value: function (K) {
                      h(t, K);
                    },
                  },
                ]
              ),
              M
            );
          })();
        })();
      },
      17833: (l, a, b) => {
        a.formatArgs = function (k) {
          if (
            ((k[0] =
              (this.useColors ? "%c" : "") +
              this.namespace +
              (this.useColors ? " %c" : " ") +
              k[0] +
              (this.useColors ? "%c " : " ") +
              "+" +
              l.exports.humanize(this.diff)),
            this.useColors)
          ) {
            var h = "color: " + this.color;
            k.splice(1, 0, h, "color: inherit");
            var e = 0,
              d = 0;
            k[0].replace(/%[a-zA-Z%]/g, (c) => {
              "%%" !== c && (e++, "%c" === c && (d = e));
            });
            k.splice(d, 0, h);
          }
        };
        a.save = function (k) {
          try {
            k ? a.storage.setItem("debug", k) : a.storage.removeItem("debug");
          } catch (h) {}
        };
        a.load = function () {
          let k;
          try {
            k = a.storage.getItem("debug");
          } catch (h) {}
          !k &&
            "undefined" != typeof process &&
            "env" in process &&
            (k = process.env.DEBUG);
          return k;
        };
        a.useColors = function () {
          if (
            "undefined" != typeof window &&
            window.process &&
            ("renderer" === window.process.type || window.process.__nwjs)
          )
            return !0;
          if (
            "undefined" != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1;
          let k;
          return (
            ("undefined" != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ("undefined" != typeof window &&
              window.console &&
              (window.console.firebug ||
                (window.console.exception && window.console.table))) ||
            ("undefined" != typeof navigator &&
              navigator.userAgent &&
              (k = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
              parseInt(k[1], 10) >= 31) ||
            ("undefined" != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          );
        };
        a: {
          try {
            var f = localStorage;
            break a;
          } catch (k) {}
          f = void 0;
        }
        a.storage = f;
        a.destroy = (() => {
          let k = !1;
          return () => {
            k ||
              ((k = !0),
              console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
              ));
          };
        })();
        a.colors =
          "#0000CC #0000FF #0033CC #0033FF #0066CC #0066FF #0099CC #0099FF #00CC00 #00CC33 #00CC66 #00CC99 #00CCCC #00CCFF #3300CC #3300FF #3333CC #3333FF #3366CC #3366FF #3399CC #3399FF #33CC00 #33CC33 #33CC66 #33CC99 #33CCCC #33CCFF #6600CC #6600FF #6633CC #6633FF #66CC00 #66CC33 #9900CC #9900FF #9933CC #9933FF #99CC00 #99CC33 #CC0000 #CC0033 #CC0066 #CC0099 #CC00CC #CC00FF #CC3300 #CC3333 #CC3366 #CC3399 #CC33CC #CC33FF #CC6600 #CC6633 #CC9900 #CC9933 #CCCC00 #CCCC33 #FF0000 #FF0033 #FF0066 #FF0099 #FF00CC #FF00FF #FF3300 #FF3333 #FF3366 #FF3399 #FF33CC #FF33FF #FF6600 #FF6633 #FF9900 #FF9933 #FFCC00 #FFCC33".split(
            " "
          );
        a.log = console.debug || console.log || (() => {});
        l.exports = b(40736)(a);
        ({ formatters: b } = l.exports);
        b.j = function (k) {
          try {
            return JSON.stringify(k);
          } catch (h) {
            return "[UnexpectedJSONParseError]: " + h.message;
          }
        };
      },
      40736: (l, a, b) => {
        l.exports = function (f) {
          function k(d) {
            function c(...r) {
              if (c.enabled) {
                var t = Number(new Date());
                c.diff = t - (g || t);
                c.prev = g;
                g = c.curr = t;
                r[0] = k.coerce(r[0]);
                "string" != typeof r[0] && r.unshift("%O");
                var v = 0;
                r[0] = r[0].replace(/%([a-zA-Z%])/g, (x, B) => {
                  if ("%%" === x) return "%";
                  v++;
                  B = k.formatters[B];
                  "function" == typeof B &&
                    ((x = B.call(c, r[v])), r.splice(v, 1), v--);
                  return x;
                });
                k.formatArgs.call(c, r);
                (c.log || k.log).apply(c, r);
              }
            }
            let g,
              m,
              n,
              p = null;
            return (
              (c.namespace = d),
              (c.useColors = k.useColors()),
              (c.color = k.selectColor(d)),
              (c.extend = h),
              (c.destroy = k.destroy),
              Object.defineProperty(c, "enabled", {
                enumerable: !0,
                configurable: !1,
                get: () =>
                  null !== p
                    ? p
                    : (m !== k.namespaces &&
                        ((m = k.namespaces), (n = k.enabled(d))),
                      n),
                set: (r) => {
                  p = r;
                },
              }),
              "function" == typeof k.init && k.init(c),
              c
            );
          }
          function h(d, c) {
            d = k(this.namespace + (void 0 === c ? ":" : c) + d);
            return (d.log = this.log), d;
          }
          function e(d) {
            return d
              .toString()
              .substring(2, d.toString().length - 2)
              .replace(/\.\*\?$/, "*");
          }
          return (
            (k.debug = k),
            (k.default = k),
            (k.coerce = function (d) {
              return d instanceof Error ? d.stack || d.message : d;
            }),
            (k.disable = function () {
              const d = [
                ...k.names.map(e),
                ...k.skips.map(e).map((c) => "-" + c),
              ].join();
              return k.enable(""), d;
            }),
            (k.enable = function (d) {
              let c;
              k.save(d);
              k.namespaces = d;
              k.names = [];
              k.skips = [];
              const g = ("string" == typeof d ? d : "").split(/[\s,]+/),
                m = g.length;
              for (c = 0; c < m; c++)
                g[c] &&
                  ("-" === (d = g[c].replace(/\*/g, ".*?"))[0]
                    ? k.skips.push(new RegExp("^" + d.slice(1) + "$"))
                    : k.names.push(new RegExp("^" + d + "$")));
            }),
            (k.enabled = function (d) {
              if ("*" === d[d.length - 1]) return !0;
              let c, g;
              c = 0;
              for (g = k.skips.length; c < g; c++)
                if (k.skips[c].test(d)) return !1;
              c = 0;
              for (g = k.names.length; c < g; c++)
                if (k.names[c].test(d)) return !0;
              return !1;
            }),
            (k.humanize = b(6585)),
            (k.destroy = function () {
              console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
              );
            }),
            Object.keys(f).forEach((d) => {
              k[d] = f[d];
            }),
            (k.names = []),
            (k.skips = []),
            (k.formatters = {}),
            (k.selectColor = function (d) {
              let c = 0;
              for (let g = 0; g < d.length; g++)
                (c = (c << 5) - c + d.charCodeAt(g)), (c |= 0);
              return k.colors[Math.abs(c) % k.colors.length];
            }),
            k.enable(k.load()),
            k
          );
        };
      },
      53011: (l, a, b) => {
        var f;
        !(function (k) {
          function h() {
            this._events = {};
            this._conf && e.call(this, this._conf);
          }
          function e(y) {
            y &&
              ((this._conf = y),
              y.delimiter && (this.delimiter = y.delimiter),
              y.maxListeners !== k && (this._maxListeners = y.maxListeners),
              y.wildcard && (this.wildcard = y.wildcard),
              y.newListener && (this._newListener = y.newListener),
              y.removeListener && (this._removeListener = y.removeListener),
              y.verboseMemoryLeak &&
                (this.verboseMemoryLeak = y.verboseMemoryLeak),
              y.ignoreErrors && (this.ignoreErrors = y.ignoreErrors),
              this.wildcard && (this.listenerTree = {}));
          }
          function d(y, A) {
            var D =
              "(node) warning: possible EventEmitter memory leak detected. " +
              y +
              " listeners added. Use emitter.setMaxListeners() to increase limit.";
            (this.verboseMemoryLeak && (D += " Event name: " + A + "."),
            "undefined" != typeof process && process.emitWarning)
              ? ((A = Error(D)),
                (A.name = "MaxListenersExceededWarning"),
                (A.emitter = this),
                (A.count = y),
                process.emitWarning(A))
              : (console.error(D), console.trace && console.trace());
          }
          function c(y, A) {
            for (
              var D = {}, G = y.length, I = A ? A.length : 0, C = 0;
              C < G;
              C++
            )
              D[y[C]] = C < I ? A[C] : k;
            return D;
          }
          function g(y, A, D) {
            var G, I;
            if (
              ((this._emitter = y),
              (this._target = A),
              (this._listeners = {}),
              (this._listenersCount = 0),
              (D.on || D.off) && ((G = D.on), (I = D.off)),
              A.addEventListener
                ? ((G = A.addEventListener), (I = A.removeEventListener))
                : A.addListener
                ? ((G = A.addListener), (I = A.removeListener))
                : A.on && ((G = A.on), (I = A.off)),
              !G && !I)
            )
              throw Error("target does not implement any known event API");
            if ("function" != typeof G)
              throw TypeError("on method must be a function");
            if ("function" != typeof I)
              throw TypeError("off method must be a function");
            this._on = G;
            this._off = I;
            (A = y._observers) ? A.push(this) : (y._observers = [this]);
          }
          function m(y, A, D, G) {
            function I(E) {
              throw Error(
                'Invalid "' + H + '" option value' + (E ? ". Reason: " + E : "")
              );
            }
            var C = Object.assign({}, A);
            if (!y) return C;
            if ("object" != typeof y)
              throw TypeError("options must be an object");
            for (
              var H, O, q, u = Object.keys(y), w = u.length, z = 0;
              z < w;
              z++
            ) {
              if (((H = u[z]), !G && !T.call(A, H)))
                throw Error('Unknown "' + H + '" option');
              (O = y[H]) !== k && ((q = D[H]), (C[H] = q ? q(O, I) : O));
            }
            return C;
          }
          function n(y, A) {
            return (
              ("function" == typeof y && y.hasOwnProperty("prototype")) ||
                A("value must be a constructor"),
              y
            );
          }
          function p(y) {
            var A = "value must be type of " + y.join("|"),
              D = y.length,
              G = y[0],
              I = y[1];
            return 1 === D
              ? function (C, H) {
                  if (typeof C === G) return C;
                  H(A);
                }
              : 2 === D
              ? function (C, H) {
                  var O = typeof C;
                  if (O === G || O === I) return C;
                  H(A);
                }
              : function (C, H) {
                  for (var O = typeof C, q = D; q-- > 0; )
                    if (O === y[q]) return C;
                  H(A);
                };
          }
          function r(y, A, D) {
            var G,
              I,
              C,
              H = 0,
              O = new y(function (q, u, w) {
                function z() {
                  I &&= null;
                  H && (clearTimeout(H), (H = 0));
                }
                D = m(
                  D,
                  { timeout: 0, overload: !1 },
                  {
                    timeout: function (U, aa) {
                      return (
                        ("number" != typeof (U *= 1) ||
                          U < 0 ||
                          !Number.isFinite(U)) &&
                          aa("timeout must be a positive number"),
                        U
                      );
                    },
                  }
                );
                G =
                  !D.overload &&
                  "function" == typeof y.prototype.cancel &&
                  "function" == typeof w;
                var E = function (U) {
                    z();
                    q(U);
                  },
                  Q = function (U) {
                    z();
                    u(U);
                  };
                G
                  ? A(E, Q, w)
                  : ((I = [
                      function (U) {
                        Q(U || Error("canceled"));
                      },
                    ]),
                    A(E, Q, function (U) {
                      if (C)
                        throw Error(
                          "Unable to subscribe on cancel event asynchronously"
                        );
                      if ("function" != typeof U)
                        throw TypeError("onCancel callback must be a function");
                      I.push(U);
                    }),
                    (C = !0));
                D.timeout > 0 &&
                  (H = setTimeout(function () {
                    var U = Error("timeout");
                    U.code = "ETIMEDOUT";
                    H = 0;
                    O.cancel(U);
                    u(U);
                  }, D.timeout));
              });
            return (
              G ||
                (O.cancel = function (q) {
                  if (I) {
                    for (var u = I.length, w = 1; w < u; w++) I[w](q);
                    I[0](q);
                    I = null;
                  }
                }),
              O
            );
          }
          function t(y) {
            var A = this._observers;
            if (!A) return -1;
            for (var D = A.length, G = 0; G < D; G++)
              if (A[G]._target === y) return G;
            return -1;
          }
          function v(y, A, D, G, I) {
            if (!D) return null;
            if (0 === G) {
              var C = typeof A;
              if ("string" === C) {
                var H = 0,
                  O = 0,
                  q = this.delimiter,
                  u = q.length;
                if (-1 !== (C = A.indexOf(q))) {
                  I = Array(5);
                  do (I[H++] = A.slice(O, C)), (O = C + u);
                  while (-1 !== (C = A.indexOf(q, O)));
                  I[H++] = A.slice(O);
                  A = I;
                  I = H;
                } else (A = [A]), (I = 1);
              } else "object" === C ? (I = A.length) : ((A = [A]), (I = 1));
            }
            var w, z, E, Q;
            H = null;
            q = A[G];
            O = A[G + 1];
            if (G === I)
              D._listeners &&
                ("function" == typeof D._listeners
                  ? (y && y.push(D._listeners), (H = [D]))
                  : (y && y.push.apply(y, D._listeners), (H = [D])));
            else {
              if ("*" === q) {
                for (C = (z = M(D)).length; C-- > 0; )
                  "_listeners" !== (w = z[C]) &&
                    (E = v(y, A, D[w], G + 1, I)) &&
                    (H ? H.push.apply(H, E) : (H = E));
                return H;
              }
              if ("**" === q) {
                (Q = G + 1 === I || (G + 2 === I && "*" === O)) &&
                  D._listeners &&
                  (H = v(y, A, D, I, I));
                for (C = (z = M(D)).length; C-- > 0; )
                  "_listeners" !== (w = z[C]) &&
                    ("*" === w || "**" === w
                      ? (D[w]._listeners &&
                          !Q &&
                          (E = v(y, A, D[w], I, I)) &&
                          (H ? H.push.apply(H, E) : (H = E)),
                        (E = v(y, A, D[w], G, I)))
                      : (E = v(y, A, D[w], w === O ? G + 2 : G, I)),
                    E && (H ? H.push.apply(H, E) : (H = E)));
                return H;
              }
              D[q] && (H = v(y, A, D[q], G + 1, I));
            }
            if (((z = D["*"]) && v(y, A, z, G + 1, I), (E = D["**"])))
              if (G < I)
                for (
                  E._listeners && v(y, A, E, I, I), C = (z = M(E)).length;
                  C-- > 0;

                )
                  "_listeners" !== (w = z[C]) &&
                    (w === O
                      ? v(y, A, E[w], G + 2, I)
                      : w === q
                      ? v(y, A, E[w], G + 1, I)
                      : (((Q = {})[w] = E[w]), v(y, A, { "**": Q }, G + 1, I)));
              else
                E._listeners
                  ? v(y, A, E, I, I)
                  : E["*"] && E["*"]._listeners && v(y, A, E["*"], I, I);
            return H;
          }
          function x(y, A, D, G) {
            for (
              var I, C, H, O = M(y), q = O.length, u = y._listeners;
              q-- > 0;

            )
              (I = y[(C = O[q])]),
                (H = "_listeners" === C ? D : D ? D.concat(C) : [C]),
                (C = G || "symbol" == typeof C),
                u && A.push(C ? H : H.join(this.delimiter)),
                "object" == typeof I && x.call(this, I, A, H, C);
            return A;
          }
          function B(y) {
            for (var A, D, G, I = M(y), C = I.length; C-- > 0; )
              (A = y[(D = I[C])]) &&
                ((G = !0), "_listeners" === D || B(A) || delete y[D]);
            return G;
          }
          function F(y, A, D) {
            this.emitter = y;
            this.event = A;
            this.listener = D;
          }
          function L(y, A, D) {
            if (!0 === D) I = !0;
            else if (!1 === D) G = !0;
            else {
              if (!D || "object" != typeof D)
                throw TypeError("options should be an object or true");
              var G = D.async,
                I = D.promisify,
                C = D.nextTick,
                H = D.objectify;
            }
            if (G || C || I) {
              var O = A;
              D = A._origin || A;
              if (C && !W) throw Error("process.nextTick is not supported");
              I === k && (I = "AsyncFunction" === A.constructor.name);
              A = function () {
                var q = arguments,
                  u = this,
                  w = this.event;
                return I
                  ? C
                    ? Promise.resolve()
                    : new Promise(function (z) {
                        Z(z);
                      }).then(function () {
                        return (u.event = w), O.apply(u, q);
                      })
                  : (C ? process.nextTick : Z)(function () {
                      u.event = w;
                      O.apply(u, q);
                    });
              };
              A._async = !0;
              A._origin = D;
            }
            return [A, H ? new F(this, y, A) : this];
          }
          function J(y) {
            this._events = {};
            this.verboseMemoryLeak =
              this._removeListener =
              this._newListener =
                !1;
            e.call(this, y);
          }
          var T = Object.hasOwnProperty,
            V = Array.isArray
              ? Array.isArray
              : function (y) {
                  return "[object Array]" === Object.prototype.toString.call(y);
                },
            W =
              "object" == typeof process &&
              "function" == typeof process.nextTick,
            R = "function" == typeof Symbol,
            ba = "object" == typeof Reflect,
            Z = "function" == typeof setImmediate ? setImmediate : setTimeout,
            M = R
              ? ba && "function" == typeof Reflect.ownKeys
                ? Reflect.ownKeys
                : function (y) {
                    var A = Object.getOwnPropertyNames(y);
                    return A.push.apply(A, Object.getOwnPropertySymbols(y)), A;
                  }
              : Object.keys,
            K = function (y, A, D) {
              var G = arguments.length;
              switch (G) {
                case 0:
                  return [];
                case 1:
                  return [y];
                case 2:
                  return [y, A];
                case 3:
                  return [y, A, D];
                default:
                  for (var I = Array(G); G--; ) I[G] = arguments[G];
                  return I;
              }
            };
          Object.assign(g.prototype, {
            subscribe: function (y, A, D) {
              var G = this,
                I = this._target,
                C = this._emitter,
                H = this._listeners,
                O = function () {
                  var q = K.apply(null, arguments),
                    u = { data: q, name: A, original: y };
                  D
                    ? !1 !== D.call(I, u) && C.emit.apply(C, [u.name].concat(q))
                    : C.emit.apply(C, [A].concat(q));
                };
              if (H[y]) throw Error("Event '" + y + "' is already listening");
              this._listenersCount++;
              C._newListener && C._removeListener && !G._onNewListener
                ? ((this._onNewListener = function (q) {
                    q === A &&
                      null === H[y] &&
                      ((H[y] = O), G._on.call(I, y, O));
                  }),
                  C.on("newListener", this._onNewListener),
                  (this._onRemoveListener = function (q) {
                    q === A &&
                      !C.hasListeners(q) &&
                      H[y] &&
                      ((H[y] = null), G._off.call(I, y, O));
                  }),
                  (H[y] = null),
                  C.on("removeListener", this._onRemoveListener))
                : ((H[y] = O), G._on.call(I, y, O));
            },
            unsubscribe: function (y) {
              function A() {
                I._onNewListener &&
                  (H.off("newListener", I._onNewListener),
                  H.off("removeListener", I._onRemoveListener),
                  (I._onNewListener = null),
                  (I._onRemoveListener = null));
                var u = t.call(H, I);
                H._observers.splice(u, 1);
              }
              var D,
                G,
                I = this,
                C = this._listeners,
                H = this._emitter,
                O = this._off,
                q = this._target;
              if (y && "string" != typeof y)
                throw TypeError("event must be a string");
              if (y) {
                if ((D = C[y]))
                  O.call(q, y, D), delete C[y], --this._listenersCount || A();
              } else {
                for (G = (D = M(C)).length; G-- > 0; )
                  (y = D[G]), O.call(q, y, C[y]);
                this._listeners = {};
                this._listenersCount = 0;
                A();
              }
            },
          });
          var N = p(["function"]),
            P = p(["object", "function"]);
          F.prototype.off = function () {
            return this.emitter.off(this.event, this.listener), this;
          };
          J.EventEmitter2 = J;
          J.prototype.listenTo = function (y, A, D) {
            function G(C) {
              if ("object" != typeof C)
                throw TypeError("events must be an object");
              var H = D.reducers;
              var O = t.call(I, y);
              O = -1 === O ? new g(I, y, D) : I._observers[O];
              for (
                var q,
                  u = M(C),
                  w = u.length,
                  z = "function" == typeof H,
                  E = 0;
                E < w;
                E++
              )
                (q = u[E]), O.subscribe(q, C[q] || q, z ? H : H && H[q]);
            }
            if ("object" != typeof y)
              throw TypeError("target musts be an object");
            var I = this;
            return (
              (D = m(
                D,
                { on: k, off: k, reducers: k },
                { on: N, off: N, reducers: P }
              )),
              V(A) ? G(c(A)) : G("string" == typeof A ? c(A.split(/\s+/)) : A),
              this
            );
          };
          J.prototype.stopListeningTo = function (y, A) {
            var D = this._observers;
            if (!D) return !1;
            var G = D.length,
              I = !1;
            if (y && "object" != typeof y)
              throw TypeError("target should be an object");
            for (; G-- > 0; ) {
              var C = D[G];
              (y && C._target !== y) || (C.unsubscribe(A), (I = !0));
            }
            return I;
          };
          J.prototype.delimiter = ".";
          J.prototype.setMaxListeners = function (y) {
            y !== k &&
              ((this._maxListeners = y),
              this._conf || (this._conf = {}),
              (this._conf.maxListeners = y));
          };
          J.prototype.getMaxListeners = function () {
            return this._maxListeners;
          };
          J.prototype.event = "";
          J.prototype.once = function (y, A, D) {
            return this._once(y, A, !1, D);
          };
          J.prototype.prependOnceListener = function (y, A, D) {
            return this._once(y, A, !0, D);
          };
          J.prototype._once = function (y, A, D, G) {
            return this._many(y, 1, A, D, G);
          };
          J.prototype.many = function (y, A, D, G) {
            return this._many(y, A, D, !1, G);
          };
          J.prototype.prependMany = function (y, A, D, G) {
            return this._many(y, A, D, !0, G);
          };
          J.prototype._many = function (y, A, D, G, I) {
            function C() {
              return 0 == --A && H.off(y, C), D.apply(this, arguments);
            }
            var H = this;
            if ("function" != typeof D)
              throw Error("many only accepts instances of Function");
            return (C._origin = D), this._on(y, C, G, I);
          };
          J.prototype.emit = function () {
            if (!this._events && !this._all) return !1;
            this._events || h.call(this);
            var y,
              A,
              D,
              G = arguments[0],
              I = this.wildcard;
            if (
              "newListener" === G &&
              !this._newListener &&
              !this._events.newListener
            )
              return !1;
            if (
              I &&
              ((y = G),
              "newListener" !== G &&
                "removeListener" !== G &&
                "object" == typeof G)
            ) {
              if (((A = G.length), R))
                for (D = 0; D < A; D++)
                  if ("symbol" == typeof G[D]) {
                    var C = !0;
                    break;
                  }
              C || (G = G.join(this.delimiter));
            }
            var H = arguments.length;
            if (this._all && this._all.length)
              for (D = 0, A = (C = this._all.slice()).length; D < A; D++)
                switch (((this.event = G), H)) {
                  case 1:
                    C[D].call(this, G);
                    break;
                  case 2:
                    C[D].call(this, G, arguments[1]);
                    break;
                  case 3:
                    C[D].call(this, G, arguments[1], arguments[2]);
                    break;
                  default:
                    C[D].apply(this, arguments);
                }
            if (I) (C = []), v.call(this, C, y, this.listenerTree, 0, A);
            else {
              if ("function" == typeof (C = this._events[G])) {
                switch (((this.event = G), H)) {
                  case 1:
                    C.call(this);
                    break;
                  case 2:
                    C.call(this, arguments[1]);
                    break;
                  case 3:
                    C.call(this, arguments[1], arguments[2]);
                    break;
                  default:
                    var O = Array(H - 1);
                    for (y = 1; y < H; y++) O[y - 1] = arguments[y];
                    C.apply(this, O);
                }
                return !0;
              }
              C &&= C.slice();
            }
            if (C && C.length) {
              if (H > 3)
                for (O = Array(H - 1), y = 1; y < H; y++)
                  O[y - 1] = arguments[y];
              D = 0;
              for (A = C.length; D < A; D++)
                switch (((this.event = G), H)) {
                  case 1:
                    C[D].call(this);
                    break;
                  case 2:
                    C[D].call(this, arguments[1]);
                    break;
                  case 3:
                    C[D].call(this, arguments[1], arguments[2]);
                    break;
                  default:
                    C[D].apply(this, O);
                }
              return !0;
            }
            if (!this.ignoreErrors && !this._all && "error" === G)
              throw arguments[1] instanceof Error
                ? arguments[1]
                : Error("Uncaught, unspecified 'error' event.");
            return !!this._all;
          };
          J.prototype.emitAsync = function () {
            if (!this._events && !this._all) return !1;
            this._events || h.call(this);
            var y,
              A,
              D,
              G = arguments[0],
              I = this.wildcard;
            if (
              "newListener" === G &&
              !this._newListener &&
              !this._events.newListener
            )
              return Promise.resolve([!1]);
            if (
              I &&
              ((y = G),
              "newListener" !== G &&
                "removeListener" !== G &&
                "object" == typeof G)
            ) {
              if (((A = G.length), R))
                for (D = 0; D < A; D++)
                  if ("symbol" == typeof G[D]) {
                    var C = !0;
                    break;
                  }
              C || (G = G.join(this.delimiter));
            }
            var H;
            C = [];
            var O = arguments.length;
            if (this._all)
              for (D = 0, A = this._all.length; D < A; D++)
                switch (((this.event = G), O)) {
                  case 1:
                    C.push(this._all[D].call(this, G));
                    break;
                  case 2:
                    C.push(this._all[D].call(this, G, arguments[1]));
                    break;
                  case 3:
                    C.push(
                      this._all[D].call(this, G, arguments[1], arguments[2])
                    );
                    break;
                  default:
                    C.push(this._all[D].apply(this, arguments));
                }
            if (
              (I
                ? ((H = []), v.call(this, H, y, this.listenerTree, 0))
                : (H = this._events[G]),
              "function" == typeof H)
            )
              switch (((this.event = G), O)) {
                case 1:
                  C.push(H.call(this));
                  break;
                case 2:
                  C.push(H.call(this, arguments[1]));
                  break;
                case 3:
                  C.push(H.call(this, arguments[1], arguments[2]));
                  break;
                default:
                  var q = Array(O - 1);
                  for (y = 1; y < O; y++) q[y - 1] = arguments[y];
                  C.push(H.apply(this, q));
              }
            else if (H && H.length) {
              if (((H = H.slice()), O > 3))
                for (q = Array(O - 1), y = 1; y < O; y++)
                  q[y - 1] = arguments[y];
              D = 0;
              for (A = H.length; D < A; D++)
                switch (((this.event = G), O)) {
                  case 1:
                    C.push(H[D].call(this));
                    break;
                  case 2:
                    C.push(H[D].call(this, arguments[1]));
                    break;
                  case 3:
                    C.push(H[D].call(this, arguments[1], arguments[2]));
                    break;
                  default:
                    C.push(H[D].apply(this, q));
                }
            } else if (!this.ignoreErrors && !this._all && "error" === G)
              return arguments[1] instanceof Error
                ? Promise.reject(arguments[1])
                : Promise.reject("Uncaught, unspecified 'error' event.");
            return Promise.all(C);
          };
          J.prototype.on = function (y, A, D) {
            return this._on(y, A, !1, D);
          };
          J.prototype.prependListener = function (y, A, D) {
            return this._on(y, A, !0, D);
          };
          J.prototype.onAny = function (y) {
            return this._onAny(y, !1);
          };
          J.prototype.prependAny = function (y) {
            return this._onAny(y, !0);
          };
          J.prototype.addListener = J.prototype.on;
          J.prototype._onAny = function (y, A) {
            if ("function" != typeof y)
              throw Error("onAny only accepts instances of Function");
            return (
              this._all || (this._all = []),
              A ? this._all.unshift(y) : this._all.push(y),
              this
            );
          };
          J.prototype._on = function (y, A, D, G) {
            if ("function" == typeof y) return this._onAny(y, A), this;
            if ("function" != typeof A)
              throw Error("on only accepts instances of Function");
            this._events || h.call(this);
            var I,
              C = this;
            G !== k && ((A = (I = L.call(this, y, A, G))[0]), (C = I[1]));
            this._newListener && this.emit("newListener", y, A);
            if (this.wildcard) {
              a: {
                var H = 0,
                  O = 0,
                  q = this.delimiter,
                  u = q.length;
                if ("string" == typeof y)
                  if (-1 !== (G = y.indexOf(q))) {
                    I = Array(5);
                    do (I[H++] = y.slice(O, G)), (O = G + u);
                    while (-1 !== (G = y.indexOf(q, O)));
                    I[H++] = y.slice(O);
                  } else (I = [y]), (H = 1);
                else (I = y), (H = y.length);
                if (H > 1)
                  for (G = 0; G + 1 < H; G++)
                    if ("**" === I[G] && "**" === I[G + 1]) break a;
                var w;
                y = this.listenerTree;
                for (G = 0; G < H; G++)
                  if (((y = y[(w = I[G])] || (y[w] = {})), G === H - 1)) {
                    y._listeners
                      ? ("function" == typeof y._listeners &&
                          (y._listeners = [y._listeners]),
                        D ? y._listeners.unshift(A) : y._listeners.push(A),
                        !y._listeners.warned &&
                          this._maxListeners > 0 &&
                          y._listeners.length > this._maxListeners &&
                          ((y._listeners.warned = !0),
                          d.call(this, y._listeners.length, w)))
                      : (y._listeners = A);
                    break a;
                  }
              }
              D = C;
            } else
              D =
                (this._events[y]
                  ? ("function" == typeof this._events[y] &&
                      (this._events[y] = [this._events[y]]),
                    D ? this._events[y].unshift(A) : this._events[y].push(A),
                    !this._events[y].warned &&
                      this._maxListeners > 0 &&
                      this._events[y].length > this._maxListeners &&
                      ((this._events[y].warned = !0),
                      d.call(this, this._events[y].length, y)))
                  : (this._events[y] = A),
                C);
            return D;
          };
          J.prototype.off = function (y, A) {
            if ("function" != typeof A)
              throw Error("removeListener only takes instances of Function");
            var D = [];
            if (this.wildcard) {
              if (
                ((D =
                  "string" == typeof y ? y.split(this.delimiter) : y.slice()),
                !(D = v.call(this, null, D, this.listenerTree, 0)))
              )
                return this;
            } else {
              if (!this._events[y]) return this;
              var G = this._events[y];
              D.push({ _listeners: G });
            }
            for (var I = 0; I < D.length; I++) {
              var C = D[I];
              if (((G = C._listeners), V(G))) {
                for (var H = -1, O = 0, q = G.length; O < q; O++)
                  if (
                    G[O] === A ||
                    (G[O].listener && G[O].listener === A) ||
                    (G[O]._origin && G[O]._origin === A)
                  ) {
                    H = O;
                    break;
                  }
                if (H < 0) continue;
                return (
                  this.wildcard
                    ? C._listeners.splice(H, 1)
                    : this._events[y].splice(H, 1),
                  0 === G.length &&
                    (this.wildcard
                      ? delete C._listeners
                      : delete this._events[y]),
                  this._removeListener && this.emit("removeListener", y, A),
                  this
                );
              }
              (G === A ||
                (G.listener && G.listener === A) ||
                (G._origin && G._origin === A)) &&
                (this.wildcard ? delete C._listeners : delete this._events[y],
                this._removeListener && this.emit("removeListener", y, A));
            }
            return this.listenerTree && B(this.listenerTree), this;
          };
          J.prototype.offAny = function (y) {
            var A, D;
            if (y && this._all && this._all.length > 0) {
              var G = 0;
              for (D = (A = this._all).length; G < D; G++)
                if (y === A[G])
                  return (
                    A.splice(G, 1),
                    this._removeListener && this.emit("removeListenerAny", y),
                    this
                  );
            } else {
              if (((A = this._all), this._removeListener))
                for (G = 0, D = A.length; G < D; G++)
                  this.emit("removeListenerAny", A[G]);
              this._all = [];
            }
            return this;
          };
          J.prototype.removeListener = J.prototype.off;
          J.prototype.removeAllListeners = function (y) {
            if (y === k) return !this._events || h.call(this), this;
            if (this.wildcard) {
              var A = v.call(this, null, y, this.listenerTree, 0);
              if (!A) return this;
              for (y = 0; y < A.length; y++) A[y]._listeners = null;
              this.listenerTree && B(this.listenerTree);
            } else this._events && (this._events[y] = null);
            return this;
          };
          J.prototype.listeners = function (y) {
            var A,
              D,
              G = this._events;
            if (y === k) {
              if (this.wildcard)
                throw Error("event name required for wildcard emitter");
              if (!G) return [];
              var I = (y = M(G)).length;
              for (D = []; I-- > 0; )
                "function" == typeof (A = G[y[I]])
                  ? D.push(A)
                  : D.push.apply(D, A);
              return D;
            }
            if (this.wildcard) {
              if (!(A = this.listenerTree)) return [];
              G = [];
              y = "string" == typeof y ? y.split(this.delimiter) : y.slice();
              return v.call(this, G, y, A, 0), G;
            }
            return G && (A = G[y]) ? ("function" == typeof A ? [A] : A) : [];
          };
          J.prototype.eventNames = function (y) {
            var A = this._events;
            return this.wildcard
              ? x.call(this, this.listenerTree, [], null, y)
              : A
              ? M(A)
              : [];
          };
          J.prototype.listenerCount = function (y) {
            return this.listeners(y).length;
          };
          J.prototype.hasListeners = function (y) {
            if (this.wildcard) {
              var A = [];
              y = "string" == typeof y ? y.split(this.delimiter) : y.slice();
              return v.call(this, A, y, this.listenerTree, 0), A.length > 0;
            }
            A = this._events;
            var D = this._all;
            return !!((D && D.length) || (A && (y === k ? M(A).length : A[y])));
          };
          J.prototype.listenersAny = function () {
            return this._all ? this._all : [];
          };
          J.prototype.waitFor = function (y, A) {
            var D = this,
              G = typeof A;
            return (
              "number" === G
                ? (A = { timeout: A })
                : "function" === G && (A = { filter: A }),
              r(
                (A = m(
                  A,
                  {
                    timeout: 0,
                    filter: k,
                    handleError: !1,
                    Promise,
                    overload: !1,
                  },
                  { filter: N, Promise: n }
                )).Promise,
                function (I, C, H) {
                  function O() {
                    var q = A.filter;
                    if (!q || q.apply(D, arguments))
                      (D.off(y, O), A.handleError)
                        ? (q = arguments[0])
                          ? C(q)
                          : I(K.apply(null, arguments).slice(1))
                        : I(K.apply(null, arguments));
                  }
                  H(function () {
                    D.off(y, O);
                  });
                  D._on(y, O, !1);
                },
                { timeout: A.timeout, overload: A.overload }
              )
            );
          };
          var X = J.prototype;
          Object.defineProperties(J, {
            defaultMaxListeners: {
              get: function () {
                return X._maxListeners;
              },
              set: function (y) {
                if ("number" != typeof y || y < 0 || Number.isNaN(y))
                  throw TypeError("n must be a non-negative number");
                X._maxListeners = y;
              },
              enumerable: !0,
            },
            once: {
              value: function (y, A, D) {
                return r(
                  (D = m(
                    D,
                    { Promise, timeout: 0, overload: !1 },
                    { Promise: n }
                  )).Promise,
                  function (G, I, C) {
                    var H;
                    if ("function" == typeof y.addEventListener)
                      return (
                        (H = function () {
                          G(K.apply(null, arguments));
                        }),
                        C(function () {
                          y.removeEventListener(A, H);
                        }),
                        void y.addEventListener(A, H, { once: !0 })
                      );
                    var O,
                      q = function () {
                        O && y.removeListener("error", O);
                        G(K.apply(null, arguments));
                      };
                    "error" !== A &&
                      ((O = function (u) {
                        y.removeListener(A, q);
                        I(u);
                      }),
                      y.once("error", O));
                    C(function () {
                      O && y.removeListener("error", O);
                      y.removeListener(A, q);
                    });
                    y.once(A, q);
                  },
                  { timeout: D.timeout, overload: D.overload }
                );
              },
              writable: !0,
              configurable: !0,
            },
          });
          Object.defineProperties(X, {
            _maxListeners: { value: 10, writable: !0, configurable: !0 },
            _observers: { value: null, writable: !0, configurable: !0 },
          });
          (f = J) === k || (l.exports = f);
        })();
      },
      5707: (l, a, b) => {
        async function f(t) {
          if (
            !(
              t instanceof Uint8Array ||
              t instanceof ArrayBuffer ||
              d.isBuffer(t)
            )
          )
            throw new TypeError(
              `Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof t}\``
            );
          if ((t = t instanceof d ? t : d.from(t)) && t.length > 1)
            return h(g.fromBuffer(t));
        }
        function k(t, v, x) {
          x = { offset: 0, ...x };
          for (const [B, F] of v.entries())
            if (x.mask) {
              if (F !== (x.mask[B] & t[B + x.offset])) return !1;
            } else if (F !== t[B + x.offset]) return !1;
          return !0;
        }
        async function h(t) {
          try {
            return e(t);
          } catch (v) {
            if (!(v instanceof g.EndOfStreamError)) throw v;
          }
        }
        async function e(t) {
          let v = d.alloc(4100);
          const x = (W, R) => k(v, W, R);
          var B = (W, R) => x(m(W), R);
          if (
            (t.fileInfo.size || (t.fileInfo.size = Number.MAX_SAFE_INTEGER),
            await t.peekBuffer(v, { length: 12, mayBeLess: !0 }),
            x([66, 77]))
          )
            return { ext: "bmp", mime: "image/bmp" };
          if (x([11, 119]))
            return { ext: "ac3", mime: "audio/vnd.dolby.dd-raw" };
          if (x([120, 1]))
            return { ext: "dmg", mime: "application/x-apple-diskimage" };
          if (x([77, 90]))
            return { ext: "exe", mime: "application/x-msdownload" };
          if (x([37, 33]))
            return (
              await t.peekBuffer(v, { length: 24, mayBeLess: !0 }),
              B("PS-Adobe-", { offset: 2 }) && B(" EPSF-", { offset: 14 })
                ? { ext: "eps", mime: "application/eps" }
                : { ext: "ps", mime: "application/postscript" }
            );
          if (x([31, 160]) || x([31, 157]))
            return { ext: "Z", mime: "application/x-compress" };
          if (x([255, 216, 255])) return { ext: "jpg", mime: "image/jpeg" };
          if (x([73, 73, 188]))
            return { ext: "jxr", mime: "image/vnd.ms-photo" };
          if (x([31, 139, 8])) return { ext: "gz", mime: "application/gzip" };
          if (x([66, 90, 104]))
            return { ext: "bz2", mime: "application/x-bzip2" };
          if (x(m("ID3"), void 0))
            return (
              await t.ignore(6),
              (B = await t.readToken(p)),
              t.position + B > t.fileInfo.size
                ? { ext: "mp3", mime: "audio/mpeg" }
                : (await t.ignore(B), h(t))
            );
          if (x(m("MP+"), void 0))
            return { ext: "mpc", mime: "audio/x-musepack" };
          if ((67 === v[0] || 70 === v[0]) && x([87, 83], { offset: 1 }))
            return { ext: "swf", mime: "application/x-shockwave-flash" };
          if (x([71, 73, 70])) return { ext: "gif", mime: "image/gif" };
          if (x(m("FLIF"), void 0)) return { ext: "flif", mime: "image/flif" };
          if (x(m("8BPS"), void 0))
            return { ext: "psd", mime: "image/vnd.adobe.photoshop" };
          if (B("WEBP", { offset: 8 }))
            return { ext: "webp", mime: "image/webp" };
          if (x(m("MPCK"), void 0))
            return { ext: "mpc", mime: "audio/x-musepack" };
          if (x(m("FORM"), void 0)) return { ext: "aif", mime: "audio/aiff" };
          if (B("icns", { offset: 0 }))
            return { ext: "icns", mime: "image/icns" };
          if (x([80, 75, 3, 4])) {
            try {
              for (; t.position + 30 < t.fileInfo.size; ) {
                await t.readBuffer(v, { length: 30 });
                var F = v.readUInt32LE(18),
                  L = v.readUInt32LE(22),
                  J = v.readUInt16LE(26),
                  T = v.readUInt16LE(28),
                  V;
                if (
                  ((V = await t.readToken(new c.StringType(J, "utf-8"))),
                  await t.ignore(T),
                  "META-INF/mozilla.rsa" === V)
                )
                  return { ext: "xpi", mime: "application/x-xpinstall" };
                if (V.endsWith(".rels") || V.endsWith(".xml"))
                  switch (V.split("/")[0]) {
                    case "word":
                      return {
                        ext: "docx",
                        mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      };
                    case "ppt":
                      return {
                        ext: "pptx",
                        mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                      };
                    case "xl":
                      return {
                        ext: "xlsx",
                        mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      };
                  }
                if (V.startsWith("xl/"))
                  return {
                    ext: "xlsx",
                    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  };
                if (V.startsWith("3D/") && V.endsWith(".model"))
                  return { ext: "3mf", mime: "model/3mf" };
                if ("mimetype" === V && F === L)
                  switch (await t.readToken(new c.StringType(F, "utf-8"))) {
                    case "application/epub+zip":
                      return { ext: "epub", mime: "application/epub+zip" };
                    case "application/vnd.oasis.opendocument.text":
                      return {
                        ext: "odt",
                        mime: "application/vnd.oasis.opendocument.text",
                      };
                    case "application/vnd.oasis.opendocument.spreadsheet":
                      return {
                        ext: "ods",
                        mime: "application/vnd.oasis.opendocument.spreadsheet",
                      };
                    case "application/vnd.oasis.opendocument.presentation":
                      return {
                        ext: "odp",
                        mime: "application/vnd.oasis.opendocument.presentation",
                      };
                  }
                if (0 === F)
                  for (B = -1; B < 0 && t.position < t.fileInfo.size; )
                    await t.peekBuffer(v, { mayBeLess: !0 }),
                      (B = v.indexOf("504B0304", 0, "hex")),
                      await t.ignore(B >= 0 ? B : v.length);
                else await t.ignore(F);
              }
            } catch (W) {
              if (!(W instanceof g.EndOfStreamError)) throw W;
            }
            return { ext: "zip", mime: "application/zip" };
          }
          if (x(m("OggS"), void 0))
            return (
              await t.ignore(28),
              (B = d.alloc(8)),
              await t.readBuffer(B),
              k(B, [79, 112, 117, 115, 72, 101, 97, 100])
                ? { ext: "opus", mime: "audio/opus" }
                : k(B, [128, 116, 104, 101, 111, 114, 97])
                ? { ext: "ogv", mime: "video/ogg" }
                : k(B, [1, 118, 105, 100, 101, 111, 0])
                ? { ext: "ogm", mime: "video/ogg" }
                : k(B, [127, 70, 76, 65, 67])
                ? { ext: "oga", mime: "audio/ogg" }
                : k(B, [83, 112, 101, 101, 120, 32, 32])
                ? { ext: "spx", mime: "audio/ogg" }
                : k(B, [1, 118, 111, 114, 98, 105, 115])
                ? { ext: "ogg", mime: "audio/ogg" }
                : { ext: "ogx", mime: "application/ogg" }
            );
          if (
            x([80, 75]) &&
            (3 === v[2] || 5 === v[2] || 7 === v[2]) &&
            (4 === v[3] || 6 === v[3] || 8 === v[3])
          )
            return { ext: "zip", mime: "application/zip" };
          if (B("ftyp", { offset: 4 }) && 96 & v[8])
            switch (
              ((B = v.toString("binary", 8, 12).replace("\x00", " ").trim()), B)
            ) {
              case "avif":
                return { ext: "avif", mime: "image/avif" };
              case "mif1":
                return { ext: "heic", mime: "image/heif" };
              case "msf1":
                return { ext: "heic", mime: "image/heif-sequence" };
              case "heic":
              case "heix":
                return { ext: "heic", mime: "image/heic" };
              case "hevc":
              case "hevx":
                return { ext: "heic", mime: "image/heic-sequence" };
              case "qt":
                return { ext: "mov", mime: "video/quicktime" };
              case "M4V":
              case "M4VH":
              case "M4VP":
                return { ext: "m4v", mime: "video/x-m4v" };
              case "M4P":
                return { ext: "m4p", mime: "video/mp4" };
              case "M4B":
                return { ext: "m4b", mime: "audio/mp4" };
              case "M4A":
                return { ext: "m4a", mime: "audio/x-m4a" };
              case "F4V":
                return { ext: "f4v", mime: "video/mp4" };
              case "F4P":
                return { ext: "f4p", mime: "video/mp4" };
              case "F4A":
                return { ext: "f4a", mime: "audio/mp4" };
              case "F4B":
                return { ext: "f4b", mime: "audio/mp4" };
              case "crx":
                return { ext: "cr3", mime: "image/x-canon-cr3" };
              default:
                return B.startsWith("3g")
                  ? B.startsWith("3g2")
                    ? { ext: "3g2", mime: "video/3gpp2" }
                    : { ext: "3gp", mime: "video/3gpp" }
                  : { ext: "mp4", mime: "video/mp4" };
            }
          if (x(m("MThd"), void 0)) return { ext: "mid", mime: "audio/midi" };
          if (
            x(m("wOFF"), void 0) &&
            (x([0, 1, 0, 0], { offset: 4 }) || B("OTTO", { offset: 4 }))
          )
            return { ext: "woff", mime: "font/woff" };
          if (
            x(m("wOF2"), void 0) &&
            (x([0, 1, 0, 0], { offset: 4 }) || B("OTTO", { offset: 4 }))
          )
            return { ext: "woff2", mime: "font/woff2" };
          if (x([212, 195, 178, 161]) || x([161, 178, 195, 212]))
            return { ext: "pcap", mime: "application/vnd.tcpdump.pcap" };
          if (x(m("DSD "), void 0)) return { ext: "dsf", mime: "audio/x-dsf" };
          if (x(m("LZIP"), void 0))
            return { ext: "lz", mime: "application/x-lzip" };
          if (x(m("fLaC"), void 0))
            return { ext: "flac", mime: "audio/x-flac" };
          if (x([66, 80, 71, 251])) return { ext: "bpg", mime: "image/bpg" };
          if (x(m("wvpk"), void 0)) return { ext: "wv", mime: "audio/wavpack" };
          if (x(m("%PDF"), void 0))
            return (
              await t.ignore(1350),
              (B = d.alloc(Math.min(10485760, t.fileInfo.size))),
              await t.readBuffer(B, { mayBeLess: !0 }),
              B.includes(d.from("AIPrivateData"))
                ? { ext: "ai", mime: "application/postscript" }
                : { ext: "pdf", mime: "application/pdf" }
            );
          if (x([0, 97, 115, 109]))
            return { ext: "wasm", mime: "application/wasm" };
          if (x([73, 73, 42, 0]))
            return B("CR", { offset: 8 })
              ? { ext: "cr2", mime: "image/x-canon-cr2" }
              : x([28, 0, 254, 0], { offset: 8 }) ||
                x([31, 0, 11, 0], { offset: 8 })
              ? { ext: "nef", mime: "image/x-nikon-nef" }
              : x([8, 0, 0, 0], { offset: 4 }) &&
                (x([45, 0, 254, 0], { offset: 8 }) ||
                  x([39, 0, 254, 0], { offset: 8 }))
              ? { ext: "dng", mime: "image/x-adobe-dng" }
              : ((v = d.alloc(24)),
                await t.peekBuffer(v),
                (x([16, 251, 134, 1], { offset: 4 }) ||
                  x([8, 0, 0, 0], { offset: 4 })) &&
                x([0, 254, 0, 4, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 1], {
                  offset: 9,
                })
                  ? { ext: "arw", mime: "image/x-sony-arw" }
                  : { ext: "tif", mime: "image/tiff" });
          if (x([77, 77, 0, 42])) return { ext: "tif", mime: "image/tiff" };
          if (x(m("MAC "), void 0)) return { ext: "ape", mime: "audio/ape" };
          if (x([26, 69, 223, 163])) {
            async function W() {
              var ba = await t.peekNumber(c.UINT8);
              let Z = 128,
                M = 0;
              for (; !(ba & Z) && 0 !== Z; ) ++M, (Z >>= 1);
              ba = d.alloc(M + 1);
              return await t.readBuffer(ba), ba;
            }
            async function R() {
              const ba = await W(),
                Z = await W();
              Z[0] ^= 128 >> (Z.length - 1);
              const M = Math.min(6, Z.length);
              return {
                id: ba.readUIntBE(0, ba.length),
                len: Z.readUIntBE(Z.length - M, M),
              };
            }
            switch (
              await (async function (ba, Z) {
                for (; Z > 0; ) {
                  ba = await R();
                  if (17026 === ba.id)
                    return t.readToken(new c.StringType(ba.len, "utf-8"));
                  await t.ignore(ba.len);
                  --Z;
                }
              })(0, (await R()).len)
            ) {
              case "webm":
                return { ext: "webm", mime: "video/webm" };
              case "matroska":
                return { ext: "mkv", mime: "video/x-matroska" };
              default:
                return;
            }
          }
          if (x([82, 73, 70, 70])) {
            if (x([65, 86, 73], { offset: 8 }))
              return { ext: "avi", mime: "video/vnd.avi" };
            if (x([87, 65, 86, 69], { offset: 8 }))
              return { ext: "wav", mime: "audio/vnd.wave" };
            if (x([81, 76, 67, 77], { offset: 8 }))
              return { ext: "qcp", mime: "audio/qcelp" };
          }
          if (x(m("SQLi"), void 0))
            return { ext: "sqlite", mime: "application/x-sqlite3" };
          if (x([78, 69, 83, 26]))
            return { ext: "nes", mime: "application/x-nintendo-nes-rom" };
          if (x(m("Cr24"), void 0))
            return {
              ext: "crx",
              mime: "application/x-google-chrome-extension",
            };
          if (x(m("MSCF"), void 0) || x(m("ISc("), void 0))
            return { ext: "cab", mime: "application/vnd.ms-cab-compressed" };
          if (x([237, 171, 238, 219]))
            return { ext: "rpm", mime: "application/x-rpm" };
          if (x([197, 208, 211, 198]))
            return { ext: "eps", mime: "application/eps" };
          if (x([40, 181, 47, 253]))
            return { ext: "zst", mime: "application/zstd" };
          if (x([79, 84, 84, 79, 0])) return { ext: "otf", mime: "font/otf" };
          if (x(m("#!AMR"), void 0)) return { ext: "amr", mime: "audio/amr" };
          if (x(m("{\\rtf"), void 0))
            return { ext: "rtf", mime: "application/rtf" };
          if (x([70, 76, 86, 1])) return { ext: "flv", mime: "video/x-flv" };
          if (x(m("IMPM"), void 0)) return { ext: "it", mime: "audio/x-it" };
          if (
            B("-lh0-", { offset: 2 }) ||
            B("-lh1-", { offset: 2 }) ||
            B("-lh2-", { offset: 2 }) ||
            B("-lh3-", { offset: 2 }) ||
            B("-lh4-", { offset: 2 }) ||
            B("-lh5-", { offset: 2 }) ||
            B("-lh6-", { offset: 2 }) ||
            B("-lh7-", { offset: 2 }) ||
            B("-lzs-", { offset: 2 }) ||
            B("-lz4-", { offset: 2 }) ||
            B("-lz5-", { offset: 2 }) ||
            B("-lhd-", { offset: 2 })
          )
            return { ext: "lzh", mime: "application/x-lzh-compressed" };
          if (x([0, 0, 1, 186])) {
            if (x([33], { offset: 4, mask: [241] }))
              return { ext: "mpg", mime: "video/MP1S" };
            if (x([68], { offset: 4, mask: [196] }))
              return { ext: "mpg", mime: "video/MP2P" };
          }
          if (x(m("ITSF"), void 0))
            return { ext: "chm", mime: "application/vnd.ms-htmlhelp" };
          if (x([253, 55, 122, 88, 90, 0]))
            return { ext: "xz", mime: "application/x-xz" };
          if (x(m("<?xml "), void 0))
            return { ext: "xml", mime: "application/xml" };
          if (x([55, 122, 188, 175, 39, 28]))
            return { ext: "7z", mime: "application/x-7z-compressed" };
          if (x([82, 97, 114, 33, 26, 7]) && (0 === v[6] || 1 === v[6]))
            return { ext: "rar", mime: "application/x-rar-compressed" };
          if (x(m("solid "), void 0)) return { ext: "stl", mime: "model/stl" };
          if (x(m("BLENDER"), void 0))
            return { ext: "blend", mime: "application/x-blender" };
          if (x(m("!<arch>"), void 0))
            return (
              await t.ignore(8),
              "debian-binary" ===
              (await t.readToken(new c.StringType(13, "ascii")))
                ? { ext: "deb", mime: "application/x-deb" }
                : { ext: "ar", mime: "application/x-unix-archive" }
            );
          if (x([137, 80, 78, 71, 13, 10, 26, 10])) {
            async function W() {
              return {
                length: await t.readToken(c.INT32_BE),
                type: await t.readToken(new c.StringType(4, "binary")),
              };
            }
            await t.ignore(8);
            do {
              B = await W();
              if (B.length < 0) return;
              switch (B.type) {
                case "IDAT":
                  return { ext: "png", mime: "image/png" };
                case "acTL":
                  return { ext: "apng", mime: "image/apng" };
                default:
                  await t.ignore(B.length + 4);
              }
            } while (t.position + 8 < t.fileInfo.size);
            return { ext: "png", mime: "image/png" };
          }
          if (x([65, 82, 82, 79, 87, 49, 0, 0]))
            return { ext: "arrow", mime: "application/x-apache-arrow" };
          if (x([103, 108, 84, 70, 2, 0, 0, 0]))
            return { ext: "glb", mime: "model/gltf-binary" };
          if (
            x([102, 114, 101, 101], { offset: 4 }) ||
            x([109, 100, 97, 116], { offset: 4 }) ||
            x([109, 111, 111, 118], { offset: 4 }) ||
            x([119, 105, 100, 101], { offset: 4 })
          )
            return { ext: "mov", mime: "video/quicktime" };
          if (x([73, 73, 82, 79, 8, 0, 0, 0, 24]))
            return { ext: "orf", mime: "image/x-olympus-orf" };
          if (x(m("gimp xcf "), void 0))
            return { ext: "xcf", mime: "image/x-xcf" };
          if (x([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216]))
            return { ext: "rw2", mime: "image/x-panasonic-rw2" };
          if (x([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
            async function W() {
              const R = d.alloc(16);
              return (
                await t.readBuffer(R),
                { id: R, size: Number(await t.readToken(c.UINT64_LE)) }
              );
            }
            for (await t.ignore(30); t.position + 24 < t.fileInfo.size; ) {
              F = await W();
              B = F.size - 24;
              if (
                k(
                  F.id,
                  [
                    145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12,
                    32, 83, 101,
                  ]
                )
              ) {
                F = d.alloc(16);
                if (
                  ((B -= await t.readBuffer(F)),
                  k(
                    F,
                    [
                      64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95,
                      92, 68, 43,
                    ]
                  ))
                )
                  return { ext: "asf", mime: "audio/x-ms-asf" };
                if (
                  k(
                    F,
                    [
                      192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95,
                      92, 68, 43,
                    ]
                  )
                )
                  return { ext: "asf", mime: "video/x-ms-asf" };
                break;
              }
              await t.ignore(B);
            }
            return { ext: "asf", mime: "application/vnd.ms-asf" };
          }
          if (x([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10]))
            return { ext: "ktx", mime: "image/ktx" };
          if (
            (x([126, 16, 4]) || x([126, 24, 4])) &&
            x([48, 77, 73, 69], { offset: 4 })
          )
            return { ext: "mie", mime: "application/x-mie" };
          if (x([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], { offset: 2 }))
            return { ext: "shp", mime: "application/x-esri-shape" };
          if (x([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10]))
            switch (
              (await t.ignore(20),
              await t.readToken(new c.StringType(4, "ascii")))
            ) {
              case "jp2 ":
                return { ext: "jp2", mime: "image/jp2" };
              case "jpx ":
                return { ext: "jpx", mime: "image/jpx" };
              case "jpm ":
                return { ext: "jpm", mime: "image/jpm" };
              case "mjp2":
                return { ext: "mj2", mime: "image/mj2" };
              default:
                return;
            }
          if (x([255, 10]) || x([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10]))
            return { ext: "jxl", mime: "image/jxl" };
          if (x([0, 0, 1, 186]) || x([0, 0, 1, 179]))
            return { ext: "mpg", mime: "video/mpeg" };
          if (x([0, 1, 0, 0, 0])) return { ext: "ttf", mime: "font/ttf" };
          if (x([0, 0, 1, 0])) return { ext: "ico", mime: "image/x-icon" };
          if (x([0, 0, 2, 0])) return { ext: "cur", mime: "image/x-icon" };
          if (x([208, 207, 17, 224, 161, 177, 26, 225]))
            return { ext: "cfb", mime: "application/x-cfb" };
          if (
            (await t.peekBuffer(v, {
              length: Math.min(256, t.fileInfo.size),
              mayBeLess: !0,
            }),
            x(m("BEGIN:"), void 0))
          ) {
            if (B("VCARD", { offset: 6 }))
              return { ext: "vcf", mime: "text/vcard" };
            if (B("VCALENDAR", { offset: 6 }))
              return { ext: "ics", mime: "text/calendar" };
          }
          if (x(m("FUJIFILMCCD-RAW"), void 0))
            return { ext: "raf", mime: "image/x-fujifilm-raf" };
          if (x(m("Extended Module:"), void 0))
            return { ext: "xm", mime: "audio/x-xm" };
          if (x(m("Creative Voice File"), void 0))
            return { ext: "voc", mime: "audio/x-voc" };
          if (
            x([4, 0, 0, 0]) &&
            v.length >= 16 &&
            ((F = v.readUInt32LE(12)), F > 12 && v.length >= F + 16)
          )
            try {
              const W = v.slice(16, F + 16).toString();
              if (JSON.parse(W).files)
                return { ext: "asar", mime: "application/x-asar" };
            } catch (W) {}
          if (x([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2]))
            return { ext: "mxf", mime: "application/mxf" };
          if (B("SCRM", { offset: 44 }))
            return { ext: "s3m", mime: "audio/x-s3m" };
          if (
            x([71], { offset: 4 }) &&
            (x([71], { offset: 192 }) || x([71], { offset: 196 }))
          )
            return { ext: "mts", mime: "video/mp2t" };
          if (x([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 }))
            return { ext: "mobi", mime: "application/x-mobipocket-ebook" };
          if (x([68, 73, 67, 77], { offset: 128 }))
            return { ext: "dcm", mime: "application/dicom" };
          if (
            x([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])
          )
            return { ext: "lnk", mime: "application/x.ms.shortcut" };
          if (x([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0]))
            return { ext: "alias", mime: "application/x.apple.alias" };
          if (
            x([76, 80], { offset: 34 }) &&
            (x([0, 0, 1], { offset: 8 }) ||
              x([1, 0, 2], { offset: 8 }) ||
              x([2, 0, 2], { offset: 8 }))
          )
            return { ext: "eot", mime: "application/vnd.ms-fontobject" };
          if (
            x([
              6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116,
              183, 29,
            ])
          )
            return { ext: "indd", mime: "application/x-indesign" };
          if (
            (await t.peekBuffer(v, {
              length: Math.min(512, t.fileInfo.size),
              mayBeLess: !0,
            }),
            n(v))
          )
            return { ext: "tar", mime: "application/x-tar" };
          if (
            x([
              255, 254, 255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0,
              85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0,
            ])
          )
            return { ext: "skp", mime: "application/vnd.sketchup.skp" };
          if (x(m("-----BEGIN PGP MESSAGE-----"), void 0))
            return { ext: "pgp", mime: "application/pgp-encrypted" };
          if (v.length >= 2 && x([255, 224], { offset: 0, mask: [255, 224] })) {
            if (x([16], { offset: 1, mask: [22] }))
              return (
                x([8], { offset: 1, mask: [8] }),
                { ext: "aac", mime: "audio/aac" }
              );
            if (x([2], { offset: 1, mask: [6] }))
              return { ext: "mp3", mime: "audio/mpeg" };
            if (x([4], { offset: 1, mask: [6] }))
              return { ext: "mp2", mime: "audio/mpeg" };
            if (x([6], { offset: 1, mask: [6] }))
              return { ext: "mp1", mime: "audio/mpeg" };
          }
        }
        var d = b(48287).hp;
        const c = b(44266),
          g = b(96452),
          {
            stringToBytes: m,
            tarHeaderChecksumMatches: n,
            uint32SyncSafeToken: p,
          } = b(86760),
          r = b(71664);
        a = {
          fromStream: async function (t) {
            t = await g.fromStream(t);
            try {
              return await h(t);
            } finally {
              await t.close();
            }
          },
          fromTokenizer: h,
          fromBuffer: f,
          stream: (t) =>
            new Promise((v, x) => {
              const B = eval("require")("stream");
              t.on("error", x);
              t.once("readable", async () => {
                const F = new B.PassThrough();
                let L;
                L = B.pipeline ? B.pipeline(t, F, () => {}) : t.pipe(F);
                const J = t.read(4100) || t.read() || d.alloc(0);
                try {
                  const T = await f(J);
                  F.fileType = T;
                } catch (T) {
                  x(T);
                }
                v(L);
              });
            }),
        };
        Object.defineProperty(a, "extensions", {
          get: () => new Set(r.extensions),
        });
        Object.defineProperty(a, "mimeTypes", {
          get: () => new Set(r.mimeTypes),
        });
        l.exports = a;
      },
      53846: (l, a, b) => {
        const f = b(80363),
          k = b(5707);
        a = {
          fromFile: async function (h) {
            h = await f.fromFile(h);
            try {
              return await k.fromTokenizer(h);
            } finally {
              await h.close();
            }
          },
        };
        Object.assign(a, k);
        Object.defineProperty(a, "extensions", { get: () => k.extensions });
        Object.defineProperty(a, "mimeTypes", { get: () => k.mimeTypes });
        l.exports = a;
      },
      71664: (l) => {
        l.exports = {
          extensions:
            "jpg png apng gif webp flif xcf cr2 cr3 orf arw dng nef rw2 raf tif bmp icns jxr psd indd zip tar rar gz bz2 7z dmg mp4 mid mkv webm mov avi mpg mp2 mp3 m4a oga ogg ogv opus flac wav spx amr pdf epub exe swf rtf wasm woff woff2 eot ttf otf ico flv ps xz sqlite nes crx xpi cab deb ar rpm Z lz cfb mxf mts blend bpg docx pptx xlsx 3gp 3g2 jp2 jpm jpx mj2 aif qcp odt ods odp xml mobi heic cur ktx ape wv dcm ics glb pcap dsf lnk alias voc ac3 m4v m4p m4b f4v f4p f4b f4a mie asf ogm ogx mpc arrow shp aac mp1 it s3m xm ai skp avif eps lzh pgp asar stl chm 3mf zst jxl vcf".split(
              " "
            ),
          mimeTypes:
            "image/jpeg image/png image/gif image/webp image/flif image/x-xcf image/x-canon-cr2 image/x-canon-cr3 image/tiff image/bmp image/vnd.ms-photo image/vnd.adobe.photoshop application/x-indesign application/epub+zip application/x-xpinstall application/vnd.oasis.opendocument.text application/vnd.oasis.opendocument.spreadsheet application/vnd.oasis.opendocument.presentation application/vnd.openxmlformats-officedocument.wordprocessingml.document application/vnd.openxmlformats-officedocument.presentationml.presentation application/vnd.openxmlformats-officedocument.spreadsheetml.sheet application/zip application/x-tar application/x-rar-compressed application/gzip application/x-bzip2 application/x-7z-compressed application/x-apple-diskimage application/x-apache-arrow video/mp4 audio/midi video/x-matroska video/webm video/quicktime video/vnd.avi audio/vnd.wave audio/qcelp audio/x-ms-asf video/x-ms-asf application/vnd.ms-asf video/mpeg video/3gpp audio/mpeg audio/mp4 audio/opus video/ogg audio/ogg application/ogg audio/x-flac audio/ape audio/wavpack audio/amr application/pdf application/x-msdownload application/x-shockwave-flash application/rtf application/wasm font/woff font/woff2 application/vnd.ms-fontobject font/ttf font/otf image/x-icon video/x-flv application/postscript application/eps application/x-xz application/x-sqlite3 application/x-nintendo-nes-rom application/x-google-chrome-extension application/vnd.ms-cab-compressed application/x-deb application/x-unix-archive application/x-rpm application/x-compress application/x-lzip application/x-cfb application/x-mie application/mxf video/mp2t application/x-blender image/bpg image/jp2 image/jpx image/jpm image/mj2 audio/aiff application/xml application/x-mobipocket-ebook image/heif image/heif-sequence image/heic image/heic-sequence image/icns image/ktx application/dicom audio/x-musepack text/calendar text/vcard model/gltf-binary application/vnd.tcpdump.pcap audio/x-dsf application/x.ms.shortcut application/x.apple.alias audio/x-voc audio/vnd.dolby.dd-raw audio/x-m4a image/apng image/x-olympus-orf image/x-sony-arw image/x-adobe-dng image/x-nikon-nef image/x-panasonic-rw2 image/x-fujifilm-raf video/x-m4v video/3gpp2 application/x-esri-shape audio/aac audio/x-it audio/x-s3m audio/x-xm video/MP1S video/MP2P application/vnd.sketchup.skp image/avif application/x-lzh-compressed application/pgp-encrypted application/x-asar model/stl application/vnd.ms-htmlhelp model/3mf image/jxl application/zstd".split(
              " "
            ),
        };
      },
      86760: (l, a) => {
        a.stringToBytes = (b) => [...b].map((f) => f.charCodeAt(0));
        a.tarHeaderChecksumMatches = (b, f = 0) => {
          const k = parseInt(
            b.toString("utf8", 148, 154).replace(/\0.*$/, "").trim(),
            8
          );
          if (isNaN(k)) return !1;
          let h = 256;
          for (var e = f; e < f + 148; e++) h += b[e];
          for (e = f + 156; e < f + 512; e++) h += b[e];
          return k === h;
        };
        a.uint32SyncSafeToken = {
          get: (b, f) =>
            (127 & b[f + 3]) |
            (b[f + 2] << 7) |
            (b[f + 1] << 14) |
            (b[f] << 21),
          len: 4,
        };
      },
      251: (l, a) => {
        a.read = function (b, f, k, h, e) {
          var d = 8 * e - h - 1;
          var c = (1 << d) - 1,
            g = c >> 1,
            m = -7;
          e = k ? e - 1 : 0;
          var n = k ? -1 : 1,
            p = b[f + e];
          e += n;
          k = p & ((1 << -m) - 1);
          p >>= -m;
          for (m += d; m > 0; k = 256 * k + b[f + e], e += n, m -= 8);
          d = k & ((1 << -m) - 1);
          k >>= -m;
          for (m += h; m > 0; d = 256 * d + b[f + e], e += n, m -= 8);
          if (0 === k) k = 1 - g;
          else {
            if (k === c) return d ? NaN : (1 / 0) * (p ? -1 : 1);
            d += Math.pow(2, h);
            k -= g;
          }
          return (p ? -1 : 1) * d * Math.pow(2, k - h);
        };
        a.write = function (b, f, k, h, e, d) {
          var c,
            g,
            m,
            n = 8 * d - e - 1,
            p = (1 << n) - 1,
            r = p >> 1,
            t = 23 === e ? 5.960464477539062e-8 : 0;
          d = h ? 0 : d - 1;
          h = h ? 1 : -1;
          var v = f < 0 || (0 === f && 1 / f < 0) ? 1 : 0;
          f = Math.abs(f);
          for (
            isNaN(f) || f === 1 / 0
              ? ((g = isNaN(f) ? 1 : 0), (c = p))
              : ((c = Math.floor(Math.log(f) / Math.LN2)),
                f * (m = Math.pow(2, -c)) < 1 && (c--, (m *= 2)),
                (f += c + r >= 1 ? t / m : t * Math.pow(2, 1 - r)) * m >= 2 &&
                  (c++, (m /= 2)),
                c + r >= p
                  ? ((g = 0), (c = p))
                  : c + r >= 1
                  ? ((g = (f * m - 1) * Math.pow(2, e)), (c += r))
                  : ((g = f * Math.pow(2, r - 1) * Math.pow(2, e)), (c = 0)));
            e >= 8;
            b[k + d] = 255 & g, d += h, g /= 256, e -= 8
          );
          c = (c << e) | g;
          for (n += e; n > 0; b[k + d] = 255 & c, d += h, c /= 256, n -= 8);
          b[k + d - h] |= 128 * v;
        };
      },
      6585: (l) => {
        function a(k, h, e, d) {
          return Math.round(k / e) + " " + d + (h >= 1.5 * e ? "s" : "");
        }
        var b = 6048e5,
          f = 315576e5;
        l.exports = function (k, h) {
          h = h || {};
          var e = typeof k;
          if ("string" === e && k.length > 0)
            return (function (d) {
              if (
                !((d = String(d)).length > 100) &&
                (d =
                  /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                    d
                  ))
              ) {
                var c = parseFloat(d[1]);
                switch ((d[2] || "ms").toLowerCase()) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return c * f;
                  case "weeks":
                  case "week":
                  case "w":
                    return c * b;
                  case "days":
                  case "day":
                  case "d":
                    return c * 864e5;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return c * 36e5;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return c * 6e4;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return c * 1e3;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return c;
                }
              }
            })(k);
          if ("number" === e && isFinite(k))
            return h.long
              ? (function (d) {
                  var c = Math.abs(d);
                  return c >= 864e5
                    ? a(d, c, 864e5, "day")
                    : c >= 36e5
                    ? a(d, c, 36e5, "hour")
                    : c >= 6e4
                    ? a(d, c, 6e4, "minute")
                    : c >= 1e3
                    ? a(d, c, 1e3, "second")
                    : d + " ms";
                })(k)
              : (function (d) {
                  var c = Math.abs(d);
                  return c >= 864e5
                    ? Math.round(d / 864e5) + "d"
                    : c >= 36e5
                    ? Math.round(d / 36e5) + "h"
                    : c >= 6e4
                    ? Math.round(d / 6e4) + "m"
                    : c >= 1e3
                    ? Math.round(d / 1e3) + "s"
                    : d + "ms";
                })(k);
          throw Error(
            "val is not a non-empty string or a valid number. val=" +
              JSON.stringify(k)
          );
        };
      },
      62759: (l, a, b) => {
        var f = b(48287).hp;
        const k = b(44276);
        l.exports = (h) => {
          if (!k(h)) return !1;
          h = h.trim().match(k.regex);
          const e = {};
          if (h[1]) {
            e.mediaType = h[1].toLowerCase();
            const d = h[1].split(";").map((c) => c.toLowerCase());
            e.contentType = d[0];
            d.slice(1).forEach((c) => {
              c = c.split("=");
              e[c[0]] = c[1];
            });
          }
          return (
            (e.base64 = !!h[h.length - 2]),
            (e.data = h[h.length - 1] || ""),
            (e.toBuffer = () => {
              const d = e.base64 ? "base64" : "utf8";
              return f.from(e.base64 ? e.data : decodeURIComponent(e.data), d);
            }),
            e
          );
        };
      },
      78122: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.Deferred = void 0;
        a.Deferred = class {
          constructor() {
            this.resolve = () => null;
            this.reject = () => null;
            this.promise = new Promise((b, f) => {
              this.reject = f;
              this.resolve = b;
            });
          }
        };
      },
      75523: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.EndOfStreamError = a.defaultMessages = void 0;
        a.defaultMessages = "End-Of-Stream";
        class b extends Error {
          constructor() {
            super(a.defaultMessages);
          }
        }
        a.EndOfStreamError = b;
      },
      51510: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.StreamReader = a.EndOfStreamError = void 0;
        const f = b(75523),
          k = b(78122);
        var h = b(75523);
        Object.defineProperty(a, "EndOfStreamError", {
          enumerable: !0,
          get: function () {
            return h.EndOfStreamError;
          },
        });
        a.StreamReader = class {
          constructor(e) {
            if (
              ((this.s = e),
              (this.deferred = null),
              (this.endOfStream = !1),
              (this.peekQueue = []),
              !e.read || !e.once)
            )
              throw Error("Expected an instance of stream.Readable");
            this.s.once("end", () => this.reject(new f.EndOfStreamError()));
            this.s.once("error", (d) => this.reject(d));
            this.s.once("close", () => this.reject(Error("Stream closed")));
          }
          async peek(e, d, c) {
            c = await this.read(e, d, c);
            return this.peekQueue.push(e.subarray(d, d + c)), c;
          }
          async read(e, d, c) {
            if (0 === c) return 0;
            if (0 === this.peekQueue.length && this.endOfStream)
              throw new f.EndOfStreamError();
            let g = 0;
            for (; this.peekQueue.length > 0 && c > 0; ) {
              var m = this.peekQueue.pop();
              if (!m) throw Error("peekData should be defined");
              var n = Math.min(m.length, c);
              e.set(m.subarray(0, n), d + g);
              g += n;
              c -= n;
              n < m.length && this.peekQueue.push(m.subarray(n));
            }
            for (; c > 0 && !this.endOfStream; ) {
              m = Math.min(c, 1048576);
              n = await this.readFromStream(e, d + g, m);
              if (((g += n), n < m)) break;
              c -= n;
            }
            return g;
          }
          async readFromStream(e, d, c) {
            const g = this.s.read(c);
            if (g) return e.set(g, d), g.length;
            const m = {
              buffer: e,
              offset: d,
              length: c,
              deferred: new k.Deferred(),
            };
            return (
              (this.deferred = m.deferred),
              this.s.once("readable", () => {
                this.readDeferred(m);
              }),
              m.deferred.promise
            );
          }
          readDeferred(e) {
            const d = this.s.read(e.length);
            d
              ? (e.buffer.set(d, e.offset),
                e.deferred.resolve(d.length),
                (this.deferred = null))
              : this.s.once("readable", () => {
                  this.readDeferred(e);
                });
          }
          reject(e) {
            this.endOfStream = !0;
            this.deferred && (this.deferred.reject(e), (this.deferred = null));
          }
        };
      },
      48705: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.StreamReader = a.EndOfStreamError = void 0;
        var f = b(75523);
        Object.defineProperty(a, "EndOfStreamError", {
          enumerable: !0,
          get: function () {
            return f.EndOfStreamError;
          },
        });
        var k = b(51510);
        Object.defineProperty(a, "StreamReader", {
          enumerable: !0,
          get: function () {
            return k.StreamReader;
          },
        });
      },
      98632: (l, a, b) => {
        var f = b(48287).hp;
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.AbstractTokenizer = void 0;
        const k = b(48705);
        a.AbstractTokenizer = class {
          constructor(h) {
            this.position = 0;
            this.numBuffer = new Uint8Array(8);
            this.fileInfo = h || {};
          }
          async readToken(h, e = this.position) {
            const d = f.alloc(h.len);
            if ((await this.readBuffer(d, { position: e })) < h.len)
              throw new k.EndOfStreamError();
            return h.get(d, 0);
          }
          async peekToken(h, e = this.position) {
            const d = f.alloc(h.len);
            if ((await this.peekBuffer(d, { position: e })) < h.len)
              throw new k.EndOfStreamError();
            return h.get(d, 0);
          }
          async readNumber(h) {
            if (
              (await this.readBuffer(this.numBuffer, { length: h.len })) < h.len
            )
              throw new k.EndOfStreamError();
            return h.get(this.numBuffer, 0);
          }
          async peekNumber(h) {
            if (
              (await this.peekBuffer(this.numBuffer, { length: h.len })) < h.len
            )
              throw new k.EndOfStreamError();
            return h.get(this.numBuffer, 0);
          }
          async ignore(h) {
            if (void 0 !== this.fileInfo.size) {
              const e = this.fileInfo.size - this.position;
              if (h > e) return (this.position += e), e;
            }
            return (this.position += h), h;
          }
          async close() {}
          normalizeOptions(h, e) {
            if (e && void 0 !== e.position && e.position < this.position)
              throw Error(
                "`options.position` must be equal or greater than `tokenizer.position`"
              );
            return e
              ? {
                  mayBeLess: !0 === e.mayBeLess,
                  offset: e.offset ? e.offset : 0,
                  length: e.length
                    ? e.length
                    : h.length - (e.offset ? e.offset : 0),
                  position: e.position ? e.position : this.position,
                }
              : {
                  mayBeLess: !1,
                  offset: 0,
                  length: h.length,
                  position: this.position,
                };
          }
        };
      },
      93492: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.BufferTokenizer = void 0;
        const f = b(48705);
        l = b(98632);
        class k extends l.AbstractTokenizer {
          constructor(h, e) {
            super(e);
            this.uint8Array = h;
            this.fileInfo.size = this.fileInfo.size
              ? this.fileInfo.size
              : h.length;
          }
          async readBuffer(h, e) {
            if (e && e.position) {
              if (e.position < this.position)
                throw Error(
                  "`options.position` must be equal or greater than `tokenizer.position`"
                );
              this.position = e.position;
            }
            h = await this.peekBuffer(h, e);
            return (this.position += h), h;
          }
          async peekBuffer(h, e) {
            e = this.normalizeOptions(h, e);
            const d = Math.min(this.uint8Array.length - e.position, e.length);
            if (!e.mayBeLess && d < e.length) throw new f.EndOfStreamError();
            return (
              h.set(
                this.uint8Array.subarray(e.position, e.position + d),
                e.offset
              ),
              d
            );
          }
          async close() {}
        }
        a.BufferTokenizer = k;
      },
      91456: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fromFile = a.FileTokenizer = void 0;
        l = b(98632);
        const f = b(48705),
          k = b(91343);
        class h extends l.AbstractTokenizer {
          constructor(e, d) {
            super(d);
            this.fd = e;
          }
          async readBuffer(e, d) {
            const c = this.normalizeOptions(e, d);
            this.position = c.position;
            e = await k.read(this.fd, e, c.offset, c.length, c.position);
            if (
              ((this.position += e.bytesRead),
              e.bytesRead < c.length && (!d || !d.mayBeLess))
            )
              throw new f.EndOfStreamError();
            return e.bytesRead;
          }
          async peekBuffer(e, d) {
            d = this.normalizeOptions(e, d);
            e = await k.read(this.fd, e, d.offset, d.length, d.position);
            if (!d.mayBeLess && e.bytesRead < d.length)
              throw new f.EndOfStreamError();
            return e.bytesRead;
          }
          async close() {
            return k.close(this.fd);
          }
        }
        a.FileTokenizer = h;
        a.fromFile = async function (e) {
          const d = await k.stat(e);
          if (!d.isFile) throw Error(`File not a file: ${e}`);
          const c = await k.open(e, "r");
          return new h(c, { path: e, size: d.size });
        };
      },
      91343: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.readFile =
          a.writeFileSync =
          a.writeFile =
          a.read =
          a.open =
          a.close =
          a.stat =
          a.createReadStream =
          a.pathExists =
            void 0;
        const f = b(54428);
        a.pathExists = f.existsSync;
        a.createReadStream = f.createReadStream;
        a.stat = async function (k) {
          return new Promise((h, e) => {
            f.stat(k, (d, c) => {
              d ? e(d) : h(c);
            });
          });
        };
        a.close = async function (k) {
          return new Promise((h, e) => {
            f.close(k, (d) => {
              d ? e(d) : h();
            });
          });
        };
        a.open = async function (k, h) {
          return new Promise((e, d) => {
            f.open(k, h, (c, g) => {
              c ? d(c) : e(g);
            });
          });
        };
        a.read = async function (k, h, e, d, c) {
          return new Promise((g, m) => {
            f.read(k, h, e, d, c, (n, p, r) => {
              n ? m(n) : g({ bytesRead: p, buffer: r });
            });
          });
        };
        a.writeFile = async function (k, h) {
          return new Promise((e, d) => {
            f.writeFile(k, h, (c) => {
              c ? d(c) : e();
            });
          });
        };
        a.writeFileSync = function (k, h) {
          f.writeFileSync(k, h);
        };
        a.readFile = async function (k) {
          return new Promise((h, e) => {
            f.readFile(k, (d, c) => {
              d ? e(d) : h(c);
            });
          });
        };
      },
      36066: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.ReadStreamTokenizer = void 0;
        l = b(98632);
        const f = b(48705);
        class k extends l.AbstractTokenizer {
          constructor(h, e) {
            super(e);
            this.streamReader = new f.StreamReader(h);
          }
          async getFileInfo() {
            return this.fileInfo;
          }
          async readBuffer(h, e) {
            const d = this.normalizeOptions(h, e),
              c = d.position - this.position;
            if (c > 0) return await this.ignore(c), this.readBuffer(h, e);
            if (c < 0)
              throw Error(
                "`options.position` must be equal or greater than `tokenizer.position`"
              );
            if (0 === d.length) return 0;
            h = await this.streamReader.read(h, d.offset, d.length);
            if (((this.position += h), (!e || !e.mayBeLess) && h < d.length))
              throw new f.EndOfStreamError();
            return h;
          }
          async peekBuffer(h, e) {
            const d = this.normalizeOptions(h, e);
            let c = 0;
            if (d.position) {
              const g = d.position - this.position;
              if (g > 0)
                return (
                  (e = new Uint8Array(d.length + g)),
                  (c = await this.peekBuffer(e, { mayBeLess: d.mayBeLess })),
                  h.set(e.subarray(g), d.offset),
                  c - g
                );
              if (g < 0)
                throw Error("Cannot peek from a negative offset in a stream");
            }
            if (d.length > 0) {
              try {
                c = await this.streamReader.peek(h, d.offset, d.length);
              } catch (g) {
                if (e && e.mayBeLess && g instanceof f.EndOfStreamError)
                  return 0;
                throw g;
              }
              if (!d.mayBeLess && c < d.length) throw new f.EndOfStreamError();
            }
            return c;
          }
          async ignore(h) {
            const e = Math.min(256e3, h),
              d = new Uint8Array(e);
            let c = 0;
            for (; c < h; ) {
              const g = await this.readBuffer(d, {
                length: Math.min(e, h - c),
              });
              if (g < 0) return g;
              c += g;
            }
            return c;
          }
        }
        a.ReadStreamTokenizer = k;
      },
      96452: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fromBuffer = a.fromStream = a.EndOfStreamError = void 0;
        const f = b(36066),
          k = b(93492);
        var h = b(48705);
        Object.defineProperty(a, "EndOfStreamError", {
          enumerable: !0,
          get: function () {
            return h.EndOfStreamError;
          },
        });
        a.fromStream = function (e, d) {
          return (d = d || {}), new f.ReadStreamTokenizer(e, d);
        };
        a.fromBuffer = function (e, d) {
          return new k.BufferTokenizer(e, d);
        };
      },
      80363: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fromStream = a.fromBuffer = a.EndOfStreamError = a.fromFile = void 0;
        const f = b(91343),
          k = b(96452);
        var h = b(91456);
        Object.defineProperty(a, "fromFile", {
          enumerable: !0,
          get: function () {
            return h.fromFile;
          },
        });
        var e = b(96452);
        Object.defineProperty(a, "EndOfStreamError", {
          enumerable: !0,
          get: function () {
            return e.EndOfStreamError;
          },
        });
        Object.defineProperty(a, "fromBuffer", {
          enumerable: !0,
          get: function () {
            return e.fromBuffer;
          },
        });
        a.fromStream = async function (d, c) {
          if (((c = c || {}), d.path)) {
            const g = await f.stat(d.path);
            c.path = d.path;
            c.size = g.size;
          }
          return k.fromStream(d, c);
        };
      },
      44266: (l, a, b) => {
        function f(d) {
          return new DataView(d.buffer, d.byteOffset);
        }
        var k = b(48287).hp;
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.AnsiStringType =
          a.StringType =
          a.BufferType =
          a.Uint8ArrayType =
          a.IgnoreType =
          a.Float80_LE =
          a.Float80_BE =
          a.Float64_LE =
          a.Float64_BE =
          a.Float32_LE =
          a.Float32_BE =
          a.Float16_LE =
          a.Float16_BE =
          a.INT64_BE =
          a.UINT64_BE =
          a.INT64_LE =
          a.UINT64_LE =
          a.INT32_LE =
          a.INT32_BE =
          a.INT24_BE =
          a.INT24_LE =
          a.INT16_LE =
          a.INT16_BE =
          a.INT8 =
          a.UINT32_BE =
          a.UINT32_LE =
          a.UINT24_BE =
          a.UINT24_LE =
          a.UINT16_BE =
          a.UINT16_LE =
          a.UINT8 =
            void 0;
        const h = b(251);
        a.UINT8 = {
          len: 1,
          get: (d, c) => f(d).getUint8(c),
          put: (d, c, g) => (f(d).setUint8(c, g), c + 1),
        };
        a.UINT16_LE = {
          len: 2,
          get: (d, c) => f(d).getUint16(c, !0),
          put: (d, c, g) => (f(d).setUint16(c, g, !0), c + 2),
        };
        a.UINT16_BE = {
          len: 2,
          get: (d, c) => f(d).getUint16(c),
          put: (d, c, g) => (f(d).setUint16(c, g), c + 2),
        };
        a.UINT24_LE = {
          len: 3,
          get(d, c) {
            d = f(d);
            return d.getUint8(c) + (d.getUint16(c + 1, !0) << 8);
          },
          put(d, c, g) {
            d = f(d);
            return (
              d.setUint8(c, 255 & g), d.setUint16(c + 1, g >> 8, !0), c + 3
            );
          },
        };
        a.UINT24_BE = {
          len: 3,
          get(d, c) {
            d = f(d);
            return (d.getUint16(c) << 8) + d.getUint8(c + 2);
          },
          put(d, c, g) {
            d = f(d);
            return d.setUint16(c, g >> 8), d.setUint8(c + 2, 255 & g), c + 3;
          },
        };
        a.UINT32_LE = {
          len: 4,
          get: (d, c) => f(d).getUint32(c, !0),
          put: (d, c, g) => (f(d).setUint32(c, g, !0), c + 4),
        };
        a.UINT32_BE = {
          len: 4,
          get: (d, c) => f(d).getUint32(c),
          put: (d, c, g) => (f(d).setUint32(c, g), c + 4),
        };
        a.INT8 = {
          len: 1,
          get: (d, c) => f(d).getInt8(c),
          put: (d, c, g) => (f(d).setInt8(c, g), c + 1),
        };
        a.INT16_BE = {
          len: 2,
          get: (d, c) => f(d).getInt16(c),
          put: (d, c, g) => (f(d).setInt16(c, g), c + 2),
        };
        a.INT16_LE = {
          len: 2,
          get: (d, c) => f(d).getInt16(c, !0),
          put: (d, c, g) => (f(d).setInt16(c, g, !0), c + 2),
        };
        a.INT24_LE = {
          len: 3,
          get(d, c) {
            d = a.UINT24_LE.get(d, c);
            return d > 8388607 ? d - 16777216 : d;
          },
          put(d, c, g) {
            d = f(d);
            return (
              d.setUint8(c, 255 & g), d.setUint16(c + 1, g >> 8, !0), c + 3
            );
          },
        };
        a.INT24_BE = {
          len: 3,
          get(d, c) {
            d = a.UINT24_BE.get(d, c);
            return d > 8388607 ? d - 16777216 : d;
          },
          put(d, c, g) {
            d = f(d);
            return d.setUint16(c, g >> 8), d.setUint8(c + 2, 255 & g), c + 3;
          },
        };
        a.INT32_BE = {
          len: 4,
          get: (d, c) => f(d).getInt32(c),
          put: (d, c, g) => (f(d).setInt32(c, g), c + 4),
        };
        a.INT32_LE = {
          len: 4,
          get: (d, c) => f(d).getInt32(c, !0),
          put: (d, c, g) => (f(d).setInt32(c, g, !0), c + 4),
        };
        a.UINT64_LE = {
          len: 8,
          get: (d, c) => f(d).getBigUint64(c, !0),
          put: (d, c, g) => (f(d).setBigUint64(c, g, !0), c + 8),
        };
        a.INT64_LE = {
          len: 8,
          get: (d, c) => f(d).getBigInt64(c, !0),
          put: (d, c, g) => (f(d).setBigInt64(c, g, !0), c + 8),
        };
        a.UINT64_BE = {
          len: 8,
          get: (d, c) => f(d).getBigUint64(c),
          put: (d, c, g) => (f(d).setBigUint64(c, g), c + 8),
        };
        a.INT64_BE = {
          len: 8,
          get: (d, c) => f(d).getBigInt64(c),
          put: (d, c, g) => (f(d).setBigInt64(c, g), c + 8),
        };
        a.Float16_BE = {
          len: 2,
          get(d, c) {
            return h.read(d, c, !1, 10, this.len);
          },
          put(d, c, g) {
            return h.write(d, g, c, !1, 10, this.len), c + this.len;
          },
        };
        a.Float16_LE = {
          len: 2,
          get(d, c) {
            return h.read(d, c, !0, 10, this.len);
          },
          put(d, c, g) {
            return h.write(d, g, c, !0, 10, this.len), c + this.len;
          },
        };
        a.Float32_BE = {
          len: 4,
          get: (d, c) => f(d).getFloat32(c),
          put: (d, c, g) => (f(d).setFloat32(c, g), c + 4),
        };
        a.Float32_LE = {
          len: 4,
          get: (d, c) => f(d).getFloat32(c, !0),
          put: (d, c, g) => (f(d).setFloat32(c, g, !0), c + 4),
        };
        a.Float64_BE = {
          len: 8,
          get: (d, c) => f(d).getFloat64(c),
          put: (d, c, g) => (f(d).setFloat64(c, g), c + 8),
        };
        a.Float64_LE = {
          len: 8,
          get: (d, c) => f(d).getFloat64(c, !0),
          put: (d, c, g) => (f(d).setFloat64(c, g, !0), c + 8),
        };
        a.Float80_BE = {
          len: 10,
          get(d, c) {
            return h.read(d, c, !1, 63, this.len);
          },
          put(d, c, g) {
            return h.write(d, g, c, !1, 63, this.len), c + this.len;
          },
        };
        a.Float80_LE = {
          len: 10,
          get(d, c) {
            return h.read(d, c, !0, 63, this.len);
          },
          put(d, c, g) {
            return h.write(d, g, c, !0, 63, this.len), c + this.len;
          },
        };
        a.IgnoreType = class {
          constructor(d) {
            this.len = d;
          }
          get(d, c) {}
        };
        a.Uint8ArrayType = class {
          constructor(d) {
            this.len = d;
          }
          get(d, c) {
            return d.subarray(c, c + this.len);
          }
        };
        a.BufferType = class {
          constructor(d) {
            this.len = d;
          }
          get(d, c) {
            return k.from(d.subarray(c, c + this.len));
          }
        };
        a.StringType = class {
          constructor(d, c) {
            this.len = d;
            this.encoding = c;
          }
          get(d, c) {
            return k.from(d).toString(this.encoding, c, c + this.len);
          }
        };
        class e {
          constructor(d) {
            this.len = d;
          }
          static decode(d, c, g) {
            let m = "";
            for (; c < g; ++c)
              m += e.codePointToString(e.singleByteDecoder(d[c]));
            return m;
          }
          static inRange(d, c, g) {
            return c <= d && d <= g;
          }
          static codePointToString(d) {
            return d <= 65535
              ? String.fromCharCode(d)
              : ((d -= 65536),
                String.fromCharCode(55296 + (d >> 10), 56320 + (1023 & d)));
          }
          static singleByteDecoder(d) {
            if (e.inRange(d, 0, 127)) return d;
            d = e.windows1252[d - 128];
            if (null === d) throw Error("invaliding encoding");
            return d;
          }
          get(d, c = 0) {
            return e.decode(d, c, c + this.len);
          }
        }
        a.AnsiStringType = e;
        e.windows1252 = [
          8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249,
          338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212,
          732, 8482, 353, 8250, 339, 157, 382, 376, 160, 161, 162, 163, 164,
          165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
          179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192,
          193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206,
          207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220,
          221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234,
          235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248,
          249, 250, 251, 252, 253, 254, 255,
        ];
      },
      60015: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.InvalidChat = void 0;
        a.assertFindChat = async function (e) {
          const d = await f.chat.find(e);
          if (!d) throw new h(e);
          return d;
        };
        a.assertGetChat = function (e) {
          let d;
          d = e.toString().includes("newsletter")
            ? k.NewsletterStore.get(e)
            : f.chat.get(e);
          if (!d) throw new h(e);
          return d;
        };
        const f = b(28156);
        l = b(62857);
        const k = b(14647);
        class h extends l.WPPError {
          constructor(e) {
            super("chat_not_found", `Chat not found for ${e}`);
            this.id = e;
          }
        }
        a.InvalidChat = h;
      },
      4526: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.InvalidColor = void 0;
        a.assertColor = function (k) {
          if ("number" == typeof k) k = k > 0 ? k : 4294967295 + Number(k) + 1;
          else {
            if ("string" != typeof k) throw new f(k);
            k = k.trim().replace("#", "");
            k.length <= 6 && (k = "FF" + k.padStart(6, "0"));
            k = parseInt(k, 16);
          }
          return k;
        };
        l = b(62857);
        class f extends l.WPPError {
          constructor(k) {
            super("invalid_color", `Invalid Color value for ${k}`);
            this.color = k;
          }
        }
        a.InvalidColor = f;
      },
      44763: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.NotIsBusinessError = void 0;
        a.assertIsBusiness = function () {
          if (!f.Conn.isSMB) throw new k();
        };
        l = b(62857);
        const f = b(14647);
        class k extends l.WPPError {
          constructor() {
            super("is_not_business", "This account is not a business version");
          }
        }
        a.NotIsBusinessError = k;
      },
      63990: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.InvalidProduct = void 0;
        a.assertGetProduct = async function (h) {
          const e = (
            await f.CatalogStore.findProduct({
              catalogWid: f.UserPrefs.getMaybeMeUser(),
              productId: h,
            })
          )[0].msgProductCollection._index[h];
          if (!e) throw new k(h);
          return e;
        };
        l = b(62857);
        const f = b(14647);
        class k extends l.WPPError {
          constructor(h) {
            super("product_not_found", `Product not found for ${h}`);
            this.id = h;
          }
        }
        a.InvalidProduct = k;
      },
      63665: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.InvalidWid = void 0;
        a.assertWid = function (h) {
          const e = (0, f.createWid)(h);
          if (!e) throw new k(h);
          return e;
        };
        const f = b(62857);
        class k extends f.WPPError {
          constructor(h) {
            super("invalid_wid", `Invalid WID value for ${h}`);
            this.id = h;
          }
        }
        a.InvalidWid = k;
      },
      41687: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(60015), a);
        l(b(4526), a);
        l(b(44763), a);
        l(b(63990), a);
        l(b(63665), a);
      },
      24846: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(63539);
      },
      63539: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() => {
          e.BlocklistStore.on("sort", () => {
            h.internalEv.emit("blocklist.sync");
          });
        });
      },
      86671: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.all = function () {
          return f.BlocklistStore.getModelsArray().map((k) => k.id);
        };
        const f = b(14647);
      },
      7937: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (n, p, r, t) {
                  void 0 === t && (t = r);
                  var v = Object.getOwnPropertyDescriptor(p, r);
                  (v &&
                    ("get" in v
                      ? p.__esModule
                      : !v.writable && !v.configurable)) ||
                    (v = {
                      enumerable: !0,
                      get: function () {
                        return p[r];
                      },
                    });
                  Object.defineProperty(n, t, v);
                }
              : function (n, p, r, t) {
                  void 0 === t && (t = r);
                  n[t] = p[r];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (n, p) {
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: p,
                  });
                }
              : function (n, p) {
                  n.default = p;
                });
        l =
          (this && this.__importStar) ||
          function (n) {
            if (n && n.__esModule) return n;
            var p = {};
            if (null != n)
              for (var r in n)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(n, r) &&
                  f(p, n, r);
            return k(p, n), p;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.blockContact = async function (n) {
          n = (0, e.assertWid)(n);
          const p = d.ContactStore.get(n) || new d.ContactModel({ id: n });
          (0, h.compare)(c.SANITIZED_VERSION_STR, "2.2323.4", ">=")
            ? await g.blockContact({
                contact: p,
                blockEntryPoint: "block_list",
                bizOptOutArgs: null,
              })
            : await g.blockContact(p);
          return { wid: n, isBlocked: (0, m.isBlocked)(n) };
        };
        const h = b(38385),
          e = b(41687),
          d = b(14647),
          c = b(19198),
          g = l(b(52757)),
          m = b(14944);
      },
      54480: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.unblockContact = a.isBlocked = a.blockContact = a.all = void 0;
        var f = b(86671);
        Object.defineProperty(a, "all", {
          enumerable: !0,
          get: function () {
            return f.all;
          },
        });
        var k = b(7937);
        Object.defineProperty(a, "blockContact", {
          enumerable: !0,
          get: function () {
            return k.blockContact;
          },
        });
        var h = b(14944);
        Object.defineProperty(a, "isBlocked", {
          enumerable: !0,
          get: function () {
            return h.isBlocked;
          },
        });
        var e = b(78306);
        Object.defineProperty(a, "unblockContact", {
          enumerable: !0,
          get: function () {
            return e.unblockContact;
          },
        });
      },
      14944: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isBlocked = function (h) {
          h = (0, f.assertWid)(h);
          return !!k.BlocklistStore.get(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      78306: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.unblockContact = async function (g) {
          g = (0, h.assertWid)(g);
          const m = e.ContactStore.get(g) || new e.ContactModel({ id: g });
          return (
            await d.unblockContact(m),
            { wid: g, isBlocked: (0, c.isBlocked)(g) }
          );
        };
        const h = b(41687),
          e = b(14647),
          d = l(b(52757)),
          c = b(14944);
      },
      61042: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(24846);
        l(b(54480), a);
      },
      75495: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(75848);
      },
      75848: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(20514);
        a.onInjected(
          () => (
            e.CallStore.on("add", (c) => {
              c.isGroup &&
                h.internalEv.emit("call.incoming_call", {
                  id: c.id,
                  isGroup: c.isGroup,
                  isVideo: c.isVideo,
                  offerTime: c.offerTime,
                  sender: e.WidFactory.toChatWid(c.peerJid),
                  peerJid: c.peerJid,
                });
            }),
            void e.CallStore.on("change", (c) => {
              c.getState() === d.CALL_STATES.INCOMING_RING &&
                h.internalEv.emit("call.incoming_call", {
                  id: c.id,
                  isGroup: c.isGroup,
                  isVideo: c.isVideo,
                  offerTime: c.offerTime,
                  sender: e.WidFactory.toChatWid(c.peerJid),
                  peerJid: c.peerJid,
                });
            })
          )
        );
      },
      21139: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.accept = async function (e) {
          var d = e
            ? k.CallStore.get(e)
            : k.CallStore.findFirst(
                (c) => c.getState() === h.CALL_STATES.INCOMING_RING || c.isGroup
              );
          if (!d)
            throw new f.WPPError(
              "call_not_found",
              `Call ${e || "<empty>"} not found`,
              { callId: e }
            );
          if ("INCOMING_RING" !== d.getState() && !d.isGroup)
            throw new f.WPPError(
              "call_is_not_incoming_ring",
              `Call ${e || "<empty>"} is not incoming ring`,
              { callId: e, state: d.getState() }
            );
          d.peerJid.isGroupCall() ||
            (await k.websocket.ensureE2ESessions([d.peerJid]));
          e = [
            k.websocket.smax("audio", { enc: "opus", rate: "16000" }, null),
            k.websocket.smax("audio", { enc: "opus", rate: "8000" }, null),
          ];
          d.isVideo &&
            e.push(
              k.websocket.smax(
                "video",
                {
                  orientation: "0",
                  screen_width: "1920",
                  screen_height: "1080",
                  device_orientation: "0",
                  enc: "vp8",
                  dec: "vp8",
                },
                null
              )
            );
          e.push(
            k.websocket.smax("net", { medium: "3" }, null),
            k.websocket.smax("encopt", { keygen: "2" }, null)
          );
          d = k.websocket.smax(
            "call",
            {
              to: d.peerJid.toString({ legacy: !0 }),
              id: k.websocket.generateId(),
            },
            [
              k.websocket.smax(
                "accept",
                {
                  "call-id": d.id,
                  "call-creator": d.peerJid.toString({ legacy: !0 }),
                },
                e
              ),
            ]
          );
          return await k.websocket.sendSmaxStanza(d), !0;
        };
        const f = b(62857),
          k = b(14647),
          h = b(20514);
      },
      86094: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.end = async function (e) {
          const d = [
            h.CALL_STATES.ACTIVE,
            h.CALL_STATES.OUTGOING_CALLING,
            h.CALL_STATES.OUTGOING_RING,
          ];
          let c;
          c = e
            ? k.CallStore.get(e)
            : k.CallStore.findFirst(
                (g) => d.includes(g.getState()) || g.isGroup
              );
          if (!c)
            throw new f.WPPError(
              "call_not_found",
              `Call ${e || "<empty>"} not found`,
              { callId: e }
            );
          if (!d.includes(c.getState()) && !c.isGroup)
            throw new f.WPPError(
              "call_is_not_outcoming_calling",
              `Call ${e || "<empty>"} is not incoming calling`,
              { callId: e, state: c.getState() }
            );
          c.peerJid.isGroupCall() ||
            (await k.websocket.ensureE2ESessions([c.peerJid]));
          e = k.websocket.smax(
            "call",
            {
              to: c.peerJid.toString({ legacy: !0 }),
              id: k.websocket.generateId(),
            },
            [
              k.websocket.smax(
                "terminate",
                {
                  "call-id": c.id,
                  "call-creator": c.peerJid.toString({ legacy: !0 }),
                },
                null
              ),
            ]
          );
          return await k.websocket.sendSmaxStanza(e), !0;
        };
        const f = b(62857),
          k = b(14647),
          h = b(20514);
      },
      96263: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.rejectCall = a.reject = a.offer = a.end = a.accept = void 0;
        var f = b(21139);
        Object.defineProperty(a, "accept", {
          enumerable: !0,
          get: function () {
            return f.accept;
          },
        });
        var k = b(86094);
        Object.defineProperty(a, "end", {
          enumerable: !0,
          get: function () {
            return k.end;
          },
        });
        var h = b(82349);
        Object.defineProperty(a, "offer", {
          enumerable: !0,
          get: function () {
            return h.offer;
          },
        });
        var e = b(9144);
        Object.defineProperty(a, "reject", {
          enumerable: !0,
          get: function () {
            return e.reject;
          },
        });
        Object.defineProperty(a, "rejectCall", {
          enumerable: !0,
          get: function () {
            return e.reject;
          },
        });
      },
      82349: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.offer = async function (m, n = {}) {
          n = Object.assign({ isVideo: !1 }, n);
          var p = (0, f.assertWid)(m);
          if (!p.isUser())
            throw new k.WPPError(
              "call_is_not_user",
              `The ${p} is not a user to call`,
              { to: m }
            );
          m = h.functions.randomHex(16).substr(0, 64);
          var r = h.UserPrefs.assertGetMe();
          const t = [
            h.websocket.smax("audio", { enc: "opus", rate: "16000" }, null),
            h.websocket.smax("audio", { enc: "opus", rate: "8000" }, null),
          ];
          n.isVideo &&
            t.push(
              h.websocket.smax(
                "video",
                {
                  orientation: "0",
                  screen_width: "1920",
                  screen_height: "1080",
                  device_orientation: "0",
                  enc: "vp8",
                  dec: "vp8",
                },
                null
              )
            );
          t.push(
            h.websocket.smax("net", { medium: "3" }, null),
            h.websocket.smax(
              "capability",
              { ver: "1" },
              new Uint8Array([1, 4, 255, 131, 207, 4])
            ),
            h.websocket.smax("encopt", { keygen: "2" }, null)
          );
          const v = self.crypto.getRandomValues(new Uint8Array(32)).buffer;
          t.push(...(await (0, g.prepareDestionation)([p], v)));
          r = h.websocket.smax(
            "call",
            { to: p.toString({ legacy: !0 }), id: h.functions.randomHex(8) },
            [
              h.websocket.smax(
                "offer",
                { "call-id": m, "call-creator": r.toString({ legacy: !0 }) },
                t
              ),
            ]
          );
          n = new h.CallModel({
            id: m,
            peerJid: p,
            isVideo: n.isVideo,
            isGroup: !1,
            outgoing: !0,
            offerTime: (0, d.unixTime)(),
            webClientShouldHandle: !1,
            canHandleLocally: !0,
          });
          h.CallStore.add(n);
          h.CallStore.setActiveCall(h.CallStore.assertGet(m));
          n.setState(e.CALL_STATES.OUTGOING_CALLING);
          p = await h.websocket.sendSmaxStanza(r);
          return console.info(p), console.info((0, c.parseRelayResponse)(p)), n;
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(20514),
          d = b(52757),
          c = b(45988),
          g = b(97362);
      },
      45988: (l, a, b) => {
        function f(h) {
          h = new Uint8Array(h);
          if (6 !== h.length) return null;
          h = new DataView(h.buffer);
          return {
            ip: [h.getUint8(0), h.getUint8(1), h.getUint8(2), h.getUint8(3)],
            port: h.getUint16(4),
          };
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.parseRelayResponse = function (h) {
          const e = f(h.content.find((m) => "rte" === m.tag).content);
          h = h.content.find((m) => "relay" === m.tag);
          var d = h.content.find((m) => "key" === m.tag);
          d = new TextDecoder().decode(new Uint8Array(d.content));
          const c = {};
          h.content
            .filter((m) => "token" === m.tag)
            .forEach((m) => {
              const n = k.Base64.encodeB64(new Uint8Array(m.content));
              c[m.attrs.id || "0"] = n;
            });
          const g = {};
          return (
            h.content
              .filter((m) => m.tag === "te2")
              .forEach((m) => {
                const n = f(m.content);
                if (n) {
                  const p = m.attrs.relay_id || "0";
                  m = c[m.attrs.token_id || "0"];
                  g[p] = Object.assign(Object.assign({}, n), {
                    relay_id: p,
                    token: m,
                  });
                }
              }),
            { rte: e, key: d, relays: g }
          );
        };
        const k = b(14647);
      },
      97362: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareDestionation = async function (k, h) {
          k = await f.functions.getFanOutList({ wids: k });
          await f.websocket.ensureE2ESessions(k);
          let e = !1;
          var d = await Promise.all(
            k.map(async (c) => {
              const { type: g, ciphertext: m } =
                await f.functions.encryptMsgProtobuf(c, 0, {
                  call: { callKey: new Uint8Array(h) },
                });
              return (
                (e = e || "pkmsg" === g),
                f.websocket.smax("to", { jid: c.toString({ legacy: !0 }) }, [
                  f.websocket.smax("enc", { v: "2", type: g, count: "0" }, m),
                ])
              );
            })
          );
          k = [];
          if ((k.push(f.websocket.smax("destination", {}, d)), e))
            (d = await f.multidevice.adv.getADVEncodedIdentity()),
              k.push(f.websocket.smax("device-identity", void 0, d));
          return k;
        };
        const f = b(14647);
      },
      9144: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.reject = async function (e) {
          let d;
          d = e
            ? k.CallStore.get(e)
            : k.CallStore.findFirst(
                (c) => c.getState() === h.CALL_STATES.INCOMING_RING || c.isGroup
              );
          if (!d)
            throw new f.WPPError(
              "call_not_found",
              `Call ${e || "<empty>"} not found`,
              { callId: e }
            );
          if ("INCOMING_RING" !== d.getState() && !d.isGroup)
            throw new f.WPPError(
              "call_is_not_incoming_ring",
              `Call ${e || "<empty>"} is not incoming ring`,
              { callId: e, state: d.getState() }
            );
          d.peerJid.isGroupCall() ||
            (await k.websocket.ensureE2ESessions([d.peerJid]));
          e = k.websocket.smax(
            "call",
            {
              from: k.UserPrefs.getMaybeMeUser().toString({ legacy: !0 }),
              to: d.peerJid.toString({ legacy: !0 }),
              id: k.websocket.generateId(),
            },
            [
              k.websocket.smax(
                "reject",
                {
                  "call-id": d.id,
                  "call-creator": d.peerJid.toString({ legacy: !0 }),
                  count: "0",
                },
                null
              ),
            ]
          );
          return await k.websocket.sendSmaxStanza(e), !0;
        };
        const f = b(62857),
          k = b(14647),
          h = b(20514);
      },
      38893: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(75495);
        l(b(96263), a);
      },
      71722: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.add = async function (d, c) {
          if (!d || !c)
            throw new k.WPPError(
              "send_required_params",
              "For add item in cart send chatId and products array"
            );
          for (const g of c)
            if ((c = await (0, f.getProductById)(d, g.id)))
              (c = new h.ProductModel({
                id: c.id,
                isHidden: c.is_hidden || !1,
                catalogWid: d,
                url: c.url,
                name: c.name,
                description: c.description,
                availability: c.availability,
                maxAvailable: null == c ? void 0 : c.maxAvailable,
                reviewStatus:
                  null == c ? void 0 : c.capability_to_review_status[0].value,
                currency: c.currency,
                priceAmount1000: c.price,
                salePriceAmount1000: null,
                retailerId: c.retailer_id,
                imageCount:
                  c.image_cdn_urls.length + c.additional_image_cdn_urls.length,
                additionalImageCdnUrl: c.additional_image_cdn_urls,
                additionalImageHashes: c.image_hashes_for_whatsapp,
                imageCdnUrl: c.image_cdn_urls[0].value,
                imageHash: c.image_hashes_for_whatsapp[0],
              })),
                await (0, e.addProductToCart)(c),
                await (0, e.updateProductQuantityCart)(c, g.qnt);
          return h.CartStore.findCart(d);
        };
        const f = b(40164),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      70932: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.clear = async function (e) {
          var d, c;
          const g = k.CartStore.findCart(e);
          if (
            !g ||
            null === (d = null == g ? void 0 : g.cartItemCollection) ||
            void 0 === d ||
            !d.length
          )
            throw new f.WPPError(
              "cart_not_have_products",
              `Cart from  ${e || "<empty>"} not have products`,
              { wid: e }
            );
          null === (c = g.cartItemCollection) || void 0 === c || c.reset();
          g.set("message", "");
          g.trigger("change:cartItemCollection");
          (0, h.updateCart)(g);
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757);
      },
      9453: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = function (k) {
          return f.CartStore.get(k);
        };
        const f = b(14647);
      },
      65731: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getThumbFromCart = async function (h) {
          var e, d;
          const c = await k.CartStore.findCart(h);
          var g =
            null === (e = null == c ? void 0 : c.cartItemCollection) ||
            void 0 === e
              ? void 0
              : e.at(0);
          if (!g || !c) return "";
          h = k.CatalogStore.get((0, f.createWid)(h));
          if (!h) return "";
          g = h.productCollection.get(g.id);
          if (!g) return "";
          g = await (null == g ? void 0 : g.getProductImageCollectionHead());
          if (!g) return "";
          g = null == g ? void 0 : g.mediaData;
          return null == g
            ? ""
            : g.preview &&
              ((g = await (null === (d = null == g ? void 0 : g.preview) ||
              void 0 === d
                ? void 0
                : d.getBase64())),
              null != g)
            ? g
            : "";
        };
        const f = b(62857),
          k = b(14647);
      },
      89133: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.update =
          a.submit =
          a.remove =
          a.getThumbFromCart =
          a.get =
          a.clear =
          a.add =
            void 0;
        var f = b(71722);
        Object.defineProperty(a, "add", {
          enumerable: !0,
          get: function () {
            return f.add;
          },
        });
        var k = b(70932);
        Object.defineProperty(a, "clear", {
          enumerable: !0,
          get: function () {
            return k.clear;
          },
        });
        var h = b(9453);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return h.get;
          },
        });
        var e = b(65731);
        Object.defineProperty(a, "getThumbFromCart", {
          enumerable: !0,
          get: function () {
            return e.getThumbFromCart;
          },
        });
        var d = b(74553);
        Object.defineProperty(a, "remove", {
          enumerable: !0,
          get: function () {
            return d.remove;
          },
        });
        var c = b(24393);
        Object.defineProperty(a, "submit", {
          enumerable: !0,
          get: function () {
            return c.submit;
          },
        });
        var g = b(57288);
        Object.defineProperty(a, "update", {
          enumerable: !0,
          get: function () {
            return g.update;
          },
        });
      },
      74553: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.remove = async function (e, d) {
          if (!e || !d)
            throw new f.WPPError(
              "send_required_params",
              "For update item in cart send chatId and productId"
            );
          return (
            await (0, h.deleteProductFromCart)(e, d), k.CartStore.findCart(e)
          );
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757);
      },
      24393: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.submit = async function (g, m, n) {
          var p, r, t;
          if (
            g.toString() ==
            (null === (p = (0, k.getMyUserId)()) || void 0 === p
              ? void 0
              : p.toString())
          )
            throw new h.WPPError(
              "can_not_submit_order_to_yourself",
              "You can not submit order to yourself"
            );
          p = e.CartStore.findCart(g);
          if (
            !p ||
            null === (r = null == p ? void 0 : p.cartItemCollection) ||
            void 0 === r ||
            !r.length
          )
            throw new h.WPPError(
              "cart_not_have_products",
              `Cart from  ${g || "<empty>"} not have products`,
              { wid: g }
            );
          r = await (0, d.findChat)((0, h.createWid)(g));
          const v = await (0, d.createOrder)(
              r.id,
              p.cartItemCollection.toArray()
            ),
            x = null === (t = v.price) || void 0 === t ? void 0 : t.total;
          m = await (0, f.prepareRawMessage)(
            r,
            {
              type: "order",
              orderId: v.id,
              token: v.token,
              orderTitle: r.name || r.formattedTitle,
              sellerJid: r.id.toString({ legacy: !0 }),
              status: 1,
              messageVersion: 2,
              thumbnail: await (0, c.getThumbFromCart)(g),
              itemCount: p.itemCount,
              message: m || p.message,
              totalAmount1000: x && x.length > 0 ? parseInt(x, 10) : void 0,
              totalCurrencyCode:
                v.price.currency && v.price.currency.length > 0
                  ? v.price.currency
                  : 0,
            },
            n
          );
          if (
            (await (0, d.addAndSendMsgToChat)(r, m),
            (0, d.updateCart)(p),
            await (0, c.clear)(g),
            !v.id)
          )
            throw new h.WPPError(
              "error_send_order_request",
              "Error when sending order request"
            );
          return await (0, f.getMessageById)(m.id);
        };
        const f = b(74023),
          k = b(72927),
          h = b(62857),
          e = b(14647),
          d = b(52757),
          c = b(89133);
      },
      57288: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.update = async function (h, e, d) {
          if (!h || !e || !d.quantity)
            throw new f.WPPError(
              "send_required_params",
              "For update item in cart send chatId, productId and options"
            );
          return (0, k.add)(h, [{ id: e, qnt: d.quantity }]);
        };
        const f = b(62857),
          k = b(71722);
      },
      81151: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(89133), a);
      },
      373: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.addProductImage = async function (d, c) {
          var g = await (0, k.convertToFile)(c);
          c = await h.OpaqueData.createFromData(g, g.type);
          g = await (0, e.calculateFilehashFromBlob)(g);
          c = await (0, e.uploadProductImage)(c, g);
          d = await (0, f.assertGetProduct)(d);
          return d.additionalImageCdnUrl.push(c), (0, e.editProduct)(d);
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      11532: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.changeProductImage = async function (d, c) {
          var g = await (0, k.convertToFile)(c);
          c = await h.OpaqueData.createFromData(g, g.type);
          g = await (0, e.calculateFilehashFromBlob)(g);
          c = await (0, e.uploadProductImage)(c, g);
          d = await (0, f.assertGetProduct)(d);
          return (d.imageCdnUrl = c), (0, e.editProduct)(d);
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      69092: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.createCollection = async function (h, e) {
          const { sessionId: d } = new f.ProductCatalogSession(!0);
          return await (0, k.createCollection)(h, e, `${d}`);
        };
        const f = b(14647),
          k = b(52757);
      },
      11561: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.createProduct = async function (e) {
          var d = await (0, f.convertToFile)(e.image),
            c = await k.OpaqueData.createFromData(d, d.type);
          d = await (0, h.calculateFilehashFromBlob)(d);
          c = await (0, h.uploadProductImage)(c, d);
          d = new k.ProductModel();
          d.name = e.name.toString();
          d.catalogWid = k.UserPrefs.getMeUser();
          d.imageCdnUrl = c;
          d.productImageCollection = new k.ProductImageModel({ mediaUrl: c });
          e.description && (d.description = e.description);
          e.price &&
            ((d.priceAmount1000 = 1e4 * e.price),
            (d.currency = e.currency || "BRL"));
          e.isHidden && (d.isHidden = e.isHidden);
          e.url && (d.url = e.url);
          e.retailerId && (d.retailerId = e.retailerId);
          return await (0, h.addProduct)(d, 100, 100);
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757);
      },
      14639: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.deleteCollection = async function (h) {
          const { sessionId: e } = new f.ProductCatalogSession(!0);
          return (
            await (0, k.deleteCollection)(h, `${e}`),
            "Collection deleted sucessful"
          );
        };
        const f = b(14647),
          k = b(52757);
      },
      61612: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.delProducts = async function (k) {
          let h = 200;
          try {
            Array.isArray(k)
              ? await (0, f.deleteProducts)(k)
              : await (0, f.deleteProducts)([k]);
          } catch (e) {
            h = 500;
          }
          return { productsIds: k, status: h };
        };
        const f = b(52757);
      },
      25312: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.editCollection = async function (h, e) {
          const { sessionId: d } = new f.ProductCatalogSession(!0);
          return await (0, k.editCollection)(
            h,
            e.name,
            !1,
            e.productsToAdd || [],
            e.productsToRemove || [],
            `${d}`
          );
        };
        const f = b(14647),
          k = b(52757);
      },
      77893: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.editProduct = async function (h, e) {
          h = await (0, f.assertGetProduct)(h);
          Object.keys(e).forEach((d) => void 0 === e[d] && delete e[d]);
          h = Object.assign(h, e);
          return await (0, k.editProduct)(h);
        };
        const f = b(41687),
          k = b(52757);
      },
      11201: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getCollections = async function (h, e, d) {
          ({ collections: h } = await (0, k.queryCollectionsIQ)({
            afterCursor: "",
            catalogWid: (0, f.createWid)(h),
            height: 100,
            width: 100,
            limit: e || 10,
            productsCount: d || 10,
          }));
          return h;
        };
        const f = b(62857),
          k = b(52757);
      },
      6973: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyCatalog = async function () {
          return f.CatalogStore.get(f.UserPrefs.getMeUser());
        };
        const f = b(14647);
      },
      64639: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getProductById = async function (h, e) {
          h = (0, f.createWid)(h);
          ({ data: e } = await (0, k.queryProduct)(h, e));
          return e;
        };
        const f = b(62857),
          k = b(52757);
      },
      94970: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getProducts = async function (h, e) {
          ({ data: h } = await (0, k.queryCatalog)(
            (0, f.createWid)(h),
            void 0,
            e || 10,
            100,
            100
          ));
          return h;
        };
        const f = b(62857),
          k = b(52757);
      },
      98486: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.updateCartEnabled =
          a.setProductVisibility =
          a.removeProductImage =
          a.getProducts =
          a.getProductById =
          a.getMyCatalog =
          a.getCollections =
          a.editProduct =
          a.editCollection =
          a.delProducts =
          a.deleteCollection =
          a.createProduct =
          a.createCollection =
          a.changeProductImage =
          a.addProductImage =
            void 0;
        var f = b(373);
        Object.defineProperty(a, "addProductImage", {
          enumerable: !0,
          get: function () {
            return f.addProductImage;
          },
        });
        var k = b(11532);
        Object.defineProperty(a, "changeProductImage", {
          enumerable: !0,
          get: function () {
            return k.changeProductImage;
          },
        });
        var h = b(69092);
        Object.defineProperty(a, "createCollection", {
          enumerable: !0,
          get: function () {
            return h.createCollection;
          },
        });
        var e = b(11561);
        Object.defineProperty(a, "createProduct", {
          enumerable: !0,
          get: function () {
            return e.createProduct;
          },
        });
        var d = b(14639);
        Object.defineProperty(a, "deleteCollection", {
          enumerable: !0,
          get: function () {
            return d.deleteCollection;
          },
        });
        var c = b(61612);
        Object.defineProperty(a, "delProducts", {
          enumerable: !0,
          get: function () {
            return c.delProducts;
          },
        });
        var g = b(25312);
        Object.defineProperty(a, "editCollection", {
          enumerable: !0,
          get: function () {
            return g.editCollection;
          },
        });
        var m = b(77893);
        Object.defineProperty(a, "editProduct", {
          enumerable: !0,
          get: function () {
            return m.editProduct;
          },
        });
        var n = b(11201);
        Object.defineProperty(a, "getCollections", {
          enumerable: !0,
          get: function () {
            return n.getCollections;
          },
        });
        var p = b(6973);
        Object.defineProperty(a, "getMyCatalog", {
          enumerable: !0,
          get: function () {
            return p.getMyCatalog;
          },
        });
        var r = b(64639);
        Object.defineProperty(a, "getProductById", {
          enumerable: !0,
          get: function () {
            return r.getProductById;
          },
        });
        var t = b(94970);
        Object.defineProperty(a, "getProducts", {
          enumerable: !0,
          get: function () {
            return t.getProducts;
          },
        });
        var v = b(59196);
        Object.defineProperty(a, "removeProductImage", {
          enumerable: !0,
          get: function () {
            return v.removeProductImage;
          },
        });
        var x = b(85719);
        Object.defineProperty(a, "setProductVisibility", {
          enumerable: !0,
          get: function () {
            return x.setProductVisibility;
          },
        });
        var B = b(93114);
        Object.defineProperty(a, "updateCartEnabled", {
          enumerable: !0,
          get: function () {
            return B.updateCartEnabled;
          },
        });
      },
      59196: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeProductImage = async function (h, e) {
          h = await (0, f.assertGetProduct)(h);
          return h.additionalImageCdnUrl.splice(e, 1), (0, k.editProduct)(h);
        };
        const f = b(41687),
          k = b(52757);
      },
      85719: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setProductVisibility = async function (h, e) {
          return (
            await (0, k.productVisibilitySet)([{ isHidden: e, productId: h }]),
            await (0, f.assertGetProduct)(h)
          );
        };
        const f = b(41687),
          k = b(52757);
      },
      93114: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.updateCartEnabled = async function (k) {
          return await (0, f.updateCartEnabled)(k);
        };
        const f = b(52757);
      },
      40164: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(98486), a);
      },
      50175: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.defaultSendMessageOptions = {
          createChat: !1,
          detectMentioned: !0,
          linkPreview: !0,
          markIsRead: !0,
          waitForAck: !0,
          delay: 0,
        };
      },
      31853: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(70510);
        b(16854);
        b(51118);
        b(16349);
        b(62557);
        b(61905);
        b(37740);
        b(67147);
        b(77810);
        b(56136);
      },
      70510: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(54993),
          c = b(52757);
        a.onFullReady(function () {
          function g(m) {
            if (!(m.ack < 2 || "sender" === m.ackString)) {
              var n = m.from,
                p = m.participant || void 0,
                r = m.from,
                t = !m.recipient || e.UserPrefs.getMeUser().equals(m.recipient);
              if (t) {
                var v = m.externalIds.map(
                  (x) =>
                    new e.MsgKey({
                      id: x,
                      remote: r,
                      fromMe: t,
                      participant: m.participant,
                    })
                );
                h.internalEv.emit("chat.msg_ack_change", {
                  ack: m.ack,
                  chat: n,
                  sender: p,
                  ids: v,
                });
              }
            }
          }
          e.MsgStore.on("change:ack", (m) => {
            1 === m.ack &&
              queueMicrotask(() => {
                h.internalEv.emit("chat.msg_ack_change", {
                  ack: m.ack,
                  chat: m.to,
                  ids: [m.id],
                });
              });
          });
          (0, d.wrapModuleFunction)(c.handleChatSimpleReceipt, (m, ...n) => {
            const [p] = n;
            return (
              queueMicrotask(() => {
                g(p);
              }),
              m(...n)
            );
          });
          (0, d.wrapModuleFunction)(c.handleGroupSimpleReceipt, (m, ...n) => {
            const [p] = n;
            return (
              queueMicrotask(() => {
                g(p);
              }),
              m(...n)
            );
          });
          (0, d.wrapModuleFunction)(c.handleStatusSimpleReceipt, (m, ...n) => {
            const [p] = n;
            return (
              queueMicrotask(() => {
                g(p);
              }),
              m(...n)
            );
          });
        });
      },
      16854: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() => {
          e.ChatStore.on("change:active", (c) => {
            d && clearTimeout(d);
            d = setTimeout(() => {
              h.internalEv.emit("chat.active_chat", c.active ? c : null);
            }, 50);
          });
        });
        let d = null;
      },
      56136: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onFullReady(function () {
          e.MsgStore.on("change:latestEditMsgKey", (d) => {
            queueMicrotask(() => {
              h.internalEv.emit("chat.msg_edited", {
                chat: d.to,
                id: d.id.toString(),
                msg: d,
              });
            });
          });
        });
      },
      77810: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (n, p, r, t) {
                  void 0 === t && (t = r);
                  var v = Object.getOwnPropertyDescriptor(p, r);
                  (v &&
                    ("get" in v
                      ? p.__esModule
                      : !v.writable && !v.configurable)) ||
                    (v = {
                      enumerable: !0,
                      get: function () {
                        return p[r];
                      },
                    });
                  Object.defineProperty(n, t, v);
                }
              : function (n, p, r, t) {
                  void 0 === t && (t = r);
                  n[t] = p[r];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (n, p) {
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: p,
                  });
                }
              : function (n, p) {
                  n.default = p;
                });
        l =
          (this && this.__importStar) ||
          function (n) {
            if (n && n.__esModule) return n;
            var p = {};
            if (null != n)
              for (var r in n)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(n, r) &&
                  f(p, n, r);
            return k(p, n), p;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(72927),
          e = b(13691),
          d = b(26105);
        a = l(b(1132));
        const c = b(54993),
          g = b(52757),
          m = b(97829);
        a.onFullReady(function () {
          async function n(p, ...r) {
            var t = r[0];
            r = Array.isArray(t[1]) ? t[1] : [t[1]];
            t = t[0];
            if ((0, h.isMainReady)()) {
              const v = [];
              for (const x of r) v.push(await (0, d.getLabelById)(x));
              e.internalEv.emit("chat.update_label", {
                chat: (0, m.get)(t),
                ids: r,
                labels: v,
                type: p,
              });
            }
          }
          (0, c.wrapModuleFunction)(
            g.addToLabelCollection,
            async (p, ...r) => (
              queueMicrotask(() => {
                n("add", r);
              }),
              p(...r)
            )
          );
          (0, c.wrapModuleFunction)(
            g.removeLabelFromCollection,
            async (p, ...r) => (
              queueMicrotask(() => {
                n("remove", r);
              }),
              p(...r)
            )
          );
        });
      },
      51118: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() => {
          e.MsgStore.on("add", (d) => {
            d.isNewMsg &&
              d.isLive &&
              queueMicrotask(() => {
                h.internalEv.emit("chat.live_location_start", {
                  id: d.sender,
                  msgId: d.id,
                  chat: d.chat.id,
                  lat: d.lat,
                  lng: d.lng,
                  accuracy: d.accuracy,
                  speed: d.speed,
                  degrees: d.degrees,
                  shareDuration: d.shareDuration,
                });
              });
          });
        });
      },
      16349: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(52757),
          c = b(97829);
        a.onInjected(() =>
          (function () {
            e.MsgStore.on("add", (g) => {
              g.isNewMsg &&
                queueMicrotask(async () => {
                  "ciphertext" ===
                    (g = await (async function (m) {
                      if (void 0 !== m.quotedStanzaID) {
                        const n = (0, d.getQuotedMsgObj)(m);
                        if (!n) return m;
                        Object.defineProperties(m, {
                          _quotedMsgObj: { value: n, writable: !1 },
                          quotedMsgId: { value: n.id, writable: !1 },
                        });
                      }
                      return m;
                    })(g)).type &&
                    g.once("change:type", () => {
                      queueMicrotask(() => {
                        h.internalEv.emit("chat.new_message", g);
                      });
                    });
                  h.internalEv.emit("chat.new_message", g);
                });
            });
            void 0 === e.MsgModel.prototype.chat &&
              Object.defineProperty(e.MsgModel.prototype, "chat", {
                get: function () {
                  var g;
                  return e.ChatStore.get(
                    (null === (g = this.id) || void 0 === g ? 0 : g.fromMe)
                      ? this.to
                      : this.from
                  );
                },
                configurable: !0,
              });
            void 0 === e.MsgModel.prototype.isGroupMsg &&
              Object.defineProperty(e.MsgModel.prototype, "isGroupMsg", {
                get: function () {
                  var g;
                  return null === (g = null == this ? void 0 : this.chat) ||
                    void 0 === g
                    ? void 0
                    : g.isGroup;
                },
                configurable: !0,
              });
            void 0 === e.MsgModel.prototype.quotedMsgId &&
              Object.defineProperty(e.MsgModel.prototype, "quotedMsgId", {
                get: function () {
                  return (0, c.getQuotedMsgKey)(this);
                },
                configurable: !0,
              });
          })()
        );
      },
      62557: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (m, n, p, r) {
                  void 0 === r && (r = p);
                  var t = Object.getOwnPropertyDescriptor(n, p);
                  (t &&
                    ("get" in t
                      ? n.__esModule
                      : !t.writable && !t.configurable)) ||
                    (t = {
                      enumerable: !0,
                      get: function () {
                        return n[p];
                      },
                    });
                  Object.defineProperty(m, r, t);
                }
              : function (m, n, p, r) {
                  void 0 === r && (r = p);
                  m[r] = n[p];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (m, n) {
                  Object.defineProperty(m, "default", {
                    enumerable: !0,
                    value: n,
                  });
                }
              : function (m, n) {
                  m.default = n;
                });
        l =
          (this && this.__importStar) ||
          function (m) {
            if (m && m.__esModule) return m;
            var n = {};
            if (null != m)
              for (var p in m)
                "default" !== p &&
                  Object.prototype.hasOwnProperty.call(m, p) &&
                  f(n, m, p);
            return k(n, m), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(54993),
          d = b(52757),
          c = b(97829);
        a.onFullReady(function () {
          (0, e.wrapModuleFunction)(d.upsertVotes, async (m, ...n) => {
            var [p] = n;
            for (const r of p)
              try {
                if (r.senderTimestampMs < g) continue;
                const t = await (0, c.getMessageById)(r.parentMsgKey);
                p = [];
                for (const v of r.selectedOptionLocalIds)
                  p[v] = t.pollOptions.filter((x) => x.localId == v)[0];
                h.internalEv
                  .emitAsync("chat.poll_response", {
                    msgId: r.parentMsgKey,
                    chatId: r.parentMsgKey.remote,
                    selectedOptions: p,
                    timestamp: r.senderTimestampMs,
                    sender: r.sender,
                  })
                  .catch(() => null);
              } catch (t) {}
            return m(...n);
          });
        });
        const g = Date.now();
      },
      61905: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        const f = b(13691),
          k = b(14647);
        f.internalEv.on("conn.main_ready", async () => {
          const h = k.ChatStore.map((e) => e.presence.subscribe());
          await Promise.all(h);
          k.PresenceStore.on("change:chatstate.type", (e) => {
            var d;
            const c = k.PresenceStore.getModelsArray().find(
              (g) => g.chatstate === e
            );
            c &&
              c.hasData &&
              (null === (d = c.chatstate) || void 0 === d ? 0 : d.type) &&
              queueMicrotask(() => {
                var g,
                  m,
                  n = k.ContactStore.get(c.id);
                n = {
                  id: c.id,
                  isOnline: c.isOnline,
                  isGroup: c.isGroup,
                  isUser: c.isUser,
                  shortName: n ? n.formattedShortName : "",
                  state:
                    null === (g = c.chatstate) || void 0 === g
                      ? void 0
                      : g.type,
                  t: Date.now(),
                };
                c.isUser &&
                  (n.isContact = !(null === (m = c.chatstate) || void 0 === m
                    ? 0
                    : m.deny));
                c.isGroup &&
                  (n.participants = c.chatstates
                    .getModelsArray()
                    .filter((p) => !!p.type)
                    .map((p) => {
                      const r = k.ContactStore.get(p.id);
                      return {
                        id: p.id.toString(),
                        state: p.type,
                        shortName: r ? r.formattedShortName : "",
                      };
                    }));
                f.internalEv.emit("chat.presence_change", n);
              });
          });
        });
      },
      37740: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (n, p, r, t) {
                  void 0 === t && (t = r);
                  var v = Object.getOwnPropertyDescriptor(p, r);
                  (v &&
                    ("get" in v
                      ? p.__esModule
                      : !v.writable && !v.configurable)) ||
                    (v = {
                      enumerable: !0,
                      get: function () {
                        return p[r];
                      },
                    });
                  Object.defineProperty(n, t, v);
                }
              : function (n, p, r, t) {
                  void 0 === t && (t = r);
                  n[t] = p[r];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (n, p) {
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: p,
                  });
                }
              : function (n, p) {
                  n.default = p;
                });
        l =
          (this && this.__importStar) ||
          function (n) {
            if (n && n.__esModule) return n;
            var p = {};
            if (null != n)
              for (var r in n)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(n, r) &&
                  f(p, n, r);
            return k(p, n), p;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691),
          e = b(62857);
        a = l(b(1132));
        const d = b(14647),
          c = b(54993),
          g = b(52757);
        a.onFullReady(function () {
          (0, c.wrapModuleFunction)(g.createOrUpdateReactions, (n, ...p) => {
            const [r] = p,
              t = Date.now();
            if (Array.isArray(r))
              for (const v of r)
                try {
                  v.t < t ||
                    h.internalEv.emitAsync("chat.new_reaction", {
                      id: d.MsgKey.fromString(v.id),
                      orphan: v.orphan,
                      orphanReason: v.orphanReason,
                      msgId: d.MsgKey.fromString(v.reactionParentKey),
                      reactionText: v.reactionText,
                      read: v.read,
                      sender: (0, e.createWid)(v.from),
                      timestamp: v.t,
                    });
                } catch (x) {}
            else
              try {
                if (p[1]) {
                  if (m[r.msgKey]) return n(...p);
                  m[r.msgKey] = r;
                  h.internalEv.emitAsync("chat.new_reaction", {
                    id: d.MsgKey.fromString(r.msgKey),
                    orphan: r.orphan,
                    orphanReason: null,
                    msgId: d.MsgKey.fromString(r.parentMsgKey),
                    reactionText: r.reactionText,
                    read: r.read,
                    sender: (0, e.createWid)(r.senderUserJid),
                    timestamp: r.t,
                  });
                  setTimeout(() => {
                    delete m[r.msgKey];
                  }, 1e4);
                }
              } catch (v) {}
            return n(...p);
          });
        });
        const m = [];
      },
      67147: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() =>
          (function () {
            const d = e.MsgStore.processMultipleMessages,
              c = ["revoke", "sender_revoke", "admin_revoke"];
            e.MsgStore.processMultipleMessages = (g, m, ...n) =>
              new Promise((p, r) => {
                try {
                  for (const t of m)
                    t.isNewMsg &&
                      "protocol" === t.type &&
                      c.includes(t.subtype) &&
                      h.internalEv.emit("chat.msg_revoke", {
                        author: t.author,
                        from: t.from,
                        id: t.id,
                        refId: t.protocolMessageKey,
                        to: t.to,
                        type: t.subtype,
                      });
                } catch (t) {}
                d.call(e.MsgStore, g, m, ...n).then(p, r);
              });
          })()
        );
      },
      95071: (l, a, b) => {
        async function f(g, m = !0) {
          g = (0, h.assertWid)(g);
          const n = (0, h.assertGetChat)(g);
          if (n.archive === m)
            throw new e.WPPError(
              (m ? "archive" : "unarchive") + "_error",
              `The chat ${g.toString()} is already ${
                m ? "archived" : "unarchived"
              }`,
              { wid: g, archive: m }
            );
          return (
            (0, k.compare)(self.Debug.VERSION, "2.3000.0", ">=")
              ? d.Cmd.archiveChat(n, m)
              : await (0, c.setArchive)(n, m),
            { wid: g, archive: m }
          );
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.archive = f;
        a.unarchive = async function (g) {
          return f(g, !1);
        };
        const k = b(38385),
          h = b(41687),
          e = b(62857),
          d = b(14647),
          c = b(52757);
      },
      15035: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.encryptAndParserMsgButtons = async function (b, f, k, h, e, d, c) {
          var g, m;
          "function" == typeof d && (c = d);
          const n = [];
          (null ===
            (m =
              null === (g = null == f ? void 0 : f.viewOnceMessage) ||
              void 0 === g
                ? void 0
                : g.message) || void 0 === m
            ? 0
            : m.interactiveMessage) &&
            (function (p, r) {
              var t, v, x, B, F, L, J, T, V;
              const W = r.filter((M) => !M.device);
              r = r.filter((M) => M.device);
              const R =
                null ===
                  (v =
                    null === (t = p.viewOnceMessage) || void 0 === t
                      ? void 0
                      : t.message) || void 0 === v
                  ? void 0
                  : v.interactiveMessage;
              let ba = !1;
              t = JSON.parse(JSON.stringify(p));
              if (R) {
                const M = [
                  "documentMessage",
                  "documentWithCaptionMessage",
                  "imageMessage",
                  "videoMessage",
                ];
                let K;
                v = 1;
                for (var Z of M)
                  if (Z in R.header) {
                    v = Z;
                    "documentWithCaptionMessage" === Z &&
                      (Z = "documentMessage");
                    K = { [v]: R.header[v] };
                    v =
                      "imageMessage" == v
                        ? 4
                        : v.includes("document")
                        ? 3
                        : "videoMessage" == v
                        ? 5
                        : 1;
                    break;
                  }
                Z = {
                  message: {
                    buttonsMessage: Object.assign(
                      Object.assign(
                        {
                          headerType: v,
                          contentText:
                            (null === (x = null == R ? void 0 : R.body) ||
                            void 0 === x
                              ? void 0
                              : x.text) || " ",
                          footerText:
                            (null === (B = null == R ? void 0 : R.footer) ||
                            void 0 === B
                              ? void 0
                              : B.text) || " ",
                        },
                        K
                      ),
                      {
                        buttons:
                          null ===
                            (F = null == R ? void 0 : R.nativeFlowMessage) ||
                          void 0 === F
                            ? void 0
                            : F.buttons
                                .map((N, P) => {
                                  var X, y;
                                  return "quick_reply" == N.name
                                    ? {
                                        type: 1,
                                        buttonId:
                                          (null ===
                                            (X = JSON.parse(
                                              N.buttonParamsJson
                                            )) || void 0 === X
                                            ? void 0
                                            : X.id) || `${P}`,
                                        buttonText: {
                                          displayText:
                                            (null ===
                                              (y = JSON.parse(
                                                N.buttonParamsJson
                                              )) || void 0 === y
                                              ? void 0
                                              : y.display_text) || " ",
                                        },
                                      }
                                    : ((ba = !0), null);
                                })
                                .filter((N) => null != N),
                      }
                    ),
                  },
                };
                x = {
                  message: {
                    templateMessage: {
                      hydratedTemplate: Object.assign(
                        Object.assign(
                          Object.assign(
                            {
                              hydratedButtons:
                                null ===
                                  (L =
                                    null == R ? void 0 : R.nativeFlowMessage) ||
                                void 0 === L
                                  ? void 0
                                  : L.buttons
                                      .map((N, P) => {
                                        var X, y, A, D, G, I, C, H;
                                        return "quick_reply" == N.name
                                          ? {
                                              index: P,
                                              quickReplyButton: {
                                                displayText:
                                                  (null ===
                                                    (X = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === X
                                                    ? void 0
                                                    : X.display_text) || " ",
                                                id:
                                                  (null ===
                                                    (y = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === y
                                                    ? void 0
                                                    : y.id) || `${P}`,
                                              },
                                            }
                                          : "cta_url" == N.name
                                          ? {
                                              index: P,
                                              urlButton: {
                                                displayText:
                                                  (null ===
                                                    (A = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === A
                                                    ? void 0
                                                    : A.display_text) || " ",
                                                url:
                                                  null ===
                                                    (D = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === D
                                                    ? void 0
                                                    : D.url,
                                              },
                                            }
                                          : "cta_copy" == N.name
                                          ? {
                                              index: P,
                                              urlButton: {
                                                displayText:
                                                  (null ===
                                                    (G = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === G
                                                    ? void 0
                                                    : G.display_text) || " ",
                                                url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${
                                                  null ===
                                                    (I = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === I
                                                    ? void 0
                                                    : I.copy_code
                                                }`,
                                              },
                                            }
                                          : "cta_call" == N.name
                                          ? {
                                              index: P,
                                              callButton: {
                                                displayText:
                                                  (null ===
                                                    (C = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === C
                                                    ? void 0
                                                    : C.display_text) || " ",
                                                phoneNumber:
                                                  null ===
                                                    (H = JSON.parse(
                                                      N.buttonParamsJson
                                                    )) || void 0 === H
                                                    ? void 0
                                                    : H.phone_number,
                                              },
                                            }
                                          : null;
                                      })
                                      .filter((N) => null != N),
                            },
                            K
                          ),
                          1 == v
                            ? {
                                hydratedTitleText:
                                  (null === (J = R.header) || void 0 === J
                                    ? void 0
                                    : J.title) || " ",
                              }
                            : void 0
                        ),
                        {
                          hydratedContentText:
                            (null === (T = null == R ? void 0 : R.body) ||
                            void 0 === T
                              ? void 0
                              : T.text) || " ",
                          hydratedFooterText:
                            (null === (V = null == R ? void 0 : R.footer) ||
                            void 0 === V
                              ? void 0
                              : V.text) || " ",
                        }
                      ),
                    },
                  },
                };
                delete t.viewOnceMessage;
                t.documentWithCaptionMessage = ba ? x : Z;
                t.messageContextInfo = p.messageContextInfo;
              }
              return [
                { proto: p, devices: W },
                { proto: t, devices: r },
              ];
            })(f, k).map(async (p) => {
              p = await c(
                b,
                p.proto,
                p.devices,
                h,
                e,
                "function" != typeof d ? d : void 0
              );
              n.push(...p.stanza.content[0].content);
            });
          f = await c(b, f, k, h, e, "function" != typeof d ? d : void 0);
          n.length > 0 && (f.stanza.content[0].content = n);
          return f;
        };
      },
      31777: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canMarkPlayed = async function (e) {
          e instanceof f.MsgModel ||
            "string" == typeof e ||
            "function" != typeof e.toString ||
            (e = e.toString());
          e =
            e instanceof f.MsgModel
              ? e
              : await (0, h.getMessageById)(e.toString());
          return (0, k.canMarkPlayed)(e);
        };
        const f = b(14647),
          k = b(52757),
          h = b(17530);
      },
      10802: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canMute = function (k) {
          k = (0, f.assertWid)(k);
          return (0, f.assertGetChat)(k).mute.canMute();
        };
        const f = b(41687);
      },
      50271: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canReply = async function (e) {
          e instanceof f.MsgModel ||
            "string" == typeof e ||
            "function" != typeof e.toString ||
            (e = e.toString());
          e =
            e instanceof f.MsgModel
              ? e
              : await (0, h.getMessageById)(e.toString());
          return (0, k.canReplyMsg)(e);
        };
        const f = b(14647),
          k = b(52757),
          h = b(17530);
      },
      1260: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.clear = async function (h, e = !0) {
          h = (0, f.assertWid)(h);
          const d = (0, f.assertGetChat)(h);
          (0, k.sendClear)(d, e);
          let c = 200;
          d.promises.sendClear &&
            (c =
              (await d.promises.sendClear.catch(() => ({ status: 500 })))
                .status || c);
          return { wid: h, status: c, keepStarred: e };
        };
        const f = b(41687),
          k = b(52757);
      },
      99459: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.closeChat = async function () {
          const h = (0, k.getActiveChat)();
          return !!h && (f.Cmd.closeChat(h), !0);
        };
        const f = b(14647),
          k = b(97829);
      },
      84378: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.delete = async function (h) {
          h = (0, f.assertWid)(h);
          const e = (0, f.assertGetChat)(h);
          (0, k.sendDelete)(e);
          let d = 200;
          e.promises.sendDelete &&
            (d =
              (await e.promises.sendDelete.catch(() => ({ status: 500 })))
                .status || d);
          return { wid: h, status: d };
        };
        const f = b(41687),
          k = b(52757);
      },
      74931: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.deleteMessage = async function (g, m, n = !1, p = !1) {
          const r = (0, k.assertGetChat)(g);
          let t = !1;
          Array.isArray(m) || ((t = !0), (m = [m]));
          var v = await (0, c.getMessageById)(m);
          m = [];
          for (const B of v) {
            v = d.SendMsgResult.ERROR_UNKNOWN;
            let F = !1,
              L = !1;
            const J = B.senderObj.isMe;
            var x = !1;
            r.isGroup && (x = await (0, h.iAmAdmin)(g));
            x = J || x;
            B.type === d.MSG_TYPE.REVOKED && p
              ? ((v = d.SendMsgResult.ERROR_UNKNOWN), (F = !0))
              : p && x
              ? ("list" === B.type && (B.__x_isUserCreatedType = !0),
                (0, f.compare)(self.Debug.VERSION, "2.3000.0", ">=")
                  ? await e.Cmd.sendRevokeMsgs(
                      r,
                      { type: "message", list: [B] },
                      { clearMedia: n }
                    )
                  : await e.Cmd.sendRevokeMsgs(r, [B], { clearMedia: n }),
                (v = d.SendMsgResult.OK),
                (F = !0))
              : ((0, f.compare)(self.Debug.VERSION, "2.3000.0", ">=")
                  ? await e.Cmd.sendDeleteMsgs(
                      r,
                      { type: "message", list: [B] },
                      n
                    )
                  : await e.Cmd.sendDeleteMsgs(r, [B], { clearMedia: n }),
                (v = d.SendMsgResult.OK),
                (L = !r.msgs.get(B.id)));
            m.push({
              id: B.id.toString(),
              sendMsgResult: v,
              isRevoked: F,
              isDeleted: L,
              isSentByMe: J,
            });
          }
          return t ? m[0] : m;
        };
        const f = b(38385),
          k = b(41687),
          h = b(64456),
          e = b(14647),
          d = b(20514),
          c = b(97829);
      },
      48157: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.downloadMedia = async function c(d) {
          var g;
          const m = await (0, h.getMessageById)(d);
          if (!m.mediaData)
            throw new f.WPPError(
              "message_not_contains_media",
              `Message ${d} not contains media`,
              { id: d }
            );
          await m.downloadMedia({
            downloadEvenIfExpensive: !0,
            rmrReason: 1,
            isUserInitiated: !0,
          });
          let n = null;
          m.mediaData.filehash &&
            (n = k.MediaBlobCache.get(m.mediaData.filehash));
          !n &&
            m.mediaData.mediaBlob &&
            (n = m.mediaData.mediaBlob.forceToBlob());
          if (
            !n &&
            "VIDEO" ===
              (null === (g = m.mediaObject) || void 0 === g ? void 0 : g.type)
          )
            try {
              return (
                (m.type = "document"),
                (m.mediaObject.type = "DOCUMENT"),
                await c(d)
              );
            } finally {
              (m.type = "video"), (m.mediaObject.type = "VIDEO");
            }
          if (!n)
            throw {
              error: !0,
              code: "media_not_found",
              message: "Media not found",
            };
          return n;
        };
        const f = b(62857),
          k = b(14647),
          h = b(97829);
      },
      35090: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.editMessage = async function (d, c, g = {}) {
          var m;
          g = Object.assign(Object.assign({}, h.defaultSendMessageOptions), g);
          d = await (0, e.getMessageById)(d);
          const n = (0, k.canEditMsg)(d),
            p = (0, k.canEditCaption)(d);
          if (!n && !p)
            throw new f.WPPError(
              "edit_message_error",
              "Cannot edit this message"
            );
          c = {
            type: "protocol",
            subtype: "message_edit",
            protocolMessageKey: d.id,
            body: c.trim(),
            caption: c.trim(),
            editMsgType: d.type,
          };
          return (
            (c = await (0, e.prepareRawMessage)(d.chat, c, g)),
            (c.latestEditMsgKey = c.id),
            (c.latestEditSenderTimestampMs = c.t),
            await (0, e.sendRawMessage)(
              null === (m = d.chat) || void 0 === m ? void 0 : m.id,
              c,
              g
            )
          );
        };
        const f = b(62857),
          k = b(52757),
          h = b(74023),
          e = b(97829);
      },
      36618: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.find = async function (e) {
          e = (0, f.assertWid)(e);
          e = await (0, h.findChat)(e);
          e.isGroup && (await k.GroupMetadataStore.find(e.id));
          return e;
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757);
      },
      74997: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.forwardMessage = async function (e, d, c = {}) {
          e = await (0, f.assertFindChat)(e);
          d = await (0, h.getMessageById)(d);
          return await (0, k.forwardMessagesToChats)(
            [d],
            [e],
            c.displayCaptionText
          );
        };
        const f = b(41687),
          k = b(52757),
          h = b(74023);
      },
      78626: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.generateMessageID = async function (e) {
          const d = k.UserPrefs.getMaybeMeUser();
          e =
            e instanceof k.Wid
              ? e
              : e instanceof k.ChatModel
              ? e.id
              : (0, f.assertWid)(e);
          let c;
          e.isGroup() && (c = k.WidFactory.toUserWid(d));
          return new k.MsgKey({
            from: d,
            to: e,
            id: await Promise.resolve((0, h.randomMessageId)()),
            participant: c,
            selfDir: "out",
          });
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757);
      },
      63829: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = function (h) {
          h = (0, f.assertWid)(h);
          return "newsletter" === h.server
            ? k.NewsletterStore.get(h)
            : k.ChatStore.get(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      11513: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getActiveChat = function () {
          return f.ChatStore.findFirst((k) => k.active);
        };
        const f = b(14647);
      },
      73546: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getLastSeen = async function (h) {
          h = (0, f.assertWid)(h);
          h = await k.ChatStore.get(h);
          if (!h) return !1;
          h.presence.hasData ||
            (await h.presence.subscribe(),
            await new Promise((e) => setTimeout(e, 100)));
          return h.presence.chatstate.t || !1;
        };
        const f = b(41687),
          k = b(14647);
      },
      17181: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMessageACK = async function (h) {
          h = await (0, k.getMessageById)(h);
          const e = await f.MsgInfoStore.find(h.id),
            d = new Map(),
            c = (g, m) => {
              const n = g.id.toString(),
                p = d.get(n) || { id: n, wid: g.id };
              p[m] = g.t;
              d.set(n, p);
            };
          return (
            null == e || e.delivery.forEach((g) => c(g, "deliveredAt")),
            null == e || e.read.forEach((g) => c(g, "readAt")),
            null == e || e.played.forEach((g) => c(g, "playedAt")),
            {
              ack: h.ack,
              fromMe: h.id.fromMe,
              deliveryRemaining:
                (null == e ? void 0 : e.deliveryRemaining) || 0,
              readRemaining: (null == e ? void 0 : e.readRemaining) || 0,
              playedRemaining: (null == e ? void 0 : e.playedRemaining) || 0,
              participants: Array.from(d.values()),
            }
          );
        };
        const f = b(14647),
          k = b(74023);
      },
      17530: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (c) {
            return c && c.__esModule ? c : { default: c };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMessageById = async function (c) {
          var g, m, n, p;
          let r = !1;
          Array.isArray(c) || ((r = !0), (c = [c]));
          var t = c.map((x) => h.MsgKey.fromString(x.toString()));
          c = [];
          for (const x of t) {
            t = h.MsgStore.get(x);
            var v =
              "function" ==
              typeof (null === (g = x.remote) || void 0 === g
                ? void 0
                : g.isStatusV3)
                ? null === (m = x.remote) || void 0 === m
                  ? void 0
                  : m.isStatusV3()
                : null ===
                    (p =
                      null === (n = x.remote) || void 0 === n
                        ? void 0
                        : n.toString()) || void 0 === p
                ? void 0
                : p.includes("status@broadcast");
            t ||
              (v
                ? (t = h.StatusV3Store.getMyStatus().msgs.get(x))
                : ((v = (0, f.assertGetChat)(x.remote)),
                  ((t = v.msgs.get(x)), t) ||
                    (d(`searching remote message with id ${x.toString()}`),
                    (t = (0, e.getSearchContext)(v, x)),
                    await t.collection.loadAroundPromise,
                    (t = v.msgs.get(x) || t.collection.get(x)))));
            if (!t)
              throw (
                (d(`message id ${x.toString()} not found`),
                new k.WPPError(
                  "msg_not_found",
                  `Message ${x.toString()} not found`,
                  { id: x.toString() }
                ))
              );
            c.push(t);
          }
          return ((c = c.map((x) =>
            x instanceof h.MsgModel ? x : h.MsgStore.get(x) || new h.MsgModel(x)
          )),
          r)
            ? c[0]
            : c;
        };
        a = l(b(17833));
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(52757),
          d = (0, a.default)("WA-JS:message:getMessageById");
      },
      48769: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMessages = async function (d, c = {}) {
          var g;
          const m = (0, f.assertGetChat)(d);
          var n = c.count || 20,
            p = "after" === c.direction ? "after" : "before";
          d =
            c.id ||
            (null === (g = m.lastReceivedKey) || void 0 === g
              ? void 0
              : g.toString());
          if (c.onlyUnread) {
            if (!m.hasUnread) return [];
            g = m.unreadCount < 0 ? 2 : m.unreadCount;
            n = n < 0 ? g : Math.min(n, g);
          }
          -1 === n && (0, k.isMultiDevice)() && (n = 1 / 0);
          !c.id && d && n--;
          g = d ? h.MsgKey.fromString(d) : { remote: m.id };
          g.count = n;
          g.direction = p;
          n = [];
          if ("all" === c.media) {
            var { messages: r } = await (0, e.msgFindQuery)("media", g);
            n = r;
          } else if ("image" === c.media) {
            ({ messages: p } = await (0, e.msgFindQuery)("media", g));
            for (r of p) "image" === r.type && n.push(r);
          } else
            void 0 !== c.media
              ? ((g.media = c.media),
                (n = await (0, e.msgFindQuery)("media", g)))
              : (n = await (0, e.msgFindQuery)(p, g));
          !c.id && d && (d = h.MsgStore.get(d)) && n.push(d.attributes);
          return (
            (n = n.map(
              (t) => (
                (null == c ? void 0 : c.onlyUnread) && (t.isNewMsg = !0),
                t instanceof h.MsgModel
                  ? t
                  : h.MsgStore.get(t) || new h.MsgModel(t)
              )
            )),
            n
          );
        };
        const f = b(41687),
          k = b(72927),
          h = b(14647),
          e = b(52757);
      },
      91520: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getNotes = async function (d) {
          const c = (0, f.assertGetChat)(d);
          if (!(0, k.isBusiness)())
            throw new h.WPPError(
              "connected_device_not_is_business",
              "Connected device not is business account"
            );
          if (c.isGroup)
            throw new h.WPPError(
              "can_not_get_notes_for_groups",
              `You can not get notes for groups. ChatId: ${d}`
            );
          return await (0, e.retrieveOnlyNoteForChatJid)(c.id.toJid());
        };
        const f = b(41687),
          k = b(5882),
          h = b(62857),
          e = b(33505);
      },
      55595: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getPlatformFromMessage = function (k) {
          k instanceof f.MsgModel ||
            "string" == typeof k ||
            "function" != typeof k.toString ||
            (k = k.toString());
          k instanceof f.MsgModel && (k = k.id);
          k = f.MsgKey.fromString(k.toString());
          return k.id.length > 21
            ? "android"
            : k.id.startsWith("3A")
            ? "iphone"
            : k.id.startsWith("3EB0")
            ? "web"
            : "unknown";
        };
        const f = b(14647);
      },
      38636: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getQuotedMsg = async function (e) {
          const d = await (0, k.getMessageById)(e);
          if (!d.quotedStanzaID)
            throw new f.WPPError(
              "message_not_have_a_reply",
              `Message ${e} does not have a reply`,
              { id: e }
            );
          e = (0, h.getQuotedMsgKey)(d);
          return await (0, k.getMessageById)(e);
        };
        const f = b(62857),
          k = b(17530),
          h = b(95885);
      },
      95885: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getQuotedMsgKey = function (e) {
          var d;
          if (!e.quotedStanzaID)
            throw new k.WPPError(
              "message_not_have_a_reply",
              `Message ${e.id} does not have a reply`,
              { id: e.id }
            );
          const c = e.quotedRemoteJid ? e.quotedRemoteJid : e.id.remote,
            g =
              (null === (d = (0, f.getMyUserId)()) || void 0 === d
                ? void 0
                : d.equals(e.quotedParticipant)) || !1;
          d =
            "function" == typeof h.Wid.isStatusV3
              ? h.Wid.isStatusV3(c)
              : h.Wid.isStatus(c);
          return new h.MsgKey({
            id: e.quotedStanzaID,
            fromMe: g,
            remote: c,
            participant:
              h.Wid.isGroup(e.from) || h.Wid.isGroup(e.to) || d
                ? e.quotedParticipant
                : void 0,
          });
        };
        const f = b(72927),
          k = b(62857),
          h = b(14647);
      },
      20565: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getReactions = async function (h) {
          h = await (0, k.getReactions)(h);
          const e = [];
          for (const d of h.reactions) {
            const c = {
              aggregateEmoji: d.aggregateEmoji,
              hasReactionByMe: d.hasReactionByMe,
              senders: [],
            };
            for (const g of d.senders)
              c.senders.push({
                id: g.msgKey,
                msgId: g.parentMsgKey,
                reactionText: g.reactionText,
                read: g.read,
                sender: (0, f.createWid)(g.senderUserJid),
                orphan: g.orphan,
                timestamp: g.timestamp,
              });
            e.push(c);
          }
          return {
            reactionByMe: h.reactionByMe
              ? {
                  id: h.reactionByMe.msgKey,
                  orphan: h.reactionByMe.orphan,
                  msgId: h.reactionByMe.parentMsgKey,
                  reactionText: h.reactionByMe.reactionText,
                  read: h.reactionByMe.read,
                  senderUserJid: (0, f.createWid)(h.reactionByMe.senderUserJid),
                  timestamp: h.reactionByMe.timestamp,
                }
              : void 0,
            reactions: e,
          };
        };
        const f = b(62857),
          k = b(52757);
      },
      39128: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getVotes = async function (d) {
          var c = k.MsgKey.fromString(d.toString());
          d = await (0, e.getMessageById)(c);
          if ("poll_creation" != d.type)
            throw new f.WPPError(
              "msg_not_found",
              `Message ${c.toString()} not a poll`,
              { id: c.toString() }
            );
          var g = await (0, h.getVotes)([c]);
          c = { msgId: c, chatId: c.remote, votes: [] };
          for (const m of g) {
            g = {
              selectedOptions: [],
              timestamp: m.senderTimestampMs,
              sender: m.sender,
            };
            for (const n of m.selectedOptionLocalIds)
              g.selectedOptions[n] = d.pollOptions.filter(
                (p) => p.localId == n
              )[0];
            c.votes.push(g);
          }
          return c;
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757),
          e = b(17530);
      },
      97829: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendFileMessage =
          a.sendEventMessage =
          a.sendCreatePollMessage =
          a.sendChargeMessage =
          a.requestPhoneNumber =
          a.prepareRawMessage =
          a.prepareMessageButtons =
          a.prepareLinkPreview =
          a.unpinMsg =
          a.pinMsg =
          a.unpin =
          a.pin =
          a.openChatFromUnread =
          a.openChatBottom =
          a.openChatAt =
          a.mute =
          a.markPlayed =
          a.markIsUnread =
          a.markIsRecording =
          a.markIsRead =
          a.markIsPaused =
          a.markIsComposing =
          a.list =
          a.keepMessage =
          a.getVotes =
          a.getReactions =
          a.getQuotedMsgKey =
          a.getQuotedMsg =
          a.getPlatformFromMessage =
          a.getNotes =
          a.getMessages =
          a.getMessageById =
          a.getMessageACK =
          a.getLastSeen =
          a.getActiveChat =
          a.get =
          a.generateMessageID =
          a.forwardMessage =
          a.find =
          a.editMessage =
          a.downloadMedia =
          a.deleteMessage =
          a.delete =
          a.closeChat =
          a.clear =
          a.canReply =
          a.canMute =
          a.canMarkPlayed =
          a.unarchive =
          a.archive =
            void 0;
        a.unmute =
          a.starMessage =
          a.setNotes =
          a.setInputText =
          a.setChatList =
          a.sendVCardContactMessage =
          a.sendTextMessage =
          a.sendScheduledCallMessage =
          a.sendReactionToMessage =
          a.sendRawMessage =
          a.sendPixKeyMessage =
          a.sendLocationMessage =
          a.sendListMessage =
          a.sendGroupInviteMessage =
            void 0;
        var f = b(95071);
        Object.defineProperty(a, "archive", {
          enumerable: !0,
          get: function () {
            return f.archive;
          },
        });
        Object.defineProperty(a, "unarchive", {
          enumerable: !0,
          get: function () {
            return f.unarchive;
          },
        });
        var k = b(31777);
        Object.defineProperty(a, "canMarkPlayed", {
          enumerable: !0,
          get: function () {
            return k.canMarkPlayed;
          },
        });
        var h = b(10802);
        Object.defineProperty(a, "canMute", {
          enumerable: !0,
          get: function () {
            return h.canMute;
          },
        });
        var e = b(50271);
        Object.defineProperty(a, "canReply", {
          enumerable: !0,
          get: function () {
            return e.canReply;
          },
        });
        var d = b(1260);
        Object.defineProperty(a, "clear", {
          enumerable: !0,
          get: function () {
            return d.clear;
          },
        });
        var c = b(99459);
        Object.defineProperty(a, "closeChat", {
          enumerable: !0,
          get: function () {
            return c.closeChat;
          },
        });
        var g = b(84378);
        Object.defineProperty(a, "delete", {
          enumerable: !0,
          get: function () {
            return g.delete;
          },
        });
        var m = b(74931);
        Object.defineProperty(a, "deleteMessage", {
          enumerable: !0,
          get: function () {
            return m.deleteMessage;
          },
        });
        var n = b(48157);
        Object.defineProperty(a, "downloadMedia", {
          enumerable: !0,
          get: function () {
            return n.downloadMedia;
          },
        });
        var p = b(35090);
        Object.defineProperty(a, "editMessage", {
          enumerable: !0,
          get: function () {
            return p.editMessage;
          },
        });
        var r = b(36618);
        Object.defineProperty(a, "find", {
          enumerable: !0,
          get: function () {
            return r.find;
          },
        });
        var t = b(74997);
        Object.defineProperty(a, "forwardMessage", {
          enumerable: !0,
          get: function () {
            return t.forwardMessage;
          },
        });
        var v = b(78626);
        Object.defineProperty(a, "generateMessageID", {
          enumerable: !0,
          get: function () {
            return v.generateMessageID;
          },
        });
        var x = b(63829);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return x.get;
          },
        });
        var B = b(11513);
        Object.defineProperty(a, "getActiveChat", {
          enumerable: !0,
          get: function () {
            return B.getActiveChat;
          },
        });
        var F = b(73546);
        Object.defineProperty(a, "getLastSeen", {
          enumerable: !0,
          get: function () {
            return F.getLastSeen;
          },
        });
        var L = b(17181);
        Object.defineProperty(a, "getMessageACK", {
          enumerable: !0,
          get: function () {
            return L.getMessageACK;
          },
        });
        var J = b(17530);
        Object.defineProperty(a, "getMessageById", {
          enumerable: !0,
          get: function () {
            return J.getMessageById;
          },
        });
        var T = b(48769);
        Object.defineProperty(a, "getMessages", {
          enumerable: !0,
          get: function () {
            return T.getMessages;
          },
        });
        var V = b(91520);
        Object.defineProperty(a, "getNotes", {
          enumerable: !0,
          get: function () {
            return V.getNotes;
          },
        });
        var W = b(55595);
        Object.defineProperty(a, "getPlatformFromMessage", {
          enumerable: !0,
          get: function () {
            return W.getPlatformFromMessage;
          },
        });
        var R = b(38636);
        Object.defineProperty(a, "getQuotedMsg", {
          enumerable: !0,
          get: function () {
            return R.getQuotedMsg;
          },
        });
        var ba = b(95885);
        Object.defineProperty(a, "getQuotedMsgKey", {
          enumerable: !0,
          get: function () {
            return ba.getQuotedMsgKey;
          },
        });
        var Z = b(20565);
        Object.defineProperty(a, "getReactions", {
          enumerable: !0,
          get: function () {
            return Z.getReactions;
          },
        });
        var M = b(39128);
        Object.defineProperty(a, "getVotes", {
          enumerable: !0,
          get: function () {
            return M.getVotes;
          },
        });
        var K = b(33985);
        Object.defineProperty(a, "keepMessage", {
          enumerable: !0,
          get: function () {
            return K.keepMessage;
          },
        });
        var N = b(88241);
        Object.defineProperty(a, "list", {
          enumerable: !0,
          get: function () {
            return N.list;
          },
        });
        var P = b(28921);
        Object.defineProperty(a, "markIsComposing", {
          enumerable: !0,
          get: function () {
            return P.markIsComposing;
          },
        });
        var X = b(11598);
        Object.defineProperty(a, "markIsPaused", {
          enumerable: !0,
          get: function () {
            return X.markIsPaused;
          },
        });
        var y = b(59680);
        Object.defineProperty(a, "markIsRead", {
          enumerable: !0,
          get: function () {
            return y.markIsRead;
          },
        });
        var A = b(19345);
        Object.defineProperty(a, "markIsRecording", {
          enumerable: !0,
          get: function () {
            return A.markIsRecording;
          },
        });
        var D = b(93119);
        Object.defineProperty(a, "markIsUnread", {
          enumerable: !0,
          get: function () {
            return D.markIsUnread;
          },
        });
        var G = b(45351);
        Object.defineProperty(a, "markPlayed", {
          enumerable: !0,
          get: function () {
            return G.markPlayed;
          },
        });
        var I = b(27112);
        Object.defineProperty(a, "mute", {
          enumerable: !0,
          get: function () {
            return I.mute;
          },
        });
        var C = b(91082);
        Object.defineProperty(a, "openChatAt", {
          enumerable: !0,
          get: function () {
            return C.openChatAt;
          },
        });
        var H = b(74212);
        Object.defineProperty(a, "openChatBottom", {
          enumerable: !0,
          get: function () {
            return H.openChatBottom;
          },
        });
        var O = b(51464);
        Object.defineProperty(a, "openChatFromUnread", {
          enumerable: !0,
          get: function () {
            return O.openChatFromUnread;
          },
        });
        var q = b(61278);
        Object.defineProperty(a, "pin", {
          enumerable: !0,
          get: function () {
            return q.pin;
          },
        });
        Object.defineProperty(a, "unpin", {
          enumerable: !0,
          get: function () {
            return q.unpin;
          },
        });
        var u = b(6993);
        Object.defineProperty(a, "pinMsg", {
          enumerable: !0,
          get: function () {
            return u.pinMsg;
          },
        });
        Object.defineProperty(a, "unpinMsg", {
          enumerable: !0,
          get: function () {
            return u.unpinMsg;
          },
        });
        var w = b(15952);
        Object.defineProperty(a, "prepareLinkPreview", {
          enumerable: !0,
          get: function () {
            return w.prepareLinkPreview;
          },
        });
        var z = b(43394);
        Object.defineProperty(a, "prepareMessageButtons", {
          enumerable: !0,
          get: function () {
            return z.prepareMessageButtons;
          },
        });
        var E = b(19211);
        Object.defineProperty(a, "prepareRawMessage", {
          enumerable: !0,
          get: function () {
            return E.prepareRawMessage;
          },
        });
        var Q = b(58267);
        Object.defineProperty(a, "requestPhoneNumber", {
          enumerable: !0,
          get: function () {
            return Q.requestPhoneNumber;
          },
        });
        var U = b(82028);
        Object.defineProperty(a, "sendChargeMessage", {
          enumerable: !0,
          get: function () {
            return U.sendChargeMessage;
          },
        });
        var aa = b(68011);
        Object.defineProperty(a, "sendCreatePollMessage", {
          enumerable: !0,
          get: function () {
            return aa.sendCreatePollMessage;
          },
        });
        var da = b(35824);
        Object.defineProperty(a, "sendEventMessage", {
          enumerable: !0,
          get: function () {
            return da.sendEventMessage;
          },
        });
        var fa = b(24654);
        Object.defineProperty(a, "sendFileMessage", {
          enumerable: !0,
          get: function () {
            return fa.sendFileMessage;
          },
        });
        var ha = b(40954);
        Object.defineProperty(a, "sendGroupInviteMessage", {
          enumerable: !0,
          get: function () {
            return ha.sendGroupInviteMessage;
          },
        });
        var ja = b(35184);
        Object.defineProperty(a, "sendListMessage", {
          enumerable: !0,
          get: function () {
            return ja.sendListMessage;
          },
        });
        var ma = b(39453);
        Object.defineProperty(a, "sendLocationMessage", {
          enumerable: !0,
          get: function () {
            return ma.sendLocationMessage;
          },
        });
        var na = b(42992);
        Object.defineProperty(a, "sendPixKeyMessage", {
          enumerable: !0,
          get: function () {
            return na.sendPixKeyMessage;
          },
        });
        var ka = b(44190);
        Object.defineProperty(a, "sendRawMessage", {
          enumerable: !0,
          get: function () {
            return ka.sendRawMessage;
          },
        });
        var ia = b(92774);
        Object.defineProperty(a, "sendReactionToMessage", {
          enumerable: !0,
          get: function () {
            return ia.sendReactionToMessage;
          },
        });
        var oa = b(59633);
        Object.defineProperty(a, "sendScheduledCallMessage", {
          enumerable: !0,
          get: function () {
            return oa.sendScheduledCallMessage;
          },
        });
        var la = b(68533);
        Object.defineProperty(a, "sendTextMessage", {
          enumerable: !0,
          get: function () {
            return la.sendTextMessage;
          },
        });
        var pa = b(36356);
        Object.defineProperty(a, "sendVCardContactMessage", {
          enumerable: !0,
          get: function () {
            return pa.sendVCardContactMessage;
          },
        });
        var qa = b(43859);
        Object.defineProperty(a, "setChatList", {
          enumerable: !0,
          get: function () {
            return qa.setChatList;
          },
        });
        var ra = b(18194);
        Object.defineProperty(a, "setInputText", {
          enumerable: !0,
          get: function () {
            return ra.setInputText;
          },
        });
        var sa = b(31116);
        Object.defineProperty(a, "setNotes", {
          enumerable: !0,
          get: function () {
            return sa.setNotes;
          },
        });
        var ta = b(37126);
        Object.defineProperty(a, "starMessage", {
          enumerable: !0,
          get: function () {
            return ta.starMessage;
          },
        });
        var ua = b(35291);
        Object.defineProperty(a, "unmute", {
          enumerable: !0,
          get: function () {
            return ua.unmute;
          },
        });
      },
      33985: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.keepMessage = async function (c, g = !0) {
          const m = await (0, d.getMessageById)(c);
          if (await (0, f.iAmAdmin)(m.id.remote)) {
            if (m.isExpired())
              throw new k.WPPError("msg_expired", "This message has expired");
            return g
              ? (await (0, e.keepMessage)(m, h.KIC_ENTRY_POINT_TYPE.CHAT),
                await (0, d.getMessageById)(c))
              : (await (0, e.undoKeepMessage)(
                  m,
                  { deleteExpired: !0 },
                  h.KIC_ENTRY_POINT_TYPE.CHAT
                ),
                await (0, d.getMessageById)(c));
          }
          throw new k.WPPError(
            "you_not_group_admin",
            "You is not a group admin"
          );
        };
        const f = b(64456),
          k = b(62857),
          h = b(20514),
          e = b(52757),
          d = b(17530);
      },
      88241: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.list = async function (h = {}) {
          const e = null == h.count ? 1 / 0 : h.count;
          var d = "before" === h.direction ? "before" : "after";
          let c = h.onlyNewsletter
            ? f.NewsletterStore.getModelsArray().slice()
            : f.ChatStore.getModelsArray().slice();
          h.onlyUsers && (c = c.filter((g) => g.isUser));
          h.onlyGroups && (c = c.filter((g) => g.isGroup));
          h.onlyCommunities &&
            (c = c.filter((g) => {
              var m;
              return (
                g.isGroup &&
                "COMMUNITY" ===
                  (null === (m = g.groupMetadata) || void 0 === m
                    ? void 0
                    : m.groupType)
              );
            }));
          h.onlyWithUnreadMessage && (c = c.filter((g) => g.hasUnread));
          if (h.withLabels) {
            const g = h.withLabels.map((m) => {
              const n = f.LabelStore.findFirst((p) => p.name === m);
              return n ? n.id : m;
            });
            c = c.filter((m) => {
              var n;
              return null === (n = m.labels) || void 0 === n
                ? void 0
                : n.some((p) => g.includes(p));
            });
          }
          h = (h = (null == h ? 0 : h.id) ? (0, k.get)(h.id) : null)
            ? c.indexOf(h)
            : 0;
          "before" === d
            ? ((d = h - e < 0 ? 0 : h - e),
              (c = c.slice(d, d + e >= h ? h : d + e)))
            : (c = c.slice(h, h + e));
          for (const g of c)
            g.isGroup && (await f.GroupMetadataStore.find(g.id));
          return c;
        };
        const f = b(14647),
          k = b(63829);
      },
      28921: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markIsComposing = async function (e, d) {
          const c = (0, f.assertGetChat)(e);
          await c.presence.subscribe();
          await k.ChatPresence.markComposing(c);
          c.pausedTimerId &&
            (clearTimeout(c.pausedTimerId), c.unset("pausedTimerId"));
          d &&
            (await new Promise((g) => {
              c.pausedTimerId = setTimeout(() => {
                (0, h.markIsPaused)(e).then(g, g);
              }, d);
            }));
        };
        const f = b(41687),
          k = b(14647),
          h = b(97829);
      },
      11598: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markIsPaused = async function (h) {
          h = (0, f.assertGetChat)(h);
          await h.presence.subscribe();
          await k.ChatPresence.markPaused(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      59680: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markIsRead = async function (h) {
          h = (0, f.assertGetChat)(h);
          const e = h.unreadCount;
          return await (0, k.sendSeen)(h, !1), { wid: h.id, unreadCount: e };
        };
        const f = b(41687),
          k = b(52757);
      },
      19345: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markIsRecording = async function (e, d) {
          const c = (0, f.assertGetChat)(e);
          await c.presence.subscribe();
          await k.ChatPresence.markRecording(c);
          d &&
            (await new Promise((g) => {
              c.pausedTimerId = setTimeout(() => {
                (0, h.markIsPaused)(e).then(g, g);
              }, d);
            }));
        };
        const f = b(41687),
          k = b(14647),
          h = b(97829);
      },
      93119: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markIsUnread = async function (h) {
          h = (0, f.assertGetChat)(h);
          return await (0, k.markUnread)(h, !0), { wid: h.id };
        };
        const f = b(41687),
          k = b(52757);
      },
      45351: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markPlayed = async function (e) {
          e instanceof f.MsgModel ||
            "string" == typeof e ||
            "function" != typeof e.toString ||
            (e = e.toString());
          const d =
            e instanceof f.MsgModel
              ? e
              : await (0, h.getMessageById)(e.toString());
          return (
            await (0, k.markPlayed)(d),
            await (0, h.getMessageById)(e.toString())
          );
        };
        const f = b(14647),
          k = b(52757),
          h = b(17530);
      },
      27112: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.mute = async function (e, d) {
          e = (0, f.assertWid)(e);
          const c = (0, f.assertGetChat)(e);
          let g;
          if ("expiration" in d)
            g =
              "number" == typeof d.expiration
                ? d.expiration
                : d.expiration.getTime() / 1e3;
          else {
            if (!("duration" in d))
              throw new k.WPPError(
                "invalid_time_mute",
                "Invalid time for mute",
                { time: d }
              );
            g = (0, h.unixTime)() + d.duration;
          }
          if (g < (0, h.unixTime)())
            throw new k.WPPError(
              "negative_time_mute",
              "Negative duration for mute",
              { time: d }
            );
          return (
            await c.mute.mute({
              expiration: g,
              isAutoMuted: !1,
              sendDevice: !0,
            }),
            {
              wid: e,
              expiration: c.mute.expiration,
              isMuted: 0 !== c.mute.expiration,
            }
          );
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757);
      },
      91082: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.openChatAt = async function (d, c) {
          d = (0, f.assertWid)(d);
          d = await (0, f.assertFindChat)(d);
          c = await (0, e.getMessageById)(c);
          c = (0, h.getSearchContext)(d, c);
          return await k.Cmd.openChatAt(d, c);
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757),
          e = b(97829);
      },
      74212: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.openChatBottom = async function (h) {
          h = (0, f.assertWid)(h);
          h = await (0, f.assertFindChat)(h);
          return await k.Cmd.openChatBottom(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      51464: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.openChatFromUnread = async function (h) {
          h = (0, f.assertWid)(h);
          h = await (0, f.assertFindChat)(h);
          return await k.Cmd.openChatFromUnread(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      61278: (l, a, b) => {
        async function f(d, c = !0) {
          d = (0, k.assertWid)(d);
          const g = (0, k.assertGetChat)(d);
          if (g.pin === c)
            throw new h.WPPError(
              (c ? "pin" : "unpin") + "_error",
              `The chat ${d.toString()} is already ${
                c ? "pinned" : "unpinned"
              }`,
              { wid: d, pin: c }
            );
          return await (0, e.setPin)(g, c), { wid: d, pin: c };
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.pin = f;
        a.unpin = async function (d) {
          return f(d, !1);
        };
        const k = b(41687),
          h = b(62857),
          e = b(52757);
      },
      6993: (l, a, b) => {
        async function f(m, n = !0, p = 604800) {
          var r, t, v, x, B;
          const F = await (0, g.getMessageById)(m),
            L = (0, k.assertGetChat)(F.id.remote),
            J = e.PinInChatStore.getByParentMsgKey(F.id);
          if (L.isNewsletter)
            throw new h.WPPError(
              (n ? "pin" : "unpin") + "_error",
              `The msg ${m.toString()} was not pinned. Not can pin in Newsletter`,
              { msgId: m, pin: n }
            );
          if (
            L.isGroup &&
            (null ===
              (t =
                null === (r = L.groupMetadata) || void 0 === r
                  ? void 0
                  : r.participants) ||
              void 0 === t ||
              !t.iAmMember())
          )
            throw new h.WPPError(
              (n ? "pin" : "unpin") + "_error",
              `You not a member of group, to pin msg ${m.toString()}`,
              { msgId: m, pin: n }
            );
          if (
            L.isGroup &&
            ((null === (v = L.groupMetadata) || void 0 === v
              ? 0
              : v.restrict) ||
              (null === (x = L.groupMetadata) || void 0 === x
                ? 0
                : x.announce)) &&
            (null === (B = L.groupMetadata) ||
              void 0 === B ||
              !B.participants.iAmAdmin())
          )
            throw new h.WPPError(
              (n ? "pin" : "unpin") + "_error",
              `You not have permission to pin msg ${m.toString()}`,
              { msgId: m, pin: n }
            );
          if (
            F.isNotification ||
            F.isViewOnce ||
            F.type === d.MSG_TYPE.REVOKED ||
            ((null == F ? void 0 : F.ack) || 0) < d.ACK.SENT
          )
            throw new h.WPPError(
              (n ? "pin" : "unpin") + "_error",
              `The msg ${m.toString()} not can be pinned`,
              { msgId: m, pin: n }
            );
          if (J && J.pinType === (n ? d.PIN_STATE.PIN : d.PIN_STATE.UNPIN))
            throw new h.WPPError(
              (n ? "pin" : "unpin") + "_error",
              `The msg ${m.toString()} is already ${n ? "pinned" : "unpinned"}`,
              { msgId: m, pin: n }
            );
          m = await (0, c.sendPinInChatMsg)(
            F,
            1 == n ? d.PIN_STATE.PIN : d.PIN_STATE.UNPIN,
            n ? p : void 0
          );
          return {
            message: F,
            pinned: m.messageSendResult === d.SendMsgResult.OK ? n : !n,
            result: m.messageSendResult,
          };
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.pinMsg = f;
        a.unpinMsg = async function (m) {
          return f(m, !1);
        };
        const k = b(41687),
          h = b(62857),
          e = b(14647),
          d = b(20514),
          c = b(52757),
          g = b(17530);
      },
      72185: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (k) {
            return k && k.__esModule ? k : { default: k };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareAudioWaveform = async function (k, h) {
          if (k.isPtt && k.waveform)
            try {
              var e = await h.arrayBuffer();
              const d = await new AudioContext().decodeAudioData(e),
                c = d.getChannelData(0),
                g = Math.floor(c.length / 64);
              k = [];
              for (h = 0; h < 64; h++) {
                e = g * h;
                let r = 0;
                for (let t = 0; t < g; t++) r += Math.abs(c[e + t]);
                k.push(r / g);
              }
              const m = Math.pow(Math.max(...k), -1),
                n = k.map((r) => r * m),
                p = new Uint8Array(n.map((r) => Math.floor(100 * r)));
              return { duration: Math.floor(d.duration), waveform: p };
            } catch (d) {
              f("Failed to generate waveform", d);
            }
        };
        const f = (0, l(b(17833)).default)("WA-JS:chat:sendFileMessage");
      },
      15952: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        var h =
          (this && this.__rest) ||
          function (g, m) {
            var n = {},
              p;
            for (p in g)
              Object.prototype.hasOwnProperty.call(g, p) &&
                m.indexOf(p) < 0 &&
                (n[p] = g[p]);
            if (
              null != g &&
              "function" == typeof Object.getOwnPropertySymbols
            ) {
              var r = 0;
              for (p = Object.getOwnPropertySymbols(g); r < p.length; r++)
                m.indexOf(p[r]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(g, p[r]) &&
                  (n[p[r]] = g[p[r]]);
            }
            return n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareLinkPreview = async function (g, m) {
          if (!m.linkPreview) return g;
          if (m.linkPreview) {
            const n = "object" == typeof m.linkPreview ? m.linkPreview : {},
              p = "chat" === g.type ? g.body : "";
            if (p)
              try {
                const r = (0, c.findFirstWebLink)(p);
                if (r) {
                  const t = await (0, c.fetchLinkPreview)(r);
                  (null == t ? 0 : t.data) &&
                    (m.linkPreview = Object.assign(
                      Object.assign({}, t.data),
                      n
                    ));
                }
              } catch (r) {}
          }
          "object" == typeof m.linkPreview &&
            ((g.subtype = "url"),
            (g = Object.assign(Object.assign({}, g), m.linkPreview)));
          return g;
        };
        const e = b(73113);
        a = l(b(1132));
        const d = b(54993),
          c = b(52757);
        a.onFullReady(() => {
          (0, d.wrapModuleFunction)(c.getABPropConfigValue, (g, ...m) => {
            const [n] = m;
            return "link_preview_wait_time" === n ? 7 : g(...m);
          });
          (0, d.wrapModuleFunction)(
            c.genMinimalLinkPreview,
            async (g, ...m) => {
              const [n] = m,
                p = "string" == typeof n ? n : n.url;
              return new Promise(async (r) => {
                try {
                  var t = await (0, e.fetchRemoteLinkPreviewData)(p);
                  if (!t) throw Error(`preview not found for ${p}`);
                  const { imageUrl: v } = t,
                    x = h(t, ["imageUrl"]);
                  t = {};
                  v &&
                    (t = await (0, e.generateThumbnailLinkPreviewData)(v).catch(
                      () => null
                    ));
                  r({ url: p, data: Object.assign(Object.assign({}, x), t) });
                } catch (v) {
                  r(await g(...m));
                }
              });
            }
          );
        });
      },
      43394: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (n, p, r, t) {
                  void 0 === t && (t = r);
                  var v = Object.getOwnPropertyDescriptor(p, r);
                  (v &&
                    ("get" in v
                      ? p.__esModule
                      : !v.writable && !v.configurable)) ||
                    (v = {
                      enumerable: !0,
                      get: function () {
                        return p[r];
                      },
                    });
                  Object.defineProperty(n, t, v);
                }
              : function (n, p, r, t) {
                  void 0 === t && (t = r);
                  n[t] = p[r];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (n, p) {
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: p,
                  });
                }
              : function (n, p) {
                  n.default = p;
                });
        l =
          (this && this.__importStar) ||
          function (n) {
            if (n && n.__esModule) return n;
            var p = {};
            if (null != n)
              for (var r in n)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(n, r) &&
                  f(p, n, r);
            return k(p, n), p;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareMessageButtons = function (n, p) {
          if (!p.buttons) return n;
          if (!Array.isArray(p.buttons))
            throw new h.WPPError(
              "buttons_not_a_array",
              "Buttons options is not a array"
            );
          if ("chat" !== n.type && p.buttons.length > 2)
            throw new h.WPPError(
              "not_alowed_more_then_three_buttons",
              "Not allowed more then three buttons in file messages"
            );
          if (0 === p.buttons.length || p.buttons.length > 3)
            throw new h.WPPError(
              "buttons_must_between_1_and_3_options",
              "Buttons options must have between 1 and 3 options"
            );
          if (
            p.buttons.find((r) => r.phoneNumber || r.url) &&
            p.buttons.find((r) => r.id && r.text)
          )
            throw new h.WPPError(
              "reply_and_cta_btn_not_allowed",
              "It is not possible to send reply buttons and action buttons togetherButtons options must have between 1 and 3 options"
            );
          return (
            (n.title = p.title),
            (n.footer = p.footer),
            (n.interactiveMessage = {
              header: { title: p.title || " ", hasMediaAttachment: !1 },
              body: { text: n.body || n.caption || " " },
              footer: { text: p.footer || " " },
              nativeFlowMessage: {
                buttons: p.buttons.map((r, t) =>
                  "phoneNumber" in r
                    ? {
                        name: "cta_call",
                        buttonParamsJson: JSON.stringify({
                          display_text: r.text,
                          phone_number: r.phoneNumber,
                        }),
                      }
                    : "url" in r
                    ? {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                          display_text: r.text,
                          url: r.url,
                          merchant_url: r.url,
                        }),
                      }
                    : "code" in r
                    ? {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                          display_text: r.text,
                          copy_code: r.code,
                        }),
                      }
                    : "raw" in r
                    ? r.raw
                    : {
                        name: "quick_reply",
                        buttonParamsJson: JSON.stringify({
                          display_text: r.text,
                          id: r.id || `${t}`,
                        }),
                      }
                ),
              },
            }),
            (n.isFromTemplate = !0),
            (n.buttons = new e.TemplateButtonCollection()),
            (n.hydratedButtons = p.buttons.map((r, t) =>
              "phoneNumber" in r
                ? {
                    index: t,
                    callButton: {
                      displayText: r.text,
                      phoneNumber: r.phoneNumber,
                    },
                  }
                : "url" in r
                ? { index: t, urlButton: { displayText: r.text, url: r.url } }
                : "code" in r
                ? {
                    index: t,
                    urlButton: {
                      displayText: r.text,
                      url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${r.code}`,
                    },
                  }
                : {
                    index: t,
                    quickReplyButton: {
                      displayText: r.text,
                      id: r.id || `${t}`,
                    },
                  }
            )),
            n.buttons.add(
              n.hydratedButtons.map((r, t) => {
                var v, x, B, F;
                t = `${null != r.index ? r.index : t}`;
                return r.urlButton
                  ? new e.TemplateButtonModel({
                      id: t,
                      displayText:
                        null === (v = r.urlButton) || void 0 === v
                          ? void 0
                          : v.displayText,
                      url:
                        null === (x = r.urlButton) || void 0 === x
                          ? void 0
                          : x.url,
                      subtype: "url",
                    })
                  : r.callButton
                  ? new e.TemplateButtonModel({
                      id: t,
                      displayText: r.callButton.displayText,
                      phoneNumber: r.callButton.phoneNumber,
                      subtype: "call",
                    })
                  : new e.TemplateButtonModel({
                      id: t,
                      displayText:
                        null === (B = r.quickReplyButton) || void 0 === B
                          ? void 0
                          : B.displayText,
                      selectionId:
                        null === (F = r.quickReplyButton) || void 0 === F
                          ? void 0
                          : F.id,
                      subtype: "quick_reply",
                    });
              })
            ),
            n
          );
        };
        const h = b(62857);
        a = l(b(1132));
        const e = b(14647),
          d = b(19198),
          c = b(54993),
          g = b(52757),
          m = b(15035);
        a.onFullReady(() => {
          (0, c.wrapModuleFunction)(g.createMsgProtobuf, (n, ...p) => {
            var r, t, v, x;
            const [B] = p;
            n = n(...p);
            if (
              void 0 !==
              (null ===
                (t =
                  null === (r = B.interactiveMessage) || void 0 === r
                    ? void 0
                    : r.nativeFlowMessage) || void 0 === t
                ? void 0
                : t.buttons)
            ) {
              r = [
                "documentMessage",
                "documentWithCaptionMessage",
                "imageMessage",
                "locationMessage",
                "videoMessage",
              ];
              for (let F of r)
                if (F in n) {
                  r = F;
                  "documentWithCaptionMessage" === F && (F = "documentMessage");
                  B.interactiveMessage.header = Object.assign(
                    Object.assign({}, B.interactiveMessage.header),
                    {
                      [`${F}`]:
                        (null ===
                          (x =
                            null === (v = n[r]) || void 0 === v
                              ? void 0
                              : v.message) || void 0 === x
                          ? void 0
                          : x.documentMessage) || n[r],
                      hasMediaAttachment: !0,
                    }
                  );
                  delete n[r];
                  break;
                }
              void 0 !== n.extendedTextMessage && delete n.extendedTextMessage;
              void 0 !== n.conversation && delete n.conversation;
              n.viewOnceMessage = {
                message: { interactiveMessage: B.interactiveMessage },
              };
            }
            return n;
          });
          (0, c.wrapModuleFunction)(g.encodeMaybeMediaType, (n, ...p) => {
            const [r] = p;
            return "button" === r ? d.DROP_ATTR : n(...p);
          });
          (0, c.wrapModuleFunction)(g.mediaTypeFromProtobuf, (n, ...p) => {
            var r, t, v, x, B, F;
            const [L] = p;
            return (
              null ===
                (v =
                  null ===
                    (t =
                      null === (r = L.documentWithCaptionMessage) ||
                      void 0 === r
                        ? void 0
                        : r.message) || void 0 === t
                    ? void 0
                    : t.templateMessage) || void 0 === v
                ? 0
                : v.hydratedTemplate
            )
              ? n(
                  null ===
                    (F =
                      null ===
                        (B =
                          null === (x = L.documentWithCaptionMessage) ||
                          void 0 === x
                            ? void 0
                            : x.message) || void 0 === B
                        ? void 0
                        : B.templateMessage) || void 0 === F
                    ? void 0
                    : F.hydratedTemplate
                )
              : n(...p);
          });
          (0, c.wrapModuleFunction)(g.typeAttributeFromProtobuf, (n, ...p) => {
            var r, t, v, x, B, F, L, J, T, V;
            const [W] = p;
            if (
              null === (r = null == W ? void 0 : W.viewOnceMessage) ||
              void 0 === r
                ? 0
                : r.interactiveMessage
            ) {
              const R = Object.keys(
                null === (t = null == W ? void 0 : W.viewOnceMessage) ||
                  void 0 === t
                  ? void 0
                  : t.interactiveMessage
              );
              return [
                "documentMessage",
                "documentWithCaptionMessage",
                "imageMessage",
                "locationMessage",
                "videoMessage",
              ].some((ba) => R.includes(ba))
                ? "media"
                : "text";
            }
            if (
              null ===
                (B =
                  null ===
                    (x =
                      null ===
                        (v =
                          null == W ? void 0 : W.documentWithCaptionMessage) ||
                      void 0 === v
                        ? void 0
                        : v.message) || void 0 === x
                    ? void 0
                    : x.templateMessage) || void 0 === B
                ? 0
                : B.hydratedTemplate
            ) {
              const R = Object.keys(
                null ===
                  (J =
                    null ===
                      (L =
                        null ===
                          (F =
                            null == W
                              ? void 0
                              : W.documentWithCaptionMessage) || void 0 === F
                          ? void 0
                          : F.message) || void 0 === L
                      ? void 0
                      : L.templateMessage) || void 0 === J
                  ? void 0
                  : J.hydratedTemplate
              );
              return [
                "documentMessage",
                "imageMessage",
                "locationMessage",
                "videoMessage",
              ].some((ba) => R.includes(ba))
                ? "media"
                : "text";
            }
            return 1 ===
              (null === (T = null == W ? void 0 : W.buttonsMessage) ||
              void 0 === T
                ? void 0
                : T.headerType) ||
              2 ===
                (null === (V = null == W ? void 0 : W.buttonsMessage) ||
                void 0 === V
                  ? void 0
                  : V.headerType)
              ? "text"
              : n(...p);
          });
          (0, c.wrapModuleFunction)(
            g.createFanoutMsgStanza,
            async (n, ...p) => {
              var r, t;
              let v = null;
              const x = p[1].id ? p[2] : p[1];
              x.buttonsMessage
                ? (v = e.websocket.smax("buttons"))
                : x.listMessage &&
                  (v = e.websocket.smax("list", {
                    v: "2",
                    type: "product_list",
                  }));
              let B = await n(...p);
              if (
                ((null ===
                  (t =
                    null === (r = null == x ? void 0 : x.viewOnceMessage) ||
                    void 0 === r
                      ? void 0
                      : r.message) || void 0 === t
                  ? void 0
                  : t.interactiveMessage) &&
                  (B = await (0, m.encryptAndParserMsgButtons)(...p, n)),
                !v)
              )
                return B;
              p = B.content || B.stanza.content;
              (n = p.find((F) => "biz" === F.tag)) ||
                ((n = e.websocket.smax("biz", {}, null)), p.push(n));
              p = !1;
              return (
                Array.isArray(n.content)
                  ? (p = !!n.content.find(
                      (F) => F.tag === (null == v ? void 0 : v.tag)
                    ))
                  : (n.content = []),
                p || n.content.push(v),
                B
              );
            }
          );
          (0, c.wrapModuleFunction)(g.getABPropConfigValue, (n, ...p) => {
            const [r] = p;
            return "web_unwrap_message_for_stanza_attributes" !== r && n(...p);
          });
        });
      },
      19211: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareRawMessage = async function (n, p, r = {}) {
          var t, v, x;
          r = Object.assign(Object.assign({}, g.defaultSendMessageOptions), r);
          p = Object.assign(
            {
              t: (0, c.unixTime)(),
              from: e.UserPrefs.getMaybeMeUser(),
              to: n.id,
              self: "out",
              isNewMsg: !0,
              local: !0,
              ack: d.ACK.CLOCK,
            },
            p
          );
          r.delay &&
            ("chat" == p.type
              ? await (0, m.markIsComposing)(n.id)
              : (null == r ? void 0 : r.isPtt) &&
                (await (0, m.markIsRecording)(n.id)),
            await new Promise((F) => setTimeout(() => F(!0), r.delay)),
            await (0, m.markIsPaused)(n.id));
          if ("protocol" !== p.type) {
            const F = (0, c.getEphemeralFields)(n);
            p = Object.assign(Object.assign({}, F), p);
          }
          (null === (t = n.id) || void 0 === t ? 0 : t.isBot()) &&
            (p = Object.assign(Object.assign({}, p), {
              messageSecret: await (0, c.genBotMsgSecretFromMsgSecret)(
                crypto.getRandomValues(new Uint8Array(32))
              ),
              botPersonaId: e.BotProfileStore.get(
                null === (v = n.id) || void 0 === v ? void 0 : v.toString()
              ).personaId,
            }));
          if (r.messageId) {
            if (
              ("string" == typeof r.messageId &&
                (r.messageId = e.MsgKey.fromString(r.messageId)),
              !r.messageId.fromMe)
            )
              throw new h.WPPError(
                "message_key_is_not_from_me",
                "Message key is not from me",
                { messageId: r.messageId.toString() }
              );
            if (!r.messageId.remote.equals(n.id))
              throw new h.WPPError(
                "message_key_remote_id_is_not_same_of_chat",
                "Message key remote ID is not same of chat",
                { messageId: r.messageId.toString() }
              );
            p.id = r.messageId;
          }
          p.id || (p.id = await (0, m.generateMessageID)(n));
          if (r.mentionedList && !Array.isArray(r.mentionedList))
            throw new h.WPPError(
              "mentioned_list_is_not_array",
              "The option mentionedList is not an array",
              { mentionedList: r.mentionedList }
            );
          if (
            r.detectMentioned &&
            n.isGroup &&
            (!r.mentionedList || !r.mentionedList.length) &&
            ((t = "chat" === p.type ? p.body : p.caption),
            (r.mentionedList = r.mentionedList || []),
            (v = (null == t ? void 0 : t.match(/(?<=@)(\d+)\b/g)) || []),
            v.length > 0)
          ) {
            t = (await (0, k.getParticipants)(n.id)).map((F) =>
              F.id.toString()
            );
            for (var B of v)
              (v = `${B}@c.us`), t.includes(v) && r.mentionedList.push(v);
          }
          if (r.mentionedList) {
            B = r.mentionedList.map((F) =>
              F instanceof e.Wid ? F : (0, f.assertWid)(F)
            );
            for (const F of B)
              if (!F.isUser())
                throw new h.WPPError(
                  "mentioned_is_not_user",
                  "Mentioned is not an user",
                  { mentionedId: F.toString() }
                );
            p.mentionedJidList = B;
          }
          if (r.quotedMsg) {
            if (
              ("string" == typeof r.quotedMsg &&
                (r.quotedMsg = e.MsgKey.fromString(r.quotedMsg)),
              r.quotedMsg instanceof e.MsgKey &&
                (r.quotedMsg = await (0, m.getMessageById)(r.quotedMsg)),
              !(r.quotedMsg instanceof e.MsgModel))
            )
              throw new h.WPPError("invalid_quoted_msg", "Invalid quotedMsg", {
                quotedMsg: r.quotedMsg,
              });
            if (
              !(
                (null !== (x = r.quotedMsg) && void 0 !== x && x.isStatusV3) ||
                (0, c.canReplyMsg)(r.quotedMsg)
              )
            )
              throw new h.WPPError(
                "quoted_msg_can_not_reply",
                "QuotedMsg can not reply",
                { quotedMsg: r.quotedMsg }
              );
            p = Object.assign(
              Object.assign({}, p),
              r.quotedMsg.msgContextInfo(n.id)
            );
          }
          return p;
        };
        const f = b(41687),
          k = b(64456),
          h = b(62857),
          e = b(14647),
          d = b(20514),
          c = b(52757),
          g = b(74023),
          m = b(97829);
      },
      58267: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.requestPhoneNumber = async function (d, c = {}) {
          c = Object.assign(Object.assign({}, h.defaultSendMessageOptions), c);
          const g = (0, f.assertWid)(d);
          if (!g.isLid())
            throw new k.WPPError(
              "not_a_lid_chat",
              `requestPhoneNumber should not be called for non lid chat ${g.toString()}`
            );
          return await (0, e.sendRawMessage)(
            d,
            { type: "request_phone_number" },
            c
          );
        };
        const f = b(41687),
          k = b(62857),
          h = b(74023),
          e = b(97829);
      },
      82028: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendChargeMessage = async function (c, g, m) {
          if (!g || !c)
            throw new f.WPPError(
              "parameter_not_fount",
              "Please, send all the required parameters"
            );
          m = Object.assign(Object.assign({}, e.defaultSendMessageOptions), m);
          var n = [];
          let p = 0;
          var r = null,
            t = k.CatalogStore.get(k.UserPrefs.getMaybeMeUser());
          for (const x of g)
            if ("product" == x.type) {
              ({ data: g } = await (0, h.queryProduct)(
                k.UserPrefs.getMaybeMeUser(),
                x.id,
                100,
                100,
                void 0,
                !0
              ));
              if (void 0 === g)
                throw new f.WPPError(
                  "product_not_found",
                  `The product id ${x.id} not found`
                );
              var v = (null == t ? void 0 : t.productCollection).get(x.id);
              r ||= v
                .getProductImageCollectionHead()
                .mediaData.preview.getBase64();
              v = {
                retailer_id: g.id,
                name: g.name,
                amount: {
                  value: Number(g.price),
                  offset: Number(m.offset) || 1e3,
                },
                quantity: Number(x.qnt || 1),
                isCustomItem: !1,
                isQuantitySet: !0,
              };
              p += Number(g.price) * Number(x.qnt || 1);
              n.push(v);
            } else
              (g = {
                retailer_id: `custom-item-${(0, f.generateOrderUniqueId)()}`,
                name: x.name,
                amount: {
                  value: Number(x.price),
                  offset: Number(m.offset) || 1e3,
                },
                quantity: Number(x.qnt || 1),
                isCustomItem: !0,
                isQuantitySet: !0,
              }),
                (p += Number(x.price) * Number(x.qnt || 1)),
                n.push(g);
          t =
            p +
            Number((null == m ? void 0 : m.tax) || 0) +
            Number((null == m ? void 0 : m.shipping) || 0) -
            Number((null == m ? void 0 : m.discount) || 0);
          n = {
            reference_id: (0, f.generateOrderUniqueId)(),
            type: "physical-goods",
            payment_configuration: "merchant_categorization_code",
            currency: await (0, h.currencyForCountryShortcode)(
              await (0, h.getCountryShortcodeByPhone)(
                k.UserPrefs.getMeUser().user
              )
            ),
            total_amount: { value: t, offset: Number(m.offset) || 1e3 },
            order_type: "ORDER",
            order: {
              status: "pending",
              items: n,
              subtotal: { value: Number(p), offset: Number(m.offset) || 1e3 },
              tax: (null == m ? 0 : m.tax)
                ? {
                    value: null == m ? void 0 : m.tax,
                    offset: Number(m.offset) || 1e3,
                  }
                : null,
              shipping: (null == m ? 0 : m.shipping)
                ? {
                    value: null == m ? void 0 : m.shipping,
                    offset: Number(m.offset) || 1e3,
                  }
                : null,
              discount: (null == m ? 0 : m.discount)
                ? {
                    value: null == m ? void 0 : m.discount,
                    offset: Number(m.offset) || 1e3,
                  }
                : null,
            },
            payment_settings:
              void 0 !== m.pix
                ? [
                    {
                      pix_static_code: {
                        key: m.pix.key,
                        key_type: m.pix.keyType,
                        merchant_name: m.pix.name,
                      },
                      type: "pix_static_code",
                    },
                    { cards: { enabled: !0 }, type: "cards" },
                  ]
                : void 0,
            external_payment_configurations: m.payment_instruction
              ? [
                  {
                    type: "payment_instruction",
                    payment_instruction: m.payment_instruction,
                  },
                ]
              : void 0,
          };
          r = {
            type: "interactive",
            caption: null == m ? void 0 : m.notes,
            nativeFlowName: "order_details",
            interactiveType: "native_flow",
            interactiveHeader: {
              hasmediaAttachment: !1,
              mediaType: void 0,
              subtitle: void 0,
              thumbnail: r,
              title: null,
            },
            interactivePayload: {
              buttons: [
                { buttonParamsJson: JSON.stringify(n), name: "review_and_pay" },
              ],
              messageVersion: 1,
            },
          };
          return await (0, d.sendRawMessage)(c, r, m);
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757),
          e = b(74023),
          d = b(97829);
      },
      68011: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendCreatePollMessage = async function (h, e, d, c = {}) {
          c = Object.assign(Object.assign({}, f.defaultSendMessageOptions), c);
          e = {
            type: "poll_creation",
            pollName: e,
            pollOptions: d.map((g, m) => ({ name: g, localId: m })),
            pollEncKey: self.crypto.getRandomValues(new Uint8Array(32)),
            pollSelectableOptionsCount: c.selectableCount || 0,
            messageSecret: self.crypto.getRandomValues(new Uint8Array(32)),
          };
          return await (0, k.sendRawMessage)(h, e, c);
        };
        const f = b(74023),
          k = b(97829);
      },
      35824: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendEventMessage = async function (c, g) {
          var m;
          if (
            "string" ==
              typeof (g = Object.assign(
                Object.assign({}, e.defaultSendMessageOptions),
                g
              )).callType &&
            "voice" != g.callType &&
            "video" != g.callType
          )
            throw new k.WPPError(
              "callType_is_invalid",
              `Param callType: ${g.callType} is not a valid type call. Use voice or video`
            );
          var n = new Date(1e3 * g.startTime);
          n.setHours(n.getHours() + 2);
          n = Math.floor(n.getTime() / 1e3);
          n = {
            type: "event_creation",
            eventName: g.name || " ",
            eventLocation: null == g ? void 0 : g.location,
            eventDescription: (null == g ? void 0 : g.description) || " ",
            eventStartTime: g.startTime,
            eventEndTime: (null == g ? void 0 : g.endTime) || n,
            isEventCanceled: !1,
            callType: g.callType || 0,
            author:
              null === (m = (0, f.getMyUserId)()) || void 0 === m
                ? void 0
                : m.toString(),
            kind: "eventCreation",
            messageSecret: crypto.getRandomValues(new Uint8Array(32)),
            viewMode: "VISIBLE",
            eventJoinLink:
              "string" == typeof (null == g ? void 0 : g.callType)
                ? await (0, h.createEventCallLink)(g.startTime, g.callType)
                : void 0,
          };
          return await (0, d.sendRawMessage)(c, n, g);
        };
        const f = b(72927),
          k = b(62857),
          h = b(52757),
          e = b(74023),
          d = b(97829);
      },
      24654: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (B, F, L, J) {
                  void 0 === J && (J = L);
                  var T = Object.getOwnPropertyDescriptor(F, L);
                  (T &&
                    ("get" in T
                      ? F.__esModule
                      : !T.writable && !T.configurable)) ||
                    (T = {
                      enumerable: !0,
                      get: function () {
                        return F[L];
                      },
                    });
                  Object.defineProperty(B, J, T);
                }
              : function (B, F, L, J) {
                  void 0 === J && (J = L);
                  B[J] = F[L];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (B, F) {
                  Object.defineProperty(B, "default", {
                    enumerable: !0,
                    value: F,
                  });
                }
              : function (B, F) {
                  B.default = F;
                });
        l =
          (this && this.__importStar) ||
          function (B) {
            if (B && B.__esModule) return B;
            var F = {};
            if (null != B)
              for (var L in B)
                "default" !== L &&
                  Object.prototype.hasOwnProperty.call(B, L) &&
                  f(F, B, L);
            return k(F, B), F;
          };
        var h =
          (this && this.__importDefault) ||
          function (B) {
            return B && B.__esModule ? B : { default: B };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendFileMessage = async function (B, F, L) {
          function J(X, y) {
            x(`message file ${N.id} is ${y}`);
          }
          var T, V;
          let W = (L = Object.assign(
            Object.assign(Object.assign({}, r.defaultSendMessageOptions), {
              type: "auto-detect",
              waveform: !0,
            }),
            L
          )).createChat
            ? await (0, e.assertFindChat)(B)
            : (0, e.assertGetChat)(B);
          "status@broadcast" == (null == B ? void 0 : B.toString()) &&
            (W = new g.ChatModel({ id: (0, d.createWid)(p.STATUS_JID) }));
          var R = await (0, c.convertToFile)(F, L.mimetype, L.filename);
          F = R.name;
          const ba = await g.OpaqueData.createFromData(R, R.type),
            Z = {};
          var M;
          "audio" === L.type
            ? ((Z.isPtt = L.isPtt),
              L.isPtt && (M = L.isViewOnce),
              (Z.precomputedFields = await (0, v.prepareAudioWaveform)(L, R)))
            : "image" === L.type
            ? (M = L.isViewOnce)
            : "video" === L.type
            ? ((M = L.isViewOnce), (Z.asGif = L.isGif))
            : "document" === L.type
            ? (Z.asDocument = !0)
            : "sticker" === L.type && (Z.asSticker = !0);
          R = g.MediaPrep.prepRawMedia(ba, Z);
          let K = await (0, t.prepareRawMessage)(
            W,
            {
              caption: L.caption || F,
              filename: F,
              footer: L.footer,
              isCaptionByUser: null != L.caption,
            },
            L
          );
          K = (0, t.prepareMessageButtons)(K, L);
          L.markIsRead &&
            (x("marking chat is read before send file"),
            await (0, t.markIsRead)(W.id).catch(() => null));
          await R.waitForPrep();
          (null == L ? 0 : L.isPtv) &&
            ((R._mediaData.type = "ptv"),
            (R._mediaData.fullHeight = 1128),
            (R._mediaData.fullWidth = 1128));
          x(`sending message (${L.type}) with id ${K.id}`);
          M = R.sendToChat(W, {
            caption: L.caption,
            footer: L.footer,
            isViewOnce: M,
            productMsgOptions: "status@broadcast" === B ? void 0 : K,
            addEvenWhilePreparing: !1,
            type: K.type,
          });
          let N = null;
          N =
            "status@broadcast" ==
            (null === (T = K.to) || void 0 === T ? void 0 : T.toString())
              ? await new Promise((X) => {
                  g.StatusV3Store.on(
                    "change:lastReceivedKey",
                    async function G(A, D) {
                      var I;
                      A.id.toString() ==
                        (null === (I = K.from) || void 0 === I
                          ? void 0
                          : I.toString()) &&
                        (g.StatusV3Store.off("change:lastReceivedKey", G),
                        (A = await (0, t.getMessageById)(D)),
                        X(A));
                    }
                  );
                })
              : await new Promise((X) => {
                  W.msgs.on("add", function D(A) {
                    A.id === K.id && (W.msgs.off("add", D), X(A));
                  });
                });
          if (
            (x(`message file ${N.id} queued`),
            N.on("change:mediaData.mediaStage", J),
            M.finally(() => {
              N.off("change:mediaData.mediaStage", J);
            }),
            "status@broadcast" !== B)
          ) {
            if (L.waitForAck) {
              x(`waiting ack for ${N.id}`);
              var P = await M;
              x(`ack received for ${N.id} (ACK: ${N.ack}, SendResult: ${P})`);
            }
            return {
              id: null === (V = N.id) || void 0 === V ? void 0 : V.toString(),
              ack: N.ack,
              sendMsgResult: M,
            };
          }
          V = await new Promise((X, y) => {
            const A = setTimeout(() => {
                y(
                  new d.WPPError(
                    "timeout_on_send_status",
                    "Timeout for wait response of send media status"
                  )
                );
              }, 3e4),
              D = setInterval(async () => {
                const G = await (0, t.getMessageById)(N.id);
                G.ack > 0 && (clearInterval(D), clearTimeout(A), X(G));
              }, 1500);
          });
          return {
            id: null === (P = V.id) || void 0 === P ? void 0 : P.toString(),
            ack: V.ack,
            sendMsgResult: { messageSendResult: m.SendMsgResult.OK },
          };
        };
        a = h(b(17833));
        const e = b(41687),
          d = b(62857),
          c = b(39681);
        l = l(b(1132));
        const g = b(14647),
          m = b(20514),
          n = b(54993),
          p = b(52757),
          r = b(74023),
          t = b(97829),
          v = b(72185),
          x = (0, a.default)("WA-JS:message");
        l.onFullReady(() => {
          (0, n.wrapModuleFunction)(
            p.generateVideoThumbsAndDuration,
            async (B, ...F) => {
              const [L] = F;
              try {
                return await B(...F);
              } catch (J) {
                if (
                  "string" == typeof J.message &&
                  J.message.includes("MEDIA_ERR_SRC_NOT_SUPPORTED")
                )
                  try {
                    const T = await L.file.arrayBuffer(),
                      V = (0, d.getVideoInfoFromBuffer)(T);
                    return {
                      duration: V.duration,
                      thumbs: L.maxDimensions.map((W) => {
                        var R = V.width,
                          ba = V.height,
                          Z = null != ba ? ba : W,
                          M = null != R ? R : W;
                        Z > M
                          ? Z > W && ((M *= W / Z), (Z = W))
                          : M > W && ((Z *= W / M), (M = W));
                        W = Math.max(Z, 1);
                        M = Math.max(M, 1);
                        Z = document.createElement("canvas");
                        const K = Z.getContext("2d");
                        return (
                          (Z.width = W),
                          (Z.height = M),
                          (K.fillStyle = "white"),
                          K.fillRect(0, 0, Z.width, Z.height),
                          {
                            url: Z.toDataURL("image/jpeg"),
                            width: W,
                            height: M,
                            fullWidth: R,
                            fullHeight: ba,
                          }
                        );
                      }),
                    };
                  } catch (T) {
                    console.error(T);
                  }
                throw J;
              }
            }
          );
          (0, n.wrapModuleFunction)(p.processRawSticker, async (B, ...F) => {
            const [L] = F;
            B = await B(...F);
            if ("image/webp" === L.type()) {
              F = L.forceToBlob();
              const J = await (0, d.blobToArrayBuffer)(F);
              (0, p.isAnimatedWebp)(J) &&
                (B.mediaBlob = await g.OpaqueData.createFromData(F, L.type()));
            }
            return B;
          });
          (0, n.wrapModuleFunction)(p.uploadMedia, async (B, ...F) => {
            const [L] = F;
            return "ptv" == L.mediaType
              ? ((L.mediaType = "video"), await B(L))
              : await B(...F);
          });
        });
      },
      40954: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendGroupInviteMessage = async function (c, g) {
          if (
            !(g = Object.assign(
              Object.assign({}, e.defaultSendMessageOptions),
              g
            )).groupName
          ) {
            var m = await (0, k.ensureGroup)(g.groupId);
            g.groupName = m.name;
          }
          if (
            !g.jpegThumbnail &&
            (m = await (0, f.getProfilePictureUrl)(g.groupId, !1))
          )
            try {
              var n = await (0, h.downloadImage)(m);
              g.jpegThumbnail = n.data.split(",", 2)[1];
            } catch (p) {}
          n = `https://chat.whatsapp.com/${g.inviteCode}`;
          return await (0, d.sendRawMessage)(
            c,
            g.inviteCodeExpiration
              ? {
                  type: "groups_v4_invite",
                  inviteGrpJpegThum: g.jpegThumbnail,
                  inviteCode: g.inviteCode,
                  inviteCodeExp: g.inviteCodeExpiration || "",
                  inviteGrp: g.groupId,
                  inviteGrpName: g.groupName,
                  comment: g.caption,
                }
              : {
                  type: "chat",
                  subtype: "url",
                  thumbnail: g.jpegThumbnail,
                  thumbnailHeight: g.jpegThumbnail ? 100 : void 0,
                  thumbnailWidth: g.jpegThumbnail ? 100 : void 0,
                  title: g.groupName,
                  inviteGrpType: "DEFAULT",
                  canonicalUrl: `https://chat.whatsapp.com/${g.inviteCode}`,
                  description: g.caption ? `${g.caption}\n${n}` : n,
                  body: g.caption ? `${g.caption}\n${n}` : n,
                  matchedText: `https://chat.whatsapp.com/${g.inviteCode}`,
                  richPreviewType: 0,
                },
            g
          );
        };
        const f = b(56191),
          k = b(64456),
          h = b(62857),
          e = b(74023),
          d = b(97829);
      },
      35184: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (m, n, p, r) {
                  void 0 === r && (r = p);
                  var t = Object.getOwnPropertyDescriptor(n, p);
                  (t &&
                    ("get" in t
                      ? n.__esModule
                      : !t.writable && !t.configurable)) ||
                    (t = {
                      enumerable: !0,
                      get: function () {
                        return n[p];
                      },
                    });
                  Object.defineProperty(m, r, t);
                }
              : function (m, n, p, r) {
                  void 0 === r && (r = p);
                  m[r] = n[p];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (m, n) {
                  Object.defineProperty(m, "default", {
                    enumerable: !0,
                    value: n,
                  });
                }
              : function (m, n) {
                  m.default = n;
                });
        l =
          (this && this.__importStar) ||
          function (m) {
            if (m && m.__esModule) return m;
            var n = {};
            if (null != m)
              for (var p in m)
                "default" !== p &&
                  Object.prototype.hasOwnProperty.call(m, p) &&
                  f(n, m, p);
            return k(n, m), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendListMessage = async function (m, n) {
          const p = (n = Object.assign(
            Object.assign({}, c.defaultSendMessageOptions),
            n
          )).sections;
          if (!Array.isArray(p))
            throw new h.WPPError(
              "invalid_list_type",
              "Sections must be an array"
            );
          if (0 === p.length || p.length > 10)
            throw new h.WPPError(
              "invalid_list_size",
              "Sections options must have between 1 and 10 options"
            );
          return await (0, g.sendRawMessage)(
            m,
            {
              type: "list",
              list: {
                buttonText: n.buttonText,
                description: n.description || " ",
                title: n.title,
                footerText: n.footer,
                listType: 1,
                sections: p,
              },
              footer: n.footer,
            },
            n
          );
        };
        const h = b(62857);
        a = l(b(1132));
        const e = b(54993),
          d = b(52757),
          c = b(74023),
          g = b(97829);
        a.onFullReady(() => {
          (0, e.wrapModuleFunction)(d.typeAttributeFromProtobuf, (m, ...n) => {
            const [p] = n;
            return p.listMessage ? "text" : m(...n);
          });
        });
      },
      39453: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (m, n, p, r) {
                  void 0 === r && (r = p);
                  var t = Object.getOwnPropertyDescriptor(n, p);
                  (t &&
                    ("get" in t
                      ? n.__esModule
                      : !t.writable && !t.configurable)) ||
                    (t = {
                      enumerable: !0,
                      get: function () {
                        return n[p];
                      },
                    });
                  Object.defineProperty(m, r, t);
                }
              : function (m, n, p, r) {
                  void 0 === r && (r = p);
                  m[r] = n[p];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (m, n) {
                  Object.defineProperty(m, "default", {
                    enumerable: !0,
                    value: n,
                  });
                }
              : function (m, n) {
                  m.default = n;
                });
        l =
          (this && this.__importStar) ||
          function (m) {
            if (m && m.__esModule) return m;
            var n = {};
            if (null != m)
              for (var p in m)
                "default" !== p &&
                  Object.prototype.hasOwnProperty.call(m, p) &&
                  f(n, m, p);
            return k(n, m), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendLocationMessage = async function (m, n) {
          var p =
            (n = Object.assign(
              Object.assign({}, d.defaultSendMessageOptions),
              n
            )).name && n.address
              ? `${n.name}\n${n.address}`
              : n.name || n.address || "";
          "string" == typeof n.lat && (n.lat = parseFloat(n.lat));
          "string" == typeof n.lng && (n.lng = parseFloat(n.lng));
          p = {
            type: "location",
            lat: n.lat,
            lng: n.lng,
            loc: p,
            clientUrl: n.url,
          };
          return (
            (p = (0, g.prepareMessageButtons)(p, n)),
            await (0, c.sendRawMessage)(m, p, n)
          );
        };
        a = l(b(1132));
        const h = b(54993),
          e = b(52757),
          d = b(74023),
          c = b(97829),
          g = b(43394);
        a.onFullReady(() => {
          (0, h.wrapModuleFunction)(e.mediaTypeFromProtobuf, (m, ...n) => {
            const [p] = n;
            return p.locationMessage ? null : m(...n);
          });
          (0, h.wrapModuleFunction)(e.typeAttributeFromProtobuf, (m, ...n) => {
            const [p] = n;
            return p.locationMessage ? "text" : m(...n);
          });
        });
      },
      42992: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendPixKeyMessage = async function (e, d, c) {
          if (!(e && d.keyType && d.name && d.key))
            throw new f.WPPError(
              "parameter_not_fount",
              "Please, send all the required parameters"
            );
          c = Object.assign(Object.assign({}, k.defaultSendMessageOptions), c);
          d = {
            order: {
              items: [
                {
                  name: "",
                  retailer_id: `custom-item-${f.generateOrderUniqueId}`,
                  amount: { offset: 1, value: 0 },
                  quantity: 0,
                },
              ],
              order_type: "ORDER_WITHOUT_AMOUNT",
              status: "payment_requested",
              subtotal: { value: 0, offset: 1 },
            },
            total_amount: { value: 0, offset: 1 },
            reference_id: (0, f.generateOrderUniqueId)(),
            payment_settings: [
              {
                type: "pix_static_code",
                pix_static_code: {
                  key_type: d.keyType,
                  merchant_name: d.name,
                  key: d.key,
                },
              },
              { type: "cards", cards: { enabled: !1 } },
            ],
            external_payment_configurations: [
              {
                payment_instruction: d.instructions,
                type: "payment_instruction",
              },
            ],
            additional_note: d.instructions,
            currency: "BRL",
            type: "physical-goods",
          };
          d = {
            type: "interactive",
            caption: "",
            nativeFlowName: "payment_info",
            interactiveType: "native_flow",
            interactivePayload: {
              buttons: [
                { buttonParamsJson: JSON.stringify(d), name: "payment_info" },
              ],
              messageVersion: 1,
            },
          };
          return await (0, h.sendRawMessage)(e, d, c);
        };
        const f = b(62857),
          k = b(74023),
          h = b(97829);
      },
      44190: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (p) {
            return p && p.__esModule ? p : { default: p };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendRawMessage = async function (p, r, t = {}) {
          var v,
            x = (t = Object.assign(
              Object.assign({}, g.defaultSendMessageOptions),
              t
            )).createChat
              ? await (0, f.assertFindChat)(p)
              : (0, f.assertGetChat)(p);
          if (
            x.isGroup &&
            x.isParentGroup &&
            ((p = e.GroupMetadataStore.get(
              null === (v = x.id) || void 0 === v ? void 0 : v.toString()
            )),
            "COMMUNITY" == (null == p ? void 0 : p.groupType))
          )
            throw (
              ((r = (0, k.getAnnouncementGroup)(p.id)),
              new h.WPPError(
                "can_not_send_message_to_this_groupType",
                `You can not send message to this groupType 'COMMUNITY', send for Announcement Group. Correct announcement groupId: ${
                  null == r ? void 0 : r.toString()
                }`
              ))
            );
          r = await (0, m.prepareRawMessage)(x, r, t);
          t.markIsRead &&
            (n("marking chat is read before send message"),
            await (0, m.markIsRead)(x.id).catch(() => null));
          n(`sending message (${r.type}) with id ${r.id}`);
          v = null;
          if ((null == x ? 0 : x.isNewsletter) && r.type) {
            if (!["chat", "image", "video", "poll_creation"].includes(r.type))
              throw new h.WPPError(
                "type_not_valid_for_newsletter",
                'Please, send a valid type for send message to newsletter. Valid types: "chat", "image", "video", "poll_creation"'
              );
            v = new e.MsgModel(r);
            await (0, c.addNewsletterMsgsRecords)([
              await (0, c.msgDataFromMsgModel)(v),
            ]);
            p = await (0, c.sendNewsletterMessageJob)({
              type:
                "chat" != r.type || r.editMsgType
                  ? "poll_creation" == r.type
                    ? "pollCreation"
                    : "media"
                  : "text",
              msgData: r,
              msg: new e.MsgModel(r),
              newsletterJid: x.id.toString(),
            });
            x.msgs.add(v);
            p.success && ((v.t = p.ack.t), (v.serverId = p.serverId));
            v.updateAck(d.ACK.SENT, !0);
            await (0, c.updateNewsletterMsgRecord)(v);
            v = [v, "OK"];
          } else
            "protocol" === r.type && "message_edit" === r.subtype
              ? ((x = await (0, m.getMessageById)(r.protocolMessageKey)),
                await (0, c.addAndSendMessageEdit)(x, r),
                (v = [await (0, m.getMessageById)(r.protocolMessageKey), null]))
              : (v = await (0, c.addAndSendMsgToChat)(x, r));
          n(`message ${r.id} queued`);
          x = await v[0];
          t.waitForAck &&
            (n(`waiting ack for ${r.id}`),
            (t = await v[1]),
            n(`ack received for ${r.id} (ACK: ${x.ack}, SendResult: ${t})`));
          return Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  { id: x.id.toString(), ack: x.ack },
                  x.latestEditMsgKey && { latestEditMsgKey: x.latestEditMsgKey }
                ),
                x.from && { from: x.from.toString() }
              ),
              x.to && { to: x.to.toString() }
            ),
            { sendMsgResult: v[1] }
          );
        };
        a = l(b(17833));
        const f = b(41687),
          k = b(83874),
          h = b(62857),
          e = b(14647),
          d = b(20514),
          c = b(52757),
          g = b(74023),
          m = b(97829),
          n = (0, a.default)("WA-JS:message");
      },
      92774: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendReactionToMessage = async function (e, d) {
          e instanceof f.MsgModel ||
            "string" == typeof e ||
            "function" != typeof e.toString ||
            (e = e.toString());
          e =
            e instanceof f.MsgModel
              ? e
              : await (0, h.getMessageById)(e.toString());
          d ||= "";
          return { sendMsgResult: await (0, k.sendReactionToMsg)(e, d) };
        };
        const f = b(14647),
          k = b(52757),
          h = b(17530);
      },
      59633: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendScheduledCallMessage = async function (h, e) {
          var d;
          return (
            (e = Object.assign(
              Object.assign({ callType: "voice" }, f.defaultSendMessageOptions),
              e
            )),
            await (0, k.sendEventMessage)(
              h,
              Object.assign(Object.assign({}, e), {
                name: e.title,
                description: null == e ? void 0 : e.description,
                callType: e.callType,
                startTime:
                  parseInt(
                    null === (d = e.scheduledTimestampMs) || void 0 === d
                      ? void 0
                      : d.toString()
                  ) / 1e3,
              })
            )
          );
        };
        const f = b(74023),
          k = b(97829);
      },
      68533: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendTextMessage = async function (h, e, d = {}) {
          d = Object.assign(Object.assign({}, f.defaultSendMessageOptions), d);
          e = {
            body: e,
            type: "chat",
            subtype: null,
            urlText: null,
            urlNumber: null,
          };
          return (
            (e = (0, k.prepareMessageButtons)(e, d)),
            (e = await (0, k.prepareLinkPreview)(e, d)),
            await (0, k.sendRawMessage)(h, e, d)
          );
        };
        const f = b(74023),
          k = b(97829);
      },
      36356: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendVCardContactMessage = async function (d, c, g = {}) {
          g = Object.assign(Object.assign({}, h.defaultSendMessageOptions), g);
          Array.isArray(c) || (c = [c]);
          const m = [];
          for (var n of c) {
            let p = (c = "");
            "object" == typeof n && "name" in n
              ? ((c = n.id.toString()), (p = n.name))
              : (c = n.toString());
            let r = k.ContactStore.get(c);
            r ||= new k.ContactModel({ id: (0, f.assertWid)(c), name: p });
            !p &&
              r.id.equals(k.UserPrefs.getMaybeMeUser()) &&
              (p = r.displayName);
            p &&
              ((r = new k.ContactModel(r.attributes)),
              (r.name = p),
              Object.defineProperty(r, "formattedName", { value: p }),
              Object.defineProperty(r, "displayName", { value: p }));
            m.push(k.VCard.vcardFromContactModel(r));
          }
          n = {};
          1 === m.length
            ? ((n.type = "vcard"),
              (n.body = m[0].vcard),
              (n.vcardFormattedName = m[0].displayName))
            : ((n.type = "multi_vcard"), (n.vcardList = m));
          return (0, e.sendRawMessage)(d, n, g);
        };
        const f = b(41687),
          k = b(14647),
          h = b(74023),
          e = b(97829);
      },
      43859: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (p, r, t, v) {
                  void 0 === v && (v = t);
                  var x = Object.getOwnPropertyDescriptor(r, t);
                  (x &&
                    ("get" in x
                      ? r.__esModule
                      : !x.writable && !x.configurable)) ||
                    (x = {
                      enumerable: !0,
                      get: function () {
                        return r[t];
                      },
                    });
                  Object.defineProperty(p, v, x);
                }
              : function (p, r, t, v) {
                  void 0 === v && (v = t);
                  p[v] = r[t];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (p, r) {
                  Object.defineProperty(p, "default", {
                    enumerable: !0,
                    value: r,
                  });
                }
              : function (p, r) {
                  p.default = r;
                });
        l =
          (this && this.__importStar) ||
          function (p) {
            if (p && p.__esModule) return p;
            var r = {};
            if (null != p)
              for (var t in p)
                "default" !== t &&
                  Object.prototype.hasOwnProperty.call(p, t) &&
                  f(r, p, t);
            return k(r, p), r;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.FilterChatListTypes = void 0;
        a.setChatList = async function (p, r) {
          if (((m = p), !p))
            throw new h.WPPError(
              "send_type_filter",
              "Please send a valid type filter"
            );
          if (p == n.LABELS && !r)
            throw new h.WPPError(
              "send_labelId",
              "Please send a valid label id"
            );
          if (p == n.CUSTOM && !r)
            throw new h.WPPError("send_ids", "Please send a valid ids");
          "string" == typeof r && (r = [r]);
          return p == n.CUSTOM && r
            ? ((g = r),
              e.Cmd.trigger("set_active_filter", "unread"),
              e.Cmd.trigger("set_active_filter"),
              { type: p, list: g })
            : p == n.ALL
            ? (e.Cmd.trigger("set_active_filter"), { type: p })
            : p == n.LABELS
            ? (e.Cmd.trigger("set_active_filter", n.LABELS, r[0]), { type: p })
            : (e.Cmd.trigger("set_active_filter", "unread"),
              e.Cmd.trigger("set_active_filter", p),
              { type: p });
        };
        a.wrapShouldAppearFunction = function (p, r) {
          const t = (...v) => r(p, ...v);
          return (
            Object.defineProperties(
              t,
              Object.getOwnPropertyDescriptors(c.getShouldAppearInList)
            ),
            t
          );
        };
        const h = b(62857);
        l = l(b(1132));
        const e = b(14647),
          d = b(54993),
          c = b(52757);
        let g = [],
          m = "all";
        var n;
        !(function (p) {
          p.ALL = "all";
          p.CUSTOM = "custom";
          p.UNREAD = "unread";
          p.PERSONAL = "personal";
          p.NON_CONTACT = "non_contact";
          p.GROUP = "group";
          p.FAVORITES = "favorites";
          p.CONTACT = "contact";
          p.BUSINESS = "business";
          p.BROADCAST = "broadcast";
          p.LABELS = "labels";
          p.ASSIGNED_TO_YOU = "assigned_to_you";
        })(n || (a.FilterChatListTypes = n = {}));
        l.onFullReady(function () {
          (0, d.wrapModuleFunction)(c.getShouldAppearInList, (p, ...r) => {
            var t;
            const [v] = r;
            return m === n.CUSTOM
              ? !!g.includes(
                  null === (t = v.id) || void 0 === t ? void 0 : t.toString()
                )
              : p(...r);
          });
          (0,
          d.wrapModuleFunction)(c.isFilterExcludedFromSearchTreatmentInInboxFlow, async (p, ...r) => {
            const [t] = r;
            return (
              t === n.LABELS ||
                (m == n.CUSTOM &&
                  ((m = n.ALL),
                  e.Cmd.trigger("set_active_filter", "default"),
                  e.Cmd.trigger("set_active_filter", t)),
                (m = n.ALL),
                e.Cmd.trigger("set_active_filter", t)),
              p(...r)
            );
          });
        }, 1e3);
      },
      18194: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setInputText = async function (c, g) {
          if (
            (g =
              void 0 !== g
                ? await (0, f.assertFindChat)(g)
                : (0, k.getActiveChat)())
          )
            return (null == g ? 0 : g.active)
              ? (g.setComposeContents({
                  text: c,
                  timestamp: (0, d.unixTime)(),
                }),
                e.ComposeBoxActions.setTextContent(g, c),
                g.getComposeContents())
              : (null == g ||
                  g.setComposeContents({
                    text: c,
                    timestamp: (0, d.unixTime)(),
                  }),
                g.getComposeContents());
          throw new h.WPPError(
            "not_in_chat",
            "Not active chat or invalid wid value"
          );
        };
        const f = b(41687),
          k = b(74023),
          h = b(62857),
          e = b(14647),
          d = b(52757);
      },
      31116: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setNotes = async function (d, c) {
          const g = (0, f.assertGetChat)(d);
          if (!(0, k.isBusiness)())
            throw new h.WPPError(
              "connected_device_not_is_business",
              "Connected device not is business account"
            );
          if (!c)
            throw new h.WPPError(
              "missing_content_for_notes",
              "Missing content for notes"
            );
          if (g.isGroup)
            throw new h.WPPError(
              "can_not_set_notes_for_groups",
              `You can not set notes for groups. ChatId: ${d}`
            );
          d = await (0, e.retrieveOnlyNoteForChatJid)(g.id.toJid());
          return (
            await (0, e.addOrEditNoteAction)(
              {
                actionType: d ? "edit" : "add",
                chatJid: g.id.toJid(),
                content: c,
                createdAt: Math.floor(Date.now() / 1e3),
                id: null == d ? void 0 : d.id,
                noteType: "unstructured",
              },
              !0
            ),
            await (0, e.retrieveOnlyNoteForChatJid)(g.id.toJid())
          );
        };
        const f = b(41687),
          k = b(5882),
          h = b(62857),
          e = b(33505);
      },
      37126: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.starMessage = async function (e, d = !0) {
          let c = !1;
          Array.isArray(e) || ((c = !0), (e = [e]));
          var g = await (0, h.getMessageById)(e);
          e = g.reduce((m, n) => {
            const p = n.id.remote.toString();
            return (m[p] = m[p] || []), m[p].push(n), m;
          }, {});
          g = g.map((m) => ({ id: m.id.toString(), star: m.star || !1 }));
          for (const m in e) {
            const n = (0, f.assertGetChat)(m),
              p = e[m];
            d ? k.Cmd.sendStarMsgs(n, p) : k.Cmd.sendUnstarMsgs(n, p);
            n.promises.sendStarMsgs && (await n.promises.sendStarMsgs);
          }
          return c ? g[0] : g;
        };
        const f = b(41687),
          k = b(14647),
          h = b(97829);
      },
      35291: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.unmute = async function (k) {
          k = (0, f.assertWid)(k);
          return (0, f.assertGetChat)(k).mute.unmute({ sendDevice: !0 });
        };
        const f = b(41687);
      },
      74023: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(31853);
        b(72465);
        l(b(50175), a);
        l(b(97829), a);
        l(b(73298), a);
      },
      72465: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a = l(b(1132));
        const h = b(14647),
          e = b(54993),
          d = b(52757);
        a.onFullReady(function () {
          (0, e.wrapModuleFunction)(d.mediaTypeFromProtobuf, (c, ...g) => {
            const [m] = g;
            return m.deviceSentMessage
              ? (({ message: c } = m.deviceSentMessage),
                c ? (0, d.mediaTypeFromProtobuf)(c) : null)
              : m.ephemeralMessage
              ? (({ message: c } = m.ephemeralMessage),
                c ? (0, d.mediaTypeFromProtobuf)(c) : null)
              : m.viewOnceMessage
              ? (({ message: c } = m.viewOnceMessage),
                c ? (0, d.mediaTypeFromProtobuf)(c) : null)
              : c(...g);
          });
          (0, e.wrapModuleFunction)(d.typeAttributeFromProtobuf, (c, ...g) => {
            const [m] = g;
            return m.ephemeralMessage
              ? (({ message: c } = m.ephemeralMessage),
                c ? (0, d.typeAttributeFromProtobuf)(c) : "text")
              : m.deviceSentMessage
              ? (({ message: c } = m.deviceSentMessage),
                c ? (0, d.typeAttributeFromProtobuf)(c) : "text")
              : m.viewOnceMessage
              ? (({ message: c } = m.viewOnceMessage),
                c ? (0, d.typeAttributeFromProtobuf)(c) : "text")
              : c(...g);
          });
          (0, e.wrapModuleFunction)(d.isUnreadTypeMsg, (c, ...g) => {
            const [m] = g;
            switch (m.type) {
              case "buttons_response":
              case "hsm":
              case "list":
              case "list_response":
              case "template_button_reply":
                return !0;
            }
            return c(...g);
          });
          (0,
          e.wrapModuleFunction)(d.findOrCreateLatestChat, async (c, ...g) => {
            const [m, n] = g;
            if (m.isLid() && "username_contactless_search" != n)
              try {
                return await c(...g);
              } catch (p) {
                return await c(m, "username_contactless_search");
              }
            return await c(...g);
          });
        }, 1e3);
        a.onFullReady(function () {
          const c = {
            shouldAppearInList: h.functions.getShouldAppearInList,
            isUser: h.functions.getIsUser,
            isPSA: h.functions.getIsPSA,
            isGroup: h.functions.getIsGroup,
            previewMessage: h.functions.getPreviewMessage,
            showChangeNumberNotification:
              h.functions.getShowChangeNumberNotification,
            hasUnread: h.functions.getHasUnread,
          };
          for (const g in c) {
            const m = c[g];
            void 0 === h.ChatModel.prototype[g] &&
              Object.defineProperty(h.ChatModel.prototype, g, {
                get: function () {
                  return m(this);
                },
                configurable: !0,
              });
          }
        });
      },
      73298: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
      },
      94605: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.addSubgroups = async function (h, e) {
          Array.isArray(e) || (e = [e]);
          h = (0, f.assertWid)(h);
          e = e.map(f.assertWid);
          return await (0, k.sendLinkSubgroups)({
            parentGroupId: h,
            subgroupIds: e,
          });
        };
        const f = b(41687),
          k = b(52757);
      },
      70378: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.create = async function (h, e, d) {
          Array.isArray(d) || (d = [d]);
          d = d.map(f.assertWid);
          h = await (0, k.sendCreateCommunity)({
            name: h,
            desc: e,
            closed: !1,
          });
          e = await (0, k.sendLinkSubgroups)({
            parentGroupId: h.wid,
            subgroupIds: d,
          });
          return { wid: h.wid, subGroups: e };
        };
        const f = b(41687),
          k = b(52757);
      },
      64920: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.deactivate = async function (h) {
          h = (0, f.assertWid)(h);
          return (0, k.sendDeactivateCommunity)({ parentGroupId: h });
        };
        const f = b(41687),
          k = b(52757);
      },
      58092: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.demoteParticipants = async function (d, c) {
          const { groupChat: g, participants: m } = await (0,
          h.ensureGroupAndParticipants)(d, c);
          try {
            return (
              await e.demoteCommunityParticipants(g, m),
              { participants: c, success: !0 }
            );
          } catch (n) {
            return { participants: c, success: !1, error: n };
          }
        };
        const h = b(64456),
          e = l(b(52757));
      },
      9820: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getAnnouncementGroup = function (h) {
          h = (0, k.getSubgroups)(h);
          for (const e of h)
            if (
              ((h = f.GroupMetadataStore.get(e.toString())),
              "LINKED_ANNOUNCEMENT_GROUP" == (null == h ? void 0 : h.groupType))
            )
              return h.id;
        };
        const f = b(14647),
          k = b(84460);
      },
      33110: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getParticipants = async function (h) {
          h = (0, f.assertWid)(h);
          return (0, k.getCommunityParticipants)(h);
        };
        const f = b(41687),
          k = b(52757);
      },
      84460: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getSubgroups = function (h) {
          var e, d;
          const c = k.GroupMetadataStore.get(h.toString());
          if (!c)
            throw new f.WPPError(
              "group_not_exist",
              `GroupId ${null == h ? void 0 : h.toString()} not exists`
            );
          return (null === (e = c.joinedSubgroups) || void 0 === e
            ? void 0
            : e.length) > 0
            ? c.joinedSubgroups
            : k.GroupMetadataStore.get(
                null === (d = c.parentGroup) || void 0 === d
                  ? void 0
                  : d.toString()
              ).joinedSubgroups;
        };
        const f = b(62857),
          k = b(14647);
      },
      5728: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeSubgroups =
          a.promoteParticipants =
          a.getSubgroups =
          a.getParticipants =
          a.getAnnouncementGroup =
          a.demoteParticipants =
          a.deactivate =
          a.create =
          a.addSubgroups =
            void 0;
        var f = b(94605);
        Object.defineProperty(a, "addSubgroups", {
          enumerable: !0,
          get: function () {
            return f.addSubgroups;
          },
        });
        var k = b(70378);
        Object.defineProperty(a, "create", {
          enumerable: !0,
          get: function () {
            return k.create;
          },
        });
        var h = b(64920);
        Object.defineProperty(a, "deactivate", {
          enumerable: !0,
          get: function () {
            return h.deactivate;
          },
        });
        var e = b(58092);
        Object.defineProperty(a, "demoteParticipants", {
          enumerable: !0,
          get: function () {
            return e.demoteParticipants;
          },
        });
        var d = b(9820);
        Object.defineProperty(a, "getAnnouncementGroup", {
          enumerable: !0,
          get: function () {
            return d.getAnnouncementGroup;
          },
        });
        var c = b(33110);
        Object.defineProperty(a, "getParticipants", {
          enumerable: !0,
          get: function () {
            return c.getParticipants;
          },
        });
        var g = b(84460);
        Object.defineProperty(a, "getSubgroups", {
          enumerable: !0,
          get: function () {
            return g.getSubgroups;
          },
        });
        var m = b(84498);
        Object.defineProperty(a, "promoteParticipants", {
          enumerable: !0,
          get: function () {
            return m.promoteParticipants;
          },
        });
        var n = b(53650);
        Object.defineProperty(a, "removeSubgroups", {
          enumerable: !0,
          get: function () {
            return n.removeSubgroups;
          },
        });
      },
      84498: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.promoteParticipants = async function (d, c) {
          const { groupChat: g, participants: m } = await (0,
          h.ensureGroupAndParticipants)(d, c);
          return e.promoteCommunityParticipants(g, m);
        };
        const h = b(64456),
          e = l(b(52757));
      },
      53650: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeSubgroups = async function (h, e) {
          Array.isArray(e) || (e = [e]);
          h = (0, f.assertWid)(h);
          e = e.map(f.assertWid);
          return await (0, k.sendUnlinkSubgroups)({
            parentGroupId: h,
            subgroupIds: e,
          });
        };
        const f = b(41687),
          k = b(52757);
      },
      83874: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(5728), a);
      },
      10896: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.defaultConfig = {
          deviceName: !1,
          liveLocationLimit: 10,
          disableGoogleAnalytics: !1,
          googleAnalyticsId: null,
          googleAnalyticsUserProperty: {},
          linkPreviewApiServers: null,
          poweredBy: "WA-JS",
          sendStatusToDevice: !1,
          syncAllStatus: !0,
        };
      },
      91491: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.config = void 0;
        const f = b(13691);
        l = b(10896);
        b = window.WPPConfig || {};
        l = Object.assign(Object.assign({}, l.defaultConfig), b);
        const k = (h = []) => ({
          get: (e, d) =>
            "isProxy" == d ||
            ("object" == typeof e[d] && null != e[d]
              ? new Proxy(e[d], k([...h, d]))
              : e[d]),
          set: (e, d, c) => {
            e[d] = c;
            try {
              f.internalEv.emitAsync("config.update", {
                config: a.config,
                key: d,
                path: [...h, d],
                target: e,
                value: c,
              });
            } catch (g) {}
            return !0;
          },
        });
        a.config = new Proxy(l, k());
        window.WPPConfig = a.config;
      },
      58293: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(21899);
        b(87589);
        b(75676);
        b(83400);
        b(77679);
        b(26);
        b(28952);
        b(19516);
        b(80739);
        b(96498);
        b(17459);
      },
      21899: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(72927);
        a.onInjected(function () {
          const c = async () => {
            const g = await (0, d.getAuthCode)().catch(() => null);
            h.internalEv.emit("conn.auth_code_change", g);
          };
          c();
          e.Conn.on("change:ref", c);
        });
      },
      87589: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(72927);
        a.onInjected(function () {
          let c = (0, d.isAuthenticated)();
          const g = async () => {
            c || (h.internalEv.emit("conn.authenticated"), (c = !1));
          };
          e.Cmd.isMainLoaded ? g() : e.Cmd.on("main_loaded", g);
          e.Cmd.on("logout", () => {
            c = !1;
          });
        });
      },
      75676: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(function () {
          e.Cmd.on("logout", () => h.internalEv.emit("conn.logout"));
        });
      },
      83400: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(54993),
          d = b(52757);
        a.onInjected(function () {
          (0,
          e.wrapModuleFunction)(d.getErrorCodeFromLogoutReason, (c, ...g) => {
            const [m] = g;
            return h.internalEv.emit("conn.logout_reason", m), c(...g);
          });
        });
      },
      77679: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(60397);
        a.onInjected(function () {
          const d = setInterval(() => {
            (0, e.isMainInit)() &&
              (clearInterval(d), h.internalEv.emit("conn.main_init"));
          }, 100);
        });
      },
      26: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(function () {
          const d = async () => {
            h.internalEv.emit("conn.main_loaded");
          };
          e.Cmd.isMainLoaded ? d() : e.Cmd.on("main_loaded", d);
        });
      },
      28952: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(function () {
          const c = async () => {
            d ||
              ((d = !0),
              setTimeout(() => (d = !1), 1e3),
              h.internalEv.emit("conn.main_ready"));
          };
          "MAIN" === e.Stream.mode
            ? c()
            : (e.Cmd.on("main_stream_mode_ready", c),
              e.Cmd.on("main_stream_mode_ready_legacy", c));
        });
        let d = !1;
      },
      19516: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(function () {
          const d = async () => {
            h.internalEv.emit("conn.needs_update");
          };
          e.Stream.needsUpdate ? d() : e.Stream.on("change:needsUpdate", d);
        });
      },
      80739: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(function () {
          e.NetworkStatus.on("change:online", (d, c) => {
            h.internalEv.emit("conn.online", c);
          });
        });
      },
      96498: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(72927);
        a.onInjected(function () {
          const c = async () => {
            (0, d.isIdle)() && h.internalEv.emit("conn.qrcode_idle");
          };
          c();
          e.Socket.on("change:state", c);
        });
      },
      17459: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647),
          d = b(89763),
          c = b(72927);
        a.onInjected(function () {
          let g = !1;
          const m = async () => {
            (0, c.isAuthenticated)()
              ? (g = !1)
              : g ||
                (e.Socket.state !== d.SOCKET_STATE.UNPAIRED &&
                  e.Socket.state !== d.SOCKET_STATE.UNPAIRED_IDLE) ||
                ((g = !0), h.internalEv.emit("conn.require_auth"));
          };
          m();
          e.Socket.on("change:state", m);
        });
      },
      28904: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.genLinkDeviceCodeForPhoneNumber = async function (e, d = !0) {
          if (!e || "string" != typeof e)
            throw new f.WPPError(
              "send_the_phone_number_to_connect",
              "Can't get code for without phone number param"
            );
          if ((0, h.isAuthenticated)())
            throw new f.WPPError(
              "cannot_get_code_for_already_authenticated",
              "Can't get code for already authenticated user"
            );
          return (
            await k.functions.initializeAltDeviceLinking(),
            await k.functions.genLinkDeviceCodeForPhoneNumber(e, d)
          );
        };
        const f = b(62857),
          k = b(14647),
          h = b(60397);
      },
      11102: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getAuthCode = async function () {
          if (
            !f.Conn.ref ||
            f.Conn.connected ||
            (0, h.isAuthenticated)() ||
            (0, h.isRegistered)()
          )
            return null;
          const e = f.Conn.ref;
          if ((0, h.isMultiDevice)()) {
            var d = await k.waSignalStore.getRegistrationInfo(),
              c = await k.waNoiseInfo.get();
            c = f.Base64.encodeB64(c.staticKeyPair.pubKey);
            d = f.Base64.encodeB64(d.identityKeyPair.pubKey);
            const g = await Promise.resolve(k.adv.getADVSecretKey()),
              m = [e, c, d, g].join();
            return {
              type: "multidevice",
              ref: e,
              staticKeyPair: c,
              identityKeyPair: d,
              secretKey: g,
              fullCode: m,
            };
          }
          return null;
        };
        const f = b(14647),
          k = b(83703),
          h = b(60397);
      },
      11057: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getHistorySyncProgress = function () {
          const e = h.getHistorySyncProgress();
          return {
            progress: e.progress,
            paused: e.paused || !1,
            inProgress: e.inProgress || !1,
          };
        };
        const h = l(b(52757));
      },
      94452: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyDeviceId = function () {
          return f.UserPrefs.getMe();
        };
        const f = b(14647);
      },
      64149: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyUserId = function () {
          return f.UserPrefs.getMaybeMeUser();
        };
        const f = b(14647);
      },
      13158: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getPlatform = function () {
          return f.Conn.platform;
        };
        const f = b(14647);
      },
      60397: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMultiDevice =
          a.setLimit =
          a.setKeepAlive =
          a.refreshQR =
          a.needsUpdate =
          a.markUnavailable =
          a.markAvailable =
          a.logout =
          a.joinWebBeta =
          a.isRegistered =
          a.isOnline =
          a.isMultiDevice =
          a.isMainReady =
          a.isMainLoaded =
          a.isMainInit =
          a.isIdle =
          a.isAuthenticated =
          a.getPlatform =
          a.getMyUserId =
          a.getMyDeviceId =
          a.getHistorySyncProgress =
          a.getAuthCode =
          a.genLinkDeviceCodeForPhoneNumber =
            void 0;
        var f = b(28904);
        Object.defineProperty(a, "genLinkDeviceCodeForPhoneNumber", {
          enumerable: !0,
          get: function () {
            return f.genLinkDeviceCodeForPhoneNumber;
          },
        });
        var k = b(11102);
        Object.defineProperty(a, "getAuthCode", {
          enumerable: !0,
          get: function () {
            return k.getAuthCode;
          },
        });
        var h = b(11057);
        Object.defineProperty(a, "getHistorySyncProgress", {
          enumerable: !0,
          get: function () {
            return h.getHistorySyncProgress;
          },
        });
        var e = b(94452);
        Object.defineProperty(a, "getMyDeviceId", {
          enumerable: !0,
          get: function () {
            return e.getMyDeviceId;
          },
        });
        var d = b(64149);
        Object.defineProperty(a, "getMyUserId", {
          enumerable: !0,
          get: function () {
            return d.getMyUserId;
          },
        });
        var c = b(13158);
        Object.defineProperty(a, "getPlatform", {
          enumerable: !0,
          get: function () {
            return c.getPlatform;
          },
        });
        var g = b(41818);
        Object.defineProperty(a, "isAuthenticated", {
          enumerable: !0,
          get: function () {
            return g.isAuthenticated;
          },
        });
        var m = b(76243);
        Object.defineProperty(a, "isIdle", {
          enumerable: !0,
          get: function () {
            return m.isIdle;
          },
        });
        var n = b(89786);
        Object.defineProperty(a, "isMainInit", {
          enumerable: !0,
          get: function () {
            return n.isMainInit;
          },
        });
        var p = b(50849);
        Object.defineProperty(a, "isMainLoaded", {
          enumerable: !0,
          get: function () {
            return p.isMainLoaded;
          },
        });
        var r = b(65877);
        Object.defineProperty(a, "isMainReady", {
          enumerable: !0,
          get: function () {
            return r.isMainReady;
          },
        });
        var t = b(63282);
        Object.defineProperty(a, "isMultiDevice", {
          enumerable: !0,
          get: function () {
            return t.isMultiDevice;
          },
        });
        var v = b(51170);
        Object.defineProperty(a, "isOnline", {
          enumerable: !0,
          get: function () {
            return v.isOnline;
          },
        });
        var x = b(35177);
        Object.defineProperty(a, "isRegistered", {
          enumerable: !0,
          get: function () {
            return x.isRegistered;
          },
        });
        var B = b(75365);
        Object.defineProperty(a, "joinWebBeta", {
          enumerable: !0,
          get: function () {
            return B.joinWebBeta;
          },
        });
        var F = b(9135);
        Object.defineProperty(a, "logout", {
          enumerable: !0,
          get: function () {
            return F.logout;
          },
        });
        var L = b(62749);
        Object.defineProperty(a, "markAvailable", {
          enumerable: !0,
          get: function () {
            return L.markAvailable;
          },
        });
        Object.defineProperty(a, "markUnavailable", {
          enumerable: !0,
          get: function () {
            return L.markUnavailable;
          },
        });
        var J = b(12709);
        Object.defineProperty(a, "needsUpdate", {
          enumerable: !0,
          get: function () {
            return J.needsUpdate;
          },
        });
        var T = b(27573);
        Object.defineProperty(a, "refreshQR", {
          enumerable: !0,
          get: function () {
            return T.refreshQR;
          },
        });
        var V = b(22987);
        Object.defineProperty(a, "setKeepAlive", {
          enumerable: !0,
          get: function () {
            return V.setKeepAlive;
          },
        });
        var W = b(52122);
        Object.defineProperty(a, "setLimit", {
          enumerable: !0,
          get: function () {
            return W.setLimit;
          },
        });
        var R = b(15610);
        Object.defineProperty(a, "setMultiDevice", {
          enumerable: !0,
          get: function () {
            return R.setMultiDevice;
          },
        });
      },
      41818: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isAuthenticated = function () {
          return h.isAuthenticated();
        };
        const h = l(b(52757));
      },
      76243: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isIdle = function () {
          return f.Socket.state === k.SOCKET_STATE.UNPAIRED_IDLE;
        };
        const f = b(14647),
          k = b(89763);
      },
      89786: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isMainInit = function () {
          var b;
          return !(null === (b = window.Debug) || void 0 === b || !b.VERSION);
        };
      },
      50849: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isMainLoaded = function () {
          return f.Cmd.isMainLoaded;
        };
        const f = b(14647);
      },
      65877: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isMainReady = function () {
          return f;
        };
        let f = !1;
        b(13691).internalEv.once("conn.main_ready", () => {
          f = !0;
        });
      },
      63282: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isMultiDevice = function () {
          return !0;
        };
      },
      51170: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isOnline = function () {
          return f.NetworkStatus.online;
        };
        const f = b(14647);
      },
      35177: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isRegistered = function () {
          return h.isRegistered();
        };
        const h = l(b(52757));
      },
      75365: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.joinWebBeta = async function (h) {
          const e = await (0, k.getWhatsAppWebExternalBetaJoinedIdb)();
          if (e === h) return e;
          if ("boolean" != typeof h)
            throw new f.WPPError(
              "value_not_a_boolean",
              `Value ${h || "<empty>"} is not a boolean`,
              { value: h }
            );
          return (
            await (0, k.changeOptInStatusForExternalWebBeta)(h),
            await (0, k.getWhatsAppWebExternalBetaJoinedIdb)()
          );
        };
        const f = b(62857),
          k = b(52757);
      },
      9135: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.logout = async function () {
          return (
            f.Socket.logout(),
            await new Promise((k) => {
              f.Cmd.once("logout", k);
            }),
            !0
          );
        };
        const f = b(14647);
      },
      62749: (l, a, b) => {
        async function f(h = !0) {
          return (
            Object.defineProperty(k.Stream, "available", {
              get: () => h,
              set: (e) => {
                e == h && k.Stream.trigger("change:available");
              },
              configurable: !0,
            }),
            h ? k.Stream.markAvailable() : k.Stream.markUnavailable(),
            !0
          );
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.markAvailable = f;
        a.markUnavailable = async function () {
          return f(!1);
        };
        const k = b(14647);
      },
      12709: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.needsUpdate = function () {
          return f.Stream.needsUpdate;
        };
        const f = b(14647);
      },
      27573: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.refreshQR = async function () {
          if ((0, h.isAuthenticated)()) return null;
          (0, h.isMultiDevice)() ? k.Cmd.refreshQR() : k.Socket.poke();
          return await f.internalEv
            .waitFor("conn.auth_code_change")
            .then((e) => e[0]);
        };
        const f = b(13691),
          k = b(14647),
          h = b(60397);
      },
      22987: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setKeepAlive = function (k = !0) {
          k
            ? ((document.hasFocus = () => !0),
              (f = setInterval(
                () => document.dispatchEvent(new Event("scroll")),
                15e3
              )))
            : ((document.hasFocus = b), f && (clearInterval(f), (f = null)));
          return !!f;
        };
        const b = document.hasFocus;
        let f;
      },
      52122: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (m, n, p, r) {
                  void 0 === r && (r = p);
                  var t = Object.getOwnPropertyDescriptor(n, p);
                  (t &&
                    ("get" in t
                      ? n.__esModule
                      : !t.writable && !t.configurable)) ||
                    (t = {
                      enumerable: !0,
                      get: function () {
                        return n[p];
                      },
                    });
                  Object.defineProperty(m, r, t);
                }
              : function (m, n, p, r) {
                  void 0 === r && (r = p);
                  m[r] = n[p];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (m, n) {
                  Object.defineProperty(m, "default", {
                    enumerable: !0,
                    value: n,
                  });
                }
              : function (m, n) {
                  m.default = n;
                });
        l =
          (this && this.__importStar) ||
          function (m) {
            if (m && m.__esModule) return m;
            var n = {};
            if (null != m)
              for (var p in m)
                "default" !== p &&
                  Object.prototype.hasOwnProperty.call(m, p) &&
                  f(n, m, p);
            return k(n, m), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setLimit = function (m, n) {
          switch (m) {
            case "maxMediaSize":
              if ("number" != typeof n || n > 73400320)
                throw new h.WPPError(
                  "maxMediaSize_error",
                  "number" != typeof n
                    ? "Value type invalid!"
                    : "Maximum value is 70MB"
                );
              return (e.ServerProps.media = n), e.ServerProps.media;
            case "maxFileSize":
              if ("number" != typeof n || n > 1073741824)
                throw new h.WPPError(
                  "maxFileSize_error",
                  "number" != typeof n
                    ? "Value type invalid!"
                    : "Maximum value is 1GB"
                );
              return (e.ServerProps.maxFileSize = n), e.ServerProps.maxFileSize;
            case "maxShare":
              if ("number" != typeof n)
                throw new h.WPPError("maxShare_error", "Value type invalid!");
              return (
                (e.ServerProps.multicastLimitGlobal = n),
                (e.ServerProps.frequentlyForwardedMax = n),
                (e.ServerProps.frequentlyForwardedThreshold = n),
                e.ServerProps.multicastLimitGlobal
              );
            case "statusVideoMaxDuration":
              if ("number" != typeof n)
                throw new h.WPPError(
                  "statusVideoMaxDuration_error",
                  "Value type invalid!"
                );
              return (
                (e.ServerProps.statusVideoMaxDuration = n),
                e.ServerProps.statusVideoMaxDuration
              );
            case "unlimitedPin":
              if ("boolean" != typeof n)
                throw new h.WPPError(
                  "unlimitedPin_error",
                  "Value type invalid!"
                );
              return (g = n || void 0), n;
            default:
              throw new h.WPPError("setLimit_error", "Key type invalid!");
          }
        };
        const h = b(62857);
        a = l(b(1132));
        const e = b(14647),
          d = b(54993),
          c = b(52757);
        let g;
        a.onFullReady(() => {
          (0, d.wrapModuleFunction)(c.getNumChatsPinned, (m, ...n) => {
            m = m(...n);
            return g ? 1 : m;
          });
        });
      },
      15610: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMultiDevice = function (k = !0) {
          k ? f.Cmd.upgradeToMDProd() : f.Cmd.downgradeWebclient();
          return !0;
        };
        const f = b(14647);
      },
      72927: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(58293);
        b(51369);
        l(b(60397), a);
        l(b(14282), a);
      },
      51369: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a = l(b(1132));
        const h = b(14647);
        a.onInjected(() => {
          h.IsOfficialClient.isOfficialClient = !0;
        });
      },
      14282: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
      },
      93037: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = async function (h) {
          h = (0, f.assertWid)(h);
          return k.ContactStore.get(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      49738: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getBusinessProfile = async function (h) {
          h = (0, f.assertWid)(h);
          return await k.BusinessProfileStore.fetchBizProfile(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      81676: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getCommonGroups = async function (k) {
          return (k = f.ContactStore.get(k))
            ? (await f.functions.findCommonGroups(k))
                .getModelsArray()
                .map((h) => h.id)
            : [];
        };
        const f = b(14647);
      },
      73871: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getProfilePictureUrl = async function (h, e = !0) {
          h = (0, f.assertWid)(h);
          if ((h = await k.ProfilePicThumbStore.find(h)))
            return e ? h.imgFull : h.img;
        };
        const f = b(41687),
          k = b(14647);
      },
      23199: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getStatus = async function (e) {
          e = (0, f.assertWid)(e);
          return (await (0, h.queryExists)(e))
            ? (await k.StatusStore.find(e)).status || null
            : null;
        };
        const f = b(41687),
          k = b(14647),
          h = b(53141);
      },
      20941: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.unsubscribePresence =
          a.subscribePresence =
          a.queryExists =
          a.list =
          a.getStatus =
          a.getProfilePictureUrl =
          a.getCommonGroups =
          a.getBusinessProfile =
          a.get =
            void 0;
        var f = b(93037);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return f.get;
          },
        });
        var k = b(49738);
        Object.defineProperty(a, "getBusinessProfile", {
          enumerable: !0,
          get: function () {
            return k.getBusinessProfile;
          },
        });
        var h = b(81676);
        Object.defineProperty(a, "getCommonGroups", {
          enumerable: !0,
          get: function () {
            return h.getCommonGroups;
          },
        });
        var e = b(73871);
        Object.defineProperty(a, "getProfilePictureUrl", {
          enumerable: !0,
          get: function () {
            return e.getProfilePictureUrl;
          },
        });
        var d = b(23199);
        Object.defineProperty(a, "getStatus", {
          enumerable: !0,
          get: function () {
            return d.getStatus;
          },
        });
        var c = b(62041);
        Object.defineProperty(a, "list", {
          enumerable: !0,
          get: function () {
            return c.list;
          },
        });
        var g = b(53141);
        Object.defineProperty(a, "queryExists", {
          enumerable: !0,
          get: function () {
            return g.queryExists;
          },
        });
        var m = b(316);
        Object.defineProperty(a, "subscribePresence", {
          enumerable: !0,
          get: function () {
            return m.subscribePresence;
          },
        });
        var n = b(17485);
        Object.defineProperty(a, "unsubscribePresence", {
          enumerable: !0,
          get: function () {
            return n.unsubscribePresence;
          },
        });
      },
      62041: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.list = async function (k = {}) {
          let h = f.ContactStore.getModelsArray().slice();
          k.onlyMyContacts && (h = h.filter((e) => e.isMyContact));
          if (k.withLabels) {
            const e = k.withLabels.map((d) => {
              const c = f.LabelStore.findFirst((g) => g.name === d);
              return c ? c.id : d;
            });
            h = h.filter((d) => {
              var c;
              return null === (c = d.labels) || void 0 === c
                ? void 0
                : c.some((g) => e.includes(g));
            });
          }
          return h;
        };
        const f = b(14647);
      },
      53141: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.queryExists = async function (e) {
          var d, c, g, m, n;
          e = (0, f.assertWid)(e);
          const p = e.toString();
          if (h.has(p)) return h.get(p);
          var r = new k.USyncUser();
          const t = new k.USyncQuery();
          e.toString().includes("@lid")
            ? r.withId(e)
            : (t.withContactProtocol(), r.withPhone("+" + p));
          t.withUser(r);
          t.withBusinessProtocol();
          t.withDisappearingModeProtocol();
          t.withStatusProtocol();
          t.withLidProtocol();
          e = await t.execute();
          r = null;
          ((null === (d = null == e ? void 0 : e.error) || void 0 === d
            ? 0
            : d.all) ||
            (null === (c = null == e ? void 0 : e.error) || void 0 === c
              ? 0
              : c.contact)) &&
            (r = null);
          Array.isArray(e.list)
            ? ((r = e.list[0]),
              (r =
                "out" ===
                (null === (g = null == r ? void 0 : r.contact) || void 0 === g
                  ? void 0
                  : g.type)
                  ? null
                  : {
                      wid: r.id,
                      biz: void 0 !== r.business,
                      bizInfo: r.business,
                      disappearingMode:
                        void 0 !== r.disappearing_mode
                          ? {
                              duration:
                                null === (m = r.disappearing_mode) ||
                                void 0 === m
                                  ? void 0
                                  : m.duration,
                              settingTimestamp:
                                null === (n = r.disappearing_mode) ||
                                void 0 === n
                                  ? void 0
                                  : n.t,
                            }
                          : void 0,
                      status: r.status,
                    }))
            : (r = null);
          h.set(p, r);
          return (
            setTimeout(
              () => {
                h.delete(p);
              },
              r ? 3e5 : 15e3
            ),
            r
          );
        };
        const f = b(41687),
          k = b(14647),
          h = new Map();
      },
      316: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.subscribePresence = async function (h) {
          Array.isArray(h) || (h = [h]);
          const e = [];
          for (const d of h)
            try {
              const c = f.WidFactory.createWid(d);
              (await (0, k.subscribePresence)(c), f.PresenceStore.get(c)) ||
                (await f.PresenceStore.find(c));
              e.push(c);
            } catch (c) {}
          return e;
        };
        const f = b(14647),
          k = b(52757);
      },
      17485: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.unsubscribePresence = async function (k) {
          Array.isArray(k) || (k = [k]);
          const h = [];
          for (const e of k) {
            k = f.WidFactory.createWid(e);
            const d = f.PresenceStore.get(k);
            d ? (d.delete(), h.push(k)) : h.push(k);
          }
          return h;
        };
        const f = b(14647);
      },
      56191: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(54409);
        l(b(20941), a);
      },
      54409: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a = l(b(1132));
        const h = b(14647);
        a.onInjected(function () {
          const e = {
            isMyContact: h.functions.getIsMyContact,
            mentionName: h.functions.getMentionName,
            notifyName: h.functions.getNotifyName,
            pnForLid: h.functions.getPnForLid,
            displayNameOrPnForLid: h.functions.getDisplayNameOrPnForLid,
            formattedPhone: h.functions.getFormattedPhone,
            userid: h.functions.getUserid,
            userhash: h.functions.getUserhash,
            searchName: h.functions.getSearchName,
            searchVerifiedName: h.functions.getSearchVerifiedName,
            header: h.functions.getHeader,
            isMe: h.functions.getIsMe,
            isUser: h.functions.getIsUser,
            isGroup: h.functions.getIsGroup,
            isBroadcast: h.functions.getIsBroadcast,
            isPSA: h.functions.getIsPSA,
            isIAS: h.functions.getIsIAS,
            isSupportAccount: h.functions.getIsSupportAccount,
            formattedShortNameWithNonBreakingSpaces:
              h.functions.getFormattedShortNameWithNonBreakingSpaces,
            formattedShortName: h.functions.getFormattedShortName,
            formattedName: h.functions.getFormattedName,
            formattedUser: h.functions.getFormattedUser,
            isWAContact: h.functions.getIsWAContact,
            canRequestPhoneNumber: h.functions.getCanRequestPhoneNumber,
            showBusinessCheckmarkAsPrimary:
              h.functions.getShowBusinessCheckmarkAsPrimary,
            showBusinessCheckmarkAsSecondary:
              h.functions.getShowBusinessCheckmarkAsSecondary,
            showBusinessCheckmarkInChatlist:
              h.functions.getShowBusinessCheckmarkInChatlist,
            isDisplayNameApproved: h.functions.getIsDisplayNameApproved,
            shouldForceBusinessUpdate: h.functions.getShouldForceBusinessUpdate,
          };
          for (const d in e) {
            const c = e[d];
            void 0 === h.ContactModel.prototype[d] &&
              Object.defineProperty(h.ContactModel.prototype, d, {
                get: function () {
                  return c(this);
                },
                configurable: !0,
              });
          }
        });
      },
      80687: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(91491),
          e = l(b(1132));
        e.onInjected(() => {
          if (h.config.deviceName) {
            var d = e.search((c) => c.default.info && c.default.hardRefresh);
            if (d) {
              const c = d.default.info();
              c.os = h.config.deviceName;
              c.version = void 0;
              c.name = void 0;
              c.ua = void 0;
              d.default.info = () => c;
            }
          }
        });
      },
      83734: (l, a) => {
        var b, f;
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.PrivacyDisallowedListType = a.TextFontStyle = void 0;
        (function (k) {
          k[(k.SANS_SERIF = 0)] = "SANS_SERIF";
          k[(k.SERIF = 1)] = "SERIF";
          k[(k.NORICAN_REGULAR = 2)] = "NORICAN_REGULAR";
          k[(k.BRYNDAN_WRITE = 3)] = "BRYNDAN_WRITE";
          k[(k.BEBASNEUE_REGULAR = 4)] = "BEBASNEUE_REGULAR";
          k[(k.OSWALD_HEAVY = 5)] = "OSWALD_HEAVY";
        })(b || (a.TextFontStyle = b = {}));
        (function (k) {
          k.About = "status";
          k.GroupAdd = "groupadd";
          k.LastSeen = "last";
          k.ProfilePicture = "profile";
        })(f || (a.PrivacyDisallowedListType = f = {}));
      },
      78601: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(53011);
        a.EventEmitter = l.EventEmitter2;
      },
      11426: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
      },
      13691: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (d, c, g, m) {
                void 0 === m && (m = g);
                var n = Object.getOwnPropertyDescriptor(c, g);
                (n &&
                  ("get" in n
                    ? c.__esModule
                    : !n.writable && !n.configurable)) ||
                  (n = {
                    enumerable: !0,
                    get: function () {
                      return c[g];
                    },
                  });
                Object.defineProperty(d, m, n);
              }
            : function (d, c, g, m) {
                void 0 === m && (m = g);
                d[m] = c[g];
              });
        l =
          (this && this.__exportStar) ||
          function (d, c) {
            for (var g in d)
              "default" === g ||
                Object.prototype.hasOwnProperty.call(c, g) ||
                f(c, d, g);
          };
        var k =
          (this && this.__importDefault) ||
          function (d) {
            return d && d.__esModule ? d : { default: d };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.waitFor =
          a.stopListeningTo =
          a.setMaxListeners =
          a.removeListener =
          a.removeAllListeners =
          a.prependOnceListener =
          a.prependMany =
          a.prependListener =
          a.prependAny =
          a.once =
          a.onAny =
          a.on =
          a.offAny =
          a.off =
          a.many =
          a.listenersAny =
          a.listeners =
          a.listenerCount =
          a.listenTo =
          a.hasListeners =
          a.getMaxListeners =
          a.eventNames =
          a.emitAsync =
          a.emit =
          a.addListener =
          a.EventEmitter =
          a.ev =
          a.internalEv =
            void 0;
        k = k(b(17833));
        const h = b(78601);
        Object.defineProperty(a, "EventEmitter", {
          enumerable: !0,
          get: function () {
            return h.EventEmitter;
          },
        });
        l(b(11426), a);
        const e = (0, k.default)("WA-JS:event");
        a.internalEv = new h.EventEmitter({ maxListeners: 1 / 0 });
        a.ev = new h.EventEmitter({ maxListeners: 1 / 0 });
        a.internalEv.onAny((d, ...c) => {
          a.ev.emit(d, ...c);
          e.enabled && e(d, ...c);
        });
        a.addListener = a.ev.addListener.bind(a.ev);
        a.emit = a.ev.emit.bind(a.ev);
        a.emitAsync = a.ev.emitAsync.bind(a.ev);
        a.eventNames = a.ev.eventNames.bind(a.ev);
        a.getMaxListeners = a.ev.getMaxListeners.bind(a.ev);
        a.hasListeners = a.ev.hasListeners.bind(a.ev);
        a.listenTo = a.ev.listenTo.bind(a.ev);
        a.listenerCount = a.ev.listenerCount.bind(a.ev);
        a.listeners = a.ev.listeners.bind(a.ev);
        a.listenersAny = a.ev.listenersAny.bind(a.ev);
        a.many = a.ev.many.bind(a.ev);
        a.off = a.ev.off.bind(a.ev);
        a.offAny = a.ev.offAny.bind(a.ev);
        a.on = a.ev.on.bind(a.ev);
        a.onAny = a.ev.onAny.bind(a.ev);
        a.once = a.ev.once.bind(a.ev);
        a.prependAny = a.ev.prependAny.bind(a.ev);
        a.prependListener = a.ev.prependListener.bind(a.ev);
        a.prependMany = a.ev.prependMany.bind(a.ev);
        a.prependOnceListener = a.ev.prependOnceListener.bind(a.ev);
        a.removeAllListeners = a.ev.removeAllListeners.bind(a.ev);
        a.removeListener = a.ev.removeListener.bind(a.ev);
        a.setMaxListeners = a.ev.setMaxListeners.bind(a.ev);
        a.stopListeningTo = a.ev.stopListeningTo.bind(a.ev);
        a.waitFor = a.ev.waitFor.bind(a.ev);
      },
      86288: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(39893);
      },
      39893: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(54993),
          d = b(52757);
        a.onFullReady(function () {
          const c = ["add", "remove", "demote", "promote"];
          (0, e.wrapModuleFunction)(d.updateDBForGroupAction, (g, ...m) => {
            const [n, p] = m;
            let r = p.actionType || p.action;
            return (
              c.includes(r) &&
                queueMicrotask(() => {
                  var t;
                  const v = p.participants.map((x) => ("id" in x ? x.id : x));
                  "add" !== r || (!p.isInvite && "invite" !== p.reason)
                    ? "remove" === r &&
                      v.some((x) => x.equals(n.author)) &&
                      (r = "leave")
                    : (r = "join");
                  h.internalEv.emit("group.participant_changed", {
                    author:
                      null === (t = n.author) || void 0 === t
                        ? void 0
                        : t.toString(),
                    authorPushName: n.pushname,
                    groupId: n.chatId.toString(),
                    action: r,
                    operation: p.actionType || p.action,
                    participants: v.map((x) => x.toString()),
                  });
                }),
              g(...m)
            );
          });
        });
      },
      7103: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.addParticipants = async function (c, g) {
          var m, n;
          const { groupChat: p, participants: r } = await (0,
          e.ensureGroupAndParticipants)(c, g, !0);
          var t = [];
          t = (0, f.compare)(self.Debug.VERSION, "2.2320.0", ">=")
            ? (
                null === (m = p.groupMetadata) || void 0 === m
                  ? 0
                  : m.isLidAddressingMode
              )
              ? r.map((v) => ({
                  phoneNumber: v.id,
                  lid: h.functions.getCurrentLid(v.id),
                }))
              : r.map((v) => ({ phoneNumber: v.id }))
            : (
                null === (n = p.groupMetadata) || void 0 === n
                  ? 0
                  : n.isLidAddressingMode
              )
            ? r.map((v) => h.functions.getCurrentLid(v.id))
            : r.map((v) => v.id);
          m = await h.functions.sendAddParticipants(p.id, t);
          if (m.status >= 400)
            throw new k.WPPError(
              "group_add_participant_error",
              "Failed to add participants to the group",
              { groupId: c, participantsIds: g }
            );
          c = {};
          for (const v of m.participants || []) {
            t = n = m = g = null;
            "userWid" in v
              ? ((g = v.userWid.toString()),
                (m = v.code),
                (n = v.invite_code),
                (t = v.invite_code_exp))
              : ((g = Object.keys(v)[0]),
                (t = v[g]),
                (m = t.code),
                (n = t.invite_code),
                (t = t.invite_code_exp));
            if ("403" !== m)
              try {
                h.ContactStore.gadd((0, k.createWid)(g), { silent: !0 });
              } catch (x) {}
            c[g] = {
              wid: g,
              code: Number(m),
              message: d[Number(m)] || "Can't Join., unknown error",
              invite_code: n,
              invite_code_exp: Number(t) || null,
            };
          }
          return c;
        };
        const f = b(38385),
          k = b(62857),
          h = b(14647),
          e = b(97944),
          d = {
            200: "OK",
            403: "Can't join this group because the number was restricted it.",
            409: "Can't join this group because the number is already a member of it.",
            421: "Member not added, awaiting approval!",
          };
      },
      57139: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.approve = async function (e, d) {
          e = (0, f.assertWid)(e);
          Array.isArray(d) || (d = [d]);
          d = d.map(f.assertWid);
          try {
            return await (0, h.membershipApprovalRequestAction)(
              e,
              d,
              "Approve"
            );
          } catch (c) {
            throw new k.WPPError(
              "error_on_accept_membership_request",
              `Error on accept member on group ${e.toString()}`
            );
          }
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757);
      },
      71637: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canAdd = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.canAdd();
        };
        const f = b(2818);
      },
      976: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canDemote = async function (k, h) {
          const { groupChat: e, participants: d } = await (0,
          f.ensureGroupAndParticipants)(k, h);
          return d.every((c) => e.groupMetadata.participants.canDemote(c));
        };
        const f = b(2818);
      },
      88818: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canPromote = async function (k, h) {
          const { groupChat: e, participants: d } = await (0,
          f.ensureGroupAndParticipants)(k, h);
          return d.every((c) => e.groupMetadata.participants.canPromote(c));
        };
        const f = b(2818);
      },
      8932: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.canRemove = async function (k, h) {
          const { groupChat: e, participants: d } = await (0,
          f.ensureGroupAndParticipants)(k, h);
          return d.every((c) => e.groupMetadata.participants.canRemove(c));
        };
        const f = b(2818);
      },
      20292: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (n, p, r, t) {
                  void 0 === t && (t = r);
                  var v = Object.getOwnPropertyDescriptor(p, r);
                  (v &&
                    ("get" in v
                      ? p.__esModule
                      : !v.writable && !v.configurable)) ||
                    (v = {
                      enumerable: !0,
                      get: function () {
                        return p[r];
                      },
                    });
                  Object.defineProperty(n, t, v);
                }
              : function (n, p, r, t) {
                  void 0 === t && (t = r);
                  n[t] = p[r];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (n, p) {
                  Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: p,
                  });
                }
              : function (n, p) {
                  n.default = p;
                });
        l =
          (this && this.__importStar) ||
          function (n) {
            if (n && n.__esModule) return n;
            var p = {};
            if (null != n)
              for (var r in n)
                "default" !== r &&
                  Object.prototype.hasOwnProperty.call(n, r) &&
                  f(p, n, r);
            return k(p, n), p;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.create = async function (n, p, r) {
          var t;
          Array.isArray(p) || (p = [p]);
          var v = p.map(h.assertWid),
            x = g.UserPrefs.getMaybeMeUser();
          p = [];
          for (var B of v)
            if (!x.equals(B))
              if ((v = g.ContactStore.get(B))) p.push(v.id);
              else {
                v = await d.queryExists(B);
                if (!v)
                  throw new c.WPPError(
                    "participant_not_exists",
                    "Participant not exists",
                    { id: B }
                  );
                x.equals(v.wid) || p.push(v.wid);
              }
          r = r ? (0, h.assertWid)(r) : void 0;
          n = await m.sendCreateGroup(n, p, void 0, r);
          if (n.gid) {
            const F = await e.find(n.gid);
            !1 !==
              (null === (t = F.groupMetadata) || void 0 === t
                ? void 0
                : t.stale) &&
              (await new Promise((L) => {
                F.on("change:groupMetadata.stale", function T() {
                  var V;
                  !1 ===
                    (null === (V = F.groupMetadata) || void 0 === V
                      ? void 0
                      : V.stale) &&
                    (L(), F.off("change:groupMetadata.stale", T));
                });
              }));
          }
          t = {};
          for (const F of n.participants || [])
            (x = B = p = r = null),
              "userWid" in F
                ? ((r = F.userWid.toString()),
                  (p = F.code),
                  (B = F.invite_code),
                  (x = F.invite_code_exp))
                : ((r = Object.keys(F)[0]),
                  (x = F[r]),
                  (p = x.code),
                  (B = x.invite_code),
                  (x = x.invite_code_exp)),
              (t[r] = {
                wid: r,
                code: Number(p),
                invite_code: B,
                invite_code_exp: Number(x) || null,
              });
          return { gid: n.gid, participants: t };
        };
        const h = b(41687),
          e = l(b(74023)),
          d = l(b(56191)),
          c = b(62857),
          g = b(14647),
          m = l(b(52757));
      },
      42490: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.demoteParticipants = async function (c, g) {
          const { groupChat: m, participants: n } = await (0,
          d.ensureGroupAndParticipants)(c, g);
          if (
            n.some((p) => {
              var r;
              return !(null === (r = m.groupMetadata) || void 0 === r
                ? 0
                : r.participants.canDemote(p));
            })
          )
            throw new h.WPPError(
              "group_participant_is_already_not_a_group_admin",
              `Group ${m.id._serialized}: Group participant is already not a group admin`
            );
          return e.demoteParticipants(m, n);
        };
        const h = b(62857),
          e = l(b(52757)),
          d = b(97944);
      },
      23527: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.ensureGroup = async function (d, c = !1) {
          const g = (0, f.assertGetChat)(d);
          if (!g.isGroup)
            throw new k.WPPError(
              "not_a_group",
              `Chat ${g.id._serialized} is not a group`
            );
          const m = await h.GroupMetadataStore.find(g.id);
          if (
            c &&
            !(await (0, e.iAmAdmin)(d)) &&
            "all_member_add" !== m.memberAddMode
          )
            throw new k.WPPError(
              "group_you_are_not_admin",
              `You are not admin in ${g.id._serialized}`
            );
          return g;
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(2818);
      },
      97944: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.ensureGroupAndParticipants = async function (d, c, g = !1) {
          const m = await (0, e.ensureGroup)(d, !0);
          Array.isArray(c) || (c = [c]);
          d = c.map(f.assertWid).map((n) => {
            var p;
            let r =
              null === (p = m.groupMetadata) || void 0 === p
                ? void 0
                : p.participants.get(n);
            if ((!r && g && (r = new h.ParticipantModel({ id: n })), !r))
              throw new k.WPPError(
                "group_participant_not_found",
                `Group ${m.id._serialized}: Participant '${r}' not found`
              );
            return r;
          });
          return { groupChat: m, participants: d };
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(2818);
      },
      26219: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getAllGroups = async function () {
          const h = [],
            e = await (0, k.queryAllGroups)();
          for (const d of e) h.push((0, f.get)(d.id));
          return h;
        };
        const f = b(74023),
          k = b(52757);
      },
      45195: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getGroupInfoFromInviteCode = async function (h) {
          var e, d, c;
          h = (h = (h = (h = h.replace("chat.whatsapp.com/", "")).replace(
            "invite/",
            ""
          )).replace("https://", "")).replace("http://", "");
          const g = await (0, k.sendQueryGroupInvite)(h).catch(() => null);
          if (!g)
            throw new f.WPPError("invalid_invite_code", "Invalid Invite Code", {
              inviteCode: h,
            });
          return Object.assign(Object.assign({}, g), {
            descOwner:
              null === (e = g.descOwner) || void 0 === e
                ? void 0
                : e.toString(),
            id: g.id.toString(),
            owner:
              null === (d = g.owner) || void 0 === d ? void 0 : d.toString(),
            participants: g.participants.map((m) =>
              Object.assign(Object.assign({}, m), { id: m.id.toString() })
            ),
            subjectOwner:
              null === (c = g.subjectOwner) || void 0 === c
                ? void 0
                : c.toString(),
          });
        };
        const f = b(62857),
          k = b(52757);
      },
      98083: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getGroupSizeLimit = async function () {
          return f.functions.getGroupSizeLimit();
        };
        const f = b(14647);
      },
      55062: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getInviteCode = async function (h) {
          h = await (0, k.ensureGroup)(h, !0);
          return await (0, f.sendQueryGroupInviteCode)(h.id);
        };
        const f = b(52757),
          k = b(2818);
      },
      4752: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMembershipRequests = async function (e) {
          return (
            (e = (0, f.assertWid)(e)),
            await k.GroupMetadataStore.find(e),
            await (0, h.getMembershipApprovalRequests)(e)
          );
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757);
      },
      35528: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getParticipants = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.getModelsArray();
        };
        const f = b(2818);
      },
      21268: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getPastParticipants = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.pastParticipants.getModelsArray();
        };
        const f = b(2818);
      },
      68780: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.iAmAdmin = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.iAmAdmin();
        };
        const f = b(2818);
      },
      60641: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.iAmMember = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.iAmMember();
        };
        const f = b(2818);
      },
      81484: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.iAmRestrictedMember = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.iAmRestrictedMember();
        };
        const f = b(2818);
      },
      94173: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.iAmSuperAdmin = async function (k) {
          return (
            await (0, f.ensureGroup)(k)
          ).groupMetadata.participants.iAmMember();
        };
        const f = b(2818);
      },
      2818: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setSubject =
          a.setProperty =
          a.GroupProperty =
          a.setIcon =
          a.setDescription =
          a.revokeInviteCode =
          a.removeParticipants =
          a.removeIcon =
          a.reject =
          a.promoteParticipants =
          a.leave =
          a.join =
          a.iAmSuperAdmin =
          a.iAmRestrictedMember =
          a.iAmMember =
          a.iAmAdmin =
          a.getPastParticipants =
          a.getParticipants =
          a.getMembershipRequests =
          a.getInviteCode =
          a.getGroupSizeLimit =
          a.getGroupInfoFromInviteCode =
          a.getAllGroups =
          a.ensureGroupAndParticipants =
          a.ensureGroup =
          a.demoteParticipants =
          a.create =
          a.canRemove =
          a.canPromote =
          a.canDemote =
          a.canAdd =
          a.approve =
          a.addParticipants =
            void 0;
        var f = b(7103);
        Object.defineProperty(a, "addParticipants", {
          enumerable: !0,
          get: function () {
            return f.addParticipants;
          },
        });
        var k = b(57139);
        Object.defineProperty(a, "approve", {
          enumerable: !0,
          get: function () {
            return k.approve;
          },
        });
        var h = b(71637);
        Object.defineProperty(a, "canAdd", {
          enumerable: !0,
          get: function () {
            return h.canAdd;
          },
        });
        var e = b(976);
        Object.defineProperty(a, "canDemote", {
          enumerable: !0,
          get: function () {
            return e.canDemote;
          },
        });
        var d = b(88818);
        Object.defineProperty(a, "canPromote", {
          enumerable: !0,
          get: function () {
            return d.canPromote;
          },
        });
        var c = b(8932);
        Object.defineProperty(a, "canRemove", {
          enumerable: !0,
          get: function () {
            return c.canRemove;
          },
        });
        var g = b(20292);
        Object.defineProperty(a, "create", {
          enumerable: !0,
          get: function () {
            return g.create;
          },
        });
        var m = b(42490);
        Object.defineProperty(a, "demoteParticipants", {
          enumerable: !0,
          get: function () {
            return m.demoteParticipants;
          },
        });
        var n = b(23527);
        Object.defineProperty(a, "ensureGroup", {
          enumerable: !0,
          get: function () {
            return n.ensureGroup;
          },
        });
        var p = b(97944);
        Object.defineProperty(a, "ensureGroupAndParticipants", {
          enumerable: !0,
          get: function () {
            return p.ensureGroupAndParticipants;
          },
        });
        var r = b(26219);
        Object.defineProperty(a, "getAllGroups", {
          enumerable: !0,
          get: function () {
            return r.getAllGroups;
          },
        });
        var t = b(45195);
        Object.defineProperty(a, "getGroupInfoFromInviteCode", {
          enumerable: !0,
          get: function () {
            return t.getGroupInfoFromInviteCode;
          },
        });
        var v = b(98083);
        Object.defineProperty(a, "getGroupSizeLimit", {
          enumerable: !0,
          get: function () {
            return v.getGroupSizeLimit;
          },
        });
        var x = b(55062);
        Object.defineProperty(a, "getInviteCode", {
          enumerable: !0,
          get: function () {
            return x.getInviteCode;
          },
        });
        var B = b(4752);
        Object.defineProperty(a, "getMembershipRequests", {
          enumerable: !0,
          get: function () {
            return B.getMembershipRequests;
          },
        });
        var F = b(35528);
        Object.defineProperty(a, "getParticipants", {
          enumerable: !0,
          get: function () {
            return F.getParticipants;
          },
        });
        var L = b(21268);
        Object.defineProperty(a, "getPastParticipants", {
          enumerable: !0,
          get: function () {
            return L.getPastParticipants;
          },
        });
        var J = b(68780);
        Object.defineProperty(a, "iAmAdmin", {
          enumerable: !0,
          get: function () {
            return J.iAmAdmin;
          },
        });
        var T = b(60641);
        Object.defineProperty(a, "iAmMember", {
          enumerable: !0,
          get: function () {
            return T.iAmMember;
          },
        });
        var V = b(81484);
        Object.defineProperty(a, "iAmRestrictedMember", {
          enumerable: !0,
          get: function () {
            return V.iAmRestrictedMember;
          },
        });
        var W = b(94173);
        Object.defineProperty(a, "iAmSuperAdmin", {
          enumerable: !0,
          get: function () {
            return W.iAmSuperAdmin;
          },
        });
        var R = b(84784);
        Object.defineProperty(a, "join", {
          enumerable: !0,
          get: function () {
            return R.join;
          },
        });
        var ba = b(3329);
        Object.defineProperty(a, "leave", {
          enumerable: !0,
          get: function () {
            return ba.leave;
          },
        });
        var Z = b(10964);
        Object.defineProperty(a, "promoteParticipants", {
          enumerable: !0,
          get: function () {
            return Z.promoteParticipants;
          },
        });
        var M = b(28703);
        Object.defineProperty(a, "reject", {
          enumerable: !0,
          get: function () {
            return M.reject;
          },
        });
        var K = b(34697);
        Object.defineProperty(a, "removeIcon", {
          enumerable: !0,
          get: function () {
            return K.removeIcon;
          },
        });
        var N = b(84054);
        Object.defineProperty(a, "removeParticipants", {
          enumerable: !0,
          get: function () {
            return N.removeParticipants;
          },
        });
        var P = b(43930);
        Object.defineProperty(a, "revokeInviteCode", {
          enumerable: !0,
          get: function () {
            return P.revokeInviteCode;
          },
        });
        var X = b(29166);
        Object.defineProperty(a, "setDescription", {
          enumerable: !0,
          get: function () {
            return X.setDescription;
          },
        });
        var y = b(99403);
        Object.defineProperty(a, "setIcon", {
          enumerable: !0,
          get: function () {
            return y.setIcon;
          },
        });
        var A = b(76131);
        Object.defineProperty(a, "GroupProperty", {
          enumerable: !0,
          get: function () {
            return A.GroupProperty;
          },
        });
        Object.defineProperty(a, "setProperty", {
          enumerable: !0,
          get: function () {
            return A.setProperty;
          },
        });
        var D = b(36520);
        Object.defineProperty(a, "setSubject", {
          enumerable: !0,
          get: function () {
            return D.setSubject;
          },
        });
      },
      84784: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.join = async function (k) {
          k = (k = (k = (k = k.replace("chat.whatsapp.com/", "")).replace(
            "invite/",
            ""
          )).replace("https://", "")).replace("http://", "");
          return { id: (await (0, f.sendJoinGroupViaInvite)(k)).toString() };
        };
        const f = b(52757);
      },
      3329: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.leave = async function (h) {
          h = await (0, k.ensureGroup)(h);
          return await (0, f.sendExitGroup)(h);
        };
        const f = b(52757),
          k = b(2818);
      },
      10964: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.promoteParticipants = async function (c, g) {
          const { groupChat: m, participants: n } = await (0,
          d.ensureGroupAndParticipants)(c, g);
          if (
            n.some((p) => {
              var r;
              return !(null === (r = m.groupMetadata) || void 0 === r
                ? 0
                : r.participants.canPromote(p));
            })
          )
            throw new h.WPPError(
              "group_participant_is_already_a_group_admin",
              `Group ${m.id._serialized}: Group participant is already a group admin`
            );
          return e.promoteParticipants(m, n);
        };
        const h = b(62857),
          e = l(b(52757)),
          d = b(97944);
      },
      28703: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.reject = async function (e, d) {
          e = (0, f.assertWid)(e);
          Array.isArray(d) || (d = [d]);
          d = d.map(f.assertWid);
          try {
            return await (0, h.membershipApprovalRequestAction)(e, d, "Reject");
          } catch (c) {
            throw new k.WPPError(
              "error_on_reject_membership_request",
              `Error on reject member on group ${e.toString()}`
            );
          }
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757);
      },
      34697: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeIcon = async function (h) {
          h = await (0, k.ensureGroup)(h);
          return 200 === (await f.functions.requestDeletePicture(h.id)).status;
        };
        const f = b(14647),
          k = b(2818);
      },
      84054: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (m, n, p, r) {
                  void 0 === r && (r = p);
                  var t = Object.getOwnPropertyDescriptor(n, p);
                  (t &&
                    ("get" in t
                      ? n.__esModule
                      : !t.writable && !t.configurable)) ||
                    (t = {
                      enumerable: !0,
                      get: function () {
                        return n[p];
                      },
                    });
                  Object.defineProperty(m, r, t);
                }
              : function (m, n, p, r) {
                  void 0 === r && (r = p);
                  m[r] = n[p];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (m, n) {
                  Object.defineProperty(m, "default", {
                    enumerable: !0,
                    value: n,
                  });
                }
              : function (m, n) {
                  m.default = n;
                });
        l =
          (this && this.__importStar) ||
          function (m) {
            if (m && m.__esModule) return m;
            var n = {};
            if (null != m)
              for (var p in m)
                "default" !== p &&
                  Object.prototype.hasOwnProperty.call(m, p) &&
                  f(n, m, p);
            return k(n, m), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeParticipants = async function (m, n) {
          Array.isArray(n) || (n = [n]);
          const p = await (0, c.ensureGroup)(m, !0),
            r = [];
          if (
            (n.map(h.assertWid).map((t) => {
              var v;
              (null === (v = p.groupMetadata) || void 0 === v
                ? 0
                : v.participants.get(t)) && r.push(t);
            }),
            0 === r.length)
          )
            throw new e.WPPError(
              "not_valid_group_participants",
              `No valid participants found for the group ${m}`
            );
          ({ participants: m } = await (0, g.ensureGroupAndParticipants)(m, r));
          if (
            m.some((t) => {
              var v;
              return !(null === (v = p.groupMetadata) || void 0 === v
                ? 0
                : v.participants.canRemove(t));
            })
          )
            throw new e.WPPError(
              "group_participant_is_not_a_group_member",
              `Group ${p.id._serialized}: Group participant is not a group member`
            );
          return d.removeParticipants(p, m);
        };
        const h = b(41687),
          e = b(62857),
          d = l(b(52757)),
          c = b(23527),
          g = b(97944);
      },
      43930: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.revokeInviteCode = async function (h) {
          h = await (0, k.ensureGroup)(h, !0);
          return await (0, f.sendRevokeGroupInviteCode)(h.id);
        };
        const f = b(52757),
          k = b(2818);
      },
      29166: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setDescription = async function (e, d) {
          var c, g;
          e = await (0, h.ensureGroup)(e);
          if (
            null === (c = e.groupMetadata) ||
            void 0 === c ||
            !c.canSetDescription()
          )
            throw new f.WPPError(
              "you_are_not_allowed_set_group_description",
              `You are not allowed to set group description in ${e.id._serialized}`,
              { groupId: e.id.toString() }
            );
          c = await Promise.resolve((0, k.randomMessageId)());
          return (
            await (0, k.sendSetGroupDescription)(
              e.id,
              d,
              c,
              null === (g = e.groupMetadata) || void 0 === g ? void 0 : g.descId
            ),
            (e.groupMetadata.descId = c),
            (e.groupMetadata.desc = d),
            !0
          );
        };
        const f = b(62857),
          k = b(52757),
          h = b(2818);
      },
      99403: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setIcon = async function (e, d) {
          const c = await (0, h.ensureGroup)(e);
          if (await (0, h.iAmRestrictedMember)(e))
            throw new f.WPPError(
              "group_you_are_restricted_member",
              `You are a restricted member in ${c.id._serialized}`
            );
          d = await (0, f.convertToFile)(d);
          e = await (0, f.resizeImage)(d, {
            width: 96,
            height: 96,
            mimeType: "image/jpeg",
            resize: "cover",
          });
          d = await (0, f.resizeImage)(d, {
            width: 640,
            height: 640,
            mimeType: "image/jpeg",
            resize: "cover",
          });
          e = await (0, f.blobToBase64)(e);
          d = await (0, f.blobToBase64)(d);
          return (0, k.sendSetPicture)(c.id, e, d);
        };
        const f = b(62857),
          k = b(52757),
          h = b(2818);
      },
      76131: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.GroupProperty = void 0;
        a.setProperty = async function (d, c, g) {
          var m, n;
          d = await (0, h.ensureGroup)(d);
          if (
            c !== e.ANNOUNCEMENT &&
            (null === (m = d.groupMetadata) ||
              void 0 === m ||
              !m.canSetGroupProperty())
          )
            throw new f.WPPError(
              "you_are_not_allowed_set_group_property",
              `You are not allowed to set property in ${d.id._serialized}`,
              { groupId: d.id.toString() }
            );
          if (
            c == e.ANNOUNCEMENT &&
            (null === (n = d.groupMetadata) ||
              void 0 === n ||
              !n.canSetEphemeralSetting())
          )
            throw new f.WPPError(
              "you_are_not_allowed_set_ephemeral_setting",
              `You are not allowed to set ephemeral setting in ${d.id._serialized}`,
              { groupId: d.id.toString() }
            );
          if (c === e.EPHEMERAL) {
            if (
              (("boolean" != typeof g && 1 !== g) || (g = 604800),
              ![0, 86400, 604800, 7776e3].includes(g))
            )
              throw new f.WPPError(
                "invalid_ephemeral_duration",
                "Invalid ephemeral duration",
                { value: g }
              );
          } else g = g ? 1 : 0;
          return await (0, k.sendSetGroupProperty)(d.id, c, g), !0;
        };
        const f = b(62857),
          k = b(52757),
          h = b(2818);
        var e;
        !(function (d) {
          d.ANNOUNCEMENT = "announcement";
          d.EPHEMERAL = "ephemeral";
          d.RESTRICT = "restrict";
        })(e || (a.GroupProperty = e = {}));
      },
      36520: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setSubject = async function (e, d) {
          var c;
          e = await (0, h.ensureGroup)(e);
          if (
            null === (c = e.groupMetadata) ||
            void 0 === c ||
            !c.canSetSubject()
          )
            throw new f.WPPError(
              "you_are_not_allowed_set_group_subject",
              `You are not allowed to set group subject in ${e.id._serialized}`,
              { groupId: e.id.toString() }
            );
          return (
            await (0, k.sendSetGroupSubject)(e.id, d),
            (e.name = d),
            (e.formattedTitle = d),
            !0
          );
        };
        const f = b(62857),
          k = b(52757),
          h = b(2818);
      },
      64456: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(86288);
        l(b(2818), a);
      },
      26738: function (l, a, b) {
        function f(h = 0, e = 2147483647) {
          return Math.floor(Math.random() * (e - h + 1) + h);
        }
        l =
          (this && this.__decorate) ||
          function (h, e, d, c) {
            var g,
              m = arguments.length,
              n =
                m < 3
                  ? e
                  : null === c
                  ? (c = Object.getOwnPropertyDescriptor(e, d))
                  : c;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              n = Reflect.decorate(h, e, d, c);
            else
              for (var p = h.length - 1; p >= 0; p--)
                (g = h[p]) &&
                  (n = (m < 3 ? g(n) : m > 3 ? g(e, d, n) : g(e, d)) || n);
            return m > 3 && n && Object.defineProperty(e, d, n), n;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.Tracker = void 0;
        b = b(20748);
        class k {
          static get clientState() {
            const h = !localStorage.cid,
              e =
                localStorage.cid ||
                sessionStorage.cid ||
                f(1e9) + "." + Math.floor(Date.now() / 1e3);
            return (
              (localStorage.cid = sessionStorage.cid = e),
              { firstVisit: h, cid: e }
            );
          }
          constructor(h) {
            this.trackingId = h;
            this.events = [];
            this.userProperties = {};
            this.lastTime = Date.now();
            this.hitsCount = 1;
            this.documentTitle = "";
          }
          get sid() {
            const h = `${this.trackingId}_sid`,
              e = sessionStorage[h] || Math.floor(Date.now() / 1e3);
            return (sessionStorage[h] = e), e;
          }
          get sct() {
            const h = `${this.trackingId}_sct`;
            let e = parseInt(localStorage[h]);
            return (
              isNaN(e) && (e = 0), (localStorage[h] = e + 1), localStorage[h]
            );
          }
          getHeader() {
            const { cid: h, firstVisit: e } = k.clientState;
            return {
              v: 2,
              tid: this.trackingId,
              _p: k.pageLoadHash,
              cid: h,
              _fv: e ? 1 : void 0,
              ul: (navigator.language || "").toLowerCase() || void 0,
              sr: `${screen.width}x${screen.height}`,
              _s: this.hitsCount++,
              sid: this.sid,
              sct: this.sct,
              seg: 1,
              dl: location.href,
              dr: document.referrer,
              dt: this.documentTitle || document.title,
            };
          }
          getUserProperties() {
            const h = this.userProperties;
            this.userProperties = {};
            return Object.entries(h)
              .filter(([, e]) => void 0 !== e)
              .map(([e, d]) =>
                "number" == typeof d
                  ? [`upn.${e}`, String(d)]
                  : [`up.${e}`, String(d)]
              );
          }
          processEvents() {
            var h = this.events;
            if (((this.events = []), h.length)) {
              h = h.map(([d, c, g]) => {
                const m = [];
                if ((m.push(["en", d]), m.push(["_ee", "1"]), c))
                  for (const n in c)
                    (d = c[n]),
                      void 0 !== d &&
                        ("number" == typeof d
                          ? m.push([`epn.${n}`, String(d)])
                          : m.push([`ep.${n}`, String(d)]));
                return m.push(["_et", String(g)]), m;
              });
              var e = Object.entries(this.getHeader())
                .filter(([, d]) => void 0 !== d)
                .map(([d, c]) => [d, String(c)]);
              e.push(...this.getUserProperties());
              e = new URLSearchParams(e);
              if (1 === h.length) {
                for (const [d, c] of h[0]) e.append(d, c);
                navigator.sendBeacon(`${k.collectURL}?${e.toString()}`);
              } else
                (h = h.map((d) => new URLSearchParams(d).toString())),
                  navigator.sendBeacon(
                    `${k.collectURL}?${e.toString()}`,
                    h.join("\n")
                  );
            }
          }
          processUserEngagement() {
            this.trackEvent("user_engagement");
          }
          trackEvent(h, e) {
            const d = Date.now(),
              c = d - this.lastTime;
            this.lastTime = d;
            this.events.push([h, e, c]);
            this.processEvents();
            this.processUserEngagement();
          }
          setUserProperty(h, e) {
            this.userProperties[h] = e;
            this.trackEvent("user_engagement");
          }
        }
        a.Tracker = k;
        k.collectURL = "https://www.google-analytics.com/g/collect";
        k.pageLoadHash = f();
        l([(0, b.debounce)(1e3)], k.prototype, "processEvents", null);
        l([(0, b.debounce)(3e5)], k.prototype, "processUserEngagement", null);
      },
      22418: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (p, r, t, v) {
                  void 0 === v && (v = t);
                  var x = Object.getOwnPropertyDescriptor(r, t);
                  (x &&
                    ("get" in x
                      ? r.__esModule
                      : !x.writable && !x.configurable)) ||
                    (x = {
                      enumerable: !0,
                      get: function () {
                        return r[t];
                      },
                    });
                  Object.defineProperty(p, v, x);
                }
              : function (p, r, t, v) {
                  void 0 === v && (v = t);
                  p[v] = r[t];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (p, r) {
                  Object.defineProperty(p, "default", {
                    enumerable: !0,
                    value: r,
                  });
                }
              : function (p, r) {
                  p.default = r;
                }),
          h =
            (this && this.__importStar) ||
            function (p) {
              if (p && p.__esModule) return p;
              var r = {};
              if (null != p)
                for (var t in p)
                  "default" !== t &&
                    Object.prototype.hasOwnProperty.call(p, t) &&
                    f(r, p, t);
              return k(r, p), r;
            };
        l =
          (this && this.__exportStar) ||
          function (p, r) {
            for (var t in p)
              "default" === t ||
                Object.prototype.hasOwnProperty.call(r, t) ||
                f(r, p, t);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.waVersion = void 0;
        a.trackException = function (p, r = !1) {
          e.config.disableGoogleAnalytics ||
            (m.trackEvent("exception", { description: p, fatal: r }),
            n && n.trackEvent("exception", { description: p, fatal: r }));
        };
        const e = b(91491),
          d = h(b(72927)),
          c = b(13691);
        h = b(26738);
        l(b(26738), a);
        a.waVersion = "3.15.1";
        const g = ["W: ", "-", ", WA-JS: ", a.waVersion],
          m = new h.Tracker("G-MTQ4KY110F"),
          n = e.config.googleAnalyticsId
            ? new h.Tracker(e.config.googleAnalyticsId)
            : null;
        c.internalEv.on("webpack.injected", () => {
          m.documentTitle = g.join("");
          const p = d.isAuthenticated(),
            r = d.isMultiDevice() ? "multidevice" : "legacy";
          if (
            (m.setUserProperty("method", r),
            m.setUserProperty("wa_js", a.waVersion),
            m.setUserProperty("powered_by", e.config.poweredBy || "-"),
            c.internalEv.on("conn.main_init", () => {
              var t;
              g[1] =
                (null === (t = window.Debug) || void 0 === t
                  ? void 0
                  : t.VERSION) || "-";
              m.documentTitle = g.join("");
              m.setUserProperty("whatsapp", g[1]);
            }),
            m.trackEvent("page_view", { authenticated: p, method: r }),
            n)
          ) {
            if (
              ((n.documentTitle = g.join("-")),
              n.setUserProperty("method", r),
              n.setUserProperty("wa_js", a.waVersion),
              n.setUserProperty("powered_by", e.config.poweredBy || "-"),
              c.internalEv.on("conn.main_init", () => {
                var t;
                g[1] =
                  (null === (t = window.Debug) || void 0 === t
                    ? void 0
                    : t.VERSION) || "-";
                n.documentTitle = g.join("");
                n.setUserProperty("whatsapp", g[1]);
              }),
              "object" == typeof e.config.googleAnalyticsUserProperty)
            )
              for (const t in e.config.googleAnalyticsUserProperty)
                n.setUserProperty(t, e.config.googleAnalyticsUserProperty[t]);
            n.trackEvent("page_view", { authenticated: p, method: r });
          }
          c.internalEv.on("config.update", (t) => {
            if ("poweredBy" === t.path[0])
              m.setUserProperty("powered_by", t.value || "-"),
                n && n.setUserProperty("powered_by", t.value || "-");
            else if (
              "googleAnalyticsUserProperty" === t.path[0] &&
              n &&
              "object" == typeof e.config.googleAnalyticsUserProperty
            )
              for (const v in e.config.googleAnalyticsUserProperty)
                n.setUserProperty(v, e.config.googleAnalyticsUserProperty[v]);
          });
        });
        e.config.disableGoogleAnalytics ||
          (c.internalEv.on("conn.authenticated", () => {
            const p = d.isMultiDevice() ? "multidevice" : "legacy";
            m.trackEvent("login", { method: p });
            n && m.trackEvent("login", { method: p });
          }),
          c.internalEv.on("conn.logout", () => {
            const p = d.isMultiDevice() ? "multidevice" : "legacy";
            m.trackEvent("logout", { method: p });
            n && n.trackEvent("logout", { method: p });
          }));
      },
      28156: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.license =
          a.supportedWhatsappWeb =
          a.version =
          a.waitFor =
          a.stopListeningTo =
          a.setMaxListeners =
          a.removeListener =
          a.removeAllListeners =
          a.prependOnceListener =
          a.prependMany =
          a.prependListener =
          a.prependAny =
          a.once =
          a.onAny =
          a.on =
          a.offAny =
          a.off =
          a.many =
          a.listenersAny =
          a.listeners =
          a.listenerCount =
          a.listenTo =
          a.hasListeners =
          a.getMaxListeners =
          a.eventNames =
          a.emitAsync =
          a.emit =
          a.order =
          a.whatsapp =
          a.newsletter =
          a.util =
          a.status =
          a.profile =
          a.labels =
          a.group =
          a.community =
          a.ev =
          a.contact =
          a.conn =
          a.chat =
          a.catalog =
          a.privacy =
          a.cart =
          a.call =
          a.blocklist =
          a.config =
          a.isFullReady =
          a.isReady =
          a.isInjected =
          a.webpack =
            void 0;
        b(91491);
        b(80687);
        b(22418);
        const h = l(b(1132));
        a.webpack = h;
        var e = b(1132);
        Object.defineProperty(a, "isInjected", {
          enumerable: !0,
          get: function () {
            return e.isInjected;
          },
        });
        Object.defineProperty(a, "isReady", {
          enumerable: !0,
          get: function () {
            return e.isReady;
          },
        });
        Object.defineProperty(a, "isFullReady", {
          enumerable: !0,
          get: function () {
            return e.isFullReady;
          },
        });
        var d = b(91491);
        Object.defineProperty(a, "config", {
          enumerable: !0,
          get: function () {
            return d.config;
          },
        });
        a.blocklist = l(b(61042));
        a.call = l(b(38893));
        a.cart = l(b(81151));
        a.privacy = l(b(33599));
        a.catalog = l(b(40164));
        a.chat = l(b(74023));
        a.conn = l(b(72927));
        a.contact = l(b(56191));
        a.ev = l(b(13691));
        a.community = l(b(83874));
        a.group = l(b(64456));
        a.labels = l(b(26105));
        a.profile = l(b(5882));
        a.status = l(b(31167));
        a.util = l(b(62857));
        a.newsletter = l(b(74310));
        a.whatsapp = l(b(14647));
        a.order = l(b(37783));
        var c = b(13691);
        Object.defineProperty(a, "emit", {
          enumerable: !0,
          get: function () {
            return c.emit;
          },
        });
        Object.defineProperty(a, "emitAsync", {
          enumerable: !0,
          get: function () {
            return c.emitAsync;
          },
        });
        Object.defineProperty(a, "eventNames", {
          enumerable: !0,
          get: function () {
            return c.eventNames;
          },
        });
        Object.defineProperty(a, "getMaxListeners", {
          enumerable: !0,
          get: function () {
            return c.getMaxListeners;
          },
        });
        Object.defineProperty(a, "hasListeners", {
          enumerable: !0,
          get: function () {
            return c.hasListeners;
          },
        });
        Object.defineProperty(a, "listenTo", {
          enumerable: !0,
          get: function () {
            return c.listenTo;
          },
        });
        Object.defineProperty(a, "listenerCount", {
          enumerable: !0,
          get: function () {
            return c.listenerCount;
          },
        });
        Object.defineProperty(a, "listeners", {
          enumerable: !0,
          get: function () {
            return c.listeners;
          },
        });
        Object.defineProperty(a, "listenersAny", {
          enumerable: !0,
          get: function () {
            return c.listenersAny;
          },
        });
        Object.defineProperty(a, "many", {
          enumerable: !0,
          get: function () {
            return c.many;
          },
        });
        Object.defineProperty(a, "off", {
          enumerable: !0,
          get: function () {
            return c.off;
          },
        });
        Object.defineProperty(a, "offAny", {
          enumerable: !0,
          get: function () {
            return c.offAny;
          },
        });
        Object.defineProperty(a, "on", {
          enumerable: !0,
          get: function () {
            return c.on;
          },
        });
        Object.defineProperty(a, "onAny", {
          enumerable: !0,
          get: function () {
            return c.onAny;
          },
        });
        Object.defineProperty(a, "once", {
          enumerable: !0,
          get: function () {
            return c.once;
          },
        });
        Object.defineProperty(a, "prependAny", {
          enumerable: !0,
          get: function () {
            return c.prependAny;
          },
        });
        Object.defineProperty(a, "prependListener", {
          enumerable: !0,
          get: function () {
            return c.prependListener;
          },
        });
        Object.defineProperty(a, "prependMany", {
          enumerable: !0,
          get: function () {
            return c.prependMany;
          },
        });
        Object.defineProperty(a, "prependOnceListener", {
          enumerable: !0,
          get: function () {
            return c.prependOnceListener;
          },
        });
        Object.defineProperty(a, "removeAllListeners", {
          enumerable: !0,
          get: function () {
            return c.removeAllListeners;
          },
        });
        Object.defineProperty(a, "removeListener", {
          enumerable: !0,
          get: function () {
            return c.removeListener;
          },
        });
        Object.defineProperty(a, "setMaxListeners", {
          enumerable: !0,
          get: function () {
            return c.setMaxListeners;
          },
        });
        Object.defineProperty(a, "stopListeningTo", {
          enumerable: !0,
          get: function () {
            return c.stopListeningTo;
          },
        });
        Object.defineProperty(a, "waitFor", {
          enumerable: !0,
          get: function () {
            return c.waitFor;
          },
        });
        a.version = "3.15.1";
        a.supportedWhatsappWeb = ">=2.2326.10-beta";
        a.license = "Apache-2.0";
        h.injectLoader();
      },
      4475: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.addNewLabel = async function (d, c = {}) {
          (0, f.assertIsBusiness)();
          let g = c.labelColor || void 0;
          g ||= await (0, e.getNewLabelColor)();
          "string" == typeof g &&
            g.length > 2 &&
            (g = (0, h.getAllLabelColors)().findIndex((m) => m === g));
          if (
            ((g = parseInt(g.toString())),
            !(await (0, e.colorIsInLabelPalette)(g)))
          )
            throw new k.WPPError("color_not_in_pallet", "Color not in pallet");
          c = await (0, h.getNextLabelId)();
          return (
            await (0, h.labelAddAction)(d, g),
            await (0, e.getLabelById)(c.toString())
          );
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757),
          e = b(62540);
      },
      3105: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.addOrRemoveLabels = async function (h, e) {
          (0, f.assertIsBusiness)();
          Array.isArray(h) || (h = [h]);
          Array.isArray(e) || (e = [e]);
          h = h.map((d) => (0, f.assertGetChat)(d));
          e = e.map((d) => ({ id: d.labelId, type: d.type }));
          return await k.LabelStore.addOrRemoveLabels(e, h);
        };
        const f = b(41687),
          k = b(14647);
      },
      9793: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.colorIsInLabelPalette = async function (h) {
          (0, f.assertIsBusiness)();
          const e = await (0, k.getLabelColorPalette)();
          return (
            e && (e.includes(h.toString()) || null != e[parseInt(h.toString())])
          );
        };
        const f = b(41687),
          k = b(62540);
      },
      90805: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.deleteAllLabels = async function () {
          (0, f.assertIsBusiness)();
          const h = await (0, k.getAllLabels)();
          return (0, k.deleteLabel)(h.map((e) => e.id));
        };
        const f = b(41687),
          k = b(62540);
      },
      50451: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.deleteLabel = async function (e) {
          (0, f.assertIsBusiness)();
          let d = !1;
          Array.isArray(e) || ((d = !0), (e = [e]));
          const c = [];
          for (const g of e)
            (e = k.LabelStore.get(g.toString())) &&
              (await (0, h.labelDeleteAction)(
                g.toString(),
                e.name,
                e.colorIndex
              )),
              c.push({
                id: g,
                deleteLabelResult:
                  null != e && null == k.LabelStore.get(g.toString()),
              });
          return d ? c[0] : c;
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757);
      },
      40866: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.editLabel = async function (c, g = {}) {
          (0, f.assertIsBusiness)();
          const m = h.LabelStore.get(c.toString());
          if (!m)
            throw new k.WPPError(
              "label_not_exist",
              `Label with id ${c} not exist`
            );
          let n = g.labelColor || void 0;
          if (
            n &&
            ("string" == typeof n &&
              n.length > 2 &&
              (n = (0, e.getAllLabelColors)().findIndex((p) => p === n)),
            (n = parseInt(n.toString())),
            !(await (0, d.colorIsInLabelPalette)(n)))
          )
            throw new k.WPPError("color_not_in_pallet", "Color not in pallet");
          return (
            await (0, e.labelEditAction)(
              c,
              g.name || m.name,
              0,
              n || m.colorIndex
            ),
            await (0, d.getLabelById)(c.toString())
          );
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(52757),
          d = b(62540);
      },
      90846: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getAllLabels = async function () {
          return k.LabelStore.getModelsArray().map((e) => ({
            id: e.id,
            name: e.name,
            color: e.hexColor ? (0, f.assertColor)(e.hexColor) : null,
            count: e.count || 0,
            hexColor: (0, h.colorIndexToHex)(e.colorIndex),
            colorIndex: e.colorIndex,
          }));
        };
        const f = b(41687),
          k = b(14647),
          h = b(52757);
      },
      28068: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getLabelById = async function (d) {
          d = h.LabelStore.get(d);
          if (!d)
            throw new k.WPPError(
              "canot_get_label_error",
              "Can't get label by id"
            );
          return {
            id: d.id,
            name: d.name,
            color: d.hexColor ? (0, f.assertColor)(d.hexColor) : null,
            count: d.count || 0,
            hexColor: (0, e.colorIndexToHex)(d.colorIndex),
            colorIndex: d.colorIndex,
          };
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      5978: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getLabelColorPalette = async function () {
          (0, f.assertIsBusiness)();
          const e = (0, h.getAllLabelColors)();
          if (!e)
            throw new k.WPPError(
              "canot_get_color_palette",
              "Can't get color palette"
            );
          return e;
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757);
      },
      34753: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getNewLabelColor = async function () {
          (0, f.assertIsBusiness)();
          const e = await h.LabelStore.getNextAvailableColor();
          if (!e)
            throw new k.WPPError(
              "cannot_get_color",
              "Can't get new label color"
            );
          return (0, f.assertColor)(Number(e));
        };
        const f = b(41687),
          k = b(62857),
          h = b(14647);
      },
      62540: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getNewLabelColor =
          a.getLabelColorPalette =
          a.getLabelById =
          a.getAllLabels =
          a.editLabel =
          a.deleteLabel =
          a.deleteAllLabels =
          a.colorIsInLabelPalette =
          a.addOrRemoveLabels =
          a.addNewLabel =
            void 0;
        var f = b(4475);
        Object.defineProperty(a, "addNewLabel", {
          enumerable: !0,
          get: function () {
            return f.addNewLabel;
          },
        });
        var k = b(3105);
        Object.defineProperty(a, "addOrRemoveLabels", {
          enumerable: !0,
          get: function () {
            return k.addOrRemoveLabels;
          },
        });
        var h = b(9793);
        Object.defineProperty(a, "colorIsInLabelPalette", {
          enumerable: !0,
          get: function () {
            return h.colorIsInLabelPalette;
          },
        });
        var e = b(90805);
        Object.defineProperty(a, "deleteAllLabels", {
          enumerable: !0,
          get: function () {
            return e.deleteAllLabels;
          },
        });
        var d = b(50451);
        Object.defineProperty(a, "deleteLabel", {
          enumerable: !0,
          get: function () {
            return d.deleteLabel;
          },
        });
        var c = b(40866);
        Object.defineProperty(a, "editLabel", {
          enumerable: !0,
          get: function () {
            return c.editLabel;
          },
        });
        var g = b(90846);
        Object.defineProperty(a, "getAllLabels", {
          enumerable: !0,
          get: function () {
            return g.getAllLabels;
          },
        });
        var m = b(28068);
        Object.defineProperty(a, "getLabelById", {
          enumerable: !0,
          get: function () {
            return m.getLabelById;
          },
        });
        var n = b(5978);
        Object.defineProperty(a, "getLabelColorPalette", {
          enumerable: !0,
          get: function () {
            return n.getLabelColorPalette;
          },
        });
        var p = b(34753);
        Object.defineProperty(a, "getNewLabelColor", {
          enumerable: !0,
          get: function () {
            return p.getNewLabelColor;
          },
        });
      },
      26105: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(62540), a);
        l(b(27055), a);
      },
      27055: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
      },
      8686: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.create = async function (h, e) {
          var d, c, g;
          if (null == e ? 0 : e.picture) {
            var m = await (0, f.convertToFile)(e.picture);
            m = await (0, f.blobToBase64)(m);
            ({ data: m } = await (0, f.downloadImage)(m, "image/jpeg"));
          }
          h = await (0, k.createNewsletterQuery)({
            name: h,
            description: (null == e ? void 0 : e.description) || null,
            picture: m || null,
          });
          return {
            idJid: null == h ? void 0 : h.idJid,
            inviteCode:
              null == h
                ? void 0
                : h.newsletterInviteLinkMetadataMixin.inviteCode,
            inviteLink: `https://whatsapp.com/channel/${
              null == h
                ? void 0
                : h.newsletterInviteLinkMetadataMixin.inviteCode
            }`,
            name:
              null ===
                (d = null == h ? void 0 : h.newsletterNameMetadataMixin) ||
              void 0 === d
                ? void 0
                : d.nameElementValue,
            state:
              null ===
                (c = null == h ? void 0 : h.newsletterStateMetadataMixin) ||
              void 0 === c
                ? void 0
                : c.stateType,
            subscribersCount:
              null == h
                ? void 0
                : h.newsletterSubscribersMetadataMixin.subscribersCount,
            description: (null == e ? void 0 : e.description) || null,
            timestamp:
              null ===
                (g =
                  null == h ? void 0 : h.newsletterCreationTimeMetadataMixin) ||
              void 0 === g
                ? void 0
                : g.creationTimeValue,
          };
        };
        const f = b(62857),
          k = b(52757);
      },
      1158: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.destroy = async function (h) {
          if (!h || !h.includes("newsletter"))
            throw new f.WPPError(
              "send_correctly_newsletter_id",
              "Please, send the correct newsletter ID."
            );
          try {
            return await (0, k.deleteNewsletter)(h);
          } catch (e) {
            return !1;
          }
        };
        const f = b(62857),
          k = b(52757);
      },
      25578: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.edit = async function (e, d) {
          var c, g, m, n, p;
          if (null == d ? 0 : d.picture) {
            var r = await (0, f.convertToFile)(d.picture);
            r = await (0, f.blobToBase64)(r);
            ({ data: r } = await (0, f.downloadImage)(r, "image/jpeg"));
          }
          await (0, k.editNewsletterMetadataAction)(
            await (0, h.ensureNewsletter)(e),
            {
              editDescription: !!d.description,
              editName: !!d.name,
              editPicture: !(!r && null != d.picture),
            },
            {
              name: d.name,
              description: d.description,
              picture: null == d.picture ? null : r,
            }
          );
          e = await (0, k.queryNewsletterMetadataByJid)(e, {
            picture: !0,
            description: !0,
            name: !0,
            state: !0,
            creationTime: !0,
          });
          return {
            idJid: null == e ? void 0 : e.idJid,
            inviteCode:
              null == e
                ? void 0
                : e.newsletterInviteLinkMetadataMixin.inviteCode,
            inviteLink: `https://whatsapp.com/channel/${
              null == e
                ? void 0
                : e.newsletterInviteLinkMetadataMixin.inviteCode
            }`,
            name:
              null ===
                (c = null == e ? void 0 : e.newsletterNameMetadataMixin) ||
              void 0 === c
                ? void 0
                : c.nameElementValue,
            state:
              null ===
                (g = null == e ? void 0 : e.newsletterStateMetadataMixin) ||
              void 0 === g
                ? void 0
                : g.stateType,
            subscribersCount:
              null == e
                ? void 0
                : e.newsletterSubscribersMetadataMixin.subscribersCount,
            description:
              null ===
                (n =
                  null ===
                    (m =
                      null == e
                        ? void 0
                        : e.newsletterDescriptionMetadataMixin) || void 0 === m
                    ? void 0
                    : m.descriptionQueryDescriptionResponseMixin) ||
              void 0 === n
                ? void 0
                : n.elementValue,
            timestamp:
              null ===
                (p =
                  null == e ? void 0 : e.newsletterCreationTimeMetadataMixin) ||
              void 0 === p
                ? void 0
                : p.creationTimeValue,
          };
        };
        const f = b(62857),
          k = b(52757),
          h = b(16211);
      },
      16211: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.ensureNewsletter = async function (h) {
          h = (0, f.assertGetChat)(h);
          if (!h.isNewsletter)
            throw new k.WPPError(
              "not_a_newsletter",
              `Chat ${h.id._serialized} is not a newsletter`
            );
          return h;
        };
        const f = b(41687),
          k = b(62857);
      },
      37069: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getSubscribers = async function (h) {
          if (!h || !h.includes("newsletter"))
            throw new f.WPPError(
              "send_correctly_newsletter_id",
              "Please, send the correct newsletter ID."
            );
          try {
            return (await (0, k.getNewsletterSubscribers)(h, 9, "LIMITED"))
              .subscribers;
          } catch (e) {
            return !1;
          }
        };
        const f = b(62857),
          k = b(52757);
      },
      48812: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.mute = a.getSubscribers = a.edit = a.destroy = a.create = void 0;
        var f = b(8686);
        Object.defineProperty(a, "create", {
          enumerable: !0,
          get: function () {
            return f.create;
          },
        });
        var k = b(1158);
        Object.defineProperty(a, "destroy", {
          enumerable: !0,
          get: function () {
            return k.destroy;
          },
        });
        var h = b(25578);
        Object.defineProperty(a, "edit", {
          enumerable: !0,
          get: function () {
            return h.edit;
          },
        });
        var e = b(37069);
        Object.defineProperty(a, "getSubscribers", {
          enumerable: !0,
          get: function () {
            return e.getSubscribers;
          },
        });
        var d = b(7071);
        Object.defineProperty(a, "mute", {
          enumerable: !0,
          get: function () {
            return d.mute;
          },
        });
      },
      7071: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.mute = async function (e, d) {
          return (
            await (0, h.ensureNewsletter)(e),
            !1 === d
              ? (await (0, k.unmuteNewsletter)([e]), f.NewsletterStore.get(e))
              : (await (0, k.muteNewsletter)([e]), f.NewsletterStore.get(e))
          );
        };
        const f = b(14647),
          k = b(52757),
          h = b(16211);
      },
      74310: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(48812), a);
      },
      3421: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(55497);
      },
      55497: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() => {
          e.MsgStore.on("add", (d) => {
            var c, g;
            if (
              "interactive" === d.type &&
              "payment_method" ===
                (null === (c = d.interactivePayload) || void 0 === c
                  ? void 0
                  : c.buttons[0].name) &&
              d.isNewMsg
            ) {
              var m = JSON.parse(
                null === (g = d.interactivePayload) || void 0 === g
                  ? void 0
                  : g.buttons[0].buttonParamsJson
              );
              queueMicrotask(() => {
                h.internalEv.emit("order.payment_status", {
                  method: m.payment_method,
                  timestamp: m.payment_timestamp,
                  reference_id: m.reference_id,
                  msgId: d.id,
                });
              });
            }
          });
        });
      },
      34949: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = async function (d) {
          d = k.MsgStore.get(d);
          if (!d) throw new f.WPPError("msg_not_found", "Message not found");
          if (d.type === h.MSG_TYPE.ORDER) {
            const c = await (0, e.queryOrder)(d.orderId, 80, 80, d.token);
            return new k.OrderModel({
              id: d.orderId,
              products: c.products,
              itemCount: c.products.length,
              subtotal: c.subtotal,
              tax: c.tax,
              total: c.total,
              currency: c.currency,
              createdAt: c.createdAt,
              sellerJid: d.sellerJid,
            });
          }
          throw new f.WPPError("msg_not_is_a_order", "Message not is a order");
        };
        const f = b(62857),
          k = b(14647),
          h = b(20514),
          e = b(52757);
      },
      18165: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = void 0;
        var f = b(34949);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return f.get;
          },
        });
      },
      37783: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(3421), a);
        l(b(18165), a);
      },
      95629: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = async function () {
          return Object.assign(
            Object.assign({}, (0, f.getUserPrivacySettings)()),
            { status: await (0, f.getStatusPrivacySetting)() }
          );
        };
        const f = b(52757);
      },
      73865: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getDisallowedList = async function (e) {
          if (
            "string" != typeof e ||
            !Object.values(f.PrivacyDisallowedListType).includes(e)
          )
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${e || "<empty>"} for get disalowed list`,
              { type: e }
            );
          return (e = await (0, h.getPrivacyDisallowedListTable)().get(e))
            ? e.disallowedList
            : null;
        };
        const f = b(83734),
          k = b(62857),
          h = b(52757);
      },
      85837: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setStatus =
          a.setReadReceipts =
          a.setProfilePic =
          a.setOnline =
          a.setLastSeen =
          a.setAddGroup =
          a.setAbout =
          a.getDisallowedList =
          a.get =
            void 0;
        var f = b(95629);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return f.get;
          },
        });
        var k = b(73865);
        Object.defineProperty(a, "getDisallowedList", {
          enumerable: !0,
          get: function () {
            return k.getDisallowedList;
          },
        });
        var h = b(99804);
        Object.defineProperty(a, "setAbout", {
          enumerable: !0,
          get: function () {
            return h.setAbout;
          },
        });
        var e = b(26947);
        Object.defineProperty(a, "setAddGroup", {
          enumerable: !0,
          get: function () {
            return e.setAddGroup;
          },
        });
        var d = b(56414);
        Object.defineProperty(a, "setLastSeen", {
          enumerable: !0,
          get: function () {
            return d.setLastSeen;
          },
        });
        var c = b(41898);
        Object.defineProperty(a, "setOnline", {
          enumerable: !0,
          get: function () {
            return c.setOnline;
          },
        });
        var g = b(84474);
        Object.defineProperty(a, "setProfilePic", {
          enumerable: !0,
          get: function () {
            return g.setProfilePic;
          },
        });
        var m = b(81096);
        Object.defineProperty(a, "setReadReceipts", {
          enumerable: !0,
          get: function () {
            return m.setReadReceipts;
          },
        });
        var n = b(85019);
        Object.defineProperty(a, "setStatus", {
          enumerable: !0,
          get: function () {
            return n.setStatus;
          },
        });
      },
      77602: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.prepareDisallowedList = async function (d, c, g) {
          if ("contact_blacklist" !== c)
            return { ids: [], dhash: null, idsFormatted: [], allUsers: [] };
          if (
            "string" != typeof d ||
            !Object.values(f.PrivacyDisallowedListType).includes(d)
          )
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${d || "<empty>"} for get disalowed list`,
              { type: d }
            );
          d = await (0, e.getPrivacyDisallowedListTable)().get(d);
          if (!g || 0 === (null == g ? void 0 : g.length)) {
            if (!d)
              throw new k.WPPError(
                "disallowed_list_is_mandatory",
                "Disallowed list is empty, please send disallowed list param"
              );
            return {
              ids: d.disallowedList.map(
                (n) => new h.Wid(n, { intentionallyUsePrivateConstructor: !0 })
              ),
              dhash: d.dhash,
              idsFormatted: [],
              allUsers: d.disallowedList.map(
                (n) => new h.Wid(n, { intentionallyUsePrivateConstructor: !0 })
              ),
            };
          }
          if (null == d)
            return {
              ids: (g =
                null == g
                  ? void 0
                  : g.filter((n) => "remove" !== n.action)).map(
                (n) =>
                  new h.Wid(n.id, { intentionallyUsePrivateConstructor: !0 })
              ),
              dhash: null,
              idsFormatted: g.map((n) => ({
                wid: new h.Wid(n.id, {
                  intentionallyUsePrivateConstructor: !0,
                }),
                action: "add",
              })),
              allUsers: g.map(
                (n) =>
                  new h.Wid(n.id, { intentionallyUsePrivateConstructor: !0 })
              ),
            };
          c = d.disallowedList.filter(
            (n) => !g.some((p) => "remove" === p.action && p.id === n)
          );
          const m = g.filter((n) => "remove" !== n.action);
          c = [].concat(
            m.map(
              (n) => new h.Wid(n.id, { intentionallyUsePrivateConstructor: !0 })
            ),
            c.map(
              (n) => new h.Wid(n, { intentionallyUsePrivateConstructor: !0 })
            )
          );
          return {
            ids: g.map(
              (n) => new h.Wid(n.id, { intentionallyUsePrivateConstructor: !0 })
            ),
            dhash: d.dhash,
            idsFormatted: g.map((n) => ({
              wid: new h.Wid(n.id, { intentionallyUsePrivateConstructor: !0 }),
              action: n.action,
            })),
            allUsers: c,
          };
        };
        const f = b(83734),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      99804: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setAboutTypes = void 0;
        a.setAbout = async function (c, g) {
          if ("string" != typeof c || !Object.values(d).includes(c))
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${c || "<empty>"} for set about privacy`,
              { value: c }
            );
          g = await (0, e.prepareDisallowedList)(
            f.PrivacyDisallowedListType.About,
            c,
            g
          );
          return (
            await (0, h.setPrivacyForOneCategory)(
              {
                name: f.PrivacyDisallowedListType.About,
                value: c,
                dhash: "contact_blacklist" === c ? g.dhash : null,
                users: "contact_blacklist" === c ? g.idsFormatted : void 0,
              },
              "contact_blacklist" === c ? g.allUsers : void 0
            ),
            (0, h.getUserPrivacySettings)().about
          );
        };
        const f = b(83734),
          k = b(62857),
          h = b(52757),
          e = b(77602);
        var d;
        !(function (c) {
          c.all = "all";
          c.contacts = "contacts";
          c.none = "none";
          c.contact_blacklist = "contact_blacklist";
        })(d || (a.setAboutTypes = d = {}));
      },
      26947: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setAddGroupTypes = void 0;
        a.setAddGroup = async function (c, g) {
          if ("string" != typeof c || !Object.values(d).includes(c))
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${c || "<empty>"} for set add group privacy`,
              { value: c }
            );
          g = await (0, e.prepareDisallowedList)(
            f.PrivacyDisallowedListType.GroupAdd,
            c,
            g
          );
          return (
            await (0, h.setPrivacyForOneCategory)(
              {
                name: f.PrivacyDisallowedListType.GroupAdd,
                value: c,
                dhash: "contact_blacklist" === c ? g.dhash : null,
                users: "contact_blacklist" === c ? g.idsFormatted : void 0,
              },
              "contact_blacklist" === c ? g.allUsers : void 0
            ),
            (0, h.getUserPrivacySettings)().groupAdd
          );
        };
        const f = b(83734),
          k = b(62857),
          h = b(52757),
          e = b(77602);
        var d;
        !(function (c) {
          c.all = "all";
          c.contacts = "contacts";
          c.contact_blacklist = "contact_blacklist";
        })(d || (a.setAddGroupTypes = d = {}));
      },
      56414: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setLastSeenTypes = void 0;
        a.setLastSeen = async function (c, g) {
          if ("string" != typeof c || !Object.values(d).includes(c))
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${c || "<empty>"} for set last seen privacy`,
              { value: c }
            );
          g = await (0, e.prepareDisallowedList)(
            f.PrivacyDisallowedListType.LastSeen,
            c,
            g
          );
          return (
            await (0, h.setPrivacyForOneCategory)(
              {
                name: "last",
                value: c,
                dhash: "contact_blacklist" === c ? g.dhash : null,
                users: "contact_blacklist" === c ? g.idsFormatted : void 0,
              },
              "contact_blacklist" === c ? g.allUsers : void 0
            ),
            (0, h.getUserPrivacySettings)().lastSeen
          );
        };
        const f = b(83734),
          k = b(62857),
          h = b(52757),
          e = b(77602);
        var d;
        !(function (c) {
          c.all = "all";
          c.contacts = "contacts";
          c.none = "none";
          c.contact_blacklist = "contact_blacklist";
        })(d || (a.setLastSeenTypes = d = {}));
      },
      41898: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setOnlineTypes = void 0;
        a.setOnline = async function (e) {
          if ("string" != typeof e || !Object.values(h).includes(e))
            throw new f.WPPError(
              "incorrect_type",
              `Incorrect type ${e || "<empty>"} for set online privacy`,
              { value: e }
            );
          return (
            await (0, k.setPrivacyForOneCategory)({ name: "online", value: e }),
            (0, k.getUserPrivacySettings)().online
          );
        };
        const f = b(62857),
          k = b(52757);
        var h;
        !(function (e) {
          e.all = "all";
          e.match_last_seen = "match_last_seen";
        })(h || (a.setOnlineTypes = h = {}));
      },
      84474: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setProfilePicTypes = void 0;
        a.setProfilePic = async function (c, g) {
          if ("string" != typeof c || !Object.values(d).includes(c))
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${c || "<empty>"} for set profile pic privacy`,
              { value: c }
            );
          g = await (0, e.prepareDisallowedList)(
            f.PrivacyDisallowedListType.ProfilePicture,
            c,
            g
          );
          return (
            await (0, h.setPrivacyForOneCategory)(
              {
                name: f.PrivacyDisallowedListType.ProfilePicture,
                value: c,
                dhash: "contact_blacklist" === c ? g.dhash : null,
                users: "contact_blacklist" === c ? g.idsFormatted : void 0,
              },
              "contact_blacklist" === c ? g.allUsers : void 0
            ),
            (0, h.getUserPrivacySettings)().profilePicture
          );
        };
        const f = b(83734),
          k = b(62857),
          h = b(52757),
          e = b(77602);
        var d;
        !(function (c) {
          c.all = "all";
          c.contacts = "contacts";
          c.none = "none";
          c.contact_blacklist = "contact_blacklist";
        })(d || (a.setProfilePicTypes = d = {}));
      },
      81096: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setReadReceiptsTypes = void 0;
        a.setReadReceipts = async function (e) {
          if ("string" != typeof e || !Object.values(h).includes(e))
            throw new f.WPPError(
              "incorrect_type",
              `Incorrect type ${e || "<empty>"} for set read receipts privacy`,
              { value: e }
            );
          return (
            await (0, k.setPrivacyForOneCategory)({
              name: "readreceipts",
              value: e,
            }),
            (0, k.getUserPrivacySettings)().readReceipts
          );
        };
        const f = b(62857),
          k = b(52757);
        var h;
        !(function (e) {
          e.all = "all";
          e.none = "none";
        })(h || (a.setReadReceiptsTypes = h = {}));
      },
      85019: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setStatusTypes = void 0;
        a.setStatus = async function (d, c) {
          if ("string" != typeof d || !Object.values(e).includes(d))
            throw new k.WPPError(
              "incorrect_type",
              `Incorrect type ${d || "<empty>"} for set about privacy`,
              { value: d }
            );
          if ((d == e.ALLOW_LIST || d == e.DENY_LIST) && !c)
            throw new k.WPPError(
              "list_is_mandatory",
              "List is empty <empty>, send the list to allow or deny"
            );
          c
            ? (Array.isArray(c) || (c = [c]),
              (c = c.map(f.assertWid)),
              await (0, h.setStatusPrivacyConfig)({ setting: d, list: c }))
            : await (0, h.setStatusPrivacyConfig)({ setting: d, list: [] });
          return (0, h.getStatusPrivacySetting)();
        };
        const f = b(41687),
          k = b(62857),
          h = b(52757);
        var e;
        !(function (d) {
          d.contact = "contact";
          d.DENY_LIST = "deny-list";
          d.ALLOW_LIST = "allow-list";
        })(e || (a.setStatusTypes = e = {}));
      },
      33599: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(85837), a);
      },
      40923: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.editBusinessProfile = async function (h) {
          if (f.Conn.isSMB)
            return (
              await (0, k.editBusinessProfile)(h),
              await f.BusinessProfileStore.fetchBizProfile(
                f.UserPrefs.getMaybeMeUser()
              )
            );
        };
        const f = b(14647),
          k = b(52757);
      },
      42670: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyProfileName = function () {
          return f.functions.getPushname();
        };
        const f = b(14647);
      },
      82807: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyProfilePicture = async function () {
          return await f.ProfilePicThumbStore.find(
            f.UserPrefs.getMaybeMeUser()
          );
        };
        const f = b(14647);
      },
      29116: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyStatus = async function () {
          return (await f.StatusStore.find(f.UserPrefs.getMaybeMeUser()))
            .status;
        };
        const f = b(14647);
      },
      23144: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMyStatus =
          a.setMyProfilePicture =
          a.setMyProfileName =
          a.removeMyProfilePicture =
          a.isBusiness =
          a.getMyStatus =
          a.getMyProfilePicture =
          a.getMyProfileName =
          a.editBusinessProfile =
            void 0;
        var f = b(40923);
        Object.defineProperty(a, "editBusinessProfile", {
          enumerable: !0,
          get: function () {
            return f.editBusinessProfile;
          },
        });
        var k = b(42670);
        Object.defineProperty(a, "getMyProfileName", {
          enumerable: !0,
          get: function () {
            return k.getMyProfileName;
          },
        });
        var h = b(82807);
        Object.defineProperty(a, "getMyProfilePicture", {
          enumerable: !0,
          get: function () {
            return h.getMyProfilePicture;
          },
        });
        var e = b(29116);
        Object.defineProperty(a, "getMyStatus", {
          enumerable: !0,
          get: function () {
            return e.getMyStatus;
          },
        });
        var d = b(17616);
        Object.defineProperty(a, "isBusiness", {
          enumerable: !0,
          get: function () {
            return d.isBusiness;
          },
        });
        var c = b(95333);
        Object.defineProperty(a, "removeMyProfilePicture", {
          enumerable: !0,
          get: function () {
            return c.removeMyProfilePicture;
          },
        });
        var g = b(35098);
        Object.defineProperty(a, "setMyProfileName", {
          enumerable: !0,
          get: function () {
            return g.setMyProfileName;
          },
        });
        var m = b(20059);
        Object.defineProperty(a, "setMyProfilePicture", {
          enumerable: !0,
          get: function () {
            return m.setMyProfilePicture;
          },
        });
        var n = b(48736);
        Object.defineProperty(a, "setMyStatus", {
          enumerable: !0,
          get: function () {
            return n.setMyStatus;
          },
        });
      },
      17616: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isBusiness = function () {
          return f.Conn.isSMB;
        };
        const f = b(14647);
      },
      95333: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.removeMyProfilePicture = async function () {
          const k = f.UserPrefs.getMaybeMeUser();
          return 200 === (await f.functions.requestDeletePicture(k)).status;
        };
        const f = b(14647);
      },
      35098: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMyProfileName = async function (k) {
          return await f.functions.setPushname(k), !0;
        };
        const f = b(14647);
      },
      20059: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMyProfilePicture = async function (e) {
          var d = await (0, f.convertToFile)(e);
          e = await (0, f.resizeImage)(d, {
            width: 96,
            height: 96,
            mimeType: "image/jpeg",
            resize: "cover",
          });
          d = await (0, f.resizeImage)(d, {
            width: 640,
            height: 640,
            mimeType: "image/jpeg",
            resize: "cover",
          });
          e = await (0, f.blobToBase64)(e);
          d = await (0, f.blobToBase64)(d);
          const c = k.UserPrefs.getMaybeMeUser();
          return (0, h.sendSetPicture)(c, e, d);
        };
        const f = b(62857),
          k = b(14647),
          h = b(52757);
      },
      48736: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.setMyStatus = async function (d) {
          await e.setMyStatus(d);
          const c = await h.StatusStore.find(h.UserPrefs.getMaybeMeUser());
          c && (c.status = d);
          return !0;
        };
        const h = b(14647),
          e = l(b(52757));
      },
      5882: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(23144), a);
      },
      47494: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.defaultSendStatusOptions = { waitForAck: !0 };
      },
      4213: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(9364);
      },
      9364: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(13691);
        a = l(b(1132));
        const e = b(14647);
        a.onInjected(() => {
          e.StatusV3Store.on("sync", () => {
            h.internalEv.emit("status.sync");
          });
        });
      },
      16973: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.get = function (h) {
          h = (0, f.assertWid)(h);
          return k.StatusV3Store.get(h);
        };
        const f = b(41687),
          k = b(14647);
      },
      93809: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getMyStatus = async function () {
          let k = f.StatusV3Store.getMyStatus();
          k ||= await f.StatusV3Store.find(f.UserPrefs.getMaybeMeUser());
          return k;
        };
        const f = b(14647);
      },
      99341: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.updateParticipants =
          a.sendVideoStatus =
          a.sendTextStatus =
          a.sendReadStatus =
          a.sendRawStatus =
          a.sendImageStatus =
          a.remove =
          a.getMyStatus =
          a.get =
            void 0;
        var f = b(16973);
        Object.defineProperty(a, "get", {
          enumerable: !0,
          get: function () {
            return f.get;
          },
        });
        var k = b(93809);
        Object.defineProperty(a, "getMyStatus", {
          enumerable: !0,
          get: function () {
            return k.getMyStatus;
          },
        });
        var h = b(68249);
        Object.defineProperty(a, "remove", {
          enumerable: !0,
          get: function () {
            return h.remove;
          },
        });
        var e = b(2700);
        Object.defineProperty(a, "sendImageStatus", {
          enumerable: !0,
          get: function () {
            return e.sendImageStatus;
          },
        });
        var d = b(71459);
        Object.defineProperty(a, "sendRawStatus", {
          enumerable: !0,
          get: function () {
            return d.sendRawStatus;
          },
        });
        var c = b(34809);
        Object.defineProperty(a, "sendReadStatus", {
          enumerable: !0,
          get: function () {
            return c.sendReadStatus;
          },
        });
        var g = b(72686);
        Object.defineProperty(a, "sendTextStatus", {
          enumerable: !0,
          get: function () {
            return g.sendTextStatus;
          },
        });
        var m = b(53390);
        Object.defineProperty(a, "sendVideoStatus", {
          enumerable: !0,
          get: function () {
            return m.sendVideoStatus;
          },
        });
        var n = b(45218);
        Object.defineProperty(a, "updateParticipants", {
          enumerable: !0,
          get: function () {
            return n.updateParticipants;
          },
        });
      },
      28227: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.postSendStatus = function (k) {
          k.sendMsgResult.then(async () => {
            const h = f.MsgStore.get(k.id);
            if (h) {
              f.StatusV3Store.addStatusMessages(h.author, [h]);
              f.StatusV3Store.handleUpdate(h.attributes, null, !1);
              var e = f.StatusV3Store.getMyStatus();
              e && e.msgs.add(h);
            }
          });
        };
        const f = b(14647);
      },
      68249: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.remove = async function (d) {
          const c = await (0, f.getMessageById)(d);
          try {
            return (
              await (0, e.revokeStatus)(
                h.StatusV3Store.get(h.UserPrefs.getMeUser()),
                c
              ),
              !0
            );
          } catch (g) {
            throw new k.WPPError(
              "error_on_remove_status",
              `Error on remove status with id ${d.toString()}`
            );
          }
        };
        const f = b(74023),
          k = b(62857),
          h = b(14647),
          e = b(52757);
      },
      2700: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendImageStatus = async function (c, g = {}) {
          const m = new h.MsgKey({
            fromMe: !0,
            id: (0, e.randomHex)(16),
            participant: h.UserPrefs.getMaybeMeUser(),
            remote: (0, f.assertWid)("status@broadcast"),
          });
          g = Object.assign(
            Object.assign(Object.assign({}, d.defaultSendStatusOptions), {
              messageId: m,
            }),
            g
          );
          return await (0, k.sendFileMessage)(
            "status@broadcast",
            c,
            Object.assign(Object.assign({}, g), {
              createChat: !0,
              type: "image",
            })
          );
        };
        const f = b(41687),
          k = b(74023),
          h = b(14647),
          e = b(52757),
          d = b(31167);
      },
      71459: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (p, r, t, v) {
                  void 0 === v && (v = t);
                  var x = Object.getOwnPropertyDescriptor(r, t);
                  (x &&
                    ("get" in x
                      ? r.__esModule
                      : !x.writable && !x.configurable)) ||
                    (x = {
                      enumerable: !0,
                      get: function () {
                        return r[t];
                      },
                    });
                  Object.defineProperty(p, v, x);
                }
              : function (p, r, t, v) {
                  void 0 === v && (v = t);
                  p[v] = r[t];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (p, r) {
                  Object.defineProperty(p, "default", {
                    enumerable: !0,
                    value: r,
                  });
                }
              : function (p, r) {
                  p.default = r;
                });
        l =
          (this && this.__importStar) ||
          function (p) {
            if (p && p.__esModule) return p;
            var r = {};
            if (null != p)
              for (var t in p)
                "default" !== t &&
                  Object.prototype.hasOwnProperty.call(p, t) &&
                  f(r, p, t);
            return k(r, p), r;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendRawStatus = async function (p, r = {}) {
          const t = new d.MsgKey({
            fromMe: !0,
            id: (0, g.randomHex)(16),
            participant: d.UserPrefs.getMaybeMeUser(),
            remote: (0, h.assertWid)("status@broadcast"),
          });
          r = Object.assign(
            Object.assign(Object.assign({}, m.defaultSendStatusOptions), {
              messageId: t,
            }),
            r
          );
          p.author = d.UserPrefs.getMaybeMeUser();
          p = await e.sendRawMessage(
            "status@broadcast",
            p,
            Object.assign(Object.assign({}, r), { createChat: !0 })
          );
          return (0, n.postSendStatus)(p), p;
        };
        const h = b(41687),
          e = l(b(74023));
        a = l(b(1132));
        const d = b(14647),
          c = b(54993),
          g = b(52757),
          m = b(31167),
          n = b(28227);
        a.onInjected(() => {
          (0, c.wrapModuleFunction)(g.createMsgProtobuf, (p, ...r) => {
            const [t] = r;
            p = p(...r);
            return (
              p.extendedTextMessage &&
                ("number" == typeof t.backgroundColor &&
                  (p.extendedTextMessage.backgroundArgb = t.backgroundColor),
                "number" == typeof t.textColor &&
                  (p.extendedTextMessage.textArgb = t.textColor),
                "number" == typeof t.font &&
                  (p.extendedTextMessage.font = t.font),
                (p.extendedTextMessage.inviteLinkGroupTypeV2 = 0),
                (p.extendedTextMessage.previewType = 0)),
              p
            );
          });
          (0, c.wrapModuleFunction)(g.encryptAndSendMsg, async (p, ...r) => {
            var t;
            const [v, x] = r;
            if (
              "status@broadcast" ==
              (null === (t = v.data.to) || void 0 === t ? void 0 : t.toString())
            ) {
              p = (0, g.createMsgProtobuf)(v.data);
              try {
                return (
                  await (0, g.encryptAndSendStatusMsg)(v, p, x),
                  {
                    t: v.data.t,
                    sync: null,
                    phash: null,
                    addressingMode: null,
                    count: null,
                    error: null,
                  }
                );
              } catch (B) {
                return null;
              }
            }
            return await p(...r);
          });
        });
        a.onFullReady(() => {
          (0, c.wrapModuleFunction)(g.getABPropConfigValue, (p, ...r) => {
            const [t] = r;
            switch (t) {
              case "web_status_posting_enabled":
              case "post_status_in_companion":
                return 1;
            }
            return p(...r);
          });
          (0, c.wrapModuleFunction)(g.primaryFeatureEnabled, (p, ...r) => {
            const [t] = r;
            switch (t) {
              case "post_status_in_companion":
              case "text_status_creation_support":
                return !0;
            }
            return p(...r);
          });
        });
      },
      34809: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendReadStatus = async function (h, e) {
          var d;
          h = (0, f.assertWid)(h);
          const c = k.StatusV3Store.get(h),
            g = null == c ? void 0 : c.msgs.get(e);
          await (null == c
            ? void 0
            : c.sendReadStatus(g, null == g ? void 0 : g.mediaKeyTimestamp));
          h = k.StatusV3Store.get(h);
          return (
            (null === (d = null == h ? void 0 : h.msgs.get(e)) || void 0 === d
              ? void 0
              : d.serialize()) || []
          );
        };
        const f = b(41687),
          k = b(14647);
      },
      72686: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendTextStatus = async function (e, d = {}) {
          d = Object.assign(Object.assign({}, k.defaultSendStatusOptions), d);
          let c = (0, f.assertColor)("#000000"),
            g = 0;
          ["number", "string"].includes(typeof d.backgroundColor) &&
            (c = (0, f.assertColor)(d.backgroundColor));
          d.font && d.font >= 0 && d.font <= 5 && (g = d.font);
          return await (0, h.sendRawStatus)(
            {
              body: e,
              type: "chat",
              richPreviewType: 0,
              inviteGrpType: 0,
              font: g,
              backgroundColor: c,
            },
            d
          );
        };
        const f = b(41687),
          k = b(31167),
          h = b(99341);
      },
      53390: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.sendVideoStatus = async function (c, g = {}) {
          const m = new h.MsgKey({
            fromMe: !0,
            id: (0, e.randomHex)(16),
            participant: h.UserPrefs.getMaybeMeUser(),
            remote: (0, f.assertWid)("status@broadcast"),
          });
          g = Object.assign(
            Object.assign(Object.assign({}, d.defaultSendStatusOptions), {
              messageId: m,
            }),
            g
          );
          return await (0, k.sendFileMessage)(
            "status@broadcast",
            c,
            Object.assign(Object.assign({}, g), {
              createChat: !0,
              type: "video",
            })
          );
        };
        const f = b(41687),
          k = b(74023),
          h = b(14647),
          e = b(52757),
          d = b(31167);
      },
      45218: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.updateParticipants = async function (e) {
          let d = "custom";
          (e && 0 !== e.length) ||
            ((e = h.ContactStore.getModelsArray()
              .filter((g) => g.isMyContact && !g.isContactBlocked)
              .filter((g) => g.notifyName && !g.isMe)
              .filter((g) => !g.id.equals(h.UserPrefs.getMaybeMeUser()))
              .map((g) => g.id)),
            (d = "contacts"));
          e = e
            .map(f.assertWid)
            .filter((g) => !g.equals(h.UserPrefs.getMaybeMeUser()));
          k.config.sendStatusToDevice && e.push(h.UserPrefs.getMaybeMeUser());
          e = e.map(
            (g) =>
              new h.ParticipantModel({ id: g, isAdmin: !1, isSuperAdmin: !1 })
          );
          const c = h.WidFactory.createWid("status@broadcast");
          await h.functions.updateParticipants({
            group: c,
            participants: e,
            version: Date.now(),
            isOffline: !1,
          });
          localStorage.setItem("wpp-status-participants", d);
        };
        const f = b(41687),
          k = b(91491),
          h = b(14647);
      },
      31167: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        b(4213);
        b(98281);
        l(b(47494), a);
        l(b(99341), a);
      },
      98281: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(28156);
        a = l(b(1132));
        const e = b(14647),
          d = b(54993),
          c = b(52757);
        a.onFullReady(function () {
          (0, d.wrapModuleFunction)(c.handleSingleMsg, async (g, ...m) => {
            const [n, p] = m;
            if (!h.config.syncAllStatus && n.isStatusV3()) {
              const r = e.UserPrefs.getMaybeMeUser();
              if (p.author && !r.equals(p.author)) return;
            }
            return g(...m);
          });
        });
      },
      10632: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.blobToArrayBuffer = function (b) {
          return new Promise((f, k) => {
            const h = new FileReader();
            h.onloadend = function () {
              f(h.result);
            };
            h.onabort = k;
            h.onerror = k;
            h.readAsArrayBuffer(b);
          });
        };
      },
      66604: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.blobToBase64 = function (b) {
          return new Promise((f, k) => {
            const h = new FileReader();
            h.onloadend = function () {
              f(h.result);
            };
            h.onabort = k;
            h.onerror = k;
            h.readAsDataURL(b);
          });
        };
      },
      39681: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.convertToFile = async function (e, d, c) {
          if (e instanceof File) return e;
          if ("string" == typeof e) {
            var g = (0, k.default)(e);
            if (
              (!g &&
                (0, h.isBase64)(e) &&
                (g = (0, k.default)("data:;base64," + e)),
              !g)
            )
              throw "invalid_data_url";
            d ||= g.contentType;
            e = g.toBuffer();
            e = new Blob([new Uint8Array(e, e.byteOffset, e.length)], {
              type: d,
            });
          }
          if (!c || !d) {
            if ((g = await f.default.fromBuffer(await e.arrayBuffer()))) {
              const m = g.mime.split("/")[0];
              c = c || `${m}.${g.ext}`;
              d = d || g.mime;
            }
            c = c || "unknown";
            d = d || "application/octet-stream";
          }
          return new File([e], c, { type: d, lastModified: Date.now() });
        };
        const f = l(b(53846)),
          k = l(b(62759)),
          h = b(62857);
      },
      13257: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.createWid = function (k) {
          if (k) {
            if (f.WidFactory.isWidlike(k))
              return f.WidFactory.createWidFromWidLike(k);
            k &&
              "object" == typeof k &&
              "object" == typeof k._serialized &&
              (k = k._serialized);
            if ("string" == typeof k)
              return /@\w*lid\b/.test(k)
                ? f.WidFactory.createUserWid(k, "lid")
                : /^\d+$/.test(k)
                ? f.WidFactory.createUserWid(k, "c.us")
                : /^\d+-\d+$/.test(k)
                ? f.WidFactory.createUserWid(k, "g.us")
                : /status$/.test(k)
                ? f.WidFactory.createUserWid(k, "broadcast")
                : f.WidFactory.createWid(k);
          }
        };
        const f = b(14647);
      },
      97016: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.downloadImage = function (b, f = "image/jpeg", k = 0.85) {
          return new Promise((h, e) => {
            const d = new Image();
            d.crossOrigin = "anonymous";
            d.src = b;
            d.onerror = e;
            d.onload = () => {
              var c = document.createElement("canvas");
              const g = c.getContext("2d");
              c.height = d.naturalHeight;
              c.width = d.naturalWidth;
              g.drawImage(d, 0, 0);
              c = c.toDataURL(f, k);
              h({ data: c, height: d.naturalHeight, width: d.naturalWidth });
            };
          });
        };
      },
      55026: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.WPPError = void 0;
        class b extends Error {
          constructor(f, k, h = {}) {
            if ((super(k), (this.code = f), h)) {
              f = Object.keys(h);
              for (const e of f) this[e] = h[e];
            }
          }
        }
        a.WPPError = b;
      },
      24298: (l, a, b) => {
        var f = b(48287).hp;
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fetchDataFromPNG = function (k) {
          return new Promise((h, e) => {
            const d = new Image();
            d.crossOrigin = "anonymous";
            d.src = k;
            d.onerror = e;
            d.onload = function () {
              var c = document.createElement("canvas");
              const g = c.getContext("2d");
              c.height = d.naturalHeight;
              c.width = d.naturalWidth;
              g.drawImage(d, 0, 0);
              c = g.getImageData(0, 0, c.width, c.height).data;
              c = f.from(c.filter((m, n) => n % 4 < 3));
              h(
                new Uint8Array(
                  c.subarray(
                    9,
                    (c[1] << 56) +
                      (c[2] << 48) +
                      (c[3] << 40) +
                      (c[4] << 32) +
                      (c[5] << 24) +
                      (c[6] << 16) +
                      (c[7] << 8) +
                      c[8] +
                      9
                  )
                )
              );
            };
          });
        };
      },
      25274: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.generateOrderUniqueId = function () {
          var b = String(Date.now());
          const f = Math.random().toFixed(4).slice(-4);
          b += f;
          return ("function" == typeof BigInt ? BigInt(b) : Number(b))
            .toString(36)
            .toUpperCase();
        };
      },
      82368: (l, a, b) => {
        var f = b(48287).hp;
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.getVideoInfoFromBuffer = function (k) {
          k = f.from(k);
          var h = f.from("mvhd"),
            e = k.indexOf(h) + 17;
          h = k.readUInt32BE(e);
          e = k.readUInt32BE(e + 4);
          var d = k.indexOf(f.from("moov"));
          d = k.indexOf(f.from("trak"), d + 4);
          d = k.indexOf(f.from("stbl"), d + 4);
          const c = k.indexOf(f.from("avc1"), d + 4);
          d = k.readUInt16BE(c + 4 + 24);
          k = k.readUInt16BE(c + 4 + 26);
          return {
            duration: Math.floor(Math.floor((e / h) * 1e3) / 1e3),
            width: d,
            height: k,
          };
        };
      },
      62857: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(10632), a);
        l(b(66604), a);
        l(b(39681), a);
        l(b(13257), a);
        l(b(97016), a);
        l(b(55026), a);
        l(b(24298), a);
        l(b(25274), a);
        l(b(82368), a);
        l(b(7418), a);
        l(b(12040), a);
        l(b(59036), a);
        l(b(16817), a);
      },
      7418: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.isBase64 = function (f) {
          return b.test(f);
        };
        const b =
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
      },
      73113: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (n) {
            return n && n.__esModule ? n : { default: n };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fetchRemoteLinkPreviewData = async function (n) {
          if (g[n]) return d("Link preview found in the cache", n), g[n];
          const p = new TextDecoder();
          for (var r = c.length - 1; r >= 0; r--) {
            const v = c[r];
            d(`Fetching link preview using ${v}`, n);
            var t = `${v}/v1/link-preview/fetch-data.png?url=` + encodeURI(n);
            t = await (0, e.fetchDataFromPNG)(t)
              .then((x) => p.decode(x))
              .then((x) => JSON.parse(x))
              .catch(() => null);
            if (null === t || !("title" in t || "status" in t))
              d(`The server ${v} is unavailable for link preview`),
                c.splice(r, 1);
            else if (t.title || 200 === t.status)
              return (
                (r = /^video/.test(t.mediaType)),
                (r = {
                  title: t.title,
                  description: t.description,
                  canonicalUrl: t.url,
                  matchedText: n,
                  richPreviewType: r ? 1 : 0,
                  doNotPlayInline: !r,
                  imageUrl: t.image,
                }),
                (g[n] = r),
                setTimeout(() => {
                  delete g[n];
                }, 3e5),
                r
              );
          }
          return null;
        };
        a.generateThumbnailLinkPreviewData = async function (n) {
          if (m[n]) return d("Thumb for link preview found in cache.", n), m[n];
          if (!c[0]) return null;
          var p = c[0];
          d(`Downloading the preview image using ${p}`, n);
          p = `${p}/v1/link-preview/download-image?url=` + encodeURI(n);
          p = await (0, h.downloadImage)(p).catch(() => null);
          if (!p || p.width < 140 || p.height < 100) return null;
          const r = await (function (F) {
              return new Promise((L, J) => {
                const T = new Image();
                T.crossOrigin = "anonymous";
                T.src = F;
                T.onerror = J;
                T.onload = () => {
                  try {
                    const V = document.createElement("canvas"),
                      W = V.getContext("2d");
                    V.width = 140;
                    V.height = 140;
                    const R = Math.min(T.width, T.height);
                    W.drawImage(
                      T,
                      (T.width - R) / 2,
                      (T.height - R) / 2,
                      R,
                      R,
                      0,
                      0,
                      140,
                      140
                    );
                    L(
                      V.toDataURL("image/jpeg").replace(
                        /^data:image\/jpeg;base64,/,
                        ""
                      )
                    );
                  } catch (V) {
                    J();
                  }
                };
              });
            })(p.data),
            t = p.data.replace("data:image/jpeg;base64,", "");
          var v = await f.OpaqueData.createFromBase64Jpeg(t),
            x = new Uint8Array(32);
          x =
            (window.crypto.getRandomValues(x),
            { key: f.Base64.encodeB64(x), timestamp: (0, k.unixTime)() });
          const B = new AbortController();
          v = await (0, k.uploadThumbnail)({
            thumbnail: v,
            mediaType: "thumbnail-link",
            mediaKeyInfo: x,
            uploadOrigin: 1,
            forwardedFromWeb: !1,
            signal: B.signal,
            timeout: 3e3,
            isViewOnce: !1,
          });
          x = v.mediaEntry;
          p = {
            thumbnail: r,
            thumbnailHQ: t,
            mediaKey: x.mediaKey,
            mediaKeyTimestamp: x.mediaKeyTimestamp,
            thumbnailDirectPath: x.directPath,
            thumbnailSha256: v.filehash,
            thumbnailEncSha256: x.encFilehash,
            thumbnailWidth: p.width,
            thumbnailHeight: p.height,
          };
          return (
            (m[n] = p),
            setTimeout(() => {
              delete m[n];
            }, 3e5),
            p
          );
        };
        a = l(b(17833));
        l = b(91491);
        const f = b(14647),
          k = b(52757),
          h = b(97016),
          e = b(24298),
          d = (0, a.default)("WA-JS:link-preview"),
          c = l.config.linkPreviewApiServers || [
            "https://cobrancas.uppermesh.com.br:8000",
            "https://wajsapi.titanchat.com.br",
            "https://wppc-linkpreview.cloudtrix.com.br",
          ],
          g = {},
          m = {};
        !(function (n) {
          for (let p = n.length - 1; p > 0; p--) {
            const r = Math.floor(Math.random() * (p + 1));
            [n[p], n[r]] = [n[r], n[p]];
          }
        })(c);
      },
      12040: function (l, a, b) {
        l =
          (this && this.__importDefault) ||
          function (k) {
            return k && k.__esModule ? k : { default: k };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.resizeImage = function (k, h = {}) {
          return new Promise((e, d) => {
            new f.default(
              k,
              Object.assign(Object.assign({}, h), { success: e, error: d })
            );
          });
        };
        const f = l(b(23807));
      },
      59036: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
      },
      16817: (l, a) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.wrapFunction = function (b, f) {
          return (...k) => f(b, ...k);
        };
      },
      1132: function (l, a, b) {
        function f(r) {
          if ("webpack" !== a.loaderType || !a.webpackRequire.m[r]) return "";
          if (n.has(r)) return n.get(r);
          const t = a.webpackRequire.m[r].toString();
          return n.set(r, t), t;
        }
        function k(r) {
          if (p.has(r)) return p.get(r);
          var t = f(r);
          t = /\w+\.(Pure)?Component\s*\{/.test(t);
          return p.set(r, t), t;
        }
        function h(r, t = !1) {
          let v = Object.keys(a.webpackRequire.m);
          t && (v = v.reverse());
          t = setTimeout(() => {
            c(`Searching for: ${r.toString()}`);
          }, 500);
          for (const x of v)
            if (!k(x))
              try {
                const B = (0, a.webpackRequire)(x);
                if (r(B, x))
                  return (
                    c(`Module found: ${x} - ${r.toString()}`),
                    clearTimeout(t),
                    x
                  );
              } catch (B) {}
          v = Object.keys(a.fallbackModules);
          for (const x of v)
            try {
              if (r(a.fallbackModules[x], x))
                return (
                  c(`Fallback Module found: ${x} - ${r.toString()}`),
                  clearTimeout(t),
                  x
                );
            } catch (B) {}
          return c(`Module not found: ${r.toString()}`), null;
        }
        function e(r) {
          return /^fallback_/.test(r)
            ? a.fallbackModules[r]
            : (0, a.webpackRequire)(r);
        }
        l =
          (this && this.__importDefault) ||
          function (r) {
            return r && r.__esModule ? r : { default: r };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.fallbackModules =
          a.webpackRequire =
          a.__debug =
          a.isFullReady =
          a.isReady =
          a.isInjected =
          a.loaderType =
            void 0;
        a.onInjected = function (r, t = 0) {
          d.internalEv.on("webpack.injected", () => {
            setTimeout(r, t);
          });
        };
        a.onReady = function (r, t = 0) {
          d.internalEv.on("webpack.ready", () => {
            setTimeout(r, t);
          });
        };
        a.onFullReady = function (r, t = 0) {
          d.internalEv.on("webpack.full_ready", () => {
            setTimeout(r, t);
          });
        };
        a.injectLoader = function () {
          if (!a.isInjected) {
            var r = self || window,
              t = setInterval(async () => {
                "unknown" === a.loaderType
                  ? r.require &&
                    r.__d &&
                    ((a.loaderType = "meta"),
                    (a.webpackRequire = function (B) {
                      try {
                        return (
                          r.ErrorGuard.skipGuardGlobal(!0), r.importNamespace(B)
                        );
                      } catch (F) {}
                      return null;
                    }),
                    Object.defineProperty(a.webpackRequire, "m", {
                      get: () => {
                        var B;
                        const F = (0, a.__debug)().modulesMap,
                          L = Object.keys(F).filter(
                            (T) =>
                              /^(?:use)?WA/.test(T) &&
                              ![
                                "WAWebEmojiPanelContentEmojiSearchEmpty.react",
                                "WAWebMoment-es-do",
                              ].includes(T)
                          ),
                          J = {};
                        for (const T of L)
                          J[T] =
                            null === (B = F[T]) || void 0 === B
                              ? void 0
                              : B.factory;
                        return J;
                      },
                    }),
                    (a.isInjected = !0),
                    c("injected"),
                    await d.internalEv
                      .emitAsync("webpack.injected")
                      .catch(() => null),
                    await g,
                    await new Promise((B) => setTimeout(B, 1e3)),
                    (a.isReady = !0),
                    c("ready to use"),
                    await d.internalEv
                      .emitAsync("webpack.ready")
                      .catch(() => null),
                    window.wppForceMainLoad
                      ? await new Promise((B) => setTimeout(B, 5e3))
                      : await m,
                    (a.isFullReady = !0),
                    c("full ready to use"),
                    await d.internalEv
                      .emitAsync("webpack.full_ready")
                      .catch(() => null))
                  : clearInterval(t);
              }, 1e3),
              v = r.webpackChunkwhatsapp_web_client || [];
            v && 0 !== (null == v ? void 0 : v.length)
              ? (a.loaderType = "webpack")
              : Object.defineProperty(r, "webpackChunkwhatsapp_web_client", v);
            var x = Date.now();
            v.push([
              [x],
              {},
              (B) => {
                a.webpackRequire = B;
                queueMicrotask(() =>
                  (async (F) => {
                    a.loaderType = "webpack";
                    a.webpackRequire = F;
                    a.isInjected = !0;
                    c("injected");
                    await d.internalEv
                      .emitAsync("webpack.injected")
                      .catch(() => null);
                    await new Promise((J) => setTimeout(J, 500));
                    F = Array(1e4)
                      .fill(1)
                      .map((J, T) => J + T)
                      .filter((J) => {
                        const T = a.webpackRequire.u(J);
                        return T.includes("locales")
                          ? navigator.languages.some((V) =>
                              T.includes(`locales/${V}`)
                            )
                          : !T.includes("undefined");
                      });
                    const L = F.filter((J) => {
                      J = a.webpackRequire.u(J);
                      return J.includes("main") && !J.includes("locales");
                    });
                    for (const J of L)
                      try {
                        await a.webpackRequire.e(J);
                      } catch (T) {
                        c("load file error", a.webpackRequire.u(J));
                      }
                    a.isReady = !0;
                    c("ready to use");
                    await d.internalEv
                      .emitAsync("webpack.ready")
                      .catch(() => null);
                    window.wppForceMainLoad
                      ? await new Promise((J) => setTimeout(J, 5e3))
                      : await m;
                    for (const J of F)
                      try {
                        await a.webpackRequire.e(J);
                      } catch (T) {
                        c("load file error", a.webpackRequire.u(J));
                      }
                    a.isFullReady = !0;
                    c("full ready to use");
                    await d.internalEv
                      .emitAsync("webpack.full_ready")
                      .catch(() => null);
                  })(B)
                );
              },
            ]);
          }
        };
        a.moduleSource = f;
        a.isReactComponent = k;
        a.searchId = h;
        a.search = function (r, t = !1) {
          return (r = h(r, t)) ? e(r) : null;
        };
        a.modules = function (r, t = !1) {
          const v = {};
          let x = Object.keys(a.webpackRequire.m);
          t && (x = x.reverse());
          for (const B of x)
            if (!k(B))
              try {
                const F = e(B);
                (r && !r(F, B)) || (v[B] = F);
              } catch (F) {}
          return (
            c(
              `${Object.keys(v).length} modules found with: ${
                null == r ? void 0 : r.toString()
              }`
            ),
            v
          );
        };
        a.loadModule = e;
        a.injectFallbackModule = function (r, t) {
          if (/^fallback_/.test((r += ""))) throw Error("Invalid fallback ID");
          a.fallbackModules[`fallback_${r}`] = t;
        };
        l = l(b(17833));
        const d = b(13691),
          c = (0, l.default)("WA-JS:webpack");
        a.loaderType = "unknown";
        a.isInjected = !1;
        a.isReady = !1;
        a.isFullReady = !1;
        a.__debug = () => (self || window).require("__debug");
        a.fallbackModules = {};
        const g = d.internalEv.waitFor("conn.main_init"),
          m = d.internalEv.waitFor("conn.main_ready"),
          n = new Map(),
          p = new Map();
      },
      28922: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { AggReactionsCollection: "AggReactionsCollection" },
          (f) => f.AggReactionsCollection
        );
      },
      93316: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { BaseCollection: "BaseCollection" },
          (f) => f.BaseCollection
        );
      },
      924: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            BlocklistCollection: [
              "BlocklistCollectionImpl",
              "BlocklistCollection",
            ],
          },
          (f) => f.BlocklistCollectionImpl || f.BlocklistCollection
        );
      },
      18795: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { BotProfileCollection: ["BotProfileCollection"] },
          (f) => f.BotProfileCollection
        );
      },
      51150: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            BusinessCategoriesResultCollection:
              "BusinessCategoriesResultCollectionImpl",
          },
          (f) => f.BusinessCategoriesResultCollectionImpl
        );
      },
      21330: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            BusinessProfileCollection: [
              "BusinessProfileCollectionImpl",
              "BusinessProfileCollection",
            ],
          },
          (f) => f.BusinessProfileCollectionImpl || f.BusinessProfileCollection
        );
      },
      83573: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ButtonCollection: ["ButtonCollectionImpl", "ButtonCollection"] },
          (f) => f.ButtonCollectionImpl || f.ButtonCollection
        );
      },
      96993: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { CallCollection: ["CallCollectionImpl", "default.constructor"] },
          (f) => f.CallCollectionImpl || f.default.processIncomingCall
        );
      },
      22523: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { CartCollection: ["CartCollectionImpl", "CartCollection"] },
          (f) => f.CartCollectionImpl || f.CartCollection
        );
      },
      25716: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            CartItemCollection: [
              "CartItemCollectionImpl",
              "CartItemCollection",
            ],
          },
          (f) => f.CartItemCollectionImpl || f.CartItemCollection
        );
      },
      10674: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { CatalogCollection: ["CatalogCollectionImpl", "CatalogCollection"] },
          (f) => f.CatalogCollectionImpl || f.CatalogCollection
        );
      },
      29683: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ChatCollection: "ChatCollectionImpl" },
          (f) => f.ChatCollectionImpl
        );
      },
      27462: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ChatstateCollection: ["ChatstateCollectionImpl", "Chatstate"] },
          (f) => f.ChatstateCollectionImpl || f.Chatstate
        );
      },
      60193: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { Collection: "default" }, (f) =>
          f.default.toString().includes("Collection initialized without model")
        );
      },
      54477: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ContactCollection: "ContactCollectionImpl" },
          (f) => f.ContactCollectionImpl
        );
      },
      16794: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            EmojiVariantCollection: [
              "EmojiVariantCollectionImpl",
              "EmojiVariantCollection",
            ],
          },
          (f) => f.EmojiVariantCollectionImpl || f.EmojiVariantCollection
        );
      },
      58699: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { GroupMetadataCollection: "default.constructor" },
          (f) =>
            "function" == typeof f.default.onParentGroupChange ||
            "function" == typeof f.default._handleParentGroupChange
        );
      },
      86451: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { LabelCollection: ["LabelCollectionImpl", "LabelCollection"] },
          (f) => f.LabelCollectionImpl || f.LabelCollection
        );
      },
      35052: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            LabelItemCollection: [
              "LabelItemCollectionImpl",
              "LabelItemCollection",
            ],
          },
          (f) => f.LabelItemCollectionImpl || f.LabelItemCollection
        );
      },
      67880: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MsgCollection: "MsgCollectionImpl" },
          (f) => f.MsgCollectionImpl
        );
      },
      1160: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MsgInfoCollection: ["MsgInfoCollectionImpl", "MsgInfoCollection"] },
          (f) => f.MsgInfoCollectionImpl || f.MsgInfoCollection
        );
      },
      58383: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ParticipantCollection: ["ParticipantCollection"] },
          (f) => f.ParticipantCollection
        );
      },
      22712: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MuteCollection: ["MuteCollectionImpl", "MuteCollection"] },
          (f) => f.MuteCollectionImpl || f.MuteCollection
        );
      },
      85509: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { NoteCollection: ["NoteCollection.constructor"] },
          (f) => f.NoteCollection
        );
      },
      21865: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { OrderCollection: ["OrderCollectionImpl", "OrderCollection"] },
          (f) => f.OrderCollectionImpl || f.OrderCollection
        );
      },
      27082: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            OrderItemCollection: [
              "OrderItemCollectionImpl",
              "OrderItemCollection",
            ],
          },
          (f) => f.OrderItemCollectionImpl || f.OrderItemCollection
        );
      },
      2100: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ParticipantCollection: ["default"] },
          (f) => f.default.prototype.iAmMember
        );
      },
      90175: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            PinInChatCollection: [
              "PinInChatCollectionImpl",
              "PinInChatCollection",
            ],
          },
          (f) => f.PinInChatCollectionImpl || f.PinInChatCollection
        );
      },
      74308: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            PresenceCollection: [
              "PresenceCollectionImpl",
              "PresenceCollection",
            ],
          },
          (f) => f.PresenceCollectionImpl || f.PresenceCollection
        );
      },
      6384: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ProductCollCollection: [
              "ProductCollCollectionImpl",
              "ProductCollCollection",
            ],
          },
          (f) => f.ProductCollCollectionImpl || f.ProductCollCollection
        );
      },
      88354: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ProductCollection: ["ProductCollectionImpl", "ProductCollection"] },
          (f) => f.ProductCollectionImpl || f.ProductCollection
        );
      },
      99013: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ProductImageCollection: [
              "ProductImageCollectionImpl",
              "ProductImageCollection",
            ],
          },
          (f) => f.ProductImageCollectionImpl || f.ProductImageCollection
        );
      },
      9239: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ProductMessageListCollection: [
              "ProductMessageListCollectionImpl",
              "ProductMessageListCollection",
            ],
          },
          (f) =>
            f.ProductMessageListCollectionImpl || f.ProductMessageListCollection
        );
      },
      39240: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ProfilePicThumbCollection: [
              "ProfilePicThumbCollectionImpl",
              "ProfilePicThumbCollection",
            ],
          },
          (f) => f.ProfilePicThumbCollectionImpl || f.ProfilePicThumbCollection
        );
      },
      79320: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            QuickReplyCollection: [
              "QuickReplyCollectionImpl",
              "QuickReplyCollection",
            ],
          },
          (f) => f.QuickReplyCollectionImpl || f.QuickReplyCollection
        );
      },
      9601: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ReactionsCollection: [
              "ReactionsCollectionImpl",
              "ReactionsCollection",
            ],
          },
          (f) => f.ReactionsCollectionImpl || f.ReactionsCollection
        );
      },
      76363: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ReactionsSendersCollection: "ReactionsSendersCollection" },
          (f) => f.ReactionsSendersCollection
        );
      },
      37354: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            RecentEmojiCollection: [
              "RecentEmojiCollectionImpl",
              "RecentEmojiCollection",
            ],
          },
          (f) => f.RecentEmojiCollectionImpl || f.RecentEmojiCollection
        );
      },
      17987: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            RecentStickerCollection: [
              "RecentStickerCollectionImpl",
              "RecentStickerCollection",
            ],
          },
          (f) => f.RecentStickerCollectionImpl || f.RecentStickerCollection
        );
      },
      18393: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            StarredMsgCollection: [
              "StarredMsgCollectionImpl",
              "StarredMsgCollection",
            ],
          },
          (f) => f.StarredMsgCollectionImpl || f.StarredMsgCollection
        );
      },
      85959: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            StatusCollection: [
              "TextStatusCollectionImpl",
              "TextStatusCollection",
            ],
          },
          (f) => f.TextStatusCollectionImpl || f.TextStatusCollection
        );
      },
      23572: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            StatusV3Collection: [
              "StatusV3CollectionImpl",
              "StatusCollectionImpl",
              "StatusCollection",
            ],
          },
          (f) =>
            f.StatusV3CollectionImpl ||
            f.StatusV3Collection ||
            f.StatusCollectionImpl ||
            f.StatusCollection
        );
      },
      87210: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { StickerCollection: "StickerCollectionImpl" },
          (f) => f.StickerCollectionImpl || f.StickerCollection
        );
      },
      84471: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            StickerPackCollection: [
              "StickerPackCollectionImpl",
              "StickerPackCollection",
            ],
          },
          (f) => f.StickerPackCollectionImpl || f.StickerPackCollection
        );
      },
      69634: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            StickerSearchCollection: [
              "StickerSearchCollectionImpl",
              "StickerSearchCollection",
            ],
          },
          (f) => f.StickerSearchCollectionImpl || f.StickerSearchCollection
        );
      },
      40999: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { TemplateButtonCollection: "TemplateButtonCollection" },
          (f) => f.TemplateButtonCollectionImpl || f.TemplateButtonCollection
        );
      },
      12105: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(28922), a);
        l(b(93316), a);
        l(b(924), a);
        l(b(18795), a);
        l(b(51150), a);
        l(b(21330), a);
        l(b(83573), a);
        l(b(96993), a);
        l(b(22523), a);
        l(b(25716), a);
        l(b(10674), a);
        l(b(29683), a);
        l(b(27462), a);
        l(b(60193), a);
        l(b(54477), a);
        l(b(54477), a);
        l(b(54477), a);
        l(b(16794), a);
        l(b(58699), a);
        l(b(86451), a);
        l(b(35052), a);
        l(b(67880), a);
        l(b(1160), a);
        l(b(58383), a);
        l(b(22712), a);
        l(b(85509), a);
        l(b(21865), a);
        l(b(27082), a);
        l(b(2100), a);
        l(b(90175), a);
        l(b(74308), a);
        l(b(6384), a);
        l(b(88354), a);
        l(b(99013), a);
        l(b(9239), a);
        l(b(39240), a);
        l(b(79320), a);
        l(b(9601), a);
        l(b(76363), a);
        l(b(37354), a);
        l(b(17987), a);
        l(b(18393), a);
        l(b(85959), a);
        l(b(23572), a);
        l(b(87210), a);
        l(b(84471), a);
        l(b(69634), a);
        l(b(40999), a);
      },
      34491: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { DROP_ATTR: ["DROP_ATTR"] },
          (f) => f.DROP_ATTR
        );
      },
      40504: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { SANITIZED_VERSION_STR: ["SANITIZED_VERSION_STR"] },
          (f) => f.SANITIZED_VERSION_STR
        );
      },
      19198: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(34491), a);
        l(b(40504), a);
      },
      91979: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            ACK: ["ACK", "default.ACK"],
            EDIT_ATTR: ["EDIT_ATTR", "default.EDIT_ATTR"],
            ACK_STRING: ["ACK_STRING", "default.ACK_STRING"],
          },
          (f) =>
            (f.ACK && f.ACK_STRING) || (f.default.ACK && f.default.ACK_STRING)
        );
      },
      48077: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { CALL_STATES: "CALL_STATES" },
          (f) => f.CALL_STATES
        );
      },
      49193: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            GROUP_SETTING_TYPE: [
              "GROUP_SETTING_TYPE",
              "default.GROUP_SETTING_TYPE",
            ],
          },
          (f) => f.GROUP_SETTING_TYPE || f.default.GROUP_SETTING_TYPE
        );
      },
      10611: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { KIC_ENTRY_POINT_TYPE: "KIC_ENTRY_POINT_TYPE" },
          (f) => f.KIC_ENTRY_POINT_TYPE
        );
      },
      14774: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            LogoutReason: "LogoutReason",
            LOGOUT_REASON_CODE: "LOGOUT_REASON_CODE",
          },
          (f) => f.LogoutReason && f.LOGOUT_REASON_CODE
        );
      },
      48486: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            MSG_TYPE: ["MSG_TYPE", "default.MSG_TYPE"],
            SYSTEM_MESSAGE_TYPES: [
              "SYSTEM_MESSAGE_TYPES",
              "default.SYSTEM_MESSAGE_TYPES",
            ],
          },
          (f) => f.MSG_TYPE || f.default.MSG_TYPE
        );
      },
      63718: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { OUTWARD_TYPES: "OUTWARD_TYPES" },
          (f) => f.OUTWARD_TYPES
        );
      },
      57579: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { PIN_STATE: "PIN_STATE" },
          (f) => f.PIN_STATE
        );
      },
      89763: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            SOCKET_STATE: ["SOCKET_STATE", "default.SOCKET_STATE"],
            SOCKET_STREAM: ["SOCKET_STREAM", "default.SOCKET_STREAM"],
            WATCHED_SOCKET_STATE: [
              "WATCHED_SOCKET_STATE",
              "default.WATCHED_SOCKET_STATE",
            ],
          },
          (f) => f.SOCKET_STATE || f.default.SOCKET_STATE
        );
      },
      40936: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { SendMsgResult: "SendMsgResult" },
          (f) => f.SendMsgResult
        );
      },
      20514: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(91979), a);
        l(b(48077), a);
        l(b(49193), a);
        l(b(10611), a);
        l(b(14774), a);
        l(b(48486), a);
        l(b(63718), a);
        l(b(57579), a);
        l(b(40936), a);
      },
      54993: function (l, a, b) {
        function f(v, x, B) {
          "string" == typeof x && (x = { [x]: null });
          for (const F of Object.keys(x)) {
            const L = x[F];
            Object.defineProperty(v, F, {
              enumerable: !0,
              configurable: !0,
              get() {
                let J;
                const T = m.searchId(B);
                if (!T) {
                  var V = `Module ${F} was not found with ${B.toString()}`;
                  return (
                    ["revokeStatus"].includes(F) ||
                      (console.error(V), (0, c.trackException)(V)),
                    void Object.defineProperty(this, F, { get: () => {} })
                  );
                }
                const W = m.loadModule(T);
                if (Array.isArray(L)) {
                  for (const R of L)
                    if (
                      ((V = () =>
                        R.split(".").reduce(
                          (ba, Z) => (null == ba ? void 0 : ba[Z]),
                          W
                        )),
                      V())
                    ) {
                      J = R;
                      break;
                    }
                  if (!V())
                    return (
                      (V = `Property ${L.join(
                        " or "
                      )} was not found for ${F} in module ${T}`),
                      console.error(V),
                      (0, c.trackException)(V),
                      void Object.defineProperty(this, F, { get: () => {} })
                    );
                } else if ("string" == typeof L) {
                  if (
                    ((V = () =>
                      L.split(".").reduce(
                        (R, ba) => (null == R ? void 0 : R[ba]),
                        W
                      )),
                    !V())
                  )
                    return (
                      (V = `Property ${L} was not found for ${F} in module ${T}`),
                      console.error(V),
                      (0, c.trackException)(V),
                      void Object.defineProperty(this, F, { get: () => {} })
                    );
                  J = L;
                } else V = () => W;
                if (V) {
                  Object.defineProperty(this, F, { get: V });
                  try {
                    const R = V();
                    r.set(R, T);
                    J && t.set(R, J);
                  } catch (R) {}
                  return V();
                }
                Object.defineProperty(this, F, { get: () => {} });
              },
            });
          }
        }
        var k =
            (this && this.__createBinding) ||
            (Object.create
              ? function (v, x, B, F) {
                  void 0 === F && (F = B);
                  var L = Object.getOwnPropertyDescriptor(x, B);
                  (L &&
                    ("get" in L
                      ? x.__esModule
                      : !L.writable && !L.configurable)) ||
                    (L = {
                      enumerable: !0,
                      get: function () {
                        return x[B];
                      },
                    });
                  Object.defineProperty(v, F, L);
                }
              : function (v, x, B, F) {
                  void 0 === F && (F = B);
                  v[F] = x[B];
                }),
          h =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (v, x) {
                  Object.defineProperty(v, "default", {
                    enumerable: !0,
                    value: x,
                  });
                }
              : function (v, x) {
                  v.default = x;
                });
        l =
          (this && this.__importStar) ||
          function (v) {
            if (v && v.__esModule) return v;
            var x = {};
            if (null != v)
              for (var B in v)
                "default" !== B &&
                  Object.prototype.hasOwnProperty.call(v, B) &&
                  k(x, v, B);
            return h(x, v), x;
          };
        var e =
          (this && this.__importDefault) ||
          function (v) {
            return v && v.__esModule ? v : { default: v };
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a._moduleIdMap = void 0;
        a.exportModule = f;
        a.exportProxyModel = function (v, x) {
          const B = x.replace(/Model$/, ""),
            F = [B];
          F.push(B.replace(/^(\w)/, (J) => J.toLowerCase()));
          const L = B.split(/(?=[A-Z])/);
          F.push(L.join("-").toLowerCase());
          F.push(L.join("_").toLowerCase());
          f(v, { [x]: ["default", x, B] }, (J) => {
            var T, V, W, R, ba, Z;
            return F.includes(
              (null ===
                (V =
                  null === (T = J.default) || void 0 === T
                    ? void 0
                    : T.prototype) || void 0 === V
                ? void 0
                : V.proxyName) ||
                (null ===
                  (R =
                    null === (W = J[x]) || void 0 === W
                      ? void 0
                      : W.prototype) || void 0 === R
                  ? void 0
                  : R.proxyName) ||
                (null ===
                  (Z =
                    null === (ba = J[B]) || void 0 === ba
                      ? void 0
                      : ba.prototype) || void 0 === Z
                  ? void 0
                  : Z.proxyName)
            );
          });
        };
        a.wrapModuleFunction = function (v, x) {
          if ("function" != typeof v)
            return void console.error("func is not a function");
          const B = a._moduleIdMap.get(v);
          if (!B) return void console.error("func is not an exported function");
          var F = m.loadModule(B);
          const L = t.get(v);
          if (!L) return void console.error("function path was not found");
          n.extend("wrap")(`Wrapping '${L} for module ${B}'`);
          const J = L.split("."),
            T = J.pop();
          if (!T)
            return (
              (v = `function was not found in the module ${B}`),
              console.error(v),
              void (0, c.trackException)(v)
            );
          F = J.reduce((V, W) => (null == V ? void 0 : V[W]), F);
          F[T] =
            "getShouldAppearInList" == T
              ? (0, d.wrapShouldAppearFunction)(v.bind(F), x)
              : (0, g.wrapFunction)(v.bind(F), x);
          r.set(F[T], B);
          t.set(F[T], L);
        };
        e = e(b(17833));
        const d = b(43859),
          c = b(22418),
          g = b(62857),
          m = l(b(1132)),
          n = (0, e.default)("WA-JS:export");
        class p extends WeakMap {
          constructor() {
            super(...arguments);
            this.stringMap = new Map();
          }
          delete(v) {
            return "string" == typeof v
              ? this.stringMap.delete(v)
              : super.delete(v);
          }
          get(v) {
            return "string" == typeof v ? this.stringMap.get(v) : super.get(v);
          }
          has(v) {
            return "string" == typeof v ? this.stringMap.has(v) : super.has(v);
          }
          set(v, x) {
            return "string" == typeof v
              ? (this.stringMap.set(v, x), this)
              : (super.set(v, x), this);
          }
        }
        const r = new p(),
          t = new p();
        a._moduleIdMap = r;
      },
      11782: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { GROUP_JID: "GROUP_JID", CHAT_JID: "CHAT_JID" },
          (f) => f.GROUP_JID && f.CHAT_JID && f.wapNodeToVoipXml
        );
      },
      83019: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { STATUS_JID: "STATUS_JID" },
          (f) => f.STATUS_JID
        );
      },
      72116: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { addAndSendMessageEdit: "addAndSendMessageEdit" },
          (f) => f.addAndSendMessageEdit
        );
      },
      19885: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { addAndSendMsgToChat: "addAndSendMsgToChat" },
          (f) => f.addAndSendMsgToChat
        );
      },
      33505: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            addOrEditNoteAction: "addOrEditNoteAction",
            retrieveOnlyNoteForChatJid: "retrieveOnlyNoteForChatJid",
          },
          (f) => f.addOrEditNoteAction && f.retrieveOnlyNoteForChatJid
        );
      },
      25736: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(54993);
        (0, l.exportModule)(
          a,
          { addProductToCart: "addProductToCart" },
          (f) => f.addProductToCart
        );
        (0, l.exportModule)(
          a,
          { updateProductQuantityCart: "default" },
          (f) => {
            var k, h;
            return null ===
              (h =
                null === (k = f.default) || void 0 === k
                  ? void 0
                  : k.displayName) || void 0 === h
              ? void 0
              : h.includes("BizUpdateProductQuantityCartAction");
          }
        );
        (0, l.exportModule)(a, { deleteProductFromCart: "default" }, (f) => {
          var k, h;
          return null ===
            (h =
              null === (k = f.default) || void 0 === k
                ? void 0
                : k.displayName) || void 0 === h
            ? void 0
            : h.includes("BizDeleteProductFromCartAction");
        });
      },
      55889: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            addToLabelCollection: "addToLabelCollection",
            createLabelItemId: "createLabelItemId",
            getParentCollection: "getParentCollection",
            initializeLabels: "initializeLabels",
            removeLabelFromCollection: "removeLabelFromCollection",
          },
          (f) => f.addToLabelCollection
        );
      },
      50854: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { blockContact: "blockContact", unblockContact: "unblockContact" },
          (f) => f.blockContact && f.unblockContact
        );
      },
      22328: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { calculateFilehashFromBlob: "calculateFilehashFromBlob" },
          (f) => f.calculateFilehashFromBlob
        );
      },
      29697: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { canEditCaption: "canEditCaption" },
          (f) => f.canEditCaption
        );
      },
      77082: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { canEditMsg: ["canEditText", "canEditMsg"] },
          (f) => f.canEditMsg || f.canEditText
        );
      },
      71274: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { canReplyMsg: "canReplyMsg" },
          (f) => f.canReplyMsg
        );
      },
      4525: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(1132);
        const f = b(54993),
          k = b(57411),
          h = b(43593),
          e = b(41968),
          d = b(80214);
        (0, f.exportModule)(
          a,
          {
            changeOptInStatusForExternalWebBeta:
              "changeOptInStatusForExternalWebBeta",
          },
          (c) => c.changeOptInStatusForExternalWebBeta
        );
        (0, l.injectFallbackModule)("changeOptInStatusForExternalWebBeta", {
          changeOptInStatusForExternalWebBeta: async (c) => {
            await Promise.all([
              (0, e.setWhatsAppWebExternalBetaDirtyBitIdb)(!0),
              (0, e.setWhatsAppWebExternalBetaJoinedIdb)(c),
            ]);
            await (0, k.stopComms)();
            await (0, k.startWebComms)();
            await (0, k.startHandlingRequests)();
            await (0, d.syncABPropsTask)();
            await (0, h.frontendFireAndForget)(
              "changeOptInStatusForExternalWebBeta",
              {}
            );
            await (0, e.setWhatsAppWebExternalBetaDirtyBitIdb)(!1);
          },
        });
      },
      58652: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(54993);
        (0, l.exportModule)(
          a,
          { createCollection: "createCollection" },
          (f) => f.createCollection
        );
        (0, l.exportModule)(
          a,
          {
            deleteCollection: "deleteCollection",
            editCollection: "editCollection",
            queryCollectionsIQ: "queryCollectionsIQ",
          },
          (f) => f.deleteCollection && f.editCollection && f.queryCollectionsIQ
        );
      },
      71400: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            colorIndexToHex: "colorIndexToHex",
            getAllLabelColors: "getAllLabelColors",
          },
          (f) => f.colorIndexToHex && f.getAllLabelColors
        );
      },
      37300: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(1132);
        b = b(54993);
        (0, b.exportModule)(
          a,
          {
            getNotifyName: "getNotifyName",
            getMentionName: "getMentionName",
            getPremiumMessageName: "getPremiumMessageName",
            getUserid: "getUserid",
            getUserhash: "getUserhash",
            getSearchVerifiedName: "getSearchVerifiedName",
            getHeader: "getHeader",
            getIsMe: "getIsMe",
            getIsUser: "getIsUser",
            getIsGroup: "getIsGroup",
            getIsBroadcast: "getIsBroadcast",
            getIsPSA: "getIsPSA",
            getIsIAS: "getIsIAS",
            getIsSupportAccount: "getIsSupportAccount",
            getIsWAContact: "getIsWAContact",
            getIsMyContact: "getIsMyContact",
            getCanRequestPhoneNumber: "getCanRequestPhoneNumber",
            getShowBusinessCheckmarkAsPrimary:
              "getShowBusinessCheckmarkAsPrimary",
            getShowBusinessCheckmarkAsSecondary:
              "getShowBusinessCheckmarkAsSecondary",
            getShowBusinessCheckmarkInChatlist:
              "getShowBusinessCheckmarkInChatlist",
            getIsDisplayNameApproved: "getIsDisplayNameApproved",
            getShouldForceBusinessUpdate: "getShouldForceBusinessUpdate",
          },
          (f) => f.getIsMyContact && f.getIsGroup
        );
        (0, l.injectFallbackModule)("getIsMyContact", {
          getNotifyName: (f) => f.notifyName,
          getMentionName: (f) => f.mentionName,
          getPremiumMessageName: (f) => f.premiumMessageName,
          getUserid: (f) => f.userid,
          getUserhash: (f) => f.userhash,
          getSearchVerifiedName: (f) => f.searchVerifiedName,
          getHeader: (f) => f.header,
          getIsMe: (f) => f.isMe,
          getIsUser: (f) => f.isUser,
          getIsGroup: (f) => f.isGroup,
          getIsBroadcast: (f) => f.isBroadcast,
          getIsPSA: (f) => f.isPSA,
          getIsIAS: (f) => f.isIAS,
          getIsSupportAccount: (f) => f.isSupportAccount,
          getIsWAContact: (f) => f.isWAContact,
          getIsMyContact: (f) => f.isMyContact,
          getCanRequestPhoneNumber: (f) => f.canRequestPhoneNumber,
          getShowBusinessCheckmarkAsPrimary: (f) =>
            f.showBusinessCheckmarkAsPrimary,
          getShowBusinessCheckmarkAsSecondary: (f) =>
            f.showBusinessCheckmarkAsSecondary,
          getShowBusinessCheckmarkInChatlist: (f) =>
            f.showBusinessCheckmarkInChatlist,
          getIsDisplayNameApproved: (f) => f.isDisplayNameApproved,
          getShouldForceBusinessUpdate: (f) => f.shouldForceBusinessUpdate,
        });
        (0, b.exportModule)(
          a,
          {
            getDisplayName: "getDisplayName",
            getPnForLid: "getPnForLid",
            getDisplayNameOrPnForLid: [
              "getUserDisplayNameForLid",
              "getDisplayNameOrPnForLid",
            ],
            getFormattedPhone: "getFormattedPhone",
            getSearchName: "getSearchName",
            getFormattedShortNameWithNonBreakingSpaces:
              "getFormattedShortNameWithNonBreakingSpaces",
            getFormattedShortName: "getFormattedShortName",
            getFormattedName: "getFormattedName",
            getFormattedUser: "getFormattedUser",
          },
          (f) => f.getDisplayName && f.getFormattedName
        );
        (0, l.injectFallbackModule)("getDisplayName", {
          getDisplayName: (f) => f.displayName,
          getPnForLid: (f) => f.pnForLid,
          getDisplayNameOrPnForLid: (f) => f.displayNameOrPnForLid,
          getFormattedPhone: (f) => f.formattedPhone,
          getSearchName: (f) => f.searchName,
          getFormattedShortNameWithNonBreakingSpaces: (f) =>
            f.formattedShortNameWithNonBreakingSpaces,
          getFormattedShortName: (f) => f.formattedShortName,
          getFormattedName: (f) => f.formattedName,
          getFormattedUser: (f) => f.formattedUser,
        });
      },
      95141: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createEventCallLink: "createEventCallLink" },
          (f) => f.createEventCallLink
        );
      },
      95612: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createFanoutMsgStanza: "createFanoutMsgStanza" },
          (f) => f.createFanoutMsgStanza
        );
      },
      97718: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createGroup: "createGroup" },
          (f) => f.createGroup && !f.sendForNeededAddRequest
        );
      },
      7967: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createMsgProtobuf: "createMsgProtobuf" },
          (f) => f.createMsgProtobuf
        );
      },
      28940: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createNewsletterQuery: "createNewsletterQuery" },
          (f) => f.createNewsletterQuery
        );
      },
      48441: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createOrUpdateReactions: ["addOrUpdateReactionsModelCollection"] },
          (f) => f.addOrUpdateReactionsModelCollection
        );
      },
      10293: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { createOrder: "createOrder" },
          (f) => f.createOrder
        );
      },
      25882: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { currencyForCountryShortcode: ["currencyForCountryShortcode"] },
          (f) => f.currencyForCountryShortcode
        );
      },
      51137: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { deleteNewsletter: "deleteNewsletter" },
          (f) => f.deleteNewsletter
        );
      },
      85882: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { editBusinessProfile: "editBusinessProfile" },
          (f) => f.editBusinessProfile
        );
      },
      82641: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { editNewsletterMetadataAction: "editNewsletterMetadataAction" },
          (f) => f.editNewsletterMetadataAction
        );
      },
      4375: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encodeMaybeMediaType: "encodeMaybeMediaType" },
          (f) => f.encodeMaybeMediaType
        );
      },
      16877: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encryptAndSendGroupMsg: "encryptAndSendGroupMsg" },
          (f) => f.encryptAndSendGroupMsg
        );
      },
      53008: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encryptAndSendMsg: "encryptAndSendMsg" },
          (f) => f.encryptAndSendMsg
        );
      },
      32: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encryptAndSendSenderKeyMsg: "encryptAndSendSenderKeyMsg" },
          (f) => f.encryptAndSendSenderKeyMsg
        );
      },
      61158: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encryptAndSendStatusMsg: "encryptAndSendStatusMsg" },
          (f) => f.encryptAndSendStatusMsg
        );
      },
      34040: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { encryptMsgProtobuf: "encryptMsgProtobuf" },
          (f) => f.encryptMsgProtobuf
        );
      },
      6357: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = l(b(1132));
        (0, b(54993).exportModule)(
          a,
          { fetchLinkPreview: ["getLinkPreview", "default"] },
          (e, d) => {
            if (e.getLinkPreview && !e.getAck) return !0;
            e = h.moduleSource(d);
            return (
              e.includes(".genMinimalLinkPreview") &&
              e.includes(".getProductOrCatalogLinkPreview")
            );
          }
        );
      },
      34324: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { findChat: ["findChat", "findOrCreateLatestChat"] },
          (f) => f.findChat || f.findOrCreateLatestChat
        );
      },
      49035: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { findCommonGroups: "findCommonGroups" },
          (f) => f.findCommonGroups
        );
      },
      95554: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { findFirstWebLink: "findFirstWebLink" },
          (f) => f.findFirstWebLink
        );
      },
      84874: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { findOrCreateLatestChat: "findOrCreateLatestChat" },
          (f) => f.findOrCreateLatestChat
        );
      },
      64538: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(1132);
        const f = b(54993),
          k = b(40649);
        (0, f.exportModule)(
          a,
          { forwardMessagesToChats: "forwardMessagesToChats" },
          (h) => h.forwardMessagesToChats
        );
        (0, l.injectFallbackModule)("forwardMessagesToChats", {
          forwardMessagesToChats: (h, e, d) =>
            k.ChatStore.forwardMessagesToChats(h, e, d),
        });
      },
      43593: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { frontendFireAndForget: "frontendFireAndForget" },
          (f) => f.frontendFireAndForget
        );
      },
      24444: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { genBotMsgSecretFromMsgSecret: "genBotMsgSecretFromMsgSecret" },
          (f) => f.genBotMsgSecretFromMsgSecret
        );
      },
      47440: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            genLinkDeviceCodeForPhoneNumber: "genLinkDeviceCodeForPhoneNumber",
          },
          (f) => f.genLinkDeviceCodeForPhoneNumber
        );
      },
      25602: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { genMinimalLinkPreview: "genMinimalLinkPreview" },
          (f) => f.genMinimalLinkPreview
        );
      },
      85541: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { generateVideoThumbsAndDuration: "generateVideoThumbsAndDuration" },
          (f) => f.generateVideoThumbsAndDuration
        );
      },
      95524: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getABPropConfigValue: "getABPropConfigValue" },
          (f) => f.getABPropConfigValue
        );
      },
      92538: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getAsMms: "getAsMms" },
          (f) => f.getAsMms
        );
      },
      42930: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getCommunityParticipants: "getCommunityParticipants" },
          (f) => f.getCommunityParticipants
        );
      },
      19553: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getCountryShortcodeByPhone: ["getCountryShortcodeByPhone"] },
          (f) => f.getCountryShortcodeByPhone
        );
      },
      79731: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getCurrentLid: "getCurrentLid" },
          (f) => f.getCurrentLid
        );
      },
      92787: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getEphemeralFields: "getEphemeralFields" },
          (f) => f.getEphemeralFields
        );
      },
      89168: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getErrorCodeFromLogoutReason: "getErrorCodeFromLogoutReason" },
          (f) => f.getErrorCodeFromLogoutReason
        );
      },
      86362: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getFanOutList: "getFanOutList" },
          (f) => f.getFanOutList
        );
      },
      58084: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getGroupSenderKeyList: "getGroupSenderKeyList",
            markForgetSenderKey: "markForgetSenderKey",
          },
          (f) => f.getGroupSenderKeyList
        );
      },
      66852: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getGroupSizeLimit: "getGroupSizeLimit" },
          (f) => f.getGroupSizeLimit
        );
      },
      6281: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getHistorySyncProgress: [
              "getHistorySyncProgressModel",
              "getHistorySyncProgress",
            ],
          },
          (f) =>
            f.getHistorySyncProgressModel ||
            (f.getHistorySyncProgress && !f.getHistorySyncLogDetailsString)
        );
      },
      54616: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getMembershipApprovalRequests: "getMembershipApprovalRequests" },
          (f) => f.getMembershipApprovalRequests
        );
      },
      78943: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getNewsletterSubscribers: "getNewsletterSubscribers" },
          (f) => f.getNewsletterSubscribers
        );
      },
      52385: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getNextLabelId: "getNextLabelId" },
          (f) => f.getNextLabelId
        );
      },
      21236: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getNumChatsPinned: [
              "getNumChatsPinned",
              "getNumConversationsPinned",
            ],
          },
          (f) => f.getNumChatsPinned || f.getNumConversationsPinned
        );
      },
      29473: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getOrderInfo: "getOrderInfo" },
          (f) => f.getOrderInfo
        );
      },
      55631: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getParticipants: "getParticipants" },
          (f) => f.getParticipants && f.addParticipants
        );
      },
      4389: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getPrivacyDisallowedListTable: "getPrivacyDisallowedListTable" },
          (f) => f.getPrivacyDisallowedListTable
        );
      },
      65130: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getPushname: "getPushname",
            getUserPrivacySettings: "getUserPrivacySettings",
          },
          (f) => f.getPushname && f.setBrowserId && f.getUserPrivacySettings
        );
      },
      21427: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getQuotedMsgObj: "getQuotedMsgObj" },
          (f) => f.getQuotedMsgObj
        );
      },
      23749: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getReactions: "getReactions" },
          (f) => f.getReactions
        );
      },
      73890: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getSearchContext: "getSearchContext" },
          (f) => f.getSearchContext
        );
      },
      36048: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(1132);
        b = b(54993);
        (0, b.exportModule)(
          a,
          {
            getShouldAppearInList: "getShouldAppearInList",
            getPreviewMessage: "getPreviewMessage",
            getShowChangeNumberNotification: "getShowChangeNumberNotification",
            getShouldShowUnreadDivider: "getShouldShowUnreadDivider",
          },
          (f) =>
            f.getShouldAppearInList &&
            f.getPreviewMessage &&
            f.getShowChangeNumberNotification &&
            f.getShouldShowUnreadDivider
        );
        (0, b.exportModule)(
          a,
          { getHasUnread: "getHasUnread" },
          (f) => f.getHasUnread
        );
        (0, l.injectFallbackModule)("getShouldAppearInList", {
          getShouldAppearInList: (f) => f.shouldAppearInList,
          getPreviewMessage: (f) => f.previewMessage,
          getShowChangeNumberNotification: (f) =>
            f.showChangeNumberNotification,
          getShouldShowUnreadDivider: (f) => f.shouldShowUnreadDivider,
        });
        (0, l.injectFallbackModule)("getHasUnread", {
          getHasUnread: (f) => f.hasUnread,
        });
      },
      27027: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getStatusAllowList: "default.getStatusAllowList",
            getStatusContacts: "default.getStatusContacts",
            getStatusDenyList: "default.getStatusDenyList",
            getStatusList: "default.getStatusList",
            getStatusPrivacySetting: "default.getStatusPrivacySetting",
            getStatusPrivacySettingConfig:
              "default.getStatusPrivacySettingConfig",
            setStatusPrivacyConfig: "default.setStatusPrivacyConfig",
          },
          (f) => f.default.getStatusList
        );
      },
      44804: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { getTableVotes: ["getTable"] }, (f) =>
          f.getTable.toString().includes("poll")
        );
      },
      22696: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(1132);
        const f = b(54993),
          k = b(44804),
          h = b(42547);
        (0, f.exportModule)(
          a,
          { getVotes: "getVotes", getVote: "getVote" },
          (e) => e.getVotes && e.getVote
        );
        (0, l.injectFallbackModule)("getVotes", {
          getVote: (e) => e,
          getVotes: async (e) =>
            (
              await (0, k.getTableVotes)().anyOf(
                ["parentMsgKey"],
                e.map((d) => d.toString())
              )
            ).map((d) => (0, h.voteFromDbRow)(d)),
        });
      },
      41968: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            getWhatsAppWebExternalBetaJoinedIdb: [
              "getWhatsAppWebExternalBetaJoinedIdb",
              "getWhatsAppWebBetaJoined",
            ],
            setWhatsAppWebExternalBetaDirtyBitIdb: [
              "setWhatsAppWebExternalBetaDirtyBitIdb",
              "setWhatsAppWebBetaDirtyBit",
            ],
            setWhatsAppWebExternalBetaJoinedIdb: [
              "setWhatsAppWebExternalBetaJoinedIdb",
              "setWhatsAppWebBetaJoined",
            ],
          },
          (f) =>
            (f.getWhatsAppWebExternalBetaJoinedIdb &&
              f.setWhatsAppWebExternalBetaDirtyBitIdb &&
              f.setWhatsAppWebExternalBetaJoinedIdb) ||
            (f.getWhatsAppWebBetaJoined &&
              f.setWhatsAppWebBetaDirtyBit &&
              f.setWhatsAppWebBetaJoined)
        );
      },
      70772: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            addParticipants: "addParticipants",
            removeParticipants: "removeParticipants",
            promoteCommunityParticipants: "promoteCommunityParticipants",
            promoteParticipants: "promoteParticipants",
            demoteCommunityParticipants: "demoteCommunityParticipants",
            demoteParticipants: "demoteParticipants",
          },
          (f) =>
            f.addParticipants &&
            f.removeParticipants &&
            f.promoteCommunityParticipants &&
            f.promoteParticipants &&
            f.demoteCommunityParticipants &&
            f.demoteParticipants &&
            !f.updateParticipants
        );
      },
      2058: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(54993);
        (0, l.exportModule)(
          a,
          {
            handleStatusSimpleAck: ["handleStatusSimpleReceipt"],
            handleStatusSimpleReceipt: ["handleStatusSimpleReceipt"],
          },
          (f) => f.handleStatusSimpleReceipt
        );
        (0, l.exportModule)(
          a,
          {
            handleChatSimpleAck: ["handleChatSimpleReceipt"],
            handleChatSimpleReceipt: ["handleChatSimpleReceipt"],
          },
          (f) => f.handleChatSimpleReceipt
        );
        (0, l.exportModule)(
          a,
          {
            handleGroupSimpleAck: ["handleGroupSimpleReceipt"],
            handleGroupSimpleReceipt: ["handleGroupSimpleReceipt"],
          },
          (f) => f.handleGroupSimpleReceipt
        );
      },
      96954: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { handleSingleMsg: ["handleSingleMsg"] },
          (f) => f.handleSingleMsg
        );
      },
      52757: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(72116), a);
        l(b(19885), a);
        l(b(25736), a);
        l(b(55889), a);
        l(b(50854), a);
        l(b(22328), a);
        l(b(29697), a);
        l(b(77082), a);
        l(b(71274), a);
        l(b(4525), a);
        l(b(58652), a);
        l(b(71400), a);
        l(b(37300), a);
        l(b(95141), a);
        l(b(95612), a);
        l(b(97718), a);
        l(b(7967), a);
        l(b(28940), a);
        l(b(10293), a);
        l(b(48441), a);
        l(b(25882), a);
        l(b(51137), a);
        l(b(85882), a);
        l(b(82641), a);
        l(b(4375), a);
        l(b(16877), a);
        l(b(53008), a);
        l(b(32), a);
        l(b(61158), a);
        l(b(34040), a);
        l(b(6357), a);
        l(b(34324), a);
        l(b(49035), a);
        l(b(95554), a);
        l(b(84874), a);
        l(b(64538), a);
        l(b(43593), a);
        l(b(24444), a);
        l(b(85541), a);
        l(b(47440), a);
        l(b(25602), a);
        l(b(95524), a);
        l(b(92538), a);
        l(b(42930), a);
        l(b(19553), a);
        l(b(79731), a);
        l(b(92787), a);
        l(b(89168), a);
        l(b(86362), a);
        l(b(58084), a);
        l(b(66852), a);
        l(b(6281), a);
        l(b(54616), a);
        l(b(78943), a);
        l(b(52385), a);
        l(b(21236), a);
        l(b(29473), a);
        l(b(55631), a);
        l(b(4389), a);
        l(b(65130), a);
        l(b(21427), a);
        l(b(23749), a);
        l(b(73890), a);
        l(b(36048), a);
        l(b(27027), a);
        l(b(44804), a);
        l(b(22696), a);
        l(b(41968), a);
        l(b(11782), a);
        l(b(70772), a);
        l(b(2058), a);
        l(b(96954), a);
        l(b(89336), a);
        l(b(35454), a);
        l(b(28690), a);
        l(b(5724), a);
        l(b(1009), a);
        l(b(34601), a);
        l(b(97153), a);
        l(b(27981), a);
        l(b(24369), a);
        l(b(33750), a);
        l(b(33750), a);
        l(b(87071), a);
        l(b(946), a);
        l(b(64119), a);
        l(b(43002), a);
        l(b(74323), a);
        l(b(92111), a);
        l(b(14877), a);
        l(b(6678), a);
        l(b(58625), a);
        l(b(65005), a);
        l(b(65512), a);
        l(b(35154), a);
        l(b(51262), a);
        l(b(9534), a);
        l(b(90087), a);
        l(b(40469), a);
        l(b(33433), a);
        l(b(18827), a);
        l(b(34048), a);
        l(b(1703), a);
        l(b(28081), a);
        l(b(76030), a);
        l(b(72110), a);
        l(b(42556), a);
        l(b(99544), a);
        l(b(10200), a);
        l(b(11370), a);
        l(b(67047), a);
        l(b(7882), a);
        l(b(37008), a);
        l(b(2571), a);
        l(b(54649), a);
        l(b(63028), a);
        l(b(17472), a);
        l(b(40502), a);
        l(b(97920), a);
        l(b(98927), a);
        l(b(43410), a);
        l(b(59502), a);
        l(b(98872), a);
        l(b(34910), a);
        l(b(35603), a);
        l(b(83019), a);
        l(b(3424), a);
        l(b(29044), a);
        l(b(80214), a);
        l(b(958), a);
        l(b(54530), a);
        l(b(84236), a);
        l(b(70434), a);
        l(b(50481), a);
        l(b(69758), a);
        l(b(21475), a);
        l(b(88570), a);
        l(b(26206), a);
        l(b(43068), a);
        l(b(76418), a);
        l(b(99481), a);
        l(b(42547), a);
      },
      89336: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { initializeAltDeviceLinking: "initializeAltDeviceLinking" },
          (f) => f.initializeAltDeviceLinking
        );
      },
      35454: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { isAnimatedWebp: "isAnimatedWebp" },
          (f) => f.isAnimatedWebp
        );
      },
      28690: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            isAuthenticated: ["isLoggedIn", "Z"],
            isLoggedIn: ["isLoggedIn", "Z"],
          },
          (f) => {
            var k, h;
            return (
              ((null === (k = f.Z) || void 0 === k
                ? void 0
                : k.toString().includes("isRegistered")) &&
                (null === (h = f.Z) || void 0 === h
                  ? void 0
                  : h.toString().includes("getLoginTokens"))) ||
              f.isLoggedIn
            );
          }
        );
      },
      5724: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            isFilterExcludedFromSearchTreatmentInInboxFlow:
              "isFilterExcludedFromSearchTreatmentInInboxFlow",
          },
          (f) => f.isFilterExcludedFromSearchTreatmentInInboxFlow
        );
      },
      1009: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { isRegistered: ["isRegistered"] },
          (f) => f.isRegistered
        );
      },
      34601: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            isUnreadTypeMsg: [
              "isUnreadTypeMsg",
              "isUnreadType",
              "getIsUnreadType",
            ],
          },
          (f) => f.isUnreadTypeMsg || f.isUnreadType || f.getIsUnreadType
        );
      },
      97153: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { isWid: "default.isWid" },
          (f) => f.default.isWid
        );
      },
      27981: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { joinGroupViaInvite: "joinGroupViaInvite" },
          (f) => f.joinGroupViaInvite && f.resetGroupInviteCode
        );
      },
      24369: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { keepMessage: "keepMessage", undoKeepMessage: "undoKeepMessage" },
          (f) => f.keepMessage
        );
      },
      33750: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            labelAddAction: "labelAddAction",
            labelDeleteAction: "labelDeleteAction",
            labelEditAction: "labelEditAction",
          },
          (f) => f.labelAddAction && f.labelDeleteAction && f.labelEditAction
        );
      },
      87071: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(54993);
        (0, l.exportModule)(
          a,
          { markUnread: "markUnread", sendSeen: "sendSeen" },
          (f) => f.markUnread && f.sendSeen
        );
        (0, l.exportModule)(
          a,
          { markPlayed: "markPlayed", canMarkPlayed: "canMarkPlayed" },
          (f) => f.markPlayed
        );
      },
      946: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { mediaTypeFromProtobuf: "mediaTypeFromProtobuf" },
          (f) => f.mediaTypeFromProtobuf
        );
      },
      64119: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            membershipApprovalRequestAction: "membershipApprovalRequestAction",
          },
          (f) => f.membershipApprovalRequestAction
        );
      },
      43002: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { msgDataFromMsgModel: "msgDataFromMsgModel" },
          (f) => f.msgDataFromMsgModel
        );
      },
      74323: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { msgFindQuery: "msgFindQuery" },
          (f) =>
            (f.msgFindQuery && f.getMsgsByMsgKey) ||
            (f.msgFindQuery && f.queryMessageType)
        );
      },
      92111: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { muteNewsletter: "muteNewsletter" },
          (f) => f.muteNewsletter
        );
      },
      14877: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { processRawAudioVideo: "processRawAudioVideo" },
          (f) => f.processRawAudioVideo
        );
      },
      6678: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { processRawMedia: ["processRawMedia", "default"] },
          (f) => {
            var k, h;
            return (
              f.processRawMedia ||
              (null ===
                (h =
                  null === (k = f.default) || void 0 === k
                    ? void 0
                    : k.toString) || void 0 === h
                ? void 0
                : h.call(k).includes("Received unsupported mediaType"))
            );
          }
        );
      },
      58625: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { processRawSticker: "processRawSticker" },
          (f) => f.processRawSticker
        );
      },
      65512: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { productVisibilitySet: "productVisibilitySet" },
          (f) => f.productVisibilitySet
        );
      },
      65005: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            addProduct: "addProduct",
            editProduct: "editProduct",
            deleteProducts: "deleteProducts",
            sendProductToChat: "sendProductToChat",
            queryCatalog: "queryCatalog",
            queryProduct: "queryProduct",
            queryProductList: "queryProductList",
          },
          (f) => f.sendProductToChat
        );
      },
      35154: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            sendSetPicture: "sendSetPicture",
            requestDeletePicture: "requestDeletePicture",
          },
          (f) => f.sendSetPicture && f.requestDeletePicture
        );
      },
      51262: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { queryAllGroups: "queryAllGroups" },
          (f) => f.queryAllGroups
        );
      },
      9534: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { queryGroupInviteCode: "queryGroupInviteCode" },
          (f) => f.queryGroupInviteCode && f.resetGroupInviteCode
        );
      },
      90087: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { queryNewsletterMetadataByJid: "queryNewsletterMetadataByJid" },
          (f) => f.queryNewsletterMetadataByJid
        );
      },
      40469: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { queryOrder: "queryOrder" },
          (f) => f.queryOrder && f.queryOrderResponse
        );
      },
      33433: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { randomHex: "randomHex" },
          (f) => f.randomHex
        );
      },
      18827: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { randomMessageId: ["default.newId"] },
          (f) => f.default.newId
        );
      },
      34048: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { removeStatusMessage: ["removeStatusMessage"] },
          (f) => f.removeStatusMessage
        );
      },
      1703: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { resetGroupInviteCode: "resetGroupInviteCode" },
          (f) => f.resetGroupInviteCode
        );
      },
      28081: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { revokeStatus: ["default"] }, (f) => {
          var k, h;
          return null ===
            (h =
              null === (k = f.default) || void 0 === k
                ? void 0
                : k.displayName) || void 0 === h
            ? void 0
            : h.includes("RevokeStatusAction");
        });
      },
      76030: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendClear: "sendClear" },
          (f) => f.sendClear && !f.clearStorage
        );
      },
      72110: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            sendCreateCommunity: "sendCreateCommunity",
            sendDeactivateCommunity: "sendDeactivateCommunity",
            sendLinkSubgroups: "sendLinkSubgroups",
            sendUnlinkSubgroups: "sendUnlinkSubgroups",
          },
          (f) => f.sendCreateCommunity
        );
      },
      42556: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(38385);
        l = l(b(1132));
        const e = b(54993),
          d = b(97718);
        (0, e.exportModule)(
          a,
          { sendCreateGroup: "sendCreateGroup" },
          (c) => c.sendCreateGroup
        );
        l.injectFallbackModule("sendCreateGroup", {
          sendCreateGroup: async (c, g, m, n) =>
            (0, h.compare)(self.Debug.VERSION, "2.3000.1014489107", ">=")
              ? await (0, d.createGroup)(
                  {
                    title: c,
                    ephemeralDuration: m || 0,
                    restrict: !0,
                    announce: !0,
                    membershipApprovalMode: !1,
                    memberAddMode: !0,
                    parentGroupId: n,
                  },
                  g
                ).then((p) => ({
                  gid: p.wid,
                  participants: p.participants.map((r) => ({
                    userWid: r.wid,
                    code: null != r.error ? r.error.toString() : "200",
                    invite_code: r.invite_code,
                    invite_code_exp: r.invite_code_exp,
                  })),
                }))
              : await (0, d.createGroup)(c, g, m, n).then((p) => ({
                  gid: p.wid,
                  participants: p.participants.map((r) => ({
                    userWid: r.wid,
                    code: null != r.error ? r.error.toString() : "200",
                    invite_code: r.invite_code,
                    invite_code_exp: r.invite_code_exp,
                  })),
                })),
        });
      },
      99544: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendDelete: "sendDelete" },
          (f) => f.sendDelete
        );
      },
      10200: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendExitGroup: "sendExitGroup" },
          (f) => f.sendExitGroup
        );
      },
      11370: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            sendAddParticipants: [
              "sendAddParticipants",
              "addGroupParticipants",
            ],
            sendRemoveParticipants: [
              "sendRemoveParticipants",
              "removeGroupParticipants",
            ],
            sendPromoteParticipants: [
              "sendPromoteParticipants",
              "promoteGroupParticipants",
            ],
            sendDemoteParticipants: [
              "sendDemoteParticipants",
              "demoteGroupParticipants",
            ],
          },
          (f) =>
            (f.sendAddParticipants &&
              f.sendRemoveParticipants &&
              f.sendPromoteParticipants &&
              f.sendDemoteParticipants) ||
            (f.addGroupParticipants &&
              f.removeGroupParticipants &&
              f.promoteGroupParticipants &&
              f.demoteGroupParticipants)
        );
      },
      67047: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (g, m, n, p) {
                  void 0 === p && (p = n);
                  var r = Object.getOwnPropertyDescriptor(m, n);
                  (r &&
                    ("get" in r
                      ? m.__esModule
                      : !r.writable && !r.configurable)) ||
                    (r = {
                      enumerable: !0,
                      get: function () {
                        return m[n];
                      },
                    });
                  Object.defineProperty(g, p, r);
                }
              : function (g, m, n, p) {
                  void 0 === p && (p = n);
                  g[p] = m[n];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (g, m) {
                  Object.defineProperty(g, "default", {
                    enumerable: !0,
                    value: m,
                  });
                }
              : function (g, m) {
                  g.default = m;
                });
        l =
          (this && this.__importStar) ||
          function (g) {
            if (g && g.__esModule) return g;
            var m = {};
            if (null != g)
              for (var n in g)
                "default" !== n &&
                  Object.prototype.hasOwnProperty.call(g, n) &&
                  f(m, g, n);
            return k(m, g), m;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(64456);
        l = l(b(1132));
        const e = b(14647),
          d = b(54993),
          c = b(27981);
        (0, d.exportModule)(
          a,
          { sendJoinGroupViaInvite: "sendJoinGroupViaInvite" },
          (g) => g.sendJoinGroupViaInvite
        );
        l.injectFallbackModule("sendJoinGroupViaInvite", {
          sendJoinGroupViaInvite: async (g) => {
            const m = await (0, h.getGroupInfoFromInviteCode)(g);
            return e.ChatStore.get(m.id.toString()) &&
              (await (0, h.iAmMember)(m.id.toString()))
              ? m.id
              : await (0, c.joinGroupViaInvite)(g).then((n) => n.gid);
          },
        });
      },
      7882: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            sendNewsletterMessageJob: [
              "sendNewsletterMessageJob",
              "sendNewsletterMessage",
            ],
          },
          (f) => f.sendNewsletterMessageJob || f.sendNewsletterMessage
        );
      },
      37008: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendPinInChatMsg: "sendPinInChatMsg" },
          (f) => f.sendPinInChatMsg
        );
      },
      2571: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendQueryExists: ["queryExists", "queryWidExists"] },
          (f) =>
            (f.queryExists && f.queryPhoneExists) ||
            (f.queryWidExists && f.queryPhoneExists)
        );
      },
      54649: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendQueryGroupInvite: "sendQueryGroupInvite" },
          (f) => f.sendQueryGroupInvite
        );
      },
      63028: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (c, g, m, n) {
                  void 0 === n && (n = m);
                  var p = Object.getOwnPropertyDescriptor(g, m);
                  (p &&
                    ("get" in p
                      ? g.__esModule
                      : !p.writable && !p.configurable)) ||
                    (p = {
                      enumerable: !0,
                      get: function () {
                        return g[m];
                      },
                    });
                  Object.defineProperty(c, n, p);
                }
              : function (c, g, m, n) {
                  void 0 === n && (n = m);
                  c[n] = g[m];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (c, g) {
                  Object.defineProperty(c, "default", {
                    enumerable: !0,
                    value: g,
                  });
                }
              : function (c, g) {
                  c.default = g;
                });
        l =
          (this && this.__importStar) ||
          function (c) {
            if (c && c.__esModule) return c;
            var g = {};
            if (null != c)
              for (var m in c)
                "default" !== m &&
                  Object.prototype.hasOwnProperty.call(c, m) &&
                  f(g, c, m);
            return k(g, c), g;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = b(64456);
        l = l(b(1132));
        const e = b(54993),
          d = b(52757);
        (0, e.exportModule)(
          a,
          { sendQueryGroupInviteCode: "sendQueryGroupInviteCode" },
          (c) => c.sendQueryGroupInviteCode
        );
        l.injectFallbackModule("sendQueryGroupInviteCode", {
          sendQueryGroupInviteCode: async (c) => {
            const g = await (0, h.iAmAdmin)(c);
            return await (0, d.queryGroupInviteCode)(c, g).then((m) => m.code);
          },
        });
      },
      17472: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendReactionToMsg: "sendReactionToMsg" },
          (f) => f.sendReactionToMsg
        );
      },
      40502: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = l(b(1132));
        const h = b(54993),
          e = b(1703);
        (0, h.exportModule)(
          a,
          { sendRevokeGroupInviteCode: "sendRevokeGroupInviteCode" },
          (d) => d.sendRevokeGroupInviteCode
        );
        l.injectFallbackModule("sendRevokeGroupInviteCode", {
          sendRevokeGroupInviteCode: async (d) =>
            await (0, e.resetGroupInviteCode)(d).then((c) => c.code),
        });
      },
      97920: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendTextMsgToChat: "sendTextMsgToChat" },
          (f) => f.sendTextMsgToChat
        );
      },
      98927: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { setArchive: "setArchive" },
          (f) => f.setArchive
        );
      },
      43410: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            sendSetGroupSubject: ["sendSetGroupSubject", "setGroupSubject"],
            sendSetGroupDescription: [
              "sendSetGroupDescription",
              "setGroupDescription",
            ],
            sendSetGroupProperty: ["sendSetGroupProperty", "setGroupProperty"],
          },
          (f) =>
            (f.sendSetGroupSubject &&
              f.sendSetGroupDescription &&
              f.sendSetGroupProperty) ||
            (f.setGroupSubject && f.setGroupDescription && f.setGroupProperty)
        );
      },
      59502: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { setPin: "setPin" },
          (f) => f.setPin && !f.unpinAll && !f.getPinLimit
        );
      },
      98872: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { setPrivacyForOneCategory: "setPrivacyForOneCategory" },
          (f) => f.setPrivacyForOneCategory
        );
      },
      34910: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { setPushname: "setPushname" },
          (f) => f.setPushname && !f.setBrowserId
        );
      },
      35603: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { getStatus: "getStatus", setMyStatus: "setMyStatus" },
          (f) => f.getStatus && f.setMyStatus && f.queryStatusAll
        );
      },
      3424: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { primaryFeatureEnabled: "primaryFeatureEnabled" },
          (f) => f.primaryFeatureEnabled
        );
      },
      29044: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { subscribePresence: "subscribePresence" },
          (f) => f.subscribePresence
        );
      },
      80214: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { syncABPropsTask: "syncABPropsTask" },
          (f) => f.syncABPropsTask
        );
      },
      958: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { typeAttributeFromProtobuf: "typeAttributeFromProtobuf" },
          (f) => f.typeAttributeFromProtobuf
        );
      },
      54530: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        let f = !1;
        (0, b(54993).exportModule)(
          a,
          {
            unixTime: ["unixTime", "Clock.globalUnixTime"],
            unixTimeMs: ["unixTimeMs", "Clock.globalUnixTimeMilliseconds"],
          },
          (k) => {
            var h, e;
            return (
              !!k.unixTime ||
              (!f &&
                (null === (h = k.Clock) || void 0 === h
                  ? void 0
                  : h.globalUnixTime) &&
                ((f = !0),
                (k.Clock.globalUnixTime = k.Clock.globalUnixTime.bind(k.Clock)),
                (k.Clock.globalUnixTimeMilliseconds =
                  k.Clock.globalUnixTimeMilliseconds.bind(k.Clock))),
              null === (e = k.Clock) || void 0 === e
                ? void 0
                : e.globalUnixTime)
            );
          }
        );
      },
      84236: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { unmuteNewsletter: "unmuteNewsletter" },
          (f) => f.unmuteNewsletter
        );
      },
      70434: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { updateCart: "updateCart" },
          (f) => f.updateCart
        );
      },
      50481: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { updateCartEnabled: "updateCartEnabled" },
          (f) => f.updateCartEnabled
        );
      },
      69758: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            updateDBForGroupAction: [
              "updateDBForGroupAction",
              "handleGroupActionMD",
            ],
          },
          (f) => f.updateDBForGroupAction || f.handleGroupActionMD
        );
      },
      21475: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            updateNewsletterMsgRecord: "updateNewsletterMsgRecord",
            addNewsletterMsgsRecords: "addNewsletterMsgsRecords",
          },
          (f) => f.updateNewsletterMsgRecord
        );
      },
      88570: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { updateParticipants: "updateParticipants" },
          (f) => f.updateParticipants && f.addParticipants
        );
      },
      26206: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { uploadMedia: "uploadMedia" },
          (f) => f.uploadMedia
        );
      },
      43068: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { uploadProductImage: "uploadProductImage" },
          (f) => f.uploadProductImage && f.MediaPrep
        );
      },
      76418: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = l(b(1132));
        (0, b(54993).exportModule)(
          a,
          { uploadThumbnail: "default" },
          (e, d) => {
            if ("WAWebMediaUploadMmsThumbnail" === d) return !0;
            e = h.moduleSource(d);
            return (
              e.includes("thumbnail") &&
              e.includes(".cancelUploadMedia") &&
              e.includes(".calculateFilehashFromBlob")
            );
          }
        );
      },
      99481: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { upsertVotes: ["upsertVotesDb", "upsertVotes"] },
          (f) => f.upsertVotesDb || f.upsertVotes
        );
      },
      42547: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { voteFromDbRow: ["voteFromDbRow"] },
          (f) => f.voteFromDbRow
        );
      },
      14647: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__exportStar) ||
          function (d, c) {
            for (var g in d)
              "default" === g ||
                Object.prototype.hasOwnProperty.call(c, g) ||
                f(c, d, g);
          };
        var h =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.websocket =
          a.multidevice =
          a.functions =
          a._moduleIdMap =
          a.enums =
          a.contants =
            void 0;
        l(b(12105), a);
        a.contants = h(b(19198));
        a.enums = h(b(20514));
        var e = b(54993);
        Object.defineProperty(a, "_moduleIdMap", {
          enumerable: !0,
          get: function () {
            return e._moduleIdMap;
          },
        });
        a.functions = h(b(52757));
        l(b(45588), a);
        l(b(51990), a);
        a.multidevice = h(b(83703));
        l(b(40649), a);
        a.websocket = h(b(57411));
      },
      84513: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          "Base64",
          (f) => f.encodeB64 && f.decodeB64
        );
      },
      48212: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { Browser: "default" },
          (f) => f.default.id && f.default.startDownloading
        );
      },
      91033: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, "ChatPresence", (f) => f.markComposing);
      },
      35276: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { CmdClass: "CmdImpl", Cmd: "Cmd" },
          (f) => f.Cmd && f.CmdImpl
        );
      },
      46820: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ComposeBoxActions: "ComposeBoxActions" },
          (f) => f.ComposeBoxActions
        );
      },
      19336: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { Conn: "Conn" },
          (f) => (f.Conn && f.ConnImpl) || f.Conn
        );
      },
      42865: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { Constants: "default" },
          (f) => f.default.IMG_THUMB_MAX_EDGE
        );
      },
      26740: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { EventEmitter: "default" },
          (f, k) =>
            "WAWebEventEmitter" === k ||
            f.default
              .toString()
              .includes("Callback parameter passed is not a function")
        );
      },
      33216: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, "ImageUtils", (f) => f.rotateAndResize);
      },
      47868: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (h, e, d, c) {
                  void 0 === c && (c = d);
                  var g = Object.getOwnPropertyDescriptor(e, d);
                  (g &&
                    ("get" in g
                      ? e.__esModule
                      : !g.writable && !g.configurable)) ||
                    (g = {
                      enumerable: !0,
                      get: function () {
                        return e[d];
                      },
                    });
                  Object.defineProperty(h, c, g);
                }
              : function (h, e, d, c) {
                  void 0 === c && (c = d);
                  h[c] = e[d];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (h, e) {
                  Object.defineProperty(h, "default", {
                    enumerable: !0,
                    value: e,
                  });
                }
              : function (h, e) {
                  h.default = e;
                });
        l =
          (this && this.__importStar) ||
          function (h) {
            if (h && h.__esModule) return h;
            var e = {};
            if (null != h)
              for (var d in h)
                "default" !== d &&
                  Object.prototype.hasOwnProperty.call(h, d) &&
                  f(e, h, d);
            return k(e, h), e;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = l(b(1132));
        (0, b(54993).exportModule)(
          a,
          "IsOfficialClient",
          (h) => void 0 !== h.isOfficialClient
        );
        l.injectFallbackModule("IsOfficialClient", { isOfficialClient: !0 });
      },
      4749: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            MediaBlobCacheImpl: [
              "InMemoryMediaBlobCacheImpl",
              "MediaBlobCacheImpl",
            ],
            MediaBlobCache: ["InMemoryMediaBlobCache", "MediaBlobCache"],
          },
          (f) => f.InMemoryMediaBlobCacheImpl || f.MediaBlobCache
        );
      },
      32974: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MediaEntry: ["EncryptedMediaEntry", "MediaEntry"] },
          (f) => f.EncryptedMediaEntry || f.MediaEntry
        );
      },
      78959: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MediaObject: "MediaObject" },
          (f) => f.webMediaTypeToWamMediaType
        );
      },
      69675: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          "MediaObjectUtil",
          (f) => f.getOrCreateMediaObject
        );
      },
      91911: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          "MediaPrep",
          (f) => f.uploadProductImage && f.MediaPrep
        );
      },
      33115: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          "MediaUtils",
          (f) => f.getImageWidthHeight
        );
      },
      18358: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { MsgKey: "default" }, (f) =>
          f.default.toString().includes("MsgKey error: obj is null/undefined")
        );
      },
      36061: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { MsgLoad: "ChatMsgsCollection" },
          (f) => f.ChatMsgsCollection
        );
      },
      19424: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { NetworkStatus: "default" },
          (f) => f.default.checkOnline
        );
      },
      84229: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = b(54993);
        (0, l.exportModule)(
          a,
          { OpaqueDataBase: "default" },
          (f) => f.default.prototype.throwIfReleased
        );
        (0, l.exportModule)(
          a,
          { OpaqueData: "default" },
          (f) => f.default.createFromData
        );
      },
      74070: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ProductCatalogSession: "ProductCatalogSession" },
          (f) => f.ProductCatalogSession
        );
      },
      65931: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ServerProps: "ServerProps" },
          (f) => f.getMaxFilesSizeServerProp && f.ServerProps
        );
      },
      82183: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { Socket: "Socket" }, (f) => f.Socket);
      },
      40302: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { Stream: "Stream" }, (f) => f.Stream);
      },
      32122: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { USyncQuery: "USyncQuery" },
          (f) => f.USyncQuery
        );
      },
      59659: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { USyncUser: "USyncUser" },
          (f) => f.USyncUser
        );
      },
      43871: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, "UserPrefs", (f) => f.getMaybeMeUser);
      },
      70924: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, "VCard", (f) => f.vcardFromContactModel);
      },
      94484: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { Wid: "default" },
          (f) => f.default.isXWid
        );
      },
      43996: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, "WidFactory", (f) => f.createWid);
      },
      45588: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(84513), a);
        l(b(48212), a);
        l(b(91033), a);
        l(b(35276), a);
        l(b(46820), a);
        l(b(19336), a);
        l(b(42865), a);
        l(b(26740), a);
        l(b(33216), a);
        l(b(47868), a);
        l(b(4749), a);
        l(b(32974), a);
        l(b(78959), a);
        l(b(69675), a);
        l(b(91911), a);
        l(b(33115), a);
        l(b(18358), a);
        l(b(36061), a);
        l(b(19424), a);
        l(b(84229), a);
        l(b(74070), a);
        l(b(65931), a);
        l(b(82183), a);
        l(b(40302), a);
        l(b(43871), a);
        l(b(32122), a);
        l(b(59659), a);
        l(b(70924), a);
        l(b(94484), a);
        l(b(43996), a);
      },
      10298: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "AggReactionsModel");
      },
      38656: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "AttachMediaModel");
      },
      27502: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "BlocklistModel");
      },
      94805: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "BotProfileModel");
      },
      51478: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "BusinessCategoriesResultModel");
      },
      33436: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "BusinessProfileModel");
      },
      98651: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "CallModel");
      },
      5424: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "CartItemModel");
      },
      55001: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "CartModel");
      },
      84424: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "CatalogModel");
      },
      19717: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ChatModel");
      },
      28702: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ChatPreferenceModel");
      },
      57516: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ChatstateModel: "Chatstate" },
          (f) => (f.Chatstate && f.ChatstateCollection) || f.Chatstate
        );
      },
      27961: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ConnModel: ["ConnImpl", "Conn"] },
          (f) => f.ConnImpl || (f.Conn && !f.ConnImpl)
        );
      },
      89853: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ContactModel");
      },
      39467: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ConversionTupleModel");
      },
      52710: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "EmojiVariantModel");
      },
      84291: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "GroupMetadataModel");
      },
      43669: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (d, c, g, m) {
                  void 0 === m && (m = g);
                  var n = Object.getOwnPropertyDescriptor(c, g);
                  (n &&
                    ("get" in n
                      ? c.__esModule
                      : !n.writable && !n.configurable)) ||
                    (n = {
                      enumerable: !0,
                      get: function () {
                        return c[g];
                      },
                    });
                  Object.defineProperty(d, m, n);
                }
              : function (d, c, g, m) {
                  void 0 === m && (m = g);
                  d[m] = c[g];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (d, c) {
                  Object.defineProperty(d, "default", {
                    enumerable: !0,
                    value: c,
                  });
                }
              : function (d, c) {
                  d.default = c;
                });
        l =
          (this && this.__importStar) ||
          function (d) {
            if (d && d.__esModule) return d;
            var c = {};
            if (null != d)
              for (var g in d)
                "default" !== g &&
                  Object.prototype.hasOwnProperty.call(d, g) &&
                  f(c, d, g);
            return k(c, d), c;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l = l(b(1132));
        const h = b(54993),
          e = b(52757);
        (0, h.exportModule)(
          a,
          { HistorySyncProgressModel: "HistorySyncProgressModel" },
          (d) => d.HistorySyncProgressModel
        );
        a = {};
        Object.defineProperty(a, "HistorySyncProgressModel", {
          configurable: !0,
          enumerable: !0,
          get: () => (0, e.getHistorySyncProgress)().constructor,
        });
        l.injectFallbackModule("HistorySyncProgressModel", a);
      },
      74910: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "LabelItemModel");
      },
      30207: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "LabelModel");
      },
      67437: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MediaDataModel");
      },
      8375: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { Model: "BaseModel" },
          (f) => f.defineModel
        );
      },
      29836: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ModelChatBase: "default" },
          (f, k) =>
            "WAWebSuperChatMsgs" === k ||
            f.default.toString().includes("onEmptyMRM not implemented")
        );
      },
      35717: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MsgButtonReplyMsgModel");
      },
      41202: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MsgInfoModel");
      },
      88753: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MsgInfoParticipantModel");
      },
      99090: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MsgModel");
      },
      51868: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "MuteModel");
      },
      17993: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { NetworkStatusModel: "default.constructor" },
          (f) => f.default.checkOnline
        );
      },
      76959: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "NoteModel");
      },
      40688: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "OrderItemModel");
      },
      55961: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "OrderModel");
      },
      88758: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ParticipantModel");
      },
      53356: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { PresenceModel: "Presence" },
          (f) =>
            (f.Presence && f.ChatstateCollection) || (f.Presence && f.Chatstate)
        );
      },
      62078: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ProductCollModel");
      },
      60771: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ProductImageModel");
      },
      11685: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ProductMessageListModel: "ProductMessageList" },
          (f) => f.ProductMessageList
        );
      },
      68364: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ProductModel");
      },
      18486: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ProfilePicThumbModel");
      },
      76520: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "QuickReplyModel");
      },
      37285: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ReactionsModel");
      },
      83497: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ReactionsSendersModel");
      },
      49040: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "RecentEmojiModel");
      },
      56875: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "RecentStickerModel");
      },
      42217: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "ReplyButtonModel");
      },
      23752: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ServerPropsModel: "ServerProps" },
          (f) => f.getMaxFilesSizeServerProp && f.ServerProps
        );
      },
      38428: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { Socket: "Socket.constructor" }, (f) => {
          var k;
          return null === (k = f.Socket) || void 0 === k ? void 0 : k.initConn;
        });
      },
      8489: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { StatusModel: ["default"] }, (f) => {
          var k;
          return null === (k = f.default) || void 0 === k
            ? void 0
            : k.prototype.__props.includes("status");
        });
      },
      77104: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { StatusV3Model: ["default"] }, (f) => {
          var k;
          return null === (k = f.default) || void 0 === k
            ? void 0
            : k.prototype.sendReadStatus;
        });
      },
      4268: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "StickerModel");
      },
      45287: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "StickerPackModel");
      },
      15567: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { StreamModel: "Stream.constructor" },
          (f) => f.Stream
        );
      },
      30781: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "TemplateButtonModel");
      },
      25468: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportProxyModel)(a, "UnreadMentionModel");
      },
      51990: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(10298), a);
        l(b(38656), a);
        l(b(27502), a);
        l(b(94805), a);
        l(b(51478), a);
        l(b(33436), a);
        l(b(98651), a);
        l(b(5424), a);
        l(b(55001), a);
        l(b(84424), a);
        l(b(19717), a);
        l(b(28702), a);
        l(b(57516), a);
        l(b(27961), a);
        l(b(89853), a);
        l(b(39467), a);
        l(b(52710), a);
        l(b(84291), a);
        l(b(43669), a);
        l(b(74910), a);
        l(b(30207), a);
        l(b(67437), a);
        l(b(8375), a);
        l(b(29836), a);
        l(b(35717), a);
        l(b(41202), a);
        l(b(88753), a);
        l(b(99090), a);
        l(b(51868), a);
        l(b(17993), a);
        l(b(76959), a);
        l(b(40688), a);
        l(b(55961), a);
        l(b(88758), a);
        l(b(88758), a);
        l(b(53356), a);
        l(b(62078), a);
        l(b(60771), a);
        l(b(11685), a);
        l(b(68364), a);
        l(b(18486), a);
        l(b(76520), a);
        l(b(37285), a);
        l(b(83497), a);
        l(b(49040), a);
        l(b(56875), a);
        l(b(42217), a);
        l(b(23752), a);
        l(b(38428), a);
        l(b(8489), a);
        l(b(77104), a);
        l(b(4268), a);
        l(b(45287), a);
        l(b(15567), a);
        l(b(30781), a);
        l(b(25468), a);
      },
      1570: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          "adv",
          (f) => f.getADVSecretKey && f.setADVSignedIdentity
        );
      },
      83703: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(1570), a);
        l(b(91921), a);
        l(b(60154), a);
      },
      91921: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { waNoiseInfo: "waNoiseInfo" },
          (f) => f.waNoiseInfo
        );
      },
      60154: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { waSignalStore: "waSignalStore" },
          (f) => f.waSignalStore
        );
      },
      40649: function (l, a, b) {
        var f =
            (this && this.__createBinding) ||
            (Object.create
              ? function (e, d, c, g) {
                  void 0 === g && (g = c);
                  var m = Object.getOwnPropertyDescriptor(d, c);
                  (m &&
                    ("get" in m
                      ? d.__esModule
                      : !m.writable && !m.configurable)) ||
                    (m = {
                      enumerable: !0,
                      get: function () {
                        return d[c];
                      },
                    });
                  Object.defineProperty(e, g, m);
                }
              : function (e, d, c, g) {
                  void 0 === g && (g = c);
                  e[g] = d[c];
                }),
          k =
            (this && this.__setModuleDefault) ||
            (Object.create
              ? function (e, d) {
                  Object.defineProperty(e, "default", {
                    enumerable: !0,
                    value: d,
                  });
                }
              : function (e, d) {
                  e.default = d;
                });
        l =
          (this && this.__importStar) ||
          function (e) {
            if (e && e.__esModule) return e;
            var d = {};
            if (null != e)
              for (var c in e)
                "default" !== c &&
                  Object.prototype.hasOwnProperty.call(e, c) &&
                  f(d, e, c);
            return k(d, e), d;
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        const h = l(b(12105));
        b = b(54993);
        l =
          "BlocklistStore BusinessCategoriesResultStore BusinessProfileStore CallStore CartStore CatalogStore ChatStore NewsletterStore ContactStore EmojiVariantStore GroupMetadataStore LabelStore MsgStore MsgInfoStore MuteStore OrderStore PinInChatStore PresenceStore ProductMessageListStore ProfilePicThumbStore QuickReplyStore ReactionsStore RecentEmojiStore StatusStore StatusV3Store StickerStore StickerSearchStore".split(
            " "
          );
        for (const e of l) {
          const d = e.replace("Store", "Collection");
          (0, b.exportModule)(
            a,
            { [e]: ["default", d] },
            (c) => (c.default || c[d]) instanceof h[d]
          );
        }
        (0, b.exportModule)(
          a,
          {
            RecentStickerStore: [
              "default",
              "RecentStickerCollectionMd",
              "RecentStickerCollection",
            ],
          },
          (e) => e.RecentStickerCollection
        );
        (0, b.exportModule)(
          a,
          { StarredMsgStore: ["default", "AllStarredMsgsCollection"] },
          (e) => e.StarredMsgCollection
        );
        (0, b.exportModule)(
          a,
          {
            StickerPackStore: [
              "default",
              "StickerPackCollectionMd",
              "StickerPackCollection",
            ],
          },
          (e) => e.StickerPackCollection
        );
        (0, b.exportModule)(
          a,
          { NewsletterStore: "default.NewsletterCollection" },
          (e) => e.default.NewsletterCollection
        );
        (0, b.exportModule)(
          a,
          { StatusStore: "TextStatusCollection" },
          (e) => e.TextStatusCollection
        );
        (0, b.exportModule)(
          a,
          { StatusV3Store: ["StatusV3Collection", "StatusCollection"] },
          (e) => e.StatusV3CollectionImpl || e.StatusCollection
        );
        (0, b.exportModule)(
          a,
          { BlocklistStore: ["default", "BlocklistCollection"] },
          (e) => e.BlocklistCollection
        );
        (0, b.exportModule)(
          a,
          { PresenceStore: ["PresenceCollectionImpl", "PresenceCollection"] },
          (e) => e.PresenceCollectionImpl || e.PresenceCollection
        );
        (0, b.exportModule)(
          a,
          { CartStore: ["CartCollectionImpl", "CartCollection"] },
          (e) => e.CartCollectionImpl || e.CartCollection
        );
        (0, b.exportModule)(
          a,
          { CatalogStore: ["CatalogCollectionImpl", "CatalogCollection"] },
          (e) => e.CatalogCollectionImpl || e.CatalogCollection
        );
        (0, b.exportModule)(
          a,
          {
            EmojiVariantStore: [
              "EmojiVariantCollectionImpl",
              "EmojiVariantCollection",
            ],
          },
          (e) => e.EmojiVariantCollectionImpl || e.EmojiVariantCollection
        );
        (0, b.exportModule)(
          a,
          { LabelStore: ["LabelCollectionImpl", "LabelCollection"] },
          (e) => e.LabelCollectionImpl || e.LabelCollection
        );
        (0, b.exportModule)(
          a,
          { MsgInfoStore: ["MsgInfoCollectionImpl", "MsgInfoCollection"] },
          (e) => e.MsgInfoCollectionImpl || e.MsgInfoCollection
        );
        (0, b.exportModule)(
          a,
          { MuteStore: ["MuteCollectionImpl", "MuteCollection"] },
          (e) => e.MuteCollectionImpl || e.MuteCollection
        );
        (0, b.exportModule)(
          a,
          { OrderStore: ["OrderCollectionImpl", "OrderCollection"] },
          (e) => e.OrderCollectionImpl || e.OrderCollection
        );
        (0, b.exportModule)(
          a,
          {
            PinInChatStore: ["PinInChatCollectionImpl", "PinInChatCollection"],
          },
          (e) => e.PinInChatCollectionImpl || e.PinInChatCollection
        );
        (0, b.exportModule)(
          a,
          {
            ProductMessageListStore: [
              "ProductMessageListCollectionImpl",
              "ProductMessageListCollection",
            ],
          },
          (e) =>
            e.ProductMessageListCollectionImpl || e.ProductMessageListCollection
        );
        (0, b.exportModule)(
          a,
          {
            RecentEmojiStore: [
              "RecentEmojiCollectionImpl",
              "RecentEmojiCollection",
            ],
          },
          (e) => e.RecentEmojiCollectionImpl || e.RecentEmojiCollection
        );
        (0, b.exportModule)(
          a,
          {
            StickerSearchStore: [
              "StickerSearchCollectionImpl",
              "StickerSearchCollection",
            ],
          },
          (e) => e.StickerSearchCollectionImpl || e.StickerSearchCollection
        );
        (0, b.exportModule)(
          a,
          {
            BusinessProfileStore: [
              "BusinessProfileCollectionImpl",
              "BusinessProfileCollection",
            ],
          },
          (e) => e.BusinessProfileCollectionImpl || e.BusinessProfileCollection
        );
        (0, b.exportModule)(
          a,
          { BotProfileStore: ["BotProfileCollection"] },
          (e) => e.BotProfileCollection
        );
        (0, b.exportModule)(
          a,
          {
            ProfilePicThumbStore: [
              "ProfilePicThumbCollection",
              "ProfilePicThumbCollectionImpl",
            ],
          },
          (e) => e.ProfilePicThumbCollection || e.ProfilePicThumbCollectionImpl
        );
        (0, b.exportModule)(
          a,
          {
            QuickReplyStore: [
              "QuickReplyCollectionImpl",
              "QuickReplyCollection",
            ],
          },
          (e) => e.QuickReplyCollectionImpl || e.QuickReplyCollection
        );
        (0, b.exportModule)(
          a,
          { NoteStore: ["NoteCollection"] },
          (e) => e.NoteCollection
        );
        (0, b.exportModule)(
          a,
          {
            ReactionsStore: ["ReactionsCollectionImpl", "ReactionsCollection"],
          },
          (e) => e.ReactionsCollectionImpl || e.ReactionsCollection
        );
      },
      34439: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { WapNode: "WapNode" }, (f) => f.WapNode);
      },
      57346: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { ensureE2ESessions: "ensureE2ESessions" },
          (f) => f.ensureE2ESessions
        );
      },
      12045: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { generateId: "generateId" },
          (f) => f.generateId
        );
      },
      57411: function (l, a, b) {
        var f =
          (this && this.__createBinding) ||
          (Object.create
            ? function (k, h, e, d) {
                void 0 === d && (d = e);
                var c = Object.getOwnPropertyDescriptor(h, e);
                (c &&
                  ("get" in c
                    ? h.__esModule
                    : !c.writable && !c.configurable)) ||
                  (c = {
                    enumerable: !0,
                    get: function () {
                      return h[e];
                    },
                  });
                Object.defineProperty(k, d, c);
              }
            : function (k, h, e, d) {
                void 0 === d && (d = e);
                k[d] = h[e];
              });
        l =
          (this && this.__exportStar) ||
          function (k, h) {
            for (var e in k)
              "default" === e ||
                Object.prototype.hasOwnProperty.call(h, e) ||
                f(h, k, e);
          };
        Object.defineProperty(a, "__esModule", { value: !0 });
        l(b(57346), a);
        l(b(12045), a);
        l(b(82257), a);
        l(b(82590), a);
        l(b(49440), a);
        l(b(81894), a);
        l(b(6123), a);
        l(b(34439), a);
      },
      82257: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { sendSmaxStanza: "sendSmaxStanza" },
          (f) => f.sendSmaxStanza
        );
      },
      82590: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { smax: "smax" }, (f) => f.smax);
      },
      49440: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          { startWebComms: "startWebComms" },
          (f) => f.startWebComms
        );
      },
      81894: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(
          a,
          {
            stopComms: "stopComms",
            startHandlingRequests: "startHandlingRequests",
          },
          (f) => f.stopComms
        );
      },
      6123: (l, a, b) => {
        Object.defineProperty(a, "__esModule", { value: !0 });
        (0, b(54993).exportModule)(a, { wap: "wap" }, (f) => f.wap);
      },
      20748: (l, a) => {
        function b(k, h, e, d) {
          var c = { timer: void 0, lastArgs: [] },
            g = function () {
              for (var m = this, n = [], p = 0; p < arguments.length; p++)
                n[p] = arguments[p];
              c.lastArgs = n;
              c.timer ? clearTimeout(c.timer) : h && e.apply(this, c.lastArgs);
              c.timer = setTimeout(function () {
                h || e.apply(m, c.lastArgs);
                c.timer = void 0;
              }, k);
            };
          return d && (g = g.bind(d)), (g.options = c), g;
        }
        function f(k, h) {
          for (var e = [], d = 2; d < arguments.length; d++)
            e[d - 2] = arguments[d];
          if (0 === e.length)
            throw Error(
              "function applied debounce decorator should be a method"
            );
          if (1 === e.length)
            throw Error(
              "method applied debounce decorator should have valid name"
            );
          d = e[0];
          var c = e[1];
          if (
            (e =
              3 === e.length && e[2]
                ? e[2]
                : Object.getOwnPropertyDescriptor(d, c))
          )
            return (function (g, m, n) {
              return (n.value = b(g, m, n.value)), n;
            })(k, h, e);
          !(function (g, m, n, p) {
            var r;
            Object.defineProperty(n, p, {
              configurable: !0,
              enumerable: !1,
              get: function () {
                return r;
              },
              set: function (t) {
                r = b(g, m, t, this);
              },
            });
          })(k, h, d, c);
        }
        Object.defineProperty(a, "__esModule", { value: !0 });
        a.cancel = function (k) {
          k && k.options && clearTimeout(k.options.timer);
        };
        a.debounce = function () {
          for (var k = [], h = 0; h < arguments.length; h++)
            k[h] = arguments[h];
          var e = 500,
            d = !1;
          return k.length &&
            ("number" == typeof k[0] ||
              ("object" == typeof k[0] && void 0 !== k[0].leading))
            ? ("number" == typeof k[0] && (e = k[0]),
              (h = void 0),
              "object" == typeof k[0] && void 0 !== k[0].leading && (h = k[0]),
              1 < k.length &&
                "object" == typeof k[1] &&
                void 0 !== k[1].leading &&
                (h = k[1]),
              h && (d = h.leading),
              function () {
                for (var c = [], g = 0; g < arguments.length; g++)
                  c[g] = arguments[g];
                return f.apply(void 0, [e, d].concat(c));
              })
            : f.apply(void 0, [e, d].concat(k));
        };
      },
      44276: function (l, a) {
        var b, f;
        var k = [];
        void 0 ===
          (f =
            "function" ==
            typeof (b = function () {
              function h(e) {
                return h.regex.test((e || "").trim());
              }
              return (
                (h.regex =
                  /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i),
                h
              );
            })
              ? b.apply(a, k)
              : b) || (l.exports = f);
      },
      54428: () => {},
    },
    ca = {};
  S.d = (l, a) => {
    for (var b in a)
      S.o(a, b) &&
        !S.o(l, b) &&
        Object.defineProperty(l, b, { enumerable: !0, get: a[b] });
  };
  S.o = (l, a) => Object.prototype.hasOwnProperty.call(l, a);
  S.r = (l) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(l, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(l, "__esModule", { value: !0 });
  };
  var ea = S(28156);
  self.WPP = ea;
})();
class WebResourceCommunicator {
  constructor() {
    this.init();
  }
  init() {
    this.listenForMessages();
  }
  async showNeedsReply() {
    let S = WPP.whatsapp.ChatStore._models.filter(
      (Y) => Y.lastReceivedKey && !Y.lastReceivedKey.fromMe
    );
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showAwaitingReply() {
    let S = WPP.whatsapp.ChatStore._models.filter(
      (Y) => Y.lastReceivedKey && Y.lastReceivedKey.fromMe
    );
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showGroups() {
    let S = WPP.whatsapp.ChatStore._models.filter((Y) => Y.isGroup);
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showUnread() {
    let S = WPP.whatsapp.ChatStore._models.filter((Y) => Y.hasUnread);
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
    console.log("done");
  }
  async showPersonalAcc() {
    let S = WPP.whatsapp.ChatStore._models.filter((Y) => Y.isUser);
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showBusinessAcc() {
    let S = WPP.whatsapp.ChatStore._models.filter((Y) => Y.contact.isBusiness);
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showMentioned() {
    let S = WPP.whatsapp.ChatStore._models.filter((Y) => Y.hasUnreadMention);
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showOfficialAcc() {
    let S = WPP.whatsapp.ChatStore._models.filter(
      (Y) => Y.contact.isEnterprise
    );
    await WPP.chat.setChatList(
      "custom",
      S.map((Y) => Y.id._serialized)
    );
  }
  async showAll() {
    await WPP.chat.setChatList(
      "custom",
      WPP.whatsapp.ChatStore._models.map((S) => S.id._serialized)
    );
  }
  checkArchive(S) {
    return WPP.whatsapp.ChatStore._models.filter((Y) => Y.id.user === S)[0]
      .archive;
  }
  getContacts(S) {
    let Y = WPP.whatsapp.ChatStore._models.filter((ea) => ea.id.user === S);
    if (Y[0].groupMetadata)
      return Y[0].groupMetadata.participants._models.map((ea) => {
        let l =
            WPP.whatsapp.ContactStore.get(ea.id._serialized).name ||
            WPP.whatsapp.ContactStore.get(ea.id._serialized).verifiedName ||
            WPP.whatsapp.ContactStore.get(ea.id._serialized).pushname ||
            ea.id.user,
          a = WPP.whatsapp.ProfilePicThumbStore.get(ea.id._serialized)?.img;
        return { name: l, number: ea.id.user, image: a };
      });
    let ca = WPP.whatsapp.ProfilePicThumbStore.get(Y[0].id._serialized).img;
    return [{ name: Y[0].formattedTitle, number: Y[0].id.user, image: ca }];
  }
  getContact(S) {
    var Y = S + "@c.us",
      ca = WPP.whatsapp.ContactStore.get(Y);
    ca = ca.name || ca.verifiedName || ca.pushname || ca.id.user;
    Y = WPP.whatsapp.ProfilePicThumbStore.get(Y)?.img;
    return [{ name: ca, number: S, image: Y }];
  }
  archiveChat(S) {
    WPP.whatsapp.ChatStore._models.filter((Y) => Y.id.user === S)[0].archive =
      !0;
  }
  getChatNumData(S) {
    let Y = WPP.whatsapp.ChatStore._models,
      ca = Y.filter((d) => S.includes(d.id.user) && d.unreadCount > 0),
      ea = Y.filter((d) => d.contact.isEnterprise && d.unreadCount > 0),
      l = Y.filter((d) => d.contact.isBusiness && d.unreadCount > 0),
      a = Y.filter((d) => d.hasUnreadMention),
      b = Y.filter((d) => d.isUser && d.unreadCount > 0),
      f = Y.filter((d) => d.isGroup && d.unreadCount > 0),
      k = Y.filter((d) => d.hasUnread),
      h = Y.filter((d) => d.lastReceivedKey && d.lastReceivedKey.fromMe),
      e = Y.filter((d) => d.lastReceivedKey && !d.lastReceivedKey.fromMe);
    return {
      all: Y.length,
      starred: ca.length,
      official: ea.length,
      business: l.length,
      mentioned: a.length,
      personal: b.length,
      groups: f.length,
      unread: k.length,
      awaiting: h.length,
      needsReply: e.length,
    };
  }
  unArchiveChat(S) {
    WPP.whatsapp.ChatStore._models.filter((Y) => Y.id.user === S)[0].archive =
      !1;
  }
  async customChats(S) {
    let Y = WPP.whatsapp.ChatStore._models.filter((ca) =>
      S.includes(ca.id.user)
    );
    await WPP.chat.setChatList(
      "custom",
      Y.map((ca) => ca.id._serialized)
    );
  }
  async inboxChats(S, Y) {
    let ca = WPP.whatsapp.ChatStore._models.filter(
      (ea) => !(Y.includes(ea.id.user) || S.includes(ea.id.user))
    );
    await WPP.chat.setChatList(
      "custom",
      ca.map((ea) => ea.id._serialized)
    );
  }
  async starredChats(S) {
    let Y = WPP.whatsapp.ChatStore._models.filter((ca) =>
      S.includes(ca.id.user)
    );
    await WPP.chat.setChatList(
      "custom",
      Y.map((ca) => ca.id._serialized)
    );
  }
  async sendAttachment(S) {
    const Y = S.number + "@c.us";
    var ca = S.attachment.fileData;
    let ea = S.attachment.fileCaption;
    ea = ea.trim();
    ca = await JSON.parse(ca);
    if (
      S.attachment.fileAddTimeStamp == void 0 ||
      S.attachment.fileAddTimeStamp
    )
      (ea += "\n\nSent at: " + new Date().toISOString()), (ea = ea.trim());
    try {
      await WPP.chat.sendFileMessage(Y, ca, {
        type: "auto-detect",
        caption: ea ? ea : null,
        filename: S.attachment.fileName,
      }),
        window.dispatchEvent(new CustomEvent("wam:attachments-sent"));
    } catch (l) {
      console.log(l);
    }
  }
  async filterNumber(S) {
    S = await WPP.contact.queryExists(S.number + "@c.us");
    window.dispatchEvent(
      new CustomEvent("WAM::filtered", {
        detail: { status: S ? "Valid" : "Invalid" },
      })
    );
  }
  listenForMessages() {
    window.addEventListener("message", async (S) => {
      if (S.source === window && S.data.type === "FROM_CONTENT_SCRIPT")
        switch (S.data.message.request) {
          case "getChatNumData":
            S = this.getChatNumData(S.data.message.chatIds);
            this.sendMessageToContentScript({
              response: S,
              for: "getChatNumData",
            });
            break;
          case "custom":
            this.customChats(S.data.message.chatIds);
            break;
          case "Inbox":
            this.inboxChats(
              S.data.message.closedChats,
              S.data.message.snoozedChats
            );
            break;
          case "snoozed":
            this.starredChats(S.data.message.chatIds);
            break;
          case "starred":
            this.starredChats(S.data.message.chatIds);
            break;
          case "closed":
            this.starredChats(S.data.message.chatIds);
            break;
          case "UnArchiveChat":
            this.unArchiveChat(S.data.message.chatId);
            break;
          case "archiveChat":
            this.archiveChat(S.data.message.chatId);
            break;
          case "checkArchive":
            S = this.checkArchive(S.data.message.chatId);
            this.sendMessageToContentScript({
              response: S,
              for: "checkArchive",
            });
            break;
          case "getLinkedContacts":
            let Y = this.getContact(S.data.message.number);
            this.sendMessageToContentScript({
              contact: S.data.message.contact,
              response: JSON.stringify(Y),
              for: "contactsLinkedData",
            });
            break;
          case "getContacts":
            S = this.getContacts(S.data.message.chatId);
            this.sendMessageToContentScript({
              response: JSON.stringify(S),
              for: "contactsData",
            });
            break;
          case "createContact":
            S = this.getContacts(S.data.message.contactId);
            this.sendMessageToContentScript({
              response: JSON.stringify(S),
              for: "createContact",
            });
            break;
          case "unread":
            this.showUnread();
            break;
          case "needsReply":
            this.showNeedsReply();
            break;
          case "awaitingReply":
            this.showAwaitingReply();
            break;
          case "personal":
            this.showPersonalAcc();
            break;
          case "business":
            this.showBusinessAcc();
            break;
          case "official":
            this.showOfficialAcc();
            break;
          case "mentioned":
            this.showMentioned();
            break;
          case "groups":
            this.showGroups();
            break;
          case "sendAttachment":
            this.sendAttachment(S.data.message);
            break;
          case "filterNumber":
            this.filterNumber(S.data.message);
            break;
          default:
            this.showAll();
        }
    });
  }
  sendMessageToContentScript(S) {
    window.postMessage({ type: "FROM_WEB_RESOURCE", message: S }, "*");
  }
}
let contentComm = new WebResourceCommunicator();
