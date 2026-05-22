// =============================================
//   CATALOG PAGE LOGIC
// =============================================

let activeCategory = 'all';
let searchTerm = '';

// ---- INIT ----
window.addEventListener('DOMContentLoaded', () => {
  renderCategoryBar();
  renderProducts();
  populateCatSelect();
  updateStatCount();
  window.addEventListener('scroll', headerScrollEffect);
  document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
});

function headerScrollEffect() {
  document.getElementById('header').style.borderBottomColor =
    window.scrollY > 10 ? 'rgba(245,166,35,.25)' : 'var(--border)';
}

function updateStatCount() {
  const el = document.getElementById('statProducts');
  if(el) el.textContent = (Storage.getProducts()||[]).length + '+';
}

// ---- CATEGORIES ----
function renderCategoryBar() {
  const cats = Storage.getCategories() || [];
  const bar = document.getElementById('catBar');
  bar.innerHTML = '';

  const all = document.createElement('button');
  all.className = 'cat-pill' + (activeCategory==='all'?' active':'');
  all.textContent = '📦 All Products';
  all.onclick = () => setCategory('all');
  bar.appendChild(all);

  cats.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'cat-pill' + (activeCategory===c.id?' active':'');
    btn.textContent = c.icon + ' ' + c.name;
    btn.onclick = () => setCategory(c.id);
    bar.appendChild(btn);
  });

  // Populate contact form select
  populateCatSelect();
}

function setCategory(id) {
  activeCategory = id;
  renderCategoryBar();
  renderProducts();
  document.getElementById('catalog').scrollIntoView({behavior:'smooth', block:'start'});
}

function populateCatSelect() {
  const sel = document.getElementById('catSelect');
  if(!sel) return;
  const cats = Storage.getCategories() || [];
  sel.innerHTML = '<option value="">Select Product Category</option>';
  cats.forEach(c => {
    sel.innerHTML += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
  });
}

// ---- FILTER ----
function applyFilters() {
  searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
  document.getElementById('clearBtn').style.display = searchTerm ? 'block' : 'none';
  renderProducts();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('clearBtn').style.display = 'none';
  searchTerm = '';
  renderProducts();
}

function resetFilters() {
  clearSearch();
  activeCategory = 'all';
  renderCategoryBar();
  renderProducts();
}

function getFilteredProducts() {
  const products = Storage.getProducts() || [];
  return products.filter(p => {
    const catMatch = activeCategory === 'all' || p.category === activeCategory;
    const q = searchTerm;
    const searchMatch = !q ||
      (p.name||'').toLowerCase().includes(q) ||
      (p.brand||'').toLowerCase().includes(q) ||
      (p.code||'').toLowerCase().includes(q) ||
      (p.tags||[]).some(t => t.toLowerCase().includes(q)) ||
      (p.description||'').toLowerCase().includes(q);
    return catMatch && searchMatch;
  });
}

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const countEl = document.getElementById('resultCount');
  const filtered = getFilteredProducts();

  grid.innerHTML = '';

  if(filtered.length === 0) {
    empty.style.display = 'block';
    countEl.textContent = '';
    return;
  }
  empty.style.display = 'none';
  countEl.textContent = `Showing ${filtered.length} product${filtered.length!==1?'s':''}`;

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${Math.min(i*0.04,0.4)}s`;
    card.onclick = () => openModal(p.id);

    const imgHtml = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy"/>`
      : `<div class="product-img-emoji">${p.icon||'📦'}</div>`;

    const tagsHtml = (p.tags||[]).slice(0,3).map(t =>
      `<span class="product-tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="product-img-wrap">
        ${p.badge ? `<div class="product-badge-label">${p.badge}</div>` : ''}
        ${imgHtml}
      </div>
      <div class="product-info">
        <div class="product-code">${p.code||''}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-brand">${p.brand||''}</div>
        <div class="product-tags">${tagsHtml}</div>
        <div class="product-footer">
          <div class="product-price">${p.price||'Ask'}</div>
          <button class="btn-view">Details</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ---- MODAL ----
function openModal(id) {
  const products = Storage.getProducts() || [];
  const p = products.find(x => x.id === id);
  if(!p) return;

  const cats = Storage.getCategories() || [];
  const cat = cats.find(c => c.id === p.category);

  const imgHtml = p.image
    ? `<img src="${p.image}" alt="${p.name}"/>`
    : `<div class="modal-img-emoji">${p.icon||'📦'}</div>`;

  const specsHtml = (p.specs||[]).length ? `
    <div class="modal-specs">
      <h4>Specifications</h4>
      ${(p.specs).map(s=>`
        <div class="spec-row">
          <span class="slabel">${s.label}</span>
          <span class="sval">${s.value}</span>
        </div>`).join('')}
    </div>` : '';

  // Size chart
  let sizeChartHtml = '';
  if(p.sizeChart && p.sizeChart.rows && p.sizeChart.rows.length) {
    const cols = p.sizeChart.columns || [];
    const rows = p.sizeChart.rows || [];
    sizeChartHtml = `
      <div class="modal-specs">
        <h4>📐 Size Chart — All Available Sizes</h4>
        <div style="overflow-x:auto">
          <table class="size-chart-table">
            <thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead>
            <tbody>${rows.map(r=>`<tr>${r.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
          </table>
        </div>
      </div>`;
  }

  const tagsHtml = (p.tags||[]).map(t=>`<span class="product-tag">${t}</span>`).join('');

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-img">${imgHtml}</div>
    <div class="modal-code">${p.code||''} ${cat ? `· ${cat.icon} ${cat.name}` : ''}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-brand">Brand: ${p.brand||'—'}</div>
    ${tagsHtml ? `<div class="modal-tags">${tagsHtml}</div>` : ''}
    ${p.description ? `<p class="modal-desc">${p.description}</p>` : ''}
    ${specsHtml}
    ${sizeChartHtml}
    <div class="modal-price-row">
      <div>
        <div style="font-size:11px;color:var(--text-muted);letter-spacing:1px;margin-bottom:3px">PRICE</div>
        <div class="modal-price-val">${p.price||'Contact for price'}</div>
      </div>
      <span style="font-size:12px;color:var(--text-muted)">Bulk discounts available</span>
    </div>
    <div class="modal-actions">
      <button class="btn-primary" onclick="enquireProduct('${escHtml(p.name)}','${escHtml(p.code||'')}')">📋 Enquire Now</button>
      <button class="btn-outline" onclick="closeModal()">Close</button>
    </div>
  `;

  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function enquireProduct(name, code) {
  closeModal();
  setTimeout(() => {
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
    setTimeout(() => {
      const ta = document.getElementById('enquiryMsg');
      if(ta) ta.value = `I am interested in: ${name} (${code})\n\nPlease provide pricing and availability.`;
    }, 600);
  }, 200);
}

// ---- CONTACT FORM ----
function submitForm(e) {
  e.preventDefault();
  showToast('✅ Enquiry sent! We\'ll contact you shortly.');
  e.target.reset();
}

// ---- MOBILE MENU ----
function toggleMobile() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// ---- HELPERS ----
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError?' error':'');
  setTimeout(() => t.className = 'toast', 3200);
}

function escHtml(s) {
  return (s||'').replace(/'/g,"\\'").replace(/"/g,'&quot;');
}
