import { shortenText } from "./shortenText.mjs";

const mainContent = document.getElementById('products');

function womenProducts(){
    const isWomen = localStorage.getItem('isWomen');
    return isWomen ? JSON.parse(isWomen) : [];
}

function displayWomenProducts(products){
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

}

document.addEventListener('DOMContentLoaded', () => {
    const isWomen = womenProducts();
    displayWomenProducts(isWomen);
})