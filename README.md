# ClassChat Download Website

A minimal, single-page download website for the **ClassChat** Android app.

## What this is

This website lets users:
- See the ClassChat app name and icon
- Read a short description
- Click **Download ClassChat** to get the latest APK automatically from GitHub Releases
- Contact via Instagram or email from the footer

## Files

| File | Purpose |
|------|---------|
| index.html | Main (only) page |
| style.css | All styles – responsive, mobile-first |
| pp.js | Fetches latest GitHub Release APK URL dynamically |
| icon.jpg | App icon / favicon |
| 
etlify.toml | Netlify deployment config |

## How the download works

The **Download ClassChat** button does **not** hard-code an APK URL.

On page load, pp.js calls:
`
GET https://api.github.com/repos/iitiankrishnaa-svg/ClassChat/releases/latest
`

It reads the first .apk asset from the response and wires it to the button.  
Every time you publish a new GitHub Release on the Android repo, visitors automatically get the newest APK — **zero website changes needed**.

## Deploy to Netlify

### One-time setup
1. Push this folder to a new GitHub repository (e.g. ClassChat-Website).
2. Log in to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**.
3. Select your ClassChat-Website repo.
4. Build command: *(leave empty)*
5. Publish directory: . (a single dot)
6. Click **Deploy site**.

After the first deploy, every git push to your main branch will automatically re-deploy the website.

## Releasing a new APK version

1. Build your APK in Android Studio.
2. Go to your Android GitHub repo → **Releases** → **Draft a new release**.
3. Create a new tag (e.g. 1.1.0).
4. Upload the new .apk file as a release asset.
5. Publish the release.

That's it — the website button now points to the new APK automatically.

## Development (local preview)

Open index.html directly in a browser for a quick preview.  
For full functionality (GitHub API fetch), serve with a local server:

`ash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
`

Then visit [http://localhost:8080](http://localhost:8080).
