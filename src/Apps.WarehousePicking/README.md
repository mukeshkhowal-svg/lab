# Warehouse Picking

The Power Apps code app for warehouse workers. It lists warehouse items, opens an item's
details and transaction history, and provides screens for warehouse transactions and locations.
Dataverse access goes through the generated typed services in `src/generated`.

## Run locally

From this directory, run `npm run dev` and open <http://localhost:5173>.

---

## Highlights
- **Modern tooling** - Vite, TypeScript, and React
- **Out-of-box styling** - Fluent UI components, light/dark theming and toasts out of the box
- **Dataverse-native controls** - TALXIS base controls (fields, lookups, grid) wired up with a PCF context
- **Batteries included** - Curated libraries pre-wired for common scenarios
- **Standard patterns** - Industry standard patterns and practices
- **Agent friendly** - Optimized for use with coding agents
---

## Pre-installed libraries
- [Fluent UI React v9](https://react.fluentui.dev/) - Microsoft's design system: components, theming (`FluentProvider`), styling (`makeStyles` + design tokens), toasts
- [TALXIS base controls](https://github.com/TALXIS/base-controls) - Dataverse field controls (`TextField`, `Decimal`, `OptionSet`, `Lookup`, `DateTime`, ...) and the `Grid`, with formatting from user settings
- [React Router](https://reactrouter.com/) - pages, routing
- [Tanstack Query](https://tanstack.com/query/latest) - data fetching, state management
- [Fluent UI Icons](https://github.com/microsoft/fluentui-system-icons) - icons (`@fluentui/react-icons`)

---

## TALXIS base controls
Base controls are built for the Power Apps Component Framework and read a PCF `context`. The starter's
`PcfProvider` (`src/providers/pcf-provider.tsx`) supplies one through `PcfContextProvider`: a context
generated for a non-PCF host (formatting, user settings, dialogs, ...) carrying the current Fluent v9
theme, so controls follow light/dark mode, plus two surfaces the app answers itself from
`src/providers/pcf-host.ts`:

- `utils.getEntityMetadata` - from the tables you register with `registerEntities()` (a `Lookup`
  needs its target's metadata)
- `navigation.openForm` - navigates to a record's page in the app, from each entity's `formPath`
  (the router registers the navigation with `setHostNavigate`)

```ts
registerEntities({
  logicalName: "tom_warehouseitem",
  displayName: "Warehouse Item",
  primaryIdAttribute: "tom_warehouseitemid",
  primaryNameAttribute: "tom_name",
  formPath: (id) => `/items/${id}`,
})
```

Inside any page, get the context with `usePcfContext()` and pass it to a control:

```tsx
const context = usePcfContext()
<Decimal context={context} parameters={{ value: { raw: qty, type: "Whole.None" } }}
  onNotifyOutputChanged={(o) => typeof o.value !== "string" && setQty(o.value ?? null)} />
```

A control reports a value it can't parse as the raw text (a string), so check the type before storing it.

- **React 18:** base controls (and the AG Grid behind `Grid`) support React up to 18, so the starter
  pins React 18. The `overrides` entry in `package.json` lets base controls, which declare React
  16/17 as their peer range, use the app's React 18.
- **Grid licence:** `Grid` uses AG Grid Enterprise modules. Without a licence key (the `LicenseKey`
  parameter) it runs as an AG Grid trial, with a console notice and a watermark.

---

The app is scaffolded with `txc workspace component create pp-app-code` and uses
`warehousepicking` as its app name. The items, transactions and locations data sources are
generated from `Solutions.DataModel`; do not call the Dataverse API directly.
