Game.Preload_3 = function(game){};

Game.Preload_3.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage3/Map/map_3.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage3/Map/room.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //READ JSON MAP FILE
    readJSON('Stage3/Map/map_3.json');
},
    
    create:function(){
        this.state.start('Stage_3');
    }
};