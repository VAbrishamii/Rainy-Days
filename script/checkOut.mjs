import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { pageLoading } from "./loader.mjs";


const backButton = document.querySelector("#back-button");
const confirmButton = document.querySelector("#confirm-button");

document.addEventListener("DOMContentLoaded", function() {
  const cartData = localStorage.getItem('cart');
  
  if (cartData) {
    const cart = JSON.parse(cartData);
    displayCart(cart);
  } else {
    console.error("Cart data not found in URL");
  }
});

function displayCart(cart) {
  const checkOutInfo = document.getElementById("checkout-info");
  let totalPrice = 0;

  // Clear existing cart display
  checkOutInfo.innerHTML = "";

  cart.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" class="product-image">
      <div class="product-details">
        <h3>${product.title}</h3>
        <p>Price: NOK ${product.price}</p>
        <span class='delete' data-index="${index}"><i class="fa-regular fa-trash-can"></i></span>
        <span class="quantity" data-index="${index}">${product.quantity}</span> 
        <span class='plus' data-index="${index}"><i class="fa-solid fa-plus"></i></i></span>
      </div>
    `;
    checkOutInfo.appendChild(productDiv);

 
    totalPrice += product.price * product.quantity;
  });

  // Display total price
  const totalPriceDiv = document.createElement("div");
  totalPriceDiv.classList.add('totalPrice');
  totalPriceDiv.textContent = "Total Price: NOK " + totalPrice.toFixed(2);
  checkOutInfo.appendChild(totalPriceDiv);


  const deleteSpans = document.querySelectorAll('.delete');
  deleteSpans.forEach(span => {
    span.addEventListener('click', function() {
      const index = parseInt(span.dataset.index);
      const quantitySpan = document.querySelector(`.quantity[data-index="${index}"]`);
      const quantity = parseInt(quantitySpan.textContent);
      
      if (quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1); 
      }
      
      updateLocalStorage(cart);
      displayCart(cart); 
    });
  });

  const plusSpans = document.querySelectorAll('.plus');
  plusSpans.forEach(span => {
    span.addEventListener('click', function() {
      const index = parseInt(span.dataset.index);
      cart[index].quantity++; 
      updateLocalStorage(cart);
      displayCart(cart); 
    });
  });
}

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


  backButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.history.back(); 
  });


  confirmButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    localStorage.removeItem('cart');
    window.location.href = "./checkoutsuccess.html";
  });

  pageLoading();




  


