Game.Stage_2 = function(game){};

Game.Stage_2.prototype = {
    
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        addControls(this);

        initMap('map', ['tileset1'], this);
        initDialogue(this);
        
        setStageACL(650, 620, this);
        setStageStatefulFW(1300, 620, this);
        setStageIDS(1300, 1000, this);
    },
    
    update: function(){   
        addCollision(ACLSprite, this);
        addCollision(statefulFWSprite, this);
        addCollision(statefulFWSprite2, this);

        updateDialoguePos(this);
        
        addCameraControls(this);
    }, 
}
    
    


