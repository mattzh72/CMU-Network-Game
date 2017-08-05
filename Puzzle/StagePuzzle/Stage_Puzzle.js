Game.Stage_Puzzle = function (game) {
    this.network = new network("Preload Network", this);
};

Game.Stage_Puzzle.prototype = {

    create: function () {  
        this.stage.backgroundColor = "#271a33";
        this.physics.startSystem(Phaser.Physics.ARCADE);

        initMap('map', ['tileset1'], this);

        addControls(this);

        initPanels(this.network, this);
    },

    update: function () {
        pollCameraControls(this);
        updatePanelPositions(this);
        
//        for (let i = 0; i < networkTest.nodes.length; i++)
//            networkTest.nodes[i].updateEdge();
    },
}
