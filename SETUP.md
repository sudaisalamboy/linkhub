# Setup — LinkHub

## Prerequisites
- Node.js 18+ or Bun
- npm/bun

## Installation

```bash
git clone https://github.com/sudaisalamboy/linkhub.git
cd linkhub
bun install   # or npm install
```

## Running Locally

```bash
bun run dev   # or npm run dev
```

App runs on http://localhost:3001

## Building for Production

```bash
bun run build
bun run start
```

## Project Structure

```
linkhub/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/page.tsx   # Admin dashboard
│   │   ├── [username]/page.tsx  # Public profile
│   │   ├── api/
│   │   │   ├── profile/[username]/route.ts
│   │   │   ├── stats/route.ts
│   │   │   └── links/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── lib/
│       └── store.ts             # In-memory data store
├── public/preview/preview.png
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3001 in use | Change port in package.json |
| Blank page | Check console for errors |
| API 404 | Ensure API routes are in src/app/api/ |

---
Made by Sudais Alam
