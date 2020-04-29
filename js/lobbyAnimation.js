let canvas = null;
//let ctx = null;
let chili = new Image();
let avocado = new Image();
let list = [];


window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    
    // chili.src = "./images/heroes/chile1.png"
    // avocado.src = "./images/heroes/aguacate.png"
    list.push(new Chili());
    list.push(new Margarita());

    tick()
});

const tick = () => {
    //voir Annexe_1

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let alive = element.tick();
    
        if (!alive) {
            list.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}