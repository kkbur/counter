
for(const item of document.querySelectorAll(".count_to")) {
    const offset = item.getBoundingClientRect(),
        windowHeight = window.outerHeight,
        finalOffset = offset.top - (windowHeight * 0.65),
        startCounting = () => {
            if(window.scrollY > finalOffset) {
                countingUpdate(item);
                window.removeEventListener("scroll", startCounting);
            }
        };
    window.addEventListener("scroll", startCounting);
}

async function countingUpdate(el) {

    let countTo = parseInt(el.dataset.count, 10),
        delay = parseInt(el.dataset.delay, 10),
        frames = parseInt(el.dataset.frames, 10),
        step = countTo / frames,
        current = 0;

    await new Promise(res => setTimeout(() => res(), delay));

    for(let i = 0; i < 200; i++) {
        await new Promise(resolve => requestAnimationFrame(() => {
            current += step;
            el.innerHTML = Math.round(current);
            resolve();
        }));
    }

    el.innerHTML = countTo + '+';
}
