// admin.js - AURELIA & CO Admin Dashboard

// ===== INITIAL PRODUCT DATABASE =====
let products = JSON.parse(localStorage.getItem('adminProducts')) || [
 { 
    id: 1, 
    name: "Minimalist Canvas Weekend Tote", 
    reviews: 1234, 
    image: "images/blog_1jpg", 
    price: 34.99, 
    category: "tote", 
    description: "Spacious canvas tote perfect for weekends.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 2, 
    name: "Premium Leather Executive Tote", 
    reviews: 856, 
    image: "https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?cs=srgb&dl=pexels-pixabay-38537.jpg&fm=jpg&_gl=1*zzeng8*_ga*MTY0Mjg1MzAwNS4xNzczNjA3NjE2*_ga_8JE65Q40S6*czE3NzM2MDc2MTUkbzEkZzEkdDE3NzM2MDc3MjgkajU5JGwwJGgw", 
    price: 89.99, 
    category: "tote", 
    description: "Sophisticated leather tote for professionals.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 3, 
    name: "Summer Woven Beach Tote", 
    reviews: 2103, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 29.99, 
    category: "tote", 
    description: "Lightweight woven tote for summer.", 
    isBestseller: true, 
    isNew: true, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 3, 
    name: "Structured Italian Leather Handbag", 
    reviews: 567, 
    image: "https://images.unsplash.com/photo-1584917865441-4c2b2b8f7b3c?w=600", 
    price: 129.99, 
    category: "satchel", 
    description: "Elegant structured handbag.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 5, 
    name: "Quilted Chain Strap Designer Bag", 
    reviews: 423, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 149.99, 
    category: "crossbody", 
    description: "Luxurious quilted design.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 6, 
    name: "Classic Top Handle Satchel", 
    reviews: 789, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 99.99, 
    category: "satchel", 
    description: "Timeless top handle satchel.", 
    isBestseller: true, 
    isNew: false, 
    isSale: true, 
    inStock: true 
  },
  { 
    id: 7, 
    name: "Everyday Slouchy Shoulder Bag", 
    reviews: 1456, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 54.99, 
    category: "hobo", 
    description: "Relaxed slouchy shoulder bag.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 8, 
    name: "Evening Chain Shoulder Purse", 
    reviews: 634, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 79.99, 
    category: "clutch", 
    description: "Glamorous chain shoulder purse.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    inStock: true 
  },
  { 
    id: 9, 
    name: "Convertible Leather Shoulder Bag", 
    reviews: 923, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 69.99, 
    category: "crossbody", 
    description: "2-in-1 convertible design.", 
    isBestseller: true, 
    isNew: false, 
    isSale: true, 
    inStock: true 
  },
  { 
    id: 10, 
    name: "Compact Travel Crossbody", 
    reviews: 1876, 
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49d?w=600", 
    price: 39.99, 
    category: "crossbody", 
    description: "Hands-free travel crossbody.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    inStock: true 
  }
];
// Categories
const categories = [
  { id: 1, name: "Tote", count: 12, icon: "🛍️" },
  { id: 2, name: "Clutch", count: 8, icon: "👛" },
  { id: 3, name: "Crossbody", count: 15, icon: "🎒" },
  { id: 4, name: "Satchel", count: 10, icon: "💼" },
  { id: 5, name: "Hobo", count: 7, icon: "👜" },
  { id: 6, name: "Wristlet", count: 5, icon: "⌚" }
];

// Current state
let currentFilter = 'all';
let currentProductId = null;
let imageData = {};

// ===== DOM Elements =====
// Views
const dashboardView = document.getElementById('dashboardView');
const productsView = document.getElementById('productsView');
const categoriesView = document.getElementById('categoriesView');
const ordersView = document.getElementById('ordersView');
const customersView = document.getElementById('customersView');
const settingsView = document.getElementById('settingsView');
const pageTitle = document.getElementById('pageTitle');

// Tabs
const dashboardTab = document.getElementById('dashboardTab');
const productsTab = document.getElementById('productsTab');
const categoriesTab = document.getElementById('categoriesTab');
const ordersTab = document.getElementById('ordersTab');
const customersTab = document.getElementById('customersTab');
const settingsTab = document.getElementById('settingsTab');

