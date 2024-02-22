const burgerIcon = document.querySelector(".fa-bars");
      const crossIcon = document.querySelector(".fa-xmark");
      const burgerMenu = document.querySelector(".burger-menu");

      burgerIcon.addEventListener("click", function (event) {
        event.preventDefault();
        burgerMenu.classList.add("show-burger-menu");
      });

      crossIcon.addEventListener("click", function (event) {
        event.preventDefault();
        burgerMenu.classList.remove("show-burger-menu");
      });
      
      export{burgerIcon,crossIcon,burgerMenu};