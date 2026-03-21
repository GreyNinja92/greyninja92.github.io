# Saksham Khatod — Portfolio

Personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production static build → out/
npm run start    # Serve production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Deployment

The site uses `output: "export"` for fully static output, compatible with any static host.

- **Vercel / Amplify** — connect the repo and deploy; no extra config needed
- **GitHub Pages** — push to `main`; the included Actions workflow (`.github/workflows/deploy-gh-pages.yml`) builds and deploys automatically
