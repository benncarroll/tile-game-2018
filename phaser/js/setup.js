var playerSpeed = 80;

// var swidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
// var sheight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var cam = ""
var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);

function preload() {
  this.load.image('tiles-main', 'images/tileset-main.gif', 16, 16);
  this.load.image('tiles-alt', 'images/tileset-alt.png', 16, 16);
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
  var tiles = map.addTilesetImage('main', 'tiles-main');

  // You can load a layer from the map using the layer name from Tiled, or by using the layer index
  layerArray = []
  for (var i = 0; i < map.layers.length; i++) {
    map.layers[i]
    layerArray[i] = map.createStaticLayer(i, tiles, 0, 0);
    // layerArray[i].setOrigin(100,100)
  }

  this.physics.world.setBounds(124, 124, 1352, 1352)

  // Player
  player = this.physics.add.sprite(100, 450, 'walker');
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player);
  cursors = this.input.keyboard.createCursorKeys();

  createAnims();

  cam = this.cameras.main
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.zoom = 2
  this.cameras.main.startFollow(player)
  this.events.on('resize', resize, this);

}

var lastDir = "down"

function update(time, delta) {
  // controls.update(delta);

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
// Create Animations
//
function createAnims() {
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
      f = game.anims.generateFrameNumbers('walker', {
        start: l[1][0],
        end: l[1][1]
      })
    }
    console.log(n, f);

    game.anims.create({
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
