import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { pageLoading } from "./loader.mjs";


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
    totalPriceDiv.textContent = `Total: NOK ${totalPrice.toFixed(2)}`;
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

  pageLoading();




function updateCartDisplay() {
  listCard.innerHTML = "";
  let totalPrice = 0;
  let totalProduct = 0;
  cart.forEach((product , index) => {
   
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

 
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image");
    const productImage = document.createElement("img");
    productImage.src = product.image;
    imageDiv.appendChild(productImage);
    itemDiv.appendChild(imageDiv);

    const nameDiv = document.createElement("div");
    nameDiv.textContent = product.title;
    itemDiv.appendChild(nameDiv);

    const PriceDiv = document.createElement("div");
    PriceDiv.textContent = "NOK " + product.price;
    itemDiv.appendChild(PriceDiv);
  
    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantity");

    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("delete");
    deleteSpan.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteSpan.addEventListener('click', () => {
      if (cart[index].quantity && cart[index].quantity > 1){
        cart[index].quantity--;
      }else{
        cart.splice(index, 1);
      }
      updateCartDisplay();
      updateLocalStorage();
    })
    quantityDiv.appendChild(deleteSpan);
    
    const numberSpan = document.createElement("span");
    numberSpan.classList.add("number");
    numberSpan.textContent = product.quantity; 
    quantityDiv.appendChild(numberSpan);
    
    const plusSpan = document.createElement("span");
    plusSpan.classList.add("plus");
    plusSpan.innerHTML = '<i class="fa-solid fa-plus"></i>';
    plusSpan.addEventListener("click", () => {
     if(cart[index].quantity){
      cart[index].quantity++;
     }else{
      cart[index].quantity = 2 ;
     }
      updateCartDisplay(); 
      updateLocalStorage();
    });
    quantityDiv.appendChild(plusSpan);

    totalPrice += product.price * (product.quantity || 1);
    totalProduct += product.quantity || 1;
    itemDiv.appendChild(quantityDiv);
    listCard.appendChild(itemDiv);
  });

  const totalPriceDiv = document.createElement("div");
  totalPriceDiv.classList.add("totalPrice");
  totalPriceDiv.textContent = "Total Price: NOK " + totalPrice.toFixed(2);
  listCard.appendChild(totalPriceDiv);
  

  const productCounter = document.querySelector('.counter');
    productCounter.textContent = totalProduct;
}

      





  backButton.addEventListener("click", function(event) {
    event.preventDefault();
    window.history.go(-1);
  });


  confirmButton.addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "./checkoutsuccess.html";
  });

  pageLoading();


