Game.PreloadTest = function(game){};

Game.PreloadTest.prototype = {
    preload: function(){
    
    //LOAD ALL ASSETS
    this.load.tilemap('testMap', 'Testing/assets/test_map.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Testing/assets/test_room.png');
    this.load.image('tileset2','Testing/assets/platform.png');    
    this.load.image('dialogue', 'Testing/assets/dialogue.png');
    this.load.image('robot', 'Testing/assets/robot.png');
    this.load.image('packet', 'Testing/assets/packet.png');

    this.load.spritesheet('player','Testing/assets/player.png',72, 96);
//    this.load.atlas('player', 'Testing/assets/player_alt.png', 'Testing/assets/player_alt.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        
        
    //READ JSON MAP FILE
    readJSON('Testing/assets/test_map.json');

},
    
    create:function(){
        this.state.start('TestLevel');
    }
};