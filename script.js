// script.js - Luxe Bags - Complete e-commerce functionality with Amazon Affiliate

// Amazon Affiliate Configuration
const AMAZON_AFFILIATE_ID = 'craftandresin-20'; // Your Amazon affiliate ID

// Product database with categories, descriptions, images, and Amazon links
let products = JSON.parse(localStorage.getItem('luxeProducts')) || [
  {
  id: 1,
  name: "BAGSMART Lightweight Travel Bag with Compartments",
  reviews: 1234,
  price: 39.99,
  amazonPrice: 39.99,
  category: "tote",
  description: "Lightweight travel handbag with multiple compartments...",
  isBestseller: true,
  isNew: true,
  isSale: false,
  image: "images/on_sale_3.jpg",
  amazonUrl: "https://www.amazon.com/BAGSMART-Lightweight-Compartments-Shoulder-Handbag/dp/B0CS2R1S1B/ref=pd_ci_mcx_mh_mcx_views_0_image?pd_rd_w=N8TYt&content-id=amzn1.sym.781fe6e1-9487-4a74-b81e-5a879e5ec273%3Aamzn1.symc.c3d5766d-b606-46b8-ab07-1d9d1da0638a&pf_rd_p=781fe6e1-9487-4a74-b81e-5a879e5ec273&pf_rd_r=EEV4AY37DFMAGDCR61RR&pd_rd_wg=PIbwb&pd_rd_r=b2650f24-d424-49a6-9e70-fea3eeac44c1&pd_rd_i=B0CS2R1S1B&th=1&psc=1"
},
  { 
    id: 2, 
    name: "Premium Leather Executive Tote", 
    reviews: 856, 
    price: 89.99, 
    amazonPrice: 79.99,
    category: "tote", 
    description: "Sophisticated leather tote for the modern professional. Features laptop compartment and organizer pockets.", 
    isBestseller: true, 
    isNew: false, 
    isSale: true, 
    image: "images/on_sale_1.jpg",
    amazonUrl: "https://www.amazon.com/dp/B07X5Y9Z3K"
  },
  { 
    id: 3, 
    name: "Summer Woven Beach Tote", 
    reviews: 2103, 
    price: 29.99, 
    amazonPrice: 24.99,
    category: "tote", 
    description: "Lightweight woven tote, your perfect summer companion. Spill-resistant lining.", 
    isBestseller: true, 
    isNew: true, 
    isSale: false, 
    image: "images/on_sale_2.jpg",
    amazonUrl: "https://www.amazon.com/dp/B06X5Y9Z3K"
  },
  { 
    id: 4, 
    name: "Structured Italian Leather Handbag", 
    reviews: 567, 
    price: 129.99, 
    amazonPrice: 119.99,
    category: "satchel", 
    description: "Elegant structured handbag crafted from premium Italian leather. Gold-toned hardware.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    image: "images/on_sale_4.jpg",
    amazonUrl: "https://www.amazon.com/dp/B09X5Y9Z3K"
  },
  { 
    id: 5, 
    name: "Quilted Chain Strap Designer Bag", 
    reviews: 423, 
    price: 149.99, 
    amazonPrice: 139.99,
    category: "crossbody", 
    description: "Luxurious quilted design with signature chain strap. Evening elegance redefined.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    image: "images/on_sale_5.jpg",
    amazonUrl: "https://www.amazon.com/dp/B05X5Y9Z3K"
  },
  { 
    id: 6, 
    name: "Classic Top Handle Satchel", 
    reviews: 789, 
    price: 99.99, 
    amazonPrice: 89.99,
    category: "satchel", 
    description: "Timeless top handle satchel that transitions from desk to dinner effortlessly.", 
    isBestseller: true, 
    isNew: false, 
    isSale: true, 
    image: "images/on_sale_6.jpg",
    amazonUrl: "https://www.amazon.com/dp/B04X5Y9Z3K"
  },
  { 
    id: 7, 
    name: "Everyday Slouchy Shoulder Bag", 
    reviews: 1456, 
    price: 54.99, 
    amazonPrice: 49.99,
    category: "hobo", 
    description: "Relaxed slouchy shoulder bag in soft vegan leather. Fits all daily essentials.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    image: "images/on_sale_7.jpg",
    amazonUrl: "https://www.amazon.com/dp/B03X5Y9Z3K"
  },
  { 
    id: 8, 
    name: "Evening Chain Shoulder Purse", 
    reviews: 634, 
    price: 79.99, 
    amazonPrice: 69.99,
    category: "clutch", 
    description: "Glamorous chain shoulder purse for special evenings. Satin lining.", 
    isBestseller: false, 
    isNew: true, 
    isSale: false, 
    image: "images/on_sale_8.jpg",
    amazonUrl: "https://www.amazon.com/dp/B02X5Y9Z3K"
  },
  { 
    id: 9, 
    name: "Convertible Leather Shoulder Bag", 
    reviews: 923, 
    price: 69.99, 
    amazonPrice: 59.99,
    category: "crossbody", 
    description: "2-in-1 design: wear as shoulder bag or remove strap for clutch.", 
    isBestseller: true, 
    isNew: false, 
    isSale: true, 
    image: "images/on_sale_9.jpg",
    amazonUrl: "https://www.amazon.com/dp/B01X5Y9Z3K"
  },
  { 
    id: 10, 
    name: "Compact Travel Crossbody", 
    reviews: 1876, 
    price: 39.99, 
    amazonPrice: 34.99,
    category: "crossbody", 
    description: "Hands-free crossbody perfect for travel. RFID-blocking pockets.", 
    isBestseller: true, 
    isNew: false, 
    isSale: false, 
    image: "images/on_sale_10.jpg",
    amazonUrl: "https://www.amazon.com/dp/B00X5Y9Z3K"
  }
];

