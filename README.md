# Redirect Cloudflare

A modern web interface for managing Cloudflare **Page Rules** and easily
creating **Redirect Shortcuts**, built with [Astro](https://astro.build/) and
[React](https://react.dev/).

## 🚀 Characteristics

This project provides a visual tool for:

- 🛠️ Listing, creating, and deleting redirect rules (`Page Rules`) on your
  Cloudflare domain.
- ⚡ Adding custom shortcuts (such as `/github` →
  `https://github.com/youruser`).
- 💡 Intuitive React interface, easily deployable as a SPA or integrated into an
  existing site.

## 🧰 Technologies Used

- [Astro](https://astro.build/) – Lightweight and flexible framework for
  websites.
- [React](https://react.dev/) – For interactive components within Astro.
- [Cloudflare API](https://developers.cloudflare.com/api/resources/page_rules/methods/list/)
  – For managing page rules.
- [Tailwind CSS](https://tailwindcss.com/) – Modern and responsive styles.

## 🧭 Initialize

1. ```bash
   git clone https://github.com/zincognity/redirect-cloudflare.git
   cd redirect-cloudflare
   ```

2. Set the environment variables.

- CLOUDFLARE_TOKEN=(you can get one at
  <https://dash.cloudflare.com/profile/api-tokens>)

> [!NOTE]
> Check that the token permissions have all the accepted permissions in
> [Cloudflare Docs](https://developers.cloudflare.com/api/resources/page_rules/methods/list/)

- CLOUDFLARE_EMAIL=(your email account for Cloudflare)
- ZONE_ID=(you can view on
  <https://dash.cloudflare.com/4ced315a6db9ab9551778e8d8bdbf2e1/incognity.link/rules/page-rules> >
  display API)
- AUTH_CODE=(ej: anycodeforyourauthentication)
- PUBLIC_URL=(ej: <https://incognity.link>)

## 🔗 Useful resources

- Documentation of
  [URL Redirect Rules in Cloudflare](https://developers.cloudflare.com/rules/url-forwarding/?utm_source=chatgpt.com)

- Best practices for
  [redirects in Cloudflare](https://noamlerner.com/posts/cloudflare_page_rule/?utm_source=chatgpt.com)

- Comparisons of
  [Page Rules vs Workers](https://developers.cloudflare.com/rules/url-forwarding/?utm_source=chatgpt.com)
