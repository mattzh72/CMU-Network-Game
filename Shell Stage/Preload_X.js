Game.Preload_X = function(game){};

Game.Preload_X.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'StageX/Map/map_X.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage1/Map/room.png');
//    this.load.image('tileset2','Stage1/Map/pipe_opening.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //READ JSON MAP FILE
    readJSON('StageX/Map/map_X.json');
},
    
    create:function(){
        this.state.start('Stage_X');
    }
};