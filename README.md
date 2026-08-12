# aside

A Google Apps Script web app: TypeScript backend + React frontend, deployed as
a single script. Built on the [`@google/aside`](https://github.com/google/aside)
toolchain.

## What it gives you

- **Your code, your copyright.** The build no longer stamps a "Copyright Google
  LLC" banner on your files.
- **Exports become functions.** Anything you `export` from `src/index.ts`
  (doGet, triggers, menu handlers) is callable in Apps Script; anything you
  don't export stays hidden in the bundle.
- **Tree-shaking on.** The bundle ships only what you actually use — no
  side-effect hacks to keep functions alive.
- **npm dependencies.** Import packages in your backend and they're resolved
  and bundled automatically.
- **A modern UI.** React 19 + TypeScript + Vite (React Compiler on), instead of
  the stock Angular Material UI, inlined into the script at build time.
- **Routing that works in the sandbox.** In-app navigation via MemoryRouter,
  which behaves in the sandboxed iframe.

## Commands

| Command | What it does |
| --- | --- |
| `npm test` | Jest tests |
| `npm run lint` | ESLint + Prettier on `src/` and `test/` |
| `npm run build` | Bundle backend, build + inline the UI into `dist/` |
| `npm run deploy` | lint + test + build, then push to the dev script via clasp |
| `npm run deploy:prod` | Same, but needs a `.clasp-prod.json` (not set up yet) |

`dist/` is gitignored and regenerated on every build.
