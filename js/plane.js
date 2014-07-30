function Plane() {
    this.id = [];
    this.top = [];
    this.width = [];
    this.side = [];
    this.position = [];
    this.trooperPositions = [];
}

Plane.prototype.add = function add() {
    this.id.push('plane');
    this.side.push(this.generateSide());
    this.top.push(this.randGenerator(150));
    this.width.push(this.randPlaneSize());
    this.domElement = document.createElement('img');
    document.getElementById('container').appendChild(this.domElement);
    this.domElement.setAttribute('id', this.id[0]);
    this.domElement.style.width = this.width[0] + 'px';
    this.domElement.style.position = 'absolute';
    this.domElement.style.top = this.top[0] + 'px';
    this.whichSideMove();

    var containerWidth = document.getElementById('container').clientWidth;
    if (containerWidth !== undefined) {

        this.trooperPositions = [];

        var trooperCount = Math.round(Math.random() * 2) + 1,
            d = Math.random() * 50 + 2,
            diff = Math.round(containerWidth / d),
            i;

        for (i = 0; i < trooperCount; i += 1) {
            this.trooperPositions[i] = diff * (Math.round(Math.random() * d  + 1));
        }
   }
};

Plane.prototype.generateSide = function generateside() {
    switch (Math.floor(Math.random() * 10) % 2) {
        case 0:
            return 'right';
            break;
        case 1:
            return 'left';
            break;
        default:
            return 'left';
    }
};

Plane.prototype.whichSideMove = function whichSideMove() {
    if (this.side[0] == 'left') {
        this.domElement.setAttribute('src', 'images/leftPlane.png');
        this.position.push(-parseInt(this.domElement.style.width) + 'px');
        this.domElement.style.left = this.position[0];
    }
    else {
        this.domElement.setAttribute('src', 'images/rightPlane.png');
        this.position.push(parseInt(this.domElement.parentNode.clientWidth) - 1 + 'px');
        this.domElement.style.left = this.position[0];
    }
};

Plane.prototype.move = function move(id) {
    setInterval(function () {
        planee.foreachPellets();
        var rand = planee.randGenerator(100);
        if (rand > 98 && planee.id.length < 1) {
            planee.add();
        }
    }, 10);
    setInterval(function () {
        if (document.getElementById(id) != null) {
            planee.whereToMove(id);
            planee.paratrooperGenerator(id);
        }
    }, 30);
};

Plane.prototype.whereToMove = function whereToMove(id) {
    if (this.side[0] == 'left') {
        document.getElementById(id).style.left = parseInt(document.getElementById(id).style.left) + 9 + 'px';
        planee.planeSoundStart();
    }
    else {
        document.getElementById(id).style.left = parseInt(document.getElementById(id).style.left) - 9 + 'px';
        planee.planeSoundStart();
    }
};

Plane.prototype.reMove = function reMove(id) {
    setInterval(function () {
        if (document.getElementById(id) != null) {
            if (parseInt(document.getElementById(id).style.left) >= parseInt(document.getElementById(id).parentNode.clientWidth)) {
                document.getElementById(id).parentNode.removeChild(document.getElementById(id));
                planee.id.pop();
                planee.top.pop();
                planee.width.pop();
                planee.side.pop();
                planee.position.pop();
                planee.planeSoundStop();
            }
            if (parseInt(document.getElementById(id).style.left) <= parseInt(document.getElementById(id).style.width) * -1 - 1) {
                document.getElementById(id).parentNode.removeChild(document.getElementById(id));
                planee.id.pop();
                planee.top.pop();
                planee.width.pop();
                planee.side.pop();
                planee.position.pop();
                planee.planeSoundStop();
            }
        }
    }, 15);
};

Plane.prototype.randGenerator = function randGenerator(frequency) {
    return Math.floor(Math.random() * frequency);
};

Plane.prototype.randPlaneSize = function randPlaneSize() {
    var widthContainer = document.getElementById('container').clientWidth;
    var rand = Math.floor(Math.random() * widthContainer * 0.25);
    if (rand < widthContainer * 0.1) {
        return widthContainer * 0.1;
    }
    return rand;
};

Plane.prototype.testCollision = function testCollision() {
    setInterval(function () {
        planee.foreachPellets();
    }, 15);
};

Plane.prototype.foreachPellets = function foreachPellets() {
    if (pellets.id.length > 0) {
        for (var ids in pellets.id) {
            if (this.domElement.style.left != undefined) {
                if ((parseInt(pellets.left[pellets.id[ids]]) >= parseInt(this.domElement.style.left) &&
                    parseInt(pellets.left[pellets.id[ids]]) <= parseInt(this.domElement.style.left) + planee.width[0]) &&
                    parseInt(pellets.top[pellets.id[ids]]) <= planee.top[0]) {
                    planee.shootPlane();
                }
            }
        }
    }
};

Plane.prototype.planeSoundStart = function planeSoundStart() {
    document.getElementById('planeFly').play();
};

Plane.prototype.planeSoundStop = function planeSoundStop() {
    document.getElementById('planeFly').pause();
};

Plane.prototype.planeExplodeSoundStart = function planeExplodeSoundStart() {
    document.getElementById('planeExplode').currentTime = 0;
    document.getElementById('planeExplode').play();
};

function createImgBurningPlane(plane) {
    var img = document.createElement('img');
    img.src = 'images/explosion.png';
    img.style.position = 'absolute';
    img.style.width = plane.width[0] + 'px';
    img.style.left = plane.domElement.style.left;
    img.style.top = plane.domElement.style.top;
    document.getElementById('container').appendChild(img);
    img.className = 'fadeAnimation';
    return img;
}

Plane.prototype.shootPlane = function shootPlane() {
    score.upScore();
    var explosion = createImgBurningPlane(this);
    setTimeout(function () {
        removeImgBurningPlane(explosion);
    }, 2000);
    document.getElementById('plane').parentNode.removeChild(document.getElementById('plane'));
    planee.id.pop();
    planee.top.pop();
    planee.width.pop();
    planee.side.pop();
    planee.position.pop();
    planee.planeExplodeSoundStart();
    planee.planeSoundStop();
};

Plane.prototype.paratrooperGenerator = function paratrooperGenerator(planeId) {

    if (this.trooperPositions.length > 0) {
        var plane = document.getElementById(planeId),
            currentPosition = parseInt(plane.style.left),
            i;


        for (i in this.trooperPositions) {
            if (currentPosition - 5 <= this.trooperPositions[i] && this.trooperPositions[i] <= currentPosition + 5) {
                // TODO this.top[this.id[i]]
                trooper.add(this.trooperPositions[i], this.top[0]);
                this.trooperPositions[i].splice(i,1);
                break;
            }
        }

//        this.trooperPositions.splice(i, 0);
    }
};

function removeImgBurningPlane(img) {
    if (img != undefined) {
        document.getElementById('container').removeChild(img);
    }
}


window.onload = function mover() {
    planee.move('plane');
    planee.reMove('plane');
    planee.testCollision();
};

var planee = new Plane();
