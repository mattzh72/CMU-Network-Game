Game.Preload_2 = function(game){};

Game.Preload_2.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage2/Map/map_2.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage2/Map/room.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
   
    //ASSETS FOR ACL 
    this.load.atlas('ACLSprite', 'Modules/Assets/ACL.png', 'Modules/assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ACLScreen', 'Modules/Assets/ACL_screen.png');
        
    //ASSETS FOR STATEFUL FW
    this.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ConnectionTable', 'Modules/Assets/small_screens.png'); 
        
    //ASSETS FOR IDS/IPS
    this.load.image('robot', 'Modules/Assets/robot.png');
        
    //READ JSON MAP FILE
    readJSON('Stage2/Map/map_2.json');
},
    
    create:function(){
        this.state.start('Stage_2');
    }
};