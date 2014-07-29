function Plane(){
    this.id=[];
    this.top=[];
    this.width=[];
}

Plane.prototype.add=function add() {
    planee.id.push('plane');
    planee.top.push(planee.randGenerator(100));
    planee.width.push(planee.randPlaneSize(300));
    this.domElement=document.createElement('img');
    document.getElementById('container').appendChild(this.domElement);
    this.domElement.setAttribute('id', planee.id[0]);
    this.domElement.setAttribute('src', 'images/plane.png');
    this.domElement.style.width=planee.width[0] + 'px';
    this.domElement.style.position='relative';
    this.domElement.style.top=planee.top[0] + 'px';
    this.domElement.style.left=-parseInt(this.domElement.style.width) + 'px';
};

Plane.prototype.move=function move(id) {
    setInterval(function(){
        planee.foreachPellets();
        var rand=planee.randGenerator(100);
        if(rand>98 && planee.id.length<1){
            planee.add();
        }
    }, 40);
    setInterval(function() {
        document.getElementById(id).style.left = parseInt(document.getElementById(id).style.left) + 9 + 'px';
    }, 20);
};

Plane.prototype.reMove=function reMove(id) {
    setInterval(function() {
        if(parseInt(document.getElementById(id).style.left)>=parseInt(document.getElementById(id).parentNode.clientWidth)) {
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
            planee.id.pop();
            planee.top.pop();
            planee.width.pop();
        }
    }, 15);
};

Plane.prototype.randGenerator=function randGenerator(frequency){
    return Math.floor(Math.random() * frequency);
};

Plane.prototype.randPlaneSize=function randPlaneSize(frequency){
    var rand=Math.floor(Math.random() * frequency);
    if(rand < 200){
        return 200;
    }
    return rand;
};

Plane.prototype.testCollision=function testCollision(){
    setInterval(function() {
        planee.foreachPellets();
    }, 15);
};

Plane.prototype.foreachPellets=function foreachPellets(){
    if(pellets.id.length>0){
        for(var ids in pellets.id){
            if((parseInt(pellets.left[pellets.id[ids]]) >= parseInt(this.domElement.style.left) &&
                parseInt(pellets.left[pellets.id[ids]]) <= parseInt(this.domElement.style.left) + planee.width[0]) &&
                parseInt(pellets.top[pellets.id[ids]]) <= planee.top[0]){
                document.getElementById('plane').parentNode.removeChild(document.getElementById('plane'));
                planee.id.pop();
                planee.top.pop();
                planee.width.pop();
            }
        }
    }
};

window.onload=function mover(){
    planee.move('plane');
    planee.reMove('plane');
    planee.testCollision();
};

var planee=new Plane();
