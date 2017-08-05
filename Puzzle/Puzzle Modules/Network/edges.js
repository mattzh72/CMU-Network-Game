function edge(network, node1, node2, gameInstance) {
    this.ID = network.edges.length;
    this.network = network;
    this.type = "Edge";
    this.node1 = node1;
    this.node2 = node2;
    this.graphics = gameInstance.add.graphics(TOP_LEFT_X, TOP_LEFT_Y);

    if (node1 && node2) {
        network.edges.push(this);
        this.drawEdge();
    }
}

edge.prototype.drawEdge = function (styleConfig) {
    let obj1 = this.node1;
    let obj2 = this.node2;

    if (this.node1.hasOwnProperty('sprite')) {
        obj1 = this.node1.sprite;
    }
    if (this.node2.hasOwnProperty('sprite')) {
        obj2 = this.node2.sprite;
    }

    let styles;

    if (styleConfig) {
        styles = styleConfig;
    } else {
        styles = [[2, 0x787878, 1]];
    }

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

edge.prototype.getOtherNode = function (node) {
    let otherNode = null;

    if (this.node1.equals(node)) {
        otherNode = this.node2;
    } else if (this.node2.equals(node)) {
        otherNode = this.node1;
    }

    return otherNode;
}

edge.prototype.removeSelf = function () {
    for (let i = 0; i < this.network.edges.length; i++){
        let edge = this.network.edges[i];
        if (edge.equals(this)){
            this.network.removeEdge(this);
        }
    }
}

edge.prototype.destroy = function () {
    this.ID = null;
    this.network = null;
    this.node1 = null;
    this.node2 = null;
    this.graphics.destroy();    
}

edge.prototype.package = function () {
    let edgeObj = {
        ID: this.ID,
        type: this.type,
        node1: [this.node1.type, this.node1.ID],
        node2: [this.node2.type, this.node2.ID],
    };

    return edgeObj;
}
