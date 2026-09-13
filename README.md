# EXSOLVIA frontend

## Rate limiting

All `/api/*` requests pass through a distributed sliding-window limiter. It uses
Upstash Redis REST, so the counter is shared by every serverless instance. The
middleware applies a permissive default of 300 requests/minute/IP, with stricter
policies for login (5/15 minutes/IP), contact submissions (5/hour/IP), and
job applications (5/hour/IP). Applications also receive a 5/hour/email limit;
authenticated admin PII reads are limited to 60/minute/admin and CMS mutations
to 30/minute/admin. Blocked requests return `429`, `Retry-After`, and
standard `RateLimit-*` response headers. Redis configuration failures return
`503` in production rather than silently falling back to per-instance memory.

Configure production with:

```env
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token
RATE_LIMIT_NAMESPACE=exsolvia:rate-limit
```

`RATE_LIMIT_NAMESPACE` is optional and useful for separating environments that
share a Redis database. Local development intentionally permits requests when
the Redis variables are absent; set the variables locally to exercise the real
distributed path. Run `npm test` to execute the burst and unavailable-store
security checks.

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
