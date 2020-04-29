class Chili {
    constructor() {
      this.counterHeight = Math.floor(canvas.offsetHeight/2) - 350;
      this.x = Math.floor(canvas.offsetWidth/2);
      this.y = this.counterHeight;
      this.speed = 2;
      this.isDown = true;
      this.goingRight = true;
      this.maxHeight = this.counterHeight - 50;
      this.maxRight = Math.floor((canvas.offsetWidth/5)*3) - 50;
      this.maxLeft = Math.floor(canvas.offsetWidth/4);

      this.node = document.createElement("div");
      this.node.style.left = this.x + "px";
      this.node.style.top = this.y + "px";
      this.node.className = "chili";
  
      this.parent = document.getElementById("lobby");
      this.parent.insertBefore(this.node, this.parent.firstChild)
    }
  
    tick() {
      // walk on counter
      if (this.x < this.maxRight+2 && this.goingRight) {
        this.x += this.speed;
        if (this.x >= this.maxRight){
          this.goingRight = false;
        }
      }
      else {
        this.x -= this.speed;
        if(this.x <= this.maxLeft){
          this.goingRight = true;
        }
      }
      
      //jumping
      if (this.y > this.maxHeight-1 && this.isDown) {
        this.y -= this.speed*2;
        if (this.y <= this.maxHeight) {
          this.isDown = false;
        }
      } else {
        this.y += this.speed*2;
        if (this.y >= this.counterHeight) {
          // this.y = this.counterHeight;
          this.isDown = true;
        }
      }

      addEventListener("mousedown", () => {
        this.node.style.transform = "scale(3) rotate(180deg)";
      })
      addEventListener("mouseup", () => {
        this.node.style.transform = "scale(1)";
      })

      this.node.style.left = this.x + "px";
      this.node.style.top = this.y + "px";
      
      let alive = true;
      if (!alive) {
        this.node.remove();
      }
  
      return alive;
    }
  }
  