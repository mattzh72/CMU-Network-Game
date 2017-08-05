let TOP_LEFT_X;
let TOP_LEFT_Y;
let BOTTOM_RIGHT_X;
let BOTTOM_RIGHT_Y;
let PADDING = 100;
let PUZZLE_SCALE = 0.5;
let CLIENT_SCALE = 0.8;

function network(ID, gameInstance) {
    this.ID = ID;
    this.gameInstance = gameInstance;
    this.nodes = [];
    this.edges = [];
    this.nfs = [];
    this.matrix = [];
    this.allPaths = [];

    //Initialize global variables
    TOP_LEFT_X = 0;
    TOP_LEFT_Y = 0;
    BOTTOM_RIGHT_X = 500;
    BOTTOM_RIGHT_Y = 500;
}

network.prototype.calculatePaths = function () {
    for (let i = 0; i < this.nodes.length; i++) {
        let paths = [];
        for (let j = 0; j < this.nodes.length; j++) {
            let path = bfs(this.matrix, this.nodes[i].ID, this.nodes[j].ID);
            for (let k = 0; k < path.length; k++) {
                path[k] = this.nodes[path[k]].type + " " + path[k];
            }
            paths.push(path);
        }
        this.allPaths.push(paths);
    }
}

network.prototype.matrixify = function () {
    for (let i = 0; i < this.nodes.length; i++) {
        let row = makeEmptyArray(this.nodes.length, 0);
        let nearbyNodes = getNearbyNodes(this.nodes[i], this.edges);
        for (let j = 0; j < nearbyNodes.length; j++) {
            row[nearbyNodes[j].ID] = 1;
        }
        this.matrix.push(row);
    }
}

network.prototype.addNode = function (node) {
    this.nodes.push(node);
}

network.prototype.removeNF = function (nf) {
    for (let i = 0; i < this.nfs.length; i++) {
        if (nf.equals(this.nfs[i])) {
            this.nfs.splice(i, 1);
        }
    }

    for (let i = 0; i < this.nfs.length; i++) {
        this.nfs[i].ID = i;
    }
}

network.prototype.addEdge = function (edge) {
    this.edges.push(edge);
}

network.prototype.removeEdge = function (edge) {
    for (let i = 0; i < this.edges.length; i++) {
        if (edge.equals(this.edges[i])) {
            this.edges.splice(i, 1);
        }
    }

    for (let i = 0; i < this.edges.length; i++) {
        this.edges[i].ID = i;
    }
}

network.prototype.outputNodes = function () {
    for (let i = 0; i < this.nodes.length; i++) {
        console.log(this.nodes[i]);
    }
}


network.prototype.outputEdges = function () {
    for (let i = 0; i < this.edges.length; i++) {
        console.log(this.edges[i]);
    }
}

network.prototype.populateRouters = function (gameInstance) {
    for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].type === "Router") {
            for (let j = 0; j < getRandomInt(1, 2); j++) {
                let x_pos = this.nodes[i].sprite.x + getRandomInt(-100, 100);
                let y_pos = this.nodes[i].sprite.y + getRandomInt(-100, 100);

                let c = new client(this.nodes.length, x_pos, y_pos, gameInstance);
                let e = new edge(this, this.nodes[i], c, gameInstance);
                c.edge = e;
                this.nodes[i].addClient(c, e);
                this.addNode(c);
            }
        }
    }
}

network.prototype.findNode = function(type, ID){
    if (type === "Router" || type === "Client"){
        for (let i = 0; i < this.nodes.length; i++){
            if (this.nodes[i].type == type && this.nodes[i].ID == ID){
                return this.nodes[i];
            }
        }
    } else {
         for (let i = 0; i < this.nfs.length; i++){
            if (this.nfs[i].type == type && this.nfs[i].ID == ID){
                return this.nfs[i];
            }
        }       
    }
    
    return null;
}

network.prototype.hasEdge = function(edge){
    for (let i = 0; i < this.edges.length; i++){
        if (this.edges[i].equals(edge)){
            return true;
        }
    }
    
    return false;
}

network.prototype.copy = function (otherNetwork) {
    for (k in otherNetwork){
        if (otherNetwork.hasOwnProperty(k)){
            network[k] = otherNetwork[k];
        }
    }
}

network.prototype.destroy = function () {
    this.ID = null;
    this.gameInstance = null;
    this.nodes = null;
    this.edges = null;
    this.nfs = null;
    this.matrix = null;
    this.allPaths = null;    
}

