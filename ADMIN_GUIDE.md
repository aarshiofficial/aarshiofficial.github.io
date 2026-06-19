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

---

## 📢 ANNOUNCEMENT BANNER (top of page)

Search in `index.html` for `ann-banner`:

```html
<div class="ann-banner" id="annBanner" data-active="true">
  <span class="ann-text">📢 Your message here with <strong>bold text</strong></span>
```

- **Show banner:** `data-active="true"`
- **Hide banner:** `data-active="false"`
- **Edit text:** Change the text inside `<span class="ann-text">...</span>`
- Banner auto-hides if a visitor dismisses it (stored in their browser)
- To force re-show (even for dismissed visitors), change the text — they'll see it fresh

---

## 📱 STORY POPUP (Instagram-style card)

Search for `storyPopup`:

```html
<div class="story-popup" id="storyPopup" data-active="true">
  ...
  <h2 class="story-title">Your Title Here</h2>
  <p class="story-body">Your message here with <strong>bold</strong> text.</p>
  <a href="#events" class="story-cta">Button Text →</a>
```

- **Show:** `data-active="true"` · **Hide:** `data-active="false"`
- Shows once per browser session (won't repeat on same visit)
- Auto-closes after 6 seconds
- Change `href="#events"` to point to any section: `#gallery`, `#achievements` etc.

---

## 🔴 REHEARSAL BANNER

Search for `rehearsalBanner`:

```html
<div class="rehearsal-banner" id="rehearsalBanner" data-active="false">
  ...
  <strong id="rehearsalProduction">Annual Drama Production 2026</strong>
```

- **Show:** `data-active="true"` · **Hide (default):** `data-active="false"`
- Edit the production name between the `<strong>` tags
- Edit the show date in `js/main.js` — search for `showDate`:
  ```js
  const showDate = "2026-12-01"; // ← Change this date (YYYY-MM-DD)
  ```

---

## 👥 MEMBER WALL — Adding / Removing OBs

The Member Wall shows all Office Bearers across every AARSHI tenure, filterable by role (Secretary / Convenor / Treasurer / Other Roles).

Search for `id="memberMosaic"` in `index.html`.

**Add a new OB:**
```html
<div class="member-chip" data-batch="secretary">
  <span class="mc-name">Full Name</span>
  <span class="mc-role">Secretary · 27–28</span>
</div>
```

**data-batch values (role category):**
- `secretary` — shows under Secretary filter
- `convenor`  — shows under Convenor filter
- `treasurer` — shows under Treasurer filter
- `other`     — shows under Other Roles (Social Media Manager, Event Organiser, OB Mentor etc.)

**Remove an OB:** Delete their `<div class="member-chip">...</div>` line.

**When a new tenure begins:**
1. Add new OBs at the top of their role group
2. Old OBs stay — the wall is a complete historical record

---

## 🎭 ON THIS DAY FACTS

To add your own theatre facts, open `js/main.js` and search for `const facts = [`.
Add a new string to the array:
```js
"Your new theatre fact here.",
```
Facts rotate daily automatically based on the day of the year.

---

*Last updated: June 2026 | Contact: aarshi@iiserkol.ac.in*

---

## 🔥 FIREBASE SETUP — COMPLETE GUIDE

### Step 1: Create Firebase Project
1. Go to **https://console.firebase.google.com**
2. Click **"Add project"** → Name it `aarshi-iiserk`
3. Disable Google Analytics (not needed) → **Create project**

### Step 2: Enable Authentication
1. Left sidebar → **Build → Authentication** → **Get started**
2. Click **"Email/Password"** → Enable it → **Save**

### Step 3: Enable Firestore Database
1. Left sidebar → **Build → Firestore Database** → **Create database**
2. Choose **"Start in test mode"** (we'll secure it later)
3. Select location: `asia-south1` (Mumbai) → **Done**

### Step 4: Enable Storage (for profile photos)
1. Left sidebar → **Build → Storage** → **Get started**
2. Start in test mode → **Done**

### Step 5: Get Your Config Keys
1. Left sidebar → ⚙️ **Project Settings** → **Your apps** tab
2. Click **"</>  Web"** → Register app as `aarshi-web`
3. Copy the `firebaseConfig` object shown — it looks like:
```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "aarshi-iiserk.firebaseapp.com",
  projectId: "aarshi-iiserk",
  storageBucket: "aarshi-iiserk.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 6: Paste Config into Website
Open **both** `auth.html` and `dashboard.html`.
In each file, find `const firebaseConfig = {` and replace the placeholder values with your real values.

### Step 7: Set Security Rules

**Firestore Rules** (Firestore → Rules tab):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /members/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

**Storage Rules** (Storage → Rules tab):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024;
    }
  }
}
```

---

## 👤 ADMIN: MANAGING MEMBERS

### View all members
1. Firebase Console → **Firestore Database** → `members` collection
2. Each document = one member, named by their UID

### Approve an achievement
1. Find the member in Firestore
2. The `achievements` field has their submitted text
3. Copy it into `achievementsApproved` as an array item:
   - Click the `achievementsApproved` field → Edit
   - Add the achievement text as a new array item
4. The member will see it as "✓ Approved" on their dashboard

### Mark attendance
Each member doc has an `attendance` object. To add attendance:
1. Open the member's Firestore doc
2. Click `attendance` field → Edit
3. Add a key in format: `EventName||DD Mon YYYY`
   - Value: `"present"` or `"absent"`
   - Example key: `Annual Drama Workshop 2026||15 Jun 2026`

### Make someone an admin
1. Find their member doc in Firestore
2. Change `role` field from `"member"` to `"admin"`

### Delete a member account
1. Firestore → delete their `members` document
2. Firebase Console → Authentication → find their email → delete user

---

---

## 🔑 PASSWORD RESET — HOW IT WORKS

### For Members (self-service)
1. Go to **https://aarshiofficial.github.io/auth.html**
2. Click **"Forgot password?"** below the password field
3. Enter your `@iiserkol.ac.in` email address
4. Click **"Send Reset Email"**
5. Check your IISER inbox — a reset link arrives within 1–2 minutes
6. Click the link → set a new password → login as normal

The reset link expires after **1 hour**. If it doesn't arrive, check spam/junk folder.

### For Admins — Manually Reset a Member's Password
If a member can't receive the reset email (e.g. IISER mail issues):
1. Firebase Console → **Authentication** → find the member's email
2. Click the three dots (⋮) next to their account → **"Send password reset email"**
3. This sends directly from Firebase — it bypasses any IISER mail filters

### For Admins — Force a Password Change
If you need to reset someone's password directly:
1. Firebase Console → **Authentication** → find the user
2. Click the three dots → **"Reset password"** (if available) OR **delete the account** and ask them to re-signup

### Enable Email Verification (Optional but Recommended)
To ensure only real IISER students join, you can require email verification:
1. After a user signs up, Firebase can send a verification email automatically
2. In `auth.html`, after the `await window._createUser(...)` line, add:
```js
import { sendEmailVerification } from "firebase/auth";
await sendEmailVerification(cred.user);
```
3. Only verified accounts can then access the dashboard

---

## 📧 FIREBASE EMAIL CONFIGURATION

Firebase uses its own email sender by default. To make reset emails come from an AARSHI address:

1. Firebase Console → **Authentication → Templates**
2. Click **"Password reset"** tab
3. Edit the **From name**: `AARSHI IISER Kolkata`
4. The from address will be `noreply@aarshi-iiserk.firebaseapp.com` by default
5. To use a custom domain email, upgrade to Firebase Blaze plan and configure custom SMTP

---

---

## 🔥 COMPLETE FIREBASE SETUP (with AARSHI config)

The Firebase project `aarshi-iiserk` is already created. Here is everything you need.

### Your Firebase Config (already in the website files)
```js
const firebaseConfig = {
  apiKey: "AIzaSyCiIPpWPw68y5dEdt1LaeNtxVuCFGBISuU",
  authDomain: "aarshi-iiserk.firebaseapp.com",
  projectId: "aarshi-iiserk",
  storageBucket: "aarshi-iiserk.firebasestorage.app",
  messagingSenderId: "195490022156",
  appId: "1:195490022156:web:70066f5b5a3bc79aff7f29"
};
```
This is already pasted into `auth.html` and `dashboard.html` — no further action needed.

---

### Step 1: Enable Email/Password Authentication
1. Go to **https://console.firebase.google.com**
2. Select project **aarshi-iiserk**
3. Left sidebar → **Build → Authentication → Get started**
4. Click **"Email/Password"** → Toggle **Enable** ON → **Save**

### Step 2: Create Firestore Database
1. Left sidebar → **Build → Firestore Database → Create database**
2. Choose **"Start in test mode"** → **Next**
3. Location: **asia-south1 (Mumbai)** → **Enable**

### Step 3: Enable Storage (profile photos)
1. Left sidebar → **Build → Storage → Get started**
2. **"Start in test mode"** → **Next** → **Done**

### Step 4: Set Firestore Security Rules
1. Firestore Database → **Rules** tab → paste this:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /members/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read, update: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```
3. Click **Publish**

### Step 5: Set Storage Security Rules
1. Storage → **Rules** tab → paste this:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profiles/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 2 * 1024 * 1024;
    }
  }
}
```
2. Click **Publish**

### Step 6: Make Yourself Admin
1. Go to **https://aarshiofficial.github.io/auth.html** → Sign up with your IISER email
2. Firebase Console → Firestore → **members** collection → click your document (long UID)
3. Find `role` field → click pencil → change `"member"` to `"admin"` → **Update**

---

## 👤 ADMIN: MANAGING MEMBER ACHIEVEMENTS

Members do NOT submit achievements themselves. You add them as admin.

### Add an achievement to a member
1. Firebase Console → **Firestore Database** → `members` collection
2. Find the member's document (search by their name in the `name` field)
3. Click the `achievements` field → Edit
4. Add items to the array, e.g.:
   - `"Won 1st Place — Abhivyakti 2025"`
   - `"Performed in Lakeer-e-Kabaddi 2025"`
   - `"IICM 2025 — Group Play Gold"`
5. Also add to `achievementsApproved` array — these show as "✓ Approved" on the member's dashboard

### Add attendance for a session
1. Find the member's Firestore document
2. Click `attendance` → Edit → add a new key-value:
   - **Key format**: `EventName||DD Mon YYYY`
   - **Example**: `Annual Drama Workshop 2026||15 Jun 2026`
   - **Value**: `"present"` or `"absent"`
3. Click **Update**

---

## 🔑 PASSWORD RESET — HOW IT WORKS

### Member self-service
1. Visit **https://aarshiofficial.github.io/auth.html**
2. Click **"Forgot password?"** under the password field
3. Enter `@iiserkol.ac.in` email → click **Send Reset Email**
4. Check IISER inbox → click the link → set new password → login

### Admin manually triggers reset
1. Firebase Console → **Authentication** → find member's email
2. Click ⋮ (three dots) → **"Send password reset email"**

### Customise the reset email sender name
1. Firebase Console → **Authentication → Templates → Password reset**
2. Edit **From name** to: `AARSHI IISER Kolkata`
3. Click **Save**

---

## 📧 EMAIL DOMAIN RESTRICTION
The signup page only accepts `@iiserkol.ac.in` emails. This is enforced both in the frontend (JavaScript) and should also be enforced in Firestore rules if needed. If you ever need to allow a different domain (e.g. for a guest), temporarily remove the check from `auth.html` → signup handler → the `endsWith("@iiserkol.ac.in")` check.

---

---

## 🔥 COMPLETE FIREBASE SETUP — FINAL VERSION (No Storage)

Storage has been removed to avoid costs. Profile photos are replaced with initials avatars generated automatically from the member's name.

### Your Firebase Config (already in all files)
```js
const firebaseConfig = {
  apiKey: "AIzaSyCiIPpWPw68y5dEdt1LaeNtxVuCFGBISuU",
  authDomain: "aarshi-iiserk.firebaseapp.com",
  projectId: "aarshi-iiserk",
  storageBucket: "aarshi-iiserk.firebasestorage.app",
  messagingSenderId: "195490022156",
  appId: "1:195490022156:web:70066f5b5a3bc79aff7f29"
};
```

---

### Step 1: Enable Email/Password Authentication
1. Go to **https://console.firebase.google.com** → project **aarshi-iiserk**
2. Left sidebar → **Build → Authentication → Get started**
3. Click **"Email/Password"** → Toggle **Enable** → **Save**

### Step 2: Create Firestore Database
1. Left sidebar → **Build → Firestore Database → Create database**
2. Choose **"Start in test mode"** → **Next**
3. Location: **asia-south1 (Mumbai)** → **Enable**

### Step 3: Set Firestore Security Rules
1. Firestore Database → **Rules** tab
2. Replace everything with this and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /members/{userId} {

      // PUBLIC: anyone can read name, interests, yearJoined, yearLeft
      allow read: if true;

      // Members can only write their OWN document
      allow write: if request.auth != null && request.auth.uid == userId;

      // Admins can update any member document
      allow update: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

**Why allow read: if true?**
The Members page (members.html) is public and shows all members' names and interests to anyone visiting the site. Attendance and achievements are still only shown to the logged-in member on their own dashboard.

### Step 4: Make Yourself Admin
1. Sign up at **https://aarshiofficial.github.io/auth.html** with your IISER email
2. Firebase Console → **Firestore → members** → click your document (long UID string)
3. Find `role` field → click pencil icon → change `"member"` to `"admin"` → **Update**

---

## 👥 MEMBERS PAGE (members.html)

The Members page at **https://aarshiofficial.github.io/members.html** is publicly visible and shows:
- Member's full name
- Year joined + Active/Alumni status
- Areas of interest (as chips)
- Initials avatar (auto-generated from name)

**What is NOT shown publicly:**
- Email address
- Attendance records
- Achievements (these show only on member's own dashboard)
- Password (obviously)

Members can filter by any interest area and search by name.

---

## 👤 ADMIN: MANAGING MEMBER DATA

### Add achievements to a member
1. Firebase Console → **Firestore → members** → find the member's document
2. Edit `achievements` array → add strings like:
   - `"Performed in Lakeer-e-Kabaddi 2025"`
   - `"Won 1st Place — Abhivyakti 2025"`
3. Edit `achievementsApproved` array → add the same strings to approve them
4. Member sees "✓ Approved" on their dashboard

### Mark attendance
In the member's Firestore document, edit `attendance` object:
- **Key**: `EventName||DD Mon YYYY` (e.g. `Drama Workshop 2026||15 Jun 2026`)
- **Value**: `"present"` or `"absent"`

### Password reset (admin)
1. Firebase Console → **Authentication** → find member's email
2. Click ⋮ → **"Send password reset email"**

### Delete a member
1. Firestore → delete their `members` document
2. Authentication → find email → click ⋮ → **Delete account**

---

## 🔑 PASSWORD RESET — MEMBER SELF-SERVICE

1. Go to **https://aarshiofficial.github.io/auth.html**
2. Click **"Forgot password?"**
3. Enter `@iiserkol.ac.in` email → **Send Reset Email**
4. Check IISER inbox → click link → set new password

Reset link expires after **1 hour**.

---

## 📧 CUSTOMISE RESET EMAIL SENDER NAME
1. Firebase Console → **Authentication → Templates → Password reset**
2. Change **From name** to: `AARSHI IISER Kolkata`
3. Click **Save**

---

---

## ⚠️ MEMBERS NOT SHOWING ON MEMBERS PAGE — FIX

If accounts appear in Firebase Authentication but NOT on members.html, the issue is almost always **Firestore Security Rules**.

### The fix — paste these rules EXACTLY:

1. Firebase Console → **Firestore Database** → **Rules** tab
2. Delete everything and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /members/{userId} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && (
        request.auth.uid == userId ||
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin'
      );
      allow delete: if request.auth != null &&
        get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

3. Click **Publish**

### Why this works
- `allow read: if true` — lets the Members page load all members publicly (name + interests only shown)
- `allow create` — lets a new user write their own document during signup
- `allow update` — member can update their own doc; admin can update anyone's

### Also check — did Firestore actually save the member doc?
When someone signs up, two things happen:
1. Firebase **Authentication** creates the account (you see this in Auth tab)
2. **Firestore** saves the member document (you see this in Firestore tab)

If only step 1 happened (auth exists but no Firestore doc), the member won't appear on the Members page. This can happen if the signup was interrupted. The member should sign up again or you can manually create their Firestore document.

To manually create a member document:
1. Firestore → `members` collection → **Add document**
2. Document ID = their Firebase Auth UID (find it in Authentication tab)
3. Add fields: `name`, `email`, `yearJoined`, `yearLeft`, `interests` (array), `role` = `"member"`, `achievements` = `[]`, `achievementsApproved` = `[]`, `attendance` = `{}`

---
