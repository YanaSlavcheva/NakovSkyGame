function Soldiers() {
    this.id = [];
    this.left = {};
    this.top = {};
}

Soldiers.prototype.add = function add(id) {
    this.id.push('parachutist');
    this.top.push(10);
    this.left.push(10);
    this.domElement=document.createElement('img');
    document.getElementById('container').appendChild(this.domElement);
    this.domElement.setAttribute('id', this.id[0]);
    this.domElement.setAttribute('src', 'images/paratroopLeft.png' );
    this.domElement.style.width=this.width[0] + 'px';
    this.domElement.style.position='absolute';
    this.domElement.style.top=this.top[0] + 'px';
    this.domElement.style.left=-parseInt(this.domElement.style.width) + 'px';
};

Soldiers.prototype.falling = function falling() {
    var toppos = parseInt(this.style.top) + 1;
    this.style.top = toppos + 'px';
        setTimeout(falling, 30);


};

window.onload =
    trooper.add('parachutist');
    start();

var trooper = new Soldiers();