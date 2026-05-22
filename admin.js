// =============================================
//   ADMIN PANEL LOGIC
// =============================================

// ---- LOGIN ----
function doLogin() {
  const val = document.getElementById('pwdInput').value;
  if(val === Storage.getPassword()) {
    sessionStorage.setItem('admin_auth','1');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminWrap').style.display = 'flex';
    initAdmin();
  } else {
    document.getElementById('loginErr').textContent = '❌ Incorrect password. Try again.';
    document.getElementById('pwdInput').value = '';
    document.getElementById('pwdInput').focus();
  }
}

function doLogout() {
  sessionStorage.removeItem('admin_auth');
  location.reload();
}

// ---- CHECK AUTH ----
window.addEventListener('DOMContentLoaded', () => {
  if(sessionStorage.getItem('admin_auth') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminWrap').style.display = 'flex';
    initAdmin();
  } else {
    document.getElementById('pwdInput').focus();
  }
  document.addEventListener('keydown', e => {
    if(e.key==='Escape') { closeForm(); closeCatForm(); }
  });
});

// ---- INIT ADMIN ----
function initAdmin() {
  renderAdminProducts();
  renderCatList();
  loadSettings();
}

// ---- TABS ----
function showTab(name, el) {
  document.querySelectorAll('.tab-content').forEach(t => t.style.display='none');
  document.querySelectorAll('.slink').forEach(a => a.classList.remove('active'));
  document.getElementById('tab-'+name).style.display = 'block';
  if(el) el.classList.add('active');

  if(name==='products') renderAdminProducts();
  if(name==='categories') renderCatList();
  if(name==='settings') loadSettings();
  return false;
}

// ============================================
//   PRODUCTS
// ============================================