// Load categories from localStorage
let categories = JSON.parse(localStorage.getItem('luxeCategories')) || [
  { id: 'tote', name: 'Tote Bags', count: 0, icon: '🛍️' },
  { id: 'satchel', name: 'Satchels', count: 0, icon: '💼' },
  { id: 'crossbody', name: 'Crossbody', count: 0, icon: '🎒' },
  { id: 'hobo', name: 'Hobo Bags', count: 0, icon: '👜' },
  { id: 'clutch', name: 'Clutches', count: 0, icon: '👛' },
  { id: 'wristlet', name: 'Wristlets', count: 0, icon: '⌚' }
];

// Shopping cart state (repurposed for Amazon redirects)
let cart = JSON.parse(localStorage.getItem('luxeCart')) || [];
let currentFilter = 'all';
let currentCategory = 'all';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartItemsCount = document.getElementById('cartItemsCount');
const closeCart = document.getElementById('closeCart');
const cartIcon = document.getElementById('cartIcon');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');

// Listen for updates from admin panel
window.addEventListener('productsUpdated', () => {
  products = JSON.parse(localStorage.getItem('luxeProducts')) || products;
  categories = JSON.parse(localStorage.getItem('luxeCategories')) || categories;
  renderProducts(currentFilter);
  updateCategoryDisplays();
});

// ========== AMAZON AFFILIATE FUNCTIONS ==========

// Function to add affiliate tag to Amazon URL
function getAmazonAffiliateLink(amazonUrl) {
  if (!amazonUrl) return '#';
  
  // Add affiliate tag to URL
  if (amazonUrl.includes('?')) {
    return amazonUrl + '&tag=' + AMAZON_AFFILIATE_ID;
  } else {
    return amazonUrl + '?tag=' + AMAZON_AFFILIATE_ID;
  }
}

// Function to redirect to Amazon (DIRECT REDIRECT)
function redirectToAmazon(amazonUrl, productName) {
  if (!amazonUrl) {
    showNotification('❌ Amazon link not available for this product');
    return;
  }
  
  const affiliateLink = getAmazonAffiliateLink(amazonUrl);
  
  // Show notification
  showNotification(`🛒 Redirecting to Amazon: ${productName}`);
  
  // Track the click
  trackAffiliateClick(productName, amazonUrl);
  
  // DIRECT REDIRECT - user leaves your site and goes to Amazon
  setTimeout(() => {
    window.location.href = affiliateLink;
  }, 500);
}

