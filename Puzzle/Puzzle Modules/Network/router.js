function router(ID, x, y, gameInstance) {
    this.type = "Router";
    this.sprite = gameInstance.add.sprite(x, y, 'router');
    this.routingTable = [];
    this.clients = [];
    this.edges = [];
    this.attachedNFs = [];
    this.configs = [];
    this.nearbyPositions = [];

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
            name: "Interface",
            title: "The last router/client the packet was sent from."
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
        {
            name: "Rewrite",
            title: "Optional field. This can be used to rewrite packet contents.",
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
    if (this.parent){
        for (let i = 0; i < this.edges.length; i++){
            this.edges[i].eraseEdge();
        }
    }    

    for (let i = 0; i < this.nearbyPositions.length; i++) {
        let node = this.nearbyPositions[i].node;
        
        if(node.edges){
            for (let j = 0; j < node.edges.length; j++){
                node.edges[j].eraseEdge();
            }
            
        } else if (node.edge){
            node.edge.eraseEdge();
        }
    }
}

router.prototype.updateDrag = function () {
    for (let i = 0; i < this.nearbyPositions.length; i++) {
        let nearbySprite = this.nearbyPositions[i].sprite;
        nearbySprite.x = this.sprite.x + this.nearbyPositions[i].distanceX;
        nearbySprite.y = this.sprite.y + this.nearbyPositions[i].distanceY;
    }
}


router.prototype.onDropped = function () {
    if (this.parent){
        for (let i = 0; i < this.edges.length; i++){
            this.edges[i].drawEdge();
        }
    }
    
    for (let i = 0; i < this.nearbyPositions.length; i++) {
        let node = this.nearbyPositions[i].node;
        
        if(node.edges){
            for (let j = 0; j < node.edges.length; j++){
                node.edges[j].drawEdge();
            }
            
        } else if (node.edge){
            node.edge.drawEdge();
        }
    }
}

router.prototype.calculateNearbyPositions = function () {
    let subtreeNodes = getSubtree(this);

    for (let i = 0; i < subtreeNodes.length; i++){
        let entry = {
            node: subtreeNodes[i],
            sprite: subtreeNodes[i].sprite,
            distanceX: subtreeNodes[i].sprite.x - this.sprite.x,
            distanceY: subtreeNodes[i].sprite.y - this.sprite.y,
        };
        this.nearbyPositions.push(entry);
    }
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
    this.sprite.events.onDragUpdate.add(this.updateDrag, this);
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

    this.router.calculateNearbyPositions();
    this.router.sprite.bringToTop();
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

router.prototype.addNF = function (nf) {
    this.attachedNFs.push(nf);
}

router.prototype.findNF = function (type, ID) {
    for (let i = 0; i < this.attachedNFs; i++) {
        if (this.attachedNFs[i].type == type && this.attachedNFs[i].type == ID) {
            return this.attachedNFs[i];
        }
    }
}

router.prototype.removeNF = function (nf) {

    for (let i = 0; i < this.attachedNFs.length; i++) {
        if (this.attachedNFs[i].equals(nf)) {
            this.attachedNFs.splice(i, 1);

        }
    }
}

router.prototype.destroy = function () {
    this.sprite.destroy();
    for (let i = 0; i < this.edges.length; i++) {
        this.edges[i].destroy();
    }
    if (this.tooltip) {
        this.tooltip.destroy();
    }
}

router.prototype.package = function () {
    let nfs = [];
    for (let i = 0; i < this.attachedNFs.length; i++) {
        let nf = [this.attachedNFs[i].type, this.attachedNFs[i].ID];
        nfs.push(nf);
    }

    let clts = [];
    for (let i = 0; i < this.clients.length; i++) {
        let clt = [this.clients[i].type, this.clients[i].ID];
        clts.push(clt);
    }

    let routerObj = {
        ID: this.ID,
        type: this.type,
        x: this.sprite.x,
        y: this.sprite.y,
        configs: this.configs,
        attachedNFs: nfs,
        clients: clts,
    };

    return routerObj;
}
