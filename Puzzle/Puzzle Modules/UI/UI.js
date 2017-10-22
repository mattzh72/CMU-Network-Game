let toolbar;

let ACLButton;

let packetTestButton;
let gameOptionsButton;

function initPanels(network, gameInstance) {
    toolbar = initPanel(0, 0, "toolbar", gameInstance);
    toolbar.bringToTop();

    addNFButtons(network, gameInstance);
    addPacketTestButton(network, gameInstance);
    addGameOptionsButton(network, gameInstance);
}

function initPanel(x, y, panelKey, gameInstance) {
    let panel = gameInstance.add.sprite(x, y, panelKey);
    panel.scale.setTo(1.6, 1.6);
    panel.anchor.setTo(0.5, 0.5);

    return panel;
}

function bringUIToTop() {
    toolbar.bringToTop();
    ACLButton.bringToTop();
}

function updatePanelPositions(gameInstance) {
    toolbar.x = gameInstance.camera.x + window.innerWidth  - 250;
    toolbar.y = gameInstance.camera.y + window.innerHeight/9;

    ACLButton.x = toolbar.x + toolbar.width / 3;
    ACLButton.y = toolbar.y;  

    packetTestButton.x = toolbar.x;
    packetTestButton.y = toolbar.y;
    
    gameOptionsButton.x = toolbar.x - toolbar.width / 3;
    gameOptionsButton.y = toolbar.y;
}

function addNFButtons(network, gameInstance) {
    ACLButton = gameInstance.add.button(0, 0, 'ACL', spawnNF, {
        type: "ACL",
        gameInstance: gameInstance,
        network: network,
    });
    ACLButton.scale.setTo(0.5, 0.5);
    ACLButton.anchor.setTo(0.5, 0.5);
    initPanelToolTips("Add an Access Control List.", ACLButton, gameInstance);
}

function spawnNF() {
    if (this.type === "ACL") {
        let acl = new ACL(this.network, this.gameInstance);
        acl.sprite.x = this.gameInstance.camera.x + window.innerWidth/2;
        acl.sprite.y = this.gameInstance.camera.y + window.innerWidth/2;
    }
}

function addPacketTestButton(nw, gameInstance) {
    packetTestButton = gameInstance.add.button(0, 0, 'packet', openPacketModal, {
        nw: nw, 
        gameInstance: gameInstance,
    });
    packetTestButton.scale.setTo(0.5, 0.5);
    packetTestButton.anchor.setTo(0.5, 0.5);
    initPanelToolTips("Create test packets or view policy packets.", packetTestButton, gameInstance);
}

function addGameOptionsButton(nw, gameInstance){
    gameOptionsButton = gameInstance.add.button(0, 0, 'game_guide', openGameOptionsModal, {
        nw: nw, 
        gameInstance: gameInstance,
    });
    gameOptionsButton.scale.setTo(0.4, 0.4);
    gameOptionsButton.anchor.setTo(0.5, 0.5);   
    
    initPanelToolTips("Game Main Menu.", gameOptionsButton, gameInstance);
}

function initPanelToolTips(txt, sprite, gameInstance){
    let style = {
        font: "12px Source Sans Pro",
        fill: 'white',
        wordWrap: true,
        wordWrapWidth: 180,
        boundsAlignH: "center",
        boundsAlignV: "middle",
        align: "center",
    };
    
    let text = gameInstance.add.text(0, 0, txt, style);
    text.setTextBounds(0, 0, 200, 50);

    let tooltip = new Phasetips(gameInstance.game, {
        targetObject: sprite,
        context: text,
        customBackground: gameInstance.add.sprite(0, 0, "tooltip"),
        padding: 50,
        position: "top", 
    });
    
}
