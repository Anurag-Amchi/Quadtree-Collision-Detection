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

function setup(){
    createCanvas(600,400);
    for (let i=0;i<1000;i++){
        particles[i] = new Particle(random(width),random(height));
    }
}

function draw(){
    background(0);
    let boundary = new Rectangle(300,200,300,200);
    let qtree = new QuadTree(boundary,4);
    
    for (let p of particles){
        let point = new Point(p.position.x, p.position.y, p);
        qtree.insert(point);
        p.move();
        p.render();
        p.bounceOffEdges();
        p.setHighlight(false);
    }
    
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
}
