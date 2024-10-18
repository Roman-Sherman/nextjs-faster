## NextMaster

A  replica of [McMaster-Carr](https://www.mcmaster.com/) using Next.js and AI generated content by @ethanniser, @RhysSullivan and @armans-code

### Design notes

- Uses [Next.js 15](https://nextjs.org/)
  - All mutations are done via [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Uses [Drizzle ORM](https://orm.drizzle.team/docs/overview) on top of [@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)
- Images storied on [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- Used [v0](https://v0.dev) to generate all initial UIs, check out some of the threads we were particularly impressed by:
  - [v0 makes pretty impressive search dropdown without a library](https://v0.dev/chat/lFfc68X3fir?b=b_1o4tkiC9EEm&p=0)
  - [recreating 'order' page](https://v0.dev/chat/RTBa8dXhx03?b=b_4RguNNUEhLh)
  - [recreating 'login' page](https://v0.dev/chat/tijwMFByNX9?b=b_XnRtduKn2oe)
- [PPR](https://vercel.com/blog/partial-prerendering-with-next-js-creating-a-new-default-rendering-model) is used to precompute the shells of pages
  - When deployed, these are served statically from the edge
  - This makes TTFB faster and speeds up CSS/fonts while origin streams

#### AI

- Used [OpenAI](https://openai.com)'s `gpt-3.5-turbo` to generate product categories, names and descriptions
- [GetImg.ai](https://getimg.ai) was used to generate product images via the `stable-diffusion-v1-5` model

### Deployment

- Make sure the Vercel project is connected to a Vercel Postgres (Neon) database and Vercel Blob Storage
- Run `pnpm db:push` to apply schema to your db

### Local dev

- Run `vc env pull` to get a `.env.local` file with your db credentials.
- Run `pnpm install` && `pnpm dev` to start developing
- For DB migrations with `drizzle-kit`:
  - Make sure `?sslmode=required` is added to the `POSTGRES_URL` env for dev
  - Run `pnpm db:push` to apply schema to your db

### Performance

[PageSpeed report](https://pagespeed.web.dev/analysis/https-next-master-vercel-app/4181robe62?form_factor=mobile)

![image](https://github.com/user-attachments/assets/ccca9cb4-eedc-4415-b225-db9ee82ebf27)


