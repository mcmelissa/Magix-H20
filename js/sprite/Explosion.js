class Explosion {
	constructor(x, y) {
		this.x = x;
        this.y = y;
        this.timer = 100;
        this.opacity = 1;
        this.image = new Image();
        this.imageList = [];
        
        // this.node = document.createElement("div");
        // this.node.style.left = this.x + "px";
        // this.node.style.top = this.y + "px";
        // this.node.style.transform ="scale(2)";
        // this.node.style.opacity = this.opacity
        // this.node.className = "explosion";
    
        // this.parent = document.getElementById("login");
        // this.parent.insertBefore(this.node, this.parent.firstChild);
        // SPRITE (FAILED)
		let columnCount = 7;
		let rowCount = 1;
		let scale = 2;
		let columnLoop = true; //false = si c'était un loop en row
		let refreshDelay = 100; //déplacement 20x/sec

		this.tiledImage = new TiledImage("./images/sprite_explosion.png",
										 columnCount,
										 rowCount,
										 refreshDelay,
										 columnLoop,
										 scale)

        this.tiledImage.changeMinMaxInterval(0,6);
        this.tiledImage.setLooped(false);

        this.image.src = "./images/sprite_explosion.png";
        this.imageList.push(this.image);
	}

    tick()  {
        // SPRITE (FAILED)
        this.opacity -= 0.1;
        this.tiledImage.tick(this.x, this.y, ctx);
        this.tiledImage.setOpacity(this.opacity)

        this.timer -= 1;
      
        let alive = this.timer > 0;

        //alive until transparent
        if (!alive) {
          this.tiledImage.delete();
        }

        return alive;
    }
}