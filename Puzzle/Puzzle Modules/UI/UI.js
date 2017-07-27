let sidePanel1;
let sidePanel2;

let ACLButton;

let packetTestButton;

function initPanels(network, gameInstance) {
    sidePanel1 = initSidePanel(0, 0, gameInstance);
    sidePanel1.bringToTop();

    sidePanel2 = initSidePanel(0, 0, gameInstance);
    sidePanel2.bringToTop();


    addNFButtons(network, gameInstance);

    addPacketTestButton(network, gameInstance);

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

function updatePanelPositions() {
    sidePanel1.x = window.innerWidth - sidePanel1.width / 2;
    sidePanel1.y = window.innerHeight / 2 - sidePanel1.height / 2;

    sidePanel2.x = window.innerWidth - sidePanel2.width / 2;
    sidePanel2.y = window.innerHeight / 2 + sidePanel2.height / 2;

    ACLButton.x = sidePanel1.x - sidePanel1.width / 4;
    ACLButton.y = sidePanel1.y - sidePanel1.height / 4;

    packetTestButton.x = sidePanel2.x;
    packetTestButton.y = sidePanel2.y;
}

function addNFButtons(network, gameInstance) {
    ACLButton = gameInstance.add.button(0, 0, 'ACL', spawnNF, {
        type: "ACL",
        gameInstance: gameInstance,
        network: network
    });
    ACLButton.scale.setTo(0.5, 0.5);
    ACLButton.anchor.setTo(0.5, 0.5);
}

function spawnNF() {
    if (this.type === "ACL") {
        new ACL(this.network, this.gameInstance);
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