// Modals
const productModal = document.getElementById('productModal');
const deleteModal = document.getElementById('deleteModal');
const imageModal = document.getElementById('imagePreviewModal');
const closeProductModal = document.getElementById('closeProductModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const closeImageModal = document.getElementById('closeImageModal');
const cancelProductModal = document.getElementById('cancelProductModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

// Forms
const productForm = document.getElementById('productForm');
const productName = document.getElementById('productName');
const productCategory = document.getElementById('productCategory');
const productPrice = document.getElementById('productPrice');
const productReviews = document.getElementById('productReviews');
const productImage = document.getElementById('productImage');
const productDescription = document.getElementById('productDescription');
const productBestseller = document.getElementById('productBestseller');
const productNew = document.getElementById('productNew');
const productSale = document.getElementById('productSale');
const productInStock = document.getElementById('productInStock');
const modalTitle = document.getElementById('modalTitle');
const productId = document.getElementById('productId');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

// Buttons
const addProductBtn = document.getElementById('addProductBtn');
const saveProductBtn = document.getElementById('saveProductBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const searchInput = document.getElementById('searchInput');
const logoutBtn = document.getElementById('logoutBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');

// ===== Initialize Dashboard =====
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateStats();
  loadCategories();
  loadRecentProducts();
  setupEventListeners();
});

// ===== Setup Event Listeners =====
function setupEventListeners() {
  // Tab navigation
  dashboardTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('dashboard');
  });
  
  productsTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('products');
  });
  
  categoriesTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('categories');
  });
  
  ordersTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('orders');
  });
  
  customersTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('customers');
  });
  
  settingsTab.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('settings');
  });
  
  // Product actions
  addProductBtn.addEventListener('click', () => openProductModal());
  
  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      loadProducts();
    });
  });
  
  // Search
  searchInput.addEventListener('input', () => {
    loadProducts();
  });
  
  // Form submission
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProduct();
  });
  
  // Image preview
  productImage.addEventListener('change', handleImagePreview);
  
  // Modal close buttons
  closeProductModal.addEventListener('click', () => closeModal(productModal));
  closeDeleteModal.addEventListener('click', () => closeModal(deleteModal));
  closeImageModal.addEventListener('click', () => closeModal(imageModal));
  cancelProductModal.addEventListener('click', () => closeModal(productModal));
  cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));
  
  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target === productModal) closeModal(productModal);
    if (e.target === deleteModal) closeModal(deleteModal);
    if (e.target === imageModal) closeModal(imageModal);
  });
  
  // Export/Import
  exportBtn.addEventListener('click', exportProducts);
  importBtn.addEventListener('click', () => {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = importProducts;
    input.click();
  });
  
  // Logout
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  // Save settings
  document.getElementById('saveSettings').addEventListener('click', () => {
    showNotification('Settings saved successfully!');
  });
}

// ===== Switch Views =====
function switchView(view) {
  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  
  // Remove active class from all tabs
  document.querySelectorAll('.sidebar-nav li').forEach(t => t.classList.remove('active'));
  
  // Show selected view
  switch(view) {
    case 'dashboard':
      dashboardView.classList.add('active');
      dashboardTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Dashboard';
      loadRecentProducts();
      updateStats();
      break;
    case 'products':
      productsView.classList.add('active');
      productsTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Products';
      loadProducts();
      break;
    case 'categories':
      categoriesView.classList.add('active');
      categoriesTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Categories';
      loadCategories();
      break;
    case 'orders':
      ordersView.classList.add('active');
      ordersTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Orders';
      break;
    case 'customers':
      customersView.classList.add('active');
      customersTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Customers';
      break;
    case 'settings':
      settingsView.classList.add('active');
      settingsTab.parentElement.classList.add('active');
      pageTitle.textContent = 'Settings';
      break;
  }
}

// ===== Load Products into Table =====
function loadProducts() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;
  
  let filteredProducts = [...products];
  
  // Apply category filter
  if (currentFilter !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
  }
  
  // Apply search
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm)
    );
  }
  
  tbody.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const row = document.createElement('tr');
    
    // Get status badges
    const statuses = [];
    if (product.isBestseller) statuses.push('<span class="status-badge bestseller">Bestseller</span>');
    if (product.isNew) statuses.push('<span class="status-badge new">New</span>');
    if (product.isSale) statuses.push('<span class="status-badge sale">Sale</span>');
    if (product.inStock) statuses.push('<span class="status-badge instock">In Stock</span>');
    
    row.innerHTML = `
      <td>
        <div class="product-thumb" onclick="viewImage('${product.id}')">
          ${product.image ? 
            `<img src="${product.image}" alt="${product.name}">` : 
            `<i class="fas fa-image"></i>`
          }
        </div>
      </td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>$${product.price.toFixed(2)}</td>
      <td>${formatNumber(product.reviews)}</td>
      <td>${statuses.join(' ')}</td>
      <td>
        <div class="action-buttons">
          <button class="action-btn edit-btn" onclick="editProduct(${product.id})" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
          <button class="action-btn view-btn" onclick="viewImage('${product.id}')" title="View Image">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </td>
    `;
    
    tbody.appendChild(row);
  });
  
  // Update stats
  updateStats();
}

