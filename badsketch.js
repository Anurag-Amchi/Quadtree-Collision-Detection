let badparticles = [];
let lastFPSTime = 0;

function setup(){
    createCanvas(600,600);
    for (let i=0;i<1000;i++){
        badparticles[i] = new Particle(random(width),random(height));
    }
}

function draw(){
    background(8, 28, 21);
    for (let p of badparticles){
        p.move();
        p.render();
        p.bounceOffEdges();
        p.setHighlight(false);
    }

    for(let p of badparticles) {
        for (let other of badparticles){
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
