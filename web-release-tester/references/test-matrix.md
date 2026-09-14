# Test matrix

Choose checks from the application's actual routes, controls, integrations, and risk. Mark inapplicable checks `Not tested` with a reason instead of silently omitting them.

## Build and runtime

- Production build; development or preview startup; route refresh and direct navigation; custom 404.
- Missing assets, broken imports, JavaScript exceptions, meaningful console warnings, unhandled promise rejections.
- Environment-variable absence and safe failure behavior; static-hosting fallback requirements.

## Functional behavior

- Header/footer, menus, buttons, links, anchors, tabs, accordions, modals, calculators, forms, and repeated clicks.
- Validation, loading, empty, success, retry, and error states; keyboard operation; back/forward history.
- Deep links, query parameters, email/WhatsApp handoffs, and preserved input after failure. A handoff opening does not prove delivery or receipt.

## Responsive behavior

At 360, 390, 768, 1024, and 1440 px when supported, inspect overflow, clipping, overlap, navigation, image scaling, section spacing, sticky/fixed widgets, form usability, and practical tap targets. Report unsupported widths as `Not tested`.

## Accessibility

Check one clear H1 per page, heading order, landmarks and skip link, keyboard/focus behavior, accessible names, labels and error association, alternative text, dialog focus, contrast, reduced motion, practical control sizes, screen-reader semantics, and no color-only meaning. Prefer observed behavior over class-name or source-pattern matches.

## SEO and discoverability

Check unique title/description, canonical, robots directives, valid `/robots.txt` and `/sitemap.xml`, Open Graph/social metadata, structured data, indexable route status, internal/broken links, preferred-host redirects, location relevance, duplicate/thin content, and search-safe rendering. Do not recommend mass-produced location pages or low-value AI content.

## Performance

When tooling supports it, record LCP, INP, CLS, asset weight, image format/size, lazy loading, font loading, render-blocking assets, repeated requests, and cache behavior. Label local laboratory results; do not present them as real-user data.

## Security, privacy, and integrations

Safely inspect browser-exposed secrets, sensitive URLs/logs, external-link safety, headers, privacy disclosures, dependency warnings, auth boundaries, API validation/errors, safe rate-limit behavior, retention/deletion behavior, and server-only credentials. For email, WhatsApp, analytics, chatbots, payments, AI, and external APIs, separate UI, configuration, failure-path, and authorized real-provider evidence. Never use live private data or mutate production state.
