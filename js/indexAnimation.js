let canvas = null;
let ctx = null;
let thumbleweed = [];
let spriteList = [];
// let imgSprite = new Image();
let timer = null;

let thumbleweedX = null;
let thumbleweedY = null;
let isThumbleweedKilled = false;

window.addEventListener("load", () => {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tick()
});


const tick = () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    timer++;
    
    // thumbleweed //
    if (timer == 100) {
        thumbleweed.push(new Thumbleweed());
    }
    
    for (let i = 0; i < thumbleweed.length; i++) {
        const element = thumbleweed[i];
        let alive = element.tick();

        thumbleweedX = element.getX();
        thumbleweedY = element.getY();
        
        if (!alive) {
            thumbleweed.splice(i, 1);
            i--;
        }
    }

    //explosion
    for (let i = 0; i < spriteList.length; i++) {
        const object = spriteList[i];
        let alive = object.tick();
        
        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }
    
    if (timer == 500) {
    timer = 0;
    }

    window.requestAnimationFrame(tick);
}