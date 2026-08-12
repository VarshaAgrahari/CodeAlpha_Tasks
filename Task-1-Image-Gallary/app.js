const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// Current images after filtering
let visibleImages = [];

let currentIndex = 0;


// ------------------------------------
// FILTER FUNCTION
// ------------------------------------

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        // Active button change
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Show / hide images
        galleryItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });


        // Update visible images
        updateVisibleImages();

    });

});


// ------------------------------------
// UPDATE VISIBLE IMAGES
// ------------------------------------

function updateVisibleImages() {

    visibleImages = [];

    galleryItems.forEach(item => {

        if (item.style.display !== "none") {

            const image = item.querySelector("img");

            visibleImages.push(image);

        }

    });

}


// Initially show all images
updateVisibleImages();


// ------------------------------------
// OPEN LIGHTBOX
// ------------------------------------

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const image = item.querySelector("img");

        const index = visibleImages.indexOf(image);

        if (index !== -1) {

            currentIndex = index;

            showImage();

            lightbox.classList.add("show");

        }

    });

});


// ------------------------------------
// SHOW IMAGE
// ------------------------------------

function showImage() {

    if (visibleImages.length === 0) {
        return;
    }

    lightboxImage.src = visibleImages[currentIndex].src;

    lightboxImage.alt = visibleImages[currentIndex].alt;

}


// ------------------------------------
// NEXT BUTTON
// ------------------------------------

nextBtn.addEventListener("click", () => {

    if (visibleImages.length === 0) {
        return;
    }

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();

});


// ------------------------------------
// PREVIOUS BUTTON
// ------------------------------------

prevBtn.addEventListener("click", () => {

    if (visibleImages.length === 0) {
        return;
    }

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();

});


// ------------------------------------
// CLOSE LIGHTBOX
// ------------------------------------

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("show");

});


// ------------------------------------
// CLICK OUTSIDE IMAGE TO CLOSE
// ------------------------------------

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("show");

    }

});


// ------------------------------------
// KEYBOARD SUPPORT
// ------------------------------------

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    else if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

    else if (event.key === "Escape") {

        closeBtn.click();

    }

});