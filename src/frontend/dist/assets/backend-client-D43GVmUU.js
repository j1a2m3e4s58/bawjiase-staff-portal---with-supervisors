import { r as reactExports, j as jsxRuntimeExports, o as React, e as clsx, c as cn, u as useAuth, R as React$1, p as ReactDOM } from "./index-CQG1vcXg.js";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
function ThemeToggle({ className }) {
  const { themeMode, toggleTheme } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      "aria-label": `Switch to ${themeMode === "dark" ? "light" : "dark"} mode`,
      className: `transition-smooth ${className ?? ""}`,
      "data-ocid": "theme_toggle.button",
      onClick: toggleTheme,
      children: themeMode === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-5 w-5 text-foreground/70" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-5 w-5 text-foreground/70" })
    }
  );
}
var M$1 = (e, i, s, u, m, a, l, h) => {
  let d = document.documentElement, w = ["light", "dark"];
  function p(n) {
    (Array.isArray(e) ? e : [e]).forEach((y) => {
      let k = y === "class", S = k && a ? m.map((f) => a[f] || f) : m;
      k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
    }), R(n);
  }
  function R(n) {
    h && w.includes(n) && (d.style.colorScheme = n);
  }
  function c() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (u) p(u);
  else try {
    let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
    p(y);
  } catch (n) {
  }
};
var x = reactExports.createContext(void 0), U = { setTheme: (e) => {
}, themes: [] }, z = () => {
  var e;
  return (e = reactExports.useContext(x)) != null ? e : U;
};
reactExports.memo(({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w }) => {
  let p = JSON.stringify([s, i, a, e, h, l, u, m]).slice(1, -1);
  return reactExports.createElement("script", { ...w, suppressHydrationWarning: true, nonce: typeof window == "undefined" ? d : "", dangerouslySetInnerHTML: { __html: `(${M$1.toString()})(${p})` } });
});
var jt = (n) => {
  switch (n) {
    case "success":
      return ee;
    case "info":
      return ae;
    case "warning":
      return oe;
    case "error":
      return se;
    default:
      return null;
  }
}, te = Array(12).fill(0), Yt = ({ visible: n, className: e }) => React$1.createElement("div", { className: ["sonner-loading-wrapper", e].filter(Boolean).join(" "), "data-visible": n }, React$1.createElement("div", { className: "sonner-spinner" }, te.map((t, a) => React$1.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` })))), ee = React$1.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React$1.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), oe = React$1.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, React$1.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), ae = React$1.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React$1.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), se = React$1.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, React$1.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Ot = React$1.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, React$1.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), React$1.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Ft = () => {
  let [n, e] = React$1.useState(document.hidden);
  return React$1.useEffect(() => {
    let t = () => {
      e(document.hidden);
    };
    return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
  }, []), n;
};
var bt = 1, yt = class {
  constructor() {
    this.subscribe = (e) => (this.subscribers.push(e), () => {
      let t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    });
    this.publish = (e) => {
      this.subscribers.forEach((t) => t(e));
    };
    this.addToast = (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    };
    this.create = (e) => {
      var S;
      let { message: t, ...a } = e, u = typeof (e == null ? void 0 : e.id) == "number" || ((S = e.id) == null ? void 0 : S.length) > 0 ? e.id : bt++, f = this.toasts.find((g) => g.id === u), w = e.dismissible === void 0 ? true : e.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...e, id: u, title: t }), { ...g, ...e, id: u, dismissible: w, title: t }) : g) : this.addToast({ title: t, ...a, dismissible: w, id: u }), u;
    };
    this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t) => {
      this.subscribers.forEach((a) => a({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: e, dismiss: true })), e);
    this.message = (e, t) => this.create({ ...t, message: e });
    this.error = (e, t) => this.create({ ...t, message: e, type: "error" });
    this.success = (e, t) => this.create({ ...t, type: "success", message: e });
    this.info = (e, t) => this.create({ ...t, type: "info", message: e });
    this.warning = (e, t) => this.create({ ...t, type: "warning", message: e });
    this.loading = (e, t) => this.create({ ...t, type: "loading", message: e });
    this.promise = (e, t) => {
      if (!t) return;
      let a;
      t.loading !== void 0 && (a = this.create({ ...t, promise: e, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let u = e instanceof Promise ? e : e(), f = a !== void 0, w, S = u.then(async (i) => {
        if (w = ["resolve", i], React$1.isValidElement(i)) f = false, this.create({ id: a, type: "default", message: i });
        else if (ie(i) && !i.ok) {
          f = false;
          let T = typeof t.error == "function" ? await t.error(`HTTP error! status: ${i.status}`) : t.error, F = typeof t.description == "function" ? await t.description(`HTTP error! status: ${i.status}`) : t.description;
          this.create({ id: a, type: "error", message: T, description: F });
        } else if (t.success !== void 0) {
          f = false;
          let T = typeof t.success == "function" ? await t.success(i) : t.success, F = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "success", message: T, description: F });
        }
      }).catch(async (i) => {
        if (w = ["reject", i], t.error !== void 0) {
          f = false;
          let D = typeof t.error == "function" ? await t.error(i) : t.error, T = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "error", message: D, description: T });
        }
      }).finally(() => {
        var i;
        f && (this.dismiss(a), a = void 0), (i = t.finally) == null || i.call(t);
      }), g = () => new Promise((i, D) => S.then(() => w[0] === "reject" ? D(w[1]) : i(w[1])).catch(D));
      return typeof a != "string" && typeof a != "number" ? { unwrap: g } : Object.assign(a, { unwrap: g });
    };
    this.custom = (e, t) => {
      let a = (t == null ? void 0 : t.id) || bt++;
      return this.create({ jsx: e(a), id: a, ...t }), a;
    };
    this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}, v = new yt(), ne = (n, e) => {
  let t = (e == null ? void 0 : e.id) || bt++;
  return v.addToast({ title: n, ...e, id: t }), t;
}, ie = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", le = ne, ce = () => v.toasts, de = () => v.getActiveToasts(), ue = Object.assign(le, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: ce, getToasts: de });
function wt(n, { insertAt: e } = {}) {
  if (typeof document == "undefined") return;
  let t = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
  a.type = "text/css", e === "top" && t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
}
wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function tt(n) {
  return n.label !== void 0;
}
var pe = 3, me = "32px", ge = "16px", Wt = 4e3, he = 356, be = 14, ye = 20, we = 200;
function M(...n) {
  return n.filter(Boolean).join(" ");
}
function xe(n) {
  let [e, t] = n.split("-"), a = [];
  return e && a.push(e), t && a.push(t), a;
}
var ve = (n) => {
  var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
  let { invert: e, toast: t, unstyled: a, interacting: u, setHeights: f, visibleToasts: w, heights: S, index: g, toasts: i, expanded: D, removeToast: T, defaultRichColors: F, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l, className: ot = "", descriptionClassName: at = "", duration: X, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n, [Y, C] = React$1.useState(null), [lt, J] = React$1.useState(null), [W, H] = React$1.useState(false), [A, mt] = React$1.useState(false), [L, z2] = React$1.useState(false), [ct, d] = React$1.useState(false), [h, y] = React$1.useState(false), [R, j] = React$1.useState(0), [p, _] = React$1.useState(0), O = React$1.useRef(t.duration || X || Wt), G = React$1.useRef(null), k = React$1.useRef(null), Vt = g === 0, Ut = g + 1 <= w, N = t.type, V = t.dismissible !== false, Kt = t.className || "", Xt = t.descriptionClassName || "", dt = React$1.useMemo(() => S.findIndex((r) => r.toastId === t.id) || 0, [S, t.id]), Jt = React$1.useMemo(() => {
    var r;
    return (r = t.closeButton) != null ? r : et;
  }, [t.closeButton, et]), Tt = React$1.useMemo(() => t.duration || X || Wt, [t.duration, X]), gt = React$1.useRef(0), U2 = React$1.useRef(0), St = React$1.useRef(0), K = React$1.useRef(null), [Gt, Qt] = st.split("-"), Rt = React$1.useMemo(() => S.reduce((r, m, c) => c >= dt ? r : r + m.height, 0), [S, dt]), Et = Ft(), qt = t.invert || e, ht = N === "loading";
  U2.current = React$1.useMemo(() => dt * pt + Rt, [dt, Rt]), React$1.useEffect(() => {
    O.current = Tt;
  }, [Tt]), React$1.useEffect(() => {
    H(true);
  }, []), React$1.useEffect(() => {
    let r = k.current;
    if (r) {
      let m = r.getBoundingClientRect().height;
      return _(m), f((c) => [{ toastId: t.id, height: m, position: t.position }, ...c]), () => f((c) => c.filter((b) => b.toastId !== t.id));
    }
  }, [f, t.id]), React$1.useLayoutEffect(() => {
    if (!W) return;
    let r = k.current, m = r.style.height;
    r.style.height = "auto";
    let c = r.getBoundingClientRect().height;
    r.style.height = m, _(c), f((b) => b.find((x2) => x2.toastId === t.id) ? b.map((x2) => x2.toastId === t.id ? { ...x2, height: c } : x2) : [{ toastId: t.id, height: c, position: t.position }, ...b]);
  }, [W, t.title, t.description, f, t.id]);
  let $ = React$1.useCallback(() => {
    mt(true), j(U2.current), f((r) => r.filter((m) => m.toastId !== t.id)), setTimeout(() => {
      T(t);
    }, we);
  }, [t, T, f, U2]);
  React$1.useEffect(() => {
    if (t.promise && N === "loading" || t.duration === 1 / 0 || t.type === "loading") return;
    let r;
    return D || u || it && Et ? (() => {
      if (St.current < gt.current) {
        let b = (/* @__PURE__ */ new Date()).getTime() - gt.current;
        O.current = O.current - b;
      }
      St.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      O.current !== 1 / 0 && (gt.current = (/* @__PURE__ */ new Date()).getTime(), r = setTimeout(() => {
        var b;
        (b = t.onAutoClose) == null || b.call(t, t), $();
      }, O.current));
    })(), () => clearTimeout(r);
  }, [D, u, t, N, it, Et, $]), React$1.useEffect(() => {
    t.delete && $();
  }, [$, t.delete]);
  function Zt() {
    var r, m, c;
    return P != null && P.loading ? React$1.createElement("div", { className: M(s == null ? void 0 : s.loader, (r = t == null ? void 0 : t.classNames) == null ? void 0 : r.loader, "sonner-loader"), "data-visible": N === "loading" }, P.loading) : rt ? React$1.createElement("div", { className: M(s == null ? void 0 : s.loader, (m = t == null ? void 0 : t.classNames) == null ? void 0 : m.loader, "sonner-loader"), "data-visible": N === "loading" }, rt) : React$1.createElement(Yt, { className: M(s == null ? void 0 : s.loader, (c = t == null ? void 0 : t.classNames) == null ? void 0 : c.loader), visible: N === "loading" });
  }
  return React$1.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s == null ? void 0 : s.toast, (Dt = t == null ? void 0 : t.classNames) == null ? void 0 : Dt.toast, s == null ? void 0 : s.default, s == null ? void 0 : s[N], (Pt = t == null ? void 0 : t.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t.richColors) != null ? Nt : F, "data-styled": !(t.jsx || t.unstyled || a), "data-mounted": W, "data-promise": !!t.promise, "data-swiped": h, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g, "data-front": Vt, "data-swiping": L, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g, "--toasts-before": g, "--z-index": i.length - g, "--offset": `${A ? R : U2.current}px`, "--initial-height": B ? "auto" : `${p}px`, ...ut, ...t.style }, onDragEnd: () => {
    z2(false), C(null), K.current = null;
  }, onPointerDown: (r) => {
    ht || !V || (G.current = /* @__PURE__ */ new Date(), j(U2.current), r.target.setPointerCapture(r.pointerId), r.target.tagName !== "BUTTON" && (z2(true), K.current = { x: r.clientX, y: r.clientY }));
  }, onPointerUp: () => {
    var x2, Q, q, Z;
    if (ct || !V) return;
    K.current = null;
    let r = Number(((x2 = k.current) == null ? void 0 : x2.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m = Number(((Q = k.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c = (/* @__PURE__ */ new Date()).getTime() - ((q = G.current) == null ? void 0 : q.getTime()), b = Y === "x" ? r : m, I = Math.abs(b) / c;
    if (Math.abs(b) >= ye || I > 0.11) {
      j(U2.current), (Z = t.onDismiss) == null || Z.call(t, t), J(Y === "x" ? r > 0 ? "right" : "left" : m > 0 ? "down" : "up"), $(), d(true), y(false);
      return;
    }
    z2(false), C(null);
  }, onPointerMove: (r) => {
    var Q, q, Z, zt;
    if (!K.current || !V || ((Q = window.getSelection()) == null ? void 0 : Q.toString().length) > 0) return;
    let c = r.clientY - K.current.y, b = r.clientX - K.current.x, I = (q = n.swipeDirections) != null ? q : xe(st);
    !Y && (Math.abs(b) > 1 || Math.abs(c) > 1) && C(Math.abs(b) > Math.abs(c) ? "x" : "y");
    let x2 = { x: 0, y: 0 };
    Y === "y" ? (I.includes("top") || I.includes("bottom")) && (I.includes("top") && c < 0 || I.includes("bottom") && c > 0) && (x2.y = c) : Y === "x" && (I.includes("left") || I.includes("right")) && (I.includes("left") && b < 0 || I.includes("right") && b > 0) && (x2.x = b), (Math.abs(x2.x) > 0 || Math.abs(x2.y) > 0) && y(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x2.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x2.y}px`);
  } }, Jt && !t.jsx ? React$1.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V ? () => {
  } : () => {
    var r;
    $(), (r = t.onDismiss) == null || r.call(t, t);
  }, className: M(s == null ? void 0 : s.closeButton, (Bt = t == null ? void 0 : t.classNames) == null ? void 0 : Bt.closeButton) }, (Ct = P == null ? void 0 : P.close) != null ? Ct : Ot) : null, t.jsx || reactExports.isValidElement(t.title) ? t.jsx ? t.jsx : typeof t.title == "function" ? t.title() : t.title : React$1.createElement(React$1.Fragment, null, N || t.icon || t.promise ? React$1.createElement("div", { "data-icon": "", className: M(s == null ? void 0 : s.icon, (kt = t == null ? void 0 : t.classNames) == null ? void 0 : kt.icon) }, t.promise || t.type === "loading" && !t.icon ? t.icon || Zt() : null, t.type !== "loading" ? t.icon || (P == null ? void 0 : P[N]) || jt(N) : null) : null, React$1.createElement("div", { "data-content": "", className: M(s == null ? void 0 : s.content, (It = t == null ? void 0 : t.classNames) == null ? void 0 : It.content) }, React$1.createElement("div", { "data-title": "", className: M(s == null ? void 0 : s.title, (Mt = t == null ? void 0 : t.classNames) == null ? void 0 : Mt.title) }, typeof t.title == "function" ? t.title() : t.title), t.description ? React$1.createElement("div", { "data-description": "", className: M(at, Xt, s == null ? void 0 : s.description, (Ht = t == null ? void 0 : t.classNames) == null ? void 0 : Ht.description) }, typeof t.description == "function" ? t.description() : t.description) : null), reactExports.isValidElement(t.cancel) ? t.cancel : t.cancel && tt(t.cancel) ? React$1.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || ft, onClick: (r) => {
    var m, c;
    tt(t.cancel) && V && ((c = (m = t.cancel).onClick) == null || c.call(m, r), $());
  }, className: M(s == null ? void 0 : s.cancelButton, (At = t == null ? void 0 : t.classNames) == null ? void 0 : At.cancelButton) }, t.cancel.label) : null, reactExports.isValidElement(t.action) ? t.action : t.action && tt(t.action) ? React$1.createElement("button", { "data-button": true, "data-action": true, style: t.actionButtonStyle || l, onClick: (r) => {
    var m, c;
    tt(t.action) && ((c = (m = t.action).onClick) == null || c.call(m, r), !r.defaultPrevented && $());
  }, className: M(s == null ? void 0 : s.actionButton, (Lt = t == null ? void 0 : t.classNames) == null ? void 0 : Lt.actionButton) }, t.action.label) : null));
};
function _t() {
  if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
  let n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function Te(n, e) {
  let t = {};
  return [n, e].forEach((a, u) => {
    let f = u === 1, w = f ? "--mobile-offset" : "--offset", S = f ? ge : me;
    function g(i) {
      ["top", "right", "bottom", "left"].forEach((D) => {
        t[`${w}-${D}`] = typeof i == "number" ? `${i}px` : i;
      });
    }
    typeof a == "number" || typeof a == "string" ? g(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((i) => {
      a[i] === void 0 ? t[`${w}-${i}`] = S : t[`${w}-${i}`] = typeof a[i] == "number" ? `${a[i]}px` : a[i];
    }) : g(S);
  }), t;
}
var $e = reactExports.forwardRef(function(e, t) {
  let { invert: a, position: u = "bottom-right", hotkey: f = ["altKey", "KeyT"], expand: w, closeButton: S, className: g, offset: i, mobileOffset: D, theme: T = "light", richColors: F, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l, dir: ot = _t(), gap: at = be, loadingIcon: X, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e, [B, s] = React$1.useState([]), P = React$1.useMemo(() => Array.from(new Set([u].concat(B.filter((d) => d.position).map((d) => d.position)))), [B, u]), [nt, it] = React$1.useState([]), [Y, C] = React$1.useState(false), [lt, J] = React$1.useState(false), [W, H] = React$1.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = React$1.useRef(null), mt = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = React$1.useRef(null), z2 = React$1.useRef(false), ct = React$1.useCallback((d) => {
    s((h) => {
      var y;
      return (y = h.find((R) => R.id === d.id)) != null && y.delete || v.dismiss(d.id), h.filter(({ id: R }) => R !== d.id);
    });
  }, []);
  return React$1.useEffect(() => v.subscribe((d) => {
    if (d.dismiss) {
      s((h) => h.map((y) => y.id === d.id ? { ...y, delete: true } : y));
      return;
    }
    setTimeout(() => {
      ReactDOM.flushSync(() => {
        s((h) => {
          let y = h.findIndex((R) => R.id === d.id);
          return y !== -1 ? [...h.slice(0, y), { ...h[y], ...d }, ...h.slice(y + 1)] : [d, ...h];
        });
      });
    });
  }), []), React$1.useEffect(() => {
    if (T !== "system") {
      H(T);
      return;
    }
    if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window == "undefined") return;
    let d = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d.addEventListener("change", ({ matches: h }) => {
        H(h ? "dark" : "light");
      });
    } catch (h) {
      d.addListener(({ matches: y }) => {
        try {
          H(y ? "dark" : "light");
        } catch (R) {
          console.error(R);
        }
      });
    }
  }, [T]), React$1.useEffect(() => {
    B.length <= 1 && C(false);
  }, [B]), React$1.useEffect(() => {
    let d = (h) => {
      var R, j;
      f.every((p) => h[p] || h.code === p) && (C(true), (R = A.current) == null || R.focus()), h.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [f]), React$1.useEffect(() => {
    if (A.current) return () => {
      L.current && (L.current.focus({ preventScroll: true }), L.current = null, z2.current = false);
    };
  }, [A.current]), React$1.createElement("section", { ref: t, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d, h) => {
    var j;
    let [y, R] = d.split("-");
    return B.length ? React$1.createElement("ol", { key: d, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y, "data-lifted": Y && B.length > 1 && !w, "data-x-position": R, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i, D) }, onBlur: (p) => {
      z2.current && !p.currentTarget.contains(p.relatedTarget) && (z2.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || z2.current || (z2.current = true, L.current = p.relatedTarget);
    }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
      lt || C(false);
    }, onDragEnd: () => C(false), onPointerDown: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || J(true);
    }, onPointerUp: () => J(false) }, B.filter((p) => !p.position && h === 0 || p.position === d).map((p, _) => {
      var O, G;
      return React$1.createElement(ve, { key: p.id, icons: st, index: _, toast: p, defaultRichColors: F, duration: (O = l == null ? void 0 : l.duration) != null ? O : et, className: l == null ? void 0 : l.className, descriptionClassName: l == null ? void 0 : l.descriptionClassName, invert: a, visibleToasts: ft, closeButton: (G = l == null ? void 0 : l.closeButton) != null ? G : S, interacting: lt, position: d, style: l == null ? void 0 : l.style, unstyled: l == null ? void 0 : l.unstyled, classNames: l == null ? void 0 : l.classNames, cancelButtonStyle: l == null ? void 0 : l.cancelButtonStyle, actionButtonStyle: l == null ? void 0 : l.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p.position), heights: nt.filter((k) => k.position == p.position), setHeights: it, expandByDefault: w, gap: at, loadingIcon: X, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e.swipeDirections });
    })) : null;
  }));
});
const Toaster = ({ ...props }) => {
  const { theme = "system" } = z();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function ok(value) {
  return { ok: value };
}
function err(message) {
  return { err: message };
}
let _mockUsers = [
  {
    id: "mock-user-1",
    fullname: "Sarah Mensah",
    phone: "0244123456",
    email: "sarah.mensah@bawjiasearearuralbank.com",
    role: "SuperAdmin",
    position: "Branch Manager",
    department: "HEAD OFFICE",
    branch: "HEAD OFFICE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now()),
    registrationTime: BigInt(Date.now() - 864e5),
    isArchived: false
  },
  {
    id: "mock-user-2",
    fullname: "Emmanuel Asante",
    phone: "0201987654",
    email: "e.asante@bawjiasearearuralbank.com",
    role: "HRAdmin",
    position: "HR Officer",
    department: "HR",
    branch: "BAWJIASE",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now() - 36e5),
    registrationTime: BigInt(Date.now() - 1728e5),
    isArchived: false
  },
  {
    id: "mock-user-3",
    fullname: "Abena Ofori",
    phone: "0557234789",
    email: "a.ofori@bawjiasearearuralbank.com",
    role: "GeneralStaff",
    position: "Teller",
    department: "BANKING OPERATIONS",
    branch: "ADEISO",
    imageFile: null,
    isActive: true,
    isVerified: true,
    lastSeen: BigInt(Date.now() - 72e5),
    registrationTime: BigInt(Date.now() - 2592e5),
    isArchived: false
  }
];
let _pendingVerification = {};
async function apiRegister(req) {
  await delay(600);
  const existing = _mockUsers.find((u) => u.email === req.email);
  if (existing) return err("Email already registered");
  const newUser = {
    id: `user-${Date.now()}`,
    fullname: req.fullname,
    phone: req.phone,
    email: req.email,
    role: req.role,
    position: req.position,
    department: req.department,
    branch: req.branch,
    imageFile: null,
    isActive: true,
    isVerified: false,
    lastSeen: BigInt(Date.now()),
    registrationTime: BigInt(Date.now()),
    isArchived: false
  };
  _pendingVerification[req.email] = newUser;
  return ok(newUser);
}
async function apiVerifyEmail(email, _code) {
  await delay(400);
  const user = _pendingVerification[email];
  if (!user) return err("No pending verification for this email");
  user.isVerified = true;
  _mockUsers.push(user);
  delete _pendingVerification[email];
  return ok(null);
}
async function apiResendCode(email) {
  await delay(300);
  if (!_pendingVerification[email]) return err("Email not found");
  return ok(null);
}
async function apiLogin(email, _passwordHash) {
  await delay(700);
  const user = _mockUsers.find(
    (u) => u.email === email && !u.isArchived && u.isActive
  );
  if (!user) return err("Invalid email or password");
  if (!user.isVerified) return err("Email not verified");
  user.lastSeen = BigInt(Date.now());
  return ok(user);
}
async function apiLogout() {
  await delay(200);
}
async function apiRequestPasswordReset(email) {
  await delay(500);
  const user = _mockUsers.find((u) => u.email === email);
  if (!user) return err("Email not found");
  return ok("Password reset link sent to your email");
}
async function apiConfirmPasswordReset(_token, _newPasswordHash) {
  await delay(500);
  return ok(null);
}
async function apiGetMyProfile(userId) {
  await delay(300);
  return _mockUsers.find((u) => u.id === userId) ?? null;
}
async function apiUpdateMyProfile(userId, req) {
  await delay(400);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("User not found");
  _mockUsers[idx] = { ..._mockUsers[idx], ...req };
  return ok(_mockUsers[idx]);
}
async function apiGetActiveStaff() {
  await delay(400);
  return _mockUsers.filter((u) => !u.isArchived && u.isActive);
}
async function apiGetArchivedStaff() {
  await delay(400);
  return _mockUsers.filter((u) => u.isArchived);
}
async function apiGetStaffMember(userId) {
  await delay(200);
  return _mockUsers.find((u) => u.id === userId) ?? null;
}
async function apiUpdateStaff(userId, req) {
  await delay(400);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  _mockUsers[idx] = { ..._mockUsers[idx], ...req };
  return ok(_mockUsers[idx]);
}
async function apiArchiveStaff(userId) {
  await delay(300);
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  user.isArchived = true;
  user.isActive = false;
  return ok(null);
}
async function apiRestoreStaff(userId) {
  await delay(300);
  const user = _mockUsers.find((u) => u.id === userId);
  if (!user) return err("Staff member not found");
  user.isArchived = false;
  user.isActive = true;
  return ok(null);
}
async function apiDeleteStaff(userId) {
  await delay(300);
  const idx = _mockUsers.findIndex((u) => u.id === userId);
  if (idx < 0) return err("Staff member not found");
  _mockUsers.splice(idx, 1);
  return ok(null);
}
async function apiGetStaffStats() {
  await delay(300);
  const active = _mockUsers.filter((u) => !u.isArchived);
  const byDept = {};
  const byBranch = {};
  const byRole = {};
  for (const u of active) {
    byDept[u.department] = (byDept[u.department] ?? 0) + 1;
    byBranch[u.branch] = (byBranch[u.branch] ?? 0) + 1;
    byRole[u.role] = (byRole[u.role] ?? 0) + 1;
  }
  return {
    total: _mockUsers.length,
    active: active.length,
    archived: _mockUsers.filter((u) => u.isArchived).length,
    byDepartment: byDept,
    byBranch,
    byRole
  };
}
const _announcements = [
  {
    id: 1,
    title: "BARB Annual General Meeting 2026",
    content: "All staff are cordially invited to the Annual General Meeting scheduled for Friday, 24 April 2026 at the Head Office auditorium at 10:00 AM. Attendance is mandatory for all department heads.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-1",
    authorName: "Sarah Mensah",
    createdAt: BigInt(Date.now() - 864e5),
    updatedAt: BigInt(Date.now() - 864e5),
    isDismissed: false,
    isTrashed: false,
    poll: {
      id: 1,
      question: "Will you attend in person or virtually?",
      options: [
        { id: 1, text: "In Person", votes: 34 },
        { id: 2, text: "Virtually", votes: 12 },
        { id: 3, text: "I cannot attend", votes: 5 }
      ],
      totalVotes: 51,
      userVotedOptionId: null,
      endDate: BigInt(Date.now() + 2592e5),
      isActive: true
    }
  },
  {
    id: 2,
    title: "New Farm Loan Policy Effective May 2026",
    content: "The Credit Department has updated the farm loan policy. All loan officers should review the new guidelines before processing any farm loan applications from 1 May 2026.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-1",
    authorName: "Sarah Mensah",
    createdAt: BigInt(Date.now() - 1728e5),
    updatedAt: BigInt(Date.now() - 1728e5),
    isDismissed: false,
    isTrashed: false,
    poll: null
  },
  {
    id: 3,
    title: "Mandatory IT Security Training — All Staff",
    content: "The IT Department has scheduled a mandatory cybersecurity awareness training for all staff. Sessions will run from Monday to Wednesday next week. Please confirm your preferred session slot.",
    imageUrl: null,
    fileUrl: null,
    authorId: "mock-user-2",
    authorName: "Emmanuel Asante",
    createdAt: BigInt(Date.now() - 2592e5),
    updatedAt: BigInt(Date.now() - 2592e5),
    isDismissed: false,
    isTrashed: false,
    poll: null
  }
];
async function apiGetAnnouncements() {
  await delay(400);
  return _announcements.filter((a) => !a.isTrashed);
}
async function apiGetTrashedAnnouncements() {
  await delay(300);
  return _announcements.filter((a) => a.isTrashed);
}
const _notifications = [
  {
    id: 1,
    userId: "mock-user-1",
    kind: "announcement",
    title: "New Announcement",
    message: "BARB Annual General Meeting 2026 has been posted",
    linkTo: "/announcements",
    isRead: false,
    createdAt: BigInt(Date.now() - 36e5)
  },
  {
    id: 2,
    userId: "mock-user-1",
    kind: "training",
    title: "New Training Material",
    message: "Cybersecurity Fundamentals course is now available",
    linkTo: "/training",
    isRead: false,
    createdAt: BigInt(Date.now() - 72e5)
  },
  {
    id: 3,
    userId: "mock-user-1",
    kind: "system",
    title: "Profile Updated",
    message: "Your profile information has been updated successfully",
    linkTo: "/profile",
    isRead: true,
    createdAt: BigInt(Date.now() - 864e5)
  }
];
async function apiGetUnreadNotificationCount() {
  await delay(200);
  return _notifications.filter((n) => !n.isRead).length;
}
async function apiGetNotifications() {
  await delay(300);
  return [..._notifications].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
}
async function apiMarkNotificationRead(id) {
  await delay(150);
  const notif = _notifications.find((n) => n.id === id);
  if (notif) notif.isRead = true;
  return !!notif;
}
async function apiMarkAllNotificationsRead() {
  await delay(200);
  for (const n of _notifications) n.isRead = true;
}
let _forms = [
  {
    id: 1,
    title: "Staff Leave Application Form",
    description: "Apply for annual, sick, or emergency leave",
    fileUrl: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 2592e6),
    updatedAt: BigInt(Date.now() - 2592e6)
  },
  {
    id: 2,
    title: "IT Incident Report Form",
    description: "Report hardware, software, or network issues",
    fileUrl: "1FgT9nPqR7sKdLmVwXzBaYcEhNjUoIpQr",
    category: "IT",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 1728e6),
    updatedAt: BigInt(Date.now() - 1728e6)
  },
  {
    id: 3,
    title: "Profile Amendment Request",
    description: "Request changes to your staff profile information",
    fileUrl: "1KhJmNpQrStUvWxYzAbCdEfGhIjKlMnOp",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 864e6),
    updatedAt: BigInt(Date.now() - 864e6)
  },
  {
    id: 4,
    title: "Loan Application — Staff Welfare",
    description: "Apply for a staff welfare loan through the credit department",
    fileUrl: "https://forms.office.com/r/BarbStaffWelfareForm",
    category: "Finance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 432e6),
    updatedAt: BigInt(Date.now() - 432e6)
  },
  {
    id: 5,
    title: "Branch Operations Daily Report",
    description: "End-of-day operations summary for branch managers",
    fileUrl: "1PqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTu",
    category: "Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 1728e5),
    updatedAt: BigInt(Date.now() - 1728e5)
  },
  {
    id: 6,
    title: "Staff Appraisal Form — Q2 2026",
    description: "Quarterly performance appraisal submission for all staff",
    fileUrl: "1VwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZa",
    category: "General",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    createdAt: BigInt(Date.now() - 864e5),
    updatedAt: BigInt(Date.now() - 864e5)
  }
];
let _formIdCounter = _forms.length + 1;
async function apiGetForms() {
  await delay(350);
  return [..._forms].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}
