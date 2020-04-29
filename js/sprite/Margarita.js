class Margarita {
    constructor() {
      this.x = -200;
      this.y = 0;
      this.angle = 0;
      this.speed = 4;
      this.isCW = true;
      this.maxCW = 20;
      this.maxCCW = -20;

      this.node = document.createElement("div");
      this.node.style.right = this.x + "px";
      this.node.style.bottom = this.y + "px";
      this.node.className = "margarita";
  
      this.parent = document.getElementById("lobby");
      this.parent.insertBefore(this.node, this.parent.firstChild)
      
    }
    tick() {

      // dances (rotate)
      if (this.angle < this.maxCW +2 && this.isCW) {
        this.angle += this.speed;
        if (this.angle >= this.maxCW) {
          this.isCW = false;
        }
      }
      else {
        this.angle -= this.speed;
        if (this.angle <= this.maxCCW) {
          this.isCW = true;
        }
      }

      this.node.style.transform = "rotate(" + this.angle + "deg)";


      let alive = true;
      if (!alive) {
        this.node.remove();
      }
  
      return alive;
    }
  }