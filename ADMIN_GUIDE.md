# AARSHI Website — Admin Guide
**For anyone managing the website. No coding experience needed for most tasks.**
**Live site: https://aarshiofficial.github.io/**

---

## 📁 File Structure

```
AARSHI_WEBSITE/
├── index.html          ← The entire website (one file — edit this for content)
├── css/style.css       ← All colours, fonts, layout
├── js/main.js          ← Animations, filters, lightbox, theme toggle
├── assets/             ← ALL images go here
│   ├── logo_dark.png           ← Logo for dark mode
│   ├── logo_light.jpg          ← Logo for light mode
│   ├── ob_*.jpg                ← Current OB (26-27) photos
│   ├── ob2526_*.jpg            ← Previous OB (25-26) photos
│   ├── gal_*.jpg               ← Gallery photos
│   ├── past_*.jpg              ← Past Events photos
│   ├── iicm_*.jpg              ← IICM gallery photos
│   ├── event_*.jpg/png         ← Event posters
│   └── mentor_*.jpg            ← Renowned faces photos
├── .github/workflows/deploy.yml ← Auto-deploy (do not touch)
├── README.md
└── ADMIN_GUIDE.md      ← This file
```

---

## 🔧 HOW TO EDIT

1. Download the repo from GitHub or open it in VS Code
2. Open `index.html` in any text editor
3. Use **Ctrl+F** to search for the text you want to change
4. Edit and save
5. Push to GitHub → site updates at **https://aarshiofficial.github.io/** in ~2 min

---

## 👥 CHANGING OFFICE BEARERS

### Step 1 — Add the new photo
Copy photo into `assets/` folder. Name it simply: `ob_firstname.jpg`

### Step 2 — Find the Team section
In `index.html`, press **Ctrl+F**, search for: `Current Office Bearers`

### Step 3 — Update each card
Each OB card looks like this:
```html
<div class="team-card">
  <div class="team-photo-wrap">
    <img src="assets/ob_chhandak.jpg" alt="Chhandak Dutta" class="team-photo" />
  </div>
  <div class="team-role">Secretary</div>
  <h3 class="team-name">Chhandak Dutta</h3>
  <a href="tel:6295076503" class="team-contact">+91 62950 76503</a>
</div>
```
Change: photo filename, alt name, role, name, phone number.

### Moving outgoing OBs to "Previous" section
Search for `Tenure 2025–26`. Copy a card there with updated details.
Also update the historical table (search: `All Past Office Bearers`).

---

## 📅 ADDING / REMOVING CURRENT EVENTS

### Add a new event poster card
1. Copy poster image to `assets/`, e.g. `event_newname.jpg`
2. Find the `poster-grid` section (search: `Current & Upcoming 2026`)
3. Copy this template and fill in your details:
```html
<div class="poster-card">
  <div class="poster-img-wrap">
    <img src="assets/event_newname.jpg" alt="Event Name" />
    <div class="poster-badge poster-badge--live">Open</div>
  </div>
  <div class="poster-info">
    <div class="event-tag">Category</div>
    <h3 class="event-name">Event Name</h3>
    <p class="event-desc">Description here.</p>
    <div class="poster-meta">
      <span class="poster-meta-item">📅 Deadline: DATE</span>
    </div>
  </div>
</div>
```

**Badge options:**
- `poster-badge--live` → Red pulsing "Open" badge
- `poster-badge--soon` → Gold "Coming Soon" badge

### Remove an event
Delete from the opening `<div class="poster-card">` to its closing `</div>`.

### Mark event as closed
Change `poster-badge--live` to `poster-badge--soon` and text to "Closed".

---

## 🖼️ ADDING IMAGES

### To Gallery (current year):
1. Copy image to `assets/`, name it `gal_12_description.jpg`
2. Find `id="galleryGrid"` in `index.html`
3. Add inside the grid:
```html
<div class="gal-item" data-category="CATEGORY" data-caption="Caption Here">
  <img src="assets/gal_12_description.jpg" alt="Description" loading="lazy" />
  <div class="gal-overlay"><span>Caption Here</span></div>
</div>
```
**Gallery categories:** `rangabhumi` · `abhivyakti` · `lakeer`

### To Past Events:
Same, but find `id="pastGrid"` and use `data-past="CATEGORY"`.
**Past Events categories:** `abhivyakti` · `nukkad` · `productions` · `rangabhumi` · `iicm25` · `iicm23` · `farewell`

### Wide image (spans 2 columns):
```html
<div class="gal-item gal-item--wide" data-category="...">
```

### Add a new filter tab:
1. Add button in the filter bar:
```html
<button class="gf-btn" data-past-filter="newcategory">Label</button>
```
2. Tag images: `data-past="newcategory"`

---

## 🏆 UPDATING ACHIEVEMENTS

### Update stat counters
Search `data-target` in index.html. Change the number:
```html
<div class="stat-number" data-target="3">0</div>
```

### Add a trophy item
Find `trophy-banner` and add:
```html
<div class="trophy-divider"></div>
<div class="trophy-item">
  <div class="trophy-icon">🥇</div>
  <div class="trophy-info">
    <span class="trophy-year">YEAR</span>
    <h3>Title</h3>
    <p>Description</p>
  </div>
</div>
```

### Add to Other Accolades
Find `ach-list` and add:
```html
<div class="ach-item">
  <span class="ach-rank">1<sup>st</sup></span>
  <div>
    <strong>Event Name</strong>
    <span>Fest Name · Year</span>
  </div>
</div>
```

---

## 📸 ACTIVATING THE INSTAGRAM FEED — FULL GUIDE

