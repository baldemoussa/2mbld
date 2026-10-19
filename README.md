# Mamadou Moussa BALDE — Portfolio

A single-page portfolio for Oracle development, enterprise modernization, and full-stack software engineering. The public page reads published content from the API. Visitors can send a message. Opening the page records one distinct visit for that browser during the current month. An administrator can read the messages and the monthly visitor counts.

The folders are named `Back-end` and `Font-end`. The full description of the page, data, and API is in `DOCUMENTATION.md`.

## Requirements

- Node.js 20 or newer
- MongoDB connection string

## Run locally

From `Back-end`:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set the variables. The API listens on port `3001`.

From `Font-end`:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Leave `VITE_API_URL` empty so the Vite dev server proxies `/api` to the API. That keeps the admin session cookie on the same site.

Seed the published content from `Back-end`:

```bash
npm run seed
```

The seed is safe to run again. It replaces the profile, skills, employment, education, volunteer entries, and selected work for the records in `Back-end/src/seed/portfolio.ts`. It also drops the old collections `projects`, `skills`, `timelineitems`, `users`, `messages`, and `adminusers` when they still exist. It does not delete contact messages or visit counts.

## Environment

`Back-end/.env`:

- `PORT` — API port, default `3001`
- `NODE_ENV` — `development` or `production`
- `MONGODB_URI` — MongoDB connection string. `MONGO_URI` is also accepted.
- `CLIENT_ORIGIN` — frontend origin, no trailing slash. Default `http://localhost:5173`.
- `JWT_SECRET` — at least 16 characters. Used for the admin session cookie.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` — the single administrator login. The password must be at least 8 characters. These values are checked at sign-in and are not copied into the database. There is no public registration.

`Font-end/.env`:

- `VITE_API_URL` — leave empty locally. Set it to the API origin in production when the site and API are on different hosts.

Do not commit `.env` files.

## Administrator

Open `http://localhost:5173/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `Back-end/.env`. Restart the API after changing those values. The page lists distinct visitors by month, newest month first, with country and city when the network address can be identified. Then it lists the contact messages. Each browser is counted once during a UTC month. A reload does not add another count. The next month, another browser, or cleared site data counts again. Messages can be marked New, Read, Replied, or Archived. The public site cannot list messages or visitor counts.

## Checks

From `Back-end`:

```bash
npm test
npm run typecheck
npm run build
```

From `Font-end`:

```bash
npm run lint
npx tsc -b
npm run build
```

`npm start` in `Back-end` runs `node dist/server.js`, so run `npm run build` before a production start. Local development uses `npm run dev` and does not need the `dist` folder.

## Published content

Edit `Back-end/src/seed/portfolio.ts`, then run `npm run seed`.

- Profile: Mamadou Moussa BALDE, Philadelphia, Pennsylvania, lebaldem2@gmail.com.
- Portrait: `Font-end/public/images/profile.jpg`, stored as `/images/profile.jpg`.
- Resume: [Google Drive](https://drive.google.com/file/d/1rG-ISGIcCkcbJP1l-nsGz_ydsryQkqGE/view?usp=sharing). The Download Resume button opens that file in a new tab.
- GitHub: `https://github.com/baldemoussa`
- LinkedIn: `https://www.linkedin.com/in/2mb/`
- The phone number stays off the page. It remains inside the downloadable resume.
- Per Scholas — AI native Software Engineering Training, Philadelphia, PA, October 2026, Completed.
- University of Conakry — Bachelor in Computer Science, Completed. The page shows the Diplôme de Maîtrise (2010) and the World Education Services evaluation of October 9, 2024: U.S. bachelor's equivalency, 133 semester credits, GPA 3.92.
- Community involvement is listed under Education, all from The Welcoming Center.
- Selected work is eight public apps. Their images live in `Font-end/public/images/works/`.

## Deploy on Render

The site and the API run as one Render web service. In production the API serves the built page, including `/admin`. Leave `VITE_API_URL` empty so the browser calls `/api` on that same address.

1. Create an empty GitHub repository named `portfolio` under `baldemoussa`. Do not add a README there.
2. Push this folder to that repository. Do not commit `Back-end/.env` or `Font-end/.env`.
3. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`) so Render can connect.
4. In Render, create a Web Service from that repository. The root `render.yaml` sets the build and start commands. Choose the free instance to try it, or a paid instance if the site should stay awake. The free instance sleeps, and the first visit after sleep waits for the API.
5. Set these environment variables on the service. Copy the secret values from `Back-end/.env`. Use `MONGODB_URI` for the value currently stored as `MONGO_URI`.
   - `NODE_ENV` = `production`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `CLIENT_ORIGIN` = the Render address, with `https://` and no trailing slash. Add this after Render shows the address, then redeploy.
6. Open the Render address. Sign in at `/admin` with the same administrator email and password.
