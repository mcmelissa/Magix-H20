window.addEventListener("load", () =>


tick()
);

const tick = () => {
    //voir Annexe_1



    window.requestAnimationFrame(tick);
}