function client(ID, x, y, gameInstance) {
    let edge;

    this.type = "Client";
    this.sprite = gameInstance.add.sprite(x, y, 'client');
    this.tooltip;

    this.initializeSprite(ID, gameInstance);

    node.call(this, ID, "Client", gameInstance);
}

client.prototype = Object.create(node.prototype);
client.prototype.constructor = client;

client.prototype.initializeSprite = function (ID, gameInstance) {
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(CLIENT_SCALE, CLIENT_SCALE);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onDragStart.add(this.updateEdge, this);
    this.sprite.events.onDragStop.add(this.updateEdge, this);
    this.sprite.events.onInputOver.add(this.onHover, {
        ID: ID,
        gameInstance: gameInstance,
        client: this,
    });

    this.sprite.events.onInputOut.add(this.stopHover, {
        gameInstance: gameInstance,
        client: this,
    });
}

client.prototype.stopHover = function () {
    this.client.tooltip.simulateOnHoverOut();
    setTimeout(this.client.tooltip.destroy, 200);

    this.client.edge.eraseEdge();
    this.client.edge.drawEdge();

    //scaling
    this.gameInstance.add.tween(this.client.sprite.scale).to({
        x: CLIENT_SCALE,
        y: CLIENT_SCALE,
    }, 200, Phaser.Easing.Linear.In, true);
}

client.prototype.onHover = function () {
    this.client.initToolTip(this.ID, this.client.sprite, this.gameInstance);
    this.client.tooltip.simulateOnHoverOver();

    let styles = [
    [10, 0xF3CBD1, 0.1],
    [8, 0xF3CBD1, 0.15],
    [4, 0xF3CBD1, 0.4],
    [3, 0xF3CBD1, 0.5],
    [2, 0xF3CBD1, 1],
    ];

    this.client.edge.eraseEdge();
    this.client.edge.drawEdge(styles);


    //scaling
    this.gameInstance.add.tween(this.client.sprite.scale).to({
        x: CLIENT_SCALE + 0.05,
        y: CLIENT_SCALE + 0.05,
    }, 200, Phaser.Easing.Linear.In, true);
    this.client.sprite.bringToTop();
}

client.prototype.initToolTip = function (ID, sprite, gameInstance) {
    let style = {
        font: "12px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 180,
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: "center",
    };
    let text = gameInstance.add.text(0, 0, "Client No." + ID, style);
    text.setTextBounds(0, 0, 200, 50);

    this.tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
    });
}

client.prototype.updateEdge = function () {
    let otherNode = null;
    let edge = this.edge;

    if (edge.node1.equals(this)) {
        otherNode = edge.node2;
    } else if (edge.node2.equals(this)) {
        otherNode = edge.node1;
    }

    if (edge.graphics.lineWidth === 0) {
        edge.updateNodes(this, otherNode);
        edge.drawEdge();
    } else if (edge.graphics.lineWidth > 0) {
        edge.eraseEdge();
    }
}

client.prototype.destroy = function () {
    if (this.tooltip) {
        this.tooltip.destroy();
    }
    this.edge.destroy();
    this.sprite.destroy();
}

client.prototype.package = function () {
    let clientObj = {
        ID: this.ID,
        type: this.type,
        x: this.sprite.x,
        y: this.sprite.y,
    };

    return clientObj;
}
