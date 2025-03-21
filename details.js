// const showToast = (type, title, message) => {
//   let options = {
//     title: title,
//     message: message,
//     position: "topCenter",
//     timeout: 3000,
//     icon: "",
//     backgroundColor: "",
//     progressBar: true,
//     progressBarColor: "#ffffff",
//     titleColor: "#ffffff",
//     messageColor: "#ffffff",
//   };

//   switch (type) {
//     case "success":
//       options.icon = "fa fa-check-circle";
//       options.backgroundColor = "#28a745";
//       break;
//     case "error":
//       options.icon = "fa fa-times-circle";
//       options.backgroundColor = "#dc3545";
//       break;
//     case "cancel":
//       options.icon = "fa fa-ban";
//       options.backgroundColor = "#ffc107";
//       break;
//     case "info":
//       options.icon = "fa fa-info-circle";
//       options.backgroundColor = "#17a2b8";
//       break;
//     case "warning":
//       options.icon = "fa fa-exclamation-circle";
//       options.backgroundColor = "#ffc107";
//       break;
//     default:
//       options.icon = "fa fa-info-circle";
//       options.backgroundColor = "#6c757d";
//   }

// iziToast[type]({
//   ...options,
// });
// };

// ====================

// ======
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

// ===============

function get_Product_id() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
console.log("ID: ", get_Product_id());

// === Details show ===
const Details_show = () => {
  const detailsContainer = document.getElementById("details-container");
  const descriptionText = document.getElementById("product-description");
  const reviewsContainer = document.getElementById("reviews-container");

  fetch(
    `https://clothify-backend-three.vercel.app/api/products/list/${get_Product_id()}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (!data || !data.id) {
        detailsContainer.innerHTML = "<h3>Product Not Found!</h3>";
        return;
      }
        const product_img = `https://res.cloudinary.com/dfqwj2lfu/${data.image}`;
        console.log("pro_img: ", product_img);

      detailsContainer.innerHTML = `
        <div class="col-md-5">
          <img src='${product_img}' class="img-fluid rounded" style="background-color: #F6F6F6;">
        </div>
        <div class="col-md-7">
          <h2 class="productName">${data?.name || "Unknown Product"}</h2>
          <h3 class="text-dark fw-bold">$${data?.price || "0.00"}</h3>
          <p>${data.description.split(" ").slice(0, 30).join(" ")}...</p>
          <h4>Vendor: ${data?.brand || "N/A"}</h4>
          <h4>Category: ${data?.category || "N/A"}</h4>
          <h5>Color: ${data?.color || "N/A"} | <strong> Size:</strong> ${
        data?.size || "N/A"
      }</h5>
          <h5><strong>Rating:</strong> ${AverageRating_cal(
            data?.reviews
          )} ⭐</h5>

          <div class="quantity-box">
            <span>Quantity</span>
            <div class="border border-1">

              <button class="btn quantity-btn" onclick="Quantity_number(-1)">-</button>
              <span class= "p-2" id="quantity">1</span>
              <button class="btn quantity-btn" onclick="Quantity_number(1)">+</button>
            </div>
          </div>
          <div class="d-flex gap-3 mt-3">
            <button class="btn btn-dark me-2 ms-3 " onclick="AddToCart()">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
            <button class="wishlist-btn btn-dark border rounded-3 p-2" onclick="Wishlist_fun()">
              <i id="wishlist-icon" class="fa-regular fa-heart"></i> Wishlist
            </button>
          </div>
<!-- -------------- -->
      <div class="accordion" id="customAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#shipping"
              >
                <span><i class="fas fa-plus"></i> Shipping & Returns </span>
                <i class="fas fa-truck"></i>
              </button>
            </h2>
            <div
              id="shipping"
              class="accordion-collapse collapse"
              data-bs-parent="#customAccordion"
            >
              <div class="accordion-body">
                Free shipping and returns available on all orders!
                <br /><br />
                We ship all US domestic orders within 5-10 business days
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#materials"
              >
                <span><i class="fas fa-plus"></i> Materials </span>
                <i class="fas fa-tshirt"></i>
              </button>
            </h2>
            <div
              id="materials"
              class="accordion-collapse collapse"
              data-bs-parent="#customAccordion"
            >
              <div class="accordion-body">
                <p>
                  The item with the Committed label has a lower environmental impact
                  because it was made with sustainable materials or methods. We are
                  committed to creating items that combine sustainability with
                  style. Made with recycled cashmere and industril by products.
                </p>
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sizeChart"
              >
                <span><i class="fas fa-plus"></i> Size Chart </span>
                <i class="fas fa-ruler"></i>
              </button>
            </h2>
            <div
              id="sizeChart"
              class="accordion-collapse collapse"
              data-bs-parent="#customAccordion"
            >
              <div class="accordion-body">
                We advise routinely dusting your items with a gentle cleanser to
                preserve its look. Periodically, it may need to be softly wet with a
                mild detergent solution.
              </div>
            </div>
          </div>

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#careInstructions"
              >
                <span><i class="fas fa-plus"></i> Care Instructions  </span>
                <i class="fas fa-water"></i>
              </button>
            </h2>
            <div
              id="careInstructions"
              class="accordion-collapse collapse"
              data-bs-parent="#customAccordion"
            >
              <div class="accordion-body">
                <p>
                  We advise routinely dusting your items with a gentle cleanser to
                  preserve its look. Periodically, it may need to be softly wet with
                  a mild detergent solution.
                </p>
              </div>
            </div>
          </div>
    </div>

<!-- ----------------- -->
        </div>
      `;

      descriptionText.innerText =
        data?.description || "No description available.";
      displayReviews(data?.reviews || []);
    })
    .catch((error) => {
      console.error("Failed to load:", error);
    });
};

