(function () { var t = [].slice, n; (function (i, r) { var u; return u = function () { function t(n) { this.data_attribute = "data-intro"; this.chardinCssClasses = ["chardinjs-helper-layer", "chardinjs-show-element", "chardinjs-relative-position"]; this.$el = i(n); this.sequenced = this.$el.data("chardin-sequenced") ? !0 : !1; this.sequencedItems = this._getSequencedElements(); this.sequenceIdx = 0; this.active = !1; this.timeOut = null; this.isAuto = this.$el.data("chardin-auto") ? !0 : !1; this.delayTime = this.$el.data("chardin-delay") || 2e3; i(r).resize(function (n) { return function () { return n.refresh() } }(this)) } return t.prototype.start = function () { var i, n, r, t; if (this._overlay_visible()) return !1; if (this._add_overlay_layer(), this.sequenced) this.sequenceIdx = 0, this._show_sequenced_element(); else for (t = this.$el.find("*[" + this.data_attribute + "]:visible"), n = 0, r = t.length; n < r; n++)i = t[n], this._show_element(i); return this.active = !0, this.$el.trigger("chardinJs:start") }, t.prototype.toggle = function () { return this._overlay_visible() ? this.stop() : this.start() }, t.prototype.refresh = function () { var r, n, u, t, i; if (this._overlay_visible()) { for (t = this.$el.find("*[" + this.data_attribute + "]:visible"), i = [], n = 0, u = t.length; n < u; n++)r = t[n], i.push(this._position_helper_layer(r)); return i } return this }, t.prototype.stop = function () { var i, n, u, t; for (this.active = !1, this._remove_overlay_layer(), this.$el.find(".chardinjs-helper-layer").remove(), t = this.chardinCssClasses, n = 0, u = t.length; n < u; n++)i = t[n], this._remove_classes(i); return r.removeEventListener ? r.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown), this.sequenceIdx = 0, this.$el.trigger("chardinJs:stop") }, t.prototype._remove_classes = function (n) { return this.$el.find("." + n).removeClass(n) }, t.prototype.set_data_attribute = function (n) { return this.data_attribute = n }, t.prototype.set_data_helptext = function (n) { return this.data_helptext = n }, t.prototype._overlay_visible = function () { return this.$el.find(".chardinjs-overlay").length !== 0 }, t.prototype._add_overlay_layer = function () { var r = "", t = this; if (this._overlay_visible()) return !1; n = document.createElement("div"); n.id = "chardin-mask"; element_position = this._get_offset(this.$el.get()[0]); element_position && (i("*").filter(function () { return i(this).css("position") == "fixed" }).each(function () { i(this)[0].className += " chardinjs-no-fixed" }), n.className = "chardinjs-overlay", r += this.$el.prop("tagName").toUpperCase() === "BODY" ? "top: 0;bottom: 0; left: 0;right: 0;position: fixed;" : "width: " + element_position.width + "px; height:" + element_position.height + "px; top:" + element_position.top + "px;left: " + element_position.left + "px;", n.setAttribute("style", r)); this.$el.get()[0].appendChild(n); this.$el.find("#chardin-mask").fadeIn(); n.onclick = function (n) { return t.sequenced ? t._handleMouseClick(n) : t.stop() } }, t.prototype._remove_overlay_layer = function () { this.$el.find(".chardinjs-helper-layer").remove(); this.$el.find(".chardinjs-show-element").removeClass("chardinjs-show-element"); this.$el.find(".chardinjs-relative-position").removeClass("chardinjs-relative-position"); this.$el.find(".chardinjs-no-fixed").removeClass("chardinjs-no-fixed"); this.$el.find("#chardin-mask").fadeOut(function () { return i(this).remove() }) }, t.prototype._position_overlay_layer = function (n) { return n.className += " chardinjs-show-element " + this._get_css_attribute(n), current_element_position = "", n.currentStyle ? current_element_position = n.currentStyle.position : document.defaultView && document.defaultView.getComputedStyle && (current_element_position = document.defaultView.getComputedStyle(n, null).getPropertyValue("position")), current_element_position = current_element_position.toLowerCase(), current_element_position !== "absolute" && current_element_position !== "relative" ? n.className += " chardinjs-relative-position" : void 0 }, t.prototype._get_position = function (n) { var t, r, i = n.getAttribute(this.data_attribute); return t = i[0] == "#" && this.data_helptext[i].position ? this.data_helptext[i].position : n.getAttribute("data-position"), t == null ? "bottom" : (r = t.split(":")) != null ? r[0] : t }, t.prototype._get_position_offset = function (n) { var t, r, i = n.getAttribute(this.data_attribute); return t = i[0] == "#" && this.data_helptext[i].position ? this.data_helptext[i].position : n.getAttribute("data-position"), t == null ? 1 : 1 + parseInt(((r = t.split(":")) != null ? r[1] : void 0) || 0, 10) / 100 }, t.prototype._get_css_attribute = function (n) { var u, r, i, f, t; if (t = n.getAttribute(this.data_attribute + "-css") || "", t && String(t).replace(/\s/g, "").length > 1) for (r = t.split(" ").filter(function (n) { return n.length !== 0 }), i = 0, f = r.length; i < f; i++)u = r[i], this._add_css_attribute(u); return t }, t.prototype._add_css_attribute = function (n) { if (!i.inArray(n, this.chardinCssClasses) > -1) return this.chardinCssClasses.push(n) }, t.prototype._getStyle = function (n, t, i) { return r.getComputedStyle ? r.getComputedStyle(n, i).getPropertyValue(t) : n.currentStyle[t] }, t.prototype._place_tooltip = function (n, t) { var u, s, r, f, h, c, l, e, o; o = this._get_offset(t); t.style.top = null; t.style.right = null; t.style.bottom = null; t.style.left = null; r = this._get_position(n); switch (r) { case "top": case "bottom": return f = this._get_offset(n), c = f.width, my_width = parseFloat(this._getStyle(t, "width")), t.style.left = "" + (c / 2 * this._get_position_offset(n) - o.width / 2) + "px", my_width && i(t).width(my_width), t.style[r] = "-" + o.height + "px"; case "left": case "right": return e = parseFloat(this._getStyle(t, "max-width")), t.style[r] = "-" + e + "px", f = this._get_offset(n), h = f.height, u = parseFloat(this._getStyle(t, "height")), u && i(t).height(u), t.style.top = "" + (h / 2 * this._get_position_offset(n) - u / 2) + "px", l = parseFloat(this._getStyle(t, "width")), s = 185 - (e - l), t.style[r] = "-" + s + "px" } }, t.prototype._position_helper_layer = function (n) { var t, r; return r = i(n).data("helper_layer"), t = this._get_offset(n), i(n).is(":visible") && r && r.setAttribute("style", "display: block; width: " + t.width + "px; height:" + t.height + "px; top:" + t.top + "px; left: " + t.left + "px;"), i(n).is(":visible") && !r && this._show_element(n), !i(n).is(":visible") && r ? r.setAttribute("style", "display: none; width: " + t.width + "px; height:" + t.height + "px; top:" + t.top + "px; left: " + t.left + "px;") : void 0 }, t.prototype._remove_sequenced_element = function () { this.$el.find(".chardinjs-helper-layer").remove(); this.$el.find(".chardinjs-show-element").removeClass("chardinjs-show-element"); this.$el.find(".chardinjs-relative-position").removeClass("chardinjs-relative-position"); return }, t.prototype._show_element = function (n) { var r, t, f, e, u; if (r = document.createElement("div"), t = document.createElement("div"), f = n.getAttribute(this.data_attribute), f[0] == "#") if (e = this.data_helptext[f], e) t.innerHTML = "<div class='chardinjs-tooltiptext'>" + e.text + "<\/div>"; else return !1; else t.innerHTML = "<div class='chardinjs-tooltiptext'>" + f + "<\/div>"; return i(n).data("helper_layer", r).data("tooltip_layer", t), n.id && r.setAttribute("data-id", n.id), r.className = "chardinjs-helper-layer chardinjs-" + this._get_position(n), this._position_helper_layer(n), this.$el.get()[0].appendChild(r), t.className = "chardinjs-tooltip chardinjs-" + this._get_position(n), r.appendChild(t), this._place_tooltip(n, t), u = this, r.onclick = function (n) { return u.sequenced ? u._handleMouseClick(n) : u.stop() }, this._position_overlay_layer(n), u.sequenced && t.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }), !0 }, t.prototype._show_sequenced_element = function () { var n = this; if (this.sequenceIdx < 0 && (this.sequenceIdx = 0), !this.sequencedItems[this.sequenceIdx]) return this.stop(); while (!this._show_element(this.sequencedItems[this.sequenceIdx])) this.sequenceIdx++; if (this.sequenceIdx < this.sequencedItems.length - 1) { if (this.isAuto) return this.timeOut = setTimeout(function () { return n.next(n.isAuto) }, this.delayTime) } else if (this.isAuto) return this.timeOut = setTimeout(function () { return n.stop() }, this.delayTime) }, t.prototype.next = function (n) { var t = this; return n = n !== !1 ? !0 : !1, this.sequenceIdx++, n ? (clearTimeout(this.timeOut), this.timeOut = setTimeout(function () { return t._remove_sequenced_element(), t._show_sequenced_element(!0), t.$el.trigger("chardinJs:next") }, this.delayTime)) : (this._remove_sequenced_element(), this._show_sequenced_element(!1), this.$el.trigger("chardinJs:next")) }, t.prototype.previous = function (n) { var t = this; return n = n !== !1 ? !0 : !1, this.sequenceIdx--, n ? (clearTimeout(this.timeOut), this.timeOut = setTimeout(function () { return t._remove_sequenced_element(), t._show_sequenced_element(!0), t.$el.trigger("chardinJs:previous") }, this.delayTime)) : (this._remove_sequenced_element(), this._show_sequenced_element(!1), this.$el.trigger("chardinJs:previous")) }, t.prototype._handleMouseClick = function (n) { if (this.active) return (size = this._getMaxSize(), n = n || r.event, n.shiftKey) ? this.previous(!1) : this.next(!1) }, t.prototype._getMaxSize = function () { var t, i, n, r; return t = document.body, n = document.documentElement, i = Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight), r = Math.max(t.scrollWidth, t.offsetWidth, n.clientWidth, n.scrollWidth, n.offsetWidth), { width: r, height: i } }, t.prototype._getSequencedElements = function () { return this.$el.find("*[" + this.data_attribute + "]:visible").sort(function (n, t) { var r, u; return r = i(n).data("sequence") || 100, u = i(t).data("sequence") || 100, r - u }) }, t.prototype._get_offset = function (n) { var i, r, t; for (t = { width: n.offsetWidth, height: n.offsetHeight }, i = 0, r = 0; n && !isNaN(n.offsetLeft) && !isNaN(n.offsetTop);)i += n.offsetLeft, r += n.offsetTop, n = n.offsetParent; return t.top = r, t.left = i, t }, t }(), i.fn.extend({ chardinJs: function () { var f, e, r, n; return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], f = i(this[0]), r = f.data("chardinJs"), r || f.data("chardinJs", r = new u(this, n)), typeof n == "string" ? r[n].apply(r, e) : typeof n == "object" && (typeof n.attribute == "string" && r.set_data_attribute(n.attribute), typeof n.method == "string" && r[n.method].apply(r, e), typeof n.url == "string" && i.ajax({ type: "GET", url: n.url, dataType: "json", success: function (n) { r.set_data_helptext(n) } })), r } }) })(window.jQuery, window) }).call(this);