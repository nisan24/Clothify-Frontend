document.addEventListener("DOMContentLoaded", function () {
  fetch("https://clothify-yzcm.onrender.com/api/products/list/")
    .then((response) => response.json())
    .then((data) => {
      product_fun("arrival_Container", data.slice(0, 8));
      product_fun("sellers_Container", data.slice(4, 8));
    })
    .catch((error) => console.error("fetching error:", error));
});

function product_fun(containerId, products) {
  const container = document.getElementById(containerId);
  container.innerHTML = products.map(ProductCard).join("");
}

function ProductCard(product) {
  return `
    <div class="col-md-3 mb-4">
    <div class="card shadow-sm h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" />
        <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">$${product.price}</p>
        <a href="details.html?id=${product.id}" class="btn btn-primary btn-sm">Details</a>
        </div>
    </div>
    </div>

  `;
}

function filter_gender(gender) {
  window.location.href = `shop.html?categorys=${gender}`;
}
