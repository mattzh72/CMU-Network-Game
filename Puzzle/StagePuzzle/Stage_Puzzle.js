Game.Stage_Puzzle = function (game) {
    
};

Game.Stage_Puzzle.prototype = {

    create: function () {  
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        testModel(this);   
    },

    update: function () {
        pollCameraControls(this);
        acl.detectRouter();

        
        
    },
}
