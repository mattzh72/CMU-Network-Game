let acl;

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
    let networkTest = new network("test network", gameInstance);

    for (let i = 0; i < 4; i++) {
        let nodeTest = new node(i, "Router", getRandomInt(TOP_LEFT_X + PADDING, BOTTOM_RIGHT_X - PADDING), getRandomInt(TOP_LEFT_Y + PADDING, BOTTOM_RIGHT_Y - PADDING), gameInstance);
        networkTest.addNode(nodeTest);
    }

    for (let i = 1; i < 4; i++) {
        let edgeTest = new edge(i, networkTest.nodes[i], networkTest.nodes[i - 1], gameInstance);
        edgeTest.drawEdge();
        networkTest.addEdge(edgeTest);
    }


    acl = new ACL(networkTest, gameInstance);
    acl.addRule("WAS 1", "DROP");
    acl.addRule("WAS 2", "ALLOW");
    acl.addRule("WAS 3", "ALERT");
    acl.addRule("WAS 4", "ALLOW");
//    acl.reportRules();
//    
//    acl.removeConfig(0);
//    acl.removeConfig(1);
//    acl.reportRules();

}
