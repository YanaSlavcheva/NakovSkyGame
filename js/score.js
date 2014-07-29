function Score(){
    this.stats=0;
    this.statsHolder=document.getElementById('scoreHolder');
}

Score.prototype.upScore=function upScore(){
    this.stats=this.stats+1;
    this.statsHolder.innerHTML=this.stats + '';
};

var score=new Score();
