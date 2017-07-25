function router(ID, x, y, gameInstance) {
    let scale = PUZZLE_SCALE;

    this.type = "Router";
    this.sprite = addSprite("Router", "Router", 'router', x, y, scale, 0, false, gameInstance).instance;
    this.routingTable = [];
    this.clients = [];
    this.edges = [];
    this.configs = [];
    this.availableActions = [
        "Forward to",
    ];
    this.disabledConfigs = [
        "Content",
        "State",
    ];
    this.tooltip;

    this.sprite.events.onInputOver.add(this.onHover, {
        sprite: this.sprite,
        ID: ID,
        xScale: scale + 0.05,
        yScale: scale + 0.05,
        gameInstance: gameInstance,
        router: this,
    });

    this.sprite.events.onInputOut.add(this.stopHover, {
        sprite: this.sprite,
        xScale: scale,
        yScale: scale,
        gameInstance: gameInstance,
        router: this,
    });

    this.initializeSprite(gameInstance);

    node.call(this, ID, "Router");
}

router.prototype = Object.create(node.prototype);
router.prototype.constructor = router;

router.prototype.addRule = function (src, dst, action) {
    let config = {
        ID: this.configs.length,
        Source: src,
        Destination: dst,
        Content: "*",
        State: "*",
        Action: action,
    };

    this.configs.push(config);
    return config;
};

router.prototype.deleteRule = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        let config = this.configs[i];

        if (config.ID == ID) {
            this.configs.splice(i, 1);
        }
    }
};

router.prototype.reportRules = function () {
    let configsCopy = this.configs.slice(0);
    console.log(configsCopy);

    return this.configs;
};

router.prototype.initTable = function (paths) {
    for (let i = 0; i < paths.length; i++) {
        let path = paths[i];
        let nextNode;

        if (path.length === 1) {
            nextNode = "Arrived";
        } else {
            nextNode = path[1];
        }

        let entry = {
            destination: path[path.length -1],
            nextHop: nextNode,
            cost: path.length - 1,
        };
        
        this.routingTable.push(entry);
    }
}

router.prototype.outputEdges = function () {
    for (let i = 0; i < this.edges.length; i++) {
        this.edges[i].outputEdge();
    }
}

router.prototype.onDrag = function () {
    for (let i = 0; i < this.edges.length; i++) {
        let edge = this.edges[i];
        let otherNode = null;

        if (edge.node1.equals(this)) {
            otherNode = edge.node2;
        } else if (edge.node2.equals(this)) {
            otherNode = edge.node1;
        }

        if (otherNode) {
            edge.eraseEdge();
        }
    }
}

router.prototype.onDropped = function () {
    for (let i = 0; i < this.edges.length; i++) {
        let edge = this.edges[i];
        let otherNode = null;

        if (edge.node1.equals(this)) {
            otherNode = edge.node2;
        } else if (edge.node2.equals(this)) {
            otherNode = edge.node1;
        }

        if (otherNode) {
            edge.updateNodes(this, otherNode);
            edge.drawEdge();
        }
    }
}

router.prototype.removeEdge = function (edge) {
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i].equals(edge))
            this.edges.splice(i, 1);
    }
}

router.prototype.initializeSprite = function (gameInstance) {
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onInputDown.add(openModal, {
        nf: this,
        accordion: "#router-accordion",
        button: "#router-button-add",
        div: "#router-dialog",
        displayInformation: tableInfo,
        tabs: "#router-tabs",
        gameInstance: gameInstance,
    });
    this.sprite.events.onDragStart.add(this.onDrag, this);
    this.sprite.events.onDragStop.add(this.onDropped, this);
}

router.prototype.stopHover = function () {
    this.router.tooltip.simulateOnHoverOut();
    setTimeout(this.router.tooltip.destroy, 200);

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: this.xScale,
        y: this.yScale
    }, 200, Phaser.Easing.Linear.In, true);
}

router.prototype.onHover = function () {
    this.router.initToolTip(this.ID, this.sprite, this.gameInstance);
    this.router.tooltip.simulateOnHoverOver();

    //scaling
    this.gameInstance.add.tween(this.sprite.scale).to({
        x: this.xScale,
        y: this.yScale
    }, 200, Phaser.Easing.Linear.In, true);
}

router.prototype.initToolTip = function (ID, sprite, gameInstance) {
    let style = {
        font: "12px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 180,
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: "center",
    };
    let text = gameInstance.add.text(0, 0, "Router " + ID + ".\nClick to view Routing Table.", style);
    text.setTextBounds(0, 0, 200, 50);

    this.tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
    });
}
