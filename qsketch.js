let qtree;

let count = 0;

function setup(){
    createCanvas(600,600);
    //background(255);
    let boundary = new Rectangle(300,300,300,300);
    qtree = new QuadTree(boundary, 4);
    for(let i=0;i<500;i++){
        let x= randomGaussian(width/2,width/8);
        let y= randomGaussian(height/2,height/8);
        let p = new Point(x,y);
        //let p=new Point(random(width),random(height));
        qtree.insert(p);
    }
}

function draw(){
    background(8, 28, 21);
    qtree.show(1);

    stroke(216, 243, 220);
    rectMode(CENTER);
    //let range = new Rectangle(300,300,400,400);
    //let range = new Rectangle(random(width),random(height),50,50);
    let range = new Rectangle(mouseX,mouseY,100,100);
    strokeWeight(2);
    rect(range.x, range.y, range.w *2, range.h*2);
    let points = qtree.query(range);
    //console.log(points);
    for(let p of points){
        strokeWeight(5);
        point(p.x,p.y);
    }
    //console.log(count);

}
