import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { url } from "./BaseUrl.mjs";
import { shortenText } from "./shortenText.mjs";
import { pageLoading } from "./loader.mjs";


//product details
let posts = null;

let details = document.querySelector(".details");
const productId = new URLSearchParams(window.location.search).get("id");
const iconCard = document.querySelector(".shopping-card");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const addCard = document.querySelector(".addCard");
const listCard = document.querySelector(".listCard");
const iconCardSpan = document.querySelector(".icon-card span");


const detailsProducts = (product) => {
  if (!product) {
    window.location.href = "/";
    return;
  }
  details.querySelector(".image img").src = product.image;
  details.querySelector(".name").innerText = product.title;
  details.querySelector(".price").innerText = "NOK  " + product.price;
  details.querySelector(".description").innerText = product.description;
  details.querySelector(".color").innerText = "Color: " + product.baseColor;
  details.querySelector(".gender").innerText = product.gender;
  details.querySelector(".discountedprice").innerText =
    "DiscountedPrice: NOK" + product.discountedPrice;

  const sizeCounter = details.querySelector(".size");
  sizeCounter.innerHTML = "Choose your size :  ";

  product.sizes.forEach((size) => {
    const sizeElement = document.createElement("div");
    sizeElement.textContent = size;
    sizeElement.classList.add("size");
    sizeElement.style.cursor = "pointer";
    sizeElement.addEventListener("click", () => {
      document
        .querySelectorAll(".size")
        .forEach((elemnt) => elemnt.classList.remove("selected-size"));
      sizeElement.classList.add("selected-size");
    });
    sizeCounter.appendChild(sizeElement);
  });
};



//card list

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


addCard.addEventListener("click", () => {
  console.log(productId)
  if (posts) {
    const selectedProduct = posts.find((product) => product.id == productId);
    const existingProductIndex = cart.findIndex((item) => item.id == selectedProduct.id);
    if(existingProductIndex != -1){
      cart[existingProductIndex].quantity++;
    }else{
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
    }
    updateCartDisplay();
    updateLocalStorage();
  }
});

function addToCard(product) {
  cart.push(product); 

  updateCartDisplay();
  updateLocalStorage();


}

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




iconCard.addEventListener("click", () => {
  body.classList.toggle("showCard");
});

close.addEventListener("click", () => {
  body.classList.toggle("showCard");
});


//click checkout button and go to checkout page
document.addEventListener("DOMContentLoaded", function() {
  const checkoutButton = document.getElementById("checkOut-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function() {
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = "checkout.html";
    });
  } else {
    console.error("Checkout button not found!");
  }
});


//fetching data
async function doFetch(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error", error);
    alert("An error ocuured! Please try again");
  }
}

async function main() {

  try {
    posts = await doFetch(url);
    pageLoading();
    const thisProduct = posts.find((value) => value.id == productId);
    detailsProducts(thisProduct);
  } catch (error) {
    console.log("Error fetching data:", error);
    alert("An error ocuured! Please try again");
  }
}



main();

