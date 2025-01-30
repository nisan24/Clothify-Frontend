function get_id(id) {
  id = document.getElementById(id);
  return id;
}

document.addEventListener("DOMContentLoaded", function () {
  const ordersTableBody = get_id("ordersTableBody");
  const modalOrderId = get_id("modalOrderId");
  const modalFullName = get_id("modalFullName");
  const modalEmail = get_id("modalEmail");
  const modalPhone = get_id("modalPhone");
  const modalAddress = get_id("modalAddress");
  const modalTotalPrice = get_id("modalTotalPrice");
  const modalShippingCost = get_id("modalShippingCost");
  const modalOrderStatus = get_id("modalOrderStatus");
  const modalOrderItems = get_id("modalOrderItems");

  const token = localStorage.getItem("token");

  fetch("https://clothify-yzcm.onrender.com/api/order/list/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.orders.forEach((order) => {
        console.log("d- ", data);
        const row = document.createElement("tr");

        let productText = "N/A";
        if (order.items.length > 0) {
          productText = `<span class="text-primary fw-bold" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#orderDetailsModal" onclick="showOrderDetails(${order.id})">
                      ${order.items[0].product_name}
                    </span>`;
          if (order.items.length > 1) {
            productText += ` <span class="text-primary fw-bold" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#orderDetailsModal" onclick="showOrderDetails(${
              order.id
            })"><small class="text-info">+${
              order.items.length - 1
            } more</small></span>`;
          }
        }
        row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${productText}</td>
                    <td>$${order.total_price}</td>
                    <td>${new Date(order.order_time).toLocaleDateString()}</td>
                    <td><span class="badge ${getStatusBadge(
                      order.order_status
                    )}">${order.order_status}</span></td>
                    <td><button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#orderDetailsModal" onclick="showOrderDetails(${
                      order.id
                    })">View</button></td>
                `;
        ordersTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching orders:", error));

  window.showOrderDetails = function (orderId) {
    const token = localStorage.getItem("token");

    fetch(`https://clothify-yzcm.onrender.com/api/order/list/${orderId}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        order = data.order;
        console.log("or ", order);
        modalOrderId.textContent = order.id;
        modalFullName.textContent = order.full_name;
        modalEmail.textContent = order.email;
        modalPhone.textContent = order.phone;
        modalAddress.textContent = order.address;
        modalTotalPrice.textContent = order.total_price;
        modalShippingCost.textContent = order.shipping_cost;
        modalOrderStatus.textContent = order.order_status;
        modalOrderStatus.className = `badge ${getStatusBadge(
          order.order_status
        )}`;

        modalOrderItems.innerHTML = "";
        order.items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "list-group-item";
          li.innerHTML = `
                        <strong>${item.product_name}</strong>
                        <span>$${item.product_price} × ${item.quantity}</span>
                    `;
          modalOrderItems.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching order details:", error));
  };

  function getStatusBadge(status) {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Completed":
        return "bg-success";
      case "Cancelled":
        return "bg-danger";
      case "Failed":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  }
});
