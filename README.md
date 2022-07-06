# Oysteo Website

This project uses

- SvelteKit (https://svelte.dev/kit)
- Svelte Material UI (https://sveltematerialui.com)

## Getting started
Obtain a `.env` file (from your team lead)

```sh
yarn
yarn theme
yarn dev
```

## UI theming

Edit SCSS files in `src/theme`
See https://sveltematerialui.com/THEMING.md

Run `yarn theme:light` or `yarh:theme:dark` to recompile themes to css

## Deployment

There are 3 environments - `dev`, `staging` and `prod` - all deployed automatically via GitOps methodologies.

### Workflow
* `feature/branch` -> `develop`
  - Website deploys to https://dev-website-oysteo.su93rheroes.com/
  - Portal deploys to https://dev-portal-oysteo.su93rheroes.com/
  - Uses the dev CMS in Singapore - you can merge your feature branch to develop as you like.
* `develop` -> `staging`
  - Website deploys to https://staging-website-oysteo.su93rheroes.com/
  - Portal deploys to https://staging-portal-oysteo.su93rheroes.com/
  - Uses prod CMS in London (in the future there will be a staging CMS) - (for now) you can merge to `staging` as you like.
* `staging` -> `main`
  - Website deploys to https://oysteo.com/
  - Portal deploys to https://my.oysteo.com/
  - Uses prod Stapi in London

