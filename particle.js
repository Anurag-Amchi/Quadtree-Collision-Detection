// let dampingFactor = 0.9;
// class Particle{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//         this.r = 8;
//     }

//     move(){
//         // this.x += random(-5,5);   
//         // this.y += random(-5,5);   
//         this.x += (this.velocityX * dampingFactor) + random(-1, 1);
//         this.y += (this.velocityY * dampingFactor) + random(-1, 1);
//     }

//     render(){
//         noStroke();
//         fill(255);
//         ellipse(this.x, this.y, this.r);
//     }
// }
class Particle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        //this.acceleration = createVector(random(-0.1,0.1),random(-0.1,0.1)); // Gravity
        this.size = 5;
        this.highlight = false;
    }

    intersects(other) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        return (d<this.size+other.size);
    }

    setHighlight(value){
        this.highlight = value; 
    }

    move() {
        // this.position.x += random(-1,1);   
        // this.position.y += random(-1,1);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    render() {
        noStroke();
        if(this.highlight){
            fill(216, 243, 220);
        }
        else{
            fill(27, 67, 50);
        }
        ellipse(this.position.x, this.position.y, this.size*2);
    }

    bounceOffEdges() {
        // Check for collisions with edges
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -1; // Invert x velocity
        }
        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -1; // Invert y velocity
        }
    }
}
