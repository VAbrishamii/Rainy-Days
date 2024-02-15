const burgerIcon = document.querySelector(".fa-bars");
      const crossIcon = document.querySelector(".fa-xmark");
      const burgerMenu = document.querySelector(".burger-menu");

      burgerIcon.addEventListener("click", function () {
        burgerMenu.classList.add("show-burger-menu");
      });

      crossIcon.addEventListener("click", function () {
        burgerMenu.classList.remove("show-burger-menu");
      });
      export{burgerIcon,crossIcon,burgerMenu};