let acl;
let ips;
let networkTest;
let statefulfw;

/**
 * An internal function that generates a random integer between min and max inclusive.
 * @param   {number} min - The minimum in the range 
 * @param   {number} max - The maximum in the range
 *                       
 * @returns {number} A random integer within min and max inclusive
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function testModel(gameInstance) {
    networkTest = new network("test network", gameInstance);

    for (let i = 0; i < 3; i++) {
        let routerTest = new router(i, getRandomInt(TOP_LEFT_X + PADDING, BOTTOM_RIGHT_X - PADDING), getRandomInt(TOP_LEFT_Y + PADDING, BOTTOM_RIGHT_Y - PADDING), gameInstance);
        networkTest.addNode(routerTest);
    }

    for (let i = 1; i < 3; i++) {
        let edgeTest = new edge(networkTest, networkTest.nodes[i], networkTest.nodes[i - 1], gameInstance);
        networkTest.nodes[i].edges.push(edgeTest);
        networkTest.nodes[i - 1].edges.push(edgeTest);
        networkTest.addEdge(edgeTest);
    }

    for (let i = 1; i < 1; i++) {
        let randomNodeIndex = getRandomInt(0, networkTest.nodes.length - 1);
        let randomNodeIndex2 = getRandomInt(0, networkTest.nodes.length - 1);
        let edgeTest = new edge(networkTest, networkTest.nodes[randomNodeIndex],
            networkTest.nodes[randomNodeIndex2], gameInstance);
        networkTest.nodes[randomNodeIndex].edges.push(edgeTest);
        networkTest.nodes[randomNodeIndex2].edges.push(edgeTest);
    }

//    ips = new IPS(networkTest, gameInstance);
//    statefulfw = new StatefulFW(networkTest, gameInstance);


    networkTest.populateRouters(gameInstance);


//    networkTest.outputNodes();
//        networkTest.outputEdges();
    networkTest.matrixify();
    networkTest.calculatePaths();

    //    networkTest.nodes[0].outputEdges();

    for (let i = 0; i < networkTest.nodes.length; i++) {
        let node = networkTest.nodes[i];
        if (node.type === "Router")
            node.initTable(networkTest.allPaths[i]);
    }
    
    let start = networkTest.findNode("Router", 0);
    let end = networkTest.findNode("Client", 6);
}
