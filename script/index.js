const url = "https://api.noroff.dev/api/v1/rainy-days";

const mainContent = document.getElementById("products");

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
    <div>
      <img alt=${product.title} src="${product.image}"/>
      <h4>${product.title}</h4>
      <h4>${product.description}</h4>

      
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
