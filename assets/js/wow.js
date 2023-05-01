(function() {
    var t, e, n, i, o, r = function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    }, s = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++)
            if (e in this && this[e] === t)
                return e;
        return -1
    }
    ;
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var n, i;
            for (n in e)
                i = e[n],
                null == t[n] && (t[n] = i);
            return t
        }
        ,
        t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }
        ,
        t.prototype.createEvent = function(t, e, n, i) {
            var o;
            return null == e && (e = !1),
            null == n && (n = !1),
            null == i && (i = null),
            null != document.createEvent ? (o = document.createEvent("CustomEvent")).initCustomEvent(t, e, n, i) : null != document.createEventObject ? (o = document.createEventObject()).eventType = t : o.eventName = t,
            o
        }
        ,
        t.prototype.emitEvent = function(t, e) {
            return null != t.dispatchEvent ? t.dispatchEvent(e) : e in (null != t) ? t[e]() : "on" + e in (null != t) ? t["on" + e]() : void 0
        }
        ,
        t.prototype.addEvent = function(t, e, n) {
            return null != t.addEventListener ? t.addEventListener(e, n, !1) : null != t.attachEvent ? t.attachEvent("on" + e, n) : t[e] = n
        }
        ,
        t.prototype.removeEvent = function(t, e, n) {
            return null != t.removeEventListener ? t.removeEventListener(e, n, !1) : null != t.detachEvent ? t.detachEvent("on" + e, n) : delete t[e]
        }
        ,
        t.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }
        ,
        t
    }(),
    n = this.WeakMap || this.MozWeakMap || (n = function() {
        function t() {
            this.keys = [],
            this.values = []
        }
        return t.prototype.get = function(t) {
            var e, n, i, o;
            for (e = n = 0,
            i = (o = this.keys).length; n < i; e = ++n)
                if (o[e] === t)
                    return this.values[e]
        }
        ,
        t.prototype.set = function(t, e) {
            var n, i, o, r;
            for (n = i = 0,
            o = (r = this.keys).length; i < o; n = ++i)
                if (r[n] === t)
                    return void (this.values[n] = e);
            return this.keys.push(t),
            this.values.push(e)
        }
        ,
        t
    }()),
    t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported = !0,
        t.prototype.observe = function() {}
        ,
        t
    }()),
    i = this.getComputedStyle || function(t, e) {
        return this.getPropertyValue = function(e) {
            var n;
            return "float" === e && (e = "styleFloat"),
            o.test(e) && e.replace(o, function(t, e) {
                return e.toUpperCase()
            }),
            (null != (n = t.currentStyle) ? n[e] : void 0) || null
        }
        ,
        this
    }
    ,
    o = /(\-([a-z]){1})/g,
    this.WOW = function() {
        function o(t) {
            null == t && (t = {}),
            this.scrollCallback = r(this.scrollCallback, this),
            this.scrollHandler = r(this.scrollHandler, this),
            this.resetAnimation = r(this.resetAnimation, this),
            this.start = r(this.start, this),
            this.scrolled = !0,
            this.config = this.util().extend(t, this.defaults),
            this.animationNameCache = new n,
            this.wowEvent = this.util().createEvent(this.config.boxClass)
        }
        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        },
        o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement,
            "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start),
            this.finished = []
        }
        ,
        o.prototype.start = function() {
            var e, n, i, o, r;
            if (this.stopped = !1,
            this.boxes = function() {
                var t, n, i, o;
                for (o = [],
                t = 0,
                n = (i = this.element.querySelectorAll("." + this.config.boxClass)).length; t < n; t++)
                    e = i[t],
                    o.push(e);
                return o
            }
            .call(this),
            this.all = function() {
                var t, n, i, o;
                for (o = [],
                t = 0,
                n = (i = this.boxes).length; t < n; t++)
                    e = i[t],
                    o.push(e);
                return o
            }
            .call(this),
            this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (n = 0,
                    i = (o = this.boxes).length; n < i; n++)
                        e = o[n],
                        this.applyStyle(e, !0);
            if (this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler),
            this.util().addEvent(window, "resize", this.scrollHandler),
            this.interval = setInterval(this.scrollCallback, 50)),
            this.config.live)
                return new t((r = this,
                function(t) {
                    var e, n, i, o, s;
                    for (s = [],
                    e = 0,
                    n = t.length; e < n; e++)
                        o = t[e],
                        s.push(function() {
                            var t, e, n, r;
                            for (r = [],
                            t = 0,
                            e = (n = o.addedNodes || []).length; t < e; t++)
                                i = n[t],
                                r.push(this.doSync(i));
                            return r
                        }
                        .call(r));
                    return s
                }
                )).observe(document.body, {
                    childList: !0,
                    subtree: !0
                })
        }
        ,
        o.prototype.stop = function() {
            if (this.stopped = !0,
            this.util().removeEvent(window, "scroll", this.scrollHandler),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval)
                return clearInterval(this.interval)
        }
        ,
        o.prototype.sync = function(e) {
            if (t.notSupported)
                return this.doSync(this.element)
        }
        ,
        o.prototype.doSync = function(t) {
            var e, n, i, o, r;
            if (null == t && (t = this.element),
            1 === t.nodeType) {
                for (r = [],
                n = 0,
                i = (o = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; n < i; n++)
                    e = o[n],
                    s.call(this.all, e) < 0 ? (this.boxes.push(e),
                    this.all.push(e),
                    this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0),
                    r.push(this.scrolled = !0)) : r.push(void 0);
                return r
            }
        }
        ,
        o.prototype.show = function(t) {
            return this.applyStyle(t),
            t.className = t.className + " " + this.config.animateClass,
            null != this.config.callback && this.config.callback(t),
            this.util().emitEvent(t, this.wowEvent),
            this.util().addEvent(t, "animationend", this.resetAnimation),
            this.util().addEvent(t, "oanimationend", this.resetAnimation),
            this.util().addEvent(t, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(t, "MSAnimationEnd", this.resetAnimation),
            t
        }
        ,
        o.prototype.applyStyle = function(t, e) {
            var n, i, o, r;
            return i = t.getAttribute("data-wow-duration"),
            n = t.getAttribute("data-wow-delay"),
            o = t.getAttribute("data-wow-iteration"),
            this.animate((r = this,
            function() {
                return r.customStyle(t, e, i, n, o)
            }
            ))
        }
        ,
        o.prototype.animate = "requestAnimationFrame"in window ? function(t) {
            return window.requestAnimationFrame(t)
        }
        : function(t) {
            return t()
        }
        ,
        o.prototype.resetStyle = function() {
            var t, e, n, i, o;
            for (o = [],
            e = 0,
            n = (i = this.boxes).length; e < n; e++)
                t = i[e],
                o.push(t.style.visibility = "visible");
            return o
        }
        ,
        o.prototype.resetAnimation = function(t) {
            var e;
            if (t.type.toLowerCase().indexOf("animationend") >= 0)
                return (e = t.target || t.srcElement).className = e.className.replace(this.config.animateClass, "").trim()
        }
        ,
        o.prototype.customStyle = function(t, e, n, i, o) {
            return e && this.cacheAnimationName(t),
            t.style.visibility = e ? "hidden" : "visible",
            n && this.vendorSet(t.style, {
                animationDuration: n
            }),
            i && this.vendorSet(t.style, {
                animationDelay: i
            }),
            o && this.vendorSet(t.style, {
                animationIterationCount: o
            }),
            this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }),
            t
        }
        ,
        o.prototype.vendors = ["moz", "webkit"],
        o.prototype.vendorSet = function(t, e) {
            var n, i, o, r;
            for (n in i = [],
            e)
                o = e[n],
                t["" + n] = o,
                i.push(function() {
                    var e, i, s, l;
                    for (l = [],
                    e = 0,
                    i = (s = this.vendors).length; e < i; e++)
                        r = s[e],
                        l.push(t["" + r + n.charAt(0).toUpperCase() + n.substr(1)] = o);
                    return l
                }
                .call(this));
            return i
        }
        ,
        o.prototype.vendorCSS = function(t, e) {
            var n, o, r, s, l, a;
            for (s = (l = i(t)).getPropertyCSSValue(e),
            n = 0,
            o = (r = this.vendors).length; n < o; n++)
                a = r[n],
                s = s || l.getPropertyCSSValue("-" + a + "-" + e);
            return s
        }
        ,
        o.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (n) {
                e = i(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }
        ,
        o.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }
        ,
        o.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }
        ,
        o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }
        ,
        o.prototype.scrollCallback = function() {
            var t;
            if (this.scrolled && (this.scrolled = !1,
            this.boxes = function() {
                var e, n, i, o;
                for (o = [],
                e = 0,
                n = (i = this.boxes).length; e < n; e++)
                    (t = i[e]) && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }
            .call(this),
            !this.boxes.length && !this.config.live))
                return this.stop()
        }
        ,
        o.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop; )
                t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent; )
                e += t.offsetTop;
            return e
        }
        ,
        o.prototype.isVisible = function(t) {
            var e, n, i, o, r;
            return n = t.getAttribute("data-wow-offset") || this.config.offset,
            o = (r = window.pageYOffset) + Math.min(this.element.clientHeight, this.util().innerHeight()) - n,
            e = (i = this.offsetTop(t)) + t.clientHeight,
            i <= o && e >= r
        }
        ,
        o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }
        ,
        o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }
        ,
        o
    }()
}
).call(this);
