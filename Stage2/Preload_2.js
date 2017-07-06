Game.Preload_2 = function(game){};

Game.Preload_2.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage2/Map/map.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage2/Map/room.png');
    this.load.image('dialogue', 'Modules/assets/dialogue.png');
   
    //ASSETS FOR ACL 
    this.load.atlas('ACLSprite', 'Modules/assets/ACL.png', 'Modules/assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ACLScreen', 'Modules/assets/ACL_screen.png');
        
    //ASSETS FOR STATEFUL FW
    this.load.atlas('StatefulFW', 'Modules/assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('ConnectionTable', 'Modules/assets/small_screens.png'); 
        
    //READ JSON MAP FILE
    readJSON('Stage2/Map/map.json');
},
    
    create:function(){
        this.state.start('Stage_2');
    }
};