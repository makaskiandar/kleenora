const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
let showFirst = true;  //showing 1st image=true
setInterval(() => { //to keep something running every specific interval of time
    if (showFirst) {
        bg1.style.opacity = "0";
        bg2.style.opacity = "1";
    } else {
        bg1.style.opacity = "1";
        bg2.style.opacity = "0";
    }
    showFirst = !showFirst;
}, 3000);


const images = document.querySelectorAll(".smallimages img"); //to make images pop
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
images.forEach(image => {
    image.addEventListener("click", () => {
        lightbox.classList.add("show");
        lightboxImg.src = image.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
});
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

const cartButtons = document.querySelectorAll(".buttonn button");  //for cart count
const cartCount = document.getElementById("cartCount");
let count = 0;
cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        count++;
        cartCount.textContent = count;
        cartCount.style.opacity = "1";
        cartCount.style.transform = "scale(1)";
    });
});