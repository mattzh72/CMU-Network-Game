function bfs(graph, startNode, targetNode) {
    let parents = [];
    let queue = [];
    let visited = [];
    let current;
    queue.push(startNode);
    parents[startNode] = null;
    visited[startNode] = true;
    while (queue.length) {
        current = queue.shift();
        if (current === targetNode) {
            return buildPath(parents, targetNode);
        }
        for (let i = 0; i < graph.length; i += 1) {
            if (i !== current && graph[current][i] && !visited[i]) {
                parents[i] = current;
                visited[i] = true;
                queue.push(i);
            }
        }
    }
    return null;
};

function buildPath(parents, targetNode) {
    let result = [targetNode];
    while (parents[targetNode] !== null) {
        targetNode = parents[targetNode];
        result.push(targetNode);
    }
    return result.reverse();
}

function makeEmptyArray(length, val) {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(val);
    }
    return array;
}

function getNearbyNodes(node, edges) {
    let nearbyNodes = [];
    for (let i = 0; i < edges.length; i++) {
        if (node.equals(edges[i].node1)) {
            nearbyNodes.push(edges[i].node2);
        } else if (node.equals(edges[i].node2)) {
            nearbyNodes.push(edges[i].node1);
        }
    }

    return nearbyNodes;
}
