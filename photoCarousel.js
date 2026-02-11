(function () {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let index = 0;
    let startX = 0;
    let isDragging = false;

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
    }

    function updateDots() {
        const dots = Array.from(dotsContainer.children);
        dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
    }

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        track.style.transform = `translateX(calc(-${index * 100}% - ${diff}px))`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        isDragging = false;
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goTo(index + 1);
            else goTo(index - 1);
        } else {
            goTo(index);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(index - 1);
        if (e.key === 'ArrowRight') goTo(index + 1);
    });
    goTo(0);
})();