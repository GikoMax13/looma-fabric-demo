# LOOMA Material Studio demo

Live demo: https://gikomax13.github.io/looma-fabric-demo/

A responsive concept storefront for an independent fabric studio. Product details, pricing, studio history and contact information are illustrative. The enquiry form validates locally and displays a demo confirmation; it does not send or store personal information.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Vite serves the site at [http://127.0.0.1:5173](http://127.0.0.1:5173). Use `npm run build` to create the production bundle.

## Interaction notes

- Filter the featured fabrics by material, open a product for colour and quantity options, and add it to the sample kit.
- The contact form is a front-end demo and never transmits the entered fields.
- The hero scene is rendered with Three.js. A local CSS fabric treatment remains available if WebGL cannot start.
- The opening animation plays once per session. “Replay intro” in the footer restarts it; reduced-motion settings skip it.
