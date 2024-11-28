//Math.sin(Math.hypot((x-c.x)-100*Math.round((x-c.x)/100),(y-c.y))*100)面白い関数
//Math.sin(Math.sqrt(Math.hypot(x-c.x,y-c.y))*750)
//Math.sin(0.10336988969369765*(range))
//(y-c.y)**Math.round(10*random)
//Math.sin((x-c.x)*(y-c.y))
//(x-c.x+y-c.y)**random
const m=new mathematics();
var val=0;
var multiple=8;
var tchange=0;
var max=0;
var t=0;
var mode=1;
const canvas=document.querySelector(".canvas");
const res=document.querySelector("#res");
const log=document.querySelector("#log");
const func=document.querySelector("#func");
const ctx=canvas.getContext("2d");
var width=25*multiple;
var height=25*multiple;//25
let l=0;
const mouse = {x: null,y: null};
var display=0;
function chdis(){
    display++;
    if(display>1){
        display=0;
    }
}
canvas.addEventListener('mousemove', (evt) => {
    mouse.x = evt.offsetX;
    mouse.y = evt.offsetY;
    val=f(mouse.x,mouse.y)
    res.innerHTML=val;
    
});
canvas.addEventListener('click', (evt) => {
    let style=tiles[tiles.findIndex((e)=>Math.abs((e.x+size/2)-mouse.x)<=size && Math.abs((e.y+size/2)-mouse.y)<=size)].color;
    log.innerHTML=`<input type="button" value="コピー" id="button${l}" onclick="copyToClipBoard('${style}','button${l}')" /><input type='color' value="${style}" readonly />`+style+"<br>"+log.innerHTML;
    l++;
})
var tiles=[];
let hx=0;
let hy=0;
let size=100/multiple;
canvas.width=size*width;
canvas.height=size*height;
var c={x:canvas.width/2,y:canvas.height/2}
function translate(){
    if(tchange==1){
        t=parseFloat((parseFloat(t)+0.01).toFixed(2));
        if(t>1){
            t=-1;
        }
        document.getElementById('t-range').value=t;
        document.getElementById('tval').innerHTML=t;
        newColorChange();
    }
    requestAnimationFrame(translate);
}
translate();
function rgb(red,green,blue){
  //16進数に変換
  red=eval(red).toString(16);
  blue=eval(blue).toString(16);
  green=eval(green).toString(16);
  if(red.length==1){
    red="0"+red;
  }
  if(blue.length==1){
    blue="0"+blue;
  }
  if(green.length==1){
    green="0"+green;
  }
  return "#"+red+green+blue;
}
function sigmoid(x,gain,offSet){
    return (Math.tanh((gain*(x+offSet))/2)+1)/2;
}
function copyToClipBoard(string,buttonId){
    let button=document.getElementById(buttonId);
  navigator.clipboard.writeText(string).then(()=>{
      button.value="コピー成功";
        setTimeout(function(){button.value="コピー"}, 1000);
    },()=>{
      button.value="コピー失敗";
        setTimeout(function(){button.value="コピー"}, 1000);
      });
}
window.addEventListener("keydown",(e)=>{
    if(e.code==="Enter"){
        newColorChange();
    }
});
function newColorChange(){
    seed=Math.random();
    multiple=document.getElementById("pm").value;
    size=100/multiple;
    width=15*multiple;
    height=15*multiple;//25
    canvas.width=size*width;
canvas.height=size*height;
    c={x:canvas.width/2,y:canvas.height/2}
    mode=2;
        tiles=[];
        let maxVal=0;
        let minVal=0;
        hy=0;
        hx=0;
        while(hy<canvas.height){
    hx=0;
while(hx<canvas.width){
    let va=f(hx+size/2,hy+size/2);
            if(minVal>va){
                minVal=va;
            }
    tiles.push({
        val:va,
        x:hx,
        y:hy
    });
hx+=size;
}
    hy+=size;
}
        for(const t of tiles){
            //console.log(minVal);
            t.val-=minVal;
        }
        for(const t of tiles){
            if(maxVal<t.val){
                maxVal=t.val;
            }
        }
        for(const t of tiles){
            t.val=Math.round(255*t.val/maxVal);
            let r=Math.round(255*(t.x+size/2)/canvas.width);
            let b=Math.round(255*(t.y+size/2)/canvas.height);
            if(display==0){
            t.color=rgb(r,t.val,b);
            }else{
            t.color=rgb(t.val,t.val,t.val);
            }
        }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const t of tiles){
        ctx.fillStyle=t.color;
        ctx.strokeStyle=t.color;
        ctx.beginPath();
        ctx.lineTo(t.x,t.y);
        ctx.lineTo(t.x+size,t.y);
        ctx.lineTo(t.x+size,t.y+size);
        ctx.lineTo(t.x,t.y+size);
        ctx.lineTo(t.x,t.y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
    let seed=Math.random();
function f(x,y){
    let random=seed;
    let e=Math.E;
    let range=Math.hypot(x-c.x,y-c.y);
    return eval(func.value);
}
newColorChange();
