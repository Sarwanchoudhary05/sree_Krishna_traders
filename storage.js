// =============================================
//   STORAGE UTILITY
//   All data is stored in localStorage so it
//   persists between browser sessions.
// =============================================

const STORE = {
  PRODUCTS:   'indotech_products',
  CATEGORIES: 'indotech_categories',
  SETTINGS:   'indotech_settings',
  PASSWORD:   'indotech_password',
};

const Storage = {

  // ---- PRODUCTS ----
  getProducts() {
    try { return JSON.parse(localStorage.getItem(STORE.PRODUCTS)) || null; }
    catch(e) { return null; }
  },
  saveProducts(data) {
    localStorage.setItem(STORE.PRODUCTS, JSON.stringify(data));
  },
  addProduct(p) {
    const list = this.getProducts() || [];
    p.id = Date.now();
    list.push(p);
    this.saveProducts(list);
    return p;
  },
  updateProduct(updated) {
    const list = (this.getProducts() || []).map(p => p.id === updated.id ? updated : p);
    this.saveProducts(list);
  },
  deleteProduct(id) {
    const list = (this.getProducts() || []).filter(p => p.id !== id);
    this.saveProducts(list);
  },

  // ---- CATEGORIES ----
  getCategories() {
    try { return JSON.parse(localStorage.getItem(STORE.CATEGORIES)) || null; }
    catch(e) { return null; }
  },
  saveCategories(data) {
    localStorage.setItem(STORE.CATEGORIES, JSON.stringify(data));
  },
  addCategory(c) {
    const list = this.getCategories() || [];
    c.id = c.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
    list.push(c);
    this.saveCategories(list);
    return c;
  },
  updateCategory(updated) {
    const list = (this.getCategories() || []).map(c => c.id === updated.id ? updated : c);
    this.saveCategories(list);
  },
  deleteCategory(id) {
    const list = (this.getCategories() || []).filter(c => c.id !== id);
    this.saveCategories(list);
  },

  // ---- SETTINGS ----
  getSettings() {
    try { return JSON.parse(localStorage.getItem(STORE.SETTINGS)) || {}; }
    catch(e) { return {}; }
  },
  saveSettings(data) {
    localStorage.setItem(STORE.SETTINGS, JSON.stringify(data));
  },

  // ---- PASSWORD ----
  getPassword() {
    return localStorage.getItem(STORE.PASSWORD) || 'admin123';
  },
  savePassword(pwd) {
    localStorage.setItem(STORE.PASSWORD, pwd);
  },

  // ---- RESET ----
  resetAll() {
    localStorage.removeItem(STORE.PRODUCTS);
    localStorage.removeItem(STORE.CATEGORIES);
  }
};
