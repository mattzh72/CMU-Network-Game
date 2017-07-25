function edge(ID, node1, node2, gameInstance) {
    this.ID = ID;
    this.type = "Edge";
    this.node1 = node1;
    this.node2 = node2;
    this.graphics = gameInstance.add.graphics(TOP_LEFT_X, TOP_LEFT_Y);
}

edge.prototype.drawEdge = function () {

    let obj1 = this.node1;
    let obj2 = this.node2;

    if (this.node1.hasOwnProperty('sprite')) {
        obj1 = this.node1.sprite;
    }
    if (this.node2.hasOwnProperty('sprite')) {
        obj2 = this.node2.sprite;
    }

    let styles = [
//        [15, 0x303030, 0.8],
//        [13, 0x696969, 0.6], 
//        [10, 0x696969, 0.5], 
        [2, 0x787878, 1],
//        [7, 0xffffff, 0.2],
//        [10, 0xF3CBD1, 0.1],
    ];

    for (let i = 0; i < styles.length; i++) {
        let style = styles[i];
        this.graphics.lineStyle(style[0], style[1], style[2]);
        this.graphics.moveTo(obj1.x, obj1.y);
        this.graphics.lineTo(obj2.x, obj2.y);
    }

    obj1.bringToTop();
    obj2.bringToTop();
}


edge.prototype.eraseEdge = function () {
    this.graphics.clear();
}

edge.prototype.updateNodes = function (node1, node2) {
    this.node1 = node1;
    this.node2 = node2;
}

edge.prototype.outputEdge = function () {
    console.log(this.node1.ID + " - " + this.node2.ID);
}

edge.prototype.equals = function (otherEdge) {
    let otherNode1 = otherEdge.node1;
    let otherNode2 = otherEdge.node2;

    let case1 = this.node1.equals(otherNode1) && this.node2.equals(otherNode2);
    let case2 = this.node2.equals(otherNode1) && this.node1.equals(otherNode2);

    return case1 || case2;
}
