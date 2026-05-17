// ── CART ──────────────────────────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem('tkt_cart') || '[]');
}

function saveCart(c) {
  localStorage.setItem('tkt_cart', JSON.stringify(c));
}

function updateBadge() {
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => el.textContent = n > 0 ? n : 0);
}

function addCart(name, price, img) {
  let c = getCart();
  const ex = c.find(i => i.name === name);
  
  if (ex) {
    ex.qty++;
  } else {
    c.push({ name, price, img: img || '', qty: 1 });
  }
  
  saveCart(c);
  updateBadge();
  showToast('Đã thêm "' + name + '" vào giỏ 🛒');
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg, type = '') {
  let t = document.getElementById('toast');
  if (!t) return;
  
  t.textContent = msg;
  t.className = 'toast ' + (type);
  
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── INIT ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
});