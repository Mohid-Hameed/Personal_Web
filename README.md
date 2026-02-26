This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project structure (Portfolio)

- `src/app/` – Next.js App Router: `layout.js`, `page.js`, `globals.css`
- `src/components/` – UI:
  - `layout/` – `Header`, `Footer`, `PortfolioLayout`
  - `portfolio/` – `Hero`, `SectionCard`, `PortfolioContent`, `sections/` (Summary, Experience, Education, Skills, Projects, Contact)
  - `common/` – `SectionSkeleton`, `ListSectionSkeleton`, `HeroSkeleton`, `LazySection`
  - `providers/` – `ThemeRegistry` (MUI cache + `PortfolioProvider`)
- `src/context/` – `PortfolioContext` (portfolio data + theme)
- `src/hooks/` – `usePortfolioData` (fetches from API or uses demo data)
- `src/lib/` – `api.js` (fetch portfolio + theme from backend)
- `src/theme/` – `createTheme.js` (MUI theme from backend theme payload)
- `src/constants/` – `DEMO_PORTFOLIO_DATA` (set and use for demo until backend is ready)
- `src/styles/` – `animations.css` (fadeInUp, shimmer, stagger)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
