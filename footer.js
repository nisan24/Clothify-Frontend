// ================================
document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  footer.innerHTML = `
    <div class="text-center py-5 p-3" style="background-color: #FAF8F2;">
      <h2 class="fw-bold">Sign Up & Subscribe To Our Newsletter</h2>
      <p class="text-muted">Subscribe to get updates on special discounts and upcoming sales.</p>
      <div class="d-flex justify-content-center gap-3 mt-3">
        <input type="email" class="form-control w-25 border-0 shadow-sm mobile-input" placeholder="Enter your email">
        <button type="submit" class="btn btn-dark px-4 mobile-btn">SUBSCRIBE</button>
      </div>
    </div>

    <div class="container py-5 justify-content-between">
      <div class="row justify-content-around">
        <div class="col-md-3">
          <h5 class="fw-bold">About Our Store</h5>
          <p class="text-muted">Welcome to Clothify, where we bring quality, style, and innovation together.</p>
        </div>
        <div class="col-md-2">
          <h5 class="fw-bold">Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-decoration-none text-dark">Search</a></li>
            <li><a href="#" class="text-decoration-none text-dark">About Us</a></li>
            <li><a href="#" class="text-decoration-none text-dark">Size Chart</a></li>
            <li><a href="#" class="text-decoration-none text-dark">FAQs</a></li>
          </ul>
        </div>
        <div class="col-md-2">
          <h5 class="fw-bold">Information</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-decoration-none text-dark">Policy for Buyers</a></li>
            <li><a href="#" class="text-decoration-none text-dark">Shipping & Refund</a></li>
            <li><a href="#" class="text-decoration-none text-dark">Terms & Conditions</a></li>
          </ul>
        </div>
        <div class="col-md-2">
          <h5 class="fw-bold">Contact Us</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-decoration-none text-dark">Clothify - Fashion Store</a></li>
            <li><a href="#" class="text-decoration-none text-dark">clothify@gmail.com</a></li>
            <li><a href="#" class="text-decoration-none text-dark">0163935****</a></li>
          </ul>
        </div>
      </div>
    </div>

    <footer class="text-center py-3" style="background-color: #333; color: #fff;">
      <p>&copy; 2025 Clothify. All rights reserved.</p>
      <div class="mt-2">
        <a href="#" class="text-white mx-3"><i class="fab fa-facebook fa-lg"></i></a>
        <a href="#" class="text-white mx-3"><i class="fab fa-instagram fa-lg"></i></a>
        <a href="#" class="text-white mx-3"><i class="fab fa-twitter fa-lg"></i></a>
      </div>
    </footer>
  `;
});
