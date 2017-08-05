Game.Preload_Puzzle = function (game) {};

Game.Preload_Puzzle.prototype = {
    preload: function () {

        this.load.tilemap('map', 'Puzzle/StagePuzzle/Map/map_puzzle.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1', 'Puzzle/StagePuzzle/Map/purple_tile.png');

        this.load.image('router', 'Puzzle/Assets/physicspack/PNG/Aliens/alienBlue_square.png');
        this.load.image('ACL', 'Puzzle/Assets/physicspack/PNG/Aliens/alienGreen_square.png');
        this.load.image('IPS', 'Puzzle/Assets/physicspack/PNG/Aliens/alienBeige_square.png');
        this.load.image('StatefulFW', 'Puzzle/Assets/physicspack/PNG/Aliens/alienPink_square.png');
        this.load.image('NAT', 'Puzzle/Assets/physicspack/PNG/Aliens/alienYellow_square.png');

        this.load.image('client', 'Puzzle/Assets/computer.png'); 
        
        //Tooltip Assets
        this.load.image('tooltip', 'Puzzle/Assets/tooltip.png');
        this.load.image('side_panel', 'Puzzle/Assets/side_square_panel.png');
        this.load.image('packet', 'Puzzle/Assets/packet.png');
        this.load.image('game_guide', 'Puzzle/Assets/game_guide.png');



        readJSON('Puzzle/StagePuzzle/Map/map_puzzle.json');
    },

    create: function () {

        this.state.start('Stage_Puzzle');
    }
};
