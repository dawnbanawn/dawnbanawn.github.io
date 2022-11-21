let scene, scene2, camera, renderer, renderer2, cube, cube2;

function init(){
     scene = new THREE.Scene();

     camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight,
        0.1,
        1000
        );
    
     renderer = new THREE.WebGLRenderer({antialias: true});    
    renderer.setSize(window.innerWidth, window.innerHeight);    
    document.body.appendChild(renderer.domElement);


    
    const geometry = new THREE.BoxGeometry( 8, 8, 8 );
    //const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    const texture = new THREE.TextureLoader().load('textures/posz.jpg')
    const material = new THREE.MeshBasicMaterial( {map: texture} );
        material.side = THREE.BackSide;

        let materialArray = [];
        let texture_lf = new THREE.TextureLoader().load('textures/negx.jpg');
        let texture_dn = new THREE.TextureLoader().load('textures/negy.jpg');
        let texture_bk = new THREE.TextureLoader().load('textures/negz.jpg');
        let texture_rt = new THREE.TextureLoader().load('textures/posx.jpg');
        let texture_up = new THREE.TextureLoader().load('textures/posyv2.jpg');
        let texture_ft = new THREE.TextureLoader().load('textures/posz.jpg');
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
     
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
        materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));
        
    for (let i = 0; i < 6; i++){
       materialArray[i].side = THREE.BackSide;
    }
    cube = new THREE.Mesh( geometry, materialArray );

    const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
    ///const material2 = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    // const texture2 = new THREE.TextureLoader().load('textures/test.png');
    // const material2 = new THREE.MeshBasicMaterial( {map: texture2, transparent: true} );
    //     material2.side = THREE.BackSide;
    // cube2 = new THREE.Mesh( geometry2, material2 );



    var group = new THREE.Group();
    group.add(cube);
    //group.add(cube2);

    scene.add( group);

    cube.rotation.y += 4;
            
                //scene.add( group );
// let controls;
//     controls = new TrackballControls( camera, renderer.domElement );
//     controls.rotateSpeed = 4;

}



function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    cube.rotation.y += 0.0005;
    //cube2.rotation.y += 0.001;


    renderer.render(scene, camera);
    //renderer2.render(scene2, camera);


}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init();
animate();