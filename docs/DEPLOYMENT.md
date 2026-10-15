# Portfolio deployment

## Public URL

After the first successful GitHub Pages deployment:

`https://shizu20211.github.io/26_PortfolioWeb/`

## Deployment flow

1. Verify the site locally with `npm run build`.
2. Commit the intended source files and assets.
3. Push the `air` branch to `origin`.
4. GitHub Actions builds the site and publishes the `dist` artifact.
5. Check the `Deploy portfolio to GitHub Pages` workflow in the repository's Actions tab.

## One-time GitHub setting

Open the repository on GitHub, then go to `Settings → Pages → Build and deployment` and select `GitHub Actions` as the source.

## Manual deployment

The same workflow can be started from `Actions → Deploy portfolio to GitHub Pages → Run workflow`.

## Local mobile testing

Run `npm run dev -- --host 0.0.0.0`, then open the Network URL on a phone connected to the same Wi-Fi network.

## Notes

- Vite uses `/` locally and `/26_PortfolioWeb/` in the GitHub Actions build.
- `dist/404.html` is generated during deployment so Vue history routes can recover after a direct visit or refresh.
- Resume PDF links use `import.meta.env.BASE_URL` and work in both environments.
- Files in `dist` are generated output and must not be committed.
