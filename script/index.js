const url = "https://api.noroff.dev/api/v1/rainy-days";

const mainContent = document.getElementById("products");

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
      <p>${product.description}</p>
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
  const posts = await doFetch(url);
  showProducts(posts);
}
main();
