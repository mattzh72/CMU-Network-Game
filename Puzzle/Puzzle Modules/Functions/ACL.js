function ACL(network, gameInstance) {
    this.type = "ACL";
    this.sprite = gameInstance.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'ACL');
    this.initializeSprite(this.sprite, network.nfs.length, gameInstance);
    this.network = network;
    this.gameInstance = gameInstance;
    this.connectedNode = null;
    this.edge = new edge(this.network, this, this.network.nodes[0], gameInstance);
    this.edge.eraseEdge();
    this.disabledConfigs = [
        "Destination",
        "Content",
        "State",
    ];

    this.tooltip;

    nf.call(this, this.network, this.type);
}


ACL.prototype = Object.create(nf.prototype);
ACL.prototype.constructor = ACL;


ACL.prototype.addRule = function (config) {
    nf.prototype.addConfig.call(this, config);
}


ACL.prototype.deleteRule = function (ID) {
    nf.prototype.removeConfig.call(this, ID);
}


ACL.prototype.reportRules = function () {
    nf.prototype.reportConfigs.call(this);
}


ACL.prototype.attach = function () {
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

    if (this.connectedNode && this.connectedNode.type === "Router") {
        this.connectedNode.edges.push(this.edge);
        this.connectedNode.addNF(this);
        this.edge.updateNodes(this.connectedNode, this);
        this.edge.drawEdge();
    }
}


ACL.prototype.detach = function () {
    if (this.connectedNode && this.connectedNode.type === "Router") {
        this.connectedNode.removeEdge(this.edge);
        this.connectedNode.removeNF(this);
    }
    this.edge.eraseEdge();
}

ACL.prototype.onHover = function () {
    this.ACL.initToolTip(this.ID, this.sprite, this.gameInstance);
    this.ACL.tooltip.simulateOnHoverOver();

    let styles = [
    [10, 0xF3CBD1, 0.1],
    [8, 0xF3CBD1, 0.15],
    [4, 0xF3CBD1, 0.4],
    [3, 0xF3CBD1, 0.5],
    [2, 0xF3CBD1, 1],
    ];

    this.ACL.edge.eraseEdge();

    if (this.ACL.connectedNode) {
        this.ACL.edge.drawEdge(styles);
    }

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: PUZZLE_SCALE + 0.05,
        y: PUZZLE_SCALE + 0.05,
    }, 200, Phaser.Easing.Linear.In, true);
}

ACL.prototype.stopHover = function () {
    this.ACL.tooltip.simulateOnHoverOut();
    setTimeout(this.ACL.tooltip.destroy, 200);

    this.ACL.edge.eraseEdge();
    
    if (this.ACL.connectedNode){
        this.ACL.edge.drawEdge();
    }

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: PUZZLE_SCALE,
        y: PUZZLE_SCALE
    }, 200, Phaser.Easing.Linear.In, true);
}

ACL.prototype.initToolTip = function (ID, sprite, gameInstance) {
    let style = {
        font: "12px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 180,
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: "center",
    };
    let text = gameInstance.add.text(0, 0, "ACL No. " + ID + ".\nHold SHIFT and click to configure.", style);
    text.setTextBounds(0, 0, 200, 50);

    this.tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
    });
}


ACL.prototype.initializeSprite = function (sprite, ID, gameInstance) {
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(PUZZLE_SCALE, PUZZLE_SCALE);
    gameInstance.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 0;
    this.sprite.body.collideWorldBounds = true;
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

    this.sprite.events.onInputOver.add(this.onHover, {
        sprite: sprite,
        ID: ID,
        gameInstance: gameInstance,
        ACL: this,
    });

    this.sprite.events.onInputOut.add(this.stopHover, {
        sprite: sprite,
        gameInstance: gameInstance,
        ACL: this,
    });
}

ACL.prototype.destroy = function () {
    this.network.removeNF(this);
    this.sprite.destroy();
    this.edge.graphics.destroy();
    console.log(this.network.nfs);
}
