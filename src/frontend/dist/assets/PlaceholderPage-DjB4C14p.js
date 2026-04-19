import { j as jsxRuntimeExports } from "./index-CQG1vcXg.js";
import { u as useLocation, A as AppShell } from "./AppShell-Bc4WOYvs.js";
import { E as EmptyState } from "./EmptyState-HcQkGyve.js";
import { e as createLucideIcon } from "./backend-client-D43GVmUU.js";
import "./Combination-BpDQgzvQ.js";
import "./index-pajndnDv.js";
import "./index-CqbiV51T.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "2", y: "6", width: "20", height: "8", rx: "1", key: "1estib" }],
  ["path", { d: "M17 14v7", key: "7m2elx" }],
  ["path", { d: "M7 14v7", key: "1cm7wv" }],
  ["path", { d: "M17 3v3", key: "1v4jwn" }],
  ["path", { d: "M7 3v3", key: "7o6guu" }],
  ["path", { d: "M10 14 2.3 6.3", key: "1023jk" }],
  ["path", { d: "m14 6 7.7 7.7", key: "1s8pl2" }],
  ["path", { d: "m8 6 8 8", key: "hl96qh" }]
];
const Construction = createLucideIcon("construction", __iconNode);
function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.split("/").filter(Boolean).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ") || "Dashboard";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    EmptyState,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Construction, { className: "h-8 w-8" }),
      title: `${pageName} — Coming Soon`,
      description: "This section is being built and will be available shortly.",
      "data-ocid": "placeholder.empty_state"
    }
  ) });
}
export {
  PlaceholderPage as default
};
