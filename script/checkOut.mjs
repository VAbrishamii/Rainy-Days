
const backButton = document.querySelector("#back-button");
const confirmButton = document.querySelector("#confirm-button");

document.addEventListener( "DOMContentLoaded", function() {
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
    cart.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
      <img src="${product.image}"  class="product-image">
      <div class="product-details">
        <h3>${product.title}</h3>
        <p>Price: NOK ${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
      </div>
       
      `;
      checkOutInfo.appendChild(productDiv);

      totalPrice += product.price * product.quantity;
    });
    const totalPriceDiv =document.createElement('div');
    totalPriceDiv.classList.add('totalPrice');
    totalPriceDiv.textContent = `Total Price: NOK ${totalPrice.toFixed(2)}`;
    checkOutInfo.appendChild(totalPriceDiv);

  }



  backButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.history.back(); 
  });


  confirmButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "./checkoutsuccess.html";
  });