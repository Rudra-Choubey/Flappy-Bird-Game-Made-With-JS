let c = document.getElementById('c');
let ctx = c.getContext('2d');
let counter = 0;
let background = new Image();
background.src = 'img/bg.png';
let pipeImg = new Image();
pipeImg.src = 'img/pipe.png';
let pipedwn = new Image();
pipedwn.src = 'img/pipedwn.png';
//=====Bird Frames=====//
let birdImg = new Image();
birdImg.src = 'img/birdF/upflap.png';
let birdImg2 = new Image();
birdImg2.src = 'img/birdF/midflap.png';
let birdImg3 = new Image();
birdImg3.src = 'img/birdF/dwnflap.png';
let birdImg4 = new Image();
birdImg4.src = 'img/birdF/upface.png';
let frames = [
    birdImg,
    birdImg2,
    birdImg3
]
// ==================//
function collision(px,py,pw,ph,bx,by,bw,bh) {
    return px < bw+bx && bx < px+pw && py < bh+by && by < py+ph;
}
let img = [
    background,
    pipeImg,
    bird
]
//Bird Pos
let x = 0+50;
let y = c.height/2;
//create bird
function flapper() {
    counter++;
}
setInterval(flapper,90);
function bird(x,y) {
    this.x = x;
    this.y = y;
    if(counter == frames.length) {
        counter = 0;
    }
    ctx.drawImage(frames[counter],this.x,this.y,37,24);
}
//Move
document.addEventListener("keydown",move);
function move(e) {
    if(e.keyCode == 32) {
        y-=25; 
    }
}
//Images
//pipe coordinates
let pole = [{
    x:c.width,
    y:0
}];
let pts = 0;
let ground = new Image();
ground.src = 'img/ground.png';
//Create Pipe
let num = 1;
function pipe() {
    for(let i = 0;i < num;i++) {
        let p = pole[i];
        ctx.drawImage(pipedwn,p.x,p.y);
        ctx.drawImage(pipeImg,p.x,p.y+320+75);
        p.x--;
        if(p.x == 60) {
            pole.push({
                x:c.width,
                y:Math.floor(Math.random()*pipeImg.height)-pipeImg.height
            });
            num++;
        }
            if(p.x == 8) {
                pts++;
            }  
        if(collision(p.x,p.y,52,320,x,y,24,34) || y+24 > c.height-112 ||collision(p.x,p.y+395,52,320,x,y,34,24 )) {
            location.reload();
        }
        if(y <= 0) {
            location.reload();
        }
    }
}
function score() {
      ctx.fillStyle = "white";
    ctx.font = "46px verdana";
    ctx.fillText("Score: "+pts,0,51); 
}
function create() {
    ctx.drawImage(background,0,0);
    new bird(x,y);    
    new pipe(); 
    new score(); 
    ctx.drawImage(ground,0,c.height-112);
    y+=1;
    
    requestAnimationFrame(create);
}
create();
//setInterval(create,20);