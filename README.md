# co-studio

Portfolio website for **co-studio** — solo studio for web, apps, design & video. Built by Corneliu Secrieri, Vienna.

Live stack: React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · React Router · i18next (EN / DE / RO).

## Features

- Editorial home page with projects, services, and about teaser
- Full **About** page with CV download and booking link
- **Contact form** (Web3Forms → your inbox)
- **Google Calendar** appointment booking
- Legal pages (Impressum & Datenschutz), cookie notice, 404 page
- Custom cursor, scramble text, animated section numbers

## Local development

```bash
npm install
cp .env.example .env   # add your keys
npm run dev
```

### Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_CALENDAR_URL` | Google Calendar appointment schedule URL |
| `VITE_WEB3FORMS_ACCESS_KEY` | [Web3Forms](https://web3forms.com) access key for contact form |

Never commit `.env` — it is gitignored.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Works on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any static host. Set the environment variables above in the hosting dashboard.

## License

Private — © co-studio · Corneliu Secrieri
