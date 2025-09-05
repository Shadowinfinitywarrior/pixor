document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const logout = document.getElementById('logout');
    if (logout) logout.style.display = 'block';
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Products page
  const productsDiv = document.getElementById('products');
  if (productsDiv) {
    try {
      const response = await fetch('/api/products', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const products = await response.json();
      if (products.length === 0) {
        productsDiv.innerHTML = '<p>No products available. Please add products via the admin dashboard.</p>';
      } else {
        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';
          productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <p>${product.description || 'No description'}</p>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Add to Cart</button>
          `;
          productsDiv.appendChild(productDiv);
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      productsDiv.innerHTML = '<p>Error loading products.</p>';
      alert('Error fetching products: Check server connection');
    }
  }

  // Checkout page
  const cartDiv = document.getElementById('cart');
  if (cartDiv) {
    if (cart.length === 0) {
      cartDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${item.name} - $${item.price} x ${item.quantity}</p>`;
        cartDiv.appendChild(itemDiv);
      });
    }

    document.getElementById('place-order')?.addEventListener('click', async () => {
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ products: cart }),
        });
        if (response.ok) {
          alert('Order placed successfully');
          localStorage.removeItem('cart');
          window.location.href = '/userDashboard';
        } else {
          const data = await response.json();
          console.error('Order error:', response.status, data);
          alert(data.message || 'Error placing order');
        }
      } catch (error) {
        console.error('Order fetch error:', error);
        alert('Error placing order: Network or server issue');
      }
    });
  }
});

function addToCart(id, name, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.productId === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId: id, name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart');
}