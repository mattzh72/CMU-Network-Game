Game.Preload_1 = function(game){};

Game.Preload_1.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage1/Map/map_1.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage1/Map/room.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //READ JSON MAP FILE
    readJSON('Stage1/Map/map_1.json');
},
    
    create:function(){
        this.state.start('Stage_1');
    }
};