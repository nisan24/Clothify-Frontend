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

// ======================

document.addEventListener("DOMContentLoaded", function () {
  All_WishlistData();
});

// ======================

function All_WishlistData() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("User not logged in");
    return;
  }

  fetch("https://clothify-yzcm.onrender.com/api/shopping/wishlist/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("Wishlist Data: ", data);
      displayWishlist(data);
    })
    .catch((error) => {
      console.error("API Error wishlist data:", error);
    });
}

// ======================

function displayWishlist(wishlist) {
  const wishlistContainer = document.getElementById("wishlistContainer");
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `<p class="text-center text-muted">Your wishlist is empty! 😔</p>`;
    return;
  }

  wishlist.wishlist_items.forEach((item) => {
    let image_Url = `https://clothify-yzcm.onrender.com/${item.product_image}`;
    wishlistContainer.innerHTML += `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card rounded">
          <img src="${image_Url}" alt="${item.product_name}" class="card-img-top wishlist-img" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title text-center">
              <a href="details.html?id=${item.product_id}" class="text-decoration-none text-dark">
                ${item.product_name}
              </a>
            </h5>
            <p class="text-muted text-center">Price: $${item.product_price}</p>
            <div class="d-grid gap-2">
              <button class="btn btn-success" onclick="addToCart(${item.product_id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
              </button>
              <button class="btn btn-danger" onclick="removeFromWishlist(${item.product_id})">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// ======================

function removeFromWishlist(productId) {
  const token = localStorage.getItem("token");

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
    .then((res) => {
      if (res.ok) {
        notyf.info("Remove item from wishlist!");
        All_WishlistData();
        const event = new Event("updateCounts");
        document.dispatchEvent(event);
      }
    })
    .catch((error) => {
      console.error("Error remove item from wishlist:", error);
    });
}

function addToCart(productId) {
  const token = localStorage.getItem("token");

  fetch("https://clothify-yzcm.onrender.com/api/shopping/cart/add/", {
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
      // console.log("Added to cart: ", data);
      // alert("Product added to cart! 🛒");
      notyf.success("Product added to cart! 🛒");
      const event = new Event("updateCounts");
      document.dispatchEvent(event);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
}
