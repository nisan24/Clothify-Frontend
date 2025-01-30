
// ====== Notyf ======
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

// =====================

const getValue = (id) => {
  return document.getElementById(id).value;
};

// ========== Registration ==========
const handleRegistration = (event) => {
  event.preventDefault();

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");

  const errorMessage = getValue("errorMessage");
  const submitBtn = getValue("submit_btn");
  const loadingSpinner = getValue("loading_spinner");
  const centerLoading = getValue("center_loading");

  errorMessage.innerHTML = "";

  if (password !== confirm_password) {
    errorMessage.innerHTML = "Passwords do not match!";
    notyf.error("Passwords do not match!");
    return;
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    errorMessage.innerHTML =
      "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
    notyf.error("Password must be at least 8 characters long, contain at least one letter, one number, and one special character.");
    return;
  }

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  submitBtn.disabled = true;
  loadingSpinner.style.display = "inline-block";
  centerLoading.style.display = "block";

  fetch("https://clothify-yzcm.onrender.com/api/accounts/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        notyf.success(data.message);
      } else if (data.email) {
        notyf.error("Email is already registered!");
      } else if (data.errors) {
        Object.keys(data.errors).forEach((field) => {
          const errorMessage = data.errors[field].join(", ");
          notyf.error(`${errorMessage}`);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      notyf.error("Something went wrong! Please try again.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      loadingSpinner.style.display = "none";
      centerLoading.style.display = "none";
    });
};


// ======= Handle Login =======
const handleLogin = (event) => {
  event.preventDefault();

  const submitBtn = document.getElementById("submit_btn");
  const loadingSpinner = document.getElementById("loading_spinner");

  const username = getValue("username");
  const password = getValue("password");

  submitBtn.disabled = true;
  loadingSpinner.style.display = "inline-block";

  fetch("https://clothify-yzcm.onrender.com/api/accounts/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("login_success", "true");

        window.location.href = "index.html";
      } else if (data.error) {
        notyf.error(data.error);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      notyf.error("Something went wrong! Please try again.");
    })
    .finally(() => {
      submitBtn.disabled = false;
      loadingSpinner.style.display = "none";
    });
};



// === Show Success Message ===
const LoginMessage = () => {
  const loginSuccess = localStorage.getItem("login_success");

  if (loginSuccess === "true") {
    Swal.fire({
      title: "Welcome!",
      text: "You have successfully logged in.",
      icon: "success",
      confirmButtonText: "OK",
    });

    localStorage.removeItem("login_success");
  } else {
    console.log("Not login");
  }
};

document.addEventListener("DOMContentLoaded", LoginMessage);
