// Object.defineProperty(exports, "__esModule", { value: true });

import { ex } from 'scripts/lib/excalibur.min.js';
import TiledResource from 'scripts/src/index.js';

// var ex:any = require('excalibur');
// var TiledResource = require('src/index');

// import Character from './character';

// New game
var game = new ex.Engine();

var start = (mapFile: any) => {
  var map = new TiledResource(mapFile);
  var loader = new ex.Loader([map]);

  game.currentScene.tileMaps = []
  game.start(loader).then(function() {

    map.data.tilesets.forEach(function(ts: any) {
      console.log(ts.image, ts.imageTexture.isLoaded());
    });

    var tm = map.getTileMap();

    game.add(tm);

  });
}

start("../maps/map-main.json");
