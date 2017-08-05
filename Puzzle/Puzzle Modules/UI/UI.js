let sidePanel1;
let sidePanel2;

let ACLButton;

let packetTestButton;
let gameOptionsButton;

function initPanels(network, gameInstance) {
    sidePanel1 = initSidePanel(0, 0, gameInstance);
    sidePanel1.bringToTop();

    sidePanel2 = initSidePanel(0, 0, gameInstance);
    sidePanel2.bringToTop();

    addNFButtons(network, gameInstance);

    addPacketTestButton(network, gameInstance);
    addGameOptionsButton(network, gameInstance);
}

function initSidePanel(x, y, gameInstance) {
    let sidePanel = gameInstance.add.sprite(x, y, 'side_panel');
    sidePanel.scale.setTo(0.4, 0.4);
    sidePanel.anchor.setTo(0.5, 0.5);

    return sidePanel;
}

function bringUIToTop() {
    sidePanel1.bringToTop();
    sidePanel2.bringToTop();
    ACLButton.bringToTop();
}

function updatePanelPositions(gameInstance) {
    let PADDING_X = window.innerWidth + gameInstance.camera.x
    let PADDING_Y = window.innerHeight/2 + gameInstance.camera.y;
    
    sidePanel1.x = PADDING_X - sidePanel1.width / 2 ;
    sidePanel1.y = PADDING_Y - sidePanel1.height / 2;

    sidePanel2.x = PADDING_X - sidePanel2.width / 2;
    sidePanel2.y = PADDING_Y + sidePanel2.height / 2;

    ACLButton.x = PADDING_X - sidePanel1.width / 4;
    ACLButton.y = PADDING_Y - sidePanel1.height / 4; 

    packetTestButton.x = PADDING_X - sidePanel2.width / 2;
    packetTestButton.y = PADDING_Y + sidePanel2.height / 4;
    
    gameOptionsButton.x = PADDING_X - sidePanel2.width / 2;
    gameOptionsButton.y = PADDING_Y +  3* sidePanel2.height / 4;
}

function addNFButtons(network, gameInstance) {
    ACLButton = gameInstance.add.button(0, 0, 'ACL', spawnNF, {
        type: "ACL",
        gameInstance: gameInstance,
        network: network,
    });
    ACLButton.scale.setTo(0.5, 0.5);
    ACLButton.anchor.setTo(0.5, 0.5);
}

function spawnNF() {
    if (this.type === "ACL") {
        let acl = new ACL(this.network, this.gameInstance);
    }
}

function addPacketTestButton(nw, gameInstance) {
    packetTestButton = gameInstance.add.button(0, 0, 'packet', openPacketModal, {
        nw: nw, 
        gameInstance: gameInstance,
    });
    packetTestButton.scale.setTo(0.8, 0.8);
    packetTestButton.anchor.setTo(0.5, 0.5);
}

function addGameOptionsButton(nw, gameInstance){
    gameOptionsButton = gameInstance.add.button(0, 0, 'game_guide', openGameOptionsModal, {
        nw: nw, 
        gameInstance: gameInstance,
    });
    gameOptionsButton.scale.setTo(0.5, 0.5);
    gameOptionsButton.anchor.setTo(0.5, 0.5);    
}
