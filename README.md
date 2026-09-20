# Stickers Makers

Customer-facing catalogue and lightweight administration interface for Stickers Makers. The frontend is built with React, Vite, Tailwind CSS, and a REST API.

## Local development

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env.local`.
3. Set `VITE_API_BASE_URL` to the backend API URL and `VITE_ASSET_BASE_URL` to the backend origin used for uploaded images.
4. Start the app with `npm run dev`.

## Quality checks

- `npm run lint` checks JavaScript and React code.
- `npm run build` creates the production bundle.
- `npm run check` runs both checks.

## Deployment

The production build requires `VITE_API_BASE_URL`. Set it to the publicly reachable backend API URL, including `/api`. Set `VITE_ASSET_BASE_URL` to the same backend's origin when uploaded images are hosted there. Ensure the backend permits requests from the deployed frontend origin.

The included Netlify configuration provides SPA routing, long-lived caching for fingerprinted assets, and baseline security headers.
