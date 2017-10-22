function saveProgress(nw, polPckts){
    let nwID = nw.ID;
    let nodes = nw.nodes;
    let edges = nw.edges;
    let nfs = nw.nfs;    
    
    let policyPackets = polPckts;
    
    if (!policyPackets){
        policyPackets = nw.policyPackets;
    } else {
        policyPackets = encodePolicyPackets(polPckts);
    }
        
    let progress = {
        policyPackets: policyPackets,
        network: {
            ID: nwID,
            nodes: [],
            edges: [],
            nfs: [],
        }
    };
            
    for (let i = 0; i < nodes.length; i++){
        let node = nodes[i];
        let package = node.package();
        
        let j = 0;
        while(node["child-" + j]){
            package["child-" + j] = [node["child-" + j].type, node["child-" + j].ID];
            j++;
        }
        
        if (node.parent){
            package.parent = [node.parent.type, node.parent.ID];
        }
                
        progress.network.nodes.push(package);
    }
        
    for (let i = 0; i < edges.length; i++){
        let edge = edges[i];
        progress.network.edges.push(edge.package());
    }
    
    for (let i = 0; i < nfs.length; i++){
        let nf = nfs[i];
        progress.network.nfs.push(nf.package());
    }
        
    return progress;
}

function loadExistingGame(nw, progressJSON, gameInstance){
    clearStage(nw);
    
    let puzzle = JSON.parse(progressJSON);
    let progress = puzzle.network;
    nw.ID = progress.ID;
    nw.gameInstance = gameInstance;
    nw.nodes = [];
    nw.edges = [];
    nw.nfs = [];
    nw.matrix = [];
    nw.allPaths = []; 
    nw.policyPackets = puzzle.policyPackets;
        
    for (let i = 0 ; i < progress.nodes.length; i++){
        let nd = progress.nodes[i];
        
        if (nd.type === "Router"){
            let rtr = new router(nd.ID, nd.x, nd.y, gameInstance);
            rtr.configs = nd.configs;
            rtr.clients = nd.clients;
            rtr.attachedNFs = nd.attachedNFs;   
            
            nw.addNode(rtr);
        }
        
        if (nd.type === "Client"){
            let clt = new client(nd.ID, nd.x, nd.y, gameInstance);
            nw.addNode(clt);
        }
    }
    
    for (let i = 0 ; i < progress.nodes.length; i++){
        let nd = progress.nodes[i];
        let nwNode = nw.nodes[i];
        
        if (nd.type === "Router"){
            let j = 0;
            while(nd["child-" + j]){
                nwNode["child-" + j] = nw.findNode(nd["child-" + j][0], nd["child-" + j][1]);
                j++;
            }
            
            if(nd.parent){
                nwNode.parent = nw.findNode(nd.parent[0], nd.parent[1]);
            }
        }
        
        if (nd.type === "Client"){
            nwNode.parent = nw.findNode(nd.parent[0], nd.parent[1]);
        }
    }
    
        
    for (let i = 0; i < progress.nfs.length; i++){
        let nf = progress.nfs[i];
                
        if (nf.type === "ACL"){
            let acl = new ACL(nw, gameInstance);
            acl.connectedNode = nw.findNode(nf.connectedNode[0], nf.connectedNode[1]);
            acl.configs = nf.configs;
            
            acl.sprite.x = nf.x;
            acl.sprite.y = nf.y;
            }
    }
    
    for (let i = 0; i < nw.nodes.length; i++){
        let nd = nw.nodes[i];
        if (nd.type === "Router"){
            let nfs = [];
            for (let i = 0; i < nd.attachedNFs.length; i++){
                let nfName = nd.attachedNFs[i];
                let nf = nw.findNode(nfName[0], nfName[1]);
                nfs.push(nf);
            }
            nd.attachedNFs = nfs;
            
            let clts = [];
            for (let i = 0; i < nd.clients.length; i++){
                let cltName = nd.clients[i];
                let clt = nw.findNode(cltName[0], cltName[1]);
                clts.push(clt);
            }
            nd.clients = clts;
        }
    }
    
    for (let i = 0 ; i < progress.edges.length; i++){
        let eObj = progress.edges[i];
        let nd1 = nw.findNode(eObj.node1[0], eObj.node1[1]);
        let nd2 = nw.findNode(eObj.node2[0], eObj.node2[1]);
        
        let e = new edge(nw, nd1, nd2, gameInstance);
        
        if (nd1.type === "Router"){
            nd1.edges.push(e);
        } else if (nd1.type === "Client"){
            nd1.edge = e;
        } else if (nd1 instanceof nf){
            nd1.edge = e;
        }
        
        if (nd2.type === "Router"){
            nd2.edges.push(e);
        } else if (nd2.type === "Client"){
            nd2.edge = e;
        } else if (nd2 instanceof nf){
            nd2.edge = e;
        }
    }
    
    nw.matrixify();
    nw.calculatePaths();


    for (let i = 0; i < nw.nodes.length; i++) {
        let nd = nw.nodes[i];
        if (nd.type === "Router")
            nd.initTable(nw.allPaths[i]);
    }
    
    initializeGlobalNetworkAddresses(nw);
        
//    nw.outputNodes();
//    nw.outputEdges();
}

function groomNetwork(nw){
    for (let i = 0; i < nw.nodes.length; i++){
        if (nw.nodes[i] instanceof router){
            nw.nodes[i].attachedNFs = [];
            nw.nodes[i].configs = [];
        }
    }
        
    for (let i = 0; i < nw.edges.length; i++){
        if (nw.edges[i].node1 instanceof nf || nw.edges[i].node2 instanceof nf){
            nw.removeEdge(nw.edges[i]);
        }
    }
    
    nw.nfs = [];
}

function clearStage(nw){
    for (let i = 0; i < nw.edges.length; i++){
        nw.edges[i].destroy();
    }
    
    for (let i = 0; i < nw.nfs.length; i++){
        nw.nfs[i].destroy();
    }
    
    for (let i = 0; i < nw.nodes.length; i++){
        nw.nodes[i].destroy();
    }
    
    nw.destroy();
}