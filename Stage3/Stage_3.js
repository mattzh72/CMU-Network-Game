Game.Stage_3 = function(game){};

Game.Stage_3.prototype = {
    
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1'], this);
        initDialogue(this);
        
        let guideTextArr = [
            "I am the Game Guide!",
            "Press C to Close",
        ];
        
        initGuideSprite(guideTextArr, this);
        
    },
    
    update: function(){   
        updateDialoguePos(this);
        addCameraControls(this);
        updateHelperSpritePos(this);
    }, 
}
    
    