// === Average Rating Calculation ===
function AverageRating_cal(reviews) {
  if (!reviews || reviews.length === 0) return "No Ratings Yet";
  const total_review_star = reviews.reduce(
    (sum, r) => sum + r.rating.length,
    0
  );
  return (total_review_star / reviews.length).toFixed(1);
}

// === Display Reviews ===
function displayReviews(reviews) {
  const reviewsContainer = document.getElementById("reviews-container");
  reviewsContainer.innerHTML = "";

  if (reviews.length) {
    reviews.forEach((element) => {
      const createTimeUtc = new Date(element.create_time);
      const BD_time = createTimeUtc.toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      reviewsContainer.innerHTML += `
        <div class="review-item border rounded p-3 mb-3">
          <div class="d-flex justify-content-between align-items-center">
            <strong class="text-primary">✨ ${element.user}</strong>
            <span class="text-muted small">${BD_time}</span>
          </div>
          <div class="mt-2">
            <span class="text-warning">${element.rating}</span>
          </div>
          <p class="mt-2">${element.comment}</p>
        </div>
      `;
    });
  } else {
    reviewsContainer.innerHTML = `
      <p class="text-center text-muted">No reviews yet.</p>
    `;
  }
}

// === Submit Review ===
const Review_Submit = (event) => {
  event.preventDefault();
  // const urlParams = new URLSearchParams(window.location.search);
  // const product_id = urlParams.get("id");

  const reviewText = document.getElementById("review-text");
  const reviewRating = document.getElementById("review-rating");

  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) {
    // alert("You need to login first to submit a review.");
    notyf.error("You need to login first to submit a review.");

    return;
  }

  console.log("Review Data:", {
    rating: reviewRating.value,
    comment: reviewText.value,
  });

  fetch(
    `https://clothify-backend-three.vercel.app/api/products/reviews/${get_Product_id()}/`,
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: reviewRating.value,
        comment: reviewText.value,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("API Response:", data);
      if (data.detail) {
        // alert(data.detail);
        notyf.error(data.detail);
        reviewText.value = "";
        reviewRating.value = "⭐";
        return;
      }
      if (data.error) {
        console.error("API Error:", data.error);
        // alert(`Error: ${data.error}`);
        notyf.error(data.error);
        return;
      }
      // alert("Review Added Successfully!");
      notyf.success("Review Added Successfully!");
      reviewText.value = "";
      reviewRating.value = "⭐";
      Details_show();
    })
    .catch((error) => {
      console.error("Review submit error:", error);
      // alert("Failed to add review. Please try again.");
      notyf.success("Failed to add review. Please try again.");
    });
};

// ===== Quantity count =====
let quantity = 1;
function Quantity_number(num) {
  quantity += num;
  if (quantity < 1) quantity = 1;
  document.getElementById("quantity").innerText = quantity;
}

