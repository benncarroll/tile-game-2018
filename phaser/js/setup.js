// var dat;

var playerSpeed = 30;

// var swidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
// var sheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var cam;
var cameraDolly;
var p;
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
  this.load.image('tiles', 'images/tileset-main.gif', 16, 16);
  this.load.tilemapTiledJSON('map', 'levels/level0.json');
  this.load.spritesheet('walker', 'images/walker.png', {
    frameWidth: 16,
    frameHeight: 16
  })

  // this.load.scenePlugin({
  //   key: 'AnimatedTilesPlugin',
  //   url: 'lib/AnimatedTiles.min.js',
  //   sceneKey: 'animatedtiles'
  // });
  // this.load.plugin('PixelScaler', 'lib/PixelScaler.js', true)
}

function create() {

  var map = this.make.tilemap({
    key: 'map'
  });

  // The first parameter is the name of the tileset in Tiled and the second parameter is the key of the tileset image used when loading the file in preload.
  var tiles = map.addTilesetImage('main', 'tiles');

  // You can load a layer from the map using the layer name from Tiled, or by using the layer index (0 in this case).
  var layer = map.createStaticLayer(0, tiles, 0, 0);

  this.physics.world.setBounds(124, 124, 1352, 1352)

  // Player
  player = this.physics.add.sprite(184.5, 247, 'walker');
  p = player
  player.setScale(0.75)
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player);
  cursors = this.input.keyboard.createCursorKeys();

  createAnims(this.anims);

  cam = this.cameras.main;
  cameraDolly = new Phaser.Geom.Point(p.x, p.y)
  cam.zoom = 4;
  cam.setBounds(0, 0, map.widthInPixels * cam.zoom, map.heightInPixels * cam.zoom);
  cam.startFollow(cameraDolly);
  this.events.on('resize', resize, this);

}

var lastDir = "down"

function update(time, delta) {
  if (!removedLoad) {
    var elem = document.querySelector('#loader');
    elem.parentNode.removeChild(elem);
    removedLoad = true;
  }
  updateCamera()
  updatePlayer()
}

//
// Player update
//
function updatePlayer() {

  if (cursors.left.isDown) {
    player.setVelocityX(-playerSpeed);
    player.anims.play('left', true);
    lastDir = "left"
  } else if (cursors.right.isDown) {
    player.setVelocityX(playerSpeed);
    player.anims.play('right', true);
    lastDir = "right"
  } else {
    player.setVelocityX(0);
    player.anims.play(lastDir + "-stop", true);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-playerSpeed);
    player.anims.play('up', true);
    lastDir = "up"
  } else if (cursors.down.isDown) {
    player.setVelocityY(playerSpeed);
    player.anims.play('down', true);
    lastDir = "down"
  } else {
    player.setVelocityY(0);
    player.anims.play(lastDir + "-stop", true);
  }

}

//
// Camera update
//
function updateCamera() {
  cameraDolly.x = p.x;
  cameraDolly.y = p.y;
}

//
// Create Animations
//
function createAnims(_anims) {
  animDict = [
    ['down', [1, 3]],
    ['left', [4, 5]],
    ['right', [7, 8]],
    ['up', [10, 11]],
    ['down-stop', [0]],
    ['left-stop', [3]],
    ['right-stop', [6]],
    ['up-stop', [9]]
  ]

  for (var i = 0; i < animDict.length; i++) {
    l = animDict[i]

    // console.log(l);
    // console.log(animDict);

    n = l[0]
    if (l[1].length == 1) {
      f = [{
        key: 'walker',
        frame: l[1][0]
      }]
    } else {
      f = _anims.generateFrameNumbers('walker', {
        start: l[1][0],
        end: l[1][1]
      })
    }
    // console.log(n, f);

    _anims.create({
      key: n,
      frames: f,
      frameRate: 5,
      repeat: -1
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
