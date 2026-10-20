# Gaurav Sen — Product Lab

A complete product-management portfolio, ready to upload to GitHub and deploy. Light and dark themes, a background-free professional portrait, a searchable project directory, and 14 individual case-study pages. Built with static HTML, CSS and JavaScript using a dependency-free Node build.

## Updating your existing site

Start with `UPDATE_INSTRUCTIONS.md` for a browser-only upload to your existing GitHub repository and Vercel project. This update adds native CSS/JavaScript motion and an expandable homepage collection, without paid services or new runtime packages.

## Start here

1. Extract the ZIP. Open the `gaurav-portfolio` folder.
2. Upload **the contents of that folder** to the root of a new GitHub repository. `package.json` must be at the repository root. Include `.github/workflows/deploy-pages.yml` if using GitHub Pages; hidden folders can be missed by drag-and-drop uploads.
3. Follow either deployment option below. Vercel is the easiest option for this project.
4. Check the live homepage, a project page, the resume link and source links on a phone and desktop before sharing it.

The source code is in `src`, `public` and `scripts`. Deployment generates the `dist` folder with the correct production URLs.

## Deploy to Vercel

1. Create a GitHub repository and upload the project files.
2. In Vercel, add a new project and import that repository.
3. Use Framework Preset **Other**, Build Command `npm run build`, Output Directory `dist`, and Node.js **22.x** or newer. Leave Root Directory at the repository root. `vercel.json` already supplies the build/output settings.
4. Deploy. Once Vercel assigns your production domain, add a **Production** environment variable named `SITE_URL` containing that URL, for example `https://your-assigned-domain.vercel.app`. Then redeploy. If Vercel supplies `VERCEL_PROJECT_PRODUCTION_URL`, the build also uses that stable domain automatically; setting `SITE_URL` explicitly is preferable for a custom domain.
5. Leave `BASE_PATH` unset for a domain-root deployment. Leave `NO_INDEX` unset in production. Preview deployments are automatically marked noindex when `VERCEL_ENV` is provided.
6. Open `/sitemap.xml` and confirm its URLs use your public domain. Later commits to the connected production branch deploy updates.

Documentation: [Vercel Git deployments](https://vercel.com/docs/git) and [build configuration](https://vercel.com/docs/builds/configure-a-build).

## Deploy to GitHub Pages

1. Upload the files to a GitHub repository with a `main` branch, including the `.github` folder.
2. Open the repository's **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Later pushes to `main` trigger it automatically.
4. Open the published URL shown by the deployment job or Pages settings.

The workflow obtains the domain and repository subpath from GitHub Pages metadata. A project site such as `https://USERNAME.github.io/REPOSITORY/` therefore gets the correct navigation, asset URLs, canonicals and sitemap without hardcoding the repository name. If you configure a custom domain in Pages settings, run the workflow again and check the sitemap.

Documentation: [publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Upload using Git instead of the browser

Create an empty repository on GitHub first. In a terminal inside this folder, replace `YOUR_USERNAME` and run:

```sh
git init
git add .
git commit -m "Add product portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gaurav-portfolio.git
git push -u origin main
```

If Git asks for your identity, configure your own name and email. Sign in using GitHub's supported authentication flow. No credentials belong in this repository.

## Run locally

Install Node.js 22 or newer. No package installation is needed because the project has no dependencies.

```sh
npm run dev
```

Open `http://127.0.0.1:3000/`. Use a local server; double-clicking `dist/index.html` will not resolve the site's absolute asset paths correctly. Stop the server with Ctrl+C.

```sh
npm run build   # regenerate dist
npm run check   # links, metadata, sources and case-study structure
npm test        # domain-root, repository-subpath and preview deployment tests
npm run preview # serve the existing build
```

For a production-style local build on macOS/Linux:

```sh
SITE_URL=https://YOUR_PUBLIC_DOMAIN npm run build
npm run check
```

On Windows PowerShell:

```powershell
$env:SITE_URL = "https://YOUR_PUBLIC_DOMAIN"
npm run build
npm run check
```

The `.env.example` file documents the variables. The dependency-free build does **not** load `.env` files automatically: set variables in your terminal or hosting dashboard. With no production URL, local builds intentionally omit canonicals and the sitemap instead of inventing a domain.

## Edit your portfolio

| File | What to change |
| --- | --- |
| `src/site.json` | Name, contact email, location, resume URL, about text and production URL |
| `src/projects.json` | Project summaries, case-study sections, research scope, source links, images and featured status |
| `public/assets/style.css` | Colors, layout, typography and responsive breakpoints |
| `public/assets/app.js` | Mobile navigation, search, filters and case-study contents highlighting |
| `scripts/build.mjs` | HTML templates, page metadata and structured data |

Some homepage wording and brand labels are in `scripts/build.mjs`; changing `site.json` alone is not a complete rebrand. Update `updated` dates when you revise content. Keep image dimensions in project data aligned with actual files. Rebuild after edits. Edit source files rather than generated `dist` HTML.

Project cards link to `/projects/PROJECT-SLUG/`, which contains that project's full case study. Supporting reports, decks and videos open their original Drive links in a new tab. Keep the slugs stable after launch so shared links continue to work. This version links video files rather than embedding them, and does not add unverified hosted prototype URLs.

The “Let’s talk” buttons open https://topmate.io/gaurav_sen9/. LinkedIn opens https://www.linkedin.com/in/gauravsenn/. The resume opens the supplied Google Drive PDF. The separate email link uses `mailto:`; there is no contact-form backend.

The theme button follows the visitor’s device preference initially and remembers their light/dark selection. Styling is in `public/assets/themes.css`, behavior in `public/assets/theme.js`, and the transparent portrait is `public/assets/gaurav-portrait.webp`. Sun and moon icons are from Bootstrap Icons; their MIT license is included in `public/assets/ICON_LICENSE.txt`.

## SEO and accessibility

The build generates real HTML for every case study, unique titles/descriptions, one main heading per page, canonical URLs, XML sitemap, robots.txt, Open Graph/X metadata and JSON-LD. Content is readable without JavaScript; search and mobile navigation enhance it. Local fonts/assets, image dimensions and lazy loading keep the site lightweight. CSS includes mobile/tablet layouts, reduced-motion support, visible keyboard focus and a skip link.

Set your real `SITE_URL` before promoting the site. After launch, verify the sitemap and submit it through Google Search Console if desired. SEO structure supports crawling; it does not guarantee search rankings. A social preview image is not included in this version.

## Content and verification notes

- 14 case studies were drafted from the Airtribe project material. The source data retains 64 project-file mappings; public case pages show selected human-readable supporting documents.
- Course exercises, independent research, prototype demonstrations and proposed targets are labeled. Targets are not presented as shipped business results. Team work is credited where applicable.
- Brand names identify the products studied and do not imply employment or endorsement. Source-derived screenshots are included for relevant projects; confirm your right to publish supplied material.
- Supporting Drive files were accessible in the connected account, and project files had anyone-with-link sharing when checked. External access can change; logged-out visitor access was not independently tested in a browser.
- Automated checks passed for 17 HTML files, 649 local references, all 14 case studies, source mappings, unique metadata and parseable structured data. Three deployment tests passed for root hosting, GitHub repository subpaths and noindex previews.
- Browser checks covered desktop light/dark rendering, persistent theme selection, mobile navigation, and phone/tablet layouts without horizontal overflow. After deployment, verify external document links and project filters on the live domain.

This download is complete source code and deployment configuration. It has not been uploaded to your GitHub account or published to a live domain.
