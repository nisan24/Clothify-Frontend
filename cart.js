//// ******
const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "info",
      background: "#2196F3",
      icon: "❎",
    },
    {
      type: "success",
      background: "#4CAF50",
      icon: "✅",
    },
  ],
});

// =========================

document.addEventListener("DOMContentLoaded", function () {
  AllCartData();
});

function AllCartData() {
  const token = localStorage.getItem("token");

  if (!token) {
    // alert("Please log in to view your cart.");
    notyf.error("Please log in to view your cart.");
    return;
  }

  fetch("https://clothify-yzcm.onrender.com/api/shopping/cart/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("Cart Data: ", data);
      displayCart(data);
    })
    .catch((error) => {
      console.error("Error fetching cart data:", error);
    });
}

function displayCart(cart) {
  const cartContainer = document.getElementById("cartItems");
  const productCount = document.getElementById("productCount");
  const subtotal = document.getElementById("subtotal");
  const shippingCost = document.getElementById("shippingCost");
  const totalAmount = document.getElementById("totalAmount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartContainer.innerHTML = "";
  productCount.innerHTML = cart.cart_items.length;
  subtotal.innerHTML = `$${cart.subtotal.toFixed(2)}`;
  shippingCost.innerHTML = `$${cart.shipping_cost.toFixed(2)}`;
  totalAmount.innerHTML = `$${cart.total_amount.toFixed(2)}`;

  if (!cart.cart_items || cart.cart_items.length === 0) {
    cartContainer.innerHTML = `<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>`;

    checkoutBtn.disabled = true;
    return;
  }

  cart.cart_items.forEach((item) => {
    const imageUrl = `https://clothify-yzcm.onrender.com/${item.product_image}`;
    cartContainer.innerHTML += `
      <tr class="cart-item" data-id="${item.product_id}">
        <td style="width: 250px">
          <img src="${imageUrl}" alt="${item.product_name}" class="img-thumbnail" style="width: 60px;">
          <span  class="ms-2">${item.product_name}</span>
        </td>
        <td>$<span class="item-price">${item.product_price}</span></td>
        <td class="quantity-control">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="changeQuantity(this, -1, ${item.product_id})"><i class="fas fa-minus"></i></button>
          <input type="number" class="quantity form-control d-inline-block text-center" value="${item.quantity}" min="1"  style="width: 60px;">
          <button class="btn btn-sm btn-outline-primary ms-1" onclick="changeQuantity(this, 1, ${item.product_id})"><i class="fas fa-plus"></i></button>
        </td>
        <td class="total-price">$${item.total_price.toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.product_id})">
            <i class="fas fa-trash"></i> Remove
          </button>
        </td>
      </tr>
    `;
  });
  checkoutBtn.disabled = false;
}


function changeQuantity(button, change, productId) {
  const quantityInput = button.parentElement.querySelector(".quantity");

  let newQuantity = parseInt(quantityInput.value) + change;
  newQuantity = Math.max(1, newQuantity);
  quantityInput.value = newQuantity;

  console.log(`Product ID: ${productId}, Update Quantity: ${newQuantity}`);
  updateCartItemQuantity(productId, newQuantity)
}


function updateCartItemQuantity(productId, quantity) {
  const token = localStorage.getItem("token");

  fetch(`https://clothify-yzcm.onrender.com/api/shopping/cart/add/`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Cart item updated") {
        AllCartData();
        const event = new Event("updateCounts");
        document.dispatchEvent(event);
      } else {
        console.error("Failed update quantity");
      }
    })
    .catch((error) => console.error("Error update:", error));
}


function removeFromCart(product_id) {
  const token = localStorage.getItem("token");

  fetch(
    `https://clothify-yzcm.onrender.com/api/shopping/cart/remove/${product_id}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        AllCartData();
        notyf.error("Removed cart item!");
        const event = new Event("updateCounts");
        document.dispatchEvent(event);
      } else {
        console.error("Failed to remove item from cart");
      }
    })
    .catch((error) => console.error("Error removing cart item:", error));
}


function goToCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartData"));
  if (cartItems && cartItems.length === 0) {
    // alert(
    //   "Your cart is empty. Add items to cart before proceeding to checkout."
    // );
    notyf.error(
      "Your cart is empty. Add items to cart before proceeding to checkout."
    );
    return;
  }
  window.location.href = "checkout.html";
}
