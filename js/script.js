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


/* =========================================
   PORTFOLIO LIGHTBOX GALLERY
========================================= */

// Find all portfolio images
const portfolioItems = Array.from(
    document.querySelectorAll(".portfolio-gallery .portfolio-item")
);

// Create the lightbox elements
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-label", "Portfolio image gallery");

lightbox.innerHTML = `
    <button
        class="lightbox-close"
        type="button"
        aria-label="Close gallery"
    >&times;</button>

    <button
        class="lightbox-arrow lightbox-prev"
        type="button"
        aria-label="Previous photo"
    >&#8249;</button>

    <img class="lightbox-image" src="" alt="">

    <button
        class="lightbox-arrow lightbox-next"
        type="button"
        aria-label="Next photo"
    >&#8250;</button>

    <div class="lightbox-counter" aria-live="polite"></div>
`;

document.body.appendChild(lightbox);

// Get references to the lightbox controls
const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
const photoCounter = lightbox.querySelector(".lightbox-counter");

let activePhotoIndex = 0;
let lastFocusedElement = null;


// Display the selected photo
function showPortfolioPhoto(index) {
    // Wrap around at the beginning and end
    activePhotoIndex =
        (index + portfolioItems.length) % portfolioItems.length;

    const selectedLink = portfolioItems[activePhotoIndex];
    const selectedImage = selectedLink.querySelector("img");

    // Use the original image URL from the portfolio link
    lightboxImage.src = selectedLink.href;
    lightboxImage.alt = selectedImage
        ? selectedImage.alt
        : "Portfolio photograph";

    photoCounter.textContent =
        `${activePhotoIndex + 1} / ${portfolioItems.length}`;
}


// Open the lightbox
function openLightbox(index) {
    if (portfolioItems.length === 0) return;

    lastFocusedElement = document.activeElement;

    showPortfolioPhoto(index);

    lightbox.classList.add("active");
    document.body.classList.add("lightbox-open");

    closeButton.focus();
}


// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");

    // Restore focus to the photo that was clicked
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}


// Click a portfolio photo to open the lightbox
portfolioItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
        event.preventDefault();
        openLightbox(index);
    });
});


// Navigate to the previous photo
previousButton.addEventListener("click", () => {
    showPortfolioPhoto(activePhotoIndex - 1);
});


// Navigate to the next photo
nextButton.addEventListener("click", () => {
    showPortfolioPhoto(activePhotoIndex + 1);
});


// Close button
closeButton.addEventListener("click", closeLightbox);


// Click the dark background to close the gallery
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPortfolioPhoto(activePhotoIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showPortfolioPhoto(activePhotoIndex + 1);
    }
});


/* =========================================
   VIRTUAL TWILIGHT COMPARISON SLIDER
========================================= */

document.querySelectorAll(".twilight-comparison").forEach((slider) => {

    const range = slider.querySelector(".comparison-range");

    if (!range) return;

    function updateComparison() {

        const position = Number(range.value);

        slider.style.setProperty("--position", `${position}%`);

        range.setAttribute(
            "aria-valuetext",
            `${position}% before image visible`
        );

    }

    range.addEventListener("input", updateComparison);

    updateComparison();

});

