function router(ID, x, y, gameInstance) {
    this.type = "Router";
    this.sprite = gameInstance.add.sprite(x, y, 'router');
    this.routingTable = [];
    this.clients = [];
    this.edges = [];
    this.attachedFunctions = [];
    this.configs = [];
    this.fields = [
        {
            name: "Source",
            title: "The router number that the packet is coming from."
        },
        {
            name: "Destination",
            title: "The router number that the packet is heading towards."
        },
        {
            name: "Tag",
            title: "The value that the packet has been tagged with."
        },
        {
            name: "Forward",
            title: "Where do forward this packet to. If blank, the packet will be dropped.",
        },
        {
            name: "Alert",
            title: "Optional field. This can be used to alert the network operator.",
        },
    ];
    this.tooltip;

    this.initializeSprite(this.sprite, ID, gameInstance);

    node.call(this, ID, "Router");
}

router.prototype = Object.create(node.prototype);
router.prototype.constructor = router;

router.prototype.addRule = function (config) {
    this.configs.push(config);
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

router.prototype.addClient = function (c, e) {
    this.clients.push(c);
    this.edges.push(e);
}

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
            destination: path[path.length - 1],
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
        let otherNode = edge.getOtherNode(this);

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
    this.sprite.bringToTop();
}

router.prototype.removeEdge = function (edge) {
    for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i].equals(edge))
            this.edges.splice(i, 1);
    }
}

router.prototype.initializeSprite = function (sprite, ID, gameInstance) {
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(PUZZLE_SCALE, PUZZLE_SCALE);
    this.sprite.events.onInputOver.add(this.onHover, {
        ID: ID,
        gameInstance: gameInstance,
        router: this,
    });

    this.sprite.events.onInputOut.add(this.stopHover, {
        gameInstance: gameInstance,
        router: this,
    });

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

router.prototype.onHover = function () {
    this.router.initToolTip(this.ID, this.router.sprite, this.gameInstance);
    this.router.tooltip.simulateOnHoverOver();

    let styles = [

    [10, 0xF3CBD1, 0.1],
    [8, 0xF3CBD1, 0.15],
    [4, 0xF3CBD1, 0.4],
    [3, 0xF3CBD1, 0.5],
    [2, 0xF3CBD1, 1],
    ];

    for (let i = 0; i < this.router.edges.length; i++) {
        let edge = this.router.edges[i];
        edge.eraseEdge();
        edge.drawEdge(styles);
    }

    //scaling
    this.gameInstance.add.tween(this.router.sprite.scale).to({
        x: PUZZLE_SCALE + 0.05,
        y: PUZZLE_SCALE + 0.05,
    }, 200, Phaser.Easing.Linear.In, true);
}

router.prototype.stopHover = function () {
    this.router.tooltip.simulateOnHoverOut();
    setTimeout(this.router.tooltip.destroy, 200);

    for (let i = 0; i < this.router.edges.length; i++) {
        let edge = this.router.edges[i];
        edge.eraseEdge();
        edge.drawEdge();
    }

    //scaling
    this.gameInstance.add.tween(this.router.sprite.scale).to({
        x: PUZZLE_SCALE,
        y: PUZZLE_SCALE,
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
    let text = gameInstance.add.text(0, 0, "Router No." + ID + ".\nHold SHIFT and click to configure..", style);
    text.setTextBounds(0, 0, 200, 50);

    this.tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
    });
}

router.prototype.getConfigByID = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        if (this.configs[i].ID == ID) {
            return this.configs[i];
        }
    }
};

router.prototype.addNF = function(nf){
    this.attachedFunctions.push(nf);
}

router.prototype.findNF = function(type, ID){
    for (let i = 0; i < this.attachedFunctions; i++){
        if (this.attachedFunctions[i].type == type && this.attachedFunctions[i].type == ID){
            return this.attachedFunctions[i];
        }
    }
}

router.prototype.removeNF = function(nf){
    for (let i = 0; i < this.attachedFunctions; i++){
        if (this.attachedFunctions[i].equals(nf)){
            this.attachedFunctions.splice(i, 1);
        }
    }
}
