import { shortenText } from "./shortenText.mjs";
import { optionMenu, selectBtn, options, btnText } from "./optionMenu.mjs";
import { burgerIcon, crossIcon, burgerMenu } from "./showburgerMenu.mjs";
import { url } from "./BaseUrl.mjs";
import { pageLoading } from "./loader.mjs";

// import{updateCartDisplay,updateLocalStorage,addProductToCard,addToCard} from "./addToCard.mjs"

let posts = null;

const mainContent = document.getElementById("products");
const searchIcon = document.getElementById("searchicon");
const inputBox = document.getElementById("search");
const filteredproduct = document.querySelectorAll(".genders li");
const saleProducts = document.querySelector(".sale");
const favoriteProducts = document.querySelector(".favorite");
const womenButton = document.querySelector(".women-button");

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
   
    const favoriteColor = product.favorite ? "red" : "black";

    const jsx = `
    <a href='/addtocard.html?id=${product.id}' class='card'>
     <div class='card-content' >
     <i  id='favorite' class="fa-regular fa-heart" style='color: ${favoriteColor}' ></i>
      <img alt=${product.title} src="${product.image}" class='image'/> 
      <h2>${product.title}</h2>
      <p>${shortenText(product.description)}</p>
      <h2> NOK ${product.price}</h2>
   
  
      <button class='btn addCard' > More details </button>
      </div>
      </a>
    `;
    mainContent.innerHTML += jsx;
  });
};





// search product
const searchHandler = () => {
  const query = inputBox.value.trim().toLowerCase();
  if (!query) {
    showProducts(posts);
    return;
  }
  const searchProducts = posts.filter((product) =>
    product.description.toLowerCase().includes(query)
  );
  showProducts(searchProducts);
};
searchIcon.addEventListener("click", searchHandler);

//filter by gender

const filteredHander = (e) => { 
  const selectedOption = e.target.innerText.toLowerCase();

  if (selectedOption === "all") {
    showProducts(posts);
    return;
  }
  const filterPosts = posts.filter((product) => product.gender.toLowerCase() === selectedOption);
  showProducts(filterPosts);
}
filteredproduct.forEach((li) => li.addEventListener("click", filteredHander));


//go to the women page
womenButton.addEventListener("click", async () => {
  const isWomen = posts.filter((product) => product.gender.toLowerCase()==='female');
    window.location.href = "./woman.html";
 localStorage.setItem('isWomen', JSON.stringify(isWomen));
  });




//show onSale product
const saleHandler = (e) => {
  const saleOptions = e.target.innerText.toLowerCase();
  const saleFilter = posts.filter((product) => product.onSale === true);

  if (saleFilter) {
    showProducts(saleFilter);
    return;
  }

  showProducts(posts);
};
saleProducts.addEventListener("click", saleHandler);

//show favorite product
const favoriteHandler = (e) => {
  const favoriteOptions = e.target.innerText.toLowerCase();
  const favoriteFilter = posts.filter((product) => product.favorite === true);
  if (favoriteFilter) {
    showProducts(favoriteFilter);
    return;
  }
  showProducts(posts);
};
favoriteProducts.addEventListener("click", favoriteHandler);

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
  pageLoading();
  showProducts(posts);
 
  
}

main();
