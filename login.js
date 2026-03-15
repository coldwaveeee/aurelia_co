// login.js - AURELIA & CO Admin Login

// Admin credentials (in real app, this should be server-side)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Check if already logged in
document.addEventListener('DOMContentLoaded', () => {
  // Check for remembered login
  const remembered = localStorage.getItem('adminRemember');
  if (remembered === 'true') {
    document.getElementById('username').value = ADMIN_CREDENTIALS.username;
    document.getElementById('rememberMe').checked = true;
  }
  
  // Check session storage for active login
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    redirectToDashboard();
  }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  
  // Show loading state
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.classList.add('loading');
  
  // Simulate network delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate credentials
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Successful login
    if (rememberMe) {
      localStorage.setItem('adminRemember', 'true');
    } else {
      localStorage.removeItem('adminRemember');
    }
    
    // Set session storage (cleared when browser closed)
    sessionStorage.setItem('adminLoggedIn', 'true');
    sessionStorage.setItem('adminUsername', username);
    sessionStorage.setItem('adminLoginTime', new Date().toISOString());
    
    // Redirect to admin dashboard
    redirectToDashboard();
  } else {
    // Failed login
    loginBtn.classList.remove('loading');
    showError('Invalid username or password');
    
    // Shake animation for error
    document.querySelector('.login-card').style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      document.querySelector('.login-card').style.animation = 'slideUp 0.6s ease';
    }, 500);
  }
});

// Redirect to admin dashboard
function redirectToDashboard() {
  window.location.href = 'admin.html';
}

// Show error message
function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  
  errorText.textContent = message;
  errorDiv.classList.add('show');
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    errorDiv.classList.remove('show');
  }, 3000);
}

// Forgot password handler
document.getElementById('forgotPassword').addEventListener('click', (e) => {
  e.preventDefault();
  showError('Please contact system administrator');
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Prevent back button after logout
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});