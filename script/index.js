import  {getData}  from "./module/httprequest"


const init= async() => {
    const allProducts = await getData `All entries` ;
    console.log(allProducts)

};

document.addEventListener("DOMContentLoaded", init);
