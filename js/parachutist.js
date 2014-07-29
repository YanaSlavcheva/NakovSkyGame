var trooper = new Soldiers();
var containerHeight = document.getElementById('container').offsetHeight;
var containerWidth = document.getElementById('container').offsetWidth;
var troopHeight = document.getElementById('parachutist').offsetHeight;
var troopWidth = document.getElementById('parachutist').offsetWidth;

function Soldiers() {
    this.id = [];
    this.left = {};
    this.top = {};
}

Soldiers.prototype.add = function add(id) {
    trooper.id.push('parachutist');
    trooper.top.push(planee.randGenerator(50));
    trooper.width.push(planee.randPlaneSize());
    this.domElement=document.createElement('img');
    document.getElementById('container').appendChild(this.domElement);
    this.domElement.setAttribute('id', trooper.id[0]);
    this.domElement.setAttribute('src', 'images/paratroopLeft.png' );
    this.domElement.style.width=trooper.width[0] + 'px';
    this.domElement.style.position='absolute';
    this.domElement.style.top=trooper.top[0] + 'px';
    this.domElement.style.left=-parseInt(this.domElement.style.width) + 'px';
};

Soldiers.protoype.falling = function falling(id) {
    var toppos = parseInt(trooper.style.top) + 1;
    trooper.style.top = toppos + 'px';
    if (toppos < containerHeight - troopHeight) {
        setTimeout(falling, 10); }


};


function start() {
    trooper = document.getElementById('parachutist');
    trooper.style.top = 20 + 'px';
    trooper.style.left = containerWidth/2-troopWidth + 'px';
    falling();
}


window.onload =
    newTroop.add();
    start();

