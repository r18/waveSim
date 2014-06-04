cx = 0;
cy = 0;
vx = 1;
vy = 1;
radius = 10;
WIDTH = 320;
HEIGHT = 240;

function main(){
  cvs = document.getElementById('cvs');
  ctx = cvs.getContext('2d');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  ctx.fillRect(0,0,10,10);

  balls = [];
  for(var i = 0;i<35;i++){
    balls.push(generateBall());
  }
  loop();
}

function loop(){
  setInterval(function(){
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    for(i in balls){
      ctx.fillStyle = "#ff00ff";
      draw(balls[i]);
    }
    for(i in balls){
      for(var j = i;j<balls.length-1;j++){
        collisionCheck(balls[i],balls[Number(j)+1]);
      }
      update(balls[i]);
    }
  },40);
}


function draw(ball){
  ctx.fillRect(ball.x,ball.y,10,10);
}
function collisionCheck(ball1,ball2) {
  if( ball1.life > 10 &&
      ball2.life > 10 &&
      Math.abs(ball1.x - ball2.x) < 10 && 
      Math.abs(ball1.y - ball2.y) < 10){
    var vx = (ball1.vx + ball2.vx)/2; 
    var vy = (ball1.vy + ball2.vy)/2; 
    ball1.vx = vx;
    ball2.vx = -vx;
    ball1.vy = vy;
    ball2.vy = -vy;
    ball1.life = 0;
    ball2.life = 0;
  }
}

function update(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.life ++;
  if(ball.x < 0 || ball.x > WIDTH){
    ball.vx *= -1;
  }
  if(ball.y < 0 || ball.y > HEIGHT) {
    ball.vy *= -1;
  }
}

function generateBall(){
  return {
    x:Math.random()*100,
    y:Math.random()*100,
    vx:Math.random()*10,
    vy:Math.random()*10,
    life:0
  }
}
