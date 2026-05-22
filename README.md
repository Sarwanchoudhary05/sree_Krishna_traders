# Sree krishna Traders — Product Catalog v2
## With Admin Panel, Photo Uploads & V-Belt Size Charts

---

## 📁 Files

```
catalog-v2/
├── index.html          ← Public catalog (customers see this)
├── admin.html          ← Admin panel (you manage products here)
├── css/
│   ├── style.css       ← Shared styles
│   └── admin.css       ← Admin styles
└── js/
    ├── storage.js      ← Data storage engine (localStorage)
    ├── defaultData.js  ← Default products & categories
    ├── catalog.js      ← Catalog page logic
    └── admin.js        ← Admin panel logic
```

---

## 🔐 Admin Panel

Go to `your-site.com/admin.html`

**Default password: `admin123`**

> Change it immediately in Admin → Settings → Change Password

### What you can do in the Admin Panel:

| Feature | How |
|---|---|
| Add a new product | Admin → Products → + Add Product |
| Edit a product | Admin → Products → ✏️ Edit |
| Delete a product | Admin → Products → 🗑 Delete |
| Upload a product photo | Inside the product form → click the image area |
| Add a size chart | Inside the product form → tick "This product has a Size Chart" |
| Add a new category | Admin → Categories → + Add Category |
| Change password | Admin → Settings → Change Password |
| Reset all data | Admin → Settings → Reset to Default Data |

---

## 📸 Adding Product Photos

1. Open the product form (Add or Edit)
2. Click the photo area — a file picker opens
3. Select a JPG, PNG, or WEBP image (max 2MB)
4. The preview shows instantly
5. Save the product

Photos are stored directly in the browser (as base64). They stay saved permanently in the browser's localStorage.

> **Note:** Since photos are stored in the browser, they are device-specific. If you open the site on a different computer, the photos won't appear until you upload them again on that device. For a permanent photo solution, consider upgrading to a backend (Netlify CMS, Firebase, etc.)

---

## 📐 V-Belt Size Charts

When adding/editing a V-Belt (or any product with sizes):

1. Tick: **"This product has a Size Chart"**
2. Enter column headers (e.g. Belt No., Outside Length, Inside Length, Price)
3. Click **+ Add Row** for each belt size
4. Save

Customers will see a full scrollable size table in the product detail popup.

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up.

### Step 2 — Create a new repository
1. Click **"+"** → **New repository**
2. Name: `hardware-catalog`
3. Set to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. Click **"uploading an existing file"**
2. Drag all files from this folder (index.html, admin.html, css/, js/)
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Branch: `main`, Folder: `/root`
3. Click **Save**

### Step 5 — Live! 🎉
```
https://YOUR-USERNAME.github.io/hardware-catalog/
```

---

## 💡 Tips

- **Backup your data:** In Admin → Settings, use browser DevTools → Application → localStorage to export if needed
- **Multiple devices:** Product data is stored per-browser. Changes on your phone won't appear on your PC automatically
- **Photo sizes:** Keep images under 500KB for best performance. Resize with tools like [squoosh.app](https://squoosh.app)
- **Custom domain:** GitHub Pages supports custom domains (e.g. indotechsupply.com) for free

---

## 🔒 Security Note

This is a client-side admin panel — the password is stored in the browser. It's suitable for a small business catalog. For higher security needs (e.g. preventing customers from viewing admin.html source), consider a server-based CMS.
