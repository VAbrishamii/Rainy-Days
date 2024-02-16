import { burgerIcon,crossIcon,burgerMenu } from "./showburgerMenu.mjs";
import { url } from "./BaseUrl.mjs";

let posts = null;
const  details = document.querySelectorAll('.details');
let productId = new URLSearchParams(windiw.location.search).get('id');



const detailsProducts = (products) => {
    details.innerHTML = " ";
}


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
    posts = await doFetch(url);
    showProducts(posts);
  }
  main()