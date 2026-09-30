# Update your existing GitHub / Vercel portfolio

This package contains the complete updated source, including your transparent portrait, light/dark themes, resume, LinkedIn and Topmate links. All 14 project pages remain included.

1. Extract the ZIP and open the `gaurav-portfolio` folder.
2. Open the existing GitHub repository connected to your Vercel portfolio. Use **Add file → Upload files** at the repository root.
3. Drag the contents of `gaurav-portfolio` into the upload area. Upload the `src`, `scripts` and `public` folders with their contents, plus the root files. Preserve the folder structure. Do not upload the ZIP or nest everything inside a new `gaurav-portfolio` folder: `package.json` must remain at the root.
4. Commit to the branch Vercel uses for production, with a message such as “Update portrait, theme and contact links”. Existing files with the same paths are replaced.
5. If your Vercel project is connected to that repository and automatic deployments are enabled, it will rebuild. Wait for the new deployment to become Ready, then open https://gaurav-sen-portfolio.vercel.app/.

Use the existing Vercel project. Build Command: `npm run build`. Output Directory: `dist`. Framework: Other. Node.js: 22 or newer. Keep existing production environment variables. For SEO, `SITE_URL` should be `https://gaurav-sen-portfolio.vercel.app`.

The package contains source files; Vercel generates the website during its build. Do not edit generated HTML in `dist`.

If you prefer only changed files, replace these paths from this package:
- `src/site.json`
- `scripts/build.mjs`
- `scripts/check.mjs`
- `scripts/serve.mjs`
- `public/assets/theme.js`
- `public/assets/themes.css`
- `public/assets/gaurav-portrait.webp`
- `public/assets/sun.svg`
- `public/assets/moon.svg`
- `public/assets/ICON_LICENSE.txt`
- `README.md`

After deployment, check the theme button, mobile menu, Resume, LinkedIn, Let’s talk and a project page. If old content remains visible, refresh the page after confirming the latest deployment is Ready.
