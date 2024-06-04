class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        // collision detection
        this.userData = userData;
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

    intersects(range) {
        return !(range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
    }

    within(range) {
        return (range.x + range.w >= this.x + this.w &&
            range.x - range.w <= this.x - this.w &&
            range.y + range.h >= this.y + this.h &&
            range.y - range.h <= this.y - this.h);
    }
}

//for collision detection
class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
        return d <= this.rSquared;
    }
    intersects(range) {

        let xDist = Math.abs(range.x - this.x);
        let yDist = Math.abs(range.y - this.y);

        // radius of the circle
        let r = this.r;

        let w = range.w / 2;
        let h = range.h / 2;

        let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

        // no intersection
        if (xDist > (r + w) || yDist > (r + h))
            return false;

        // intersection within the circle
        if (xDist <= w || yDist <= h)
            return true;

        // intersection on the edge of the circle
        return edges <= this.rSquared;
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

    query(range) {
        let found = [];
        if (!this.boundary.intersects(range)) {
            //empty array
            return found;
        }
        if(this.boundary.within(range)){
            // if quadtree completely within range 
            // then return all points of children
            if(this.divided){
                found = found.concat(this.northeast.query(range));
                found = found.concat(this.northwest.query(range));
                found = found.concat(this.southeast.query(range));
                found = found.concat(this.southwest.query(range));
            }
            else{
                // directly add the whole array
                // as all points inside range
                found = found.concat(this.points);
            }
        }
        else {
            if (this.divided) {
                found = found.concat(this.northeast.query(range));
                found = found.concat(this.northwest.query(range));
                found = found.concat(this.southeast.query(range));
                found = found.concat(this.southwest.query(range));
            } 
            else{
                for (let p of this.points) {
                    //count++;
                    if (range.contains(p)) {
                        found.push(p);
                    }
                }
            }
        }
        return found;
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