// Track affiliate clicks
function trackAffiliateClick(productName, amazonUrl) {
  console.log(`Amazon redirect: ${productName}`);
  
  // Store in localStorage for tracking
  const clicks = JSON.parse(localStorage.getItem('amazonClicks')) || [];
  clicks.push({
    product: productName,
    url: amazonUrl,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('amazonClicks', JSON.stringify(clicks.slice(-50)));
}

// ========== HELPER FUNCTIONS ==========

// Helper: format reviews
function formatReviews(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

// Helper: show notification
function showNotification(message) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

// Helper function to generate star ratings
function generateStars(reviewCount) {
    const rating = (reviewCount % 5) + 1;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Update category displays
function updateCategoryDisplays() {
  document.querySelectorAll('.category-card').forEach(card => {
    const category = card.dataset.category;
    const count = products.filter(p => p.category === category).length;
    const countElement = card.querySelector('.category-count');
    if (countElement) {
      countElement.textContent = `${count} styles`;
    }
  });
}

// ========== RENDER PRODUCTS WITH AMAZON BUTTONS ==========

// Render products based on filter
function renderProducts(filter = 'all') {
  if (!productGrid) return;
  
  let filteredProducts = products;
  
  // Apply category filter
  if (filter !== 'all') {
    filteredProducts = products.filter(p => p.category === filter);
  }
  
  // Apply navigation filters
  if (currentCategory === 'new') {
    filteredProducts = filteredProducts.filter(p => p.isNew);
    document.getElementById('collectionTitle').textContent = 'New Arrivals';
    document.getElementById('collectionSubtitle').textContent = `${filteredProducts.length} fresh styles`;
  } else if (currentCategory === 'bestsellers') {
    filteredProducts = filteredProducts.filter(p => p.isBestseller);
    document.getElementById('collectionTitle').textContent = 'Bestsellers';
    document.getElementById('collectionSubtitle').textContent = `${filteredProducts.length} top-rated styles`;
  } else if (currentCategory === 'sale') {
    filteredProducts = filteredProducts.filter(p => p.isSale);
    document.getElementById('collectionTitle').textContent = 'Sale';
    document.getElementById('collectionSubtitle').textContent = `${filteredProducts.length} discounted styles`;
  } else {
    document.getElementById('collectionTitle').textContent = 'Featured Collection';
    document.getElementById('collectionSubtitle').textContent = `${filteredProducts.length} premium styles selected for you`;
  }

  productGrid.innerHTML = '';

  filteredProducts.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', prod.id);
    
    const reviewsFormatted = formatReviews(prod.reviews);
    
    // Calculate savings if applicable
    const savings = prod.price - (prod.amazonPrice || prod.price);
    const savingsPercent = savings > 0 ? Math.round((savings / prod.price) * 100) : 0;
    
    // Use image or fallback
    const productImage = prod.image || 'https://placehold.co/300x300/f472b6/ffffff?text=Bag';
    
    // Price display
    const priceDisplay = prod.amazonPrice ? `$${prod.amazonPrice.toFixed(2)}` : `$${prod.price.toFixed(2)}`;
    
    card.innerHTML = `
      <div class="product-badges">
        ${prod.isNew ? '<span class="badge new">New</span>' : ''}
        ${prod.isBestseller ? '<span class="badge bestseller">Bestseller</span>' : ''}
        ${prod.isSale ? '<span class="badge sale">Sale</span>' : ''}
        ${savings > 0 ? `<span class="badge save">Save ${savingsPercent}%</span>` : ''}
        ${prod.amazonUrl ? '<span class="badge amazon"><i class="fab fa-amazon"></i> Amazon</span>' : ''}
      </div>
      <div class="product-image">
        <img src="${productImage}" 
             alt="${prod.name}"
             onerror="this.src='https://placehold.co/300x300/f472b6/ffffff?text=Bag'">
        <div class="product-actions">
          <button class="quick-view-btn action-btn" data-id="${prod.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button class="wishlist-btn action-btn" data-id="${prod.id}">
            <i class="far fa-heart"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-title">${prod.name}</h3>
        <div class="product-category">${prod.category}</div>
        <div class="product-rating">
          ${generateStars(prod.reviews)}
          <span>(${reviewsFormatted})</span>
        </div>
        <div class="product-price">${priceDisplay}</div>
        ${savings > 0 ? `<span class="product-original-price">$${prod.price.toFixed(2)}</span>` : ''}
        <p class="product-description">${prod.description.substring(0, 60)}...</p>
        <div class="product-stock">
          <i class="fas fa-check-circle"></i> 
          <span>In Stock on Amazon</span>
        </div>
        <button class="amazon-redirect-btn" data-amazon-url="${prod.amazonUrl || ''}" data-product-name="${prod.name}">
          <i class="fab fa-amazon"></i> Buy on Amazon
        </button>
      </div>
    `;

    // Amazon button click handler - DIRECT REDIRECT
    const amazonBtn = card.querySelector('.amazon-redirect-btn');
    amazonBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const amazonUrl = amazonBtn.dataset.amazonUrl;
      const productName = amazonBtn.dataset.productName;
      if (amazonUrl) {
        redirectToAmazon(amazonUrl, productName);
      } else {
        showNotification('❌ Amazon link not available');
      }
    });

    // Quick view button
    const quickViewBtn = card.querySelector('.quick-view-btn');
    quickViewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProductModal(prod);
    });

    // Wishlist button
    const wishBtn = card.querySelector('.wishlist-btn');
    wishBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToWishlist(prod);
    });

    productGrid.appendChild(card);
  });

  // After rendering, update category counts
  updateCategoryDisplays();
}

// ========== WISHLIST FUNCTIONS ==========

