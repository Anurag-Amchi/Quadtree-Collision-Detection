class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    contains(point){
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }
}

class QuadTree {
    constructor(boundary, n){
        this.boundary = boundary;
        this.capacity =n;
        this.points = [];
        this.divided = false;
    }

    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        this.northeast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        this.northwest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        this.southeast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        this.southwest = new QuadTree(sw, this.capacity);
        this.divided = true; 
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }
        if (this.points.length < this.capacity && this.divided==false) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
                this.divided = true;
                for(let p of this.points){
                    if (this.northeast.insert(p)) {
                        continue;
                    }
                    else if (this.northwest.insert(p)) {
                        continue;
                    }
                    else if (this.southeast.insert(p)) {
                        continue;
                    }
                    else if (this.southwest.insert(p)) {
                        continue;
                    }
                }
                this.points=[];
            }
            if (this.northeast.insert(point)) {
                return true;
            }
            else if (this.northwest.insert(point)) {
                return true;
            }
            else if (this.southeast.insert(point)) {
                return true;
            }
            else if (this.southwest.insert(point)) {
                return true;
            }
        }
    }

    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }
        for (let p of this.points){
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}
