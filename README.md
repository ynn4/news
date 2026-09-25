# Morocco Education Briefing — News Site

A React + Vite news site. This README covers the final architecture, how
content updates work, how to use the JSON validator, and what whoever
deploys this needs to know.

## How content updates work

`news.jsx` does **not** import `news.json` at build time. Instead, it
fetches `/news.json` from the server at runtime (see the `useEffect` near
the top of the `News` component in `news.jsx`).

This means:

- **Updating the news = replacing one file on the server** (`public/news.json`
  in this repo, served as `/news.json` on the live site). No rebuild, no
  redeploy, no code changes.
- The file only needs to be swapped wherever the app is being served from.
  It works the same way regardless of hosting provider.
- Whoever writes news content only ever needs to touch `public/news.json`.
  They never need access to `news.jsx`, the build tooling, or anything else
  in this repo.

### Why this matters

If `news.json` were imported normally (`import DATABASE from './news.json'`),
it would get bundled into the compiled JavaScript. Any change to the news
would require rebuilding and redeploying the whole app, and — worse — a
single JSON syntax mistake would fail the entire build and could take the
whole site down (this depends on the host; not all hosts protect against
that).

With the runtime-fetch approach, `news.json` is just a static file. A
malformed `news.json`:
- **Does not** break the app shell, the build, or anything in `news.jsx`.
- **Does** break the news feed for every visitor (they'll see a short
  fallback message) until a valid file is back in place.
- Returning visitors on the same browser get a soft cushion: the last
  successfully-loaded news is cached in `localStorage` and used as a
  fallback if the current fetch fails. This does **not** help first-time
  visitors or visitors on a different device — it's a partial mitigation,
  not a substitute for validating before publishing (see below).

## The real safeguard: `validate-news.js`

Because a bad file can still take the news feed down for every visitor, the
file must be **checked before it ever becomes the live `public/news.json`**.
`validate-news.js` is a standalone Node script for exactly this — it has no
dependency on the rest of the build, and doesn't require installing anything
beyond Node itself.

### What it checks

1. **JSON syntax** — the file parses at all.
2. **Schema**, per article:
   - `image` — present, string
   - `tab` — non-empty array, values must be one of `home`, `public`, `private`
   - `category` — one of `cat1`, `cat2`, `cat3`, `cat4`
   - `sidebar` — boolean
   - `featured` — boolean, if present
   - at least one of `en` / `fr` / `ar`, each with non-empty `title`, `meta`,
     and `content` strings

### How to run it

```bash
node validate-news.js path/to/submitted-news.json
```

- Exit code `0` and a `✓ Valid — N article(s) checked, safe to publish.`
  message → safe to copy over the live `public/news.json`.
- Exit code `1` and a list of specific problems (which article, which field,
  and why) → **do not publish**. Send the error list back to whoever wrote
  the file.

### Recommended publishing workflow

Whoever ends up responsible for deployment should treat this as a gate, not
an optional step. This can be done by hand, or automated — two ready-made
options are included:

**Option A — automated, if the workflow is git-based** (e.g. the writer's
file lands via a commit/PR, and Vercel or similar stays connected to the
repo): `.github/workflows/validate-news.yml` runs `validate-news.js`
automatically on every push/PR that touches `public/news.json`. Set it as a
**required status check** (GitHub repo Settings → Branches → branch
protection rule on `main`) and a bad file literally cannot be merged — no
human has to remember to run anything.

**Option B — automated, for any other handoff** (email, upload, shared
folder — whatever channel the writer uses): `publish-news.sh` wraps
"validate, then copy only if valid" into one command:

```bash
./publish-news.sh path/to/submitted-news.json public/news.json
```

It exits `0` and copies the file only if validation passes; otherwise it
exits `1`, prints the errors, and leaves the live file untouched. Wire this
into whatever publishing step ends up being used (a manual command, a cron
job watching a drop folder, an upload endpoint — anything that can shell out
to a script).

**Option C — fully manual**, if neither of the above fits the eventual
setup:

1. Receive the updated JSON file from the news writer.
2. Run `node validate-news.js <that-file>`.
3. Only if it passes: replace `public/news.json` (and `dist/news.json` if
   serving from a `dist/` folder) with the new file.
4. If it fails: don't publish — share the error output with the writer.

Nothing about `news.jsx` needs to change no matter which option is used.

## Deployment

Standard Vite project — works on any static host.

```bash
npm install
npm run build     # outputs to dist/
npm run preview   # serve dist/ locally to sanity-check before deploying
```

`dist/` contains everything needed to serve the site: `index.html`, the
compiled JS/CSS in `dist/assets/`, and `dist/news.json` (copied as-is from
`public/news.json`, unmodified by the build).

**Updating content after the site is live:** overwrite `news.json` on the
server (`dist/news.json`, or wherever it ends up being served from) with a
validated file. This does not require re-running `npm run build` — the app
fetches it fresh at runtime.

**Caching note:** if the host serves files through a CDN or reverse proxy,
make sure `news.json` isn't cached for a long time at that layer (an HTTP
`Cache-Control` header on that file, e.g. `no-cache` or a short `max-age`).
Without this, visitors may keep seeing an old version of the news for a
while even after the file has been replaced on the server. This is a
server/hosting configuration concern, not something to fix in the app code.

## Project structure

```
index.html          entry HTML
news.jsx             main React component (fetches /news.json at runtime)
public/news.json     the news content — the ONLY file a non-technical
                      editor should ever touch
validate-news.js     run this on any updated news.json before publishing it
publish-news.sh      validate + publish in one command (see above)
.github/workflows/validate-news.yml   auto-validates news.json on push/PR
src/main.jsx         app bootstrap, theme toggle
src/index.css        global styles (Tailwind)
vite.config.js, tailwind.config.js, postcss.config.js   build tooling config
```
