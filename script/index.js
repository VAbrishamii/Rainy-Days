// import  {getData}  from "./module/httprequest"

// const init= async() => {
//     const allProducts = await getData `All entries` ;
//     console.log(allProducts)

// };

// document.addEventListener("DOMContentLoaded", init);

async function getData() {
  const res = await fetch("https://docs.noroff.dev");
  const data = await res.json();
  console.log(data);
}
getData();
