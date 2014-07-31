function removePlanes(){
    var allPlanes=document.getElementsByName('plane');
    for(var i=0; i<allPlanes.length; i++){
        allPlanes[i].parentNode.removeChild(allPlanes[i]);
    }
}