// ===== Load Categories =====
function loadCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-admin-card';
    card.innerHTML = `
      <div class="category-icon">${cat.icon}</div>
      <h3>${cat.name}</h3>
      <p>${cat.count} products</p>
      <div class="action-buttons">
        <button class="action-btn edit-btn" onclick="editCategory(${cat.id})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" onclick="deleteCategory(${cat.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== Load Recent Products =====
function loadRecentProducts() {
  const grid = document.getElementById('recentProducts');
  if (!grid) return;
  
  const recent = [...products].slice(-4).reverse();
  
  grid.innerHTML = '';
  
  recent.forEach(product => {
    const card = document.createElement('div');
    card.className = 'recent-card';
    card.innerHTML = `
      <div class="recent-img">
        ${product.image ? 
          `<img src="${product.image}" alt="${product.name}">` : 
          `<i class="fas fa-image"></i>`
        }
      </div>
      <div class="recent-info">
        <h4>${product.name}</h4>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ===== Update Stats =====
function updateStats() {
  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('totalBestsellers').textContent = products.filter(p => p.isBestseller).length;
  document.getElementById('totalSale').textContent = products.filter(p => p.isSale).length;
}

// ===== Open Product Modal (Add/Edit) =====
function openProductModal(product = null) {
  if (product) {
    // Edit mode
    modalTitle.textContent = 'Edit Product';
    productId.value = product.id;
    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productReviews.value = product.reviews;
    productDescription.value = product.description || '';
    productBestseller.checked = product.isBestseller || false;
    productNew.checked = product.isNew || false;
    productSale.checked = product.isSale || false;
    productInStock.checked = product.inStock !== false;
    
    if (product.image) {
      imagePreview.src = product.image;
      imagePreviewContainer.style.display = 'block';
    } else {
      imagePreviewContainer.style.display = 'none';
    }
  } else {
    // Add mode
    modalTitle.textContent = 'Add New Product';
    productId.value = '';
    productForm.reset();
    imagePreviewContainer.style.display = 'none';
  }
  
  productModal.classList.add('show');
}

// ===== Save Product =====
function saveProduct() {
  const id = productId.value ? parseInt(productId.value) : Date.now();
  
  // Handle image
  let image = null;
  if (imageData[id]) {
    image = imageData[id];
  } else if (productId.value) {
    const existing = products.find(p => p.id === parseInt(productId.value));
    if (existing) image = existing.image;
  }
  
  const product = {
    id: id,
    name: productName.value,
    category: productCategory.value,
    price: parseFloat(productPrice.value),
    reviews: parseInt(productReviews.value) || 0,
    description: productDescription.value,
    isBestseller: productBestseller.checked,
    isNew: productNew.checked,
    isSale: productSale.checked,
    inStock: productInStock.checked,
    image: image
  };
  
  if (productId.value) {
    // Update existing
    const index = products.findIndex(p => p.id === parseInt(productId.value));
    if (index !== -1) {
      products[index] = product;
    }
  } else {
    // Add new
    products.push(product);
  }
  
  // Save to localStorage
  localStorage.setItem('adminProducts', JSON.stringify(products));
  
  // Update UI
  loadProducts();
  updateStats();
  loadRecentProducts();
  closeModal(productModal);
  showNotification(productId.value ? 'Product updated!' : 'Product added!');
}

// ===== Edit Product =====
function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    openProductModal(product);
  }
}

// ===== Delete Product =====
function deleteProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    document.getElementById('deleteProductName').textContent = product.name;
    currentProductId = id;
    deleteModal.classList.add('show');
  }
}

// ===== Confirm Delete =====
confirmDeleteBtn.addEventListener('click', () => {
  if (currentProductId) {
    products = products.filter(p => p.id !== currentProductId);
    localStorage.setItem('adminProducts', JSON.stringify(products));
    loadProducts();
    updateStats();
    loadRecentProducts();
    closeModal(deleteModal);
    showNotification('Product deleted!');
  }
});

