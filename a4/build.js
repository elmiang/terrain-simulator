var plane = null;
var box = null;
var sun = null;

var ambientLight;
var hemiLight;
var dirLight;
var pointLight;

var boxes = [];
let max = 49;
let min = -49;

function createPlane() {
    var planeMaterial = new THREE.MeshLambertMaterial();
    planeMaterial.color = new THREE.Color(0.7, 0.7, 0.7);
    //planeMaterial.color = new THREE.Color(0xf9d71c);
    planeMaterial.side = THREE.DoubleSide;

    var planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.castShadow = false; 
    plane.receiveShadow = true;
}

function createBox() {
    var boxMaterial = new THREE.MeshPhongMaterial();
    boxMaterial.color = new THREE.Color(0.5, 0.5 , 0.5);

    var boxGeometry = new THREE.BoxGeometry(1, 1, 2);
    box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(1, 4, 1);
    box.castShadow = true;
    boxes.push(box);
    scene.add(box);
}

function allocateBoxes(boxNo) {
    for (let i = 0; i <= boxNo; i++) {
        createBox();
    }
    boxes.forEach(function(object){
        object.position.set(Math.random() * (max - min + 1) + min, Math.random() * (max - min + 1) + min , 1)
    });
}

function createLight() {
    //ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.5);
    hemiLight = new THREE.HemisphereLight(new THREE.Color(0.6, 0.6, 0.6), 0.2);
    //hemiLight.groundColor = new THREE.Color(1, 1, 1);
    hemiLight.skyColor = new THREE.Color(1, 1, 1);
    hemiLight.position.set(0, 0, 100);
    //hemiLight.groundColor = new THREE.Color(0, 0, 0);
}

function createSun() {
    var sunPosition = new THREE.Vector3(-5, 3, 10);

    var sunMaterial = new THREE.MeshBasicMaterial();
    sunMaterial.color = new THREE.Color(0xf9d71c);

    var sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(sunPosition.x, sunPosition.y, sunPosition.z);

    pointLight = new THREE.PointLight(new THREE.Color(0xf9d71c), 1, 1000, 0);
    pointLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    pointLight.castShadow = true;

    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.mapSize.radius = 2;

    // dirLight = new THREE.DirectionalLight(new THREE.Color(0xf9d71c), 1);
    // dirLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
    // dirLight.castShadow = true;

    // dirLight.shadow.mapSize.width = 1024;
    // dirLight.shadow.mapSize.height = 1024;
    // dirLight.shadow.radius = 2;
}

function addObjects() {
    scene.add(plane);
    scene.add(sun);

    scene.add(camera);

    scene.add(hemiLight);
    scene.add(pointLight);
    // scene.add(dirLight);
    // scene.add(ambientLight);
}