System.register(["scripts/src/lib/excalibur.js", "scripts/src/index.js"], function (exports_1, context_1) {
    "use strict";
    var ex, index_js_1, game, start;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ex_1) {
                ex = ex_1;
            },
            function (index_js_1_1) {
                index_js_1 = index_js_1_1;
            }
        ],
        execute: function () {
            // import Character from './character';
            // New game
            game = new ex.Engine();
            start = function (mapFile) {
                var map = new index_js_1.default(mapFile);
                var loader = new ex.Loader([map]);
                game.currentScene.tileMaps = [];
                game.start(loader).then(function () {
                    map.data.tilesets.forEach(function (ts) {
                        console.log(ts.image, ts.imageTexture.isLoaded());
                    });
                    var tm = map.getTileMap();
                    game.add(tm);
                });
            };
            start("../maps/map-main.json");
        }
    };
});
//# sourceMappingURL=main.js.map