// ==== AddToCart ====
function AddToCart() {
  const productId = get_Product_id();
  const token = localStorage.getItem("token");
  console.log("token: ", token);

  console.log("info: ", { productId, quantity });
  if (token) {
    fetch(`https://clothify-backend-three.vercel.app/api/shopping/cart/add/`, {
      method: "POST",
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
        // alert("Product added to cart!🛒");
        notyf.success("Product added to cart!🛒");
        // showToast("success", "Success", "Product added to cart!🛒");

        // console.log("Cart: ", data);
        const event = new Event("updateCounts");
        document.dispatchEvent(event);
      })
      .catch((error) => console.error("Error- add to cart:", error));
  } else {
    // alert("You are not logged in!");
    notyf.error("You are not logged in!");
  }
}

// ==== icon update ====
function updateWishlistIcon() {
  const productId = get_Product_id();
  const token = localStorage.getItem("token");
  const wishlistIcon = document.getElementById("wishlist-icon");

  console.log("wishlistIcon: ", wishlistIcon);

  if (!productId || !token) return;

  fetch(
    `https://clothify-backend-three.vercel.app/api/shopping/wishlist/check/${productId}/`,
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
      const wishlistIcon = document.getElementById("wishlist-icon");

      if (data.wishlist) {
        wishlistIcon.classList.replace("fa-regular", "fa-solid");
        wishlistIcon.style.color = "red";
      } else {
        wishlistIcon.classList.replace("fa-solid", "fa-regular");
        wishlistIcon.style.color = "";
      }
    })
    .catch((error) => console.error("Wishlist Check Error:", error));
}

// === Wishlist ===
function Wishlist_fun() {
  const productId = get_Product_id();
  const token = localStorage.getItem("token");
  const wishlistIcon = document.getElementById("wishlist-icon");

  if (!productId) {
    // alert("Product ID not found!");
    notyf.error("Product ID not found!");
    return;
  }

  if (!token) {
    notyf.error("You are not logged in! Please log in first.");
    // alert("You are not logged in! Please log in first.");
    return;
  }

  fetch(
    `https://clothify-backend-three.vercel.app/api/shopping/wishlist/check/${productId}/`,
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
          `https://clothify-backend-three.vercel.app/api/shopping/wishlist/remove/${productId}/`,
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
            notyf.open({
              type: "info",
              message: "Remove from Wishlist!",
            });
            const event = new Event("updateCounts");
            document.dispatchEvent(event);
          })
          .catch((error) => console.error("Error:", error));
      } else {
        fetch(
          `https://clothify-backend-three.vercel.app/api/shopping/wishlist/add/`,
          {
            method: "POST",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: productId }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Add Wishlist:", data);
            const event = new Event("updateCounts");
            document.dispatchEvent(event);

            if (data.detail === "Already in Wishlist!") {
              wishlistIcon.classList.replace("fa-regular", "fa-solid");
              wishlistIcon.style.color = "red";
              // alert("Already in Wishlist!");
              notyf.success("Already in Wishlist!");
              return;
            }

            wishlistIcon.classList.replace("fa-regular", "fa-solid");
            wishlistIcon.style.color = "red";
            // alert("Added to Wishlist");
            notyf.success("Added to Wishlist");
          })
          .catch((error) => console.error("API Error:", error));
      }
    })
    .catch((error) => console.error("Wishlist Check Error:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  updateWishlistIcon();
  Details_show();
});

// ============

      document.querySelectorAll(".accordion-button").forEach((button) => {
        button.addEventListener("click", function () {
          let icon = this.querySelector("span i");
          if (this.classList.contains("collapsed")) {
            icon.classList.replace("fa-minus", "fa-plus");
          } else {
            icon.classList.replace("fa-plus", "fa-minus");
          }
        });
      });

// ==== *********
// iziToast.success({
//   title: "Success",
//   message: "Your operation was successful!",
//   position: "topCenter",
//   timeout: 5000,
// });

// iziToast.error({
//   title: "Error",
//   message: "Something went wrong!",
//   position: "topCenter",
//   timeout: 5000,
// });

// notyf.success("Operation successful!");
// notyf.error("Something went wrong!");
// ==

// notyf.open({
//   type: 'info',
//   message: 'New feature released!',
// });
