Game.Preload_0 = function(game){};

Game.Preload_0.prototype = {
    preload: function(){
    
    //LOAD ASSETS
    
    //ASSETS FOR MAP
    this.load.tilemap('map', 'Stage0/Map/map_0.json', null, Phaser.Tilemap.TILED_JSON);  
    this.load.image('tileset1','Stage0/Map/Rooms/blue_room.png');
    this.load.image('dialogue', 'Modules/Assets/dialogue.png');
        
    //ASSETS FOR NETWORK DIAGRAMS
    this.load.image('networkDiagram1', 'Stage0/Map/networkDiagram1.png');
    this.load.image('networkDiagram2', 'Stage0/Map/networkDiagram2.png');
    this.load.image('networkDiagram3', 'Stage0/Map/networkDiagram3.png');
    this.load.image('networkDiagram4', 'Stage0/Map/networkDiagram4.png');

        
    //ROOM ASSETS
    this.load.image('blueRoom','Stage0/Map/Rooms/blue_room.png');
    this.load.image('yellowRoom','Stage0/Map/Rooms/yellow_room.png');
    this.load.image('pinkRoom','Stage0/Map/Rooms/pink_room.png');
    this.load.image('greenRoom','Stage0/Map/Rooms/green_room.png');
    this.load.image('purpleRoom','Stage0/Map/Rooms/purple_room.png');
    this.load.image('sandRoom','Stage0/Map/Rooms/sand_room.png');
        
    //ASSETS FOR CLIENT
    this.load.image('computer','Stage0/Map/computer.png'); 
        
    //ASSETS FOR SERVER
    this.load.image('server1','Stage0/Map/server_1.png');
    this.load.image('server2','Stage0/Map/server_2.png');
    this.load.image('server3','Stage0/Map/server_3.png');
    this.load.image('server4','Stage0/Map/server_4.png');
        
    //CHARACTER ASSETS
    this.load.atlas('NAT', 'Modules/Assets/NAT.png', 'Modules/assets/NAT.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('routingTableSprite', 'Modules/Assets/routing_table_sprite.png', 'Modules/assets/routing_table_sprite.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('ACLSprite', 'Modules/Assets/ACL.png', 'Modules/assets/ACL.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('StatefulFW', 'Modules/Assets/StatefulFW.png', 'Modules/assets/StatefulFW.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('robot', 'Modules/Assets/robot.png');
    this.load.image('proxy', 'Modules/Assets/proxy.png');
        
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
                
    //ASSETS FOR HELPER SPRITE
    this.load.image('helperSprite', 'Graphics/alien-ufo-pack/PNG/shipGreen_manned.png');
        
    //ASSETS FOR ITEMS
    this.load.image('packet', 'Modules/Assets/packet.png');
    this.load.image('ConnectionTable', 'Modules/Assets/small_screens.png'); 
    this.load.image('ACLScreen', 'Modules/Assets/ACL_screen.png');
        
    //ASSETS FOR PIPES
    this.load.image('pipe_opening','Stage0/Map/pipe_opening.png');
    this.load.image('pipe','Stage0/Map/pipe.png');

    //READ JSON MAP FILE
    readJSON('Stage0/Map/map_0.json');
},
    
    create:function(){
        this.state.start('Stage_0');
    }
};