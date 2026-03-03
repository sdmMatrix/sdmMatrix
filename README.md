# ERP Lite (My Own Version)

This repository now includes a simple **ERP-style web app** built with plain HTML, CSS, and JavaScript.

## Features
- Dashboard cards with live totals:
  - total products
  - stock value
  - total sales
  - total employees
- Inventory module (add/delete products)
- Sales module (record/delete invoices)
- Employee module (add/delete staff)
- LocalStorage persistence so data stays after refresh
- Demo data loader and full reset button

## Run locally
Because this is a static project, you can run it with any local server.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project files
- `index.html` → ERP layout and forms
- `style.css` → styling and responsive grid
- `app.js` → state handling, rendering, and persistence
