function generateTreeNW(nw, name, levels, min, max, gameInstance) {
    let CENTER_X = gameInstance.world.centerX - window.innerWidth / 2;
    let CENTER_Y = gameInstance.world.centerY - window.innerHeight / 2;

    clearStage(nw);
    nw.ID = name;
    nw.gameInstance = gameInstance;
    nw.nodes = [];
    nw.edges = [];
    nw.nfs = [];
    nw.matrix = [];
    nw.allPaths = [];

    let rtr = new router(nw.nodes.length, CENTER_X, CENTER_Y, gameInstance);
    nw.addNode(rtr);

    let clients = generateTree(nw, rtr, levels - 1, min, max, gameInstance);
    
    nw.matrixify();
    nw.calculatePaths();
    
    for (let i = 0; i < nw.nodes.length; i++) {
        let nd = nw.nodes[i];
        if (nd.type === "Router")
            nd.initTable(nw.allPaths[i]);
    }
    
    initializeGlobalNetworkAddresses(nw);
}

function generateTree(nw, prt, lvls, mn, mx, gameInstance) {
    let lastChildren = [];
    recursiveGenerate(nw, prt, lvls, mn, mx, gameInstance);
    
    function recursiveGenerate(nw, parent, levels, min, max, gameInstance){
        if (levels === 1) {
            let numClients = getRandomInt(min, max);
            let endingNodes = addClientChildren(nw, parent, numClients, gameInstance);

            for (let i = 0; i < endingNodes.length; i++){
                lastChildren.push(endingNodes[i]);
            }

            return;
        } else {
            let numRouters = getRandomInt(min, max);
            let children = addRouterChildren(nw, parent, numRouters, gameInstance);

            for (let i = 0; i < children.length; i++) {
                recursiveGenerate(nw, children[i], levels - 1, min, max, gameInstance);
            }
        }
    }
    return lastChildren;
}

function addRouterChildren(nw, parent, num, gameInstance) {
    let positions = findChildrenPositions(parent.sprite.x, parent.sprite.y, num);
    let children = [];

    for (let i = 0; i < positions.length; i++) {
        let rtr = new router(nw.nodes.length, positions[i].x, positions[i].y, gameInstance);
        rtr.parent = parent;
        parent["child-" + i] = rtr;
        nw.addNode(rtr);

        let e = new edge(nw, rtr, parent, gameInstance);
        parent.edges.push(e);
        rtr.edges.push(e);

        children.push(rtr);
    }

    return children;
}

function addClientChildren(nw, parent, num, gameInstance) {
    let positions = findChildrenPositions(parent.sprite.x, parent.sprite.y, num);
    let endClients = [];

    for (let i = 0; i < positions.length; i++) {
        let clt = new client(nw.nodes.length, positions[i].x, positions[i].y, gameInstance);
        clt.parent = parent;
        parent["child-" + i] = clt;
        nw.addNode(clt);

        let e = new edge(nw, clt, parent, gameInstance);
        parent.edges.push(e);
        clt.edge = e;

        endClients.push(clt);
    }

    return endClients;
}


function findChildrenPositions(parentX, parentY, num) {
    let PADDING = 100;
    let halfWidth = Math.floor((PADDING * (num + 1)) / 2);

    let x = parentX - halfWidth;
    let y = parentY + PADDING;
    let positions = [];

    for (let i = 0; i < num; i++) {
        let position = {
            x: x + PADDING,
            y: y,
        }

        x += PADDING;

        positions.push(position);
    }

    return positions;
}
