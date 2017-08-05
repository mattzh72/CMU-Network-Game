let PACKET_PATH_SPEED = 1500;

function testPacket(nw, src, dest, tags, content) {
    setInputsNetwork(nw, false);

    if (typeof tags === "string"){
        if (tags === "") {
            tags = [];
        } else {
            tags = tags.split(",");
            for (let i = 0; i < tags.length; i++) {
                tags[i] = tags[i].trim();
            }
        }
    }

    if (content === "") {
        content = [];
    }

    src = preprocessText(src);
    dest = preprocessText(dest);

    let srcNode = nw.findNode(src[0], src[1]);
    let destNode = nw.findNode(dest[0], dest[1]);


    let pckt = new packet(srcNode, destNode, tags, content);
    let nextLoc = pckt.getNextLoc(nw);

    let path = [{
        loc: pckt.currentLoc,
        tags: pckt.tags,
    }];

    while (nextLoc) {
        pckt.currentLoc = nextLoc;
        path.push({
            loc: pckt.currentLoc,
            tags: pckt.tags.slice(),
        });
        nextLoc = pckt.getNextLoc(nw);
        
        if (path.length % 20 === 0){
            let terminate = confirm("This packet has been running for a while. Are you sure you want to continue this test?");
            if (terminate){
                break;
            }
        }
    }
    
    let testPacketObj = {
        packet: pckt,
        path: path,
    };

    return testPacketObj;
}

function preprocessText(text) {
    text = text.toUpperCase();
    text = text.toLowerCase();
    text = text.charAt(0).toUpperCase() + text.slice(1);
    text = text.trim().split(" ");
    return text;
}

function animatePath(path, packet, network, gameInstance) {
    let startX = path[0].loc.sprite.x;
    let startY = path[0].loc.sprite.y;
    packet.initializeSprite(startX, startY, gameInstance);

    let graphics = gameInstance.add.graphics(TOP_LEFT_X, TOP_LEFT_Y);

    
    for (let i = 1; i < path.length; i++) {
        setTimeout(movePacket, i * PACKET_PATH_SPEED, packet, path[i].loc, 10, PACKET_PATH_SPEED, graphics, i, gameInstance);
    }

    setTimeout(endPacketTest, path.length * PACKET_PATH_SPEED, packet, path, network, graphics);    
}

function movePacket(packet, loc, speed, time, graphics, iter, gameInstance) {
    gameInstance.physics.arcade.moveToObject(packet.sprite, loc.sprite, speed, time);
    
    let alertObj = packet.alerts[iter];
    if (alertObj){
        if (alertObj.loc.equals(loc)){
            setTimeout(alert, PACKET_PATH_SPEED, alertObj.msg);
        }
    }

    graphics.clear();
    let styles = [
        [10, 0xF3CBD1, 0.1],
        [8, 0xF3CBD1, 0.15],
        [4, 0xF3CBD1, 0.4],
        [3, 0xF3CBD1, 0.5],
        [2, 0xF3CBD1, 1],
    ];
    
    drawPath(graphics, styles, packet.sprite, loc.sprite);
}

function drawPath(graphics, styles, obj1, obj2){
    for (let i = 0; i < styles.length; i++) {
        let style = styles[i];
        graphics.lineStyle(style[0], style[1], style[2]);
        graphics.moveTo(obj1.x, obj1.y);
        graphics.lineTo(obj2.x, obj2.y);
    }
}

function endPacketTest(packet, path, network, graphics){
    openResultsModal(packet, path);
    setInputsNetwork(network, true);
    graphics.clear();
}

function setInputsNetwork(network, input) {
    for (let i = 0; i < network.nodes.length; i++) {
        network.nodes[i].sprite.inputEnabled = input;
    }
    for (let i = 0; i < network.nfs.length; i++) {
        network.nfs[i].sprite.inputEnabled = input;
    }
}
