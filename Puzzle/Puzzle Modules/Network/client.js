function client(ID, x, y, gameInstance) {
    let scale = CLIENT_SCALE;
    this.IPAddress = getRandomInt(0, 255) + "." + getRandomInt(0, 255) + "." + getRandomInt(0, 255) + "." + getRandomInt(0, 255);
    let edge;


    this.type = "Client";
    this.sprite = addSprite("client", "client", 'client', x, y, scale, 0, false, gameInstance).instance;
    this.tooltip;

    this.sprite.events.onInputOver.add(this.onHover, {
        sprite: this.sprite,
        ID: ID,
        xScale: scale + 0.05,
        yScale: scale + 0.05,
        gameInstance: gameInstance,
        client: this,
    });

    this.sprite.events.onInputOut.add(this.stopHover, {
        sprite: this.sprite,
        xScale: scale,
        yScale: scale,
        gameInstance: gameInstance,
        client: this,
    });

    this.initializeSprite(gameInstance);

    node.call(this, ID, "Client", gameInstance);
}

client.prototype = Object.create(node.prototype);
client.prototype.constructor = client;

client.prototype.initializeSprite = function (gameInstance) {
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onDragStart.add(this.updateEdge, this);
    this.sprite.events.onDragStop.add(this.updateEdge, this);
}

client.prototype.stopHover = function () {
    this.client.tooltip.simulateOnHoverOut();
    setTimeout(this.client.tooltip.destroy, 200);

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: this.xScale,
        y: this.yScale
    }, 200, Phaser.Easing.Linear.In, true);
}

client.prototype.onHover = function () {
    this.client.initToolTip(this.ID, this.sprite, this.gameInstance);
    this.client.tooltip.simulateOnHoverOver();

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: this.xScale,
        y: this.yScale
    }, 200, Phaser.Easing.Linear.In, true);
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
    let text = gameInstance.add.text(0, 0, "Client No." + ID +" with IP Address " + this.IPAddress, style);
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