function renderAdminProducts() {
  const products = Storage.getProducts() || [];
  const cats = Storage.getCategories() || [];
  const q = (document.getElementById('adminSearch')?.value||'').toLowerCase();
  const catF = document.getElementById('adminCatFilter')?.value||'';

  // Populate category filter dropdown
  const catFilter = document.getElementById('adminCatFilter');
  if(catFilter) {
    const prev = catFilter.value;
    catFilter.innerHTML = '<option value="">All Categories</option>';
    cats.forEach(c => catFilter.innerHTML += `<option value="${c.id}" ${c.id===prev?'selected':''}>${c.icon} ${c.name}</option>`);
  }

  const filtered = products.filter(p => {
    const matchCat = !catF || p.category===catF;
    const matchQ = !q ||
      (p.name||'').toLowerCase().includes(q) ||
      (p.code||'').toLowerCase().includes(q) ||
      (p.brand||'').toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const label = document.getElementById('productCountLabel');
  if(label) label.textContent = `${products.length} total products · showing ${filtered.length}`;

  const tbody = document.getElementById('adminTableBody');
  if(!tbody) return;

  if(filtered.length===0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No products found</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const cat = cats.find(c=>c.id===p.category);
    const imgHtml = p.image
      ? `<img src="${p.image}" class="table-img" alt=""/>`
      : `<div class="table-emoji">${p.icon||'📦'}</div>`;
    return `
      <tr>
        <td>${imgHtml}</td>
        <td><span class="table-code">${p.code||'—'}</span></td>
        <td><div class="table-name">${p.name}<small>${p.brand||''}</small></div></td>
        <td><span class="cat-chip">${cat?cat.icon+' '+cat.name:p.category}</span></td>
        <td><span class="table-price">${p.price||'—'}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="openProductForm(${p.id})">✏️ Edit</button>
            <button class="btn-del" onclick="confirmDelete(${p.id},'product','${(p.name||'').replace(/'/g,"\\'")}')">🗑</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

// ---- PRODUCT FORM ----
let editingProductId = null;

function openProductForm(id) {
  editingProductId = id || null;
  const overlay = document.getElementById('formOverlay');

  // Populate category dropdown
  const cats = Storage.getCategories() || [];
  const fCat = document.getElementById('f-cat');
  fCat.innerHTML = '<option value="">Select Category</option>';
  cats.forEach(c => fCat.innerHTML += `<option value="${c.id}">${c.icon} ${c.name}</option>`);

  // Clear form
  clearProductForm();

  if(id) {
    // Edit existing
    const p = (Storage.getProducts()||[]).find(x=>x.id===id);
    if(!p) return;
    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('f-id').value = p.id;
    document.getElementById('f-code').value = p.code||'';
    document.getElementById('f-name').value = p.name||'';
    document.getElementById('f-brand').value = p.brand||'';
    document.getElementById('f-price').value = p.price||'';
    document.getElementById('f-badge').value = p.badge||'';
    document.getElementById('f-icon').value = p.icon||'';
    document.getElementById('f-tags').value = (p.tags||[]).join(', ');
    document.getElementById('f-desc').value = p.description||'';
    document.getElementById('f-cat').value = p.category||'';

    if(p.image) {
      setImagePreview(p.image);
    }

    // Specs
    (p.specs||[]).forEach(s => addSpecRow(s.label, s.value));

    // Size chart
    if(p.sizeChart && p.sizeChart.rows && p.sizeChart.rows.length) {
      document.getElementById('f-has-sizes').checked = true;
      toggleSizeChart();
      const cols = p.sizeChart.columns || [];
      document.getElementById('sc-col1').value = cols[0]||'';
      document.getElementById('sc-col2').value = cols[1]||'';
      document.getElementById('sc-col3').value = cols[2]||'';
      document.getElementById('sc-col4').value = cols[3]||'';
      (p.sizeChart.rows||[]).forEach(r => addSizeRow(r));
    }
  } else {
    document.getElementById('formTitle').textContent = 'Add Product';
  }

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function clearProductForm() {
  ['f-id','f-code','f-name','f-brand','f-price','f-badge','f-icon','f-tags','f-desc'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  document.getElementById('f-cat').value = '';
  document.getElementById('f-has-sizes').checked = false;
  document.getElementById('sizeChartWrap').style.display = 'none';
  document.getElementById('specsContainer').innerHTML = '';
  document.getElementById('sizeRowsContainer').innerHTML = '';
  ['sc-col1','sc-col2','sc-col3','sc-col4'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  clearImage();
}

function closeForm() {
  document.getElementById('formOverlay').style.display = 'none';
  document.body.style.overflow = '';
  editingProductId = null;
}

function saveProduct() {
  const name = document.getElementById('f-name').value.trim();
  const code = document.getElementById('f-code').value.trim();
  const cat  = document.getElementById('f-cat').value;

  if(!name) { showToast('Product name is required', true); return; }
  if(!code) { showToast('Product code is required', true); return; }
  if(!cat)  { showToast('Please select a category', true); return; }

  // Read specs
  const specRows = document.querySelectorAll('.spec-input-row');
  const specs = [];
  specRows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    if(inputs[0].value.trim() || inputs[1].value.trim()) {
      specs.push({label: inputs[0].value.trim(), value: inputs[1].value.trim()});
    }
  });

  // Read size chart
  let sizeChart = null;
  if(document.getElementById('f-has-sizes').checked) {
    const cols = [
      document.getElementById('sc-col1').value.trim(),
      document.getElementById('sc-col2').value.trim(),
      document.getElementById('sc-col3').value.trim(),
      document.getElementById('sc-col4').value.trim(),
    ].filter(Boolean);

    const sizeInputRows = document.querySelectorAll('.size-row-input');
    const rows = [];
    sizeInputRows.forEach(row => {
      const inputs = row.querySelectorAll('input[type="text"]');
      const rowData = Array.from(inputs).map(i=>i.value.trim());
      if(rowData.some(v=>v)) rows.push(rowData);
    });

    if(cols.length && rows.length) {
      sizeChart = {columns: cols, rows};
    }
  }

  const tagsRaw = document.getElementById('f-tags').value;
  const tags = tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);

  const p = {
    code,
    name,
    brand: document.getElementById('f-brand').value.trim(),
    price: document.getElementById('f-price').value.trim(),
    badge: document.getElementById('f-badge').value.trim(),
    icon:  document.getElementById('f-icon').value.trim() || '📦',
    category: cat,
    tags,
    description: document.getElementById('f-desc').value.trim(),
    specs,
    sizeChart,
    image: currentImageData || null,
  };

  if(editingProductId) {
    p.id = editingProductId;
    Storage.updateProduct(p);
    showToast('✅ Product updated!');
  } else {
    Storage.addProduct(p);
    showToast('✅ Product added!');
  }

  closeForm();
  renderAdminProducts();
}

// ---- IMAGE UPLOAD ----
let currentImageData = null;

function handleImgUpload(e) {
  const file = e.target.files[0];
  if(!file) return;
  if(file.size > 2 * 1024 * 1024) {
    showToast('Image too large. Max 2MB.', true);
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    currentImageData = ev.target.result;
    setImagePreview(currentImageData);
  };
  reader.readAsDataURL(file);
}

function setImagePreview(src) {
  const preview = document.getElementById('imgPreview');
  preview.innerHTML = `<img src="${src}" alt="preview" style="width:100%;max-height:200px;object-fit:cover;border-radius:6px"/>`;
  document.getElementById('clearImgBtn').style.display = 'block';
  currentImageData = src;
}

function clearImage() {
  currentImageData = null;
  document.getElementById('imgPreview').innerHTML = `
    <span>📷</span>
    <p>Click to upload photo<br><small>JPG, PNG, WEBP — Max 2MB</small></p>`;
  document.getElementById('clearImgBtn').style.display = 'none';
  document.getElementById('f-img-file').value = '';
}

// ---- SPEC ROWS ----
function addSpecRow(label='', value='') {
  const container = document.getElementById('specsContainer');
  const row = document.createElement('div');
  row.className = 'spec-input-row';
  row.innerHTML = `
    <input type="text" placeholder="Spec name (e.g. Weight)" value="${escAttr(label)}"/>
    <input type="text" placeholder="Value (e.g. 500 g)" value="${escAttr(value)}"/>
    <button type="button" class="spec-del-btn" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(row);
}

// ---- SIZE CHART ----
function toggleSizeChart() {
  const show = document.getElementById('f-has-sizes').checked;
  document.getElementById('sizeChartWrap').style.display = show ? 'block' : 'none';
  if(show && document.querySelectorAll('.size-row-input').length===0) {
    // Add 3 empty rows to start
    addSizeRow(); addSizeRow(); addSizeRow();
  }
}

function addSizeRow(data=[]) {
  const container = document.getElementById('sizeRowsContainer');
  const numCols = 4; // max 4 columns
  const row = document.createElement('div');
  row.className = 'size-row-input';
  row.style.gridTemplateColumns = `repeat(${numCols}, 1fr) auto`;
  row.style.display = 'grid';
  let inputs = '';
  for(let i=0; i<numCols; i++) {
    inputs += `<input type="text" placeholder="Col ${i+1}" value="${escAttr(data[i]||'')}"/>`;
  }
  row.innerHTML = inputs + `<button type="button" class="spec-del-btn" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(row);
}

// ============================================
//   CATEGORIES
// ============================================

function renderCatList() {
  const cats = Storage.getCategories() || [];
  const products = Storage.getProducts() || [];
  const container = document.getElementById('catList');
  if(!container) return;

  if(cats.length===0) {
    container.innerHTML = `<p style="color:var(--text-muted);padding:20px">No categories yet. Add one!</p>`;
    return;
  }

  container.innerHTML = cats.map(c => {
    const count = products.filter(p=>p.category===c.id).length;
    return `
      <div class="cat-admin-card">
        <span class="cat-admin-icon">${c.icon}</span>
        <div class="cat-admin-info">
          <h4>${c.name}</h4>
          <p>${count} product${count!==1?'s':''}</p>
        </div>
        <div class="cat-admin-actions">
          <button class="btn-edit" onclick="openCatForm('${c.id}')">✏️</button>
          <button class="btn-del" onclick="confirmDelete('${c.id}','category','${(c.name||'').replace(/'/g,"\\'")}')">🗑</button>
        </div>
      </div>`;
  }).join('');
}

let editingCatId = null;

function openCatForm(id) {
  editingCatId = id || null;
  document.getElementById('cf-id').value = id || '';
  document.getElementById('cf-name').value = '';
  document.getElementById('cf-icon').value = '';

  if(id) {
    const c = (Storage.getCategories()||[]).find(x=>x.id===id);
    if(c) {
      document.getElementById('catFormTitle').textContent = 'Edit Category';
      document.getElementById('cf-name').value = c.name||'';
      document.getElementById('cf-icon').value = c.icon||'';
    }
  } else {
    document.getElementById('catFormTitle').textContent = 'Add Category';
  }

  document.getElementById('catFormOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCatForm() {
  document.getElementById('catFormOverlay').style.display = 'none';
  document.body.style.overflow = '';
  editingCatId = null;
}

function saveCategory() {
  const name = document.getElementById('cf-name').value.trim();
  const icon = document.getElementById('cf-icon').value.trim();
  if(!name) { showToast('Category name is required', true); return; }
  if(!icon) { showToast('Please add an icon/emoji', true); return; }

  if(editingCatId) {
    Storage.updateCategory({id: editingCatId, name, icon});
    showToast('✅ Category updated!');
  } else {
    Storage.addCategory({name, icon});
    showToast('✅ Category added!');
  }
  closeCatForm();
  renderCatList();
}

// ============================================
//   SETTINGS
// ============================================

function loadSettings() {
  const s = Storage.getSettings();
  document.getElementById('set-name').value    = s.name    || 'IndoTech Supply';
  document.getElementById('set-phone').value   = s.phone   || '+91 98765 43210';
  document.getElementById('set-email').value   = s.email   || 'info@indotechsupply.com';
  document.getElementById('set-address').value = s.address || '123 Industrial Area, RIICO, Ajmer';
}

function saveSettings() {
  const s = {
    name:    document.getElementById('set-name').value.trim(),
    phone:   document.getElementById('set-phone').value.trim(),
    email:   document.getElementById('set-email').value.trim(),
    address: document.getElementById('set-address').value.trim(),
  };
  Storage.saveSettings(s);
  showToast('✅ Settings saved!');
}

function changePassword() {
  const cur = document.getElementById('cur-pwd').value;
  const nw  = document.getElementById('new-pwd').value;
  const con = document.getElementById('con-pwd').value;
  if(cur !== Storage.getPassword()) { showToast('Current password is wrong', true); return; }
  if(!nw) { showToast('New password cannot be empty', true); return; }
  if(nw !== con) { showToast('Passwords do not match', true); return; }
  Storage.savePassword(nw);
  document.getElementById('cur-pwd').value = '';
  document.getElementById('new-pwd').value = '';
  document.getElementById('con-pwd').value = '';
  showToast('✅ Password changed!');
}

function resetAllData() {
  showConfirm(
    'Reset All Data?',
    'This will delete all your products and categories and restore the default data. This cannot be undone.',
    () => {
      // Use the function from defaultData.js
      window.resetAllData && window.resetAllData();
      renderAdminProducts();
      renderCatList();
      showToast('✅ Data reset to defaults.');
    },
    'Reset Everything'
  );
}

// ============================================
//   DELETE CONFIRM
// ============================================

let confirmCallback = null;

function confirmDelete(id, type, name) {
  showConfirm(
    `Delete ${type==='product'?'Product':'Category'}?`,
    `Are you sure you want to delete "${name}"? This cannot be undone.`,
    () => {
      if(type==='product') {
        Storage.deleteProduct(id);
        renderAdminProducts();
        showToast('🗑 Product deleted.');
      } else {
        Storage.deleteCategory(id);
        renderCatList();
        renderAdminProducts();
        showToast('🗑 Category deleted.');
      }
    }
  );
}

function showConfirm(title, msg, cb, btnLabel) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').textContent   = msg;
  document.getElementById('confirmOk').textContent    = btnLabel || 'Delete';
  confirmCallback = cb;
  document.getElementById('confirmOverlay').style.display = 'flex';
}

function closeConfirm() {
  document.getElementById('confirmOverlay').style.display = 'none';
  confirmCallback = null;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('confirmOk').addEventListener('click', () => {
    if(confirmCallback) confirmCallback();
    closeConfirm();
  });
});

// ---- HELPERS ----
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError?' error':'');
  setTimeout(() => t.className='toast', 3200);
}

function escAttr(s) {
  return (s||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
