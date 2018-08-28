var playerSpeed = 20;
var cameraMode = 'player';

var cam;
var cameraDolly;
var p;
var m;
var layerDict;
var removedLoad = false;

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  antialias: false,
  physics: {
    default: 'arcade',
    // arcade: { debug: true }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);

function preload() {
  this.load.image('tileset-main', 'images/tileset-main.gif', 16, 16);
  this.load.image('tileset-alt', 'images/tileset-alt.png', 16, 16);
  this.load.tilemapTiledJSON('level0', 'levels/level0.json');
  this.load.spritesheet('walker', 'images/walker.png', {
    frameWidth: 16,
    frameHeight: 16
  });

  // this.load.scenePlugin({
  //   key: 'AnimatedTilesPlugin',
  //   url: 'lib/AnimatedTiles.min.js',
  //   sceneKey: 'animatedtiles'
  // });
  // this.load.plugin('PixelScaler', 'lib/PixelScaler.js', true)
}

function create() {

  var map = this.make.tilemap({
    key: 'level0'
  });
  m = map;

  // The first parameter is the name of the tileset in Tiled and the second parameter is the key of the tileset image used when loading the file in preload.
  var tiles = map.addTilesetImage('main', 'tileset-main');

  // You can load a layer from the map using the layer name from Tiled, or by using the layer index
  layerDict = [];
  for (var i = 0; i < map.layers.length; i++) {
    // map.layers[i]
    layerDict[map.layers[i].name] = map.createStaticLayer(i, tiles, 0, 0);
  }


  // Player
  player = this.physics.add.sprite(184.5, 247, 'walker');
  p = player;
  p.setScale(0.75);
  p.setOrigin(0.5, 0.75);
  p.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(p);

  map.setCollisionByProperty({
    block: true
  });
  // layerDict["Solids"].setCollisionByExclusion[[-1]]

  // console.log(p, map.layers[0]);
  this.physics.world.setBounds(124, 124, 1352, 1352);


  createAnims(this.anims);

  cam = this.cameras.main;
  cameraDolly = new Phaser.Geom.Point(p.x, p.y);
  cam.zoom = 4;
  cam.setBounds(0, 0, map.widthInPixels * cam.zoom, map.heightInPixels * cam.zoom);
  cam.startFollow(cameraDolly);
  this.events.on('resize', resize, this);

}

var lastDir = "down";

function update(time, delta) {
  if (!removedLoad) {
    var elem = document.querySelector('#loader');
    elem.parentNode.removeChild(elem);
    removedLoad = true;
  }
  updateCamera();
  updatePlayer();
  updateDebug();
  this.physics.add.collider(p, m);
}

//
// Player update
//
function updatePlayer() {

  var movingX = false;
  movingY = false;

  if (cursors.left.isDown) {
    player.setVelocityX(-playerSpeed);
    player.play('left', true);
    lastDir = "left";
    movingX = true;
  } else if (cursors.right.isDown) {
    player.setVelocityX(playerSpeed);
    player.play('right', true);
    lastDir = "right";
    movingX = true;
  } else {
    player.setVelocityX(0);
    movingX = false;
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-playerSpeed);
    if (!movingX) {
      player.play('up', true);
    }
    lastDir = "up";
    movingY = true;
  } else if (cursors.down.isDown) {
    player.setVelocityY(playerSpeed);
    if (!movingX) {
      player.play('down', true);
    }
    lastDir = "down";
    movingY = true;
  } else {
    player.setVelocityY(0);
    movingY = false;
  }

  if (!movingX && !movingY) {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.play(lastDir + "-stop", true);
  }

}

//
// Camera update
//
function updateCamera() {

  if (this.game.input.activePointer.isDown) {
    if (this.game.origDragPoint) { // move the camera by the amount the mouse has moved since last update
      cameraDolly.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
      cameraDolly.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;

      cameraDolly.x = limit(cameraDolly.x, p.x - 100, p.x + 100);
      cameraDolly.y = limit(cameraDolly.y, p.y - 100, p.y + 100);

    } // set new drag origin to current position
    this.game.origDragPoint = this.game.input.activePointer.position.clone();
  } else {
    this.game.origDragPoint = null;
    if (cameraMode == 'screen') {
      blocksX = Math.floor(document.documentElement.clientWidth / 16 * cam.zoom);
      blocksY = Math.floor(document.documentElement.clientHeight / 16 * cam.zoom);

      // blocksX = 20;
      // blocksY = 20;

      // console.log(cam.zoom*16, document.documentElement.clientWidth);
      // console.log(blocksX, blocksY);

      cameraDolly.x = round(p.x, blocksX);
      cameraDolly.y = round(p.y, blocksY);
    } else {
      cameraDolly.x = p.x;
      cameraDolly.y = p.y;
    }
  }


}

//
// Debug update
//
function updateDebug() {

}


//
// Create Animations
//
function createAnims(_anims) {
  animDict = [
    ['down', [0, 2]],
    ['left', [3, 5]],
    ['right', [6, 8]],
    ['up', [9, 11]],
    ['down-stop', [1]],
    ['left-stop', [4]],
    ['right-stop', [7]],
    ['up-stop', [10]]
  ];

  for (var i = 0; i < animDict.length; i++) {
    l = animDict[i];

    // console.log(l);
    // console.log(animDict);

    n = l[0];
    if (l[1].length == 1) {
      f = [{
        key: 'walker',
        frame: l[1][0]
      }];
    } else {
      f = _anims.generateFrameNumbers('walker', {
        start: l[1][0],
        end: l[1][1]
      });
    }
    // console.log(n, f);

    _anims.create({
      key: n,
      frames: f,
      frameRate: 4,
      repeat: -1,
      yoyo: true
    });


  }

}

//
// Resize stuff
//
function resize(width, height) {
  if (width === undefined) {
    width = this.sys.game.config.width;
  }
  if (height === undefined) {
    height = this.sys.game.config.height;
  }

  this.cameras.resize(width, height);
}

window.addEventListener('resize', function(event) {

  game.resize(window.innerWidth, window.innerHeight);

}, false);
