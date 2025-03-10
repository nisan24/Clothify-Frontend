// ==========================
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

// ==========================

document.addEventListener("DOMContentLoaded", function () {
  displayOrderSummary();
  // success_payment();

  const checkoutForm = document.getElementById("checkoutForm");
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    create_Order(fullName, email, phone, address);
  });
});

function displayOrderSummary() {
  const token = localStorage.getItem("token");

  const productCount = document.getElementById("productCount");
  const subtotal = document.getElementById("subtotal");
  const shippingCost = document.getElementById("shippingCost");
  const totalAmount = document.getElementById("totalAmount");

  fetch("https://clothify-backend-three.vercel.app/api/shopping/cart/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data cart: ", data);
      productCount.innerHTML = data.total_items;
      subtotal.innerHTML = `$${data.subtotal.toFixed(2)}`;
      shippingCost.innerHTML = `$${data.shipping_cost.toFixed(2)}`;
      totalAmount.innerHTML = `$${data.total_amount.toFixed(2)}`;
    });
}

// ==========================

function create_Order(fullName, email, phone, address) {
  const token = localStorage.getItem("token");
  console.log("Token: ", token);

  if (!token) {
    // alert("You need to log in to proceed.");
    notyf.error("You need to log in to proceed.");
    return;
  }

  const orderData = {
    full_name: fullName,
    email: email,
    phone: phone,
    address: address,
  };

  console.log("Order Data:", orderData);

  fetch("https://clothify-backend-three.vercel.app/api/orders/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Order create successfully:", data);
      orderPayment(data.order.id);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
}

function orderPayment(orderId) {
  const token = localStorage.getItem("token");
  console.log("T- ", token);

  fetch("https://clothify-backend-three.vercel.app/api/payment/create/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order_id: orderId }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Payment initiation failed.");
      }
      return res.json();
    })
    .then((data) => {
      if (data.status === "success") {
        console.log("data: ", data);
        console.log("Payment URL:", data.payment_url);
        window.location.href = data.payment_url;
      } else {
        // alert("Payment initiation failed: " + data.message);
        notyf.error("payment failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error payment:", error);
      // alert("Something wrong payment.");
      notyf.error("Something wrong");
    });
}
