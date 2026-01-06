# Portfolio Website

A simple, responsive personal portfolio built with HTML, CSS, and JavaScript.

## Customize
- Replace text (name, role, descriptions) in [index.html](index.html).
- Swap avatar image: add your photo at [assets/images/avatar.jpg](assets/images/avatar.jpg) and update the `img` src in [index.html](index.html#L32).
- Update social links and email.
- Edit styles in [styles.css](styles.css).
- Add/remove JS behaviors in [script.js](script.js).

## Run Locally
You can open [index.html](index.html) directly in your browser, or run a local server for smooth routing and caching.

### Option 1: Python (built-in on many systems)
```bash
# From the project folder
python -m http.server 5500
# Then visit http://localhost:5500/
```

### Option 2: Node.js
```bash
# Using http-server (temporary, without installing globally)
npx http-server -p 5500

# Or using serve
npx serve -p 5500
```

## Notes
- The contact form uses `mailto:` for demo purposes. Replace with Formspree or your own backend.
- Mobile menu and smooth scrolling are included.
- IntersectionObserver handles simple reveal animations.
