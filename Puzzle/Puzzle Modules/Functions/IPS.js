function IPS(network, gameInstance) {
    this.type = "IPS";
    this.network = network;
    this.gameInstance = gameInstance;
    this.connectedNode = null;
    this.edge = new edge(this.network.edges.length, this, this.network.nodes[0], gameInstance);
    this.availableActions = [
        "Drop",
        "Allow",
        "Rewrite",
        "Alert",
    ];
    this.disabledConfigs = [];

    //Main sprite instance
    this.sprite = addSprite("", "", 'IPS', 100, 100, PUZZLE_SCALE, false, false, gameInstance).instance;
    this.initializeSprite(gameInstance);

    //Call parent constructor
    nf.call(this, this.network);
}

IPS.prototype = Object.create(nf.prototype);
IPS.prototype.constructor = IPS;

IPS.prototype.addRule = function (src, dst, cont, state, action) {
    let config = nf.prototype.addConfig.call(this, src, dst, cont, state, action);
    return config;
}

IPS.prototype.deleteRule = function (ID) {
    nf.prototype.removeConfig.call(this, ID);
}

IPS.prototype.reportRules = function () {
    nf.prototype.reportConfigs.call(this);
}

IPS.prototype.attach = function () {
    let minDist = 100;
    this.connectedNode = null;

    for (let i = 0; i < this.network.nodes.length; i++) {
        let nextNode = this.network.nodes[i];
        let distance = this.gameInstance.physics.arcade.distanceBetween(this.sprite, nextNode.sprite);
        if (distance < minDist) {
            minDist = distance;
            this.connectedNode = nextNode;
        }
    }

    if (this.connectedNode) {
        this.connectedNode.edges.push(this.edge);
        this.edge.updateNodes(this.connectedNode, this);
        this.edge.drawEdge();
    }
}

IPS.prototype.detach = function () {
    if (this.connectedNode) {
        this.connectedNode.removeEdge(this.edge);
    }
    this.edge.eraseEdge();
}

IPS.prototype.initializeSprite = function (gameInstance) {
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onInputDown.add(openModal, {
        nf: this,
        accordion: "#function-accordion",
        button: "#function-button-add",
        div: "#function-dialog",
        displayInformation: functionInfo,
        tabs: "#function-tabs",
        gameInstance: gameInstance,
    });

    this.sprite.events.onDragStart.add(this.detach, this);
    this.sprite.events.onDragStop.add(this.attach, this);
}