// Add to wishlist function
function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem('luxeWishlist')) || [];
  
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.amazonPrice || product.price,
      image: product.image,
      amazonUrl: product.amazonUrl
    });
    localStorage.setItem('luxeWishlist', JSON.stringify(wishlist));
    showNotification(`❤️ ${product.name} added to wishlist!`);
  } else {
    showNotification(`⚠️ ${product.name} is already in your wishlist!`);
  }
}

// ========== MODAL FUNCTIONS ==========

// Open product modal
function openProductModal(product) {
  const modalTitle = document.getElementById('modalTitle');
  const modalReviews = document.getElementById('modalReviews');
  const modalPrice = document.getElementById('modalPrice');
  const modalDescription = document.getElementById('modalDescription');
  const modalImage = document.getElementById('modalImage');
  const modalStock = document.getElementById('modalStock');
  
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalReviews) modalReviews.innerHTML = generateStars(product.reviews) + ` (${formatReviews(product.reviews)} reviews)`;
  if (modalPrice) modalPrice.textContent = `$${(product.amazonPrice || product.price).toFixed(2)}`;
  if (modalDescription) modalDescription.textContent = product.description;
  
  // Set modal image
  if (modalImage) {
    // Find or create img element inside modalImage div
    let img = modalImage.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      modalImage.appendChild(img);
    }
    img.src = product.image || 'images/on_sale_3.jpg';
    img.alt = product.name;
  }
  
  // Update stock status
  if (modalStock) {
    modalStock.innerHTML = '<i class="fas fa-check-circle"></i> In Stock on Amazon';
  }
  
  // Update Add to Cart button to redirect to Amazon
  const addToCartModal = document.getElementById('addToCartModal');
  if (addToCartModal) {
    addToCartModal.innerHTML = '<i class="fab fa-amazon"></i> Buy on Amazon';
    addToCartModal.onclick = () => {
      redirectToAmazon(product.amazonUrl, product.name);
      modal.style.display = 'none';
    };
  }
  
  // Update Wishlist button
  const wishlistModal = document.getElementById('addToWishlistModal');
  if (wishlistModal) {
    wishlistModal.onclick = () => {
      addToWishlist(product);
      modal.style.display = 'none';
    };
  }
  
  if (modal) modal.style.display = 'block';
}

// ========== EVENT LISTENERS ==========

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  
  // Update cart count to 0 since we're using Amazon redirects
  if (cartCount) cartCount.textContent = '0';
  if (cartItemsCount) cartItemsCount.textContent = '0';
  
  // Hide cart sidebar
  if (cartSidebar) {
    cartSidebar.style.display = 'none';
  }
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      currentCategory = category;
      
      // Update active state
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Scroll to products
      const productsSection = document.getElementById('productsSection');
      if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
      renderProducts(currentFilter);
    });
  });
  
  // Home link
  const homeLink = document.getElementById('homeLink');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentCategory = 'all';
      currentFilter = 'all';
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allFilterBtn) allFilterBtn.classList.add('active');
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProducts(currentFilter);
    });
  });
  
  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      currentFilter = category;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const filterBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
      if (filterBtn) filterBtn.classList.add('active');
      
      const productsSection = document.getElementById('productsSection');
      if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
      renderProducts(category);
    });
  });
  
  // Shop now button
  const shopNowBtn = document.getElementById('shopNowBtn');
  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const productsSection = document.getElementById('productsSection');
      if (productsSection) productsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Cart icon - redirect to Amazon cart
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = `https://www.amazon.com/gp/cart/view.html?tag=${AMAZON_AFFILIATE_ID}`;
    });
  }
  
  // Close cart button (if needed)
  if (closeCart) {
    closeCart.addEventListener('click', () => {
      if (cartSidebar) cartSidebar.classList.remove('open');
    });
  }
  
  // Modal close functionality
  if (modal && closeModal) {
    closeModal.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  }
  
  // Search icon
  const searchIcon = document.getElementById('searchIcon');
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      showNotification('🔍 Search products on Amazon!');
    });
  }
  
  // Wishlist icon
  const wishlistIcon = document.getElementById('wishlistIcon');
  if (wishlistIcon) {
    wishlistIcon.addEventListener('click', () => {
      showNotification('❤️ View your wishlist!');
    });
  }
  
  // Checkout button (redirect to Amazon)
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = `https://www.amazon.com/gp/cart/view.html?tag=${AMAZON_AFFILIATE_ID}`;
    });
  }
});

// Additional safety check for modal close
window.addEventListener('load', function() {
  const modal = document.getElementById('productModal');
  const closeBtn = document.querySelector('.close-modal');
  
  if (modal && closeBtn) {
    closeBtn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      modal.style.display = 'none';
      return false;
    };
  }
});
