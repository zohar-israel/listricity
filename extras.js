


/*! jQuery UI - v1.11.4 - 2015-03-11
  * http://jqueryui.com
  * Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
  * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */

 (function(e) {
     "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
 })(function(e) {
     function t(t, s) {
         var n, a, o, r = t.nodeName.toLowerCase();
         return "area" === r ? (n = t.parentNode, a = n.name, t.href && a && "map" === n.nodeName.toLowerCase() ? (o = e("img[usemap='#" + a + "']")[0], !!o && i(o)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !t.disabled : "a" === r ? t.href || s : s) && i(t)
     }

     function i(t) {
         return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
             return "hidden" === e.css(this, "visibility")
         }).length
     }

     function s(e) {
         for (var t, i; e.length && e[0] !== document;) {
             if (t = e.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(e.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
             e = e.parent()
         }
         return 0
     }

     function n() {
         this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
             closeText: "Done",
             prevText: "Prev",
             nextText: "Next",
             currentText: "Today",
             monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
             monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
             dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
             dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
             dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
             weekHeader: "Wk",
             dateFormat: "mm/dd/yy",
             firstDay: 0,
             isRTL: !1,
             showMonthAfterYear: !1,
             yearSuffix: ""
         }, this._defaults = {
             showOn: "focus",
             showAnim: "fadeIn",
             showOptions: {},
             defaultDate: null,
             appendText: "",
             buttonText: "...",
             buttonImage: "",
             buttonImageOnly: !1,
             hideIfNoPrevNext: !1,
             navigationAsDateFormat: !1,
             gotoCurrent: !1,
             changeMonth: !1,
             changeYear: !1,
             yearRange: "c-10:c+10",
             showOtherMonths: !1,
             selectOtherMonths: !1,
             showWeek: !1,
             calculateWeek: this.iso8601Week,
             shortYearCutoff: "+10",
             minDate: null,
             maxDate: null,
             duration: "fast",
             beforeShowDay: null,
             beforeShow: null,
             onSelect: null,
             onChangeMonthYear: null,
             onClose: null,
             numberOfMonths: 1,
             showCurrentAtPos: 0,
             stepMonths: 1,
             stepBigMonths: 12,
             altField: "",
             altFormat: "",
             constrainInput: !0,
             showButtonPanel: !1,
             autoSize: !1,
             disabled: !1
         }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = a(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
     }

     function a(t) {
         var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
         return t.delegate(i, "mouseout", function() {
             e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
         }).delegate(i, "mouseover", o)
     }

     function o() {
         e.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
     }

     function r(t, i) {
         e.extend(t, i);
         for (var s in i) null == i[s] && (t[s] = i[s]);
         return t
     }

     function h(e) {
         return function() {
             var t = this.element.val();
             e.apply(this, arguments), this._refresh(), t !== this.element.val() && this._trigger("change")
         }
     }
     e.ui = e.ui || {}, e.extend(e.ui, {
         version: "1.11.4",
         keyCode: {
             BACKSPACE: 8,
             COMMA: 188,
             DELETE: 46,
             DOWN: 40,
             END: 35,
             ENTER: 13,
             ESCAPE: 27,
             HOME: 36,
             LEFT: 37,
             PAGE_DOWN: 34,
             PAGE_UP: 33,
             PERIOD: 190,
             RIGHT: 39,
             SPACE: 32,
             TAB: 9,
             UP: 38
         }
     }), e.fn.extend({
         scrollParent: function(t) {
             var i = this.css("position"),
                 s = "absolute" === i,
                 n = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                 a = this.parents().filter(function() {
                     var t = e(this);
                     return s && "static" === t.css("position") ? !1 : n.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
                 }).eq(0);
             return "fixed" !== i && a.length ? a : e(this[0].ownerDocument || document)
         },
         uniqueId: function() {
             var e = 0;
             return function() {
                 return this.each(function() {
                     this.id || (this.id = "ui-id-" + ++e)
                 })
             }
         }(),
         removeUniqueId: function() {
             return this.each(function() {
                 /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
             })
         }
     }), e.extend(e.expr[":"], {
         data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
             return function(i) {
                 return !!e.data(i, t)
             }
         }) : function(t, i, s) {
             return !!e.data(t, s[3])
         },
         focusable: function(i) {
             return t(i, !isNaN(e.attr(i, "tabindex")))
         },
         tabbable: function(i) {
             var s = e.attr(i, "tabindex"),
                 n = isNaN(s);
             return (n || s >= 0) && t(i, !n)
         }
     }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(t, i) {
         function s(t, i, s, a) {
             return e.each(n, function() {
                 i -= parseFloat(e.css(t, "padding" + this)) || 0, s && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), a && (i -= parseFloat(e.css(t, "margin" + this)) || 0)
             }), i
         }
         var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
             a = i.toLowerCase(),
             o = {
                 innerWidth: e.fn.innerWidth,
                 innerHeight: e.fn.innerHeight,
                 outerWidth: e.fn.outerWidth,
                 outerHeight: e.fn.outerHeight
             };
         e.fn["inner" + i] = function(t) {
             return void 0 === t ? o["inner" + i].call(this) : this.each(function() {
                 e(this).css(a, s(this, t) + "px")
             })
         }, e.fn["outer" + i] = function(t, n) {
             return "number" != typeof t ? o["outer" + i].call(this, t) : this.each(function() {
                 e(this).css(a, s(this, t, !0, n) + "px")
             })
         }
     }), e.fn.addBack || (e.fn.addBack = function(e) {
         return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
     }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
         return function(i) {
             return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this)
         }
     }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
         focus: function(t) {
             return function(i, s) {
                 return "number" == typeof i ? this.each(function() {
                     var t = this;
                     setTimeout(function() {
                         e(t).focus(), s && s.call(t)
                     }, i)
                 }) : t.apply(this, arguments)
             }
         }(e.fn.focus),
         disableSelection: function() {
             var e = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
             return function() {
                 return this.bind(e + ".ui-disableSelection", function(e) {
                     e.preventDefault()
                 })
             }
         }(),
         enableSelection: function() {
             return this.unbind(".ui-disableSelection")
         },
         zIndex: function(t) {
             if (void 0 !== t) return this.css("zIndex", t);
             if (this.length)
                 for (var i, s, n = e(this[0]); n.length && n[0] !== document;) {
                     if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                     n = n.parent()
                 }
             return 0
         }
     }), e.ui.plugin = {
         add: function(t, i, s) {
             var n, a = e.ui[t].prototype;
             for (n in s) a.plugins[n] = a.plugins[n] || [], a.plugins[n].push([i, s[n]])
         },
         call: function(e, t, i, s) {
             var n, a = e.plugins[t];
             if (a && (s || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                 for (n = 0; a.length > n; n++) e.options[a[n][0]] && a[n][1].apply(e.element, i)
         }
     };
     var l = 0,
         u = Array.prototype.slice;
     e.cleanData = function(t) {
         return function(i) {
             var s, n, a;
             for (a = 0; null != (n = i[a]); a++) try {
                 s = e._data(n, "events"), s && s.remove && e(n).triggerHandler("remove")
             }
             catch (o) {}
             t(i)
         }
     }(e.cleanData), e.widget = function(t, i, s) {
         var n, a, o, r, h = {},
             l = t.split(".")[0];
         return t = t.split(".")[1], n = l + "-" + t, s || (s = i, i = e.Widget), e.expr[":"][n.toLowerCase()] = function(t) {
             return !!e.data(t, n)
         }, e[l] = e[l] || {}, a = e[l][t], o = e[l][t] = function(e, t) {
             return this._createWidget ? (arguments.length && this._createWidget(e, t), void 0) : new o(e, t)
         }, e.extend(o, a, {
             version: s.version,
             _proto: e.extend({}, s),
             _childConstructors: []
         }), r = new i, r.options = e.widget.extend({}, r.options), e.each(s, function(t, s) {
             return e.isFunction(s) ? (h[t] = function() {
                 var e = function() {
                         return i.prototype[t].apply(this, arguments)
                     },
                     n = function(e) {
                         return i.prototype[t].apply(this, e)
                     };
                 return function() {
                     var t, i = this._super,
                         a = this._superApply;
                     return this._super = e, this._superApply = n, t = s.apply(this, arguments), this._super = i, this._superApply = a, t
                 }
             }(), void 0) : (h[t] = s, void 0)
         }), o.prototype = e.widget.extend(r, {
             widgetEventPrefix: a ? r.widgetEventPrefix || t : t
         }, h, {
             constructor: o,
             namespace: l,
             widgetName: t,
             widgetFullName: n
         }), a ? (e.each(a._childConstructors, function(t, i) {
             var s = i.prototype;
             e.widget(s.namespace + "." + s.widgetName, o, i._proto)
         }), delete a._childConstructors) : i._childConstructors.push(o), e.widget.bridge(t, o), o
     }, e.widget.extend = function(t) {
         for (var i, s, n = u.call(arguments, 1), a = 0, o = n.length; o > a; a++)
             for (i in n[a]) s = n[a][i], n[a].hasOwnProperty(i) && void 0 !== s && (t[i] = e.isPlainObject(s) ? e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : s);
         return t
     }, e.widget.bridge = function(t, i) {
         var s = i.prototype.widgetFullName || t;
         e.fn[t] = function(n) {
             var a = "string" == typeof n,
                 o = u.call(arguments, 1),
                 r = this;
             return a ? this.each(function() {
                 var i, a = e.data(this, s);
                 return "instance" === n ? (r = a, !1) : a ? e.isFunction(a[n]) && "_" !== n.charAt(0) ? (i = a[n].apply(a, o), i !== a && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : e.error("no such method '" + n + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; " + "attempted to call method '" + n + "'")
             }) : (o.length && (n = e.widget.extend.apply(null, [n].concat(o))), this.each(function() {
                 var t = e.data(this, s);
                 t ? (t.option(n || {}), t._init && t._init()) : e.data(this, s, new i(n, this))
             })), r
         }
     }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
         widgetName: "widget",
         widgetEventPrefix: "",
         defaultElement: "<div>",
         options: {
             disabled: !1,
             create: null
         },
         _createWidget: function(t, i) {
             i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = l++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                 remove: function(e) {
                     e.target === i && this.destroy()
                 }
             }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
         },
         _getCreateOptions: e.noop,
         _getCreateEventData: e.noop,
         _create: e.noop,
         _init: e.noop,
         destroy: function() {
             this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
         },
         _destroy: e.noop,
         widget: function() {
             return this.element
         },
         option: function(t, i) {
             var s, n, a, o = t;
             if (0 === arguments.length) return e.widget.extend({}, this.options);
             if ("string" == typeof t)
                 if (o = {}, s = t.split("."), t = s.shift(), s.length) {
                     for (n = o[t] = e.widget.extend({}, this.options[t]), a = 0; s.length - 1 > a; a++) n[s[a]] = n[s[a]] || {}, n = n[s[a]];
                     if (t = s.pop(), 1 === arguments.length) return void 0 === n[t] ? null : n[t];
                     n[t] = i
                 }
                 else {
                     if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                     o[t] = i
                 }
             return this._setOptions(o), this
         },
         _setOptions: function(e) {
             var t;
             for (t in e) this._setOption(t, e[t]);
             return this
         },
         _setOption: function(e, t) {
             return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
         },
         enable: function() {
             return this._setOptions({
                 disabled: !1
             })
         },
         disable: function() {
             return this._setOptions({
                 disabled: !0
             })
         },
         _on: function(t, i, s) {
             var n, a = this;
             "boolean" != typeof t && (s = i, i = t, t = !1), s ? (i = n = e(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), e.each(s, function(s, o) {
                 function r() {
                     return t || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                 }
                 "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || e.guid++);
                 var h = s.match(/^([\w:-]*)\s*(.*)$/),
                     l = h[1] + a.eventNamespace,
                     u = h[2];
                 u ? n.delegate(u, l, r) : i.bind(l, r)
             })
         },
         _off: function(t, i) {
             i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
         },
         _delay: function(e, t) {
             function i() {
                 return ("string" == typeof e ? s[e] : e).apply(s, arguments)
             }
             var s = this;
             return setTimeout(i, t || 0)
         },
         _hoverable: function(t) {
             this.hoverable = this.hoverable.add(t), this._on(t, {
                 mouseenter: function(t) {
                     e(t.currentTarget).addClass("ui-state-hover")
                 },
                 mouseleave: function(t) {
                     e(t.currentTarget).removeClass("ui-state-hover")
                 }
             })
         },
         _focusable: function(t) {
             this.focusable = this.focusable.add(t), this._on(t, {
                 focusin: function(t) {
                     e(t.currentTarget).addClass("ui-state-focus")
                 },
                 focusout: function(t) {
                     e(t.currentTarget).removeClass("ui-state-focus")
                 }
             })
         },
         _trigger: function(t, i, s) {
             var n, a, o = this.options[t];
             if (s = s || {}, i = e.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], a = i.originalEvent)
                 for (n in a) n in i || (i[n] = a[n]);
             return this.element.trigger(i, s), !(e.isFunction(o) && o.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
         }
     }, e.each({
         show: "fadeIn",
         hide: "fadeOut"
     }, function(t, i) {
         e.Widget.prototype["_" + t] = function(s, n, a) {
             "string" == typeof n && (n = {
                 effect: n
             });
             var o, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : t;
             n = n || {}, "number" == typeof n && (n = {
                 duration: n
             }), o = !e.isEmptyObject(n), n.complete = a, n.delay && s.delay(n.delay), o && e.effects && e.effects.effect[r] ? s[t](n) : r !== t && s[r] ? s[r](n.duration, n.easing, a) : s.queue(function(i) {
                 e(this)[t](), a && a.call(s[0]), i()
             })
         }
     }), e.widget;
     var d = !1;
     e(document).mouseup(function() {
             d = !1
         }), e.widget("ui.mouse", {
             version: "1.11.4",
             options: {
                 cancel: "input,textarea,button,select,option",
                 distance: 1,
                 delay: 0
             },
             _mouseInit: function() {
                 var t = this;
                 this.element.bind("mousedown." + this.widgetName, function(e) {
                     return t._mouseDown(e)
                 }).bind("click." + this.widgetName, function(i) {
                     return !0 === e.data(i.target, t.widgetName + ".preventClickEvent") ? (e.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                 }), this.started = !1
             },
             _mouseDestroy: function() {
                 this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
             },
             _mouseDown: function(t) {
                 if (!d) {
                     this._mouseMoved = !1, this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                     var i = this,
                         s = 1 === t.which,
                         n = "string" == typeof this.options.cancel && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                     return s && !n && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                         i.mouseDelayMet = !0
                     }, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                         return i._mouseMove(e)
                     }, this._mouseUpDelegate = function(e) {
                         return i._mouseUp(e)
                     }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), d = !0, !0)) : !0
                 }
             },
             _mouseMove: function(t) {
                 if (this._mouseMoved) {
                     if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
                     if (!t.which) return this._mouseUp(t)
                 }
                 return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
             },
             _mouseUp: function(t) {
                 return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), d = !1, !1
             },
             _mouseDistanceMet: function(e) {
                 return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
             },
             _mouseDelayMet: function() {
                 return this.mouseDelayMet
             },
             _mouseStart: function() {},
             _mouseDrag: function() {},
             _mouseStop: function() {},
             _mouseCapture: function() {
                 return !0
             }
         }),
         function() {
             function t(e, t, i) {
                 return [parseFloat(e[0]) * (p.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (p.test(e[1]) ? i / 100 : 1)]
             }

             function i(t, i) {
                 return parseInt(e.css(t, i), 10) || 0
             }

             function s(t) {
                 var i = t[0];
                 return 9 === i.nodeType ? {
                     width: t.width(),
                     height: t.height(),
                     offset: {
                         top: 0,
                         left: 0
                     }
                 } : e.isWindow(i) ? {
                     width: t.width(),
                     height: t.height(),
                     offset: {
                         top: t.scrollTop(),
                         left: t.scrollLeft()
                     }
                 } : i.preventDefault ? {
                     width: 0,
                     height: 0,
                     offset: {
                         top: i.pageY,
                         left: i.pageX
                     }
                 } : {
                     width: t.outerWidth(),
                     height: t.outerHeight(),
                     offset: t.offset()
                 }
             }
             e.ui = e.ui || {};
             var n, a, o = Math.max,
                 r = Math.abs,
                 h = Math.round,
                 l = /left|center|right/,
                 u = /top|center|bottom/,
                 d = /[\+\-]\d+(\.[\d]+)?%?/,
                 c = /^\w+/,
                 p = /%$/,
                 f = e.fn.position;
             e.position = {
                     scrollbarWidth: function() {
                         if (void 0 !== n) return n;
                         var t, i, s = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                             a = s.children()[0];
                         return e("body").append(s), t = a.offsetWidth, s.css("overflow", "scroll"), i = a.offsetWidth, t === i && (i = s[0].clientWidth), s.remove(), n = t - i
                     },
                     getScrollInfo: function(t) {
                         var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                             s = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                             n = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                             a = "scroll" === s || "auto" === s && t.height < t.element[0].scrollHeight;
                         return {
                             width: a ? e.position.scrollbarWidth() : 0,
                             height: n ? e.position.scrollbarWidth() : 0
                         }
                     },
                     getWithinInfo: function(t) {
                         var i = e(t || window),
                             s = e.isWindow(i[0]),
                             n = !!i[0] && 9 === i[0].nodeType;
                         return {
                             element: i,
                             isWindow: s,
                             isDocument: n,
                             offset: i.offset() || {
                                 left: 0,
                                 top: 0
                             },
                             scrollLeft: i.scrollLeft(),
                             scrollTop: i.scrollTop(),
                             width: s || n ? i.width() : i.outerWidth(),
                             height: s || n ? i.height() : i.outerHeight()
                         }
                     }
                 }, e.fn.position = function(n) {
                     if (!n || !n.of) return f.apply(this, arguments);
                     n = e.extend({}, n);
                     var p, m, g, v, y, b, _ = e(n.of),
                         x = e.position.getWithinInfo(n.within),
                         w = e.position.getScrollInfo(x),
                         k = (n.collision || "flip").split(" "),
                         T = {};
                     return b = s(_), _[0].preventDefault && (n.at = "left top"), m = b.width, g = b.height, v = b.offset, y = e.extend({}, v), e.each(["my", "at"], function() {
                         var e, t, i = (n[this] || "").split(" ");
                         1 === i.length && (i = l.test(i[0]) ? i.concat(["center"]) : u.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = l.test(i[0]) ? i[0] : "center", i[1] = u.test(i[1]) ? i[1] : "center", e = d.exec(i[0]), t = d.exec(i[1]), T[this] = [e ? e[0] : 0, t ? t[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
                     }), 1 === k.length && (k[1] = k[0]), "right" === n.at[0] ? y.left += m : "center" === n.at[0] && (y.left += m / 2), "bottom" === n.at[1] ? y.top += g : "center" === n.at[1] && (y.top += g / 2), p = t(T.at, m, g), y.left += p[0], y.top += p[1], this.each(function() {
                         var s, l, u = e(this),
                             d = u.outerWidth(),
                             c = u.outerHeight(),
                             f = i(this, "marginLeft"),
                             b = i(this, "marginTop"),
                             D = d + f + i(this, "marginRight") + w.width,
                             S = c + b + i(this, "marginBottom") + w.height,
                             M = e.extend({}, y),
                             C = t(T.my, u.outerWidth(), u.outerHeight());
                         "right" === n.my[0] ? M.left -= d : "center" === n.my[0] && (M.left -= d / 2), "bottom" === n.my[1] ? M.top -= c : "center" === n.my[1] && (M.top -= c / 2), M.left += C[0], M.top += C[1], a || (M.left = h(M.left), M.top = h(M.top)), s = {
                             marginLeft: f,
                             marginTop: b
                         }, e.each(["left", "top"], function(t, i) {
                             e.ui.position[k[t]] && e.ui.position[k[t]][i](M, {
                                 targetWidth: m,
                                 targetHeight: g,
                                 elemWidth: d,
                                 elemHeight: c,
                                 collisionPosition: s,
                                 collisionWidth: D,
                                 collisionHeight: S,
                                 offset: [p[0] + C[0], p[1] + C[1]],
                                 my: n.my,
                                 at: n.at,
                                 within: x,
                                 elem: u
                             })
                         }), n.using && (l = function(e) {
                             var t = v.left - M.left,
                                 i = t + m - d,
                                 s = v.top - M.top,
                                 a = s + g - c,
                                 h = {
                                     target: {
                                         element: _,
                                         left: v.left,
                                         top: v.top,
                                         width: m,
                                         height: g
                                     },
                                     element: {
                                         element: u,
                                         left: M.left,
                                         top: M.top,
                                         width: d,
                                         height: c
                                     },
                                     horizontal: 0 > i ? "left" : t > 0 ? "right" : "center",
                                     vertical: 0 > a ? "top" : s > 0 ? "bottom" : "middle"
                                 };
                             d > m && m > r(t + i) && (h.horizontal = "center"), c > g && g > r(s + a) && (h.vertical = "middle"), h.important = o(r(t), r(i)) > o(r(s), r(a)) ? "horizontal" : "vertical", n.using.call(this, e, h)
                         }), u.offset(e.extend(M, {
                             using: l
                         }))
                     })
                 }, e.ui.position = {
                     fit: {
                         left: function(e, t) {
                             var i, s = t.within,
                                 n = s.isWindow ? s.scrollLeft : s.offset.left,
                                 a = s.width,
                                 r = e.left - t.collisionPosition.marginLeft,
                                 h = n - r,
                                 l = r + t.collisionWidth - a - n;
                             t.collisionWidth > a ? h > 0 && 0 >= l ? (i = e.left + h + t.collisionWidth - a - n, e.left += h - i) : e.left = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionWidth : n : h > 0 ? e.left += h : l > 0 ? e.left -= l : e.left = o(e.left - r, e.left)
                         },
                         top: function(e, t) {
                             var i, s = t.within,
                                 n = s.isWindow ? s.scrollTop : s.offset.top,
                                 a = t.within.height,
                                 r = e.top - t.collisionPosition.marginTop,
                                 h = n - r,
                                 l = r + t.collisionHeight - a - n;
                             t.collisionHeight > a ? h > 0 && 0 >= l ? (i = e.top + h + t.collisionHeight - a - n, e.top += h - i) : e.top = l > 0 && 0 >= h ? n : h > l ? n + a - t.collisionHeight : n : h > 0 ? e.top += h : l > 0 ? e.top -= l : e.top = o(e.top - r, e.top)
                         }
                     },
                     flip: {
                         left: function(e, t) {
                             var i, s, n = t.within,
                                 a = n.offset.left + n.scrollLeft,
                                 o = n.width,
                                 h = n.isWindow ? n.scrollLeft : n.offset.left,
                                 l = e.left - t.collisionPosition.marginLeft,
                                 u = l - h,
                                 d = l + t.collisionWidth - o - h,
                                 c = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                                 p = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                                 f = -2 * t.offset[0];
                             0 > u ? (i = e.left + c + p + f + t.collisionWidth - o - a, (0 > i || r(u) > i) && (e.left += c + p + f)) : d > 0 && (s = e.left - t.collisionPosition.marginLeft + c + p + f - h, (s > 0 || d > r(s)) && (e.left += c + p + f))
                         },
                         top: function(e, t) {
                             var i, s, n = t.within,
                                 a = n.offset.top + n.scrollTop,
                                 o = n.height,
                                 h = n.isWindow ? n.scrollTop : n.offset.top,
                                 l = e.top - t.collisionPosition.marginTop,
                                 u = l - h,
                                 d = l + t.collisionHeight - o - h,
                                 c = "top" === t.my[1],
                                 p = c ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                                 f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                                 m = -2 * t.offset[1];
                             0 > u ? (s = e.top + p + f + m + t.collisionHeight - o - a, (0 > s || r(u) > s) && (e.top += p + f + m)) : d > 0 && (i = e.top - t.collisionPosition.marginTop + p + f + m - h, (i > 0 || d > r(i)) && (e.top += p + f + m))
                         }
                     },
                     flipfit: {
                         left: function() {
                             e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                         },
                         top: function() {
                             e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                         }
                     }
                 },
                 function() {
                     var t, i, s, n, o, r = document.getElementsByTagName("body")[0],
                         h = document.createElement("div");
                     t = document.createElement(r ? "div" : "body"), s = {
                         visibility: "hidden",
                         width: 0,
                         height: 0,
                         border: 0,
                         margin: 0,
                         background: "none"
                     }, r && e.extend(s, {
                         position: "absolute",
                         left: "-1000px",
                         top: "-1000px"
                     });
                     for (o in s) t.style[o] = s[o];
                     t.appendChild(h), i = r || document.documentElement, i.insertBefore(t, i.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", n = e(h).offset().left, a = n > 10 && 11 > n, t.innerHTML = "", i.removeChild(t)
                 }()
         }(), e.ui.position, e.widget("ui.accordion", {
             version: "1.11.4",
             options: {
                 active: 0,
                 animate: {},
                 collapsible: !1,
                 event: "click",
                 header: "> li > :first-child,> :not(li):even",
                 heightStyle: "auto",
                 icons: {
                     activeHeader: "ui-icon-triangle-1-s",
                     header: "ui-icon-triangle-1-e"
                 },
                 activate: null,
                 beforeActivate: null
             },
             hideProps: {
                 borderTopWidth: "hide",
                 borderBottomWidth: "hide",
                 paddingTop: "hide",
                 paddingBottom: "hide",
                 height: "hide"
             },
             showProps: {
                 borderTopWidth: "show",
                 borderBottomWidth: "show",
                 paddingTop: "show",
                 paddingBottom: "show",
                 height: "show"
             },
             _create: function() {
                 var t = this.options;
                 this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), t.collapsible || t.active !== !1 && null != t.active || (t.active = 0), this._processPanels(), 0 > t.active && (t.active += this.headers.length), this._refresh()
             },
             _getCreateEventData: function() {
                 return {
                     header: this.active,
                     panel: this.active.length ? this.active.next() : e()
                 }
             },
             _createIcons: function() {
                 var t = this.options.icons;
                 t && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + t.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(t.header).addClass(t.activeHeader), this.headers.addClass("ui-accordion-icons"))
             },
             _destroyIcons: function() {
                 this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
             },
             _destroy: function() {
                 var e;
                 this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), e = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && e.css("height", "")
             },
             _setOption: function(e, t) {
                 return "active" === e ? (this._activate(t), void 0) : ("event" === e && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(e, t), "collapsible" !== e || t || this.options.active !== !1 || this._activate(0), "icons" === e && (this._destroyIcons(), t && this._createIcons()), "disabled" === e && (this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!t)), void 0)
             },
             _keydown: function(t) {
                 if (!t.altKey && !t.ctrlKey) {
                     var i = e.ui.keyCode,
                         s = this.headers.length,
                         n = this.headers.index(t.target),
                         a = !1;
                     switch (t.keyCode) {
                         case i.RIGHT:
                         case i.DOWN:
                             a = this.headers[(n + 1) % s];
                             break;
                         case i.LEFT:
                         case i.UP:
                             a = this.headers[(n - 1 + s) % s];
                             break;
                         case i.SPACE:
                         case i.ENTER:
                             this._eventHandler(t);
                             break;
                         case i.HOME:
                             a = this.headers[0];
                             break;
                         case i.END:
                             a = this.headers[s - 1]
                     }
                     a && (e(t.target).attr("tabIndex", -1), e(a).attr("tabIndex", 0), a.focus(), t.preventDefault())
                 }
             },
             _panelKeyDown: function(t) {
                 t.keyCode === e.ui.keyCode.UP && t.ctrlKey && e(t.currentTarget).prev().focus()
             },
             refresh: function() {
                 var t = this.options;
                 this._processPanels(), t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = e()) : t.active === !1 ? this._activate(0) : this.active.length && !e.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = e()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
             },
             _processPanels: function() {
                 var e = this.headers,
                     t = this.panels;
                 this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)))
             },
             _refresh: function() {
                 var t, i = this.options,
                     s = i.heightStyle,
                     n = this.element.parent();
                 this.active = this._findActive(i.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function() {
                     var t = e(this),
                         i = t.uniqueId().attr("id"),
                         s = t.next(),
                         n = s.uniqueId().attr("id");
                     t.attr("aria-controls", n), s.attr("aria-labelledby", i)
                 }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                     "aria-selected": "false",
                     "aria-expanded": "false",
                     tabIndex: -1
                 }).next().attr({
                     "aria-hidden": "true"
                 }).hide(), this.active.length ? this.active.attr({
                     "aria-selected": "true",
                     "aria-expanded": "true",
                     tabIndex: 0
                 }).next().attr({
                     "aria-hidden": "false"
                 }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(i.event), "fill" === s ? (t = n.height(), this.element.siblings(":visible").each(function() {
                     var i = e(this),
                         s = i.css("position");
                     "absolute" !== s && "fixed" !== s && (t -= i.outerHeight(!0))
                 }), this.headers.each(function() {
                     t -= e(this).outerHeight(!0)
                 }), this.headers.next().each(function() {
                     e(this).height(Math.max(0, t - e(this).innerHeight() + e(this).height()))
                 }).css("overflow", "auto")) : "auto" === s && (t = 0, this.headers.next().each(function() {
                     t = Math.max(t, e(this).css("height", "").height())
                 }).height(t))
             },
             _activate: function(t) {
                 var i = this._findActive(t)[0];
                 i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
                     target: i,
                     currentTarget: i,
                     preventDefault: e.noop
                 }))
             },
             _findActive: function(t) {
                 return "number" == typeof t ? this.headers.eq(t) : e()
             },
             _setupEvents: function(t) {
                 var i = {
                     keydown: "_keydown"
                 };
                 t && e.each(t.split(" "), function(e, t) {
                     i[t] = "_eventHandler"
                 }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, i), this._on(this.headers.next(), {
                     keydown: "_panelKeyDown"
                 }), this._hoverable(this.headers), this._focusable(this.headers)
             },
             _eventHandler: function(t) {
                 var i = this.options,
                     s = this.active,
                     n = e(t.currentTarget),
                     a = n[0] === s[0],
                     o = a && i.collapsible,
                     r = o ? e() : n.next(),
                     h = s.next(),
                     l = {
                         oldHeader: s,
                         oldPanel: h,
                         newHeader: o ? e() : n,
                         newPanel: r
                     };
                 t.preventDefault(), a && !i.collapsible || this._trigger("beforeActivate", t, l) === !1 || (i.active = o ? !1 : this.headers.index(n), this.active = a ? e() : n, this._toggle(l), s.removeClass("ui-accordion-header-active ui-state-active"), i.icons && s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header), a || (n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), i.icons && n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader), n.next().addClass("ui-accordion-content-active")))
             },
             _toggle: function(t) {
                 var i = t.newPanel,
                     s = this.prevShow.length ? this.prevShow : t.oldPanel;
                 this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = i, this.prevHide = s, this.options.animate ? this._animate(i, s, t) : (s.hide(), i.show(), this._toggleComplete(t)), s.attr({
                     "aria-hidden": "true"
                 }), s.prev().attr({
                     "aria-selected": "false",
                     "aria-expanded": "false"
                 }), i.length && s.length ? s.prev().attr({
                     tabIndex: -1,
                     "aria-expanded": "false"
                 }) : i.length && this.headers.filter(function() {
                     return 0 === parseInt(e(this).attr("tabIndex"), 10)
                 }).attr("tabIndex", -1), i.attr("aria-hidden", "false").prev().attr({
                     "aria-selected": "true",
                     "aria-expanded": "true",
                     tabIndex: 0
                 })
             },
             _animate: function(e, t, i) {
                 var s, n, a, o = this,
                     r = 0,
                     h = e.css("box-sizing"),
                     l = e.length && (!t.length || e.index() < t.index()),
                     u = this.options.animate || {},
                     d = l && u.down || u,
                     c = function() {
                         o._toggleComplete(i)
                     };
                 return "number" == typeof d && (a = d), "string" == typeof d && (n = d), n = n || d.easing || u.easing, a = a || d.duration || u.duration, t.length ? e.length ? (s = e.show().outerHeight(), t.animate(this.hideProps, {
                     duration: a,
                     easing: n,
                     step: function(e, t) {
                         t.now = Math.round(e)
                     }
                 }), e.hide().animate(this.showProps, {
                     duration: a,
                     easing: n,
                     complete: c,
                     step: function(e, i) {
                         i.now = Math.round(e), "height" !== i.prop ? "content-box" === h && (r += i.now) : "content" !== o.options.heightStyle && (i.now = Math.round(s - t.outerHeight() - r), r = 0)
                     }
                 }), void 0) : t.animate(this.hideProps, a, n, c) : e.animate(this.showProps, a, n, c)
             },
             _toggleComplete: function(e) {
                 var t = e.oldPanel;
                 t.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), t.length && (t.parent()[0].className = t.parent()[0].className), this._trigger("activate", null, e)
             }
         }), e.widget("ui.menu", {
             version: "1.11.4",
             defaultElement: "<ul>",
             delay: 300,
             options: {
                 icons: {
                     submenu: "ui-icon-carat-1-e"
                 },
                 items: "> *",
                 menus: "ul",
                 position: {
                     my: "left-1 top",
                     at: "right top"
                 },
                 role: "menu",
                 blur: null,
                 focus: null,
                 select: null
             },
             _create: function() {
                 this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                     role: this.options.role,
                     tabIndex: 0
                 }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                     "mousedown .ui-menu-item": function(e) {
                         e.preventDefault()
                     },
                     "click .ui-menu-item": function(t) {
                         var i = e(t.target);
                         !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                     },
                     "mouseenter .ui-menu-item": function(t) {
                         if (!this.previousFilter) {
                             var i = e(t.currentTarget);
                             i.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(t, i)
                         }
                     },
                     mouseleave: "collapseAll",
                     "mouseleave .ui-menu": "collapseAll",
                     focus: function(e, t) {
                         var i = this.active || this.element.find(this.options.items).eq(0);
                         t || this.focus(e, i)
                     },
                     blur: function(t) {
                         this._delay(function() {
                             e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                         })
                     },
                     keydown: "_keydown"
                 }), this.refresh(), this._on(this.document, {
                     click: function(e) {
                         this._closeOnDocumentClick(e) && this.collapseAll(e), this.mouseHandled = !1
                     }
                 })
             },
             _destroy: function() {
                 this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                     var t = e(this);
                     t.data("ui-menu-submenu-carat") && t.remove()
                 }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
             },
             _keydown: function(t) {
                 var i, s, n, a, o = !0;
                 switch (t.keyCode) {
                     case e.ui.keyCode.PAGE_UP:
                         this.previousPage(t);
                         break;
                     case e.ui.keyCode.PAGE_DOWN:
                         this.nextPage(t);
                         break;
                     case e.ui.keyCode.HOME:
                         this._move("first", "first", t);
                         break;
                     case e.ui.keyCode.END:
                         this._move("last", "last", t);
                         break;
                     case e.ui.keyCode.UP:
                         this.previous(t);
                         break;
                     case e.ui.keyCode.DOWN:
                         this.next(t);
                         break;
                     case e.ui.keyCode.LEFT:
                         this.collapse(t);
                         break;
                     case e.ui.keyCode.RIGHT:
                         this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                         break;
                     case e.ui.keyCode.ENTER:
                     case e.ui.keyCode.SPACE:
                         this._activate(t);
                         break;
                     case e.ui.keyCode.ESCAPE:
                         this.collapse(t);
                         break;
                     default:
                         o = !1, s = this.previousFilter || "", n = String.fromCharCode(t.keyCode), a = !1, clearTimeout(this.filterTimer), n === s ? a = !0 : n = s + n, i = this._filterMenuItems(n), i = a && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(t.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(t, i), this.previousFilter = n, this.filterTimer = this._delay(function() {
                             delete this.previousFilter
                         }, 1e3)) : delete this.previousFilter
                 }
                 o && t.preventDefault()
             },
             _activate: function(e) {
                 this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(e) : this.select(e))
             },
             refresh: function() {
                 var t, i, s = this,
                     n = this.options.icons.submenu,
                     a = this.element.find(this.options.menus);
                 this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                     role: this.options.role,
                     "aria-hidden": "true",
                     "aria-expanded": "false"
                 }).each(function() {
                     var t = e(this),
                         i = t.parent(),
                         s = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                     i.attr("aria-haspopup", "true").prepend(s), t.attr("aria-labelledby", i.attr("id"))
                 }), t = a.add(this.element), i = t.find(this.options.items), i.not(".ui-menu-item").each(function() {
                     var t = e(this);
                     s._isDivider(t) && t.addClass("ui-widget-content ui-menu-divider")
                 }), i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                     tabIndex: -1,
                     role: this._itemRole()
                 }), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
             },
             _itemRole: function() {
                 return {
                     menu: "menuitem",
                     listbox: "option"
                 }[this.options.role]
             },
             _setOption: function(e, t) {
                 "icons" === e && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t)
             },
             focus: function(e, t) {
                 var i, s;
                 this.blur(e, e && "focus" === e.type), this._scrollIntoView(t), this.active = t.first(), s = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), e && "keydown" === e.type ? this._close() : this.timer = this._delay(function() {
                     this._close()
                 }, this.delay), i = t.children(".ui-menu"), i.length && e && /^mouse/.test(e.type) && this._startOpening(i), this.activeMenu = t.parent(), this._trigger("focus", e, {
                     item: t
                 })
             },
             _scrollIntoView: function(t) {
                 var i, s, n, a, o, r;
                 this._hasScroll() && (i = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, n = t.offset().top - this.activeMenu.offset().top - i - s, a = this.activeMenu.scrollTop(), o = this.activeMenu.height(), r = t.outerHeight(), 0 > n ? this.activeMenu.scrollTop(a + n) : n + r > o && this.activeMenu.scrollTop(a + n - o + r))
             },
             blur: function(e, t) {
                 t || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
                     item: this.active
                 }))
             },
             _startOpening: function(e) {
                 clearTimeout(this.timer), "true" === e.attr("aria-hidden") && (this.timer = this._delay(function() {
                     this._close(), this._open(e)
                 }, this.delay))
             },
             _open: function(t) {
                 var i = e.extend({
                     of: this.active
                 }, this.options.position);
                 clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
             },
             collapseAll: function(t, i) {
                 clearTimeout(this.timer), this.timer = this._delay(function() {
                     var s = i ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                     s.length || (s = this.element), this._close(s), this.blur(t), this.activeMenu = s
                 }, this.delay)
             },
             _close: function(e) {
                 e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
             },
             _closeOnDocumentClick: function(t) {
                 return !e(t.target).closest(".ui-menu").length
             },
             _isDivider: function(e) {
                 return !/[^\-\u2014\u2013\s]/.test(e.text())
             },
             collapse: function(e) {
                 var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
                 t && t.length && (this._close(), this.focus(e, t))
             },
             expand: function(e) {
                 var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
                 t && t.length && (this._open(t.parent()), this._delay(function() {
                     this.focus(e, t)
                 }))
             },
             next: function(e) {
                 this._move("next", "first", e)
             },
             previous: function(e) {
                 this._move("prev", "last", e)
             },
             isFirstItem: function() {
                 return this.active && !this.active.prevAll(".ui-menu-item").length
             },
             isLastItem: function() {
                 return this.active && !this.active.nextAll(".ui-menu-item").length
             },
             _move: function(e, t, i) {
                 var s;
                 this.active && (s = "first" === e || "last" === e ? this.active["first" === e ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[e + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[t]()), this.focus(i, s)
             },
             nextPage: function(t) {
                 var i, s, n;
                 return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                     return i = e(this), 0 > i.offset().top - s - n
                 }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
             },
             previousPage: function(t) {
                 var i, s, n;
                 return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                     return i = e(this), i.offset().top - s + n > 0
                 }), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
             },
             _hasScroll: function() {
                 return this.element.outerHeight() < this.element.prop("scrollHeight")
             },
             select: function(t) {
                 this.active = this.active || e(t.target).closest(".ui-menu-item");
                 var i = {
                     item: this.active
                 };
                 this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, i)
             },
             _filterMenuItems: function(t) {
                 var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                     s = RegExp("^" + i, "i");
                 return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                     return s.test(e.trim(e(this).text()))
                 })
             }
         }), e.widget("ui.autocomplete", {
             version: "1.11.4",
             defaultElement: "<input>",
             options: {
                 appendTo: null,
                 autoFocus: !1,
                 delay: 300,
                 minLength: 1,
                 position: {
                     my: "left top",
                     at: "left bottom",
                     collision: "none"
                 },
                 source: null,
                 change: null,
                 close: null,
                 focus: null,
                 open: null,
                 response: null,
                 search: null,
                 select: null
             },
             requestIndex: 0,
             pending: 0,
             _create: function() {
                 var t, i, s, n = this.element[0].nodeName.toLowerCase(),
                     a = "textarea" === n,
                     o = "input" === n;
                 this.isMultiLine = a ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[a || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                     keydown: function(n) {
                         if (this.element.prop("readOnly")) return t = !0, s = !0, i = !0, void 0;
                         t = !1, s = !1, i = !1;
                         var a = e.ui.keyCode;
                         switch (n.keyCode) {
                             case a.PAGE_UP:
                                 t = !0, this._move("previousPage", n);
                                 break;
                             case a.PAGE_DOWN:
                                 t = !0, this._move("nextPage", n);
                                 break;
                             case a.UP:
                                 t = !0, this._keyEvent("previous", n);
                                 break;
                             case a.DOWN:
                                 t = !0, this._keyEvent("next", n);
                                 break;
                             case a.ENTER:
                                 this.menu.active && (t = !0, n.preventDefault(), this.menu.select(n));
                                 break;
                             case a.TAB:
                                 this.menu.active && this.menu.select(n);
                                 break;
                             case a.ESCAPE:
                                 this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                                 break;
                             default:
                                 i = !0, this._searchTimeout(n)
                         }
                     },
                     keypress: function(s) {
                         if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;
                         if (!i) {
                             var n = e.ui.keyCode;
                             switch (s.keyCode) {
                                 case n.PAGE_UP:
                                     this._move("previousPage", s);
                                     break;
                                 case n.PAGE_DOWN:
                                     this._move("nextPage", s);
                                     break;
                                 case n.UP:
                                     this._keyEvent("previous", s);
                                     break;
                                 case n.DOWN:
                                     this._keyEvent("next", s)
                             }
                         }
                     },
                     input: function(e) {
                         return s ? (s = !1, e.preventDefault(), void 0) : (this._searchTimeout(e), void 0)
                     },
                     focus: function() {
                         this.selectedItem = null, this.previous = this._value()
                     },
                     blur: function(e) {
                         return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(e), this._change(e), void 0)
                     }
                 }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                     role: null
                 }).hide().menu("instance"), this._on(this.menu.element, {
                     mousedown: function(t) {
                         t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                             delete this.cancelBlur
                         });
                         var i = this.menu.element[0];
                         e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                             var t = this;
                             this.document.one("mousedown", function(s) {
                                 s.target === t.element[0] || s.target === i || e.contains(i, s.target) || t.close()
                             })
                         })
                     },
                     menufocus: function(t, i) {
                         var s, n;
                         return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function() {
                             e(t.target).trigger(t.originalEvent)
                         }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
                             item: n
                         }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && e.trim(s).length && (this.liveRegion.children().hide(), e("<div>").text(s).appendTo(this.liveRegion)), void 0)
                     },
                     menuselect: function(e, t) {
                         var i = t.item.data("ui-autocomplete-item"),
                             s = this.previous;
                         this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = s, this._delay(function() {
                             this.previous = s, this.selectedItem = i
                         })), !1 !== this._trigger("select", e, {
                             item: i
                         }) && this._value(i.value), this.term = this._value(), this.close(e), this.selectedItem = i
                     }
                 }), this.liveRegion = e("<span>", {
                     role: "status",
                     "aria-live": "assertive",
                     "aria-relevant": "additions"
                 }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                     beforeunload: function() {
                         this.element.removeAttr("autocomplete")
                     }
                 })
             },
             _destroy: function() {
                 clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
             },
             _setOption: function(e, t) {
                 this._super(e, t), "source" === e && this._initSource(), "appendTo" === e && this.menu.element.appendTo(this._appendTo()), "disabled" === e && t && this.xhr && this.xhr.abort()
             },
             _appendTo: function() {
                 var t = this.options.appendTo;
                 return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
             },
             _initSource: function() {
                 var t, i, s = this;
                 e.isArray(this.options.source) ? (t = this.options.source, this.source = function(i, s) {
                     s(e.ui.autocomplete.filter(t, i.term))
                 }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(t, n) {
                     s.xhr && s.xhr.abort(), s.xhr = e.ajax({
                         url: i,
                         data: t,
                         dataType: "json",
                         success: function(e) {
                             n(e)
                         },
                         error: function() {
                             n([])
                         }
                     })
                 }) : this.source = this.options.source
             },
             _searchTimeout: function(e) {
                 clearTimeout(this.searching), this.searching = this._delay(function() {
                     var t = this.term === this._value(),
                         i = this.menu.element.is(":visible"),
                         s = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
                     (!t || t && !i && !s) && (this.selectedItem = null, this.search(null, e))
                 }, this.options.delay)
             },
             search: function(e, t) {
                 return e = null != e ? e : this._value(), this.term = this._value(), e.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(e) : void 0
             },
             _search: function(e) {
                 this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                     term: e
                 }, this._response())
             },
             _response: function() {
                 var t = ++this.requestIndex;
                 return e.proxy(function(e) {
                     t === this.requestIndex && this.__response(e), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
                 }, this)
             },
             __response: function(e) {
                 e && (e = this._normalize(e)), this._trigger("response", null, {
                     content: e
                 }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
             },
             close: function(e) {
                 this.cancelSearch = !0, this._close(e)
             },
             _close: function(e) {
                 this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
             },
             _change: function(e) {
                 this.previous !== this._value() && this._trigger("change", e, {
                     item: this.selectedItem
                 })
             },
             _normalize: function(t) {
                 return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                     return "string" == typeof t ? {
                         label: t,
                         value: t
                     } : e.extend({}, t, {
                         label: t.label || t.value,
                         value: t.value || t.label
                     })
                 })
             },
             _suggest: function(t) {
                 var i = this.menu.element.empty();
                 this._renderMenu(i, t), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(e.extend({
                     of: this.element
                 }, this.options.position)), this.options.autoFocus && this.menu.next()
             },
             _resizeMenu: function() {
                 var e = this.menu.element;
                 e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
             },
             _renderMenu: function(t, i) {
                 var s = this;
                 e.each(i, function(e, i) {
                     s._renderItemData(t, i)
                 })
             },
             _renderItemData: function(e, t) {
                 return this._renderItem(e, t).data("ui-autocomplete-item", t)
             },
             _renderItem: function(t, i) {
                 return e("<li>").text(i.label).appendTo(t)
             },
             _move: function(e, t) {
                 return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[e](t), void 0) : (this.search(null, t), void 0)
             },
             widget: function() {
                 return this.menu.element
             },
             _value: function() {
                 return this.valueMethod.apply(this.element, arguments)
             },
             _keyEvent: function(e, t) {
                 (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(e, t), t.preventDefault())
             }
         }), e.extend(e.ui.autocomplete, {
             escapeRegex: function(e) {
                 return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
             },
             filter: function(t, i) {
                 var s = RegExp(e.ui.autocomplete.escapeRegex(i), "i");
                 return e.grep(t, function(e) {
                     return s.test(e.label || e.value || e)
                 })
             }
         }), e.widget("ui.autocomplete", e.ui.autocomplete, {
             options: {
                 messages: {
                     noResults: "No search results.",
                     results: function(e) {
                         return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                     }
                 }
             },
             __response: function(t) {
                 var i;
                 this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(i).appendTo(this.liveRegion))
             }
         }), e.ui.autocomplete;
     var c, p = "ui-button ui-widget ui-state-default ui-corner-all",
         f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
         m = function() {
             var t = e(this);
             setTimeout(function() {
                 t.find(":ui-button").button("refresh")
             }, 1)
         },
         g = function(t) {
             var i = t.name,
                 s = t.form,
                 n = e([]);
             return i && (i = i.replace(/'/g, "\\'"), n = s ? e(s).find("[name='" + i + "'][type=radio]") : e("[name='" + i + "'][type=radio]", t.ownerDocument).filter(function() {
                 return !this.form
             })), n
         };
     e.widget("ui.button", {
         version: "1.11.4",
         defaultElement: "<button>",
         options: {
             disabled: null,
             text: !0,
             label: null,
             icons: {
                 primary: null,
                 secondary: null
             }
         },
         _create: function() {
             this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, m), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
             var t = this,
                 i = this.options,
                 s = "checkbox" === this.type || "radio" === this.type,
                 n = s ? "" : "ui-state-active";
             null === i.label && (i.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(p).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                 i.disabled || this === c && e(this).addClass("ui-state-active")
             }).bind("mouseleave" + this.eventNamespace, function() {
                 i.disabled || e(this).removeClass(n)
             }).bind("click" + this.eventNamespace, function(e) {
                 i.disabled && (e.preventDefault(), e.stopImmediatePropagation())
             }), this._on({
                 focus: function() {
                     this.buttonElement.addClass("ui-state-focus")
                 },
                 blur: function() {
                     this.buttonElement.removeClass("ui-state-focus")
                 }
             }), s && this.element.bind("change" + this.eventNamespace, function() {
                 t.refresh()
             }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                 return i.disabled ? !1 : void 0
             }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                 if (i.disabled) return !1;
                 e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
                 var s = t.element[0];
                 g(s).not(s).map(function() {
                     return e(this).button("widget")[0]
                 }).removeClass("ui-state-active").attr("aria-pressed", "false")
             }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                 return i.disabled ? !1 : (e(this).addClass("ui-state-active"), c = this, t.document.one("mouseup", function() {
                     c = null
                 }), void 0)
             }).bind("mouseup" + this.eventNamespace, function() {
                 return i.disabled ? !1 : (e(this).removeClass("ui-state-active"), void 0)
             }).bind("keydown" + this.eventNamespace, function(t) {
                 return i.disabled ? !1 : ((t.keyCode === e.ui.keyCode.SPACE || t.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), void 0)
             }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                 e(this).removeClass("ui-state-active")
             }), this.buttonElement.is("a") && this.buttonElement.keyup(function(t) {
                 t.keyCode === e.ui.keyCode.SPACE && e(this).click()
             })), this._setOption("disabled", i.disabled), this._resetButton()
         },
         _determineButtonType: function() {
             var e, t, i;
             this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (e = this.element.parents().last(), t = "label[for='" + this.element.attr("id") + "']", this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible"), i = this.element.is(":checked"), i && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", i)) : this.buttonElement = this.element
         },
         widget: function() {
             return this.buttonElement
         },
         _destroy: function() {
             this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(p + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
         },
         _setOption: function(e, t) {
             return this._super(e, t), "disabled" === e ? (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), t && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")), void 0) : (this._resetButton(), void 0)
         },
         refresh: function() {
             var t = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
             t !== this.options.disabled && this._setOption("disabled", t), "radio" === this.type ? g(this.element[0]).each(function() {
                 e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
             }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
         },
         _resetButton: function() {
             if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
             var t = this.buttonElement.removeClass(f),
                 i = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                 s = this.options.icons,
                 n = s.primary && s.secondary,
                 a = [];
             s.primary || s.secondary ? (this.options.text && a.push("ui-button-text-icon" + (n ? "s" : s.primary ? "-primary" : "-secondary")), s.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + s.primary + "'></span>"), s.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + s.secondary + "'></span>"), this.options.text || (a.push(n ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", e.trim(i)))) : a.push("ui-button-text-only"), t.addClass(a.join(" "))
         }
     }), e.widget("ui.buttonset", {
         version: "1.11.4",
         options: {
             items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
         },
         _create: function() {
             this.element.addClass("ui-buttonset")
         },
         _init: function() {
             this.refresh()
         },
         _setOption: function(e, t) {
             "disabled" === e && this.buttons.button("option", e, t), this._super(e, t)
         },
         refresh: function() {
             var t = "rtl" === this.element.css("direction"),
                 i = this.element.find(this.options.items),
                 s = i.filter(":ui-button");
             i.not(":ui-button").button(), s.button("refresh"), this.buttons = i.map(function() {
                 return e(this).button("widget")[0]
             }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
         },
         _destroy: function() {
             this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                 return e(this).button("widget")[0]
             }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
         }
     }), e.ui.button, e.extend(e.ui, {
         datepicker: {
             version: "1.11.4"
         }
     });
     var v;
     e.extend(n.prototype, {
         markerClassName: "hasDatepicker",
         maxRows: 4,
         _widgetDatepicker: function() {
             return this.dpDiv
         },
         setDefaults: function(e) {
             return r(this._defaults, e || {}), this
         },
         _attachDatepicker: function(t, i) {
             var s, n, a;
             s = t.nodeName.toLowerCase(), n = "div" === s || "span" === s, t.id || (this.uuid += 1, t.id = "dp" + this.uuid), a = this._newInst(e(t), n), a.settings = e.extend({}, i || {}), "input" === s ? this._connectDatepicker(t, a) : n && this._inlineDatepicker(t, a)
         },
         _newInst: function(t, i) {
             var s = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
             return {
                 id: s,
                 input: t,
                 selectedDay: 0,
                 selectedMonth: 0,
                 selectedYear: 0,
                 drawMonth: 0,
                 drawYear: 0,
                 inline: i,
                 dpDiv: i ? a(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
             }
         },
         _connectDatepicker: function(t, i) {
             var s = e(t);
             i.append = e([]), i.trigger = e([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), e.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
         },
         _attachments: function(t, i) {
             var s, n, a, o = this._get(i, "appendText"),
                 r = this._get(i, "isRTL");
             i.append && i.append.remove(), o && (i.append = e("<span class='" + this._appendClass + "'>" + o + "</span>"), t[r ? "before" : "after"](i.append)), t.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && t.focus(this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), a = this._get(i, "buttonImage"), i.trigger = e(this._get(i, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
                 src: a,
                 alt: n,
                 title: n
             }) : e("<button type='button'></button>").addClass(this._triggerClass).html(a ? e("<img/>").attr({
                 src: a,
                 alt: n,
                 title: n
             }) : n)), t[r ? "before" : "after"](i.trigger), i.trigger.click(function() {
                 return e.datepicker._datepickerShowing && e.datepicker._lastInput === t[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== t[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(t[0])) : e.datepicker._showDatepicker(t[0]), !1
             }))
         },
         _autoSize: function(e) {
             if (this._get(e, "autoSize") && !e.inline) {
                 var t, i, s, n, a = new Date(2009, 11, 20),
                     o = this._get(e, "dateFormat");
                 o.match(/[DM]/) && (t = function(e) {
                     for (i = 0, s = 0, n = 0; e.length > n; n++) e[n].length > i && (i = e[n].length, s = n);
                     return s
                 }, a.setMonth(t(this._get(e, o.match(/MM/) ? "monthNames" : "monthNamesShort"))), a.setDate(t(this._get(e, o.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - a.getDay())), e.input.attr("size", this._formatDate(e, a).length)
             }
         },
         _inlineDatepicker: function(t, i) {
             var s = e(t);
             s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), e.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
         },
         _dialogDatepicker: function(t, i, s, n, a) {
             var o, h, l, u, d, c = this._dialogInst;
             return c || (this.uuid += 1, o = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), c = this._dialogInst = this._newInst(this._dialogInput, !1), c.settings = {}, e.data(this._dialogInput[0], "datepicker", c)), r(c.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(c, i) : i, this._dialogInput.val(i), this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null, this._pos || (h = document.documentElement.clientWidth, l = document.documentElement.clientHeight, u = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + u, l / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), c.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", c), this
         },
         _destroyDatepicker: function(t) {
             var i, s = e(t),
                 n = e.data(t, "datepicker");
             s.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), e.removeData(t, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), v === n && (v = null))
         },
         _enableDatepicker: function(t) {
             var i, s, n = e(t),
                 a = e.data(t, "datepicker");
             n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, a.trigger.filter("button").each(function() {
                 this.disabled = !1
             }).end().filter("img").css({
                 opacity: "1.0",
                 cursor: ""
             })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                 return e === t ? null : e
             }))
         },
         _disableDatepicker: function(t) {
             var i, s, n = e(t),
                 a = e.data(t, "datepicker");
             n.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, a.trigger.filter("button").each(function() {
                 this.disabled = !0
             }).end().filter("img").css({
                 opacity: "0.5",
                 cursor: "default"
             })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function(e) {
                 return e === t ? null : e
             }), this._disabledInputs[this._disabledInputs.length] = t)
         },
         _isDisabledDatepicker: function(e) {
             if (!e) return !1;
             for (var t = 0; this._disabledInputs.length > t; t++)
                 if (this._disabledInputs[t] === e) return !0;
             return !1
         },
         _getInst: function(t) {
             try {
                 return e.data(t, "datepicker")
             }
             catch (i) {
                 throw "Missing instance data for this datepicker"
             }
         },
         _optionDatepicker: function(t, i, s) {
             var n, a, o, h, l = this._getInst(t);
             return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? e.extend({}, e.datepicker._defaults) : l ? "all" === i ? e.extend({}, l.settings) : this._get(l, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), l && (this._curInst === l && this._hideDatepicker(), a = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(l, "min"), h = this._getMinMaxDate(l, "max"), r(l.settings, n), null !== o && void 0 !== n.dateFormat && void 0 === n.minDate && (l.settings.minDate = this._formatDate(l, o)), null !== h && void 0 !== n.dateFormat && void 0 === n.maxDate && (l.settings.maxDate = this._formatDate(l, h)), "disabled" in n && (n.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(e(t), l), this._autoSize(l), this._setDate(l, a), this._updateAlternate(l), this._updateDatepicker(l)), void 0)
         },
         _changeDatepicker: function(e, t, i) {
             this._optionDatepicker(e, t, i)
         },
         _refreshDatepicker: function(e) {
             var t = this._getInst(e);
             t && this._updateDatepicker(t)
         },
         _setDateDatepicker: function(e, t) {
             var i = this._getInst(e);
             i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
         },
         _getDateDatepicker: function(e, t) {
             var i = this._getInst(e);
             return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
         },
         _doKeyDown: function(t) {
             var i, s, n, a = e.datepicker._getInst(t.target),
                 o = !0,
                 r = a.dpDiv.is(".ui-datepicker-rtl");
             if (a._keyEvent = !0, e.datepicker._datepickerShowing) switch (t.keyCode) {
                 case 9:
                     e.datepicker._hideDatepicker(), o = !1;
                     break;
                 case 13:
                     return n = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", a.dpDiv), n[0] && e.datepicker._selectDay(t.target, a.selectedMonth, a.selectedYear, n[0]), i = e.datepicker._get(a, "onSelect"), i ? (s = e.datepicker._formatDate(a), i.apply(a.input ? a.input[0] : null, [s, a])) : e.datepicker._hideDatepicker(), !1;
                 case 27:
                     e.datepicker._hideDatepicker();
                     break;
                 case 33:
                     e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");
                     break;
                 case 34:
                     e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");
                     break;
                 case 35:
                     (t.ctrlKey || t.metaKey) && e.datepicker._clearDate(t.target), o = t.ctrlKey || t.metaKey;
                     break;
                 case 36:
                     (t.ctrlKey || t.metaKey) && e.datepicker._gotoToday(t.target), o = t.ctrlKey || t.metaKey;
                     break;
                 case 37:
                     (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? 1 : -1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? -e.datepicker._get(a, "stepBigMonths") : -e.datepicker._get(a, "stepMonths"), "M");
                     break;
                 case 38:
                     (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, -7, "D"), o = t.ctrlKey || t.metaKey;
                     break;
                 case 39:
                     (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, r ? -1 : 1, "D"), o = t.ctrlKey || t.metaKey, t.originalEvent.altKey && e.datepicker._adjustDate(t.target, t.ctrlKey ? +e.datepicker._get(a, "stepBigMonths") : +e.datepicker._get(a, "stepMonths"), "M");
                     break;
                 case 40:
                     (t.ctrlKey || t.metaKey) && e.datepicker._adjustDate(t.target, 7, "D"), o = t.ctrlKey || t.metaKey;
                     break;
                 default:
                     o = !1
             }
             else 36 === t.keyCode && t.ctrlKey ? e.datepicker._showDatepicker(this) : o = !1;
             o && (t.preventDefault(), t.stopPropagation())
         },
         _doKeyPress: function(t) {
             var i, s, n = e.datepicker._getInst(t.target);
             return e.datepicker._get(n, "constrainInput") ? (i = e.datepicker._possibleChars(e.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
         },
         _doKeyUp: function(t) {
             var i, s = e.datepicker._getInst(t.target);
             if (s.input.val() !== s.lastVal) try {
                 i = e.datepicker.parseDate(e.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, e.datepicker._getFormatConfig(s)), i && (e.datepicker._setDateFromField(s), e.datepicker._updateAlternate(s), e.datepicker._updateDatepicker(s))
             }
             catch (n) {}
             return !0
         },
         _showDatepicker: function(t) {
             if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = e("input", t.parentNode)[0]), !e.datepicker._isDisabledDatepicker(t) && e.datepicker._lastInput !== t) {
                 var i, n, a, o, h, l, u;
                 i = e.datepicker._getInst(t), e.datepicker._curInst && e.datepicker._curInst !== i && (e.datepicker._curInst.dpDiv.stop(!0, !0), i && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), n = e.datepicker._get(i, "beforeShow"), a = n ? n.apply(t, [t, i]) : {}, a !== !1 && (r(i.settings, a), i.lastVal = null, e.datepicker._lastInput = t, e.datepicker._setDateFromField(i), e.datepicker._inDialog && (t.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(t), e.datepicker._pos[1] += t.offsetHeight), o = !1, e(t).parents().each(function() {
                     return o |= "fixed" === e(this).css("position"), !o
                 }), h = {
                     left: e.datepicker._pos[0],
                     top: e.datepicker._pos[1]
                 }, e.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                     position: "absolute",
                     display: "block",
                     top: "-1000px"
                 }), e.datepicker._updateDatepicker(i), h = e.datepicker._checkOffset(i, h, o), i.dpDiv.css({
                     position: e.datepicker._inDialog && e.blockUI ? "static" : o ? "fixed" : "absolute",
                     display: "none",
                     left: h.left + "px",
                     top: h.top + "px"
                 }), i.inline || (l = e.datepicker._get(i, "showAnim"), u = e.datepicker._get(i, "duration"), i.dpDiv.css("z-index", s(e(t)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[l] ? i.dpDiv.show(l, e.datepicker._get(i, "showOptions"), u) : i.dpDiv[l || "show"](l ? u : null), e.datepicker._shouldFocusInput(i) && i.input.focus(), e.datepicker._curInst = i))
             }
         },
         _updateDatepicker: function(t) {
             this.maxRows = 4, v = t, t.dpDiv.empty().append(this._generateHTML(t)), this._attachHandlers(t);
             var i, s = this._getNumberOfMonths(t),
                 n = s[1],
                 a = 17,
                 r = t.dpDiv.find("." + this._dayOverClass + " a");
             r.length > 0 && o.apply(r.get(0)), t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), t.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), t === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(t) && t.input.focus(), t.yearshtml && (i = t.yearshtml, setTimeout(function() {
                 i === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml), i = t.yearshtml = null
             }, 0))
         },
         _shouldFocusInput: function(e) {
             return e.input && e.input.is(":visible") && !e.input.is(":disabled") && !e.input.is(":focus")
         },
         _checkOffset: function(t, i, s) {
             var n = t.dpDiv.outerWidth(),
                 a = t.dpDiv.outerHeight(),
                 o = t.input ? t.input.outerWidth() : 0,
                 r = t.input ? t.input.outerHeight() : 0,
                 h = document.documentElement.clientWidth + (s ? 0 : e(document).scrollLeft()),
                 l = document.documentElement.clientHeight + (s ? 0 : e(document).scrollTop());
             return i.left -= this._get(t, "isRTL") ? n - o : 0, i.left -= s && i.left === t.input.offset().left ? e(document).scrollLeft() : 0, i.top -= s && i.top === t.input.offset().top + r ? e(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > h && h > n ? Math.abs(i.left + n - h) : 0), i.top -= Math.min(i.top, i.top + a > l && l > a ? Math.abs(a + r) : 0), i
         },
         _findPos: function(t) {
             for (var i, s = this._getInst(t), n = this._get(s, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || e.expr.filters.hidden(t));) t = t[n ? "previousSibling" : "nextSibling"];
             return i = e(t).offset(), [i.left, i.top]
         },
         _hideDatepicker: function(t) {
             var i, s, n, a, o = this._curInst;
             !o || t && o !== e.data(t, "datepicker") || this._datepickerShowing && (i = this._get(o, "showAnim"), s = this._get(o, "duration"), n = function() {
                 e.datepicker._tidyDialog(o)
             }, e.effects && (e.effects.effect[i] || e.effects[i]) ? o.dpDiv.hide(i, e.datepicker._get(o, "showOptions"), s, n) : o.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, a = this._get(o, "onClose"), a && a.apply(o.input ? o.input[0] : null, [o.input ? o.input.val() : "", o]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                 position: "absolute",
                 left: "0",
                 top: "-100px"
             }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
         },
         _tidyDialog: function(e) {
             e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
         },
         _checkExternalClick: function(t) {
             if (e.datepicker._curInst) {
                 var i = e(t.target),
                     s = e.datepicker._getInst(i[0]);
                 (i[0].id !== e.datepicker._mainDivId && 0 === i.parents("#" + e.datepicker._mainDivId).length && !i.hasClass(e.datepicker.markerClassName) && !i.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || i.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== s) && e.datepicker._hideDatepicker()
             }
         },
         _adjustDate: function(t, i, s) {
             var n = e(t),
                 a = this._getInst(n[0]);
             this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(a, i + ("M" === s ? this._get(a, "showCurrentAtPos") : 0), s), this._updateDatepicker(a))
         },
         _gotoToday: function(t) {
             var i, s = e(t),
                 n = this._getInst(s[0]);
             this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
         },
         _selectMonthYear: function(t, i, s) {
             var n = e(t),
                 a = this._getInst(n[0]);
             a["selected" + ("M" === s ? "Month" : "Year")] = a["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(a), this._adjustDate(n)
         },
         _selectDay: function(t, i, s, n) {
             var a, o = e(t);
             e(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(o[0]) || (a = this._getInst(o[0]), a.selectedDay = a.currentDay = e("a", n).html(), a.selectedMonth = a.currentMonth = i, a.selectedYear = a.currentYear = s, this._selectDate(t, this._formatDate(a, a.currentDay, a.currentMonth, a.currentYear)))
         },
         _clearDate: function(t) {
             var i = e(t);
             this._selectDate(i, "")
         },
         _selectDate: function(t, i) {
             var s, n = e(t),
                 a = this._getInst(n[0]);
             i = null != i ? i : this._formatDate(a), a.input && a.input.val(i), this._updateAlternate(a), s = this._get(a, "onSelect"), s ? s.apply(a.input ? a.input[0] : null, [i, a]) : a.input && a.input.trigger("change"), a.inline ? this._updateDatepicker(a) : (this._hideDatepicker(), this._lastInput = a.input[0], "object" != typeof a.input[0] && a.input.focus(), this._lastInput = null)
         },
         _updateAlternate: function(t) {
             var i, s, n, a = this._get(t, "altField");
             a && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), s = this._getDate(t), n = this.formatDate(i, s, this._getFormatConfig(t)), e(a).each(function() {
                 e(this).val(n)
             }))
         },
         noWeekends: function(e) {
             var t = e.getDay();
             return [t > 0 && 6 > t, ""]
         },
         iso8601Week: function(e) {
             var t, i = new Date(e.getTime());
             return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), t = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((t - i) / 864e5) / 7) + 1
         },
         parseDate: function(t, i, s) {
             if (null == t || null == i) throw "Invalid arguments";
             if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
             var n, a, o, r, h = 0,
                 l = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                 u = "string" != typeof l ? l : (new Date).getFullYear() % 100 + parseInt(l, 10),
                 d = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                 c = (s ? s.dayNames : null) || this._defaults.dayNames,
                 p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                 f = (s ? s.monthNames : null) || this._defaults.monthNames,
                 m = -1,
                 g = -1,
                 v = -1,
                 y = -1,
                 b = !1,
                 _ = function(e) {
                     var i = t.length > n + 1 && t.charAt(n + 1) === e;
                     return i && n++, i
                 },
                 x = function(e) {
                     var t = _(e),
                         s = "@" === e ? 14 : "!" === e ? 20 : "y" === e && t ? 4 : "o" === e ? 3 : 2,
                         n = "y" === e ? s : 1,
                         a = RegExp("^\\d{" + n + "," + s + "}"),
                         o = i.substring(h).match(a);
                     if (!o) throw "Missing number at position " + h;
                     return h += o[0].length, parseInt(o[0], 10)
                 },
                 w = function(t, s, n) {
                     var a = -1,
                         o = e.map(_(t) ? n : s, function(e, t) {
                             return [
                                 [t, e]
                             ]
                         }).sort(function(e, t) {
                             return -(e[1].length - t[1].length)
                         });
                     if (e.each(o, function(e, t) {
                             var s = t[1];
                             return i.substr(h, s.length).toLowerCase() === s.toLowerCase() ? (a = t[0], h += s.length, !1) : void 0
                         }), -1 !== a) return a + 1;
                     throw "Unknown name at position " + h
                 },
                 k = function() {
                     if (i.charAt(h) !== t.charAt(n)) throw "Unexpected literal at position " + h;
                     h++
                 };
             for (n = 0; t.length > n; n++)
                 if (b) "'" !== t.charAt(n) || _("'") ? k() : b = !1;
                 else switch (t.charAt(n)) {
                     case "d":
                         v = x("d");
                         break;
                     case "D":
                         w("D", d, c);
                         break;
                     case "o":
                         y = x("o");
                         break;
                     case "m":
                         g = x("m");
                         break;
                     case "M":
                         g = w("M", p, f);
                         break;
                     case "y":
                         m = x("y");
                         break;
                     case "@":
                         r = new Date(x("@")), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                         break;
                     case "!":
                         r = new Date((x("!") - this._ticksTo1970) / 1e4), m = r.getFullYear(), g = r.getMonth() + 1, v = r.getDate();
                         break;
                     case "'":
                         _("'") ? k() : b = !0;
                         break;
                     default:
                         k()
                 }
                 if (i.length > h && (o = i.substr(h), !/^\s+/.test(o))) throw "Extra/unparsed characters found in date: " + o;
             if (-1 === m ? m = (new Date).getFullYear() : 100 > m && (m += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (u >= m ? 0 : -100)), y > -1)
                 for (g = 1, v = y;;) {
                     if (a = this._getDaysInMonth(m, g - 1), a >= v) break;
                     g++, v -= a
                 }
             if (r = this._daylightSavingAdjust(new Date(m, g - 1, v)), r.getFullYear() !== m || r.getMonth() + 1 !== g || r.getDate() !== v) throw "Invalid date";
             return r
         },
         ATOM: "yy-mm-dd",
         COOKIE: "D, dd M yy",
         ISO_8601: "yy-mm-dd",
         RFC_822: "D, d M y",
         RFC_850: "DD, dd-M-y",
         RFC_1036: "D, d M y",
         RFC_1123: "D, d M yy",
         RFC_2822: "D, d M yy",
         RSS: "D, d M y",
         TICKS: "!",
         TIMESTAMP: "@",
         W3C: "yy-mm-dd",
         _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
         formatDate: function(e, t, i) {
             if (!t) return "";
             var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                 a = (i ? i.dayNames : null) || this._defaults.dayNames,
                 o = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                 r = (i ? i.monthNames : null) || this._defaults.monthNames,
                 h = function(t) {
                     var i = e.length > s + 1 && e.charAt(s + 1) === t;
                     return i && s++, i
                 },
                 l = function(e, t, i) {
                     var s = "" + t;
                     if (h(e))
                         for (; i > s.length;) s = "0" + s;
                     return s
                 },
                 u = function(e, t, i, s) {
                     return h(e) ? s[t] : i[t]
                 },
                 d = "",
                 c = !1;
             if (t)
                 for (s = 0; e.length > s; s++)
                     if (c) "'" !== e.charAt(s) || h("'") ? d += e.charAt(s) : c = !1;
                     else switch (e.charAt(s)) {
                         case "d":
                             d += l("d", t.getDate(), 2);
                             break;
                         case "D":
                             d += u("D", t.getDay(), n, a);
                             break;
                         case "o":
                             d += l("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                             break;
                         case "m":
                             d += l("m", t.getMonth() + 1, 2);
                             break;
                         case "M":
                             d += u("M", t.getMonth(), o, r);
                             break;
                         case "y":
                             d += h("y") ? t.getFullYear() : (10 > t.getYear() % 100 ? "0" : "") + t.getYear() % 100;
                             break;
                         case "@":
                             d += t.getTime();
                             break;
                         case "!":
                             d += 1e4 * t.getTime() + this._ticksTo1970;
                             break;
                         case "'":
                             h("'") ? d += "'" : c = !0;
                             break;
                         default:
                             d += e.charAt(s)
                     }
                     return d
         },
         _possibleChars: function(e) {
             var t, i = "",
                 s = !1,
                 n = function(i) {
                     var s = e.length > t + 1 && e.charAt(t + 1) === i;
                     return s && t++, s
                 };
             for (t = 0; e.length > t; t++)
                 if (s) "'" !== e.charAt(t) || n("'") ? i += e.charAt(t) : s = !1;
                 else switch (e.charAt(t)) {
                     case "d":
                     case "m":
                     case "y":
                     case "@":
                         i += "0123456789";
                         break;
                     case "D":
                     case "M":
                         return null;
                     case "'":
                         n("'") ? i += "'" : s = !0;
                         break;
                     default:
                         i += e.charAt(t)
                 }
                 return i
         },
         _get: function(e, t) {
             return void 0 !== e.settings[t] ? e.settings[t] : this._defaults[t]
         },
         _setDateFromField: function(e, t) {
             if (e.input.val() !== e.lastVal) {
                 var i = this._get(e, "dateFormat"),
                     s = e.lastVal = e.input ? e.input.val() : null,
                     n = this._getDefaultDate(e),
                     a = n,
                     o = this._getFormatConfig(e);
                 try {
                     a = this.parseDate(i, s, o) || n
                 }
                 catch (r) {
                     s = t ? "" : s
                 }
                 e.selectedDay = a.getDate(), e.drawMonth = e.selectedMonth = a.getMonth(), e.drawYear = e.selectedYear = a.getFullYear(), e.currentDay = s ? a.getDate() : 0, e.currentMonth = s ? a.getMonth() : 0, e.currentYear = s ? a.getFullYear() : 0, this._adjustInstDate(e)
             }
         },
         _getDefaultDate: function(e) {
             return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
         },
         _determineDate: function(t, i, s) {
             var n = function(e) {
                     var t = new Date;
                     return t.setDate(t.getDate() + e), t
                 },
                 a = function(i) {
                     try {
                         return e.datepicker.parseDate(e.datepicker._get(t, "dateFormat"), i, e.datepicker._getFormatConfig(t))
                     }
                     catch (s) {}
                     for (var n = (i.toLowerCase().match(/^c/) ? e.datepicker._getDate(t) : null) || new Date, a = n.getFullYear(), o = n.getMonth(), r = n.getDate(), h = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, l = h.exec(i); l;) {
                         switch (l[2] || "d") {
                             case "d":
                             case "D":
                                 r += parseInt(l[1], 10);
                                 break;
                             case "w":
                             case "W":
                                 r += 7 * parseInt(l[1], 10);
                                 break;
                             case "m":
                             case "M":
                                 o += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o));
                                 break;
                             case "y":
                             case "Y":
                                 a += parseInt(l[1], 10), r = Math.min(r, e.datepicker._getDaysInMonth(a, o))
                         }
                         l = h.exec(i)
                     }
                     return new Date(a, o, r)
                 },
                 o = null == i || "" === i ? s : "string" == typeof i ? a(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
             return o = o && "Invalid Date" == "" + o ? s : o, o && (o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0)), this._daylightSavingAdjust(o)
         },
         _daylightSavingAdjust: function(e) {
             return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
         },
         _setDate: function(e, t, i) {
             var s = !t,
                 n = e.selectedMonth,
                 a = e.selectedYear,
                 o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
             e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), n === e.selectedMonth && a === e.selectedYear || i || this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(s ? "" : this._formatDate(e))
         },
         _getDate: function(e) {
             var t = !e.currentYear || e.input && "" === e.input.val() ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
             return t
         },
         _attachHandlers: function(t) {
             var i = this._get(t, "stepMonths"),
                 s = "#" + t.id.replace(/\\\\/g, "\\");
             t.dpDiv.find("[data-handler]").map(function() {
                 var t = {
                     prev: function() {
                         e.datepicker._adjustDate(s, -i, "M")
                     },
                     next: function() {
                         e.datepicker._adjustDate(s, +i, "M")
                     },
                     hide: function() {
                         e.datepicker._hideDatepicker()
                     },
                     today: function() {
                         e.datepicker._gotoToday(s)
                     },
                     selectDay: function() {
                         return e.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                     },
                     selectMonth: function() {
                         return e.datepicker._selectMonthYear(s, this, "M"), !1
                     },
                     selectYear: function() {
                         return e.datepicker._selectMonthYear(s, this, "Y"), !1
                     }
                 };
                 e(this).bind(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
             })
         },
         _generateHTML: function(e) {
             var t, i, s, n, a, o, r, h, l, u, d, c, p, f, m, g, v, y, b, _, x, w, k, T, D, S, M, C, N, A, P, I, H, z, F, E, O, j, W, L = new Date,
                 R = this._daylightSavingAdjust(new Date(L.getFullYear(), L.getMonth(), L.getDate())),
                 Y = this._get(e, "isRTL"),
                 B = this._get(e, "showButtonPanel"),
                 J = this._get(e, "hideIfNoPrevNext"),
                 q = this._get(e, "navigationAsDateFormat"),
                 K = this._getNumberOfMonths(e),
                 V = this._get(e, "showCurrentAtPos"),
                 U = this._get(e, "stepMonths"),
                 Q = 1 !== K[0] || 1 !== K[1],
                 G = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                 X = this._getMinMaxDate(e, "min"),
                 $ = this._getMinMaxDate(e, "max"),
                 Z = e.drawMonth - V,
                 et = e.drawYear;
             if (0 > Z && (Z += 12, et--), $)
                 for (t = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - K[0] * K[1] + 1, $.getDate())), t = X && X > t ? X : t; this._daylightSavingAdjust(new Date(et, Z, 1)) > t;) Z--, 0 > Z && (Z = 11, et--);
             for (e.drawMonth = Z, e.drawYear = et, i = this._get(e, "prevText"), i = q ? this.formatDate(i, this._daylightSavingAdjust(new Date(et, Z - U, 1)), this._getFormatConfig(e)) : i, s = this._canAdjustMonth(e, -1, et, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>" : J ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(e, "nextText"), n = q ? this.formatDate(n, this._daylightSavingAdjust(new Date(et, Z + U, 1)), this._getFormatConfig(e)) : n, a = this._canAdjustMonth(e, 1, et, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>" : J ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (Y ? "w" : "e") + "'>" + n + "</span></a>", o = this._get(e, "currentText"), r = this._get(e, "gotoCurrent") && e.currentDay ? G : R, o = q ? this.formatDate(o, r, this._getFormatConfig(e)) : o, h = e.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(e, "closeText") + "</button>", l = B ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Y ? h : "") + (this._isInRange(e, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + o + "</button>" : "") + (Y ? "" : h) + "</div>" : "", u = parseInt(this._get(e, "firstDay"), 10), u = isNaN(u) ? 0 : u, d = this._get(e, "showWeek"), c = this._get(e, "dayNames"), p = this._get(e, "dayNamesMin"), f = this._get(e, "monthNames"), m = this._get(e, "monthNamesShort"), g = this._get(e, "beforeShowDay"), v = this._get(e, "showOtherMonths"), y = this._get(e, "selectOtherMonths"), b = this._getDefaultDate(e), _ = "", w = 0; K[0] > w; w++) {
                 for (k = "", this.maxRows = 4, T = 0; K[1] > T; T++) {
                     if (D = this._daylightSavingAdjust(new Date(et, Z, e.selectedDay)), S = " ui-corner-all", M = "", Q) {
                         if (M += "<div class='ui-datepicker-group", K[1] > 1) switch (T) {
                             case 0:
                                 M += " ui-datepicker-group-first", S = " ui-corner-" + (Y ? "right" : "left");
                                 break;
                             case K[1] - 1:
                                 M += " ui-datepicker-group-last", S = " ui-corner-" + (Y ? "left" : "right");
                                 break;
                             default:
                                 M += " ui-datepicker-group-middle", S = ""
                         }
                         M += "'>"
                     }
                     for (M += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + S + "'>" + (/all|left/.test(S) && 0 === w ? Y ? a : s : "") + (/all|right/.test(S) && 0 === w ? Y ? s : a : "") + this._generateMonthYearHeader(e, Z, et, X, $, w > 0 || T > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = d ? "<th class='ui-datepicker-week-col'>" + this._get(e, "weekHeader") + "</th>" : "", x = 0; 7 > x; x++) N = (x + u) % 7, C += "<th scope='col'" + ((x + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + c[N] + "'>" + p[N] + "</span></th>";
                     for (M += C + "</tr></thead><tbody>", A = this._getDaysInMonth(et, Z), et === e.selectedYear && Z === e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, A)), P = (this._getFirstDayOfMonth(et, Z) - u + 7) % 7, I = Math.ceil((P + A) / 7), H = Q ? this.maxRows > I ? this.maxRows : I : I, this.maxRows = H, z = this._daylightSavingAdjust(new Date(et, Z, 1 - P)), F = 0; H > F; F++) {
                         for (M += "<tr>", E = d ? "<td class='ui-datepicker-week-col'>" + this._get(e, "calculateWeek")(z) + "</td>" : "", x = 0; 7 > x; x++) O = g ? g.apply(e.input ? e.input[0] : null, [z]) : [!0, ""], j = z.getMonth() !== Z, W = j && !y || !O[0] || X && X > z || $ && z > $, E += "<td class='" + ((x + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (j ? " ui-datepicker-other-month" : "") + (z.getTime() === D.getTime() && Z === e.selectedMonth && e._keyEvent || b.getTime() === z.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (W ? " " + this._unselectableClass + " ui-state-disabled" : "") + (j && !v ? "" : " " + O[1] + (z.getTime() === G.getTime() ? " " + this._currentClass : "") + (z.getTime() === R.getTime() ? " ui-datepicker-today" : "")) + "'" + (j && !v || !O[2] ? "" : " title='" + O[2].replace(/'/g, "&#39;") + "'") + (W ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (j && !v ? "&#xa0;" : W ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === R.getTime() ? " ui-state-highlight" : "") + (z.getTime() === G.getTime() ? " ui-state-active" : "") + (j ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
                         M += E + "</tr>"
                     }
                     Z++, Z > 11 && (Z = 0, et++), M += "</tbody></table>" + (Q ? "</div>" + (K[0] > 0 && T === K[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), k += M
                 }
                 _ += k
             }
             return _ += l, e._keyEvent = !1, _
         },
         _generateMonthYearHeader: function(e, t, i, s, n, a, o, r) {
             var h, l, u, d, c, p, f, m, g = this._get(e, "changeMonth"),
                 v = this._get(e, "changeYear"),
                 y = this._get(e, "showMonthAfterYear"),
                 b = "<div class='ui-datepicker-title'>",
                 _ = "";
             if (a || !g) _ += "<span class='ui-datepicker-month'>" + o[t] + "</span>";
             else {
                 for (h = s && s.getFullYear() === i, l = n && n.getFullYear() === i, _ += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!h || u >= s.getMonth()) && (!l || n.getMonth() >= u) && (_ += "<option value='" + u + "'" + (u === t ? " selected='selected'" : "") + ">" + r[u] + "</option>");
                 _ += "</select>"
             }
             if (y || (b += _ + (!a && g && v ? "" : "&#xa0;")), !e.yearshtml)
                 if (e.yearshtml = "", a || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                 else {
                     for (d = this._get(e, "yearRange").split(":"), c = (new Date).getFullYear(), p = function(e) {
                             var t = e.match(/c[+\-].*/) ? i + parseInt(e.substring(1), 10) : e.match(/[+\-].*/) ? c + parseInt(e, 10) : parseInt(e, 10);
                             return isNaN(t) ? c : t
                         }, f = p(d[0]), m = Math.max(f, p(d[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, m = n ? Math.min(m, n.getFullYear()) : m, e.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) e.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                     e.yearshtml += "</select>", b += e.yearshtml, e.yearshtml = null
                 }
             return b += this._get(e, "yearSuffix"), y && (b += (!a && g && v ? "" : "&#xa0;") + _), b += "</div>"
         },
         _adjustInstDate: function(e, t, i) {
             var s = e.drawYear + ("Y" === i ? t : 0),
                 n = e.drawMonth + ("M" === i ? t : 0),
                 a = Math.min(e.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? t : 0),
                 o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(s, n, a)));
             e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(e)
         },
         _restrictMinMax: function(e, t) {
             var i = this._getMinMaxDate(e, "min"),
                 s = this._getMinMaxDate(e, "max"),
                 n = i && i > t ? i : t;
             return s && n > s ? s : n
         },
         _notifyChange: function(e) {
             var t = this._get(e, "onChangeMonthYear");
             t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
         },
         _getNumberOfMonths: function(e) {
             var t = this._get(e, "numberOfMonths");
             return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
         },
         _getMinMaxDate: function(e, t) {
             return this._determineDate(e, this._get(e, t + "Date"), null)
         },
         _getDaysInMonth: function(e, t) {
             return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
         },
         _getFirstDayOfMonth: function(e, t) {
             return new Date(e, t, 1).getDay()
         },
         _canAdjustMonth: function(e, t, i, s) {
             var n = this._getNumberOfMonths(e),
                 a = this._daylightSavingAdjust(new Date(i, s + (0 > t ? t : n[0] * n[1]), 1));
             return 0 > t && a.setDate(this._getDaysInMonth(a.getFullYear(), a.getMonth())), this._isInRange(e, a)
         },
         _isInRange: function(e, t) {
             var i, s, n = this._getMinMaxDate(e, "min"),
                 a = this._getMinMaxDate(e, "max"),
                 o = null,
                 r = null,
                 h = this._get(e, "yearRange");
             return h && (i = h.split(":"), s = (new Date).getFullYear(), o = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (o += s), i[1].match(/[+\-].*/) && (r += s)), (!n || t.getTime() >= n.getTime()) && (!a || t.getTime() <= a.getTime()) && (!o || t.getFullYear() >= o) && (!r || r >= t.getFullYear())
         },
         _getFormatConfig: function(e) {
             var t = this._get(e, "shortYearCutoff");
             return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                 shortYearCutoff: t,
                 dayNamesShort: this._get(e, "dayNamesShort"),
                 dayNames: this._get(e, "dayNames"),
                 monthNamesShort: this._get(e, "monthNamesShort"),
                 monthNames: this._get(e, "monthNames")
             }
         },
         _formatDate: function(e, t, i, s) {
             t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
             var n = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(s, i, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
             return this.formatDate(this._get(e, "dateFormat"), n, this._getFormatConfig(e))
         }
     }), e.fn.datepicker = function(t) {
         if (!this.length) return this;
         e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
         var i = Array.prototype.slice.call(arguments, 1);
         return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i)) : this.each(function() {
             "string" == typeof t ? e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this].concat(i)) : e.datepicker._attachDatepicker(this, t)
         }) : e.datepicker["_" + t + "Datepicker"].apply(e.datepicker, [this[0]].concat(i))
     }, e.datepicker = new n, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.11.4", e.datepicker, e.widget("ui.draggable", e.ui.mouse, {
         version: "1.11.4",
         widgetEventPrefix: "drag",
         options: {
             addClasses: !0,
             appendTo: "parent",
             axis: !1,
             connectToSortable: !1,
             containment: !1,
             cursor: "auto",
             cursorAt: !1,
             grid: !1,
             handle: !1,
             helper: "original",
             iframeFix: !1,
             opacity: !1,
             refreshPositions: !1,
             revert: !1,
             revertDuration: 500,
             scope: "default",
             scroll: !0,
             scrollSensitivity: 20,
             scrollSpeed: 20,
             snap: !1,
             snapMode: "both",
             snapTolerance: 20,
             stack: !1,
             zIndex: !1,
             drag: null,
             start: null,
             stop: null
         },
         _create: function() {
             "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
         },
         _setOption: function(e, t) {
             this._super(e, t), "handle" === e && (this._removeHandleClassName(), this._setHandleClassName())
         },
         _destroy: function() {
             return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
         },
         _mouseCapture: function(t) {
             var i = this.options;
             return this._blurActiveElement(t), this.helper || i.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
         },
         _blockFrames: function(t) {
             this.iframeBlocks = this.document.find(t).map(function() {
                 var t = e(this);
                 return e("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
             })
         },
         _unblockFrames: function() {
             this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
         },
         _blurActiveElement: function(t) {
             var i = this.document[0];
             if (this.handleElement.is(t.target)) try {
                 i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && e(i.activeElement).blur()
             }
             catch (s) {}
         },
         _mouseStart: function(t) {
             var i = this.options;
             return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                 return "fixed" === e(this).css("position")
             }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._normalizeRightBottom(), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
         },
         _refreshOffsets: function(e) {
             this.offset = {
                 top: this.positionAbs.top - this.margins.top,
                 left: this.positionAbs.left - this.margins.left,
                 scroll: !1,
                 parent: this._getParentOffset(),
                 relative: this._getRelativeOffset()
             }, this.offset.click = {
                 left: e.pageX - this.offset.left,
                 top: e.pageY - this.offset.top
             }
         },
         _mouseDrag: function(t, i) {
             if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                 var s = this._uiHash();
                 if (this._trigger("drag", t, s) === !1) return this._mouseUp({}), !1;
                 this.position = s.position
             }
             return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
         },
         _mouseStop: function(t) {
             var i = this,
                 s = !1;
             return e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                 i._trigger("stop", t) !== !1 && i._clear()
             }) : this._trigger("stop", t) !== !1 && this._clear(), !1
         },
         _mouseUp: function(t) {
             return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, t)
         },
         cancel: function() {
             return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
         },
         _getHandle: function(t) {
             return this.options.handle ? !!e(t.target).closest(this.element.find(this.options.handle)).length : !0
         },
         _setHandleClassName: function() {
             this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
         },
         _removeHandleClassName: function() {
             this.handleElement.removeClass("ui-draggable-handle")
         },
         _createHelper: function(t) {
             var i = this.options,
                 s = e.isFunction(i.helper),
                 n = s ? e(i.helper.apply(this.element[0], [t])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
             return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
         },
         _setPositionRelative: function() {
             /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
         },
         _adjustOffsetFromHelper: function(t) {
             "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                 left: +t[0],
                 top: +t[1] || 0
             }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
         },
         _isRootNode: function(e) {
             return /(html|body)/i.test(e.tagName) || e === this.document[0]
         },
         _getParentOffset: function() {
             var t = this.offsetParent.offset(),
                 i = this.document[0];
             return "absolute" === this.cssPosition && this.scrollParent[0] !== i && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
                 top: 0,
                 left: 0
             }), {
                 top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                 left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
             }
         },
         _getRelativeOffset: function() {
             if ("relative" !== this.cssPosition) return {
                 top: 0,
                 left: 0
             };
             var e = this.element.position(),
                 t = this._isRootNode(this.scrollParent[0]);
             return {
                 top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
                 left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
             }
         },
         _cacheMargins: function() {
             this.margins = {
                 left: parseInt(this.element.css("marginLeft"), 10) || 0,
                 top: parseInt(this.element.css("marginTop"), 10) || 0,
                 right: parseInt(this.element.css("marginRight"), 10) || 0,
                 bottom: parseInt(this.element.css("marginBottom"), 10) || 0
             }
         },
         _cacheHelperProportions: function() {
             this.helperProportions = {
                 width: this.helper.outerWidth(),
                 height: this.helper.outerHeight()
             }
         },
         _setContainment: function() {
             var t, i, s, n = this.options,
                 a = this.document[0];
             return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, e(a).width() - this.helperProportions.width - this.margins.left, (e(a).height() || a.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = e(n.containment), s = i[0], s && (t = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (t ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
         },
         _convertPositionTo: function(e, t) {
             t || (t = this.position);
             var i = "absolute" === e ? 1 : -1,
                 s = this._isRootNode(this.scrollParent[0]);
             return {
                 top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                 left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
             }
         },
         _generatePosition: function(e, t) {
             var i, s, n, a, o = this.options,
                 r = this._isRootNode(this.scrollParent[0]),
                 h = e.pageX,
                 l = e.pageY;
             return r && this.offset.scroll || (this.offset.scroll = {
                 top: this.scrollParent.scrollTop(),
                 left: this.scrollParent.scrollLeft()
             }), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, e.pageX - this.offset.click.left < i[0] && (h = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), e.pageX - this.offset.click.left > i[2] && (h = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), o.grid && (n = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - o.grid[1] : n + o.grid[1] : n, a = o.grid[0] ? this.originalPageX + Math.round((h - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, h = i ? a - this.offset.click.left >= i[0] || a - this.offset.click.left > i[2] ? a : a - this.offset.click.left >= i[0] ? a - o.grid[0] : a + o.grid[0] : a), "y" === o.axis && (h = this.originalPageX), "x" === o.axis && (l = this.originalPageY)), {
                 top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                 left: h - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
             }
         },
         _clear: function() {
             this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
         },
         _normalizeRightBottom: function() {
             "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
         },
         _trigger: function(t, i, s) {
             return s = s || this._uiHash(), e.ui.plugin.call(this, t, [i, s, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, t, i, s)
         },
         plugins: {},
         _uiHash: function() {
             return {
                 helper: this.helper,
                 position: this.position,
                 originalPosition: this.originalPosition,
                 offset: this.positionAbs
             }
         }
     }), e.ui.plugin.add("draggable", "connectToSortable", {
         start: function(t, i, s) {
             var n = e.extend({}, i, {
                 item: s.element
             });
             s.sortables = [], e(s.options.connectToSortable).each(function() {
                 var i = e(this).sortable("instance");
                 i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, n))
             })
         },
         stop: function(t, i, s) {
             var n = e.extend({}, i, {
                 item: s.element
             });
             s.cancelHelperRemoval = !1, e.each(s.sortables, function() {
                 var e = this;
                 e.isOver ? (e.isOver = 0, s.cancelHelperRemoval = !0, e.cancelHelperRemoval = !1, e._storedCSS = {
                     position: e.placeholder.css("position"),
                     top: e.placeholder.css("top"),
                     left: e.placeholder.css("left")
                 }, e._mouseStop(t), e.options.helper = e.options._helper) : (e.cancelHelperRemoval = !0, e._trigger("deactivate", t, n))
             })
         },
         drag: function(t, i, s) {
             e.each(s.sortables, function() {
                 var n = !1,
                     a = this;
                 a.positionAbs = s.positionAbs, a.helperProportions = s.helperProportions, a.offset.click = s.offset.click, a._intersectsWith(a.containerCache) && (n = !0, e.each(s.sortables, function() {
                     return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== a && this._intersectsWith(this.containerCache) && e.contains(a.element[0], this.element[0]) && (n = !1), n
                 })), n ? (a.isOver || (a.isOver = 1, s._parent = i.helper.parent(), a.currentItem = i.helper.appendTo(a.element).data("ui-sortable-item", !0), a.options._helper = a.options.helper, a.options.helper = function() {
                     return i.helper[0]
                 }, t.target = a.currentItem[0], a._mouseCapture(t, !0), a._mouseStart(t, !0, !0), a.offset.click.top = s.offset.click.top, a.offset.click.left = s.offset.click.left, a.offset.parent.left -= s.offset.parent.left - a.offset.parent.left, a.offset.parent.top -= s.offset.parent.top - a.offset.parent.top, s._trigger("toSortable", t), s.dropped = a.element, e.each(s.sortables, function() {
                     this.refreshPositions()
                 }), s.currentItem = s.element, a.fromOutside = s), a.currentItem && (a._mouseDrag(t), i.position = a.position)) : a.isOver && (a.isOver = 0, a.cancelHelperRemoval = !0, a.options._revert = a.options.revert, a.options.revert = !1, a._trigger("out", t, a._uiHash(a)), a._mouseStop(t, !0), a.options.revert = a.options._revert, a.options.helper = a.options._helper, a.placeholder && a.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(t), i.position = s._generatePosition(t, !0), s._trigger("fromSortable", t), s.dropped = !1, e.each(s.sortables, function() {
                     this.refreshPositions()
                 }))
             })
         }
     }), e.ui.plugin.add("draggable", "cursor", {
         start: function(t, i, s) {
             var n = e("body"),
                 a = s.options;
             n.css("cursor") && (a._cursor = n.css("cursor")), n.css("cursor", a.cursor)
         },
         stop: function(t, i, s) {
             var n = s.options;
             n._cursor && e("body").css("cursor", n._cursor)
         }
     }), e.ui.plugin.add("draggable", "opacity", {
         start: function(t, i, s) {
             var n = e(i.helper),
                 a = s.options;
             n.css("opacity") && (a._opacity = n.css("opacity")), n.css("opacity", a.opacity)
         },
         stop: function(t, i, s) {
             var n = s.options;
             n._opacity && e(i.helper).css("opacity", n._opacity)
         }
     }), e.ui.plugin.add("draggable", "scroll", {
         start: function(e, t, i) {
             i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
         },
         drag: function(t, i, s) {
             var n = s.options,
                 a = !1,
                 o = s.scrollParentNotHidden[0],
                 r = s.document[0];
             o !== r && "HTML" !== o.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + o.offsetHeight - t.pageY < n.scrollSensitivity ? o.scrollTop = a = o.scrollTop + n.scrollSpeed : t.pageY - s.overflowOffset.top < n.scrollSensitivity && (o.scrollTop = a = o.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + o.offsetWidth - t.pageX < n.scrollSensitivity ? o.scrollLeft = a = o.scrollLeft + n.scrollSpeed : t.pageX - s.overflowOffset.left < n.scrollSensitivity && (o.scrollLeft = a = o.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (t.pageY - e(r).scrollTop() < n.scrollSensitivity ? a = e(r).scrollTop(e(r).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(r).scrollTop()) < n.scrollSensitivity && (a = e(r).scrollTop(e(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (t.pageX - e(r).scrollLeft() < n.scrollSensitivity ? a = e(r).scrollLeft(e(r).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(r).scrollLeft()) < n.scrollSensitivity && (a = e(r).scrollLeft(e(r).scrollLeft() + n.scrollSpeed)))), a !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(s, t)
         }
     }), e.ui.plugin.add("draggable", "snap", {
         start: function(t, i, s) {
             var n = s.options;
             s.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                 var t = e(this),
                     i = t.offset();
                 this !== s.element[0] && s.snapElements.push({
                     item: this,
                     width: t.outerWidth(),
                     height: t.outerHeight(),
                     top: i.top,
                     left: i.left
                 })
             })
         },
         drag: function(t, i, s) {
             var n, a, o, r, h, l, u, d, c, p, f = s.options,
                 m = f.snapTolerance,
                 g = i.offset.left,
                 v = g + s.helperProportions.width,
                 y = i.offset.top,
                 b = y + s.helperProportions.height;
             for (c = s.snapElements.length - 1; c >= 0; c--) h = s.snapElements[c].left - s.margins.left, l = h + s.snapElements[c].width, u = s.snapElements[c].top - s.margins.top, d = u + s.snapElements[c].height, h - m > v || g > l + m || u - m > b || y > d + m || !e.contains(s.snapElements[c].item.ownerDocument, s.snapElements[c].item) ? (s.snapElements[c].snapping && s.options.snap.release && s.options.snap.release.call(s.element, t, e.extend(s._uiHash(), {
                 snapItem: s.snapElements[c].item
             })), s.snapElements[c].snapping = !1) : ("inner" !== f.snapMode && (n = m >= Math.abs(u - b), a = m >= Math.abs(d - y), o = m >= Math.abs(h - v), r = m >= Math.abs(l - g), n && (i.position.top = s._convertPositionTo("relative", {
                 top: u - s.helperProportions.height,
                 left: 0
             }).top), a && (i.position.top = s._convertPositionTo("relative", {
                 top: d,
                 left: 0
             }).top), o && (i.position.left = s._convertPositionTo("relative", {
                 top: 0,
                 left: h - s.helperProportions.width
             }).left), r && (i.position.left = s._convertPositionTo("relative", {
                 top: 0,
                 left: l
             }).left)), p = n || a || o || r, "outer" !== f.snapMode && (n = m >= Math.abs(u - y), a = m >= Math.abs(d - b), o = m >= Math.abs(h - g), r = m >= Math.abs(l - v), n && (i.position.top = s._convertPositionTo("relative", {
                 top: u,
                 left: 0
             }).top), a && (i.position.top = s._convertPositionTo("relative", {
                 top: d - s.helperProportions.height,
                 left: 0
             }).top), o && (i.position.left = s._convertPositionTo("relative", {
                 top: 0,
                 left: h
             }).left), r && (i.position.left = s._convertPositionTo("relative", {
                 top: 0,
                 left: l - s.helperProportions.width
             }).left)), !s.snapElements[c].snapping && (n || a || o || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, t, e.extend(s._uiHash(), {
                 snapItem: s.snapElements[c].item
             })), s.snapElements[c].snapping = n || a || o || r || p)
         }
     }), e.ui.plugin.add("draggable", "stack", {
         start: function(t, i, s) {
             var n, a = s.options,
                 o = e.makeArray(e(a.stack)).sort(function(t, i) {
                     return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(i).css("zIndex"), 10) || 0)
                 });
             o.length && (n = parseInt(e(o[0]).css("zIndex"), 10) || 0, e(o).each(function(t) {
                 e(this).css("zIndex", n + t)
             }), this.css("zIndex", n + o.length))
         }
     }), e.ui.plugin.add("draggable", "zIndex", {
         start: function(t, i, s) {
             var n = e(i.helper),
                 a = s.options;
             n.css("zIndex") && (a._zIndex = n.css("zIndex")), n.css("zIndex", a.zIndex)
         },
         stop: function(t, i, s) {
             var n = s.options;
             n._zIndex && e(i.helper).css("zIndex", n._zIndex)
         }
     }), e.ui.draggable, e.widget("ui.resizable", e.ui.mouse, {
         version: "1.11.4",
         widgetEventPrefix: "resize",
         options: {
             alsoResize: !1,
             animate: !1,
             animateDuration: "slow",
             animateEasing: "swing",
             aspectRatio: !1,
             autoHide: !1,
             containment: !1,
             ghost: !1,
             grid: !1,
             handles: "e,s,se",
             helper: !1,
             maxHeight: null,
             maxWidth: null,
             minHeight: 10,
             minWidth: 10,
             zIndex: 90,
             resize: null,
             start: null,
             stop: null
         },
         _num: function(e) {
             return parseInt(e, 10) || 0
         },
         _isNumber: function(e) {
             return !isNaN(parseInt(e, 10))
         },
         _hasScroll: function(t, i) {
             if ("hidden" === e(t).css("overflow")) return !1;
             var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                 n = !1;
             return t[s] > 0 ? !0 : (t[s] = 1, n = t[s] > 0, t[s] = 0, n)
         },
         _create: function() {
             var t, i, s, n, a, o = this,
                 r = this.options;
             if (this.element.addClass("ui-resizable"), e.extend(this, {
                     _aspectRatio: !!r.aspectRatio,
                     aspectRatio: r.aspectRatio,
                     originalElement: this.element,
                     _proportionallyResizeElements: [],
                     _helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
                 }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                     position: this.element.css("position"),
                     width: this.element.outerWidth(),
                     height: this.element.outerHeight(),
                     top: this.element.css("top"),
                     left: this.element.css("left")
                 })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                     marginLeft: this.originalElement.css("marginLeft"),
                     marginTop: this.originalElement.css("marginTop"),
                     marginRight: this.originalElement.css("marginRight"),
                     marginBottom: this.originalElement.css("marginBottom")
                 }), this.originalElement.css({
                     marginLeft: 0,
                     marginTop: 0,
                     marginRight: 0,
                     marginBottom: 0
                 }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                     position: "static",
                     zoom: 1,
                     display: "block"
                 })), this.originalElement.css({
                     margin: this.originalElement.css("margin")
                 }), this._proportionallyResize()), this.handles = r.handles || (e(".ui-resizable-handle", this.element).length ? {
                     n: ".ui-resizable-n",
                     e: ".ui-resizable-e",
                     s: ".ui-resizable-s",
                     w: ".ui-resizable-w",
                     se: ".ui-resizable-se",
                     sw: ".ui-resizable-sw",
                     ne: ".ui-resizable-ne",
                     nw: ".ui-resizable-nw"
                 } : "e,s,se"), this._handles = e(), this.handles.constructor === String)
                 for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), t = this.handles.split(","), this.handles = {}, i = 0; t.length > i; i++) s = e.trim(t[i]), a = "ui-resizable-" + s, n = e("<div class='ui-resizable-handle " + a + "'></div>"), n.css({
                     zIndex: r.zIndex
                 }), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
             this._renderAxis = function(t) {
                 var i, s, n, a;
                 t = t || this.element;
                 for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = e(this.handles[i]), this._on(this.handles[i], {
                     mousedown: o._mouseDown
                 })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = e(this.handles[i], this.element), a = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(n, a), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
             }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function() {
                 o.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), o.axis = n && n[1] ? n[1] : "se")
             }), r.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                 r.disabled || (e(this).removeClass("ui-resizable-autohide"), o._handles.show())
             }).mouseleave(function() {
                 r.disabled || o.resizing || (e(this).addClass("ui-resizable-autohide"), o._handles.hide())
             })), this._mouseInit()
         },
         _destroy: function() {
             this._mouseDestroy();
             var t, i = function(t) {
                 e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
             };
             return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
                 position: t.css("position"),
                 width: t.outerWidth(),
                 height: t.outerHeight(),
                 top: t.css("top"),
                 left: t.css("left")
             }).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
         },
         _mouseCapture: function(t) {
             var i, s, n = !1;
             for (i in this.handles) s = e(this.handles[i])[0], (s === t.target || e.contains(s, t.target)) && (n = !0);
             return !this.options.disabled && n
         },
         _mouseStart: function(t) {
             var i, s, n, a = this.options,
                 o = this.element;
             return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), a.containment && (i += e(a.containment).scrollLeft() || 0, s += e(a.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                 left: i,
                 top: s
             }, this.size = this._helper ? {
                 width: this.helper.width(),
                 height: this.helper.height()
             } : {
                 width: o.width(),
                 height: o.height()
             }, this.originalSize = this._helper ? {
                 width: o.outerWidth(),
                 height: o.outerHeight()
             } : {
                 width: o.width(),
                 height: o.height()
             }, this.sizeDiff = {
                 width: o.outerWidth() - o.width(),
                 height: o.outerHeight() - o.height()
             }, this.originalPosition = {
                 left: i,
                 top: s
             }, this.originalMousePosition = {
                 left: t.pageX,
                 top: t.pageY
             }, this.aspectRatio = "number" == typeof a.aspectRatio ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), o.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
         },
         _mouseDrag: function(t) {
             var i, s, n = this.originalMousePosition,
                 a = this.axis,
                 o = t.pageX - n.left || 0,
                 r = t.pageY - n.top || 0,
                 h = this._change[a];
             return this._updatePrevProperties(), h ? (i = h.apply(this, [t, o, r]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
         },
         _mouseStop: function(t) {
             this.resizing = !1;
             var i, s, n, a, o, r, h, l = this.options,
                 u = this;
             return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : u.sizeDiff.height, a = s ? 0 : u.sizeDiff.width, o = {
                 width: u.helper.width() - a,
                 height: u.helper.height() - n
             }, r = parseInt(u.element.css("left"), 10) + (u.position.left - u.originalPosition.left) || null, h = parseInt(u.element.css("top"), 10) + (u.position.top - u.originalPosition.top) || null, l.animate || this.element.css(e.extend(o, {
                 top: h,
                 left: r
             })), u.helper.height(u.size.height), u.helper.width(u.size.width), this._helper && !l.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
         },
         _updatePrevProperties: function() {
             this.prevPosition = {
                 top: this.position.top,
                 left: this.position.left
             }, this.prevSize = {
                 width: this.size.width,
                 height: this.size.height
             }
         },
         _applyChanges: function() {
             var e = {};
             return this.position.top !== this.prevPosition.top && (e.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (e.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (e.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (e.height = this.size.height + "px"), this.helper.css(e), e
         },
         _updateVirtualBoundaries: function(e) {
             var t, i, s, n, a, o = this.options;
             a = {
                 minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                 maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1 / 0,
                 minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                 maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1 / 0
             }, (this._aspectRatio || e) && (t = a.minHeight * this.aspectRatio, s = a.minWidth / this.aspectRatio, i = a.maxHeight * this.aspectRatio, n = a.maxWidth / this.aspectRatio, t > a.minWidth && (a.minWidth = t), s > a.minHeight && (a.minHeight = s), a.maxWidth > i && (a.maxWidth = i), a.maxHeight > n && (a.maxHeight = n)), this._vBoundaries = a
         },
         _updateCache: function(e) {
             this.offset = this.helper.offset(), this._isNumber(e.left) && (this.position.left = e.left), this._isNumber(e.top) && (this.position.top = e.top), this._isNumber(e.height) && (this.size.height = e.height), this._isNumber(e.width) && (this.size.width = e.width)
         },
         _updateRatio: function(e) {
             var t = this.position,
                 i = this.size,
                 s = this.axis;
             return this._isNumber(e.height) ? e.width = e.height * this.aspectRatio : this._isNumber(e.width) && (e.height = e.width / this.aspectRatio), "sw" === s && (e.left = t.left + (i.width - e.width), e.top = null), "nw" === s && (e.top = t.top + (i.height - e.height), e.left = t.left + (i.width - e.width)), e
         },
         _respectSize: function(e) {
             var t = this._vBoundaries,
                 i = this.axis,
                 s = this._isNumber(e.width) && t.maxWidth && t.maxWidth < e.width,
                 n = this._isNumber(e.height) && t.maxHeight && t.maxHeight < e.height,
                 a = this._isNumber(e.width) && t.minWidth && t.minWidth > e.width,
                 o = this._isNumber(e.height) && t.minHeight && t.minHeight > e.height,
                 r = this.originalPosition.left + this.originalSize.width,
                 h = this.position.top + this.size.height,
                 l = /sw|nw|w/.test(i),
                 u = /nw|ne|n/.test(i);
             return a && (e.width = t.minWidth), o && (e.height = t.minHeight), s && (e.width = t.maxWidth), n && (e.height = t.maxHeight), a && l && (e.left = r - t.minWidth), s && l && (e.left = r - t.maxWidth), o && u && (e.top = h - t.minHeight), n && u && (e.top = h - t.maxHeight), e.width || e.height || e.left || !e.top ? e.width || e.height || e.top || !e.left || (e.left = null) : e.top = null, e
         },
         _getPaddingPlusBorderDimensions: function(e) {
             for (var t = 0, i = [], s = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], n = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")]; 4 > t; t++) i[t] = parseInt(s[t], 10) || 0, i[t] += parseInt(n[t], 10) || 0;
             return {
                 height: i[0] + i[2],
                 width: i[1] + i[3]
             }
         },
         _proportionallyResize: function() {
             if (this._proportionallyResizeElements.length)
                 for (var e, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) e = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(e)), e.css({
                     height: i.height() - this.outerDimensions.height || 0,
                     width: i.width() - this.outerDimensions.width || 0
                 })
         },
         _renderProxy: function() {
             var t = this.element,
                 i = this.options;
             this.elementOffset = t.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                 width: this.element.outerWidth() - 1,
                 height: this.element.outerHeight() - 1,
                 position: "absolute",
                 left: this.elementOffset.left + "px",
                 top: this.elementOffset.top + "px",
                 zIndex: ++i.zIndex
             }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
         },
         _change: {
             e: function(e, t) {
                 return {
                     width: this.originalSize.width + t
                 }
             },
             w: function(e, t) {
                 var i = this.originalSize,
                     s = this.originalPosition;
                 return {
                     left: s.left + t,
                     width: i.width - t
                 }
             },
             n: function(e, t, i) {
                 var s = this.originalSize,
                     n = this.originalPosition;
                 return {
                     top: n.top + i,
                     height: s.height - i
                 }
             },
             s: function(e, t, i) {
                 return {
                     height: this.originalSize.height + i
                 }
             },
             se: function(t, i, s) {
                 return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
             },
             sw: function(t, i, s) {
                 return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
             },
             ne: function(t, i, s) {
                 return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, s]))
             },
             nw: function(t, i, s) {
                 return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, s]))
             }
         },
         _propagate: function(t, i) {
             e.ui.plugin.call(this, t, [i, this.ui()]), "resize" !== t && this._trigger(t, i, this.ui())
         },
         plugins: {},
         ui: function() {
             return {
                 originalElement: this.originalElement,
                 element: this.element,
                 helper: this.helper,
                 position: this.position,
                 size: this.size,
                 originalSize: this.originalSize,
                 originalPosition: this.originalPosition
             }
         }
     }), e.ui.plugin.add("resizable", "animate", {
         stop: function(t) {
             var i = e(this).resizable("instance"),
                 s = i.options,
                 n = i._proportionallyResizeElements,
                 a = n.length && /textarea/i.test(n[0].nodeName),
                 o = a && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height,
                 r = a ? 0 : i.sizeDiff.width,
                 h = {
                     width: i.size.width - r,
                     height: i.size.height - o
                 },
                 l = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
                 u = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
             i.element.animate(e.extend(h, u && l ? {
                 top: u,
                 left: l
             } : {}), {
                 duration: s.animateDuration,
                 easing: s.animateEasing,
                 step: function() {
                     var s = {
                         width: parseInt(i.element.css("width"), 10),
                         height: parseInt(i.element.css("height"), 10),
                         top: parseInt(i.element.css("top"), 10),
                         left: parseInt(i.element.css("left"), 10)
                     };
                     n && n.length && e(n[0]).css({
                         width: s.width,
                         height: s.height
                     }), i._updateCache(s), i._propagate("resize", t)
                 }
             })
         }
     }), e.ui.plugin.add("resizable", "containment", {
         start: function() {
             var t, i, s, n, a, o, r, h = e(this).resizable("instance"),
                 l = h.options,
                 u = h.element,
                 d = l.containment,
                 c = d instanceof e ? d.get(0) : /parent/.test(d) ? u.parent().get(0) : d;
             c && (h.containerElement = e(c), /document/.test(d) || d === document ? (h.containerOffset = {
                 left: 0,
                 top: 0
             }, h.containerPosition = {
                 left: 0,
                 top: 0
             }, h.parentData = {
                 element: e(document),
                 left: 0,
                 top: 0,
                 width: e(document).width(),
                 height: e(document).height() || document.body.parentNode.scrollHeight
             }) : (t = e(c), i = [], e(["Top", "Right", "Left", "Bottom"]).each(function(e, s) {
                 i[e] = h._num(t.css("padding" + s))
             }), h.containerOffset = t.offset(), h.containerPosition = t.position(), h.containerSize = {
                 height: t.innerHeight() - i[3],
                 width: t.innerWidth() - i[1]
             }, s = h.containerOffset, n = h.containerSize.height, a = h.containerSize.width, o = h._hasScroll(c, "left") ? c.scrollWidth : a, r = h._hasScroll(c) ? c.scrollHeight : n, h.parentData = {
                 element: c,
                 left: s.left,
                 top: s.top,
                 width: o,
                 height: r
             }))
         },
         resize: function(t) {
             var i, s, n, a, o = e(this).resizable("instance"),
                 r = o.options,
                 h = o.containerOffset,
                 l = o.position,
                 u = o._aspectRatio || t.shiftKey,
                 d = {
                     top: 0,
                     left: 0
                 },
                 c = o.containerElement,
                 p = !0;
             c[0] !== document && /static/.test(c.css("position")) && (d = h), l.left < (o._helper ? h.left : 0) && (o.size.width = o.size.width + (o._helper ? o.position.left - h.left : o.position.left - d.left), u && (o.size.height = o.size.width / o.aspectRatio, p = !1), o.position.left = r.helper ? h.left : 0), l.top < (o._helper ? h.top : 0) && (o.size.height = o.size.height + (o._helper ? o.position.top - h.top : o.position.top), u && (o.size.width = o.size.height * o.aspectRatio, p = !1), o.position.top = o._helper ? h.top : 0), n = o.containerElement.get(0) === o.element.parent().get(0), a = /relative|absolute/.test(o.containerElement.css("position")), n && a ? (o.offset.left = o.parentData.left + o.position.left, o.offset.top = o.parentData.top + o.position.top) : (o.offset.left = o.element.offset().left, o.offset.top = o.element.offset().top), i = Math.abs(o.sizeDiff.width + (o._helper ? o.offset.left - d.left : o.offset.left - h.left)), s = Math.abs(o.sizeDiff.height + (o._helper ? o.offset.top - d.top : o.offset.top - h.top)), i + o.size.width >= o.parentData.width && (o.size.width = o.parentData.width - i, u && (o.size.height = o.size.width / o.aspectRatio, p = !1)), s + o.size.height >= o.parentData.height && (o.size.height = o.parentData.height - s, u && (o.size.width = o.size.height * o.aspectRatio, p = !1)), p || (o.position.left = o.prevPosition.left, o.position.top = o.prevPosition.top, o.size.width = o.prevSize.width, o.size.height = o.prevSize.height)
         },
         stop: function() {
             var t = e(this).resizable("instance"),
                 i = t.options,
                 s = t.containerOffset,
                 n = t.containerPosition,
                 a = t.containerElement,
                 o = e(t.helper),
                 r = o.offset(),
                 h = o.outerWidth() - t.sizeDiff.width,
                 l = o.outerHeight() - t.sizeDiff.height;
             t._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({
                 left: r.left - n.left - s.left,
                 width: h,
                 height: l
             }), t._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({
                 left: r.left - n.left - s.left,
                 width: h,
                 height: l
             })
         }
     }), e.ui.plugin.add("resizable", "alsoResize", {
         start: function() {
             var t = e(this).resizable("instance"),
                 i = t.options;
             e(i.alsoResize).each(function() {
                 var t = e(this);
                 t.data("ui-resizable-alsoresize", {
                     width: parseInt(t.width(), 10),
                     height: parseInt(t.height(), 10),
                     left: parseInt(t.css("left"), 10),
                     top: parseInt(t.css("top"), 10)
                 })
             })
         },
         resize: function(t, i) {
             var s = e(this).resizable("instance"),
                 n = s.options,
                 a = s.originalSize,
                 o = s.originalPosition,
                 r = {
                     height: s.size.height - a.height || 0,
                     width: s.size.width - a.width || 0,
                     top: s.position.top - o.top || 0,
                     left: s.position.left - o.left || 0
                 };
             e(n.alsoResize).each(function() {
                 var t = e(this),
                     s = e(this).data("ui-resizable-alsoresize"),
                     n = {},
                     a = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                 e.each(a, function(e, t) {
                     var i = (s[t] || 0) + (r[t] || 0);
                     i && i >= 0 && (n[t] = i || null)
                 }), t.css(n)
             })
         },
         stop: function() {
             e(this).removeData("resizable-alsoresize")
         }
     }), e.ui.plugin.add("resizable", "ghost", {
         start: function() {
             var t = e(this).resizable("instance"),
                 i = t.options,
                 s = t.size;
             t.ghost = t.originalElement.clone(), t.ghost.css({
                 opacity: .25,
                 display: "block",
                 position: "relative",
                 height: s.height,
                 width: s.width,
                 margin: 0,
                 left: 0,
                 top: 0
             }).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), t.ghost.appendTo(t.helper)
         },
         resize: function() {
             var t = e(this).resizable("instance");
             t.ghost && t.ghost.css({
                 position: "relative",
                 height: t.size.height,
                 width: t.size.width
             })
         },
         stop: function() {
             var t = e(this).resizable("instance");
             t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
         }
     }), e.ui.plugin.add("resizable", "grid", {
         resize: function() {
             var t, i = e(this).resizable("instance"),
                 s = i.options,
                 n = i.size,
                 a = i.originalSize,
                 o = i.originalPosition,
                 r = i.axis,
                 h = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                 l = h[0] || 1,
                 u = h[1] || 1,
                 d = Math.round((n.width - a.width) / l) * l,
                 c = Math.round((n.height - a.height) / u) * u,
                 p = a.width + d,
                 f = a.height + c,
                 m = s.maxWidth && p > s.maxWidth,
                 g = s.maxHeight && f > s.maxHeight,
                 v = s.minWidth && s.minWidth > p,
                 y = s.minHeight && s.minHeight > f;
             s.grid = h, v && (p += l), y && (f += u), m && (p -= l), g && (f -= u), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = o.top - c) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = o.left - d) : ((0 >= f - u || 0 >= p - l) && (t = i._getPaddingPlusBorderDimensions(this)), f - u > 0 ? (i.size.height = f, i.position.top = o.top - c) : (f = u - t.height, i.size.height = f, i.position.top = o.top + a.height - f), p - l > 0 ? (i.size.width = p, i.position.left = o.left - d) : (p = l - t.width, i.size.width = p, i.position.left = o.left + a.width - p))
         }
     }), e.ui.resizable, e.widget("ui.dialog", {
         version: "1.11.4",
         options: {
             appendTo: "body",
             autoOpen: !0,
             buttons: [],
             closeOnEscape: !0,
             closeText: "Close",
             dialogClass: "",
             draggable: !0,
             hide: null,
             height: "auto",
             maxHeight: null,
             maxWidth: null,
             minHeight: 150,
             minWidth: 150,
             modal: !1,
             position: {
                 my: "center",
                 at: "center",
                 of: window,
                 collision: "fit",
                 using: function(t) {
                     var i = e(this).css(t).offset().top;
                     0 > i && e(this).css("top", t.top - i)
                 }
             },
             resizable: !0,
             show: null,
             title: null,
             width: 300,
             beforeClose: null,
             close: null,
             drag: null,
             dragStart: null,
             dragStop: null,
             focus: null,
             open: null,
             resize: null,
             resizeStart: null,
             resizeStop: null
         },
         sizeRelatedOptions: {
             buttons: !0,
             height: !0,
             maxHeight: !0,
             maxWidth: !0,
             minHeight: !0,
             minWidth: !0,
             width: !0
         },
         resizableRelatedOptions: {
             maxHeight: !0,
             maxWidth: !0,
             minHeight: !0,
             minWidth: !0
         },
         _create: function() {
             this.originalCss = {
                 display: this.element[0].style.display,
                 width: this.element[0].style.width,
                 minHeight: this.element[0].style.minHeight,
                 maxHeight: this.element[0].style.maxHeight,
                 height: this.element[0].style.height
             }, this.originalPosition = {
                 parent: this.element.parent(),
                 index: this.element.parent().children().index(this.element)
             }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && e.fn.draggable && this._makeDraggable(), this.options.resizable && e.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
         },
         _init: function() {
             this.options.autoOpen && this.open()
         },
         _appendTo: function() {
             var t = this.options.appendTo;
             return t && (t.jquery || t.nodeType) ? e(t) : this.document.find(t || "body").eq(0)
         },
         _destroy: function() {
             var e, t = this.originalPosition;
             this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), e = t.parent.children().eq(t.index), e.length && e[0] !== this.element[0] ? e.before(this.element) : t.parent.append(this.element)
         },
         widget: function() {
             return this.uiDialog
         },
         disable: e.noop,
         enable: e.noop,
         close: function(t) {
             var i, s = this;
             if (this._isOpen && this._trigger("beforeClose", t) !== !1) {
                 if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) try {
                     i = this.document[0].activeElement, i && "body" !== i.nodeName.toLowerCase() && e(i).blur()
                 }
                 catch (n) {}
                 this._hide(this.uiDialog, this.options.hide, function() {
                     s._trigger("close", t)
                 })
             }
         },
         isOpen: function() {
             return this._isOpen
         },
         moveToTop: function() {
             this._moveToTop()
         },
         _moveToTop: function(t, i) {
             var s = !1,
                 n = this.uiDialog.siblings(".ui-front:visible").map(function() {
                     return +e(this).css("z-index")
                 }).get(),
                 a = Math.max.apply(null, n);
             return a >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", a + 1), s = !0), s && !i && this._trigger("focus", t), s
         },
         open: function() {
             var t = this;
             return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = e(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
                 t._focusTabbable(), t._trigger("focus")
             }), this._makeFocusTarget(), this._trigger("open"), void 0)
         },
         _focusTabbable: function() {
             var e = this._focusedElement;
             e || (e = this.element.find("[autofocus]")), e.length || (e = this.element.find(":tabbable")), e.length || (e = this.uiDialogButtonPane.find(":tabbable")), e.length || (e = this.uiDialogTitlebarClose.filter(":tabbable")), e.length || (e = this.uiDialog), e.eq(0).focus()
         },
         _keepFocus: function(t) {
             function i() {
                 var t = this.document[0].activeElement,
                     i = this.uiDialog[0] === t || e.contains(this.uiDialog[0], t);
                 i || this._focusTabbable()
             }
             t.preventDefault(), i.call(this), this._delay(i)
         },
         _createWrapper: function() {
             this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                 tabIndex: -1,
                 role: "dialog"
             }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                 keydown: function(t) {
                     if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === e.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), void 0;
                     if (t.keyCode === e.ui.keyCode.TAB && !t.isDefaultPrevented()) {
                         var i = this.uiDialog.find(":tabbable"),
                             s = i.filter(":first"),
                             n = i.filter(":last");
                         t.target !== n[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== s[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
                             n.focus()
                         }), t.preventDefault()) : (this._delay(function() {
                             s.focus()
                         }), t.preventDefault())
                     }
                 },
                 mousedown: function(e) {
                     this._moveToTop(e) && this._focusTabbable()
                 }
             }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                 "aria-describedby": this.element.uniqueId().attr("id")
             })
         },
         _createTitlebar: function() {
             var t;
             this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                 mousedown: function(t) {
                     e(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                 }
             }), this.uiDialogTitlebarClose = e("<button type='button'></button>").button({
                 label: this.options.closeText,
                 icons: {
                     primary: "ui-icon-closethick"
                 },
                 text: !1
             }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                 click: function(e) {
                     e.preventDefault(), this.close(e)
                 }
             }), t = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(t), this.uiDialog.attr({
                 "aria-labelledby": t.attr("id")
             })
         },
         _title: function(e) {
             this.options.title || e.html("&#160;"), e.text(this.options.title)
         },
         _createButtonPane: function() {
             this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
         },
         _createButtons: function() {
             var t = this,
                 i = this.options.buttons;
             return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), e.isEmptyObject(i) || e.isArray(i) && !i.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (e.each(i, function(i, s) {
                 var n, a;
                 s = e.isFunction(s) ? {
                     click: s,
                     text: i
                 } : s, s = e.extend({
                     type: "button"
                 }, s), n = s.click, s.click = function() {
                     n.apply(t.element[0], arguments)
                 }, a = {
                     icons: s.icons,
                     text: s.showText
                 }, delete s.icons, delete s.showText, e("<button></button>", s).button(a).appendTo(t.uiButtonSet)
             }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
         },
         _makeDraggable: function() {
             function t(e) {
                 return {
                     position: e.position,
                     offset: e.offset
                 }
             }
             var i = this,
                 s = this.options;
             this.uiDialog.draggable({
                 cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                 handle: ".ui-dialog-titlebar",
                 containment: "document",
                 start: function(s, n) {
                     e(this).addClass("ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, t(n))
                 },
                 drag: function(e, s) {
                     i._trigger("drag", e, t(s))
                 },
                 stop: function(n, a) {
                     var o = a.offset.left - i.document.scrollLeft(),
                         r = a.offset.top - i.document.scrollTop();
                     s.position = {
                         my: "left top",
                         at: "left" + (o >= 0 ? "+" : "") + o + " " + "top" + (r >= 0 ? "+" : "") + r,
                         of: i.window
                     }, e(this).removeClass("ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, t(a))
                 }
             })
         },
         _makeResizable: function() {
             function t(e) {
                 return {
                     originalPosition: e.originalPosition,
                     originalSize: e.originalSize,
                     position: e.position,
                     size: e.size
                 }
             }
             var i = this,
                 s = this.options,
                 n = s.resizable,
                 a = this.uiDialog.css("position"),
                 o = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
             this.uiDialog.resizable({
                 cancel: ".ui-dialog-content",
                 containment: "document",
                 alsoResize: this.element,
                 maxWidth: s.maxWidth,
                 maxHeight: s.maxHeight,
                 minWidth: s.minWidth,
                 minHeight: this._minHeight(),
                 handles: o,
                 start: function(s, n) {
                     e(this).addClass("ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, t(n))
                 },
                 resize: function(e, s) {
                     i._trigger("resize", e, t(s))
                 },
                 stop: function(n, a) {
                     var o = i.uiDialog.offset(),
                         r = o.left - i.document.scrollLeft(),
                         h = o.top - i.document.scrollTop();
                     s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {
                         my: "left top",
                         at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (h >= 0 ? "+" : "") + h,
                         of: i.window
                     }, e(this).removeClass("ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, t(a))
                 }
             }).css("position", a)
         },
         _trackFocus: function() {
             this._on(this.widget(), {
                 focusin: function(t) {
                     this._makeFocusTarget(), this._focusedElement = e(t.target)
                 }
             })
         },
         _makeFocusTarget: function() {
             this._untrackInstance(), this._trackingInstances().unshift(this)
         },
         _untrackInstance: function() {
             var t = this._trackingInstances(),
                 i = e.inArray(this, t); - 1 !== i && t.splice(i, 1)
         },
         _trackingInstances: function() {
             var e = this.document.data("ui-dialog-instances");
             return e || (e = [], this.document.data("ui-dialog-instances", e)), e
         },
         _minHeight: function() {
             var e = this.options;
             return "auto" === e.height ? e.minHeight : Math.min(e.minHeight, e.height)
         },
         _position: function() {
             var e = this.uiDialog.is(":visible");
             e || this.uiDialog.show(), this.uiDialog.position(this.options.position), e || this.uiDialog.hide()
         },
         _setOptions: function(t) {
             var i = this,
                 s = !1,
                 n = {};
             e.each(t, function(e, t) {
                 i._setOption(e, t), e in i.sizeRelatedOptions && (s = !0), e in i.resizableRelatedOptions && (n[e] = t)
             }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
         },
         _setOption: function(e, t) {
             var i, s, n = this.uiDialog;
             "dialogClass" === e && n.removeClass(this.options.dialogClass).addClass(t), "disabled" !== e && (this._super(e, t), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({
                 label: "" + t
             }), "draggable" === e && (i = n.is(":data(ui-draggable)"), i && !t && n.draggable("destroy"), !i && t && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (s = n.is(":data(ui-resizable)"), s && !t && n.resizable("destroy"), s && "string" == typeof t && n.resizable("option", "handles", t), s || t === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
         },
         _size: function() {
             var e, t, i, s = this.options;
             this.element.show().css({
                 width: "auto",
                 minHeight: 0,
                 maxHeight: "none",
                 height: 0
             }), s.minWidth > s.width && (s.width = s.minWidth), e = this.uiDialog.css({
                 height: "auto",
                 width: s.width
             }).outerHeight(), t = Math.max(0, s.minHeight - e), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - e) : "none", "auto" === s.height ? this.element.css({
                 minHeight: t,
                 maxHeight: i,
                 height: "auto"
             }) : this.element.height(Math.max(0, s.height - e)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
         },
         _blockFrames: function() {
             this.iframeBlocks = this.document.find("iframe").map(function() {
                 var t = e(this);
                 return e("<div>").css({
                     position: "absolute",
                     width: t.outerWidth(),
                     height: t.outerHeight()
                 }).appendTo(t.parent()).offset(t.offset())[0]
             })
         },
         _unblockFrames: function() {
             this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
         },
         _allowInteraction: function(t) {
             return e(t.target).closest(".ui-dialog").length ? !0 : !!e(t.target).closest(".ui-datepicker").length
         },
         _createOverlay: function() {
             if (this.options.modal) {
                 var t = !0;
                 this._delay(function() {
                     t = !1
                 }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                     focusin: function(e) {
                         t || this._allowInteraction(e) || (e.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                     }
                 }), this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                     mousedown: "_keepFocus"
                 }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
             }
         },
         _destroyOverlay: function() {
             if (this.options.modal && this.overlay) {
                 var e = this.document.data("ui-dialog-overlays") - 1;
                 e ? this.document.data("ui-dialog-overlays", e) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
             }
         }
     }), e.widget("ui.droppable", {
         version: "1.11.4",
         widgetEventPrefix: "drop",
         options: {
             accept: "*",
             activeClass: !1,
             addClasses: !0,
             greedy: !1,
             hoverClass: !1,
             scope: "default",
             tolerance: "intersect",
             activate: null,
             deactivate: null,
             drop: null,
             out: null,
             over: null
         },
         _create: function() {
             var t, i = this.options,
                 s = i.accept;
             this.isover = !1, this.isout = !0, this.accept = e.isFunction(s) ? s : function(e) {
                 return e.is(s)
             }, this.proportions = function() {
                 return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
                     width: this.element[0].offsetWidth,
                     height: this.element[0].offsetHeight
                 }
             }, this._addToManager(i.scope), i.addClasses && this.element.addClass("ui-droppable")
         },
         _addToManager: function(t) {
             e.ui.ddmanager.droppables[t] = e.ui.ddmanager.droppables[t] || [], e.ui.ddmanager.droppables[t].push(this)
         },
         _splice: function(e) {
             for (var t = 0; e.length > t; t++) e[t] === this && e.splice(t, 1)
         },
         _destroy: function() {
             var t = e.ui.ddmanager.droppables[this.options.scope];
             this._splice(t), this.element.removeClass("ui-droppable ui-droppable-disabled")
         },
         _setOption: function(t, i) {
             if ("accept" === t) this.accept = e.isFunction(i) ? i : function(e) {
                 return e.is(i)
             };
             else if ("scope" === t) {
                 var s = e.ui.ddmanager.droppables[this.options.scope];
                 this._splice(s), this._addToManager(i)
             }
             this._super(t, i)
         },
         _activate: function(t) {
             var i = e.ui.ddmanager.current;
             this.options.activeClass && this.element.addClass(this.options.activeClass), i && this._trigger("activate", t, this.ui(i))
         },
         _deactivate: function(t) {
             var i = e.ui.ddmanager.current;
             this.options.activeClass && this.element.removeClass(this.options.activeClass), i && this._trigger("deactivate", t, this.ui(i))
         },
         _over: function(t) {
             var i = e.ui.ddmanager.current;
             i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(i)))
         },
         _out: function(t) {
             var i = e.ui.ddmanager.current;
             i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(i)))
         },
         _drop: function(t, i) {
             var s = i || e.ui.ddmanager.current,
                 n = !1;
             return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                 var i = e(this).droppable("instance");
                 return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && e.ui.intersect(s, e.extend(i, {
                     offset: i.element.offset()
                 }), i.options.tolerance, t) ? (n = !0, !1) : void 0
             }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(s)), this.element) : !1) : !1
         },
         ui: function(e) {
             return {
                 draggable: e.currentItem || e.element,
                 helper: e.helper,
                 position: e.position,
                 offset: e.positionAbs
             }
         }
     }), e.ui.intersect = function() {
         function e(e, t, i) {
             return e >= t && t + i > e
         }
         return function(t, i, s, n) {
             if (!i.offset) return !1;
             var a = (t.positionAbs || t.position.absolute).left + t.margins.left,
                 o = (t.positionAbs || t.position.absolute).top + t.margins.top,
                 r = a + t.helperProportions.width,
                 h = o + t.helperProportions.height,
                 l = i.offset.left,
                 u = i.offset.top,
                 d = l + i.proportions().width,
                 c = u + i.proportions().height;
             switch (s) {
                 case "fit":
                     return a >= l && d >= r && o >= u && c >= h;
                 case "intersect":
                     return a + t.helperProportions.width / 2 > l && d > r - t.helperProportions.width / 2 && o + t.helperProportions.height / 2 > u && c > h - t.helperProportions.height / 2;
                 case "pointer":
                     return e(n.pageY, u, i.proportions().height) && e(n.pageX, l, i.proportions().width);
                 case "touch":
                     return (o >= u && c >= o || h >= u && c >= h || u > o && h > c) && (a >= l && d >= a || r >= l && d >= r || l > a && r > d);
                 default:
                     return !1
             }
         }
     }(), e.ui.ddmanager = {
         current: null,
         droppables: {
             "default": []
         },
         prepareOffsets: function(t, i) {
             var s, n, a = e.ui.ddmanager.droppables[t.options.scope] || [],
                 o = i ? i.type : null,
                 r = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
             e: for (s = 0; a.length > s; s++)
                 if (!(a[s].options.disabled || t && !a[s].accept.call(a[s].element[0], t.currentItem || t.element))) {
                     for (n = 0; r.length > n; n++)
                         if (r[n] === a[s].element[0]) {
                             a[s].proportions().height = 0;
                             continue e
                         }
                     a[s].visible = "none" !== a[s].element.css("display"), a[s].visible && ("mousedown" === o && a[s]._activate.call(a[s], i), a[s].offset = a[s].element.offset(), a[s].proportions({
                         width: a[s].element[0].offsetWidth,
                         height: a[s].element[0].offsetHeight
                     }))
                 }
         },
         drop: function(t, i) {
             var s = !1;
             return e.each((e.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                 this.options && (!this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
             }), s
         },
         dragStart: function(t, i) {
             t.element.parentsUntil("body").bind("scroll.droppable", function() {
                 t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
             })
         },
         drag: function(t, i) {
             t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, i), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                 if (!this.options.disabled && !this.greedyChild && this.visible) {
                     var s, n, a, o = e.ui.intersect(t, this, this.options.tolerance, i),
                         r = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                     r && (this.options.greedy && (n = this.options.scope, a = this.element.parents(":data(ui-droppable)").filter(function() {
                         return e(this).droppable("instance").options.scope === n
                     }), a.length && (s = e(a[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                 }
             })
         },
         dragStop: function(t, i) {
             t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, i)
         }
     }, e.ui.droppable;
     var y = "ui-effects-",
         b = e;
     e.effects = {
             effect: {}
         },
         function(e, t) {
             function i(e, t, i) {
                 var s = d[t.type] || {};
                 return null == e ? i || !t.def ? null : t.def : (e = s.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : s.mod ? (e + s.mod) % s.mod : 0 > e ? 0 : e > s.max ? s.max : e)
             }

             function s(i) {
                 var s = l(),
                     n = s._rgba = [];
                 return i = i.toLowerCase(), f(h, function(e, a) {
                     var o, r = a.re.exec(i),
                         h = r && a.parse(r),
                         l = a.space || "rgba";
                     return h ? (o = s[l](h), s[u[l].cache] = o[u[l].cache], n = s._rgba = o._rgba, !1) : t
                 }), n.length ? ("0,0,0,0" === n.join() && e.extend(n, a.transparent), s) : a[i]
             }

             function n(e, t, i) {
                 return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
             }
             var a, o = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                 r = /^([\-+])=\s*(\d+\.?\d*)/,
                 h = [{
                     re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                     parse: function(e) {
                         return [e[1], e[2], e[3], e[4]]
                     }
                 }, {
                     re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                     parse: function(e) {
                         return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                     }
                 }, {
                     re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                     parse: function(e) {
                         return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                     }
                 }, {
                     re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                     parse: function(e) {
                         return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                     }
                 }, {
                     re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                     space: "hsla",
                     parse: function(e) {
                         return [e[1], e[2] / 100, e[3] / 100, e[4]]
                     }
                 }],
                 l = e.Color = function(t, i, s, n) {
                     return new e.Color.fn.parse(t, i, s, n)
                 },
                 u = {
                     rgba: {
                         props: {
                             red: {
                                 idx: 0,
                                 type: "byte"
                             },
                             green: {
                                 idx: 1,
                                 type: "byte"
                             },
                             blue: {
                                 idx: 2,
                                 type: "byte"
                             }
                         }
                     },
                     hsla: {
                         props: {
                             hue: {
                                 idx: 0,
                                 type: "degrees"
                             },
                             saturation: {
                                 idx: 1,
                                 type: "percent"
                             },
                             lightness: {
                                 idx: 2,
                                 type: "percent"
                             }
                         }
                     }
                 },
                 d = {
                     "byte": {
                         floor: !0,
                         max: 255
                     },
                     percent: {
                         max: 1
                     },
                     degrees: {
                         mod: 360,
                         floor: !0
                     }
                 },
                 c = l.support = {},
                 p = e("<p>")[0],
                 f = e.each;
             p.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(e, t) {
                 t.cache = "_" + e, t.props.alpha = {
                     idx: 3,
                     type: "percent",
                     def: 1
                 }
             }), l.fn = e.extend(l.prototype, {
                 parse: function(n, o, r, h) {
                     if (n === t) return this._rgba = [null, null, null, null], this;
                     (n.jquery || n.nodeType) && (n = e(n).css(o), o = t);
                     var d = this,
                         c = e.type(n),
                         p = this._rgba = [];
                     return o !== t && (n = [n, o, r, h], c = "array"), "string" === c ? this.parse(s(n) || a._default) : "array" === c ? (f(u.rgba.props, function(e, t) {
                         p[t.idx] = i(n[t.idx], t)
                     }), this) : "object" === c ? (n instanceof l ? f(u, function(e, t) {
                         n[t.cache] && (d[t.cache] = n[t.cache].slice())
                     }) : f(u, function(t, s) {
                         var a = s.cache;
                         f(s.props, function(e, t) {
                             if (!d[a] && s.to) {
                                 if ("alpha" === e || null == n[e]) return;
                                 d[a] = s.to(d._rgba)
                             }
                             d[a][t.idx] = i(n[e], t, !0)
                         }), d[a] && 0 > e.inArray(null, d[a].slice(0, 3)) && (d[a][3] = 1, s.from && (d._rgba = s.from(d[a])))
                     }), this) : t
                 },
                 is: function(e) {
                     var i = l(e),
                         s = !0,
                         n = this;
                     return f(u, function(e, a) {
                         var o, r = i[a.cache];
                         return r && (o = n[a.cache] || a.to && a.to(n._rgba) || [], f(a.props, function(e, i) {
                             return null != r[i.idx] ? s = r[i.idx] === o[i.idx] : t
                         })), s
                     }), s
                 },
                 _space: function() {
                     var e = [],
                         t = this;
                     return f(u, function(i, s) {
                         t[s.cache] && e.push(i)
                     }), e.pop()
                 },
                 transition: function(e, t) {
                     var s = l(e),
                         n = s._space(),
                         a = u[n],
                         o = 0 === this.alpha() ? l("transparent") : this,
                         r = o[a.cache] || a.to(o._rgba),
                         h = r.slice();
                     return s = s[a.cache], f(a.props, function(e, n) {
                         var a = n.idx,
                             o = r[a],
                             l = s[a],
                             u = d[n.type] || {};
                         null !== l && (null === o ? h[a] = l : (u.mod && (l - o > u.mod / 2 ? o += u.mod : o - l > u.mod / 2 && (o -= u.mod)), h[a] = i((l - o) * t + o, n)))
                     }), this[n](h)
                 },
                 blend: function(t) {
                     if (1 === this._rgba[3]) return this;
                     var i = this._rgba.slice(),
                         s = i.pop(),
                         n = l(t)._rgba;
                     return l(e.map(i, function(e, t) {
                         return (1 - s) * n[t] + s * e
                     }))
                 },
                 toRgbaString: function() {
                     var t = "rgba(",
                         i = e.map(this._rgba, function(e, t) {
                             return null == e ? t > 2 ? 1 : 0 : e
                         });
                     return 1 === i[3] && (i.pop(), t = "rgb("), t + i.join() + ")"
                 },
                 toHslaString: function() {
                     var t = "hsla(",
                         i = e.map(this.hsla(), function(e, t) {
                             return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                         });
                     return 1 === i[3] && (i.pop(), t = "hsl("), t + i.join() + ")"
                 },
                 toHexString: function(t) {
                     var i = this._rgba.slice(),
                         s = i.pop();
                     return t && i.push(~~(255 * s)), "#" + e.map(i, function(e) {
                         return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                     }).join("")
                 },
                 toString: function() {
                     return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                 }
             }), l.fn.parse.prototype = l.fn, u.hsla.to = function(e) {
                 if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                 var t, i, s = e[0] / 255,
                     n = e[1] / 255,
                     a = e[2] / 255,
                     o = e[3],
                     r = Math.max(s, n, a),
                     h = Math.min(s, n, a),
                     l = r - h,
                     u = r + h,
                     d = .5 * u;
                 return t = h === r ? 0 : s === r ? 60 * (n - a) / l + 360 : n === r ? 60 * (a - s) / l + 120 : 60 * (s - n) / l + 240, i = 0 === l ? 0 : .5 >= d ? l / u : l / (2 - u), [Math.round(t) % 360, i, d, null == o ? 1 : o]
             }, u.hsla.from = function(e) {
                 if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                 var t = e[0] / 360,
                     i = e[1],
                     s = e[2],
                     a = e[3],
                     o = .5 >= s ? s * (1 + i) : s + i - s * i,
                     r = 2 * s - o;
                 return [Math.round(255 * n(r, o, t + 1 / 3)), Math.round(255 * n(r, o, t)), Math.round(255 * n(r, o, t - 1 / 3)), a]
             }, f(u, function(s, n) {
                 var a = n.props,
                     o = n.cache,
                     h = n.to,
                     u = n.from;
                 l.fn[s] = function(s) {
                     if (h && !this[o] && (this[o] = h(this._rgba)), s === t) return this[o].slice();
                     var n, r = e.type(s),
                         d = "array" === r || "object" === r ? s : arguments,
                         c = this[o].slice();
                     return f(a, function(e, t) {
                         var s = d["object" === r ? e : t.idx];
                         null == s && (s = c[t.idx]), c[t.idx] = i(s, t)
                     }), u ? (n = l(u(c)), n[o] = c, n) : l(c)
                 }, f(a, function(t, i) {
                     l.fn[t] || (l.fn[t] = function(n) {
                         var a, o = e.type(n),
                             h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : s,
                             l = this[h](),
                             u = l[i.idx];
                         return "undefined" === o ? u : ("function" === o && (n = n.call(this, u), o = e.type(n)), null == n && i.empty ? this : ("string" === o && (a = r.exec(n), a && (n = u + parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))), l[i.idx] = n, this[h](l)))
                     })
                 })
             }), l.hook = function(t) {
                 var i = t.split(" ");
                 f(i, function(t, i) {
                     e.cssHooks[i] = {
                         set: function(t, n) {
                             var a, o, r = "";
                             if ("transparent" !== n && ("string" !== e.type(n) || (a = s(n)))) {
                                 if (n = l(a || n), !c.rgba && 1 !== n._rgba[3]) {
                                     for (o = "backgroundColor" === i ? t.parentNode : t;
                                         ("" === r || "transparent" === r) && o && o.style;) try {
                                         r = e.css(o, "backgroundColor"), o = o.parentNode
                                     }
                                     catch (h) {}
                                     n = n.blend(r && "transparent" !== r ? r : "_default")
                                 }
                                 n = n.toRgbaString()
                             }
                             try {
                                 t.style[i] = n
                             }
                             catch (h) {}
                         }
                     }, e.fx.step[i] = function(t) {
                         t.colorInit || (t.start = l(t.elem, i), t.end = l(t.end), t.colorInit = !0), e.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos))
                     }
                 })
             }, l.hook(o), e.cssHooks.borderColor = {
                 expand: function(e) {
                     var t = {};
                     return f(["Top", "Right", "Bottom", "Left"], function(i, s) {
                         t["border" + s + "Color"] = e
                     }), t
                 }
             }, a = e.Color.names = {
                 aqua: "#00ffff",
                 black: "#000000",
                 blue: "#0000ff",
                 fuchsia: "#ff00ff",
                 gray: "#808080",
                 green: "#008000",
                 lime: "#00ff00",
                 maroon: "#800000",
                 navy: "#000080",
                 olive: "#808000",
                 purple: "#800080",
                 red: "#ff0000",
                 silver: "#c0c0c0",
                 teal: "#008080",
                 white: "#ffffff",
                 yellow: "#ffff00",
                 transparent: [null, null, null, 0],
                 _default: "#ffffff"
             }
         }(b),
         function() {
             function t(t) {
                 var i, s, n = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
                     a = {};
                 if (n && n.length && n[0] && n[n[0]])
                     for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (a[e.camelCase(i)] = n[i]);
                 else
                     for (i in n) "string" == typeof n[i] && (a[i] = n[i]);
                 return a
             }

             function i(t, i) {
                 var s, a, o = {};
                 for (s in i) a = i[s], t[s] !== a && (n[s] || (e.fx.step[s] || !isNaN(parseFloat(a))) && (o[s] = a));
                 return o
             }
             var s = ["add", "remove", "toggle"],
                 n = {
                     border: 1,
                     borderBottom: 1,
                     borderColor: 1,
                     borderLeft: 1,
                     borderRight: 1,
                     borderTop: 1,
                     borderWidth: 1,
                     margin: 1,
                     padding: 1
                 };
             e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                 e.fx.step[i] = function(e) {
                     ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (b.style(e.elem, i, e.end), e.setAttr = !0)
                 }
             }), e.fn.addBack || (e.fn.addBack = function(e) {
                 return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
             }), e.effects.animateClass = function(n, a, o, r) {
                 var h = e.speed(a, o, r);
                 return this.queue(function() {
                     var a, o = e(this),
                         r = o.attr("class") || "",
                         l = h.children ? o.find("*").addBack() : o;
                     l = l.map(function() {
                         var i = e(this);
                         return {
                             el: i,
                             start: t(this)
                         }
                     }), a = function() {
                         e.each(s, function(e, t) {
                             n[t] && o[t + "Class"](n[t])
                         })
                     }, a(), l = l.map(function() {
                         return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
                     }), o.attr("class", r), l = l.map(function() {
                         var t = this,
                             i = e.Deferred(),
                             s = e.extend({}, h, {
                                 queue: !1,
                                 complete: function() {
                                     i.resolve(t)
                                 }
                             });
                         return this.el.animate(this.diff, s), i.promise()
                     }), e.when.apply(e, l.get()).done(function() {
                         a(), e.each(arguments, function() {
                             var t = this.el;
                             e.each(this.diff, function(e) {
                                 t.css(e, "")
                             })
                         }), h.complete.call(o[0])
                     })
                 })
             }, e.fn.extend({
                 addClass: function(t) {
                     return function(i, s, n, a) {
                         return s ? e.effects.animateClass.call(this, {
                             add: i
                         }, s, n, a) : t.apply(this, arguments)
                     }
                 }(e.fn.addClass),
                 removeClass: function(t) {
                     return function(i, s, n, a) {
                         return arguments.length > 1 ? e.effects.animateClass.call(this, {
                             remove: i
                         }, s, n, a) : t.apply(this, arguments)
                     }
                 }(e.fn.removeClass),
                 toggleClass: function(t) {
                     return function(i, s, n, a, o) {
                         return "boolean" == typeof s || void 0 === s ? n ? e.effects.animateClass.call(this, s ? {
                             add: i
                         } : {
                             remove: i
                         }, n, a, o) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
                             toggle: i
                         }, s, n, a)
                     }
                 }(e.fn.toggleClass),
                 switchClass: function(t, i, s, n, a) {
                     return e.effects.animateClass.call(this, {
                         add: i,
                         remove: t
                     }, s, n, a)
                 }
             })
         }(),
         function() {
             function t(t, i, s, n) {
                 return e.isPlainObject(t) && (i = t, t = t.effect), t = {
                     effect: t
                 }, null == i && (i = {}), e.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (n = s, s = i, i = {}), e.isFunction(s) && (n = s, s = null), i && e.extend(t, i), s = s || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof s ? s : s in e.fx.speeds ? e.fx.speeds[s] : e.fx.speeds._default, t.complete = n || i.complete, t
             }

             function i(t) {
                 return !t || "number" == typeof t || e.fx.speeds[t] ? !0 : "string" != typeof t || e.effects.effect[t] ? e.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
             }
             e.extend(e.effects, {
                 version: "1.11.4",
                 save: function(e, t) {
                     for (var i = 0; t.length > i; i++) null !== t[i] && e.data(y + t[i], e[0].style[t[i]])
                 },
                 restore: function(e, t) {
                     var i, s;
                     for (s = 0; t.length > s; s++) null !== t[s] && (i = e.data(y + t[s]), void 0 === i && (i = ""), e.css(t[s], i))
                 },
                 setMode: function(e, t) {
                     return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                 },
                 getBaseline: function(e, t) {
                     var i, s;
                     switch (e[0]) {
                         case "top":
                             i = 0;
                             break;
                         case "middle":
                             i = .5;
                             break;
                         case "bottom":
                             i = 1;
                             break;
                         default:
                             i = e[0] / t.height
                     }
                     switch (e[1]) {
                         case "left":
                             s = 0;
                             break;
                         case "center":
                             s = .5;
                             break;
                         case "right":
                             s = 1;
                             break;
                         default:
                             s = e[1] / t.width
                     }
                     return {
                         x: s,
                         y: i
                     }
                 },
                 createWrapper: function(t) {
                     if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                     var i = {
                             width: t.outerWidth(!0),
                             height: t.outerHeight(!0),
                             "float": t.css("float")
                         },
                         s = e("<div></div>").addClass("ui-effects-wrapper").css({
                             fontSize: "100%",
                             background: "transparent",
                             border: "none",
                             margin: 0,
                             padding: 0
                         }),
                         n = {
                             width: t.width(),
                             height: t.height()
                         },
                         a = document.activeElement;
                     try {
                         a.id
                     }
                     catch (o) {
                         a = document.body
                     }
                     return t.wrap(s), (t[0] === a || e.contains(t[0], a)) && e(a).focus(), s = t.parent(), "static" === t.css("position") ? (s.css({
                         position: "relative"
                     }), t.css({
                         position: "relative"
                     })) : (e.extend(i, {
                         position: t.css("position"),
                         zIndex: t.css("z-index")
                     }), e.each(["top", "left", "bottom", "right"], function(e, s) {
                         i[s] = t.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                     }), t.css({
                         position: "relative",
                         top: 0,
                         left: 0,
                         right: "auto",
                         bottom: "auto"
                     })), t.css(n), s.css(i).show()
                 },
                 removeWrapper: function(t) {
                     var i = document.activeElement;
                     return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
                 },
                 setTransition: function(t, i, s, n) {
                     return n = n || {}, e.each(i, function(e, i) {
                         var a = t.cssUnit(i);
                         a[0] > 0 && (n[i] = a[0] * s + a[1])
                     }), n
                 }
             }), e.fn.extend({
                 effect: function() {
                     function i(t) {
                         function i() {
                             e.isFunction(a) && a.call(n[0]), e.isFunction(t) && t()
                         }
                         var n = e(this),
                             a = s.complete,
                             r = s.mode;
                         (n.is(":hidden") ? "hide" === r : "show" === r) ? (n[r](), i()) : o.call(n[0], s, i)
                     }
                     var s = t.apply(this, arguments),
                         n = s.mode,
                         a = s.queue,
                         o = e.effects.effect[s.effect];
                     return e.fx.off || !o ? n ? this[n](s.duration, s.complete) : this.each(function() {
                         s.complete && s.complete.call(this)
                     }) : a === !1 ? this.each(i) : this.queue(a || "fx", i)
                 },
                 show: function(e) {
                     return function(s) {
                         if (i(s)) return e.apply(this, arguments);
                         var n = t.apply(this, arguments);
                         return n.mode = "show", this.effect.call(this, n)
                     }
                 }(e.fn.show),
                 hide: function(e) {
                     return function(s) {
                         if (i(s)) return e.apply(this, arguments);
                         var n = t.apply(this, arguments);
                         return n.mode = "hide", this.effect.call(this, n)
                     }
                 }(e.fn.hide),
                 toggle: function(e) {
                     return function(s) {
                         if (i(s) || "boolean" == typeof s) return e.apply(this, arguments);
                         var n = t.apply(this, arguments);
                         return n.mode = "toggle", this.effect.call(this, n)
                     }
                 }(e.fn.toggle),
                 cssUnit: function(t) {
                     var i = this.css(t),
                         s = [];
                     return e.each(["em", "px", "%", "pt"], function(e, t) {
                         i.indexOf(t) > 0 && (s = [parseFloat(i), t])
                     }), s
                 }
             })
         }(),
         function() {
             var t = {};
             e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
                 t[i] = function(t) {
                     return Math.pow(t, e + 2)
                 }
             }), e.extend(t, {
                 Sine: function(e) {
                     return 1 - Math.cos(e * Math.PI / 2)
                 },
                 Circ: function(e) {
                     return 1 - Math.sqrt(1 - e * e)
                 },
                 Elastic: function(e) {
                     return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                 },
                 Back: function(e) {
                     return e * e * (3 * e - 2)
                 },
                 Bounce: function(e) {
                     for (var t, i = 4;
                         ((t = Math.pow(2, --i)) - 1) / 11 > e;);
                     return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                 }
             }), e.each(t, function(t, i) {
                 e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) {
                     return 1 - i(1 - e)
                 }, e.easing["easeInOut" + t] = function(e) {
                     return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
                 }
             })
         }(), e.effects, e.effects.effect.blind = function(t, i) {
             var s, n, a, o = e(this),
                 r = /up|down|vertical/,
                 h = /up|left|vertical|horizontal/,
                 l = ["position", "top", "bottom", "left", "right", "height", "width"],
                 u = e.effects.setMode(o, t.mode || "hide"),
                 d = t.direction || "up",
                 c = r.test(d),
                 p = c ? "height" : "width",
                 f = c ? "top" : "left",
                 m = h.test(d),
                 g = {},
                 v = "show" === u;
             o.parent().is(".ui-effects-wrapper") ? e.effects.save(o.parent(), l) : e.effects.save(o, l), o.show(), s = e.effects.createWrapper(o).css({
                 overflow: "hidden"
             }), n = s[p](), a = parseFloat(s.css(f)) || 0, g[p] = v ? n : 0, m || (o.css(c ? "bottom" : "right", 0).css(c ? "top" : "left", "auto").css({
                 position: "absolute"
             }), g[f] = v ? a : n + a), v && (s.css(p, 0), m || s.css(f, a + n)), s.animate(g, {
                 duration: t.duration,
                 easing: t.easing,
                 queue: !1,
                 complete: function() {
                     "hide" === u && o.hide(), e.effects.restore(o, l), e.effects.removeWrapper(o), i()
                 }
             })
         }, e.effects.effect.bounce = function(t, i) {
             var s, n, a, o = e(this),
                 r = ["position", "top", "bottom", "left", "right", "height", "width"],
                 h = e.effects.setMode(o, t.mode || "effect"),
                 l = "hide" === h,
                 u = "show" === h,
                 d = t.direction || "up",
                 c = t.distance,
                 p = t.times || 5,
                 f = 2 * p + (u || l ? 1 : 0),
                 m = t.duration / f,
                 g = t.easing,
                 v = "up" === d || "down" === d ? "top" : "left",
                 y = "up" === d || "left" === d,
                 b = o.queue(),
                 _ = b.length;
             for ((u || l) && r.push("opacity"), e.effects.save(o, r), o.show(), e.effects.createWrapper(o), c || (c = o["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (a = {
                     opacity: 1
                 }, a[v] = 0, o.css("opacity", 0).css(v, y ? 2 * -c : 2 * c).animate(a, m, g)), l && (c /= Math.pow(2, p - 1)), a = {}, a[v] = 0, s = 0; p > s; s++) n = {}, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g).animate(a, m, g), c = l ? 2 * c : c / 2;
             l && (n = {
                 opacity: 0
             }, n[v] = (y ? "-=" : "+=") + c, o.animate(n, m, g)), o.queue(function() {
                 l && o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
             }), _ > 1 && b.splice.apply(b, [1, 0].concat(b.splice(_, f + 1))), o.dequeue()
         }, e.effects.effect.clip = function(t, i) {
             var s, n, a, o = e(this),
                 r = ["position", "top", "bottom", "left", "right", "height", "width"],
                 h = e.effects.setMode(o, t.mode || "hide"),
                 l = "show" === h,
                 u = t.direction || "vertical",
                 d = "vertical" === u,
                 c = d ? "height" : "width",
                 p = d ? "top" : "left",
                 f = {};
             e.effects.save(o, r), o.show(), s = e.effects.createWrapper(o).css({
                 overflow: "hidden"
             }), n = "IMG" === o[0].tagName ? s : o, a = n[c](), l && (n.css(c, 0), n.css(p, a / 2)), f[c] = l ? a : 0, f[p] = l ? 0 : a / 2, n.animate(f, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: function() {
                     l || o.hide(), e.effects.restore(o, r), e.effects.removeWrapper(o), i()
                 }
             })
         }, e.effects.effect.drop = function(t, i) {
             var s, n = e(this),
                 a = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                 o = e.effects.setMode(n, t.mode || "hide"),
                 r = "show" === o,
                 h = t.direction || "left",
                 l = "up" === h || "down" === h ? "top" : "left",
                 u = "up" === h || "left" === h ? "pos" : "neg",
                 d = {
                     opacity: r ? 1 : 0
                 };
             e.effects.save(n, a), n.show(), e.effects.createWrapper(n), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, r && n.css("opacity", 0).css(l, "pos" === u ? -s : s), d[l] = (r ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + s, n.animate(d, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: function() {
                     "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
                 }
             })
         }, e.effects.effect.explode = function(t, i) {
             function s() {
                 b.push(this), b.length === d * c && n()
             }

             function n() {
                 p.css({
                     visibility: "visible"
                 }), e(b).remove(), m || p.hide(), i()
             }
             var a, o, r, h, l, u, d = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
                 c = d,
                 p = e(this),
                 f = e.effects.setMode(p, t.mode || "hide"),
                 m = "show" === f,
                 g = p.show().css("visibility", "hidden").offset(),
                 v = Math.ceil(p.outerWidth() / c),
                 y = Math.ceil(p.outerHeight() / d),
                 b = [];
             for (a = 0; d > a; a++)
                 for (h = g.top + a * y, u = a - (d - 1) / 2, o = 0; c > o; o++) r = g.left + o * v, l = o - (c - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                     position: "absolute",
                     visibility: "visible",
                     left: -o * v,
                     top: -a * y
                 }).parent().addClass("ui-effects-explode").css({
                     position: "absolute",
                     overflow: "hidden",
                     width: v,
                     height: y,
                     left: r + (m ? l * v : 0),
                     top: h + (m ? u * y : 0),
                     opacity: m ? 0 : 1
                 }).animate({
                     left: r + (m ? 0 : l * v),
                     top: h + (m ? 0 : u * y),
                     opacity: m ? 1 : 0
                 }, t.duration || 500, t.easing, s)
         }, e.effects.effect.fade = function(t, i) {
             var s = e(this),
                 n = e.effects.setMode(s, t.mode || "toggle");
             s.animate({
                 opacity: n
             }, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: i
             })
         }, e.effects.effect.fold = function(t, i) {
             var s, n, a = e(this),
                 o = ["position", "top", "bottom", "left", "right", "height", "width"],
                 r = e.effects.setMode(a, t.mode || "hide"),
                 h = "show" === r,
                 l = "hide" === r,
                 u = t.size || 15,
                 d = /([0-9]+)%/.exec(u),
                 c = !!t.horizFirst,
                 p = h !== c,
                 f = p ? ["width", "height"] : ["height", "width"],
                 m = t.duration / 2,
                 g = {},
                 v = {};
             e.effects.save(a, o), a.show(), s = e.effects.createWrapper(a).css({
                 overflow: "hidden"
             }), n = p ? [s.width(), s.height()] : [s.height(), s.width()], d && (u = parseInt(d[1], 10) / 100 * n[l ? 0 : 1]), h && s.css(c ? {
                 height: 0,
                 width: u
             } : {
                 height: u,
                 width: 0
             }), g[f[0]] = h ? n[0] : u, v[f[1]] = h ? n[1] : 0, s.animate(g, m, t.easing).animate(v, m, t.easing, function() {
                 l && a.hide(), e.effects.restore(a, o), e.effects.removeWrapper(a), i()
             })
         }, e.effects.effect.highlight = function(t, i) {
             var s = e(this),
                 n = ["backgroundImage", "backgroundColor", "opacity"],
                 a = e.effects.setMode(s, t.mode || "show"),
                 o = {
                     backgroundColor: s.css("backgroundColor")
                 };
             "hide" === a && (o.opacity = 0), e.effects.save(s, n), s.show().css({
                 backgroundImage: "none",
                 backgroundColor: t.color || "#ffff99"
             }).animate(o, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: function() {
                     "hide" === a && s.hide(), e.effects.restore(s, n), i()
                 }
             })
         }, e.effects.effect.size = function(t, i) {
             var s, n, a, o = e(this),
                 r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                 h = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                 l = ["width", "height", "overflow"],
                 u = ["fontSize"],
                 d = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                 c = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                 p = e.effects.setMode(o, t.mode || "effect"),
                 f = t.restore || "effect" !== p,
                 m = t.scale || "both",
                 g = t.origin || ["middle", "center"],
                 v = o.css("position"),
                 y = f ? r : h,
                 b = {
                     height: 0,
                     width: 0,
                     outerHeight: 0,
                     outerWidth: 0
                 };
             "show" === p && o.show(), s = {
                 height: o.height(),
                 width: o.width(),
                 outerHeight: o.outerHeight(),
                 outerWidth: o.outerWidth()
             }, "toggle" === t.mode && "show" === p ? (o.from = t.to || b, o.to = t.from || s) : (o.from = t.from || ("show" === p ? b : s), o.to = t.to || ("hide" === p ? b : s)), a = {
                 from: {
                     y: o.from.height / s.height,
                     x: o.from.width / s.width
                 },
                 to: {
                     y: o.to.height / s.height,
                     x: o.to.width / s.width
                 }
             }, ("box" === m || "both" === m) && (a.from.y !== a.to.y && (y = y.concat(d), o.from = e.effects.setTransition(o, d, a.from.y, o.from), o.to = e.effects.setTransition(o, d, a.to.y, o.to)), a.from.x !== a.to.x && (y = y.concat(c), o.from = e.effects.setTransition(o, c, a.from.x, o.from), o.to = e.effects.setTransition(o, c, a.to.x, o.to))), ("content" === m || "both" === m) && a.from.y !== a.to.y && (y = y.concat(u).concat(l), o.from = e.effects.setTransition(o, u, a.from.y, o.from), o.to = e.effects.setTransition(o, u, a.to.y, o.to)), e.effects.save(o, y), o.show(), e.effects.createWrapper(o), o.css("overflow", "hidden").css(o.from), g && (n = e.effects.getBaseline(g, s), o.from.top = (s.outerHeight - o.outerHeight()) * n.y, o.from.left = (s.outerWidth - o.outerWidth()) * n.x, o.to.top = (s.outerHeight - o.to.outerHeight) * n.y, o.to.left = (s.outerWidth - o.to.outerWidth) * n.x), o.css(o.from), ("content" === m || "both" === m) && (d = d.concat(["marginTop", "marginBottom"]).concat(u), c = c.concat(["marginLeft", "marginRight"]), l = r.concat(d).concat(c), o.find("*[width]").each(function() {
                 var i = e(this),
                     s = {
                         height: i.height(),
                         width: i.width(),
                         outerHeight: i.outerHeight(),
                         outerWidth: i.outerWidth()
                     };
                 f && e.effects.save(i, l), i.from = {
                     height: s.height * a.from.y,
                     width: s.width * a.from.x,
                     outerHeight: s.outerHeight * a.from.y,
                     outerWidth: s.outerWidth * a.from.x
                 }, i.to = {
                     height: s.height * a.to.y,
                     width: s.width * a.to.x,
                     outerHeight: s.height * a.to.y,
                     outerWidth: s.width * a.to.x
                 }, a.from.y !== a.to.y && (i.from = e.effects.setTransition(i, d, a.from.y, i.from), i.to = e.effects.setTransition(i, d, a.to.y, i.to)), a.from.x !== a.to.x && (i.from = e.effects.setTransition(i, c, a.from.x, i.from), i.to = e.effects.setTransition(i, c, a.to.x, i.to)), i.css(i.from), i.animate(i.to, t.duration, t.easing, function() {
                     f && e.effects.restore(i, l)
                 })
             })), o.animate(o.to, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: function() {
                     0 === o.to.opacity && o.css("opacity", o.from.opacity), "hide" === p && o.hide(), e.effects.restore(o, y), f || ("static" === v ? o.css({
                         position: "relative",
                         top: o.to.top,
                         left: o.to.left
                     }) : e.each(["top", "left"], function(e, t) {
                         o.css(t, function(t, i) {
                             var s = parseInt(i, 10),
                                 n = e ? o.to.left : o.to.top;
                             return "auto" === i ? n + "px" : s + n + "px"
                         })
                     })), e.effects.removeWrapper(o), i()
                 }
             })
         }, e.effects.effect.scale = function(t, i) {
             var s = e(this),
                 n = e.extend(!0, {}, t),
                 a = e.effects.setMode(s, t.mode || "effect"),
                 o = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "hide" === a ? 0 : 100),
                 r = t.direction || "both",
                 h = t.origin,
                 l = {
                     height: s.height(),
                     width: s.width(),
                     outerHeight: s.outerHeight(),
                     outerWidth: s.outerWidth()
                 },
                 u = {
                     y: "horizontal" !== r ? o / 100 : 1,
                     x: "vertical" !== r ? o / 100 : 1
                 };
             n.effect = "size", n.queue = !1, n.complete = i, "effect" !== a && (n.origin = h || ["middle", "center"], n.restore = !0), n.from = t.from || ("show" === a ? {
                 height: 0,
                 width: 0,
                 outerHeight: 0,
                 outerWidth: 0
             } : l), n.to = {
                 height: l.height * u.y,
                 width: l.width * u.x,
                 outerHeight: l.outerHeight * u.y,
                 outerWidth: l.outerWidth * u.x
             }, n.fade && ("show" === a && (n.from.opacity = 0, n.to.opacity = 1), "hide" === a && (n.from.opacity = 1, n.to.opacity = 0)), s.effect(n)
         }, e.effects.effect.puff = function(t, i) {
             var s = e(this),
                 n = e.effects.setMode(s, t.mode || "hide"),
                 a = "hide" === n,
                 o = parseInt(t.percent, 10) || 150,
                 r = o / 100,
                 h = {
                     height: s.height(),
                     width: s.width(),
                     outerHeight: s.outerHeight(),
                     outerWidth: s.outerWidth()
                 };
             e.extend(t, {
                 effect: "scale",
                 queue: !1,
                 fade: !0,
                 mode: n,
                 complete: i,
                 percent: a ? o : 100,
                 from: a ? h : {
                     height: h.height * r,
                     width: h.width * r,
                     outerHeight: h.outerHeight * r,
                     outerWidth: h.outerWidth * r
                 }
             }), s.effect(t)
         }, e.effects.effect.pulsate = function(t, i) {
             var s, n = e(this),
                 a = e.effects.setMode(n, t.mode || "show"),
                 o = "show" === a,
                 r = "hide" === a,
                 h = o || "hide" === a,
                 l = 2 * (t.times || 5) + (h ? 1 : 0),
                 u = t.duration / l,
                 d = 0,
                 c = n.queue(),
                 p = c.length;
             for ((o || !n.is(":visible")) && (n.css("opacity", 0).show(), d = 1), s = 1; l > s; s++) n.animate({
                 opacity: d
             }, u, t.easing), d = 1 - d;
             n.animate({
                 opacity: d
             }, u, t.easing), n.queue(function() {
                 r && n.hide(), i()
             }), p > 1 && c.splice.apply(c, [1, 0].concat(c.splice(p, l + 1))), n.dequeue()
         }, e.effects.effect.shake = function(t, i) {
             var s, n = e(this),
                 a = ["position", "top", "bottom", "left", "right", "height", "width"],
                 o = e.effects.setMode(n, t.mode || "effect"),
                 r = t.direction || "left",
                 h = t.distance || 20,
                 l = t.times || 3,
                 u = 2 * l + 1,
                 d = Math.round(t.duration / u),
                 c = "up" === r || "down" === r ? "top" : "left",
                 p = "up" === r || "left" === r,
                 f = {},
                 m = {},
                 g = {},
                 v = n.queue(),
                 y = v.length;
             for (e.effects.save(n, a), n.show(), e.effects.createWrapper(n), f[c] = (p ? "-=" : "+=") + h, m[c] = (p ? "+=" : "-=") + 2 * h, g[c] = (p ? "-=" : "+=") + 2 * h, n.animate(f, d, t.easing), s = 1; l > s; s++) n.animate(m, d, t.easing).animate(g, d, t.easing);
             n.animate(m, d, t.easing).animate(f, d / 2, t.easing).queue(function() {
                 "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
             }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), n.dequeue()
         }, e.effects.effect.slide = function(t, i) {
             var s, n = e(this),
                 a = ["position", "top", "bottom", "left", "right", "width", "height"],
                 o = e.effects.setMode(n, t.mode || "show"),
                 r = "show" === o,
                 h = t.direction || "left",
                 l = "up" === h || "down" === h ? "top" : "left",
                 u = "up" === h || "left" === h,
                 d = {};
             e.effects.save(n, a), n.show(), s = t.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(n).css({
                 overflow: "hidden"
             }), r && n.css(l, u ? isNaN(s) ? "-" + s : -s : s), d[l] = (r ? u ? "+=" : "-=" : u ? "-=" : "+=") + s, n.animate(d, {
                 queue: !1,
                 duration: t.duration,
                 easing: t.easing,
                 complete: function() {
                     "hide" === o && n.hide(), e.effects.restore(n, a), e.effects.removeWrapper(n), i()
                 }
             })
         }, e.effects.effect.transfer = function(t, i) {
             var s = e(this),
                 n = e(t.to),
                 a = "fixed" === n.css("position"),
                 o = e("body"),
                 r = a ? o.scrollTop() : 0,
                 h = a ? o.scrollLeft() : 0,
                 l = n.offset(),
                 u = {
                     top: l.top - r,
                     left: l.left - h,
                     height: n.innerHeight(),
                     width: n.innerWidth()
                 },
                 d = s.offset(),
                 c = e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(t.className).css({
                     top: d.top - r,
                     left: d.left - h,
                     height: s.innerHeight(),
                     width: s.innerWidth(),
                     position: a ? "fixed" : "absolute"
                 }).animate(u, t.duration, t.easing, function() {
                     c.remove(), i()
                 })
         }, e.widget("ui.progressbar", {
             version: "1.11.4",
             options: {
                 max: 100,
                 value: 0,
                 change: null,
                 complete: null
             },
             min: 0,
             _create: function() {
                 this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                     role: "progressbar",
                     "aria-valuemin": this.min
                 }), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
             },
             _destroy: function() {
                 this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
             },
             value: function(e) {
                 return void 0 === e ? this.options.value : (this.options.value = this._constrainedValue(e), this._refreshValue(), void 0)
             },
             _constrainedValue: function(e) {
                 return void 0 === e && (e = this.options.value), this.indeterminate = e === !1, "number" != typeof e && (e = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, e))
             },
             _setOptions: function(e) {
                 var t = e.value;
                 delete e.value, this._super(e), this.options.value = this._constrainedValue(t), this._refreshValue()
             },
             _setOption: function(e, t) {
                 "max" === e && (t = Math.max(this.min, t)), "disabled" === e && this.element.toggleClass("ui-state-disabled", !!t).attr("aria-disabled", t), this._super(e, t)
             },
             _percentage: function() {
                 return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
             },
             _refreshValue: function() {
                 var t = this.options.value,
                     i = this._percentage();
                 this.valueDiv.toggle(this.indeterminate || t > this.min).toggleClass("ui-corner-right", t === this.options.max).width(i.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                     "aria-valuemax": this.options.max,
                     "aria-valuenow": t
                 }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== t && (this.oldValue = t, this._trigger("change")), t === this.options.max && this._trigger("complete")
             }
         }), e.widget("ui.selectable", e.ui.mouse, {
             version: "1.11.4",
             options: {
                 appendTo: "body",
                 autoRefresh: !0,
                 distance: 0,
                 filter: "*",
                 tolerance: "touch",
                 selected: null,
                 selecting: null,
                 start: null,
                 stop: null,
                 unselected: null,
                 unselecting: null
             },
             _create: function() {
                 var t, i = this;
                 this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                     t = e(i.options.filter, i.element[0]), t.addClass("ui-selectee"), t.each(function() {
                         var t = e(this),
                             i = t.offset();
                         e.data(this, "selectable-item", {
                             element: this,
                             $element: t,
                             left: i.left,
                             top: i.top,
                             right: i.left + t.outerWidth(),
                             bottom: i.top + t.outerHeight(),
                             startselected: !1,
                             selected: t.hasClass("ui-selected"),
                             selecting: t.hasClass("ui-selecting"),
                             unselecting: t.hasClass("ui-unselecting")
                         })
                     })
                 }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
             },
             _destroy: function() {
                 this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
             },
             _mouseStart: function(t) {
                 var i = this,
                     s = this.options;
                 this.opos = [t.pageX, t.pageY], this.options.disabled || (this.selectees = e(s.filter, this.element[0]), this._trigger("start", t), e(s.appendTo).append(this.helper), this.helper.css({
                     left: t.pageX,
                     top: t.pageY,
                     width: 0,
                     height: 0
                 }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                     var s = e.data(this, "selectable-item");
                     s.startselected = !0, t.metaKey || t.ctrlKey || (s.$element.removeClass("ui-selected"), s.selected = !1, s.$element.addClass("ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", t, {
                         unselecting: s.element
                     }))
                 }), e(t.target).parents().addBack().each(function() {
                     var s, n = e.data(this, "selectable-item");
                     return n ? (s = !t.metaKey && !t.ctrlKey || !n.$element.hasClass("ui-selected"), n.$element.removeClass(s ? "ui-unselecting" : "ui-selected").addClass(s ? "ui-selecting" : "ui-unselecting"), n.unselecting = !s, n.selecting = s, n.selected = s, s ? i._trigger("selecting", t, {
                         selecting: n.element
                     }) : i._trigger("unselecting", t, {
                         unselecting: n.element
                     }), !1) : void 0
                 }))
             },
             _mouseDrag: function(t) {
                 if (this.dragged = !0, !this.options.disabled) {
                     var i, s = this,
                         n = this.options,
                         a = this.opos[0],
                         o = this.opos[1],
                         r = t.pageX,
                         h = t.pageY;
                     return a > r && (i = r, r = a, a = i), o > h && (i = h, h = o, o = i), this.helper.css({
                         left: a,
                         top: o,
                         width: r - a,
                         height: h - o
                     }), this.selectees.each(function() {
                         var i = e.data(this, "selectable-item"),
                             l = !1;
                         i && i.element !== s.element[0] && ("touch" === n.tolerance ? l = !(i.left > r || a > i.right || i.top > h || o > i.bottom) : "fit" === n.tolerance && (l = i.left > a && r > i.right && i.top > o && h > i.bottom), l ? (i.selected && (i.$element.removeClass("ui-selected"), i.selected = !1), i.unselecting && (i.$element.removeClass("ui-unselecting"), i.unselecting = !1), i.selecting || (i.$element.addClass("ui-selecting"), i.selecting = !0, s._trigger("selecting", t, {
                             selecting: i.element
                         }))) : (i.selecting && ((t.metaKey || t.ctrlKey) && i.startselected ? (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.$element.addClass("ui-selected"), i.selected = !0) : (i.$element.removeClass("ui-selecting"), i.selecting = !1, i.startselected && (i.$element.addClass("ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", t, {
                             unselecting: i.element
                         }))), i.selected && (t.metaKey || t.ctrlKey || i.startselected || (i.$element.removeClass("ui-selected"), i.selected = !1, i.$element.addClass("ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", t, {
                             unselecting: i.element
                         })))))
                     }), !1
                 }
             },
             _mouseStop: function(t) {
                 var i = this;
                 return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function() {
                     var s = e.data(this, "selectable-item");
                     s.$element.removeClass("ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", t, {
                         unselected: s.element
                     })
                 }), e(".ui-selecting", this.element[0]).each(function() {
                     var s = e.data(this, "selectable-item");
                     s.$element.removeClass("ui-selecting").addClass("ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", t, {
                         selected: s.element
                     })
                 }), this._trigger("stop", t), this.helper.remove(), !1
             }
         }), e.widget("ui.selectmenu", {
             version: "1.11.4",
             defaultElement: "<select>",
             options: {
                 appendTo: null,
                 disabled: null,
                 icons: {
                     button: "ui-icon-triangle-1-s"
                 },
                 position: {
                     my: "left top",
                     at: "left bottom",
                     collision: "none"
                 },
                 width: null,
                 change: null,
                 close: null,
                 focus: null,
                 open: null,
                 select: null
             },
             _create: function() {
                 var e = this.element.uniqueId().attr("id");
                 this.ids = {
                     element: e,
                     button: e + "-button",
                     menu: e + "-menu"
                 }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
             },
             _drawButton: function() {
                 var t = this;
                 this.label = e("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                     click: function(e) {
                         this.button.focus(), e.preventDefault()
                     }
                 }), this.element.hide(), this.button = e("<span>", {
                     "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                     tabindex: this.options.disabled ? -1 : 0,
                     id: this.ids.button,
                     role: "combobox",
                     "aria-expanded": "false",
                     "aria-autocomplete": "list",
                     "aria-owns": this.ids.menu,
                     "aria-haspopup": "true"
                 }).insertAfter(this.element), e("<span>", {
                     "class": "ui-icon " + this.options.icons.button
                 }).prependTo(this.button), this.buttonText = e("<span>", {
                     "class": "ui-selectmenu-text"
                 }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function() {
                     t.menuItems || t._refreshMenu()
                 }), this._hoverable(this.button), this._focusable(this.button)
             },
             _drawMenu: function() {
                 var t = this;
                 this.menu = e("<ul>", {
                     "aria-hidden": "true",
                     "aria-labelledby": this.ids.button,
                     id: this.ids.menu
                 }), this.menuWrap = e("<div>", {
                     "class": "ui-selectmenu-menu ui-front"
                 }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                     role: "listbox",
                     select: function(e, i) {
                         e.preventDefault(), t._setSelection(), t._select(i.item.data("ui-selectmenu-item"), e)
                     },
                     focus: function(e, i) {
                         var s = i.item.data("ui-selectmenu-item");
                         null != t.focusIndex && s.index !== t.focusIndex && (t._trigger("focus", e, {
                             item: s
                         }), t.isOpen || t._select(s, e)), t.focusIndex = s.index, t.button.attr("aria-activedescendant", t.menuItems.eq(s.index).attr("id"))
                     }
                 }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function() {
                     return !1
                 }, this.menuInstance._isDivider = function() {
                     return !1
                 }
             },
             refresh: function() {
                 this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
             },
             _refreshMenu: function() {
                 this.menu.empty();
                 var e, t = this.element.find("option");
                 t.length && (this._parseOptions(t), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), e = this._getSelectedItem(), this.menuInstance.focus(null, e), this._setAria(e.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
             },
             open: function(e) {
                 this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", e))
             },
             _position: function() {
                 this.menuWrap.position(e.extend({
                     of: this.button
                 }, this.options.position))
             },
             close: function(e) {
                 this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", e))
             },
             widget: function() {
                 return this.button
             },
             menuWidget: function() {
                 return this.menu
             },
             _renderMenu: function(t, i) {
                 var s = this,
                     n = "";
                 e.each(i, function(i, a) {
                     a.optgroup !== n && (e("<li>", {
                         "class": "ui-selectmenu-optgroup ui-menu-divider" + (a.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                         text: a.optgroup
                     }).appendTo(t), n = a.optgroup), s._renderItemData(t, a)
                 })
             },
             _renderItemData: function(e, t) {
                 return this._renderItem(e, t).data("ui-selectmenu-item", t)
             },
             _renderItem: function(t, i) {
                 var s = e("<li>");
                 return i.disabled && s.addClass("ui-state-disabled"), this._setText(s, i.label), s.appendTo(t)
             },
             _setText: function(e, t) {
                 t ? e.text(t) : e.html("&#160;")
             },
             _move: function(e, t) {
                 var i, s, n = ".ui-menu-item";
                 this.isOpen ? i = this.menuItems.eq(this.focusIndex) : (i = this.menuItems.eq(this.element[0].selectedIndex), n += ":not(.ui-state-disabled)"), s = "first" === e || "last" === e ? i["first" === e ? "prevAll" : "nextAll"](n).eq(-1) : i[e + "All"](n).eq(0), s.length && this.menuInstance.focus(t, s)
             },
             _getSelectedItem: function() {
                 return this.menuItems.eq(this.element[0].selectedIndex)
             },
             _toggle: function(e) {
                 this[this.isOpen ? "close" : "open"](e)
             },
             _setSelection: function() {
                 var e;
                 this.range && (window.getSelection ? (e = window.getSelection(), e.removeAllRanges(), e.addRange(this.range)) : this.range.select(), this.button.focus())
             },
             _documentClick: {
                 mousedown: function(t) {
                     this.isOpen && (e(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(t))
                 }
             },
             _buttonEvents: {
                 mousedown: function() {
                     var e;
                     window.getSelection ? (e = window.getSelection(), e.rangeCount && (this.range = e.getRangeAt(0))) : this.range = document.selection.createRange()
                 },
                 click: function(e) {
                     this._setSelection(), this._toggle(e)
                 },
                 keydown: function(t) {
                     var i = !0;
                     switch (t.keyCode) {
                         case e.ui.keyCode.TAB:
                         case e.ui.keyCode.ESCAPE:
                             this.close(t), i = !1;
                             break;
                         case e.ui.keyCode.ENTER:
                             this.isOpen && this._selectFocusedItem(t);
                             break;
                         case e.ui.keyCode.UP:
                             t.altKey ? this._toggle(t) : this._move("prev", t);
                             break;
                         case e.ui.keyCode.DOWN:
                             t.altKey ? this._toggle(t) : this._move("next", t);
                             break;
                         case e.ui.keyCode.SPACE:
                             this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                             break;
                         case e.ui.keyCode.LEFT:
                             this._move("prev", t);
                             break;
                         case e.ui.keyCode.RIGHT:
                             this._move("next", t);
                             break;
                         case e.ui.keyCode.HOME:
                         case e.ui.keyCode.PAGE_UP:
                             this._move("first", t);
                             break;
                         case e.ui.keyCode.END:
                         case e.ui.keyCode.PAGE_DOWN:
                             this._move("last", t);
                             break;
                         default:
                             this.menu.trigger(t), i = !1
                     }
                     i && t.preventDefault()
                 }
             },
             _selectFocusedItem: function(e) {
                 var t = this.menuItems.eq(this.focusIndex);
                 t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), e)
             },
             _select: function(e, t) {
                 var i = this.element[0].selectedIndex;
                 this.element[0].selectedIndex = e.index, this._setText(this.buttonText, e.label), this._setAria(e), this._trigger("select", t, {
                     item: e
                 }), e.index !== i && this._trigger("change", t, {
                     item: e
                 }), this.close(t)
             },
             _setAria: function(e) {
                 var t = this.menuItems.eq(e.index).attr("id");
                 this.button.attr({
                     "aria-labelledby": t,
                     "aria-activedescendant": t
                 }), this.menu.attr("aria-activedescendant", t)
             },
             _setOption: function(e, t) {
                 "icons" === e && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(t.button), this._super(e, t), "appendTo" === e && this.menuWrap.appendTo(this._appendTo()), "disabled" === e && (this.menuInstance.option("disabled", t), this.button.toggleClass("ui-state-disabled", t).attr("aria-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === e && this._resizeButton()
             },
             _appendTo: function() {
                 var t = this.options.appendTo;
                 return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
             },
             _toggleAttr: function() {
                 this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
             },
             _resizeButton: function() {
                 var e = this.options.width;
                 e || (e = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(e)
             },
             _resizeMenu: function() {
                 this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
             },
             _getCreateOptions: function() {
                 return {
                     disabled: this.element.prop("disabled")
                 }
             },
             _parseOptions: function(t) {
                 var i = [];
                 t.each(function(t, s) {
                     var n = e(s),
                         a = n.parent("optgroup");
                     i.push({
                         element: n,
                         index: t,
                         value: n.val(),
                         label: n.text(),
                         optgroup: a.attr("label") || "",
                         disabled: a.prop("disabled") || n.prop("disabled")
                     })
                 }), this.items = i
             },
             _destroy: function() {
                 this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
             }
         }), e.widget("ui.slider", e.ui.mouse, {
             version: "1.11.4",
             widgetEventPrefix: "slide",
             options: {
                 animate: !1,
                 distance: 0,
                 max: 100,
                 min: 0,
                 orientation: "horizontal",
                 range: !1,
                 step: 1,
                 value: 0,
                 values: null,
                 change: null,
                 slide: null,
                 start: null,
                 stop: null
             },
             numPages: 5,
             _create: function() {
                 this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
             },
             _refresh: function() {
                 this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
             },
             _createHandles: function() {
                 var t, i, s = this.options,
                     n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                     a = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                     o = [];
                 for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), t = n.length; i > t; t++) o.push(a);
                 this.handles = n.add(e(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(t) {
                     e(this).data("ui-slider-handle-index", t)
                 })
             },
             _createRange: function() {
                 var t = this.options,
                     i = "";
                 t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : e.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                     left: "",
                     bottom: ""
                 }) : (this.range = e("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === t.range || "max" === t.range ? " ui-slider-range-" + t.range : ""))) : (this.range && this.range.remove(), this.range = null)
             },
             _setupEvents: function() {
                 this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
             },
             _destroy: function() {
                 this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
             },
             _mouseCapture: function(t) {
                 var i, s, n, a, o, r, h, l, u = this,
                     d = this.options;
                 return d.disabled ? !1 : (this.elementSize = {
                     width: this.element.outerWidth(),
                     height: this.element.outerHeight()
                 }, this.elementOffset = this.element.offset(), i = {
                     x: t.pageX,
                     y: t.pageY
                 }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
                     var i = Math.abs(s - u.values(t));
                     (n > i || n === i && (t === u._lastChangedValue || u.values(t) === d.min)) && (n = i, a = e(this), o = t)
                 }), r = this._start(t, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), h = a.offset(), l = !e(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = l ? {
                     left: 0,
                     top: 0
                 } : {
                     left: t.pageX - h.left - a.width() / 2,
                     top: t.pageY - h.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0)
                 }, this.handles.hasClass("ui-state-hover") || this._slide(t, o, s), this._animateOff = !0, !0))
             },
             _mouseStart: function() {
                 return !0
             },
             _mouseDrag: function(e) {
                 var t = {
                         x: e.pageX,
                         y: e.pageY
                     },
                     i = this._normValueFromMouse(t);
                 return this._slide(e, this._handleIndex, i), !1
             },
             _mouseStop: function(e) {
                 return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
             },
             _detectOrientation: function() {
                 this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
             },
             _normValueFromMouse: function(e) {
                 var t, i, s, n, a;
                 return "horizontal" === this.orientation ? (t = this.elementSize.width, i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / t, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a)
             },
             _start: function(e, t) {
                 var i = {
                     handle: this.handles[t],
                     value: this.value()
                 };
                 return this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("start", e, i)
             },
             _slide: function(e, t, i) {
                 var s, n, a;
                 this.options.values && this.options.values.length ? (s = this.values(t ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === t && i > s || 1 === t && s > i) && (i = s), i !== this.values(t) && (n = this.values(), n[t] = i, a = this._trigger("slide", e, {
                     handle: this.handles[t],
                     value: i,
                     values: n
                 }), s = this.values(t ? 0 : 1), a !== !1 && this.values(t, i))) : i !== this.value() && (a = this._trigger("slide", e, {
                     handle: this.handles[t],
                     value: i
                 }), a !== !1 && this.value(i))
             },
             _stop: function(e, t) {
                 var i = {
                     handle: this.handles[t],
                     value: this.value()
                 };
                 this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._trigger("stop", e, i)
             },
             _change: function(e, t) {
                 if (!this._keySliding && !this._mouseSliding) {
                     var i = {
                         handle: this.handles[t],
                         value: this.value()
                     };
                     this.options.values && this.options.values.length && (i.value = this.values(t), i.values = this.values()), this._lastChangedValue = t, this._trigger("change", e, i)
                 }
             },
             value: function(e) {
                 return arguments.length ? (this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0), void 0) : this._value()
             },
             values: function(t, i) {
                 var s, n, a;
                 if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
                 if (!arguments.length) return this._values();
                 if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                 for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);
                 this._refreshValue()
             },
             _setOption: function(t, i) {
                 var s, n = 0;
                 switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (n = this.options.values.length), "disabled" === t && this.element.toggleClass("ui-state-disabled", !!i), this._super(t, i), t) {
                     case "orientation":
                         this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                         break;
                     case "value":
                         this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                         break;
                     case "values":
                         for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                         this._animateOff = !1;
                         break;
                     case "step":
                     case "min":
                     case "max":
                         this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                         break;
                     case "range":
                         this._animateOff = !0, this._refresh(), this._animateOff = !1
                 }
             },
             _value: function() {
                 var e = this.options.value;
                 return e = this._trimAlignValue(e)
             },
             _values: function(e) {
                 var t, i, s;
                 if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t);
                 if (this.options.values && this.options.values.length) {
                     for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                     return i
                 }
                 return []
             },
             _trimAlignValue: function(e) {
                 if (this._valueMin() >= e) return this._valueMin();
                 if (e >= this._valueMax()) return this._valueMax();
                 var t = this.options.step > 0 ? this.options.step : 1,
                     i = (e - this._valueMin()) % t,
                     s = e - i;
                 return 2 * Math.abs(i) >= t && (s += i > 0 ? t : -t), parseFloat(s.toFixed(5))
             },
             _calculateNewMax: function() {
                 var e = this.options.max,
                     t = this._valueMin(),
                     i = this.options.step,
                     s = Math.floor(+(e - t).toFixed(this._precision()) / i) * i;
                 e = s + t, this.max = parseFloat(e.toFixed(this._precision()))
             },
             _precision: function() {
                 var e = this._precisionOf(this.options.step);
                 return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e
             },
             _precisionOf: function(e) {
                 var t = "" + e,
                     i = t.indexOf(".");
                 return -1 === i ? 0 : t.length - i - 1
             },
             _valueMin: function() {
                 return this.options.min
             },
             _valueMax: function() {
                 return this.max
             },
             _refreshValue: function() {
                 var t, i, s, n, a, o = this.options.range,
                     r = this.options,
                     h = this,
                     l = this._animateOff ? !1 : r.animate,
                     u = {};
                 this.options.values && this.options.values.length ? this.handles.each(function(s) {
                     i = 100 * ((h.values(s) - h._valueMin()) / (h._valueMax() - h._valueMin())), u["horizontal" === h.orientation ? "left" : "bottom"] = i + "%", e(this).stop(1, 1)[l ? "animate" : "css"](u, r.animate), h.options.range === !0 && ("horizontal" === h.orientation ? (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                         left: i + "%"
                     }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                         width: i - t + "%"
                     }, {
                         queue: !1,
                         duration: r.animate
                     })) : (0 === s && h.range.stop(1, 1)[l ? "animate" : "css"]({
                         bottom: i + "%"
                     }, r.animate), 1 === s && h.range[l ? "animate" : "css"]({
                         height: i - t + "%"
                     }, {
                         queue: !1,
                         duration: r.animate
                     }))), t = i
                 }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[l ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                     width: i + "%"
                 }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[l ? "animate" : "css"]({
                     width: 100 - i + "%"
                 }, {
                     queue: !1,
                     duration: r.animate
                 }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                     height: i + "%"
                 }, r.animate), "max" === o && "vertical" === this.orientation && this.range[l ? "animate" : "css"]({
                     height: 100 - i + "%"
                 }, {
                     queue: !1,
                     duration: r.animate
                 }))
             },
             _handleEvents: {
                 keydown: function(t) {
                     var i, s, n, a, o = e(t.target).data("ui-slider-handle-index");
                     switch (t.keyCode) {
                         case e.ui.keyCode.HOME:
                         case e.ui.keyCode.END:
                         case e.ui.keyCode.PAGE_UP:
                         case e.ui.keyCode.PAGE_DOWN:
                         case e.ui.keyCode.UP:
                         case e.ui.keyCode.RIGHT:
                         case e.ui.keyCode.DOWN:
                         case e.ui.keyCode.LEFT:
                             if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, e(t.target).addClass("ui-state-active"), i = this._start(t, o), i === !1)) return
                     }
                     switch (a = this.options.step, s = n = this.options.values && this.options.values.length ? this.values(o) : this.value(), t.keyCode) {
                         case e.ui.keyCode.HOME:
                             n = this._valueMin();
                             break;
                         case e.ui.keyCode.END:
                             n = this._valueMax();
                             break;
                         case e.ui.keyCode.PAGE_UP:
                             n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                             break;
                         case e.ui.keyCode.PAGE_DOWN:
                             n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                             break;
                         case e.ui.keyCode.UP:
                         case e.ui.keyCode.RIGHT:
                             if (s === this._valueMax()) return;
                             n = this._trimAlignValue(s + a);
                             break;
                         case e.ui.keyCode.DOWN:
                         case e.ui.keyCode.LEFT:
                             if (s === this._valueMin()) return;
                             n = this._trimAlignValue(s - a)
                     }
                     this._slide(t, o, n)
                 },
                 keyup: function(t) {
                     var i = e(t.target).data("ui-slider-handle-index");
                     this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), e(t.target).removeClass("ui-state-active"))
                 }
             }
         }), e.widget("ui.sortable", e.ui.mouse, {
             version: "1.11.4",
             widgetEventPrefix: "sort",
             ready: !1,
             options: {
                 appendTo: "parent",
                 axis: !1,
                 connectWith: !1,
                 containment: !1,
                 cursor: "auto",
                 cursorAt: !1,
                 dropOnEmpty: !0,
                 forcePlaceholderSize: !1,
                 forceHelperSize: !1,
                 grid: !1,
                 handle: !1,
                 helper: "original",
                 items: "> *",
                 opacity: !1,
                 placeholder: !1,
                 revert: !1,
                 scroll: !0,
                 scrollSensitivity: 20,
                 scrollSpeed: 20,
                 scope: "default",
                 tolerance: "intersect",
                 zIndex: 1e3,
                 activate: null,
                 beforeStop: null,
                 change: null,
                 deactivate: null,
                 out: null,
                 over: null,
                 receive: null,
                 remove: null,
                 sort: null,
                 start: null,
                 stop: null,
                 update: null
             },
             _isOverAxis: function(e, t, i) {
                 return e >= t && t + i > e
             },
             _isFloating: function(e) {
                 return /left|right/.test(e.css("float")) || /inline|table-cell/.test(e.css("display"))
             },
             _create: function() {
                 this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
             },
             _setOption: function(e, t) {
                 this._super(e, t), "handle" === e && this._setHandleClassName()
             },
             _setHandleClassName: function() {
                 this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), e.each(this.items, function() {
                     (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
                 })
             },
             _destroy: function() {
                 this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
                 for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
                 return this
             },
             _mouseCapture: function(t, i) {
                 var s = null,
                     n = !1,
                     a = this;
                 return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), e(t.target).parents().each(function() {
                     return e.data(this, a.widgetName + "-item") === a ? (s = e(this), !1) : void 0
                 }), e.data(t.target, a.widgetName + "-item") === a && (s = e(t.target)), s ? !this.options.handle || i || (e(this.options.handle, s).find("*").addBack().each(function() {
                     this === t.target && (n = !0)
                 }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
             },
             _mouseStart: function(t, i, s) {
                 var n, a, o = this.options;
                 if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                         top: this.offset.top - this.margins.top,
                         left: this.offset.left - this.margins.left
                     }, e.extend(this.offset, {
                         click: {
                             left: t.pageX - this.offset.left,
                             top: t.pageY - this.offset.top
                         },
                         parent: this._getParentOffset(),
                         relative: this._getRelativeOffset()
                     }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), this.domPosition = {
                         prev: this.currentItem.prev()[0],
                         parent: this.currentItem.parent()[0]
                     }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), o.containment && this._setContainment(), o.cursor && "auto" !== o.cursor && (a = this.document.find("body"), this.storedCursor = a.css("cursor"), a.css("cursor", o.cursor), this.storedStylesheet = e("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(a)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                     for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", t, this._uiHash(this));
                 return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
             },
             _mouseDrag: function(t) {
                 var i, s, n, a, o = this.options,
                     r = !1;
                 for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (t.pageY - this.document.scrollTop() < o.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < o.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed)), t.pageX - this.document.scrollLeft() < o.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < o.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed))), r !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                     if (s = this.items[i], n = s.item[0], a = this._intersectsWithPointer(s), a && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === a ? "next" : "prev"]()[0] !== n && !e.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], n) : !0)) {
                         if (this.direction = 1 === a ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                         this._rearrange(t, s), this._trigger("change", t, this._uiHash());
                         break
                     }
                 return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
             },
             _mouseStop: function(t, i) {
                 if (t) {
                     if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t), this.options.revert) {
                         var s = this,
                             n = this.placeholder.offset(),
                             a = this.options.axis,
                             o = {};
                         a && "x" !== a || (o.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), a && "y" !== a || (o.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                             s._clear(t)
                         })
                     }
                     else this._clear(t, i);
                     return !1
                 }
             },
             cancel: function() {
                 if (this.dragging) {
                     this._mouseUp({
                         target: null
                     }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                     for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
                 }
                 return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                     helper: null,
                     dragging: !1,
                     reverting: !1,
                     _noFinalSort: null
                 }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
             },
             serialize: function(t) {
                 var i = this._getItemsAsjQuery(t && t.connected),
                     s = [];
                 return t = t || {}, e(i).each(function() {
                     var i = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                     i && s.push((t.key || i[1] + "[]") + "=" + (t.key && t.expression ? i[1] : i[2]))
                 }), !s.length && t.key && s.push(t.key + "="), s.join("&")
             },
             toArray: function(t) {
                 var i = this._getItemsAsjQuery(t && t.connected),
                     s = [];
                 return t = t || {}, i.each(function() {
                     s.push(e(t.item || this).attr(t.attribute || "id") || "")
                 }), s
             },
             _intersectsWith: function(e) {
                 var t = this.positionAbs.left,
                     i = t + this.helperProportions.width,
                     s = this.positionAbs.top,
                     n = s + this.helperProportions.height,
                     a = e.left,
                     o = a + e.width,
                     r = e.top,
                     h = r + e.height,
                     l = this.offset.click.top,
                     u = this.offset.click.left,
                     d = "x" === this.options.axis || s + l > r && h > s + l,
                     c = "y" === this.options.axis || t + u > a && o > t + u,
                     p = d && c;
                 return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? p : t + this.helperProportions.width / 2 > a && o > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && h > n - this.helperProportions.height / 2
             },
             _intersectsWithPointer: function(e) {
                 var t = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                     i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                     s = t && i,
                     n = this._getDragVerticalDirection(),
                     a = this._getDragHorizontalDirection();
                 return s ? this.floating ? a && "right" === a || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1
             },
             _intersectsWithSides: function(e) {
                 var t = this._isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                     i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                     s = this._getDragVerticalDirection(),
                     n = this._getDragHorizontalDirection();
                 return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && t || "up" === s && !t)
             },
             _getDragVerticalDirection: function() {
                 var e = this.positionAbs.top - this.lastPositionAbs.top;
                 return 0 !== e && (e > 0 ? "down" : "up")
             },
             _getDragHorizontalDirection: function() {
                 var e = this.positionAbs.left - this.lastPositionAbs.left;
                 return 0 !== e && (e > 0 ? "right" : "left")
             },
             refresh: function(e) {
                 return this._refreshItems(e), this._setHandleClassName(), this.refreshPositions(), this
             },
             _connectWith: function() {
                 var e = this.options;
                 return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
             },
             _getItemsAsjQuery: function(t) {
                 function i() {
                     r.push(this)
                 }
                 var s, n, a, o, r = [],
                     h = [],
                     l = this._connectWith();
                 if (l && t)
                     for (s = l.length - 1; s >= 0; s--)
                         for (a = e(l[s], this.document[0]), n = a.length - 1; n >= 0; n--) o = e.data(a[n], this.widgetFullName), o && o !== this && !o.options.disabled && h.push([e.isFunction(o.options.items) ? o.options.items.call(o.element) : e(o.options.items, o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), o]);
                 for (h.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                         options: this.options,
                         item: this.currentItem
                     }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = h.length - 1; s >= 0; s--) h[s][0].each(i);
                 return e(r)
             },
             _removeCurrentsFromItems: function() {
                 var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
                 this.items = e.grep(this.items, function(e) {
                     for (var i = 0; t.length > i; i++)
                         if (t[i] === e.item[0]) return !1;
                     return !0
                 })
             },
             _refreshItems: function(t) {
                 this.items = [], this.containers = [this];
                 var i, s, n, a, o, r, h, l, u = this.items,
                     d = [
                         [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                             item: this.currentItem
                         }) : e(this.options.items, this.element), this]
                     ],
                     c = this._connectWith();
                 if (c && this.ready)
                     for (i = c.length - 1; i >= 0; i--)
                         for (n = e(c[i], this.document[0]), s = n.length - 1; s >= 0; s--) a = e.data(n[s], this.widgetFullName), a && a !== this && !a.options.disabled && (d.push([e.isFunction(a.options.items) ? a.options.items.call(a.element[0], t, {
                             item: this.currentItem
                         }) : e(a.options.items, a.element), a]), this.containers.push(a));
                 for (i = d.length - 1; i >= 0; i--)
                     for (o = d[i][1], r = d[i][0], s = 0, l = r.length; l > s; s++) h = e(r[s]), h.data(this.widgetName + "-item", o), u.push({
                         item: h,
                         instance: o,
                         width: 0,
                         height: 0,
                         left: 0,
                         top: 0
                     })
             },
             refreshPositions: function(t) {
                 this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                 var i, s, n, a;
                 for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? e(this.options.toleranceElement, s.item) : s.item, t || (s.width = n.outerWidth(), s.height = n.outerHeight()), a = n.offset(), s.left = a.left, s.top = a.top);
                 if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                 else
                     for (i = this.containers.length - 1; i >= 0; i--) a = this.containers[i].element.offset(), this.containers[i].containerCache.left = a.left, this.containers[i].containerCache.top = a.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                 return this
             },
             _createPlaceholder: function(t) {
                 t = t || this;
                 var i, s = t.options;
                 s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                     element: function() {
                         var s = t.currentItem[0].nodeName.toLowerCase(),
                             n = e("<" + s + ">", t.document[0]).addClass(i || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                         return "tbody" === s ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), e("<tr>", t.document[0]).appendTo(n)) : "tr" === s ? t._createTrPlaceholder(t.currentItem, n) : "img" === s && n.attr("src", t.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                     },
                     update: function(e, n) {
                         (!i || s.forcePlaceholderSize) && (n.height() || n.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
                     }
                 }), t.placeholder = e(s.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), s.placeholder.update(t, t.placeholder)
             },
             _createTrPlaceholder: function(t, i) {
                 var s = this;
                 t.children().each(function() {
                     e("<td>&#160;</td>", s.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(i)
                 })
             },
             _contactContainers: function(t) {
                 var i, s, n, a, o, r, h, l, u, d, c = null,
                     p = null;
                 for (i = this.containers.length - 1; i >= 0; i--)
                     if (!e.contains(this.currentItem[0], this.containers[i].element[0]))
                         if (this._intersectsWith(this.containers[i].containerCache)) {
                             if (c && e.contains(this.containers[i].element[0], c.element[0])) continue;
                             c = this.containers[i], p = i
                         }
                         else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0);
                 if (c)
                     if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1);
                     else {
                         for (n = 1e4, a = null, u = c.floating || this._isFloating(this.currentItem), o = u ? "left" : "top", r = u ? "width" : "height", d = u ? "clientX" : "clientY", s = this.items.length - 1; s >= 0; s--) e.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (h = this.items[s].item.offset()[o], l = !1, t[d] - h > this.items[s][r] / 2 && (l = !0), n > Math.abs(t[d] - h) && (n = Math.abs(t[d] - h), a = this.items[s], this.direction = l ? "up" : "down"));
                         if (!a && !this.options.dropOnEmpty) return;
                         if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
                         a ? this._rearrange(t, a, null, !0) : this._rearrange(t, null, this.containers[p].element, !0), this._trigger("change", t, this._uiHash()), this.containers[p]._trigger("change", t, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", t, this._uiHash(this)), this.containers[p].containerCache.over = 1
                     }
             },
             _createHelper: function(t) {
                 var i = this.options,
                     s = e.isFunction(i.helper) ? e(i.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                 return s.parents("body").length || e("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                     width: this.currentItem[0].style.width,
                     height: this.currentItem[0].style.height,
                     position: this.currentItem.css("position"),
                     top: this.currentItem.css("top"),
                     left: this.currentItem.css("left")
                 }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
             },
             _adjustOffsetFromHelper: function(t) {
                 "string" == typeof t && (t = t.split(" ")), e.isArray(t) && (t = {
                     left: +t[0],
                     top: +t[1] || 0
                 }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
             },
             _getParentOffset: function() {
                 this.offsetParent = this.helper.offsetParent();
                 var t = this.offsetParent.offset();
                 return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (t = {
                     top: 0,
                     left: 0
                 }), {
                     top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                     left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                 }
             },
             _getRelativeOffset: function() {
                 if ("relative" === this.cssPosition) {
                     var e = this.currentItem.position();
                     return {
                         top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                         left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                     }
                 }
                 return {
                     top: 0,
                     left: 0
                 }
             },
             _cacheMargins: function() {
                 this.margins = {
                     left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                     top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                 }
             },
             _cacheHelperProportions: function() {
                 this.helperProportions = {
                     width: this.helper.outerWidth(),
                     height: this.helper.outerHeight()
                 }
             },
             _setContainment: function() {
                 var t, i, s, n = this.options;
                 "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (t = e(n.containment)[0], i = e(n.containment).offset(), s = "hidden" !== e(t).css("overflow"), this.containment = [i.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
             },
             _convertPositionTo: function(t, i) {
                 i || (i = this.position);
                 var s = "absolute" === t ? 1 : -1,
                     n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                     a = /(html|body)/i.test(n[0].tagName);
                 return {
                     top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : n.scrollTop()) * s,
                     left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : n.scrollLeft()) * s
                 }
             },
             _generatePosition: function(t) {
                 var i, s, n = this.options,
                     a = t.pageX,
                     o = t.pageY,
                     r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                     h = /(html|body)/i.test(r[0].tagName);
                 return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (a = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (a = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1], o = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((a - this.originalPageX) / n.grid[0]) * n.grid[0], a = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                     top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : r.scrollTop()),
                     left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : r.scrollLeft())
                 }
             },
             _rearrange: function(e, t, i, s) {
                 i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                 var n = this.counter;
                 this._delay(function() {
                     n === this.counter && this.refreshPositions(!s)
                 })
             },
             _clear: function(e, t) {
                 function i(e, t, i) {
                     return function(s) {
                         i._trigger(e, s, t._uiHash(t))
                     }
                 }
                 this.reverting = !1;
                 var s, n = [];
                 if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                     for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                     this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                 }
                 else this.currentItem.show();
                 for (this.fromOutside && !t && n.push(function(e) {
                         this._trigger("receive", e, this._uiHash(this.fromOutside))
                     }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || n.push(function(e) {
                         this._trigger("update", e, this._uiHash())
                     }), this !== this.currentContainer && (t || (n.push(function(e) {
                         this._trigger("remove", e, this._uiHash())
                     }), n.push(function(e) {
                         return function(t) {
                             e._trigger("receive", t, this._uiHash(this))
                         }
                     }.call(this, this.currentContainer)), n.push(function(e) {
                         return function(t) {
                             e._trigger("update", t, this._uiHash(this))
                         }
                     }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) t || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
                 if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, t || this._trigger("beforeStop", e, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
                     for (s = 0; n.length > s; s++) n[s].call(this, e);
                     this._trigger("stop", e, this._uiHash())
                 }
                 return this.fromOutside = !1, !this.cancelHelperRemoval
             },
             _trigger: function() {
                 e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
             },
             _uiHash: function(t) {
                 var i = t || this;
                 return {
                     helper: i.helper,
                     placeholder: i.placeholder || e([]),
                     position: i.position,
                     originalPosition: i.originalPosition,
                     offset: i.positionAbs,
                     item: i.currentItem,
                     sender: t ? t.element : null
                 }
             }
         }), e.widget("ui.spinner", {
             version: "1.11.4",
             defaultElement: "<input>",
             widgetEventPrefix: "spin",
             options: {
                 culture: null,
                 icons: {
                     down: "ui-icon-triangle-1-s",
                     up: "ui-icon-triangle-1-n"
                 },
                 incremental: !0,
                 max: null,
                 min: null,
                 numberFormat: null,
                 page: 10,
                 step: 1,
                 change: null,
                 spin: null,
                 start: null,
                 stop: null
             },
             _create: function() {
                 this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                     beforeunload: function() {
                         this.element.removeAttr("autocomplete")
                     }
                 })
             },
             _getCreateOptions: function() {
                 var t = {},
                     i = this.element;
                 return e.each(["min", "max", "step"], function(e, s) {
                     var n = i.attr(s);
                     void 0 !== n && n.length && (t[s] = n)
                 }), t
             },
             _events: {
                 keydown: function(e) {
                     this._start(e) && this._keydown(e) && e.preventDefault()
                 },
                 keyup: "_stop",
                 focus: function() {
                     this.previous = this.element.val()
                 },
                 blur: function(e) {
                     return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", e), void 0)
                 },
                 mousewheel: function(e, t) {
                     if (t) {
                         if (!this.spinning && !this._start(e)) return !1;
                         this._spin((t > 0 ? 1 : -1) * this.options.step, e), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
                             this.spinning && this._stop(e)
                         }, 100), e.preventDefault()
                     }
                 },
                 "mousedown .ui-spinner-button": function(t) {
                     function i() {
                         var e = this.element[0] === this.document[0].activeElement;
                         e || (this.element.focus(), this.previous = s, this._delay(function() {
                             this.previous = s
                         }))
                     }
                     var s;
                     s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), t.preventDefault(), i.call(this), this.cancelBlur = !0, this._delay(function() {
                         delete this.cancelBlur, i.call(this)
                     }), this._start(t) !== !1 && this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
                 },
                 "mouseup .ui-spinner-button": "_stop",
                 "mouseenter .ui-spinner-button": function(t) {
                     return e(t.currentTarget).hasClass("ui-state-active") ? this._start(t) === !1 ? !1 : (this._repeat(null, e(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t), void 0) : void 0
                 },
                 "mouseleave .ui-spinner-button": "_stop"
             },
             _draw: function() {
                 var e = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
                 this.element.attr("role", "spinbutton"), this.buttons = e.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * e.height()) && e.height() > 0 && e.height(e.height()), this.options.disabled && this.disable()
             },
             _keydown: function(t) {
                 var i = this.options,
                     s = e.ui.keyCode;
                 switch (t.keyCode) {
                     case s.UP:
                         return this._repeat(null, 1, t), !0;
                     case s.DOWN:
                         return this._repeat(null, -1, t), !0;
                     case s.PAGE_UP:
                         return this._repeat(null, i.page, t), !0;
                     case s.PAGE_DOWN:
                         return this._repeat(null, -i.page, t), !0
                 }
                 return !1
             },
             _uiSpinnerHtml: function() {
                 return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
             },
             _buttonHtml: function() {
                 return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
             },
             _start: function(e) {
                 return this.spinning || this._trigger("start", e) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
             },
             _repeat: function(e, t, i) {
                 e = e || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
                     this._repeat(40, t, i)
                 }, e), this._spin(t * this.options.step, i)
             },
             _spin: function(e, t) {
                 var i = this.value() || 0;
                 this.counter || (this.counter = 1), i = this._adjustValue(i + e * this._increment(this.counter)), this.spinning && this._trigger("spin", t, {
                     value: i
                 }) === !1 || (this._value(i), this.counter++)
             },
             _increment: function(t) {
                 var i = this.options.incremental;
                 return i ? e.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
             },
             _precision: function() {
                 var e = this._precisionOf(this.options.step);
                 return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))), e
             },
             _precisionOf: function(e) {
                 var t = "" + e,
                     i = t.indexOf(".");
                 return -1 === i ? 0 : t.length - i - 1
             },
             _adjustValue: function(e) {
                 var t, i, s = this.options;
                 return t = null !== s.min ? s.min : 0, i = e - t, i = Math.round(i / s.step) * s.step, e = t + i, e = parseFloat(e.toFixed(this._precision())), null !== s.max && e > s.max ? s.max : null !== s.min && s.min > e ? s.min : e
             },
             _stop: function(e) {
                 this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", e))
             },
             _setOption: function(e, t) {
                 if ("culture" === e || "numberFormat" === e) {
                     var i = this._parse(this.element.val());
                     return this.options[e] = t, this.element.val(this._format(i)), void 0
                 }("max" === e || "min" === e || "step" === e) && "string" == typeof t && (t = this._parse(t)), "icons" === e && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)), this._super(e, t), "disabled" === e && (this.widget().toggleClass("ui-state-disabled", !!t), this.element.prop("disabled", !!t), this.buttons.button(t ? "disable" : "enable"))
             },
             _setOptions: h(function(e) {
                 this._super(e)
             }),
             _parse: function(e) {
                 return "string" == typeof e && "" !== e && (e = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(e, 10, this.options.culture) : +e), "" === e || isNaN(e) ? null : e
             },
             _format: function(e) {
                 return "" === e ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(e, this.options.numberFormat, this.options.culture) : e
             },
             _refresh: function() {
                 this.element.attr({
                     "aria-valuemin": this.options.min,
                     "aria-valuemax": this.options.max,
                     "aria-valuenow": this._parse(this.element.val())
                 })
             },
             isValid: function() {
                 var e = this.value();
                 return null === e ? !1 : e === this._adjustValue(e)
             },
             _value: function(e, t) {
                 var i;
                 "" !== e && (i = this._parse(e), null !== i && (t || (i = this._adjustValue(i)), e = this._format(i))), this.element.val(e), this._refresh()
             },
             _destroy: function() {
                 this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
             },
             stepUp: h(function(e) {
                 this._stepUp(e)
             }),
             _stepUp: function(e) {
                 this._start() && (this._spin((e || 1) * this.options.step), this._stop())
             },
             stepDown: h(function(e) {
                 this._stepDown(e)
             }),
             _stepDown: function(e) {
                 this._start() && (this._spin((e || 1) * -this.options.step), this._stop())
             },
             pageUp: h(function(e) {
                 this._stepUp((e || 1) * this.options.page)
             }),
             pageDown: h(function(e) {
                 this._stepDown((e || 1) * this.options.page)
             }),
             value: function(e) {
                 return arguments.length ? (h(this._value).call(this, e), void 0) : this._parse(this.element.val())
             },
             widget: function() {
                 return this.uiSpinner
             }
         }), e.widget("ui.tabs", {
             version: "1.11.4",
             delay: 300,
             options: {
                 active: null,
                 collapsible: !1,
                 event: "click",
                 heightStyle: "content",
                 hide: null,
                 show: null,
                 activate: null,
                 beforeActivate: null,
                 beforeLoad: null,
                 load: null
             },
             _isLocal: function() {
                 var e = /#.*$/;
                 return function(t) {
                     var i, s;
                     t = t.cloneNode(!1), i = t.href.replace(e, ""), s = location.href.replace(e, "");
                     try {
                         i = decodeURIComponent(i)
                     }
                     catch (n) {}
                     try {
                         s = decodeURIComponent(s)
                     }
                     catch (n) {}
                     return t.hash.length > 1 && i === s
                 }
             }(),
             _create: function() {
                 var t = this,
                     i = this.options;
                 this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", i.collapsible), this._processTabs(), i.active = this._initialActive(), e.isArray(i.disabled) && (i.disabled = e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function(e) {
                     return t.tabs.index(e)
                 }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(i.active) : e(), this._refresh(), this.active.length && this.load(i.active)
             },
             _initialActive: function() {
                 var t = this.options.active,
                     i = this.options.collapsible,
                     s = location.hash.substring(1);
                 return null === t && (s && this.tabs.each(function(i, n) {
                     return e(n).attr("aria-controls") === s ? (t = i, !1) : void 0
                 }), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
             },
             _getCreateEventData: function() {
                 return {
                     tab: this.active,
                     panel: this.active.length ? this._getPanelForTab(this.active) : e()
                 }
             },
             _tabKeydown: function(t) {
                 var i = e(this.document[0].activeElement).closest("li"),
                     s = this.tabs.index(i),
                     n = !0;
                 if (!this._handlePageNav(t)) {
                     switch (t.keyCode) {
                         case e.ui.keyCode.RIGHT:
                         case e.ui.keyCode.DOWN:
                             s++;
                             break;
                         case e.ui.keyCode.UP:
                         case e.ui.keyCode.LEFT:
                             n = !1, s--;
                             break;
                         case e.ui.keyCode.END:
                             s = this.anchors.length - 1;
                             break;
                         case e.ui.keyCode.HOME:
                             s = 0;
                             break;
                         case e.ui.keyCode.SPACE:
                             return t.preventDefault(), clearTimeout(this.activating), this._activate(s), void 0;
                         case e.ui.keyCode.ENTER:
                             return t.preventDefault(), clearTimeout(this.activating), this._activate(s === this.options.active ? !1 : s), void 0;
                         default:
                             return
                     }
                     t.preventDefault(), clearTimeout(this.activating), s = this._focusNextTab(s, n), t.ctrlKey || t.metaKey || (i.attr("aria-selected", "false"), this.tabs.eq(s).attr("aria-selected", "true"), this.activating = this._delay(function() {
                         this.option("active", s)
                     }, this.delay))
                 }
             },
             _panelKeydown: function(t) {
                 this._handlePageNav(t) || t.ctrlKey && t.keyCode === e.ui.keyCode.UP && (t.preventDefault(), this.active.focus())
             },
             _handlePageNav: function(t) {
                 return t.altKey && t.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
             },
             _findNextTab: function(t, i) {
                 function s() {
                     return t > n && (t = 0), 0 > t && (t = n), t
                 }
                 for (var n = this.tabs.length - 1; - 1 !== e.inArray(s(), this.options.disabled);) t = i ? t + 1 : t - 1;
                 return t
             },
             _focusNextTab: function(e, t) {
                 return e = this._findNextTab(e, t), this.tabs.eq(e).focus(), e
             },
             _setOption: function(e, t) {
                 return "active" === e ? (this._activate(t), void 0) : "disabled" === e ? (this._setupDisabled(t), void 0) : (this._super(e, t), "collapsible" === e && (this.element.toggleClass("ui-tabs-collapsible", t), t || this.options.active !== !1 || this._activate(0)), "event" === e && this._setupEvents(t), "heightStyle" === e && this._setupHeightStyle(t), void 0)
             },
             _sanitizeSelector: function(e) {
                 return e ? e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
             },
             refresh: function() {
                 var t = this.options,
                     i = this.tablist.children(":has(a[href])");
                 t.disabled = e.map(i.filter(".ui-state-disabled"), function(e) {
                     return i.index(e)
                 }), this._processTabs(), t.active !== !1 && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = e()), this._refresh()
             },
             _refresh: function() {
                 this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                     "aria-selected": "false",
                     "aria-expanded": "false",
                     tabIndex: -1
                 }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                     "aria-hidden": "true"
                 }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                     "aria-selected": "true",
                     "aria-expanded": "true",
                     tabIndex: 0
                 }), this._getPanelForTab(this.active).show().attr({
                     "aria-hidden": "false"
                 })) : this.tabs.eq(0).attr("tabIndex", 0)
             },
             _processTabs: function() {
                 var t = this,
                     i = this.tabs,
                     s = this.anchors,
                     n = this.panels;
                 this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(t) {
                     e(this).is(".ui-state-disabled") && t.preventDefault()
                 }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                     e(this).closest("li").is(".ui-state-disabled") && this.blur()
                 }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                     role: "tab",
                     tabIndex: -1
                 }), this.anchors = this.tabs.map(function() {
                     return e("a", this)[0]
                 }).addClass("ui-tabs-anchor").attr({
                     role: "presentation",
                     tabIndex: -1
                 }), this.panels = e(), this.anchors.each(function(i, s) {
                     var n, a, o, r = e(s).uniqueId().attr("id"),
                         h = e(s).closest("li"),
                         l = h.attr("aria-controls");
                     t._isLocal(s) ? (n = s.hash, o = n.substring(1), a = t.element.find(t._sanitizeSelector(n))) : (o = h.attr("aria-controls") || e({}).uniqueId()[0].id, n = "#" + o, a = t.element.find(n), a.length || (a = t._createPanel(o), a.insertAfter(t.panels[i - 1] || t.tablist)), a.attr("aria-live", "polite")), a.length && (t.panels = t.panels.add(a)), l && h.data("ui-tabs-aria-controls", l), h.attr({
                         "aria-controls": o,
                         "aria-labelledby": r
                     }), a.attr("aria-labelledby", r)
                 }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), i && (this._off(i.not(this.tabs)), this._off(s.not(this.anchors)), this._off(n.not(this.panels)))
             },
             _getList: function() {
                 return this.tablist || this.element.find("ol,ul").eq(0)
             },
             _createPanel: function(t) {
                 return e("<div>").attr("id", t).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
             },
             _setupDisabled: function(t) {
                 e.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1);
                 for (var i, s = 0; i = this.tabs[s]; s++) t === !0 || -1 !== e.inArray(s, t) ? e(i).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");
                 this.options.disabled = t
             },
             _setupEvents: function(t) {
                 var i = {};
                 t && e.each(t.split(" "), function(e, t) {
                     i[t] = "_eventHandler"
                 }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                     click: function(e) {
                         e.preventDefault()
                     }
                 }), this._on(this.anchors, i), this._on(this.tabs, {
                     keydown: "_tabKeydown"
                 }), this._on(this.panels, {
                     keydown: "_panelKeydown"
                 }), this._focusable(this.tabs), this._hoverable(this.tabs)
             },
             _setupHeightStyle: function(t) {
                 var i, s = this.element.parent();
                 "fill" === t ? (i = s.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
                     var t = e(this),
                         s = t.css("position");
                     "absolute" !== s && "fixed" !== s && (i -= t.outerHeight(!0))
                 }), this.element.children().not(this.panels).each(function() {
                     i -= e(this).outerHeight(!0)
                 }), this.panels.each(function() {
                     e(this).height(Math.max(0, i - e(this).innerHeight() + e(this).height()))
                 }).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() {
                     i = Math.max(i, e(this).height("").height())
                 }).height(i))
             },
             _eventHandler: function(t) {
                 var i = this.options,
                     s = this.active,
                     n = e(t.currentTarget),
                     a = n.closest("li"),
                     o = a[0] === s[0],
                     r = o && i.collapsible,
                     h = r ? e() : this._getPanelForTab(a),
                     l = s.length ? this._getPanelForTab(s) : e(),
                     u = {
                         oldTab: s,
                         oldPanel: l,
                         newTab: r ? e() : a,
                         newPanel: h
                     };
                 t.preventDefault(), a.hasClass("ui-state-disabled") || a.hasClass("ui-tabs-loading") || this.running || o && !i.collapsible || this._trigger("beforeActivate", t, u) === !1 || (i.active = r ? !1 : this.tabs.index(a), this.active = o ? e() : a, this.xhr && this.xhr.abort(), l.length || h.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), h.length && this.load(this.tabs.index(a), t), this._toggle(t, u))
             },
             _toggle: function(t, i) {
                 function s() {
                     a.running = !1, a._trigger("activate", t, i)
                 }

                 function n() {
                     i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), o.length && a.options.show ? a._show(o, a.options.show, s) : (o.show(), s())
                 }
                 var a = this,
                     o = i.newPanel,
                     r = i.oldPanel;
                 this.running = !0, r.length && this.options.hide ? this._hide(r, this.options.hide, function() {
                     i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), n()
                 }) : (i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), r.hide(), n()), r.attr("aria-hidden", "true"), i.oldTab.attr({
                     "aria-selected": "false",
                     "aria-expanded": "false"
                 }), o.length && r.length ? i.oldTab.attr("tabIndex", -1) : o.length && this.tabs.filter(function() {
                     return 0 === e(this).attr("tabIndex")
                 }).attr("tabIndex", -1), o.attr("aria-hidden", "false"), i.newTab.attr({
                     "aria-selected": "true",
                     "aria-expanded": "true",
                     tabIndex: 0
                 })
             },
             _activate: function(t) {
                 var i, s = this._findActive(t);
                 s[0] !== this.active[0] && (s.length || (s = this.active), i = s.find(".ui-tabs-anchor")[0], this._eventHandler({
                     target: i,
                     currentTarget: i,
                     preventDefault: e.noop
                 }))
             },
             _findActive: function(t) {
                 return t === !1 ? e() : this.tabs.eq(t)
             },
             _getIndex: function(e) {
                 return "string" == typeof e && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
             },
             _destroy: function() {
                 this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
                     e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
                 }), this.tabs.each(function() {
                     var t = e(this),
                         i = t.data("ui-tabs-aria-controls");
                     i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
                 }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
             },
             enable: function(t) {
                 var i = this.options.disabled;
                 i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = e.isArray(i) ? e.map(i, function(e) {
                     return e !== t ? e : null
                 }) : e.map(this.tabs, function(e, i) {
                     return i !== t ? i : null
                 })), this._setupDisabled(i))
             },
             disable: function(t) {
                 var i = this.options.disabled;
                 if (i !== !0) {
                     if (void 0 === t) i = !0;
                     else {
                         if (t = this._getIndex(t), -1 !== e.inArray(t, i)) return;
                         i = e.isArray(i) ? e.merge([t], i).sort() : [t]
                     }
                     this._setupDisabled(i)
                 }
             },
             load: function(t, i) {
                 t = this._getIndex(t);
                 var s = this,
                     n = this.tabs.eq(t),
                     a = n.find(".ui-tabs-anchor"),
                     o = this._getPanelForTab(n),
                     r = {
                         tab: n,
                         panel: o
                     },
                     h = function(e, t) {
                         "abort" === t && s.panels.stop(!1, !0), n.removeClass("ui-tabs-loading"), o.removeAttr("aria-busy"), e === s.xhr && delete s.xhr
                     };
                 this._isLocal(a[0]) || (this.xhr = e.ajax(this._ajaxSettings(a, i, r)), this.xhr && "canceled" !== this.xhr.statusText && (n.addClass("ui-tabs-loading"), o.attr("aria-busy", "true"), this.xhr.done(function(e, t, n) {
                     setTimeout(function() {
                         o.html(e), s._trigger("load", i, r), h(n, t)
                     }, 1)
                 }).fail(function(e, t) {
                     setTimeout(function() {
                         h(e, t)
                     }, 1)
                 })))
             },
             _ajaxSettings: function(t, i, s) {
                 var n = this;
                 return {
                     url: t.attr("href"),
                     beforeSend: function(t, a) {
                         return n._trigger("beforeLoad", i, e.extend({
                             jqXHR: t,
                             ajaxSettings: a
                         }, s))
                     }
                 }
             },
             _getPanelForTab: function(t) {
                 var i = e(t).attr("aria-controls");
                 return this.element.find(this._sanitizeSelector("#" + i))
             }
         }), e.widget("ui.tooltip", {
             version: "1.11.4",
             options: {
                 content: function() {
                     var t = e(this).attr("title") || "";
                     return e("<a>").text(t).html()
                 },
                 hide: !0,
                 items: "[title]:not([disabled])",
                 position: {
                     my: "left top+15",
                     at: "left bottom",
                     collision: "flipfit flip"
                 },
                 show: !0,
                 tooltipClass: null,
                 track: !1,
                 close: null,
                 open: null
             },
             _addDescribedBy: function(t, i) {
                 var s = (t.attr("aria-describedby") || "").split(/\s+/);
                 s.push(i), t.data("ui-tooltip-id", i).attr("aria-describedby", e.trim(s.join(" ")))
             },
             _removeDescribedBy: function(t) {
                 var i = t.data("ui-tooltip-id"),
                     s = (t.attr("aria-describedby") || "").split(/\s+/),
                     n = e.inArray(i, s); - 1 !== n && s.splice(n, 1), t.removeData("ui-tooltip-id"), s = e.trim(s.join(" ")), s ? t.attr("aria-describedby", s) : t.removeAttr("aria-describedby")
             },
             _create: function() {
                 this._on({
                     mouseover: "open",
                     focusin: "open"
                 }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({
                     role: "log",
                     "aria-live": "assertive",
                     "aria-relevant": "additions"
                 }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
             },
             _setOption: function(t, i) {
                 var s = this;
                 return "disabled" === t ? (this[i ? "_disable" : "_enable"](), this.options[t] = i, void 0) : (this._super(t, i), "content" === t && e.each(this.tooltips, function(e, t) {
                     s._updateContent(t.element)
                 }), void 0)
             },
             _disable: function() {
                 var t = this;
                 e.each(this.tooltips, function(i, s) {
                     var n = e.Event("blur");
                     n.target = n.currentTarget = s.element[0], t.close(n, !0)
                 }), this.element.find(this.options.items).addBack().each(function() {
                     var t = e(this);
                     t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
                 })
             },
             _enable: function() {
                 this.element.find(this.options.items).addBack().each(function() {
                     var t = e(this);
                     t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
                 })
             },
             open: function(t) {
                 var i = this,
                     s = e(t ? t.target : this.element).closest(this.options.items);
                 s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), t && "mouseover" === t.type && s.parents().each(function() {
                     var t, s = e(this);
                     s.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, i.close(t, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
                         element: this,
                         title: s.attr("title")
                     }, s.attr("title", ""))
                 }), this._registerCloseHandlers(t, s), this._updateContent(s, t))
             },
             _updateContent: function(e, t) {
                 var i, s = this.options.content,
                     n = this,
                     a = t ? t.type : null;
                 return "string" == typeof s ? this._open(t, e, s) : (i = s.call(e[0], function(i) {
                     n._delay(function() {
                         e.data("ui-tooltip-open") && (t && (t.type = a), this._open(t, e, i))
                     })
                 }), i && this._open(t, e, i), void 0)
             },
             _open: function(t, i, s) {
                 function n(e) {
                     l.of = e, o.is(":hidden") || o.position(l)
                 }
                 var a, o, r, h, l = e.extend({}, this.options.position);
                 if (s) {
                     if (a = this._find(i)) return a.tooltip.find(".ui-tooltip-content").html(s), void 0;
                     i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title")), a = this._tooltip(i), o = a.tooltip, this._addDescribedBy(i, o.attr("id")), o.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone ? (h = s.clone(), h.removeAttr("id").find("[id]").removeAttr("id")) : h = s, e("<div>").html(h).appendTo(this.liveRegion), this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                         mousemove: n
                     }), n(t)) : o.position(e.extend({
                         of: i
                     }, this.options.position)), o.hide(), this._show(o, this.options.show), this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function() {
                         o.is(":visible") && (n(l.of), clearInterval(r))
                     }, e.fx.interval)), this._trigger("open", t, {
                         tooltip: o
                     })
                 }
             },
             _registerCloseHandlers: function(t, i) {
                 var s = {
                     keyup: function(t) {
                         if (t.keyCode === e.ui.keyCode.ESCAPE) {
                             var s = e.Event(t);
                             s.currentTarget = i[0], this.close(s, !0)
                         }
                     }
                 };
                 i[0] !== this.element[0] && (s.remove = function() {
                     this._removeTooltip(this._find(i).tooltip)
                 }), t && "mouseover" !== t.type || (s.mouseleave = "close"), t && "focusin" !== t.type || (s.focusout = "close"), this._on(!0, i, s)
             },
             close: function(t) {
                 var i, s = this,
                     n = e(t ? t.currentTarget : this.element),
                     a = this._find(n);
                 return a ? (i = a.tooltip, a.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), a.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function() {
                     s._removeTooltip(e(this))
                 }), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, i) {
                     e(i.element).attr("title", i.title), delete s.parents[t]
                 }), a.closing = !0, this._trigger("close", t, {
                     tooltip: i
                 }), a.hiding || (a.closing = !1)), void 0) : (n.removeData("ui-tooltip-open"), void 0)
             },
             _tooltip: function(t) {
                 var i = e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                     s = i.uniqueId().attr("id");
                 return e("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = {
                     element: t,
                     tooltip: i
                 }
             },
             _find: function(e) {
                 var t = e.data("ui-tooltip-id");
                 return t ? this.tooltips[t] : null
             },
             _removeTooltip: function(e) {
                 e.remove(), delete this.tooltips[e.attr("id")]
             },
             _destroy: function() {
                 var t = this;
                 e.each(this.tooltips, function(i, s) {
                     var n = e.Event("blur"),
                         a = s.element;
                     n.target = n.currentTarget = a[0], t.close(n, !0), e("#" + i).remove(), a.data("ui-tooltip-title") && (a.attr("title") || a.attr("title", a.data("ui-tooltip-title")), a.removeData("ui-tooltip-title"))
                 }), this.liveRegion.remove()
             }
         })
 });




 (function($) {
     $.fn.extend({
         jGravity: function(options) {

             // set default settings
             var settings = {
                 target: 'div, span, img, ol, ul, li, a, blockquote, button, input, embed, h1, h2, h3, h4, h5, h6, label, object, option, p, pre, span, table',
                 ignoreClass: '',
                 weight: 20,
                 depth: 1,
                 drag: false
             }

             var options = $.extend(settings, options);

             return this.each(function() {
                 var o = options;

                 // allow user to specify target as 'everything'
                 if (o.target == 'everything') {
                     o.target = 'body *'
                 }

                 // allow user to specify weight as 'light' or 'heavy'
                 if (o.weight == 'light') {
                     o.weight = 50;
                 }
                 else if (o.weight == 'heavy') {
                     o.weight = 1;
                 }

                 // Add gravity to target elements
                 $(o.target).each(function() {
                     if ($(this).children().length < o.depth && !$(this).hasClass(o.ignoreClass)) { // filter by depth + ignoreClass
                         $(this).addClass("box2d");
                         $(this).css("zIndex", "999");
                         //$(this).css("margin-top", "-122");
                     }
                 });

                 /*------------------------------------*\
                 LIBRARIES
                 \*------------------------------------*/

                 // Alex Arnell's inheritance.js :: http://code.google.com/p/inheritance/
                 function $A(a) {
                     if (!a) return [];
                     if (a.toArray) return a.toArray();
                     var b = a.length || 0,
                         c = new Array(b);
                     while (b--) c[b] = a[b];
                     return c
                 }
                 var Class = {
                     create: function() {
                         function c() {
                             this.initialize.apply(this, arguments)
                         }
                         var a = null,
                             b = $A(arguments);
                         if (Object.isFunction(b[0])) a = b.shift();
                         Object.extend(c, Class.Methods);
                         c.superclass = a;
                         c.subclasses = [];
                         if (a) {
                             var d = function() {};
                             d.prototype = a.prototype;
                             c.prototype = new d;
                             a.subclasses.push(c)
                         }
                         for (var e = 0; e < b.length; e++) c.addMethods(b[e]);
                         if (!c.prototype.initialize) c.prototype.initialize = this.emptyFunction;
                         c.prototype.constructor = c;
                         return c
                     },
                     emptyFunction: function() {}
                 };
                 Class.Methods = {
                     addMethods: function(a) {
                         var b = this.superclass && this.superclass.prototype;
                         var c = Object.keys(a);
                         if (!Object.keys({
                                 toString: true
                             }).length) c.push("toString", "valueOf");
                         for (var d = 0, e = c.length; d < e; d++) {
                             var f = c[d],
                                 g = a[f];
                             if (b && Object.isFunction(g) && g.argumentNames().first() == "$super") {
                                 var h = g,
                                     g = Object.extend(function(a) {
                                         return function() {
                                             return b[a].apply(this, arguments)
                                         }
                                     }(f).wrap(h), {
                                         valueOf: function() {
                                             return h
                                         },
                                         toString: function() {
                                             return h.toString()
                                         }
                                     })
                             }
                             this.prototype[f] = g
                         }
                         return this
                     }
                 };
                 Object.extend = function(a, b) {
                     for (var c in b) a[c] = b[c];
                     return a
                 };
                 Object.extend(Object, {
                     inspect: function(a) {
                         try {
                             if (Object.isUndefined(a)) return "undefined";
                             if (a === null) return "null";
                             return a.inspect ? a.inspect() : String(a)
                         }
                         catch (b) {
                             if (b instanceof RangeError) return "...";
                             throw b
                         }
                     },
                     toJSON: function(a) {
                         var b = typeof a;
                         switch (b) {
                             case "undefined":
                             case "function":
                             case "unknown":
                                 return;
                             case "boolean":
                                 return a.toString()
                         }
                         if (a === null) return "null";
                         if (a.toJSON) return a.toJSON();
                         if (Object.isElement(a)) return;
                         var c = [];
                         for (var d in a) {
                             var e = Object.toJSON(a[d]);
                             if (!Object.isUndefined(e)) c.push(d.toJSON() + ": " + e)
                         }
                         return "{" + c.join(", ") + "}"
                     },
                     toQueryString: function(a) {
                         return $H(a).toQueryString()
                     },
                     toHTML: function(a) {
                         return a && a.toHTML ? a.toHTML() : String.interpret(a)
                     },
                     keys: function(a) {
                         var b = [];
                         for (var c in a) b.push(c);
                         return b
                     },
                     values: function(a) {
                         var b = [];
                         for (var c in a) b.push(a[c]);
                         return b
                     },
                     clone: function(a) {
                         return Object.extend({}, a)
                     },
                     isElement: function(a) {
                         return a && a.nodeType == 1
                     },
                     isArray: function(a) {
                         return a != null && typeof a == "object" && "splice" in a && "join" in a
                     },
                     isHash: function(a) {
                         return a instanceof Hash
                     },
                     isFunction: function(a) {
                         return typeof a == "function"
                     },
                     isString: function(a) {
                         return typeof a == "string"
                     },
                     isNumber: function(a) {
                         return typeof a == "number"
                     },
                     isUndefined: function(a) {
                         return typeof a == "undefined"
                     }
                 });
                 if (WebKit = navigator.userAgent.indexOf("AppleWebKit/") > -1) {
                     $A = function(a) {
                         if (!a) return [];
                         if (!(Object.isFunction(a) && a == "[object NodeList]") && a.toArray) return a.toArray();
                         var b = a.length || 0,
                             c = new Array(b);
                         while (b--) c[b] = a[b];
                         return c
                     }
                 }

                 // Box2Djs (port of Box2DFlash 1.4.3.1) :: http://box2d-js.sourceforge.net/
                 var b2Settings = Class.create();
                 b2Settings.prototype = {
                     initialize: function() {}
                 };
                 b2Settings.USHRT_MAX = 65535;
                 b2Settings.b2_pi = Math.PI;
                 b2Settings.b2_massUnitsPerKilogram = 1;
                 b2Settings.b2_timeUnitsPerSecond = 1;
                 b2Settings.b2_lengthUnitsPerMeter = 30;
                 b2Settings.b2_maxManifoldPoints = 2;
                 b2Settings.b2_maxShapesPerBody = 64;
                 b2Settings.b2_maxPolyVertices = 8;
                 b2Settings.b2_maxProxies = 1024;
                 b2Settings.b2_maxPairs = 8 * b2Settings.b2_maxProxies;
                 b2Settings.b2_linearSlop = .005 * b2Settings.b2_lengthUnitsPerMeter;
                 b2Settings.b2_angularSlop = 2 / 180 * b2Settings.b2_pi;
                 b2Settings.b2_velocityThreshold = 1 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
                 b2Settings.b2_maxLinearCorrection = .2 * b2Settings.b2_lengthUnitsPerMeter;
                 b2Settings.b2_maxAngularCorrection = 8 / 180 * b2Settings.b2_pi;
                 b2Settings.b2_contactBaumgarte = .2;
                 b2Settings.b2_timeToSleep = .5 * b2Settings.b2_timeUnitsPerSecond;
                 b2Settings.b2_linearSleepTolerance = .01 * b2Settings.b2_lengthUnitsPerMeter / b2Settings.b2_timeUnitsPerSecond;
                 b2Settings.b2_angularSleepTolerance = 2 / 180 / b2Settings.b2_timeUnitsPerSecond;
                 b2Settings.b2Assert = function(a) {
                     if (!a) {
                         var b;
                         b.x++
                     }
                 };
                 var b2Vec2 = Class.create();
                 b2Vec2.prototype = {
                     initialize: function(a, b) {
                         this.x = a;
                         this.y = b
                     },
                     SetZero: function() {
                         this.x = 0;
                         this.y = 0
                     },
                     Set: function(a, b) {
                         this.x = a;
                         this.y = b
                     },
                     SetV: function(a) {
                         this.x = a.x;
                         this.y = a.y
                     },
                     Negative: function() {
                         return new b2Vec2(-this.x, -this.y)
                     },
                     Copy: function() {
                         return new b2Vec2(this.x, this.y)
                     },
                     Add: function(a) {
                         this.x += a.x;
                         this.y += a.y
                     },
                     Subtract: function(a) {
                         this.x -= a.x;
                         this.y -= a.y
                     },
                     Multiply: function(a) {
                         this.x *= a;
                         this.y *= a
                     },
                     MulM: function(a) {
                         var b = this.x;
                         this.x = a.col1.x * b + a.col2.x * this.y;
                         this.y = a.col1.y * b + a.col2.y * this.y
                     },
                     MulTM: function(a) {
                         var b = b2Math.b2Dot(this, a.col1);
                         this.y = b2Math.b2Dot(this, a.col2);
                         this.x = b
                     },
                     CrossVF: function(a) {
                         var b = this.x;
                         this.x = a * this.y;
                         this.y = -a * b
                     },
                     CrossFV: function(a) {
                         var b = this.x;
                         this.x = -a * this.y;
                         this.y = a * b
                     },
                     MinV: function(a) {
                         this.x = this.x < a.x ? this.x : a.x;
                         this.y = this.y < a.y ? this.y : a.y
                     },
                     MaxV: function(a) {
                         this.x = this.x > a.x ? this.x : a.x;
                         this.y = this.y > a.y ? this.y : a.y
                     },
                     Abs: function() {
                         this.x = Math.abs(this.x);
                         this.y = Math.abs(this.y)
                     },
                     Length: function() {
                         return Math.sqrt(this.x * this.x + this.y * this.y)
                     },
                     Normalize: function() {
                         var a = this.Length();
                         if (a < Number.MIN_VALUE) {
                             return 0
                         }
                         var b = 1 / a;
                         this.x *= b;
                         this.y *= b;
                         return a
                     },
                     IsValid: function() {
                         return b2Math.b2IsValid(this.x) && b2Math.b2IsValid(this.y)
                     },
                     x: null,
                     y: null
                 };
                 b2Vec2.Make = function(a, b) {
                     return new b2Vec2(a, b)
                 };
                 var b2Mat22 = Class.create();
                 b2Mat22.prototype = {
                     initialize: function(a, b, c) {
                         if (a == null) a = 0;
                         this.col1 = new b2Vec2;
                         this.col2 = new b2Vec2;
                         if (b != null && c != null) {
                             this.col1.SetV(b);
                             this.col2.SetV(c)
                         }
                         else {
                             var d = Math.cos(a);
                             var e = Math.sin(a);
                             this.col1.x = d;
                             this.col2.x = -e;
                             this.col1.y = e;
                             this.col2.y = d
                         }
                     },
                     Set: function(a) {
                         var b = Math.cos(a);
                         var c = Math.sin(a);
                         this.col1.x = b;
                         this.col2.x = -c;
                         this.col1.y = c;
                         this.col2.y = b
                     },
                     SetVV: function(a, b) {
                         this.col1.SetV(a);
                         this.col2.SetV(b)
                     },
                     Copy: function() {
                         return new b2Mat22(0, this.col1, this.col2)
                     },
                     SetM: function(a) {
                         this.col1.SetV(a.col1);
                         this.col2.SetV(a.col2)
                     },
                     AddM: function(a) {
                         this.col1.x += a.col1.x;
                         this.col1.y += a.col1.y;
                         this.col2.x += a.col2.x;
                         this.col2.y += a.col2.y
                     },
                     SetIdentity: function() {
                         this.col1.x = 1;
                         this.col2.x = 0;
                         this.col1.y = 0;
                         this.col2.y = 1
                     },
                     SetZero: function() {
                         this.col1.x = 0;
                         this.col2.x = 0;
                         this.col1.y = 0;
                         this.col2.y = 0
                     },
                     Invert: function(a) {
                         var b = this.col1.x;
                         var c = this.col2.x;
                         var d = this.col1.y;
                         var e = this.col2.y;
                         var f = b * e - c * d;
                         f = 1 / f;
                         a.col1.x = f * e;
                         a.col2.x = -f * c;
                         a.col1.y = -f * d;
                         a.col2.y = f * b;
                         return a
                     },
                     Solve: function(a, b, c) {
                         var d = this.col1.x;
                         var e = this.col2.x;
                         var f = this.col1.y;
                         var g = this.col2.y;
                         var h = d * g - e * f;
                         h = 1 / h;
                         a.x = h * (g * b - e * c);
                         a.y = h * (d * c - f * b);
                         return a
                     },
                     Abs: function() {
                         this.col1.Abs();
                         this.col2.Abs()
                     },
                     col1: new b2Vec2,
                     col2: new b2Vec2
                 };
                 var b2Math = Class.create();
                 b2Math.prototype = {
                     initialize: function() {}
                 };
                 b2Math.b2IsValid = function(a) {
                     return isFinite(a)
                 };
                 b2Math.b2Dot = function(a, b) {
                     return a.x * b.x + a.y * b.y
                 };
                 b2Math.b2CrossVV = function(a, b) {
                     return a.x * b.y - a.y * b.x
                 };
                 b2Math.b2CrossVF = function(a, b) {
                     var c = new b2Vec2(b * a.y, -b * a.x);
                     return c
                 };
                 b2Math.b2CrossFV = function(a, b) {
                     var c = new b2Vec2(-a * b.y, a * b.x);
                     return c
                 };
                 b2Math.b2MulMV = function(a, b) {
                     var c = new b2Vec2(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y);
                     return c
                 };
                 b2Math.b2MulTMV = function(a, b) {
                     var c = new b2Vec2(b2Math.b2Dot(b, a.col1), b2Math.b2Dot(b, a.col2));
                     return c
                 };
                 b2Math.AddVV = function(a, b) {
                     var c = new b2Vec2(a.x + b.x, a.y + b.y);
                     return c
                 };
                 b2Math.SubtractVV = function(a, b) {
                     var c = new b2Vec2(a.x - b.x, a.y - b.y);
                     return c
                 };
                 b2Math.MulFV = function(a, b) {
                     var c = new b2Vec2(a * b.x, a * b.y);
                     return c
                 };
                 b2Math.AddMM = function(a, b) {
                     var c = new b2Mat22(0, b2Math.AddVV(a.col1, b.col1), b2Math.AddVV(a.col2, b.col2));
                     return c
                 };
                 b2Math.b2MulMM = function(a, b) {
                     var c = new b2Mat22(0, b2Math.b2MulMV(a, b.col1), b2Math.b2MulMV(a, b.col2));
                     return c
                 };
                 b2Math.b2MulTMM = function(a, b) {
                     var c = new b2Vec2(b2Math.b2Dot(a.col1, b.col1), b2Math.b2Dot(a.col2, b.col1));
                     var d = new b2Vec2(b2Math.b2Dot(a.col1, b.col2), b2Math.b2Dot(a.col2, b.col2));
                     var e = new b2Mat22(0, c, d);
                     return e
                 };
                 b2Math.b2Abs = function(a) {
                     return a > 0 ? a : -a
                 };
                 b2Math.b2AbsV = function(a) {
                     var b = new b2Vec2(b2Math.b2Abs(a.x), b2Math.b2Abs(a.y));
                     return b
                 };
                 b2Math.b2AbsM = function(a) {
                     var b = new b2Mat22(0, b2Math.b2AbsV(a.col1), b2Math.b2AbsV(a.col2));
                     return b
                 };
                 b2Math.b2Min = function(a, b) {
                     return a < b ? a : b
                 };
                 b2Math.b2MinV = function(a, b) {
                     var c = new b2Vec2(b2Math.b2Min(a.x, b.x), b2Math.b2Min(a.y, b.y));
                     return c
                 };
                 b2Math.b2Max = function(a, b) {
                     return a > b ? a : b
                 };
                 b2Math.b2MaxV = function(a, b) {
                     var c = new b2Vec2(b2Math.b2Max(a.x, b.x), b2Math.b2Max(a.y, b.y));
                     return c
                 };
                 b2Math.b2Clamp = function(a, b, c) {
                     return b2Math.b2Max(b, b2Math.b2Min(a, c))
                 };
                 b2Math.b2ClampV = function(a, b, c) {
                     return b2Math.b2MaxV(b, b2Math.b2MinV(a, c))
                 };
                 b2Math.b2Swap = function(a, b) {
                     var c = a[0];
                     a[0] = b[0];
                     b[0] = c
                 };
                 b2Math.b2Random = function() {
                     return Math.random() * 2 - 1
                 };
                 b2Math.b2NextPowerOfTwo = function(a) {
                     a |= a >> 1 & 2147483647;
                     a |= a >> 2 & 1073741823;
                     a |= a >> 4 & 268435455;
                     a |= a >> 8 & 16777215;
                     a |= a >> 16 & 65535;
                     return a + 1
                 };
                 b2Math.b2IsPowerOfTwo = function(a) {
                     var b = a > 0 && (a & a - 1) == 0;
                     return b
                 };
                 b2Math.tempVec2 = new b2Vec2;
                 b2Math.tempVec3 = new b2Vec2;
                 b2Math.tempVec4 = new b2Vec2;
                 b2Math.tempVec5 = new b2Vec2;
                 b2Math.tempMat = new b2Mat22;
                 var b2AABB = Class.create();
                 b2AABB.prototype = {
                     IsValid: function() {
                         var a = this.maxVertex.x;
                         var b = this.maxVertex.y;
                         a = this.maxVertex.x;
                         b = this.maxVertex.y;
                         a -= this.minVertex.x;
                         b -= this.minVertex.y;
                         var c = a >= 0 && b >= 0;
                         c = c && this.minVertex.IsValid() && this.maxVertex.IsValid();
                         return c
                     },
                     minVertex: new b2Vec2,
                     maxVertex: new b2Vec2,
                     initialize: function() {
                         this.minVertex = new b2Vec2;
                         this.maxVertex = new b2Vec2
                     }
                 };
                 var b2Bound = Class.create();
                 b2Bound.prototype = {
                     IsLower: function() {
                         return (this.value & 1) == 0
                     },
                     IsUpper: function() {
                         return (this.value & 1) == 1
                     },
                     Swap: function(a) {
                         var b = this.value;
                         var c = this.proxyId;
                         var d = this.stabbingCount;
                         this.value = a.value;
                         this.proxyId = a.proxyId;
                         this.stabbingCount = a.stabbingCount;
                         a.value = b;
                         a.proxyId = c;
                         a.stabbingCount = d
                     },
                     value: 0,
                     proxyId: 0,
                     stabbingCount: 0,
                     initialize: function() {}
                 };
                 var b2BoundValues = Class.create();
                 b2BoundValues.prototype = {
                     lowerValues: [0, 0],
                     upperValues: [0, 0],
                     initialize: function() {
                         this.lowerValues = [0, 0];
                         this.upperValues = [0, 0]
                     }
                 };
                 var b2Pair = Class.create();
                 b2Pair.prototype = {
                     SetBuffered: function() {
                         this.status |= b2Pair.e_pairBuffered
                     },
                     ClearBuffered: function() {
                         this.status &= ~b2Pair.e_pairBuffered
                     },
                     IsBuffered: function() {
                         return (this.status & b2Pair.e_pairBuffered) == b2Pair.e_pairBuffered
                     },
                     SetRemoved: function() {
                         this.status |= b2Pair.e_pairRemoved
                     },
                     ClearRemoved: function() {
                         this.status &= ~b2Pair.e_pairRemoved
                     },
                     IsRemoved: function() {
                         return (this.status & b2Pair.e_pairRemoved) == b2Pair.e_pairRemoved
                     },
                     SetFinal: function() {
                         this.status |= b2Pair.e_pairFinal
                     },
                     IsFinal: function() {
                         return (this.status & b2Pair.e_pairFinal) == b2Pair.e_pairFinal
                     },
                     userData: null,
                     proxyId1: 0,
                     proxyId2: 0,
                     next: 0,
                     status: 0,
                     initialize: function() {}
                 };
                 b2Pair.b2_nullPair = b2Settings.USHRT_MAX;
                 b2Pair.b2_nullProxy = b2Settings.USHRT_MAX;
                 b2Pair.b2_tableCapacity = b2Settings.b2_maxPairs;
                 b2Pair.b2_tableMask = b2Pair.b2_tableCapacity - 1;
                 b2Pair.e_pairBuffered = 1;
                 b2Pair.e_pairRemoved = 2;
                 b2Pair.e_pairFinal = 4;
                 var b2PairCallback = Class.create();
                 b2PairCallback.prototype = {
                     PairAdded: function(a, b) {
                         return null
                     },
                     PairRemoved: function(a, b, c) {},
                     initialize: function() {}
                 };
                 var b2BufferedPair = Class.create();
                 b2BufferedPair.prototype = {
                     proxyId1: 0,
                     proxyId2: 0,
                     initialize: function() {}
                 };
                 var b2PairManager = Class.create();
                 b2PairManager.prototype = {
                     initialize: function() {
                         var a = 0;
                         this.m_hashTable = new Array(b2Pair.b2_tableCapacity);
                         for (a = 0; a < b2Pair.b2_tableCapacity; ++a) {
                             this.m_hashTable[a] = b2Pair.b2_nullPair
                         }
                         this.m_pairs = new Array(b2Settings.b2_maxPairs);
                         for (a = 0; a < b2Settings.b2_maxPairs; ++a) {
                             this.m_pairs[a] = new b2Pair
                         }
                         this.m_pairBuffer = new Array(b2Settings.b2_maxPairs);
                         for (a = 0; a < b2Settings.b2_maxPairs; ++a) {
                             this.m_pairBuffer[a] = new b2BufferedPair
                         }
                         for (a = 0; a < b2Settings.b2_maxPairs; ++a) {
                             this.m_pairs[a].proxyId1 = b2Pair.b2_nullProxy;
                             this.m_pairs[a].proxyId2 = b2Pair.b2_nullProxy;
                             this.m_pairs[a].userData = null;
                             this.m_pairs[a].status = 0;
                             this.m_pairs[a].next = a + 1
                         }
                         this.m_pairs[b2Settings.b2_maxPairs - 1].next = b2Pair.b2_nullPair;
                         this.m_pairCount = 0
                     },
                     Initialize: function(a, b) {
                         this.m_broadPhase = a;
                         this.m_callback = b
                     },
                     AddBufferedPair: function(a, b) {
                         var c = this.AddPair(a, b);
                         if (c.IsBuffered() == false) {
                             c.SetBuffered();
                             this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1;
                             this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2;
                             ++this.m_pairBufferCount
                         }
                         c.ClearRemoved();
                         if (b2BroadPhase.s_validate) {
                             this.ValidateBuffer()
                         }
                     },
                     RemoveBufferedPair: function(a, b) {
                         var c = this.Find(a, b);
                         if (c == null) {
                             return
                         }
                         if (c.IsBuffered() == false) {
                             c.SetBuffered();
                             this.m_pairBuffer[this.m_pairBufferCount].proxyId1 = c.proxyId1;
                             this.m_pairBuffer[this.m_pairBufferCount].proxyId2 = c.proxyId2;
                             ++this.m_pairBufferCount
                         }
                         c.SetRemoved();
                         if (b2BroadPhase.s_validate) {
                             this.ValidateBuffer()
                         }
                     },
                     Commit: function() {
                         var a = 0;
                         var b = 0;
                         var c = this.m_broadPhase.m_proxyPool;
                         for (a = 0; a < this.m_pairBufferCount; ++a) {
                             var d = this.Find(this.m_pairBuffer[a].proxyId1, this.m_pairBuffer[a].proxyId2);
                             d.ClearBuffered();
                             var e = c[d.proxyId1];
                             var f = c[d.proxyId2];
                             if (d.IsRemoved()) {
                                 if (d.IsFinal() == true) {
                                     this.m_callback.PairRemoved(e.userData, f.userData, d.userData)
                                 }
                                 this.m_pairBuffer[b].proxyId1 = d.proxyId1;
                                 this.m_pairBuffer[b].proxyId2 = d.proxyId2;
                                 ++b
                             }
                             else {
                                 if (d.IsFinal() == false) {
                                     d.userData = this.m_callback.PairAdded(e.userData, f.userData);
                                     d.SetFinal()
                                 }
                             }
                         }
                         for (a = 0; a < b; ++a) {
                             this.RemovePair(this.m_pairBuffer[a].proxyId1, this.m_pairBuffer[a].proxyId2)
                         }
                         this.m_pairBufferCount = 0;
                         if (b2BroadPhase.s_validate) {
                             this.ValidateTable()
                         }
                     },
                     AddPair: function(a, b) {
                         if (a > b) {
                             var c = a;
                             a = b;
                             b = c
                         }
                         var d = b2PairManager.Hash(a, b) & b2Pair.b2_tableMask;
                         var e = e = this.FindHash(a, b, d);
                         if (e != null) {
                             return e
                         }
                         var f = this.m_freePair;
                         e = this.m_pairs[f];
                         this.m_freePair = e.next;
                         e.proxyId1 = a;
                         e.proxyId2 = b;
                         e.status = 0;
                         e.userData = null;
                         e.next = this.m_hashTable[d];
                         this.m_hashTable[d] = f;
                         ++this.m_pairCount;
                         return e
                     },
                     RemovePair: function(a, b) {
                         if (a > b) {
                             var c = a;
                             a = b;
                             b = c
                         }
                         var d = b2PairManager.Hash(a, b) & b2Pair.b2_tableMask;
                         var e = this.m_hashTable[d];
                         var f = null;
                         while (e != b2Pair.b2_nullPair) {
                             if (b2PairManager.Equals(this.m_pairs[e], a, b)) {
                                 var g = e;
                                 if (f) {
                                     f.next = this.m_pairs[e].next
                                 }
                                 else {
                                     this.m_hashTable[d] = this.m_pairs[e].next
                                 }
                                 var h = this.m_pairs[g];
                                 var i = h.userData;
                                 h.next = this.m_freePair;
                                 h.proxyId1 = b2Pair.b2_nullProxy;
                                 h.proxyId2 = b2Pair.b2_nullProxy;
                                 h.userData = null;
                                 h.status = 0;
                                 this.m_freePair = g;
                                 --this.m_pairCount;
                                 return i
                             }
                             else {
                                 f = this.m_pairs[e];
                                 e = f.next
                             }
                         }
                         return null
                     },
                     Find: function(a, b) {
                         if (a > b) {
                             var c = a;
                             a = b;
                             b = c
                         }
                         var d = b2PairManager.Hash(a, b) & b2Pair.b2_tableMask;
                         return this.FindHash(a, b, d)
                     },
                     FindHash: function(a, b, c) {
                         var d = this.m_hashTable[c];
                         while (d != b2Pair.b2_nullPair && b2PairManager.Equals(this.m_pairs[d], a, b) == false) {
                             d = this.m_pairs[d].next
                         }
                         if (d == b2Pair.b2_nullPair) {
                             return null
                         }
                         return this.m_pairs[d]
                     },
                     ValidateBuffer: function() {},
                     ValidateTable: function() {},
                     m_broadPhase: null,
                     m_callback: null,
                     m_pairs: null,
                     m_freePair: 0,
                     m_pairCount: 0,
                     m_pairBuffer: null,
                     m_pairBufferCount: 0,
                     m_hashTable: null
                 };
                 b2PairManager.Hash = function(a, b) {
                     var c = b << 16 & 4294901760 | a;
                     c = ~c + (c << 15 & 4294934528);
                     c = c ^ c >> 12 & 1048575;
                     c = c + (c << 2 & 4294967292);
                     c = c ^ c >> 4 & 268435455;
                     c = c * 2057;
                     c = c ^ c >> 16 & 65535;
                     return c
                 };
                 b2PairManager.Equals = function(a, b, c) {
                     return a.proxyId1 == b && a.proxyId2 == c
                 };
                 b2PairManager.EqualsPair = function(a, b) {
                     return a.proxyId1 == b.proxyId1 && a.proxyId2 == b.proxyId2
                 };
                 var b2BroadPhase = Class.create();
                 b2BroadPhase.prototype = {
                     initialize: function(a, b) {
                         this.m_pairManager = new b2PairManager;
                         this.m_proxyPool = new Array(b2Settings.b2_maxPairs);
                         this.m_bounds = new Array(2 * b2Settings.b2_maxProxies);
                         this.m_queryResults = new Array(b2Settings.b2_maxProxies);
                         this.m_quantizationFactor = new b2Vec2;
                         var c = 0;
                         this.m_pairManager.Initialize(this, b);
                         this.m_worldAABB = a;
                         this.m_proxyCount = 0;
                         for (c = 0; c < b2Settings.b2_maxProxies; c++) {
                             this.m_queryResults[c] = 0
                         }
                         this.m_bounds = new Array(2);
                         for (c = 0; c < 2; c++) {
                             this.m_bounds[c] = new Array(2 * b2Settings.b2_maxProxies);
                             for (var d = 0; d < 2 * b2Settings.b2_maxProxies; d++) {
                                 this.m_bounds[c][d] = new b2Bound
                             }
                         }
                         var e = a.maxVertex.x;
                         var f = a.maxVertex.y;
                         e -= a.minVertex.x;
                         f -= a.minVertex.y;
                         this.m_quantizationFactor.x = b2Settings.USHRT_MAX / e;
                         this.m_quantizationFactor.y = b2Settings.USHRT_MAX / f;
                         var g;
                         for (c = 0; c < b2Settings.b2_maxProxies - 1; ++c) {
                             g = new b2Proxy;
                             this.m_proxyPool[c] = g;
                             g.SetNext(c + 1);
                             g.timeStamp = 0;
                             g.overlapCount = b2BroadPhase.b2_invalid;
                             g.userData = null
                         }
                         g = new b2Proxy;
                         this.m_proxyPool[b2Settings.b2_maxProxies - 1] = g;
                         g.SetNext(b2Pair.b2_nullProxy);
                         g.timeStamp = 0;
                         g.overlapCount = b2BroadPhase.b2_invalid;
                         g.userData = null;
                         this.m_freeProxy = 0;
                         this.m_timeStamp = 1;
                         this.m_queryResultCount = 0
                     },
                     InRange: function(a) {
                         var b;
                         var c;
                         var d;
                         var e;
                         b = a.minVertex.x;
                         c = a.minVertex.y;
                         b -= this.m_worldAABB.maxVertex.x;
                         c -= this.m_worldAABB.maxVertex.y;
                         d = this.m_worldAABB.minVertex.x;
                         e = this.m_worldAABB.minVertex.y;
                         d -= a.maxVertex.x;
                         e -= a.maxVertex.y;
                         b = b2Math.b2Max(b, d);
                         c = b2Math.b2Max(c, e);
                         return b2Math.b2Max(b, c) < 0
                     },
                     GetProxy: function(a) {
                         if (a == b2Pair.b2_nullProxy || this.m_proxyPool[a].IsValid() == false) {
                             return null
                         }
                         return this.m_proxyPool[a]
                     },
                     CreateProxy: function(a, b) {
                         var c = 0;
                         var d;
                         var e = this.m_freeProxy;
                         d = this.m_proxyPool[e];
                         this.m_freeProxy = d.GetNext();
                         d.overlapCount = 0;
                         d.userData = b;
                         var f = 2 * this.m_proxyCount;
                         var g = new Array;
                         var h = new Array;
                         this.ComputeBounds(g, h, a);
                         for (var i = 0; i < 2; ++i) {
                             var j = this.m_bounds[i];
                             var k = 0;
                             var l = 0;
                             var m = [k];
                             var n = [l];
                             this.Query(m, n, g[i], h[i], j, f, i);
                             k = m[0];
                             l = n[0];
                             var o = new Array;
                             var p = 0;
                             var q = f - l;
                             var r;
                             var s;
                             for (p = 0; p < q; p++) {
                                 o[p] = new b2Bound;
                                 r = o[p];
                                 s = j[l + p];
                                 r.value = s.value;
                                 r.proxyId = s.proxyId;
                                 r.stabbingCount = s.stabbingCount
                             }
                             q = o.length;
                             var t = l + 2;
                             for (p = 0; p < q; p++) {
                                 s = o[p];
                                 r = j[t + p];
                                 r.value = s.value;
                                 r.proxyId = s.proxyId;
                                 r.stabbingCount = s.stabbingCount
                             }
                             o = new Array;
                             q = l - k;
                             for (p = 0; p < q; p++) {
                                 o[p] = new b2Bound;
                                 r = o[p];
                                 s = j[k + p];
                                 r.value = s.value;
                                 r.proxyId = s.proxyId;
                                 r.stabbingCount = s.stabbingCount
                             }
                             q = o.length;
                             t = k + 1;
                             for (p = 0; p < q; p++) {
                                 s = o[p];
                                 r = j[t + p];
                                 r.value = s.value;
                                 r.proxyId = s.proxyId;
                                 r.stabbingCount = s.stabbingCount
                             }++l;
                             j[k].value = g[i];
                             j[k].proxyId = e;
                             j[l].value = h[i];
                             j[l].proxyId = e;
                             j[k].stabbingCount = k == 0 ? 0 : j[k - 1].stabbingCount;
                             j[l].stabbingCount = j[l - 1].stabbingCount;
                             for (c = k; c < l; ++c) {
                                 j[c].stabbingCount++
                             }
                             for (c = k; c < f + 2; ++c) {
                                 var u = this.m_proxyPool[j[c].proxyId];
                                 if (j[c].IsLower()) {
                                     u.lowerBounds[i] = c
                                 }
                                 else {
                                     u.upperBounds[i] = c
                                 }
                             }
                         }++this.m_proxyCount;
                         for (var v = 0; v < this.m_queryResultCount; ++v) {
                             this.m_pairManager.AddBufferedPair(e, this.m_queryResults[v])
                         }
                         this.m_pairManager.Commit();
                         this.m_queryResultCount = 0;
                         this.IncrementTimeStamp();
                         return e
                     },
                     DestroyProxy: function(a) {
                         var b = this.m_proxyPool[a];
                         var c = 2 * this.m_proxyCount;
                         for (var d = 0; d < 2; ++d) {
                             var e = this.m_bounds[d];
                             var f = b.lowerBounds[d];
                             var g = b.upperBounds[d];
                             var h = e[f].value;
                             var i = e[g].value;
                             var j = new Array;
                             var k = 0;
                             var l = g - f - 1;
                             var m;
                             var n;
                             for (k = 0; k < l; k++) {
                                 j[k] = new b2Bound;
                                 m = j[k];
                                 n = e[f + 1 + k];
                                 m.value = n.value;
                                 m.proxyId = n.proxyId;
                                 m.stabbingCount = n.stabbingCount
                             }
                             l = j.length;
                             var o = f;
                             for (k = 0; k < l; k++) {
                                 n = j[k];
                                 m = e[o + k];
                                 m.value = n.value;
                                 m.proxyId = n.proxyId;
                                 m.stabbingCount = n.stabbingCount
                             }
                             j = new Array;
                             l = c - g - 1;
                             for (k = 0; k < l; k++) {
                                 j[k] = new b2Bound;
                                 m = j[k];
                                 n = e[g + 1 + k];
                                 m.value = n.value;
                                 m.proxyId = n.proxyId;
                                 m.stabbingCount = n.stabbingCount
                             }
                             l = j.length;
                             o = g - 1;
                             for (k = 0; k < l; k++) {
                                 n = j[k];
                                 m = e[o + k];
                                 m.value = n.value;
                                 m.proxyId = n.proxyId;
                                 m.stabbingCount = n.stabbingCount
                             }
                             l = c - 2;
                             for (var p = f; p < l; ++p) {
                                 var q = this.m_proxyPool[e[p].proxyId];
                                 if (e[p].IsLower()) {
                                     q.lowerBounds[d] = p
                                 }
                                 else {
                                     q.upperBounds[d] = p
                                 }
                             }
                             l = g - 1;
                             for (var r = f; r < l; ++r) {
                                 e[r].stabbingCount--
                             }
                             this.Query([0], [0], h, i, e, c - 2, d)
                         }
                         for (var s = 0; s < this.m_queryResultCount; ++s) {
                             this.m_pairManager.RemoveBufferedPair(a, this.m_queryResults[s])
                         }
                         this.m_pairManager.Commit();
                         this.m_queryResultCount = 0;
                         this.IncrementTimeStamp();
                         b.userData = null;
                         b.overlapCount = b2BroadPhase.b2_invalid;
                         b.lowerBounds[0] = b2BroadPhase.b2_invalid;
                         b.lowerBounds[1] = b2BroadPhase.b2_invalid;
                         b.upperBounds[0] = b2BroadPhase.b2_invalid;
                         b.upperBounds[1] = b2BroadPhase.b2_invalid;
                         b.SetNext(this.m_freeProxy);
                         this.m_freeProxy = a;
                         --this.m_proxyCount
                     },
                     MoveProxy: function(a, b) {
                         var c = 0;
                         var d = 0;
                         var e;
                         var f;
                         var g;
                         var h = 0;
                         var i;
                         if (a == b2Pair.b2_nullProxy || b2Settings.b2_maxProxies <= a) {
                             return
                         }
                         if (b.IsValid() == false) {
                             return
                         }
                         var j = 2 * this.m_proxyCount;
                         var k = this.m_proxyPool[a];
                         var l = new b2BoundValues;
                         this.ComputeBounds(l.lowerValues, l.upperValues, b);
                         var m = new b2BoundValues;
                         for (c = 0; c < 2; ++c) {
                             m.lowerValues[c] = this.m_bounds[c][k.lowerBounds[c]].value;
                             m.upperValues[c] = this.m_bounds[c][k.upperBounds[c]].value
                         }
                         for (c = 0; c < 2; ++c) {
                             var n = this.m_bounds[c];
                             var o = k.lowerBounds[c];
                             var p = k.upperBounds[c];
                             var q = l.lowerValues[c];
                             var r = l.upperValues[c];
                             var s = q - n[o].value;
                             var t = r - n[p].value;
                             n[o].value = q;
                             n[p].value = r;
                             if (s < 0) {
                                 d = o;
                                 while (d > 0 && q < n[d - 1].value) {
                                     e = n[d];
                                     f = n[d - 1];
                                     var u = f.proxyId;
                                     var v = this.m_proxyPool[f.proxyId];
                                     f.stabbingCount++;
                                     if (f.IsUpper() == true) {
                                         if (this.TestOverlap(l, v)) {
                                             this.m_pairManager.AddBufferedPair(a, u)
                                         }
                                         v.upperBounds[c]++;
                                         e.stabbingCount++
                                     }
                                     else {
                                         v.lowerBounds[c]++;
                                         e.stabbingCount--
                                     }
                                     k.lowerBounds[c]--;
                                     e.Swap(f);
                                     --d
                                 }
                             }
                             if (t > 0) {
                                 d = p;
                                 while (d < j - 1 && n[d + 1].value <= r) {
                                     e = n[d];
                                     g = n[d + 1];
                                     h = g.proxyId;
                                     i = this.m_proxyPool[h];
                                     g.stabbingCount++;
                                     if (g.IsLower() == true) {
                                         if (this.TestOverlap(l, i)) {
                                             this.m_pairManager.AddBufferedPair(a, h)
                                         }
                                         i.lowerBounds[c]--;
                                         e.stabbingCount++
                                     }
                                     else {
                                         i.upperBounds[c]--;
                                         e.stabbingCount--
                                     }
                                     k.upperBounds[c]++;
                                     e.Swap(g);
                                     d++
                                 }
                             }
                             if (s > 0) {
                                 d = o;
                                 while (d < j - 1 && n[d + 1].value <= q) {
                                     e = n[d];
                                     g = n[d + 1];
                                     h = g.proxyId;
                                     i = this.m_proxyPool[h];
                                     g.stabbingCount--;
                                     if (g.IsUpper()) {
                                         if (this.TestOverlap(m, i)) {
                                             this.m_pairManager.RemoveBufferedPair(a, h)
                                         }
                                         i.upperBounds[c]--;
                                         e.stabbingCount--
                                     }
                                     else {
                                         i.lowerBounds[c]--;
                                         e.stabbingCount++
                                     }
                                     k.lowerBounds[c]++;
                                     e.Swap(g);
                                     d++
                                 }
                             }
                             if (t < 0) {
                                 d = p;
                                 while (d > 0 && r < n[d - 1].value) {
                                     e = n[d];
                                     f = n[d - 1];
                                     u = f.proxyId;
                                     v = this.m_proxyPool[u];
                                     f.stabbingCount--;
                                     if (f.IsLower() == true) {
                                         if (this.TestOverlap(m, v)) {
                                             this.m_pairManager.RemoveBufferedPair(a, u)
                                         }
                                         v.lowerBounds[c]++;
                                         e.stabbingCount--
                                     }
                                     else {
                                         v.upperBounds[c]++;
                                         e.stabbingCount++
                                     }
                                     k.upperBounds[c]--;
                                     e.Swap(f);
                                     d--
                                 }
                             }
                         }
                     },
                     Commit: function() {
                         this.m_pairManager.Commit()
                     },
                     QueryAABB: function(a, b, c) {
                         var d = new Array;
                         var e = new Array;
                         this.ComputeBounds(d, e, a);
                         var f = 0;
                         var g = 0;
                         var h = [f];
                         var i = [g];
                         this.Query(h, i, d[0], e[0], this.m_bounds[0], 2 * this.m_proxyCount, 0);
                         this.Query(h, i, d[1], e[1], this.m_bounds[1], 2 * this.m_proxyCount, 1);
                         var j = 0;
                         for (var k = 0; k < this.m_queryResultCount && j < c; ++k, ++j) {
                             var l = this.m_proxyPool[this.m_queryResults[k]];
                             b[k] = l.userData
                         }
                         this.m_queryResultCount = 0;
                         this.IncrementTimeStamp();
                         return j
                     },
                     Validate: function() {
                         var a;
                         var b;
                         var c;
                         var d;
                         for (var e = 0; e < 2; ++e) {
                             var f = this.m_bounds[e];
                             var g = 2 * this.m_proxyCount;
                             var h = 0;
                             for (var i = 0; i < g; ++i) {
                                 var j = f[i];
                                 if (j.IsLower() == true) {
                                     h++
                                 }
                                 else {
                                     h--
                                 }
                             }
                         }
                     },
                     ComputeBounds: function(a, b, c) {
                         var d = c.minVertex.x;
                         var e = c.minVertex.y;
                         d = b2Math.b2Min(d, this.m_worldAABB.maxVertex.x);
                         e = b2Math.b2Min(e, this.m_worldAABB.maxVertex.y);
                         d = b2Math.b2Max(d, this.m_worldAABB.minVertex.x);
                         e = b2Math.b2Max(e, this.m_worldAABB.minVertex.y);
                         var f = c.maxVertex.x;
                         var g = c.maxVertex.y;
                         f = b2Math.b2Min(f, this.m_worldAABB.maxVertex.x);
                         g = b2Math.b2Min(g, this.m_worldAABB.maxVertex.y);
                         f = b2Math.b2Max(f, this.m_worldAABB.minVertex.x);
                         g = b2Math.b2Max(g, this.m_worldAABB.minVertex.y);
                         a[0] = this.m_quantizationFactor.x * (d - this.m_worldAABB.minVertex.x) & b2Settings.USHRT_MAX - 1;
                         b[0] = this.m_quantizationFactor.x * (f - this.m_worldAABB.minVertex.x) & 65535 | 1;
                         a[1] = this.m_quantizationFactor.y * (e - this.m_worldAABB.minVertex.y) & b2Settings.USHRT_MAX - 1;
                         b[1] = this.m_quantizationFactor.y * (g - this.m_worldAABB.minVertex.y) & 65535 | 1
                     },
                     TestOverlapValidate: function(a, b) {
                         for (var c = 0; c < 2; ++c) {
                             var d = this.m_bounds[c];
                             if (d[a.lowerBounds[c]].value > d[b.upperBounds[c]].value) return false;
                             if (d[a.upperBounds[c]].value < d[b.lowerBounds[c]].value) return false
                         }
                         return true
                     },
                     TestOverlap: function(a, b) {
                         for (var c = 0; c < 2; ++c) {
                             var d = this.m_bounds[c];
                             if (a.lowerValues[c] > d[b.upperBounds[c]].value) return false;
                             if (a.upperValues[c] < d[b.lowerBounds[c]].value) return false
                         }
                         return true
                     },
                     Query: function(a, b, c, d, e, f, g) {
                         var h = b2BroadPhase.BinarySearch(e, f, c);
                         var i = b2BroadPhase.BinarySearch(e, f, d);
                         for (var j = h; j < i; ++j) {
                             if (e[j].IsLower()) {
                                 this.IncrementOverlapCount(e[j].proxyId)
                             }
                         }
                         if (h > 0) {
                             var k = h - 1;
                             var l = e[k].stabbingCount;
                             while (l) {
                                 if (e[k].IsLower()) {
                                     var m = this.m_proxyPool[e[k].proxyId];
                                     if (h <= m.upperBounds[g]) {
                                         this.IncrementOverlapCount(e[k].proxyId);
                                         --l
                                     }
                                 }--k
                             }
                         }
                         a[0] = h;
                         b[0] = i
                     },
                     IncrementOverlapCount: function(a) {
                         var b = this.m_proxyPool[a];
                         if (b.timeStamp < this.m_timeStamp) {
                             b.timeStamp = this.m_timeStamp;
                             b.overlapCount = 1
                         }
                         else {
                             b.overlapCount = 2;
                             this.m_queryResults[this.m_queryResultCount] = a;
                             ++this.m_queryResultCount
                         }
                     },
                     IncrementTimeStamp: function() {
                         if (this.m_timeStamp == b2Settings.USHRT_MAX) {
                             for (var a = 0; a < b2Settings.b2_maxProxies; ++a) {
                                 this.m_proxyPool[a].timeStamp = 0
                             }
                             this.m_timeStamp = 1
                         }
                         else {
                             ++this.m_timeStamp
                         }
                     },
                     m_pairManager: new b2PairManager,
                     m_proxyPool: new Array(b2Settings.b2_maxPairs),
                     m_freeProxy: 0,
                     m_bounds: new Array(2 * b2Settings.b2_maxProxies),
                     m_queryResults: new Array(b2Settings.b2_maxProxies),
                     m_queryResultCount: 0,
                     m_worldAABB: null,
                     m_quantizationFactor: new b2Vec2,
                     m_proxyCount: 0,
                     m_timeStamp: 0
                 };
                 b2BroadPhase.s_validate = false;
                 b2BroadPhase.b2_invalid = b2Settings.USHRT_MAX;
                 b2BroadPhase.b2_nullEdge = b2Settings.USHRT_MAX;
                 b2BroadPhase.BinarySearch = function(a, b, c) {
                     var d = 0;
                     var e = b - 1;
                     while (d <= e) {
                         var f = Math.floor((d + e) / 2);
                         if (a[f].value > c) {
                             e = f - 1
                         }
                         else if (a[f].value < c) {
                             d = f + 1
                         }
                         else {
                             return f
                         }
                     }
                     return d
                 };
                 var b2Collision = Class.create();
                 b2Collision.prototype = {
                     initialize: function() {}
                 };
                 b2Collision.b2_nullFeature = 255;
                 b2Collision.ClipSegmentToLine = function(a, b, c, d) {
                     var e = 0;
                     var f = b[0].v;
                     var g = b[1].v;
                     var h = b2Math.b2Dot(c, b[0].v) - d;
                     var i = b2Math.b2Dot(c, b[1].v) - d;
                     if (h <= 0) a[e++] = b[0];
                     if (i <= 0) a[e++] = b[1];
                     if (h * i < 0) {
                         var j = h / (h - i);
                         var k = a[e].v;
                         k.x = f.x + j * (g.x - f.x);
                         k.y = f.y + j * (g.y - f.y);
                         if (h > 0) {
                             a[e].id = b[0].id
                         }
                         else {
                             a[e].id = b[1].id
                         }++e
                     }
                     return e
                 };
                 b2Collision.EdgeSeparation = function(a, b, c) {
                     var d = a.m_vertices;
                     var e = c.m_vertexCount;
                     var f = c.m_vertices;
                     var g = a.m_normals[b].x;
                     var h = a.m_normals[b].y;
                     var i = g;
                     var j = a.m_R;
                     g = j.col1.x * i + j.col2.x * h;
                     h = j.col1.y * i + j.col2.y * h;
                     var k = g;
                     var l = h;
                     j = c.m_R;
                     i = k * j.col1.x + l * j.col1.y;
                     l = k * j.col2.x + l * j.col2.y;
                     k = i;
                     var m = 0;
                     var n = Number.MAX_VALUE;
                     for (var o = 0; o < e; ++o) {
                         var p = f[o];
                         var q = p.x * k + p.y * l;
                         if (q < n) {
                             n = q;
                             m = o
                         }
                     }
                     j = a.m_R;
                     var r = a.m_position.x + (j.col1.x * d[b].x + j.col2.x * d[b].y);
                     var s = a.m_position.y + (j.col1.y * d[b].x + j.col2.y * d[b].y);
                     j = c.m_R;
                     var t = c.m_position.x + (j.col1.x * f[m].x + j.col2.x * f[m].y);
                     var u = c.m_position.y + (j.col1.y * f[m].x + j.col2.y * f[m].y);
                     t -= r;
                     u -= s;
                     var v = t * g + u * h;
                     return v
                 };
                 b2Collision.FindMaxSeparation = function(a, b, c, d) {
                     var e = b.m_vertexCount;
                     var f = c.m_position.x - b.m_position.x;
                     var g = c.m_position.y - b.m_position.y;
                     var h = f * b.m_R.col1.x + g * b.m_R.col1.y;
                     var i = f * b.m_R.col2.x + g * b.m_R.col2.y;
                     var j = 0;
                     var k = -Number.MAX_VALUE;
                     for (var l = 0; l < e; ++l) {
                         var m = b.m_normals[l].x * h + b.m_normals[l].y * i;
                         if (m > k) {
                             k = m;
                             j = l
                         }
                     }
                     var n = b2Collision.EdgeSeparation(b, j, c);
                     if (n > 0 && d == false) {
                         return n
                     }
                     var o = j - 1 >= 0 ? j - 1 : e - 1;
                     var p = b2Collision.EdgeSeparation(b, o, c);
                     if (p > 0 && d == false) {
                         return p
                     }
                     var q = j + 1 < e ? j + 1 : 0;
                     var r = b2Collision.EdgeSeparation(b, q, c);
                     if (r > 0 && d == false) {
                         return r
                     }
                     var s = 0;
                     var t;
                     var u = 0;
                     if (p > n && p > r) {
                         u = -1;
                         s = o;
                         t = p
                     }
                     else if (r > n) {
                         u = 1;
                         s = q;
                         t = r
                     }
                     else {
                         a[0] = j;
                         return n
                     }
                     while (true) {
                         if (u == -1) j = s - 1 >= 0 ? s - 1 : e - 1;
                         else j = s + 1 < e ? s + 1 : 0;
                         n = b2Collision.EdgeSeparation(b, j, c);
                         if (n > 0 && d == false) {
                             return n
                         }
                         if (n > t) {
                             s = j;
                             t = n
                         }
                         else {
                             break
                         }
                     }
                     a[0] = s;
                     return t
                 };
                 b2Collision.FindIncidentEdge = function(a, b, c, d) {
                     var e = b.m_vertexCount;
                     var f = b.m_vertices;
                     var g = d.m_vertexCount;
                     var h = d.m_vertices;
                     var i = c;
                     var j = c + 1 == e ? 0 : c + 1;
                     var k = f[j];
                     var l = k.x;
                     var m = k.y;
                     k = f[i];
                     l -= k.x;
                     m -= k.y;
                     var n = l;
                     l = m;
                     m = -n;
                     var o = 1 / Math.sqrt(l * l + m * m);
                     l *= o;
                     m *= o;
                     var p = l;
                     var q = m;
                     n = p;
                     var r = b.m_R;
                     p = r.col1.x * n + r.col2.x * q;
                     q = r.col1.y * n + r.col2.y * q;
                     var s = p;
                     var t = q;
                     r = d.m_R;
                     n = s * r.col1.x + t * r.col1.y;
                     t = s * r.col2.x + t * r.col2.y;
                     s = n;
                     var u = 0;
                     var v = 0;
                     var w = Number.MAX_VALUE;
                     for (var x = 0; x < g; ++x) {
                         var y = x;
                         var z = x + 1 < g ? x + 1 : 0;
                         k = h[z];
                         var A = k.x;
                         var B = k.y;
                         k = h[y];
                         A -= k.x;
                         B -= k.y;
                         n = A;
                         A = B;
                         B = -n;
                         o = 1 / Math.sqrt(A * A + B * B);
                         A *= o;
                         B *= o;
                         var C = A * s + B * t;
                         if (C < w) {
                             w = C;
                             u = y;
                             v = z
                         }
                     }
                     var D;
                     D = a[0];
                     k = D.v;
                     k.SetV(h[u]);
                     k.MulM(d.m_R);
                     k.Add(d.m_position);
                     D.id.features.referenceFace = c;
                     D.id.features.incidentEdge = u;
                     D.id.features.incidentVertex = u;
                     D = a[1];
                     k = D.v;
                     k.SetV(h[v]);
                     k.MulM(d.m_R);
                     k.Add(d.m_position);
                     D.id.features.referenceFace = c;
                     D.id.features.incidentEdge = u;
                     D.id.features.incidentVertex = v
                 };
                 b2Collision.b2CollidePolyTempVec = new b2Vec2;
                 b2Collision.b2CollidePoly = function(a, b, c, d) {
                     a.pointCount = 0;
                     var e = 0;
                     var f = [e];
                     var g = b2Collision.FindMaxSeparation(f, b, c, d);
                     e = f[0];
                     if (g > 0 && d == false) return;
                     var h = 0;
                     var i = [h];
                     var j = b2Collision.FindMaxSeparation(i, c, b, d);
                     h = i[0];
                     if (j > 0 && d == false) return;
                     var k;
                     var l;
                     var m = 0;
                     var n = 0;
                     var o = .98;
                     var p = .001;
                     if (j > o * g + p) {
                         k = c;
                         l = b;
                         m = h;
                         n = 1
                     }
                     else {
                         k = b;
                         l = c;
                         m = e;
                         n = 0
                     }
                     var q = [new ClipVertex, new ClipVertex];
                     b2Collision.FindIncidentEdge(q, k, m, l);
                     var r = k.m_vertexCount;
                     var s = k.m_vertices;
                     var t = s[m];
                     var u = m + 1 < r ? s[m + 1] : s[0];
                     var v = u.x - t.x;
                     var w = u.y - t.y;
                     var x = u.x - t.x;
                     var y = u.y - t.y;
                     var z = x;
                     var A = k.m_R;
                     x = A.col1.x * z + A.col2.x * y;
                     y = A.col1.y * z + A.col2.y * y;
                     var B = 1 / Math.sqrt(x * x + y * y);
                     x *= B;
                     y *= B;
                     var C = x;
                     var D = y;
                     z = C;
                     C = D;
                     D = -z;
                     var E = t.x;
                     var F = t.y;
                     z = E;
                     A = k.m_R;
                     E = A.col1.x * z + A.col2.x * F;
                     F = A.col1.y * z + A.col2.y * F;
                     E += k.m_position.x;
                     F += k.m_position.y;
                     var G = u.x;
                     var H = u.y;
                     z = G;
                     A = k.m_R;
                     G = A.col1.x * z + A.col2.x * H;
                     H = A.col1.y * z + A.col2.y * H;
                     G += k.m_position.x;
                     H += k.m_position.y;
                     var I = C * E + D * F;
                     var J = -(x * E + y * F);
                     var K = x * G + y * H;
                     var L = [new ClipVertex, new ClipVertex];
                     var M = [new ClipVertex, new ClipVertex];
                     var N = 0;
                     b2Collision.b2CollidePolyTempVec.Set(-x, -y);
                     N = b2Collision.ClipSegmentToLine(L, q, b2Collision.b2CollidePolyTempVec, J);
                     if (N < 2) return;
                     b2Collision.b2CollidePolyTempVec.Set(x, y);
                     N = b2Collision.ClipSegmentToLine(M, L, b2Collision.b2CollidePolyTempVec, K);
                     if (N < 2) return;
                     if (n) {
                         a.normal.Set(-C, -D)
                     }
                     else {
                         a.normal.Set(C, D)
                     }
                     var O = 0;
                     for (var P = 0; P < b2Settings.b2_maxManifoldPoints; ++P) {
                         var Q = M[P].v;
                         var R = C * Q.x + D * Q.y - I;
                         if (R <= 0 || d == true) {
                             var S = a.points[O];
                             S.separation = R;
                             S.position.SetV(M[P].v);
                             S.id.Set(M[P].id);
                             S.id.features.flip = n;
                             ++O
                         }
                     }
                     a.pointCount = O
                 };
                 b2Collision.b2CollideCircle = function(a, b, c, d) {
                     a.pointCount = 0;
                     var e = c.m_position.x - b.m_position.x;
                     var f = c.m_position.y - b.m_position.y;
                     var g = e * e + f * f;
                     var h = b.m_radius + c.m_radius;
                     if (g > h * h && d == false) {
                         return
                     }
                     var i;
                     if (g < Number.MIN_VALUE) {
                         i = -h;
                         a.normal.Set(0, 1)
                     }
                     else {
                         var j = Math.sqrt(g);
                         i = j - h;
                         var k = 1 / j;
                         a.normal.x = k * e;
                         a.normal.y = k * f
                     }
                     a.pointCount = 1;
                     var l = a.points[0];
                     l.id.set_key(0);
                     l.separation = i;
                     l.position.x = c.m_position.x - c.m_radius * a.normal.x;
                     l.position.y = c.m_position.y - c.m_radius * a.normal.y
                 };
                 b2Collision.b2CollidePolyAndCircle = function(a, b, c, d) {
                     a.pointCount = 0;
                     var e;
                     var f;
                     var g;
                     var h = c.m_position.x - b.m_position.x;
                     var i = c.m_position.y - b.m_position.y;
                     var j = b.m_R;
                     var k = h * j.col1.x + i * j.col1.y;
                     i = h * j.col2.x + i * j.col2.y;
                     h = k;
                     var l;
                     var m = 0;
                     var n = -Number.MAX_VALUE;
                     var o = c.m_radius;
                     for (var p = 0; p < b.m_vertexCount; ++p) {
                         var q = b.m_normals[p].x * (h - b.m_vertices[p].x) + b.m_normals[p].y * (i - b.m_vertices[p].y);
                         if (q > o) {
                             return
                         }
                         if (q > n) {
                             n = q;
                             m = p
                         }
                     }
                     if (n < Number.MIN_VALUE) {
                         a.pointCount = 1;
                         var r = b.m_normals[m];
                         a.normal.x = j.col1.x * r.x + j.col2.x * r.y;
                         a.normal.y = j.col1.y * r.x + j.col2.y * r.y;
                         e = a.points[0];
                         e.id.features.incidentEdge = m;
                         e.id.features.incidentVertex = b2Collision.b2_nullFeature;
                         e.id.features.referenceFace = b2Collision.b2_nullFeature;
                         e.id.features.flip = 0;
                         e.position.x = c.m_position.x - o * a.normal.x;
                         e.position.y = c.m_position.y - o * a.normal.y;
                         e.separation = n - o;
                         return
                     }
                     var s = m;
                     var t = s + 1 < b.m_vertexCount ? s + 1 : 0;
                     var u = b.m_vertices[t].x - b.m_vertices[s].x;
                     var v = b.m_vertices[t].y - b.m_vertices[s].y;
                     var w = Math.sqrt(u * u + v * v);
                     u /= w;
                     v /= w;
                     if (w < Number.MIN_VALUE) {
                         f = h - b.m_vertices[s].x;
                         g = i - b.m_vertices[s].y;
                         l = Math.sqrt(f * f + g * g);
                         f /= l;
                         g /= l;
                         if (l > o) {
                             return
                         }
                         a.pointCount = 1;
                         a.normal.Set(j.col1.x * f + j.col2.x * g, j.col1.y * f + j.col2.y * g);
                         e = a.points[0];
                         e.id.features.incidentEdge = b2Collision.b2_nullFeature;
                         e.id.features.incidentVertex = s;
                         e.id.features.referenceFace = b2Collision.b2_nullFeature;
                         e.id.features.flip = 0;
                         e.position.x = c.m_position.x - o * a.normal.x;
                         e.position.y = c.m_position.y - o * a.normal.y;
                         e.separation = l - o;
                         return
                     }
                     var x = (h - b.m_vertices[s].x) * u + (i - b.m_vertices[s].y) * v;
                     e = a.points[0];
                     e.id.features.incidentEdge = b2Collision.b2_nullFeature;
                     e.id.features.incidentVertex = b2Collision.b2_nullFeature;
                     e.id.features.referenceFace = b2Collision.b2_nullFeature;
                     e.id.features.flip = 0;
                     var y, z;
                     if (x <= 0) {
                         y = b.m_vertices[s].x;
                         z = b.m_vertices[s].y;
                         e.id.features.incidentVertex = s
                     }
                     else if (x >= w) {
                         y = b.m_vertices[t].x;
                         z = b.m_vertices[t].y;
                         e.id.features.incidentVertex = t
                     }
                     else {
                         y = u * x + b.m_vertices[s].x;
                         z = v * x + b.m_vertices[s].y;
                         e.id.features.incidentEdge = s
                     }
                     f = h - y;
                     g = i - z;
                     l = Math.sqrt(f * f + g * g);
                     f /= l;
                     g /= l;
                     if (l > o) {
                         return
                     }
                     a.pointCount = 1;
                     a.normal.Set(j.col1.x * f + j.col2.x * g, j.col1.y * f + j.col2.y * g);
                     e.position.x = c.m_position.x - o * a.normal.x;
                     e.position.y = c.m_position.y - o * a.normal.y;
                     e.separation = l - o
                 };
                 b2Collision.b2TestOverlap = function(a, b) {
                     var c = b.minVertex;
                     var d = a.maxVertex;
                     var e = c.x - d.x;
                     var f = c.y - d.y;
                     c = a.minVertex;
                     d = b.maxVertex;
                     var g = c.x - d.x;
                     var h = c.y - d.y;
                     if (e > 0 || f > 0) return false;
                     if (g > 0 || h > 0) return false;
                     return true
                 };
                 var Features = Class.create();
                 Features.prototype = {
                     set_referenceFace: function(a) {
                         this._referenceFace = a;
                         this._m_id._key = this._m_id._key & 4294967040 | this._referenceFace & 255
                     },
                     get_referenceFace: function() {
                         return this._referenceFace
                     },
                     _referenceFace: 0,
                     set_incidentEdge: function(a) {
                         this._incidentEdge = a;
                         this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
                     },
                     get_incidentEdge: function() {
                         return this._incidentEdge
                     },
                     _incidentEdge: 0,
                     set_incidentVertex: function(a) {
                         this._incidentVertex = a;
                         this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680
                     },
                     get_incidentVertex: function() {
                         return this._incidentVertex
                     },
                     _incidentVertex: 0,
                     set_flip: function(a) {
                         this._flip = a;
                         this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
                     },
                     get_flip: function() {
                         return this._flip
                     },
                     _flip: 0,
                     _m_id: null,
                     initialize: function() {}
                 };
                 var b2ContactID = Class.create();
                 b2ContactID.prototype = {
                     initialize: function() {
                         this.features = new Features;
                         this.features._m_id = this
                     },
                     Set: function(a) {
                         this.set_key(a._key)
                     },
                     Copy: function() {
                         var a = new b2ContactID;
                         a.set_key(this._key);
                         return a
                     },
                     get_key: function() {
                         return this._key
                     },
                     set_key: function(a) {
                         this._key = a;
                         this.features._referenceFace = this._key & 255;
                         this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
                         this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
                         this.features._flip = (this._key & 4278190080) >> 24 & 255
                     },
                     features: new Features,
                     _key: 0
                 };
                 var b2ContactPoint = Class.create();
                 b2ContactPoint.prototype = {
                     position: new b2Vec2,
                     separation: null,
                     normalImpulse: null,
                     tangentImpulse: null,
                     id: new b2ContactID,
                     initialize: function() {
                         this.position = new b2Vec2;
                         this.id = new b2ContactID
                     }
                 };
                 var b2Distance = Class.create();
                 b2Distance.prototype = {
                     initialize: function() {}
                 };
                 b2Distance.ProcessTwo = function(a, b, c, d, e) {
                     var f = -e[1].x;
                     var g = -e[1].y;
                     var h = e[0].x - e[1].x;
                     var i = e[0].y - e[1].y;
                     var j = Math.sqrt(h * h + i * i);
                     h /= j;
                     i /= j;
                     var k = f * h + g * i;
                     if (k <= 0 || j < Number.MIN_VALUE) {
                         a.SetV(c[1]);
                         b.SetV(d[1]);
                         c[0].SetV(c[1]);
                         d[0].SetV(d[1]);
                         e[0].SetV(e[1]);
                         return 1
                     }
                     k /= j;
                     a.x = c[1].x + k * (c[0].x - c[1].x);
                     a.y = c[1].y + k * (c[0].y - c[1].y);
                     b.x = d[1].x + k * (d[0].x - d[1].x);
                     b.y = d[1].y + k * (d[0].y - d[1].y);
                     return 2
                 };
                 b2Distance.ProcessThree = function(a, b, c, d, e) {
                     var f = e[0].x;
                     var g = e[0].y;
                     var h = e[1].x;
                     var i = e[1].y;
                     var j = e[2].x;
                     var k = e[2].y;
                     var l = h - f;
                     var m = i - g;
                     var n = j - f;
                     var o = k - g;
                     var p = j - h;
                     var q = k - i;
                     var r = -(f * l + g * m);
                     var s = h * l + i * m;
                     var t = -(f * n + g * o);
                     var u = j * n + k * o;
                     var v = -(h * p + i * q);
                     var w = j * p + k * q;
                     if (u <= 0 && w <= 0) {
                         a.SetV(c[2]);
                         b.SetV(d[2]);
                         c[0].SetV(c[2]);
                         d[0].SetV(d[2]);
                         e[0].SetV(e[2]);
                         return 1
                     }
                     var x = l * o - m * n;
                     var y = x * (f * i - g * h);
                     var z = x * (h * k - i * j);
                     if (z <= 0 && v >= 0 && w >= 0) {
                         var A = v / (v + w);
                         a.x = c[1].x + A * (c[2].x - c[1].x);
                         a.y = c[1].y + A * (c[2].y - c[1].y);
                         b.x = d[1].x + A * (d[2].x - d[1].x);
                         b.y = d[1].y + A * (d[2].y - d[1].y);
                         c[0].SetV(c[2]);
                         d[0].SetV(d[2]);
                         e[0].SetV(e[2]);
                         return 2
                     }
                     var B = x * (j * g - k * f);
                     if (B <= 0 && t >= 0 && u >= 0) {
                         var A = t / (t + u);
                         a.x = c[0].x + A * (c[2].x - c[0].x);
                         a.y = c[0].y + A * (c[2].y - c[0].y);
                         b.x = d[0].x + A * (d[2].x - d[0].x);
                         b.y = d[0].y + A * (d[2].y - d[0].y);
                         c[1].SetV(c[2]);
                         d[1].SetV(d[2]);
                         e[1].SetV(e[2]);
                         return 2
                     }
                     var C = z + B + y;
                     C = 1 / C;
                     var D = z * C;
                     var E = B * C;
                     var F = 1 - D - E;
                     a.x = D * c[0].x + E * c[1].x + F * c[2].x;
                     a.y = D * c[0].y + E * c[1].y + F * c[2].y;
                     b.x = D * d[0].x + E * d[1].x + F * d[2].x;
                     b.y = D * d[0].y + E * d[1].y + F * d[2].y;
                     return 3
                 };
                 b2Distance.InPoinsts = function(a, b, c) {
                     for (var d = 0; d < c; ++d) {
                         if (a.x == b[d].x && a.y == b[d].y) {
                             return true
                         }
                     }
                     return false
                 };
                 b2Distance.Distance = function(a, b, c, d) {
                     var e = new Array(3);
                     var f = new Array(3);
                     var g = new Array(3);
                     var h = 0;
                     a.SetV(c.m_position);
                     b.SetV(d.m_position);
                     var i = 0;
                     var j = 20;
                     for (var k = 0; k < j; ++k) {
                         var l = b.x - a.x;
                         var m = b.y - a.y;
                         var n = c.Support(l, m);
                         var o = d.Support(-l, -m);
                         i = l * l + m * m;
                         var p = o.x - n.x;
                         var q = o.y - n.y;
                         var r = l * p + m * q;
                         if (i - b2Dot(l * p + m * q) <= .01 * i) {
                             if (h == 0) {
                                 a.SetV(n);
                                 b.SetV(o)
                             }
                             b2Distance.g_GJK_Iterations = k;
                             return Math.sqrt(i)
                         }
                         switch (h) {
                             case 0:
                                 e[0].SetV(n);
                                 f[0].SetV(o);
                                 g[0] = w;
                                 a.SetV(e[0]);
                                 b.SetV(f[0]);
                                 ++h;
                                 break;
                             case 1:
                                 e[1].SetV(n);
                                 f[1].SetV(o);
                                 g[1].x = p;
                                 g[1].y = q;
                                 h = b2Distance.ProcessTwo(a, b, e, f, g);
                                 break;
                             case 2:
                                 e[2].SetV(n);
                                 f[2].SetV(o);
                                 g[2].x = p;
                                 g[2].y = q;
                                 h = b2Distance.ProcessThree(a, b, e, f, g);
                                 break
                         }
                         if (h == 3) {
                             b2Distance.g_GJK_Iterations = k;
                             return 0
                         }
                         var s = -Number.MAX_VALUE;
                         for (var t = 0; t < h; ++t) {
                             s = b2Math.b2Max(s, g[t].x * g[t].x + g[t].y * g[t].y)
                         }
                         if (h == 3 || i <= 100 * Number.MIN_VALUE * s) {
                             b2Distance.g_GJK_Iterations = k;
                             return Math.sqrt(i)
                         }
                     }
                     b2Distance.g_GJK_Iterations = j;
                     return Math.sqrt(i)
                 };
                 b2Distance.g_GJK_Iterations = 0;
                 var b2Manifold = Class.create();
                 b2Manifold.prototype = {
                     initialize: function() {
                         this.points = new Array(b2Settings.b2_maxManifoldPoints);
                         for (var a = 0; a < b2Settings.b2_maxManifoldPoints; a++) {
                             this.points[a] = new b2ContactPoint
                         }
                         this.normal = new b2Vec2
                     },
                     points: null,
                     normal: null,
                     pointCount: 0
                 };
                 var b2OBB = Class.create();
                 b2OBB.prototype = {
                     R: new b2Mat22,
                     center: new b2Vec2,
                     extents: new b2Vec2,
                     initialize: function() {
                         this.R = new b2Mat22;
                         this.center = new b2Vec2;
                         this.extents = new b2Vec2
                     }
                 };
                 var b2Proxy = Class.create();
                 b2Proxy.prototype = {
                     GetNext: function() {
                         return this.lowerBounds[0]
                     },
                     SetNext: function(a) {
                         this.lowerBounds[0] = a
                     },
                     IsValid: function() {
                         return this.overlapCount != b2BroadPhase.b2_invalid
                     },
                     lowerBounds: [0, 0],
                     upperBounds: [0, 0],
                     overlapCount: 0,
                     timeStamp: 0,
                     userData: null,
                     initialize: function() {
                         this.lowerBounds = [0, 0];
                         this.upperBounds = [0, 0]
                     }
                 };
                 var ClipVertex = Class.create();
                 ClipVertex.prototype = {
                     v: new b2Vec2,
                     id: new b2ContactID,
                     initialize: function() {
                         this.v = new b2Vec2;
                         this.id = new b2ContactID
                     }
                 };
                 var b2Shape = Class.create();
                 b2Shape.prototype = {
                     TestPoint: function(a) {
                         return false
                     },
                     GetUserData: function() {
                         return this.m_userData
                     },
                     GetType: function() {
                         return this.m_type
                     },
                     GetBody: function() {
                         return this.m_body
                     },
                     GetPosition: function() {
                         return this.m_position
                     },
                     GetRotationMatrix: function() {
                         return this.m_R
                     },
                     ResetProxy: function(a) {},
                     GetNext: function() {
                         return this.m_next
                     },
                     initialize: function(a, b) {
                         this.m_R = new b2Mat22;
                         this.m_position = new b2Vec2;
                         this.m_userData = a.userData;
                         this.m_friction = a.friction;
                         this.m_restitution = a.restitution;
                         this.m_body = b;
                         this.m_proxyId = b2Pair.b2_nullProxy;
                         this.m_maxRadius = 0;
                         this.m_categoryBits = a.categoryBits;
                         this.m_maskBits = a.maskBits;
                         this.m_groupIndex = a.groupIndex
                     },
                     DestroyProxy: function() {
                         if (this.m_proxyId != b2Pair.b2_nullProxy) {
                             this.m_body.m_world.m_broadPhase.DestroyProxy(this.m_proxyId);
                             this.m_proxyId = b2Pair.b2_nullProxy
                         }
                     },
                     Synchronize: function(a, b, c, d) {},
                     QuickSync: function(a, b) {},
                     Support: function(a, b, c) {},
                     GetMaxRadius: function() {
                         return this.m_maxRadius
                     },
                     m_next: null,
                     m_R: new b2Mat22,
                     m_position: new b2Vec2,
                     m_type: 0,
                     m_userData: null,
                     m_body: null,
                     m_friction: null,
                     m_restitution: null,
                     m_maxRadius: null,
                     m_proxyId: 0,
                     m_categoryBits: 0,
                     m_maskBits: 0,
                     m_groupIndex: 0
                 };
                 b2Shape.Create = function(a, b, c) {
                     switch (a.type) {
                         case b2Shape.e_circleShape:
                             {
                                 return new b2CircleShape(a, b, c)
                             };
                         case b2Shape.e_boxShape:
                         case b2Shape.e_polyShape:
                             {
                                 return new b2PolyShape(a, b, c)
                             }
                     }
                     return null
                 };
                 b2Shape.Destroy = function(a) {
                     if (a.m_proxyId != b2Pair.b2_nullProxy) a.m_body.m_world.m_broadPhase.DestroyProxy(a.m_proxyId)
                 };
                 b2Shape.e_unknownShape = -1;
                 b2Shape.e_circleShape = 0;
                 b2Shape.e_boxShape = 1;
                 b2Shape.e_polyShape = 2;
                 b2Shape.e_meshShape = 3;
                 b2Shape.e_shapeTypeCount = 4;
                 b2Shape.PolyMass = function(a, b, c, d) {
                     var e = new b2Vec2;
                     e.SetZero();
                     var f = 0;
                     var g = 0;
                     var h = new b2Vec2(0, 0);
                     var i = 1 / 3;
                     for (var j = 0; j < c; ++j) {
                         var k = h;
                         var l = b[j];
                         var m = j + 1 < c ? b[j + 1] : b[0];
                         var n = b2Math.SubtractVV(l, k);
                         var o = b2Math.SubtractVV(m, k);
                         var p = b2Math.b2CrossVV(n, o);
                         var q = .5 * p;
                         f += q;
                         var r = new b2Vec2;
                         r.SetV(k);
                         r.Add(l);
                         r.Add(m);
                         r.Multiply(i * q);
                         e.Add(r);
                         var s = k.x;
                         var t = k.y;
                         var u = n.x;
                         var v = n.y;
                         var w = o.x;
                         var x = o.y;
                         var y = i * (.25 * (u * u + w * u + w * w) + (s * u + s * w)) + .5 * s * s;
                         var z = i * (.25 * (v * v + x * v + x * x) + (t * v + t * x)) + .5 * t * t;
                         g += p * (y + z)
                     }
                     a.mass = d * f;
                     e.Multiply(1 / f);
                     a.center = e;
                     g = d * (g - f * b2Math.b2Dot(e, e));
                     a.I = g
                 };
                 b2Shape.PolyCentroid = function(a, b, c) {
                     var d = 0;
                     var e = 0;
                     var f = 0;
                     var g = 0;
                     var h = 0;
                     var i = 1 / 3;
                     for (var j = 0; j < b; ++j) {
                         var k = g;
                         var l = h;
                         var m = a[j].x;
                         var n = a[j].y;
                         var o = j + 1 < b ? a[j + 1].x : a[0].x;
                         var p = j + 1 < b ? a[j + 1].y : a[0].y;
                         var q = m - k;
                         var r = n - l;
                         var s = o - k;
                         var t = p - l;
                         var u = q * t - r * s;
                         var v = .5 * u;
                         f += v;
                         d += v * i * (k + m + o);
                         e += v * i * (l + n + p)
                     }
                     d *= 1 / f;
                     e *= 1 / f;
                     c.Set(d, e)
                 };
                 var b2ShapeDef = Class.create();
                 b2ShapeDef.prototype = {
                     initialize: function() {
                         this.type = b2Shape.e_unknownShape;
                         this.userData = null;
                         this.localPosition = new b2Vec2(0, 0);
                         this.localRotation = 0;
                         this.friction = .2;
                         this.restitution = 0;
                         this.density = 0;
                         this.categoryBits = 1;
                         this.maskBits = 65535;
                         this.groupIndex = 0
                     },
                     ComputeMass: function(a) {
                         a.center = new b2Vec2(0, 0);
                         if (this.density == 0) {
                             a.mass = 0;
                             a.center.Set(0, 0);
                             a.I = 0
                         }
                         switch (this.type) {
                             case b2Shape.e_circleShape:
                                 {
                                     var b = this;
                                     a.mass = this.density * b2Settings.b2_pi * b.radius * b.radius;
                                     a.center.Set(0, 0);
                                     a.I = .5 * a.mass * b.radius * b.radius
                                 }
                                 break;
                             case b2Shape.e_boxShape:
                                 {
                                     var c = this;
                                     a.mass = 4 * this.density * c.extents.x * c.extents.y;
                                     a.center.Set(0, 0);
                                     a.I = a.mass / 3 * b2Math.b2Dot(c.extents, c.extents)
                                 }
                                 break;
                             case b2Shape.e_polyShape:
                                 {
                                     var d = this;
                                     b2Shape.PolyMass(a, d.vertices, d.vertexCount, this.density)
                                 }
                                 break;
                             default:
                                 a.mass = 0;
                                 a.center.Set(0, 0);
                                 a.I = 0;
                                 break
                         }
                     },
                     type: 0,
                     userData: null,
                     localPosition: null,
                     localRotation: null,
                     friction: null,
                     restitution: null,
                     density: null,
                     categoryBits: 0,
                     maskBits: 0,
                     groupIndex: 0
                 };
                 var b2BoxDef = Class.create();
                 Object.extend(b2BoxDef.prototype, b2ShapeDef.prototype);
                 Object.extend(b2BoxDef.prototype, {
                     initialize: function() {
                         this.type = b2Shape.e_unknownShape;
                         this.userData = null;
                         this.localPosition = new b2Vec2(0, 0);
                         this.localRotation = 0;
                         this.friction = .2;
                         this.restitution = 0;
                         this.density = 0;
                         this.categoryBits = 1;
                         this.maskBits = 65535;
                         this.groupIndex = 0;
                         this.type = b2Shape.e_boxShape;
                         this.extents = new b2Vec2(1, 1)
                     },
                     extents: null
                 });
                 var b2CircleDef = Class.create();
                 Object.extend(b2CircleDef.prototype, b2ShapeDef.prototype);
                 Object.extend(b2CircleDef.prototype, {
                     initialize: function() {
                         this.type = b2Shape.e_unknownShape;
                         this.userData = null;
                         this.localPosition = new b2Vec2(0, 0);
                         this.localRotation = 0;
                         this.friction = .2;
                         this.restitution = 0;
                         this.density = 0;
                         this.categoryBits = 1;
                         this.maskBits = 65535;
                         this.groupIndex = 0;
                         this.type = b2Shape.e_circleShape;
                         this.radius = 1
                     },
                     radius: null
                 });
                 var b2CircleShape = Class.create();
                 Object.extend(b2CircleShape.prototype, b2Shape.prototype);
                 Object.extend(b2CircleShape.prototype, {
                     TestPoint: function(a) {
                         var b = new b2Vec2;
                         b.SetV(a);
                         b.Subtract(this.m_position);
                         return b2Math.b2Dot(b, b) <= this.m_radius * this.m_radius
                     },
                     initialize: function(a, b, c) {
                         this.m_R = new b2Mat22;
                         this.m_position = new b2Vec2;
                         this.m_userData = a.userData;
                         this.m_friction = a.friction;
                         this.m_restitution = a.restitution;
                         this.m_body = b;
                         this.m_proxyId = b2Pair.b2_nullProxy;
                         this.m_maxRadius = 0;
                         this.m_categoryBits = a.categoryBits;
                         this.m_maskBits = a.maskBits;
                         this.m_groupIndex = a.groupIndex;
                         this.m_localPosition = new b2Vec2;
                         var d = a;
                         this.m_localPosition.Set(a.localPosition.x - c.x, a.localPosition.y - c.y);
                         this.m_type = b2Shape.e_circleShape;
                         this.m_radius = d.radius;
                         this.m_R.SetM(this.m_body.m_R);
                         var e = this.m_R.col1.x * this.m_localPosition.x + this.m_R.col2.x * this.m_localPosition.y;
                         var f = this.m_R.col1.y * this.m_localPosition.x + this.m_R.col2.y * this.m_localPosition.y;
                         this.m_position.x = this.m_body.m_position.x + e;
                         this.m_position.y = this.m_body.m_position.y + f;
                         this.m_maxRadius = Math.sqrt(e * e + f * f) + this.m_radius;
                         var g = new b2AABB;
                         g.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
                         g.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
                         var h = this.m_body.m_world.m_broadPhase;
                         if (h.InRange(g)) {
                             this.m_proxyId = h.CreateProxy(g, this)
                         }
                         else {
                             this.m_proxyId = b2Pair.b2_nullProxy
                         }
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             this.m_body.Freeze()
                         }
                     },
                     Synchronize: function(a, b, c, d) {
                         this.m_R.SetM(d);
                         this.m_position.x = d.col1.x * this.m_localPosition.x + d.col2.x * this.m_localPosition.y + c.x;
                         this.m_position.y = d.col1.y * this.m_localPosition.x + d.col2.y * this.m_localPosition.y + c.y;
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             return
                         }
                         var e = a.x + (b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y);
                         var f = a.y + (b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y);
                         var g = Math.min(e, this.m_position.x);
                         var h = Math.min(f, this.m_position.y);
                         var i = Math.max(e, this.m_position.x);
                         var j = Math.max(f, this.m_position.y);
                         var k = new b2AABB;
                         k.minVertex.Set(g - this.m_radius, h - this.m_radius);
                         k.maxVertex.Set(i + this.m_radius, j + this.m_radius);
                         var l = this.m_body.m_world.m_broadPhase;
                         if (l.InRange(k)) {
                             l.MoveProxy(this.m_proxyId, k)
                         }
                         else {
                             this.m_body.Freeze()
                         }
                     },
                     QuickSync: function(a, b) {
                         this.m_R.SetM(b);
                         this.m_position.x = b.col1.x * this.m_localPosition.x + b.col2.x * this.m_localPosition.y + a.x;
                         this.m_position.y = b.col1.y * this.m_localPosition.x + b.col2.y * this.m_localPosition.y + a.y
                     },
                     ResetProxy: function(a) {
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             return
                         }
                         var b = a.GetProxy(this.m_proxyId);
                         a.DestroyProxy(this.m_proxyId);
                         b = null;
                         var c = new b2AABB;
                         c.minVertex.Set(this.m_position.x - this.m_radius, this.m_position.y - this.m_radius);
                         c.maxVertex.Set(this.m_position.x + this.m_radius, this.m_position.y + this.m_radius);
                         if (a.InRange(c)) {
                             this.m_proxyId = a.CreateProxy(c, this)
                         }
                         else {
                             this.m_proxyId = b2Pair.b2_nullProxy
                         }
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             this.m_body.Freeze()
                         }
                     },
                     Support: function(a, b, c) {
                         var d = Math.sqrt(a * a + b * b);
                         a /= d;
                         b /= d;
                         c.Set(this.m_position.x + this.m_radius * a, this.m_position.y + this.m_radius * b)
                     },
                     m_localPosition: new b2Vec2,
                     m_radius: null
                 });
                 var b2MassData = Class.create();
                 b2MassData.prototype = {
                     mass: 0,
                     center: new b2Vec2(0, 0),
                     I: 0,
                     initialize: function() {
                         this.center = new b2Vec2(0, 0)
                     }
                 };
                 var b2PolyDef = Class.create();
                 Object.extend(b2PolyDef.prototype, b2ShapeDef.prototype);
                 Object.extend(b2PolyDef.prototype, {
                     initialize: function() {
                         this.type = b2Shape.e_unknownShape;
                         this.userData = null;
                         this.localPosition = new b2Vec2(0, 0);
                         this.localRotation = 0;
                         this.friction = .2;
                         this.restitution = 0;
                         this.density = 0;
                         this.categoryBits = 1;
                         this.maskBits = 65535;
                         this.groupIndex = 0;
                         this.vertices = new Array(b2Settings.b2_maxPolyVertices);
                         this.type = b2Shape.e_polyShape;
                         this.vertexCount = 0;
                         for (var a = 0; a < b2Settings.b2_maxPolyVertices; a++) {
                             this.vertices[a] = new b2Vec2
                         }
                     },
                     vertices: new Array(b2Settings.b2_maxPolyVertices),
                     vertexCount: 0
                 });
                 var b2PolyShape = Class.create();
                 Object.extend(b2PolyShape.prototype, b2Shape.prototype);
                 Object.extend(b2PolyShape.prototype, {
                     TestPoint: function(a) {
                         var b = new b2Vec2;
                         b.SetV(a);
                         b.Subtract(this.m_position);
                         b.MulTM(this.m_R);
                         for (var c = 0; c < this.m_vertexCount; ++c) {
                             var d = new b2Vec2;
                             d.SetV(b);
                             d.Subtract(this.m_vertices[c]);
                             var e = b2Math.b2Dot(this.m_normals[c], d);
                             if (e > 0) {
                                 return false
                             }
                         }
                         return true
                     },
                     initialize: function(a, b, c) {
                         this.m_R = new b2Mat22;
                         this.m_position = new b2Vec2;
                         this.m_userData = a.userData;
                         this.m_friction = a.friction;
                         this.m_restitution = a.restitution;
                         this.m_body = b;
                         this.m_proxyId = b2Pair.b2_nullProxy;
                         this.m_maxRadius = 0;
                         this.m_categoryBits = a.categoryBits;
                         this.m_maskBits = a.maskBits;
                         this.m_groupIndex = a.groupIndex;
                         this.syncAABB = new b2AABB;
                         this.syncMat = new b2Mat22;
                         this.m_localCentroid = new b2Vec2;
                         this.m_localOBB = new b2OBB;
                         var d = 0;
                         var e;
                         var f;
                         var g;
                         var h = new b2AABB;
                         this.m_vertices = new Array(b2Settings.b2_maxPolyVertices);
                         this.m_coreVertices = new Array(b2Settings.b2_maxPolyVertices);
                         this.m_normals = new Array(b2Settings.b2_maxPolyVertices);
                         this.m_type = b2Shape.e_polyShape;
                         var i = new b2Mat22(a.localRotation);
                         if (a.type == b2Shape.e_boxShape) {
                             this.m_localCentroid.x = a.localPosition.x - c.x;
                             this.m_localCentroid.y = a.localPosition.y - c.y;
                             var j = a;
                             this.m_vertexCount = 4;
                             e = j.extents.x;
                             f = j.extents.y;
                             var k = Math.max(0, e - 2 * b2Settings.b2_linearSlop);
                             var l = Math.max(0, f - 2 * b2Settings.b2_linearSlop);
                             g = this.m_vertices[0] = new b2Vec2;
                             g.x = i.col1.x * e + i.col2.x * f;
                             g.y = i.col1.y * e + i.col2.y * f;
                             g = this.m_vertices[1] = new b2Vec2;
                             g.x = i.col1.x * -e + i.col2.x * f;
                             g.y = i.col1.y * -e + i.col2.y * f;
                             g = this.m_vertices[2] = new b2Vec2;
                             g.x = i.col1.x * -e + i.col2.x * -f;
                             g.y = i.col1.y * -e + i.col2.y * -f;
                             g = this.m_vertices[3] = new b2Vec2;
                             g.x = i.col1.x * e + i.col2.x * -f;
                             g.y = i.col1.y * e + i.col2.y * -f;
                             g = this.m_coreVertices[0] = new b2Vec2;
                             g.x = i.col1.x * k + i.col2.x * l;
                             g.y = i.col1.y * k + i.col2.y * l;
                             g = this.m_coreVertices[1] = new b2Vec2;
                             g.x = i.col1.x * -k + i.col2.x * l;
                             g.y = i.col1.y * -k + i.col2.y * l;
                             g = this.m_coreVertices[2] = new b2Vec2;
                             g.x = i.col1.x * -k + i.col2.x * -l;
                             g.y = i.col1.y * -k + i.col2.y * -l;
                             g = this.m_coreVertices[3] = new b2Vec2;
                             g.x = i.col1.x * k + i.col2.x * -l;
                             g.y = i.col1.y * k + i.col2.y * -l
                         }
                         else {
                             var m = a;
                             this.m_vertexCount = m.vertexCount;
                             b2Shape.PolyCentroid(m.vertices, m.vertexCount, b2PolyShape.tempVec);
                             var n = b2PolyShape.tempVec.x;
                             var o = b2PolyShape.tempVec.y;
                             this.m_localCentroid.x = a.localPosition.x + (i.col1.x * n + i.col2.x * o) - c.x;
                             this.m_localCentroid.y = a.localPosition.y + (i.col1.y * n + i.col2.y * o) - c.y;
                             for (d = 0; d < this.m_vertexCount; ++d) {
                                 this.m_vertices[d] = new b2Vec2;
                                 this.m_coreVertices[d] = new b2Vec2;
                                 e = m.vertices[d].x - n;
                                 f = m.vertices[d].y - o;
                                 this.m_vertices[d].x = i.col1.x * e + i.col2.x * f;
                                 this.m_vertices[d].y = i.col1.y * e + i.col2.y * f;
                                 var p = this.m_vertices[d].x;
                                 var q = this.m_vertices[d].y;
                                 var r = Math.sqrt(p * p + q * q);
                                 if (r > Number.MIN_VALUE) {
                                     p *= 1 / r;
                                     q *= 1 / r
                                 }
                                 this.m_coreVertices[d].x = this.m_vertices[d].x - 2 * b2Settings.b2_linearSlop * p;
                                 this.m_coreVertices[d].y = this.m_vertices[d].y - 2 * b2Settings.b2_linearSlop * q
                             }
                         }
                         var s = Number.MAX_VALUE;
                         var t = Number.MAX_VALUE;
                         var u = -Number.MAX_VALUE;
                         var v = -Number.MAX_VALUE;
                         this.m_maxRadius = 0;
                         for (d = 0; d < this.m_vertexCount; ++d) {
                             var w = this.m_vertices[d];
                             s = Math.min(s, w.x);
                             t = Math.min(t, w.y);
                             u = Math.max(u, w.x);
                             v = Math.max(v, w.y);
                             this.m_maxRadius = Math.max(this.m_maxRadius, w.Length())
                         }
                         this.m_localOBB.R.SetIdentity();
                         this.m_localOBB.center.Set((s + u) * .5, (t + v) * .5);
                         this.m_localOBB.extents.Set((u - s) * .5, (v - t) * .5);
                         var x = 0;
                         var y = 0;
                         for (d = 0; d < this.m_vertexCount; ++d) {
                             this.m_normals[d] = new b2Vec2;
                             x = d;
                             y = d + 1 < this.m_vertexCount ? d + 1 : 0;
                             this.m_normals[d].x = this.m_vertices[y].y - this.m_vertices[x].y;
                             this.m_normals[d].y = -(this.m_vertices[y].x - this.m_vertices[x].x);
                             this.m_normals[d].Normalize()
                         }
                         for (d = 0; d < this.m_vertexCount; ++d) {
                             x = d;
                             y = d + 1 < this.m_vertexCount ? d + 1 : 0
                         }
                         this.m_R.SetM(this.m_body.m_R);
                         this.m_position.x = this.m_body.m_position.x + (this.m_R.col1.x * this.m_localCentroid.x + this.m_R.col2.x * this.m_localCentroid.y);
                         this.m_position.y = this.m_body.m_position.y + (this.m_R.col1.y * this.m_localCentroid.x + this.m_R.col2.y * this.m_localCentroid.y);
                         b2PolyShape.tAbsR.col1.x = this.m_R.col1.x * this.m_localOBB.R.col1.x + this.m_R.col2.x * this.m_localOBB.R.col1.y;
                         b2PolyShape.tAbsR.col1.y = this.m_R.col1.y * this.m_localOBB.R.col1.x + this.m_R.col2.y * this.m_localOBB.R.col1.y;
                         b2PolyShape.tAbsR.col2.x = this.m_R.col1.x * this.m_localOBB.R.col2.x + this.m_R.col2.x * this.m_localOBB.R.col2.y;
                         b2PolyShape.tAbsR.col2.y = this.m_R.col1.y * this.m_localOBB.R.col2.x + this.m_R.col2.y * this.m_localOBB.R.col2.y;
                         b2PolyShape.tAbsR.Abs();
                         e = b2PolyShape.tAbsR.col1.x * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.x * this.m_localOBB.extents.y;
                         f = b2PolyShape.tAbsR.col1.y * this.m_localOBB.extents.x + b2PolyShape.tAbsR.col2.y * this.m_localOBB.extents.y;
                         var z = this.m_position.x + (this.m_R.col1.x * this.m_localOBB.center.x + this.m_R.col2.x * this.m_localOBB.center.y);
                         var A = this.m_position.y + (this.m_R.col1.y * this.m_localOBB.center.x + this.m_R.col2.y * this.m_localOBB.center.y);
                         h.minVertex.x = z - e;
                         h.minVertex.y = A - f;
                         h.maxVertex.x = z + e;
                         h.maxVertex.y = A + f;
                         var B = this.m_body.m_world.m_broadPhase;
                         if (B.InRange(h)) {
                             this.m_proxyId = B.CreateProxy(h, this)
                         }
                         else {
                             this.m_proxyId = b2Pair.b2_nullProxy
                         }
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             this.m_body.Freeze()
                         }
                     },
                     syncAABB: new b2AABB,
                     syncMat: new b2Mat22,
                     Synchronize: function(a, b, c, d) {
                         this.m_R.SetM(d);
                         this.m_position.x = this.m_body.m_position.x + (d.col1.x * this.m_localCentroid.x + d.col2.x * this.m_localCentroid.y);
                         this.m_position.y = this.m_body.m_position.y + (d.col1.y * this.m_localCentroid.x + d.col2.y * this.m_localCentroid.y);
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             return
                         }
                         var e;
                         var f;
                         var g = b.col1;
                         var h = b.col2;
                         var i = this.m_localOBB.R.col1;
                         var j = this.m_localOBB.R.col2;
                         this.syncMat.col1.x = g.x * i.x + h.x * i.y;
                         this.syncMat.col1.y = g.y * i.x + h.y * i.y;
                         this.syncMat.col2.x = g.x * j.x + h.x * j.y;
                         this.syncMat.col2.y = g.y * j.x + h.y * j.y;
                         this.syncMat.Abs();
                         e = this.m_localCentroid.x + this.m_localOBB.center.x;
                         f = this.m_localCentroid.y + this.m_localOBB.center.y;
                         var k = a.x + (b.col1.x * e + b.col2.x * f);
                         var l = a.y + (b.col1.y * e + b.col2.y * f);
                         e = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
                         f = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
                         this.syncAABB.minVertex.x = k - e;
                         this.syncAABB.minVertex.y = l - f;
                         this.syncAABB.maxVertex.x = k + e;
                         this.syncAABB.maxVertex.y = l + f;
                         g = d.col1;
                         h = d.col2;
                         i = this.m_localOBB.R.col1;
                         j = this.m_localOBB.R.col2;
                         this.syncMat.col1.x = g.x * i.x + h.x * i.y;
                         this.syncMat.col1.y = g.y * i.x + h.y * i.y;
                         this.syncMat.col2.x = g.x * j.x + h.x * j.y;
                         this.syncMat.col2.y = g.y * j.x + h.y * j.y;
                         this.syncMat.Abs();
                         e = this.m_localCentroid.x + this.m_localOBB.center.x;
                         f = this.m_localCentroid.y + this.m_localOBB.center.y;
                         k = c.x + (d.col1.x * e + d.col2.x * f);
                         l = c.y + (d.col1.y * e + d.col2.y * f);
                         e = this.syncMat.col1.x * this.m_localOBB.extents.x + this.syncMat.col2.x * this.m_localOBB.extents.y;
                         f = this.syncMat.col1.y * this.m_localOBB.extents.x + this.syncMat.col2.y * this.m_localOBB.extents.y;
                         this.syncAABB.minVertex.x = Math.min(this.syncAABB.minVertex.x, k - e);
                         this.syncAABB.minVertex.y = Math.min(this.syncAABB.minVertex.y, l - f);
                         this.syncAABB.maxVertex.x = Math.max(this.syncAABB.maxVertex.x, k + e);
                         this.syncAABB.maxVertex.y = Math.max(this.syncAABB.maxVertex.y, l + f);
                         var m = this.m_body.m_world.m_broadPhase;
                         if (m.InRange(this.syncAABB)) {
                             m.MoveProxy(this.m_proxyId, this.syncAABB)
                         }
                         else {
                             this.m_body.Freeze()
                         }
                     },
                     QuickSync: function(a, b) {
                         this.m_R.SetM(b);
                         this.m_position.x = a.x + (b.col1.x * this.m_localCentroid.x + b.col2.x * this.m_localCentroid.y);
                         this.m_position.y = a.y + (b.col1.y * this.m_localCentroid.x + b.col2.y * this.m_localCentroid.y)
                     },
                     ResetProxy: function(a) {
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             return
                         }
                         var b = a.GetProxy(this.m_proxyId);
                         a.DestroyProxy(this.m_proxyId);
                         b = null;
                         var c = b2Math.b2MulMM(this.m_R, this.m_localOBB.R);
                         var d = b2Math.b2AbsM(c);
                         var e = b2Math.b2MulMV(d, this.m_localOBB.extents);
                         var f = b2Math.b2MulMV(this.m_R, this.m_localOBB.center);
                         f.Add(this.m_position);
                         var g = new b2AABB;
                         g.minVertex.SetV(f);
                         g.minVertex.Subtract(e);
                         g.maxVertex.SetV(f);
                         g.maxVertex.Add(e);
                         if (a.InRange(g)) {
                             this.m_proxyId = a.CreateProxy(g, this)
                         }
                         else {
                             this.m_proxyId = b2Pair.b2_nullProxy
                         }
                         if (this.m_proxyId == b2Pair.b2_nullProxy) {
                             this.m_body.Freeze()
                         }
                     },
                     Support: function(a, b, c) {
                         var d = a * this.m_R.col1.x + b * this.m_R.col1.y;
                         var e = a * this.m_R.col2.x + b * this.m_R.col2.y;
                         var f = 0;
                         var g = this.m_coreVertices[0].x * d + this.m_coreVertices[0].y * e;
                         for (var h = 1; h < this.m_vertexCount; ++h) {
                             var i = this.m_coreVertices[h].x * d + this.m_coreVertices[h].y * e;
                             if (i > g) {
                                 f = h;
                                 g = i
                             }
                         }
                         c.Set(this.m_position.x + (this.m_R.col1.x * this.m_coreVertices[f].x + this.m_R.col2.x * this.m_coreVertices[f].y), this.m_position.y + (this.m_R.col1.y * this.m_coreVertices[f].x + this.m_R.col2.y * this.m_coreVertices[f].y))
                     },
                     m_localCentroid: new b2Vec2,
                     m_localOBB: new b2OBB,
                     m_vertices: null,
                     m_coreVertices: null,
                     m_vertexCount: 0,
                     m_normals: null
                 });
                 b2PolyShape.tempVec = new b2Vec2;
                 b2PolyShape.tAbsR = new b2Mat22;
                 var b2Body = Class.create();
                 b2Body.prototype = {
                     SetOriginPosition: function(a, b) {
                         if (this.IsFrozen()) {
                             return
                         }
                         this.m_rotation = b;
                         this.m_R.Set(this.m_rotation);
                         this.m_position = b2Math.AddVV(a, b2Math.b2MulMV(this.m_R, this.m_center));
                         this.m_position0.SetV(this.m_position);
                         this.m_rotation0 = this.m_rotation;
                         for (var c = this.m_shapeList; c != null; c = c.m_next) {
                             c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
                         }
                         this.m_world.m_broadPhase.Commit()
                     },
                     GetOriginPosition: function() {
                         return b2Math.SubtractVV(this.m_position, b2Math.b2MulMV(this.m_R, this.m_center))
                     },
                     SetCenterPosition: function(a, b) {
                         if (this.IsFrozen()) {
                             return
                         }
                         this.m_rotation = b;
                         this.m_R.Set(this.m_rotation);
                         this.m_position.SetV(a);
                         this.m_position0.SetV(this.m_position);
                         this.m_rotation0 = this.m_rotation;
                         for (var c = this.m_shapeList; c != null; c = c.m_next) {
                             c.Synchronize(this.m_position, this.m_R, this.m_position, this.m_R)
                         }
                         this.m_world.m_broadPhase.Commit()
                     },
                     GetCenterPosition: function() {
                         return this.m_position
                     },
                     GetRotation: function() {
                         return this.m_rotation
                     },
                     GetRotationMatrix: function() {
                         return this.m_R
                     },
                     SetLinearVelocity: function(a) {
                         this.m_linearVelocity.SetV(a)
                     },
                     GetLinearVelocity: function() {
                         return this.m_linearVelocity
                     },
                     SetAngularVelocity: function(a) {
                         this.m_angularVelocity = a
                     },
                     GetAngularVelocity: function() {
                         return this.m_angularVelocity
                     },
                     ApplyForce: function(a, b) {
                         if (this.IsSleeping() == false) {
                             this.m_force.Add(a);
                             this.m_torque += b2Math.b2CrossVV(b2Math.SubtractVV(b, this.m_position), a)
                         }
                     },
                     ApplyTorque: function(a) {
                         if (this.IsSleeping() == false) {
                             this.m_torque += a
                         }
                     },
                     ApplyImpulse: function(a, b) {
                         if (this.IsSleeping() == false) {
                             this.m_linearVelocity.Add(b2Math.MulFV(this.m_invMass, a));
                             this.m_angularVelocity += this.m_invI * b2Math.b2CrossVV(b2Math.SubtractVV(b, this.m_position), a)
                         }
                     },
                     GetMass: function() {
                         return this.m_mass
                     },
                     GetInertia: function() {
                         return this.m_I
                     },
                     GetWorldPoint: function(a) {
                         return b2Math.AddVV(this.m_position, b2Math.b2MulMV(this.m_R, a))
                     },
                     GetWorldVector: function(a) {
                         return b2Math.b2MulMV(this.m_R, a)
                     },
                     GetLocalPoint: function(a) {
                         return b2Math.b2MulTMV(this.m_R, b2Math.SubtractVV(a, this.m_position))
                     },
                     GetLocalVector: function(a) {
                         return b2Math.b2MulTMV(this.m_R, a)
                     },
                     IsStatic: function() {
                         return (this.m_flags & b2Body.e_staticFlag) == b2Body.e_staticFlag
                     },
                     IsFrozen: function() {
                         return (this.m_flags & b2Body.e_frozenFlag) == b2Body.e_frozenFlag
                     },
                     IsSleeping: function() {
                         return (this.m_flags & b2Body.e_sleepFlag) == b2Body.e_sleepFlag
                     },
                     AllowSleeping: function(a) {
                         if (a) {
                             this.m_flags |= b2Body.e_allowSleepFlag
                         }
                         else {
                             this.m_flags &= ~b2Body.e_allowSleepFlag;
                             this.WakeUp()
                         }
                     },
                     WakeUp: function() {
                         this.m_flags &= ~b2Body.e_sleepFlag;
                         this.m_sleepTime = 0
                     },
                     GetShapeList: function() {
                         return this.m_shapeList
                     },
                     GetContactList: function() {
                         return this.m_contactList
                     },
                     GetJointList: function() {
                         return this.m_jointList
                     },
                     GetNext: function() {
                         return this.m_next
                     },
                     GetUserData: function() {
                         return this.m_userData
                     },
                     initialize: function(a, b) {
                         this.sMat0 = new b2Mat22;
                         this.m_position = new b2Vec2;
                         this.m_R = new b2Mat22(0);
                         this.m_position0 = new b2Vec2;
                         var c = 0;
                         var d;
                         var e;
                         this.m_flags = 0;
                         this.m_position.SetV(a.position);
                         this.m_rotation = a.rotation;
                         this.m_R.Set(this.m_rotation);
                         this.m_position0.SetV(this.m_position);
                         this.m_rotation0 = this.m_rotation;
                         this.m_world = b;
                         this.m_linearDamping = b2Math.b2Clamp(1 - a.linearDamping, 0, 1);
                         this.m_angularDamping = b2Math.b2Clamp(1 - a.angularDamping, 0, 1);
                         this.m_force = new b2Vec2(0, 0);
                         this.m_torque = 0;
                         this.m_mass = 0;
                         var f = new Array(b2Settings.b2_maxShapesPerBody);
                         for (c = 0; c < b2Settings.b2_maxShapesPerBody; c++) {
                             f[c] = new b2MassData
                         }
                         this.m_shapeCount = 0;
                         this.m_center = new b2Vec2(0, 0);
                         for (c = 0; c < b2Settings.b2_maxShapesPerBody; ++c) {
                             d = a.shapes[c];
                             if (d == null) break;
                             e = f[c];
                             d.ComputeMass(e);
                             this.m_mass += e.mass;
                             this.m_center.x += e.mass * (d.localPosition.x + e.center.x);
                             this.m_center.y += e.mass * (d.localPosition.y + e.center.y);
                             ++this.m_shapeCount
                         }
                         if (this.m_mass > 0) {
                             this.m_center.Multiply(1 / this.m_mass);
                             this.m_position.Add(b2Math.b2MulMV(this.m_R, this.m_center))
                         }
                         else {
                             this.m_flags |= b2Body.e_staticFlag
                         }
                         this.m_I = 0;
                         for (c = 0; c < this.m_shapeCount; ++c) {
                             d = a.shapes[c];
                             e = f[c];
                             this.m_I += e.I;
                             var g = b2Math.SubtractVV(b2Math.AddVV(d.localPosition, e.center), this.m_center);
                             this.m_I += e.mass * b2Math.b2Dot(g, g)
                         }
                         if (this.m_mass > 0) {
                             this.m_invMass = 1 / this.m_mass
                         }
                         else {
                             this.m_invMass = 0
                         }
                         if (this.m_I > 0 && a.preventRotation == false) {
                             this.m_invI = 1 / this.m_I
                         }
                         else {
                             this.m_I = 0;
                             this.m_invI = 0
                         }
                         this.m_linearVelocity = b2Math.AddVV(a.linearVelocity, b2Math.b2CrossFV(a.angularVelocity, this.m_center));
                         this.m_angularVelocity = a.angularVelocity;
                         this.m_jointList = null;
                         this.m_contactList = null;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_shapeList = null;
                         for (c = 0; c < this.m_shapeCount; ++c) {
                             d = a.shapes[c];
                             var h = b2Shape.Create(d, this, this.m_center);
                             h.m_next = this.m_shapeList;
                             this.m_shapeList = h
                         }
                         this.m_sleepTime = 0;
                         if (a.allowSleep) {
                             this.m_flags |= b2Body.e_allowSleepFlag
                         }
                         if (a.isSleeping) {
                             this.m_flags |= b2Body.e_sleepFlag
                         }
                         if (this.m_flags & b2Body.e_sleepFlag || this.m_invMass == 0) {
                             this.m_linearVelocity.Set(0, 0);
                             this.m_angularVelocity = 0
                         }
                         this.m_userData = a.userData
                     },
                     Destroy: function() {
                         var a = this.m_shapeList;
                         while (a) {
                             var b = a;
                             a = a.m_next;
                             b2Shape.Destroy(b)
                         }
                     },
                     sMat0: new b2Mat22,
                     SynchronizeShapes: function() {
                         this.sMat0.Set(this.m_rotation0);
                         for (var a = this.m_shapeList; a != null; a = a.m_next) {
                             a.Synchronize(this.m_position0, this.sMat0, this.m_position, this.m_R)
                         }
                     },
                     QuickSyncShapes: function() {
                         for (var a = this.m_shapeList; a != null; a = a.m_next) {
                             a.QuickSync(this.m_position, this.m_R)
                         }
                     },
                     IsConnected: function(a) {
                         for (var b = this.m_jointList; b != null; b = b.next) {
                             if (b.other == a) return b.joint.m_collideConnected == false
                         }
                         return false
                     },
                     Freeze: function() {
                         this.m_flags |= b2Body.e_frozenFlag;
                         this.m_linearVelocity.SetZero();
                         this.m_angularVelocity = 0;
                         for (var a = this.m_shapeList; a != null; a = a.m_next) {
                             a.DestroyProxy()
                         }
                     },
                     m_flags: 0,
                     m_position: new b2Vec2,
                     m_rotation: null,
                     m_R: new b2Mat22(0),
                     m_position0: new b2Vec2,
                     m_rotation0: null,
                     m_linearVelocity: null,
                     m_angularVelocity: null,
                     m_force: null,
                     m_torque: null,
                     m_center: null,
                     m_world: null,
                     m_prev: null,
                     m_next: null,
                     m_shapeList: null,
                     m_shapeCount: 0,
                     m_jointList: null,
                     m_contactList: null,
                     m_mass: null,
                     m_invMass: null,
                     m_I: null,
                     m_invI: null,
                     m_linearDamping: null,
                     m_angularDamping: null,
                     m_sleepTime: null,
                     m_userData: null
                 };
                 b2Body.e_staticFlag = 1;
                 b2Body.e_frozenFlag = 2;
                 b2Body.e_islandFlag = 4;
                 b2Body.e_sleepFlag = 8;
                 b2Body.e_allowSleepFlag = 16;
                 b2Body.e_destroyFlag = 32;
                 var b2BodyDef = Class.create();
                 b2BodyDef.prototype = {
                     initialize: function() {
                         this.shapes = new Array;
                         this.userData = null;
                         for (var a = 0; a < b2Settings.b2_maxShapesPerBody; a++) {
                             this.shapes[a] = null
                         }
                         this.position = new b2Vec2(0, 0);
                         this.rotation = 0;
                         this.linearVelocity = new b2Vec2(0, 0);
                         this.angularVelocity = 0;
                         this.linearDamping = 0;
                         this.angularDamping = 0;
                         this.allowSleep = true;
                         this.isSleeping = false;
                         this.preventRotation = false
                     },
                     userData: null,
                     shapes: new Array,
                     position: null,
                     rotation: null,
                     linearVelocity: null,
                     angularVelocity: null,
                     linearDamping: null,
                     angularDamping: null,
                     allowSleep: null,
                     isSleeping: null,
                     preventRotation: null,
                     AddShape: function(a) {
                         for (var b = 0; b < b2Settings.b2_maxShapesPerBody; ++b) {
                             if (this.shapes[b] == null) {
                                 this.shapes[b] = a;
                                 break
                             }
                         }
                     }
                 };
                 var b2CollisionFilter = Class.create();
                 b2CollisionFilter.prototype = {
                     ShouldCollide: function(a, b) {
                         if (a.m_groupIndex == b.m_groupIndex && a.m_groupIndex != 0) {
                             return a.m_groupIndex > 0
                         }
                         var c = (a.m_maskBits & b.m_categoryBits) != 0 && (a.m_categoryBits & b.m_maskBits) != 0;
                         return c
                     },
                     initialize: function() {}
                 };
                 b2CollisionFilter.b2_defaultFilter = new b2CollisionFilter;
                 var b2Island = Class.create();
                 b2Island.prototype = {
                     initialize: function(a, b, c, d) {
                         var e = 0;
                         this.m_bodyCapacity = a;
                         this.m_contactCapacity = b;
                         this.m_jointCapacity = c;
                         this.m_bodyCount = 0;
                         this.m_contactCount = 0;
                         this.m_jointCount = 0;
                         this.m_bodies = new Array(a);
                         for (e = 0; e < a; e++) this.m_bodies[e] = null;
                         this.m_contacts = new Array(b);
                         for (e = 0; e < b; e++) this.m_contacts[e] = null;
                         this.m_joints = new Array(c);
                         for (e = 0; e < c; e++) this.m_joints[e] = null;
                         this.m_allocator = d
                     },
                     Clear: function() {
                         this.m_bodyCount = 0;
                         this.m_contactCount = 0;
                         this.m_jointCount = 0
                     },
                     Solve: function(a, b) {
                         var c = 0;
                         var d;
                         for (c = 0; c < this.m_bodyCount; ++c) {
                             d = this.m_bodies[c];
                             if (d.m_invMass == 0) continue;
                             d.m_linearVelocity.Add(b2Math.MulFV(a.dt, b2Math.AddVV(b, b2Math.MulFV(d.m_invMass, d.m_force))));
                             d.m_angularVelocity += a.dt * d.m_invI * d.m_torque;
                             d.m_linearVelocity.Multiply(d.m_linearDamping);
                             d.m_angularVelocity *= d.m_angularDamping;
                             d.m_position0.SetV(d.m_position);
                             d.m_rotation0 = d.m_rotation
                         }
                         var e = new b2ContactSolver(this.m_contacts, this.m_contactCount, this.m_allocator);
                         e.PreSolve();
                         for (c = 0; c < this.m_jointCount; ++c) {
                             this.m_joints[c].PrepareVelocitySolver()
                         }
                         for (c = 0; c < a.iterations; ++c) {
                             e.SolveVelocityConstraints();
                             for (var f = 0; f < this.m_jointCount; ++f) {
                                 this.m_joints[f].SolveVelocityConstraints(a)
                             }
                         }
                         for (c = 0; c < this.m_bodyCount; ++c) {
                             d = this.m_bodies[c];
                             if (d.m_invMass == 0) continue;
                             d.m_position.x += a.dt * d.m_linearVelocity.x;
                             d.m_position.y += a.dt * d.m_linearVelocity.y;
                             d.m_rotation += a.dt * d.m_angularVelocity;
                             d.m_R.Set(d.m_rotation)
                         }
                         for (c = 0; c < this.m_jointCount; ++c) {
                             this.m_joints[c].PreparePositionSolver()
                         }
                         if (b2World.s_enablePositionCorrection) {
                             for (b2Island.m_positionIterationCount = 0; b2Island.m_positionIterationCount < a.iterations; ++b2Island.m_positionIterationCount) {
                                 var g = e.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
                                 var h = true;
                                 for (c = 0; c < this.m_jointCount; ++c) {
                                     var i = this.m_joints[c].SolvePositionConstraints();
                                     h = h && i
                                 }
                                 if (g && h) {
                                     break
                                 }
                             }
                         }
                         e.PostSolve();
                         for (c = 0; c < this.m_bodyCount; ++c) {
                             d = this.m_bodies[c];
                             if (d.m_invMass == 0) continue;
                             d.m_R.Set(d.m_rotation);
                             d.SynchronizeShapes();
                             d.m_force.Set(0, 0);
                             d.m_torque = 0
                         }
                     },
                     UpdateSleep: function(a) {
                         var b = 0;
                         var c;
                         var d = Number.MAX_VALUE;
                         var e = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
                         var f = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
                         for (b = 0; b < this.m_bodyCount; ++b) {
                             c = this.m_bodies[b];
                             if (c.m_invMass == 0) {
                                 continue
                             }
                             if ((c.m_flags & b2Body.e_allowSleepFlag) == 0) {
                                 c.m_sleepTime = 0;
                                 d = 0
                             }
                             if ((c.m_flags & b2Body.e_allowSleepFlag) == 0 || c.m_angularVelocity * c.m_angularVelocity > f || b2Math.b2Dot(c.m_linearVelocity, c.m_linearVelocity) > e) {
                                 c.m_sleepTime = 0;
                                 d = 0
                             }
                             else {
                                 c.m_sleepTime += a;
                                 d = b2Math.b2Min(d, c.m_sleepTime)
                             }
                         }
                         if (d >= b2Settings.b2_timeToSleep) {
                             for (b = 0; b < this.m_bodyCount; ++b) {
                                 c = this.m_bodies[b];
                                 c.m_flags |= b2Body.e_sleepFlag
                             }
                         }
                     },
                     AddBody: function(a) {
                         this.m_bodies[this.m_bodyCount++] = a
                     },
                     AddContact: function(a) {
                         this.m_contacts[this.m_contactCount++] = a
                     },
                     AddJoint: function(a) {
                         this.m_joints[this.m_jointCount++] = a
                     },
                     m_allocator: null,
                     m_bodies: null,
                     m_contacts: null,
                     m_joints: null,
                     m_bodyCount: 0,
                     m_jointCount: 0,
                     m_contactCount: 0,
                     m_bodyCapacity: 0,
                     m_contactCapacity: 0,
                     m_jointCapacity: 0,
                     m_positionError: null
                 };
                 b2Island.m_positionIterationCount = 0;
                 var b2TimeStep = Class.create();
                 b2TimeStep.prototype = {
                     dt: null,
                     inv_dt: null,
                     iterations: 0,
                     initialize: function() {}
                 };
                 var b2ContactNode = Class.create();
                 b2ContactNode.prototype = {
                     other: null,
                     contact: null,
                     prev: null,
                     next: null,
                     initialize: function() {}
                 };
                 var b2Contact = Class.create();
                 b2Contact.prototype = {
                     GetManifolds: function() {
                         return null
                     },
                     GetManifoldCount: function() {
                         return this.m_manifoldCount
                     },
                     GetNext: function() {
                         return this.m_next
                     },
                     GetShape1: function() {
                         return this.m_shape1
                     },
                     GetShape2: function() {
                         return this.m_shape2
                     },
                     initialize: function(a, b) {
                         this.m_node1 = new b2ContactNode;
                         this.m_node2 = new b2ContactNode;
                         this.m_flags = 0;
                         if (!a || !b) {
                             this.m_shape1 = null;
                             this.m_shape2 = null;
                             return
                         }
                         this.m_shape1 = a;
                         this.m_shape2 = b;
                         this.m_manifoldCount = 0;
                         this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
                         this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_node1.contact = null;
                         this.m_node1.prev = null;
                         this.m_node1.next = null;
                         this.m_node1.other = null;
                         this.m_node2.contact = null;
                         this.m_node2.prev = null;
                         this.m_node2.next = null;
                         this.m_node2.other = null
                     },
                     Evaluate: function() {},
                     m_flags: 0,
                     m_prev: null,
                     m_next: null,
                     m_node1: new b2ContactNode,
                     m_node2: new b2ContactNode,
                     m_shape1: null,
                     m_shape2: null,
                     m_manifoldCount: 0,
                     m_friction: null,
                     m_restitution: null
                 };
                 b2Contact.e_islandFlag = 1;
                 b2Contact.e_destroyFlag = 2;
                 b2Contact.AddType = function(a, b, c, d) {
                     b2Contact.s_registers[c][d].createFcn = a;
                     b2Contact.s_registers[c][d].destroyFcn = b;
                     b2Contact.s_registers[c][d].primary = true;
                     if (c != d) {
                         b2Contact.s_registers[d][c].createFcn = a;
                         b2Contact.s_registers[d][c].destroyFcn = b;
                         b2Contact.s_registers[d][c].primary = false
                     }
                 };
                 b2Contact.InitializeRegisters = function() {
                     b2Contact.s_registers = new Array(b2Shape.e_shapeTypeCount);
                     for (var a = 0; a < b2Shape.e_shapeTypeCount; a++) {
                         b2Contact.s_registers[a] = new Array(b2Shape.e_shapeTypeCount);
                         for (var b = 0; b < b2Shape.e_shapeTypeCount; b++) {
                             b2Contact.s_registers[a][b] = new b2ContactRegister
                         }
                     }
                     b2Contact.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
                     b2Contact.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polyShape, b2Shape.e_circleShape);
                     b2Contact.AddType(b2PolyContact.Create, b2PolyContact.Destroy, b2Shape.e_polyShape, b2Shape.e_polyShape)
                 };
                 b2Contact.Create = function(a, b, c) {
                     if (b2Contact.s_initialized == false) {
                         b2Contact.InitializeRegisters();
                         b2Contact.s_initialized = true
                     }
                     var d = a.m_type;
                     var e = b.m_type;
                     var f = b2Contact.s_registers[d][e].createFcn;
                     if (f) {
                         if (b2Contact.s_registers[d][e].primary) {
                             return f(a, b, c)
                         }
                         else {
                             var g = f(b, a, c);
                             for (var h = 0; h < g.GetManifoldCount(); ++h) {
                                 var i = g.GetManifolds()[h];
                                 i.normal = i.normal.Negative()
                             }
                             return g
                         }
                     }
                     else {
                         return null
                     }
                 };
                 b2Contact.Destroy = function(a, b) {
                     if (a.GetManifoldCount() > 0) {
                         a.m_shape1.m_body.WakeUp();
                         a.m_shape2.m_body.WakeUp()
                     }
                     var c = a.m_shape1.m_type;
                     var d = a.m_shape2.m_type;
                     var e = b2Contact.s_registers[c][d].destroyFcn;
                     e(a, b)
                 };
                 b2Contact.s_registers = null;
                 b2Contact.s_initialized = false;
                 var b2ContactConstraint = Class.create();
                 b2ContactConstraint.prototype = {
                     initialize: function() {
                         this.normal = new b2Vec2;
                         this.points = new Array(b2Settings.b2_maxManifoldPoints);
                         for (var a = 0; a < b2Settings.b2_maxManifoldPoints; a++) {
                             this.points[a] = new b2ContactConstraintPoint
                         }
                     },
                     points: null,
                     normal: new b2Vec2,
                     manifold: null,
                     body1: null,
                     body2: null,
                     friction: null,
                     restitution: null,
                     pointCount: 0
                 };
                 var b2ContactConstraintPoint = Class.create();
                 b2ContactConstraintPoint.prototype = {
                     localAnchor1: new b2Vec2,
                     localAnchor2: new b2Vec2,
                     normalImpulse: null,
                     tangentImpulse: null,
                     positionImpulse: null,
                     normalMass: null,
                     tangentMass: null,
                     separation: null,
                     velocityBias: null,
                     initialize: function() {
                         this.localAnchor1 = new b2Vec2;
                         this.localAnchor2 = new b2Vec2
                     }
                 };
                 var b2ContactRegister = Class.create();
                 b2ContactRegister.prototype = {
                     createFcn: null,
                     destroyFcn: null,
                     primary: null,
                     initialize: function() {}
                 };
                 var b2ContactSolver = Class.create();
                 b2ContactSolver.prototype = {
                     initialize: function(a, b, c) {
                         this.m_constraints = new Array;
                         this.m_allocator = c;
                         var d = 0;
                         var e;
                         var f;
                         this.m_constraintCount = 0;
                         for (d = 0; d < b; ++d) {
                             this.m_constraintCount += a[d].GetManifoldCount()
                         }
                         for (d = 0; d < this.m_constraintCount; d++) {
                             this.m_constraints[d] = new b2ContactConstraint
                         }
                         var g = 0;
                         for (d = 0; d < b; ++d) {
                             var h = a[d];
                             var i = h.m_shape1.m_body;
                             var j = h.m_shape2.m_body;
                             var k = h.GetManifoldCount();
                             var l = h.GetManifolds();
                             var m = h.m_friction;
                             var n = h.m_restitution;
                             var o = i.m_linearVelocity.x;
                             var p = i.m_linearVelocity.y;
                             var q = j.m_linearVelocity.x;
                             var r = j.m_linearVelocity.y;
                             var s = i.m_angularVelocity;
                             var t = j.m_angularVelocity;
                             for (var u = 0; u < k; ++u) {
                                 var v = l[u];
                                 var w = v.normal.x;
                                 var x = v.normal.y;
                                 var y = this.m_constraints[g];
                                 y.body1 = i;
                                 y.body2 = j;
                                 y.manifold = v;
                                 y.normal.x = w;
                                 y.normal.y = x;
                                 y.pointCount = v.pointCount;
                                 y.friction = m;
                                 y.restitution = n;
                                 for (var z = 0; z < y.pointCount; ++z) {
                                     var A = v.points[z];
                                     var B = y.points[z];
                                     B.normalImpulse = A.normalImpulse;
                                     B.tangentImpulse = A.tangentImpulse;
                                     B.separation = A.separation;
                                     var C = A.position.x - i.m_position.x;
                                     var D = A.position.y - i.m_position.y;
                                     var E = A.position.x - j.m_position.x;
                                     var F = A.position.y - j.m_position.y;
                                     e = B.localAnchor1;
                                     f = i.m_R;
                                     e.x = C * f.col1.x + D * f.col1.y;
                                     e.y = C * f.col2.x + D * f.col2.y;
                                     e = B.localAnchor2;
                                     f = j.m_R;
                                     e.x = E * f.col1.x + F * f.col1.y;
                                     e.y = E * f.col2.x + F * f.col2.y;
                                     var G = C * C + D * D;
                                     var H = E * E + F * F;
                                     var I = C * w + D * x;
                                     var J = E * w + F * x;
                                     var K = i.m_invMass + j.m_invMass;
                                     K += i.m_invI * (G - I * I) + j.m_invI * (H - J * J);
                                     B.normalMass = 1 / K;
                                     var L = x;
                                     var M = -w;
                                     var N = C * L + D * M;
                                     var O = E * L + F * M;
                                     var P = i.m_invMass + j.m_invMass;
                                     P += i.m_invI * (G - N * N) + j.m_invI * (H - O * O);
                                     B.tangentMass = 1 / P;
                                     B.velocityBias = 0;
                                     if (B.separation > 0) {
                                         B.velocityBias = -60 * B.separation
                                     }
                                     var Q = q + -t * F - o - -s * D;
                                     var R = r + t * E - p - s * C;
                                     var S = y.normal.x * Q + y.normal.y * R;
                                     if (S < -b2Settings.b2_velocityThreshold) {
                                         B.velocityBias += -y.restitution * S
                                     }
                                 }++g
                             }
                         }
                     },
                     PreSolve: function() {
                         var a;
                         var b;
                         var c;
                         for (var d = 0; d < this.m_constraintCount; ++d) {
                             var e = this.m_constraints[d];
                             var f = e.body1;
                             var g = e.body2;
                             var h = f.m_invMass;
                             var i = f.m_invI;
                             var j = g.m_invMass;
                             var k = g.m_invI;
                             var l = e.normal.x;
                             var m = e.normal.y;
                             var n = m;
                             var o = -l;
                             var p = 0;
                             var q = 0;
                             if (b2World.s_enableWarmStarting) {
                                 q = e.pointCount;
                                 for (p = 0; p < q; ++p) {
                                     var r = e.points[p];
                                     var s = r.normalImpulse * l + r.tangentImpulse * n;
                                     var t = r.normalImpulse * m + r.tangentImpulse * o;
                                     c = f.m_R;
                                     a = r.localAnchor1;
                                     var u = c.col1.x * a.x + c.col2.x * a.y;
                                     var v = c.col1.y * a.x + c.col2.y * a.y;
                                     c = g.m_R;
                                     a = r.localAnchor2;
                                     var w = c.col1.x * a.x + c.col2.x * a.y;
                                     var x = c.col1.y * a.x + c.col2.y * a.y;
                                     f.m_angularVelocity -= i * (u * t - v * s);
                                     f.m_linearVelocity.x -= h * s;
                                     f.m_linearVelocity.y -= h * t;
                                     g.m_angularVelocity += k * (w * t - x * s);
                                     g.m_linearVelocity.x += j * s;
                                     g.m_linearVelocity.y += j * t;
                                     r.positionImpulse = 0
                                 }
                             }
                             else {
                                 q = e.pointCount;
                                 for (p = 0; p < q; ++p) {
                                     var y = e.points[p];
                                     y.normalImpulse = 0;
                                     y.tangentImpulse = 0;
                                     y.positionImpulse = 0
                                 }
                             }
                         }
                     },
                     SolveVelocityConstraints: function() {
                         var a = 0;
                         var b;
                         var c;
                         var d;
                         var e;
                         var f;
                         var g;
                         var h;
                         var i;
                         var j;
                         var k;
                         var l;
                         var m;
                         var n;
                         for (var o = 0; o < this.m_constraintCount; ++o) {
                             var p = this.m_constraints[o];
                             var q = p.body1;
                             var r = p.body2;
                             var s = q.m_angularVelocity;
                             var t = q.m_linearVelocity;
                             var u = r.m_angularVelocity;
                             var v = r.m_linearVelocity;
                             var w = q.m_invMass;
                             var x = q.m_invI;
                             var y = r.m_invMass;
                             var z = r.m_invI;
                             var A = p.normal.x;
                             var B = p.normal.y;
                             var C = B;
                             var D = -A;
                             var E = p.pointCount;
                             for (a = 0; a < E; ++a) {
                                 b = p.points[a];
                                 m = q.m_R;
                                 n = b.localAnchor1;
                                 c = m.col1.x * n.x + m.col2.x * n.y;
                                 d = m.col1.y * n.x + m.col2.y * n.y;
                                 m = r.m_R;
                                 n = b.localAnchor2;
                                 e = m.col1.x * n.x + m.col2.x * n.y;
                                 f = m.col1.y * n.x + m.col2.y * n.y;
                                 g = v.x + -u * f - t.x - -s * d;
                                 h = v.y + u * e - t.y - s * c;
                                 var F = g * A + h * B;
                                 i = -b.normalMass * (F - b.velocityBias);
                                 j = b2Math.b2Max(b.normalImpulse + i, 0);
                                 i = j - b.normalImpulse;
                                 k = i * A;
                                 l = i * B;
                                 t.x -= w * k;
                                 t.y -= w * l;
                                 s -= x * (c * l - d * k);
                                 v.x += y * k;
                                 v.y += y * l;
                                 u += z * (e * l - f * k);
                                 b.normalImpulse = j;
                                 g = v.x + -u * f - t.x - -s * d;
                                 h = v.y + u * e - t.y - s * c;
                                 var G = g * C + h * D;
                                 i = b.tangentMass * -G;
                                 var H = p.friction * b.normalImpulse;
                                 j = b2Math.b2Clamp(b.tangentImpulse + i, -H, H);
                                 i = j - b.tangentImpulse;
                                 k = i * C;
                                 l = i * D;
                                 t.x -= w * k;
                                 t.y -= w * l;
                                 s -= x * (c * l - d * k);
                                 v.x += y * k;
                                 v.y += y * l;
                                 u += z * (e * l - f * k);
                                 b.tangentImpulse = j
                             }
                             q.m_angularVelocity = s;
                             r.m_angularVelocity = u
                         }
                     },
                     SolvePositionConstraints: function(a) {
                         var b = 0;
                         var c;
                         var d;
                         for (var e = 0; e < this.m_constraintCount; ++e) {
                             var f = this.m_constraints[e];
                             var g = f.body1;
                             var h = f.body2;
                             var i = g.m_position;
                             var j = g.m_rotation;
                             var k = h.m_position;
                             var l = h.m_rotation;
                             var m = g.m_invMass;
                             var n = g.m_invI;
                             var o = h.m_invMass;
                             var p = h.m_invI;
                             var q = f.normal.x;
                             var r = f.normal.y;
                             var s = r;
                             var t = -q;
                             var u = f.pointCount;
                             for (var v = 0; v < u; ++v) {
                                 var w = f.points[v];
                                 c = g.m_R;
                                 d = w.localAnchor1;
                                 var x = c.col1.x * d.x + c.col2.x * d.y;
                                 var y = c.col1.y * d.x + c.col2.y * d.y;
                                 c = h.m_R;
                                 d = w.localAnchor2;
                                 var z = c.col1.x * d.x + c.col2.x * d.y;
                                 var A = c.col1.y * d.x + c.col2.y * d.y;
                                 var B = i.x + x;
                                 var C = i.y + y;
                                 var D = k.x + z;
                                 var E = k.y + A;
                                 var F = D - B;
                                 var G = E - C;
                                 var H = F * q + G * r + w.separation;
                                 b = b2Math.b2Min(b, H);
                                 var I = a * b2Math.b2Clamp(H + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                                 var J = -w.normalMass * I;
                                 var K = w.positionImpulse;
                                 w.positionImpulse = b2Math.b2Max(K + J, 0);
                                 J = w.positionImpulse - K;
                                 var L = J * q;
                                 var M = J * r;
                                 i.x -= m * L;
                                 i.y -= m * M;
                                 j -= n * (x * M - y * L);
                                 g.m_R.Set(j);
                                 k.x += o * L;
                                 k.y += o * M;
                                 l += p * (z * M - A * L);
                                 h.m_R.Set(l)
                             }
                             g.m_rotation = j;
                             h.m_rotation = l
                         }
                         return b >= -b2Settings.b2_linearSlop
                     },
                     PostSolve: function() {
                         for (var a = 0; a < this.m_constraintCount; ++a) {
                             var b = this.m_constraints[a];
                             var c = b.manifold;
                             for (var d = 0; d < b.pointCount; ++d) {
                                 var e = c.points[d];
                                 var f = b.points[d];
                                 e.normalImpulse = f.normalImpulse;
                                 e.tangentImpulse = f.tangentImpulse
                             }
                         }
                     },
                     m_allocator: null,
                     m_constraints: new Array,
                     m_constraintCount: 0
                 };
                 var b2CircleContact = Class.create();
                 Object.extend(b2CircleContact.prototype, b2Contact.prototype);
                 Object.extend(b2CircleContact.prototype, {
                     initialize: function(a, b) {
                         this.m_node1 = new b2ContactNode;
                         this.m_node2 = new b2ContactNode;
                         this.m_flags = 0;
                         if (!a || !b) {
                             this.m_shape1 = null;
                             this.m_shape2 = null;
                             return
                         }
                         this.m_shape1 = a;
                         this.m_shape2 = b;
                         this.m_manifoldCount = 0;
                         this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
                         this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_node1.contact = null;
                         this.m_node1.prev = null;
                         this.m_node1.next = null;
                         this.m_node1.other = null;
                         this.m_node2.contact = null;
                         this.m_node2.prev = null;
                         this.m_node2.next = null;
                         this.m_node2.other = null;
                         this.m_manifold = [new b2Manifold];
                         this.m_manifold[0].pointCount = 0;
                         this.m_manifold[0].points[0].normalImpulse = 0;
                         this.m_manifold[0].points[0].tangentImpulse = 0
                     },
                     Evaluate: function() {
                         b2Collision.b2CollideCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, false);
                         if (this.m_manifold[0].pointCount > 0) {
                             this.m_manifoldCount = 1
                         }
                         else {
                             this.m_manifoldCount = 0
                         }
                     },
                     GetManifolds: function() {
                         return this.m_manifold
                     },
                     m_manifold: [new b2Manifold]
                 });
                 b2CircleContact.Create = function(a, b, c) {
                     return new b2CircleContact(a, b)
                 };
                 b2CircleContact.Destroy = function(a, b) {};
                 var b2Conservative = Class.create();
                 b2Conservative.prototype = {
                     initialize: function() {}
                 };
                 b2Conservative.R1 = new b2Mat22;
                 b2Conservative.R2 = new b2Mat22;
                 b2Conservative.x1 = new b2Vec2;
                 b2Conservative.x2 = new b2Vec2;
                 b2Conservative.Conservative = function(a, b) {
                     var c = a.GetBody();
                     var e = b.GetBody();
                     var f = c.m_position.x - c.m_position0.x;
                     var g = c.m_position.y - c.m_position0.y;
                     var h = c.m_rotation - c.m_rotation0;
                     var i = e.m_position.x - e.m_position0.x;
                     var j = e.m_position.y - e.m_position0.y;
                     var k = e.m_rotation - e.m_rotation0;
                     var l = a.GetMaxRadius();
                     var m = b.GetMaxRadius();
                     var n = c.m_position0.x;
                     var o = c.m_position0.y;
                     var p = c.m_rotation0;
                     var q = e.m_position0.x;
                     var r = e.m_position0.y;
                     var s = e.m_rotation0;
                     var t = n;
                     var u = o;
                     var v = p;
                     var w = q;
                     var x = r;
                     var y = s;
                     b2Conservative.R1.Set(v);
                     b2Conservative.R2.Set(y);
                     a.QuickSync(p1, b2Conservative.R1);
                     b.QuickSync(p2, b2Conservative.R2);
                     var z = 0;
                     var A = 10;
                     var B;
                     var C;
                     var D = 0;
                     var E = true;
                     for (var F = 0; F < A; ++F) {
                         var G = b2Distance.Distance(b2Conservative.x1, b2Conservative.x2, a, b);
                         if (G < b2Settings.b2_linearSlop) {
                             if (F == 0) {
                                 E = false
                             }
                             else {
                                 E = true
                             }
                             break
                         }
                         if (F == 0) {
                             B = b2Conservative.x2.x - b2Conservative.x1.x;
                             C = b2Conservative.x2.y - b2Conservative.x1.y;
                             var H = Math.sqrt(B * B + C * C);
                             var I = B * (f - i) + C * (g - j) + Math.abs(h) * l + Math.abs(k) * m;
                             if (Math.abs(I) < Number.MIN_VALUE) {
                                 E = false;
                                 break
                             }
                             D = 1 / I
                         }
                         var J = G * D;
                         var K = z + J;
                         if (K < 0 || 1 < K) {
                             E = false;
                             break
                         }
                         if (K < (1 + 100 * Number.MIN_VALUE) * z) {
                             E = true;
                             break
                         }
                         z = K;
                         t = n + z * v1.x;
                         u = o + z * v1.y;
                         v = p + z * h;
                         w = q + z * v2.x;
                         x = r + z * v2.y;
                         y = s + z * k;
                         b2Conservative.R1.Set(v);
                         b2Conservative.R2.Set(y);
                         a.QuickSync(p1, b2Conservative.R1);
                         b.QuickSync(p2, b2Conservative.R2)
                     }
                     if (E) {
                         B = b2Conservative.x2.x - b2Conservative.x1.x;
                         C = b2Conservative.x2.y - b2Conservative.x1.y;
                         var L = Math.sqrt(B * B + C * C);
                         if (L > FLT_EPSILON) {
                             d *= b2_linearSlop / L
                         }
                         if (c.IsStatic()) {
                             c.m_position.x = t;
                             c.m_position.y = u
                         }
                         else {
                             c.m_position.x = t - B;
                             c.m_position.y = u - C
                         }
                         c.m_rotation = v;
                         c.m_R.Set(v);
                         c.QuickSyncShapes();
                         if (e.IsStatic()) {
                             e.m_position.x = w;
                             e.m_position.y = x
                         }
                         else {
                             e.m_position.x = w + B;
                             e.m_position.y = x + C
                         }
                         e.m_position.x = w + B;
                         e.m_position.y = x + C;
                         e.m_rotation = y;
                         e.m_R.Set(y);
                         e.QuickSyncShapes();
                         return true
                     }
                     a.QuickSync(c.m_position, c.m_R);
                     b.QuickSync(e.m_position, e.m_R);
                     return false
                 };
                 var b2NullContact = Class.create();
                 Object.extend(b2NullContact.prototype, b2Contact.prototype);
                 Object.extend(b2NullContact.prototype, {
                     initialize: function(a, b) {
                         this.m_node1 = new b2ContactNode;
                         this.m_node2 = new b2ContactNode;
                         this.m_flags = 0;
                         if (!a || !b) {
                             this.m_shape1 = null;
                             this.m_shape2 = null;
                             return
                         }
                         this.m_shape1 = a;
                         this.m_shape2 = b;
                         this.m_manifoldCount = 0;
                         this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
                         this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_node1.contact = null;
                         this.m_node1.prev = null;
                         this.m_node1.next = null;
                         this.m_node1.other = null;
                         this.m_node2.contact = null;
                         this.m_node2.prev = null;
                         this.m_node2.next = null;
                         this.m_node2.other = null
                     },
                     Evaluate: function() {},
                     GetManifolds: function() {
                         return null
                     }
                 });
                 var b2PolyAndCircleContact = Class.create();
                 Object.extend(b2PolyAndCircleContact.prototype, b2Contact.prototype);
                 Object.extend(b2PolyAndCircleContact.prototype, {
                     initialize: function(a, b) {
                         this.m_node1 = new b2ContactNode;
                         this.m_node2 = new b2ContactNode;
                         this.m_flags = 0;
                         if (!a || !b) {
                             this.m_shape1 = null;
                             this.m_shape2 = null;
                             return
                         }
                         this.m_shape1 = a;
                         this.m_shape2 = b;
                         this.m_manifoldCount = 0;
                         this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
                         this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_node1.contact = null;
                         this.m_node1.prev = null;
                         this.m_node1.next = null;
                         this.m_node1.other = null;
                         this.m_node2.contact = null;
                         this.m_node2.prev = null;
                         this.m_node2.next = null;
                         this.m_node2.other = null;
                         this.m_manifold = [new b2Manifold];
                         b2Settings.b2Assert(this.m_shape1.m_type == b2Shape.e_polyShape);
                         b2Settings.b2Assert(this.m_shape2.m_type == b2Shape.e_circleShape);
                         this.m_manifold[0].pointCount = 0;
                         this.m_manifold[0].points[0].normalImpulse = 0;
                         this.m_manifold[0].points[0].tangentImpulse = 0
                     },
                     Evaluate: function() {
                         b2Collision.b2CollidePolyAndCircle(this.m_manifold[0], this.m_shape1, this.m_shape2, false);
                         if (this.m_manifold[0].pointCount > 0) {
                             this.m_manifoldCount = 1
                         }
                         else {
                             this.m_manifoldCount = 0
                         }
                     },
                     GetManifolds: function() {
                         return this.m_manifold
                     },
                     m_manifold: [new b2Manifold]
                 });
                 b2PolyAndCircleContact.Create = function(a, b, c) {
                     return new b2PolyAndCircleContact(a, b)
                 };
                 b2PolyAndCircleContact.Destroy = function(a, b) {};
                 var b2PolyContact = Class.create();
                 Object.extend(b2PolyContact.prototype, b2Contact.prototype);
                 Object.extend(b2PolyContact.prototype, {
                     initialize: function(a, b) {
                         this.m_node1 = new b2ContactNode;
                         this.m_node2 = new b2ContactNode;
                         this.m_flags = 0;
                         if (!a || !b) {
                             this.m_shape1 = null;
                             this.m_shape2 = null;
                             return
                         }
                         this.m_shape1 = a;
                         this.m_shape2 = b;
                         this.m_manifoldCount = 0;
                         this.m_friction = Math.sqrt(this.m_shape1.m_friction * this.m_shape2.m_friction);
                         this.m_restitution = b2Math.b2Max(this.m_shape1.m_restitution, this.m_shape2.m_restitution);
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_node1.contact = null;
                         this.m_node1.prev = null;
                         this.m_node1.next = null;
                         this.m_node1.other = null;
                         this.m_node2.contact = null;
                         this.m_node2.prev = null;
                         this.m_node2.next = null;
                         this.m_node2.other = null;
                         this.m0 = new b2Manifold;
                         this.m_manifold = [new b2Manifold];
                         this.m_manifold[0].pointCount = 0
                     },
                     m0: new b2Manifold,
                     Evaluate: function() {
                         var a = this.m_manifold[0];
                         var b = this.m0.points;
                         for (var c = 0; c < a.pointCount; c++) {
                             var d = b[c];
                             var e = a.points[c];
                             d.normalImpulse = e.normalImpulse;
                             d.tangentImpulse = e.tangentImpulse;
                             d.id = e.id.Copy()
                         }
                         this.m0.pointCount = a.pointCount;
                         b2Collision.b2CollidePoly(a, this.m_shape1, this.m_shape2, false);
                         if (a.pointCount > 0) {
                             var f = [false, false];
                             for (var g = 0; g < a.pointCount; ++g) {
                                 var h = a.points[g];
                                 h.normalImpulse = 0;
                                 h.tangentImpulse = 0;
                                 var i = h.id.key;
                                 for (var j = 0; j < this.m0.pointCount; ++j) {
                                     if (f[j] == true) continue;
                                     var k = this.m0.points[j];
                                     var l = k.id;
                                     if (l.key == i) {
                                         f[j] = true;
                                         h.normalImpulse = k.normalImpulse;
                                         h.tangentImpulse = k.tangentImpulse;
                                         break
                                     }
                                 }
                             }
                             this.m_manifoldCount = 1
                         }
                         else {
                             this.m_manifoldCount = 0
                         }
                     },
                     GetManifolds: function() {
                         return this.m_manifold
                     },
                     m_manifold: [new b2Manifold]
                 });
                 b2PolyContact.Create = function(a, b, c) {
                     return new b2PolyContact(a, b)
                 };
                 b2PolyContact.Destroy = function(a, b) {};
                 var b2ContactManager = Class.create();
                 Object.extend(b2ContactManager.prototype, b2PairCallback.prototype);
                 Object.extend(b2ContactManager.prototype, {
                     initialize: function() {
                         this.m_nullContact = new b2NullContact;
                         this.m_world = null;
                         this.m_destroyImmediate = false
                     },
                     PairAdded: function(a, b) {
                         var c = a;
                         var d = b;
                         var e = c.m_body;
                         var f = d.m_body;
                         if (e.IsStatic() && f.IsStatic()) {
                             return this.m_nullContact
                         }
                         if (c.m_body == d.m_body) {
                             return this.m_nullContact
                         }
                         if (f.IsConnected(e)) {
                             return this.m_nullContact
                         }
                         if (this.m_world.m_filter != null && this.m_world.m_filter.ShouldCollide(c, d) == false) {
                             return this.m_nullContact
                         }
                         if (f.m_invMass == 0) {
                             var g = c;
                             c = d;
                             d = g;
                             var h = e;
                             e = f;
                             f = h
                         }
                         var i = b2Contact.Create(c, d, this.m_world.m_blockAllocator);
                         if (i == null) {
                             return this.m_nullContact
                         }
                         else {
                             i.m_prev = null;
                             i.m_next = this.m_world.m_contactList;
                             if (this.m_world.m_contactList != null) {
                                 this.m_world.m_contactList.m_prev = i
                             }
                             this.m_world.m_contactList = i;
                             this.m_world.m_contactCount++
                         }
                         return i
                     },
                     PairRemoved: function(a, b, c) {
                         if (c == null) {
                             return
                         }
                         var d = c;
                         if (d != this.m_nullContact) {
                             if (this.m_destroyImmediate == true) {
                                 this.DestroyContact(d);
                                 d = null
                             }
                             else {
                                 d.m_flags |= b2Contact.e_destroyFlag
                             }
                         }
                     },
                     DestroyContact: function(a) {
                         if (a.m_prev) {
                             a.m_prev.m_next = a.m_next
                         }
                         if (a.m_next) {
                             a.m_next.m_prev = a.m_prev
                         }
                         if (a == this.m_world.m_contactList) {
                             this.m_world.m_contactList = a.m_next
                         }
                         if (a.GetManifoldCount() > 0) {
                             var b = a.m_shape1.m_body;
                             var c = a.m_shape2.m_body;
                             var d = a.m_node1;
                             var e = a.m_node2;
                             b.WakeUp();
                             c.WakeUp();
                             if (d.prev) {
                                 d.prev.next = d.next
                             }
                             if (d.next) {
                                 d.next.prev = d.prev
                             }
                             if (d == b.m_contactList) {
                                 b.m_contactList = d.next
                             }
                             d.prev = null;
                             d.next = null;
                             if (e.prev) {
                                 e.prev.next = e.next
                             }
                             if (e.next) {
                                 e.next.prev = e.prev
                             }
                             if (e == c.m_contactList) {
                                 c.m_contactList = e.next
                             }
                             e.prev = null;
                             e.next = null
                         }
                         b2Contact.Destroy(a, this.m_world.m_blockAllocator);
                         --this.m_world.m_contactCount
                     },
                     CleanContactList: function() {
                         var a = this.m_world.m_contactList;
                         while (a != null) {
                             var b = a;
                             a = a.m_next;
                             if (b.m_flags & b2Contact.e_destroyFlag) {
                                 this.DestroyContact(b);
                                 b = null
                             }
                         }
                     },
                     Collide: function() {
                         var a;
                         var b;
                         var c;
                         var d;
                         for (var e = this.m_world.m_contactList; e != null; e = e.m_next) {
                             if (e.m_shape1.m_body.IsSleeping() && e.m_shape2.m_body.IsSleeping()) {
                                 continue
                             }
                             var f = e.GetManifoldCount();
                             e.Evaluate();
                             var g = e.GetManifoldCount();
                             if (f == 0 && g > 0) {
                                 a = e.m_shape1.m_body;
                                 b = e.m_shape2.m_body;
                                 c = e.m_node1;
                                 d = e.m_node2;
                                 c.contact = e;
                                 c.other = b;
                                 c.prev = null;
                                 c.next = a.m_contactList;
                                 if (c.next != null) {
                                     c.next.prev = e.m_node1
                                 }
                                 a.m_contactList = e.m_node1;
                                 d.contact = e;
                                 d.other = a;
                                 d.prev = null;
                                 d.next = b.m_contactList;
                                 if (d.next != null) {
                                     d.next.prev = d
                                 }
                                 b.m_contactList = d
                             }
                             else if (f > 0 && g == 0) {
                                 a = e.m_shape1.m_body;
                                 b = e.m_shape2.m_body;
                                 c = e.m_node1;
                                 d = e.m_node2;
                                 if (c.prev) {
                                     c.prev.next = c.next
                                 }
                                 if (c.next) {
                                     c.next.prev = c.prev
                                 }
                                 if (c == a.m_contactList) {
                                     a.m_contactList = c.next
                                 }
                                 c.prev = null;
                                 c.next = null;
                                 if (d.prev) {
                                     d.prev.next = d.next
                                 }
                                 if (d.next) {
                                     d.next.prev = d.prev
                                 }
                                 if (d == b.m_contactList) {
                                     b.m_contactList = d.next
                                 }
                                 d.prev = null;
                                 d.next = null
                             }
                         }
                     },
                     m_world: null,
                     m_nullContact: new b2NullContact,
                     m_destroyImmediate: null
                 });
                 var b2World = Class.create();
                 b2World.prototype = {
                     initialize: function(a, b, c) {
                         this.step = new b2TimeStep;
                         this.m_contactManager = new b2ContactManager;
                         this.m_listener = null;
                         this.m_filter = b2CollisionFilter.b2_defaultFilter;
                         this.m_bodyList = null;
                         this.m_contactList = null;
                         this.m_jointList = null;
                         this.m_bodyCount = 0;
                         this.m_contactCount = 0;
                         this.m_jointCount = 0;
                         this.m_bodyDestroyList = null;
                         this.m_allowSleep = c;
                         this.m_gravity = b;
                         this.m_contactManager.m_world = this;
                         this.m_broadPhase = new b2BroadPhase(a, this.m_contactManager);
                         var d = new b2BodyDef;
                         this.m_groundBody = this.CreateBody(d)
                     },
                     SetListener: function(a) {
                         this.m_listener = a
                     },
                     SetFilter: function(a) {
                         this.m_filter = a
                     },
                     CreateBody: function(a) {
                         var b = new b2Body(a, this);
                         b.m_prev = null;
                         b.m_next = this.m_bodyList;
                         if (this.m_bodyList) {
                             this.m_bodyList.m_prev = b
                         }
                         this.m_bodyList = b;
                         ++this.m_bodyCount;
                         return b
                     },
                     DestroyBody: function(a) {
                         if (a.m_flags & b2Body.e_destroyFlag) {
                             return
                         }
                         if (a.m_prev) {
                             a.m_prev.m_next = a.m_next
                         }
                         if (a.m_next) {
                             a.m_next.m_prev = a.m_prev
                         }
                         if (a == this.m_bodyList) {
                             this.m_bodyList = a.m_next
                         }
                         a.m_flags |= b2Body.e_destroyFlag;
                         --this.m_bodyCount;
                         a.m_prev = null;
                         a.m_next = this.m_bodyDestroyList;
                         this.m_bodyDestroyList = a
                     },
                     CleanBodyList: function() {
                         this.m_contactManager.m_destroyImmediate = true;
                         var a = this.m_bodyDestroyList;
                         while (a) {
                             var b = a;
                             a = a.m_next;
                             var c = b.m_jointList;
                             while (c) {
                                 var d = c;
                                 c = c.next;
                                 if (this.m_listener) {
                                     this.m_listener.NotifyJointDestroyed(d.joint)
                                 }
                                 this.DestroyJoint(d.joint)
                             }
                             b.Destroy()
                         }
                         this.m_bodyDestroyList = null;
                         this.m_contactManager.m_destroyImmediate = false
                     },
                     CreateJoint: function(a) {
                         var b = b2Joint.Create(a, this.m_blockAllocator);
                         b.m_prev = null;
                         b.m_next = this.m_jointList;
                         if (this.m_jointList) {
                             this.m_jointList.m_prev = b
                         }
                         this.m_jointList = b;
                         ++this.m_jointCount;
                         b.m_node1.joint = b;
                         b.m_node1.other = b.m_body2;
                         b.m_node1.prev = null;
                         b.m_node1.next = b.m_body1.m_jointList;
                         if (b.m_body1.m_jointList) b.m_body1.m_jointList.prev = b.m_node1;
                         b.m_body1.m_jointList = b.m_node1;
                         b.m_node2.joint = b;
                         b.m_node2.other = b.m_body1;
                         b.m_node2.prev = null;
                         b.m_node2.next = b.m_body2.m_jointList;
                         if (b.m_body2.m_jointList) b.m_body2.m_jointList.prev = b.m_node2;
                         b.m_body2.m_jointList = b.m_node2;
                         if (a.collideConnected == false) {
                             var c = a.body1.m_shapeCount < a.body2.m_shapeCount ? a.body1 : a.body2;
                             for (var d = c.m_shapeList; d; d = d.m_next) {
                                 d.ResetProxy(this.m_broadPhase)
                             }
                         }
                         return b
                     },
                     DestroyJoint: function(a) {
                         var b = a.m_collideConnected;
                         if (a.m_prev) {
                             a.m_prev.m_next = a.m_next
                         }
                         if (a.m_next) {
                             a.m_next.m_prev = a.m_prev
                         }
                         if (a == this.m_jointList) {
                             this.m_jointList = a.m_next
                         }
                         var c = a.m_body1;
                         var d = a.m_body2;
                         c.WakeUp();
                         d.WakeUp();
                         if (a.m_node1.prev) {
                             a.m_node1.prev.next = a.m_node1.next
                         }
                         if (a.m_node1.next) {
                             a.m_node1.next.prev = a.m_node1.prev
                         }
                         if (a.m_node1 == c.m_jointList) {
                             c.m_jointList = a.m_node1.next
                         }
                         a.m_node1.prev = null;
                         a.m_node1.next = null;
                         if (a.m_node2.prev) {
                             a.m_node2.prev.next = a.m_node2.next
                         }
                         if (a.m_node2.next) {
                             a.m_node2.next.prev = a.m_node2.prev
                         }
                         if (a.m_node2 == d.m_jointList) {
                             d.m_jointList = a.m_node2.next
                         }
                         a.m_node2.prev = null;
                         a.m_node2.next = null;
                         b2Joint.Destroy(a, this.m_blockAllocator);
                         --this.m_jointCount;
                         if (b == false) {
                             var e = c.m_shapeCount < d.m_shapeCount ? c : d;
                             for (var f = e.m_shapeList; f; f = f.m_next) {
                                 f.ResetProxy(this.m_broadPhase)
                             }
                         }
                     },
                     GetGroundBody: function() {
                         return this.m_groundBody
                     },
                     step: new b2TimeStep,
                     Step: function(a, b) {
                         var c;
                         var d;
                         this.step.dt = a;
                         this.step.iterations = b;
                         if (a > 0) {
                             this.step.inv_dt = 1 / a
                         }
                         else {
                             this.step.inv_dt = 0
                         }
                         this.m_positionIterationCount = 0;
                         this.m_contactManager.CleanContactList();
                         this.CleanBodyList();
                         this.m_contactManager.Collide();
                         var e = new b2Island(this.m_bodyCount, this.m_contactCount, this.m_jointCount, this.m_stackAllocator);
                         for (c = this.m_bodyList; c != null; c = c.m_next) {
                             c.m_flags &= ~b2Body.e_islandFlag
                         }
                         for (var f = this.m_contactList; f != null; f = f.m_next) {
                             f.m_flags &= ~b2Contact.e_islandFlag
                         }
                         for (var g = this.m_jointList; g != null; g = g.m_next) {
                             g.m_islandFlag = false
                         }
                         var h = this.m_bodyCount;
                         var i = new Array(this.m_bodyCount);
                         for (var j = 0; j < this.m_bodyCount; j++) i[j] = null;
                         for (var k = this.m_bodyList; k != null; k = k.m_next) {
                             if (k.m_flags & (b2Body.e_staticFlag | b2Body.e_islandFlag | b2Body.e_sleepFlag | b2Body.e_frozenFlag)) {
                                 continue
                             }
                             e.Clear();
                             var l = 0;
                             i[l++] = k;
                             k.m_flags |= b2Body.e_islandFlag;
                             while (l > 0) {
                                 c = i[--l];
                                 e.AddBody(c);
                                 c.m_flags &= ~b2Body.e_sleepFlag;
                                 if (c.m_flags & b2Body.e_staticFlag) {
                                     continue
                                 }
                                 for (var m = c.m_contactList; m != null; m = m.next) {
                                     if (m.contact.m_flags & b2Contact.e_islandFlag) {
                                         continue
                                     }
                                     e.AddContact(m.contact);
                                     m.contact.m_flags |= b2Contact.e_islandFlag;
                                     d = m.other;
                                     if (d.m_flags & b2Body.e_islandFlag) {
                                         continue
                                     }
                                     i[l++] = d;
                                     d.m_flags |= b2Body.e_islandFlag
                                 }
                                 for (var n = c.m_jointList; n != null; n = n.next) {
                                     if (n.joint.m_islandFlag == true) {
                                         continue
                                     }
                                     e.AddJoint(n.joint);
                                     n.joint.m_islandFlag = true;
                                     d = n.other;
                                     if (d.m_flags & b2Body.e_islandFlag) {
                                         continue
                                     }
                                     i[l++] = d;
                                     d.m_flags |= b2Body.e_islandFlag
                                 }
                             }
                             e.Solve(this.step, this.m_gravity);
                             this.m_positionIterationCount = b2Math.b2Max(this.m_positionIterationCount, b2Island.m_positionIterationCount);
                             if (this.m_allowSleep) {
                                 e.UpdateSleep(a)
                             }
                             for (var o = 0; o < e.m_bodyCount; ++o) {
                                 c = e.m_bodies[o];
                                 if (c.m_flags & b2Body.e_staticFlag) {
                                     c.m_flags &= ~b2Body.e_islandFlag
                                 }
                                 if (c.IsFrozen() && this.m_listener) {
                                     var p = this.m_listener.NotifyBoundaryViolated(c);
                                     if (p == b2WorldListener.b2_destroyBody) {
                                         this.DestroyBody(c);
                                         c = null;
                                         e.m_bodies[o] = null
                                     }
                                 }
                             }
                         }
                         this.m_broadPhase.Commit()
                     },
                     Query: function(a, b, c) {
                         var d = new Array;
                         var e = this.m_broadPhase.QueryAABB(a, d, c);
                         for (var f = 0; f < e; ++f) {
                             b[f] = d[f]
                         }
                         return e
                     },
                     GetBodyList: function() {
                         return this.m_bodyList
                     },
                     GetJointList: function() {
                         return this.m_jointList
                     },
                     GetContactList: function() {
                         return this.m_contactList
                     },
                     m_blockAllocator: null,
                     m_stackAllocator: null,
                     m_broadPhase: null,
                     m_contactManager: new b2ContactManager,
                     m_bodyList: null,
                     m_contactList: null,
                     m_jointList: null,
                     m_bodyCount: 0,
                     m_contactCount: 0,
                     m_jointCount: 0,
                     m_bodyDestroyList: null,
                     m_gravity: null,
                     m_allowSleep: null,
                     m_groundBody: null,
                     m_listener: null,
                     m_filter: null,
                     m_positionIterationCount: 0
                 };
                 b2World.s_enablePositionCorrection = 1;
                 b2World.s_enableWarmStarting = 1;
                 var b2WorldListener = Class.create();
                 b2WorldListener.prototype = {
                     NotifyJointDestroyed: function(a) {},
                     NotifyBoundaryViolated: function(a) {
                         return b2WorldListener.b2_freezeBody
                     },
                     initialize: function() {}
                 };
                 b2WorldListener.b2_freezeBody = 0;
                 b2WorldListener.b2_destroyBody = 1;
                 var b2JointNode = Class.create();
                 b2JointNode.prototype = {
                     other: null,
                     joint: null,
                     prev: null,
                     next: null,
                     initialize: function() {}
                 };
                 var b2Joint = Class.create();
                 b2Joint.prototype = {
                     GetType: function() {
                         return this.m_type
                     },
                     GetAnchor1: function() {
                         return null
                     },
                     GetAnchor2: function() {
                         return null
                     },
                     GetReactionForce: function(a) {
                         return null
                     },
                     GetReactionTorque: function(a) {
                         return 0
                     },
                     GetBody1: function() {
                         return this.m_body1
                     },
                     GetBody2: function() {
                         return this.m_body2
                     },
                     GetNext: function() {
                         return this.m_next
                     },
                     GetUserData: function() {
                         return this.m_userData
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData
                     },
                     PrepareVelocitySolver: function() {},
                     SolveVelocityConstraints: function(a) {},
                     PreparePositionSolver: function() {},
                     SolvePositionConstraints: function() {
                         return false
                     },
                     m_type: 0,
                     m_prev: null,
                     m_next: null,
                     m_node1: new b2JointNode,
                     m_node2: new b2JointNode,
                     m_body1: null,
                     m_body2: null,
                     m_islandFlag: null,
                     m_collideConnected: null,
                     m_userData: null
                 };
                 b2Joint.Create = function(a, b) {
                     var c = null;
                     switch (a.type) {
                         case b2Joint.e_distanceJoint:
                             {
                                 c = new b2DistanceJoint(a)
                             }
                             break;
                         case b2Joint.e_mouseJoint:
                             {
                                 c = new b2MouseJoint(a)
                             }
                             break;
                         case b2Joint.e_prismaticJoint:
                             {
                                 c = new b2PrismaticJoint(a)
                             }
                             break;
                         case b2Joint.e_revoluteJoint:
                             {
                                 c = new b2RevoluteJoint(a)
                             }
                             break;
                         case b2Joint.e_pulleyJoint:
                             {
                                 c = new b2PulleyJoint(a)
                             }
                             break;
                         case b2Joint.e_gearJoint:
                             {
                                 c = new b2GearJoint(a)
                             }
                             break;
                         default:
                             break
                     }
                     return c
                 };
                 b2Joint.Destroy = function(a, b) {};
                 b2Joint.e_unknownJoint = 0;
                 b2Joint.e_revoluteJoint = 1;
                 b2Joint.e_prismaticJoint = 2;
                 b2Joint.e_distanceJoint = 3;
                 b2Joint.e_pulleyJoint = 4;
                 b2Joint.e_mouseJoint = 5;
                 b2Joint.e_gearJoint = 6;
                 b2Joint.e_inactiveLimit = 0;
                 b2Joint.e_atLowerLimit = 1;
                 b2Joint.e_atUpperLimit = 2;
                 b2Joint.e_equalLimits = 3;
                 var b2JointDef = Class.create();
                 b2JointDef.prototype = {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false
                     },
                     type: 0,
                     userData: null,
                     body1: null,
                     body2: null,
                     collideConnected: null
                 };
                 var b2DistanceJoint = Class.create();
                 Object.extend(b2DistanceJoint.prototype, b2Joint.prototype);
                 Object.extend(b2DistanceJoint.prototype, {
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.m_localAnchor1 = new b2Vec2;
                         this.m_localAnchor2 = new b2Vec2;
                         this.m_u = new b2Vec2;
                         var b;
                         var c;
                         var d;
                         b = this.m_body1.m_R;
                         c = a.anchorPoint1.x - this.m_body1.m_position.x;
                         d = a.anchorPoint1.y - this.m_body1.m_position.y;
                         this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
                         b = this.m_body2.m_R;
                         c = a.anchorPoint2.x - this.m_body2.m_position.x;
                         d = a.anchorPoint2.y - this.m_body2.m_position.y;
                         this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
                         c = a.anchorPoint2.x - a.anchorPoint1.x;
                         d = a.anchorPoint2.y - a.anchorPoint1.y;
                         this.m_length = Math.sqrt(c * c + d * d);
                         this.m_impulse = 0
                     },
                     PrepareVelocitySolver: function() {
                         var a;
                         a = this.m_body1.m_R;
                         var b = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y;
                         var c = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
                         a = this.m_body2.m_R;
                         var d = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
                         var e = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
                         this.m_u.x = this.m_body2.m_position.x + d - this.m_body1.m_position.x - b;
                         this.m_u.y = this.m_body2.m_position.y + e - this.m_body1.m_position.y - c;
                         var f = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
                         if (f > b2Settings.b2_linearSlop) {
                             this.m_u.Multiply(1 / f)
                         }
                         else {
                             this.m_u.SetZero()
                         }
                         var g = b * this.m_u.y - c * this.m_u.x;
                         var h = d * this.m_u.y - e * this.m_u.x;
                         this.m_mass = this.m_body1.m_invMass + this.m_body1.m_invI * g * g + this.m_body2.m_invMass + this.m_body2.m_invI * h * h;
                         this.m_mass = 1 / this.m_mass;
                         if (b2World.s_enableWarmStarting) {
                             var i = this.m_impulse * this.m_u.x;
                             var j = this.m_impulse * this.m_u.y;
                             this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * i;
                             this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * j;
                             this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (b * j - c * i);
                             this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * i;
                             this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * j;
                             this.m_body2.m_angularVelocity += this.m_body2.m_invI * (d * j - e * i)
                         }
                         else {
                             this.m_impulse = 0
                         }
                     },
                     SolveVelocityConstraints: function(a) {
                         var b;
                         b = this.m_body1.m_R;
                         var c = b.col1.x * this.m_localAnchor1.x + b.col2.x * this.m_localAnchor1.y;
                         var d = b.col1.y * this.m_localAnchor1.x + b.col2.y * this.m_localAnchor1.y;
                         b = this.m_body2.m_R;
                         var e = b.col1.x * this.m_localAnchor2.x + b.col2.x * this.m_localAnchor2.y;
                         var f = b.col1.y * this.m_localAnchor2.x + b.col2.y * this.m_localAnchor2.y;
                         var g = this.m_body1.m_linearVelocity.x + -this.m_body1.m_angularVelocity * d;
                         var h = this.m_body1.m_linearVelocity.y + this.m_body1.m_angularVelocity * c;
                         var i = this.m_body2.m_linearVelocity.x + -this.m_body2.m_angularVelocity * f;
                         var j = this.m_body2.m_linearVelocity.y + this.m_body2.m_angularVelocity * e;
                         var k = this.m_u.x * (i - g) + this.m_u.y * (j - h);
                         var l = -this.m_mass * k;
                         this.m_impulse += l;
                         var m = l * this.m_u.x;
                         var n = l * this.m_u.y;
                         this.m_body1.m_linearVelocity.x -= this.m_body1.m_invMass * m;
                         this.m_body1.m_linearVelocity.y -= this.m_body1.m_invMass * n;
                         this.m_body1.m_angularVelocity -= this.m_body1.m_invI * (c * n - d * m);
                         this.m_body2.m_linearVelocity.x += this.m_body2.m_invMass * m;
                         this.m_body2.m_linearVelocity.y += this.m_body2.m_invMass * n;
                         this.m_body2.m_angularVelocity += this.m_body2.m_invI * (e * n - f * m)
                     },
                     SolvePositionConstraints: function() {
                         var a;
                         a = this.m_body1.m_R;
                         var b = a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y;
                         var c = a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y;
                         a = this.m_body2.m_R;
                         var d = a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y;
                         var e = a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y;
                         var f = this.m_body2.m_position.x + d - this.m_body1.m_position.x - b;
                         var g = this.m_body2.m_position.y + e - this.m_body1.m_position.y - c;
                         var h = Math.sqrt(f * f + g * g);
                         f /= h;
                         g /= h;
                         var i = h - this.m_length;
                         i = b2Math.b2Clamp(i, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                         var j = -this.m_mass * i;
                         this.m_u.Set(f, g);
                         var k = j * this.m_u.x;
                         var l = j * this.m_u.y;
                         this.m_body1.m_position.x -= this.m_body1.m_invMass * k;
                         this.m_body1.m_position.y -= this.m_body1.m_invMass * l;
                         this.m_body1.m_rotation -= this.m_body1.m_invI * (b * l - c * k);
                         this.m_body2.m_position.x += this.m_body2.m_invMass * k;
                         this.m_body2.m_position.y += this.m_body2.m_invMass * l;
                         this.m_body2.m_rotation += this.m_body2.m_invI * (d * l - e * k);
                         this.m_body1.m_R.Set(this.m_body1.m_rotation);
                         this.m_body2.m_R.Set(this.m_body2.m_rotation);
                         return b2Math.b2Abs(i) < b2Settings.b2_linearSlop
                     },
                     GetAnchor1: function() {
                         return b2Math.AddVV(this.m_body1.m_position, b2Math.b2MulMV(this.m_body1.m_R, this.m_localAnchor1))
                     },
                     GetAnchor2: function() {
                         return b2Math.AddVV(this.m_body2.m_position, b2Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor2))
                     },
                     GetReactionForce: function(a) {
                         var b = new b2Vec2;
                         b.SetV(this.m_u);
                         b.Multiply(this.m_impulse * a);
                         return b
                     },
                     GetReactionTorque: function(a) {
                         return 0
                     },
                     m_localAnchor1: new b2Vec2,
                     m_localAnchor2: new b2Vec2,
                     m_u: new b2Vec2,
                     m_impulse: null,
                     m_mass: null,
                     m_length: null
                 });
                 var b2DistanceJointDef = Class.create();
                 Object.extend(b2DistanceJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2DistanceJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false;
                         this.anchorPoint1 = new b2Vec2;
                         this.anchorPoint2 = new b2Vec2;
                         this.type = b2Joint.e_distanceJoint
                     },
                     anchorPoint1: new b2Vec2,
                     anchorPoint2: new b2Vec2
                 });
                 var b2Jacobian = Class.create();
                 b2Jacobian.prototype = {
                     linear1: new b2Vec2,
                     angular1: null,
                     linear2: new b2Vec2,
                     angular2: null,
                     SetZero: function() {
                         this.linear1.SetZero();
                         this.angular1 = 0;
                         this.linear2.SetZero();
                         this.angular2 = 0
                     },
                     Set: function(a, b, c, d) {
                         this.linear1.SetV(a);
                         this.angular1 = b;
                         this.linear2.SetV(c);
                         this.angular2 = d
                     },
                     Compute: function(a, b, c, d) {
                         return this.linear1.x * a.x + this.linear1.y * a.y + this.angular1 * b + (this.linear2.x * c.x + this.linear2.y * c.y) + this.angular2 * d
                     },
                     initialize: function() {
                         this.linear1 = new b2Vec2;
                         this.linear2 = new b2Vec2
                     }
                 };
                 var b2GearJoint = Class.create();
                 Object.extend(b2GearJoint.prototype, b2Joint.prototype);
                 Object.extend(b2GearJoint.prototype, {
                     GetAnchor1: function() {
                         var a = this.m_body1.m_R;
                         return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
                     },
                     GetAnchor2: function() {
                         var a = this.m_body2.m_R;
                         return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
                     },
                     GetReactionForce: function(a) {
                         return new b2Vec2
                     },
                     GetReactionTorque: function(a) {
                         return 0
                     },
                     GetRatio: function() {
                         return this.m_ratio
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.m_groundAnchor1 = new b2Vec2;
                         this.m_groundAnchor2 = new b2Vec2;
                         this.m_localAnchor1 = new b2Vec2;
                         this.m_localAnchor2 = new b2Vec2;
                         this.m_J = new b2Jacobian;
                         this.m_revolute1 = null;
                         this.m_prismatic1 = null;
                         this.m_revolute2 = null;
                         this.m_prismatic2 = null;
                         var b;
                         var c;
                         this.m_ground1 = a.joint1.m_body1;
                         this.m_body1 = a.joint1.m_body2;
                         if (a.joint1.m_type == b2Joint.e_revoluteJoint) {
                             this.m_revolute1 = a.joint1;
                             this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
                             this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
                             b = this.m_revolute1.GetJointAngle()
                         }
                         else {
                             this.m_prismatic1 = a.joint1;
                             this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
                             this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
                             b = this.m_prismatic1.GetJointTranslation()
                         }
                         this.m_ground2 = a.joint2.m_body1;
                         this.m_body2 = a.joint2.m_body2;
                         if (a.joint2.m_type == b2Joint.e_revoluteJoint) {
                             this.m_revolute2 = a.joint2;
                             this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
                             this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
                             c = this.m_revolute2.GetJointAngle()
                         }
                         else {
                             this.m_prismatic2 = a.joint2;
                             this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
                             this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
                             c = this.m_prismatic2.GetJointTranslation()
                         }
                         this.m_ratio = a.ratio;
                         this.m_constant = b + this.m_ratio * c;
                         this.m_impulse = 0
                     },
                     PrepareVelocitySolver: function() {
                         var a = this.m_ground1;
                         var b = this.m_ground2;
                         var c = this.m_body1;
                         var d = this.m_body2;
                         var e;
                         var f;
                         var g;
                         var h;
                         var i;
                         var j;
                         var k;
                         var l = 0;
                         this.m_J.SetZero();
                         if (this.m_revolute1) {
                             this.m_J.angular1 = -1;
                             l += c.m_invI
                         }
                         else {
                             i = a.m_R;
                             j = this.m_prismatic1.m_localXAxis1;
                             e = i.col1.x * j.x + i.col2.x * j.y;
                             f = i.col1.y * j.x + i.col2.y * j.y;
                             i = c.m_R;
                             g = i.col1.x * this.m_localAnchor1.x + i.col2.x * this.m_localAnchor1.y;
                             h = i.col1.y * this.m_localAnchor1.x + i.col2.y * this.m_localAnchor1.y;
                             k = g * f - h * e;
                             this.m_J.linear1.Set(-e, -f);
                             this.m_J.angular1 = -k;
                             l += c.m_invMass + c.m_invI * k * k
                         }
                         if (this.m_revolute2) {
                             this.m_J.angular2 = -this.m_ratio;
                             l += this.m_ratio * this.m_ratio * d.m_invI
                         }
                         else {
                             i = b.m_R;
                             j = this.m_prismatic2.m_localXAxis1;
                             e = i.col1.x * j.x + i.col2.x * j.y;
                             f = i.col1.y * j.x + i.col2.y * j.y;
                             i = d.m_R;
                             g = i.col1.x * this.m_localAnchor2.x + i.col2.x * this.m_localAnchor2.y;
                             h = i.col1.y * this.m_localAnchor2.x + i.col2.y * this.m_localAnchor2.y;
                             k = g * f - h * e;
                             this.m_J.linear2.Set(-this.m_ratio * e, -this.m_ratio * f);
                             this.m_J.angular2 = -this.m_ratio * k;
                             l += this.m_ratio * this.m_ratio * (d.m_invMass + d.m_invI * k * k)
                         }
                         this.m_mass = 1 / l;
                         c.m_linearVelocity.x += c.m_invMass * this.m_impulse * this.m_J.linear1.x;
                         c.m_linearVelocity.y += c.m_invMass * this.m_impulse * this.m_J.linear1.y;
                         c.m_angularVelocity += c.m_invI * this.m_impulse * this.m_J.angular1;
                         d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linear2.x;
                         d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linear2.y;
                         d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angular2
                     },
                     SolveVelocityConstraints: function(a) {
                         var b = this.m_body1;
                         var c = this.m_body2;
                         var d = this.m_J.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity);
                         var e = -this.m_mass * d;
                         this.m_impulse += e;
                         b.m_linearVelocity.x += b.m_invMass * e * this.m_J.linear1.x;
                         b.m_linearVelocity.y += b.m_invMass * e * this.m_J.linear1.y;
                         b.m_angularVelocity += b.m_invI * e * this.m_J.angular1;
                         c.m_linearVelocity.x += c.m_invMass * e * this.m_J.linear2.x;
                         c.m_linearVelocity.y += c.m_invMass * e * this.m_J.linear2.y;
                         c.m_angularVelocity += c.m_invI * e * this.m_J.angular2
                     },
                     SolvePositionConstraints: function() {
                         var a = 0;
                         var b = this.m_body1;
                         var c = this.m_body2;
                         var d;
                         var e;
                         if (this.m_revolute1) {
                             d = this.m_revolute1.GetJointAngle()
                         }
                         else {
                             d = this.m_prismatic1.GetJointTranslation()
                         }
                         if (this.m_revolute2) {
                             e = this.m_revolute2.GetJointAngle()
                         }
                         else {
                             e = this.m_prismatic2.GetJointTranslation()
                         }
                         var f = this.m_constant - (d + this.m_ratio * e);
                         var g = -this.m_mass * f;
                         b.m_position.x += b.m_invMass * g * this.m_J.linear1.x;
                         b.m_position.y += b.m_invMass * g * this.m_J.linear1.y;
                         b.m_rotation += b.m_invI * g * this.m_J.angular1;
                         c.m_position.x += c.m_invMass * g * this.m_J.linear2.x;
                         c.m_position.y += c.m_invMass * g * this.m_J.linear2.y;
                         c.m_rotation += c.m_invI * g * this.m_J.angular2;
                         b.m_R.Set(b.m_rotation);
                         c.m_R.Set(c.m_rotation);
                         return a < b2Settings.b2_linearSlop
                     },
                     m_ground1: null,
                     m_ground2: null,
                     m_revolute1: null,
                     m_prismatic1: null,
                     m_revolute2: null,
                     m_prismatic2: null,
                     m_groundAnchor1: new b2Vec2,
                     m_groundAnchor2: new b2Vec2,
                     m_localAnchor1: new b2Vec2,
                     m_localAnchor2: new b2Vec2,
                     m_J: new b2Jacobian,
                     m_constant: null,
                     m_ratio: null,
                     m_mass: null,
                     m_impulse: null
                 });
                 var b2GearJointDef = Class.create();
                 Object.extend(b2GearJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2GearJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_gearJoint;
                         this.joint1 = null;
                         this.joint2 = null;
                         this.ratio = 1
                     },
                     joint1: null,
                     joint2: null,
                     ratio: null
                 });
                 var b2MouseJoint = Class.create();
                 Object.extend(b2MouseJoint.prototype, b2Joint.prototype);
                 Object.extend(b2MouseJoint.prototype, {
                     GetAnchor1: function() {
                         return this.m_target
                     },
                     GetAnchor2: function() {
                         var a = b2Math.b2MulMV(this.m_body2.m_R, this.m_localAnchor);
                         a.Add(this.m_body2.m_position);
                         return a
                     },
                     GetReactionForce: function(a) {
                         var b = new b2Vec2;
                         b.SetV(this.m_impulse);
                         b.Multiply(a);
                         return b
                     },
                     GetReactionTorque: function(a) {
                         return 0
                     },
                     SetTarget: function(a) {
                         this.m_body2.WakeUp();
                         this.m_target = a
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.K = new b2Mat22;
                         this.K1 = new b2Mat22;
                         this.K2 = new b2Mat22;
                         this.m_localAnchor = new b2Vec2;
                         this.m_target = new b2Vec2;
                         this.m_impulse = new b2Vec2;
                         this.m_ptpMass = new b2Mat22;
                         this.m_C = new b2Vec2;
                         this.m_target.SetV(a.target);
                         var b = this.m_target.x - this.m_body2.m_position.x;
                         var c = this.m_target.y - this.m_body2.m_position.y;
                         this.m_localAnchor.x = b * this.m_body2.m_R.col1.x + c * this.m_body2.m_R.col1.y;
                         this.m_localAnchor.y = b * this.m_body2.m_R.col2.x + c * this.m_body2.m_R.col2.y;
                         this.m_maxForce = a.maxForce;
                         this.m_impulse.SetZero();
                         var d = this.m_body2.m_mass;
                         var e = 2 * b2Settings.b2_pi * a.frequencyHz;
                         var f = 2 * d * a.dampingRatio * e;
                         var g = d * e * e;
                         this.m_gamma = 1 / (f + a.timeStep * g);
                         this.m_beta = a.timeStep * g / (f + a.timeStep * g)
                     },
                     K: new b2Mat22,
                     K1: new b2Mat22,
                     K2: new b2Mat22,
                     PrepareVelocitySolver: function() {
                         var a = this.m_body2;
                         var b;
                         b = a.m_R;
                         var c = b.col1.x * this.m_localAnchor.x + b.col2.x * this.m_localAnchor.y;
                         var d = b.col1.y * this.m_localAnchor.x + b.col2.y * this.m_localAnchor.y;
                         var e = a.m_invMass;
                         var f = a.m_invI;
                         this.K1.col1.x = e;
                         this.K1.col2.x = 0;
                         this.K1.col1.y = 0;
                         this.K1.col2.y = e;
                         this.K2.col1.x = f * d * d;
                         this.K2.col2.x = -f * c * d;
                         this.K2.col1.y = -f * c * d;
                         this.K2.col2.y = f * c * c;
                         this.K.SetM(this.K1);
                         this.K.AddM(this.K2);
                         this.K.col1.x += this.m_gamma;
                         this.K.col2.y += this.m_gamma;
                         this.K.Invert(this.m_ptpMass);
                         this.m_C.x = a.m_position.x + c - this.m_target.x;
                         this.m_C.y = a.m_position.y + d - this.m_target.y;
                         a.m_angularVelocity *= .98;
                         var g = this.m_impulse.x;
                         var h = this.m_impulse.y;
                         a.m_linearVelocity.x += e * g;
                         a.m_linearVelocity.y += e * h;
                         a.m_angularVelocity += f * (c * h - d * g)
                     },
                     SolveVelocityConstraints: function(a) {
                         var b = this.m_body2;
                         var c;
                         c = b.m_R;
                         var d = c.col1.x * this.m_localAnchor.x + c.col2.x * this.m_localAnchor.y;
                         var e = c.col1.y * this.m_localAnchor.x + c.col2.y * this.m_localAnchor.y;
                         var f = b.m_linearVelocity.x + -b.m_angularVelocity * e;
                         var g = b.m_linearVelocity.y + b.m_angularVelocity * d;
                         c = this.m_ptpMass;
                         var h = f + this.m_beta * a.inv_dt * this.m_C.x + this.m_gamma * this.m_impulse.x;
                         var i = g + this.m_beta * a.inv_dt * this.m_C.y + this.m_gamma * this.m_impulse.y;
                         var j = -(c.col1.x * h + c.col2.x * i);
                         var k = -(c.col1.y * h + c.col2.y * i);
                         var l = this.m_impulse.x;
                         var m = this.m_impulse.y;
                         this.m_impulse.x += j;
                         this.m_impulse.y += k;
                         var n = this.m_impulse.Length();
                         if (n > a.dt * this.m_maxForce) {
                             this.m_impulse.Multiply(a.dt * this.m_maxForce / n)
                         }
                         j = this.m_impulse.x - l;
                         k = this.m_impulse.y - m;
                         b.m_linearVelocity.x += b.m_invMass * j;
                         b.m_linearVelocity.y += b.m_invMass * k;
                         b.m_angularVelocity += b.m_invI * (d * k - e * j)
                     },
                     SolvePositionConstraints: function() {
                         return true
                     },
                     m_localAnchor: new b2Vec2,
                     m_target: new b2Vec2,
                     m_impulse: new b2Vec2,
                     m_ptpMass: new b2Mat22,
                     m_C: new b2Vec2,
                     m_maxForce: null,
                     m_beta: null,
                     m_gamma: null
                 });
                 var b2MouseJointDef = Class.create();
                 Object.extend(b2MouseJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2MouseJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false;
                         this.target = new b2Vec2;
                         this.type = b2Joint.e_mouseJoint;
                         this.maxForce = 0;
                         this.frequencyHz = 5;
                         this.dampingRatio = .7;
                         this.timeStep = 1 / 60
                     },
                     target: new b2Vec2,
                     maxForce: null,
                     frequencyHz: null,
                     dampingRatio: null,
                     timeStep: null
                 });
                 var b2PrismaticJoint = Class.create();
                 Object.extend(b2PrismaticJoint.prototype, b2Joint.prototype);
                 Object.extend(b2PrismaticJoint.prototype, {
                     GetAnchor1: function() {
                         var a = this.m_body1;
                         var b = new b2Vec2;
                         b.SetV(this.m_localAnchor1);
                         b.MulM(a.m_R);
                         b.Add(a.m_position);
                         return b
                     },
                     GetAnchor2: function() {
                         var a = this.m_body2;
                         var b = new b2Vec2;
                         b.SetV(this.m_localAnchor2);
                         b.MulM(a.m_R);
                         b.Add(a.m_position);
                         return b
                     },
                     GetJointTranslation: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         c = a.m_R;
                         var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                         var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                         c = b.m_R;
                         var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                         var g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                         var h = a.m_position.x + d;
                         var i = a.m_position.y + e;
                         var j = b.m_position.x + f;
                         var k = b.m_position.y + g;
                         var l = j - h;
                         var m = k - i;
                         c = a.m_R;
                         var n = c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y;
                         var o = c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y;
                         var p = n * l + o * m;
                         return p
                     },
                     GetJointSpeed: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         c = a.m_R;
                         var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                         var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                         c = b.m_R;
                         var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                         var g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                         var h = a.m_position.x + d;
                         var i = a.m_position.y + e;
                         var j = b.m_position.x + f;
                         var k = b.m_position.y + g;
                         var l = j - h;
                         var m = k - i;
                         c = a.m_R;
                         var n = c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y;
                         var o = c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y;
                         var p = a.m_linearVelocity;
                         var q = b.m_linearVelocity;
                         var r = a.m_angularVelocity;
                         var s = b.m_angularVelocity;
                         var t = l * -r * o + m * r * n + (n * (q.x + -s * g - p.x - -r * e) + o * (q.y + s * f - p.y - r * d));
                         return t
                     },
                     GetMotorForce: function(a) {
                         return a * this.m_motorImpulse
                     },
                     SetMotorSpeed: function(a) {
                         this.m_motorSpeed = a
                     },
                     SetMotorForce: function(a) {
                         this.m_maxMotorForce = a
                     },
                     GetReactionForce: function(a) {
                         var b = a * this.m_limitImpulse;
                         var c;
                         c = this.m_body1.m_R;
                         var d = b * (c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y);
                         var e = b * (c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y);
                         var f = b * (c.col1.x * this.m_localYAxis1.x + c.col2.x * this.m_localYAxis1.y);
                         var g = b * (c.col1.y * this.m_localYAxis1.x + c.col2.y * this.m_localYAxis1.y);
                         return new b2Vec2(d + f, e + g)
                     },
                     GetReactionTorque: function(a) {
                         return a * this.m_angularImpulse
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.m_localAnchor1 = new b2Vec2;
                         this.m_localAnchor2 = new b2Vec2;
                         this.m_localXAxis1 = new b2Vec2;
                         this.m_localYAxis1 = new b2Vec2;
                         this.m_linearJacobian = new b2Jacobian;
                         this.m_motorJacobian = new b2Jacobian;
                         var b;
                         var c;
                         var d;
                         b = this.m_body1.m_R;
                         c = a.anchorPoint.x - this.m_body1.m_position.x;
                         d = a.anchorPoint.y - this.m_body1.m_position.y;
                         this.m_localAnchor1.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
                         b = this.m_body2.m_R;
                         c = a.anchorPoint.x - this.m_body2.m_position.x;
                         d = a.anchorPoint.y - this.m_body2.m_position.y;
                         this.m_localAnchor2.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
                         b = this.m_body1.m_R;
                         c = a.axis.x;
                         d = a.axis.y;
                         this.m_localXAxis1.Set(c * b.col1.x + d * b.col1.y, c * b.col2.x + d * b.col2.y);
                         this.m_localYAxis1.x = -this.m_localXAxis1.y;
                         this.m_localYAxis1.y = this.m_localXAxis1.x;
                         this.m_initialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
                         this.m_linearJacobian.SetZero();
                         this.m_linearMass = 0;
                         this.m_linearImpulse = 0;
                         this.m_angularMass = 0;
                         this.m_angularImpulse = 0;
                         this.m_motorJacobian.SetZero();
                         this.m_motorMass = 0;
                         this.m_motorImpulse = 0;
                         this.m_limitImpulse = 0;
                         this.m_limitPositionImpulse = 0;
                         this.m_lowerTranslation = a.lowerTranslation;
                         this.m_upperTranslation = a.upperTranslation;
                         this.m_maxMotorForce = a.motorForce;
                         this.m_motorSpeed = a.motorSpeed;
                         this.m_enableLimit = a.enableLimit;
                         this.m_enableMotor = a.enableMotor
                     },
                     PrepareVelocitySolver: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         c = a.m_R;
                         var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                         var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                         c = b.m_R;
                         var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                         var g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                         var h = a.m_invMass;
                         var i = b.m_invMass;
                         var j = a.m_invI;
                         var k = b.m_invI;
                         c = a.m_R;
                         var l = c.col1.x * this.m_localYAxis1.x + c.col2.x * this.m_localYAxis1.y;
                         var m = c.col1.y * this.m_localYAxis1.x + c.col2.y * this.m_localYAxis1.y;
                         var n = b.m_position.x + f - a.m_position.x;
                         var o = b.m_position.y + g - a.m_position.y;
                         this.m_linearJacobian.linear1.x = -l;
                         this.m_linearJacobian.linear1.y = -m;
                         this.m_linearJacobian.linear2.x = l;
                         this.m_linearJacobian.linear2.y = m;
                         this.m_linearJacobian.angular1 = -(n * m - o * l);
                         this.m_linearJacobian.angular2 = f * m - g * l;
                         this.m_linearMass = h + j * this.m_linearJacobian.angular1 * this.m_linearJacobian.angular1 + i + k * this.m_linearJacobian.angular2 * this.m_linearJacobian.angular2;
                         this.m_linearMass = 1 / this.m_linearMass;
                         this.m_angularMass = 1 / (j + k);
                         if (this.m_enableLimit || this.m_enableMotor) {
                             c = a.m_R;
                             var p = c.col1.x * this.m_localXAxis1.x + c.col2.x * this.m_localXAxis1.y;
                             var q = c.col1.y * this.m_localXAxis1.x + c.col2.y * this.m_localXAxis1.y;
                             this.m_motorJacobian.linear1.x = -p;
                             this.m_motorJacobian.linear1.y = -q;
                             this.m_motorJacobian.linear2.x = p;
                             this.m_motorJacobian.linear2.y = q;
                             this.m_motorJacobian.angular1 = -(n * q - o * p);
                             this.m_motorJacobian.angular2 = f * q - g * p;
                             this.m_motorMass = h + j * this.m_motorJacobian.angular1 * this.m_motorJacobian.angular1 + i + k * this.m_motorJacobian.angular2 * this.m_motorJacobian.angular2;
                             this.m_motorMass = 1 / this.m_motorMass;
                             if (this.m_enableLimit) {
                                 var r = n - d;
                                 var s = o - e;
                                 var t = p * r + q * s;
                                 if (b2Math.b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * b2Settings.b2_linearSlop) {
                                     this.m_limitState = b2Joint.e_equalLimits
                                 }
                                 else if (t <= this.m_lowerTranslation) {
                                     if (this.m_limitState != b2Joint.e_atLowerLimit) {
                                         this.m_limitImpulse = 0
                                     }
                                     this.m_limitState = b2Joint.e_atLowerLimit
                                 }
                                 else if (t >= this.m_upperTranslation) {
                                     if (this.m_limitState != b2Joint.e_atUpperLimit) {
                                         this.m_limitImpulse = 0
                                     }
                                     this.m_limitState = b2Joint.e_atUpperLimit
                                 }
                                 else {
                                     this.m_limitState = b2Joint.e_inactiveLimit;
                                     this.m_limitImpulse = 0
                                 }
                             }
                         }
                         if (this.m_enableMotor == false) {
                             this.m_motorImpulse = 0
                         }
                         if (this.m_enableLimit == false) {
                             this.m_limitImpulse = 0
                         }
                         if (b2World.s_enableWarmStarting) {
                             var u = this.m_linearImpulse * this.m_linearJacobian.linear1.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.x;
                             var v = this.m_linearImpulse * this.m_linearJacobian.linear1.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear1.y;
                             var w = this.m_linearImpulse * this.m_linearJacobian.linear2.x + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.x;
                             var x = this.m_linearImpulse * this.m_linearJacobian.linear2.y + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.linear2.y;
                             var y = this.m_linearImpulse * this.m_linearJacobian.angular1 - this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular1;
                             var z = this.m_linearImpulse * this.m_linearJacobian.angular2 + this.m_angularImpulse + (this.m_motorImpulse + this.m_limitImpulse) * this.m_motorJacobian.angular2;
                             a.m_linearVelocity.x += h * u;
                             a.m_linearVelocity.y += h * v;
                             a.m_angularVelocity += j * y;
                             b.m_linearVelocity.x += i * w;
                             b.m_linearVelocity.y += i * x;
                             b.m_angularVelocity += k * z
                         }
                         else {
                             this.m_linearImpulse = 0;
                             this.m_angularImpulse = 0;
                             this.m_limitImpulse = 0;
                             this.m_motorImpulse = 0
                         }
                         this.m_limitPositionImpulse = 0
                     },
                     SolveVelocityConstraints: function(a) {
                         var b = this.m_body1;
                         var c = this.m_body2;
                         var d = b.m_invMass;
                         var e = c.m_invMass;
                         var f = b.m_invI;
                         var g = c.m_invI;
                         var h;
                         var i = this.m_linearJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity);
                         var j = -this.m_linearMass * i;
                         this.m_linearImpulse += j;
                         b.m_linearVelocity.x += d * j * this.m_linearJacobian.linear1.x;
                         b.m_linearVelocity.y += d * j * this.m_linearJacobian.linear1.y;
                         b.m_angularVelocity += f * j * this.m_linearJacobian.angular1;
                         c.m_linearVelocity.x += e * j * this.m_linearJacobian.linear2.x;
                         c.m_linearVelocity.y += e * j * this.m_linearJacobian.linear2.y;
                         c.m_angularVelocity += g * j * this.m_linearJacobian.angular2;
                         var k = c.m_angularVelocity - b.m_angularVelocity;
                         var l = -this.m_angularMass * k;
                         this.m_angularImpulse += l;
                         b.m_angularVelocity -= f * l;
                         c.m_angularVelocity += g * l;
                         if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
                             var m = this.m_motorJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity) - this.m_motorSpeed;
                             var n = -this.m_motorMass * m;
                             var o = this.m_motorImpulse;
                             this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + n, -a.dt * this.m_maxMotorForce, a.dt * this.m_maxMotorForce);
                             n = this.m_motorImpulse - o;
                             b.m_linearVelocity.x += d * n * this.m_motorJacobian.linear1.x;
                             b.m_linearVelocity.y += d * n * this.m_motorJacobian.linear1.y;
                             b.m_angularVelocity += f * n * this.m_motorJacobian.angular1;
                             c.m_linearVelocity.x += e * n * this.m_motorJacobian.linear2.x;
                             c.m_linearVelocity.y += e * n * this.m_motorJacobian.linear2.y;
                             c.m_angularVelocity += g * n * this.m_motorJacobian.angular2
                         }
                         if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
                             var p = this.m_motorJacobian.Compute(b.m_linearVelocity, b.m_angularVelocity, c.m_linearVelocity, c.m_angularVelocity);
                             var q = -this.m_motorMass * p;
                             if (this.m_limitState == b2Joint.e_equalLimits) {
                                 this.m_limitImpulse += q
                             }
                             else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                                 h = this.m_limitImpulse;
                                 this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + q, 0);
                                 q = this.m_limitImpulse - h
                             }
                             else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                                 h = this.m_limitImpulse;
                                 this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + q, 0);
                                 q = this.m_limitImpulse - h
                             }
                             b.m_linearVelocity.x += d * q * this.m_motorJacobian.linear1.x;
                             b.m_linearVelocity.y += d * q * this.m_motorJacobian.linear1.y;
                             b.m_angularVelocity += f * q * this.m_motorJacobian.angular1;
                             c.m_linearVelocity.x += e * q * this.m_motorJacobian.linear2.x;
                             c.m_linearVelocity.y += e * q * this.m_motorJacobian.linear2.y;
                             c.m_angularVelocity += g * q * this.m_motorJacobian.angular2
                         }
                     },
                     SolvePositionConstraints: function() {
                         var a;
                         var b;
                         var c = this.m_body1;
                         var d = this.m_body2;
                         var e = c.m_invMass;
                         var f = d.m_invMass;
                         var g = c.m_invI;
                         var h = d.m_invI;
                         var i;
                         i = c.m_R;
                         var j = i.col1.x * this.m_localAnchor1.x + i.col2.x * this.m_localAnchor1.y;
                         var k = i.col1.y * this.m_localAnchor1.x + i.col2.y * this.m_localAnchor1.y;
                         i = d.m_R;
                         var l = i.col1.x * this.m_localAnchor2.x + i.col2.x * this.m_localAnchor2.y;
                         var m = i.col1.y * this.m_localAnchor2.x + i.col2.y * this.m_localAnchor2.y;
                         var n = c.m_position.x + j;
                         var o = c.m_position.y + k;
                         var p = d.m_position.x + l;
                         var q = d.m_position.y + m;
                         var r = p - n;
                         var s = q - o;
                         i = c.m_R;
                         var t = i.col1.x * this.m_localYAxis1.x + i.col2.x * this.m_localYAxis1.y;
                         var u = i.col1.y * this.m_localYAxis1.x + i.col2.y * this.m_localYAxis1.y;
                         var v = t * r + u * s;
                         v = b2Math.b2Clamp(v, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                         var w = -this.m_linearMass * v;
                         c.m_position.x += e * w * this.m_linearJacobian.linear1.x;
                         c.m_position.y += e * w * this.m_linearJacobian.linear1.y;
                         c.m_rotation += g * w * this.m_linearJacobian.angular1;
                         d.m_position.x += f * w * this.m_linearJacobian.linear2.x;
                         d.m_position.y += f * w * this.m_linearJacobian.linear2.y;
                         d.m_rotation += h * w * this.m_linearJacobian.angular2;
                         var x = b2Math.b2Abs(v);
                         var y = d.m_rotation - c.m_rotation - this.m_initialAngle;
                         y = b2Math.b2Clamp(y, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
                         var z = -this.m_angularMass * y;
                         c.m_rotation -= c.m_invI * z;
                         c.m_R.Set(c.m_rotation);
                         d.m_rotation += d.m_invI * z;
                         d.m_R.Set(d.m_rotation);
                         var A = b2Math.b2Abs(y);
                         if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
                             i = c.m_R;
                             j = i.col1.x * this.m_localAnchor1.x + i.col2.x * this.m_localAnchor1.y;
                             k = i.col1.y * this.m_localAnchor1.x + i.col2.y * this.m_localAnchor1.y;
                             i = d.m_R;
                             l = i.col1.x * this.m_localAnchor2.x + i.col2.x * this.m_localAnchor2.y;
                             m = i.col1.y * this.m_localAnchor2.x + i.col2.y * this.m_localAnchor2.y;
                             n = c.m_position.x + j;
                             o = c.m_position.y + k;
                             p = d.m_position.x + l;
                             q = d.m_position.y + m;
                             r = p - n;
                             s = q - o;
                             i = c.m_R;
                             var B = i.col1.x * this.m_localXAxis1.x + i.col2.x * this.m_localXAxis1.y;
                             var C = i.col1.y * this.m_localXAxis1.x + i.col2.y * this.m_localXAxis1.y;
                             var D = B * r + C * s;
                             var E = 0;
                             if (this.m_limitState == b2Joint.e_equalLimits) {
                                 a = b2Math.b2Clamp(D, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                                 E = -this.m_motorMass * a;
                                 x = b2Math.b2Max(x, b2Math.b2Abs(y))
                             }
                             else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                                 a = D - this.m_lowerTranslation;
                                 x = b2Math.b2Max(x, -a);
                                 a = b2Math.b2Clamp(a + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                                 E = -this.m_motorMass * a;
                                 b = this.m_limitPositionImpulse;
                                 this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + E, 0);
                                 E = this.m_limitPositionImpulse - b
                             }
                             else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                                 a = D - this.m_upperTranslation;
                                 x = b2Math.b2Max(x, a);
                                 a = b2Math.b2Clamp(a - b2Settings.b2_linearSlop, 0, b2Settings.b2_maxLinearCorrection);
                                 E = -this.m_motorMass * a;
                                 b = this.m_limitPositionImpulse;
                                 this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + E, 0);
                                 E = this.m_limitPositionImpulse - b
                             }
                             c.m_position.x += e * E * this.m_motorJacobian.linear1.x;
                             c.m_position.y += e * E * this.m_motorJacobian.linear1.y;
                             c.m_rotation += g * E * this.m_motorJacobian.angular1;
                             c.m_R.Set(c.m_rotation);
                             d.m_position.x += f * E * this.m_motorJacobian.linear2.x;
                             d.m_position.y += f * E * this.m_motorJacobian.linear2.y;
                             d.m_rotation += h * E * this.m_motorJacobian.angular2;
                             d.m_R.Set(d.m_rotation)
                         }
                         return x <= b2Settings.b2_linearSlop && A <= b2Settings.b2_angularSlop
                     },
                     m_localAnchor1: new b2Vec2,
                     m_localAnchor2: new b2Vec2,
                     m_localXAxis1: new b2Vec2,
                     m_localYAxis1: new b2Vec2,
                     m_initialAngle: null,
                     m_linearJacobian: new b2Jacobian,
                     m_linearMass: null,
                     m_linearImpulse: null,
                     m_angularMass: null,
                     m_angularImpulse: null,
                     m_motorJacobian: new b2Jacobian,
                     m_motorMass: null,
                     m_motorImpulse: null,
                     m_limitImpulse: null,
                     m_limitPositionImpulse: null,
                     m_lowerTranslation: null,
                     m_upperTranslation: null,
                     m_maxMotorForce: null,
                     m_motorSpeed: null,
                     m_enableLimit: null,
                     m_enableMotor: null,
                     m_limitState: 0
                 });
                 var b2PrismaticJointDef = Class.create();
                 Object.extend(b2PrismaticJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2PrismaticJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false;
                         this.type = b2Joint.e_prismaticJoint;
                         this.anchorPoint = new b2Vec2(0, 0);
                         this.axis = new b2Vec2(0, 0);
                         this.lowerTranslation = 0;
                         this.upperTranslation = 0;
                         this.motorForce = 0;
                         this.motorSpeed = 0;
                         this.enableLimit = false;
                         this.enableMotor = false
                     },
                     anchorPoint: null,
                     axis: null,
                     lowerTranslation: null,
                     upperTranslation: null,
                     motorForce: null,
                     motorSpeed: null,
                     enableLimit: null,
                     enableMotor: null
                 });
                 var b2PulleyJoint = Class.create();
                 Object.extend(b2PulleyJoint.prototype, b2Joint.prototype);
                 Object.extend(b2PulleyJoint.prototype, {
                     GetAnchor1: function() {
                         var a = this.m_body1.m_R;
                         return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
                     },
                     GetAnchor2: function() {
                         var a = this.m_body2.m_R;
                         return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
                     },
                     GetGroundPoint1: function() {
                         return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor1.x, this.m_ground.m_position.y + this.m_groundAnchor1.y)
                     },
                     GetGroundPoint2: function() {
                         return new b2Vec2(this.m_ground.m_position.x + this.m_groundAnchor2.x, this.m_ground.m_position.y + this.m_groundAnchor2.y)
                     },
                     GetReactionForce: function(a) {
                         return new b2Vec2
                     },
                     GetReactionTorque: function(a) {
                         return 0
                     },
                     GetLength1: function() {
                         var a;
                         a = this.m_body1.m_R;
                         var b = this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y);
                         var c = this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y);
                         var d = b - (this.m_ground.m_position.x + this.m_groundAnchor1.x);
                         var e = c - (this.m_ground.m_position.y + this.m_groundAnchor1.y);
                         return Math.sqrt(d * d + e * e)
                     },
                     GetLength2: function() {
                         var a;
                         a = this.m_body2.m_R;
                         var b = this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y);
                         var c = this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y);
                         var d = b - (this.m_ground.m_position.x + this.m_groundAnchor2.x);
                         var e = c - (this.m_ground.m_position.y + this.m_groundAnchor2.y);
                         return Math.sqrt(d * d + e * e)
                     },
                     GetRatio: function() {
                         return this.m_ratio
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.m_groundAnchor1 = new b2Vec2;
                         this.m_groundAnchor2 = new b2Vec2;
                         this.m_localAnchor1 = new b2Vec2;
                         this.m_localAnchor2 = new b2Vec2;
                         this.m_u1 = new b2Vec2;
                         this.m_u2 = new b2Vec2;
                         var b;
                         var c;
                         var d;
                         this.m_ground = this.m_body1.m_world.m_groundBody;
                         this.m_groundAnchor1.x = a.groundPoint1.x - this.m_ground.m_position.x;
                         this.m_groundAnchor1.y = a.groundPoint1.y - this.m_ground.m_position.y;
                         this.m_groundAnchor2.x = a.groundPoint2.x - this.m_ground.m_position.x;
                         this.m_groundAnchor2.y = a.groundPoint2.y - this.m_ground.m_position.y;
                         b = this.m_body1.m_R;
                         c = a.anchorPoint1.x - this.m_body1.m_position.x;
                         d = a.anchorPoint1.y - this.m_body1.m_position.y;
                         this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
                         b = this.m_body2.m_R;
                         c = a.anchorPoint2.x - this.m_body2.m_position.x;
                         d = a.anchorPoint2.y - this.m_body2.m_position.y;
                         this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
                         this.m_ratio = a.ratio;
                         c = a.groundPoint1.x - a.anchorPoint1.x;
                         d = a.groundPoint1.y - a.anchorPoint1.y;
                         var e = Math.sqrt(c * c + d * d);
                         c = a.groundPoint2.x - a.anchorPoint2.x;
                         d = a.groundPoint2.y - a.anchorPoint2.y;
                         var f = Math.sqrt(c * c + d * d);
                         var g = b2Math.b2Max(.5 * b2PulleyJoint.b2_minPulleyLength, e);
                         var h = b2Math.b2Max(.5 * b2PulleyJoint.b2_minPulleyLength, f);
                         this.m_constant = g + this.m_ratio * h;
                         this.m_maxLength1 = b2Math.b2Clamp(a.maxLength1, g, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
                         this.m_maxLength2 = b2Math.b2Clamp(a.maxLength2, h, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
                         this.m_pulleyImpulse = 0;
                         this.m_limitImpulse1 = 0;
                         this.m_limitImpulse2 = 0
                     },
                     PrepareVelocitySolver: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         c = a.m_R;
                         var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                         var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                         c = b.m_R;
                         var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                         var g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                         var h = a.m_position.x + d;
                         var i = a.m_position.y + e;
                         var j = b.m_position.x + f;
                         var k = b.m_position.y + g;
                         var l = this.m_ground.m_position.x + this.m_groundAnchor1.x;
                         var m = this.m_ground.m_position.y + this.m_groundAnchor1.y;
                         var n = this.m_ground.m_position.x + this.m_groundAnchor2.x;
                         var o = this.m_ground.m_position.y + this.m_groundAnchor2.y;
                         this.m_u1.Set(h - l, i - m);
                         this.m_u2.Set(j - n, k - o);
                         var p = this.m_u1.Length();
                         var q = this.m_u2.Length();
                         if (p > b2Settings.b2_linearSlop) {
                             this.m_u1.Multiply(1 / p)
                         }
                         else {
                             this.m_u1.SetZero()
                         }
                         if (q > b2Settings.b2_linearSlop) {
                             this.m_u2.Multiply(1 / q)
                         }
                         else {
                             this.m_u2.SetZero()
                         }
                         if (p < this.m_maxLength1) {
                             this.m_limitState1 = b2Joint.e_inactiveLimit;
                             this.m_limitImpulse1 = 0
                         }
                         else {
                             this.m_limitState1 = b2Joint.e_atUpperLimit;
                             this.m_limitPositionImpulse1 = 0
                         }
                         if (q < this.m_maxLength2) {
                             this.m_limitState2 = b2Joint.e_inactiveLimit;
                             this.m_limitImpulse2 = 0
                         }
                         else {
                             this.m_limitState2 = b2Joint.e_atUpperLimit;
                             this.m_limitPositionImpulse2 = 0
                         }
                         var r = d * this.m_u1.y - e * this.m_u1.x;
                         var s = f * this.m_u2.y - g * this.m_u2.x;
                         this.m_limitMass1 = a.m_invMass + a.m_invI * r * r;
                         this.m_limitMass2 = b.m_invMass + b.m_invI * s * s;
                         this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
                         this.m_limitMass1 = 1 / this.m_limitMass1;
                         this.m_limitMass2 = 1 / this.m_limitMass2;
                         this.m_pulleyMass = 1 / this.m_pulleyMass;
                         var t = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.x;
                         var u = (-this.m_pulleyImpulse - this.m_limitImpulse1) * this.m_u1.y;
                         var v = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.x;
                         var w = (-this.m_ratio * this.m_pulleyImpulse - this.m_limitImpulse2) * this.m_u2.y;
                         a.m_linearVelocity.x += a.m_invMass * t;
                         a.m_linearVelocity.y += a.m_invMass * u;
                         a.m_angularVelocity += a.m_invI * (d * u - e * t);
                         b.m_linearVelocity.x += b.m_invMass * v;
                         b.m_linearVelocity.y += b.m_invMass * w;
                         b.m_angularVelocity += b.m_invI * (f * w - g * v)
                     },
                     SolveVelocityConstraints: function(a) {
                         var b = this.m_body1;
                         var c = this.m_body2;
                         var d;
                         d = b.m_R;
                         var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y;
                         var f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
                         d = c.m_R;
                         var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
                         var h = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
                         var i;
                         var j;
                         var k;
                         var l;
                         var m;
                         var n;
                         var o;
                         var p;
                         var q;
                         var r;
                         var s;
                         i = b.m_linearVelocity.x + -b.m_angularVelocity * f;
                         j = b.m_linearVelocity.y + b.m_angularVelocity * e;
                         k = c.m_linearVelocity.x + -c.m_angularVelocity * h;
                         l = c.m_linearVelocity.y + c.m_angularVelocity * g;
                         q = -(this.m_u1.x * i + this.m_u1.y * j) - this.m_ratio * (this.m_u2.x * k + this.m_u2.y * l);
                         r = -this.m_pulleyMass * q;
                         this.m_pulleyImpulse += r;
                         m = -r * this.m_u1.x;
                         n = -r * this.m_u1.y;
                         o = -this.m_ratio * r * this.m_u2.x;
                         p = -this.m_ratio * r * this.m_u2.y;
                         b.m_linearVelocity.x += b.m_invMass * m;
                         b.m_linearVelocity.y += b.m_invMass * n;
                         b.m_angularVelocity += b.m_invI * (e * n - f * m);
                         c.m_linearVelocity.x += c.m_invMass * o;
                         c.m_linearVelocity.y += c.m_invMass * p;
                         c.m_angularVelocity += c.m_invI * (g * p - h * o);
                         if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
                             i = b.m_linearVelocity.x + -b.m_angularVelocity * f;
                             j = b.m_linearVelocity.y + b.m_angularVelocity * e;
                             q = -(this.m_u1.x * i + this.m_u1.y * j);
                             r = -this.m_limitMass1 * q;
                             s = this.m_limitImpulse1;
                             this.m_limitImpulse1 = b2Math.b2Max(0, this.m_limitImpulse1 + r);
                             r = this.m_limitImpulse1 - s;
                             m = -r * this.m_u1.x;
                             n = -r * this.m_u1.y;
                             b.m_linearVelocity.x += b.m_invMass * m;
                             b.m_linearVelocity.y += b.m_invMass * n;
                             b.m_angularVelocity += b.m_invI * (e * n - f * m)
                         }
                         if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
                             k = c.m_linearVelocity.x + -c.m_angularVelocity * h;
                             l = c.m_linearVelocity.y + c.m_angularVelocity * g;
                             q = -(this.m_u2.x * k + this.m_u2.y * l);
                             r = -this.m_limitMass2 * q;
                             s = this.m_limitImpulse2;
                             this.m_limitImpulse2 = b2Math.b2Max(0, this.m_limitImpulse2 + r);
                             r = this.m_limitImpulse2 - s;
                             o = -r * this.m_u2.x;
                             p = -r * this.m_u2.y;
                             c.m_linearVelocity.x += c.m_invMass * o;
                             c.m_linearVelocity.y += c.m_invMass * p;
                             c.m_angularVelocity += c.m_invI * (g * p - h * o)
                         }
                     },
                     SolvePositionConstraints: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         var d = this.m_ground.m_position.x + this.m_groundAnchor1.x;
                         var e = this.m_ground.m_position.y + this.m_groundAnchor1.y;
                         var f = this.m_ground.m_position.x + this.m_groundAnchor2.x;
                         var g = this.m_ground.m_position.y + this.m_groundAnchor2.y;
                         var h;
                         var i;
                         var j;
                         var k;
                         var l;
                         var m;
                         var n;
                         var o;
                         var p;
                         var q;
                         var r;
                         var s;
                         var t;
                         var u = 0; {
                             c = a.m_R;
                             h = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                             i = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                             c = b.m_R;
                             j = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                             k = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                             l = a.m_position.x + h;
                             m = a.m_position.y + i;
                             n = b.m_position.x + j;
                             o = b.m_position.y + k;
                             this.m_u1.Set(l - d, m - e);
                             this.m_u2.Set(n - f, o - g);
                             p = this.m_u1.Length();
                             q = this.m_u2.Length();
                             if (p > b2Settings.b2_linearSlop) {
                                 this.m_u1.Multiply(1 / p)
                             }
                             else {
                                 this.m_u1.SetZero()
                             }
                             if (q > b2Settings.b2_linearSlop) {
                                 this.m_u2.Multiply(1 / q)
                             }
                             else {
                                 this.m_u2.SetZero()
                             }
                             r = this.m_constant - p - this.m_ratio * q;
                             u = b2Math.b2Max(u, Math.abs(r));
                             r = b2Math.b2Clamp(r, -b2Settings.b2_maxLinearCorrection, b2Settings.b2_maxLinearCorrection);
                             s = -this.m_pulleyMass * r;
                             l = -s * this.m_u1.x;
                             m = -s * this.m_u1.y;
                             n = -this.m_ratio * s * this.m_u2.x;
                             o = -this.m_ratio * s * this.m_u2.y;
                             a.m_position.x += a.m_invMass * l;
                             a.m_position.y += a.m_invMass * m;
                             a.m_rotation += a.m_invI * (h * m - i * l);
                             b.m_position.x += b.m_invMass * n;
                             b.m_position.y += b.m_invMass * o;
                             b.m_rotation += b.m_invI * (j * o - k * n);
                             a.m_R.Set(a.m_rotation);
                             b.m_R.Set(b.m_rotation)
                         }
                         if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
                             c = a.m_R;
                             h = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                             i = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                             l = a.m_position.x + h;
                             m = a.m_position.y + i;
                             this.m_u1.Set(l - d, m - e);
                             p = this.m_u1.Length();
                             if (p > b2Settings.b2_linearSlop) {
                                 this.m_u1.x *= 1 / p;
                                 this.m_u1.y *= 1 / p
                             }
                             else {
                                 this.m_u1.SetZero()
                             }
                             r = this.m_maxLength1 - p;
                             u = b2Math.b2Max(u, -r);
                             r = b2Math.b2Clamp(r + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                             s = -this.m_limitMass1 * r;
                             t = this.m_limitPositionImpulse1;
                             this.m_limitPositionImpulse1 = b2Math.b2Max(0, this.m_limitPositionImpulse1 + s);
                             s = this.m_limitPositionImpulse1 - t;
                             l = -s * this.m_u1.x;
                             m = -s * this.m_u1.y;
                             a.m_position.x += a.m_invMass * l;
                             a.m_position.y += a.m_invMass * m;
                             a.m_rotation += a.m_invI * (h * m - i * l);
                             a.m_R.Set(a.m_rotation)
                         }
                         if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
                             c = b.m_R;
                             j = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                             k = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                             n = b.m_position.x + j;
                             o = b.m_position.y + k;
                             this.m_u2.Set(n - f, o - g);
                             q = this.m_u2.Length();
                             if (q > b2Settings.b2_linearSlop) {
                                 this.m_u2.x *= 1 / q;
                                 this.m_u2.y *= 1 / q
                             }
                             else {
                                 this.m_u2.SetZero()
                             }
                             r = this.m_maxLength2 - q;
                             u = b2Math.b2Max(u, -r);
                             r = b2Math.b2Clamp(r + b2Settings.b2_linearSlop, -b2Settings.b2_maxLinearCorrection, 0);
                             s = -this.m_limitMass2 * r;
                             t = this.m_limitPositionImpulse2;
                             this.m_limitPositionImpulse2 = b2Math.b2Max(0, this.m_limitPositionImpulse2 + s);
                             s = this.m_limitPositionImpulse2 - t;
                             n = -s * this.m_u2.x;
                             o = -s * this.m_u2.y;
                             b.m_position.x += b.m_invMass * n;
                             b.m_position.y += b.m_invMass * o;
                             b.m_rotation += b.m_invI * (j * o - k * n);
                             b.m_R.Set(b.m_rotation)
                         }
                         return u < b2Settings.b2_linearSlop
                     },
                     m_ground: null,
                     m_groundAnchor1: new b2Vec2,
                     m_groundAnchor2: new b2Vec2,
                     m_localAnchor1: new b2Vec2,
                     m_localAnchor2: new b2Vec2,
                     m_u1: new b2Vec2,
                     m_u2: new b2Vec2,
                     m_constant: null,
                     m_ratio: null,
                     m_maxLength1: null,
                     m_maxLength2: null,
                     m_pulleyMass: null,
                     m_limitMass1: null,
                     m_limitMass2: null,
                     m_pulleyImpulse: null,
                     m_limitImpulse1: null,
                     m_limitImpulse2: null,
                     m_limitPositionImpulse1: null,
                     m_limitPositionImpulse2: null,
                     m_limitState1: 0,
                     m_limitState2: 0
                 });
                 b2PulleyJoint.b2_minPulleyLength = b2Settings.b2_lengthUnitsPerMeter;
                 var b2PulleyJointDef = Class.create();
                 Object.extend(b2PulleyJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2PulleyJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false;
                         this.groundPoint1 = new b2Vec2;
                         this.groundPoint2 = new b2Vec2;
                         this.anchorPoint1 = new b2Vec2;
                         this.anchorPoint2 = new b2Vec2;
                         this.type = b2Joint.e_pulleyJoint;
                         this.groundPoint1.Set(-1, 1);
                         this.groundPoint2.Set(1, 1);
                         this.anchorPoint1.Set(-1, 0);
                         this.anchorPoint2.Set(1, 0);
                         this.maxLength1 = .5 * b2PulleyJoint.b2_minPulleyLength;
                         this.maxLength2 = .5 * b2PulleyJoint.b2_minPulleyLength;
                         this.ratio = 1;
                         this.collideConnected = true
                     },
                     groundPoint1: new b2Vec2,
                     groundPoint2: new b2Vec2,
                     anchorPoint1: new b2Vec2,
                     anchorPoint2: new b2Vec2,
                     maxLength1: null,
                     maxLength2: null,
                     ratio: null
                 });
                 var b2RevoluteJoint = Class.create();
                 Object.extend(b2RevoluteJoint.prototype, b2Joint.prototype);
                 Object.extend(b2RevoluteJoint.prototype, {
                     GetAnchor1: function() {
                         var a = this.m_body1.m_R;
                         return new b2Vec2(this.m_body1.m_position.x + (a.col1.x * this.m_localAnchor1.x + a.col2.x * this.m_localAnchor1.y), this.m_body1.m_position.y + (a.col1.y * this.m_localAnchor1.x + a.col2.y * this.m_localAnchor1.y))
                     },
                     GetAnchor2: function() {
                         var a = this.m_body2.m_R;
                         return new b2Vec2(this.m_body2.m_position.x + (a.col1.x * this.m_localAnchor2.x + a.col2.x * this.m_localAnchor2.y), this.m_body2.m_position.y + (a.col1.y * this.m_localAnchor2.x + a.col2.y * this.m_localAnchor2.y))
                     },
                     GetJointAngle: function() {
                         return this.m_body2.m_rotation - this.m_body1.m_rotation
                     },
                     GetJointSpeed: function() {
                         return this.m_body2.m_angularVelocity - this.m_body1.m_angularVelocity
                     },
                     GetMotorTorque: function(a) {
                         return a * this.m_motorImpulse
                     },
                     SetMotorSpeed: function(a) {
                         this.m_motorSpeed = a
                     },
                     SetMotorTorque: function(a) {
                         this.m_maxMotorTorque = a
                     },
                     GetReactionForce: function(a) {
                         var b = this.m_ptpImpulse.Copy();
                         b.Multiply(a);
                         return b
                     },
                     GetReactionTorque: function(a) {
                         return a * this.m_limitImpulse
                     },
                     initialize: function(a) {
                         this.m_node1 = new b2JointNode;
                         this.m_node2 = new b2JointNode;
                         this.m_type = a.type;
                         this.m_prev = null;
                         this.m_next = null;
                         this.m_body1 = a.body1;
                         this.m_body2 = a.body2;
                         this.m_collideConnected = a.collideConnected;
                         this.m_islandFlag = false;
                         this.m_userData = a.userData;
                         this.K = new b2Mat22;
                         this.K1 = new b2Mat22;
                         this.K2 = new b2Mat22;
                         this.K3 = new b2Mat22;
                         this.m_localAnchor1 = new b2Vec2;
                         this.m_localAnchor2 = new b2Vec2;
                         this.m_ptpImpulse = new b2Vec2;
                         this.m_ptpMass = new b2Mat22;
                         var b;
                         var c;
                         var d;
                         b = this.m_body1.m_R;
                         c = a.anchorPoint.x - this.m_body1.m_position.x;
                         d = a.anchorPoint.y - this.m_body1.m_position.y;
                         this.m_localAnchor1.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor1.y = c * b.col2.x + d * b.col2.y;
                         b = this.m_body2.m_R;
                         c = a.anchorPoint.x - this.m_body2.m_position.x;
                         d = a.anchorPoint.y - this.m_body2.m_position.y;
                         this.m_localAnchor2.x = c * b.col1.x + d * b.col1.y;
                         this.m_localAnchor2.y = c * b.col2.x + d * b.col2.y;
                         this.m_intialAngle = this.m_body2.m_rotation - this.m_body1.m_rotation;
                         this.m_ptpImpulse.Set(0, 0);
                         this.m_motorImpulse = 0;
                         this.m_limitImpulse = 0;
                         this.m_limitPositionImpulse = 0;
                         this.m_lowerAngle = a.lowerAngle;
                         this.m_upperAngle = a.upperAngle;
                         this.m_maxMotorTorque = a.motorTorque;
                         this.m_motorSpeed = a.motorSpeed;
                         this.m_enableLimit = a.enableLimit;
                         this.m_enableMotor = a.enableMotor
                     },
                     K: new b2Mat22,
                     K1: new b2Mat22,
                     K2: new b2Mat22,
                     K3: new b2Mat22,
                     PrepareVelocitySolver: function() {
                         var a = this.m_body1;
                         var b = this.m_body2;
                         var c;
                         c = a.m_R;
                         var d = c.col1.x * this.m_localAnchor1.x + c.col2.x * this.m_localAnchor1.y;
                         var e = c.col1.y * this.m_localAnchor1.x + c.col2.y * this.m_localAnchor1.y;
                         c = b.m_R;
                         var f = c.col1.x * this.m_localAnchor2.x + c.col2.x * this.m_localAnchor2.y;
                         var g = c.col1.y * this.m_localAnchor2.x + c.col2.y * this.m_localAnchor2.y;
                         var h = a.m_invMass;
                         var i = b.m_invMass;
                         var j = a.m_invI;
                         var k = b.m_invI;
                         this.K1.col1.x = h + i;
                         this.K1.col2.x = 0;
                         this.K1.col1.y = 0;
                         this.K1.col2.y = h + i;
                         this.K2.col1.x = j * e * e;
                         this.K2.col2.x = -j * d * e;
                         this.K2.col1.y = -j * d * e;
                         this.K2.col2.y = j * d * d;
                         this.K3.col1.x = k * g * g;
                         this.K3.col2.x = -k * f * g;
                         this.K3.col1.y = -k * f * g;
                         this.K3.col2.y = k * f * f;
                         this.K.SetM(this.K1);
                         this.K.AddM(this.K2);
                         this.K.AddM(this.K3);
                         this.K.Invert(this.m_ptpMass);
                         this.m_motorMass = 1 / (j + k);
                         if (this.m_enableMotor == false) {
                             this.m_motorImpulse = 0
                         }
                         if (this.m_enableLimit) {
                             var l = b.m_rotation - a.m_rotation - this.m_intialAngle;
                             if (b2Math.b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * b2Settings.b2_angularSlop) {
                                 this.m_limitState = b2Joint.e_equalLimits
                             }
                             else if (l <= this.m_lowerAngle) {
                                 if (this.m_limitState != b2Joint.e_atLowerLimit) {
                                     this.m_limitImpulse = 0
                                 }
                                 this.m_limitState = b2Joint.e_atLowerLimit
                             }
                             else if (l >= this.m_upperAngle) {
                                 if (this.m_limitState != b2Joint.e_atUpperLimit) {
                                     this.m_limitImpulse = 0
                                 }
                                 this.m_limitState = b2Joint.e_atUpperLimit
                             }
                             else {
                                 this.m_limitState = b2Joint.e_inactiveLimit;
                                 this.m_limitImpulse = 0
                             }
                         }
                         else {
                             this.m_limitImpulse = 0
                         }
                         if (b2World.s_enableWarmStarting) {
                             a.m_linearVelocity.x -= h * this.m_ptpImpulse.x;
                             a.m_linearVelocity.y -= h * this.m_ptpImpulse.y;
                             a.m_angularVelocity -= j * (d * this.m_ptpImpulse.y - e * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse);
                             b.m_linearVelocity.x += i * this.m_ptpImpulse.x;
                             b.m_linearVelocity.y += i * this.m_ptpImpulse.y;
                             b.m_angularVelocity += k * (f * this.m_ptpImpulse.y - g * this.m_ptpImpulse.x + this.m_motorImpulse + this.m_limitImpulse)
                         }
                         else {
                             this.m_ptpImpulse.SetZero();
                             this.m_motorImpulse = 0;
                             this.m_limitImpulse = 0
                         }
                         this.m_limitPositionImpulse = 0
                     },
                     SolveVelocityConstraints: function(a) {
                         var b = this.m_body1;
                         var c = this.m_body2;
                         var d;
                         d = b.m_R;
                         var e = d.col1.x * this.m_localAnchor1.x + d.col2.x * this.m_localAnchor1.y;
                         var f = d.col1.y * this.m_localAnchor1.x + d.col2.y * this.m_localAnchor1.y;
                         d = c.m_R;
                         var g = d.col1.x * this.m_localAnchor2.x + d.col2.x * this.m_localAnchor2.y;
                         var h = d.col1.y * this.m_localAnchor2.x + d.col2.y * this.m_localAnchor2.y;
                         var i;
                         var j = c.m_linearVelocity.x + -c.m_angularVelocity * h - b.m_linearVelocity.x - -b.m_angularVelocity * f;
                         var k = c.m_linearVelocity.y + c.m_angularVelocity * g - b.m_linearVelocity.y - b.m_angularVelocity * e;
                         var l = -(this.m_ptpMass.col1.x * j + this.m_ptpMass.col2.x * k);
                         var m = -(this.m_ptpMass.col1.y * j + this.m_ptpMass.col2.y * k);
                         this.m_ptpImpulse.x += l;
                         this.m_ptpImpulse.y += m;
                         b.m_linearVelocity.x -= b.m_invMass * l;
                         b.m_linearVelocity.y -= b.m_invMass * m;
                         b.m_angularVelocity -= b.m_invI * (e * m - f * l);
                         c.m_linearVelocity.x += c.m_invMass * l;
                         c.m_linearVelocity.y += c.m_invMass * m;
                         c.m_angularVelocity += c.m_invI * (g * m - h * l);
                         if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
                             var n = c.m_angularVelocity - b.m_angularVelocity - this.m_motorSpeed;
                             var o = -this.m_motorMass * n;
                             var p = this.m_motorImpulse;
                             this.m_motorImpulse = b2Math.b2Clamp(this.m_motorImpulse + o, -a.dt * this.m_maxMotorTorque, a.dt * this.m_maxMotorTorque);
                             o = this.m_motorImpulse - p;
                             b.m_angularVelocity -= b.m_invI * o;
                             c.m_angularVelocity += c.m_invI * o
                         }
                         if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
                             var q = c.m_angularVelocity - b.m_angularVelocity;
                             var r = -this.m_motorMass * q;
                             if (this.m_limitState == b2Joint.e_equalLimits) {
                                 this.m_limitImpulse += r
                             }
                             else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                                 i = this.m_limitImpulse;
                                 this.m_limitImpulse = b2Math.b2Max(this.m_limitImpulse + r, 0);
                                 r = this.m_limitImpulse - i
                             }
                             else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                                 i = this.m_limitImpulse;
                                 this.m_limitImpulse = b2Math.b2Min(this.m_limitImpulse + r, 0);
                                 r = this.m_limitImpulse - i
                             }
                             b.m_angularVelocity -= b.m_invI * r;
                             c.m_angularVelocity += c.m_invI * r
                         }
                     },
                     SolvePositionConstraints: function() {
                         var a;
                         var b;
                         var c = this.m_body1;
                         var d = this.m_body2;
                         var e = 0;
                         var f;
                         f = c.m_R;
                         var g = f.col1.x * this.m_localAnchor1.x + f.col2.x * this.m_localAnchor1.y;
                         var h = f.col1.y * this.m_localAnchor1.x + f.col2.y * this.m_localAnchor1.y;
                         f = d.m_R;
                         var i = f.col1.x * this.m_localAnchor2.x + f.col2.x * this.m_localAnchor2.y;
                         var j = f.col1.y * this.m_localAnchor2.x + f.col2.y * this.m_localAnchor2.y;
                         var k = c.m_position.x + g;
                         var l = c.m_position.y + h;
                         var m = d.m_position.x + i;
                         var n = d.m_position.y + j;
                         var o = m - k;
                         var p = n - l;
                         e = Math.sqrt(o * o + p * p);
                         var q = c.m_invMass;
                         var r = d.m_invMass;
                         var s = c.m_invI;
                         var t = d.m_invI;
                         this.K1.col1.x = q + r;
                         this.K1.col2.x = 0;
                         this.K1.col1.y = 0;
                         this.K1.col2.y = q + r;
                         this.K2.col1.x = s * h * h;
                         this.K2.col2.x = -s * g * h;
                         this.K2.col1.y = -s * g * h;
                         this.K2.col2.y = s * g * g;
                         this.K3.col1.x = t * j * j;
                         this.K3.col2.x = -t * i * j;
                         this.K3.col1.y = -t * i * j;
                         this.K3.col2.y = t * i * i;
                         this.K.SetM(this.K1);
                         this.K.AddM(this.K2);
                         this.K.AddM(this.K3);
                         this.K.Solve(b2RevoluteJoint.tImpulse, -o, -p);
                         var u = b2RevoluteJoint.tImpulse.x;
                         var v = b2RevoluteJoint.tImpulse.y;
                         c.m_position.x -= c.m_invMass * u;
                         c.m_position.y -= c.m_invMass * v;
                         c.m_rotation -= c.m_invI * (g * v - h * u);
                         c.m_R.Set(c.m_rotation);
                         d.m_position.x += d.m_invMass * u;
                         d.m_position.y += d.m_invMass * v;
                         d.m_rotation += d.m_invI * (i * v - j * u);
                         d.m_R.Set(d.m_rotation);
                         var w = 0;
                         if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
                             var x = d.m_rotation - c.m_rotation - this.m_intialAngle;
                             var y = 0;
                             if (this.m_limitState == b2Joint.e_equalLimits) {
                                 b = b2Math.b2Clamp(x, -b2Settings.b2_maxAngularCorrection, b2Settings.b2_maxAngularCorrection);
                                 y = -this.m_motorMass * b;
                                 w = b2Math.b2Abs(b)
                             }
                             else if (this.m_limitState == b2Joint.e_atLowerLimit) {
                                 b = x - this.m_lowerAngle;
                                 w = b2Math.b2Max(0, -b);
                                 b = b2Math.b2Clamp(b + b2Settings.b2_angularSlop, -b2Settings.b2_maxAngularCorrection, 0);
                                 y = -this.m_motorMass * b;
                                 a = this.m_limitPositionImpulse;
                                 this.m_limitPositionImpulse = b2Math.b2Max(this.m_limitPositionImpulse + y, 0);
                                 y = this.m_limitPositionImpulse - a
                             }
                             else if (this.m_limitState == b2Joint.e_atUpperLimit) {
                                 b = x - this.m_upperAngle;
                                 w = b2Math.b2Max(0, b);
                                 b = b2Math.b2Clamp(b - b2Settings.b2_angularSlop, 0, b2Settings.b2_maxAngularCorrection);
                                 y = -this.m_motorMass * b;
                                 a = this.m_limitPositionImpulse;
                                 this.m_limitPositionImpulse = b2Math.b2Min(this.m_limitPositionImpulse + y, 0);
                                 y = this.m_limitPositionImpulse - a
                             }
                             c.m_rotation -= c.m_invI * y;
                             c.m_R.Set(c.m_rotation);
                             d.m_rotation += d.m_invI * y;
                             d.m_R.Set(d.m_rotation)
                         }
                         return e <= b2Settings.b2_linearSlop && w <= b2Settings.b2_angularSlop
                     },
                     m_localAnchor1: new b2Vec2,
                     m_localAnchor2: new b2Vec2,
                     m_ptpImpulse: new b2Vec2,
                     m_motorImpulse: null,
                     m_limitImpulse: null,
                     m_limitPositionImpulse: null,
                     m_ptpMass: new b2Mat22,
                     m_motorMass: null,
                     m_intialAngle: null,
                     m_lowerAngle: null,
                     m_upperAngle: null,
                     m_maxMotorTorque: null,
                     m_motorSpeed: null,
                     m_enableLimit: null,
                     m_enableMotor: null,
                     m_limitState: 0
                 });
                 b2RevoluteJoint.tImpulse = new b2Vec2;
                 var b2RevoluteJointDef = Class.create();
                 Object.extend(b2RevoluteJointDef.prototype, b2JointDef.prototype);
                 Object.extend(b2RevoluteJointDef.prototype, {
                     initialize: function() {
                         this.type = b2Joint.e_unknownJoint;
                         this.userData = null;
                         this.body1 = null;
                         this.body2 = null;
                         this.collideConnected = false;
                         this.type = b2Joint.e_revoluteJoint;
                         this.anchorPoint = new b2Vec2(0, 0);
                         this.lowerAngle = 0;
                         this.upperAngle = 0;
                         this.motorTorque = 0;
                         this.motorSpeed = 0;
                         this.enableLimit = false;
                         this.enableMotor = false
                     },
                     anchorPoint: null,
                     lowerAngle: null,
                     upperAngle: null,
                     motorTorque: null,
                     motorSpeed: null,
                     enableLimit: null,
                     enableMotor: null
                 })


                 /*------------------------------------*\
                 WORKERS
                 \*------------------------------------*/

                 // variables
                 var canvas, worldAABB, world, mouseJoint;

                 var delta = [0, 0];
                 var stage = [window.screenX, window.screenY, window.innerWidth, window.innerHeight];
                 var isRunning = false;
                 var isMouseDown = false;
                 var iterations = 1;
                 var timeStep = 1 / 25;
                 var walls = new Array();
                 var wall_thickness = 200;
                 var wallsSetted = false;
                 var mouseX = 0;
                 var mouseY = 0;
                 var mouseOnClick = new Array();
                 var timer = 0;
                 var elements = new Array();
                 var bodies = new Array();
                 var properties = new Array();
                 var orientation = {
                     x: 0,
                     y: 2
                 };

                 // get browser dimensions
                 getBrowserDimensions();

                 // initialise
                 init();


                 /*------------------------------------*\
                 FUNCTIONS
                 \*------------------------------------*/

                 // init()
                 function init() {
                     //canvas = document.getElementById('canvas');


                     // init box2d
                     worldAABB = new b2AABB();
                     worldAABB.minVertex.Set(-200, -200);
                     worldAABB.maxVertex.Set(screen.width + 200, screen.height + 5200);

                     world = new b2World(worldAABB, new b2Vec2(0, 0), true);

                     // walls
                     setWalls();

                     // Get box2d elements
                     elements = $('.box2d');

                     for (i = 0; i < elements.length; i++) {

                         var element = elements[i];
                         properties[i] = findPos(element);
                         properties[i][2] = element.offsetWidth;
                         properties[i][3] = element.offsetHeight;
                     }

                     for (i = 0; i < elements.length; i++) {
                         var element = elements[i];
                         element.style.position = 'absolute';
                         element.style.left = properties[i][0] + 'px';
                         element.style.top = properties[i][1] + 'px';

                         bodies[i] = createBox(world, properties[i][0] + (properties[i][2] >> 1), properties[i][1] + (properties[i][3] >> 1), properties[i][2] / 2, properties[i][3] / 2, false);
                     }
                     run();
                 }

                 // run()
                 function run() {
                     isRunning = true;
                     timerrun = setInterval(loop, o.weight); // weight setting
                 }
                 var timerrun;
                 var steps = 0;

                 function loop() {
                     steps++;
                     //if (getBrowserDimensions())
                     //setWalls();

                     delta[0] += (0 - delta[0]) * .5;
                     delta[1] += (0 - delta[1]) * .5;

                     world.m_gravity.x = orientation.x * 350 + delta[0];
                     world.m_gravity.y = orientation.y * 350 + delta[1];

                     world.Step(timeStep, iterations);

                     for (i = 0; i < elements.length; i++) {
                         var body = bodies[i];
                         var element = elements[i];
                         var t = (body.m_position0.y - (properties[i][3] >> 1));
                         //t+=i*10;
                         body.m_rotation0 += Math.min(.1, Math.max(-.1, (i % 13 - 7) / 130));
                         element.style.left = (body.m_position0.x - (properties[i][2] >> 1)) + 'px';
                         element.style.top = t + 'px';

                         var rotationStyle = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg)';

                         element.style.WebkitTransform = rotationStyle;
                         element.style.MozTransform = rotationStyle;
                         element.style.OTransform = rotationStyle;
                         if (steps > 100 || (steps > 50 && t > 1000)) {
                             clearInterval(timerrun);
                         }
                     }
                 }

                 // createBox()
                 function createBox(world, x, y, width, height, fixed, element) {

                     if (typeof(fixed) == 'undefined')
                         fixed = true;

                     var boxSd = new b2BoxDef();

                     if (!fixed)
                         boxSd.density = 1.0;

                     boxSd.extents.Set(width, height);

                     var boxBd = new b2BodyDef();
                     boxBd.AddShape(boxSd);
                     boxBd.position.Set(x, y);
                     boxBd.userData = {
                         element: element
                     };

                     return world.CreateBody(boxBd)
                 }

                 function setWalls() {

                     if (wallsSetted) {

                         world.DestroyBody(walls[0]);
                         world.DestroyBody(walls[1]);
                         world.DestroyBody(walls[2]);
                         world.DestroyBody(walls[3]);

                         walls[0] = null;
                         walls[1] = null;
                         walls[2] = null;
                         walls[3] = null;
                     }

                     walls[0] = createBox(world, stage[2] / 2, -wall_thickness, stage[2], wall_thickness);
                     walls[1] = createBox(world, stage[2] / 2, stage[3] + wall_thickness, stage[2], wall_thickness);
                     walls[2] = createBox(world, -wall_thickness, stage[3] / 2, wall_thickness, stage[3]);
                     walls[3] = createBox(world, stage[2] + wall_thickness, stage[3] / 2, wall_thickness, stage[3]);

                     wallsSetted = true;
                 }

                 // findPos()
                 function findPos(obj) {
                     var curleft = curtop = 0;

                     if (obj.offsetParent) {
                         do {

                             curleft += obj.offsetLeft;
                             curtop += obj.offsetTop;

                         } while (obj = obj.offsetParent);
                     }

                     return [curleft, curtop];
                 }

                 // getBrowserDimensions()
                 function getBrowserDimensions() {
                     var changed = false;

                     if (stage[0] != window.screenX) {
                         delta[0] = (window.screenX - stage[0]) * 50;
                         stage[0] = window.screenX;
                         changed = true;
                     }

                     if (stage[1] != window.screenY) {
                         delta[1] = (window.screenY - stage[1]) * 50;
                         stage[1] = window.screenY;
                         changed = true;
                     }

                     if (stage[2] != window.innerWidth) {
                         stage[2] = window.innerWidth;
                         changed = true;
                     }

                     if (stage[3] != 50000) {
                         stage[3] = 50000;
                         changed = true;
                     }

                     return changed;
                 }


                 // jQuery plugin end
             });
         }
     });
 })(jQuery);

 //////////////////////////////////////////////////////////////////////////////////
 // A demonstration of a Canvas nebula effect
 // (c) 2010 by R Cecco. <http://www.professorcloud.com>
 // MIT License
 //
 // Please retain this copyright header in all versions of the software if
 // using significant parts of it
 //////////////////////////////////////////////////////////////////////////////////

 $(document).ready(function() {

     (function($) {
         // The canvas element we are drawing into.
         var $canvas = $('#canvas');
         var $canvas2 = $('#canvas2');
         var $canvas3 = $('#canvas3');
         var ctx2 = $canvas2[0].getContext('2d');
         var ctx = $canvas[0].getContext('2d');
         var w = $canvas[0].width,
             h = $canvas[0].height;
         var img = new Image();

         // A puff.
         var Puff = function(p) {
             var opacity,
                 sy = (Math.random() * 285) >> 0,
                 sx = (Math.random() * 285) >> 0;

             this.p = p;

             this.move = function(timeFac) {
                 p = this.p + 0.05 * timeFac;
                 opacity = (Math.sin(p * 0.05) * 0.5);
                 if (opacity < 0) {
                     p = opacity = 0;
                     sy = (Math.random() * 285) >> 0;
                     sx = (Math.random() * 285) >> 0;
                 }
                 this.p = p;
                 ctx.globalAlpha = opacity;
                 //ctx.translate(p/100,0);
                 //ctx.rotate(p/100);
                 ctx.drawImage($canvas3[0], sy + p, sy + p * 2 , 285 - (p * 2), 285 - (p * 2), 0, 0, w, h);
                 //ctx.translate(-p/100,0);
             };
         };

         var puffs = [];
         var sortPuff = function(p1, p2) {
             return p1.p - p2.p;
         };
         puffs.push(new Puff(0));
         puffs.push(new Puff(20));
         puffs.push(new Puff(40));

         var newTime, oldTime = 0,
             timeFac;

         var loop = function() {
             newTime = new Date().getTime();
             if (oldTime === 0) {
                 oldTime = newTime;
             }
             timeFac = (newTime - oldTime) * 0.1;
             if (timeFac > 3) {
                 timeFac = 3;
             }
             oldTime = newTime;
             var idle = (typeof window.nonIdleLast == 'undefined' || new Date() - window.nonIdleLast > 1000 * 3);
                    
             if (idle || perspective != 'results' || $('#stage_sug').find('.vidui').length == 0) {
                 puffs.sort(sortPuff);

                 for (var i = 0; i < puffs.length; i++) {
                     puffs[i].move(timeFac);
                 }
                 ctx2.drawImage($canvas[0], 0, 0, 570, 570);
             }
             setTimeout(loop, 40);
         };
         // Turns out Chrome is much faster doing bitmap work if the bitmap is in an existing canvas rather
         // than an IMG, VIDEO etc. So draw the big nebula image into canvas3
         var $canvas3 = $('#canvas3');
         var ctx3 = $canvas3[0].getContext('2d');
         $(img).bind('load', null, function() {
             ctx3.drawImage(img, 0, 0, 570, 570);
             loop();
         });
         img.src = 'nebula.jpg';

     })(jQuery);
 });


 (function($) {
     $.belowthefold = function(element, settings) {
         var fold = $(window).height() + $(window).scrollTop();
         return fold <= $(element).offset().top - settings.threshold;
     };
     $.abovethetop = function(element, settings) {
         var top = $(window).scrollTop();
         return top >= $(element).offset().top + $(element).height() - settings.threshold;
     };
     $.rightofscreen = function(element, settings) {
         var fold = $(window).width() + $(window).scrollLeft();
         return fold <= $(element).offset().left - settings.threshold;
     };
     $.leftofscreen = function(element, settings) {
         var left = $(window).scrollLeft();
         return left >= $(element).offset().left + $(element).width() - settings.threshold;
     };
     $.inviewport = function(element, settings) {
         return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };
     $.extend($.expr[':'], {
         "below-the-fold": function(a, i, m) {
             return $.belowthefold(a, {
                 threshold: 0
             });
         },
         "above-the-top": function(a, i, m) {
             return $.abovethetop(a, {
                 threshold: 0
             });
         },
         "left-of-screen": function(a, i, m) {
             return $.leftofscreen(a, {
                 threshold: 0
             });
         },
         "right-of-screen": function(a, i, m) {
             return $.rightofscreen(a, {
                 threshold: 0
             });
         },
         "in-viewport": function(a, i, m) {
             return $.inviewport(a, {
                 threshold: 0
             });
         }
     });
 })(jQuery);







    /*!
     * URI.js - Mutating URLs
     *
     * Version: 1.17.1
     *
     * Author: Rodney Rehm
     * Web: http://medialize.github.io/URI.js/
     *
     * Licensed under
     *   MIT License http://www.opensource.org/licenses/mit-license
     *
     */
    (function (root, factory) {
        'use strict';
        // https://github.com/umdjs/umd/blob/master/returnExports.js
        if (typeof exports === 'object') {
            // Node
            module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
        }
        else if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
        }
        else {
            // Browser globals (root is window)
            root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
        }
    }(this, function (punycode, IPv6, SLD, root) {
        'use strict';
        /*global location, escape, unescape */
        // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
        /*jshint camelcase: false */

        // save current URI variable, if any
        var _URI = root && root.URI;

        function URI(url, base) {
            var _urlSupplied = arguments.length >= 1;
            var _baseSupplied = arguments.length >= 2;

            // Allow instantiation without the 'new' keyword
            if (!(this instanceof URI)) {
                if (_urlSupplied) {
                    if (_baseSupplied) {
                        return new URI(url, base);
                    }

                    return new URI(url);
                }

                return new URI();
            }

            if (url === undefined) {
                if (_urlSupplied) {
                    throw new TypeError('undefined is not a valid argument for URI');
                }

                if (typeof location !== 'undefined') {
                    url = location.href + '';
                }
                else {
                    url = '';
                }
            }

            this.href(url);

            // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
            if (base !== undefined) {
                return this.absoluteTo(base);
            }

            return this;
        }

        URI.version = '1.17.1';

        var p = URI.prototype;
        var hasOwn = Object.prototype.hasOwnProperty;

        function escapeRegEx(string) {
            // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
            return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
        }

        function getType(value) {
            // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
            if (value === undefined) {
                return 'Undefined';
            }

            return String(Object.prototype.toString.call(value)).slice(8, -1);
        }

        function isArray(obj) {
            return getType(obj) === 'Array';
        }

        function filterArrayValues(data, value) {
            var lookup = {};
            var i, length;

            if (getType(value) === 'RegExp') {
                lookup = null;
            }
            else if (isArray(value)) {
                for (i = 0, length = value.length; i < length; i++) {
                    lookup[value[i]] = true;
                }
            }
            else {
                lookup[value] = true;
            }

            for (i = 0, length = data.length; i < length; i++) {
                /*jshint laxbreak: true */
                var _match = lookup && lookup[data[i]] !== undefined || !lookup && value.test(data[i]);
                /*jshint laxbreak: false */
                if (_match) {
                    data.splice(i, 1);
                    length--;
                    i--;
                }
            }

            return data;
        }

        function arrayContains(list, value) {
            var i, length;

            // value may be string, number, array, regexp
            if (isArray(value)) {
                // Note: this can be optimized to O(n) (instead of current O(m * n))
                for (i = 0, length = value.length; i < length; i++) {
                    if (!arrayContains(list, value[i])) {
                        return false;
                    }
                }

                return true;
            }

            var _type = getType(value);
            for (i = 0, length = list.length; i < length; i++) {
                if (_type === 'RegExp') {
                    if (typeof list[i] === 'string' && list[i].match(value)) {
                        return true;
                    }
                }
                else if (list[i] === value) {
                    return true;
                }
            }

            return false;
        }

        function arraysEqual(one, two) {
            if (!isArray(one) || !isArray(two)) {
                return false;
            }

            // arrays can't be equal if they have different amount of content
            if (one.length !== two.length) {
                return false;
            }

            one.sort();
            two.sort();

            for (var i = 0, l = one.length; i < l; i++) {
                if (one[i] !== two[i]) {
                    return false;
                }
            }

            return true;
        }

        function trimSlashes(text) {
            var trim_expression = /^\/+|\/+$/g;
            return text.replace(trim_expression, '');
        }

        URI._parts = function () {
            return {
                protocol: null,
                username: null,
                password: null,
                hostname: null,
                urn: null,
                port: null,
                path: null,
                query: null,
                fragment: null,
                // state
                duplicateQueryParameters: URI.duplicateQueryParameters,
                escapeQuerySpace: URI.escapeQuerySpace
            };
        };
        // state: allow duplicate query parameters (a=1&a=1)
        URI.duplicateQueryParameters = false;
        // state: replaces + with %20 (space in query strings)
        URI.escapeQuerySpace = true;
        // static properties
        URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
        URI.idn_expression = /[^a-z0-9\.-]/i;
        URI.punycode_expression = /(xn--)/i;
        // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
        URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        // credits to Rich Brown
        // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
        // specification: http://www.ietf.org/rfc/rfc4291.txt
        URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        // expression used is "gruber revised" (@gruber v2) determined to be the
        // best solution in a regex-golf we did a couple of ages ago at
        // * http://mathiasbynens.be/demo/url-regex
        // * http://rodneyrehm.de/t/url-regex.html
        URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
        URI.findUri = {
            // valid "scheme://" or "www."
            start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
            // everything up to the next whitespace
            end: /[\s\r\n]|$/,
            // trim trailing punctuation captured by end RegExp
            trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
        };
        // http://www.iana.org/assignments/uri-schemes.html
        // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
        URI.defaultPorts = {
            http: '80',
            https: '443',
            ftp: '21',
            gopher: '70',
            ws: '80',
            wss: '443'
        };
        // allowed hostname characters according to RFC 3986
        // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
        // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
        URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
        // map DOM Elements to their URI attribute
        URI.domAttributes = {
            'a': 'href',
            'blockquote': 'cite',
            'link': 'href',
            'base': 'href',
            'script': 'src',
            'form': 'action',
            'img': 'src',
            'area': 'href',
            'iframe': 'src',
            'embed': 'src',
            'source': 'src',
            'track': 'src',
            'input': 'src', // but only if type="image"
            'audio': 'src',
            'video': 'src'
        };
        URI.getDomAttribute = function (node) {
            if (!node || !node.nodeName) {
                return undefined;
            }

            var nodeName = node.nodeName.toLowerCase();
            // <input> should only expose src for type="image"
            if (nodeName === 'input' && node.type !== 'image') {
                return undefined;
            }

            return URI.domAttributes[nodeName];
        };

        function escapeForDumbFirefox36(value) {
            // https://github.com/medialize/URI.js/issues/91
            return escape(value);
        }

        // encoding / decoding according to RFC3986
        function strictEncodeURIComponent(string) {
            // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
            return encodeURIComponent(string)
                .replace(/[!'()*]/g, escapeForDumbFirefox36)
                .replace(/\*/g, '%2A');
        }
        URI.encode = strictEncodeURIComponent;
        URI.decode = decodeURIComponent;
        URI.iso8859 = function () {
            URI.encode = escape;
            URI.decode = unescape;
        };
        URI.unicode = function () {
            URI.encode = strictEncodeURIComponent;
            URI.decode = decodeURIComponent;
        };
        URI.characters = {
            pathname: {
                encode: {
                    // RFC3986 2.1: For consistency, URI producers and normalizers should
                    // use uppercase hexadecimal digits for all percent-encodings.
                    expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
                    map: {
                        // -._~!'()*
                        '%24': '$',
                        '%26': '&',
                        '%2B': '+',
                        '%2C': ',',
                        '%3B': ';',
                        '%3D': '=',
                        '%3A': ':',
                        '%40': '@'
                    }
                },
                decode: {
                    expression: /[\/\?#]/g,
                    map: {
                        '/': '%2F',
                        '?': '%3F',
                        '#': '%23'
                    }
                }
            },
            reserved: {
                encode: {
                    // RFC3986 2.1: For consistency, URI producers and normalizers should
                    // use uppercase hexadecimal digits for all percent-encodings.
                    expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
                    map: {
                        // gen-delims
                        '%3A': ':',
                        '%2F': '/',
                        '%3F': '?',
                        '%23': '#',
                        '%5B': '[',
                        '%5D': ']',
                        '%40': '@',
                        // sub-delims
                        '%21': '!',
                        '%24': '$',
                        '%26': '&',
                        '%27': '\'',
                        '%28': '(',
                        '%29': ')',
                        '%2A': '*',
                        '%2B': '+',
                        '%2C': ',',
                        '%3B': ';',
                        '%3D': '='
                    }
                }
            },
            urnpath: {
                // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
                // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
                // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
                // note that the colon character is not featured in the encoding map; this is because URI.js
                // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
                // should not appear unencoded in a segment itself.
                // See also the note above about RFC3986 and capitalalized hex digits.
                encode: {
                    expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
                    map: {
                        '%21': '!',
                        '%24': '$',
                        '%27': '\'',
                        '%28': '(',
                        '%29': ')',
                        '%2A': '*',
                        '%2B': '+',
                        '%2C': ',',
                        '%3B': ';',
                        '%3D': '=',
                        '%40': '@'
                    }
                },
                // These characters are the characters called out by RFC2141 as "reserved" characters that
                // should never appear in a URN, plus the colon character (see note above).
                decode: {
                    expression: /[\/\?#:]/g,
                    map: {
                        '/': '%2F',
                        '?': '%3F',
                        '#': '%23',
                        ':': '%3A'
                    }
                }
            }
        };
        URI.encodeQuery = function (string, escapeQuerySpace) {
            var escaped = URI.encode(string + '');
            if (escapeQuerySpace === undefined) {
                escapeQuerySpace = URI.escapeQuerySpace;
            }

            return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
        };
        URI.decodeQuery = function (string, escapeQuerySpace) {
            string += '';
            if (escapeQuerySpace === undefined) {
                escapeQuerySpace = URI.escapeQuerySpace;
            }

            try {
                return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
            }
            catch (e) {
                // we're not going to mess with weird encodings,
                // give up and return the undecoded original string
                // see https://github.com/medialize/URI.js/issues/87
                // see https://github.com/medialize/URI.js/issues/92
                return string;
            }
        };
        // generate encode/decode path functions
        var _parts = {
            'encode': 'encode',
            'decode': 'decode'
        };
        var _part;
        var generateAccessor = function (_group, _part) {
            return function (string) {
                try {
                    return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function (c) {
                        return URI.characters[_group][_part].map[c];
                    });
                }
                catch (e) {
                    // we're not going to mess with weird encodings,
                    // give up and return the undecoded original string
                    // see https://github.com/medialize/URI.js/issues/87
                    // see https://github.com/medialize/URI.js/issues/92
                    return string;
                }
            };
        };

        for (_part in _parts) {
            URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
            URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
        }

        var generateSegmentedPathFunction = function (_sep, _codingFuncName, _innerCodingFuncName) {
            return function (string) {
                // Why pass in names of functions, rather than the function objects themselves? The
                // definitions of some functions (but in particular, URI.decode) will occasionally change due
                // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
                // that the functions we use here are "fresh".
                var actualCodingFunc;
                if (!_innerCodingFuncName) {
                    actualCodingFunc = URI[_codingFuncName];
                }
                else {
                    actualCodingFunc = function (string) {
                        return URI[_codingFuncName](URI[_innerCodingFuncName](string));
                    };
                }

                var segments = (string + '').split(_sep);

                for (var i = 0, length = segments.length; i < length; i++) {
                    segments[i] = actualCodingFunc(segments[i]);
                }

                return segments.join(_sep);
            };
        };

        // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
        URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
        URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
        URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
        URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

        URI.encodeReserved = generateAccessor('reserved', 'encode');

        URI.parse = function (string, parts) {
            var pos;
            if (!parts) {
                parts = {};
            }
            // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

            // extract fragment
            pos = string.indexOf('#');
            if (pos > -1) {
                // escaping?
                parts.fragment = string.substring(pos + 1) || null;
                string = string.substring(0, pos);
            }

            // extract query
            pos = string.indexOf('?');
            if (pos > -1) {
                // escaping?
                parts.query = string.substring(pos + 1) || null;
                string = string.substring(0, pos);
            }

            // extract protocol
            if (string.substring(0, 2) === '//') {
                // relative-scheme
                parts.protocol = null;
                string = string.substring(2);
                // extract "user:pass@host:port"
                string = URI.parseAuthority(string, parts);
            }
            else {
                pos = string.indexOf(':');
                if (pos > -1) {
                    parts.protocol = string.substring(0, pos) || null;
                    if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
                        // : may be within the path
                        parts.protocol = undefined;
                    }
                    else if (string.substring(pos + 1, pos + 3) === '//') {
                        string = string.substring(pos + 3);

                        // extract "user:pass@host:port"
                        string = URI.parseAuthority(string, parts);
                    }
                    else {
                        string = string.substring(pos + 1);
                        parts.urn = true;
                    }
                }
            }

            // what's left must be the path
            parts.path = string;

            // and we're done
            return parts;
        };
        URI.parseHost = function (string, parts) {
            // Copy chrome, IE, opera backslash-handling behavior.
            // Back slashes before the query string get converted to forward slashes
            // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
            // See: https://code.google.com/p/chromium/issues/detail?id=25916
            // https://github.com/medialize/URI.js/pull/233
            string = string.replace(/\\/g, '/');

            // extract host:port
            var pos = string.indexOf('/');
            var bracketPos;
            var t;

            if (pos === -1) {
                pos = string.length;
            }

            if (string.charAt(0) === '[') {
                // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
                // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
                // IPv6+port in the format [2001:db8::1]:80 (for the time being)
                bracketPos = string.indexOf(']');
                parts.hostname = string.substring(1, bracketPos) || null;
                parts.port = string.substring(bracketPos + 2, pos) || null;
                if (parts.port === '/') {
                    parts.port = null;
                }
            }
            else {
                var firstColon = string.indexOf(':');
                var firstSlash = string.indexOf('/');
                var nextColon = string.indexOf(':', firstColon + 1);
                if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
                    // IPv6 host contains multiple colons - but no port
                    // this notation is actually not allowed by RFC 3986, but we're a liberal parser
                    parts.hostname = string.substring(0, pos) || null;
                    parts.port = null;
                }
                else {
                    t = string.substring(0, pos).split(':');
                    parts.hostname = t[0] || null;
                    parts.port = t[1] || null;
                }
            }

            if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
                pos++;
                string = '/' + string;
            }

            return string.substring(pos) || '/';
        };
        URI.parseAuthority = function (string, parts) {
            string = URI.parseUserinfo(string, parts);
            return URI.parseHost(string, parts);
        };
        URI.parseUserinfo = function (string, parts) {
            // extract username:password
            var firstSlash = string.indexOf('/');
            var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
            var t;

            // authority@ must come before /path
            if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
                t = string.substring(0, pos).split(':');
                parts.username = t[0] ? URI.decode(t[0]) : null;
                t.shift();
                parts.password = t[0] ? URI.decode(t.join(':')) : null;
                string = string.substring(pos + 1);
            }
            else {
                parts.username = null;
                parts.password = null;
            }

            return string;
        };
        URI.parseQuery = function (string, escapeQuerySpace) {
            if (!string) {
                return {};
            }

            // throw out the funky business - "?"[name"="value"&"]+
            string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

            if (!string) {
                return {};
            }

            var items = {};
            var splits = string.split('&');
            var length = splits.length;
            var v, name, value;

            for (var i = 0; i < length; i++) {
                v = splits[i].split('=');
                name = URI.decodeQuery(v.shift(), escapeQuerySpace);
                // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
                value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

                if (hasOwn.call(items, name)) {
                    if (typeof items[name] === 'string' || items[name] === null) {
                        items[name] = [items[name]];
                    }

                    items[name].push(value);
                }
                else {
                    items[name] = value;
                }
            }

            return items;
        };

        URI.build = function (parts) {
            var t = '';

            if (parts.protocol) {
                t += parts.protocol + ':';
            }

            if (!parts.urn && (t || parts.hostname)) {
                t += '//';
            }

            t += (URI.buildAuthority(parts) || '');

            if (typeof parts.path === 'string') {
                if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
                    t += '/';
                }

                t += parts.path;
            }

            if (typeof parts.query === 'string' && parts.query) {
                t += '?' + parts.query;
            }

            if (typeof parts.fragment === 'string' && parts.fragment) {
                t += '#' + parts.fragment;
            }
            return t;
        };
        URI.buildHost = function (parts) {
            var t = '';

            if (!parts.hostname) {
                return '';
            }
            else if (URI.ip6_expression.test(parts.hostname)) {
                t += '[' + parts.hostname + ']';
            }
            else {
                t += parts.hostname;
            }

            if (parts.port) {
                t += ':' + parts.port;
            }

            return t;
        };
        URI.buildAuthority = function (parts) {
            return URI.buildUserinfo(parts) + URI.buildHost(parts);
        };
        URI.buildUserinfo = function (parts) {
            var t = '';

            if (parts.username) {
                t += URI.encode(parts.username);

                if (parts.password) {
                    t += ':' + URI.encode(parts.password);
                }

                t += '@';
            }

            return t;
        };
        URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
            // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
            // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
            // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
            // URI.js treats the query string as being application/x-www-form-urlencoded
            // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

            var t = '';
            var unique, key, i, length;
            for (key in data) {
                if (hasOwn.call(data, key) && key) {
                    if (isArray(data[key])) {
                        unique = {};
                        for (i = 0, length = data[key].length; i < length; i++) {
                            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
                                t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
                                if (duplicateQueryParameters !== true) {
                                    unique[data[key][i] + ''] = true;
                                }
                            }
                        }
                    }
                    else if (data[key] !== undefined) {
                        t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
                    }
                }
            }

            return t.substring(1);
        };
        URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
            // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
            // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
            return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
        };

        URI.addQuery = function (data, name, value) {
            if (typeof name === 'object') {
                for (var key in name) {
                    if (hasOwn.call(name, key)) {
                        URI.addQuery(data, key, name[key]);
                    }
                }
            }
            else if (typeof name === 'string') {
                if (data[name] === undefined) {
                    data[name] = value;
                    return;
                }
                else if (typeof data[name] === 'string') {
                    data[name] = [data[name]];
                }

                if (!isArray(value)) {
                    value = [value];
                }

                data[name] = (data[name] || []).concat(value);
            }
            else {
                throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
            }
        };
        URI.removeQuery = function (data, name, value) {
            var i, length, key;

            if (isArray(name)) {
                for (i = 0, length = name.length; i < length; i++) {
                    data[name[i]] = undefined;
                }
            }
            else if (getType(name) === 'RegExp') {
                for (key in data) {
                    if (name.test(key)) {
                        data[key] = undefined;
                    }
                }
            }
            else if (typeof name === 'object') {
                for (key in name) {
                    if (hasOwn.call(name, key)) {
                        URI.removeQuery(data, key, name[key]);
                    }
                }
            }
            else if (typeof name === 'string') {
                if (value !== undefined) {
                    if (getType(value) === 'RegExp') {
                        if (!isArray(data[name]) && value.test(data[name])) {
                            data[name] = undefined;
                        }
                        else {
                            data[name] = filterArrayValues(data[name], value);
                        }
                    }
                    else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
                        data[name] = undefined;
                    }
                    else if (isArray(data[name])) {
                        data[name] = filterArrayValues(data[name], value);
                    }
                }
                else {
                    data[name] = undefined;
                }
            }
            else {
                throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
            }
        };
        URI.hasQuery = function (data, name, value, withinArray) {
            switch (getType(name)) {
                case 'String':
                    // Nothing to do here
                    break;

                case 'RegExp':
                    for (var key in data) {
                        if (hasOwn.call(data, key)) {
                            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
                                return true;
                            }
                        }
                    }

                    return false;

                case 'Object':
                    for (var _key in name) {
                        if (hasOwn.call(name, _key)) {
                            if (!URI.hasQuery(data, _key, name[_key])) {
                                return false;
                            }
                        }
                    }

                    return true;

                default:
                    throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
            }

            switch (getType(value)) {
                case 'Undefined':
                    // true if exists (but may be empty)
                    return name in data; // data[name] !== undefined;

                case 'Boolean':
                    // true if exists and non-empty
                    var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
                    return value === _booly;

                case 'Function':
                    // allow complex comparison
                    return !!value(data[name], name, data);

                case 'Array':
                    if (!isArray(data[name])) {
                        return false;
                    }

                    var op = withinArray ? arrayContains : arraysEqual;
                    return op(data[name], value);

                case 'RegExp':
                    if (!isArray(data[name])) {
                        return Boolean(data[name] && data[name].match(value));
                    }

                    if (!withinArray) {
                        return false;
                    }

                    return arrayContains(data[name], value);

                case 'Number':
                    value = String(value);
                    /* falls through */
                case 'String':
                    if (!isArray(data[name])) {
                        return data[name] === value;
                    }

                    if (!withinArray) {
                        return false;
                    }

                    return arrayContains(data[name], value);

                default:
                    throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
            }
        };


        URI.commonPath = function (one, two) {
            var length = Math.min(one.length, two.length);
            var pos;

            // find first non-matching character
            for (pos = 0; pos < length; pos++) {
                if (one.charAt(pos) !== two.charAt(pos)) {
                    pos--;
                    break;
                }
            }

            if (pos < 1) {
                return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
            }

            // revert to last /
            if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
                pos = one.substring(0, pos).lastIndexOf('/');
            }

            return one.substring(0, pos + 1);
        };

        URI.withinString = function (string, callback, options) {
            options || (options = {});
            var _start = options.start || URI.findUri.start;
            var _end = options.end || URI.findUri.end;
            var _trim = options.trim || URI.findUri.trim;
            var _attributeOpen = /[a-z0-9-]=["']?$/i;

            _start.lastIndex = 0;
            while (true) {
                var match = _start.exec(string);
                if (!match) {
                    break;
                }

                var start = match.index;
                if (options.ignoreHtml) {
                    // attribut(e=["']?$)
                    var attributeOpen = string.slice(Math.max(start - 3, 0), start);
                    if (attributeOpen && _attributeOpen.test(attributeOpen)) {
                        continue;
                    }
                }

                var end = start + string.slice(start).search(_end);
                var slice = string.slice(start, end).replace(_trim, '');
                if (options.ignore && options.ignore.test(slice)) {
                    continue;
                }

                end = start + slice.length;
                var result = callback(slice, start, end, string);
                string = string.slice(0, start) + result + string.slice(end);
                _start.lastIndex = start + result.length;
            }

            _start.lastIndex = 0;
            return string;
        };

        URI.ensureValidHostname = function (v) {
            // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
            // they are not part of DNS and therefore ignored by URI.js

            if (v.match(URI.invalid_hostname_characters)) {
                // test punycode
                if (!punycode) {
                    throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
                }

                if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
                    throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
                }
            }
        };

        // noConflict
        URI.noConflict = function (removeAll) {
            if (removeAll) {
                var unconflicted = {
                    URI: this.noConflict()
                };

                if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
                    unconflicted.URITemplate = root.URITemplate.noConflict();
                }

                if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
                    unconflicted.IPv6 = root.IPv6.noConflict();
                }

                if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
                    unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
                }

                return unconflicted;
            }
            else if (root.URI === this) {
                root.URI = _URI;
            }

            return this;
        };

        p.build = function (deferBuild) {
            if (deferBuild === true) {
                this._deferred_build = true;
            }
            else if (deferBuild === undefined || this._deferred_build) {
                this._string = URI.build(this._parts);
                this._deferred_build = false;
            }

            return this;
        };

        p.clone = function () {
            return new URI(this);
        };

        p.valueOf = p.toString = function () {
            return this.build(false)._string;
        };


        function generateSimpleAccessor(_part) {
            return function (v, build) {
                if (v === undefined) {
                    return this._parts[_part] || '';
                }
                else {
                    this._parts[_part] = v || null;
                    this.build(!build);
                    return this;
                }
            };
        }

        function generatePrefixAccessor(_part, _key) {
            return function (v, build) {
                if (v === undefined) {
                    return this._parts[_part] || '';
                }
                else {
                    if (v !== null) {
                        v = v + '';
                        if (v.charAt(0) === _key) {
                            v = v.substring(1);
                        }
                    }

                    this._parts[_part] = v;
                    this.build(!build);
                    return this;
                }
            };
        }

        p.protocol = generateSimpleAccessor('protocol');
        p.username = generateSimpleAccessor('username');
        p.password = generateSimpleAccessor('password');
        p.hostname = generateSimpleAccessor('hostname');
        p.port = generateSimpleAccessor('port');
        p.query = generatePrefixAccessor('query', '?');
        p.fragment = generatePrefixAccessor('fragment', '#');

        p.search = function (v, build) {
            var t = this.query(v, build);
            return typeof t === 'string' && t.length ? ('?' + t) : t;
        };
        p.hash = function (v, build) {
            var t = this.fragment(v, build);
            return typeof t === 'string' && t.length ? ('#' + t) : t;
        };

        p.pathname = function (v, build) {
            if (v === undefined || v === true) {
                var res = this._parts.path || (this._parts.hostname ? '/' : '');
                return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
            }
            else {
                if (this._parts.urn) {
                    this._parts.path = v ? URI.recodeUrnPath(v) : '';
                }
                else {
                    this._parts.path = v ? URI.recodePath(v) : '/';
                }
                this.build(!build);
                return this;
            }
        };
        p.path = p.pathname;
        p.href = function (href, build) {
            var key;

            if (href === undefined) {
                return this.toString();
            }

            this._string = '';
            this._parts = URI._parts();

            var _URI = href instanceof URI;
            var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
            if (href.nodeName) {
                var attribute = URI.getDomAttribute(href);
                href = href[attribute] || '';
                _object = false;
            }

            // window.location is reported to be an object, but it's not the sort
            // of object we're looking for:
            // * location.protocol ends with a colon
            // * location.query != object.search
            // * location.hash != object.fragment
            // simply serializing the unknown object should do the trick
            // (for location, not for everything...)
            if (!_URI && _object && href.pathname !== undefined) {
                href = href.toString();
            }

            if (typeof href === 'string' || href instanceof String) {
                this._parts = URI.parse(String(href), this._parts);
            }
            else if (_URI || _object) {
                var src = _URI ? href._parts : href;
                for (key in src) {
                    if (hasOwn.call(this._parts, key)) {
                        this._parts[key] = src[key];
                    }
                }
            }
            else {
                throw new TypeError('invalid input');
            }

            this.build(!build);
            return this;
        };

        // identification accessors
        p.is = function (what) {
            var ip = false;
            var ip4 = false;
            var ip6 = false;
            var name = false;
            var sld = false;
            var idn = false;
            var punycode = false;
            var relative = !this._parts.urn;

            if (this._parts.hostname) {
                relative = false;
                ip4 = URI.ip4_expression.test(this._parts.hostname);
                ip6 = URI.ip6_expression.test(this._parts.hostname);
                ip = ip4 || ip6;
                name = !ip;
                sld = name && SLD && SLD.has(this._parts.hostname);
                idn = name && URI.idn_expression.test(this._parts.hostname);
                punycode = name && URI.punycode_expression.test(this._parts.hostname);
            }

            switch (what.toLowerCase()) {
                case 'relative':
                    return relative;

                case 'absolute':
                    return !relative;

                    // hostname identification
                case 'domain':
                case 'name':
                    return name;

                case 'sld':
                    return sld;

                case 'ip':
                    return ip;

                case 'ip4':
                case 'ipv4':
                case 'inet4':
                    return ip4;

                case 'ip6':
                case 'ipv6':
                case 'inet6':
                    return ip6;

                case 'idn':
                    return idn;

                case 'url':
                    return !this._parts.urn;

                case 'urn':
                    return !!this._parts.urn;

                case 'punycode':
                    return punycode;
            }

            return null;
        };

        // component specific input validation
        var _protocol = p.protocol;
        var _port = p.port;
        var _hostname = p.hostname;

        p.protocol = function (v, build) {
            if (v !== undefined) {
                if (v) {
                    // accept trailing ://
                    v = v.replace(/:(\/\/)?$/, '');

                    if (!v.match(URI.protocol_expression)) {
                        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
                    }
                }
            }
            return _protocol.call(this, v, build);
        };
        p.scheme = p.protocol;
        p.port = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v !== undefined) {
                if (v === 0) {
                    v = null;
                }

                if (v) {
                    v += '';
                    if (v.charAt(0) === ':') {
                        v = v.substring(1);
                    }

                    if (v.match(/[^0-9]/)) {
                        throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
                    }
                }
            }
            return _port.call(this, v, build);
        };
        p.hostname = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v !== undefined) {
                var x = {};
                var res = URI.parseHost(v, x);
                if (res !== '/') {
                    throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
                }

                v = x.hostname;
            }
            return _hostname.call(this, v, build);
        };

        // compound accessors
        p.origin = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined) {
                var protocol = this.protocol();
                var authority = this.authority();
                if (!authority) {
                    return '';
                }

                return (protocol ? protocol + '://' : '') + this.authority();
            }
            else {
                var origin = URI(v);
                this
                    .protocol(origin.protocol())
                    .authority(origin.authority())
                    .build(!build);
                return this;
            }
        };
        p.host = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined) {
                return this._parts.hostname ? URI.buildHost(this._parts) : '';
            }
            else {
                var res = URI.parseHost(v, this._parts);
                if (res !== '/') {
                    throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
                }

                this.build(!build);
                return this;
            }
        };
        p.authority = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined) {
                return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
            }
            else {
                var res = URI.parseAuthority(v, this._parts);
                if (res !== '/') {
                    throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
                }

                this.build(!build);
                return this;
            }
        };
        p.userinfo = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined) {
                if (!this._parts.username) {
                    return '';
                }

                var t = URI.buildUserinfo(this._parts);
                return t.substring(0, t.length - 1);
            }
            else {
                if (v[v.length - 1] !== '@') {
                    v += '@';
                }

                URI.parseUserinfo(v, this._parts);
                this.build(!build);
                return this;
            }
        };
        p.resource = function (v, build) {
            var parts;

            if (v === undefined) {
                return this.path() + this.search() + this.hash();
            }

            parts = URI.parse(v);
            this._parts.path = parts.path;
            this._parts.query = parts.query;
            this._parts.fragment = parts.fragment;
            this.build(!build);
            return this;
        };

        // fraction accessors
        p.subdomain = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            // convenience, return "www" from "www.example.org"
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return '';
                }

                // grab domain and add another segment
                var end = this._parts.hostname.length - this.domain().length - 1;
                return this._parts.hostname.substring(0, end) || '';
            }
            else {
                var e = this._parts.hostname.length - this.domain().length;
                var sub = this._parts.hostname.substring(0, e);
                var replace = new RegExp('^' + escapeRegEx(sub));

                if (v && v.charAt(v.length - 1) !== '.') {
                    v += '.';
                }

                if (v) {
                    URI.ensureValidHostname(v);
                }

                this._parts.hostname = this._parts.hostname.replace(replace, v);
                this.build(!build);
                return this;
            }
        };
        p.domain = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (typeof v === 'boolean') {
                build = v;
                v = undefined;
            }

            // convenience, return "example.org" from "www.example.org"
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return '';
                }

                // if hostname consists of 1 or 2 segments, it must be the domain
                var t = this._parts.hostname.match(/\./g);
                if (t && t.length < 2) {
                    return this._parts.hostname;
                }

                // grab tld and add another segment
                var end = this._parts.hostname.length - this.tld(build).length - 1;
                end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
                return this._parts.hostname.substring(end) || '';
            }
            else {
                if (!v) {
                    throw new TypeError('cannot set domain empty');
                }

                URI.ensureValidHostname(v);

                if (!this._parts.hostname || this.is('IP')) {
                    this._parts.hostname = v;
                }
                else {
                    var replace = new RegExp(escapeRegEx(this.domain()) + '$');
                    this._parts.hostname = this._parts.hostname.replace(replace, v);
                }

                this.build(!build);
                return this;
            }
        };
        p.tld = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (typeof v === 'boolean') {
                build = v;
                v = undefined;
            }

            // return "org" from "www.example.org"
            if (v === undefined) {
                if (!this._parts.hostname || this.is('IP')) {
                    return '';
                }

                var pos = this._parts.hostname.lastIndexOf('.');
                var tld = this._parts.hostname.substring(pos + 1);

                if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
                    return SLD.get(this._parts.hostname) || tld;
                }

                return tld;
            }
            else {
                var replace;

                if (!v) {
                    throw new TypeError('cannot set TLD empty');
                }
                else if (v.match(/[^a-zA-Z0-9-]/)) {
                    if (SLD && SLD.is(v)) {
                        replace = new RegExp(escapeRegEx(this.tld()) + '$');
                        this._parts.hostname = this._parts.hostname.replace(replace, v);
                    }
                    else {
                        throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
                    }
                }
                else if (!this._parts.hostname || this.is('IP')) {
                    throw new ReferenceError('cannot set TLD on non-domain host');
                }
                else {
                    replace = new RegExp(escapeRegEx(this.tld()) + '$');
                    this._parts.hostname = this._parts.hostname.replace(replace, v);
                }

                this.build(!build);
                return this;
            }
        };
        p.directory = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined || v === true) {
                if (!this._parts.path && !this._parts.hostname) {
                    return '';
                }

                if (this._parts.path === '/') {
                    return '/';
                }

                var end = this._parts.path.length - this.filename().length - 1;
                var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

                return v ? URI.decodePath(res) : res;

            }
            else {
                var e = this._parts.path.length - this.filename().length;
                var directory = this._parts.path.substring(0, e);
                var replace = new RegExp('^' + escapeRegEx(directory));

                // fully qualifier directories begin with a slash
                if (!this.is('relative')) {
                    if (!v) {
                        v = '/';
                    }

                    if (v.charAt(0) !== '/') {
                        v = '/' + v;
                    }
                }

                // directories always end with a slash
                if (v && v.charAt(v.length - 1) !== '/') {
                    v += '/';
                }

                v = URI.recodePath(v);
                this._parts.path = this._parts.path.replace(replace, v);
                this.build(!build);
                return this;
            }
        };
        p.filename = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined || v === true) {
                if (!this._parts.path || this._parts.path === '/') {
                    return '';
                }

                var pos = this._parts.path.lastIndexOf('/');
                var res = this._parts.path.substring(pos + 1);

                return v ? URI.decodePathSegment(res) : res;
            }
            else {
                var mutatedDirectory = false;

                if (v.charAt(0) === '/') {
                    v = v.substring(1);
                }

                if (v.match(/\.?\//)) {
                    mutatedDirectory = true;
                }

                var replace = new RegExp(escapeRegEx(this.filename()) + '$');
                v = URI.recodePath(v);
                this._parts.path = this._parts.path.replace(replace, v);

                if (mutatedDirectory) {
                    this.normalizePath(build);
                }
                else {
                    this.build(!build);
                }

                return this;
            }
        };
        p.suffix = function (v, build) {
            if (this._parts.urn) {
                return v === undefined ? '' : this;
            }

            if (v === undefined || v === true) {
                if (!this._parts.path || this._parts.path === '/') {
                    return '';
                }

                var filename = this.filename();
                var pos = filename.lastIndexOf('.');
                var s, res;

                if (pos === -1) {
                    return '';
                }

                // suffix may only contain alnum characters (yup, I made this up.)
                s = filename.substring(pos + 1);
                res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
                return v ? URI.decodePathSegment(res) : res;
            }
            else {
                if (v.charAt(0) === '.') {
                    v = v.substring(1);
                }

                var suffix = this.suffix();
                var replace;

                if (!suffix) {
                    if (!v) {
                        return this;
                    }

                    this._parts.path += '.' + URI.recodePath(v);
                }
                else if (!v) {
                    replace = new RegExp(escapeRegEx('.' + suffix) + '$');
                }
                else {
                    replace = new RegExp(escapeRegEx(suffix) + '$');
                }

                if (replace) {
                    v = URI.recodePath(v);
                    this._parts.path = this._parts.path.replace(replace, v);
                }

                this.build(!build);
                return this;
            }
        };
        p.segment = function (segment, v, build) {
            var separator = this._parts.urn ? ':' : '/';
            var path = this.path();
            var absolute = path.substring(0, 1) === '/';
            var segments = path.split(separator);

            if (segment !== undefined && typeof segment !== 'number') {
                build = v;
                v = segment;
                segment = undefined;
            }

            if (segment !== undefined && typeof segment !== 'number') {
                throw new Error('Bad segment "' + segment + '", must be 0-based integer');
            }

            if (absolute) {
                segments.shift();
            }

            if (segment < 0) {
                // allow negative indexes to address from the end
                segment = Math.max(segments.length + segment, 0);
            }

            if (v === undefined) {
                /*jshint laxbreak: true */
                return segment === undefined ? segments : segments[segment];
                /*jshint laxbreak: false */
            }
            else if (segment === null || segments[segment] === undefined) {
                if (isArray(v)) {
                    segments = [];
                    // collapse empty elements within array
                    for (var i = 0, l = v.length; i < l; i++) {
                        if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
                            continue;
                        }

                        if (segments.length && !segments[segments.length - 1].length) {
                            segments.pop();
                        }

                        segments.push(trimSlashes(v[i]));
                    }
                }
                else if (v || typeof v === 'string') {
                    v = trimSlashes(v);
                    if (segments[segments.length - 1] === '') {
                        // empty trailing elements have to be overwritten
                        // to prevent results such as /foo//bar
                        segments[segments.length - 1] = v;
                    }
                    else {
                        segments.push(v);
                    }
                }
            }
            else {
                if (v) {
                    segments[segment] = trimSlashes(v);
                }
                else {
                    segments.splice(segment, 1);
                }
            }

            if (absolute) {
                segments.unshift('');
            }

            return this.path(segments.join(separator), build);
        };
        p.segmentCoded = function (segment, v, build) {
            var segments, i, l;

            if (typeof segment !== 'number') {
                build = v;
                v = segment;
                segment = undefined;
            }

            if (v === undefined) {
                segments = this.segment(segment, v, build);
                if (!isArray(segments)) {
                    segments = segments !== undefined ? URI.decode(segments) : undefined;
                }
                else {
                    for (i = 0, l = segments.length; i < l; i++) {
                        segments[i] = URI.decode(segments[i]);
                    }
                }

                return segments;
            }

            if (!isArray(v)) {
                v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
            }
            else {
                for (i = 0, l = v.length; i < l; i++) {
                    v[i] = URI.encode(v[i]);
                }
            }

            return this.segment(segment, v, build);
        };

        // mutating query string
        var q = p.query;
        p.query = function (v, build) {
            if (v === true) {
                return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            }
            else if (typeof v === 'function') {
                var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
                var result = v.call(this, data);
                this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
                this.build(!build);
                return this;
            }
            else if (v !== undefined && typeof v !== 'string') {
                this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
                this.build(!build);
                return this;
            }
            else {
                return q.call(this, v, build);
            }
        };
        p.setQuery = function (name, value, build) {
            var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

            if (typeof name === 'string' || name instanceof String) {
                data[name] = value !== undefined ? value : null;
            }
            else if (typeof name === 'object') {
                for (var key in name) {
                    if (hasOwn.call(name, key)) {
                        data[key] = name[key];
                    }
                }
            }
            else {
                throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
            }

            this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof name !== 'string') {
                build = value;
            }

            this.build(!build);
            return this;
        };
        p.addQuery = function (name, value, build) {
            var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            URI.addQuery(data, name, value === undefined ? null : value);
            this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof name !== 'string') {
                build = value;
            }

            this.build(!build);
            return this;
        };
        p.removeQuery = function (name, value, build) {
            var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            URI.removeQuery(data, name, value);
            this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
            if (typeof name !== 'string') {
                build = value;
            }

            this.build(!build);
            return this;
        };
        p.hasQuery = function (name, value, withinArray) {
            var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
            return URI.hasQuery(data, name, value, withinArray);
        };
        p.setSearch = p.setQuery;
        p.addSearch = p.addQuery;
        p.removeSearch = p.removeQuery;
        p.hasSearch = p.hasQuery;

        // sanitizing URLs
        p.normalize = function () {
            if (this._parts.urn) {
                return this
                    .normalizeProtocol(false)
                    .normalizePath(false)
                    .normalizeQuery(false)
                    .normalizeFragment(false)
                    .build();
            }

            return this
                .normalizeProtocol(false)
                .normalizeHostname(false)
                .normalizePort(false)
                .normalizePath(false)
                .normalizeQuery(false)
                .normalizeFragment(false)
                .build();
        };
        p.normalizeProtocol = function (build) {
            if (typeof this._parts.protocol === 'string') {
                this._parts.protocol = this._parts.protocol.toLowerCase();
                this.build(!build);
            }

            return this;
        };
        p.normalizeHostname = function (build) {
            if (this._parts.hostname) {
                if (this.is('IDN') && punycode) {
                    this._parts.hostname = punycode.toASCII(this._parts.hostname);
                }
                else if (this.is('IPv6') && IPv6) {
                    this._parts.hostname = IPv6.best(this._parts.hostname);
                }

                this._parts.hostname = this._parts.hostname.toLowerCase();
                this.build(!build);
            }

            return this;
        };
        p.normalizePort = function (build) {
            // remove port of it's the protocol's default
            if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
                this._parts.port = null;
                this.build(!build);
            }

            return this;
        };
        p.normalizePath = function (build) {
            var _path = this._parts.path;
            if (!_path) {
                return this;
            }

            if (this._parts.urn) {
                this._parts.path = URI.recodeUrnPath(this._parts.path);
                this.build(!build);
                return this;
            }

            if (this._parts.path === '/') {
                return this;
            }

            _path = URI.recodePath(_path);

            var _was_relative;
            var _leadingParents = '';
            var _parent, _pos;

            // handle relative paths
            if (_path.charAt(0) !== '/') {
                _was_relative = true;
                _path = '/' + _path;
            }

            // handle relative files (as opposed to directories)
            if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
                _path += '/';
            }

            // resolve simples
            _path = _path
                .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
                .replace(/\/{2,}/g, '/');

            // remember leading parents
            if (_was_relative) {
                _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
                if (_leadingParents) {
                    _leadingParents = _leadingParents[0];
                }
            }

            // resolve parents
            while (true) {
                _parent = _path.search(/\/\.\.(\/|$)/);
                if (_parent === -1) {
                    // no more ../ to resolve
                    break;
                }
                else if (_parent === 0) {
                    // top level cannot be relative, skip it
                    _path = _path.substring(3);
                    continue;
                }

                _pos = _path.substring(0, _parent).lastIndexOf('/');
                if (_pos === -1) {
                    _pos = _parent;
                }
                _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
            }

            // revert to relative
            if (_was_relative && this.is('relative')) {
                _path = _leadingParents + _path.substring(1);
            }

            this._parts.path = _path;
            this.build(!build);
            return this;
        };
        p.normalizePathname = p.normalizePath;
        p.normalizeQuery = function (build) {
            if (typeof this._parts.query === 'string') {
                if (!this._parts.query.length) {
                    this._parts.query = null;
                }
                else {
                    this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
                }

                this.build(!build);
            }

            return this;
        };
        p.normalizeFragment = function (build) {
            if (!this._parts.fragment) {
                this._parts.fragment = null;
                this.build(!build);
            }

            return this;
        };
        p.normalizeSearch = p.normalizeQuery;
        p.normalizeHash = p.normalizeFragment;

        p.iso8859 = function () {
            // expect unicode input, iso8859 output
            var e = URI.encode;
            var d = URI.decode;

            URI.encode = escape;
            URI.decode = decodeURIComponent;
            try {
                this.normalize();
            }
            finally {
                URI.encode = e;
                URI.decode = d;
            }
            return this;
        };

        p.unicode = function () {
            // expect iso8859 input, unicode output
            var e = URI.encode;
            var d = URI.decode;

            URI.encode = strictEncodeURIComponent;
            URI.decode = unescape;
            try {
                this.normalize();
            }
            finally {
                URI.encode = e;
                URI.decode = d;
            }
            return this;
        };

        p.readable = function () {
            var uri = this.clone();
            // removing username, password, because they shouldn't be displayed according to RFC 3986
            uri.username('').password('').normalize();
            var t = '';
            if (uri._parts.protocol) {
                t += uri._parts.protocol + '://';
            }

            if (uri._parts.hostname) {
                if (uri.is('punycode') && punycode) {
                    t += punycode.toUnicode(uri._parts.hostname);
                    if (uri._parts.port) {
                        t += ':' + uri._parts.port;
                    }
                }
                else {
                    t += uri.host();
                }
            }

            if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
                t += '/';
            }

            t += uri.path(true);
            if (uri._parts.query) {
                var q = '';
                for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
                    var kv = (qp[i] || '').split('=');
                    q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
                        .replace(/&/g, '%26');

                    if (kv[1] !== undefined) {
                        q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
                            .replace(/&/g, '%26');
                    }
                }
                t += '?' + q.substring(1);
            }

            t += URI.decodeQuery(uri.hash(), true);
            return t;
        };

        // resolving relative and absolute URLs
        p.absoluteTo = function (base) {
            var resolved = this.clone();
            var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
            var basedir, i, p;

            if (this._parts.urn) {
                throw new Error('URNs do not have any generally defined hierarchical components');
            }

            if (!(base instanceof URI)) {
                base = new URI(base);
            }

            if (!resolved._parts.protocol) {
                resolved._parts.protocol = base._parts.protocol;
            }

            if (this._parts.hostname) {
                return resolved;
            }

            for (i = 0;
                (p = properties[i]) ; i++) {
                resolved._parts[p] = base._parts[p];
            }

            if (!resolved._parts.path) {
                resolved._parts.path = base._parts.path;
                if (!resolved._parts.query) {
                    resolved._parts.query = base._parts.query;
                }
            }
            else if (resolved._parts.path.substring(-2) === '..') {
                resolved._parts.path += '/';
            }

            if (resolved.path().charAt(0) !== '/') {
                basedir = base.directory();
                basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
                resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
                resolved.normalizePath();
            }

            resolved.build();
            return resolved;
        };
        p.relativeTo = function (base) {
            var relative = this.clone().normalize();
            var relativeParts, baseParts, common, relativePath, basePath;

            if (relative._parts.urn) {
                throw new Error('URNs do not have any generally defined hierarchical components');
            }

            base = new URI(base).normalize();
            relativeParts = relative._parts;
            baseParts = base._parts;
            relativePath = relative.path();
            basePath = base.path();

            if (relativePath.charAt(0) !== '/') {
                throw new Error('URI is already relative');
            }

            if (basePath.charAt(0) !== '/') {
                throw new Error('Cannot calculate a URI relative to another relative URI');
            }

            if (relativeParts.protocol === baseParts.protocol) {
                relativeParts.protocol = null;
            }

            if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
                return relative.build();
            }

            if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
                return relative.build();
            }

            if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
                relativeParts.hostname = null;
                relativeParts.port = null;
            }
            else {
                return relative.build();
            }

            if (relativePath === basePath) {
                relativeParts.path = '';
                return relative.build();
            }

            // determine common sub path
            common = URI.commonPath(relativePath, basePath);

            // If the paths have nothing in common, return a relative URL with the absolute path.
            if (!common) {
                return relative.build();
            }

            var parents = baseParts.path
                .substring(common.length)
                .replace(/[^\/]*$/, '')
                .replace(/.*?\//g, '../');

            relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

            return relative.build();
        };

        // comparing URIs
        p.equals = function (uri) {
            var one = this.clone();
            var two = new URI(uri);
            var one_map = {};
            var two_map = {};
            var checked = {};
            var one_query, two_query, key;

            one.normalize();
            two.normalize();

            // exact match
            if (one.toString() === two.toString()) {
                return true;
            }

            // extract query string
            one_query = one.query();
            two_query = two.query();
            one.query('');
            two.query('');

            // definitely not equal if not even non-query parts match
            if (one.toString() !== two.toString()) {
                return false;
            }

            // query parameters have the same length, even if they're permuted
            if (one_query.length !== two_query.length) {
                return false;
            }

            one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
            two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

            for (key in one_map) {
                if (hasOwn.call(one_map, key)) {
                    if (!isArray(one_map[key])) {
                        if (one_map[key] !== two_map[key]) {
                            return false;
                        }
                    }
                    else if (!arraysEqual(one_map[key], two_map[key])) {
                        return false;
                    }

                    checked[key] = true;
                }
            }

            for (key in two_map) {
                if (hasOwn.call(two_map, key)) {
                    if (!checked[key]) {
                        // two contains a parameter not present in one
                        return false;
                    }
                }
            }

            return true;
        };

        // state
        p.duplicateQueryParameters = function (v) {
            this._parts.duplicateQueryParameters = !!v;
            return this;
        };

        p.escapeQuerySpace = function (v) {
            this._parts.escapeQuerySpace = !!v;
            return this;
        };

        return URI;
    }));







    /*
    JSONProxy jQuery Plugin, v0.3.1
    https://jsonp.afeld.me

    by Aidan Feldman
    MIT license
    */
    /*jshint browser:true */
    /*global define, jQuery, URI */
    (function (factory) {
        // https://github.com/umdjs/umd/blob/ce6c20e318e58cd301ee929135cf651b02392c08/jqueryPlugin.js
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define([
                'jquery',
                // https://github.com/medialize/URI.js#requirejs
                'URIjs/URI'
            ], factory);
        }
        else {
            // Browser globals
            factory(jQuery, URI);
        }
    }(function ($, URI) {
        // Accepts all jQuery.ajax() options, plus:
        //   corsSupport {Boolean} Set to true if the URL is known to support CORS for this domain.
        //   jsonpSupport {Boolean} Set to true if the URL is known to support JSONP.
        $.jsonp = function (opts) {
            var windowUrl = $.jsonp.getLocation(),
                apiUri = $.jsonp.getApiUri(opts),
                defaultDataType;

            if ($.jsonp.isCrossDomain(URI(windowUrl), apiUri)) {
                var doProxy;

                // favor CORS because it can provide error messages from server to callbacks
                if ($.support.cors) {
                    // use the proxy if the endpoint doesn't support CORS, or if it would be an insecure request from a secure page
                    if (!opts.corsSupport || $.jsonp.isInsecureRequest(apiUri)) {
                        // proxy CORS
                        doProxy = true;
                    } // else direct CORS
                    defaultDataType = 'json';
                }
                else {
                    if (!opts.jsonpSupport) {
                        // proxy JSONP
                        doProxy = true;
                    } // else direct JSONP

                    defaultDataType = 'jsonp';
                    opts.timeout = opts.timeout || 10000; // ensures error callbacks are fired
                }

                if (doProxy) {
                    opts.data = {
                        url: apiUri.toString()
                    };

                    if (opts.dataType === 'text') {
                        // 'raw' request

                        // jQuery(?) doesn't accept JSONP responses with strings passed, so raw responses are wrapped with {data: "..."}.
                        // Mask this to the library user by simply returning the underlying string.
                        opts.dataFilter = function (json) {
                            return json.data;
                        };
                        opts.data.raw = true;
                    }

                    opts.url = $.jsonp.PROXY;
                    opts.dataType = defaultDataType;
                }
            }
            else {
                defaultDataType = 'json';
            }

            opts.dataType = opts.dataType || defaultDataType;

            return $.ajax(opts);
        };

        $.extend($.jsonp, {
            PROXY: 'https://jsonp.afeld.me/',

            // make this available for easier testing
            getLocation: function () {
                return window.location;
            },

            getApiUri: function (ajaxOpts) {
                var windowUrl = $.jsonp.getLocation(),
                    uri = URI(ajaxOpts.url).absoluteTo(windowUrl.href),
                    params;

                if (typeof ajaxOpts.data === 'string') {
                    params = URI.parseQuery(ajaxOpts.data);
                }
                else {
                    params = ajaxOpts.data || {};
                }
                uri.addSearch(params);

                return uri;
            },

            // http://stackoverflow.com/a/1084027/358804
            isCrossDomain: function (uri1, uri2) {
                return (
                    uri1.protocol() !== uri2.protocol() ||
                    uri1.host() !== uri2.host() ||
                    uri1.port() !== uri2.port()
                );
            },

            isInsecureRequest: function (uri) {
                var windowUrl = this.getLocation();
                return windowUrl.protocol === 'https:' && uri.protocol() !== windowUrl.protocol;
            }
        });
    }));






 function areDups(s1, s2) {
     var dupIndics = ['remix', 'kareoke', 'cover', 'live', 'tribute', 'the'];

     function cleanString(s) {
         var r = s.replace(/((\(|\[)[^\)\]]+(\)|\]))|[^\w\s]/gi, ' ').replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '').toLowerCase();
         return r;
     }

     if (s1.indexOf('-') > -1 && s1.split('-')[1].length > 10) s1 = s1.split('-')[1];
     if (s2.indexOf('-') > -1 && s2.split('-')[1].length > 10) s2 = s2.split('-')[1];
     var w1 = cleanString(s1);
     var w2 = cleanString(s2);
     var wa1 = w1.split(' ');
     var wa2 = w2.split(' ');
     if (wa1.length < 1 || wa2.length < 1 || (wa1.length == 1 && wa1[0] == '') || (wa2.length == 1 && wa2[0] == '')) return false;
     for (var i = 0; i < wa1.length; i++) {
         var w = wa1[i];
         w2 = w2.replace(w, '');
     }
     for (var i = 0; i < wa2.length; i++) {
         var w = wa2[i];
         w1 = w1.replace(w, '');
     }
     for (var i = 0; i < dupIndics.length; i++) {
         var w = dupIndics[i];
         w1 = w1.replace(w, '');
         w2 = w2.replace(w, '');
     }

     w2 = w2.replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '');
     w1 = w1.replace(/  +/g, ' ').replace(/^\s+|\s+$/g, '');

     if (w1.length == 0 || w2.length == 0) {
         //console.log('dups:' + s1 + ' | ' + s2);
         return true;
     }
     //console.log('no dups:' + s1 + ' | ' + s2);
     return false;
 }