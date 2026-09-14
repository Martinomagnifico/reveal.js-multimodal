 /*****************************************************************
 *
 * reveal.js-multimodal for Reveal.js 
 * Version 1.1.0
 * 
 * @link
 * https://github.com/martinomagnifico/reveal.js-multimodal
 * 
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/martinomagnifico
 *
 * @license 
 * MIT
 * 
 * Copyright (C) 2026 Martijn De Jongh (Martino)
 *
 ******************************************************************/


//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = /* @__PURE__ */ ((n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)))((/* @__PURE__ */ o(((e, t) => {
	var n = function(e) {
		return r(e) && !i(e);
	};
	function r(e) {
		return !!e && typeof e == "object";
	}
	function i(e) {
		var t = Object.prototype.toString.call(e);
		return t === "[object RegExp]" || t === "[object Date]" || o(e);
	}
	var a = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function o(e) {
		return e.$$typeof === a;
	}
	function s(e) {
		return Array.isArray(e) ? [] : {};
	}
	function c(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? h(s(e), e, t) : e;
	}
	function l(e, t, n) {
		return e.concat(t).map(function(e) {
			return c(e, n);
		});
	}
	function u(e, t) {
		if (!t.customMerge) return h;
		var n = t.customMerge(e);
		return typeof n == "function" ? n : h;
	}
	function d(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function f(e) {
		return Object.keys(e).concat(d(e));
	}
	function p(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function m(e, t) {
		return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function ee(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && f(e).forEach(function(t) {
			r[t] = c(e[t], n);
		}), f(t).forEach(function(i) {
			m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[i], t[i], n) : c(t[i], n));
		}), r;
	}
	function h(e, t, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject || n, r.cloneUnlessOtherwiseSpecified = c;
		var i = Array.isArray(t);
		return i === Array.isArray(e) ? i ? r.arrayMerge(e, t, r) : ee(e, t, r) : c(t, r);
	}
	h.all = function(e, t) {
		if (!Array.isArray(e)) throw Error("first argument should be an array");
		return e.reduce(function(e, n) {
			return h(e, n, t);
		}, {});
	}, t.exports = h;
})))(), 1), l = [
	".js",
	".min.js",
	".mjs"
], u = (() => {
	let e = import.meta;
	if (typeof e?.url == "string" && e.url !== "") return e.url;
	let t = typeof document < "u" ? document.currentScript : null;
	return t && "src" in t && t.src ? t.src : "";
})(), d = (e) => {
	let t = e.lastIndexOf("/");
	return t === -1 ? "" : e.slice(0, t + 1);
}, f = (e) => {
	let t = e.split(/[?#]/)[0];
	return t.slice(t.lastIndexOf("/") + 1);
}, p = (e, t) => l.some((n) => e === `${t}${n}`), m = [
	/\/@fs\//,
	/\/@id\//,
	/\/\.vite\/deps\//,
	/[?&][vt]=/
], ee = (e) => m.some((t) => t.test(e)), h = (e) => {
	if (typeof document < "u") {
		let t = l.map((t) => `script[src$="${e}${t}"]`).join(", "), n = document.querySelector(t)?.getAttribute("src");
		if (n) return { directory: d(n) };
	}
	return u && !ee(u) && p(f(u), e) ? { directory: d(u) } : { directory: null };
}, te = (e) => h(e).directory !== null, ne = /* @__PURE__ */ new Map(), re = (e = "") => {
	let t = ne.get(e);
	if (t) return t;
	let n = typeof window < "u", r = typeof document < "u", i = import.meta, a = !1;
	try {
		a = typeof module < "u" && !!module?.hot;
	} catch {}
	let o = !1;
	try {
		o = !!i?.hot;
	} catch {}
	let s = a || o, c = !1;
	try {
		c = i?.env?.DEV === !0;
	} catch {}
	let l = e !== "" && te(e), u = {
		hasResolvableSource: l,
		hasWindow: n,
		hasDocument: r,
		isBundled: !l,
		isDevelopment: s || c,
		hasHMR: s,
		isViteDev: c
	};
	return ne.set(e, u), u;
}, ie = class {
	defaultConfig;
	pluginInit;
	pluginId;
	mergedConfig = null;
	userConfigData = null;
	data = {};
	constructor(e, t, n) {
		typeof e == "string" ? (this.pluginId = e, this.pluginInit = t, this.defaultConfig = n || {}) : (this.pluginId = e.id, this.pluginInit = e.init, this.defaultConfig = e.defaultConfig || {});
	}
	initializeConfig(e) {
		let t = this.defaultConfig, n = e.getConfig()[this.pluginId] || {};
		this.userConfigData = n, this.mergedConfig = (0, c.default)(t, n, {
			arrayMerge: (e, t) => t,
			clone: !0
		});
	}
	getCurrentConfig() {
		if (!this.mergedConfig) throw Error("Plugin configuration has not been initialized");
		return this.mergedConfig;
	}
	getData() {
		return Object.keys(this.data).length > 0 ? this.data : void 0;
	}
	get userConfig() {
		return this.userConfigData || {};
	}
	getEnvironmentInfo = () => re(this.pluginId);
	init(e) {
		if (this.initializeConfig(e), this.pluginInit) return this.pluginInit(this, e, this.getCurrentConfig());
	}
	createInterface(e = {}) {
		return {
			id: this.pluginId,
			init: (e) => this.init(e),
			getConfig: () => this.getCurrentConfig(),
			getData: () => this.getData(),
			...e
		};
	}
}, ae = "data-css-id", oe = (e, t) => new Promise((n, r) => {
	let i = document.createElement("link");
	i.rel = "stylesheet", i.href = t, i.setAttribute(ae, e);
	let a = setTimeout(() => {
		i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Timeout loading CSS from: ${t}`));
	}, 5e3);
	i.onload = () => {
		clearTimeout(a), n();
	}, i.onerror = () => {
		clearTimeout(a), i.parentNode && i.parentNode.removeChild(i), r(/* @__PURE__ */ Error(`[${e}] Failed to load CSS from: ${t}`));
	}, document.head.appendChild(i);
}), se = (e) => document.querySelectorAll(`[${ae}="${e}"]`).length > 0, ce = 1e4, le = (e) => new Promise((t) => {
	if (g(e)) return t(!0);
	if (typeof MutationObserver > "u") return t(!1);
	let n = !1, r = (e) => {
		n || (n = !0, i.disconnect(), clearTimeout(o), window.removeEventListener("load", a), t(e));
	}, i = new MutationObserver(() => {
		g(e) && r(!0);
	});
	i.observe(document.documentElement, {
		childList: !0,
		subtree: !0,
		attributeFilter: ["href", "rel"]
	});
	let a = () => requestAnimationFrame(() => r(g(e)));
	document.readyState === "complete" ? a() : window.addEventListener("load", a, { once: !0 });
	let o = setTimeout(() => r(g(e)), ce);
}), g = (e) => {
	if (se(e)) return !0;
	try {
		return window.getComputedStyle(document.documentElement).getPropertyValue(`--cssimported-${e}`).trim() !== "";
	} catch {
		return !1;
	}
}, ue = ((e) => new Proxy(e, { get: (e, t) => {
	if (t in e) return e[t];
	let n = t.toString();
	if (typeof console[n] == "function") return (...t) => {
		e.debugLog(n, ...t);
	};
} }))(new class {
	debugMode = !1;
	label = "DEBUG";
	groupDepth = 0;
	initialize(e, t = "DEBUG") {
		this.debugMode = e, this.label = t;
	}
	group = (...e) => {
		this.debugLog("group", ...e), this.groupDepth++;
	};
	groupCollapsed = (...e) => {
		this.debugLog("groupCollapsed", ...e), this.groupDepth++;
	};
	groupEnd = () => {
		this.groupDepth > 0 && (this.groupDepth--, this.debugLog("groupEnd"));
	};
	error = (...e) => {
		let t = this.debugMode;
		this.debugMode = !0, this.formatAndLog(console.error, e), this.debugMode = t;
	};
	table = (e, t, n) => {
		if (this.debugMode) try {
			typeof e == "string" && t !== void 0 && typeof t != "string" ? (this.groupDepth === 0 ? console.log(`[${this.label}]: ${e}`) : console.log(e), n ? console.table(t, n) : console.table(t)) : (this.groupDepth === 0 && console.log(`[${this.label}]: Table data`), typeof t == "object" && Array.isArray(t) ? console.table(e, t) : console.table(e));
		} catch (t) {
			console.error(`[${this.label}]: Error showing table:`, t), console.log(`[${this.label}]: Raw data:`, e);
		}
	};
	formatAndLog = (e, t) => {
		if (this.debugMode) try {
			this.groupDepth > 0 ? e.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? e.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : e.call(console, `[${this.label}]:`, ...t);
		} catch (e) {
			console.error(`[${this.label}]: Error in logging:`, e), console.log(`[${this.label}]: Original log data:`, ...t);
		}
	};
	debugLog(e, ...t) {
		let n = console[e];
		if (!this.debugMode && e !== "error" || typeof n != "function") return;
		let r = n;
		if (e === "group" || e === "groupCollapsed") {
			t.length > 0 && typeof t[0] == "string" ? r.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : r.call(console, `[${this.label}]:`, ...t);
			return;
		}
		if (e === "groupEnd") {
			r.call(console);
			return;
		}
		if (e === "table") {
			t.length === 1 ? this.table(t[0]) : t.length === 2 ? (t[0], this.table(t[0], t[1])) : t.length >= 3 && this.table(t[0], t[1], t[2]);
			return;
		}
		this.groupDepth > 0 ? r.call(console, ...t) : t.length > 0 && typeof t[0] == "string" ? r.call(console, `[${this.label}]: ${t[0]}`, ...t.slice(1)) : r.call(console, `[${this.label}]:`, ...t);
	}
}()), de = /* @__PURE__ */ new Set(), fe = (e, t) => {
	let n = `${e}::${t}`;
	de.has(n) || (de.add(n), console.warn(`[${e}] ${t}`));
}, pe = (e) => [`dist/plugin/${e}/${e}.css`, `plugin/${e}/${e}.css`], me = (e) => typeof e == "string" && e.trim() !== "", he = async (e, t) => {
	let { cssautoload: n, csspath: r, debug: i = !1 } = t;
	if (n === !1 || r === !1) return i && console.log(`[${e}] CSS loading is switched off`), { status: "skipped" };
	if (me(r)) {
		let t = r.trim();
		try {
			return await oe(e, t), i && console.log(`[${e}] CSS loaded from: ${t}`), {
				status: "loaded",
				path: t
			};
		} catch {
			return console.warn(`[${e}] Could not load CSS from: ${t}`), {
				status: "failed",
				path: t
			};
		}
	}
	if (g(e)) return i && console.log(`[${e}] CSS is already imported, skipping`), { status: "present" };
	let { directory: a } = h(e);
	if (a !== null || n === !0) {
		let t = [...a === null ? [] : [`${a}${e}.css`], ...pe(e)].filter((e, t, n) => n.indexOf(e) === t);
		for (let n of t) try {
			return await oe(e, n), i && console.log(`[${e}] CSS loaded from: ${n}`), {
				status: "loaded",
				path: n
			};
		} catch {
			i && console.log(`[${e}] No CSS at: ${n}`);
		}
		return console.warn(`[${e}] Could not load CSS. Tried: ${t.join(", ")}. Import the stylesheet yourself, or set csspath to where it is.`), { status: "failed" };
	}
	return le(e).then((t) => {
		t || fe(e, `CSS could not be autoloaded here, because the plugin is part of a bundle. Import it once in your own code: import 'reveal.js-${e}/${e}.css'`);
	}), { status: "advised" };
};
async function ge(e, t) {
	if ("getEnvironmentInfo" in e && t) {
		let n = e, r = n.userConfig, i = "cssautoload" in r && r.cssautoload !== "auto" ? t.cssautoload : void 0;
		return he(n.pluginId, {
			...t,
			cssautoload: i
		});
	}
	let { id: n, cssautoload: r, csspath: i, debug: a } = e;
	return he(n, {
		cssautoload: r === "auto" ? void 0 : r,
		csspath: i,
		debug: a
	});
}
//#endregion
//#region src/plugin/js/config.ts
var _e = {
	background: {
		html: "var(--r-background-color)",
		iframe: "var(--r-background-color)",
		media: "white"
	},
	bordercolor: "white",
	borderwidth: "1px",
	closebuttonhtml: "",
	cssautoload: !0,
	csspath: "",
	debug: !1,
	htmlminwidth: "100px",
	htmlminheight: "100px",
	overlaycolor: "rgba(0, 0, 0, 0.30)",
	padding: {
		html: "1em",
		iframe: "0",
		media: "0"
	},
	radius: "0.5em",
	scalecorrection: !0,
	shadow: "0 0.5em 0.75em 0.5em rgba(0, 0, 0, 0.25)",
	slidemodalevent: "slidetransitionend",
	speed: 300,
	videoautoplay: !0,
	videocontrols: !0,
	videoautohide: !0,
	zoom: !0,
	zoomfrom: .9
}, _ = structuredClone(_e), ve = (e, t = 1) => {
	let n = 1 / t;
	return Math.round(e * n) / n;
}, v = (e, t, n) => {
	e.on(t, (e) => n(e));
}, ye = () => /receiver/i.test(window.location.search), be = /(?:^|\.)(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com)$/i, xe = (e) => {
	try {
		let t = new URL(e, window.location.href);
		return t.searchParams.has("autoplay") ? (be.test(t.hostname) ? (t.searchParams.set("mute", "1"), t.searchParams.set("muted", "1")) : t.searchParams.set("autoplay", "0"), t.toString()) : e;
	} catch {
		return e;
	}
};
//#endregion
//#region node_modules/marked/lib/marked.esm.js
function y() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var b = y();
function Se(e) {
	b = e;
}
var x = { exec: () => null };
function S(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function C(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(w.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var Ce = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), w = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: S((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: S((e) => RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),
	fencesBeginRegex: S((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: S((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: S((e) => RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`, "i")),
	blockquoteBeginRegex: S((e) => RegExp(`^ {0,${e}}>`))
}, we = /^(?:[ \t]*(?:\n|$))+/, Te = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Ee = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, T = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, De = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Oe = / {0,3}(?:[*+-]|\d{1,9}[.)])/, ke = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Ae = C(ke).replace(/bull/g, Oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), je = C(ke).replace(/bull/g, Oe).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Me = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Ne = /^[^\n]+/, Pe = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, Fe = C(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Pe).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Ie = C(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Oe).getRegex(), E = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Le = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Re = C("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Le).replace("tag", E).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ze = (e) => C(Me).replace("hr", T).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", e).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", E).getRegex(), Be = ze(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), Ve = ze(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), He = {
	blockquote: C(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ve).getRegex(),
	code: Te,
	def: Fe,
	fences: Ee,
	heading: De,
	hr: T,
	html: Re,
	lheading: Ae,
	list: Ie,
	newline: we,
	paragraph: Be,
	table: x,
	text: Ne
}, Ue = C("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", T).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", E).getRegex(), We = {
	...He,
	lheading: je,
	table: Ue,
	paragraph: C(Me).replace("hr", T).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Ue).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", E).getRegex()
}, Ge = {
	...He,
	html: C("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", Le).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: x,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: C(Me).replace("hr", T).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Ae).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ke = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, qe = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, Je = /^( {2,}|\\)\n(?!\s*$)/, Ye = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, D = /[\p{P}\p{S}]/u, O = /[\s\p{P}\p{S}]/u, k = /[^\s\p{P}\p{S}]/u, Xe = C(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, O).getRegex(), Ze = /[\p{Pi}\p{Ps}"']/u, Qe = /(?!~)[\p{P}\p{S}]/u, $e = /(?!~)[\s\p{P}\p{S}]/u, et = /(?:[^\s\p{P}\p{S}]|~)/u, tt = C(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Ce ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), nt = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, rt = C(nt, "u").replace(/punct/g, D).getRegex(), it = C(nt, "u").replace(/punct/g, Qe).getRegex(), at = C(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, "u").replace(/openQuote/g, Ze).replace(/punct/g, D).getRegex(), ot = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", st = C(ot, "gu").replace(/notPunctSpace/g, k).replace(/punctSpace/g, O).replace(/punct/g, D).getRegex(), ct = C(ot, "gu").replace(/notPunctSpace/g, et).replace(/punctSpace/g, $e).replace(/punct/g, Qe).getRegex(), lt = C("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, k).replace(/punctSpace/g, O).replace(/punct/g, D).getRegex(), ut = C("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, k).replace(/punctSpace/g, O).replace(/punct/g, D).getRegex(), dt = C("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, k).replace(/punctSpace/g, O).replace(/punct/g, D).getRegex(), ft = C(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, D).getRegex(), pt = C("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, k).replace(/punctSpace/g, O).replace(/punct/g, D).getRegex(), mt = C(/\\(punct)/, "gu").replace(/punct/g, D).getRegex(), ht = C(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), gt = C(Le).replace("(?:-->|$)", "-->").getRegex(), _t = C("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", gt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), A = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, vt = C(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", A).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), yt = C(/^!?\[(label)\]\[(ref)\]/).replace("label", A).replace("ref", Pe).getRegex(), bt = C(/^!?\[(ref)\](?:\[\])?/).replace("ref", Pe).getRegex(), xt = C("reflink|nolink(?!\\()", "g").replace("reflink", yt).replace("nolink", bt).getRegex(), St = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, j = {
	_backpedal: x,
	anyPunctuation: mt,
	autolink: ht,
	blockSkip: tt,
	br: Je,
	code: qe,
	del: x,
	delLDelim: x,
	delRDelim: x,
	emStrongLDelim: rt,
	emStrongRDelimAst: st,
	emStrongRDelimUnd: ut,
	escape: Ke,
	link: vt,
	nolink: bt,
	punctuation: Xe,
	reflink: yt,
	reflinkSearch: xt,
	tag: _t,
	text: Ye,
	url: x
}, Ct = {
	...j,
	emStrongLDelim: at,
	emStrongRDelimAst: lt,
	emStrongRDelimUnd: dt,
	link: C(/^!?\[(label)\]\((.*?)\)/).replace("label", A).getRegex(),
	reflink: C(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", A).getRegex()
}, M = {
	...j,
	emStrongRDelimAst: ct,
	emStrongLDelim: it,
	delLDelim: ft,
	delRDelim: pt,
	url: C(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", St).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: C(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", St).getRegex()
}, wt = {
	...M,
	br: C(Je).replace("{2,}", "*").getRegex(),
	text: C(M.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, N = {
	normal: He,
	gfm: We,
	pedantic: Ge
}, P = {
	normal: j,
	gfm: M,
	breaks: wt,
	pedantic: Ct
}, Tt = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, Et = (e) => Tt[e];
function F(e, t) {
	if (t) {
		if (w.escapeTest.test(e)) return e.replace(w.escapeReplace, Et);
	} else if (w.escapeTestNoEncode.test(e)) return e.replace(w.escapeReplaceNoEncode, Et);
	return e;
}
function Dt(e) {
	try {
		e = encodeURI(e).replace(w.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function Ot(e, t) {
	let n = e.replace(w.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(w.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) {
		if (n.length > t) n.splice(t);
		else for (; n.length < t;) n.push("");
	}
	for (; r < n.length; r++) n[r] = n[r].trim().replace(w.slashPipe, "|");
	return n;
}
function I(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function kt(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && w.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function At(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function jt(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function Mt(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1");
	r.state.inLink = !0;
	let c = {
		type: e[0].charAt(0) === "!" ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: r.inlineTokens(s)
	};
	return r.state.inLink = !1, c;
}
function Nt(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return r.length >= i.length ? e.slice(i.length) : e;
	}).join("\n");
}
var L = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || b;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : kt(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Nt(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = I(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: I(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: I(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = I(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o;
				for (o = 0; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = e.join("\n"), o = t.raw + "\n" + a.replace(this.rules.other.blockquoteSetextReplace2, ""), s = this.blockquote(o);
					i[i.length - 1] = s, n = `${n}
${a}`, r = r.substring(0, r.length - t.text.length) + s.text;
					break;
				}
				if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = jt(t[2].split("\n", 1)[0], t[1].length), l = e.split("\n", 1)[0], u = !c.trim(), d = 0;
				if (this.options.pedantic ? (d = 2, s = c.trimStart()) : u ? d = t[1].length + 1 : (d = c.search(this.rules.other.nonSpaceChar), d = d > 4 ? 1 : d, s = c.slice(d), d += t[1].length), u && this.rules.other.blankLine.test(l) && (r += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(d), n = this.rules.other.hrRegex(d), i = this.rules.other.fencesBeginRegex(d), a = this.rules.other.headingBeginRegex(d), o = this.rules.other.htmlBeginRegex(d), f = this.rules.other.blockquoteBeginRegex(d);
					for (; e;) {
						let p = e.split("\n", 1)[0], m;
						if (l = p, this.options.pedantic ? (l = l.replace(this.rules.other.listReplaceNesting, "  "), m = l) : m = l.replace(this.rules.other.tabCharGlobal, "    "), i.test(l) || a.test(l) || o.test(l) || f.test(l) || t.test(l) || n.test(l)) break;
						if (m.search(this.rules.other.nonSpaceChar) >= d || !l.trim()) s += "\n" + m.slice(d);
						else {
							if (u || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(c) || a.test(c) || n.test(c)) break;
							s += "\n" + l;
						}
						u = !l.trim(), r += p + "\n", e = e.substring(p.length + 1), c = m.slice(d);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0)), i.items.push({
					type: "list_item",
					raw: r,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(s),
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e of i.items) if (this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []), !i.loose) {
				let t = e.tokens.filter((e) => e.type === "space");
				i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
			}
			for (let e of i.items) {
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, i.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
			}
			if (i.loose) for (let e of i.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = kt(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: I(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = Ot(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: I(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(Ot(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: I(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
				if (!this.rules.other.endAngleBracket.test(e)) return;
				let t = I(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = At(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (n = this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n.slice(1) : n.slice(1, -1)), Mt(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return Mt(n, e, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let i = [...r[0]].length - 1, a, o, s = i, c = 0, l = r[0][0], u = n === l, d = l === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (d.lastIndex = 0, t = t.slice(-1 * e.length + i); (r = d.exec(t)) !== null;) {
				if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
				if (o = [...a].length, r[3] || r[4]) {
					s += o;
					continue;
				}
				if (r[5] || r[6]) {
					if (i % 3 && !((i + o) % 3)) {
						c += o;
						continue;
					}
					if (u) break;
				}
				if (s -= o, s > 0) continue;
				o = Math.min(o, o + s + c);
				let t = [...r[0]][0].length, n = e.slice(0, i + r.index + t + o);
				if (Math.min(i, o) % 2) {
					let e = n.slice(1, -1);
					return {
						type: "em",
						raw: n,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = n.slice(2, -2);
				return {
					type: "strong",
					raw: n,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: e
			};
		}
	}
}, R = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || b, this.options.tokenizer = this.options.tokenizer || new L(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		let t = {
			other: w,
			block: N.normal,
			inline: P.normal
		};
		this.options.pedantic ? (t.block = N.pedantic, t.inline = P.pedantic) : this.options.gfm && (t.block = N.gfm, t.inline = this.options.breaks ? P.breaks : P.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: N,
			inline: P
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(w.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(w.tabCharGlobal, "    ").replace(w.spaceLine, ""));
		let r = 1 / 0;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (i = this.tokenizer.fences(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.heading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.hr(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.blockquote(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.list(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.html(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if (i = this.tokenizer.table(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.lheading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
				continue;
			}
			if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links) {
			let e = Object.keys(this.tokens.links);
			e.length > 0 && (n = n.replace(this.tokenizer.rules.inline.reflinkSearch, (t) => e.includes(t.slice(t.lastIndexOf("[") + 1, -1)) ? "[" + "a".repeat(t.length - 2) + "]" : t));
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuation, (e) => "+".repeat(e.length)), n = n.replace(this.tokenizer.rules.inline.blockSkip, (e, t, n) => {
			let r = n ? n.length : 0;
			return e.slice(0, r) + "[" + "a".repeat(e.length - r - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let r = !1, i = "", a = 1 / 0;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((n) => (o = n.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
			if (o = this.tokenizer.escape(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.tag(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.link(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let n = t.at(-1);
				o.type === "text" && n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (o = this.tokenizer.emStrong(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.codespan(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.br(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.del(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.autolink(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (!this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = 1 / 0, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, z = class {
	options;
	parser;
	constructor(e) {
		this.options = e || b;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(w.notSpaceStart)?.[0], i = e.replace(w.endingNewline, "") + "\n";
		return r ? "<pre><code class=\"language-" + F(r) + "\">" + (n ? i : F(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : F(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${F(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, tokens: n }) {
		let r = this.parser.parseInline(n), i = Dt(e);
		if (i === null) return r;
		e = i;
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + F(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = Dt(e);
		if (i === null) return F(n);
		e = i;
		let a = `<img src="${e}" alt="${F(n)}"`;
		return t && (a += ` title="${F(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : F(e.text);
	}
}, Pt = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, B = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || b, this.options.renderer = this.options.renderer || new z(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Pt();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"checkbox",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"checkbox",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, V = class {
	options;
	block;
	constructor(e) {
		this.options = e || b;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? R.lex : R.lexInline;
	}
	provideParser(e = this.block) {
		return e ? B.parse : B.parseInline;
	}
}, H = new class {
	defaults = y();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = B;
	Renderer = z;
	TextRenderer = Pt;
	Lexer = R;
	Tokenizer = L;
	Hooks = V;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(1 / 0);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new z(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new L(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new V();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					t[r] = V.passThroughHooks.has(n) ? (e) => {
						if (this.defaults.async && V.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return R.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return B.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? R.lex : R.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? B.parse : B.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? R.lex : R.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? B.parse : B.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + F(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function U(e, t) {
	return H.parse(e, t);
}
U.options = U.setOptions = function(e) {
	return H.setOptions(e), U.defaults = H.defaults, Se(U.defaults), U;
}, U.getDefaults = y, U.defaults = b;
function Ft(...e) {
	return H.use(...e), U.defaults = H.defaults, Se(U.defaults), U;
}
U.use = Ft, U.walkTokens = function(e, t) {
	return H.walkTokens(e, t);
}, U.parseInline = H.parseInline, U.Parser = B, U.parser = B.parse, U.Renderer = z, U.TextRenderer = Pt, U.Lexer = R, U.lexer = R.lex, U.Tokenizer = L, U.Hooks = V, U.parse = U, U.options, U.setOptions, U.walkTokens, U.parseInline, B.parse, R.lex;
//#endregion
//#region src/plugin/js/functions/loadhtml.ts
async function It(e, t) {
	try {
		if (typeof e != "string") throw Error("Invalid HTML content source. Must be a URL string or an anchor element.");
		if (e.startsWith("#")) {
			let n = document.querySelector(e);
			if (!n) throw Error("Anchor element with specified ID not found.");
			return t.modalElement.dataset.modalType = "html", n.firstElementChild?.tagName.toLowerCase() === "section" ? n.firstElementChild.innerHTML : n.innerHTML;
		}
		if (e.endsWith(".md")) {
			let n = await fetch(e);
			if (!n.ok) throw Error("Failed to fetch MD content.");
			let r = await n.text();
			return t.modalElement.dataset.modalType = "html", await U.parse(r);
		}
		if (e.endsWith(".html")) {
			let n = await fetch(e);
			if (!n.ok) throw Error("Failed to fetch HTML content.");
			let r = await n.text();
			return t.modalElement.dataset.modalType = "html", r;
		}
		throw Error("Unsupported HTML content source.");
	} catch (e) {
		console.error("Error loading HTML content:", e);
		return;
	}
}
//#endregion
//#region src/plugin/js/functions/loadimage.ts
async function Lt(e, t, n) {
	if (!e) {
		console.error("No URL provided for image modal");
		return;
	}
	return new Promise((r) => {
		let i = new Image(), a = n ? ` alt="${n}"` : "";
		i.onload = () => {
			t.modalElement.dataset.modalType = "image", r(`<img class="mm-body" src="${e}"${a}>`);
		}, i.onerror = () => {
			console.error(`Error loading image: ${e}`), r(void 0);
		}, i.src = e;
	});
}
//#endregion
//#region src/plugin/js/functions/loadvideo.ts
async function Rt(e, t, n) {
	if (!e) {
		console.error("No URL provided for video modal");
		return;
	}
	try {
		let r = document.createElement("video");
		if (r.src = e, r.controls = n.videocontrols, r.preload = "metadata", await new Promise((e, t) => {
			r.addEventListener("loadedmetadata", e), r.addEventListener("error", t);
		}), r.readyState < 0) throw Error("Video metadata cannot be loaded.");
		return r.preload = "auto", t.modalElement.dataset.modalType = "video", r.classList.add("mm-body"), r.outerHTML;
	} catch (e) {
		console.error("Error loading video:", e);
		return;
	}
}
//#endregion
//#region src/plugin/js/functions/load-modal-content.ts
async function W(e, t, n, r) {
	let i = r || n, a = e.dataset.modalType, o = e.dataset.modalUrl || e.getAttribute("href") || null, s = "";
	if (typeof n.padding == "string" ? s = n.padding : n.padding && typeof n.padding != "object" && (s = String(n.padding)), e.dataset.modalOverlaycolor && e.dataset.modalOverlaycolor !== n.overlaycolor && t.modalElement.style.setProperty("--mm-overlaycolor", e.dataset.modalOverlaycolor), t.setTriggerClasses(e.dataset.modalClass?.split(/[ ,]+/) ?? []), a === "html") {
		let r = "";
		typeof n.padding == "object" && n.padding.html && (r = String(n.padding.html)), s = e.dataset.modalPadding || r || s;
		let a = "";
		i.padding && typeof i.padding == "object" && i.padding.html ? a = String(i.padding.html) : typeof i.padding == "string" ? a = i.padding : i.padding && (a = String(i.padding)), s !== a && t.modalElement.style.setProperty("--mm-modal-padding", s);
		let o = "";
		typeof n.background == "object" && n.background.html && (o = String(n.background.html));
		let c = e.dataset.modalBackground || o || (typeof n.background == "string" ? n.background : ""), l = "";
		i.background && typeof i.background == "object" && i.background.html ? l = String(i.background.html) : typeof i.background == "string" ? l = i.background : i.background && (l = String(i.background)), c !== l && t.modalElement.style.setProperty("--mm-modal-background", String(c));
	} else if (a === "iframe") {
		let r = "";
		typeof n.padding == "object" && n.padding.iframe && (r = String(n.padding.iframe)), s = e.dataset.modalPadding || r || s, s !== "0" && t.modalElement.style.setProperty("--mm-modal-padding", s);
		let a = "";
		typeof n.background == "object" && n.background.iframe && (a = String(n.background.iframe));
		let o = e.dataset.modalBgcolor || a || (typeof n.background == "string" ? n.background : ""), c = "";
		i.background && typeof i.background == "object" && i.background.iframe ? c = String(i.background.iframe) : typeof i.background == "string" ? c = i.background : i.background && (c = String(i.background)), o !== c && t.modalElement.style.setProperty("--mm-modal-background", String(o));
	} else {
		let r = "";
		typeof n.padding == "object" && n.padding.media && (r = String(n.padding.media)), s = e.dataset.modalPadding || r || s, s !== "0" && t.modalElement.style.setProperty("--mm-modal-padding", s);
		let a = "";
		typeof n.background == "object" && n.background.media && (a = String(n.background.media));
		let o = e.dataset.modalBackground || a || (typeof n.background == "string" ? n.background : ""), c = "";
		i.background && typeof i.background == "object" && i.background.media ? c = String(i.background.media) : typeof i.background == "string" ? c = i.background : i.background && (c = String(i.background)), o !== c && t.modalElement.style.setProperty("--mm-modal-background", String(o));
	}
	t.triggerElement = e;
	let c, l = !1;
	if (!a) {
		console.error("Modal type not specified");
		return;
	}
	if (a === "video") c = await Rt(o, t, n);
	else if (a === "image") {
		let n = e.firstChild, r = n?.tagName === "IMG";
		c = await Lt(o && o !== "#" && o !== "#/" ? o : r ? n.getAttribute("src") : null, t, r ? n.getAttribute("alt") : null);
	} else if (a === "html") c = await It(o, t);
	else if (a === "iframe") o ? (c = `<iframe class="mm-body" src="${ye() ? xe(o) : o}" frameborder="0" allowfullscreen></iframe>`, t.modalElement.dataset.modalType = "iframe") : (console.error("No URL provided for iframe modal"), l = !0);
	else {
		console.error("Unknown modal type");
		return;
	}
	l || !c || (t.setContent(c, a), t.show());
}
//#endregion
//#region node_modules/body-scroll-lock-upgrade/lib/index.esm.js
var zt = !1;
if (typeof window < "u") {
	let e = { get passive() {
		zt = !0;
	} };
	window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
}
var G = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1), K = [], q = /* @__PURE__ */ new Map(), Bt = !1, Vt = -1, J, Ht, Y, X, Ut = (e) => K.some((t) => !!(t.options.allowTouchMove && t.options.allowTouchMove(e))), Wt = (e) => {
	let t = e || window.event;
	return Ut(t.target) || t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}, Gt = (e) => {
	if (X === void 0) {
		let t = !!e && e.reserveScrollBarGap === !0, n = window.innerWidth - document.documentElement.getBoundingClientRect().width;
		if (t && n > 0) {
			let e = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
			X = document.body.style.paddingRight, document.body.style.paddingRight = `${e + n}px`;
		}
	}
	J === void 0 && (J = document.body.style.overflow, document.body.style.overflow = "hidden");
}, Kt = () => {
	X !== void 0 && (document.body.style.paddingRight = X, X = void 0), J !== void 0 && (document.body.style.overflow = J, J = void 0);
}, qt = () => window.requestAnimationFrame(() => {
	let e = document.documentElement, t = document.body;
	if (Y === void 0) {
		Ht = { ...e.style }, Y = { ...t.style };
		let { scrollY: n, scrollX: r, innerHeight: i } = window;
		e.style.height = "100%", e.style.overflow = "hidden", t.style.position = "fixed", t.style.top = `${-n}px`, t.style.left = `${-r}px`, t.style.width = "100%", t.style.height = "auto", t.style.overflow = "hidden", setTimeout(() => window.requestAnimationFrame(() => {
			let e = i - window.innerHeight;
			e && n >= i && (t.style.top = -(n + e) + "px");
		}), 300);
	}
}), Jt = () => {
	if (Y !== void 0) {
		let e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10), n = document.documentElement, r = document.body;
		n.style.height = Ht?.height || "", n.style.overflow = Ht?.overflow || "", r.style.position = Y.position || "", r.style.top = Y.top || "", r.style.left = Y.left || "", r.style.width = Y.width || "", r.style.height = Y.height || "", r.style.overflow = Y.overflow || "", window.scrollTo(t, e), Y = void 0;
	}
}, Yt = (e) => e ? e.scrollHeight - e.scrollTop <= e.clientHeight : !1, Xt = (e, t) => {
	let n = e.targetTouches[0].clientY - Vt;
	return Ut(e.target) ? !1 : t && t.scrollTop === 0 && n > 0 || Yt(t) && n < 0 ? Wt(e) : (e.stopPropagation(), !0);
}, Zt = (e, t) => {
	if (!e) {
		console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");
		return;
	}
	if (q.set(e, q?.get(e) ? q?.get(e) + 1 : 1), K.some((t) => t.targetElement === e)) return;
	let n = {
		targetElement: e,
		options: t || {}
	};
	K = [...K, n], G ? qt() : Gt(t), G && (e.ontouchstart = (e) => {
		e.targetTouches.length === 1 && (Vt = e.targetTouches[0].clientY);
	}, e.ontouchmove = (t) => {
		t.targetTouches.length === 1 && Xt(t, e);
	}, Bt ||= (document.addEventListener("touchmove", Wt, zt ? { passive: !1 } : void 0), !0));
}, Qt = (e) => {
	if (!e) {
		console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");
		return;
	}
	q.set(e, q?.get(e) ? q?.get(e) - 1 : 0), q?.get(e) === 0 && (K = K.filter((t) => t.targetElement !== e), q?.delete(e)), G && (e.ontouchstart = null, e.ontouchmove = null, Bt && K.length === 0 && (document.removeEventListener("touchmove", Wt, zt ? { passive: !1 } : void 0), Bt = !1)), K.length === 0 && (G ? Jt() : Kt());
}, $t = (e, t) => {
	t.presetConfigs = {
		keyboard: e.getConfig().keyboard,
		mouseWheel: e.getConfig().mouseWheel,
		scrollProgress: e.getConfig().scrollProgress
	};
}, en = (e) => {
	let t = e.getRevealElement();
	return t ? !!t.closest(".reveal-scroll") : !1;
}, tn = (e, t) => {
	if (t.modalElement.dataset.modalType === "video") {
		let n = t.modalDialog.querySelector("video");
		n && e.configure({ keyboard: {
			27: () => {
				t.hide();
			},
			32: () => {
				n.paused ? n.play() : n.pause();
			}
		} });
	} else e.configure({ keyboard: {
		27: () => {
			t.hide();
		},
		32: () => {
			t.hide();
		}
	} });
}, nn = (e, t) => {
	t.modalElement && Zt(t.modalElement), en(e) || e.configure({
		keyboard: !1,
		mouseWheel: !1,
		scrollProgress: !1
	}), t.isLocked = !0;
}, rn = (e, t) => {
	t.modalElement && Qt(t.modalElement), en(e) || e.configure({
		keyboard: t.presetConfigs.keyboard,
		mouseWheel: t.presetConfigs.mouseWheel,
		scrollProgress: t.presetConfigs.scrollProgress
	}), t.isLocked = !1;
};
//#endregion
//#region src/plugin/js/functions/preload.ts
function an(e) {
	let t = e.querySelectorAll("[data-modal-type]");
	for (let e of t) {
		if (e.dataset.modalType !== "image") continue;
		let t = e.dataset.modalUrl || e.getAttribute("href") || null;
		if (!t) {
			let n = e.firstElementChild;
			t = n instanceof HTMLImageElement ? n.getAttribute("src") : null;
		}
		if (t) {
			let e = new Image();
			e.src = t;
		}
	}
}
//#endregion
//#region src/plugin/js/functions/scrollsync.ts
var on = class {
	send;
	scroller;
	applying = !1;
	queued = !1;
	lastPosition = -1;
	constructor(e) {
		this.send = e;
	}
	attach(e) {
		this.detach(), this.scroller = e, e.addEventListener("scroll", this.onScroll, { passive: !0 });
	}
	detach() {
		this.scroller?.removeEventListener("scroll", this.onScroll), this.scroller = void 0, this.applying = !1, this.lastPosition = -1;
	}
	apply(e) {
		let t = this.distance();
		t === void 0 || !this.scroller || (this.applying = !0, this.lastPosition = e, this.scroller.scrollTop = e * t, requestAnimationFrame(() => {
			this.applying = !1;
		}));
	}
	distance() {
		if (!this.scroller) return;
		let e = this.scroller.scrollHeight - this.scroller.clientHeight;
		return e > 0 ? e : void 0;
	}
	onScroll = () => {
		this.applying || this.queued || (this.queued = !0, requestAnimationFrame(() => {
			this.queued = !1;
			let e = this.distance();
			if (e === void 0 || !this.scroller) return;
			let t = this.scroller.scrollTop / e;
			Math.abs(t - this.lastPosition) < .001 || (this.lastPosition = t, this.send(t));
		}));
	};
}, sn = (e, t, n, r, i) => {
	let a = t.offsetWidth, o = t.offsetHeight, s = (1 - e) * a / n, c = (1 - e) * o / n;
	if (r.modalElement.style.setProperty("--mm-maxwidth", `${Math.floor(s)}px`), r.modalElement.style.setProperty("--mm-maxheight", `${Math.floor(c)}px`), !i.scalecorrection) return;
	let l = Math.max(1, 1 / n);
	r.modalElement.style.setProperty("--mm-inversescale", String(ve(l, .01)));
	let u = i.borderwidth.match(/(\d*\.?\d+)\s*(\w+)/);
	if (u !== null) {
		let e = Number.parseFloat(u[1]), t = u[2], n = ve(e * l, .5) + t;
		r.modalElement.style.setProperty("--mm-borderwidth", n);
	}
};
//#endregion
//#region src/plugin/js/functions/setupoptions.ts
function cn(e, t, n) {
	t.overlaycolor === n.overlaycolor ? e.modalElement.style.removeProperty("--mm-overlaycolor") : e.modalElement.style.setProperty("--mm-overlaycolor", t.overlaycolor);
}
async function ln(e, t, n) {
	if (t.closebuttonhtml !== "" && (e.closeButtonHtml = t.closebuttonhtml), cn(e, t, n), t.speed !== n.speed) {
		let n = t.speed ? t.speed / 1e3 : 0;
		e.modalElement.style.setProperty("--mm-transspeed", `${n}s`);
	}
	if (t.htmlminwidth !== n.htmlminwidth) {
		let n = Number.isNaN(Number(t.htmlminwidth)) ? String(t.htmlminwidth) : `${t.htmlminwidth}px`;
		e.modalElement.style.setProperty("--mm-minwidth", n);
	}
	if (t.htmlminheight !== n.htmlminheight) {
		let n = Number.isNaN(Number(t.htmlminheight)) ? String(t.htmlminheight) : `${t.htmlminheight}px`;
		e.modalElement.style.setProperty("--mm-minheight", n);
	}
	t.radius !== n.radius && e.modalElement.style.setProperty("--mm-outerradius", t.radius), t.bordercolor !== n.bordercolor && e.modalElement.style.setProperty("--mm-bordercolor", t.bordercolor), t.borderwidth !== n.borderwidth && e.modalElement.style.setProperty("--mm-borderwidth", t.borderwidth), t.shadow !== n.shadow && e.modalElement.style.setProperty("--mm-shadow", t.shadow), t.zoom ? t.zoomfrom !== n.zoomfrom && e.modalElement.style.setProperty("--mm-initialscale", String(t.zoomfrom)) : e.modalElement.style.setProperty("--mm-initialscale", "1");
}
//#endregion
//#region src/plugin/js/functions/speakersync.ts
var Z = "multimodal", un = (e) => e.dataset.modalUrl || e.getAttribute("href") || null, dn = () => {
	try {
		return window.parent === window.self ? void 0 : window.parent.opener ?? void 0;
	} catch {
		return;
	}
}, fn = class e {
	revealEl;
	handlers;
	isPreview;
	mainWindow;
	peers = /* @__PURE__ */ new Set();
	lastState = "";
	openMessage;
	static create(t, n, r) {
		let i = t.isSpeakerNotes();
		if (!(i && t.getConfig().postMessageEvents !== !0)) return new e(t, n, r, i);
	}
	constructor(e, t, n, r) {
		this.revealEl = t, this.handlers = n, this.isPreview = r, this.mainWindow = r ? dn() : void 0, window.addEventListener("message", this.onMessage), r && e.on("ready", () => {
			this.mainWindow && this.post(this.mainWindow, {
				namespace: Z,
				type: "hello"
			});
		});
	}
	sendOpen(e) {
		if (!e) return;
		let t = this.describe(e);
		t && (this.openMessage = t, this.broadcast(t));
	}
	sendClose() {
		this.openMessage = void 0, this.broadcast({
			namespace: Z,
			type: "close"
		});
	}
	sendScroll(e) {
		for (let t of this.targets()) this.post(t, {
			namespace: Z,
			type: "scroll",
			at: e
		});
	}
	triggers() {
		return Array.from(this.revealEl.querySelectorAll("[data-modal-type]"));
	}
	describe(e) {
		let t = e.dataset.modalType;
		if (!t) return;
		let n = this.triggers().indexOf(e);
		if (n !== -1) return {
			namespace: Z,
			type: "open",
			index: n,
			modalType: t,
			url: un(e)
		};
	}
	resolve(e) {
		let t = this.triggers(), n = (t) => t.dataset.modalType === e.modalType && un(t) === e.url, r = t[e.index];
		return r && n(r) ? r : t.find(n);
	}
	targets() {
		if (this.isPreview) return this.mainWindow ? [this.mainWindow] : [];
		for (let e of this.peers) e.closed && this.peers.delete(e);
		return Array.from(this.peers);
	}
	post(e, t) {
		try {
			e.postMessage(JSON.stringify(t), "*");
		} catch {}
	}
	broadcast(e) {
		let t = JSON.stringify(e);
		if (t !== this.lastState) {
			this.lastState = t;
			for (let t of this.targets()) this.post(t, e);
		}
	}
	onMessage = (e) => {
		if (e.origin !== window.location.origin || typeof e.data != "string") return;
		let t;
		try {
			t = JSON.parse(e.data);
		} catch {
			return;
		}
		if (!t || t.namespace !== Z) return;
		if (t.type === "hello") {
			let t = e.source;
			if (this.isPreview || !t) return;
			this.peers.add(t), this.openMessage && this.post(t, this.openMessage);
			return;
		}
		if (t.type === "scroll") {
			this.handlers.scroll(t.at);
			return;
		}
		let n = JSON.stringify(t);
		if (n === this.lastState) return;
		if (this.lastState = n, t.type === "close") {
			this.openMessage = void 0, this.handlers.close();
			return;
		}
		let r = this.resolve(t);
		r && (this.openMessage = t, this.handlers.open(r));
	};
}, pn = "\n	<div class=\"multimodal\" id=\"multimodal\" aria-hidden=\"true\">\n		<div class=\"mm-max\">\n			<div class=\"mm-dialog\">\n				<button class=\"mm-close\" type=\"button\" aria-hidden=\"true\" data-modal-close=\"true\" aria-label=\"Close\"><svg class=\"offset\" viewport=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(45 12 12)\"><line x1=\"0\" y1=\"12\" x2=\"24\" y2=\"12\"></line><line x1=\"12\" y1=\"0\" x2=\"12\" y2=\"24\"></line></g></svg></button>\n				<div class=\"mm-body\"></div>\n			</div>\n		</div>\n	</div>\n";
function mn(e) {
	let t = e.getSlidesElement();
	if (!t) throw Error("Slides element not found");
	t.insertAdjacentHTML("afterend", pn);
}
//#endregion
//#region src/plugin/js/modal.ts
var hn = "multimodal", gn = "mm-max", _n = "mm-dialog", vn = "mm-body", Q = "shown", $ = "show", yn = "multimodal:show", bn = "multimodal:shown", xn = "multimodal:hide", Sn = "multimodal:hidden", Cn = "<button class=\"mm-close\" type=\"button\" aria-hidden=\"true\" data-modal-close aria-label=\"Close\"><svg class=\"offset\" viewport=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(45 12 12)\"><line x1=\"0\" y1=\"12\" x2=\"24\" y2=\"12\"></line><line x1=\"12\" y1=\"0\" x2=\"12\" y2=\"24\"></line></g></svg></button>", wn = class e {
	_isOpen;
	modalElement;
	modalMax;
	modalDialog;
	modalBody;
	closeButtonHtml;
	triggerElement;
	presetConfigs;
	closeOnClickOutside;
	isLocked;
	eventListeners;
	triggerClasses;
	get isOpen() {
		return this._isOpen;
	}
	static create(t) {
		let n = t.getRevealElement();
		if (!n) throw Error("Reveal element not found");
		return n.querySelector(`.${hn}`) || mn(t), new e(t);
	}
	constructor(e) {
		this._isOpen = !1;
		let t = e.getRevealElement();
		if (!t) throw Error("Reveal element not found");
		let n = t.querySelector(`.${hn}`);
		if (!n) throw Error(`Modal element with class ${hn} not found`);
		this.modalElement = n, this.modalMax = this.modalElement.querySelector(`.${gn}`), this.modalDialog = this.modalElement.querySelector(`.${_n}`), this.modalBody = this.modalElement.querySelector(`.${vn}`), this.modalElement.style.setProperty("display", "none"), this.modalElement.setAttribute("aria-hidden", "true"), this.eventListeners = {}, this.triggerClasses = [], this.presetConfigs = {
			keyboard: !0,
			mouseWheel: !1,
			scrollProgress: "auto"
		}, this.closeButtonHtml = Cn, this.modalElement.addEventListener("transitionend", (e) => {
			e.target === this.modalElement && (this._isOpen ? (this.modalElement.classList.add(Q), this.trigger(bn, "shown")) : (this.modalElement.classList.remove(Q), this.modalElement.classList.remove($), this.modalElement.style.setProperty("display", "none"), this.trigger(Sn, "hidden"), this.setTriggerClasses([])));
		});
	}
	on(e, t) {
		this.eventListeners[e] || (this.eventListeners[e] = []), this.eventListeners[e].push(t);
	}
	trigger(e, t = "show", ...n) {
		let r = this.eventListeners[e];
		if (r) for (let e of r) e(t, ...n);
		let i = {
			action: t,
			trigger: this.triggerElement,
			modal: this.modalElement,
			dialog: this.modalDialog,
			body: this.modalDialog.querySelector(`.${vn}`),
			args: n
		};
		this.modalElement.dispatchEvent(new CustomEvent(e, { detail: i }));
	}
	show() {
		this._isOpen = !0, this.modalElement.style.removeProperty("display"), this.modalElement.removeAttribute("aria-hidden"), window.getComputedStyle(this.modalElement).getPropertyValue("transition-duration") === "0s" ? (this.modalElement.classList.add($), this.trigger(yn, "show"), this.modalElement.classList.add(Q), this.trigger(bn, "shown")) : setTimeout(() => {
			this.modalElement.classList.add($), this.trigger(yn, "show");
		}, 10);
	}
	hide() {
		this._isOpen = !1, this.trigger(xn, "hide"), this.modalElement.setAttribute("aria-hidden", "true"), window.getComputedStyle(this.modalElement).getPropertyValue("transition-duration") === "0s" ? (this.modalElement.classList.remove(Q), this.modalElement.classList.remove($), this.modalElement.style.setProperty("display", "none"), this.trigger(Sn, "hide"), this.setTriggerClasses([])) : this.modalElement.classList.remove($);
	}
	setTriggerClasses(e) {
		for (let e of this.triggerClasses) this.modalElement.classList.remove(e);
		this.triggerClasses = [];
		for (let t of e) !t || this.modalElement.classList.contains(t) || (this.modalElement.classList.add(t), this.triggerClasses.push(t));
	}
	setContent(e, t) {
		let n = t === "html" ? `<div class="mm-body"><div class="mm-scrollbody">${e}</div></div>` : e;
		this.modalDialog.innerHTML = this.closeButtonHtml + n;
	}
}, Tn = "data-modal-type", En = "data-modal-close", Dn = ".reveal .slides, .scroll-page-content:has(section.present) { box-shadow: inset 0 0 0 1px orange} .mm-max { box-shadow: inset 0 0 0 1px red}", On = class e {
	deck;
	options;
	modal;
	revealEl;
	revealMargin;
	sync;
	scrollFollower;
	constructor(e, t, n, r) {
		this.deck = e, this.options = t, this.modal = n, this.revealEl = r, this.revealMargin = e.getConfig().margin ?? 0;
	}
	static async create(t, n) {
		let r = t.getRevealElement();
		if (!r) throw Error("Reveal element not found");
		let i = wn.create(t), a = new e(t, n, i, r);
		if ($t(t, i), await ln(i, n, _), a.setupEventHandlers(), n.debug) {
			let e = document.createElement("style");
			e.innerHTML = Dn, document.head.appendChild(e);
		}
		return a;
	}
	escapePressed = (e) => {
		e.key === "Escape" && this.modal.isOpen && this.modal.hide();
	};
	handleModalTrigger = async (e) => {
		e.preventDefault();
		let t = e.currentTarget, n = t.getAttribute("href");
		(n === "#" || n === "#/") && e.stopPropagation(), await W(t, this.modal, this.options, _);
	};
	modalEventFor(e) {
		if (e.dataset.modalType) return e.dataset.modalEvent ? e.dataset.modalEvent : this.options.slidemodalevent;
	}
	setupEventHandlers() {
		if (this.sync = fn.create(this.deck, this.revealEl, {
			open: (e) => {
				this.modal.isOpen && this.modal.triggerElement === e || W(e, this.modal, this.options, _);
			},
			close: () => {
				this.modal.isOpen && this.modal.hide();
			},
			scroll: (e) => {
				this.scrollFollower?.apply(e);
			}
		}), this.sync) {
			let e = this.sync;
			this.scrollFollower = new on((t) => e.sendScroll(t));
		}
		for (let e of this.revealEl.querySelectorAll(`[${Tn}]:not(section)`)) e.addEventListener("click", this.handleModalTrigger);
		let e = new MutationObserver((e) => {
			for (let t of e) if (t.type === "childList") for (let e of Array.from(t.addedNodes)) e instanceof HTMLElement && e.hasAttribute(Tn) && e.tagName.toLowerCase() !== "section" && e.addEventListener("click", this.handleModalTrigger);
		});
		if (this.deck.addEventListener("click", (e) => {
			let t = e.target;
			(t.closest(`[${En}]`) || t.closest("a[href=\"#multimodal\"]")) && (e.preventDefault(), e.stopPropagation(), this.modal.hide());
		}), v(this.deck, "slidechanged", (e) => {
			this.modal.isOpen && this.modal.hide(), an(e.currentSlide), en(this.deck) ? e.currentSlide.dataset.modalType && this.options.slidemodalevent === "slidetransitionend" && setTimeout(() => {
				this.deck.getCurrentSlide() === e.currentSlide && W(e.currentSlide, this.modal, this.options, _);
			}, 10) : this.modalEventFor(e.currentSlide) === "slidechanged" && W(e.currentSlide, this.modal, this.options, _);
		}), v(this.deck, "slidetransitionend", (e) => {
			this.modalEventFor(e.currentSlide) === "slidetransitionend" && W(e.currentSlide, this.modal, this.options, _);
		}), v(this.deck, "ready", (t) => {
			sn(this.revealMargin, this.revealEl, this.deck.getScale(), this.modal, this.options);
			let n = this.modalEventFor(t.currentSlide);
			(n === "slidetransitionend" || n === "slidechanged") && W(t.currentSlide, this.modal, this.options, _), e.observe(this.revealEl, {
				childList: !0,
				subtree: !0
			});
		}), v(this.deck, "resize", (e) => {
			sn(this.revealMargin, this.revealEl, e.scale, this.modal, this.options);
		}), this.modal.on("multimodal:show", () => {
			this.revealEl.classList.add("multimodal-open"), this.sync?.sendOpen(this.modal.triggerElement), document.addEventListener("keydown", this.escapePressed), this.modal.modalElement.closest(".reveal-scroll") || tn(this.deck, this.modal);
			let e = (e) => {
				this.modal.isLocked || (e.target === this.modal.modalElement || e.target === this.modal.modalMax) && this.modal.hide();
			};
			this.modal.modalElement.addEventListener("click", e), this.modal.closeOnClickOutside = e;
		}), this.modal.on("multimodal:shown", () => {
			if (this.modal.triggerElement?.dataset.modalNavblock === "true" && nn(this.deck, this.modal), this.modal.modalElement.dataset.modalType === "html") {
				let e = this.modal.modalDialog.querySelector(".mm-body");
				e && this.scrollFollower?.attach(e);
			}
			let e = this.modal.modalDialog.querySelector("video");
			e && (ye() && (e.muted = !0), this.options.videoautoplay && e.play(), this.options.videoautohide && e.addEventListener("ended", () => {
				this.modal.hide();
			}), e.addEventListener("webkitendfullscreen", () => {
				this.options.debug && console.log("Exited fullscreen"), this.modal.hide();
			}));
		}), this.modal.on("multimodal:hide", () => {
			this.revealEl.classList.remove("multimodal-open"), this.sync?.sendClose(), this.modal.closeOnClickOutside && (this.modal.modalElement.removeEventListener("click", this.modal.closeOnClickOutside), this.modal.closeOnClickOutside = void 0), this.scrollFollower?.detach(), rn(this.deck, this.modal), document.removeEventListener("keydown", this.escapePressed);
			let e = this.modal.modalDialog.querySelector("video");
			e && e.pause();
		}), this.modal.on("multimodal:hidden", () => {
			this.modal.modalBody.innerHTML = "";
			let e = this.modal.modalDialog.querySelector("iframe");
			e && (e.src = ""), this.modal.modalElement.style.removeProperty("--mm-modal-background"), this.modal.modalElement.style.removeProperty("--mm-modal-padding"), cn(this.modal, this.options, _);
		}), this.options.debug) for (let e of [
			"multimodal:show",
			"multimodal:shown",
			"multimodal:hide",
			"multimodal:hidden"
		]) this.deck.on(e, () => {
			console.log(`Modal ${e.split(":")[1]}`);
		});
	}
}, kn = "multimodal", An = async (e, t, n) => {
	ue && n.debug && ue.initialize(!0, kn);
	let r = document.querySelector("meta[name=generator]");
	r instanceof HTMLMetaElement && r.content.includes("quarto") || await ge(e, n), await On.create(t, n);
}, jn = () => new ie(kn, An, _e).createInterface();
//#endregion
export { jn as default };
