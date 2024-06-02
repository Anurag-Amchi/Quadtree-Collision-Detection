let qtree;

function setup(){
    createCanvas(400,400);

    let boundary = new Rectangle(200,200,200,200);
    qtree = new QuadTree(boundary, 4);
    
    // for (let i=0;i<10;i++){
    //     let p=new Point(random(width),random(height));
    //     qtree.insert(p);
    // }
    let a=new Point(300,100);
    qtree.insert(a);
    let b=new Point(300,150);
    qtree.insert(b);
    let c=new Point(300,155);
    qtree.insert(c);
    let d=new Point(350,150);
    qtree.insert(d);
    let e=new Point(200,200);
    qtree.insert(e);
    // let f=new Point(200,150);
    // qtree.insert(f);

        
    background(0);
    qtree.show()
    console.log(qtree);
}
    
// function draw() {
//     if (mouseIsPressed) {

//         let m = new Point(mouseX, mouseY);
//         qtree.insert(m);
//     }
//     background(0);
//     qtree.show()
// }
