document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top bg-light shadow">
        <div class="container-fluid px-4">
            <a class="navbar-brand fw-bold text-primary" href="index.html">Clothify</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="shop.html" id="categoriesDropdown" role="button" data-bs-toggle="dropdown">Shop</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="shop.html"><i class="fas fa-store me-2"></i> All Products</a></li>
                            <li><a class="dropdown-item" href="shop.html?categorys=Men"><i class="fas fa-male me-2"></i> Men</a></li>
                            <li><a class="dropdown-item" href="shop.html?categorys=Women"><i class="fas fa-female me-2"></i> Women</a></li>
                            <li><a class="dropdown-item" href="shop.html?categorys=Kids"><i class="fas fa-child me-2"></i> Kids</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
                </ul>
                <div class="d-flex align-items-center gap-3" id="authSection"></div>
            </div>
        </div>
    </nav>
  `;

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const authSection = document.getElementById("authSection");

  if (token) {
    authSection.innerHTML = `
      <div class="d-flex align-items-center gap-4">
        <a class="nav-link position-relative wishlist-icon" href="wishlist.html">
            <i class="fas fa-heart fa-lg text-danger"></i>
            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle" id="wishlistCount">0</span>
        </a>
        <a class="nav-link position-relative cart-icon" href="cart.html">
            <i class="fas fa-shopping-cart fa-lg text-warning"></i>
            <span class="badge bg-warning position-absolute top-0 start-100 translate-middle" id="cartCount">0</span>
        </a>
        <div class="dropdown ms-3">
            <a class="btn btn-outline-primary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user-circle fa-lg me-2"></i> ${name}
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow mt-2">
                <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user me-2"></i> Profile</a></li>
                <li><a class="dropdown-item" href="my_order.html"><i class="fas fa-box-open me-2"></i> Orders</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i> Settings</a></li>
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
            </ul>
        </div>
      </div>
    `;
    document
      .getElementById("logoutBtn")
      .addEventListener("click", handleLogout);
  } else {
    authSection.innerHTML = `
      <a class="btn btn-primary" href="register.html">Register</a>
      <a class="btn btn-outline-primary" href="login.html">Login</a>
    `;
  }
});

// Handle Logout
const handleLogout = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");

  fetch("https://clothify-yzcm.onrender.com/api/accounts/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.clear();
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Logout failed!");
      console.error("API error: ", error);
    });
};

// ==========
function cartCountShow() {
  const token = localStorage.getItem("token");

  fetch("https://clothify-yzcm.onrender.com/api/shopping/cart/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.cart_items) {
        document.getElementById("cartCount").innerText = data.total_quantity;
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => console.error("API Error:", error));
}

// ===
function wishlistCountShow() {
  const token = localStorage.getItem("token");

  fetch("https://clothify-yzcm.onrender.com/api/shopping/wishlist/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.wishlist_items) {
        document.getElementById("wishlistCount").innerText = data.total_items;
      } else {
        console.log(data.message);
      }
    })
    .catch((error) => console.error("API Error:", error));
}

document.addEventListener("updateCounts", function () {
  cartCountShow();
  wishlistCountShow();
});

document.addEventListener("DOMContentLoaded", function () {
  cartCountShow();
  wishlistCountShow();
});
