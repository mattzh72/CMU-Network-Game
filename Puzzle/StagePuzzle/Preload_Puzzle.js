Game.Preload_Puzzle = function(game){};

Game.Preload_Puzzle.prototype = {
    preload: function(){
        this.load.image('router','Puzzle/Assets/physicspack/PNG/Aliens/alienBlue_square.png'); 
        this.load.image('ACL','Puzzle/Assets/physicspack/PNG/Aliens/alienPink_square.png');
        
        
},
    
    create:function(){
        
        this.state.start('Stage_Puzzle');
    }
};



