var MainMap = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function MainMap() {
    Phaser.Scene.call(this, {
      key: 'mainMap'
    });
  },

  preload: function() {
    this.load.image('tileset-main', 'images/tileset-main.gif', 16, 16);
    this.load.image('tileset-alt', 'images/tileset-alt.png', 16, 16);
    this.load.tilemapTiledJSON('level0', 'levels/level0.json');
    this.load.tilemapTiledJSON('shop0', 'levels/shop0.json');
    this.load.spritesheet('walker', 'images/walker.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  },

  create: function() {

    this.maps = {};

    this.maps.level0 = this.make.tilemap({
      key: 'level0'
    });

    // this.maps.shop0 = this.make.tilemap({
    //   key: 'shop0'
    // });

    m = this.maps.level0;

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key of the tileset image used when loading the file in preload.
    this.tiles = {};
    this.tiles.level0 = this.maps.level0.addTilesetImage('main', 'tileset-main');
    // this.tiles.shop0 = this.maps.shop0.addTilesetImage('alt', 'tileset-alt');
    // console.log(this.tiles);

    this.layers = {};

    for (var map in this.maps) {
      if (this.maps.hasOwnProperty(map)) {
        this.maps[map].setCollisionByProperty({
          block: true
        }, true);

        this.layers[map] = [];

        for (var i = 0; i < this.maps[map].layers.length; i++) {
          // map.layers[i]
          console.log('this.layers[map]', this.layers[map]);
          console.log('this.maps[map]', this.maps[map]);
          console.log('this.tiles[map]', this.tiles[map]);
          this.layers[map].push(this.maps[map].createStaticLayer(i, this.tiles[map], 0, 0));
          // this.groundLayer = m.createStaticLayer(i, tiles, 0, 0);
        }
      }
    }

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

    // Save data every 5 seconds
    if (time > lastUpdate + 5000) {
      lastUpdate = time;
      saveUserData(this);
    }
  }


});

var Shop0 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function MainMap() {
    Phaser.Scene.call(this, {
      key: 'shop0'
    });
  },

  preload: function() {
    this.load.image('tileset-main', 'images/tileset-main.gif', 16, 16);
    this.load.image('tileset-alt', 'images/tileset-alt.png', 16, 16);
    // this.load.tilemapTiledJSON('level0', 'levels/level0.json');
    this.load.tilemapTiledJSON('shop0', 'levels/shop0.json');
    this.load.spritesheet('walker', 'images/walker.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  },

  create: function() {

    this.maps = {};

    // this.maps.level0 = this.make.tilemap({
    //   key: 'level0'
    // });

    this.maps.shop0 = this.make.tilemap({
      key: 'shop0'
    });

    // m = this.maps.level0;

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key of the tileset image used when loading the file in preload.
    this.tiles = {};
    // this.tiles.level0 = this.maps.level0.addTilesetImage('main', 'tileset-main');
    this.tiles.shop0 = this.maps.shop0.addTilesetImage('alt', 'tileset-alt');
    // console.log(this.tiles);

    this.layers = {};

    for (var map in this.maps) {
      if (this.maps.hasOwnProperty(map)) {
        this.maps[map].setCollisionByProperty({
          block: true
        }, true);

        this.layers[map] = [];

        for (var i = 0; i < this.maps[map].layers.length; i++) {
          // map.layers[i]
          // console.log('this.layers[map]', this.layers[map]);
          // console.log('this.maps[map]', this.maps[map]);
          // console.log('this.tiles[map]', this.tiles[map]);
          this.layers[map].push(this.maps[map].createStaticLayer(i, this.tiles[map], 0, 0));
          // this.groundLayer = m.createStaticLayer(i, tiles, 0, 0);
        }
      }
    }

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
    this.physics.world.setBounds(0, 0, 208, 143);


    // createAnims(this.anims);

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

    updateCamera();
    updatePlayer();

    // Save data every 5 seconds
    if (time > lastUpdate + 5000) {
      lastUpdate = time;
      saveUserData(this);
    }
  }

});
