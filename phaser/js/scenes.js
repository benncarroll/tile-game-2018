var MainMap = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function MainMap() {
      Phaser.Scene.call(this, {
        key: 'mainMap'
      });
    },

  preload: function() {
    this.load.image('tileset-main', 'images/tileset-main.gif', 16, 16);
    this.load.image('tileset-alt', 'images/tileset-alt.png', 16, 16);
    this.load.tilemapTiledJSON('level0', 'levels/level0.json');
    this.load.spritesheet('walker', 'images/walker.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  },

  create: function() {

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

    // Spawn our enemies in
    spawnEnemies(this, CONST.ENEMY_COUNT);

    // Player
    player = this.physics.add.sprite(184.5, 247, 'walker');
    p = player;
    p.setScale(0.75);
    p.setOrigin(0.5, 0.75);
    p.setCollideWorldBounds(true);

    generateFightBox(this);

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

    loadUserData();
  },

  update: function(time) {
    if (!removedLoad) {
      var elem = document.querySelector('#loader');
      elem.parentNode.removeChild(elem);
      removedLoad = true;
    }
    updateCamera();
    updatePlayer();
    enemyAi();

    // Save data every 5 seconds
    if (time > lastUpdate + 5000) {
      lastUpdate = time;
      saveUserData(this);
    }
  }


});
