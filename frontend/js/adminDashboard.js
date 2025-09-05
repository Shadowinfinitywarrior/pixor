document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token || localStorage.getItem('role') !== 'admin') {
    window.location.href = '/login.html';
    return;
  }

  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const stock = document.getElementById('stock').value;
      const description = document.getElementById('description').value;

      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, price, stock, description }),
        });
        if (response.ok) {
          alert('Product added');
          productForm.reset();
        } else {
          alert('Error adding product');
        }
      } catch (error) {
        alert('Error adding product');
      }
    });
  }

  try {
    const response = await fetch('/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const orders = await response.json();
    const ordersDiv = document.getElementById('orders');

    orders.forEach(order => {
      const orderDiv = document.createElement('div');
      orderDiv.className = 'order';
      orderDiv.innerHTML = `
        <h3>Order #${order._id}</h3>
        <p>User: ${order.userId}</p>
        <p>Total: $${order.total}</p>
        <p>Status: ${order.status}</p>
      `;
      ordersDiv.appendChild(orderDiv);
    });
  } catch (error) {
    alert('Error fetching orders');
  }
});