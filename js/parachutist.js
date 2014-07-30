function Soldiers() {
    this.id = [];
    this.left = [];
    this.top = [];
    this.numSetInterval = [];
    this.state = [];
    this.landedHeight = [];
}

Soldiers.prototype.add = function add(left) {
    var containerHalfWidth = document.getElementById('gameScreen').clientWidth / 2,
        imageName;

    if (left < containerHalfWidth) {
        imageName = 'images/landedParatroopl.png';
    } else {
        imageName = 'images/landedParatroopr.png';
    }

    this.id.push('parachutist' + this.id.length);
    this.top.push(10);
    this.left.push(left);
    this.domElement = document.createElement('img');
    this.domElement.setAttribute('id', this.id[this.id.length - 1]);
    this.domElement.setAttribute('class', 'paratrooper');
    this.domElement.name = 'paratrooper';
    this.domElement.setAttribute('src', imageName);
    this.domElement.style.top = this.top[this.id.length - 1] + 'px';
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

        if (this.left[i] < containerHalfWidth) {
            imageNameFalling = 'images/paratroopLeft.png';
            imageNameLanded = 'images/landedParatroopl.png';
        } else {
            imageNameFalling = 'images/paratroopRight.png';
            imageNameLanded = 'images/landedParatroopr.png';
        }

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
    trooper.add(10);
    trooper.add(100);
    trooper.add(300);
    trooper.add(600);
    trooper.add(800);
    setIntervalParatrooper(trooper);
}

start();




