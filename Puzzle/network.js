let TOP_LEFT_X;
let TOP_LEFT_Y;
let BOTTOM_RIGHT_X;
let BOTTOM_RIGHT_Y;
let PADDING = 100;


function network(ID, gameInstance) {
    this.ID = ID;
    this.gameInstance = gameInstance;
    this.nodes = [];
    this.edges = [];
    this.networkFunctions = [];

    //Initialize global variables
    TOP_LEFT_X = gameInstance.world.centerX - window.innerWidth / 2;
    TOP_LEFT_Y = gameInstance.world.centerY - window.innerHeight / 2;
    BOTTOM_RIGHT_X = gameInstance.world.centerX + window.innerWidth / 2;
    BOTTOM_RIGHT_Y = gameInstance.world.centerY + window.innerHeight / 2;

    this.addNode = function (node) {
        this.nodes.push(node);
    };
    
    this.removeNode = function(node){
        for (let i = 0; i < this.nodes.length; i++){
            if (node.equals(this.nodes[i])){
                this.nodes.splice(i, 1);
            }
        }
        
        for (let i = 0; i < this.nodes.length; i++){
            this.nodes[i].ID = i;
        }
    }

    this.addEdge = function (edge) {
        this.edges.push(edge);
    };
    
    this.removeEdge = function(edge) {
        for (let i = 0; i < this.edges.length; i++){
            if (edge.equals(this.edges[i])){
                this.edges.splice(i, 1);
            }
        }
        
        for (let i = 0; i < this.edges.length; i++){
            this.edges[i].ID = i;
        }       
    }

    this.outputNodes = function () {
        for (let i = 0; i < this.nodes.length; i++) {
            console.log(this.nodes[i]);
        }
    };

    this.outputEdges = function () {
        for (let i = 0; i < this.edges.length; i++) {
            console.log(this.edges[i]);
        }
    };
}

function node(ID, type, x, y, gameInstance) {
    this.ID = ID;
    this.type = type;
    this.x = x;
    this.y = y;

    //check the type to get right image
    let image;
    switch (type) {
        case "Router":
            image = 'router';
            break;
        default:
            image = 'router';
    }

    this.sprite = addSprite(type, type, image, x, y, 0.5, 0, true, gameInstance).instance;
    
    this.equals = function(otherNode) {
        return this.ID == otherNode.ID && this.type == otherNode.type;
    }
}

function edge(ID, node1, node2, gameInstance) {
    this.ID = ID;
    this.type = "Edge";
    this.node1 = node1;
    this.node2 = node2;
    this.graphics = gameInstance.add.graphics(TOP_LEFT_X, TOP_LEFT_Y);

    this.drawEdge = function () {
        this.graphics.lineStyle(1, 0xffd900, 1);
        drawLine(this.node1.x, this.node1.y, this.node2.x, this.node2.y, this.graphics);
    }

    this.eraseEdge = function () {
        this.graphics.clear();
    }

    this.updateNodes = function (node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
    }

    this.outputEdge = function () {
        console.log(this.node1.ID + " - " + this.node2.ID);
    }
    
    this.equals = function(otherEdge){
        let otherNode1 = otherEdge.node1;
        let otherNode2 = otherEdge.node2;
        
        let case1 = this.node1.equals(otherNode1) && this.node2.equals(otherNode2);
        let case2 = this.node2.equals(otherNode1) && this.node1.equals(otherNode2);
        
        return case1 || case2 ;
    }
}


function drawLine(x1, y1, x2, y2, graphics) {
    graphics.moveTo(x1, y1);
    graphics.lineTo(x2, y2);
}
