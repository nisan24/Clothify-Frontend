document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  navbar.innerHTML = `
  <header id="myHeader">
    <!-- Navigation Menu -->
    <div class="second-part bg-light">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
          
          <div class="website-name">
            <a class="navbar-brand mb-0 text-uppercase fw-semibold fs-3" href="index.html">Clothify</a>
          </div>

          <!-- M Menu -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="index.html">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fw-bold text-uppercase" href="#" id="shopMenu" data-bs-toggle="dropdown">Shop</a>
                <div class="dropdown-content">
                  <a class="dropdown-item" href="shop.html">All Products</a>
                  <a class="dropdown-item" href="shop.html?categorys=Men">Men</a>
                  <a class="dropdown-item" href="shop.html?categorys=Women">Women</a>
                  <a class="dropdown-item" href="shop.html?categorys=Kids">Kids</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="about.html">About</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle fw-bold text-uppercase" href="#" id="fashionMenu" data-bs-toggle="dropdown">Fashion</a>
                <div class="dropdown-content">
                  <a class="dropdown-item" href="shop.html">Dress Skirt</a>
                  <a class="dropdown-item" href="shop.html?categorys=Men">Men Clothes</a>
                  <a class="dropdown-item" href="shop.html?categorys=Women">Women Clothes</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="contact-us.html">Contact</a>
              </li>
            </ul>
          </div>

          <div class="d-none d-lg-flex align-items-center" id="authSection"></div>
        </nav>
      </div>
    </div>
  </header>
`;

  const token = localStorage.getItem("token");
  const authSection = document.getElementById("authSection");

  authSection.innerHTML = token ? `
    <div class="account-icon me-2 position-relative">
      <a href="#" class="text-dark" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="dashboard.html"><i class="fas fa-user me-2"></i> Dashboard</a></li>
        <li><a class="dropdown-item" href="my_order.html"><i class="fas fa-box-open me-2"></i> My Orders</a></li>
        <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
      </ul>
    </div>
    <div class="wishlist-icon-2 me-3 position-relative">
      <a href="wishlist.html" class="text-dark">
        <i class="bi bi-heart"></i>
      </a>
      <span class="badge" id="wishlistCount">0</span>
    </div>
    <div class="cart-icon position-relative">
      <a href="cart.html" class="text-dark">
        <i class="bi bi-cart"></i>
      </a>
      <span class="badge" id="cartCount">0</span>
    </div>
  ` : `
    <div class="account-icon me-2 position-relative">
      <a href="#" class="text-dark" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="register.html"><i class="fa-solid fa-user-plus"></i> Register</a></li>
        <li><a class="dropdown-item" href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li>
      </ul>
    </div>
  `;

  if (token) {
    document.getElementById("logoutBtn").addEventListener("click", handleLogout);
  }
});

// Handle Logout
function handleLogout(event) {
  event.preventDefault();
  fetch("https://clothify-backend-three.vercel.app/api/accounts/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      localStorage.clear();
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Logout failed!");
      console.error("API error: ", error);
    });
}


// =======================

function cartCountShow() {
  const token = localStorage.getItem("token");

  fetch("https://clothify-backend-three.vercel.app/api/shopping/cart/", {
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

// =========================

function wishlistCountShow() {
  const token = localStorage.getItem("token");

  fetch("https://clothify-backend-three.vercel.app/api/shopping/wishlist/", {
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
