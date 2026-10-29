# Manana Mex Brekkie website

Concept website for the "Who Said Burritos Sleep In?" breakfast campaign
(MMCC2030, Group 7, Macquarie University). Manana Mex is a fictional brand.

## Open it

1. Unzip the folder.
2. Double-click `index.html`. It opens in your browser.

Nothing needs to be installed and no server is needed. An internet connection
is only used for the Google Fonts. Offline, the site still works with
fallback fonts.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | All page content (text, sections, buttons) |
| `css/styles.css` | All styling. Brand colours and fonts are the variables at the top |
| `js/app.js` | Menu, order bag, store finder, live Sydney clock, page switching |

## Pages

Each page has its own address, so you can link straight to it:

- `index.html#home` Home
- `index.html#menu` Brekkie menu
- `index.html#one-hand` One hand (packaging)
- `index.html#order` Order ahead
- `index.html#find` Find us
- `index.html#mascot` Mananito
- `index.html#faq` FAQ

## Common edits

- **Menu items and prices:** edit the `MENU` list in `js/app.js`.
- **Restaurants:** edit the `STORES` list in `js/app.js`.
- **TikTok episodes:** edit the `EPS` list in `js/app.js`.
- **Breakfast hours:** change `START` (360 = 6:00am) and `END` (630 = 10:30am)
  in `js/app.js`. Values are minutes after midnight.
- **Colours:** change `--yolk`, `--salsa`, `--ink` and the other variables at
  the top of `css/styles.css`.

Save files as UTF-8 so characters like the dash in "6:00–10:30" display correctly.

## Notes

- Checkout is a demo. Nothing is charged and no order is sent anywhere.
- The bag is remembered in the browser on the same device only.
- To put the site online, upload the whole folder to any static host,
  for example GitHub Pages or Netlify.
