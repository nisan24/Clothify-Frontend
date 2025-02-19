// ===========================

// function DetailsButton() {
//   document.querySelectorAll(".details-btn").forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const productId = e.target.getAttribute("data-id");
//       window.location.href = `details.html?id=${productId}`;
//     });
//   });
// }

// ===========================

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: "center",
    y: "top",
  },
  types: [
    {
      type: "info",
      background: "#FFFF00",
      icon: "❎",
    },
    {
      type: "success",
      background: "#4CAF50",
      icon: "✅",
    },
  ],
});

// ===========================

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const gender = params.get("categorys");

  if (gender) {
    console.log("Filter gender:", gender);
    gender_filter(gender);
  } else {
    console.log("all products");
    loadAllProducts();
  }
});

// ===========================

function loadAllProducts() {
  fetch("https://clothify-yzcm.onrender.com/api/products/list/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      displayProducts(data);
    })
    .catch((error) => {
      console.error("Fetch Error:", error);
      document.getElementById("product-list").innerHTML =
        "<h3 class='text-center text-danger'>Failed to load products!</h3>";
    });
}

// ===========================

function displayProducts(data) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  if (!data || data.length === 0) {
    productContainer.innerHTML =
      "<h3 class='text-center text-danger'>No products available</h3>";
    return;
  }

  data.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-lg-4", "col-md-6", "mb-4");

    productCard.innerHTML = `

        <div class="product-card image-container">
            <img
              src="${product.image}"
              alt="${product.name}"
              class="product-img img-fluid"
            />
            <span class="wishlist-icon_2" onclick="Wishlist_fun(${product.id})>
              <i class="fa-regular fa-heart"></i>
            </span>
            <div class="icon-box position-absolute d-flex justify-content-center">
            <button class="action-btn">
              <a href="details.html?id=${
                product.id
              }" class="action-link"><i class="fas fa-eye"></i></a>
            </button>
            <button class="action-btn wishlist-btn" onclick="Wishlist_fun(${
              product.id
            })"><i id="wishlist-icon" class="fas fa-heart"></i></button>
            <button class="action-btn add-to-cart" onclick="AddToCart(${
              product.id
            })"><i class="fas fa-shopping-cart"></i></button>
          </div>
          </div>
          <div class="text-part text-center">
            <h6 class="text-uppercase text-muted">${product.brand}</h6>
            <p class="product-title">${product.name}</p>
            <div class="star-rating">${AverageRating_cal(
              product?.reviews
            )} ⭐</div>
            <p class="mt-1">
              <span class="product-price">${product.price}</span>
            </p>
          </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// === Average Rating Calculation ===
function AverageRating_cal(reviews) {
  if (!reviews || reviews.length === 0) return "No Ratings Yet";
  const total_review_star = reviews.reduce(
    (sum, r) => sum + r.rating.length,
    0
  );
  return (total_review_star / reviews.length).toFixed(1);
}

// ===========================

function AddToCart(productId) {
  const token = localStorage.getItem("token");
  // console.log("token: ", token);

  // console.log("info: ", productId);

  if (token) {
    fetch(`https://clothify-yzcm.onrender.com/api/shopping/cart/add/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // alert("Product added to cart!🛒");
        notyf.success("Product added to cart!🛒");
        // console.log("Cart: ", data);
        const event = new Event("updateCounts");
        document.dispatchEvent(event);
      })
      .catch((error) => console.error("Error- add to cart:", error));
  } else {
    // alert("You are not logged in!");
    notyf.info("You are not logged in!");
  }
}

// ===========================

