import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { url } from "./BaseUrl.mjs";

let posts = null;
let details = document.querySelector(".details");
let productId = new URLSearchParams(window.location.search).get("id");

const detailsProducts = (product) => {
  if (!product) {
    window.location.href = "/";
    return;
  }
  details.querySelector(".image img").src = product.image;
  details.querySelector(".name").innerText = product.title;
  details.querySelector(".price").innerText = "NOK" + product.price;
  details.querySelector(".description").innerText = product.description;
  details.querySelector(".color").innerText = "Color: " + product.baseColor;
  details.querySelector(".size").innerText =
    "Choose Your Size: " + product.sizes;
  details.querySelector(".gender").innerText = product.gender;
  details.querySelector(".discountedprice").innerText =
    "DiscountedPrice: NOK" + product.discountedPrice;

  const sizeElements = details.querySelectorAll(".size");
  sizeElements.forEach(sizeElement => {
    sizeElement.style.cursor = "pointer";
    sizeElement.addEventListener("click", () => {
      sizeElements.forEach(elemnt => elemnt.classList.toggle("selected-size"));
    
    });
  });
};

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
