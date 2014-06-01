cx = 0;
cy = 0;
vx = 1;
vy = 1;
radius = 10;
WIDTH = 300;
HEIGHT = 300;

function main(){
    cvs = document.getElementById('cvs');
    ctx = cvs.getContext('2d');
    cvs.width = WIDTH;
    cvs.height = HEIGHT;
    ctx.fillRect(0,0,10,10);

    balls = [];
    for(var i = 0;i<5;i++){
	balls.push(generateBall());
    }
    loop();
}

function loop(){
    setInterval(function(){
	    ctx.clearRect(0,0,WIDTH,HEIGHT);
	    for(i in balls){
		fillStyle = changeColor(balls[i]);
		draw(balls[i]);
	    }
	    for(i in balls){
		update(balls[i]);
	    }
       	},100);
}

function draw(ball){
    ctx.fillRect(ball.x,ball.y,10,10);
}

function update(ball){
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.life ++;

    if(ball.x < 0 || ball.x > WIDTH){
	ball.vx *= -1;
	generateBallwithColl(ball);
    }
    if(ball.y < 0 || ball.y > HEIGHT){
	ball.vy *= -1;
	generateBallwithColl(ball);
    }
}

function generateBallwithColl(ball){
    if(ball.life > 100){
	balls.push({
		x:ball.x,
		    y:ball.y,
		    vx : Math.random()*10,
		    vy : Math.random()*10,
		    life:0,
		    color:Math.random()*256
		    });
	    }
}

function generateBall(){
    return {
	x:Math.random()*100,
	y:Math.random()*100,
	vx:Math.random()*10,
	vy:Math.random()*10,
	    life:0,
	    color:Math.random()*256
	    }
}


function changeColor(){
    var color = Math.floor(Math.random() * 256).toString(16);   
    for(var counter = color.length; counter < 6; counter++){
	color = "0" + color;  
    }
    return  "#" + color;	
}
