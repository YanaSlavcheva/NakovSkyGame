function Soldiers() {
    this.id = [];
    this.left = [];
    this.top = [];
    this.numSetInterval = [];
}

Soldiers.prototype.add = function add() {
    this.id.push('parachutist' + this.id.length);
    this.top.push(10);
    this.left.push(10);
    this.domElement = document.createElement('img');
    this.domElement.setAttribute('id', this.id[this.id.length - 1]);
    this.domElement.setAttribute('class', 'paratrooper');
    this.domElement.setAttribute('src', 'images/paratroopLeft.png');
    this.domElement.style.top = this.top[this.id.length - 1] + 'px';
    this.domElement.style.left = 100 + 'px';
    document.getElementById('container').appendChild(this.domElement);
};

Soldiers.prototype.falling = function falling() {

    var containerHeight = document.getElementById('container').clientHeight * 0.85;
    var i;

    for (i in this.id) {

        var soldier =  document.getElementById(this.id[i]);

        if (this.top[i] < containerHeight && soldier != null) {
            soldier.style.top = (this.top[i] + 1)+ 'px';
            this.top[i]+=1;
        }
    }
};


function setIntervalParatrooper(trooper) {
    trooper.setIntervalMove = setInterval(function () {
        trooper.falling();
    }, 10);
}

var trooper = new Soldiers();

function start() {
    trooper.add();
    setIntervalParatrooper(trooper);
}


start();


