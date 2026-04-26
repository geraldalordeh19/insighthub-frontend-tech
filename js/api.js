// ===== CONFIG =====
// IMPORTANT: Change this to your Render backend URL after deploying
const API_BASE = 'https://insighthub-backend-tech.onrender.com/api';
// For local development use: const API_BASE = 'http://localhost:5000/api';

// ===== AUTH HELPERS =====
const getToken = () => localStorage.getItem('insighthub_token');
const getUser  = () => {
  const u = localStorage.getItem('insighthub_user');
  return u ? JSON.parse(u) : null;
};
const setAuth  = (token, user) => {
  localStorage.setItem('insighthub_token', token);
  localStorage.setItem('insighthub_user', JSON.stringify(user));
};
const clearAuth = () => {
  localStorage.removeItem('insighthub_token');
  localStorage.removeItem('insighthub_user');
};
const isLoggedIn = () => !!getToken();
const isAdmin    = () => getUser()?.role === 'admin';

// ===== API FETCH WRAPPER =====
async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// ===== TOAST =====
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `show ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = ''; }, 3000);
}

// ===== NAV RENDER =====
function renderNav(activePage = '') {
  const user = getUser();
  const loggedIn = isLoggedIn();

  const navEl = document.getElementById('main-nav');
  if (!navEl) return;

  const links = `
    <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Browse</a>
    ${loggedIn ? `<a href="submit.html" class="${activePage === 'submit' ? 'active' : ''}">Submit</a>` : ''}
    ${loggedIn ? `<a href="bookmarks.html" class="${activePage === 'bookmarks' ? 'active' : ''}">Saved</a>` : ''}
    ${isAdmin() ? `<a href="admin.html" class="${activePage === 'admin' ? 'active' : ''}" style="color:var(--accent)">Admin</a>` : ''}
  `;

  const authLinks = loggedIn
    ? `<span style="font-size:0.8rem;color:var(--text3);margin-right:8px">Hi, ${user.name.split(' ')[0]}</span>
       <button class="btn btn-outline btn-sm" onclick="logout()">Sign out</button>`
    : `<a href="login.html" class="btn btn-outline btn-sm">Sign in</a>
       <a href="register.html" class="btn btn-primary btn-sm">Register</a>`;

  navEl.innerHTML = `
    <a class="nav-logo" href="index.html">InsightHub <span>ACAD CITY</span></a>
    <div class="nav-links">${links}${authLinks}</div>
  `;
}

function logout() {
  clearAuth();
  window.location.href = 'index.html';
}

// ===== UTILS =====
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function tagsToArray(str) {
  if (!str) return [];
  return str.split(',').map(t => t.trim()).filter(Boolean);
}

function renderTags(str) {
  return tagsToArray(str).map(t => `<span class="tag">${t}</span>`).join('');
}

function requireAuth() {
  if (!isLoggedIn()) {
    showToast('Please sign in to continue', 'error');
    setTimeout(() => { window.location.href = 'login.html'; }, 800);
    return false;
  }
  return true;
}

function requireAdmin() {
  if (!isAdmin()) {
    showToast('Admin access required', 'error');
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
    return false;
  }
  return true;
}
