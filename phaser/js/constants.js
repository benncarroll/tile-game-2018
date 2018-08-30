/*jshint esversion: 6 */

var CONST = {
  'PLAYER_SPEED': 20, // Player pixels/second
  'CAM_ZOOM': 4, // Camera zoom level
  'CAM_MODE': 'smooth', // Camera follow type
  'CAM_LIMIT': 100, // Camera pan distance limit
  'FIGHT_BOX_MARGIN': 0, // Margin around the fight box
  'FIGHT_BOX_WIDTH': 150, // Width of fight box
  'FIGHT_BOX_HEIGHT': 100 // Height of fight box
};

var GLOBALS = {
  'PLAYER_ENABLED': true, // Player movement toggle
  'DEBUG_ENABLED': false // Enable/disable debug graphics
};

keyPressDict = {
  'N': `     if (GLOBALS.DEBUG_ENABLED) {
              showTiles = !showTiles;
              drawDebug();
            }`,
  'C': `     if (GLOBALS.DEBUG_ENABLED) {
              showCollidingTiles = !showCollidingTiles;
              drawDebug();
            }`,
  'F': `     if (GLOBALS.DEBUG_ENABLED) {
              showFaces = !showFaces;
              drawDebug();
            }`,
  'B': `     if (GLOBALS.DEBUG_ENABLED) {
              toggleFightBox();
            }`,
  'P': `     GLOBALS.DEBUG_ENABLED = !GLOBALS.DEBUG_ENABLED`
};
