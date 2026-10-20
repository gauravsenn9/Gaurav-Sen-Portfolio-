# Update your existing Vercel portfolio

This is the original Product Lab static portfolio, with WorkRadar and SAHI looping videos added below the homepage introduction. It retains all 15 case studies and the existing design.

1. Download and extract this ZIP. Upload its CONTENTS, not the ZIP itself.
2. Open the existing GitHub repository connected to gaurav-portfolio-seven-gamma.vercel.app.
3. On the repository's main page, choose Add file > Upload files.
4. Drag the extracted folders and files into the upload area. package.json and vercel.json must be at the repository root, alongside src, scripts and public. Uploading files at the same paths replaces the earlier versions. Do not delete unrelated files.
5. Enter a commit message such as "Add homepage product walkthroughs" and choose Commit changes on the branch Vercel deploys.
6. Vercel should start a deployment if automatic Git deployments are enabled. Open the deployment in Vercel and wait for Ready before checking the homepage.

No new repository or Vercel project is needed. No terminal commands are required for this upload workflow.

Vercel settings for this version:
- Framework preset: Other
- Build command: npm run build
- Output directory: dist
- Root directory: the directory containing package.json (normally leave blank)
- If a SITE_URL environment variable exists, set it to https://gaurav-portfolio-seven-gamma.vercel.app

The archive contains source files; Vercel generates dist automatically. Do not upload these files into the newer React/Flash portfolio repository.

Video behavior:
- Muted, inline, looping playback while visible.
- Pauses offscreen and when the browser tab is hidden.
- No visible video controls. Existing Motion toggle controls automatic motion.
- No automatic playback with reduced-motion or supported data-saving preferences.
- Static poster images appear before playback. Browsers can block autoplay; The poster remains visible if autoplay is blocked.
- Two columns on desktop, one on mobile.
- MP4 and WebM sources are included. Keep both formats when replacing videos.

Files changed: scripts/build.mjs, src/site.json (production canonical URL), public/assets/videos.css, public/assets/videos.js, public/assets/videos/* and this guide.

Validation: production build, internal references/metadata check, and the existing root/subpath/preview tests passed. Interactive playback has not been verified in a real browser in this environment. After deployment, test looping playback, Motion off, mobile playback, both color themes and case-study links.

WhatsApp Community Directory is included as project 15 with its three Drive research files.
