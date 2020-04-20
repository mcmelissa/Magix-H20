class Thumbleweed {
    constructor() {
      this.x = -250;
      this.y = ((Math.random() * (canvas.offsetHeight/2)) + (canvas.offsetHeight/2)) - 200;
      this.initialHeight = this.y;
      this.speed = (Math.random() * 4) +2;
      this.rotate = 0;
      this.isUp = true;
      this.keepUp = 0;

      this.node = document.createElement("div");
      this.node.style.left = this.x + "px";
      this.node.style.top = this.y + "px";
      this.node.className = "thumbleweed";
  
      this.parent = document.getElementById("login");
      this.parent.insertBefore(this.node, this.parent.firstChild) //dans login
    }
  
    tick() {
      
      //speed
      this.x += this.speed;
      this.node.style.left = this.x + "px";

      //rotation
      this.rotate += this.speed
      this.node.style.transform = "rotate(" + this.rotate + "deg)"

      
      //bounce
      if (this.y < ((canvas.offsetHeight/4)*3)+1 && this.isUp) {
        this.y += (this.speed/2);
        if (this.y >= ((canvas.offsetHeight/4)*3)) {
          this.isUp = false;
        }
      } else {
        this.y -= (this.speed/2);
        if (this.y <= this.initialHeight) {
          this.keepUp += 1;
          this.y = this.initialHeight;
          if (this.keepUp == 30) {
            this.isUp = true;
            this.keepUp = 0;
          }
        }
      }
      this.node.style.top = this.y + "px";
      
      //alive until end of canvas
      let alive = this.x < document.getElementById("login").offsetWidth;

      if (!alive) {
        this.node.remove();
      }
  
      return alive;
    }
  }
  