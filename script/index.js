const url = "https://api.noroff.dev/api/v1/rainy-days";

const mainContent = document.getElementById("products");

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
    <div>
      <img alt=${product.title} src=${product.image}/>
      <h4>${product.title}</h4>
      <h3>${product.description}</h3>
      
    </div>
    `;
    mainContent.innerHTML += jsx;
  });
};
// function displayPost(posts) {
//   for (let i = 0; i < post.length; i++) {
//     const title = post[i].title;
//     const gender = post[i].gender;
//     // Call a function to generate HTML
//     console.log("Title:", title, "Gender:", gender);
//   }
// }
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
