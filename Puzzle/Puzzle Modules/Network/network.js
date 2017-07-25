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
    this.clients = [];
    this.edges = [];
    this.nfs = [];
    this.matrix = [];
    this.allPaths = [];

    //Initialize global variables
    TOP_LEFT_X = gameInstance.world.centerX - window.innerWidth / 2;
    TOP_LEFT_Y = gameInstance.world.centerY - window.innerHeight / 2;
    BOTTOM_RIGHT_X = gameInstance.world.centerX + window.innerWidth / 2;
    BOTTOM_RIGHT_Y = gameInstance.world.centerY + window.innerHeight / 2;
}

network.prototype.calculatePaths = function () {
    for (let i = 0; i < this.nodes.length; i++){
        let paths = [];
        for (let j = 0; j < this.nodes.length; j++){
            let path = bfs(this.matrix, this.nodes[i].ID, this.nodes[j].ID);
            for (let k = 0; k < path.length; k++){
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

network.prototype.removeNode = function (node) {
    for (let i = 0; i < this.nodes.length; i++) {
        if (node.equals(this.nodes[i])) {
            this.nodes.splice(i, 1);
        }
    }

    for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].ID = i;
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

network.prototype.populateRouters = function(gameInstance){
    for (let i = 0; i < this.nodes.length; i++){
        if (this.nodes[i].type === "Router"){
            for (let j = 0; j < getRandomInt(1, 2); j++){
                let x_pos = this.nodes[i].sprite.x + getRandomInt(-100, 100);
                let y_pos = this.nodes[i].sprite.y + getRandomInt(-100, 100);
                                
                let c = new client(this.nodes.length, x_pos , y_pos , gameInstance);
                let e = new edge(this.edges.length, this.nodes[i], c, gameInstance);
                e.drawEdge();
                this.nodes[i].edges.push(e);
                this.nodes[i].clients.push(c);
                c.edge = e;
                this.addEdge(e);
                this.addNode(c);
            }
        }
    }
}
