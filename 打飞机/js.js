/**
 * Created by Administrator on 2016/8/5.
 */
var i=0;
var bullets=[];
var enemies=[];
var flytime=null;
var rand=1000;
var cleart=null;
window.onload=function(){
    var ground=document.getElementById("ground");
    var myplane=new myAir("myplane");
    ground.onmousemove=function(e){
        var e=e||event;
        var mx= e.clientX;
        var my= e.clientY;
        myplane.run(mx,my);
    }
    flytime=setInterval(function(){
        rand=(Math.random()*201+800);
        randamAir()
    },rand)
    cleart=setInterval(function(){
        clearAir();
    },30)
}
function myAir(mId){
    this.mId=mId;
    this.obj=document.getElementById(this.mId);
    this.position=['-432px 0px','-432px -330px'];
    var _this=this;
    this.timer=setInterval(function(){
        i++;
        _this.obj.style.background='url(img/gameArts.png)';
        _this.obj.style.backgroundPosition=_this.position[i%2];
        _this.obj.style.backgroundSize='512px 1024px';
    },500)
    this.run=function(x,y){
        this.obj.style.left=x-34+'px';
        this.obj.style.top=y-34+'px';
    }
    this.shoot=setInterval(function(){
        var bullet=new Bullet(_this.obj.offsetLeft+34,_this.obj.offsetTop);
        bullets.push(bullet);
    },300)

}
function Bullet(x,y){
    this.x=x;
    this.y=y;
    var _this=this;
    this.obj=(function(){
        var obj=document.createElement('div');
        obj.style.position='absolute';
        obj.style.height=16+'px';
        obj.style.width=11+'px';
        obj.style.top=_this.y+'px';
        obj.style.left=_this.x+'px';
        obj.style.background='url(img/gameArts.png)';
        obj.style.backgroundPosition='-503px -1px';
        document.getElementById('ground').appendChild(obj);
        return obj;

    })()
    this.run=setInterval(function(){
        if(_this.obj){
            _this.obj.style.top=_this.obj.offsetTop-30+'px'
        }
    },100)

}

function enemyAir(RmaxW,RmaxH,width,height,bgx,bgy){
    this.x=Math.floor(Math.random()*(RmaxW-width));
    this.y=-height;
    this.width=width;
    this.height=height;
    this.speed=Math.floor(Math.random()*5+4);
    this.bgx=bgx;
    this.bgy=bgy;
    var _this=this;
    this.obj=(function(){
        var obj=document.createElement('div');
        obj.style.position='absolute';
        obj.style.height=_this.height+'px';
        obj.style.width=_this.width+'px';
        obj.style.top=_this.y+'px';
        obj.style.left=_this.x+'px';
        obj.style.background='url(img/gameArts.png)';
        obj.style.backgroundPosition=_this.bgx+'px'+' '+_this.bgy+'px';
        document.getElementById('ground').appendChild(obj);
        return obj;
    }());
    this.run=setInterval(function(){
        if(_this.obj){
            var Top=_this.obj.offsetTop;
            Top +=_this.speed;
            _this.obj.style.top=Top+'px';
        }
    },40)
}
function randamAir(){
    var obj=null;
    var index=Math.floor(Math.random()*3)
    switch(index){
        case 0:
            obj=new enemyAir(320,568,35,25,-82,-656);
            break;
        case 1:
            obj=new enemyAir(320,568,47,58,-1,-570);
            break;
        case 2:
            obj=new enemyAir(320,568,108,168,-324,-166)
            break;
    }
    enemies.push(obj);
}
function clearAir(){
    for(var i=0;i<enemies.length;i++){
        var myEne=enemies[i];
        var currentindex=myEne.obj.offsetTop-myEne.obj.offsetWidth;
        if(currentindex>=568){
            myEne.obj.parentNode.removeChild(myEne.obj);
            enemies.splice(i,1);
            break;
        }
    }
    for(var j=0;j<bullets.length;j++){
        var bullet=bullets[j];
        var currentoffset=bullet.obj.offsetTop;
        if(currentoffset<=-10){
            bullet.obj.parentNode.removeChild(bullet.obj)
            bullets.splice(j,1);
            break;
        }
    }
    for(var k=0;k<enemies.length;k++){
        var myplane=enemies[k];
        for(var a=0;a<bullets.length;a++){
            var bull=bullets[a];
            if(myplane.obj.offsetLeft<bull.obj.offsetLeft && myplane.width+myplane.obj.
                    offsetLeft>bull.obj.offsetLeft+3&&myplane.obj.offsetTop<bull.obj.
                    offsetTop&&myplane.obj.offsetTop+myplane.height>=bull.obj.offsetTop){
                myplane.obj.parentNode.removeChild(myplane.obj);
                enemies.splice(k,1);
                bull.obj.parentNode.removeChild(bull.obj);
                bullets.splice(a,1)
            }
        }
    }
}