function Wishlist_fun(productId) {
  const token = localStorage.getItem("token");
  const wishlistIcon = document.getElementById("wishlist-icon");

  if (!productId) {
    // alert("Product ID not found!");
    notyf.info("Product ID not found!");
    return;
  }

  if (!token) {
    // alert("You are not logged in! Please log in first.");
    notyf.error("You are not logged in! Please log in first.");
    return;
  }

  fetch(
    `https://clothify-yzcm.onrender.com/api/shopping/wishlist/check/${productId}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.wishlist) {
        fetch(
          `https://clothify-yzcm.onrender.com/api/shopping/wishlist/remove/${productId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then(() => {
            wishlistIcon.classList.replace("fa-solid", "fa-regular");
            wishlistIcon.style.color = "";
            // alert("Removed from Wishlist");
            notyf.info("Removed from Wishlist");
            const event = new Event("updateCounts");
            document.dispatchEvent(event);
          })
          .catch((error) => console.error("Error:", error));
      } else {
        fetch(`https://clothify-yzcm.onrender.com/api/shopping/wishlist/add/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: productId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Add Wishlist:", data);
            const event = new Event("updateCounts");
            document.dispatchEvent(event);

            if (data.detail === "Already in Wishlist!") {
              wishlistIcon.classList.replace("fa-regular", "fa-solid");
              wishlistIcon.style.color = "red";
              // alert("Already in Wishlist!");
              notyf.info("Already in Wishlist!");
              return;
            }

            wishlistIcon.classList.replace("fa-regular", "fa-solid");
            wishlistIcon.style.color = "red";
            // alert("Wishlist added successfully!");
            notyf.success("Wishlist added successfully!");
          })
          .catch((error) => console.error("API Error:", error));
      }
    })
    .catch((error) => console.error("Wishlist Check Error:", error));
}

// ===========================

function get_gender(gender) {
  const params = new URLSearchParams(window.location.search);
  return params.get(gender);
}

// ===========================

function applyFilters() {
  let selected_Category = Array.from(
    document.querySelectorAll(".category-filter:checked")
  ).map((input) => input.value);

  let brand = document.getElementById("brand-filter").value || "";
  let size = document.getElementById("size-filter").value || "";
  let color = document.querySelector(".color-box.active")?.dataset.color || "";
  let minPrice = document.getElementById("min-price-filter").value || "";
  let maxPrice = document.getElementById("max-price-filter").value || "";
  let sort = document.getElementById("sort-filter").value || "";
  let searchQuery = document.getElementById("search-input").value.trim();
  let gender = get_gender("categorys") || "";

  let queryParams = new URLSearchParams();

  // if (selected_Category.length > 0) {
  //   selected_Category.forEach((category) => {
  //     queryParams.append("category", category);
  //   });
  // }

  if (selected_Category.length > 0) {
    selected_Category.forEach((category) => {
      let splitCategories = category.split("-");
      splitCategories.forEach((cat) => queryParams.append("category", cat));
    });
  }

  if (brand) queryParams.append("brand", brand);
  if (size) queryParams.append("size", size);
  if (color) queryParams.append("color", color);
  if (minPrice) queryParams.append("min_price", minPrice);
  if (maxPrice) queryParams.append("max_price", maxPrice);
  if (sort) queryParams.append("sort", sort);
  if (searchQuery) queryParams.append("search", searchQuery);

  if (gender) queryParams.append("categorys", gender);

  fetch(
    `https://clothify-yzcm.onrender.com/api/products/list/?${queryParams.toString()}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Filter Data:", data);
      displayProducts(data);
    })
    .catch((error) => console.error("Filter Error:", error));
}

// === Search Box Auto Filter ===
let searchInput = document.getElementById("search-input");
let typingTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    applyFilters();
  }, 500);
});

// ===========================

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    applyFilters();
  }
});

//===== search input Blank thakle =====
searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    applyFilters();
  }
});

// ===========================

let minPriceInput = document.getElementById("min-price-filter");
let maxPriceInput = document.getElementById("max-price-filter");
let priceSlider = document.getElementById("price-slider");
let priceDisplay = document.getElementById("price-display");

// ===========================

// === slider er ===
priceSlider.addEventListener("input", function () {
  let minValue = minPriceInput.value ? parseInt(minPriceInput.value) : 100;
  let maxValue = parseInt(this.value);

  if (maxValue < minValue) {
    maxValue = minValue;
  }

  maxPriceInput.value = maxValue;
  priceDisplay.textContent = `$${minValue} - $${maxValue}`;
  applyFilters();
});

// ===========================

[minPriceInput, maxPriceInput].forEach((input) => {
  input.addEventListener("input", function () {
    let minValue = minPriceInput.value ? parseInt(minPriceInput.value) : 100;
    let maxValue = maxPriceInput.value ? parseInt(maxPriceInput.value) : 10000;

    if (maxValue < minValue) {
      maxPriceInput.value = minValue;
    }

    priceDisplay.textContent = `$${minValue} - $${maxValue}`;
    applyFilters();
  });
});

// ===========================

// === Reset Button er ===
document.getElementById("reset-price").addEventListener("click", function () {
  minPriceInput.value = "";
  maxPriceInput.value = "";
  priceSlider.value = "";
  priceDisplay.textContent = "$100 - $10000";
  applyFilters();
});

// ===========================

// === color er jonno ===
document.querySelectorAll(".color-box").forEach((box) => {
  box.addEventListener("click", function () {
    document
      .querySelectorAll(".color-box")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    document.getElementById("selected-color").textContent = this.dataset.color;
    applyFilters();
  });
});

// ===========================

// Reset button color er ====
document.getElementById("reset-color").addEventListener("click", function () {
  document
    .querySelectorAll(".color-box")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("selected-color").textContent = "None";
  applyFilters();
});

// ===========================

document
  .querySelectorAll(
    ".category-filter, #brand-filter, #size-filter, .color-box, #sort-filter"
  )
  .forEach((element) => {
    element.addEventListener("change", applyFilters);
  });

// ===========================

function gender_filter(gender) {
  console.log("Gender:", gender);

  fetch(
    `https://clothify-yzcm.onrender.com/api/products/list/?categorys=${gender}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Filter Data:", data);
      displayProducts(data);
    })
    .catch((error) => console.error("Filter Error:", error));
}

// ===========================

// === gender e others filter er kaj korte ===
window.addEventListener("DOMContentLoaded", () => {
  applyFilters();
});
