import { shortenText } from "./shortenText.mjs";


const url = "https://api.noroff.dev/api/v1/rainy-days";

let posts = null;

const mainContent = document.getElementById("products");
const searchIcon = document.getElementById("searchicon");
const inputBox = document.getElementById("search");
const genderIcon = document.querySelector(".gender");
const dropdownMenu = document.querySelector(".dropdown");
const filteredproduct = document.querySelectorAll("#filter li");

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const favoriteColor = product.favorite ? "red" : "black";

    const jsx = `
    <div class='card'>
     <div class='card-content' >
     <i  id='favorite' class="fa-regular fa-heart" style='color: ${favoriteColor}' ></i>
     <img alt=${product.title} src="${product.image}"/>
      <h2>${product.title}</h2>
      <p>${shortenText(product.description)}</p>
      <h2> NOK ${product.price}</h2>
       <button class='btn'> BUY </button>
    
    </div>
    `;
    mainContent.innerHTML += jsx;
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
  posts = await doFetch(url);
  showProducts(posts);
}

const searchHandler = () => {
  const query = inputBox.value.trim().toLowerCase();
  console.log(query);

  if (!query) {
    showProducts(posts);
    return;
  }
  const searchProducts = posts.filter((product) =>
    product.description.toLowerCase().includes(query)
  );
  showProducts(searchProducts);
};
// const filterHandeler = (event) =>{
//  const category = event.target.innerText.toLowerCase();
//  filteredproduct.forEach((li) => {
//   if (li.innerText.toLowerCase() === category) {
//     li.className = "show-dropdown-li";

//   }else{
//     li.className = "";
//   }
//  });
// };

main();

searchIcon.addEventListener("click", searchHandler);

filteredproduct.forEach((li) => li.addEventListener("click", filterHandeler));

genderIcon.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show-dropdown-li");
});