async function apiCreateForm(req) {
  await delay(400);
  const form = {
    id: _formIdCounter++,
    title: req.title,
    description: req.description,
    fileUrl: req.fileUrl,
    category: req.category,
    visibleTo: req.visibleTo,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now())
  };
  _forms.unshift(form);
  return ok(form);
}
async function apiUpdateForm(id, req) {
  await delay(350);
  const idx = _forms.findIndex((f) => f.id === id);
  if (idx < 0) return err("Form not found");
  _forms[idx] = { ..._forms[idx], ...req, updatedAt: BigInt(Date.now()) };
  return ok(_forms[idx]);
}
async function apiDeleteForm(id) {
  await delay(300);
  const idx = _forms.findIndex((f) => f.id === id);
  if (idx < 0) return err("Form not found");
  _forms.splice(idx, 1);
  return ok(null);
}
const _trainingVideos = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals for Bank Staff",
    description: "Essential cybersecurity practices including phishing awareness, password management, and safe online banking protocols for all BARB staff.",
    videoUrl: "DRIVE:1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74",
    thumbnailUrl: null,
    duration: 1800,
    category: "IT Security",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 6048e5),
    viewCount: 42,
    isArchived: false
  },
  {
    id: 2,
    title: "AML & KYC Compliance Training 2026",
    description: "Anti-Money Laundering and Know Your Customer procedures as per Bank of Ghana regulations. Mandatory for all customer-facing staff.",
    videoUrl: "DRIVE:1KhJmNpQrStUvWxYzAbCdEfGhIjKlMnOp5",
    thumbnailUrl: null,
    duration: 2700,
    category: "Compliance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 12096e5),
    viewCount: 67,
    isArchived: false
  },
  {
    id: 3,
    title: "T24 Core Banking System — Loan Modules",
    description: "Step-by-step guide to processing farm and personal loans in the T24 Core Banking System. Credit department staff only.",
    videoUrl: "DRIVE:1PqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTu2",
    thumbnailUrl: null,
    duration: 3600,
    category: "Banking Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 2592e6),
    viewCount: 18,
    isArchived: false
  },
  {
    id: 4,
    title: "Customer Service Excellence — BARB Standards",
    description: "Delivering world-class service at every touchpoint: greeting, problem resolution, escalation, and feedback management.",
    videoUrl: "LOCAL:customer_service_excellence.mp4",
    thumbnailUrl: null,
    duration: 2100,
    category: "Customer Service",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 432e6),
    viewCount: 55,
    isArchived: false
  }
];
const _trainingDocuments = [
  {
    id: 1,
    title: "BARB Staff Handbook 2026",
    description: "Comprehensive guide to BARB policies, procedures, benefits, and staff conduct expectations.",
    fileUrl: "DRIVE:1VwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaB",
    fileType: "application/pdf",
    category: "HR",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 2592e6),
    downloadCount: 89,
    isArchived: false
  },
  {
    id: 2,
    title: "Anti-Money Laundering Policy 2026",
    description: "Updated AML policy incorporating Bank of Ghana's latest directives. All staff must acknowledge receipt.",
    fileUrl: "DRIVE:1AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfG",
    fileType: "application/pdf",
    category: "Compliance",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 12096e5),
    downloadCount: 72,
    isArchived: false
  },
  {
    id: 3,
    title: "Branch Operations Manual — KASOA Branches",
    description: "Daily operations checklist, cash handling procedures, and end-of-day reporting for KASOA MAIN and KASOA NEW MARKET.",
    fileUrl: "DRIVE:1HiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmN",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    category: "Operations",
    visibleTo: ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Sarah Mensah",
    uploadedAt: BigInt(Date.now() - 864e6),
    downloadCount: 23,
    isArchived: false
  },
  {
    id: 4,
    title: "IT Security Policy — Password & Access Control",
    description: "Password requirements, system access protocols, and incident reporting guidelines for all BARB IT systems.",
    fileUrl: "DRIVE:1OpQrStUvWxYzAbCdEfGhIjKlMnOpQrStU",
    fileType: "application/pdf",
    category: "IT Security",
    visibleTo: ["GeneralStaff", "HRAdmin", "SuperAdmin"],
    uploadedBy: "Emmanuel Asante",
    uploadedAt: BigInt(Date.now() - 1728e5),
    downloadCount: 61,
    isArchived: false
  }
];
const _videoProgress = {};
let _videoIdCounter = _trainingVideos.length + 1;
let _docIdCounter = _trainingDocuments.length + 1;
async function apiGetTrainingVideos() {
  await delay(400);
  return [..._trainingVideos].sort(
    (a, b) => Number(b.uploadedAt) - Number(a.uploadedAt)
  );
}
async function apiGetTrainingVideo(id) {
  await delay(200);
  return _trainingVideos.find((v2) => v2.id === id) ?? null;
}
async function apiUploadTrainingVideo(req) {
  await delay(600);
  const video = {
    id: _videoIdCounter++,
    title: req.title,
    description: req.description,
    videoUrl: req.videoUrl,
    thumbnailUrl: null,
    duration: 0,
    category: req.visibility === "Department" ? req.department ?? "General" : "General",
    visibleTo: req.visibility === "General" ? ["GeneralStaff", "HRAdmin", "SuperAdmin"] : ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Current User",
    uploadedAt: BigInt(Date.now()),
    viewCount: 0,
    isArchived: false
  };
  _trainingVideos.unshift(video);
  return ok(video);
}
async function apiUpdateTrainingProgress(videoId, progressPercent) {
  await delay(100);
  const key = `user-mock-${videoId}`;
  _videoProgress[key] = {
    videoId,
    progressPercent,
    isComplete: progressPercent >= 98,
    lastWatched: BigInt(Date.now())
  };
}
async function apiGetMyVideoProgress(videoId) {
  await delay(150);
  return _videoProgress[`user-mock-${videoId}`] ?? null;
}
async function apiGetVideoWatchStats() {
  await delay(300);
  return _trainingVideos.map((v2) => ({
    videoId: v2.id,
    title: v2.title,
    totalWatched: v2.viewCount,
    completedCount: Math.floor(v2.viewCount * 0.7)
  }));
}
async function apiGetTrainingDocuments() {
  await delay(400);
  return [..._trainingDocuments].sort(
    (a, b) => Number(b.uploadedAt) - Number(a.uploadedAt)
  );
}
async function apiGetTrainingDocument(id) {
  await delay(200);
  return _trainingDocuments.find((d) => d.id === id) ?? null;
}
async function apiUploadTrainingDocument(req) {
  await delay(600);
  const doc = {
    id: _docIdCounter++,
    title: req.title,
    description: req.description,
    fileUrl: req.fileUrl,
    fileType: req.fileType,
    category: req.visibility === "Department" ? req.department ?? "General" : "General",
    visibleTo: req.visibility === "General" ? ["GeneralStaff", "HRAdmin", "SuperAdmin"] : ["HRAdmin", "SuperAdmin"],
    uploadedBy: "Current User",
    uploadedAt: BigInt(Date.now()),
    downloadCount: 0,
    isArchived: false
  };
  _trainingDocuments.unshift(doc);
  return ok(doc);
}
async function apiMarkDocumentOpened(id) {
  await delay(100);
  const doc = _trainingDocuments.find((d) => d.id === id);
  if (doc) doc.downloadCount += 1;
}
async function apiGetDocumentViewStats() {
  await delay(300);
  return _trainingDocuments.map((d) => ({
    docId: d.id,
    title: d.title,
    openedCount: d.downloadCount
  }));
}
async function apiGetAdminTrainingOverview() {
  await delay(500);
  const totalStaff = _mockUsers.filter((u) => !u.isArchived).length;
  return {
    totalVideos: _trainingVideos.filter((v2) => !v2.isArchived).length,
    totalDocuments: _trainingDocuments.filter((d) => !d.isArchived).length,
    totalStaff,
    videoStats: _trainingVideos.filter((v2) => !v2.isArchived).map((v2) => ({
      id: v2.id,
      title: v2.title,
      eligibleCount: v2.visibleTo.length >= 3 ? totalStaff : Math.floor(totalStaff * 0.5),
      watchedCount: v2.viewCount,
      completionPct: v2.viewCount > 0 ? Math.min(v2.viewCount / totalStaff * 100, 100) : 0,
      isMandatory: v2.visibleTo.length >= 3,
      incompleteUsers: v2.viewCount < totalStaff ? _mockUsers.slice(0, Math.max(0, totalStaff - v2.viewCount)).map((u) => u.fullname) : []
    })),
    docStats: _trainingDocuments.filter((d) => !d.isArchived).map((d) => ({
      id: d.id,
      title: d.title,
      eligibleCount: d.visibleTo.length >= 3 ? totalStaff : Math.floor(totalStaff * 0.5),
      openedCount: d.downloadCount,
      openedPct: d.downloadCount > 0 ? Math.min(d.downloadCount / totalStaff * 100, 100) : 0,
      isMandatory: d.visibleTo.length >= 3
    }))
  };
}
async function apiArchiveTrainingVideo(id) {
  await delay(300);
  const video = _trainingVideos.find((v2) => v2.id === id);
  if (!video) return err("Video not found");
  video.isArchived = true;
  return ok(null);
}
async function apiDeleteTrainingVideo(id) {
  await delay(300);
  const idx = _trainingVideos.findIndex((v2) => v2.id === id);
  if (idx < 0) return err("Video not found");
  _trainingVideos.splice(idx, 1);
  return ok(null);
}
async function apiSendVideoTrainingReminder(_videoId) {
  await delay(400);
  return ok(null);
}
const _incidents = [
  {
    id: 1,
    reporterId: "mock-user-3",
    reporterName: "Abena Ofori",
    subject: "T24 Core Banking",
    description: "Unable to process savings withdrawals — T24 module throwing error code 504 during peak hours. Affects all tellers at ADEISO branch.",
    priority: "high",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now() - 72e5),
    updatedAt: BigInt(Date.now() - 72e5)
  },
  {
    id: 2,
    reporterId: "mock-user-2",
    reporterName: "Emmanuel Asante",
    subject: "Email/Password",
    description: "Staff member locked out of corporate email. Password reset not functioning via standard portal.",
    priority: "medium",
    status: "resolved",
    assignedTo: "mock-user-1",
    resolution: "Password reset completed via admin panel. User regained access.",
    createdAt: BigInt(Date.now() - 1728e5),
    updatedAt: BigInt(Date.now() - 864e5)
  },
  {
    id: 3,
    reporterId: "mock-user-3",
    reporterName: "Abena Ofori",
    subject: "Network",
    description: "Intermittent internet connectivity at ADEISO branch affecting online banking transactions.",
    priority: "medium",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now() - 36e5),
    updatedAt: BigInt(Date.now() - 36e5)
  }
];
const _amendments = [
  {
    id: 1,
    requesterId: "mock-user-3",
    requesterName: "Abena Ofori",
    field: "Department Change",
    currentValue: "BANKING OPERATIONS",
    requestedValue: "E-BANKING",
    reason: "Transfer approved — KASOA MAIN branch",
    status: "pending",
    reviewedBy: null,
    reviewNote: null,
    createdAt: BigInt(Date.now() - 864e5),
    updatedAt: BigInt(Date.now() - 864e5)
  },
  {
    id: 2,
    requesterId: "mock-user-2",
    requesterName: "Emmanuel Asante",
    field: "T24 Amendment",
    currentValue: "HR Officer",
    requestedValue: "Senior HR Officer",
    reason: "Promotion effective April 2026",
    status: "approved",
    reviewedBy: "mock-user-1",
    reviewNote: "Approved. T24 role updated.",
    createdAt: BigInt(Date.now() - 2592e5),
    updatedAt: BigInt(Date.now() - 1728e5)
  }
];
let _incidentIdCounter = 4;
let _amendmentIdCounter = 3;
async function apiSubmitIncidentReport(req, reporterId) {
  await delay(500);
  const report = {
    id: _incidentIdCounter++,
    reporterId,
    reporterName: req.reporterName,
    subject: req.issueCategory,
    description: req.description,
    priority: "medium",
    status: "open",
    assignedTo: null,
    resolution: null,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now())
  };
  _incidents.unshift(report);
  return ok(report);
}
async function apiSubmitProfileAmendment(req, requesterId, requesterName) {
  await delay(500);
  const amendment = {
    id: _amendmentIdCounter++,
    requesterId,
    requesterName,
    field: req.requestType,
    currentValue: "",
    requestedValue: req.additionalDetails ?? "",
    reason: req.additionalDetails ?? req.requestType,
    status: "pending",
    reviewedBy: null,
    reviewNote: null,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now())
  };
  _amendments.unshift(amendment);
  return ok(amendment);
}
async function apiGetIncidentReports() {
  await delay(400);
  return [..._incidents].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
}
async function apiGetMyIncidents(userId) {
  await delay(300);
  return _incidents.filter((i) => i.reporterId === userId).sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
}
async function apiGetProfileAmendments() {
  await delay(400);
  return [..._amendments].sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt)
  );
}
async function apiGetMyAmendments(userId) {
  await delay(300);
  return _amendments.filter((a) => a.requesterId === userId).sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
}
async function apiResolveIncidentReport(id, resolution) {
  await delay(300);
  const incident = _incidents.find((i) => i.id === id);
  if (!incident) return err("Incident not found");
  incident.status = "resolved";
  incident.resolution = resolution;
  incident.updatedAt = BigInt(Date.now());
  return ok(null);
}
async function apiResolveProfileAmendment(id, approved, note, reviewerId) {
  await delay(300);
  const amendment = _amendments.find((a) => a.id === id);
  if (!amendment) return err("Amendment not found");
  amendment.status = approved ? "approved" : "rejected";
  amendment.reviewedBy = reviewerId;
  amendment.reviewNote = note;
  amendment.updatedAt = BigInt(Date.now());
  return ok(null);
}
async function apiDeleteResolvedIncidents(ids) {
  await delay(300);
  for (const id of ids) {
    const idx = _incidents.findIndex((i) => i.id === id);
    if (idx >= 0) _incidents.splice(idx, 1);
  }
  return ok(null);
}
async function apiDeleteResolvedAmendments(ids) {
  await delay(300);
  for (const id of ids) {
    const idx = _amendments.findIndex((a) => a.id === id);
    if (idx >= 0) _amendments.splice(idx, 1);
  }
  return ok(null);
}
function apiExportIncidentsCsv(incidents) {
  const headers = [
    "ID",
    "Reporter",
    "Category",
    "Description",
    "Status",
    "Priority",
    "Date"
  ];
  const rows = incidents.map((i) => [
    String(i.id),
    i.reporterName,
    i.subject,
    `"${i.description.replace(/"/g, '""')}"`,
    i.status,
    i.priority,
    new Date(Number(i.createdAt)).toLocaleDateString()
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
function apiExportAmendmentsCsv(amendments) {
  const headers = [
    "ID",
    "Requester",
    "Field",
    "Current Value",
    "Requested Value",
    "Status",
    "Date"
  ];
  const rows = amendments.map((a) => [
    String(a.id),
    a.requesterName,
    a.field,
    `"${a.currentValue.replace(/"/g, '""')}"`,
    `"${a.requestedValue.replace(/"/g, '""')}"`,
    a.status,
    new Date(Number(a.createdAt)).toLocaleDateString()
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
const _auditLogs = [
  {
    id: 1,
    actorId: "mock-user-1",
    actorName: "Sarah Mensah",
    action: "LOGIN",
    target: "System",
    ipAddress: "192.168.1.10",
    timestamp: BigInt(Date.now() - 18e5)
  },
  {
    id: 2,
    actorId: "mock-user-2",
    actorName: "Emmanuel Asante",
    action: "UPDATE_STAFF",
    target: "Abena Ofori",
    ipAddress: "192.168.1.22",
    timestamp: BigInt(Date.now() - 36e5)
  },
  {
    id: 3,
    actorId: "mock-user-1",
    actorName: "Sarah Mensah",
    action: "CREATE_ANNOUNCEMENT",
    target: "BARB Annual General Meeting 2026",
    ipAddress: "192.168.1.10",
    timestamp: BigInt(Date.now() - 864e5)
  }
];
async function apiLogAction(actorName, action, target, ipAddress) {
  _auditLogs.unshift({
    id: _auditLogs.length + 1,
    actorId: "current-user",
    actorName,
    action,
    target,
    ipAddress,
    timestamp: BigInt(Date.now())
  });
}
async function apiGetAuditLogs() {
  await delay(400);
  return [..._auditLogs].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp)
  );
}
async function apiDeleteAuditLog(id) {
  await delay(200);
  const idx = _auditLogs.findIndex((l) => l.id === id);
  if (idx < 0) return err("Log entry not found");
  _auditLogs.splice(idx, 1);
  return ok(null);
}
async function apiDeleteAuditLogs(ids) {
  await delay(300);
  for (const id of ids) {
    const idx = _auditLogs.findIndex((l) => l.id === id);
    if (idx >= 0) _auditLogs.splice(idx, 1);
  }
  return ok(null);
}
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
const backendClient = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  apiArchiveStaff,
  apiArchiveTrainingVideo,
  apiConfirmPasswordReset,
  apiCreateForm,
  apiDeleteAuditLog,
  apiDeleteAuditLogs,
  apiDeleteForm,
  apiDeleteResolvedAmendments,
  apiDeleteResolvedIncidents,
  apiDeleteStaff,
  apiDeleteTrainingVideo,
  apiExportAmendmentsCsv,
  apiExportIncidentsCsv,
  apiGetActiveStaff,
  apiGetAdminTrainingOverview,
  apiGetAnnouncements,
  apiGetArchivedStaff,
  apiGetAuditLogs,
  apiGetDocumentViewStats,
  apiGetForms,
  apiGetIncidentReports,
  apiGetMyAmendments,
  apiGetMyIncidents,
  apiGetMyProfile,
  apiGetMyVideoProgress,
  apiGetNotifications,
  apiGetProfileAmendments,
  apiGetStaffMember,
  apiGetStaffStats,
  apiGetTrainingDocument,
  apiGetTrainingDocuments,
  apiGetTrainingVideo,
  apiGetTrainingVideos,
  apiGetTrashedAnnouncements,
  apiGetUnreadNotificationCount,
  apiGetVideoWatchStats,
  apiLogAction,
  apiLogin,
  apiLogout,
  apiMarkAllNotificationsRead,
  apiMarkDocumentOpened,
  apiMarkNotificationRead,
  apiRegister,
  apiRequestPasswordReset,
  apiResendCode,
  apiResolveIncidentReport,
  apiResolveProfileAmendment,
  apiRestoreStaff,
  apiSendVideoTrainingReminder,
  apiSubmitIncidentReport,
  apiSubmitProfileAmendment,
  apiUpdateForm,
  apiUpdateMyProfile,
  apiUpdateStaff,
  apiUpdateTrainingProgress,
  apiUploadTrainingDocument,
  apiUploadTrainingVideo,
  apiVerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
export {
  apiExportAmendmentsCsv as $,
  apiGetMyProfile as A,
  Button as B,
  apiUpdateMyProfile as C,
  apiGetTrainingVideos as D,
  apiGetTrainingDocuments as E,
  apiArchiveTrainingVideo as F,
  apiDeleteTrainingVideo as G,
  apiGetTrainingVideo as H,
  apiGetMyVideoProgress as I,
  apiUpdateTrainingProgress as J,
  apiSendVideoTrainingReminder as K,
  apiUploadTrainingVideo as L,
  apiUploadTrainingDocument as M,
  useComposedRefs as N,
  apiGetAdminTrainingOverview as O,
  Primitive as P,
  apiGetVideoWatchStats as Q,
  apiGetMyIncidents as R,
  apiGetMyAmendments as S,
  ThemeToggle as T,
  apiSubmitIncidentReport as U,
  apiSubmitProfileAmendment as V,
  apiGetIncidentReports as W,
  apiGetProfileAmendments as X,
  apiExportIncidentsCsv as Y,
  apiResolveIncidentReport as Z,
  apiDeleteResolvedIncidents as _,
  apiLogin as a,
  apiResolveProfileAmendment as a0,
  apiDeleteResolvedAmendments as a1,
  buttonVariants as a2,
  Slot as a3,
  cva as a4,
  apiGetUnreadNotificationCount as a5,
  composeRefs as a6,
  backendClient as a7,
  apiRegister as b,
  apiRequestPasswordReset as c,
  apiConfirmPasswordReset as d,
  createLucideIcon as e,
  apiVerifyEmail as f,
  apiResendCode as g,
  Toaster as h,
  apiGetStaffStats as i,
  apiGetAnnouncements as j,
  apiLogAction as k,
  apiGetTrashedAnnouncements as l,
  apiGetForms as m,
  apiUpdateForm as n,
  apiCreateForm as o,
  apiDeleteForm as p,
  apiGetActiveStaff as q,
  apiArchiveStaff as r,
  apiUpdateStaff as s,
  apiGetArchivedStaff as t,
  ue as u,
  apiRestoreStaff as v,
  apiDeleteStaff as w,
  apiGetNotifications as x,
  apiMarkAllNotificationsRead as y,
  apiMarkNotificationRead as z
};
