const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d');


canvas.width= window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
let animation;
let timer = 0;
let jump_switch = false;
let jump_timer = 0;

const bird_img = new Image();
let bird_timer = 0;

const bird = {
    x : 30,
    y : 300,
    width :  200,
    height : 200,
    draw(){
    bird_timer++;
    if (bird_timer === 40) bird_timer = 0;
    bird_img.src = (bird_timer >20) ? "img/bird2.png":"img/bird1.png";
    ctx.drawImage(bird_img,this.x,this.y,this.width,this.height)
    }
}



const background_img = new Image();
function draw_background(){
    background_img.src = 'img/background.png'
    ctx.drawImage(background_img,0,0,1500,550);
}

const enemy_img = new Image();
enemy_img.src ="img/enemy_03.png"
class Enemy{
    constructor(){
        this.x = 1300;
        this.y = 350;
        this.width = 100;
        this.height = 200;
    }
    draw(){
        ctx.drawImage(enemy_img,this.x,this.y,this.width,this.height);
    }
}


const enemies = []
function draw_enemies(){
    if(timer % 250 === 0){
    const enemy = new Enemy()
    enemies.push(enemy)
    }

    enemies.forEach((enemy,index)=>{
    // x 좌표가 0 미만일시제거
    if(enemy.x<0){
        enemy.width -=4;
        if (enemy.width < 0) {
            enemies.splice(enemy,1);
        }
    }
    else{
        enemy.x-=4;
    }

    check_collision(bird,enemy)

    enemy.draw();
    })

}

function jump_handler(){
    if (jump_switch === true){
    bird.y-=3;
    jump_timer ++;
    }
    if (jump_switch === false){
        if(bird.y < 300) {
            bird.y+=3;
        }
    }
    if( jump_timer> 50){
        jump_switch = false;
        jump_timer = 0;
    }

}

function frameByFrame(){
    animation = requestAnimationFrame(frameByFrame);
    timer ++;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    draw_background()

    draw_enemies();
    jump_handler();
    bird.draw();

}

frameByFrame();

document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jump_switch = true;
    }
})

function check_collision(dino,cactus){
    const x_diff = cactus.x - (dino.x+dino.width)
    const y_diff = cactus.y - (dino.y+dino.height);
    if(x_diff<0 && y_diff < 0){
        // ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation)
    }
}

