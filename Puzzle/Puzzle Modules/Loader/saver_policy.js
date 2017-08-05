function saveAsPolicy(nw) {
    let packetData = generatePolicyPackets(nw);
    let packetPathData = getPacketPaths(nw, packetData);
    
    let JSONMasterKey = saveProgress(nw);
    let progress = saveProgress(pruneNetwork(nw));

    let gameFile = {
        master: JSONMasterKey,
        packets: packetPathData,
        progress: progress,
    }

    setInputsNetwork(nw, true);
    return gameFile;
}

function pruneNetwork(nw) {
    let nwCopy = jQuery.extend({}, nw);
    nwCopy.nfs = [];
    let nodes = nwCopy.nodes;
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].type === "Router") {
            nodes[i].attachedNFs = [];
        }
    }

    let edges = nwCopy.edges;
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].node1 instanceof nf || edges[i].node2 instanceof nf) {
            nwCopy.removeEdge(edges[i]);
        }
    }

    return nwCopy;
}

function getPacketPaths(nw, packetData) {
    let packetPathData = [];

    for (let i = 0; i < packetData.length; i++) {
        let packet = packetData[i];
        let testPacketObj = testPacket(nw, packet.source, packet.destination, packet.tags, packet.content);
        let packetPathObj = {
            ID: packetPathData.length,
            packet: testPacketObj.packet.package(),
            path: packagePath(testPacketObj.path),
        }
        
        console.log(packetPathObj);

        packetPathData.push(packetPathObj);
    }

    return packetPathData;
}

function packagePath(path){
    for (let i = 0; i < path.length; i++){
        let stop = path[i];
        let loc = stop.loc;
        let packagedLoc = loc.package();
        stop.loc = packagedLoc;
    }
    
    return path;
}

function generatePolicyPackets(nw) {
    let nodes = nw.nodes;
    let nfs = nw.nfs;

    let packetData = [];

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].configs && nodes[i].configs.length > 0) {
            let generatedPacketData = generatePacketData(packetData.length, nodes[i].configs, nw, [nodes[i]]);
            packetData = packetData.concat(generatedPacketData);
        }
    }

    for (let i = 0; i < nfs.length; i++) {
        if (nfs[i].configs && nfs[i].configs.length > 0) {
            let generatedPacketData = generatePacketData(packetData.length, nfs[i].configs, nw, [nfs[i]]);
            packetData = packetData.concat(generatedPacketData);
        }
    }
    
    return packetData;
}

function generatePacketData(ID, configs, nw, excludedNodes) {
    let generatedPacketData = [];
    for (let i = 0; i < configs.length; i++) {
        let config = configs[i];
        let generatedPacketObj = {
            ID: ID,
            source: config.Source === "*" ? pickRandomNodeName(nw, excludedNodes): config.Source,
            destination: config.Destination === "*" ? pickRandomNodeName(nw, excludedNodes): config.Destination,
            tags: [],
            content: config.Content === "*" ? "" : config.Content,
        };
        generatedPacketData.push(generatedPacketObj);
    }
    return generatedPacketData;
}

function pickRandomNodeName(nw, excludedNodes){
    let node = getRandomNodeExcept(nw.nodes, excludedNodes);
    return node.type + " " + node.ID;
}

function getNodeFromName(nw, name) {
    let name = name.trim().split(" ");
    return nw.findNode(name[0], name[1]);
}

function getRandomNodeExcept(nodeArr, excludedNodes) {
    let nodes = nodeArr;
    for (let i = 0; i < excludedNodes.length; i++) {
        nodeArr = removeNodeFromArr(nodeArr, excludedNodes[i]);
    }

    return nodeArr[getRandomInt(0, nodeArr.length - 1)];
}

function removeNodeFromArr(nodeArr, excludedNode) {
    let index = findNodeIndex(excludedNode, nodeArr);

    let first = nodeArr.slice(0, index);
    let second = nodeArr.slice(index, nodeArr.length - 1);

    return first.concat(second);
}

function findNodeIndex(node, nodeArr) {
    for (let i = 0; i < nodeArr.length; i++) {
        if (nodeArr[i].equals(node)) {
            return i;
        }
    }

    return -1;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
