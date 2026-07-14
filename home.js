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

const cartButtons = document.querySelectorAll(".buttonn button");
const cartCount = document.getElementById("cartCount");

const cartModal = document.getElementById("cartModal");
const cartSummary = document.getElementById("cartSummary");

const cartCloseBtn = document.querySelector(".cart-modal .close");
const continueBtn = document.getElementById("continueBtn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let count = 0;
let total = 0;

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        count++;

        const card = button.closest(".card");

        const priceText = card.querySelector(".original").textContent;

        const price = parseInt(priceText.replace("Rs.", "").trim());
        const name = card.querySelector("h3").textContent;
        const image = card.querySelector(".image").src;

        total += price;
        const existingItem = cart.find(item => item.name === name);
        cartSummary.textContent =
            `(${count}) Items | Rs.${total} Total`;

        if (existingItem) {

            existingItem.quantity++;

        }
        else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }

        renderCart();

        cartCount.textContent = count;
        cartCount.style.opacity = "1";
        cartCount.style.transform = "scale(1)";
        fireConfetti();

        

        cartModal.classList.add("show");

        function fireConfetti() {
            confetti({
                particleCount: 350,
                spread: 180,
                startVelocity: 70,
                gravity: 2.8,
                ticks: 400,
                scalar: 1.2,
                origin: {
                    x: 0.5,
                    y: 0.1
                }
            });
        }

    });

});

cartCloseBtn.addEventListener("click", () => {
    cartModal.classList.remove("show");
});

continueBtn.addEventListener("click", () => {
    cartModal.classList.remove("show");
});

window.addEventListener("click", (e) => {

    if (e.target === cartModal) {

        cartModal.classList.remove("show");

    }

});

const cartIcon = document.getElementById("cartIcon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {
    renderCart();
    cartSidebar.classList.add("show");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("show");
});
function renderCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    cart.forEach(item => {

        cartItems.innerHTML += `

        <div class="cart-item">

            <img class="cart-product-img" src="${item.image}">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>Rs. ${item.price}</p>

            </div>

           <div class="qty">

    <button onclick="decreaseQty('${item.name}')">−</button>

<span>${item.quantity}</span>

<button onclick="increaseQty('${item.name}')">+</button>

<button class="remove" onclick="removeItem('${item.name}')">✖</button>

</div>

        </div>

        `;

    });
    document.getElementById("sidebarCount").textContent =
        cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartTotal").textContent =
        cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {

        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;

    });
    cartSummary.textContent =
        `(${totalItems}) Items | Rs.${totalPrice} Total`;
    document.getElementById("cartTotal").textContent = totalPrice;
    document.getElementById("sidebarCount").textContent = totalItems;
    cartCount.textContent = totalItems;

if (totalItems > 0) {
    cartCount.style.opacity = "1";
    cartCount.style.transform = "scale(1)";
} else {
    cartCount.style.opacity = "0";
}

    localStorage.setItem("cart", JSON.stringify(cart));
    const savedCount = cart.reduce((sum, item) => sum + item.quantity, 0);

cartCount.textContent = savedCount;

if (savedCount > 0) {
    cartCount.style.opacity = "1";
    cartCount.style.transform = "scale(1)";
}
}

function increaseQty(name) {

    const item = cart.find(product => product.name === name);

    if (item) {

        item.quantity++;

        renderCart();

    }

}

function decreaseQty(name) {

    const item = cart.find(product => product.name === name);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(product => product.name !== name);

    }

    renderCart();

}

function removeItem(name) {

    cart = cart.filter(product => product.name !== name);

    renderCart();

}
const gotoCart = document.getElementById("gotoCart");
gotoCart.addEventListener("click", () => {

    cartModal.classList.remove("show");   // Close popup

    renderCart();                         // Refresh sidebar

    cartSidebar.classList.add("show");    // Open sidebar

});
renderCart();