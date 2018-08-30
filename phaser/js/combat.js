/*jshint esversion: 6 */

/*
  ,ad8888ba,                                    88
 d8"'    `"8b                                   88                         ,d
d8'                                             88                         88
88              ,adPPYba,   88,dPYba,,adPYba,   88,dPPYba,   ,adPPYYba,  MM88MMM
88             a8"     "8a  88P'   "88"    "8a  88P'    "8a  ""     `Y8    88
Y8,            8b       d8  88      88      88  88       d8  ,adPPPPP88    88
 Y8a.    .a8P  "8a,   ,a8"  88      88      88  88b,   ,a8"  88,    ,88    88,
  `"Y8888Y"'    `"YbbdP"'   88      88      88  8Y"Ybbd8"'   `"8bbdP"Y8    "Y888
*/

function combat(tile) {
  // initialisation of the combat
  combatInit();

  // loop variables
  var loop = true;
  var outcome = null;

  while (loop) {
    // start enemy turn
    switch (enemyTurn(tile)) {
      case -1:
        // case for if the player wins
        loop = false;
        outcome = "win";
        break;

      case -2:
        // case for if the player loses
        loop = false;
        outcome = "lose";
        break;
    }

    // start player turn
    switch (playerTurn(tile)) {
      case -1:
        // case for if the player wins
        loop = false;
        outcome = "win";
        break;

      case -2:
        // case for if the player loses
        loop = false;
        outcome = "lose";
        break;
    }
  }
  // if the enemy is defeated then end()
  end();
}

/*
88               88
88               ""    ,d
88                     88
88  8b,dPPYba,   88  MM88MMM
88  88P'   `"8a  88    88
88  88       88  88    88
88  88       88  88    88,
88  88       88  88    "Y888
*/

function combatInit() {
  toggleFightBox(true);
}

/*
888888888888
     88
     88
     88  88       88  8b,dPPYba,  8b,dPPYba,   ,adPPYba,
     88  88       88  88P'   "Y8  88P'   `"8a  I8[    ""
     88  88       88  88          88       88   `"Y8ba,
     88  "8a,   ,a88  88          88       88  aa    ]8I
     88   `"YbbdP'Y8  88          88       88  `"YbbdP"'
*/
//(*)
function playerTurn(tile) {
  if (player.health <= 0) {
    return -2;
  } else if (enemy.health <= 0) {
    return -1;
  }
}

function enemyTurn(tile) {
  if (player.health <= 0) {
    return -2;
  } else if (enemy.health <= 0) {
    return -1;
  }
}

function calcDamage() {

}

//(**)

/*
88888888888                        88
88                                 88
88                                 88
88aaaaa      8b,dPPYba,    ,adPPYb,88
88"""""      88P'   `"8a  a8"    `Y88
88           88       88  8b       88
88           88       88  "8a,   ,d88
88888888888  88       88   `"8bbdP"Y8
*/

function end() {
  toggleFightBox(true);
}
