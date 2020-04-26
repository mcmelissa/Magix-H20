let canvas = null;
//let ctx = null;
let img = new Image();
let thumbleweed = [];
let timer = null;


window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    //ctx = canvas.getContext("2d");
    
    img.src = "images/thumbleweed.png"

    tick()
});

const tick = () => {
    //voir Annexe_1

    timer++;

    // thumbleweed //
    if (timer == 100) {
        thumbleweed.push(new Thumbleweed());
    }

    for (let i = 0; i < thumbleweed.length; i++) {
        const element = thumbleweed[i];
        let alive = element.tick();
    
        if (!alive) {
            thumbleweed.splice(i, 1);
            i--;
        }
    }
    
    if (timer == 500) {
    timer = 0;
    }


    window.requestAnimationFrame(tick);
}