//declare world  food
var World={  
    Size:{
        width:20,
        height:20
    },
    Food:{
        x:null,
        y:null,
        //排除蛇頭與蛇身座標，對剩餘的座標進行隨機產生food
        generate:function(snake){
            var head = snake.head.get();
            var part = snake.body.part;
            var map = []
            for(var x=0; x<World.Size.width; x++){
            	for(var y=0; y<World.Size.height; y++){
            	    if(x==head.xx && y==head.y){
            	        continue;
            	    }
            	    if(part.length>0){
            	        (function(){
            	            for(var i=part.length;i--;){
            	                if(x==part[i].x && y==part[i].y){
            	                    return;
            	                }
            	            }
            	            map.push([x,y]);
            	        })();
            	    }else{
            	        map.push([x,y]);
            	    }
            	}
            }
            var i = Math.floor(Math.random()*map.length);
            World.Food.x = map[i][0];
            World.Food.y = map[i][1];
        }
    }
};

var Center = {
    x:9,
    y:9
};

//Direction
var Direction = {
    up: 1,
    right: 2,
    down: -1,
    left: -2
};

function gameover(length){
    alert('Your Score: '+length);
}

//whole snake
function Snake(){
    var self = this;
    function die(){
        gameover(self.body.part.length);
    }

    // snake's head
    function Head(){
        this.x = Center.x;
        this.y = Center.y;
        this.direction = null;
        this.get = function(){
            return{
            	x:this.x,
            	y:this.y
            }
        };
        //snake move
        this.move = function(direction){
            if(!direction){
            	return true;
            }
            var head = this.get();

            this.direction=direction=direction+this.direction?direction:this.direction;

            //?? this.direction = direction;
            switch(direction){
                case Direction.up:
                    this.y--;
                    break;
                case Direction.right:
                    this.x++;
                    break;
                case Direction.down:
                    this.y++;
                    break;
                case Direction.left:
                    this.x--;
            }
            //move judge
            if(eat(this.x, this.y)){
                World.Food.generate(self);
                self.body.increase(head);
            }else if(hitCheck(this.x, this.y) || eatSelfCheck(this.x, this.y)){
            	die();
            	return false;
            }else{
            	self.body.move(head);
            }
            return true;
        };
        //snake eat
        function eat(x,y){
            return x==World.Food.x && y==World.Food.y;
        }
        function hitCheck(x,y){
            return x<0 || y<0 ||x==World.Size.width || y==World.Size.height;
        }
        function eatSelfCheck(x,y){
            var part = self.body.part;
            for(var i=part.length;i--;){
            	if(x==part[i].x && y==part[i].y){
            	    return true;
            	}
            }
            return false;
        }
    }

    //define snake's body
    function Body(){
        //儲存蛇身數據
        this.part = [];
        this.move = function(head){
            if(this.part.length>0){
                this.part.pop();
                this.increase(head);
            }
        };
        this.increase = function(head){
            //蛇頭後(蛇身最前新增一個蛇頭位置數據)
            this.part.unshift(head);
        };
    }

    this.head = new Head();
    this.body = new Body();
}


function init(){
    //control whole snake
    var snake = new Snake();
    World.Food.generate(snake);
    var ctx=document.querySelector('canvas').getContext('2d');

    function draw(snake){
        ctx.clearRect(0,0,200,200);
        var head = snake.head;
        ctx.fillStyle = 'black';
        ctx.fillRect(head.x*10, head.y*10,10,10);
        var body = snake.body.part;
        for(var i=body.length;i--;){
            ctx.fillRect(body[i].x*10, body[i].y*10,10,10);
        }
        ctx.fillStyle = 'red';
        ctx.fillRect(World.Food.x*10, World.Food.y*10,10,10);
    }

    var direction, dict_direction = [];
    dict_direction[37] = Direction.left;
    dict_direction[38] = Direction.up;
    dict_direction[39] = Direction.right;
    dict_direction[40] = Direction.down;

    document.addEventListener('keydown', function(e){
        direction = dict_direction[e.keyCode] || direction;
    });

    (function(){
        if(snake.head.move(direction)){
            draw(snake);
            setTimeout(arguments.callee,200-snake.body.part.length)
        }
    })();
}
init();
