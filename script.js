document.addEventListener("DOMContentLoaded", function () {
  fetch("https://clothify-backend-three.vercel.app/api/products/list/")
    .then((response) => response.json())
    .then((data) => {
      product_fun("arrival_Container", data.slice(0, 8));
      product_fun("sellers_Container", data.slice(4, 8));
    })
    .catch((error) => console.error("fetching error:", error));

  category_list();
});

// =====================

function product_fun(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(ProductCard).join("");
}

// =====================

function ProductCard(product) {
  const product_img = `https://res.cloudinary.com/dfqwj2lfu/${product.image}`;
  console.log("pro_img: ", product_img);

  return `
    <div class="col-md-3 mb-4">
          <div class="product-card" onclick="redirectToDetails(${product.id})">
            <img
              src="${product_img}"
              alt="${product.name}"
              class="product-img img-fluid"
            />
            <span class="wishlist-icon" onclick="toggleWishlist(this)">
              <i class="fa-regular fa-heart"></i>
            </span>
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
    </div>

  `;
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

// =====================

function redirectToDetails(productId) {
  window.location.href = `details.html?id=${productId}`;
}

// =====================

function filter_gender(gender) {
  window.location.href = `shop.html?categorys=${gender}`;
}

// =====================

function category_list() {
  fetch("https://clothify-backend-three.vercel.app/api/products/category/")
    .then((res) => res.json())
    .then((categories) => {
      const categoryContainer = document.getElementById("category-container");
      const carouselInner = document.querySelector(".carousel-inner");

      categoryContainer.innerHTML = "";
      carouselInner.innerHTML =
        '<div class="carousel-item active"><div class="d-flex flex-wrap justify-content-center g-4 m-4 p-4" id="first-slide"></div></div>';

      let firstSlide = document.getElementById("first-slide");
      let extraCategories = [];

      categories.forEach((category, index) => {
          const category_img = `https://res.cloudinary.com/dfqwj2lfu/${category.image}`;
          console.log("cate_img: ", category_img);
        const categoryItem = `
            <div class="text-center">
              <img src="${category_img}" alt="${category.name}" class="img-fluid" style="width: 200px; height: 200px; border-radius: 50%;" />
              <h5 class="p-4"><strong>${category.name}</strong></h5>
            </div>
          `;

        if (index < 6) {
          firstSlide.innerHTML += categoryItem;
        } else {
          extraCategories.push(categoryItem);
        }
      });

      if (extraCategories.length > 0) {
        let extraSlide = document.createElement("div");
        extraSlide.classList.add("carousel-item");
        extraSlide.innerHTML = `<div class="d-flex flex-wrap justify-content-center g-4 m-4 p-4">${extraCategories.join(
          ""
        )}</div>`;
        carouselInner.appendChild(extraSlide);
      }
    })
    .catch((error) => console.error("Error fetching categories:", error));
}

// ====================================

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  autoplay: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// =======================
