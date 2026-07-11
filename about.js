const counters = document.querySelectorAll(".number");
counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    const isDecimal = target % 1 !== 0;
    let current = 0;
    const speed = target / 100;
    const updateCounter = () => {
        if (current < target) {
            current += speed;
            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target;
        }
    };
    updateCounter();
});