The Instagram section currently shows a styled placeholder with a link to the profile.
To show a real live feed of posts, follow these steps:

---

### OPTION 1 — Elfsight (Recommended · Free tier available)

**Step 1: Create an Elfsight account**
1. Go to **https://elfsight.com**
2. Click "Sign Up" → use the AARSHI email or any Google account
3. Free tier allows 1 widget with 200 views/month (enough for a club site)

**Step 2: Create the Instagram Feed widget**
1. On the Elfsight dashboard, click **"Create Widget"**
2. Search for **"Instagram Feed"** and select it
3. Click **"Connect Instagram Account"**
4. Log in with the `@aarshi_iiserk` Instagram account credentials
5. Authorise Elfsight to read the feed

**Step 3: Customise the widget**
- Layout: choose **Grid** (3 columns looks best on this site)
- Posts to show: **9 or 12**
- Header: you can show the profile picture and follower count
- Click **"Continue"** when done

**Step 4: Get the embed code**
1. Click **"Add to Website"** → choose **"Any Website (HTML)"**
2. You will see two pieces of code — a `<script>` tag and a `<div>` tag
3. Copy both

**Step 5: Paste into the website**
1. Open `index.html`
2. Search for: `PASTE YOUR WIDGET SCRIPT TAG HERE`
3. You will see this block:
```html
<div class="insta-placeholder">
  ...
</div>
<!-- PASTE YOUR WIDGET SCRIPT TAG HERE when ready -->
```
4. **Delete** the entire `<div class="insta-placeholder">...</div>` block
5. **Paste** your Elfsight code in its place, like this:
```html
<script src="https://static.elfsight.com/platform/platform.js" async></script>
<div class="elfsight-app-XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"></div>
```
(The X's will be your unique widget ID from Elfsight)

**Step 6: Save and push to GitHub**
The feed will now show live Instagram posts automatically.

---

### OPTION 2 — Behold (Free · No account login needed)

Behold works without needing to log in with Instagram credentials — it uses a public access token.

**Step 1:** Go to **https://behold.so**
**Step 2:** Click "Create a Free Feed"
**Step 3:** Enter `aarshi_iiserk` as the Instagram username
**Step 4:** Choose "Grid" layout, set number of posts (9 recommended)
**Step 5:** Click "Publish" → copy the embed snippet
**Step 6:** Same as Elfsight Step 5 above — delete placeholder, paste snippet

---

### OPTION 3 — EmbedSocial (More features · Paid plans)

**Step 1:** Go to **https://embedsocial.com**
**Step 2:** Start free trial → Connect Instagram → choose `@aarshi_iiserk`
**Step 3:** Design the feed (grid, colours, etc.)
**Step 4:** Get embed code → paste into `index.html` as above

---

### Troubleshooting Instagram Feed

| Problem | Fix |
|---|---|
| Feed not loading | Check widget ID in the div tag is correct |
| Shows old posts | Elfsight refreshes every few hours automatically |
| Free tier limit reached | Upgrade plan or switch to Behold (free) |
| Instagram account disconnected | Re-connect in your Elfsight dashboard |
| Feed looks wrong size | Add `style="max-width:100%"` to the widget div |

---

## 🔗 ADDING VIDEO LINKS TO PRODUCTIONS

Find `prod-tag` in `index.html`. Change a plain span to a link:
```html
<!-- Before (no link): -->
<span class="prod-tag">Sab Changa Si <em>2022</em></span>

<!-- After (with YouTube link): -->
<a class="prod-tag prod-tag--link" href="https://youtu.be/YOUR_ID" target="_blank">
  Sab Changa Si <em>2022</em> <span class="prod-watch">▶ Watch</span>
</a>
```

---

## 🌓 LIGHT / DARK MODE

The 🌙/☀️ toggle is in the top-right of the nav. User preference saves automatically.
No admin action needed.

---

## 🌐 CHANGING THE WEBSITE URL

The site currently lives at: **https://aarshiofficial.github.io/**

**To point it to a custom domain like https://aarshi.iiserk.org:**

1. **Get the domain** — ask your institute IT team to set up `aarshi.iiserk.org`
2. **Add a CNAME DNS record:**
   - Type: `CNAME`
   - Name: `aarshi` (or `@` for root)
   - Value: `aarshiofficial.github.io`
   - Ask IT to add this in their DNS settings
3. **Create a CNAME file** in the repo root:
   - Create a file called exactly `CNAME` (no extension)
   - Content: just one line: `aarshi.iiserk.org`
4. **Set in GitHub:**
   - Go to the repo → Settings → Pages
   - Under "Custom domain", type `aarshi.iiserk.org`
   - Tick "Enforce HTTPS"
5. Wait 10–30 minutes for DNS to propagate
6. Site will then be live at **https://aarshi.iiserk.org**

---

## 🚀 DEPLOYING CHANGES

```bash
git add .
git commit -m "Brief description of what changed"
git push
```
Then visit **https://aarshiofficial.github.io/** after ~2 minutes.

**Check deploy status:** GitHub repo → Actions tab

---

## ❓ COMMON MISTAKES

| Mistake | Fix |
|---|---|
| Image doesn't show | Check filename matches exactly — case-sensitive, no spaces |
| Layout looks broken | Make sure every `<div>` you opened is also closed with `</div>` |
| Changes not visible | Hard-refresh: Ctrl+Shift+R, or wait 2 min for deploy |
| Filter not working | `data-category` on image must exactly match `data-filter` on button |
| Photo face cut off | Use `object-position: center top` in CSS for that image |

---

*Last updated: June 2026 | Contact: aarshi@iiserkol.ac.in*