// ===== Handle Image Preview =====
function handleImagePreview(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imagePreview.src = event.target.result;
      imagePreviewContainer.style.display = 'block';
      
      // Store image data
      const id = productId.value || 'temp';
      imageData[id] = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ===== View Image =====
function viewImage(id) {
  const product = products.find(p => p.id == id);
  if (product && product.image) {
    document.getElementById('fullImagePreview').src = product.image;
    imageModal.classList.add('show');
  } else {
    showNotification('No image available');
  }
}

// ===== Export Products =====
function exportProducts() {
  const dataStr = JSON.stringify(products, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `products_export_${new Date().toISOString().slice(0,10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  showNotification('Products exported!');
}

// ===== Import Products =====
function importProducts(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          products = imported;
          localStorage.setItem('adminProducts', JSON.stringify(products));
          loadProducts();
          updateStats();
          showNotification('Products imported!');
        }
      } catch (error) {
        showNotification('Invalid file format');
      }
    };
    reader.readAsText(file);
  }
}

// ===== Category Functions =====
function editCategory(id) {
  showNotification('Edit category feature coming soon!');
}

function deleteCategory(id) {
  showNotification('Delete category feature coming soon!');
}

// ===== Helper Functions =====
function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

function closeModal(modal) {
  modal.classList.remove('show');
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1e1e1e;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add notification animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Prevent back button after logout
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});
// admin.js - AURELIA & CO Admin Dashboard (with Authentication)

// ===== AUTHENTICATION CHECK =====
(function checkAuth() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // Redirect to login page
    window.location.replace('login.html');
    return;
  }
  
  // Set username from session
  const username = sessionStorage.getItem('adminUsername') || 'Admin';
  document.getElementById('adminUsername').textContent = username;
  document.getElementById('headerUsername').textContent = username;
  
  // Log login time
  console.log('Admin logged in at:', sessionStorage.getItem('adminLoginTime'));
})();

// ===== SESSION MANAGEMENT =====
let sessionTimeout;
let warningTimeout;
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 2 * 60 * 1000; // 2 minutes before expiry

function resetSessionTimer() {
  clearTimeout(sessionTimeout);
  clearTimeout(warningTimeout);
  
  // Show warning 2 minutes before expiry
  warningTimeout = setTimeout(showSessionWarning, SESSION_DURATION - WARNING_TIME);
  
  // End session after duration
  sessionTimeout = setTimeout(endSession, SESSION_DURATION);
}

function showSessionWarning() {
  const warning = document.getElementById('timeoutWarning');
  warning.classList.add('show');
  
  // Update countdown
  let timeLeft = 120; // 2 minutes in seconds
  const countdown = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timeoutCountdown').textContent = 
      `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
  
  // Store interval to clear later
  window.countdownInterval = setInterval(() => {}, 0);
}

// Extend session
document.getElementById('extendSession').addEventListener('click', () => {
  document.getElementById('timeoutWarning').classList.remove('show');
  clearInterval(window.countdownInterval);
  resetSessionTimer();
  showNotification('Session extended for 30 minutes');
});

function endSession() {
  // Clear all session data
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminUsername');
  sessionStorage.removeItem('adminLoginTime');
  
  // Redirect to login
  window.location.replace('login.html?timeout=true');
}

// ===== LOGOUT FUNCTIONALITY =====
document.getElementById('logoutBtn').addEventListener('click', () => {
  // Clear session
  sessionStorage.removeItem('adminLoggedIn');
  sessionStorage.removeItem('adminUsername');
  sessionStorage.removeItem('adminLoginTime');
  
  // Clear remember me if exists
  if (!document.getElementById('rememberMe')?.checked) {
    localStorage.removeItem('adminRemember');
  }
  
  // Redirect to login
  window.location.replace('login.html');
});

// ===== ACTIVITY TRACKING =====
let activityTimer;
function resetActivityTimer() {
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    // Auto logout after 5 minutes of inactivity
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
      showNotification('Logged out due to inactivity');
      endSession();
    }
  }, 5 * 60 * 1000);
}

// Track user activity
['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
  document.addEventListener(event, resetActivityTimer);
});

// Start timers
resetSessionTimer();
resetActivityTimer();

// ===== PREVENT BACK BUTTON AFTER LOGOUT =====
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Page was loaded from cache (back button)
    checkAuth();
  }
});

// ===== SECURE PAGE RELOAD =====
window.addEventListener('beforeunload', () => {
  // Optionally log logout time
  console.log('Session ended at:', new Date().toISOString());
});


// ===== REST OF YOUR EXISTING ADMIN.JS CODE =====
// [Your existing product management code goes here]
// Make sure to keep all the product management functions you had before
