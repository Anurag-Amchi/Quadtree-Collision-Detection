let qtree;

function setup(){
    createCanvas(600,600);

    let boundary = new Rectangle(300,300,300,300);
    qtree = new QuadTree(boundary, 4);
    
    // for (let i=0;i<100;i++){
    //     let p=new Point(random(width),random(height));
    //     qtree.insert(p);
    // }

    // // //**********debugging by adding single points***********/
    // // // let a=new Point(370,170);
    // // // qtree.insert(a);
            
    // background(0);
    // qtree.show()
    // console.log(qtree)
}

function draw() {
    if (mouseIsPressed) {
        
        let m = new Point(mouseX, mouseY);
        qtree.insert(m);
    }
    background(8, 28, 21);
    qtree.show(1)
}
