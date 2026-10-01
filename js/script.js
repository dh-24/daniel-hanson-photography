const hero = document.querySelector(".hero");

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg",
    "images/hero4.jpg",
    "images/hero5.jpg",
];

let currentImage = 0;


// Set the first image
hero.style.backgroundImage = `url("${heroImages[currentImage]}")`;


// Change image every 6 seconds
setInterval(() => {

    currentImage++;

    if (currentImage >= heroImages.length) {
        currentImage = 0;
    }

    hero.style.backgroundImage = `url("${heroImages[currentImage]}")`;

}, 6000);