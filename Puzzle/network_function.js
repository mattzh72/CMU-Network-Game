function networkFunction(ntwrk, sprite, gameInstance) {
    this.ID = ntwrk.networkFunctions.length;
    this.network = ntwrk;
    this.sprite = sprite;
    this.gameInstance = gameInstance;

    this.closestNode = null;
    this.dragged = false;
    this.edge = new edge(this.network.edges.length, this.sprite, this.network.nodes[0], gameInstance);
    this.configs = [];

    ntwrk.networkFunctions.push[this];
    ntwrk.addEdge(this.edge);
}

networkFunction.prototype.detectRouter = function () {
    for (let i = 0; i < this.network.nodes.length; i++) {
        let nextNode = this.network.nodes[i];
        let distance = this.gameInstance.physics.arcade.distanceBetween(this.sprite, nextNode.sprite);

        if (distance < 50 && nextNode.type == "Router") {
            this.closestNode = nextNode;
            this.edge.updateNodes(this.closestNode, this.sprite);

            if (this.dragged === false && this.edge.graphics.lineWidth === 0) {
                this.edge.drawEdge();
            } else if (this.dragged === true) {
                this.edge.eraseEdge();
            }
        }
    }
}

networkFunction.prototype.getConfigByID = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        if (this.configs[i].ID == ID) {
            return this.configs[i];
        }
    }
};

networkFunction.prototype.addConfig = function (src, dst, cont, state, action) {
    let config = {
        ID: this.configs.length,
        Source: src,
        Destination: dst,
        Content: cont,
        State: state,
        Action: action,
    };

    this.configs.push(config);
    return config;
};

networkFunction.prototype.removeConfig = function (ID) {
    for (let i = 0; i < this.configs.length; i++) {
        let config = this.configs[i];

        if (config.ID == ID) {
            this.configs.splice(i, 1);
        }
    }

    //Re-index the rules
    //    for (let i = 0; i < this.configs.length; i++) {
    //        this.configs[i].ID = i;
    //    }
};

networkFunction.prototype.reportConfigs = function () {
    let configsCopy = this.configs.slice(0);
    console.log(configsCopy);

    return this.configs;
};

function ACL(ntwrk, gameInstance) {
    this.type = "ACL";

    //Main sprite instance
    this.sprite = addSprite("", "", 'ACL', 100, 100, 0.5, false, false, gameInstance).instance;
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag(true);
    this.sprite.events.onInputDown.add(openModal, {
        networkFunc: this,
        gameInstance: gameInstance,
    });

    this.sprite.events.onDragStart.add(dragged, {
        networkFunc: this
    });
    this.sprite.events.onDragStop.add(dropped, {
        networkFunc: this
    });


    //Call parent constructor
    networkFunction.call(this, ntwrk, this.sprite, gameInstance);

    //ACL FUNCTIONS
    this.addRule = function (src, act) {
        let config = networkFunction.prototype.addConfig.call(this, src, "*", "*", "*", act);
        return config;
    }

    this.deleteRule = function (ID) {
        networkFunction.prototype.removeConfig.call(this, ID);
    }

    this.reportRules = function () {
        networkFunction.prototype.reportConfigs.call(this);
    }
}

ACL.prototype = Object.create(networkFunction.prototype);
ACL.prototype.constructor = ACL;

function dragged() {
    this.networkFunc.dragged = true;
}

function dropped() {
    this.networkFunc.dragged = false;
}
