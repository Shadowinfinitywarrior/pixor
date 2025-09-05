document.addEventListener('DOMContentLoaded', () => {
  // Navigation bar link management
  const token = localStorage.getItem('token');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutLink = document.getElementById('logout');

  if (token) {
    // User is logged in: show Logout, hide Login/Register
    if (logoutLink) logoutLink.style.display = 'block';
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
  } else {
    // User is not logged in: show Login/Register, hide Logout
    if (logoutLink) logoutLink.style.display = 'none';
    if (loginLink) loginLink.style.display = 'block';
    if (registerLink) registerLink.style.display = 'block';
  }

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          window.location.href = data.role === 'admin' ? '/adminDashboard' : '/userDashboard';
        } else {
          console.error('Login error:', response.status, data);
          alert(data.message || 'Error logging in');
        }
      } catch (error) {
        console.error('Login fetch error:', error);
        alert('Error logging in: Network or server issue');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          window.location.href = data.role === 'admin' ? '/adminDashboard' : '/userDashboard';
        } else {
          console.error('Register error:', response.status, data);
          alert(data.message || 'Error registering');
        }
      } catch (error) {
        console.error('Register fetch error:', error);
        alert('Error registering: Network or server issue');
      }
    });
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/';
    });
  }
});