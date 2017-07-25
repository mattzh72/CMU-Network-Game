Game.Stage_Puzzle = function (game) {
    
};

Game.Stage_Puzzle.prototype = {

    create: function () {  
        this.stage.backgroundColor = '#2b1c3b';
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        testModel(this);  
    },

    update: function () {
        pollCameraControls(this);
        
//        for (let i = 0; i < networkTest.nodes.length; i++)
//            networkTest.nodes[i].updateEdge();
    },
}
