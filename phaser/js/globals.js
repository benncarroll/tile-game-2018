/*jshint esversion: 6 */

var CONST = {
  'PLAYER_SPEED': 20, // Player pixels/second
  'CAM_ZOOM': 4, // Camera zoom level
  'CAM_MODE': 'smooth', // Camera follow type
  'CAM_LIMIT': 100, // Camera pan distance limit
  'FIGHT_BOX_MARGIN': 0, // Margin around the fight box
  'FIGHT_BOX_WIDTH': 100, // Width of fight box
  'FIGHT_BOX_HEIGHT': 70, // Height of fight box
  'ENEMY_COUNT': 2,  // The mount of enemies that will spawn
  'ENEMY_TYPES': ["Big", "Small"]  // The list of enemy types
};

var GLOBALS = {
  'PLAYER_ENABLED': true, // Player movement toggle
  'DEBUG_ENABLED': false // Enable/disable debug graphics
};

var FIGHT_ELEMENTS = {
  // fg.fightData = {
  //   enemyName: 'Boss',
  //   desc: 'A magic boss appears.',
  //   playerHP: 100,
  //   enemyHP: 20,
  //   enemyInitial: 'E',
  //   actions: ['stab', 'heal']
  // };
  text: {
    enemyName: {
      x: 10,
      y: 10,
      a: 'left',
      s: 25,
      d: 'EnemyName'
    },
    desc: {
      x: 10,
      y: 20,
      a: 'left',
      s: 15,
      d: 'A wild Enemy appeared.'
    },
    playerHP: {
      x: 25,
      y: 35,
      a: 'center',
      s: 15,
      d: '100/100'
    },
    enemyHP: {
      x: 75,
      y: 35,
      a: 'center',
      s: 15,
      d: '20/20'
    },
    playerInitial: {
      x: 25,
      y: 40,
      a: 'center',
      s: 10,
      d: 'P'
    },
    enemyInitial: {
      x: 75,
      y: 40,
      a: 'center',
      s: 10,
      d: 'E'
    }
  }
};

var keyPressDict = {
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
