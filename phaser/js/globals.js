/*jshint esversion: 6 */

var CONST = {
  'PLAYER_SPEED': 20, // Player pixels/second
  'CAM_ZOOM': 5.001, // Camera zoom level
  'CAM_MODE': 'smooth', // Camera follow type
  'CAM_LIMIT': 100, // Camera pan distance limit
  'FIGHT_BOX_MARGIN': 0, // Margin around the fight box
  'FIGHT_BOX_WIDTH': 100, // Width of fight box
  'FIGHT_BOX_HEIGHT': 70, // Height of fight box
  'ENEMY_COUNT': 100, // The mount of enemies that will spawn
  'ENEMY_AGRO_DIST': 5, // The distance the player needs to be away from an enemy for it to become aggressive
  'ENEMY_SPEED': 10 // The speed at which an enemy travels
};

var GLOBALS = {
  'PLAYER_ENABLED': true, // Player movement toggle
  'DEBUG_ENABLED': false, // Enable/disable debug graphics
  'PLACEMENT_TILES': [ // Tiles enemies can be placed on
    217, 220, 221, 222, 223,
    234, 239, 240, 241,
    252, 255, 257, 258, 259
  ],
  'ENEMY_TYPES': ["Skeleton", "Slime", "Ghost", "Bat", "Spider"], // The list of enemy types
  'ENEMY_DATA': {
    "Skeleton": {
      stats: {
        attack: 8,
        speed: 10,
        sight: 6
      },
      frame: 'skeleton'
    },
    "Slime": {
      stats: {
        attack: 5,
        speed: 3,
        sight: 10
      },
      frame: 'slime'
    },
    "Bat": {
      stats: {
        attack: 2,
        speed: 7,
        sight: 4
      },
      frame: 'bat'
    },
    "Spider": {
      stats: {
        attack: 10,
        speed: 12,
        sight: 5
      },
      frame: 'spider'
    },
    "Ghost": {
      stats: {
        attack: 10,
        speed: 15,
        sight: 8
      },
      frame: 'ghost'
    }
  },
  'ACTIONS':[]
};

var FIGHT_ELEMENTS = {
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
      s: 30,
      d: '100/100',
      c: '#5cb85c'
    },
    enemyHP: {
      x: 75,
      y: 35,
      a: 'center',
      s: 30,
      d: '20/20',
      c: '#d9534f'
    },
    playerInitial: {
      x: 25,
      y: 45,
      a: 'center',
      s: 20,
      d: '🗡 P',
      c: '#5cb85c'
    },
    enemyInitial: {
      x: 75,
      y: 45,
      a: 'center',
      s: 20,
      d: '🛡 E',
      c: '#d9534f'
    },
    combatDesc: {
      x: 50,
      y: 40,
      a: 'center',
      s: 15,
      d: 'E took 4 damage.',
      c: '#ff8200'
    },
    message: {
      x: 50,
      y: 60,
      s: 25,
      a: 'center',
      d: '',
      c: '#082691'
    },
    action1: {
      x: 20,
      y: 50,
      a: 'center',
      s: 15,
      d: 'SLASH',
      ac: 'playerHit',
      c: '#0012ff'
    },
    action2: {
      x: 30,
      y: 50,
      a: 'center',
      s: 15,
      d: 'HEAL',
      ac: 'playerHeal',
      c: '#0012ff'
    }
  }
};
var DIALOG_ELEMENTS = {
  text: {
    title: {
      x: 50,
      y: 30,
      a: 'center',
      s: 25,
      d: 'Main Title'
    },
    option1: {
      x: 25,
      y: 40,
      a: 'center',
      s: 20,
      d: 'Action 1',
      c: '#001880',
      ac: 'action1'
    },
    option2: {
      x: 75,
      y: 40,
      a: 'center',
      s: 20,
      d: 'Action 2',
      c: '#cb00d6',
      ac: 'action2'
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
