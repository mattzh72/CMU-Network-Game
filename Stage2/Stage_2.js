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
        addCollision(ACLSprite, layers, this);
        addCollision(statefulFWSprite, layers, this);
        addCollision(statefulFWSprite2, layers, this);

        updateDialoguePos(this);
        
        addCameraControls(this);
    }, 
}
    
    


