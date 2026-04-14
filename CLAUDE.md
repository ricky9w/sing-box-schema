# sing-box-schema

Fork of [BlackDuty/sing-box-schema](https://github.com/BlackDuty/sing-box-schema), maintained as a git submodule of [sing-manager](https://github.com/ricky9w/sing-manager). Provides Zod-based sing-box configuration schemas.

## Branching Strategy

### Branch structure

```
main              ← always tracks the current stable sing-box version
dev/x.y           ← development branch for upcoming version (exists only during alpha/beta cycle)
legacy/v1.xx      ← archived snapshots of previous stable versions (read-only)
```

At most **2 active branches** at any time: `main` + at most one `dev/x.y`.

### Version lifecycle

**Phase 1 — New version enters alpha** (e.g., sing-box 1.14.0-alpha.1 released)

1. Create `dev/1.14` from `main`
2. Add new fields/schemas on `dev/1.14` as alphas progress
3. Update `.sing-box-version` in `dev/1.14` to the alpha/beta version (for integration tests)
4. sing-manager can test on a feature branch with submodule pointing to `dev/1.14`

**Phase 2 — During alpha/beta development**

- Stable-version bug fixes → commit directly to `main`
- `dev/1.14` periodically rebases on `main` to pick up fixes
- New-version schema changes only go to `dev/1.14`, never `main`

**Phase 3 — New version goes stable** (e.g., sing-box 1.14.0 released)

1. Create `legacy/v1.13` from current `main` (archive the snapshot)
2. Merge `dev/1.14` into `main`
3. Delete `dev/1.14` (local + remote)
4. Update sing-manager submodule pointer to new `main`

**Phase 4 — Stable patches** (e.g., 1.14.1, 1.14.2)

- Fix directly on `main`
- Only bump `.sing-box-version` when a newer test binary is needed

### Coordination with sing-manager

| sing-manager branch | Schema submodule points to | Use case |
|---|---|---|
| `main` | schema `main` | Production — always stable |
| feature branch | schema `dev/x.y` | Early adaptation for upcoming version |

## Common commands

```bash
pnpm install                   # install dependencies
pnpm run typecheck             # tsc --noEmit
pnpm run lint                  # biome lint
pnpm test                      # vitest
```

## Conventions

- `.sing-box-version` is the authoritative sing-box version for integration tests
- Removed/deprecated fields are kept with `deprecated: true` in `.meta()` for migration assistance
- All schema fields should have bilingual descriptions (`description` + `description_zh`)
- Deprecation notes must include version numbers (e.g., "Deprecated in 1.11.0 and removed in 1.13.0")
