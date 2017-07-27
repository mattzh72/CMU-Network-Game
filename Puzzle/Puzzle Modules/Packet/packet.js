function packet(src, dest, tags, content) {
    this.src = src;
    this.dest = dest;
    this.tags = tags;
    this.content = content;

    this.currentLoc = src;
    this.sprite;
}

packet.prototype.getNextLoc = function (nw) {
    if (this.currentLoc.equals(this.dest)) {
        return null;
    }

    if (!this.currentLoc.equals(this.src) && this.currentLoc.type === "Client") {
        return null;
    }

    let loc = this.currentLoc;

    if (loc instanceof client) {
        let clientRouterEdge = loc.edge;
        let router = clientRouterEdge.getOtherNode(loc);
        return router;
    } else if (loc instanceof router) {
        let router = loc;
        let matchedConfig = null;

        for (let i = router.configs.length; i > 0; i--) {
            if (this.matchRouterConfig(router.configs[i-1])) {
                matchedConfig = router.configs[i-1];
            }
        }

        if (matchedConfig) {
            let nextLocArr = matchedConfig.Forward.trim().split(" ");
            let msg = matchedConfig.Alert;

            if (msg != "") {
                alert(msg);
            }

            if (nextLocArr === "") {
                return null;
            }

            return nw.findNode(nextLocArr[0], nextLocArr[1]);
        } else {
            let destination = this.dest.type + " " + this.dest.ID;

            for (let i = 0; i < router.routingTable.length; i++) {
                let entry = router.routingTable[i];
                if (entry.destination.trim().toUpperCase() === destination.toUpperCase()) {
                    let nextLocArr = entry.nextHop.trim().split(" ");
                    return nw.findNode(nextLocArr[0], nextLocArr[1]);
                }
            }
        }
    } else {
        let nf = loc;
        this.addTags();
        return nf.connectedNode;
    }
}

packet.prototype.matchRouterConfig = function (config) {
    let source = config.Source;
    let destination = config.Destination;
    let tag = config.Tag;

    let sourceMatch = false;
    let destinationMatch = false;
    let tagMatch = false;

    if (source === "*") {
        sourceMatch = true;
    } else {
        source = source.trim().split(" ");
        let condition1 = (source[0].toUpperCase() === this.src.type.toUpperCase());
        let condition2 = (source[1] == this.src.ID);

        sourceMatch = condition1 && condition2;
    }

    if (destination === "*") {
        destinationMatch = true;
    } else {
        destination = destination.trim().split(" ");
        let condition1 = (destination[0].toUpperCase() === this.dest.type.toUpperCase());
        let condition2 = (destination[1] == this.dest.ID);

        destinationMatch = condition1 && condition2;
    }

    if (tag === "*") {
        tagMatch = true;
    } else {
        tagMatch = this.tags.includes(tag);
    }

    return sourceMatch && destinationMatch && tagMatch;
}

packet.prototype.matchNFConfig = function (config) {
    let source = config.Source;
    let destination = config.Destination;
    let content = config.Content;

    let sourceMatch = false;
    let destinationMatch = false;
    let contentMatch = false;

    if (source === "*") {
        sourceMatch = true;
    } else {
        source = source.trim().split(" ");
        let condition1 = (source[0].toUpperCase() === this.src.type.toUpperCase());
        let condition2 = (source[1] == this.src.ID);

        sourceMatch = condition1 && condition2;
    }

    if (destination === "*") {
        destinationMatch = true;
    } else {
        destination = destination.trim().split(" ");
        let condition1 = (destination[0].toUpperCase() === this.dest.type.toUpperCase());
        let condition2 = (destination[1] == this.dest.ID);

        destinationMatch = condition1 && condition2;
    }
    
    if (content === "*") {
        contentMatch = true;
    } else {
        content = content.trim().split(",");
        for (let i = 0; i < content.length; i++) {
            content[i] = content[i].trim();
        }
        
        let contentArr = this.content.match(/\b(\w+)\b/g);

        for (let i = 0; i < content.length; i++) {
            if (contentArr.includes(content[i])) {
                contentMatch = true;
            }
        }
    }

    return sourceMatch && destinationMatch && contentMatch;
}

packet.prototype.addTags = function () {
    if (this.currentLoc instanceof nf) {
        let currentNF = this.currentLoc;
        let configs = currentNF.configs;

        for (let i = 0; i < configs.length; i++) {
            if (this.matchNFConfig(configs[i])) {
                this.tags.push(configs[i].Tag);
            }
        }
    }
}

packet.prototype.getInfo = function () {
    let info = [this.src, this.dest, this.tags, this.content];
    return info;
}

packet.prototype.initializeSprite = function (x, y, gameInstance) {
    this.sprite = gameInstance.add.sprite(x, y, 'packet');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.scale.setTo(0.5, 0.5);
    gameInstance.physics.arcade.enable(this.sprite);
    this.sprite.body.gravity.y = 0;    
}