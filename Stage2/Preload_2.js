Game.Preload_2 = function(game){};

Game.Preload_2.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage2/Map/map_2.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage2/Map/room.png');
    this.load.image('tileset2','Stage2/Map/pipe_opening.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
   
    //ASSETS FOR ACL 
    this.load.atlas('ACLSprite', 'Modules/Assets/ACL.png', 'Modules/assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ACLScreen', 'Modules/Assets/ACL_screen.png');
        
    //ASSETS FOR STATEFUL FW
    this.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ConnectionTable', 'Modules/Assets/small_screens.png'); 
        
    //ASSETS FOR IDS/IPS
    this.load.image('robot', 'Modules/Assets/robot.png');
    this.load.image('robotBack', 'Modules/Assets/robot_back.png');
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //PRELOAD JSON MAP FILE
    readJSON('Stage2/Map/map_2.json');
        
    //ASSETS FOR PACKET
    this.load.image('packet', 'Modules/Assets/packet.png');
},
    
    create:function(){
        this.state.start('Stage_2');
    }
};