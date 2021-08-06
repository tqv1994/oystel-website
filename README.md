# Oysteo Website
This project uses
* SvelteKit (https://svelte.dev/kit)
* Svelte Material UI (https://sveltematerialui.com)

## Getting started
```sh
yarn
yarn theme
yarn dev
```

If you get this error, just kill the dev server and run it again:
```
TypeError: Cannot read property 'default' of null
    at eval (/Users/huy/Projects/oysteo/o/src/routes/__layout.svelte:79:24)
    at Generator.next (<anonymous>)
    ...
```

### UI theming
Edit SCSS files in `src/theme`
See https://sveltematerialui.com/THEMING.md/

Run `yarn theme:light` or `yarh:theme:dark` to recompile themes to css

### Troubleshooting
If you see an error like this:
```
Error: ENOENT: no such file or directory, open '/Users/huy/Projects/oysteo/website/node_modules/@material/dom/index.ts'
```
This is because of a bug in Vite.
Run `yarn fix` to fix it
