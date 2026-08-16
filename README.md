This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Page builder and navigation

Administrators can manage content from:

- `/admin-panel/pages` for page drafts, previews, publishing, and custom pages.
- `/admin-panel/navigation` for top-level link labels, visibility, and ordering.

Page metadata is stored in the Firestore `pages` collection (or the collection named by the optional `NEXT_PUBLIC_PAGES_COLLECTION` variable). Draft and published content are stored in each page document's `versions` subcollection. Uploaded images use Firebase Storage under `page-media/{pageKey}`. Image blocks also accept an existing local or HTTPS URL.

The 12 registered public routes are thin shells rendered from ordered page blocks. Package and flight-fare blocks query their existing live collections, so matching records appear without republishing the page. The checked-in generated seed is used only as a resilience fallback when Firestore is unavailable.

Page migration commands:

- `npm run pages:migrate` validates existing versions, media files, conflicts, and document sizes without writing.
- `npm run pages:migrate:apply` uploads deterministic migrated media and writes draft/published versions.
- `npm run pages:migrate:content` writes content while retaining existing public image URLs when Storage access is unavailable.

Package tags replace the legacy package-section/heading assignments. Package card categories remain separate and continue to use each package's `sectionData` rows. The new shared registries default to the `package_tags` and `package_categories` Firestore collections; they can be overridden with `NEXT_PUBLIC_PACKAGE_TAGS_COLLECTION` and `NEXT_PUBLIC_PACKAGE_CATEGORIES_COLLECTION`.

- `npm run package-tags:migrate` performs a server-backed, read-only dry run and reports every tag, package, and page-version write.
- `npm run package-tags:migrate:apply` applies the validated migration in Firestore batches while retaining legacy section data for rollback.

Run the dry run immediately before apply. The command fails instead of using Firebase's offline cache when the backend is unavailable.

The migration replaces exactly one `legacy-page` marker and preserves blocks around it. Versions containing unrelated content without that marker are rejected instead of overwritten. A later successful `pages:migrate:apply` can refresh only migrated image URLs after Storage permissions are corrected.

The project intentionally retains its existing client-side admin login. Firestore and Storage rules must therefore remain compatible with the current client writes; migrate to Firebase Authentication and restrictive rules before treating the admin area as a security boundary.
