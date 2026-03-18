---
name: backstage-plugins
description: >
  Expert knowledge for developing, migrating, and maintaining Backstage plugins — covering both the
  new frontend system (createFrontendPlugin, extension blueprints) and the new backend system
  (createBackendPlugin, createBackendModule, extension points). Use this skill whenever the user is
  working on a Backstage plugin or module, asking about plugin structure, workspace setup, naming
  conventions, API design, entity cards/pages, catalog integration, scaffolder actions, or contributing
  to backstage/community-plugins or RoadieHQ/roadie-backstage-plugins. Also use when the user asks
  about installing, registering, or debugging any @backstage or @backstage-community package.
---

# Backstage Plugin Development Skill

## Quick Orientation

Backstage plugins live in one of three homes:

- **`backstage/backstage`** – core/maintained-by-Spotify plugins (`packages/`, `plugins/`)
- **`backstage/community-plugins`** – community workspace monorepo (`workspaces/<name>/`)
- **`RoadieHQ/roadie-backstage-plugins`** – Roadie's plugin suite (similar workspace structure)

Each "workspace" in community-plugins is an independently-versioned yarn workspace containing one or more related plugin packages. Plugin packages follow the [ADR-011 naming convention](https://backstage.io/docs/architecture-decisions/adrs-adr011).

---

## Naming Conventions (ADR-011)

| Package role        | npm name pattern                                        | Example                                                     |
| ------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| Frontend plugin     | `@backstage-community/plugin-<id>`                      | `@backstage-community/plugin-linguist`                      |
| Backend plugin      | `@backstage-community/plugin-<id>-backend`              | `@backstage-community/plugin-linguist-backend`              |
| Backend module      | `@backstage-community/plugin-<id>-backend-module-<mod>` | `@backstage-community/plugin-catalog-backend-module-github` |
| Node/shared lib     | `@backstage-community/plugin-<id>-node`                 | `@backstage-community/plugin-linguist-node`                 |
| React component lib | `@backstage-community/plugin-<id>-react`                | `@backstage-community/plugin-linguist-react`                |
| Common types        | `@backstage-community/plugin-<id>-common`               | `@backstage-community/plugin-linguist-common`               |

Plugin IDs are lowercase dash-separated. The exported plugin variable is camelCase with a `Plugin` suffix: `linguistPlugin`.

---

## Frontend Plugins (New System)

See `references/frontend.md` for full code examples and extension blueprint catalogue.

### Key entry points

```ts
// src/index.ts — must be the default export
export { myPlugin as default } from './plugin';

// src/plugin.ts
import {
  createFrontendPlugin,
  PageBlueprint,
  NavItemBlueprint,
} from '@backstage/frontend-plugin-api';

export const myPlugin = createFrontendPlugin({
  pluginId: 'my-plugin', // lowercase dash-separated
  info: { packageJson: () => import('../package.json') },
  extensions: [MyPage, MyNavItem],
});
```

### Extension Blueprints (most common)

| Blueprint                   | Import                                  | Use for                 |
| --------------------------- | --------------------------------------- | ----------------------- |
| `PageBlueprint`             | `@backstage/frontend-plugin-api`        | Standalone routed pages |
| `NavItemBlueprint`          | `@backstage/frontend-plugin-api`        | Sidebar nav entries     |
| `EntityCardBlueprint`       | `@backstage/plugin-catalog-react/alpha` | Cards on entity pages   |
| `EntityContentBlueprint`    | `@backstage/plugin-catalog-react/alpha` | Tabs on entity pages    |
| `SearchResultItemBlueprint` | `@backstage/plugin-search-react/alpha`  | Search result rows      |
| `ApiBlueprint`              | `@backstage/frontend-plugin-api`        | Utility APIs            |

### Utility APIs

```ts
// src/api.ts
import { createApiRef } from '@backstage/frontend-plugin-api';

export const myApiRef = createApiRef<MyApi>({ id: 'plugin.my-plugin.api' });

// Provide via ApiBlueprint in your plugin
```

### Routes

```ts
// src/routes.ts
import {
  createRouteRef,
  createExternalRouteRef,
} from '@backstage/frontend-plugin-api';

export const rootRouteRef = createRouteRef(); // target route
export const catalogIndexRouteRef = createExternalRouteRef(); // outgoing link
```

---

## Backend Plugins (New System)

See `references/backend.md` for full examples.

### Backend plugin skeleton

```ts
// src/plugin.ts
import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';

export const myPlugin = createBackendPlugin({
  pluginId: 'my-plugin',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        httpRouter: coreServices.httpRouter,
        database: coreServices.database,
      },
      async init({ logger, httpRouter }) {
        // register express router
        httpRouter.use(await createRouter({ logger }));
      },
    });
  },
});

export default myPlugin;
```

### Backend modules (extending another plugin)

```ts
import { createBackendModule } from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node';

export const catalogModuleMyProcessor = createBackendModule({
  pluginId: 'catalog', // the plugin this extends
  moduleId: 'my-processor',
  register(env) {
    env.registerInit({
      deps: { catalog: catalogProcessingExtensionPoint },
      async init({ catalog }) {
        catalog.addProcessor(new MyProcessor());
      },
    });
  },
});

export default catalogModuleMyProcessor;
```

### Common core services

| Service ref               | What it gives you                    |
| ------------------------- | ------------------------------------ |
| `coreServices.logger`     | Logger scoped to plugin              |
| `coreServices.rootConfig` | App config (`app-config.yaml`)       |
| `coreServices.database`   | Knex database client                 |
| `coreServices.httpRouter` | Express router mount                 |
| `coreServices.auth`       | Service-to-service auth tokens       |
| `coreServices.httpAuth`   | Validating incoming HTTP credentials |
| `coreServices.userInfo`   | User identity from requests          |
| `coreServices.scheduler`  | Background task scheduling           |
| `coreServices.cache`      | Key-value cache                      |
| `coreServices.discovery`  | Resolving plugin base URLs           |

---

## community-plugins Workspace Layout

```
workspaces/
  my-plugin/
    plugins/
      my-plugin/               # frontend: @backstage-community/plugin-my-plugin
        src/
          plugin.ts
          index.ts
          routes.ts
          components/
          api.ts
        dev/
          index.tsx            # standalone dev runner
        package.json
      my-plugin-backend/       # backend: @backstage-community/plugin-my-plugin-backend
        src/
          plugin.ts
          router.ts
          index.ts
        dev/
          index.ts
        package.json
      my-plugin-common/        # shared types/utils (optional)
      my-plugin-node/          # extension points for others to use (optional)
    package.json               # workspace root
    README.md
```

### Creating a new workspace

```bash
cd community-plugins
yarn install
yarn create-workspace        # interactive prompt
cd workspaces/my-plugin
yarn install
yarn new                     # create frontend/backend plugin packages
```

### Dev server

```bash
# standalone (per-plugin)
cd workspaces/my-plugin/plugins/my-plugin
yarn start

# full environment (if configured in workspace)
cd workspaces/my-plugin
yarn dev
```

### Changeset workflow (required for PRs)

```bash
cd workspaces/my-plugin      # must be in workspace root
yarn changeset               # select packages + bump type + description
# Commit the generated .changeset/*.md file with your PR
```

---

## Roadie Plugin Patterns

Roadie plugins follow the same `yarn workspace` + `changeset` structure. Key differences:

- Package scope is `@roadiehq/` (e.g. `@roadiehq/backstage-plugin-github-pull-requests`)
- Utilities land in `@roadiehq/backstage-utils`
- EntityAnnotationTypeTable, EntityGithubInsightsContent etc. are typical export shapes
- Each plugin's README documents required `annotations` for catalog entities

---

## Entity Page Integration (Frontend)

Adding a card or tab to an entity page uses the catalog-react blueprints:

```ts
// EntityCardBlueprint — shows as a card
export const myEntityCard = EntityCardBlueprint.make({
  name: 'my-card',
  params: {
    filter: 'kind:component', // optional filter expression
    loader: () =>
      import('./components/MyEntityCard').then(m => <m.MyEntityCard />),
  },
});

// EntityContentBlueprint — shows as a full tab
export const myEntityContent = EntityContentBlueprint.make({
  name: 'my-content',
  params: {
    defaultPath: '/my-plugin',
    defaultTitle: 'My Plugin',
    filter: 'kind:component,api',
    loader: () =>
      import('./components/MyEntityPage').then(m => <m.MyEntityPage />),
  },
});
```

---

## Testing Patterns

### Frontend tests

```tsx
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { myApiRef } from '../api';

const mockApi = { getData: jest.fn().mockResolvedValue({ items: [] }) };

it('renders', async () => {
  await renderInTestApp(
    <TestApiProvider apis={[[myApiRef, mockApi]]}>
      <MyComponent />
    </TestApiProvider>,
  );
});
```

### Backend tests

```ts
import { startTestBackend } from '@backstage/backend-test-utils';
import { myPlugin } from '../plugin';

it('starts up', async () => {
  const { server } = await startTestBackend({ features: [myPlugin] });
  const res = await request(server).get('/api/my-plugin/health');
  expect(res.status).toBe(200);
});
```

---

## Catalog Entity Annotations

If your plugin reads entity annotations, document them in `annotations.ts` and export the constants:

```ts
export const MY_ANNOTATION = 'my.company/my-plugin-id';

// Usage check in components:
import { useEntity } from '@backstage/plugin-catalog-react';
const { entity } = useEntity();
const id = entity.metadata.annotations?.[MY_ANNOTATION];
```

---

## package.json `backstage` metadata (required)

```json
{
  "backstage": {
    "role": "frontend-plugin",
    "supported-versions": "^1.30.0"
  }
}
```

Roles: `frontend-plugin`, `backend-plugin`, `backend-plugin-module`, `node-library`, `common-library`, `frontend-plugin-module`.

Fix missing metadata:

```bash
yarn backstage-cli repo fix --publish
```

---

## API Reports

All public API surfaces need an api-report file. Generate/update with:

```bash
yarn build:api-reports        # from workspace root
```

Commit the resulting `.api.md` files. PRs that change public API without updating reports will fail CI.

---

## Reference Files

- `references/frontend.md` — Full frontend extension examples and older legacy system patterns
- `references/backend.md` — Full backend service examples, HTTP routing, DB migrations
- `references/catalog-integration.md` — Entity providers, processors, relations, catalog rules

Read the relevant reference before writing complex plugin code.
