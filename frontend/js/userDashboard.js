document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
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
        <p>Total: $${order.total}</p>
        <p>Status: ${order.status}</p>
      `;
      ordersDiv.appendChild(orderDiv);
    });
  } catch (error) {
    alert('Error fetching orders');
  }
});