/*jshint esversion: 6, evil: true */

var cam;
var cameraDolly;
var p;
var m;
var b;
var layerDict;
var removedLoad = false;

var showTiles = false;
var showFaces = false;
var showCollidingTiles = false;

var ad;

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

  // this.load.plugin('DialogModalPlugin', 'lib/dialog_plugin.js');

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
  m.setCollisionByProperty({
    block: true
  }, true);

  // The first parameter is the name of the tileset in Tiled and the second parameter is the key of the tileset image used when loading the file in preload.
  var tiles = m.addTilesetImage('main', 'tileset-main');

  // You can load a layer from the map using the layer name from Tiled, or by using the layer index
  // layerDict = [];
  for (var i = 0; i < map.layers.length; i++) {
    // map.layers[i]
    this.groundLayer = m.createStaticLayer(i, tiles, 0, 0);
  }

  // Player
  player = this.physics.add.sprite(184.5, 247, 'walker');
  p = player;
  p.setScale(0.75);
  p.setOrigin(0.5, 0.75);
  p.setCollideWorldBounds(true);


  // Attack box
  this.fightBoxGroup = this.add.graphics();

  var sw = this.sys.game.config.width;
  var sh = this.sys.game.config.height;
  var cz = CONST.CAM_ZOOM;
  var fbm = CONST.FIGHT_BOX_MARGIN;

  b = [
    this.fightBoxGroup.fillStyle(0xb3b3b3, 1).fillRect(0, 0, sw / cz - fbm * 2, sh / cz - fbm * 2),
    this.fightBoxGroup.fillStyle(0xd9d9d9, 1).fillRect(2, 2, sw / cz - fbm * 2 - 4, sh / cz - fbm * 2 - 4),
    this.fightBoxGroup.fillStyle(0x808080, 1).fillRect(4, sh / cz - fbm * 2 - 14, 20, 10).setInteractive()
  ];
  this.input.on('gameobjectdown', function(pointer, gameObject) {
    console.log('here', gameObject);
  });

  for (var x = 0; x < b.length; x++) {
    b[x].setVisible(false);
  }

  cursors = this.input.keyboard.createCursorKeys();
  wasd = {
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
  };


  this.physics.add.collider(p, this.groundLayer);
  this.physics.world.setBounds(124, 124, 1352, 1352);


  createAnims(this.anims);

  cam = this.cameras.main;
  cameraDolly = new Phaser.Geom.Point(p.x, p.y);
  cam.zoom = CONST.CAM_ZOOM;
  cam.setBounds(0, 0, map.widthInPixels * cam.zoom, map.heightInPixels * cam.zoom);
  cam.startFollow(cameraDolly);
  this.events.on('resize', resize, this);


  // Collision debug
  debugGraphics = this.add.graphics();

  assignKeyPresses(this);

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

  // this.physics.world.collide(p, this.groundLayer, function() {
  //   console.log('hit?');
  // });
}

//
// Player update
//
function updatePlayer() {

  var movingX = false;
  var movingY = false;

  if (GLOBALS.PLAYER_ENABLED) {

    if (cursors.left.isDown || wasd.left.isDown) {
      player.setVelocityX(-CONST.PLAYER_SPEED);
      player.play('left', true);
      lastDir = "left";
      movingX = true;
    } else if (cursors.right.isDown || wasd.right.isDown) {
      player.setVelocityX(CONST.PLAYER_SPEED);
      player.play('right', true);
      lastDir = "right";
      movingX = true;
    } else {
      player.setVelocityX(0);
      movingX = false;
    }

    if (cursors.up.isDown || wasd.up.isDown) {
      player.setVelocityY(-CONST.PLAYER_SPEED);
      if (!movingX) {
        player.play('up', true);
      }
      lastDir = "up";
      movingY = true;
    } else if (cursors.down.isDown || wasd.down.isDown) {
      player.setVelocityY(CONST.PLAYER_SPEED);
      if (!movingX) {
        player.play('down', true);
      }
      lastDir = "down";
      movingY = true;
    } else {
      player.setVelocityY(0);
      movingY = false;
    }
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

      cameraDolly.x = limit(cameraDolly.x, p.x - CONST.CAM_LIMIT, p.x + CONST.CAM_LIMIT);
      cameraDolly.y = limit(cameraDolly.y, p.y - CONST.CAM_LIMIT, p.y + CONST.CAM_LIMIT);

    } // set new drag origin to current position
    this.game.origDragPoint = this.game.input.activePointer.position.clone();
  } else {
    this.game.origDragPoint = null;
    if (CONST.CAM_MODE == 'screen') {
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
// Collider Debug draw
//
function drawDebug() {
  var tileColor = showTiles ? new Phaser.Display.Color(105, 210, 231, 100) : null;
  var colldingTileColor = showCollidingTiles ? new Phaser.Display.Color(243, 134, 48, 100) : null;
  var faceColor = showFaces ? new Phaser.Display.Color(40, 39, 37, 255) : null;

  debugGraphics.clear();

  // Pass in null for any of the style options to disable drawing that component
  m.renderDebug(debugGraphics, {
    tileColor: tileColor, // Non-colliding tiles
    collidingTileColor: colldingTileColor, // Colliding tiles
    faceColor: faceColor // Interesting faces, i.e. colliding edges
  });

  // helpText.setText(getHelpMessage());
}

//
// Assign Key Press handlers
//
function assignKeyPresses(_game) {
  for (var key in keyPressDict) {
    if (keyPressDict.hasOwnProperty(key)) {
      _game.input.keyboard.on('keydown_' + key, handleKeyPresses);
    }
  }
}

function handleKeyPresses(event) {
  // console.log(event);
  var kp = event.key.toUpperCase();
  // console.log(kp, "\n\n" ,keyPressDict[kp]);
  eval(keyPressDict[kp]);
}

//
//  Toggles view of fight box
//
function toggleFightBox(state) {

  if (state == undefined) {
    if (b[0].visible) state = false;
    if (!b[0].visible) state = true;
  }

  if (!state) {
    for (var i = 0; i < b.length; i++) {
      b[i].setVisible(false);
      GLOBALS.PLAYER_ENABLED = true;
    }

    return state;
  } else {

    // Formula for box coords/width/height
    // p.x - (sw / (2 * cz)) + fbm, p.y - (sh / (2 * cz)) + fbm, sw/cz - fbm*2, sh/cz - fbm*2

    var sw = game.config.width;
    var sh = game.config.height;
    var cz = CONST.CAM_ZOOM;
    var fbm = CONST.FIGHT_BOX_MARGIN;

    for (var x = 0; x < b.length; x++) {
      b[x].setPosition(p.x - (sw / (2 * cz)) + fbm, p.y - (sh / (2 * cz)) + fbm);
      b[x].setVisible(true);
    }
    GLOBALS.PLAYER_ENABLED = false;
    return state;
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
