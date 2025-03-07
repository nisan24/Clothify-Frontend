document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  navbar.innerHTML = `
    <header class="sticky-top" id="myHeader">
      <div class="top-container bg-white  shadow-sm" id="topContainer">
        <div
          class="container d-flex justify-content-between align-items-center"
        >
          <!-- L -->
          <div class="search-bar d-none d-lg-flex align-items-center">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0"
                placeholder="Search for products..."
              />
            </div>
          </div>

          <!-- L  -->
          <div class="website-name d-none d-lg-block">
            <h1 class="mb-0 text-uppercase">Clothify</h1>
          </div>

          <!-- L -->
          <div class="d-none d-lg-flex align-items-center" id="authSection">
          </div>

          <!-- M -->
          <div class="d-flex d-lg-none align-items-center w-100">
            <div class="website-name">
              <h1 class="mb-0 text-uppercase">Clothify</h1>
            </div>

            <!-- M -->
            <div class="ms-auto d-flex align-items-center" id="authSection">

            </div>

          </div>
        </div>
      </div>
      <hr />

      <!-- M -->
      <div
        class="search-menu-container bg-light py-2 d-lg-none"
        id="searchMenuContainer"
      >
        <div class="container">
          <!-- Search Bar (Mobile) -->
          <div class="search-bar mb-2">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0"
                placeholder="Search for products..."
              />
            </div>
          </div>

        <!-- M menu -->
        <div class="d-flex align-items-center">
          <button class="navbar-toggler d-flex align-items-center border-0" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasMenu" 
            id="menubar"
            style="font-weight: 500; font-size: 16px; color: #333;">
            <i class="bi bi-list fs-4 me-1"></i> Menu
          </button>
        </div>

        </div>   
      </div>

      <!-- Navigation Menu L -->
      <div class="second-part bg-light d-none d-lg-block">
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="index.html">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle fw-bold text-uppercase"
                  href="shop.html"
                  id="shopMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >Shop</a
                >
                <div class="dropdown-content">
                  <a class="dropdown-item" href="shop.html">All Products</a>
                  <a class="dropdown-item" href="shop.html?categorys=Men">Men</a>
                  <a class="dropdown-item" href="shop.html?categorys=Women">Women</a>
                  <a class="dropdown-item" href="shop.html?categorys=Kids">Kids</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="about.html">About</a>
                <!-- <a class="nav-link fw-bold text-uppercase" href="#">Collections</a> -->
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle fw-bold text-uppercase"
                  href="#"
                  id="fashionMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >Fashion</a
                >
                <div class="dropdown-content">
                  <a class="dropdown-item" href="#">Dress Skirt</a>
                  <a class="dropdown-item" href="#">Men Clothes</a>
                  <a class="dropdown-item" href="#">Women Clothes</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link fw-bold text-uppercase" href="contact-us.html">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <!-- Menu M -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Menu</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link fw-bold text-uppercase" href="index.html">Home</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle fw-bold text-uppercase"
              href="shop.html"
              id="mobileShopMenu"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Shop</a
            >
            <ul class="dropdown-content">
              <a class="dropdown-item" href="shop.html">All Products</a>
              <a class="dropdown-item" href="shop.html?categorys=Men">Men</a>
              <a class="dropdown-item" href="shop.html?categorys=Women">Women</a>
              <a class="dropdown-item" href="shop.html?categorys=Kids">Kids</a>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-uppercase" href="#">Collections</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle fw-bold text-uppercase"
              href="#"
              id="mobileFashionMenu"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Fashion</a
            >
            <ul class="dropdown-content">
              <li><a class="dropdown-item" href="#">Dress Skirt</a></li>
              <li><a class="dropdown-item" href="#">Men Clothes</a></li>
              <li><a class="dropdown-item" href="#">Women Clothes</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-uppercase" href="contact-us.html">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  `;

  // =======================

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const authSection = document.getElementById("authSection");

  if (token) {
    authSection.innerHTML = `
    <div class="account-icon me-2 position-relative">
      <a href="#" class="text-dark" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="dashboard.html"><i class="fas fa-user me-2"></i> Dashboard</a></li>
        <li><a class="dropdown-item" href="my_order.html"><i class="fas fa-box-open me-2"></i>My Orders</a></li>
        <li><a class="dropdown-item text-red" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
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
  `;
    document
      .getElementById("logoutBtn")
      .addEventListener("click", handleLogout);
  } else {
    authSection.innerHTML = `
    <div class="account-icon me-2 position-relative">
      <a href="#" class="text-dark" data-bs-toggle="dropdown">
        <i class="bi bi-person-circle"></i>
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item mt-2" href="register.html"><i class="fa-solid fa-user-plus"></i> <strong>Register</strong></a></li>
        <li><a class="dropdown-item mt-2 mb-2" href="login.html"><i class="fa-solid fa-right-to-bracket"></i> <strong>Login</strong></a></li>
      </ul>
    </div>
  `;
  }

  // =======================


  window.onscroll = function () {
    myFunction();
  };

  var header = document.getElementById("myHeader");
  var sticky = header.offsetTop;
  var topContainer = document.getElementById("topContainer");
  var searchMenuContainer = document.getElementById("searchMenuContainer");
  var menubar = document.getElementById("menubar");

  function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      topContainer.style.display = "none";
      menubar.style.position = "fixed";
      menubar.style.top = "0";
      menubar.style.left = "0";
      menubar.style.right = "0";
      menubar.style.backgroundColor = "white";
      menubar.style.padding = "10px 15px";
      menubar.style.zIndex = "1000";
      menubar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    } else {
      header.classList.remove("sticky");
      topContainer.style.display = "flex";
      menubar.style.position = "static";
      menubar.style.backgroundColor = "transparent";
      menubar.style.padding = "0";
      menubar.style.boxShadow = "none";
    }
  }


});

// ============================

// Handle Logout
const handleLogout = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("token");

  fetch("https://clothify-backend-three.vercel.app/api/accounts/logout/", {
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


