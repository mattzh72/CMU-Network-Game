function generatePolicyPackets(nw, gameInstance) {
    let configsNodePairs = getConfigNodePairs(nw.nodes).concat(getConfigNodePairs(nw.nfs));
    let packetData = [];

    for (let i = 0; i < configsNodePairs.length; i++) {
        for (let j = 0; j < configsNodePairs[i].configs.length; j++) {
            let config = configsNodePairs[i].configs[j];
            let locs = generatePacketData(nw, configsNodePairs[i].node, config);
            let sourceName = locs[0].type + " " + locs[0].ID;
            let destinationName = locs[1].type + " " + locs[1].ID;

            packetObj = testPacket(nw, sourceName, destinationName, "", "");
            packetData.push(packetObj);
        }
    }
    
    return packetData;
}

function encodePolicyPackets(packetData){
    for (let i = 0; i < packetData.length; i++){
        packetData[i].packet = packetData[i].packet.package();
        let path = packetData[i].path;
        
        for (let j = 0; j < path.length; j++){
            path[j].loc = path[j].loc.package();
        }
    }
    
    return packetData;
}

function getConfigNodePairs(nodes) {
    let configNodePairs = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].configs && nodes[i].configs.length > 0) {
            let configNodePair = {
                node: nodes[i],
                configs: nodes[i].configs
            }
            configNodePairs.push(configNodePair);
        }
    }
    return configNodePairs;
}

function generatePacketData(nw, nodeWithConfig, config) {
    let node = nodeWithConfig;
    let source = config.Source;
    let destination = config.Destination;
    let forward = config.Forward;
    let interface = config.Interface;
    

    if (nodeWithConfig instanceof nf) {
        nodeWithConfig = nodeWithConfig.connectedNode;
    } else {
        forward = forward.trim().split(" ");
        forward = nw.findNode(forward[0], forward[1]);
        
        interface = interface.trim().split(" ");
        interface = nw.findNode(interface[0], interface[1]);
    }

    if (source != "*") {
        source = source.trim().split(" ");
        source = nw.findNode(source[0], source[1]);
    }

    if (destination != "*") {
        destination = destination.trim().split(" ");
        destination = nw.findNode(destination[0], destination[1]);
    }

    if (source === "*" && destination === "*") {
        let locs = getRandomSrcDest(nodeWithConfig, forward);
        source = locs[0];
        destination = locs[1];
    } else if (source === "*") {
        source = generateMissingLoc(destination, nodeWithConfig, forward);
    } else if (destination === "*") {
        destination = generateMissingLoc(source, nodeWithConfig, forward);
    }

    if (source && destination) {
        return matchToInterface(source, destination, nodeWithConfig, interface);
    } else {
        return null;
    }
}

function matchToInterface(source, destination, nodeWithConfig, interface) {
    if (interface instanceof nf || !interface){
        return [source, destination];
    }
    
    let interfaceIsParent = firstIsParent(interface, nodeWithConfig);
    
    if (interfaceIsParent){
        if (!firstIsParent(source, interface) && !firstIsParent(interface, destination)){
            let sourceCopy = jQuery.extend({}, source);
            source = destination;
            destination = sourceCopy;
            console.log(source);
            console.log(destination);
        }
    } else {
        if (!firstIsParent(interface, source) && !firstIsParent(destination, interface)){
            let sourceCopy = jQuery.extend({}, source);
            source = destination;
            destination = sourceCopy;
            console.log(source);
            console.log(destination);         
        }
    }
    
    return [source, destination];
}

function getRandomSrcDest(node, nodeToAvoid) {
    if (!node.parent) {
        let children = findChildren(node);

        let child1 = children[0];
        let child2 = children[1];

        let client1 = findClientChildren(child1)[0];
        let client2 = findClientChildren(child2)[0];

        return [client1, client2];
    }

    let otherNode = findOtherSubtreeRoot(node);

    otherNode = findClientChildren(otherNode)[0];
    let nodeClients = findClientChildren(node);

    return [otherNode, getNodeExcept(nodeClients, nodeToAvoid)];
}

function findOtherSubtreeRoot(node) {
    let root = findHighestParent(node);
    let subRoot = findSecondHighestParent(node);

    let otherNode = null;
    let rootChildren = findChildren(root);

    for (let i = 0; i < rootChildren.length; i++) {
        if (!rootChildren[i].equals(subRoot)) {
            otherNode = rootChildren[i];
        }
    }

    return otherNode;
}

function generateMissingLoc(loc, nodeWithConfig, nodeToAvoid) {
    if (!nodeWithConfig.parent){
        let children = findChildren(nodeWithConfig);
        let subRoot = findSecondHighestParent(loc);
        
        for (let i = 0; i < children.length; i++){
            if (!children[i].equals(subRoot)){
                return findClientChildren(children[i])[0];
            }
        }
    }
    else if (firstIsParent(loc, nodeWithConfig)) {
        let clients = findClientChildren(nodeWithConfig);
        return getNodeExcept(clients, nodeToAvoid);
    } else if (firstIsParent(nodeWithConfig, loc)) {
        let otherNode = findOtherSubtreeRoot(nodeWithConfig);
        let clients = findClientChildren(otherNode);

        return getNodeExcept(clients, nodeToAvoid);
    } else {
        let clients = findClientChildren(nodeWithConfig);
        return getNodeExcept(clients, nodeToAvoid);
    }
    
    return null;
}

function getNodeExcept(nodeArr, excludedNode){  
    if (!excludedNode){
        return nodeArr[0];
    }
    
    for (let i = 0; i < nodeArr.length; i++){
        if (!nodeArr[i].equals(excludedNode)){
            return nodeArr[i];
        }
    }
    
    return null;   
}

function findHighestParent(node) {
    if (!node.parent) {
        return node;
    }

    return findHighestParent(node.parent);
}

function findSecondHighestParent(node) {
    if (!node.parent.parent) {
        return node;
    }

    return findSecondHighestParent(node.parent);
}


function firstIsParent(parent, child) {
    if (parent.equals(child)) {
        return true;
    } else {
        if (child.parent) {
            return firstIsParent(parent, child.parent);
        } else {
            return false;
        }
    }
}

function findClientChildren(node) {
    let clientChildren = [];
    recursiveSearch(node);

    function recursiveSearch(node) {
        if (!node["child-0"]) {
            clientChildren.push(node);
            return;
        } else {
            let children = findChildren(node);

            for (let i = 0; i < children.length; i++) {
                recursiveSearch(children[i]);
            }
        }
    }

    return clientChildren;
}

function getSubtree(node) {
    let subtreeNodes = [];
    getSubtreePositions(node);

    function getSubtreePositions(nd) {
        if (!nd["child-0"]) {
            return;
        } else {
            let children = findChildren(nd);

            for (let i = 0; i < children.length; i++) {
                subtreeNodes.push(children[i]);
                getSubtreePositions(children[i]);
            }
        }
    }

    return subtreeNodes;
}

function findChildren(node) {
    let numChildren = findNumChildren(node);
    let children = [];
    for (let i = 0; i < numChildren; i++) {
        children.push(node["child-" + i]);
    }

    return children;
}

function findNumChildren(node) {
    let i = 0;
    while (node["child-" + i]) {
        i++;
    }

    return i;
}
