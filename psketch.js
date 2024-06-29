// let particles = [];

// function setup(){
//     createCanvas(600,400);
//     for (let i=0;i<1000;i++){
//         particles[i] = new Particle(random(width),random(height));
//     }
// }

// function draw(){
//     background(0);
//     for (let p of particles){
//         p.move();
//         p.render();
//         p.bounceOffEdges();
//         p.setHighlight(false);
//     }

//     for(let p of particles) {
//         for (let other of particles){
//             if(p!== other && p.intersects(other)){
//                 p.setHighlight(true);
//             }
//         }
//     }
// }

// Above is the O(n^2) method of collision detection(very slow)

let particles = [];
let lastFPSTime = 0; // Tracks the last time FPS was updated

function setup(){
    createCanvas(600,600);
    for (let i=0;i<1000;i++){
        particles[i] = new Particle(random(width),random(height));
    }
}

function draw(){
    background(8, 28, 21);
    let boundary = new Rectangle(300,300,300,300);
    let qtree = new QuadTree(boundary,4);
    
    for (let p of particles){
        let point = new Point(p.position.x, p.position.y, p);
        qtree.insert(point);
        p.move();
        p.render();
        p.bounceOffEdges();
        p.setHighlight(false);
    }
    qtree.show(0)
    // stroke(216, 243, 220);
    // rectMode(CENTER);
    for(let p of particles) {
        let range = new Circle(p.position.x, p.position.y, p.size * 2);
        let points = qtree.query(range)
        for (let pt of points){
            let other = pt.userData;
            if(p!== other && p.intersects(other)){
                p.setHighlight(true);
            }
        }
    }
    if (millis() - lastFPSTime > 1000) { // millis() returns the number of milliseconds since the program started
        let fps = frameRate();
        document.querySelector('.fps').innerHTML = "FPS: " + fps.toFixed(2);
        lastFPSTime = millis(); // Reset the last update time
    }
}
