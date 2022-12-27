let dino=document.querySelector('.dino');
let villain=document.querySelector('.villain');
let gameover=document.querySelector('.gameover');
let gameover_div=document.querySelector('.gameover-div');
let start_div=document.querySelector('.start-div');
console.log(gameover_div);
let pause=false;
let go=false;
let level=5;let l=1;
// music.play();
function updateScore(Score){
  score.value=Score;
}
//****************** Events **********************/
document.addEventListener('keydown',(event)=>{
  let dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
  if(event.keyCode===37){
    dino.classList.add('transformRight');
    dino.style.left=dx-74+'px';
    // left
  }else if(event.keyCode===39){
    dino.classList.remove('transformRight');
    dino.style.left=dx+74+'px';
    // right
  }else if(event.keyCode===38){
    // up
    dino.classList.add("animateDino");
    setTimeout(()=>{
      dino.classList.remove("animateDino");
    },500);
  }else if(event.keyCode===40){
    // down
  }else if(event.keyCode===13){
    location.reload();
  }else if(event.keyCode===32 && !go){
    if(!pause){
    villain.classList.add("level1");
    gameover.classList.add('gameover-visible');
    start.innerText="Start >";
    music.play();
    pause=true;
  }else{
    villain.classList.remove("level1");
    gameover.classList.remove('gameover-visible');
    start.innerText="Pause ||";
    music.pause();
    pause=false;
    }
  }
});

let Score=0;
let cross=true;
//****************** Game Over **********************/
interval=setInterval(()=>{
  let  dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
  let  dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
  let  ox=parseInt(window.getComputedStyle(villain,null).getPropertyValue('left'));
  let  oy=parseInt(window.getComputedStyle(villain,null).getPropertyValue('top'));
  let  offsetX=Math.abs(dx-ox);
  let  offsetY=Math.abs(dy-oy);
  
  if(offsetX<90 && offsetY<=50){
    clearInterval(interval);
    villain.classList.remove('level1');
    gameover.classList.remove('gameover-visible');
    dino.classList.add('diedDino');
    music2.play();
    setTimeout(()=>{
      dino.classList.add('diedDino1');
      dino.classList.remove('diedDino');
    },600);
    start_div.style.display='none';
    go=true;
    music.pause();
    setTimeout(()=>{
      gameover_div.style.display='inline-block';
      display_score.innerHTML=score.value;
    },400);
  }
  
  //********** Score ************/

  if(Math.abs(dx-100)<=ox && ox<=dx && cross){
    Score+=1;
    updateScore(Score);
    /**********Level Up **********/
    if(Score>=level && cross){
      let levelBoard=document.querySelector('.level');
      levelBoard.style.display='block';
      levelBoard.innerText=`Completed! Level ${l}`;
      level+=5;l+=1;
      setTimeout(()=>{
        let aniDur=parseFloat(window.getComputedStyle(villain,null).getPropertyValue('animation-duration'));
        let newDur=aniDur-0.2;
        villain.style.animationDuration=newDur+'s';
      },500);
      setTimeout(()=>{
        levelBoard.style.display='none';
      },3000);
    }
    cross=false;
    setTimeout(()=>{
      cross=true;
    },400);
  }
},10);