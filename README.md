# Niveshaka-bandhu — GitHub Pages Site

A clean, dark-theme investor dashboard website for the **Niveshaka-bandhu** Google Sheet.

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Main HTML — 5 tab sections |
| `style.css` | Dark editorial theme (navy + saffron + gold) |
| `app.js` | Navigation, market card data, ticker bar |

## 🚀 Deploy to GitHub Pages (3 steps)

1. **Create a new GitHub repo** (e.g. `niveshaka-bandhu`)
2. **Upload all 3 files** (`index.html`, `style.css`, `app.js`) to the root
3. Go to **Settings → Pages → Source → main branch / root** → Save

Your site will be live at:
`https://YOUR-USERNAME.github.io/niveshaka-bandhu/`

---

## 🔧 One-time setup: Add your sheet Tab GIDs

Each Google Sheet tab has a unique `gid` number. To show each tab's data in its section:

1. Open your Google Sheet
2. Click each tab (Global Indices, Market Data, IPO Corner, etc.)
3. Look at the URL: `...edit#gid=XXXXXXX`
4. Copy that number
5. Open `app.js` and fill in the `TAB_GIDS` object:

```js
const TAB_GIDS = {
  'global-indices': '123456',   // ← paste your gid here
  'market-data':    '789012',
  'ipo':            '345678',
  'currencies':     '901234',
  'ace-investors':  '567890',
};
```

---

## 📊 How live data works

- Each section embeds your **public Google Sheet** directly via `htmlview`
- The embed is styled with CSS `filter: invert()` to match the dark theme
- The ticker bar and market summary cards use **seed data from the sheet's index page**
- For fully live card data, you can connect the [Google Sheets JSON API](https://developers.google.com/sheets/api)

---

## ⚠️ Disclaimer

Quotes may be delayed up to 20 minutes. Data from Google Finance.  
For informational purposes only — not investment advice.

---

*Built for [Niveshaka-bandhu](https://tinyurl.com/Niveshaka-bandhu) · Indian Investor's Friend*
