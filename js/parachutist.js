function Soldiers() {
    this.id = [];
    this.left = [];
    this.top = [];
    this.numSetInterval = [];
    this.state = [];
    this.landedHeight = [];
	this.width = [];
}

Soldiers.prototype.add = function add(left, top) {
    var containerHalfWidth = document.getElementById('gameScreen').clientWidth / 2,
        imageName;

    imageName = 'images/landedParatroop.png';

    this.id.push('parachutist' + this.id.length);
    this.top.push(top);
    this.left.push(left);
	this.width.push(containerHalfWidth * 0.35);
    this.domElement = document.createElement('img');
    this.domElement.setAttribute('id', this.id[this.id.length - 1]);
    this.domElement.setAttribute('class', 'paratrooper');
    this.domElement.name = 'paratrooper';
    this.domElement.setAttribute('src', imageName);
    this.domElement.style.top = this.top[this.id.length - 1] + 'px';
	this.domElement.style.width = this.width[0] + 'px';
    this.domElement.style.left = left + 'px';
    document.getElementById('container').appendChild(this.domElement);
};

Soldiers.prototype.falling = function falling() {

    var containerHeight = document.getElementById('container').clientHeight * 0.98,
        containerHalfWidth = document.getElementById('container').clientWidth / 2,
        baseHalfWidth = document.getElementById('base').clientWidth / 2,
        baseHeight = document.getElementById('base').clientHeight,
        imageNameFalling,
        imageNameLanded,
        i = 0;

    for (i in this.id) {

        imageNameFalling = 'images/paratroop.png';
		imageNameLanded = 'images/landedParatroop.png';

        var soldier = document.getElementById(this.id[i]),
            startLeftPositionOfBase = containerHalfWidth -  baseHalfWidth,
            endLeftPositionOfBase = containerHalfWidth +  baseHalfWidth,
            landedHeight,
            landedState;



        if(startLeftPositionOfBase <= this.left[i] && this.left[i] <= endLeftPositionOfBase){
            landedHeight = containerHeight  - soldier.clientHeight - baseHeight;
            landedState = 'landed of weapon';
        } else {
            landedHeight = containerHeight  - soldier.clientHeight;
            landedState = 'landed';
        }

        if (this.state[i] === undefined || this.state[i].substring(0,6) !== 'landed') {
            if (this.top[i] < containerHeight * 0.3) {
                soldier.style.top = (this.top[i] + 5) + 'px';
                this.top[i] += 5;
                if (!this.state[i]) this.state[i] = 'fall';
            } else if (this.top[i] >= containerHeight * 0.3 && this.top[i] < landedHeight ) {
                if (this.state[i] === 'fall') {
                    this.state[i] = 'fall with parachute';
                    soldier.setAttribute('src', imageNameFalling);
                    this.domElement.setAttribute('class', 'paratrooper shakeParatrooper');
                }
                soldier.style.top = (this.top[i] + 1) + 'px';
                this.top[i] += 1;
            } else {
                if (this.state[i] === 'fall with parachute') {
                    this.state[i] = landedState;
                    this.landedHeight[i] = this.top[i];
                    soldier.setAttribute('src', imageNameLanded);
                }
            }
        } else {
            soldier.style.top = this.landedHeight[i] + 'px';
        }
    }
};


function setIntervalParatrooper(trooper) {
    trooper.setIntervalMove = setInterval(function () {
        trooper.falling();
    }, 40);
}

var trooper = new Soldiers();

function start() {
    setIntervalParatrooper(trooper);
}

start();




