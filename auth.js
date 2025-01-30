const getValue = (id) => {
  return document.getElementById(id).value;
};

// ==========

const handleRegistration = (event) => {
  event.preventDefault();

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");

  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  if (password === confirm_password) {
    document.getElementById("error_id").innerText = "";

    if (passwordRegex.test(password)) {
      console.log("User Info:", info);
      fetch("https://clothify-yzcm.onrender.com/api/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          console.log(data);
        });
    } else {
      document.getElementById("error_id").innerText =
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
    }
  } else {
    document.getElementById("error_id").innerText = "Passwords do not match!";
    alert("Passwords do not match!");
  }
};



// ======= Handle Login
const handleLogin = (event) => {
  event.preventDefault();

  const username = getValue("username");
  const password = getValue("password");

  Swal.fire({
    title: "Loading...",
    text: "Please wait while we process your request.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  fetch("https://clothify-yzcm.onrender.com/api/accounts/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.close();

      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("login_success", "true");

        window.location.href = "index.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error || "Invalid credentials! Please try again.",
          // footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    })
    .catch((error) => {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      console.error("Error:", error);
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

// ===--=-===-==--=