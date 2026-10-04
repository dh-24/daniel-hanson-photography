const hero = document.querySelector(".hero");

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg",
    "images/hero4.jpg",
    "images/hero5.jpg"
];

let currentImage = 0;


/* =========================================
   PRELOAD HERO IMAGES
========================================= */

heroImages.forEach((image) => {

    const preload = new Image();

    preload.src = image;

});


/* =========================================
   SET FIRST IMAGE
========================================= */

hero.style.backgroundImage =
    `url("${heroImages[currentImage]}")`;


/* =========================================
   CHANGE HERO IMAGE
========================================= */

setInterval(() => {

    currentImage++;

    if (currentImage >= heroImages.length) {

        currentImage = 0;

    }

    hero.style.backgroundImage =
        `url("${heroImages[currentImage]}")`;

}, 6000);