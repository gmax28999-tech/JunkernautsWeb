# Junkernauts Website

Marketing site for Junkernauts junk removal. Plain HTML, CSS and JavaScript, with no build step.

```
index.html          the whole page
css/styles.css      all styling (brand colour = --hazard at the top)
js/main.js          mobile menu + quote form
images/             favicon and your photos
```

## To-do before launch

1. **Replace every `[BRACKET]` placeholder** in `index.html`: phone, email, city, towns, FAQ answers and payment methods. Search the file for `[`.
2. **Phone links**: replace `+10000000000` in the `tel:` and `sms:` links with your real number, digits only (e.g. `+15551234567`).
3. **Photos**: drop images into `images/` and swap each `<div class="photo-slot">` for an `<img>`. The comments in `index.html` show how.
4. **Google listing**: update the `LocalBusiness` block in the `<head>` with the same details.

## Connecting the quote form

The site has no server, so the form posts to [Formspree](https://formspree.io) (form ID `moedyyoj`), which emails each request to the address on the Formspree account. To switch forms, change the `action` on the `<form>` in `index.html`.

## Previewing locally

Open `index.html` in a browser, or use any static file server.

## Publishing (GitHub Pages, free)

1. Push to GitHub.
2. In the repo, go to **Settings → Pages**, set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site goes live at `https://gmax28999-tech.github.io/JunkernautsWeb/`. You can add a custom domain on the same page.
