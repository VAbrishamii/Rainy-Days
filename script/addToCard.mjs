import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { url } from "./BaseUrl.mjs";
import { shortenText } from "./shortenText.mjs";

let posts = null;
let details = document.querySelector(".details");
const productId = new URLSearchParams(window.location.search).get("id");
const iconCard = document.querySelector('.shopping-card');
const close = document.querySelector('.close');
const body = document.querySelector('body');
const addCard = document.querySelector('.addCard');

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
      document.querySelectorAll(".size").forEach((elemnt) => elemnt.classList.remove("selected-size"));
      sizeElement.classList.add("selected-size");
    });
    sizeCounter.appendChild(sizeElement);
  });



};

iconCard.addEventListener('click', () => {
  body.classList.toggle('showCard')

});
close.addEventListener('click', ()=>{
  body.classList.toggle('showCard')
});

const addToCard = (e)



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
    console.log(posts);
    const thisProduct = posts.find((value) => value.id == productId);
    console.log(thisProduct);
    detailsProducts(thisProduct);
  } catch (error) {
    console.log("Error fetching data:", error);
    alert("An error ocuured! Please try again");
  }
}
main();

addCard.addEventListener('click', addToCard)


