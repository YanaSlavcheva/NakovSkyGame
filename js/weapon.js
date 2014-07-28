// -------------------------------------------   GUN --------------------------------------------------
function Gun(id) {
    this.domElement = document.getElementById(id);
    this.angle = 0;
    this.direction = '';
    this.leftInterval = 0;
    this.rightInterval = 0;
    this.len = this.domElement.clientHeight;
//  coordinates of gun's bottom
    this.x = this.domElement.offsetLeft + this.domElement.offsetWidth / 2;
    this.y = this.domElement.offsetTop + this.domElement.offsetHeight;
}

Gun.prototype.rotate = function rotate() {

    this.changeAngle();

    //applying CSS3 rotation
    this.domElement.style.transform = 'rotate(' + this.angle + 'deg)';
    this.domElement.style.mozTransform = 'rotate(' + this.angle + 'deg)';
    this.domElement.style.webkitTransform = 'rotate(' + this.angle + 'deg)';
    this.domElement.style.OTransform = 'rotate(' + this.angle + 'deg)';
    this.domElement.style.msTransform = 'rotate(' + this.angle + 'deg)';
};

Gun.prototype.changeAngle = function changeAngle() {

    if (this.direction === 'left') {
        if (this.angle > -90) {
            this.angle -= 1;
        }
    }

    if (this.direction === 'right') {
        if (this.angle < 90) {
            this.angle += 1;
        }
    }
};


Gun.prototype.setDirection = function setDirection(direction) {
    this.direction = direction;
};

Gun.prototype.showFire = function showFire() {
    this.domElement.getElementsByTagName('img')[0].style.visibility = 'visible';
};

Gun.prototype.hideFire = function hideFire() {
    this.domElement.getElementsByTagName('img')[0].style.visibility = 'hidden';
};


// ---------------------------------------------------  PELLET -----------------------------------------------

function Pellets() {
    this.id = [];
    this.angles = {};
    this.left = {};
    this.top = {};
    this.speed = 3;
    this.dFragment = document.createDocumentFragment();
}

Pellets.prototype.y = function y(gun, x, angle) {
    var a,
        y;

    if (angle > 0) {
        a = Math.tan((90 - angle) * (Math.PI / 180));
        y = gun.y - a * (x - gun.x);
    } else if (angle < 0) {
        a = Math.tan((90 - Math.abs(angle)) * (Math.PI / 180));
        y = gun.y - a * (gun.x - x);
    } else {
        y = gun.y - gun.len;
    }

    return  y;
};

Pellets.prototype.add = function add(gun) {

    var pellet = document.createElement("IMG");

    pellet.src = 'images/pellet.png';
    this.id.push('pellet' + this.id.length);
    pellet.id = 'pellet' + (this.id.length - 1);
    pellet.className = 'pellet';
    pellet.name = 'pellet';
    //applying CSS3 rotation
    pellet.style.transform = 'rotate(' + gun.angle + 'deg)';
    pellet.style.mozTransform = 'rotate(' + gun.angle + 'deg)';
    pellet.style.webkitTransform = 'rotate(' + gun.angle + 'deg)';
    pellet.style.OTransform = 'rotate(' + gun.angle + 'deg)';
    pellet.style.msTransform = 'rotate(' + gun.angle + 'deg)';

    var angleRad = gun.angle * (Math.PI / 180),
        left = (Math.round(gun.x + Math.sin(angleRad) * gun.len)),
        top = Math.round(this.y(gun, Math.round(gun.x + Math.sin(angleRad) * gun.len), gun.angle));


    pellet.style.left = left + 'px';
    pellet.style.top = top + 'px';

    this.left[pellet.id] = left;
    this.top[pellet.id] = top;
    this.angles[pellet.id] = gun.angle;

    document.getElementById('container').appendChild(pellet);
};


Pellets.prototype.move = function move() {

    var container = document.getElementById('container'),
        pellets = document.getElementsByName('pellet'),
        i;

    if (pellets.length <= 0) {
        this.id = [];
        this.angles = {};
        this.left = {};
        this.top = {};
        return;
    }

    for (i = 0; i < this.id.length; i += 1) {

        var id = this.id[i],
            left = this.left[id],
            top = this.top[id],
            angle = this.angles[id];

        var pellet = document.getElementById(id);

        if (pellet != null) {
            if (angle > 0) {
                left += this.speed;
            } else if (angle < 0) {
                left -= this.speed;
            }

            if (angle === 0) {
                top -= this.speed;
            } else {
                top = Math.round(this.y(gun, left, angle));
            }


            this.left[id] = left;
            this.top[id] = top;
            pellet.style.left = left + 'px';
            pellet.style.top = top + 'px';


            if (!(left < container.clientWidth && top > 0 && left > 0)) {
                container.removeChild(pellet);
            }
        }
    }

};


Pellets.prototype.copyToDFragment = function copyToDFragment() {
    var pellets = document.getElementsByName('pellet');
    while (pellets.length > 0) {
        this.dFragment.appendChild(pellets[0]);
    }
};


function setLeftIntervalMovePellets(pellets) {
    pellets.setIntervalMove = setInterval(function () {
        pellets.move();
        document.getElementById('d1').innerHTML = pellets.left['pellet0'];
    }, 1);
}

function setLeftIntervalRotate(gun) {
    if (gun.rightInterval) clearInterval(gun.rightInterval);
    gun.leftInterval = setInterval(function () {
        gun.rotate();
    }, 20);
    gun.rightInterval = 0;
}

function setRightIntervalRotate(gun) {
    if (gun.leftInterval) clearInterval(gun.leftInterval);
    gun.rightInterval = setInterval(function () {
        gun.rotate();
    }, 20);
    gun.leftInterval = 0;
}

// Event Gun Functions
window.onkeydown = function catchDownKey(e) {

    switch (e.keyCode) {
        case 32:
            gun.showFire();
            pellets.add(gun);
            break;
        case 37:
            gun.setDirection('left');
            if (!gun.leftInterval) setLeftIntervalRotate(gun);
            break;
        case 39:
            gun.setDirection('right');
            if (!gun.rightInterval) setRightIntervalRotate(gun);
            break;
    }

};

window.onkeyup = function catchUpKey(e) {

    switch (e.keyCode) {
        case 32:
            gun.hideFire();
            break;
        case 37:
            clearInterval(gun.leftInterval);
            gun.leftInterval = 0;
            break;
        case 39:
            clearInterval(gun.rightInterval);
            gun.rightInterval = 0;
            break;
    }
};


// Execute code
var gun = new Gun('weapon'),
    pellets = new Pellets();

setLeftIntervalMovePellets(pellets);
//showPellets(pellets);


